/*
Copyright 2011, Carnegie Learning

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

// Import the cocos2d module
var cocos = require('cocos2d');
var geo = require('geometry');
var events = require('events');
var Texture2D = require('cocos2d').Texture2D;

// Project Imports
var KeyboardLayer = require('/KeyboardLayer');

// Static Imports
var XML = require('/XML');

// Event Relay /////////////////////////////////////////////////////////////////////////////////////

// Empty object solely for providing a static relay point for cocos events
var eventRelay = {};

// Utility base class //////////////////////////////////////////////////////////////////////////////

// Both Actions and Triggers make use of these functions for retrieving values from the opts object
var OptGetters = function(opts) {
    // For once in all of this code I do NOT need to call a superclass' constructor
}
OptGetters.inherit(Object, {
    // Gets the specified value from opts, deletes it from opts and returns the fresh opts
    // Throws an error if the value does not exist within opts
    getOpt: function(name, opts) {
        if(opts.attr(name)) {
            this[name] = opts.attr(name);
            opts.removeAttr(name);
            return;
        }
        
        throw new Error('[CRITICAL] [PARSE] opts does not contain property ( ' + name + ' )');
    },
    
    // Runs getOpt and then parses the received value as an int before returning it
    // Throws an error if the value resolves to NaN
    getInt: function(name, opts) {
        this.getOpt(name, opts)
        this[name] = parseInt(this[name]);
        if(isNaN(this[name])) {
            throw new Error('[CRITICAL] [PARSE] opts[' + name +'] value is NaN after parseInt');
        }
        return opts;
    },
    
    // Runs getOpt and then parses the received value as an float before returning it
    // Throws an error if the value resolves to NaN
    getFloat: function(name, opts) {
        this.getOpt(name, opts)
        this[name] = parseFloat(this[name]);
        if(isNaN(this[name])) {
            throw new Error('[CRITICAL] [PARSE] opts[' + name +'] value is NaN after parseFloat');
        }
    },
    
    // Runs getOpt and then parses the received value as a boolean based on the true and false values provided
    // Throws an error if the value does not equal either of the provided values
    getBoolean: function(name, opts, t, f) {
        this.getOpt(name, opts);
        
        if(this[name] == t) {
            this[name] = true;
        }
        else if(this[name] == f) {
            this[name] = false;
        }
        else {
            throw new Error('[CRITICAL] [PARSE] Invalid boolean value ( ' + this[name] + ' )  Expected ( ' + t + ' || ' + f + ' )');
        }
    },
    
    // Converts all values passed in the opts object to numbers if possible
    optionalConverter: function(opts) {
		var map = {};
		var attributes = opts[0].attributes;
		var aLength = attributes.length;
		
		for (a = 0; a < aLength; a++) {
			map[attributes[a].name] = attributes[a].value;
		}
	
        for (var prop in map) {
            if (map.hasOwnProperty(prop)) {
                var ft = parseFloat(map[prop]);
                if(!isNaN(ft)) {
                    map[prop] = ft;
                }
            }
        }
        
        return map;
    },
    
    kill: function() {
        events.clearInstanceListeners(this);
    }
});

// Actions /////////////////////////////////////////////////////////////////////////////////////////

// Abstract base class for Actions
var Act = function(opts) {
    Act.superclass.constructor.call(this, opts);
    
    if(opts.attr('errorLevel')) {
        if(opts.attr('errorLevel') == 'error') {
            this.errorLevel = 0;
        }
        else if(opts.attr('errorLevel') == 'warn') {
            this.errorLevel = 1;
        }
        else if(opts.attr('errorLevel') == 'ignore') {
            this.errorLevel = 2;
        }
        else {
            throw new Error('[CRITICAL] [PARSE] Illegal value for errorLevel ( ' + opts.attr('errorLevel') + ' )');
        }
    }
}
Act.inherit(OptGetters, {
    errorLevel: null,

    // exec() is what is called when an action is executed by a ScriptingEvent
    exec: function() {
        throw new Error('[CRITICAL] [RUNTIME] [SYSTEM] Subclass of Act must override exec()');
    },
    
    hasErrorLevel: function() {
        return (this.errorLevel != null);
    }
});

//***********************************************/

// Handles all forms of audio interaction from the scripting engine
var AudioAct = function(opts) {
    AudioAct.superclass.constructor.call(this, opts);
    this.type = $(opts).prop("tagName");
    this.getOpt('contentID', opts);
    
    if(this.type == 'PlayAudio') {
        this.mode = 'play';
    }
    else if(this.type == 'LoopAudio') {
        this.mode = 'loop';
    }
    else if(this.type == 'StopAudio') {
        this.mode = 'stop';
    }
    else if(this.type == 'AudioVolume') {
        this.mode = 'volume';
        this.getFloat('volume', opts);
        if(this.volume < 0 || 1 < this.volume) {
            throw new Error('[CRITICAL] [PARSE] AudioAct volume is out of valid range [0, 1] ( ' + this.volume + ' )')
        }
    }
    else {
        throw new Error('[CRITICAL] [PARSE] Invalid AudioAct mode value ( ' + this.mode + ' )')
    }
}
AudioAct.inherit(Act, {
    contentID   : '',       // String that references the track to be accessed
    mode        : false,    // String that represents what specific audio action to perform
    volume      : 1,        // For volume actions, the level of volume to set
    
    exec: function() {
        events.trigger(eventRelay, 'AudioEvent', this.contentID, this.mode, this.volume);
    }
});

//***********************************************/

// Calls any arbitrary function on the ScriptingSystem object
var CallFunctionAct = function(opts) {
    CallFunctionAct.superclass.constructor.call(this, opts);
    this.getOpt('func', opts);
    this.params = [];
    
	var map = {};
	var attributes = opts[0].attributes;
	var aLength = attributes.length;
	
	for (a = 0; a < aLength; a++) {
		map[attributes[a].name] = attributes[a].value;
	}
	
    for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
            this.params.push(map[prop])
        }
    }
}
CallFunctionAct.inherit(Act, {
    func    : null,
    params  : null,
    
    exec: function() {
        events.trigger(eventRelay, 'CallFunctionEvent', this.func, this.params);
    }
});

//***********************************************/

// Do not subclass DelayAct, it is a special case Action
var DelayAct = function(opts) {
    DelayAct.superclass.constructor.call(this, opts);
    this.getOpt('duration', opts);
    this.duration *= 1000;
}
DelayAct.inherit(Act, {
    duration    : 0,    // Duration of the delay in milliseconds
    
    // As DelayAct never 'executes', its exec() throws an error when called
    exec: function() {
        throw new Error('[CRITICAL] [RUNTIME] [SYSTEM] exec() should never be called for DelayAct');
    }
});

//***********************************************/

// Handles 'DeactivateRule', 'ReactivateRule' and 'TriggerRule'
var EventAct = function(opts) {
    EventAct.superclass.constructor.call(this, opts);
    this.getOpt('ruleID', opts);
    this.type = $(opts).prop("tagName");
    
    // Validate type parameter
    if(this.type != 'ReactivateRule' && this.type != 'DeactivateRule'
    && this.type != 'TriggerRule' && this.type != 'AbortRule'
    && this.type != 'BlockEvent' && this.type != 'ResumeEvent') {
        throw new Error('Invalid value for EventAct\'s type ( ' + this.type + ' )');
    }
}
EventAct.inherit(Act, {
    ruleID : null,     // ruleID that will be modified
    type    : null,     // The type of modification that will occur
    
    // Trigger an event to tell the ScriptingSystem to modify the specified event
    exec: function() {
        events.trigger(eventRelay, this.type + 'Event', this.ruleID);
    }
});

//***********************************************/

// Use this Action for Actions who only need is to trigger an event for something else to act on
// instead of always creating a new Act which only calls an events.trigger()
//TODO: Figure out how to implement in revised version
var GeneralPurposeAct = function(opts) {
    GeneralPurposeAct.superclass.constructor.call(this, opts);
    this.type = $(opts).prop("tagName");
}
GeneralPurposeAct.inherit(Act, {
    exec: function() {
        events.trigger(eventRelay, this.type + 'Event');
    }
});

//***********************************************/

// Hides the object on screen with the specified contentID
var HideContentAct = function(opts) {
    HideContentAct.superclass.constructor.call(this, opts);
    this.getOpt('contentID', opts);
}
HideContentAct.inherit(Act, {
    contentID   : null,
    
    exec: function() {
        events.trigger(eventRelay, 'HideContentEvent', this.contentID);
    }
});

//***********************************************/

// Tells the ScriptingSystem to load an audio track
var LoadAudioAct = function(opts) {
    LoadAudioAct.superclass.constructor.call(this, opts);
    this.getOpt('contentID', opts);
    this.getOpt('source', opts);
}
LoadAudioAct.inherit(Act, {
    contentID   : null,     // The string for referencing the audio track from the AudioMixer
    source      : null,     // The source location for the audio track
    
    exec: function() {
        this.trigger(eventRelay, 'LoadAudioEvent', this.contentID, this.source);
    }
});

//***********************************************/

// Tells the ScriptingSystem to load an image
var LoadImageAct = function(opts) {
    LoadImageAct.superclass.constructor.call(this, opts);
    this.getOpt('resourceID', opts);
    this.getOpt('source', opts);
}
LoadImageAct.inherit(Act, {
    resourceID  : null,     // The string for referencing the image once loaded
    source      : null,     // The source location for the image
    
    exec: function() {
        var img = new Image()
        __jah__.resources[this.resourceID] = {url: this.source, path: this.resourceID};
        __jah__.resources[this.resourceID].data = img;
        
        img.onload = function () {
            __jah__.resources[this.resourceID].loaded = true;
            events.trigger(eventRelay, 'RemoteLoadEvent', this.resourceID, this.source);
        }.bind(this)
        
        img.onerror = function () {
            this.generateError('[RUNTIME] [REMOTE] Failed to load resource: ' + this.resourceID + ' from ' + this.source);
        }.bind(this)
        
        img.src = this.source;
    }
});

//***********************************************/

var LoadAnimationAct = function(opts) {
    LoadAnimationAct.superclass.constructor.call(this, opts);
    this.getOpt('resourceID', opts);
    this.getOpt('source', opts);
    this.getInt('frameWidth', opts);
    this.getInt('frameHeight', opts);
    this.getInt('frames', opts);
    
    if(opts.attr('fps')) {
        this.getInt('fps', opts);
        this.frameDelay = 1.0 / this.fps;
        
        if(opts.attr('frameDelay')) {
            throw new Error('[CRITICAL] [PARSE] LoadAnimationAct cannot have both "fps" and "frameDelay"');
        }
    }
    else if(opts.attr('frameDelay')) {
        this.getFloat('frameDelay', opts);
    }
    else {
        throw new Error('[CRITICAL] [PARSE] LoadAnimationAct requires one of either "fps" or "frameDelay"');
    }
}
LoadAnimationAct.inherit(Act, {
    resourceID  : null,     // The string for referencing the image once loaded
    source      : null,     // The source location for the image
    frameWidth  : null,     // Width of each individual frame
    frameHeight : null,     // Height of the frame strip -- TODO: Allow for multiline || infer this for single line
    frames      : null,     // Number of frames in the animation
    frameDelay  : null,     // The delay in seconds between each frame
    fps         : null,     // Number of frames to be displayed per second, used to calculate frameDelay
    
    exec: function() {
        var img = new Image()
        __jah__.resources[this.resourceID] = {url: this.source, path: this.resourceID};
        __jah__.resources[this.resourceID].data = img;
        
        img.onload = function () {
            __jah__.resources[this.resourceID].loaded = true;
            
            var anim = [];
            var texture = new Texture2D({file: module.dirname + this.resourceID});
            for(var i=0; i<this.frames; i++) {
                anim.push(new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(i*this.frameWidth, 0, this.frameWidth, this.frameHeight)}));
            }
            
            __jah__.resources[this.resourceID].data = new cocos.Animation({frames: anim, delay: this.frameDelay});
            
            events.trigger(eventRelay, 'RemoteLoadEvent', this.resourceID, this.source);
        }.bind(this)
        
        img.onerror = function () {
            this.generateError('[RUNTIME] [REMOTE] Failed to load resource: ' + this.resourceID + ' from ' + this.source);
        }.bind(this)
        
        img.src = this.source;
    }
});

//***********************************************/

// Execute the specified Subroutine
var CallSubroutineAct = function (opts) {
    CallSubroutineAct.superclass.constructor.call(this, opts);
    this.getOpt('subroutineID', opts);
}
CallSubroutineAct.inherit(Act, {
    subroutineID: '',
    
    exec: function() {
        events.trigger(eventRelay, 'CallSubroutine', this.subroutineID);
    }
});

//***********************************************/

// Sets the specified variable to the specified value
var SetVarAct = function (opts) {
    SetVarAct.superclass.constructor.call(this, opts);
    this.getOpt('name', opts);
    
    this.getOpt('val', opts);
    // Check to see if value can be parsed as a number
    var temp = parseFloat(this.val);
    if(!isNaN(temp)) {
        this.val = temp;
    }
    // Otherwise it is string, check for boolean values
    else if(this.val == 'true') {
        this.val = true;
    }
    else if(this.val == 'false') {
        this.val = false;
    }
    
    // Only worry about the internal property if it is present
    if(opts.attr('internal')) {
        this.getBoolean('internal', opts, 'true', 'false');
    }
    
    // If this is not specified as interal, assume the scripter is accessing ss_vars
    if(!this.internal) {
        this.name = 'ss_vars.' + this.name;
    }
}
SetVarAct.inherit(Act, {
    name    : null,     // Holds the name of the variable to set
    val     : null,     // Holds the value to set the variable to
    internal: false,    // When true, do not assume ss_vars placement
    
    exec: function() {
        events.trigger(eventRelay, 'SetVarEvent', this.name, this.val);
    }
});

//***********************************************/

// Sets the specified variable to the specified variable with an optionable modification
var SetRelVarAct = function (opts) {
    SetRelVarAct.superclass.constructor.call(this, opts);
    this.getOpt('name', opts);
    
    // Parse source variable if present, otherwise default to the result variable
    if(opts.attr('val')) {
        this.getOpt('val', opts);
    }
    else {
        this.val = this.name;
    }
    
    // Detect and parse optional operator/modifier if present
    if(opts.attr('mod')) {
        this.getOpt('mod', opts);
        var temp = parseFloat(this.mod);
        if(!isNaN(temp)) {
            this.mod = temp;
        }
        
        this.getOpt('op', opts);
        
        if(!(this.op in ScriptingSystem.ops)) {
            throw new Error('[CRITICAL] [PARSE] Unrecognized operator ( ' + this.opt + ' )');
        }
    }
    else if(opts.attr('op')) {
        throw new Error('[CRITICAL] [PARSE] SetRelVarAct has op attribute with no mod attribute');
    }
    
    // Only worry about the internal property if it is present
    if(opts.attr('internal')) {
        this.getBoolean('internal', opts, 'true', 'false');
    }
    
    // If this is not specified as interal, assume the scripter is accessing ss_vars
    if(!this.internal) {
        this.name = 'ss_vars.' + this.name;
        this.val  = 'ss_vars.' + this.val;
    }
}
SetRelVarAct.inherit(Act, {
    name    : null,     // Holds the name of the variable to set
    val     : null,     // Holds the name of the variable to copy the value from
    op      : null,     // Operation with which to combine the values + - * / %
    mod     : 0,        // Optional amount to modify the second variable
    internal: false,    // When true, do not assume ss_vars placement
    
    exec: function() {
        if(this.mod == 0) {
            events.trigger(eventRelay, 'SetRelVarEvent', this.name, this.val);
        }
        else {
            events.trigger(eventRelay, 'SetRelVarEvent', this.name, this.val, this.op, this.mod);
        }
    }
});

//***********************************************/

// Performs an operation on two variables and stores the result
var CombineVarsAct = function(opts) {
    CombineVarsAct.superclass.constructor.call(this, opts);
    this.getOpt('name', opts);
    this.getOpt('other1', opts);
    this.getOpt('other2', opts);
    this.getOpt('op');
    
    if(!(this.op in ScriptingSystem.ops)) {
        throw new Error('[CRITICAL] [PARSE] Unrecognized operator ( ' + this.opt + ' )');
    }
    
    // Only worry about the internal property if it is present
    if(opts.attr('internal')) {
        this.getBoolean('internal', opts, 'true', 'false');
    }
    
    // If this is not specified as interal, assume the scripter is accessing ss_vars
    if(!this.internal) {
        this.name = 'ss_vars.' + this.name;
        this.other1  = 'ss_vars.' + this.other1;
        this.other2  = 'ss_vars.' + this.other2;
    }
}
CombineVarsAct.inherit(Act, {
    name    : null,     // Holds the name of the variable to set
    other1  : null,     // Name of the first variable to combine
    other2  : null,     // Name of the second variable to combine
    op      : null,     // Operation with which to combine the variables + - * / %
    internal: false,    // When true, do not assume ss_vars placement
    
    exec: function() {
        events.trigger(eventRelay, 'CombineVarsEvent', this.name, this.other1, this.other2, this.op);
    }
});

//***********************************************/

// Displays a button to the screen
// ButtonInputTrigger listens for these buttons based on their 'contentID'
var ShowButtonAct = function(opts) {
    ShowButtonAct.superclass.constructor.call(this, opts);
    // Get all required values from the opts parameter
    this.getOpt('resourceUp', opts);
    this.getOpt('resourceDown', opts);
    this.getOpt('contentID', opts);
    this.getInt('x', opts);
    this.getInt('y', opts);
    
    if(opts.attr('parent')) {
        this.getOpt('parent', opts);
    }
    
    // Create parameter object for MenuItemImage constructor
    this.params = this.optionalConverter(opts);
    this.params['normalImage'] = this.resourceUp;
    this.params['selectedImage'] = this.resourceDown;
    this.params['disabledImage'] = this.resourceUp;
    this.params['callback'] = this.callback.bind(this);
}
ShowButtonAct.inherit(Act, {
    resourceUp  : null,     // Image resource for the unpressed button
    resourceDown: null,     // Image resource for the depressed button
    contentID   : null,     // String to reference button with in scripting content tracking dictionary
    x           : null,     // X screen coordinate
    y           : null,     // Y screen coordinate
    parent      : null,     // Parent node that the content will be a child of, null defaults to ss_dynamicNode
    params      : null,     // Parameter object for MenuItemImage constructor
    
    // Create the button and fire an event for the ScriptingSystem to display it
    exec: function() {
        var btn = new cocos.nodes.MenuItemImage(this.params);
        // Normalize coordinates from menu space (0,0 center) to layer space (0,0 lower left corner)
        var s = cocos.Director.sharedDirector.winSize;
        btn.position = new geo.Point(this.x - s.width / 2, this.y - s.height / 2);
        
        if(this.params.scaleX) {
            btn.scaleX = this.params.scaleX;
        }
        if(this.params.scaleY) {
            btn.scaleY = this.params.scaleY;
        }
        
        var menu = new cocos.nodes.Menu({items: [btn]});
        
        events.trigger(eventRelay, 'ShowButtonEvent', this.contentID, menu);
    },
    
    // Handles the button being pressed by the player
    callback: function() {
        events.trigger(eventRelay, 'ButtonInputEvent', this.contentID, this.parent);
    }
});

//***********************************************/

// Displays an image on the screen
var ShowImageAct = function(opts) {
    ShowImageAct.superclass.constructor.call(this, opts);
    
    // Get all required values from the opts parameter
    this.getOpt('resource', opts);
    this.getOpt('contentID', opts);
    this.getInt('x', opts);
    this.getInt('y', opts);
    
    if(opts.attr('parent')) {
        this.getOpt('parent', opts);
    }
    
    // Create parameter object for Sprite constructor
    this.params = this.optionalConverter(opts);
    this.params['file'] = this.resource;
}
ShowImageAct.inherit(Act, {
    resource    : null,     // Image resource to display
    contentID   : null,     // String to reference button with in scripting content tracking dictionary
    x           : null,     // X screen coordinate
    y           : null,     // Y screen coordinate
    parent      : null,     // Parent node that the content will be a child of, null defaults to ss_dynamicNode
    params      : null,     // Parameter object for Sprite constructor
    
    // Create the image and fire an event for the ScriptingSystem to display it
    exec: function() {
        var img = new cocos.nodes.Sprite(this.params);
        img.position = new geo.Point(this.x, this.y);
        
        if(this.params.scaleX) {
            img.scaleX = this.params.scaleX;
        }
        if(this.params.scaleY) {
            img.scaleY = this.params.scaleY;
        }
        
        events.trigger(eventRelay, 'ShowImageEvent', this.contentID, img, this.parent);
    }
});

//***********************************************/

// Displays a string on the screen
var ShowMessageAct = function(opts) {
    ShowMessageAct.superclass.constructor.call(this, opts);
    
    // Get all required values from the opts parameter
    this.getOpt('message', opts);
    this.getOpt('contentID', opts);
    this.getInt('x', opts);
    this.getInt('y', opts);
    
    if(opts.attr('parent')) {
        this.getOpt('parent', opts);
    }
    
    // Create parameter object for Label constructor
    this.params = this.optionalConverter(opts);
    this.params['string'] = this.message;
}
ShowMessageAct.inherit(Act, {
    message     : null,     // String to be written on the screen
    contentID   : null,     // String to reference button with in scripting content tracking dictionary
    x           : null,     // X screen coordinate
    y           : null,     // Y screen coordinate
    parent      : null,     // Parent node that the content will be a child of, null defaults to ss_dynamicNode
    params      : null,     // Parameter object for Label constructor
    
    // Create the text and fire an event for the ScriptingSystem to display it
    exec: function() {
        var msg = new cocos.nodes.Label(this.params);
        msg.position = new geo.Point(this.x, this.y);
        
        if(this.params.scaleX) {
            msg.scaleX = this.params.scaleX;
        }
        if(this.params.scaleY) {
            msg.scaleY = this.params.scaleY;
        }
        
        events.trigger(eventRelay, 'ShowMessageEvent', this.contentID, msg, this.parent);
    }
});

//***********************************************/

// Plays or loops an animation on the screen
var PlayAnimationAct = function(opts) {
    PlayAnimationAct.superclass.constructor.call(this, opts);
    
    this.getOpt('resource', opts);
    this.getOpt('contentID', opts);
    this.getInt('x', opts);
    this.getInt('y', opts);
    
    if(opts.attr('loop')) {
        this.getBoolean('loop', opts, 'true', 'false');
    }
    
    if(opts.attr('parent')) {
        this.getOpt('parent', opts);
    }
}
PlayAnimationAct.inherit(Act, {
    resource    : null,     // Image resource to display
    contentID   : null,     // String to reference animation with in scripting content tracking dictionary
    x           : null,     // X screen coordinate
    y           : null,     // Y screen coordinate
    loop        : false,    // When true, the animation loops until told to stop
    parent      : null,     // Parent node that the content will be a child of, null defaults to ss_dynamicNode
    
    exec: function() {
        var anim = new cocos.actions.Animate({animation: __jah__.resources[this.resource].data, restoreOriginalFrame: false});
    
        if(this.loop) {
            anim = new cocos.actions.RepeatForever(anim);
        }
        
        events.trigger(eventRelay, 'PlayAnimationEvent', this.contentID, anim, new geo.Point(this.x, this.y), this.parent);
    }
});

//***********************************************/

// NOTE: Stopping an animation does NOT hide it, use HideContent to remove an animation from the screen
var StopAnimationAct = function(opts) {
    StopAnimationAct.superclass.constructor.call(this, opts);
    
    this.getOpt('contentID', opts);
    
    if(opts.attr('parent')) {
        this.getOpt('parent', opts);
    }
}
StopAnimationAct.inherit(Act, {
    contentID   : null,     // String to reference animation with in scripting content tracking dictionary
    parent      : null,     // Parent node of the content, null defaults to ss_dynamicNode
    
    exec: function() {
        events.trigger(eventRelay, 'StopAnimationEvent', this.contentID, this.parent);
    }
});

//***********************************************/

var MoveContentAct = function(opts) {
    MoveContentAct.superclass.constructor.call(this, opts);
    
    this.getOpt('contentID', opts);
    this.getInt('x', opts);
    this.getInt('y', opts);
    
}
MoveContentAct.inherit(Act, {
    contentID   : null,     // String to reference button with in scripting content tracking dictionary
    x           : null,     // X screen coordinate
    y           : null,     // Y screen coordinate
    
    exec: function() {
        events.trigger(eventRelay, 'MoveContentEvent', this.contentID, new geo.Point(this.x, this.y));
    }
});

//***********************************************/

var PrintfAct = function(opts) {
    PrintfAct.superclass.constructor.call(this, opts);
    // Remove the type value from the opts object
    delete opts['type'];
    
    // Get all required values from the opts parameter
    this.getOpt('message', opts);
    this.getOpt('contentID', opts);
    this.getInt('x', opts);
    this.getInt('y', opts);
    
    var i=1;
    this.args = [];
    while(opts.attr('arg' + i)) {
        this.args.push(opts['arg' + i]);
        delete opts['arg' + i];
        i+=1;
    }
    
    this.params = this.optionalConverter(opts);
    this.params['string'] = this.message;
}
PrintfAct.inherit(Act, {
    message     : null,     // String to be written on the screen
    contentID   : null,     // String to reference button with in scripting content tracking dictionary
    x           : null,     // X screen coordinate
    y           : null,     // Y screen coordinate
    args        : null,     // 
    params      : null,     // Parameter object for Label constructor
    
    exec: function() {
        var msg = new cocos.nodes.Label(this.params);
        msg.position = new geo.Point(this.x, this.y);
        
        events.trigger(eventRelay, 'PrintfEvent', this.contentID, msg, this.args);
    }
});

//***********************************************/

// Allows for basic IF-ELSE
var ConditionalAct = function(opts) {
    // Build initial if
    ConditionalAct.superclass.constructor.call(this, opts);
    opts.attr('ruleID', 'ConditionalAct');
    this.evt = [new ConditionalEvent(opts)];
    
    // Build else-if blocks, if present
    var elif = opts.children("ELSEIF");
    var that = this;
    elif.each(function() {
        $(this).attr('ruleID', 'ConditionalAct');
        that.evt.push(new ConditionalEvent($(this)));
    });
    
    // Build else case, if present
    var eCase = opts.children("ELSE");
    
    if(eCase.length > 1) {
        throw new Error("[CRITICAL] {PARSE] Conditional Actions may only have a single ELSE block.");
    }
    else if(eCase.length == 1) {
        $(eCase).attr('ruleID', 'ConditionalAct');
        that.elseCase = new ElseEvent($(eCase));
    }
}
ConditionalAct.inherit(Act, {
    evt     : null, // List of IF-ELSE ScriptingEvents
    elseCase: null,

    exec: function() {
        var i=0
        // Interate over ScriptingEvents until one is satisfied (IF-ELSEIF...)
        while(i<this.evt.length) {
            if(this.evt[i].check()) {
                this.evt[i].exec();
                return;
            }
            i+=1
        }
        
        if(this.elseCase) {
            this.elseCase.exec();
        }
        
    },
    
    kill: function() {
        events.clearInstanceListeners(this);
		$.each(this.evt, function() {
			this.kill();
		});
    }
});

//***********************************************/

var IncludeAct = function(opts) {
    IncludeAct.superclass.constructor.call(this, opts);
    this.getOpt('path', opts);
    this.getBoolean('preload', opts, 'true', 'false');
    
    if(this.preload) {
        var that = this;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', this.path, true);
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4) {
                that.file = xmlhttp.responseXML; 
            }
        }
        xmlhttp.send(null);
    }
}
IncludeAct.inherit(Act, {
    oneShot : false,    // Includes may only fire once
    path    : null,     // Path to the scripting xml file to include
    preload : false,    // When true, the xml file will be preloaded, and executing the action will immediately load the script
    file    : null,     // Holds the loaded XML

    exec: function() {
        if(this.oneShot) {
            //TODO: Make non-critical
            throw new Error('[CRITICAL] [RUNTIME] An IncludeAct can only ever be executed once');
        }
        
        if(this.file === null && !this.preload) {
            var that = this;
            $.get(this.path, function(data) {
                that.file = data;
                that.trigger(data);
            });
        }
        else {
            this.trigger(this.file);
        }
        
        this.oneShot = true;
        
    },
    
    trigger: function(xml) {
        var child = $(xml).find('SCRIPTING')[0];
        events.trigger(eventRelay, 'IncludeEvent', child);
        events.trigger(eventRelay, 'IncludeTriggerRule', this.path);
    }
});

// Triggers ////////////////////////////////////////////////////////////////////////////////////////

// Abstract base class for Triggers
var Trigger = function(opts) {
    Trigger.superclass.constructor.call(this, opts);
}
Trigger.inherit(OptGetters, {
    // Called to determine if Trigger is satisified (returns true if so, false otherwise)
    // Must be overridden by subclasses
    check: function() {
        throw new Error('[CRITICAL] [RUNTIME] [SYSTEM] Trigger subclasses must override check()');
    }
});

//***********************************************/

// Provides the constructor for And, Not, Or and Xor
var LogicTrigger = function(opts, min, max) {
    LogicTrigger.superclass.constructor.call(this, opts);
    this.triggers = [];
    
    // Retrieve the list of Triggers
    var t = $(opts).children();
    
    // Make sure we have a legal number of Triggers
    if(min > t.length || t.length > max) {
        throw new Error('[CRITICAL] [PARSE] ' + $(opts).prop('tagName') + ' <LogicTrigger> requires between ' + min + ' and ' + max + ' Triggers ( ' + t.length + ' )');
    }
    
    // Create Triggers
    var that = this;
    t.each(function() {
        var type = $(this).prop('tagName');
        
        if(!ScriptingSystem.triggerMap.hasOwnProperty(type)) {
            console.log('Unsupported Trigger detected ( ' + type + ' )');
        }
        
        that.triggers.push(new ScriptingSystem.triggerMap[type]($(this)));
    });
}
LogicTrigger.inherit(Trigger, {
    triggers: null,
    
    kill: function() {
        events.clearInstanceListeners(this);
		$.each(this.triggers, function() {
			this.kill();
		});
    }
});

//***********************************************/

// Only allowed a single sub-Trigger, returns the inverse of the Trigger
var NotTrigger = function(opts) {
    AndTrigger.superclass.constructor.call(this, opts, 1, 1);
}
NotTrigger.inherit(LogicTrigger, {
    check: function() {
        return (!(this.triggers[0].check()));
    }
});

//***********************************************/

// Returns true only if all of the sub-Triggers are true
var AndTrigger = function(opts) {
    AndTrigger.superclass.constructor.call(this, opts, 2, 99);
}
AndTrigger.inherit(LogicTrigger, {
    check: function() {
        var i=0;
        while(i<this.triggers.length) {
            if(!this.triggers[i].check()) {
                return false;
            }
            i += 1;
        }
        
        return true;
    }
});

//***********************************************/

// Returns true so long as at least one of the sub-Triggers is true
var OrTrigger = function(opts) {
    OrTrigger.superclass.constructor.call(this, opts, 2, 99);
}
OrTrigger.inherit(LogicTrigger, {
    check: function() {
        var i=0;
        while(i<this.triggers.length) {
            if(this.triggers[i].check()) {
                return true;
            }
            i += 1;
        }
        
        return false;
    }
});

//***********************************************/

// Must have exactly two sub-Triggers, returns true if one is true and the other is not
var XorTrigger = function(opts) {
    XorTrigger.superclass.constructor.call(this, opts, 2, 2);
}
XorTrigger.inherit(LogicTrigger, {
    check: function() {
        var a = this.triggers[0].check();
        var b = this.triggers[1].check();
        
        return ((a && !b) || (!a && b));
    }
});

//***********************************************/

// Takes no parameters and is always true
var AutoTrigger = function(opts) {
    AutoTrigger.superclass.constructor.call(this, opts);
}
AutoTrigger.inherit(Trigger, {
    check: function() {
        return true;
    }
});

//***********************************************/

// Triggers when a Button created through ShowButton with the specified contentID is pressed
var ButtonInputTrigger = function(opts) {
    ButtonInputTrigger.superclass.constructor.call(this, opts);
    this.getOpt('buttonID', opts);
    
    events.addListener(eventRelay, 'ButtonInputEvent', this.handle.bind(this));
}
ButtonInputTrigger.inherit(Trigger, {
    buttonID: null,     // The buttonID that this Trigger listens for
    pressed : false,    // true when the button has been pressed
    
    // Checks to see if the bound button was pressed in this or the previous frame
    check: function() {
        if(!this.pressed) {
            return false;
        }
        this.pressed = false;
        return true;
    },
    
    // Checks to see if the button that was just pressed is the one this Trigger is bound to
    handle: function(id) {
        if(this.buttonID == id) {
            this.pressed = true;
            setTimeout(this.buffer.bind(this), 1);
        }
    },
    
    // Introduces at least a one full frame delay, making sure that this Trigger can be adaquetly check()'ed
    buffer: function() {
        setTimeout(this.negatePress.bind(this), 1);
    },
    
    // Ignores the button's press
    negatePress: function() {
        this.pressed = false;
    }
});

//***********************************************/

// Triggers based on the value of a variable relative to a constant
var CheckVarTrigger = function(opts) {
    CheckVarTrigger.superclass.constructor.call(this, opts);
    this.getOpt('name', opts);
    this.getOpt('op', opts);
    
    if(!(this.op in CheckVarTrigger.ops)) {
        throw new Error('[CRITICAL] [PARSE] Unrecognized comparison operator ( ' + this.op + ' )');
    }
    
    this.getOpt('val', opts);
    // Check to see if value can be parsed as a number
    var temp = parseFloat(this.val);
    if(!isNaN(temp)) {
        this.val = temp;
    }
    // Otherwise it is string, check for boolean values
    else if(this.val == 'true') {
        this.val = true;
    }
    else if(this.val == 'false') {
        this.val = false;
    }
    
    // Only worry about the internal property if it is present
    if(opts.attr('internal')) {
        this.getBoolean('internal', opts, 'true', 'false');
    }
    
    // If this is not specified as interal, assume the scripter is accessing ss_vars
    if(!this.internal) {
        this.name = 'ss_vars.' + this.name;
    }
    
    // Check to see if we are comparing two variables
    if(opts.attr('twoVar')) {
        this.getBoolean('twoVar', opts, 'true', 'false');
        
        if(!this.internal) {
            this.val = 'ss_vars.' + this.val;
        }
    }
}
CheckVarTrigger.inherit(Trigger, {
    name    : null,     // Name of variable to check
    op      : '',       // == === != !== > < >= <=
    val     : null,     // Value to compare against
    twoVar  : false,    // When true, use val as a second variable to check against
    internal: false,    // When true, do not assume ss_vars placement
    
    check: function() {
        var firstVar = CheckVarTrigger.get(this.name)
        var secondVar = this.val;
        if(this.twoVar) {
            secondVar = CheckVarTrigger.get(this.val);
        }
        
        return CheckVarTrigger.ops[this.op].call(this, firstVar, secondVar);
    }
});

CheckVarTrigger.get = null;     // Stores the get function for accessing variables
CheckVarTrigger.ops = {         // Stores operator functions by their string representation
    '==' : function (a, b) { return a ==  b; },
    '===': function (a, b) { return a === b; },
    '!=' : function (a, b) { return a !=  b; },
    '!==': function (a, b) { return a !== b; },
    '>'  : function (a, b) { return a >   b; },
    '<'  : function (a, b) { return a <   b; },
    '>=' : function (a, b) { return a >=  b; },
    '<=' : function (a, b) { return a <=  b; }
}

//***********************************************/

//TODO: Requires interrupt system to be designed/implemented
var ErrorTrigger = function(opts) {
    ErrorTrigger.superclass.constructor.call(this, opts);
}
ErrorTrigger.inherit(Trigger, {
    check: function() {
        return false;
    }
});

//***********************************************/

// Triggers anytime after the specified xml path has been included
var IncludeTrigger = function(opts) {
    IncludeTrigger.superclass.constructor.call(this, opts);
    this.getOpt('path', opts);
    events.addListener(eventRelay, 'IncludeTriggerRule', this.handle.bind(this));
}
IncludeTrigger.inherit(Trigger, {
    path        : null,     // Path of included file that this will trigger on
    included    : false,    // True once the file has been included
    
    check: function() {
        return this.included;
    },
    
    handle: function(path) {
        if(this.path == path) {
            this.included = true;
        }
    }
});

//***********************************************/

// Triggers based on keyboard input
var KeyTrigger = function(opts) {
    KeyTrigger.superclass.constructor.call(this, opts);
    this.getOpt('key', opts);
    if(this.key.length == 1) {
        this.key = this.key.toUpperCase();
        this.key = this.key.charCodeAt(0);
    }
    // Treat as int if keyVal is true (i.e. providing actual keyCode)
    else {
        this.key = parseInt(this.key);
        if(isNaN(this.key)) {
            throw new Error('[CRITICAL] [PARSE] KeyTrigger\'s length != 1 and key resolves to NaN with parseInt');
        }
    }
    
    this.getBoolean('state', opts, 'down', 'up');
}
KeyTrigger.inherit(Trigger, {
    key     : -1,       // Character code for the triggering key
    state   : null,     // When true, triggers on key down, and when false, triggers on key up
    keyVal  : false,    // When true, signals that the load value for key is a key code
    
    check: function() {
        if(KeyTrigger.keys) {
            return ((KeyTrigger.keys[this.key] == 2 && this.state) || (KeyTrigger.keys[this.key] == 1 && !this.state));
        }
    }
});

KeyTrigger.keys = null;

//***********************************************/

var RemoteLoadTrigger = function(opts) {
    RemoteLoadTrigger.superclass.constructor.call(this, opts);
    this.getOpt('resourceID', opts);
    
    events.addListener(eventRelay, 'RemoteLoadEvent', this.handle.bind(this));
}
RemoteLoadTrigger.inherit(Trigger, {
    resourceID  : '',       // Name of this trigger
    state       : false,    // If this trigger has been activated
    
    // Checks to see if the the trigger has fired and reset if it does not toggle
    check: function() {
        return this.state;
    },
    
    // Checks the id against the triggerID and handles the toggle value
    handle: function(id) {
        if(this.resourceID == id) {
            this.state = true;
        }
    }
});

//***********************************************/

// Triggers after a certain amount of time has elapsed since either the ScriptingSystem or the game stated
var TimeTrigger = function(opts) {
    TimeTrigger.superclass.constructor.call(this, opts);
    this.getFloat('duration', opts);
    this.getBoolean('timer', opts, 'game', 'system');
}
TimeTrigger.inherit(Trigger, {
    duration: null, // Duration in seconds that must elapse before this Trigger triggers
    timer   : null, // Use gameTime when true, systemTime when false
    
    // Checks to see if the required amount of time has elapsed
    check: function() {
        if(this.timer) {
            return (this.duration < TimeTrigger.gameTime);
        }
        return (this.duration < TimeTrigger.systemTime);
    }
});

TimeTrigger.gameTime = 0;
TimeTrigger.systemTime = 0;

// ConditionalEvent ////////////////////////////////////////////////////////////////////////////////

ConditionalEvent = function(xml) {
    // Initialize values
    this.triggers = [];
    this.actions = [];
    
    // Retrieve a list of Triggers and Actions
    var t = $(xml).children('TRIGGERS');
    var a = $(xml).children('ACTIONS');
    
    // Make sure we have at least one of each so that the Event is valid
    if(t.length != 1) {
        throw new Error('[CRITICAL] [PARSE] Event requires exactly one Trigger block');
    }
    if(a.length != 1) {
        throw new Error('[CRITICAL] [PARSE] Event requires exactly one Action block');
    }
    
    var that = this;
    t.children().each(function() {
        var type = $(this).prop('tagName');
        
        if(!ScriptingSystem.triggerMap.hasOwnProperty(type)) {
            console.log('Unsupported Trigger detected ( ' + type + ' )');
        }
        
        that.triggers.push(new ScriptingSystem.triggerMap[type]($(this)));
    });
    
    a.children().each(function() {
        var type = $(this).prop('tagName');
        
        if(!ScriptingSystem.actionMap.hasOwnProperty(type)) {
            console.log('Unsupported Action detected ( ' + type + ' )');
        }
        else if(type == 'Delay' && that.endTrans) {
            throw new Error('[CRITICAL] [PARSE] Delay cannot be used inside of a Conditional or ELSEIF');
        }
        
        that.actions.push(new ScriptingSystem.actionMap[type]($(this)));
    });
    
    if(xml.attr('errorLevel')) {
        if(xml.attr('errorLevel') == 'error') {
            this.errorLevel = 0;
        }
        else if(xml.attr('errorLevel') == 'warn') {
            this.errorLevel = 1;
        }
        else if(xml.attr('errorLevel') == 'ignore') {
            this.errorLevel = 2;
        }
        else {
            throw new Error('[CRITICAL] [PARSE] Illegal value for errorLevel ( ' + xml.attr('errorLevel') + ' )');
        }
    }
    else {
        this.errorLevel = 0;
    }
}
ConditionalEvent.inherit(Object, {
    triggers: null,     // List of triggers required to be true
    actions : null,     // Sequential list of actions
    
    execNum : 0,        // Current action in the list of actions that is being executed
    
    errorLevel: 0,      // 0: Error, 1: Warn, 2: Ignore
    curErrorLevel: 0,   //
    
    // Used to clean up and remove events permenantly
    kill: function() {
        events.clearInstanceListeners(this);
		$.each(this.triggers, function() {
			this.kill();
		});
		$.each(this.actions, function() {
			this.kill();
		});
    },
    
    // Returns true if all triggers are true
    check: function() {
        var i = 0;
        while(i < this.triggers.length) {
            if(!this.triggers[i++].check()) {
                return false;
            }
        }
        
        return true;
    },
    
    // Executes all actions
    exec: function() {
        this.setErrorLevel();
        while(this.execNum < this.actions.length) {
            this.actions[this.execNum++].exec();
        }
        this.execNum = 0;
    },
    
    setErrorLevel: function() {
        var er = this.actions[this.execNum].hasErrorLevel() ? this.actions[this.execNum].errorLevel : this.errorLevel;
        events.trigger(this, 'ErrorLevelEvent', er);
        this.curErrorLevel = er;
    },
    
    // Handles error generation for runtime error (parsing errors are always thrown)
    generateError: function(str) {
        if(this.curErrorLevel == 0) {
            throw new Error('[RUNTIME] ' + str);
        }
        else if(this.curErrorLevel == 1) {
            console.log('[RUNTIME] WARNING: ' + str);
        }
        else if(this.curErrorLevel != 2) {
            throw new Error('[RUNTIME] [CRITICAL] Error generated and handled with an invalid errorLevel ( ' + this.errorLevel + ' )');
        }
    }
});

// Special case of ConditionalEvent used for ELSE blocks
ElseEvent = function(xml) {
    this.actions = [];
    var t = $(xml).children('TRIGGERS');
    var a = $(xml).children('ACTIONS');
    
    // Make sure we have at least one of each so that the Event is valid
    if(t.length != 0) {
        throw new Error('[CRITICAL] [PARSE] ELSE block cannot have any Trigger blocks');
    }
    if(a.length != 1) {
        throw new Error('[CRITICAL] [PARSE] ELSE block requires exactly one Action block');
    }
    
    var that = this;
    a.children().each(function() {
        var type = $(this).prop('tagName');
        
        if(!ScriptingSystem.actionMap.hasOwnProperty(type)) {
            console.log('Unsupported Action detected ( ' + type + ' )');
        }
        else if(type == 'Delay') {
            throw new Error('[CRITICAL] [PARSE] Delay cannot be used inside of an ELSE');
        }
        
        that.actions.push(new ScriptingSystem.actionMap[type]($(this)));
    });
    
    if(xml.attr('errorLevel')) {
        if(xml.attr('errorLevel') == 'error') {
            this.errorLevel = 0;
        }
        else if(xml.attr('errorLevel') == 'warn') {
            this.errorLevel = 1;
        }
        else if(xml.attr('errorLevel') == 'ignore') {
            this.errorLevel = 2;
        }
        else {
            throw new Error('[CRITICAL] [PARSE] Illegal value for errorLevel ( ' + xml.attr('errorLevel') + ' )');
        }
    }
    else {
        this.errorLevel = 0;
    }
}
ElseEvent.inherit(ConditionalEvent, {
});

// Subroutine //////////////////////////////////////////////////////////////////////////////////////

Subroutine = function(xml) {
    this.subroutineID = xml.attr('subroutineID');
    
    this.actions = [];
    var a = $(xml).children('ACTIONS');
    
    var that = this;
    a.children().each(function() {
        var type = $(this).prop('tagName');
        
        if(!ScriptingSystem.actionMap.hasOwnProperty(type)) {
            console.log('Unsupported Action detected ( ' + type + ' )');
        }
        else if(type == 'Delay') {
            throw new Error('[CRITICAL] [PARSE] Delay cannot be used inside of a Subroutine');
        }
        
        that.actions.push(new ScriptingSystem.actionMap[type]($(this)));
    });
    
    if(xml.attr('errorLevel')) {
        if(xml.attr('errorLevel') == 'error') {
            this.errorLevel = 0;
        }
        else if(xml.attr('errorLevel') == 'warn') {
            this.errorLevel = 1;
        }
        else if(xml.attr('errorLevel') == 'ignore') {
            this.errorLevel = 2;
        }
        else {
            throw new Error('[CRITICAL] [PARSE] Illegal value for errorLevel ( ' + xml.attr('errorLevel') + ' )');
        }
    }
}
Subroutine.inherit(ConditionalEvent, {
    subroutineID: null,
    
    kill: function() {
        events.clearInstanceListeners(this);
		$.each(this.actions, function() {
			this.kill();
		});
    }
});

// ScriptingEvent //////////////////////////////////////////////////////////////////////////////////

// Represents a single event composed of at least one Trigger and at least one Action
var ScriptingEvent = function(xml) {
    ScriptingEvent.superclass.constructor.call(this, xml);
    
    this.ruleID = xml.attr('ruleID');
    this.endTrans = ScriptingEvent.NO_STATE;
    
    // If optional state attribute is present, parse it
    if(xml.attr('state')) {
        if(xml.attr('state') == 'active') {
            this.state = ScriptingEvent.ACTIVE;
        }
        else if(xml.attr('state') == 'inactive') {
            this.state = ScriptingEvent.INACTIVE;
        }
        else {
            throw new Error('[CRITICAL] [PARSE] Event ' + this.ruleID + ' has invalid starting state ' + xml.attr('state'));
        }
    }
    // Otherwise default to active
    else {
        this.state = ScriptingEvent.ACTIVE;
    }
    
    this.initState = this.state;
}

ScriptingEvent.inherit(ConditionalEvent, {
    ruleID     : '',       // String for indentifying this event
    
    aborting    : false,    // True when aborting from execution
    delay       : null,     // Holds the current delay timeout, null otherwise
    
    state       : ScriptingEvent.NO_STATE,  // Current state
    endTrans    : ScriptingEvent.NO_STATE,  // State to change to from the TRANSITION state
    initState   : ScriptingEvent.NO_STATE,  // Initial state when starting/rebooting
    
    // Returns true if this event is allowed to exec()
    canExec: function() {
        return this.state == ScriptingEvent.ACTIVE;
    },
    
    // Returns true if this event is allowed to abort()
    canAbort: function() {
        return this.state == ScriptingEvent.EXECUTING;
    },
    
    // Executes all actions
    exec: function() {
        // If the ending state has not been set (ie the ScriptingEvent just started executing)
        // Set the ending state to the default of INACTIVE
        if(this.endTrans == ScriptingEvent.NO_STATE) {
            this.endTrans = ScriptingEvent.INACTIVE;
        }
        
        this.delay = null;
        
        // Make sure that the ScriptingEvent is flagged as EXECUTING during execution
        this.state = ScriptingEvent.EXECUTING;
        
        while(this.execNum < this.actions.length) {
            // Abort cases
            if(this.aborting) {
                this.aborting = false;
                return;
            }
            
            // Set error level for this action
            this.setErrorLevel();
            
            // Catch special Delay case
            if(this.actions[this.execNum] instanceof DelayAct) {
                this.delay = setTimeout(this.exec.bind(this), this.actions[this.execNum].duration);
                this.execNum++;
                return;
            }
        
            // Otherwise continue executing as normal
            this.actions[this.execNum++].exec();
        }
        
        // Start transitioning when finished
        this.state = ScriptingEvent.TRANSITIONING;
    },
    
    // Tell the event to abort execution
    abort: function() {
        if(!this.canAbort()) {
            this.generateError('Cannot abort non-executing event ( ' + this.ruleID + ' )');
            return;
        }
        
        if(this.delay != null) {
            clearTimeout(this.delay);
            this.delay = null;
        }
        else {
            this.aborting = true;
        }
        
        this.state = ScriptingEvent.TRANSITIONING;
    },
    
    // Begins activating the event
    activate: function(errLvl) {
        this.curErrorLevel = errLvl;
        // If inactive, start transitioning to active
        if(this.state == ScriptingEvent.INACTIVE) {
            this.state = ScriptingEvent.TRANSITIONING;
            this.endTrans = ScriptingEvent.ACTIVE;
        }
        
        // If executing or transitioning, set the target state as active
        else if(this.state == ScriptingEvent.TRANSITIONING || this.state == ScriptingEvent.EXECUTING) {
            if(this.endTrans != ScriptingEvent.ACTIVE) {
                this.endTrans = ScriptingEvent.ACTIVE;
            }
            else {
                this.generateError('Cannot activate ' + this.ruleID + ' when endTrans is already ACTIVE');
            }
        }
        
        // Otherwise warn that the state change cannot occur
        else {
            this.generateError('Cannot activate ' + this.ruleID + ' when in NO_STATE or ACTIVE');
        }
    },
    
    // Begins deactivating the event
    deactivate: function(errLvl) {
        this.curErrorLevel = errLvl;
        // If active, start transitioning to inactive
        if(this.state == ScriptingEvent.ACTIVE) {
            this.state = ScriptingEvent.TRANSITIONING;
            this.endTrans = ScriptingEvent.INACTIVE;
        }
        
        // If executing or transitioning, set the target state as inactive
        else if(this.state == ScriptingEvent.TRANSITIONING || this.state == ScriptingEvent.EXECUTING) {
            if(this.endTrans != ScriptingEvent.INACTIVE) {
                this.endTrans = ScriptingEvent.INACTIVE;
            }
            else {
                this.generateError('Cannot deactivate ' + this.ruleID + ' when endTrans is already INACTIVE');
            }
        }
        
        // Otherwise warn that the state change cannot occur
        else {
            this.generateError('Cannot deactivate ' + this.ruleID + ' when in NO_STATE or INACTIVE');
        }
    },
    
    // Handles automatically changing states
    updateState: function() {
        if(this.state != ScriptingEvent.TRANSITIONING) {
            return;
        }
        
        if(this.endTrans == ScriptingEvent.ACTIVE || this.endTrans == ScriptingEvent.INACTIVE) {
            this.state = this.endTrans;
            this.endTrans = ScriptingEvent.NO_STATE;
            
            this.execNum = 0;
        }
        else {
            this.generateError('Cannot transition to NO_STATE, EXECUTING or TRANSITIONING');
        }
    },
    
    kill: function() {
        ScriptingEvent.superclass.kill.call(this);
        if(this.canAbort) {
            clearTimeout(this.delay);
            this.delay = null;
        }
        
        this.state = ScriptingEvent.KILLED;
        this.endTrans = ScriptingEvent.KILLED;
    },
    
    reboot: function() {
        this.state = this.initState;
    }
});

// State static constants
ScriptingEvent.KILLED           = -2;   // The event has been forcibly killed and deactivated
ScriptingEvent.NO_STATE         = -1;   // Something has gone wrong if we end up here
ScriptingEvent.ACTIVE           = 0;    // Event is Active, ready to be triggered
ScriptingEvent.EXECUTING        = 1;    // Event is currently executing or delayed
ScriptingEvent.INACTIVE         = 2;    // Event is Inactive and cannot be triggered
ScriptingEvent.TRANSITIONING    = 3;    // Event will transitioning to Active/Inactive at the end of frame

// Scripting System ////////////////////////////////////////////////////////////////////////////////

var ScriptingSystem = function() {
    ScriptingSystem.superclass.constructor.call(this);

    // Initialize objects
    this.ss_eventList = {};
    this.ss_subroutineList = {};
    this.ss_tracker = {};
    this.ss_vars = {};
    
    this.ss_dynamicNode = new cocos.nodes.Node();
    this.addChild({child: this.ss_dynamicNode, z: 200});
    
    // Register Actions
    this.addAction('Delay',             DelayAct);
    this.addAction('DeactivateRule',    EventAct,       'DeactivateRuleEvent', this.DeactivateRule.bind(this));
    this.addAction('ReactivateRule',    EventAct,       'ReactivateRuleEvent', this.ReactivateRule.bind(this));
    this.addAction('TriggerRule',       EventAct,       'TriggerRuleEvent',    this.TriggerRule.bind(this));
    this.addAction('AbortRule',         EventAct,       'AbortRuleEvent',      this.AbortRule.bind(this));
    this.addAction('CallFunction',      CallFunctionAct,'CallFunctionEvent',    this.callFunction.bind(this));
    this.addAction('ShowButton',        ShowButtonAct,  'ShowButtonEvent',      this.showContent.bind(this));
    this.addAction('ShowImage',         ShowImageAct,   'ShowImageEvent',       this.showContent.bind(this));
    this.addAction('ShowMessage',       ShowMessageAct, 'ShowMessageEvent',     this.showContent.bind(this));
    this.addAction('PlayAnimation',     PlayAnimationAct,'PlayAnimationEvent',  this.playAnimation.bind(this));
    this.addAction('StopAnimation',     StopAnimationAct,'StopAnimationEvent',  this.stopAnimation.bind(this));
    this.addAction('MoveContent',       MoveContentAct, 'MoveContentEvent',     this.moveContent.bind(this));
    this.addAction('HideContent',       HideContentAct, 'HideContentEvent',     this.hideContent.bind(this));
    this.addAction('LoadAudio',         LoadAudioAct,   'LoadAudioEvent',       this.loadAudio.bind(this));
    this.addAction('LoadImage',         LoadImageAct);
    this.addAction('LoadAnimation',     LoadAnimationAct);
    //TODO: Seperate these audio actions into distinct events?
    this.addAction('PlayAudio',         AudioAct);      // Since all four of these
    this.addAction('LoopAudio',         AudioAct);      // events use the same callback,
    this.addAction('StopAudio',         AudioAct);      // it only needs to be bound once
    this.addAction('AudioVolume',       AudioAct,       'AudioEvent',           this.audio.bind(this));
    this.addAction('SetVar',            SetVarAct,      'SetVarEvent',          this.setVar.bind(this));
    this.addAction('SetRelVar',         SetRelVarAct,   'SetRelVarEvent',       this.setRelVar.bind(this));
    this.addAction('CombineVars',       CombineVarsAct, 'CombineVarsEvent',     this.combineVars.bind(this));
    this.addAction('Printf',            PrintfAct,      'PrintfEvent',          this.printf.bind(this));
    this.addAction('Include',           IncludeAct,     'IncludeEvent',         this.loadScriptingXML.bind(this));
    this.addAction('DisableEngine',     GeneralPurposeAct,'DisableEngineEvent', this.disableEngine.bind(this));
    this.addAction('Conditional',       ConditionalAct);
    this.addAction('CallSubroutine',    CallSubroutineAct,'CallSubroutine',     this.callSubroutine.bind(this));
    
    // Register Triggers
    this.addTrigger('And',              AndTrigger);
    this.addTrigger('Or',               OrTrigger);
    this.addTrigger('Not',              NotTrigger);
    this.addTrigger('Xor',              XorTrigger);
    this.addTrigger('AutoTrigger',      AutoTrigger);
    this.addTrigger('CheckVar',         CheckVarTrigger);
    this.addTrigger('ButtonInput',      ButtonInputTrigger);
    this.addTrigger('IncludeTrigger',   IncludeTrigger);
    this.addTrigger('KeyTrigger',       KeyTrigger);
    this.addTrigger('RemoteLoadTrigger',RemoteLoadTrigger);
    this.addTrigger('Time',             TimeTrigger);
    
    KeyTrigger.keys = this.keys;
    CheckVarTrigger.get = this.reflectiveGet.bind(this);
    this.setErrorLevel = this.setErrorLevel.bind(this);
    
    // Start running every frame
    this.scheduleUpdate();
}

// Responsible for managing the creation, execution, and modification of ScriptingEvents
ScriptingSystem.inherit(KeyboardLayer, {
    ss_eventList    : null,     // Dictionary of all events in the system
    ss_disabled     : false,    // 
    
    ss_loadTimer    : 0,        // Time in seconds since the system started
    ss_gameTimer    : 0,        // Time in seconds since the game started
    ss_started      : false,    // True once the game has started
    ss_loaded       : false,    // True once the ScriptingSystem has loaded at least once
    
    ss_tracker      : null,     // Keeps track of dynamic content
    ss_vars         : null,     // A place to keep track of dynamic variables
    
    ss_dynamicNode  : null,     // Holds the visible dynamic content
    
    ss_audioHook    : null,     // Tie in point for AudioMixer to handle audio Actions
    
    ss_errorLevel   : 0,
    
    // Reset helper for ss_reinitialize and ss_reboot
    ss_refresh: function() {
        this.removeChild({child: this.ss_dynamicNode});
        this.ss_dynamicNode = new cocos.nodes.Node();
        this.addChild({child: this.ss_dynamicNode, z: 200});
        
        this.ss_tracker = {};
        this.ss_vars = {};
        
        this.ss_started = false;
        this.ss_loaded = false;
        
        this.ss_loadTimer = 0;
        this.ss_gameTimer = 0;
        
        this.ss_disabled = false;
    },
    
    //WARNING: Fails to execute correctly for any events that are executing
    ss_reinitialize: function() {
        this.ss_refresh();
        
		$.each(this.ss_eventList, function() {
			this.kill();
		});
        this.ss_eventList = {};
        
        $.each(this.ss_subroutineList, function() {
			this.kill();
		});
        this.ss_subroutineList = {};
    },
    
    //WARNING: Fails to execute correctly for any events that are executing
    ss_reboot: function() {
        this.ss_refresh();
		
		$.each(this.ss_eventList, function() {
			this.reboot();
		});
    },
    
    // Adds an Action's id and associated constructor
    addAction: function(id, act, evt, func) {
        ScriptingSystem.actionMap[id] = act;
        if(evt && func) {
            events.addListener(eventRelay, evt, func);
        }
    },
    
    // Adds a Trigger to the Trigger mapping
    addTrigger: function(id, trig) {
        ScriptingSystem.triggerMap[id] = trig;
    },
    
    // STATICALLY BOUND
    setErrorLevel: function(lvl) {
        if(-1 < lvl && lvl < 3) {
            this.ss_errorLevel = lvl;
            return;
        }
        
        throw new Error('[CRITICAL] [RUNTIME] Illegal value for ss_errorLevel ( ' + lvl + ' ) ');
    },
    
    callSubroutine: function(subroutineID) {
        if(!this.ss_subroutineList[subroutineID]) {
            throw new Error('[CRITICAL] {RUNTIME] No subroutine with ID: ' + subroutineID);
        }
        
        this.ss_subroutineList[subroutineID].exec();
    },
    
    // Load ScriptingEvents from parsed xml
    loadScriptingXML: function(xml) {
        this.ss_loaded = true;
        
        if(xml == null) {
            return;
        }
    
        // Get the list of ScriptingEvents from XML
        var evts = $(xml).children('RULE');
        
        // Interate over, validate and construct the ScriptingEvents
        var i=0;
        while(i<evts.length) {
            var evt = $(evts[i]);
            if(evt.attr('ruleID')) {
                if(!this.ss_eventList.hasOwnProperty(evt.attr('ruleID'))) {
                    this.ss_eventList[evt.attr('ruleID')] = new ScriptingEvent(evt);
                    events.addListener(this.ss_eventList[evt.attr('ruleID')], 'ErrorLevelEvent', this.setErrorLevel);
                }
                else {
                    throw new Error('[CRITICAL] [PARSE] Event #' + (i+1) + ' has an ruleID that is already in use ( ' + evts[i].attributes.ruleID + ' )');
                }
            }
            else {
                throw new Error('[CRITICAL] [PARSE] Event #' + (i+1) + ' does not have an ruleID');
            }
            i += 1;
        }
        
        // Do the same for subroutines
        var subs = $(xml).children('SUBROUTINE');
        
        i=0;
        while(i<subs.length) {
            var sub = $(subs[i]);
            if(sub.attr('subroutineID')) {
                if(!this.ss_subroutineList.hasOwnProperty(sub.attr('subroutineID'))) {
                    this.ss_subroutineList[sub.attr('subroutineID')] = new Subroutine(sub);
                    events.addListener(this.ss_subroutineList[sub.attr('subroutineID')], 'ErrorLevelEvent', this.setErrorLevel);
                }
                else {
                    throw new Error('[CRITICAL] [PARSE] Subroutine #' + (i+1) + ' has an subroutineID that is already in use ( ' + evts[i].attributes.ruleID + ' )');
                }
            }
            else {
                throw new Error('[CRITICAL] [PARSE] Subroutine #' + (i+1) + ' does not have an subroutineID');
            }
            i += 1;
        }
    },
    
// Low level access ////////////////////////////////////////////////////////////////////////////////
    
    // Basic printf functionality
    //TODO: Restrict float precision
    printf: function(cid, lbl, args) {
        var tokens = lbl.string.split('%');
        console.log(tokens);
        var vars = [];
        for(var i=0; i<args.length; i+=1) {
            vars.push(this.reflectiveGet(args[i]));
        }
        
        var newStr = tokens[0];
        var val;
        
        // Iterate over tokenized string
        for(var i=1; i<tokens.length; i+=1) {
            if(tokens.length > 0) {
                val = parseInt(tokens[i].charAt(0));
                
                // A digit following a token implies a replacement
                if(!isNaN(val)) {
                    if(val-1 < vars.length) {
                        // If the replacement value can be parsed as a float
                        if(!isNaN(parseFloat(vars[val-1])) && tokens[i].length > 1) {
                            // Check to see if floating point precision is specified (0-9 digits)
                            var prec = parseInt(tokens[i].charAt(1));
                            if(!isNaN(prec)) {
                                newStr += vars[val-1].toFixed(prec);
                                newStr += tokens[i].slice(2);
                                continue;
                            }
                        }
                        
                        // If precision is not specified, or the value is not a float, append and continue
                        newStr += vars[val-1];
                        newStr += tokens[i].slice(1);
                    }
                    else {
                        this.generateError('Lacking argument #' + val + ' in printf statement ( ' + lbl.string + ' )');
                    }
                }
                // Non digit is ignored
                else {
                    newStr += tokens[i];
                    this.generateError('printf(): Detected token character without a following digit identifier');
                }
            }
            // If there is no length, then a sequence of %% was present, which is the escape sequence for a single '%'
            //TODO: Check behavior at end of string; check corner cases (eg '%%3' '%%%3' '%3%%')
            else {
                newStr += '%';
                i+=1;
                if(i<tokens.length) {
                    newStr += tokens[i];
                }
            }
        }
        
        lbl.string = newStr;
        this.showContent(cid, lbl);
    },
    
    reflectiveIndex: function(token) {
        var num = parseInt(token);
        if(!isNaN(num)) {
            return num;
        }
        return this.reflectiveGet(index);
    },
    
    // Who would of thought I was going to have to reimplement this after it was removed from cocos...
    // And hoping to avoid the overhead of recursion plus repeated splitting and joining
    //TODO: Combine common elements with reflectiveSet
    reflectiveGet: function(key) {
        var tokens = key.split('.');
        var obj = this;
        while(tokens.length > 0) {
            key = tokens.shift();
            // Array checking code
            if(key.indexOf('[') > -1) {
                var arrToken = key.split('[');
                key = arrToken[0];
                var index = this.reflectiveIndex(arrToken[1].slice(0, -1));
                
                if(!(key in obj)) {
                    throw new Error('[CRITICAL] [RUNTIME] ' + obj + ' lacks array ' + key);
                }
                
                obj = obj[key][index];
            }
            // Property checking code
            else {
                // Only operate on already existing attributes
                if(!(key in obj)) {
                    throw new Error('[CRITICAL] [RUNTIME] ' + obj + ' lacks property ' + key);
                }
                
                obj = obj[key];
            }
        }
        
        return obj;
    },
    
    // And the slightly different version for setting values
    //TODO: Combine common elements with reflectiveGet
    reflectiveSet: function(key, val) {
        var tokens = key.split('.');
        var obj = this;
        while(tokens.length > 0) {
            key = tokens.shift();
            
            // Array checking code
            if(key.indexOf('[') > -1) {
                var arrToken = key.split('[');
                key = arrToken[0];
                var index = this.reflectiveIndex(arrToken[1].slice(0, -1));
                
                // Have to check and assign like this, otherwise values fail to assign
                if(tokens.length > 0) {
                    // Only operate on already existing attributes
                    if(!(key in obj)) {
                        throw new Error('[CRITICAL] [RUNTIME] ' + obj + ' lacks array ' + key);
                    }
                
                    obj = obj[key][index];
                }
                else {
                    obj[key][index] = val;
                    return true;
                }
            }
            // Property checking code
            else {
                // Have to check and assign like this, otherwise values fail to assign
                if(tokens.length > 0) {
                    // Only operate on already existing attributes
                    if(!(key in obj)) {
                        throw new Error('[CRITICAL] [RUNTIME] ' + obj + ' lacks property ' + key);
                    }
                    obj = obj[key];
                }
                else {
                    obj[key] = val;
                    return true;
                }
            }
        }
    },
    
    // x = C
    setVar: function(name, val) {
        this.reflectiveSet(name, val);
    },
    
    // x = y ([op] C)
    setRelVar: function(name, other, op, mod) {
        var val = this.reflectiveGet(other);
        
        // Only apply the operation if present
        if(op && mod) {
            val = ScriptingSystem.ops[op].call(this, val, mod);
        }
        
        this.reflectiveSet(name, val);
    },
    
    // x = y [op] z
    combineVars: function(name, other1, other2, op) {
        this.reflectiveSet(name, ScriptingSystem.ops[op].call(this.get(other1), this.get(other2)));
    },
    
    // Calls an arbitrary function on this object
    callFunction: function(func, params) {
        try {
            var tokens = func.split('.');
            var obj = this;
            while(tokens.length > 1) {
                obj = obj[tokens.shift()];
            }
        
            obj[func].apply(this, params);
        }
        catch(e) {
            this.generateError('Error calling function ' + func + ' with parameters ' + params)
        }
    },
    
// Audio Management ////////////////////////////////////////////////////////////////////////////////
    
    // Loads the specified audio file
    loadAudio: function(contentID, source) {
        if(!this.ss_audioHook) {
            this.generateError('LoadAudio called with no audioHook');
            return;
        }
        
        this.ss_audioHook.loadSound(contentID, source);
    },
    
    // Executes the specified command on the audio track
    audio: function(contentID, mode, volume) {
        if(!this.ss_audioHook) {
            this.generateError('Audio called with no audioHook');
            return;
        }
        
        else if(mode == 'play') {
            this.ss_audioHook.playSound(contentID);
        }
        else if(mode == 'loop') {
            this.ss_audioHook.loopSound(contentID);
        }
        else if(mode == 'stop') {
            this.ss_audioHook.stopSound(contentID);
        }
        else if(mode == 'volume') {
            this.ss_audioHook.setTrackVolume(contentID, volume);
        }
        else {
            this.generateError('Invalid mode ( ' + mode + ' ) for audio()');
        }
    },
    
// Event Management Callsbacks /////////////////////////////////////////////////////////////////////
    
    disableEngine: function() {
        this.ss_disabled = true;
    },
    
    // Deactivate the specified event
    DeactivateRule: function(ruleID) {
        this.ss_eventList[ruleID].deactivate(this.ss_errorLevel);
    },
    
    // Activate the specified event
    ReactivateRule: function(ruleID) {
        this.ss_eventList[ruleID].activate(this.ss_errorLevel);
    },
    
    // Trigger the specified event
    TriggerRule: function(ruleID) {
        if(this.ss_eventList[ruleID].canExec()) {
            this.ss_eventList[ruleID].exec();
        }
        else {
            this.generateError('Cannot TriggerRule non-ACTIVE event ( ' + ruleID + ' )');
        }
    },
    
    // Aborts a currently executing event
    AbortRule: function(ruleID) {
        if(this.ss_eventList[ruleID].canAbort()) {
            this.ss_eventList[ruleID].abort();
        }
        else {
            this.generateError('Cannot AbortRule non-EXECUTING event ( ' + ruleID + ' )');
        }
    },

////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    // Displays scripted content to the screen
    showContent: function(id, content, parent) {
        if(parent) {
            parent = this.reflectiveGet(parent);
        }
        else {
            parent = this.ss_dynamicNode;
        }
    
        if(!this.ss_tracker.hasOwnProperty(id)) {
            this.ss_tracker[id] = content;
            parent.addChild({child: content});
        }
        else {
            this.generateError('Already tracking content with id ( ' + id + ' ), unable to showContent()');
        }
    },
    
    // Plays or loops an animation
    playAnimation: function(id, anim, point, parent) {
        if(parent) {
            parent = this.reflectiveGet(parent);
        }
        else {
            parent = this.ss_dynamicNode;
        }
    
        if(!this.ss_tracker.hasOwnProperty(id)) {
            var animNode = new cocos.nodes.Sprite();
            animNode.position = point;
            
            this.ss_tracker[id] = animNode;
            parent.addChild({child: animNode});
            
            animNode.runAction(anim);
        }
        else {
            this.generateError('Already tracking content with id ( ' + id + ' ), unable to playAnimation()');
        }
    },
    
    // Stops but does NOT hide an animation
    stopAnimation: function(id) {
        if(this.ss_tracker.hasOwnProperty(id)) {
            this.ss_tracker[id].stopAllActions();
        }
        else {
            this.generateError('Not tracking any content with id ( ' + id + ' ), unable to stopAnimation()');
        }
    },
    
    // Moves already displayed content to a different location
    moveContent: function(id, pos) {
        if(this.ss_tracker.hasOwnProperty(id)) {
            this.ss_tracker[id].position = pos;
        }
        else {
            this.generateError('Not tracking any content with id ( ' + id + ' ), unable to moveContent()');
        }
    },
    
    // Hides and deletes a piece of content that was previously displayed
    hideContent: function(id, parent) {
        if(parent) {
            parent = this.reflectiveGet(parent);
        }
        else {
            parent = this.ss_dynamicNode;
        }
        
        if(this.ss_tracker.hasOwnProperty(id)) {
            parent.removeChild({child: this.ss_tracker[id]});
            delete this.ss_tracker[id];
        }
        else {
            this.generateError('Not tracking any content with id ( ' + id + ' ), unable to hideContent()');
        }
    },
    
    // Runs every frame
    update: function(dt) {
        if(this.ss_disabled) {
            return;
        }
    
        // Track timers
        if(this.ss_loaded) {
            this.ss_loadTimer += dt;
            TimeTrigger.systemTime = this.ss_loadTimer;
        }
        if(this.ss_started) {
            this.ss_gameTimer += dt;
            TimeTrigger.gameTime = this.ss_gameTimer;
        }
        
        // Iterate over events
        for (var prop in this.ss_eventList) {
            if (this.ss_eventList.hasOwnProperty(prop)) {
                // Shortcut evaluation: do not check() unless it canExec()
                if(this.ss_eventList[prop].canExec() && this.ss_eventList[prop].check()) {
                    this.ss_eventList[prop].exec();
                }
            }
            
            // Disabling takes effect immediately on the end of the event
            //TODO: Disable takes effect immediately after Action?
            if(this.ss_disabled) {
                return;
            }
        }
        
        // Update event state
        for (var prop in this.ss_eventList) {
            if (this.ss_eventList.hasOwnProperty(prop)) {
                this.ss_eventList[prop].updateState();
            }
        }
    },
    
    // Handles error generation for runtime error (parsing errors are always thrown)
    generateError: function(str) {
        if(this.ss_errorLevel == 0) {
            throw new Error('[RUNTIME] ' + str);
        }
        else if(this.ss_errorLevel == 1) {
            console.log('[RUNTIME] WARNING: ' + str);
        }
        else if(this.ss_errorLevel != 2) {
            throw new Error('[CRITICAL] [RUNTIME] Error generated and handled with an invalid errorLevel ( ' + this.ss_errorLevel + ' )');
        }
    }
});

// Stores the mapping between strings and constructors
ScriptingSystem.actionMap = {};
ScriptingSystem.triggerMap = {};

// Store operator functions by their string representation
ScriptingSystem.ops = {
    '+': function(a, b) { return a + b; },
    '-': function(a, b) { return a - b; },
    '*': function(a, b) { return a * b; },
    '/': function(a, b) { return a / b; },
    '%': function(a, b) { return a % b; }
};

module.exports = {
    Act                 : Act,
    Trigger             : Trigger,
    ScriptingEvent      : ScriptingEvent,
    ScriptingSystem     : ScriptingSystem,
    eventRelay          : eventRelay,
    GeneralPurposeAct   : GeneralPurposeAct,
};