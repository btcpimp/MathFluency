
(function() {
var __main_module_name__ = "main";
var __resources__ = {};
var __remote_resources__ = {};
function __imageResource(data) { var img = new Image(); img.src = data; return img; };
var FLIP_Y_AXIS = false;
var ENABLE_WEB_GL = false;
var SHOW_REDRAW_REGIONS = false;

__resources__["/__builtin__/event.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*global module exports require*/
/*jslint white: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true*/


/**
 * @namespace
 * Support for listening for and triggering events
 */
var event = {};

/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */
function getListeners(obj, eventName) {
    if (!obj.js_listeners_) {
        obj.js_listeners_ = {};
    }
    if (!eventName) {
        return obj.js_listeners_;
    }
    if (!obj.js_listeners_[eventName]) {
        obj.js_listeners_[eventName] = {};
    }
    return obj.js_listeners_[eventName];
}

/**
 * @private
 * @ignore
 * Keep track of the next ID for each new EventListener
 */
var eventID = 0;

/**
 * @class
 * Represents an event being listened to. You should not create instances of
 * this directly, it is instead returned by event.addListener
 *
 * @extends Object
 * 
 * @param {Object} source Object to listen to for an event
 * @param {String} eventName Name of the event to listen for
 * @param {Function} handler Callback to fire when the event triggers
 */
event.EventListener = function (source, eventName, handler) {
    /**
     * Object to listen to for an event
     * @type Object 
     */
    this.source = source;
    
    /**
     * Name of the event to listen for
     * @type String
     */
    this.eventName = eventName;

    /**
     * Callback to fire when the event triggers
     * @type Function
     */
    this.handler = handler;

    /**
     * Unique ID number for this instance
     * @type Integer 
     */
    this.id = ++eventID;

    getListeners(source, eventName)[this.id] = this;
};

/**
 * Register an event listener
 *
 * @param {Object} source Object to listen to for an event
 * @param {String} eventName Name of the event to listen for
 * @param {Function} handler Callback to fire when the event triggers
 *
 * @returns {event.EventListener} The event listener. Pass to removeListener to destroy it.
 */
event.addListener = function (source, eventName, handler) {
    return new event.EventListener(source, eventName, handler);
};

/**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
event.trigger = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        args = Array.prototype.slice.call(arguments, 2),
        eventID,
        l;

    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            l = listeners[eventID];
            if (l) {
                l.handler.apply(undefined, args);
            }
        }
    }
};

/**
 * Remove a previously registered event listener
 *
 * @param {event.EventListener} listener EventListener to remove, as returned by event.addListener
 */
event.removeListener = function (listener) {
    delete getListeners(listener.source, listener.eventName)[listener.eventID];
};

/**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
event.clearListeners = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        eventID;


    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            var l = listeners[eventID];
            if (l) {
                event.removeListener(l);
            }
        }
    }
};

/**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
event.clearInstanceListeners = function (source, eventName) {
    var listeners = getListeners(source),
        eventID;

    for (eventName in listeners) {
        if (listeners.hasOwnProperty(eventName)) {
            var el = listeners[eventName];
            for (eventID in el) {
                if (el.hasOwnProperty(eventID)) {
                    var l = el[eventID];
                    if (l) {
                        event.removeListener(l);
                    }
                }
            }
        }
    }
};

module.exports = event;

}};
__resources__["/__builtin__/events.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*global module exports require*/
/*jslint white: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true*/

/**
 * @namespace
 * Support for listening for and triggering events
 */
var events = {};

/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */
function getListeners(obj, eventName) {
    if (!obj.js_listeners_) {
        obj.js_listeners_ = {};
    }
    if (!eventName) {
        return obj.js_listeners_;
    }
    if (!obj.js_listeners_[eventName]) {
        obj.js_listeners_[eventName] = {};
    }
    return obj.js_listeners_[eventName];
}

/**
 * @private
 * @ignore
 * Keep track of the next ID for each new EventListener
 */
var eventID = 0;

/**
 * @class
 * Represents an event being listened to. You should not create instances of
 * this directly, it is instead returned by events.addListener
 *
 * @extends Object
 * 
 * @param {Object} source Object to listen to for an event
 * @param {String} eventName Name of the event to listen for
 * @param {Function} handler Callback to fire when the event triggers
 */
events.EventListener = function (source, eventName, handler) {
    /**
     * Object to listen to for an event
     * @type Object 
     */
    this.source = source;
    
    /**
     * Name of the event to listen for
     * @type String
     */
    this.eventName = eventName;

    /**
     * Callback to fire when the event triggers
     * @type Function
     */
    this.handler = handler;

    /**
     * Unique ID number for this instance
     * @type Integer 
     */
    this.id = ++eventID;

    getListeners(source, eventName)[this.id] = this;
};

/**
 * Register an event listener
 *
 * @param {Object} source Object to listen to for an event
 * @param {String|Stringp[} eventName Name or Array of names of the event(s) to listen for
 * @param {Function} handler Callback to fire when the event triggers
 *
 * @returns {events.EventListener|events.EventListener[]} The event listener(s). Pass to removeListener to destroy it.
 */
events.addListener = function (source, eventName, handler) {
    if (eventName instanceof Array) {
        var listeners = [];
        for (var i = 0, len = eventName.length; i < len; i++) {
            listeners.push(new events.EventListener(source, eventName[i], handler));
        }
        return listeners;
    } else {
        return new events.EventListener(source, eventName, handler);
    }
};

/**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
events.trigger = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        args = Array.prototype.slice.call(arguments, 2),
        eventID,
        l;

    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            l = listeners[eventID];
            if (l) {
                l.handler.apply(undefined, args);
            }
        }
    }
};

/**
 * Remove a previously registered event listener
 *
 * @param {events.EventListener} listener EventListener to remove, as returned by events.addListener
 */
events.removeListener = function (listener) {
    delete getListeners(listener.source, listener.eventName)[listener.eventID];
};

/**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
events.clearListeners = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        eventID;


    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            var l = listeners[eventID];
            if (l) {
                events.removeListener(l);
            }
        }
    }
};

/**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
events.clearInstanceListeners = function (source) {
    var listeners = getListeners(source),
        eventID;

    for (var eventName in listeners) {
        if (listeners.hasOwnProperty(eventName)) {
            var el = listeners[eventName];
            for (eventID in el) {
                if (el.hasOwnProperty(eventID)) {
                    var l = el[eventID];
                    if (l) {
                        events.removeListener(l);
                    }
                }
            }
        }
    }
};

module.exports = events;

}};
__resources__["/__builtin__/global.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');


/**
 * @ignore
 */
function getAccessors(obj) {
    if (!obj.js_accessors_) {
        obj.js_accessors_ = {};
    }
    return obj.js_accessors_;
}

/**
 * @ignore
 */
function getBindings(obj) {
    if (!obj.js_bindings_) {
        obj.js_bindings_ = {};
    }
    return obj.js_bindings_;
}

/**
 * @ignore
 */
function addAccessor(obj, key, target, targetKey, noNotify) {
    getAccessors(obj)[key] = {
        key: targetKey,
        target: target
    };

    if (!noNotify) {
        obj.triggerChanged(key);
    }
}


/**
 * @ignore
 */
var objectID = 0;

/**
 * @class
 * A bindable object. Allows observing and binding to its properties.
 */
var BObject = function () {};
BObject.prototype = util.extend(BObject.prototype, /** @lends BObject# */{
    /**
     * Unique ID
     * @type Integer
     */
    _id: 0,
    

    /**
     * The constructor for subclasses. Overwrite this for any initalisation you
     * need to do.
     * @ignore
     */
    init: function () {},

    /**
     * Get a property from the object. Always use this instead of trying to
     * access the property directly. This will ensure all bindings, setters and
     * getters work correctly.
     * 
     * @param {String} key Name of property to get or dot (.) separated path to a property
     * @returns {*} Value of the property
     */
    get: function (key) {
        var next = false
        if (~key.indexOf('.')) {
            var tokens = key.split('.');
            key = tokens.shift();
            next = tokens.join('.');
        }


        var accessor = getAccessors(this)[key],
            val;
        if (accessor) {
            val = accessor.target.get(accessor.key);
        } else {
            // Call getting function
            if (this['get_' + key]) {
                val = this['get_' + key]();
            } else {
                val = this[key];
            }
        }

        if (next) {
            return val.get(next);
        } else {
            return val;
        }
    },


    /**
     * Set a property on the object. Always use this instead of trying to
     * access the property directly. This will ensure all bindings, setters and
     * getters work correctly.
     * 
     * @param {String} key Name of property to get
     * @param {*} value New value for the property
     */
    set: function (key, value) {
        var accessor = getAccessors(this)[key],
            oldVal = this.get(key);


        this.triggerBeforeChanged(key, oldVal);

        if (accessor) {
            accessor.target.set(accessor.key, value);
        } else {

            if (this['set_' + key]) {
                this['set_' + key](value);
            } else {
                this[key] = value;
            }
        }
        this.triggerChanged(key, oldVal);
    },

    /**
     * Set multiple propertys in one go
     *
     * @param {Object} kvp An Object where the key is a property name and the value is the value to assign to the property
     *
     * @example
     * var props = {
     *   monkey: 'ook',
     *   cat: 'meow',
     *   dog: 'woof'
     * };
     * foo.setValues(props);
     * console.log(foo.get('cat')); // Logs 'meow'
     */
    setValues: function (kvp) {
        for (var x in kvp) {
            if (kvp.hasOwnProperty(x)) {
                this.set(x, kvp[x]);
            }
        }
    },

    changed: function (key) {
    },

    /**
     * @private
     */
    notify: function (key, oldVal) {
        var accessor = getAccessors(this)[key];
        if (accessor) {
            accessor.target.notify(accessor.key, oldVal);
        }
    },

    /**
     * @private
     */
    triggerBeforeChanged: function (key, oldVal) {
        events.trigger(this, key.toLowerCase() + '_before_changed', oldVal);
    },

    /**
     * @private
     */
    triggerChanged: function (key, oldVal) {
        events.trigger(this, key.toLowerCase() + '_changed', oldVal);
    },

    /**
     * Bind the value of a property on this object to that of another object so
     * they always have the same value. Setting the value on either object will update
     * the other too.
     *
     * @param {String} key Name of the property on this object that should be bound
     * @param {BOject} target Object to bind to
     * @param {String} [targetKey=key] Key on the target object to bind to
     * @param {Boolean} [noNotify=false] Set to true to prevent this object's property triggering a 'changed' event when adding the binding
     */
    bindTo: function (key, target, targetKey, noNotify) {
        targetKey = targetKey || key;
        var self = this;
        this.unbind(key);

        var oldVal = this.get(key);

        // When bound property changes, trigger a 'changed' event on this one too
        getBindings(this)[key] = events.addListener(target, targetKey.toLowerCase() + '_changed', function (oldVal) {
            self.triggerChanged(key, oldVal);
        });

        addAccessor(this, key, target, targetKey, noNotify);
    },

    /**
     * Remove binding from a property which set setup using BObject#bindTo.
     *
     * @param {String} key Name of the property on this object to unbind
     */
    unbind: function (key) {
        var binding = getBindings(this)[key];
        if (!binding) {
            return;
        }

        delete getBindings(this)[key];
        events.removeListener(binding);
        // Grab current value from bound property
        var val = this.get(key);
        delete getAccessors(this)[key];
        // Set bound value
        this[key] = val;
    },

    /**
     * Remove all bindings on this object
     */
    unbindAll: function () {
        var keys = [],
            bindings = getBindings(this);
        for (var k in bindings) {
            if (bindings.hasOwnProperty(k)) {
                this.unbind(k);
            }
        }
    },

    /**
     * Unique ID for this object
     * @getter id
     * @type Integer
     */
    get_id: function () {
        if (!this._id) {
            this._id = ++objectID;
        }

        return this._id;
    }
});


/**
 * Create a new instance of this object
 * @returns {BObject} New instance of this object
 */
BObject.create = function () {
    var ret = new this();
    ret.init.apply(ret, arguments);
    return ret;
};

/**
 * Create a new subclass by extending this one
 * @returns {Object} A new subclass of this object
 */
BObject.extend = function() {
    var newObj = function() {},
        args = [],
        i,
        x;

    // Copy 'class' methods
    for (x in this) {
        if (this.hasOwnProperty(x)) {
            newObj[x] = this[x];
        }
    }


    // Add given properties to the prototype
    newObj.prototype = util.beget(this.prototype);
    args.push(newObj.prototype);
    for (i = 0; i<arguments.length; i++) {
        args.push(arguments[i]);
    }
    util.extend.apply(null, args);

    newObj.superclass = this.prototype;
    // Create new instance
    return newObj;
};

/**
 * Get a property from the class. Always use this instead of trying to
 * access the property directly. This will ensure all bindings, setters and
 * getters work correctly.
 * 
 * @function
 * @param {String} key Name of property to get
 * @returns {*} Value of the property
 */
BObject.get = BObject.prototype.get;

/**
 * Set a property on the class. Always use this instead of trying to
 * access the property directly. This will ensure all bindings, setters and
 * getters work correctly.
 * 
 * @function
 * @param {String} key Name of property to get
 * @param {*} value New value for the property
 */
BObject.set = BObject.prototype.set;

var BArray = BObject.extend(/** @lends BArray# */{

    /**
     * @constructs 
     * A bindable array. Allows observing for changes made to its contents
     *
     * @extends BObject
     * @param {Array} [array=[]] A normal JS array to use for data
     */
    init: function (array) {
        this.array = array || [];
        this.set('length', this.array.length);
    },

    /**
     * Get an item
     *
     * @param {Integer} i Index to get item from
     * @returns {*} Value stored in the array at index 'i'
     */
    getAt: function (i) {
        return this.array[i];
    },

    /**
     * Set an item -- Overwrites any existing item at index
     *
     * @param {Integer} i Index to set item to
     * @param {*} value Value to assign to index
     */
    setAt: function (i, value) {
        var oldVal = this.array[i];
        this.array[i] = value;

        events.trigger(this, 'set_at', i, oldVal);
    },

    /**
     * Insert a new item into the array without overwriting anything
     *
     * @param {Integer} i Index to insert item at
     * @param {*} value Value to insert
     */
    insertAt: function (i, value) {
        this.array.splice(i, 0, value);
        this.set('length', this.array.length);
        events.trigger(this, 'insert_at', i);
    },

    /**
     * Remove item from the array and return it
     *
     * @param {Integer} i Index to remove
     * @returns {*} Value that was removed
     */
    removeAt: function (i) {
        var oldVal = this.array[i];
        this.array.splice(i, 1);
        this.set('length', this.array.length);
        events.trigger(this, 'remove_at', i, oldVal);

        return oldVal;
    },

    /**
     * Get the internal Javascript Array instance
     *
     * @returns {Array} Internal Javascript Array
     */
    getArray: function () {
        return this.array;
    },

    /**
     * Append a value to the end of the array and return its new length
     *
     * @param {*} value Value to append to the array
     * @returns {Integer} New length of the array
     */
    push: function (value) {
        this.insertAt(this.array.length, value);
        return this.array.length;
    },

    /**
     * Remove value from the end of the array and return it
     *
     * @returns {*} Value that was removed
     */
    pop: function () {
        return this.removeAt(this.array.length - 1);
    }
});

exports.BObject = BObject;
exports.BArray = BArray;

}};
__resources__["/__builtin__/libs/base64.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/**
 * Thin wrapper around JXG's Base64 utils
 */

/** @ignore */
var JXG = require('JXGUtil');

/** @namespace */
var base64 = {
    /**
     * Decode a base64 encoded string into a binary string
     *
     * @param {String} input Base64 encoded data
     * @returns {String} Binary string
     */
    decode: function(input) {
        return JXG.Util.Base64.decode(input);
    },

    /**
     * Decode a base64 encoded string into a byte array
     *
     * @param {String} input Base64 encoded data
     * @returns {Integer[]} Array of bytes
     */
    decodeAsArray: function(input, bytes) {
        bytes = bytes || 1;

        var dec = JXG.Util.Base64.decode(input),
            ar = [], i, j, len;

        for (i = 0, len = dec.length/bytes; i < len; i++){
            ar[i] = 0;
            for (j = bytes-1; j >= 0; --j){
                ar[i] += dec.charCodeAt((i *bytes) +j) << (j *8);
            }
        }
        return ar;
    },

    /**
     * Encode a binary string into base64
     *
     * @param {String} input Binary string
     * @returns {String} Base64 encoded data
     */
    encode: function(input) {
        return JXG.Util.Base64.encode(input);
    }
};

module.exports = base64;

}};
__resources__["/__builtin__/libs/box2d.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
function extend(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
}
function isInstanceOf(obj, _constructor) {
  while(typeof obj === "object") {
    if(obj.constructor === _constructor) {
      return true
    }
    obj = obj._super
  }
  return false
}
;var b2BoundValues = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2BoundValues.prototype.__constructor = function() {
  this.lowerValues = new Array;
  this.lowerValues[0] = 0;
  this.lowerValues[1] = 0;
  this.upperValues = new Array;
  this.upperValues[0] = 0;
  this.upperValues[1] = 0
};
b2BoundValues.prototype.__varz = function() {
};
b2BoundValues.prototype.lowerValues = null;
b2BoundValues.prototype.upperValues = null;var b2PairManager = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2PairManager.prototype.__constructor = function() {
  this.m_pairs = new Array;
  this.m_pairBuffer = new Array;
  this.m_pairCount = 0;
  this.m_pairBufferCount = 0;
  this.m_freePair = null
};
b2PairManager.prototype.__varz = function() {
};
b2PairManager.prototype.AddPair = function(proxy1, proxy2) {
  var pair = proxy1.pairs[proxy2];
  if(pair != null) {
    return pair
  }
  if(this.m_freePair == null) {
    this.m_freePair = new b2Pair;
    this.m_pairs.push(this.m_freePair)
  }
  pair = this.m_freePair;
  this.m_freePair = pair.next;
  pair.proxy1 = proxy1;
  pair.proxy2 = proxy2;
  pair.status = 0;
  pair.userData = null;
  pair.next = null;
  proxy1.pairs[proxy2] = pair;
  proxy2.pairs[proxy1] = pair;
  ++this.m_pairCount;
  return pair
};
b2PairManager.prototype.RemovePair = function(proxy1, proxy2) {
  var pair = proxy1.pairs[proxy2];
  if(pair == null) {
    return null
  }
  var userData = pair.userData;
  delete proxy1.pairs[proxy2];
  delete proxy2.pairs[proxy1];
  pair.next = this.m_freePair;
  pair.proxy1 = null;
  pair.proxy2 = null;
  pair.userData = null;
  pair.status = 0;
  this.m_freePair = pair;
  --this.m_pairCount;
  return userData
};
b2PairManager.prototype.Find = function(proxy1, proxy2) {
  return proxy1.pairs[proxy2]
};
b2PairManager.prototype.ValidateBuffer = function() {
};
b2PairManager.prototype.ValidateTable = function() {
};
b2PairManager.prototype.Initialize = function(broadPhase) {
  this.m_broadPhase = broadPhase
};
b2PairManager.prototype.AddBufferedPair = function(proxy1, proxy2) {
  var pair = this.AddPair(proxy1, proxy2);
  if(pair.IsBuffered() == false) {
    pair.SetBuffered();
    this.m_pairBuffer[this.m_pairBufferCount] = pair;
    ++this.m_pairBufferCount
  }
  pair.ClearRemoved();
  if(b2BroadPhase.s_validate) {
    this.ValidateBuffer()
  }
};
b2PairManager.prototype.RemoveBufferedPair = function(proxy1, proxy2) {
  var pair = this.Find(proxy1, proxy2);
  if(pair == null) {
    return
  }
  if(pair.IsBuffered() == false) {
    pair.SetBuffered();
    this.m_pairBuffer[this.m_pairBufferCount] = pair;
    ++this.m_pairBufferCount
  }
  pair.SetRemoved();
  if(b2BroadPhase.s_validate) {
    this.ValidateBuffer()
  }
};
b2PairManager.prototype.Commit = function(callback) {
  var i = 0;
  var removeCount = 0;
  for(i = 0;i < this.m_pairBufferCount;++i) {
    var pair = this.m_pairBuffer[i];
    pair.ClearBuffered();
    var proxy1 = pair.proxy1;
    var proxy2 = pair.proxy2;
    if(pair.IsRemoved()) {
    }else {
      if(pair.IsFinal() == false) {
        callback(proxy1.userData, proxy2.userData)
      }
    }
  }
  this.m_pairBufferCount = 0;
  if(b2BroadPhase.s_validate) {
    this.ValidateTable()
  }
};
b2PairManager.prototype.m_broadPhase = null;
b2PairManager.prototype.m_pairs = null;
b2PairManager.prototype.m_freePair = null;
b2PairManager.prototype.m_pairCount = 0;
b2PairManager.prototype.m_pairBuffer = null;
b2PairManager.prototype.m_pairBufferCount = 0;var b2TimeStep = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2TimeStep.prototype.__constructor = function() {
};
b2TimeStep.prototype.__varz = function() {
};
b2TimeStep.prototype.Set = function(step) {
  this.dt = step.dt;
  this.inv_dt = step.inv_dt;
  this.positionIterations = step.positionIterations;
  this.velocityIterations = step.velocityIterations;
  this.warmStarting = step.warmStarting
};
b2TimeStep.prototype.dt = null;
b2TimeStep.prototype.inv_dt = null;
b2TimeStep.prototype.dtRatio = null;
b2TimeStep.prototype.velocityIterations = 0;
b2TimeStep.prototype.positionIterations = 0;
b2TimeStep.prototype.warmStarting = null;var b2Controller = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Controller.prototype.__constructor = function() {
};
b2Controller.prototype.__varz = function() {
};
b2Controller.prototype.Step = function(step) {
};
b2Controller.prototype.Draw = function(debugDraw) {
};
b2Controller.prototype.AddBody = function(body) {
  var edge = new b2ControllerEdge;
  edge.controller = this;
  edge.body = body;
  edge.nextBody = m_bodyList;
  edge.prevBody = null;
  m_bodyList = edge;
  if(edge.nextBody) {
    edge.nextBody.prevBody = edge
  }
  m_bodyCount++;
  edge.nextController = body.m_controllerList;
  edge.prevController = null;
  body.m_controllerList = edge;
  if(edge.nextController) {
    edge.nextController.prevController = edge
  }
  body.m_controllerCount++
};
b2Controller.prototype.RemoveBody = function(body) {
  var edge = body.m_controllerList;
  while(edge && edge.controller != this) {
    edge = edge.nextController
  }
  if(edge.prevBody) {
    edge.prevBody.nextBody = edge.nextBody
  }
  if(edge.nextBody) {
    edge.nextBody.prevBody = edge.prevBody
  }
  if(edge.nextController) {
    edge.nextController.prevController = edge.prevController
  }
  if(edge.prevController) {
    edge.prevController.nextController = edge.nextController
  }
  if(m_bodyList == edge) {
    m_bodyList = edge.nextBody
  }
  if(body.m_controllerList == edge) {
    body.m_controllerList = edge.nextController
  }
  body.m_controllerCount--;
  m_bodyCount--
};
b2Controller.prototype.Clear = function() {
  while(m_bodyList) {
    this.RemoveBody(m_bodyList.body)
  }
};
b2Controller.prototype.GetNext = function() {
  return this.m_next
};
b2Controller.prototype.GetWorld = function() {
  return this.m_world
};
b2Controller.prototype.GetBodyList = function() {
  return m_bodyList
};
b2Controller.prototype.m_next = null;
b2Controller.prototype.m_prev = null;
b2Controller.prototype.m_world = null;var b2GravityController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2GravityController.prototype, b2Controller.prototype);
b2GravityController.prototype._super = b2Controller.prototype;
b2GravityController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2GravityController.prototype.__varz = function() {
};
b2GravityController.prototype.Step = function(step) {
  var i = null;
  var body1 = null;
  var p1 = null;
  var mass1 = 0;
  var j = null;
  var body2 = null;
  var p2 = null;
  var dx = 0;
  var dy = 0;
  var r2 = 0;
  var f = null;
  if(this.invSqr) {
    for(i = m_bodyList;i;i = i.nextBody) {
      body1 = i.body;
      p1 = body1.GetWorldCenter();
      mass1 = body1.GetMass();
      for(j = m_bodyList;j != i;j = j.nextBody) {
        body2 = j.body;
        p2 = body2.GetWorldCenter();
        dx = p2.x - p1.x;
        dy = p2.y - p1.y;
        r2 = dx * dx + dy * dy;
        if(r2 < Number.MIN_VALUE) {
          continue
        }
        f = new b2Vec2(dx, dy);
        f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
        if(body1.IsAwake()) {
          body1.ApplyForce(f, p1)
        }
        f.Multiply(-1);
        if(body2.IsAwake()) {
          body2.ApplyForce(f, p2)
        }
      }
    }
  }else {
    for(i = m_bodyList;i;i = i.nextBody) {
      body1 = i.body;
      p1 = body1.GetWorldCenter();
      mass1 = body1.GetMass();
      for(j = m_bodyList;j != i;j = j.nextBody) {
        body2 = j.body;
        p2 = body2.GetWorldCenter();
        dx = p2.x - p1.x;
        dy = p2.y - p1.y;
        r2 = dx * dx + dy * dy;
        if(r2 < Number.MIN_VALUE) {
          continue
        }
        f = new b2Vec2(dx, dy);
        f.Multiply(this.G / r2 * mass1 * body2.GetMass());
        if(body1.IsAwake()) {
          body1.ApplyForce(f, p1)
        }
        f.Multiply(-1);
        if(body2.IsAwake()) {
          body2.ApplyForce(f, p2)
        }
      }
    }
  }
};
b2GravityController.prototype.G = 1;
b2GravityController.prototype.invSqr = true;var b2DestructionListener = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DestructionListener.prototype.__constructor = function() {
};
b2DestructionListener.prototype.__varz = function() {
};
b2DestructionListener.prototype.SayGoodbyeJoint = function(joint) {
};
b2DestructionListener.prototype.SayGoodbyeFixture = function(fixture) {
};var b2ContactEdge = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactEdge.prototype.__constructor = function() {
};
b2ContactEdge.prototype.__varz = function() {
};
b2ContactEdge.prototype.other = null;
b2ContactEdge.prototype.contact = null;
b2ContactEdge.prototype.prev = null;
b2ContactEdge.prototype.next = null;var b2EdgeChainDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2EdgeChainDef.prototype.__constructor = function() {
  this.vertexCount = 0;
  this.isALoop = true;
  this.vertices = []
};
b2EdgeChainDef.prototype.__varz = function() {
};
b2EdgeChainDef.prototype.vertices = null;
b2EdgeChainDef.prototype.vertexCount = null;
b2EdgeChainDef.prototype.isALoop = null;var b2Vec2 = function(x_, y_) {
  if(arguments.length == 2) {
    this.x = x_;
    this.y = y_
  }
};
b2Vec2.Make = function(x_, y_) {
  return new b2Vec2(x_, y_)
};
b2Vec2.prototype.SetZero = function() {
  this.x = 0;
  this.y = 0
};
b2Vec2.prototype.Set = function(x_, y_) {
  this.x = x_;
  this.y = y_
};
b2Vec2.prototype.SetV = function(v) {
  this.x = v.x;
  this.y = v.y
};
b2Vec2.prototype.GetNegative = function() {
  return new b2Vec2(-this.x, -this.y)
};
b2Vec2.prototype.NegativeSelf = function() {
  this.x = -this.x;
  this.y = -this.y
};
b2Vec2.prototype.Copy = function() {
  return new b2Vec2(this.x, this.y)
};
b2Vec2.prototype.Add = function(v) {
  this.x += v.x;
  this.y += v.y
};
b2Vec2.prototype.Subtract = function(v) {
  this.x -= v.x;
  this.y -= v.y
};
b2Vec2.prototype.Multiply = function(a) {
  this.x *= a;
  this.y *= a
};
b2Vec2.prototype.MulM = function(A) {
  var tX = this.x;
  this.x = A.col1.x * tX + A.col2.x * this.y;
  this.y = A.col1.y * tX + A.col2.y * this.y
};
b2Vec2.prototype.MulTM = function(A) {
  var tX = b2Math.Dot(this, A.col1);
  this.y = b2Math.Dot(this, A.col2);
  this.x = tX
};
b2Vec2.prototype.CrossVF = function(s) {
  var tX = this.x;
  this.x = s * this.y;
  this.y = -s * tX
};
b2Vec2.prototype.CrossFV = function(s) {
  var tX = this.x;
  this.x = -s * this.y;
  this.y = s * tX
};
b2Vec2.prototype.MinV = function(b) {
  this.x = this.x < b.x ? this.x : b.x;
  this.y = this.y < b.y ? this.y : b.y
};
b2Vec2.prototype.MaxV = function(b) {
  this.x = this.x > b.x ? this.x : b.x;
  this.y = this.y > b.y ? this.y : b.y
};
b2Vec2.prototype.Abs = function() {
  if(this.x < 0) {
    this.x = -this.x
  }
  if(this.y < 0) {
    this.y = -this.y
  }
};
b2Vec2.prototype.Length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y)
};
b2Vec2.prototype.LengthSquared = function() {
  return this.x * this.x + this.y * this.y
};
b2Vec2.prototype.Normalize = function() {
  var length = Math.sqrt(this.x * this.x + this.y * this.y);
  if(length < Number.MIN_VALUE) {
    return 0
  }
  var invLength = 1 / length;
  this.x *= invLength;
  this.y *= invLength;
  return length
};
b2Vec2.prototype.IsValid = function() {
  return b2Math.IsValid(this.x) && b2Math.IsValid(this.y)
};
b2Vec2.prototype.x = 0;
b2Vec2.prototype.y = 0;var b2Vec3 = function(x, y, z) {
  if(arguments.length == 3) {
    this.x = x;
    this.y = y;
    this.z = z
  }
};
b2Vec3.prototype.SetZero = function() {
  this.x = this.y = this.z = 0
};
b2Vec3.prototype.Set = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z
};
b2Vec3.prototype.SetV = function(v) {
  this.x = v.x;
  this.y = v.y;
  this.z = v.z
};
b2Vec3.prototype.GetNegative = function() {
  return new b2Vec3(-this.x, -this.y, -this.z)
};
b2Vec3.prototype.NegativeSelf = function() {
  this.x = -this.x;
  this.y = -this.y;
  this.z = -this.z
};
b2Vec3.prototype.Copy = function() {
  return new b2Vec3(this.x, this.y, this.z)
};
b2Vec3.prototype.Add = function(v) {
  this.x += v.x;
  this.y += v.y;
  this.z += v.z
};
b2Vec3.prototype.Subtract = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z
};
b2Vec3.prototype.Multiply = function(a) {
  this.x *= a;
  this.y *= a;
  this.z *= a
};
b2Vec3.prototype.x = 0;
b2Vec3.prototype.y = 0;
b2Vec3.prototype.z = 0;var b2DistanceProxy = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DistanceProxy.prototype.__constructor = function() {
};
b2DistanceProxy.prototype.__varz = function() {
};
b2DistanceProxy.prototype.Set = function(shape) {
  switch(shape.GetType()) {
    case b2Shape.e_circleShape:
      var circle = shape;
      this.m_vertices = new Array(1);
      this.m_vertices[0] = circle.m_p;
      this.m_count = 1;
      this.m_radius = circle.m_radius;
      break;
    case b2Shape.e_polygonShape:
      var polygon = shape;
      this.m_vertices = polygon.m_vertices;
      this.m_count = polygon.m_vertexCount;
      this.m_radius = polygon.m_radius;
      break;
    default:
      b2Settings.b2Assert(false)
  }
};
b2DistanceProxy.prototype.GetSupport = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_count;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return bestIndex
};
b2DistanceProxy.prototype.GetSupportVertex = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_count;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return this.m_vertices[bestIndex]
};
b2DistanceProxy.prototype.GetVertexCount = function() {
  return this.m_count
};
b2DistanceProxy.prototype.GetVertex = function(index) {
  b2Settings.b2Assert(0 <= index && index < this.m_count);
  return this.m_vertices[index]
};
b2DistanceProxy.prototype.m_vertices = null;
b2DistanceProxy.prototype.m_count = 0;
b2DistanceProxy.prototype.m_radius = null;var b2ContactFactory = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactFactory.prototype.__constructor = function() {
};
b2ContactFactory.prototype.__varz = function() {
  this.InitializeRegisters()
};
b2ContactFactory.prototype.AddType = function(createFcn, destroyFcn, type1, type2) {
  this.m_registers[type1][type2].createFcn = createFcn;
  this.m_registers[type1][type2].destroyFcn = destroyFcn;
  this.m_registers[type1][type2].primary = true;
  if(type1 != type2) {
    this.m_registers[type2][type1].createFcn = createFcn;
    this.m_registers[type2][type1].destroyFcn = destroyFcn;
    this.m_registers[type2][type1].primary = false
  }
};
b2ContactFactory.prototype.InitializeRegisters = function() {
  this.m_registers = new Array(b2Shape.e_shapeTypeCount);
  for(var i = 0;i < b2Shape.e_shapeTypeCount;i++) {
    this.m_registers[i] = new Array(b2Shape.e_shapeTypeCount);
    for(var j = 0;j < b2Shape.e_shapeTypeCount;j++) {
      this.m_registers[i][j] = new b2ContactRegister
    }
  }
  this.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
  this.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_circleShape);
  this.AddType(b2PolygonContact.Create, b2PolygonContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_polygonShape);
  this.AddType(b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact.Destroy, b2Shape.e_edgeShape, b2Shape.e_circleShape);
  this.AddType(b2PolyAndEdgeContact.Create, b2PolyAndEdgeContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_edgeShape)
};
b2ContactFactory.prototype.Create = function(fixtureA, fixtureB) {
  var type1 = fixtureA.GetType();
  var type2 = fixtureB.GetType();
  var reg = this.m_registers[type1][type2];
  var c;
  if(reg.pool) {
    c = reg.pool;
    reg.pool = c.m_next;
    reg.poolCount--;
    c.Reset(fixtureA, fixtureB);
    return c
  }
  var createFcn = reg.createFcn;
  if(createFcn != null) {
    if(reg.primary) {
      c = createFcn(this.m_allocator);
      c.Reset(fixtureA, fixtureB);
      return c
    }else {
      c = createFcn(this.m_allocator);
      c.Reset(fixtureB, fixtureA);
      return c
    }
  }else {
    return null
  }
};
b2ContactFactory.prototype.Destroy = function(contact) {
  if(contact.m_manifold.m_pointCount > 0) {
    contact.m_fixtureA.m_body.SetAwake(true);
    contact.m_fixtureB.m_body.SetAwake(true)
  }
  var type1 = contact.m_fixtureA.GetType();
  var type2 = contact.m_fixtureB.GetType();
  var reg = this.m_registers[type1][type2];
  if(true) {
    reg.poolCount++;
    contact.m_next = reg.pool;
    reg.pool = contact
  }
  var destroyFcn = reg.destroyFcn;
  destroyFcn(contact, this.m_allocator)
};
b2ContactFactory.prototype.m_registers = null;
b2ContactFactory.prototype.m_allocator = null;var b2ConstantAccelController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2ConstantAccelController.prototype, b2Controller.prototype);
b2ConstantAccelController.prototype._super = b2Controller.prototype;
b2ConstantAccelController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2ConstantAccelController.prototype.__varz = function() {
  this.A = new b2Vec2(0, 0)
};
b2ConstantAccelController.prototype.Step = function(step) {
  var smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(!body.IsAwake()) {
      continue
    }
    body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y))
  }
};
b2ConstantAccelController.prototype.A = new b2Vec2(0, 0);var b2SeparationFunction = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2SeparationFunction.prototype.__constructor = function() {
};
b2SeparationFunction.prototype.__varz = function() {
  this.m_localPoint = new b2Vec2;
  this.m_axis = new b2Vec2
};
b2SeparationFunction.e_points = 1;
b2SeparationFunction.e_faceA = 2;
b2SeparationFunction.e_faceB = 4;
b2SeparationFunction.prototype.Initialize = function(cache, proxyA, transformA, proxyB, transformB) {
  this.m_proxyA = proxyA;
  this.m_proxyB = proxyB;
  var count = cache.count;
  b2Settings.b2Assert(0 < count && count < 3);
  var localPointA;
  var localPointA1;
  var localPointA2;
  var localPointB;
  var localPointB1;
  var localPointB2;
  var pointAX;
  var pointAY;
  var pointBX;
  var pointBY;
  var normalX;
  var normalY;
  var tMat;
  var tVec;
  var s;
  var sgn;
  if(count == 1) {
    this.m_type = b2SeparationFunction.e_points;
    localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
    localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
    tVec = localPointA;
    tMat = transformA.R;
    pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
    pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
    tVec = localPointB;
    tMat = transformB.R;
    pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
    pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
    this.m_axis.x = pointBX - pointAX;
    this.m_axis.y = pointBY - pointAY;
    this.m_axis.Normalize()
  }else {
    if(cache.indexB[0] == cache.indexB[1]) {
      this.m_type = b2SeparationFunction.e_faceA;
      localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
      localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
      localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
      this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
      this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
      this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1);
      this.m_axis.Normalize();
      tVec = this.m_axis;
      tMat = transformA.R;
      normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tVec = this.m_localPoint;
      tMat = transformA.R;
      pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tVec = localPointB;
      tMat = transformB.R;
      pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
      if(s < 0) {
        this.m_axis.NegativeSelf()
      }
    }else {
      if(cache.indexA[0] == cache.indexA[0]) {
        this.m_type = b2SeparationFunction.e_faceB;
        localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
        localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
        localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
        this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
        this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
        this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1);
        this.m_axis.Normalize();
        tVec = this.m_axis;
        tMat = transformB.R;
        normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        tVec = this.m_localPoint;
        tMat = transformB.R;
        pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tVec = localPointA;
        tMat = transformA.R;
        pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
        if(s < 0) {
          this.m_axis.NegativeSelf()
        }
      }else {
        localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
        localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
        localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
        localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
        var pA = b2Math.MulX(transformA, localPointA);
        var dA = b2Math.MulMV(transformA.R, b2Math.SubtractVV(localPointA2, localPointA1));
        var pB = b2Math.MulX(transformB, localPointB);
        var dB = b2Math.MulMV(transformB.R, b2Math.SubtractVV(localPointB2, localPointB1));
        var a = dA.x * dA.x + dA.y * dA.y;
        var e = dB.x * dB.x + dB.y * dB.y;
        var r = b2Math.SubtractVV(dB, dA);
        var c = dA.x * r.x + dA.y * r.y;
        var f = dB.x * r.x + dB.y * r.y;
        var b = dA.x * dB.x + dA.y * dB.y;
        var denom = a * e - b * b;
        s = 0;
        if(denom != 0) {
          s = b2Math.Clamp((b * f - c * e) / denom, 0, 1)
        }
        var t = (b * s + f) / e;
        if(t < 0) {
          t = 0;
          s = b2Math.Clamp((b - c) / a, 0, 1)
        }
        localPointA = new b2Vec2;
        localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
        localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
        localPointB = new b2Vec2;
        localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
        localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
        if(s == 0 || s == 1) {
          this.m_type = b2SeparationFunction.e_faceB;
          this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1);
          this.m_axis.Normalize();
          this.m_localPoint = localPointB;
          tVec = this.m_axis;
          tMat = transformB.R;
          normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tVec = this.m_localPoint;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointA;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
          if(s < 0) {
            this.m_axis.NegativeSelf()
          }
        }else {
          this.m_type = b2SeparationFunction.e_faceA;
          this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1);
          this.m_localPoint = localPointA;
          tVec = this.m_axis;
          tMat = transformA.R;
          normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tVec = this.m_localPoint;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointB;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
          if(s < 0) {
            this.m_axis.NegativeSelf()
          }
        }
      }
    }
  }
};
b2SeparationFunction.prototype.Evaluate = function(transformA, transformB) {
  var axisA;
  var axisB;
  var localPointA;
  var localPointB;
  var pointA;
  var pointB;
  var seperation;
  var normal;
  switch(this.m_type) {
    case b2SeparationFunction.e_points:
      axisA = b2Math.MulTMV(transformA.R, this.m_axis);
      axisB = b2Math.MulTMV(transformB.R, this.m_axis.GetNegative());
      localPointA = this.m_proxyA.GetSupportVertex(axisA);
      localPointB = this.m_proxyB.GetSupportVertex(axisB);
      pointA = b2Math.MulX(transformA, localPointA);
      pointB = b2Math.MulX(transformB, localPointB);
      seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
      return seperation;
    case b2SeparationFunction.e_faceA:
      normal = b2Math.MulMV(transformA.R, this.m_axis);
      pointA = b2Math.MulX(transformA, this.m_localPoint);
      axisB = b2Math.MulTMV(transformB.R, normal.GetNegative());
      localPointB = this.m_proxyB.GetSupportVertex(axisB);
      pointB = b2Math.MulX(transformB, localPointB);
      seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
      return seperation;
    case b2SeparationFunction.e_faceB:
      normal = b2Math.MulMV(transformB.R, this.m_axis);
      pointB = b2Math.MulX(transformB, this.m_localPoint);
      axisA = b2Math.MulTMV(transformA.R, normal.GetNegative());
      localPointA = this.m_proxyA.GetSupportVertex(axisA);
      pointA = b2Math.MulX(transformA, localPointA);
      seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
      return seperation;
    default:
      b2Settings.b2Assert(false);
      return 0
  }
};
b2SeparationFunction.prototype.m_proxyA = null;
b2SeparationFunction.prototype.m_proxyB = null;
b2SeparationFunction.prototype.m_type = 0;
b2SeparationFunction.prototype.m_localPoint = new b2Vec2;
b2SeparationFunction.prototype.m_axis = new b2Vec2;var b2DynamicTreePair = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTreePair.prototype.__constructor = function() {
};
b2DynamicTreePair.prototype.__varz = function() {
};
b2DynamicTreePair.prototype.proxyA = null;
b2DynamicTreePair.prototype.proxyB = null;var b2ContactConstraintPoint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactConstraintPoint.prototype.__constructor = function() {
};
b2ContactConstraintPoint.prototype.__varz = function() {
  this.localPoint = new b2Vec2;
  this.rA = new b2Vec2;
  this.rB = new b2Vec2
};
b2ContactConstraintPoint.prototype.localPoint = new b2Vec2;
b2ContactConstraintPoint.prototype.rA = new b2Vec2;
b2ContactConstraintPoint.prototype.rB = new b2Vec2;
b2ContactConstraintPoint.prototype.normalImpulse = null;
b2ContactConstraintPoint.prototype.tangentImpulse = null;
b2ContactConstraintPoint.prototype.normalMass = null;
b2ContactConstraintPoint.prototype.tangentMass = null;
b2ContactConstraintPoint.prototype.equalizedMass = null;
b2ContactConstraintPoint.prototype.velocityBias = null;var b2ControllerEdge = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ControllerEdge.prototype.__constructor = function() {
};
b2ControllerEdge.prototype.__varz = function() {
};
b2ControllerEdge.prototype.controller = null;
b2ControllerEdge.prototype.body = null;
b2ControllerEdge.prototype.prevBody = null;
b2ControllerEdge.prototype.nextBody = null;
b2ControllerEdge.prototype.prevController = null;
b2ControllerEdge.prototype.nextController = null;var b2DistanceInput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DistanceInput.prototype.__constructor = function() {
};
b2DistanceInput.prototype.__varz = function() {
};
b2DistanceInput.prototype.proxyA = null;
b2DistanceInput.prototype.proxyB = null;
b2DistanceInput.prototype.transformA = null;
b2DistanceInput.prototype.transformB = null;
b2DistanceInput.prototype.useRadii = null;var b2Settings = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Settings.prototype.__constructor = function() {
};
b2Settings.prototype.__varz = function() {
};
b2Settings.b2MixFriction = function(friction1, friction2) {
  return Math.sqrt(friction1 * friction2)
};
b2Settings.b2MixRestitution = function(restitution1, restitution2) {
  return restitution1 > restitution2 ? restitution1 : restitution2
};
b2Settings.b2Assert = function(a) {
  if(!a) {
    throw"Assertion Failed";
  }
};
b2Settings.VERSION = "2.1alpha";
b2Settings.USHRT_MAX = 65535;
b2Settings.b2_pi = Math.PI;
b2Settings.b2_maxManifoldPoints = 2;
b2Settings.b2_aabbExtension = 0.1;
b2Settings.b2_aabbMultiplier = 2;
b2Settings.b2_polygonRadius = 2 * b2Settings.b2_linearSlop;
b2Settings.b2_linearSlop = 0.0050;
b2Settings.b2_angularSlop = 2 / 180 * b2Settings.b2_pi;
b2Settings.b2_toiSlop = 8 * b2Settings.b2_linearSlop;
b2Settings.b2_maxTOIContactsPerIsland = 32;
b2Settings.b2_maxTOIJointsPerIsland = 32;
b2Settings.b2_velocityThreshold = 1;
b2Settings.b2_maxLinearCorrection = 0.2;
b2Settings.b2_maxAngularCorrection = 8 / 180 * b2Settings.b2_pi;
b2Settings.b2_maxTranslation = 2;
b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation * b2Settings.b2_maxTranslation;
b2Settings.b2_maxRotation = 0.5 * b2Settings.b2_pi;
b2Settings.b2_maxRotationSquared = b2Settings.b2_maxRotation * b2Settings.b2_maxRotation;
b2Settings.b2_contactBaumgarte = 0.2;
b2Settings.b2_timeToSleep = 0.5;
b2Settings.b2_linearSleepTolerance = 0.01;
b2Settings.b2_angularSleepTolerance = 2 / 180 * b2Settings.b2_pi;var b2Proxy = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Proxy.prototype.__constructor = function() {
};
b2Proxy.prototype.__varz = function() {
  this.lowerBounds = new Array(2);
  this.upperBounds = new Array(2);
  this.pairs = new Object
};
b2Proxy.prototype.IsValid = function() {
  return this.overlapCount != b2BroadPhase.b2_invalid
};
b2Proxy.prototype.lowerBounds = new Array(2);
b2Proxy.prototype.upperBounds = new Array(2);
b2Proxy.prototype.overlapCount = 0;
b2Proxy.prototype.timeStamp = 0;
b2Proxy.prototype.pairs = new Object;
b2Proxy.prototype.next = null;
b2Proxy.prototype.userData = null;var b2Point = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Point.prototype.__constructor = function() {
};
b2Point.prototype.__varz = function() {
  this.p = new b2Vec2
};
b2Point.prototype.Support = function(xf, vX, vY) {
  return this.p
};
b2Point.prototype.GetFirstVertex = function(xf) {
  return this.p
};
b2Point.prototype.p = new b2Vec2;var b2WorldManifold = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2WorldManifold.prototype.__constructor = function() {
  this.m_points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i] = new b2Vec2
  }
};
b2WorldManifold.prototype.__varz = function() {
  this.m_normal = new b2Vec2
};
b2WorldManifold.prototype.Initialize = function(manifold, xfA, radiusA, xfB, radiusB) {
  if(manifold.m_pointCount == 0) {
    return
  }
  var i = 0;
  var tVec;
  var tMat;
  var normalX;
  var normalY;
  var planePointX;
  var planePointY;
  var clipPointX;
  var clipPointY;
  switch(manifold.m_type) {
    case b2Manifold.e_circles:
      tMat = xfA.R;
      tVec = manifold.m_localPoint;
      var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = xfB.R;
      tVec = manifold.m_points[0].m_localPoint;
      var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      var dX = pointBX - pointAX;
      var dY = pointBY - pointAY;
      var d2 = dX * dX + dY * dY;
      if(d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
        var d = Math.sqrt(d2);
        this.m_normal.x = dX / d;
        this.m_normal.y = dY / d
      }else {
        this.m_normal.x = 1;
        this.m_normal.y = 0
      }
      var cAX = pointAX + radiusA * this.m_normal.x;
      var cAY = pointAY + radiusA * this.m_normal.y;
      var cBX = pointBX - radiusB * this.m_normal.x;
      var cBY = pointBY - radiusB * this.m_normal.y;
      this.m_points[0].x = 0.5 * (cAX + cBX);
      this.m_points[0].y = 0.5 * (cAY + cBY);
      break;
    case b2Manifold.e_faceA:
      tMat = xfA.R;
      tVec = manifold.m_localPlaneNormal;
      normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = xfA.R;
      tVec = manifold.m_localPoint;
      planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      this.m_normal.x = normalX;
      this.m_normal.y = normalY;
      for(i = 0;i < manifold.m_pointCount;i++) {
        tMat = xfB.R;
        tVec = manifold.m_points[i].m_localPoint;
        clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        this.m_points[i].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
        this.m_points[i].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY
      }
      break;
    case b2Manifold.e_faceB:
      tMat = xfB.R;
      tVec = manifold.m_localPlaneNormal;
      normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = xfB.R;
      tVec = manifold.m_localPoint;
      planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      this.m_normal.x = -normalX;
      this.m_normal.y = -normalY;
      for(i = 0;i < manifold.m_pointCount;i++) {
        tMat = xfA.R;
        tVec = manifold.m_points[i].m_localPoint;
        clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        this.m_points[i].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
        this.m_points[i].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY
      }
      break
  }
};
b2WorldManifold.prototype.m_normal = new b2Vec2;
b2WorldManifold.prototype.m_points = null;var b2RayCastOutput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2RayCastOutput.prototype.__constructor = function() {
};
b2RayCastOutput.prototype.__varz = function() {
  this.normal = new b2Vec2
};
b2RayCastOutput.prototype.normal = new b2Vec2;
b2RayCastOutput.prototype.fraction = null;var b2ConstantForceController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2ConstantForceController.prototype, b2Controller.prototype);
b2ConstantForceController.prototype._super = b2Controller.prototype;
b2ConstantForceController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2ConstantForceController.prototype.__varz = function() {
  this.F = new b2Vec2(0, 0)
};
b2ConstantForceController.prototype.Step = function(step) {
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(!body.IsAwake()) {
      continue
    }
    body.ApplyForce(this.F, body.GetWorldCenter())
  }
};
b2ConstantForceController.prototype.F = new b2Vec2(0, 0);var b2MassData = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2MassData.prototype.__constructor = function() {
};
b2MassData.prototype.__varz = function() {
  this.center = new b2Vec2(0, 0)
};
b2MassData.prototype.mass = 0;
b2MassData.prototype.center = new b2Vec2(0, 0);
b2MassData.prototype.I = 0;var b2DynamicTree = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTree.prototype.__constructor = function() {
  this.m_root = null;
  this.m_freeList = null;
  this.m_path = 0;
  this.m_insertionCount = 0
};
b2DynamicTree.prototype.__varz = function() {
};
b2DynamicTree.prototype.AllocateNode = function() {
  if(this.m_freeList) {
    var node = this.m_freeList;
    this.m_freeList = node.parent;
    node.parent = null;
    node.child1 = null;
    node.child2 = null;
    return node
  }
  return new b2DynamicTreeNode
};
b2DynamicTree.prototype.FreeNode = function(node) {
  node.parent = this.m_freeList;
  this.m_freeList = node
};
b2DynamicTree.prototype.InsertLeaf = function(leaf) {
  ++this.m_insertionCount;
  if(this.m_root == null) {
    this.m_root = leaf;
    this.m_root.parent = null;
    return
  }
  var center = leaf.aabb.GetCenter();
  var sibling = this.m_root;
  if(sibling.IsLeaf() == false) {
    do {
      var child1 = sibling.child1;
      var child2 = sibling.child2;
      var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
      var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
      if(norm1 < norm2) {
        sibling = child1
      }else {
        sibling = child2
      }
    }while(sibling.IsLeaf() == false)
  }
  var node1 = sibling.parent;
  var node2 = this.AllocateNode();
  node2.parent = node1;
  node2.userData = null;
  node2.aabb.Combine(leaf.aabb, sibling.aabb);
  if(node1) {
    if(sibling.parent.child1 == sibling) {
      node1.child1 = node2
    }else {
      node1.child2 = node2
    }
    node2.child1 = sibling;
    node2.child2 = leaf;
    sibling.parent = node2;
    leaf.parent = node2;
    do {
      if(node1.aabb.Contains(node2.aabb)) {
        break
      }
      node1.aabb.Combine(node1.child1.aabb, node1.child2.aabb);
      node2 = node1;
      node1 = node1.parent
    }while(node1)
  }else {
    node2.child1 = sibling;
    node2.child2 = leaf;
    sibling.parent = node2;
    leaf.parent = node2;
    this.m_root = node2
  }
};
b2DynamicTree.prototype.RemoveLeaf = function(leaf) {
  if(leaf == this.m_root) {
    this.m_root = null;
    return
  }
  var node2 = leaf.parent;
  var node1 = node2.parent;
  var sibling;
  if(node2.child1 == leaf) {
    sibling = node2.child2
  }else {
    sibling = node2.child1
  }
  if(node1) {
    if(node1.child1 == node2) {
      node1.child1 = sibling
    }else {
      node1.child2 = sibling
    }
    sibling.parent = node1;
    this.FreeNode(node2);
    while(node1) {
      var oldAABB = node1.aabb;
      node1.aabb = b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
      if(oldAABB.Contains(node1.aabb)) {
        break
      }
      node1 = node1.parent
    }
  }else {
    this.m_root = sibling;
    sibling.parent = null;
    this.FreeNode(node2)
  }
};
b2DynamicTree.prototype.CreateProxy = function(aabb, userData) {
  var node = this.AllocateNode();
  var extendX = b2Settings.b2_aabbExtension;
  var extendY = b2Settings.b2_aabbExtension;
  node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
  node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
  node.aabb.upperBound.x = aabb.upperBound.x + extendX;
  node.aabb.upperBound.y = aabb.upperBound.y + extendY;
  node.userData = userData;
  this.InsertLeaf(node);
  return node
};
b2DynamicTree.prototype.DestroyProxy = function(proxy) {
  this.RemoveLeaf(proxy);
  this.FreeNode(proxy)
};
b2DynamicTree.prototype.MoveProxy = function(proxy, aabb, displacement) {
  b2Settings.b2Assert(proxy.IsLeaf());
  if(proxy.aabb.Contains(aabb)) {
    return false
  }
  this.RemoveLeaf(proxy);
  var extendX = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : -displacement.x);
  var extendY = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : -displacement.y);
  proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
  proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
  proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
  proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
  this.InsertLeaf(proxy);
  return true
};
b2DynamicTree.prototype.Rebalance = function(iterations) {
  if(this.m_root == null) {
    return
  }
  for(var i = 0;i < iterations;i++) {
    var node = this.m_root;
    var bit = 0;
    while(node.IsLeaf() == false) {
      node = this.m_path >> bit & 1 ? node.child2 : node.child1;
      bit = bit + 1 & 31
    }
    ++this.m_path;
    this.RemoveLeaf(node);
    this.InsertLeaf(node)
  }
};
b2DynamicTree.prototype.GetFatAABB = function(proxy) {
  return proxy.aabb
};
b2DynamicTree.prototype.GetUserData = function(proxy) {
  return proxy.userData
};
b2DynamicTree.prototype.Query = function(callback, aabb) {
  if(this.m_root == null) {
    return
  }
  var stack = new Array;
  var count = 0;
  stack[count++] = this.m_root;
  while(count > 0) {
    var node = stack[--count];
    if(node.aabb.TestOverlap(aabb)) {
      if(node.IsLeaf()) {
        var proceed = callback(node);
        if(!proceed) {
          return
        }
      }else {
        stack[count++] = node.child1;
        stack[count++] = node.child2
      }
    }
  }
};
b2DynamicTree.prototype.RayCast = function(callback, input) {
  if(this.m_root == null) {
    return
  }
  var p1 = input.p1;
  var p2 = input.p2;
  var r = b2Math.SubtractVV(p1, p2);
  r.Normalize();
  var v = b2Math.CrossFV(1, r);
  var abs_v = b2Math.AbsV(v);
  var maxFraction = input.maxFraction;
  var segmentAABB = new b2AABB;
  var tX;
  var tY;
  tX = p1.x + maxFraction * (p2.x - p1.x);
  tY = p1.y + maxFraction * (p2.y - p1.y);
  segmentAABB.lowerBound.x = Math.min(p1.x, tX);
  segmentAABB.lowerBound.y = Math.min(p1.y, tY);
  segmentAABB.upperBound.x = Math.max(p1.x, tX);
  segmentAABB.upperBound.y = Math.max(p1.y, tY);
  var stack = new Array;
  var count = 0;
  stack[count++] = this.m_root;
  while(count > 0) {
    var node = stack[--count];
    if(node.aabb.TestOverlap(segmentAABB) == false) {
      continue
    }
    var c = node.aabb.GetCenter();
    var h = node.aabb.GetExtents();
    var separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
    if(separation > 0) {
      continue
    }
    if(node.IsLeaf()) {
      var subInput = new b2RayCastInput;
      subInput.p1 = input.p1;
      subInput.p2 = input.p2;
      subInput.maxFraction = input.maxFraction;
      maxFraction = callback(subInput, node);
      if(maxFraction == 0) {
        return
      }
      tX = p1.x + maxFraction * (p2.x - p1.x);
      tY = p1.y + maxFraction * (p2.y - p1.y);
      segmentAABB.lowerBound.x = Math.min(p1.x, tX);
      segmentAABB.lowerBound.y = Math.min(p1.y, tY);
      segmentAABB.upperBound.x = Math.max(p1.x, tX);
      segmentAABB.upperBound.y = Math.max(p1.y, tY)
    }else {
      stack[count++] = node.child1;
      stack[count++] = node.child2
    }
  }
};
b2DynamicTree.prototype.m_root = null;
b2DynamicTree.prototype.m_freeList = null;
b2DynamicTree.prototype.m_path = 0;
b2DynamicTree.prototype.m_insertionCount = 0;var b2JointEdge = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2JointEdge.prototype.__constructor = function() {
};
b2JointEdge.prototype.__varz = function() {
};
b2JointEdge.prototype.other = null;
b2JointEdge.prototype.joint = null;
b2JointEdge.prototype.prev = null;
b2JointEdge.prototype.next = null;var b2RayCastInput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2RayCastInput.prototype.__constructor = function() {
};
b2RayCastInput.prototype.__varz = function() {
  this.p1 = new b2Vec2;
  this.p2 = new b2Vec2
};
b2RayCastInput.prototype.p1 = new b2Vec2;
b2RayCastInput.prototype.p2 = new b2Vec2;
b2RayCastInput.prototype.maxFraction = null;var Features = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
Features.prototype.__constructor = function() {
};
Features.prototype.__varz = function() {
};
Features.prototype.__defineGetter__("referenceEdge", function() {
  return this._referenceEdge
});
Features.prototype.__defineSetter__("referenceEdge", function(value) {
  this._referenceEdge = value;
  this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
});
Features.prototype.__defineGetter__("incidentEdge", function() {
  return this._incidentEdge
});
Features.prototype.__defineSetter__("incidentEdge", function(value) {
  this._incidentEdge = value;
  this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
});
Features.prototype.__defineGetter__("incidentVertex", function() {
  return this._incidentVertex
});
Features.prototype.__defineSetter__("incidentVertex", function(value) {
  this._incidentVertex = value;
  this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
});
Features.prototype.__defineGetter__("flip", function() {
  return this._flip
});
Features.prototype.__defineSetter__("flip", function(value) {
  this._flip = value;
  this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
});
Features.prototype._referenceEdge = 0;
Features.prototype._incidentEdge = 0;
Features.prototype._incidentVertex = 0;
Features.prototype._flip = 0;
Features.prototype._m_id = null;var b2FilterData = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2FilterData.prototype.__constructor = function() {
};
b2FilterData.prototype.__varz = function() {
  this.categoryBits = 1;
  this.maskBits = 65535
};
b2FilterData.prototype.Copy = function() {
  var copy = new b2FilterData;
  copy.categoryBits = this.categoryBits;
  copy.maskBits = this.maskBits;
  copy.groupIndex = this.groupIndex;
  return copy
};
b2FilterData.prototype.categoryBits = 1;
b2FilterData.prototype.maskBits = 65535;
b2FilterData.prototype.groupIndex = 0;var b2AABB = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2AABB.prototype.__constructor = function() {
};
b2AABB.prototype.__varz = function() {
  this.lowerBound = new b2Vec2;
  this.upperBound = new b2Vec2
};
b2AABB.Combine = function(aabb1, aabb2) {
  var aabb = new b2AABB;
  aabb.Combine(aabb1, aabb2);
  return aabb
};
b2AABB.prototype.IsValid = function() {
  var dX = this.upperBound.x - this.lowerBound.x;
  var dY = this.upperBound.y - this.lowerBound.y;
  var valid = dX >= 0 && dY >= 0;
  valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
  return valid
};
b2AABB.prototype.GetCenter = function() {
  return new b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
};
b2AABB.prototype.GetExtents = function() {
  return new b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
};
b2AABB.prototype.Contains = function(aabb) {
  var result = true && this.lowerBound.x <= aabb.lowerBound.x && this.lowerBound.y <= aabb.lowerBound.y && aabb.upperBound.x <= this.upperBound.x && aabb.upperBound.y <= this.upperBound.y;
  return result
};
b2AABB.prototype.RayCast = function(output, input) {
  var tmin = -Number.MAX_VALUE;
  var tmax = Number.MAX_VALUE;
  var pX = input.p1.x;
  var pY = input.p1.y;
  var dX = input.p2.x - input.p1.x;
  var dY = input.p2.y - input.p1.y;
  var absDX = Math.abs(dX);
  var absDY = Math.abs(dY);
  var normal = output.normal;
  var inv_d;
  var t1;
  var t2;
  var t3;
  var s;
  if(absDX < Number.MIN_VALUE) {
    if(pX < this.lowerBound.x || this.upperBound.x < pX) {
      return false
    }
  }else {
    inv_d = 1 / dX;
    t1 = (this.lowerBound.x - pX) * inv_d;
    t2 = (this.upperBound.x - pX) * inv_d;
    s = -1;
    if(t1 > t2) {
      t3 = t1;
      t1 = t2;
      t2 = t3;
      s = 1
    }
    if(t1 > tmin) {
      normal.x = s;
      normal.y = 0;
      tmin = t1
    }
    tmax = Math.min(tmax, t2);
    if(tmin > tmax) {
      return false
    }
  }
  if(absDY < Number.MIN_VALUE) {
    if(pY < this.lowerBound.y || this.upperBound.y < pY) {
      return false
    }
  }else {
    inv_d = 1 / dY;
    t1 = (this.lowerBound.y - pY) * inv_d;
    t2 = (this.upperBound.y - pY) * inv_d;
    s = -1;
    if(t1 > t2) {
      t3 = t1;
      t1 = t2;
      t2 = t3;
      s = 1
    }
    if(t1 > tmin) {
      normal.y = s;
      normal.x = 0;
      tmin = t1
    }
    tmax = Math.min(tmax, t2);
    if(tmin > tmax) {
      return false
    }
  }
  output.fraction = tmin;
  return true
};
b2AABB.prototype.TestOverlap = function(other) {
  var d1X = other.lowerBound.x - this.upperBound.x;
  var d1Y = other.lowerBound.y - this.upperBound.y;
  var d2X = this.lowerBound.x - other.upperBound.x;
  var d2Y = this.lowerBound.y - other.upperBound.y;
  if(d1X > 0 || d1Y > 0) {
    return false
  }
  if(d2X > 0 || d2Y > 0) {
    return false
  }
  return true
};
b2AABB.prototype.Combine = function(aabb1, aabb2) {
  this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
  this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
  this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
  this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y)
};
b2AABB.prototype.lowerBound = new b2Vec2;
b2AABB.prototype.upperBound = new b2Vec2;var b2Jacobian = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Jacobian.prototype.__constructor = function() {
};
b2Jacobian.prototype.__varz = function() {
  this.linearA = new b2Vec2;
  this.linearB = new b2Vec2
};
b2Jacobian.prototype.SetZero = function() {
  this.linearA.SetZero();
  this.angularA = 0;
  this.linearB.SetZero();
  this.angularB = 0
};
b2Jacobian.prototype.Set = function(x1, a1, x2, a2) {
  this.linearA.SetV(x1);
  this.angularA = a1;
  this.linearB.SetV(x2);
  this.angularB = a2
};
b2Jacobian.prototype.Compute = function(x1, a1, x2, a2) {
  return this.linearA.x * x1.x + this.linearA.y * x1.y + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2
};
b2Jacobian.prototype.linearA = new b2Vec2;
b2Jacobian.prototype.angularA = null;
b2Jacobian.prototype.linearB = new b2Vec2;
b2Jacobian.prototype.angularB = null;var b2Bound = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Bound.prototype.__constructor = function() {
};
b2Bound.prototype.__varz = function() {
};
b2Bound.prototype.IsLower = function() {
  return(this.value & 1) == 0
};
b2Bound.prototype.IsUpper = function() {
  return(this.value & 1) == 1
};
b2Bound.prototype.Swap = function(b) {
  var tempValue = this.value;
  var tempProxy = this.proxy;
  var tempStabbingCount = this.stabbingCount;
  this.value = b.value;
  this.proxy = b.proxy;
  this.stabbingCount = b.stabbingCount;
  b.value = tempValue;
  b.proxy = tempProxy;
  b.stabbingCount = tempStabbingCount
};
b2Bound.prototype.value = 0;
b2Bound.prototype.proxy = null;
b2Bound.prototype.stabbingCount = 0;var b2SimplexVertex = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2SimplexVertex.prototype.__constructor = function() {
};
b2SimplexVertex.prototype.__varz = function() {
};
b2SimplexVertex.prototype.Set = function(other) {
  this.wA.SetV(other.wA);
  this.wB.SetV(other.wB);
  this.w.SetV(other.w);
  this.a = other.a;
  this.indexA = other.indexA;
  this.indexB = other.indexB
};
b2SimplexVertex.prototype.wA = null;
b2SimplexVertex.prototype.wB = null;
b2SimplexVertex.prototype.w = null;
b2SimplexVertex.prototype.a = null;
b2SimplexVertex.prototype.indexA = 0;
b2SimplexVertex.prototype.indexB = 0;var b2Mat22 = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Mat22.prototype.__constructor = function() {
  this.col1.x = this.col2.y = 1
};
b2Mat22.prototype.__varz = function() {
  this.col1 = new b2Vec2;
  this.col2 = new b2Vec2
};
b2Mat22.FromAngle = function(angle) {
  var mat = new b2Mat22;
  mat.Set(angle);
  return mat
};
b2Mat22.FromVV = function(c1, c2) {
  var mat = new b2Mat22;
  mat.SetVV(c1, c2);
  return mat
};
b2Mat22.prototype.Set = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  this.col1.x = c;
  this.col2.x = -s;
  this.col1.y = s;
  this.col2.y = c
};
b2Mat22.prototype.SetVV = function(c1, c2) {
  this.col1.SetV(c1);
  this.col2.SetV(c2)
};
b2Mat22.prototype.Copy = function() {
  var mat = new b2Mat22;
  mat.SetM(this);
  return mat
};
b2Mat22.prototype.SetM = function(m) {
  this.col1.SetV(m.col1);
  this.col2.SetV(m.col2)
};
b2Mat22.prototype.AddM = function(m) {
  this.col1.x += m.col1.x;
  this.col1.y += m.col1.y;
  this.col2.x += m.col2.x;
  this.col2.y += m.col2.y
};
b2Mat22.prototype.SetIdentity = function() {
  this.col1.x = 1;
  this.col2.x = 0;
  this.col1.y = 0;
  this.col2.y = 1
};
b2Mat22.prototype.SetZero = function() {
  this.col1.x = 0;
  this.col2.x = 0;
  this.col1.y = 0;
  this.col2.y = 0
};
b2Mat22.prototype.GetAngle = function() {
  return Math.atan2(this.col1.y, this.col1.x)
};
b2Mat22.prototype.GetInverse = function(out) {
  var a = this.col1.x;
  var b = this.col2.x;
  var c = this.col1.y;
  var d = this.col2.y;
  var det = a * d - b * c;
  if(det != 0) {
    det = 1 / det
  }
  out.col1.x = det * d;
  out.col2.x = -det * b;
  out.col1.y = -det * c;
  out.col2.y = det * a;
  return out
};
b2Mat22.prototype.Solve = function(out, bX, bY) {
  var a11 = this.col1.x;
  var a12 = this.col2.x;
  var a21 = this.col1.y;
  var a22 = this.col2.y;
  var det = a11 * a22 - a12 * a21;
  if(det != 0) {
    det = 1 / det
  }
  out.x = det * (a22 * bX - a12 * bY);
  out.y = det * (a11 * bY - a21 * bX);
  return out
};
b2Mat22.prototype.Abs = function() {
  this.col1.Abs();
  this.col2.Abs()
};
b2Mat22.prototype.col1 = new b2Vec2;
b2Mat22.prototype.col2 = new b2Vec2;var b2SimplexCache = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2SimplexCache.prototype.__constructor = function() {
};
b2SimplexCache.prototype.__varz = function() {
  this.indexA = new Array(3);
  this.indexB = new Array(3)
};
b2SimplexCache.prototype.metric = null;
b2SimplexCache.prototype.count = 0;
b2SimplexCache.prototype.indexA = new Array(3);
b2SimplexCache.prototype.indexB = new Array(3);var b2Shape = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Shape.prototype.__constructor = function() {
  this.m_type = b2Shape.e_unknownShape;
  this.m_radius = b2Settings.b2_linearSlop
};
b2Shape.prototype.__varz = function() {
};
b2Shape.TestOverlap = function(shape1, transform1, shape2, transform2) {
  var input = new b2DistanceInput;
  input.proxyA = new b2DistanceProxy;
  input.proxyA.Set(shape1);
  input.proxyB = new b2DistanceProxy;
  input.proxyB.Set(shape2);
  input.transformA = transform1;
  input.transformB = transform2;
  input.useRadii = true;
  var simplexCache = new b2SimplexCache;
  simplexCache.count = 0;
  var output = new b2DistanceOutput;
  b2Distance.Distance(output, simplexCache, input);
  return output.distance < 10 * Number.MIN_VALUE
};
b2Shape.e_hitCollide = 1;
b2Shape.e_missCollide = 0;
b2Shape.e_startsInsideCollide = -1;
b2Shape.e_unknownShape = -1;
b2Shape.e_circleShape = 0;
b2Shape.e_polygonShape = 1;
b2Shape.e_edgeShape = 2;
b2Shape.e_shapeTypeCount = 3;
b2Shape.prototype.Copy = function() {
  return null
};
b2Shape.prototype.Set = function(other) {
  this.m_radius = other.m_radius
};
b2Shape.prototype.GetType = function() {
  return this.m_type
};
b2Shape.prototype.TestPoint = function(xf, p) {
  return false
};
b2Shape.prototype.RayCast = function(output, input, transform) {
  return false
};
b2Shape.prototype.ComputeAABB = function(aabb, xf) {
};
b2Shape.prototype.ComputeMass = function(massData, density) {
};
b2Shape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  return 0
};
b2Shape.prototype.m_type = 0;
b2Shape.prototype.m_radius = null;var b2Segment = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Segment.prototype.__constructor = function() {
};
b2Segment.prototype.__varz = function() {
  this.p1 = new b2Vec2;
  this.p2 = new b2Vec2
};
b2Segment.prototype.TestSegment = function(lambda, normal, segment, maxLambda) {
  var s = segment.p1;
  var rX = segment.p2.x - s.x;
  var rY = segment.p2.y - s.y;
  var dX = this.p2.x - this.p1.x;
  var dY = this.p2.y - this.p1.y;
  var nX = dY;
  var nY = -dX;
  var k_slop = 100 * Number.MIN_VALUE;
  var denom = -(rX * nX + rY * nY);
  if(denom > k_slop) {
    var bX = s.x - this.p1.x;
    var bY = s.y - this.p1.y;
    var a = bX * nX + bY * nY;
    if(0 <= a && a <= maxLambda * denom) {
      var mu2 = -rX * bY + rY * bX;
      if(-k_slop * denom <= mu2 && mu2 <= denom * (1 + k_slop)) {
        a /= denom;
        var nLen = Math.sqrt(nX * nX + nY * nY);
        nX /= nLen;
        nY /= nLen;
        lambda[0] = a;
        normal.Set(nX, nY);
        return true
      }
    }
  }
  return false
};
b2Segment.prototype.Extend = function(aabb) {
  this.ExtendForward(aabb);
  this.ExtendBackward(aabb)
};
b2Segment.prototype.ExtendForward = function(aabb) {
  var dX = this.p2.x - this.p1.x;
  var dY = this.p2.y - this.p1.y;
  var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p1.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p1.x) / dX : Number.POSITIVE_INFINITY, dY > 0 ? (aabb.upperBound.y - this.p1.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p1.y) / dY : Number.POSITIVE_INFINITY);
  this.p2.x = this.p1.x + dX * lambda;
  this.p2.y = this.p1.y + dY * lambda
};
b2Segment.prototype.ExtendBackward = function(aabb) {
  var dX = -this.p2.x + this.p1.x;
  var dY = -this.p2.y + this.p1.y;
  var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p2.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p2.x) / dX : Number.POSITIVE_INFINITY, dY > 0 ? (aabb.upperBound.y - this.p2.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p2.y) / dY : Number.POSITIVE_INFINITY);
  this.p1.x = this.p2.x + dX * lambda;
  this.p1.y = this.p2.y + dY * lambda
};
b2Segment.prototype.p1 = new b2Vec2;
b2Segment.prototype.p2 = new b2Vec2;var b2ContactRegister = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactRegister.prototype.__constructor = function() {
};
b2ContactRegister.prototype.__varz = function() {
};
b2ContactRegister.prototype.createFcn = null;
b2ContactRegister.prototype.destroyFcn = null;
b2ContactRegister.prototype.primary = null;
b2ContactRegister.prototype.pool = null;
b2ContactRegister.prototype.poolCount = 0;var b2DebugDraw = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DebugDraw.prototype.__constructor = function() {
  this.m_drawFlags = 0
};
b2DebugDraw.prototype.__varz = function() {
};
b2DebugDraw.e_shapeBit = 1;
b2DebugDraw.e_jointBit = 2;
b2DebugDraw.e_aabbBit = 4;
b2DebugDraw.e_pairBit = 8;
b2DebugDraw.e_centerOfMassBit = 16;
b2DebugDraw.e_controllerBit = 32;
b2DebugDraw.prototype.SetFlags = function(flags) {
  this.m_drawFlags = flags
};
b2DebugDraw.prototype.GetFlags = function() {
  return this.m_drawFlags
};
b2DebugDraw.prototype.AppendFlags = function(flags) {
  this.m_drawFlags |= flags
};
b2DebugDraw.prototype.ClearFlags = function(flags) {
  this.m_drawFlags &= ~flags
};
b2DebugDraw.prototype.SetSprite = function(sprite) {
  this.m_sprite = sprite
};
b2DebugDraw.prototype.GetSprite = function() {
  return this.m_sprite
};
b2DebugDraw.prototype.SetDrawScale = function(drawScale) {
  this.m_drawScale = drawScale
};
b2DebugDraw.prototype.GetDrawScale = function() {
  return this.m_drawScale
};
b2DebugDraw.prototype.SetLineThickness = function(lineThickness) {
  this.m_lineThickness = lineThickness
};
b2DebugDraw.prototype.GetLineThickness = function() {
  return this.m_lineThickness
};
b2DebugDraw.prototype.SetAlpha = function(alpha) {
  this.m_alpha = alpha
};
b2DebugDraw.prototype.GetAlpha = function() {
  return this.m_alpha
};
b2DebugDraw.prototype.SetFillAlpha = function(alpha) {
  this.m_fillAlpha = alpha
};
b2DebugDraw.prototype.GetFillAlpha = function() {
  return this.m_fillAlpha
};
b2DebugDraw.prototype.SetXFormScale = function(xformScale) {
  this.m_xformScale = xformScale
};
b2DebugDraw.prototype.GetXFormScale = function() {
  return this.m_xformScale
};
b2DebugDraw.prototype.Clear = function() {
  this.m_sprite.clearRect(0, 0, this.m_sprite.canvas.width, this.m_sprite.canvas.height)
};
b2DebugDraw.prototype.Y = function(y) {
  return this.m_sprite.canvas.height - y
};
b2DebugDraw.prototype.ToWorldPoint = function(localPoint) {
  return new b2Vec2(localPoint.x / this.m_drawScale, this.Y(localPoint.y) / this.m_drawScale)
};
b2DebugDraw.prototype.ColorStyle = function(color, alpha) {
  return"rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + alpha + ")"
};
b2DebugDraw.prototype.DrawPolygon = function(vertices, vertexCount, color) {
  this.m_sprite.graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
  this.m_sprite.graphics.moveTo(vertices[0].x * this.m_drawScale, vertices[0].y * this.m_drawScale);
  for(var i = 1;i < vertexCount;i++) {
    this.m_sprite.graphics.lineTo(vertices[i].x * this.m_drawScale, vertices[i].y * this.m_drawScale)
  }
  this.m_sprite.graphics.lineTo(vertices[0].x * this.m_drawScale, vertices[0].y * this.m_drawScale)
};
b2DebugDraw.prototype.DrawSolidPolygon = function(vertices, vertexCount, color) {
  this.m_sprite.strokeSyle = this.ColorStyle(color, this.m_alpha);
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.fillStyle = this.ColorStyle(color, this.m_fillAlpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(vertices[0].x * this.m_drawScale, this.Y(vertices[0].y * this.m_drawScale));
  for(var i = 1;i < vertexCount;i++) {
    this.m_sprite.lineTo(vertices[i].x * this.m_drawScale, this.Y(vertices[i].y * this.m_drawScale))
  }
  this.m_sprite.lineTo(vertices[0].x * this.m_drawScale, this.Y(vertices[0].y * this.m_drawScale));
  this.m_sprite.fill();
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.DrawCircle = function(center, radius, color) {
  this.m_sprite.graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
  this.m_sprite.graphics.drawCircle(center.x * this.m_drawScale, center.y * this.m_drawScale, radius * this.m_drawScale)
};
b2DebugDraw.prototype.DrawSolidCircle = function(center, radius, axis, color) {
  this.m_sprite.strokeSyle = this.ColorStyle(color, this.m_alpha);
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.fillStyle = this.ColorStyle(color, this.m_fillAlpha);
  this.m_sprite.beginPath();
  this.m_sprite.arc(center.x * this.m_drawScale, this.Y(center.y * this.m_drawScale), radius * this.m_drawScale, 0, Math.PI * 2, true);
  this.m_sprite.fill();
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.DrawSegment = function(p1, p2, color) {
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.strokeSyle = this.ColorStyle(color, this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(p1.x * this.m_drawScale, this.Y(p1.y * this.m_drawScale));
  this.m_sprite.lineTo(p2.x * this.m_drawScale, this.Y(p2.y * this.m_drawScale));
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.DrawTransform = function(xf) {
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.strokeSyle = this.ColorStyle(new b2Color(255, 0, 0), this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(xf.position.x * this.m_drawScale, this.Y(xf.position.y * this.m_drawScale));
  this.m_sprite.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * this.m_drawScale, this.Y((xf.position.y + this.m_xformScale * xf.R.col1.y) * this.m_drawScale));
  this.m_sprite.stroke();
  this.m_sprite.closePath();
  this.m_sprite.strokeSyle = this.ColorStyle(new b2Color(0, 255, 0), this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(xf.position.x * this.m_drawScale, this.Y(xf.position.y * this.m_drawScale));
  this.m_sprite.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * this.m_drawScale, this.Y((xf.position.y + this.m_xformScale * xf.R.col2.y) * this.m_drawScale));
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.m_drawFlags = 0;
b2DebugDraw.prototype.m_sprite = null;
b2DebugDraw.prototype.m_drawScale = 1;
b2DebugDraw.prototype.m_lineThickness = 1;
b2DebugDraw.prototype.m_alpha = 1;
b2DebugDraw.prototype.m_fillAlpha = 1;
b2DebugDraw.prototype.m_xformScale = 1;var b2Sweep = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Sweep.prototype.__constructor = function() {
};
b2Sweep.prototype.__varz = function() {
  this.localCenter = new b2Vec2;
  this.c0 = new b2Vec2;
  this.c = new b2Vec2
};
b2Sweep.prototype.Set = function(other) {
  this.localCenter.SetV(other.localCenter);
  this.c0.SetV(other.c0);
  this.c.SetV(other.c);
  this.a0 = other.a0;
  this.a = other.a;
  this.t0 = other.t0
};
b2Sweep.prototype.Copy = function() {
  var copy = new b2Sweep;
  copy.localCenter.SetV(this.localCenter);
  copy.c0.SetV(this.c0);
  copy.c.SetV(this.c);
  copy.a0 = this.a0;
  copy.a = this.a;
  copy.t0 = this.t0;
  return copy
};
b2Sweep.prototype.GetTransform = function(xf, alpha) {
  xf.position.x = (1 - alpha) * this.c0.x + alpha * this.c.x;
  xf.position.y = (1 - alpha) * this.c0.y + alpha * this.c.y;
  var angle = (1 - alpha) * this.a0 + alpha * this.a;
  xf.R.Set(angle);
  var tMat = xf.R;
  xf.position.x -= tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y;
  xf.position.y -= tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y
};
b2Sweep.prototype.Advance = function(t) {
  if(this.t0 < t && 1 - this.t0 > Number.MIN_VALUE) {
    var alpha = (t - this.t0) / (1 - this.t0);
    this.c0.x = (1 - alpha) * this.c0.x + alpha * this.c.x;
    this.c0.y = (1 - alpha) * this.c0.y + alpha * this.c.y;
    this.a0 = (1 - alpha) * this.a0 + alpha * this.a;
    this.t0 = t
  }
};
b2Sweep.prototype.localCenter = new b2Vec2;
b2Sweep.prototype.c0 = new b2Vec2;
b2Sweep.prototype.c = new b2Vec2;
b2Sweep.prototype.a0 = null;
b2Sweep.prototype.a = null;
b2Sweep.prototype.t0 = null;var b2DistanceOutput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DistanceOutput.prototype.__constructor = function() {
};
b2DistanceOutput.prototype.__varz = function() {
  this.pointA = new b2Vec2;
  this.pointB = new b2Vec2
};
b2DistanceOutput.prototype.pointA = new b2Vec2;
b2DistanceOutput.prototype.pointB = new b2Vec2;
b2DistanceOutput.prototype.distance = null;
b2DistanceOutput.prototype.iterations = 0;var b2Mat33 = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Mat33.prototype.__constructor = function(c1, c2, c3) {
  if(!c1 && !c2 && !c3) {
    this.col1.SetZero();
    this.col2.SetZero();
    this.col3.SetZero()
  }else {
    this.col1.SetV(c1);
    this.col2.SetV(c2);
    this.col3.SetV(c3)
  }
};
b2Mat33.prototype.__varz = function() {
  this.col1 = new b2Vec3;
  this.col2 = new b2Vec3;
  this.col3 = new b2Vec3
};
b2Mat33.prototype.SetVVV = function(c1, c2, c3) {
  this.col1.SetV(c1);
  this.col2.SetV(c2);
  this.col3.SetV(c3)
};
b2Mat33.prototype.Copy = function() {
  return new b2Mat33(this.col1, this.col2, this.col3)
};
b2Mat33.prototype.SetM = function(m) {
  this.col1.SetV(m.col1);
  this.col2.SetV(m.col2);
  this.col3.SetV(m.col3)
};
b2Mat33.prototype.AddM = function(m) {
  this.col1.x += m.col1.x;
  this.col1.y += m.col1.y;
  this.col1.z += m.col1.z;
  this.col2.x += m.col2.x;
  this.col2.y += m.col2.y;
  this.col2.z += m.col2.z;
  this.col3.x += m.col3.x;
  this.col3.y += m.col3.y;
  this.col3.z += m.col3.z
};
b2Mat33.prototype.SetIdentity = function() {
  this.col1.x = 1;
  this.col2.x = 0;
  this.col3.x = 0;
  this.col1.y = 0;
  this.col2.y = 1;
  this.col3.y = 0;
  this.col1.z = 0;
  this.col2.z = 0;
  this.col3.z = 1
};
b2Mat33.prototype.SetZero = function() {
  this.col1.x = 0;
  this.col2.x = 0;
  this.col3.x = 0;
  this.col1.y = 0;
  this.col2.y = 0;
  this.col3.y = 0;
  this.col1.z = 0;
  this.col2.z = 0;
  this.col3.z = 0
};
b2Mat33.prototype.Solve22 = function(out, bX, bY) {
  var a11 = this.col1.x;
  var a12 = this.col2.x;
  var a21 = this.col1.y;
  var a22 = this.col2.y;
  var det = a11 * a22 - a12 * a21;
  if(det != 0) {
    det = 1 / det
  }
  out.x = det * (a22 * bX - a12 * bY);
  out.y = det * (a11 * bY - a21 * bX);
  return out
};
b2Mat33.prototype.Solve33 = function(out, bX, bY, bZ) {
  var a11 = this.col1.x;
  var a21 = this.col1.y;
  var a31 = this.col1.z;
  var a12 = this.col2.x;
  var a22 = this.col2.y;
  var a32 = this.col2.z;
  var a13 = this.col3.x;
  var a23 = this.col3.y;
  var a33 = this.col3.z;
  var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
  if(det != 0) {
    det = 1 / det
  }
  out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
  out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
  out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
  return out
};
b2Mat33.prototype.col1 = new b2Vec3;
b2Mat33.prototype.col2 = new b2Vec3;
b2Mat33.prototype.col3 = new b2Vec3;var b2PositionSolverManifold = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2PositionSolverManifold.prototype.__constructor = function() {
  this.m_normal = new b2Vec2;
  this.m_separations = new Array(b2Settings.b2_maxManifoldPoints);
  this.m_points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i] = new b2Vec2
  }
};
b2PositionSolverManifold.prototype.__varz = function() {
};
b2PositionSolverManifold.circlePointA = new b2Vec2;
b2PositionSolverManifold.circlePointB = new b2Vec2;
b2PositionSolverManifold.prototype.Initialize = function(cc) {
  b2Settings.b2Assert(cc.pointCount > 0);
  var i = 0;
  var clipPointX;
  var clipPointY;
  var tMat;
  var tVec;
  var planePointX;
  var planePointY;
  switch(cc.type) {
    case b2Manifold.e_circles:
      tMat = cc.bodyA.m_xf.R;
      tVec = cc.localPoint;
      var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = cc.bodyB.m_xf.R;
      tVec = cc.points[0].localPoint;
      var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var dX = pointBX - pointAX;
      var dY = pointBY - pointAY;
      var d2 = dX * dX + dY * dY;
      if(d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
        var d = Math.sqrt(d2);
        this.m_normal.x = dX / d;
        this.m_normal.y = dY / d
      }else {
        this.m_normal.x = 1;
        this.m_normal.y = 0
      }
      this.m_points[0].x = 0.5 * (pointAX + pointBX);
      this.m_points[0].y = 0.5 * (pointAY + pointBY);
      this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
      break;
    case b2Manifold.e_faceA:
      tMat = cc.bodyA.m_xf.R;
      tVec = cc.localPlaneNormal;
      this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = cc.bodyA.m_xf.R;
      tVec = cc.localPoint;
      planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = cc.bodyB.m_xf.R;
      for(i = 0;i < cc.pointCount;++i) {
        tVec = cc.points[i].localPoint;
        clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
        this.m_points[i].x = clipPointX;
        this.m_points[i].y = clipPointY
      }
      break;
    case b2Manifold.e_faceB:
      tMat = cc.bodyB.m_xf.R;
      tVec = cc.localPlaneNormal;
      this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = cc.bodyB.m_xf.R;
      tVec = cc.localPoint;
      planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = cc.bodyA.m_xf.R;
      for(i = 0;i < cc.pointCount;++i) {
        tVec = cc.points[i].localPoint;
        clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
        this.m_points[i].Set(clipPointX, clipPointY)
      }
      this.m_normal.x *= -1;
      this.m_normal.y *= -1;
      break
  }
};
b2PositionSolverManifold.prototype.m_normal = null;
b2PositionSolverManifold.prototype.m_points = null;
b2PositionSolverManifold.prototype.m_separations = null;var b2OBB = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2OBB.prototype.__constructor = function() {
};
b2OBB.prototype.__varz = function() {
  this.R = new b2Mat22;
  this.center = new b2Vec2;
  this.extents = new b2Vec2
};
b2OBB.prototype.R = new b2Mat22;
b2OBB.prototype.center = new b2Vec2;
b2OBB.prototype.extents = new b2Vec2;var b2Pair = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Pair.prototype.__constructor = function() {
};
b2Pair.prototype.__varz = function() {
};
b2Pair.b2_nullProxy = b2Settings.USHRT_MAX;
b2Pair.e_pairBuffered = 1;
b2Pair.e_pairRemoved = 2;
b2Pair.e_pairFinal = 4;
b2Pair.prototype.SetBuffered = function() {
  this.status |= b2Pair.e_pairBuffered
};
b2Pair.prototype.ClearBuffered = function() {
  this.status &= ~b2Pair.e_pairBuffered
};
b2Pair.prototype.IsBuffered = function() {
  return(this.status & b2Pair.e_pairBuffered) == b2Pair.e_pairBuffered
};
b2Pair.prototype.SetRemoved = function() {
  this.status |= b2Pair.e_pairRemoved
};
b2Pair.prototype.ClearRemoved = function() {
  this.status &= ~b2Pair.e_pairRemoved
};
b2Pair.prototype.IsRemoved = function() {
  return(this.status & b2Pair.e_pairRemoved) == b2Pair.e_pairRemoved
};
b2Pair.prototype.SetFinal = function() {
  this.status |= b2Pair.e_pairFinal
};
b2Pair.prototype.IsFinal = function() {
  return(this.status & b2Pair.e_pairFinal) == b2Pair.e_pairFinal
};
b2Pair.prototype.userData = null;
b2Pair.prototype.proxy1 = null;
b2Pair.prototype.proxy2 = null;
b2Pair.prototype.next = null;
b2Pair.prototype.status = 0;var b2FixtureDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2FixtureDef.prototype.__constructor = function() {
  this.shape = null;
  this.userData = null;
  this.friction = 0.2;
  this.restitution = 0;
  this.density = 0;
  this.filter.categoryBits = 1;
  this.filter.maskBits = 65535;
  this.filter.groupIndex = 0;
  this.isSensor = false
};
b2FixtureDef.prototype.__varz = function() {
  this.filter = new b2FilterData
};
b2FixtureDef.prototype.shape = null;
b2FixtureDef.prototype.userData = null;
b2FixtureDef.prototype.friction = null;
b2FixtureDef.prototype.restitution = null;
b2FixtureDef.prototype.density = null;
b2FixtureDef.prototype.isSensor = null;
b2FixtureDef.prototype.filter = new b2FilterData;var b2ContactID = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactID.prototype.__constructor = function() {
  this.features._m_id = this
};
b2ContactID.prototype.__varz = function() {
  this.features = new Features
};
b2ContactID.prototype.Set = function(id) {
  key = id._key
};
b2ContactID.prototype.Copy = function() {
  var id = new b2ContactID;
  id.key = key;
  return id
};
b2ContactID.prototype.__defineSetter__("key", function() {
  return this._key
});
b2ContactID.prototype.__defineSetter__("key", function(value) {
  this._key = value;
  this.features._referenceEdge = this._key & 255;
  this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
  this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
  this.features._flip = (this._key & 4278190080) >> 24 & 255
});
b2ContactID.prototype._key = 0;
b2ContactID.prototype.features = new Features;var b2Transform = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Transform.prototype.__constructor = function(pos, r) {
  if(pos) {
    this.position.SetV(pos);
    this.R.SetM(r)
  }
};
b2Transform.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.R = new b2Mat22
};
b2Transform.prototype.Initialize = function(pos, r) {
  this.position.SetV(pos);
  this.R.SetM(r)
};
b2Transform.prototype.SetIdentity = function() {
  this.position.SetZero();
  this.R.SetIdentity()
};
b2Transform.prototype.Set = function(x) {
  this.position.SetV(x.position);
  this.R.SetM(x.R)
};
b2Transform.prototype.GetAngle = function() {
  return Math.atan2(this.R.col1.y, this.R.col1.x)
};
b2Transform.prototype.position = new b2Vec2;
b2Transform.prototype.R = new b2Mat22;var b2EdgeShape = function() {
  b2Shape.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2EdgeShape.prototype, b2Shape.prototype);
b2EdgeShape.prototype._super = b2Shape.prototype;
b2EdgeShape.prototype.__constructor = function(v1, v2) {
  this._super.__constructor.apply(this, []);
  this.m_type = b2Shape.e_edgeShape;
  this.m_prevEdge = null;
  this.m_nextEdge = null;
  this.m_v1 = v1;
  this.m_v2 = v2;
  this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
  this.m_length = this.m_direction.Normalize();
  this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
  this.m_coreV1.Set(-b2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -b2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
  this.m_coreV2.Set(-b2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -b2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
  this.m_cornerDir1 = this.m_normal;
  this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
};
b2EdgeShape.prototype.__varz = function() {
  this.s_supportVec = new b2Vec2;
  this.m_v1 = new b2Vec2;
  this.m_v2 = new b2Vec2;
  this.m_coreV1 = new b2Vec2;
  this.m_coreV2 = new b2Vec2;
  this.m_normal = new b2Vec2;
  this.m_direction = new b2Vec2;
  this.m_cornerDir1 = new b2Vec2;
  this.m_cornerDir2 = new b2Vec2
};
b2EdgeShape.prototype.SetPrevEdge = function(edge, core, cornerDir, convex) {
  this.m_prevEdge = edge;
  this.m_coreV1 = core;
  this.m_cornerDir1 = cornerDir;
  this.m_cornerConvex1 = convex
};
b2EdgeShape.prototype.SetNextEdge = function(edge, core, cornerDir, convex) {
  this.m_nextEdge = edge;
  this.m_coreV2 = core;
  this.m_cornerDir2 = cornerDir;
  this.m_cornerConvex2 = convex
};
b2EdgeShape.prototype.TestPoint = function(transform, p) {
  return false
};
b2EdgeShape.prototype.RayCast = function(output, input, transform) {
  var tMat;
  var rX = input.p2.x - input.p1.x;
  var rY = input.p2.y - input.p1.y;
  tMat = transform.R;
  var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
  var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
  var nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
  var nY = -(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X);
  var k_slop = 100 * Number.MIN_VALUE;
  var denom = -(rX * nX + rY * nY);
  if(denom > k_slop) {
    var bX = input.p1.x - v1X;
    var bY = input.p1.y - v1Y;
    var a = bX * nX + bY * nY;
    if(0 <= a && a <= input.maxFraction * denom) {
      var mu2 = -rX * bY + rY * bX;
      if(-k_slop * denom <= mu2 && mu2 <= denom * (1 + k_slop)) {
        a /= denom;
        output.fraction = a;
        var nLen = Math.sqrt(nX * nX + nY * nY);
        output.normal.x = nX / nLen;
        output.normal.y = nY / nLen;
        return true
      }
    }
  }
  return false
};
b2EdgeShape.prototype.ComputeAABB = function(aabb, transform) {
  var tMat = transform.R;
  var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
  var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
  var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
  var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
  if(v1X < v2X) {
    aabb.lowerBound.x = v1X;
    aabb.upperBound.x = v2X
  }else {
    aabb.lowerBound.x = v2X;
    aabb.upperBound.x = v1X
  }
  if(v1Y < v2Y) {
    aabb.lowerBound.y = v1Y;
    aabb.upperBound.y = v2Y
  }else {
    aabb.lowerBound.y = v2Y;
    aabb.upperBound.y = v1Y
  }
};
b2EdgeShape.prototype.ComputeMass = function(massData, density) {
  massData.mass = 0;
  massData.center.SetV(this.m_v1);
  massData.I = 0
};
b2EdgeShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  var v0 = new b2Vec2(normal.x * offset, normal.y * offset);
  var v1 = b2Math.MulX(xf, this.m_v1);
  var v2 = b2Math.MulX(xf, this.m_v2);
  var d1 = b2Math.Dot(normal, v1) - offset;
  var d2 = b2Math.Dot(normal, v2) - offset;
  if(d1 > 0) {
    if(d2 > 0) {
      return 0
    }else {
      v1.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
      v1.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y
    }
  }else {
    if(d2 > 0) {
      v2.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
      v2.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y
    }else {
    }
  }
  c.x = (v0.x + v1.x + v2.x) / 3;
  c.y = (v0.y + v1.y + v2.y) / 3;
  return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x))
};
b2EdgeShape.prototype.GetLength = function() {
  return this.m_length
};
b2EdgeShape.prototype.GetVertex1 = function() {
  return this.m_v1
};
b2EdgeShape.prototype.GetVertex2 = function() {
  return this.m_v2
};
b2EdgeShape.prototype.GetCoreVertex1 = function() {
  return this.m_coreV1
};
b2EdgeShape.prototype.GetCoreVertex2 = function() {
  return this.m_coreV2
};
b2EdgeShape.prototype.GetNormalVector = function() {
  return this.m_normal
};
b2EdgeShape.prototype.GetDirectionVector = function() {
  return this.m_direction
};
b2EdgeShape.prototype.GetCorner1Vector = function() {
  return this.m_cornerDir1
};
b2EdgeShape.prototype.GetCorner2Vector = function() {
  return this.m_cornerDir2
};
b2EdgeShape.prototype.Corner1IsConvex = function() {
  return this.m_cornerConvex1
};
b2EdgeShape.prototype.Corner2IsConvex = function() {
  return this.m_cornerConvex2
};
b2EdgeShape.prototype.GetFirstVertex = function(xf) {
  var tMat = xf.R;
  return new b2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y), xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y))
};
b2EdgeShape.prototype.GetNextEdge = function() {
  return this.m_nextEdge
};
b2EdgeShape.prototype.GetPrevEdge = function() {
  return this.m_prevEdge
};
b2EdgeShape.prototype.Support = function(xf, dX, dY) {
  var tMat = xf.R;
  var v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
  var v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
  var v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
  var v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
  if(v1X * dX + v1Y * dY > v2X * dX + v2Y * dY) {
    this.s_supportVec.x = v1X;
    this.s_supportVec.y = v1Y
  }else {
    this.s_supportVec.x = v2X;
    this.s_supportVec.y = v2Y
  }
  return this.s_supportVec
};
b2EdgeShape.prototype.s_supportVec = new b2Vec2;
b2EdgeShape.prototype.m_v1 = new b2Vec2;
b2EdgeShape.prototype.m_v2 = new b2Vec2;
b2EdgeShape.prototype.m_coreV1 = new b2Vec2;
b2EdgeShape.prototype.m_coreV2 = new b2Vec2;
b2EdgeShape.prototype.m_length = null;
b2EdgeShape.prototype.m_normal = new b2Vec2;
b2EdgeShape.prototype.m_direction = new b2Vec2;
b2EdgeShape.prototype.m_cornerDir1 = new b2Vec2;
b2EdgeShape.prototype.m_cornerDir2 = new b2Vec2;
b2EdgeShape.prototype.m_cornerConvex1 = null;
b2EdgeShape.prototype.m_cornerConvex2 = null;
b2EdgeShape.prototype.m_nextEdge = null;
b2EdgeShape.prototype.m_prevEdge = null;var b2BuoyancyController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2BuoyancyController.prototype, b2Controller.prototype);
b2BuoyancyController.prototype._super = b2Controller.prototype;
b2BuoyancyController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2BuoyancyController.prototype.__varz = function() {
  this.normal = new b2Vec2(0, -1);
  this.velocity = new b2Vec2(0, 0)
};
b2BuoyancyController.prototype.Step = function(step) {
  if(!m_bodyList) {
    return
  }
  if(this.useWorldGravity) {
    this.gravity = this.GetWorld().GetGravity().Copy()
  }
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(body.IsAwake() == false) {
      continue
    }
    var areac = new b2Vec2;
    var massc = new b2Vec2;
    var area = 0;
    var mass = 0;
    for(var fixture = body.GetFixtureList();fixture;fixture = fixture.GetNext()) {
      var sc = new b2Vec2;
      var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
      area += sarea;
      areac.x += sarea * sc.x;
      areac.y += sarea * sc.y;
      var shapeDensity;
      if(this.useDensity) {
        shapeDensity = 1
      }else {
        shapeDensity = 1
      }
      mass += sarea * shapeDensity;
      massc.x += sarea * sc.x * shapeDensity;
      massc.y += sarea * sc.y * shapeDensity
    }
    areac.x /= area;
    areac.y /= area;
    massc.x /= mass;
    massc.y /= mass;
    if(area < Number.MIN_VALUE) {
      continue
    }
    var buoyancyForce = this.gravity.GetNegative();
    buoyancyForce.Multiply(this.density * area);
    body.ApplyForce(buoyancyForce, massc);
    var dragForce = body.GetLinearVelocityFromWorldPoint(areac);
    dragForce.Subtract(this.velocity);
    dragForce.Multiply(-this.linearDrag * area);
    body.ApplyForce(dragForce, areac);
    body.ApplyTorque(-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag)
  }
};
b2BuoyancyController.prototype.Draw = function(debugDraw) {
  var r = 1E3;
  var p1 = new b2Vec2;
  var p2 = new b2Vec2;
  p1.x = this.normal.x * this.offset + this.normal.y * r;
  p1.y = this.normal.y * this.offset - this.normal.x * r;
  p2.x = this.normal.x * this.offset - this.normal.y * r;
  p2.y = this.normal.y * this.offset + this.normal.x * r;
  var color = new b2Color(0, 0, 1);
  debugDraw.DrawSegment(p1, p2, color)
};
b2BuoyancyController.prototype.normal = new b2Vec2(0, -1);
b2BuoyancyController.prototype.offset = 0;
b2BuoyancyController.prototype.density = 0;
b2BuoyancyController.prototype.velocity = new b2Vec2(0, 0);
b2BuoyancyController.prototype.linearDrag = 2;
b2BuoyancyController.prototype.angularDrag = 1;
b2BuoyancyController.prototype.useDensity = false;
b2BuoyancyController.prototype.useWorldGravity = true;
b2BuoyancyController.prototype.gravity = null;var b2Body = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Body.prototype.__constructor = function(bd, world) {
  this.m_flags = 0;
  if(bd.bullet) {
    this.m_flags |= b2Body.e_bulletFlag
  }
  if(bd.fixedRotation) {
    this.m_flags |= b2Body.e_fixedRotationFlag
  }
  if(bd.allowSleep) {
    this.m_flags |= b2Body.e_allowSleepFlag
  }
  if(bd.awake) {
    this.m_flags |= b2Body.e_awakeFlag
  }
  if(bd.active) {
    this.m_flags |= b2Body.e_activeFlag
  }
  this.m_world = world;
  this.m_xf.position.SetV(bd.position);
  this.m_xf.R.Set(bd.angle);
  this.m_sweep.localCenter.SetZero();
  this.m_sweep.t0 = 1;
  this.m_sweep.a0 = this.m_sweep.a = bd.angle;
  var tMat = this.m_xf.R;
  var tVec = this.m_sweep.localCenter;
  this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  this.m_sweep.c.x += this.m_xf.position.x;
  this.m_sweep.c.y += this.m_xf.position.y;
  this.m_sweep.c0.SetV(this.m_sweep.c);
  this.m_jointList = null;
  this.m_controllerList = null;
  this.m_contactList = null;
  this.m_controllerCount = 0;
  this.m_prev = null;
  this.m_next = null;
  this.m_linearVelocity.SetV(bd.linearVelocity);
  this.m_angularVelocity = bd.angularVelocity;
  this.m_linearDamping = bd.linearDamping;
  this.m_angularDamping = bd.angularDamping;
  this.m_force.Set(0, 0);
  this.m_torque = 0;
  this.m_sleepTime = 0;
  this.m_type = bd.type;
  if(this.m_type == b2Body.b2_dynamicBody) {
    this.m_mass = 1;
    this.m_invMass = 1
  }else {
    this.m_mass = 0;
    this.m_invMass = 0
  }
  this.m_I = 0;
  this.m_invI = 0;
  this.m_inertiaScale = bd.inertiaScale;
  this.m_userData = bd.userData;
  this.m_fixtureList = null;
  this.m_fixtureCount = 0
};
b2Body.prototype.__varz = function() {
  this.m_xf = new b2Transform;
  this.m_sweep = new b2Sweep;
  this.m_linearVelocity = new b2Vec2;
  this.m_force = new b2Vec2
};
b2Body.b2_staticBody = 0;
b2Body.b2_kinematicBody = 1;
b2Body.b2_dynamicBody = 2;
b2Body.s_xf1 = new b2Transform;
b2Body.e_islandFlag = 1;
b2Body.e_awakeFlag = 2;
b2Body.e_allowSleepFlag = 4;
b2Body.e_bulletFlag = 8;
b2Body.e_fixedRotationFlag = 16;
b2Body.e_activeFlag = 32;
b2Body.prototype.connectEdges = function(s1, s2, angle1) {
  var angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
  var coreOffset = Math.tan((angle2 - angle1) * 0.5);
  var core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
  core = b2Math.SubtractVV(core, s2.GetNormalVector());
  core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
  core = b2Math.AddVV(core, s2.GetVertex1());
  var cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
  cornerDir.Normalize();
  var convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0;
  s1.SetNextEdge(s2, core, cornerDir, convex);
  s2.SetPrevEdge(s1, core, cornerDir, convex);
  return angle2
};
b2Body.prototype.SynchronizeFixtures = function() {
  var xf1 = b2Body.s_xf1;
  xf1.R.Set(this.m_sweep.a0);
  var tMat = xf1.R;
  var tVec = this.m_sweep.localCenter;
  xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var f;
  var broadPhase = this.m_world.m_contactManager.m_broadPhase;
  for(f = this.m_fixtureList;f;f = f.m_next) {
    f.Synchronize(broadPhase, xf1, this.m_xf)
  }
};
b2Body.prototype.SynchronizeTransform = function() {
  this.m_xf.R.Set(this.m_sweep.a);
  var tMat = this.m_xf.R;
  var tVec = this.m_sweep.localCenter;
  this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y)
};
b2Body.prototype.ShouldCollide = function(other) {
  if(this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
    return false
  }
  for(var jn = this.m_jointList;jn;jn = jn.next) {
    if(jn.other == other) {
      if(jn.joint.m_collideConnected == false) {
        return false
      }
    }
  }
  return true
};
b2Body.prototype.Advance = function(t) {
  this.m_sweep.Advance(t);
  this.m_sweep.c.SetV(this.m_sweep.c0);
  this.m_sweep.a = this.m_sweep.a0;
  this.SynchronizeTransform()
};
b2Body.prototype.CreateFixture = function(def) {
  if(this.m_world.IsLocked() == true) {
    return null
  }
  var fixture = new b2Fixture;
  fixture.Create(this, this.m_xf, def);
  if(this.m_flags & b2Body.e_activeFlag) {
    var broadPhase = this.m_world.m_contactManager.m_broadPhase;
    fixture.CreateProxy(broadPhase, this.m_xf)
  }
  fixture.m_next = this.m_fixtureList;
  this.m_fixtureList = fixture;
  ++this.m_fixtureCount;
  fixture.m_body = this;
  if(fixture.m_density > 0) {
    this.ResetMassData()
  }
  this.m_world.m_flags |= b2World.e_newFixture;
  return fixture
};
b2Body.prototype.CreateFixture2 = function(shape, density) {
  var def = new b2FixtureDef;
  def.shape = shape;
  def.density = density;
  return this.CreateFixture(def)
};
b2Body.prototype.DestroyFixture = function(fixture) {
  if(this.m_world.IsLocked() == true) {
    return
  }
  var node = this.m_fixtureList;
  var ppF = null;
  var found = false;
  while(node != null) {
    if(node == fixture) {
      if(ppF) {
        ppF.m_next = fixture.m_next
      }else {
        this.m_fixtureList = fixture.m_next
      }
      found = true;
      break
    }
    ppF = node;
    node = node.m_next
  }
  var edge = this.m_contactList;
  while(edge) {
    var c = edge.contact;
    edge = edge.next;
    var fixtureA = c.GetFixtureA();
    var fixtureB = c.GetFixtureB();
    if(fixture == fixtureA || fixture == fixtureB) {
      this.m_world.m_contactManager.Destroy(c)
    }
  }
  if(this.m_flags & b2Body.e_activeFlag) {
    var broadPhase = this.m_world.m_contactManager.m_broadPhase;
    fixture.DestroyProxy(broadPhase)
  }else {
  }
  fixture.Destroy();
  fixture.m_body = null;
  fixture.m_next = null;
  --this.m_fixtureCount;
  this.ResetMassData()
};
b2Body.prototype.SetPositionAndAngle = function(position, angle) {
  var f;
  if(this.m_world.IsLocked() == true) {
    return
  }
  this.m_xf.R.Set(angle);
  this.m_xf.position.SetV(position);
  var tMat = this.m_xf.R;
  var tVec = this.m_sweep.localCenter;
  this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  this.m_sweep.c.x += this.m_xf.position.x;
  this.m_sweep.c.y += this.m_xf.position.y;
  this.m_sweep.c0.SetV(this.m_sweep.c);
  this.m_sweep.a0 = this.m_sweep.a = angle;
  var broadPhase = this.m_world.m_contactManager.m_broadPhase;
  for(f = this.m_fixtureList;f;f = f.m_next) {
    f.Synchronize(broadPhase, this.m_xf, this.m_xf)
  }
  this.m_world.m_contactManager.FindNewContacts()
};
b2Body.prototype.SetTransform = function(xf) {
  this.SetPositionAndAngle(xf.position, xf.GetAngle())
};
b2Body.prototype.GetTransform = function() {
  return this.m_xf
};
b2Body.prototype.GetPosition = function() {
  return this.m_xf.position
};
b2Body.prototype.SetPosition = function(position) {
  this.SetPositionAndAngle(position, this.GetAngle())
};
b2Body.prototype.GetAngle = function() {
  return this.m_sweep.a
};
b2Body.prototype.SetAngle = function(angle) {
  this.SetPositionAndAngle(this.GetPosition(), angle)
};
b2Body.prototype.GetWorldCenter = function() {
  return this.m_sweep.c
};
b2Body.prototype.GetLocalCenter = function() {
  return this.m_sweep.localCenter
};
b2Body.prototype.SetLinearVelocity = function(v) {
  if(this.m_type == b2Body.b2_staticBody) {
    return
  }
  this.m_linearVelocity.SetV(v)
};
b2Body.prototype.GetLinearVelocity = function() {
  return this.m_linearVelocity
};
b2Body.prototype.SetAngularVelocity = function(omega) {
  if(this.m_type == b2Body.b2_staticBody) {
    return
  }
  this.m_angularVelocity = omega
};
b2Body.prototype.GetAngularVelocity = function() {
  return this.m_angularVelocity
};
b2Body.prototype.GetDefinition = function() {
  var bd = new b2BodyDef;
  bd.type = this.GetType();
  bd.allowSleep = (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
  bd.angle = this.GetAngle();
  bd.angularDamping = this.m_angularDamping;
  bd.angularVelocity = this.m_angularVelocity;
  bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
  bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
  bd.awake = (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
  bd.linearDamping = this.m_linearDamping;
  bd.linearVelocity.SetV(this.GetLinearVelocity());
  bd.position = this.GetPosition();
  bd.userData = this.GetUserData();
  return bd
};
b2Body.prototype.ApplyForce = function(force, point) {
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  if(this.IsAwake() == false) {
    this.SetAwake(true)
  }
  this.m_force.x += force.x;
  this.m_force.y += force.y;
  this.m_torque += (point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x
};
b2Body.prototype.ApplyTorque = function(torque) {
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  if(this.IsAwake() == false) {
    this.SetAwake(true)
  }
  this.m_torque += torque
};
b2Body.prototype.ApplyImpulse = function(impulse, point) {
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  if(this.IsAwake() == false) {
    this.SetAwake(true)
  }
  this.m_linearVelocity.x += this.m_invMass * impulse.x;
  this.m_linearVelocity.y += this.m_invMass * impulse.y;
  this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x)
};
b2Body.prototype.Split = function(callback) {
  var linearVelocity = this.GetLinearVelocity().Copy();
  var angularVelocity = this.GetAngularVelocity();
  var center = this.GetWorldCenter();
  var body1 = this;
  var body2 = this.m_world.CreateBody(this.GetDefinition());
  var prev;
  for(var f = body1.m_fixtureList;f;) {
    if(callback(f)) {
      var next = f.m_next;
      if(prev) {
        prev.m_next = next
      }else {
        body1.m_fixtureList = next
      }
      body1.m_fixtureCount--;
      f.m_next = body2.m_fixtureList;
      body2.m_fixtureList = f;
      body2.m_fixtureCount++;
      f.m_body = body2;
      f = next
    }else {
      prev = f;
      f = f.m_next
    }
  }
  body1.ResetMassData();
  body2.ResetMassData();
  var center1 = body1.GetWorldCenter();
  var center2 = body2.GetWorldCenter();
  var velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
  var velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
  body1.SetLinearVelocity(velocity1);
  body2.SetLinearVelocity(velocity2);
  body1.SetAngularVelocity(angularVelocity);
  body2.SetAngularVelocity(angularVelocity);
  body1.SynchronizeFixtures();
  body2.SynchronizeFixtures();
  return body2
};
b2Body.prototype.Merge = function(other) {
  var f;
  for(f = other.m_fixtureList;f;) {
    var next = f.m_next;
    other.m_fixtureCount--;
    f.m_next = this.m_fixtureList;
    this.m_fixtureList = f;
    this.m_fixtureCount++;
    f.m_body = body2;
    f = next
  }
  body1.m_fixtureCount = 0;
  var body1 = this;
  var body2 = other;
  var center1 = body1.GetWorldCenter();
  var center2 = body2.GetWorldCenter();
  var velocity1 = body1.GetLinearVelocity().Copy();
  var velocity2 = body2.GetLinearVelocity().Copy();
  var angular1 = body1.GetAngularVelocity();
  var angular = body2.GetAngularVelocity();
  body1.ResetMassData();
  this.SynchronizeFixtures()
};
b2Body.prototype.GetMass = function() {
  return this.m_mass
};
b2Body.prototype.GetInertia = function() {
  return this.m_I
};
b2Body.prototype.GetMassData = function(data) {
  data.mass = this.m_mass;
  data.I = this.m_I;
  data.center.SetV(this.m_sweep.localCenter)
};
b2Body.prototype.SetMassData = function(massData) {
  b2Settings.b2Assert(this.m_world.IsLocked() == false);
  if(this.m_world.IsLocked() == true) {
    return
  }
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  this.m_invMass = 0;
  this.m_I = 0;
  this.m_invI = 0;
  this.m_mass = massData.mass;
  if(this.m_mass <= 0) {
    this.m_mass = 1
  }
  this.m_invMass = 1 / this.m_mass;
  if(massData.I > 0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
    this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
    this.m_invI = 1 / this.m_I
  }
  var oldCenter = this.m_sweep.c.Copy();
  this.m_sweep.localCenter.SetV(massData.center);
  this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
  this.m_sweep.c.SetV(this.m_sweep.c0);
  this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
  this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - oldCenter.x)
};
b2Body.prototype.ResetMassData = function() {
  this.m_mass = 0;
  this.m_invMass = 0;
  this.m_I = 0;
  this.m_invI = 0;
  this.m_sweep.localCenter.SetZero();
  if(this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) {
    return
  }
  var center = b2Vec2.Make(0, 0);
  for(var f = this.m_fixtureList;f;f = f.m_next) {
    if(f.m_density == 0) {
      continue
    }
    var massData = f.GetMassData();
    this.m_mass += massData.mass;
    center.x += massData.center.x * massData.mass;
    center.y += massData.center.y * massData.mass;
    this.m_I += massData.I
  }
  if(this.m_mass > 0) {
    this.m_invMass = 1 / this.m_mass;
    center.x *= this.m_invMass;
    center.y *= this.m_invMass
  }else {
    this.m_mass = 1;
    this.m_invMass = 1
  }
  if(this.m_I > 0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
    this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
    this.m_I *= this.m_inertiaScale;
    b2Settings.b2Assert(this.m_I > 0);
    this.m_invI = 1 / this.m_I
  }else {
    this.m_I = 0;
    this.m_invI = 0
  }
  var oldCenter = this.m_sweep.c.Copy();
  this.m_sweep.localCenter.SetV(center);
  this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
  this.m_sweep.c.SetV(this.m_sweep.c0);
  this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
  this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - oldCenter.x)
};
b2Body.prototype.GetWorldPoint = function(localPoint) {
  var A = this.m_xf.R;
  var u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
  u.x += this.m_xf.position.x;
  u.y += this.m_xf.position.y;
  return u
};
b2Body.prototype.GetWorldVector = function(localVector) {
  return b2Math.MulMV(this.m_xf.R, localVector)
};
b2Body.prototype.GetLocalPoint = function(worldPoint) {
  return b2Math.MulXT(this.m_xf, worldPoint)
};
b2Body.prototype.GetLocalVector = function(worldVector) {
  return b2Math.MulTMV(this.m_xf.R, worldVector)
};
b2Body.prototype.GetLinearVelocityFromWorldPoint = function(worldPoint) {
  return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x))
};
b2Body.prototype.GetLinearVelocityFromLocalPoint = function(localPoint) {
  var A = this.m_xf.R;
  var worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
  worldPoint.x += this.m_xf.position.x;
  worldPoint.y += this.m_xf.position.y;
  return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x))
};
b2Body.prototype.GetLinearDamping = function() {
  return this.m_linearDamping
};
b2Body.prototype.SetLinearDamping = function(linearDamping) {
  this.m_linearDamping = linearDamping
};
b2Body.prototype.GetAngularDamping = function() {
  return this.m_angularDamping
};
b2Body.prototype.SetAngularDamping = function(angularDamping) {
  this.m_angularDamping = angularDamping
};
b2Body.prototype.SetType = function(type) {
  if(this.m_type == type) {
    return
  }
  this.m_type = type;
  this.ResetMassData();
  if(this.m_type == b2Body.b2_staticBody) {
    this.m_linearVelocity.SetZero();
    this.m_angularVelocity = 0
  }
  this.SetAwake(true);
  this.m_force.SetZero();
  this.m_torque = 0;
  for(var ce = this.m_contactList;ce;ce = ce.next) {
    ce.contact.FlagForFiltering()
  }
};
b2Body.prototype.GetType = function() {
  return this.m_type
};
b2Body.prototype.SetBullet = function(flag) {
  if(flag) {
    this.m_flags |= b2Body.e_bulletFlag
  }else {
    this.m_flags &= ~b2Body.e_bulletFlag
  }
};
b2Body.prototype.IsBullet = function() {
  return(this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag
};
b2Body.prototype.SetSleepingAllowed = function(flag) {
  if(flag) {
    this.m_flags |= b2Body.e_allowSleepFlag
  }else {
    this.m_flags &= ~b2Body.e_allowSleepFlag;
    this.SetAwake(true)
  }
};
b2Body.prototype.SetAwake = function(flag) {
  if(flag) {
    this.m_flags |= b2Body.e_awakeFlag;
    this.m_sleepTime = 0
  }else {
    this.m_flags &= ~b2Body.e_awakeFlag;
    this.m_sleepTime = 0;
    this.m_linearVelocity.SetZero();
    this.m_angularVelocity = 0;
    this.m_force.SetZero();
    this.m_torque = 0
  }
};
b2Body.prototype.IsAwake = function() {
  return(this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag
};
b2Body.prototype.SetFixedRotation = function(fixed) {
  if(fixed) {
    this.m_flags |= b2Body.e_fixedRotationFlag
  }else {
    this.m_flags &= ~b2Body.e_fixedRotationFlag
  }
  this.ResetMassData()
};
b2Body.prototype.IsFixedRotation = function() {
  return(this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag
};
b2Body.prototype.SetActive = function(flag) {
  if(flag == this.IsActive()) {
    return
  }
  var broadPhase;
  var f;
  if(flag) {
    this.m_flags |= b2Body.e_activeFlag;
    broadPhase = this.m_world.m_contactManager.m_broadPhase;
    for(f = this.m_fixtureList;f;f = f.m_next) {
      f.CreateProxy(broadPhase, this.m_xf)
    }
  }else {
    this.m_flags &= ~b2Body.e_activeFlag;
    broadPhase = this.m_world.m_contactManager.m_broadPhase;
    for(f = this.m_fixtureList;f;f = f.m_next) {
      f.DestroyProxy(broadPhase)
    }
    var ce = this.m_contactList;
    while(ce) {
      var ce0 = ce;
      ce = ce.next;
      this.m_world.m_contactManager.Destroy(ce0.contact)
    }
    this.m_contactList = null
  }
};
b2Body.prototype.IsActive = function() {
  return(this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag
};
b2Body.prototype.IsSleepingAllowed = function() {
  return(this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag
};
b2Body.prototype.GetFixtureList = function() {
  return this.m_fixtureList
};
b2Body.prototype.GetJointList = function() {
  return this.m_jointList
};
b2Body.prototype.GetControllerList = function() {
  return this.m_controllerList
};
b2Body.prototype.GetContactList = function() {
  return this.m_contactList
};
b2Body.prototype.GetNext = function() {
  return this.m_next
};
b2Body.prototype.GetUserData = function() {
  return this.m_userData
};
b2Body.prototype.SetUserData = function(data) {
  this.m_userData = data
};
b2Body.prototype.GetWorld = function() {
  return this.m_world
};
b2Body.prototype.m_flags = 0;
b2Body.prototype.m_type = 0;
b2Body.prototype.m_islandIndex = 0;
b2Body.prototype.m_xf = new b2Transform;
b2Body.prototype.m_sweep = new b2Sweep;
b2Body.prototype.m_linearVelocity = new b2Vec2;
b2Body.prototype.m_angularVelocity = null;
b2Body.prototype.m_force = new b2Vec2;
b2Body.prototype.m_torque = null;
b2Body.prototype.m_world = null;
b2Body.prototype.m_prev = null;
b2Body.prototype.m_next = null;
b2Body.prototype.m_fixtureList = null;
b2Body.prototype.m_fixtureCount = 0;
b2Body.prototype.m_controllerList = null;
b2Body.prototype.m_controllerCount = 0;
b2Body.prototype.m_jointList = null;
b2Body.prototype.m_contactList = null;
b2Body.prototype.m_mass = null;
b2Body.prototype.m_invMass = null;
b2Body.prototype.m_I = null;
b2Body.prototype.m_invI = null;
b2Body.prototype.m_inertiaScale = null;
b2Body.prototype.m_linearDamping = null;
b2Body.prototype.m_angularDamping = null;
b2Body.prototype.m_sleepTime = null;
b2Body.prototype.m_userData = null;var b2ContactImpulse = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactImpulse.prototype.__constructor = function() {
};
b2ContactImpulse.prototype.__varz = function() {
  this.normalImpulses = new Array(b2Settings.b2_maxManifoldPoints);
  this.tangentImpulses = new Array(b2Settings.b2_maxManifoldPoints)
};
b2ContactImpulse.prototype.normalImpulses = new Array(b2Settings.b2_maxManifoldPoints);
b2ContactImpulse.prototype.tangentImpulses = new Array(b2Settings.b2_maxManifoldPoints);var b2TensorDampingController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2TensorDampingController.prototype, b2Controller.prototype);
b2TensorDampingController.prototype._super = b2Controller.prototype;
b2TensorDampingController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2TensorDampingController.prototype.__varz = function() {
  this.T = new b2Mat22
};
b2TensorDampingController.prototype.SetAxisAligned = function(xDamping, yDamping) {
  this.T.col1.x = -xDamping;
  this.T.col1.y = 0;
  this.T.col2.x = 0;
  this.T.col2.y = -yDamping;
  if(xDamping > 0 || yDamping > 0) {
    this.maxTimestep = 1 / Math.max(xDamping, yDamping)
  }else {
    this.maxTimestep = 0
  }
};
b2TensorDampingController.prototype.Step = function(step) {
  var timestep = step.dt;
  if(timestep <= Number.MIN_VALUE) {
    return
  }
  if(timestep > this.maxTimestep && this.maxTimestep > 0) {
    timestep = this.maxTimestep
  }
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(!body.IsAwake()) {
      continue
    }
    var damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
    body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep))
  }
};
b2TensorDampingController.prototype.T = new b2Mat22;
b2TensorDampingController.prototype.maxTimestep = 0;var b2ManifoldPoint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ManifoldPoint.prototype.__constructor = function() {
  this.Reset()
};
b2ManifoldPoint.prototype.__varz = function() {
  this.m_localPoint = new b2Vec2;
  this.m_id = new b2ContactID
};
b2ManifoldPoint.prototype.Reset = function() {
  this.m_localPoint.SetZero();
  this.m_normalImpulse = 0;
  this.m_tangentImpulse = 0;
  this.m_id.key = 0
};
b2ManifoldPoint.prototype.Set = function(m) {
  this.m_localPoint.SetV(m.m_localPoint);
  this.m_normalImpulse = m.m_normalImpulse;
  this.m_tangentImpulse = m.m_tangentImpulse;
  this.m_id.Set(m.m_id)
};
b2ManifoldPoint.prototype.m_localPoint = new b2Vec2;
b2ManifoldPoint.prototype.m_normalImpulse = null;
b2ManifoldPoint.prototype.m_tangentImpulse = null;
b2ManifoldPoint.prototype.m_id = new b2ContactID;var b2PolygonShape = function() {
  b2Shape.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolygonShape.prototype, b2Shape.prototype);
b2PolygonShape.prototype._super = b2Shape.prototype;
b2PolygonShape.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.m_type = b2Shape.e_polygonShape;
  this.m_centroid = new b2Vec2;
  this.m_vertices = new Array;
  this.m_normals = new Array
};
b2PolygonShape.prototype.__varz = function() {
};
b2PolygonShape.AsArray = function(vertices, vertexCount) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsArray(vertices, vertexCount);
  return polygonShape
};
b2PolygonShape.AsVector = function(vertices, vertexCount) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsVector(vertices, vertexCount);
  return polygonShape
};
b2PolygonShape.AsBox = function(hx, hy) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsBox(hx, hy);
  return polygonShape
};
b2PolygonShape.AsOrientedBox = function(hx, hy, center, angle) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsOrientedBox(hx, hy, center, angle);
  return polygonShape
};
b2PolygonShape.AsEdge = function(v1, v2) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsEdge(v1, v2);
  return polygonShape
};
b2PolygonShape.ComputeCentroid = function(vs, count) {
  var c = new b2Vec2;
  var area = 0;
  var p1X = 0;
  var p1Y = 0;
  var inv3 = 1 / 3;
  for(var i = 0;i < count;++i) {
    var p2 = vs[i];
    var p3 = i + 1 < count ? vs[parseInt(i + 1)] : vs[0];
    var e1X = p2.x - p1X;
    var e1Y = p2.y - p1Y;
    var e2X = p3.x - p1X;
    var e2Y = p3.y - p1Y;
    var D = e1X * e2Y - e1Y * e2X;
    var triangleArea = 0.5 * D;
    area += triangleArea;
    c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
    c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y)
  }
  c.x *= 1 / area;
  c.y *= 1 / area;
  return c
};
b2PolygonShape.ComputeOBB = function(obb, vs, count) {
  var i = 0;
  var p = new Array(count + 1);
  for(i = 0;i < count;++i) {
    p[i] = vs[i]
  }
  p[count] = p[0];
  var minArea = Number.MAX_VALUE;
  for(i = 1;i <= count;++i) {
    var root = p[parseInt(i - 1)];
    var uxX = p[i].x - root.x;
    var uxY = p[i].y - root.y;
    var length = Math.sqrt(uxX * uxX + uxY * uxY);
    uxX /= length;
    uxY /= length;
    var uyX = -uxY;
    var uyY = uxX;
    var lowerX = Number.MAX_VALUE;
    var lowerY = Number.MAX_VALUE;
    var upperX = -Number.MAX_VALUE;
    var upperY = -Number.MAX_VALUE;
    for(var j = 0;j < count;++j) {
      var dX = p[j].x - root.x;
      var dY = p[j].y - root.y;
      var rX = uxX * dX + uxY * dY;
      var rY = uyX * dX + uyY * dY;
      if(rX < lowerX) {
        lowerX = rX
      }
      if(rY < lowerY) {
        lowerY = rY
      }
      if(rX > upperX) {
        upperX = rX
      }
      if(rY > upperY) {
        upperY = rY
      }
    }
    var area = (upperX - lowerX) * (upperY - lowerY);
    if(area < 0.95 * minArea) {
      minArea = area;
      obb.R.col1.x = uxX;
      obb.R.col1.y = uxY;
      obb.R.col2.x = uyX;
      obb.R.col2.y = uyY;
      var centerX = 0.5 * (lowerX + upperX);
      var centerY = 0.5 * (lowerY + upperY);
      var tMat = obb.R;
      obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
      obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
      obb.extents.x = 0.5 * (upperX - lowerX);
      obb.extents.y = 0.5 * (upperY - lowerY)
    }
  }
};
b2PolygonShape.s_mat = new b2Mat22;
b2PolygonShape.prototype.Validate = function() {
  return false
};
b2PolygonShape.prototype.Reserve = function(count) {
  for(var i = this.m_vertices.length;i < count;i++) {
    this.m_vertices[i] = new b2Vec2;
    this.m_normals[i] = new b2Vec2
  }
};
b2PolygonShape.prototype.Copy = function() {
  var s = new b2PolygonShape;
  s.Set(this);
  return s
};
b2PolygonShape.prototype.Set = function(other) {
  this._super.Set.apply(this, [other]);
  if(isInstanceOf(other, b2PolygonShape)) {
    var other2 = other;
    this.m_centroid.SetV(other2.m_centroid);
    this.m_vertexCount = other2.m_vertexCount;
    this.Reserve(this.m_vertexCount);
    for(var i = 0;i < this.m_vertexCount;i++) {
      this.m_vertices[i].SetV(other2.m_vertices[i]);
      this.m_normals[i].SetV(other2.m_normals[i])
    }
  }
};
b2PolygonShape.prototype.SetAsArray = function(vertices, vertexCount) {
  var v = new Array;
  for(var i = 0, tVec = null;i < vertices.length, tVec = vertices[i];i++) {
    v.push(tVec)
  }
  this.SetAsVector(v, vertexCount)
};
b2PolygonShape.prototype.SetAsVector = function(vertices, vertexCount) {
  if(typeof vertexCount == "undefined") {
    vertexCount = vertices.length
  }
  b2Settings.b2Assert(2 <= vertexCount);
  this.m_vertexCount = vertexCount;
  this.Reserve(vertexCount);
  var i = 0;
  for(i = 0;i < this.m_vertexCount;i++) {
    this.m_vertices[i].SetV(vertices[i])
  }
  for(i = 0;i < this.m_vertexCount;++i) {
    var i1 = i;
    var i2 = i + 1 < this.m_vertexCount ? i + 1 : 0;
    var edge = b2Math.SubtractVV(this.m_vertices[i2], this.m_vertices[i1]);
    b2Settings.b2Assert(edge.LengthSquared() > Number.MIN_VALUE);
    this.m_normals[i].SetV(b2Math.CrossVF(edge, 1));
    this.m_normals[i].Normalize()
  }
  this.m_centroid = b2PolygonShape.ComputeCentroid(this.m_vertices, this.m_vertexCount)
};
b2PolygonShape.prototype.SetAsBox = function(hx, hy) {
  this.m_vertexCount = 4;
  this.Reserve(4);
  this.m_vertices[0].Set(-hx, -hy);
  this.m_vertices[1].Set(hx, -hy);
  this.m_vertices[2].Set(hx, hy);
  this.m_vertices[3].Set(-hx, hy);
  this.m_normals[0].Set(0, -1);
  this.m_normals[1].Set(1, 0);
  this.m_normals[2].Set(0, 1);
  this.m_normals[3].Set(-1, 0);
  this.m_centroid.SetZero()
};
b2PolygonShape.prototype.SetAsOrientedBox = function(hx, hy, center, angle) {
  this.m_vertexCount = 4;
  this.Reserve(4);
  this.m_vertices[0].Set(-hx, -hy);
  this.m_vertices[1].Set(hx, -hy);
  this.m_vertices[2].Set(hx, hy);
  this.m_vertices[3].Set(-hx, hy);
  this.m_normals[0].Set(0, -1);
  this.m_normals[1].Set(1, 0);
  this.m_normals[2].Set(0, 1);
  this.m_normals[3].Set(-1, 0);
  this.m_centroid = center;
  var xf = new b2Transform;
  xf.position = center;
  xf.R.Set(angle);
  for(var i = 0;i < this.m_vertexCount;++i) {
    this.m_vertices[i] = b2Math.MulX(xf, this.m_vertices[i]);
    this.m_normals[i] = b2Math.MulMV(xf.R, this.m_normals[i])
  }
};
b2PolygonShape.prototype.SetAsEdge = function(v1, v2) {
  this.m_vertexCount = 2;
  this.Reserve(2);
  this.m_vertices[0].SetV(v1);
  this.m_vertices[1].SetV(v2);
  this.m_centroid.x = 0.5 * (v1.x + v2.x);
  this.m_centroid.y = 0.5 * (v1.y + v2.y);
  this.m_normals[0] = b2Math.CrossVF(b2Math.SubtractVV(v2, v1), 1);
  this.m_normals[0].Normalize();
  this.m_normals[1].x = -this.m_normals[0].x;
  this.m_normals[1].y = -this.m_normals[0].y
};
b2PolygonShape.prototype.TestPoint = function(xf, p) {
  var tVec;
  var tMat = xf.R;
  var tX = p.x - xf.position.x;
  var tY = p.y - xf.position.y;
  var pLocalX = tX * tMat.col1.x + tY * tMat.col1.y;
  var pLocalY = tX * tMat.col2.x + tY * tMat.col2.y;
  for(var i = 0;i < this.m_vertexCount;++i) {
    tVec = this.m_vertices[i];
    tX = pLocalX - tVec.x;
    tY = pLocalY - tVec.y;
    tVec = this.m_normals[i];
    var dot = tVec.x * tX + tVec.y * tY;
    if(dot > 0) {
      return false
    }
  }
  return true
};
b2PolygonShape.prototype.RayCast = function(output, input, transform) {
  var lower = 0;
  var upper = input.maxFraction;
  var tX;
  var tY;
  var tMat;
  var tVec;
  tX = input.p1.x - transform.position.x;
  tY = input.p1.y - transform.position.y;
  tMat = transform.R;
  var p1X = tX * tMat.col1.x + tY * tMat.col1.y;
  var p1Y = tX * tMat.col2.x + tY * tMat.col2.y;
  tX = input.p2.x - transform.position.x;
  tY = input.p2.y - transform.position.y;
  tMat = transform.R;
  var p2X = tX * tMat.col1.x + tY * tMat.col1.y;
  var p2Y = tX * tMat.col2.x + tY * tMat.col2.y;
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var index = -1;
  for(var i = 0;i < this.m_vertexCount;++i) {
    tVec = this.m_vertices[i];
    tX = tVec.x - p1X;
    tY = tVec.y - p1Y;
    tVec = this.m_normals[i];
    var numerator = tVec.x * tX + tVec.y * tY;
    var denominator = tVec.x * dX + tVec.y * dY;
    if(denominator == 0) {
      if(numerator < 0) {
        return false
      }
    }else {
      if(denominator < 0 && numerator < lower * denominator) {
        lower = numerator / denominator;
        index = i
      }else {
        if(denominator > 0 && numerator < upper * denominator) {
          upper = numerator / denominator
        }
      }
    }
    if(upper < lower - Number.MIN_VALUE) {
      return false
    }
  }
  if(index >= 0) {
    output.fraction = lower;
    tMat = transform.R;
    tVec = this.m_normals[index];
    output.normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
    output.normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
    return true
  }
  return false
};
b2PolygonShape.prototype.ComputeAABB = function(aabb, xf) {
  var tMat = xf.R;
  var tVec = this.m_vertices[0];
  var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var upperX = lowerX;
  var upperY = lowerY;
  for(var i = 1;i < this.m_vertexCount;++i) {
    tVec = this.m_vertices[i];
    var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
    var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
    lowerX = lowerX < vX ? lowerX : vX;
    lowerY = lowerY < vY ? lowerY : vY;
    upperX = upperX > vX ? upperX : vX;
    upperY = upperY > vY ? upperY : vY
  }
  aabb.lowerBound.x = lowerX - this.m_radius;
  aabb.lowerBound.y = lowerY - this.m_radius;
  aabb.upperBound.x = upperX + this.m_radius;
  aabb.upperBound.y = upperY + this.m_radius
};
b2PolygonShape.prototype.ComputeMass = function(massData, density) {
  if(this.m_vertexCount == 2) {
    massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
    massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
    massData.mass = 0;
    massData.I = 0;
    return
  }
  var centerX = 0;
  var centerY = 0;
  var area = 0;
  var I = 0;
  var p1X = 0;
  var p1Y = 0;
  var k_inv3 = 1 / 3;
  for(var i = 0;i < this.m_vertexCount;++i) {
    var p2 = this.m_vertices[i];
    var p3 = i + 1 < this.m_vertexCount ? this.m_vertices[parseInt(i + 1)] : this.m_vertices[0];
    var e1X = p2.x - p1X;
    var e1Y = p2.y - p1Y;
    var e2X = p3.x - p1X;
    var e2Y = p3.y - p1Y;
    var D = e1X * e2Y - e1Y * e2X;
    var triangleArea = 0.5 * D;
    area += triangleArea;
    centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
    centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
    var px = p1X;
    var py = p1Y;
    var ex1 = e1X;
    var ey1 = e1Y;
    var ex2 = e2X;
    var ey2 = e2Y;
    var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
    var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;
    I += D * (intx2 + inty2)
  }
  massData.mass = density * area;
  centerX *= 1 / area;
  centerY *= 1 / area;
  massData.center.Set(centerX, centerY);
  massData.I = density * I
};
b2PolygonShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  var normalL = b2Math.MulTMV(xf.R, normal);
  var offsetL = offset - b2Math.Dot(normal, xf.position);
  var depths = new Array;
  var diveCount = 0;
  var intoIndex = -1;
  var outoIndex = -1;
  var lastSubmerged = false;
  var i = 0;
  for(i = 0;i < this.m_vertexCount;++i) {
    depths[i] = b2Math.Dot(normalL, this.m_vertices[i]) - offsetL;
    var isSubmerged = depths[i] < -Number.MIN_VALUE;
    if(i > 0) {
      if(isSubmerged) {
        if(!lastSubmerged) {
          intoIndex = i - 1;
          diveCount++
        }
      }else {
        if(lastSubmerged) {
          outoIndex = i - 1;
          diveCount++
        }
      }
    }
    lastSubmerged = isSubmerged
  }
  switch(diveCount) {
    case 0:
      if(lastSubmerged) {
        var md = new b2MassData;
        this.ComputeMass(md, 1);
        c.SetV(b2Math.MulX(xf, md.center));
        return md.mass
      }else {
        return 0
      }
      break;
    case 1:
      if(intoIndex == -1) {
        intoIndex = this.m_vertexCount - 1
      }else {
        outoIndex = this.m_vertexCount - 1
      }
      break
  }
  var intoIndex2 = (intoIndex + 1) % this.m_vertexCount;
  var outoIndex2 = (outoIndex + 1) % this.m_vertexCount;
  var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
  var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
  var intoVec = new b2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
  var outoVec = new b2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
  var area = 0;
  var center = new b2Vec2;
  var p2 = this.m_vertices[intoIndex2];
  var p3;
  i = intoIndex2;
  while(i != outoIndex2) {
    i = (i + 1) % this.m_vertexCount;
    if(i == outoIndex2) {
      p3 = outoVec
    }else {
      p3 = this.m_vertices[i]
    }
    var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
    area += triangleArea;
    center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
    center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
    p2 = p3
  }
  center.Multiply(1 / area);
  c.SetV(b2Math.MulX(xf, center));
  return area
};
b2PolygonShape.prototype.GetVertexCount = function() {
  return this.m_vertexCount
};
b2PolygonShape.prototype.GetVertices = function() {
  return this.m_vertices
};
b2PolygonShape.prototype.GetNormals = function() {
  return this.m_normals
};
b2PolygonShape.prototype.GetSupport = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_vertexCount;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return bestIndex
};
b2PolygonShape.prototype.GetSupportVertex = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_vertexCount;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return this.m_vertices[bestIndex]
};
b2PolygonShape.prototype.m_centroid = null;
b2PolygonShape.prototype.m_vertices = null;
b2PolygonShape.prototype.m_normals = null;
b2PolygonShape.prototype.m_vertexCount = 0;var b2Fixture = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Fixture.prototype.__constructor = function() {
  this.m_aabb = new b2AABB;
  this.m_userData = null;
  this.m_body = null;
  this.m_next = null;
  this.m_shape = null;
  this.m_density = 0;
  this.m_friction = 0;
  this.m_restitution = 0
};
b2Fixture.prototype.__varz = function() {
  this.m_filter = new b2FilterData
};
b2Fixture.prototype.Create = function(body, xf, def) {
  this.m_userData = def.userData;
  this.m_friction = def.friction;
  this.m_restitution = def.restitution;
  this.m_body = body;
  this.m_next = null;
  this.m_filter = def.filter.Copy();
  this.m_isSensor = def.isSensor;
  this.m_shape = def.shape.Copy();
  this.m_density = def.density
};
b2Fixture.prototype.Destroy = function() {
  this.m_shape = null
};
b2Fixture.prototype.CreateProxy = function(broadPhase, xf) {
  this.m_shape.ComputeAABB(this.m_aabb, xf);
  this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this)
};
b2Fixture.prototype.DestroyProxy = function(broadPhase) {
  if(this.m_proxy == null) {
    return
  }
  broadPhase.DestroyProxy(this.m_proxy);
  this.m_proxy = null
};
b2Fixture.prototype.Synchronize = function(broadPhase, transform1, transform2) {
  if(!this.m_proxy) {
    return
  }
  var aabb1 = new b2AABB;
  var aabb2 = new b2AABB;
  this.m_shape.ComputeAABB(aabb1, transform1);
  this.m_shape.ComputeAABB(aabb2, transform2);
  this.m_aabb.Combine(aabb1, aabb2);
  var displacement = b2Math.SubtractVV(transform2.position, transform1.position);
  broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement)
};
b2Fixture.prototype.GetType = function() {
  return this.m_shape.GetType()
};
b2Fixture.prototype.GetShape = function() {
  return this.m_shape
};
b2Fixture.prototype.SetSensor = function(sensor) {
  if(this.m_isSensor == sensor) {
    return
  }
  this.m_isSensor = sensor;
  if(this.m_body == null) {
    return
  }
  var edge = this.m_body.GetContactList();
  while(edge) {
    var contact = edge.contact;
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    if(fixtureA == this || fixtureB == this) {
      contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor())
    }
    edge = edge.next
  }
};
b2Fixture.prototype.IsSensor = function() {
  return this.m_isSensor
};
b2Fixture.prototype.SetFilterData = function(filter) {
  this.m_filter = filter.Copy();
  if(this.m_body) {
    return
  }
  var edge = this.m_body.GetContactList();
  while(edge) {
    var contact = edge.contact;
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    if(fixtureA == this || fixtureB == this) {
      contact.FlagForFiltering()
    }
    edge = edge.next
  }
};
b2Fixture.prototype.GetFilterData = function() {
  return this.m_filter.Copy()
};
b2Fixture.prototype.GetBody = function() {
  return this.m_body
};
b2Fixture.prototype.GetNext = function() {
  return this.m_next
};
b2Fixture.prototype.GetUserData = function() {
  return this.m_userData
};
b2Fixture.prototype.SetUserData = function(data) {
  this.m_userData = data
};
b2Fixture.prototype.TestPoint = function(p) {
  return this.m_shape.TestPoint(this.m_body.GetTransform(), p)
};
b2Fixture.prototype.RayCast = function(output, input) {
  return this.m_shape.RayCast(output, input, this.m_body.GetTransform())
};
b2Fixture.prototype.GetMassData = function(massData) {
  if(massData == null) {
    massData = new b2MassData
  }
  this.m_shape.ComputeMass(massData, this.m_density);
  return massData
};
b2Fixture.prototype.SetDensity = function(density) {
  this.m_density = density
};
b2Fixture.prototype.GetDensity = function() {
  return this.m_density
};
b2Fixture.prototype.GetFriction = function() {
  return this.m_friction
};
b2Fixture.prototype.SetFriction = function(friction) {
  this.m_friction = friction
};
b2Fixture.prototype.GetRestitution = function() {
  return this.m_restitution
};
b2Fixture.prototype.SetRestitution = function(restitution) {
  this.m_restitution = restitution
};
b2Fixture.prototype.GetAABB = function() {
  return this.m_aabb
};
b2Fixture.prototype.m_massData = null;
b2Fixture.prototype.m_aabb = null;
b2Fixture.prototype.m_density = null;
b2Fixture.prototype.m_next = null;
b2Fixture.prototype.m_body = null;
b2Fixture.prototype.m_shape = null;
b2Fixture.prototype.m_friction = null;
b2Fixture.prototype.m_restitution = null;
b2Fixture.prototype.m_proxy = null;
b2Fixture.prototype.m_filter = new b2FilterData;
b2Fixture.prototype.m_isSensor = null;
b2Fixture.prototype.m_userData = null;var b2DynamicTreeNode = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTreeNode.prototype.__constructor = function() {
};
b2DynamicTreeNode.prototype.__varz = function() {
  this.aabb = new b2AABB
};
b2DynamicTreeNode.prototype.IsLeaf = function() {
  return this.child1 == null
};
b2DynamicTreeNode.prototype.userData = null;
b2DynamicTreeNode.prototype.aabb = new b2AABB;
b2DynamicTreeNode.prototype.parent = null;
b2DynamicTreeNode.prototype.child1 = null;
b2DynamicTreeNode.prototype.child2 = null;var b2BodyDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2BodyDef.prototype.__constructor = function() {
  this.userData = null;
  this.position.Set(0, 0);
  this.angle = 0;
  this.linearVelocity.Set(0, 0);
  this.angularVelocity = 0;
  this.linearDamping = 0;
  this.angularDamping = 0;
  this.allowSleep = true;
  this.awake = true;
  this.fixedRotation = false;
  this.bullet = false;
  this.type = b2Body.b2_staticBody;
  this.active = true;
  this.inertiaScale = 1
};
b2BodyDef.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.linearVelocity = new b2Vec2
};
b2BodyDef.prototype.type = 0;
b2BodyDef.prototype.position = new b2Vec2;
b2BodyDef.prototype.angle = null;
b2BodyDef.prototype.linearVelocity = new b2Vec2;
b2BodyDef.prototype.angularVelocity = null;
b2BodyDef.prototype.linearDamping = null;
b2BodyDef.prototype.angularDamping = null;
b2BodyDef.prototype.allowSleep = null;
b2BodyDef.prototype.awake = null;
b2BodyDef.prototype.fixedRotation = null;
b2BodyDef.prototype.bullet = null;
b2BodyDef.prototype.active = null;
b2BodyDef.prototype.userData = null;
b2BodyDef.prototype.inertiaScale = null;var b2DynamicTreeBroadPhase = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTreeBroadPhase.prototype.__constructor = function() {
};
b2DynamicTreeBroadPhase.prototype.__varz = function() {
  this.m_tree = new b2DynamicTree;
  this.m_moveBuffer = new Array;
  this.m_pairBuffer = new Array
};
b2DynamicTreeBroadPhase.prototype.BufferMove = function(proxy) {
  this.m_moveBuffer[this.m_moveBuffer.length] = proxy
};
b2DynamicTreeBroadPhase.prototype.UnBufferMove = function(proxy) {
  var i = this.m_moveBuffer.indexOf(proxy);
  this.m_moveBuffer.splice(i, 1)
};
b2DynamicTreeBroadPhase.prototype.ComparePairs = function(pair1, pair2) {
  return 0
};
b2DynamicTreeBroadPhase.prototype.CreateProxy = function(aabb, userData) {
  var proxy = this.m_tree.CreateProxy(aabb, userData);
  ++this.m_proxyCount;
  this.BufferMove(proxy);
  return proxy
};
b2DynamicTreeBroadPhase.prototype.DestroyProxy = function(proxy) {
  this.UnBufferMove(proxy);
  --this.m_proxyCount;
  this.m_tree.DestroyProxy(proxy)
};
b2DynamicTreeBroadPhase.prototype.MoveProxy = function(proxy, aabb, displacement) {
  var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
  if(buffer) {
    this.BufferMove(proxy)
  }
};
b2DynamicTreeBroadPhase.prototype.TestOverlap = function(proxyA, proxyB) {
  var aabbA = this.m_tree.GetFatAABB(proxyA);
  var aabbB = this.m_tree.GetFatAABB(proxyB);
  return aabbA.TestOverlap(aabbB)
};
b2DynamicTreeBroadPhase.prototype.GetUserData = function(proxy) {
  return this.m_tree.GetUserData(proxy)
};
b2DynamicTreeBroadPhase.prototype.GetFatAABB = function(proxy) {
  return this.m_tree.GetFatAABB(proxy)
};
b2DynamicTreeBroadPhase.prototype.GetProxyCount = function() {
  return this.m_proxyCount
};
b2DynamicTreeBroadPhase.prototype.UpdatePairs = function(callback) {
  this.m_pairCount = 0;
  for(var i = 0, queryProxy = null;i < this.m_moveBuffer.length, queryProxy = this.m_moveBuffer[i];i++) {
    var that = this;
    function QueryCallback(proxy) {
      if(proxy == queryProxy) {
        return true
      }
      if(that.m_pairCount == that.m_pairBuffer.length) {
        that.m_pairBuffer[that.m_pairCount] = new b2DynamicTreePair
      }
      var pair = that.m_pairBuffer[that.m_pairCount];
      pair.proxyA = proxy < queryProxy ? proxy : queryProxy;
      pair.proxyB = proxy >= queryProxy ? proxy : queryProxy;
      ++that.m_pairCount;
      return true
    }
    var fatAABB = this.m_tree.GetFatAABB(queryProxy);
    this.m_tree.Query(QueryCallback, fatAABB)
  }
  this.m_moveBuffer.length = 0;
  for(var i = 0;i < this.m_pairCount;) {
    var primaryPair = this.m_pairBuffer[i];
    var userDataA = this.m_tree.GetUserData(primaryPair.proxyA);
    var userDataB = this.m_tree.GetUserData(primaryPair.proxyB);
    callback(userDataA, userDataB);
    ++i;
    while(i < this.m_pairCount) {
      var pair = this.m_pairBuffer[i];
      if(pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) {
        break
      }
      ++i
    }
  }
};
b2DynamicTreeBroadPhase.prototype.Query = function(callback, aabb) {
  this.m_tree.Query(callback, aabb)
};
b2DynamicTreeBroadPhase.prototype.RayCast = function(callback, input) {
  this.m_tree.RayCast(callback, input)
};
b2DynamicTreeBroadPhase.prototype.Validate = function() {
};
b2DynamicTreeBroadPhase.prototype.Rebalance = function(iterations) {
  this.m_tree.Rebalance(iterations)
};
b2DynamicTreeBroadPhase.prototype.m_tree = new b2DynamicTree;
b2DynamicTreeBroadPhase.prototype.m_proxyCount = 0;
b2DynamicTreeBroadPhase.prototype.m_moveBuffer = new Array;
b2DynamicTreeBroadPhase.prototype.m_pairBuffer = new Array;
b2DynamicTreeBroadPhase.prototype.m_pairCount = 0;var b2BroadPhase = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2BroadPhase.prototype.__constructor = function(worldAABB) {
  var i = 0;
  this.m_pairManager.Initialize(this);
  this.m_worldAABB = worldAABB;
  this.m_proxyCount = 0;
  this.m_bounds = new Array;
  for(i = 0;i < 2;i++) {
    this.m_bounds[i] = new Array
  }
  var dX = worldAABB.upperBound.x - worldAABB.lowerBound.x;
  var dY = worldAABB.upperBound.y - worldAABB.lowerBound.y;
  this.m_quantizationFactor.x = b2Settings.USHRT_MAX / dX;
  this.m_quantizationFactor.y = b2Settings.USHRT_MAX / dY;
  this.m_timeStamp = 1;
  this.m_queryResultCount = 0
};
b2BroadPhase.prototype.__varz = function() {
  this.m_pairManager = new b2PairManager;
  this.m_proxyPool = new Array;
  this.m_querySortKeys = new Array;
  this.m_queryResults = new Array;
  this.m_quantizationFactor = new b2Vec2
};
b2BroadPhase.BinarySearch = function(bounds, count, value) {
  var low = 0;
  var high = count - 1;
  while(low <= high) {
    var mid = Math.round((low + high) / 2);
    var bound = bounds[mid];
    if(bound.value > value) {
      high = mid - 1
    }else {
      if(bound.value < value) {
        low = mid + 1
      }else {
        return parseInt(mid)
      }
    }
  }
  return parseInt(low)
};
b2BroadPhase.s_validate = false;
b2BroadPhase.b2_invalid = b2Settings.USHRT_MAX;
b2BroadPhase.b2_nullEdge = b2Settings.USHRT_MAX;
b2BroadPhase.prototype.ComputeBounds = function(lowerValues, upperValues, aabb) {
  var minVertexX = aabb.lowerBound.x;
  var minVertexY = aabb.lowerBound.y;
  minVertexX = b2Math.Min(minVertexX, this.m_worldAABB.upperBound.x);
  minVertexY = b2Math.Min(minVertexY, this.m_worldAABB.upperBound.y);
  minVertexX = b2Math.Max(minVertexX, this.m_worldAABB.lowerBound.x);
  minVertexY = b2Math.Max(minVertexY, this.m_worldAABB.lowerBound.y);
  var maxVertexX = aabb.upperBound.x;
  var maxVertexY = aabb.upperBound.y;
  maxVertexX = b2Math.Min(maxVertexX, this.m_worldAABB.upperBound.x);
  maxVertexY = b2Math.Min(maxVertexY, this.m_worldAABB.upperBound.y);
  maxVertexX = b2Math.Max(maxVertexX, this.m_worldAABB.lowerBound.x);
  maxVertexY = b2Math.Max(maxVertexY, this.m_worldAABB.lowerBound.y);
  lowerValues[0] = parseInt(this.m_quantizationFactor.x * (minVertexX - this.m_worldAABB.lowerBound.x)) & b2Settings.USHRT_MAX - 1;
  upperValues[0] = parseInt(this.m_quantizationFactor.x * (maxVertexX - this.m_worldAABB.lowerBound.x)) % 65535 | 1;
  lowerValues[1] = parseInt(this.m_quantizationFactor.y * (minVertexY - this.m_worldAABB.lowerBound.y)) & b2Settings.USHRT_MAX - 1;
  upperValues[1] = parseInt(this.m_quantizationFactor.y * (maxVertexY - this.m_worldAABB.lowerBound.y)) % 65535 | 1
};
b2BroadPhase.prototype.TestOverlapValidate = function(p1, p2) {
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var bound1 = bounds[p1.lowerBounds[axis]];
    var bound2 = bounds[p2.upperBounds[axis]];
    if(bound1.value > bound2.value) {
      return false
    }
    bound1 = bounds[p1.upperBounds[axis]];
    bound2 = bounds[p2.lowerBounds[axis]];
    if(bound1.value < bound2.value) {
      return false
    }
  }
  return true
};
b2BroadPhase.prototype.QueryAxis = function(lowerQueryOut, upperQueryOut, lowerValue, upperValue, bounds, boundCount, axis) {
  var lowerQuery = b2BroadPhase.BinarySearch(bounds, boundCount, lowerValue);
  var upperQuery = b2BroadPhase.BinarySearch(bounds, boundCount, upperValue);
  var bound;
  for(var j = lowerQuery;j < upperQuery;++j) {
    bound = bounds[j];
    if(bound.IsLower()) {
      this.IncrementOverlapCount(bound.proxy)
    }
  }
  if(lowerQuery > 0) {
    var i = lowerQuery - 1;
    bound = bounds[i];
    var s = bound.stabbingCount;
    while(s) {
      bound = bounds[i];
      if(bound.IsLower()) {
        var proxy = bound.proxy;
        if(lowerQuery <= proxy.upperBounds[axis]) {
          this.IncrementOverlapCount(bound.proxy);
          --s
        }
      }
      --i
    }
  }
  lowerQueryOut[0] = lowerQuery;
  upperQueryOut[0] = upperQuery
};
b2BroadPhase.prototype.IncrementOverlapCount = function(proxy) {
  if(proxy.timeStamp < this.m_timeStamp) {
    proxy.timeStamp = this.m_timeStamp;
    proxy.overlapCount = 1
  }else {
    proxy.overlapCount = 2;
    this.m_queryResults[this.m_queryResultCount] = proxy;
    ++this.m_queryResultCount
  }
};
b2BroadPhase.prototype.IncrementTimeStamp = function() {
  if(this.m_timeStamp == b2Settings.USHRT_MAX) {
    for(var i = 0;i < this.m_proxyPool.length;++i) {
      this.m_proxyPool[i].timeStamp = 0
    }
    this.m_timeStamp = 1
  }else {
    ++this.m_timeStamp
  }
};
b2BroadPhase.prototype.InRange = function(aabb) {
  var dX;
  var dY;
  var d2X;
  var d2Y;
  dX = aabb.lowerBound.x;
  dY = aabb.lowerBound.y;
  dX -= this.m_worldAABB.upperBound.x;
  dY -= this.m_worldAABB.upperBound.y;
  d2X = this.m_worldAABB.lowerBound.x;
  d2Y = this.m_worldAABB.lowerBound.y;
  d2X -= aabb.upperBound.x;
  d2Y -= aabb.upperBound.y;
  dX = b2Math.Max(dX, d2X);
  dY = b2Math.Max(dY, d2Y);
  return b2Math.Max(dX, dY) < 0
};
b2BroadPhase.prototype.CreateProxy = function(aabb, userData) {
  var index = 0;
  var proxy;
  var i = 0;
  var j = 0;
  if(!this.m_freeProxy) {
    this.m_freeProxy = this.m_proxyPool[this.m_proxyCount] = new b2Proxy;
    this.m_freeProxy.next = null;
    this.m_freeProxy.timeStamp = 0;
    this.m_freeProxy.overlapCount = b2BroadPhase.b2_invalid;
    this.m_freeProxy.userData = null;
    for(i = 0;i < 2;i++) {
      j = this.m_proxyCount * 2;
      this.m_bounds[i][j++] = new b2Bound;
      this.m_bounds[i][j] = new b2Bound
    }
  }
  proxy = this.m_freeProxy;
  this.m_freeProxy = proxy.next;
  proxy.overlapCount = 0;
  proxy.userData = userData;
  var boundCount = 2 * this.m_proxyCount;
  var lowerValues = new Array;
  var upperValues = new Array;
  this.ComputeBounds(lowerValues, upperValues, aabb);
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var lowerIndex = 0;
    var upperIndex = 0;
    var lowerIndexOut = new Array;
    lowerIndexOut.push(lowerIndex);
    var upperIndexOut = new Array;
    upperIndexOut.push(upperIndex);
    this.QueryAxis(lowerIndexOut, upperIndexOut, lowerValues[axis], upperValues[axis], bounds, boundCount, axis);
    lowerIndex = lowerIndexOut[0];
    upperIndex = upperIndexOut[0];
    bounds.splice(upperIndex, 0, bounds[bounds.length - 1]);
    bounds.length--;
    bounds.splice(lowerIndex, 0, bounds[bounds.length - 1]);
    bounds.length--;
    ++upperIndex;
    var tBound1 = bounds[lowerIndex];
    var tBound2 = bounds[upperIndex];
    tBound1.value = lowerValues[axis];
    tBound1.proxy = proxy;
    tBound2.value = upperValues[axis];
    tBound2.proxy = proxy;
    var tBoundAS3 = bounds[parseInt(lowerIndex - 1)];
    tBound1.stabbingCount = lowerIndex == 0 ? 0 : tBoundAS3.stabbingCount;
    tBoundAS3 = bounds[parseInt(upperIndex - 1)];
    tBound2.stabbingCount = tBoundAS3.stabbingCount;
    for(index = lowerIndex;index < upperIndex;++index) {
      tBoundAS3 = bounds[index];
      tBoundAS3.stabbingCount++
    }
    for(index = lowerIndex;index < boundCount + 2;++index) {
      tBound1 = bounds[index];
      var proxy2 = tBound1.proxy;
      if(tBound1.IsLower()) {
        proxy2.lowerBounds[axis] = index
      }else {
        proxy2.upperBounds[axis] = index
      }
    }
  }
  ++this.m_proxyCount;
  for(i = 0;i < this.m_queryResultCount;++i) {
    this.m_pairManager.AddBufferedPair(proxy, this.m_queryResults[i])
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return proxy
};
b2BroadPhase.prototype.DestroyProxy = function(proxy_) {
  var proxy = proxy_;
  var tBound1;
  var tBound2;
  var boundCount = 2 * this.m_proxyCount;
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var lowerIndex = proxy.lowerBounds[axis];
    var upperIndex = proxy.upperBounds[axis];
    tBound1 = bounds[lowerIndex];
    var lowerValue = tBound1.value;
    tBound2 = bounds[upperIndex];
    var upperValue = tBound2.value;
    bounds.splice(upperIndex, 1);
    bounds.splice(lowerIndex, 1);
    bounds.push(tBound1);
    bounds.push(tBound2);
    var tEnd = boundCount - 2;
    for(var index = lowerIndex;index < tEnd;++index) {
      tBound1 = bounds[index];
      var proxy2 = tBound1.proxy;
      if(tBound1.IsLower()) {
        proxy2.lowerBounds[axis] = index
      }else {
        proxy2.upperBounds[axis] = index
      }
    }
    tEnd = upperIndex - 1;
    for(var index2 = lowerIndex;index2 < tEnd;++index2) {
      tBound1 = bounds[index2];
      tBound1.stabbingCount--
    }
    var ignore = new Array;
    this.QueryAxis(ignore, ignore, lowerValue, upperValue, bounds, boundCount - 2, axis)
  }
  for(var i = 0;i < this.m_queryResultCount;++i) {
    this.m_pairManager.RemoveBufferedPair(proxy, this.m_queryResults[i])
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  proxy.userData = null;
  proxy.overlapCount = b2BroadPhase.b2_invalid;
  proxy.lowerBounds[0] = b2BroadPhase.b2_invalid;
  proxy.lowerBounds[1] = b2BroadPhase.b2_invalid;
  proxy.upperBounds[0] = b2BroadPhase.b2_invalid;
  proxy.upperBounds[1] = b2BroadPhase.b2_invalid;
  proxy.next = this.m_freeProxy;
  this.m_freeProxy = proxy;
  --this.m_proxyCount
};
b2BroadPhase.prototype.MoveProxy = function(proxy_, aabb, displacement) {
  var proxy = proxy_;
  var as3arr;
  var as3int = 0;
  var axis = 0;
  var index = 0;
  var bound;
  var prevBound;
  var nextBound;
  var nextProxyId = 0;
  var nextProxy;
  if(proxy == null) {
    return
  }
  if(aabb.IsValid() == false) {
    return
  }
  var boundCount = 2 * this.m_proxyCount;
  var newValues = new b2BoundValues;
  this.ComputeBounds(newValues.lowerValues, newValues.upperValues, aabb);
  var oldValues = new b2BoundValues;
  for(axis = 0;axis < 2;++axis) {
    bound = this.m_bounds[axis][proxy.lowerBounds[axis]];
    oldValues.lowerValues[axis] = bound.value;
    bound = this.m_bounds[axis][proxy.upperBounds[axis]];
    oldValues.upperValues[axis] = bound.value
  }
  for(axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var lowerIndex = proxy.lowerBounds[axis];
    var upperIndex = proxy.upperBounds[axis];
    var lowerValue = newValues.lowerValues[axis];
    var upperValue = newValues.upperValues[axis];
    bound = bounds[lowerIndex];
    var deltaLower = lowerValue - bound.value;
    bound.value = lowerValue;
    bound = bounds[upperIndex];
    var deltaUpper = upperValue - bound.value;
    bound.value = upperValue;
    if(deltaLower < 0) {
      index = lowerIndex;
      while(index > 0 && lowerValue < bounds[parseInt(index - 1)].value) {
        bound = bounds[index];
        prevBound = bounds[parseInt(index - 1)];
        var prevProxy = prevBound.proxy;
        prevBound.stabbingCount++;
        if(prevBound.IsUpper() == true) {
          if(this.TestOverlapBound(newValues, prevProxy)) {
            this.m_pairManager.AddBufferedPair(proxy, prevProxy)
          }
          as3arr = prevProxy.upperBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }else {
          as3arr = prevProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }
        as3arr = proxy.lowerBounds;
        as3int = as3arr[axis];
        as3int--;
        as3arr[axis] = as3int;
        bound.Swap(prevBound);
        --index
      }
    }
    if(deltaUpper > 0) {
      index = upperIndex;
      while(index < boundCount - 1 && bounds[parseInt(index + 1)].value <= upperValue) {
        bound = bounds[index];
        nextBound = bounds[parseInt(index + 1)];
        nextProxy = nextBound.proxy;
        nextBound.stabbingCount++;
        if(nextBound.IsLower() == true) {
          if(this.TestOverlapBound(newValues, nextProxy)) {
            this.m_pairManager.AddBufferedPair(proxy, nextProxy)
          }
          as3arr = nextProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }else {
          as3arr = nextProxy.upperBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }
        as3arr = proxy.upperBounds;
        as3int = as3arr[axis];
        as3int++;
        as3arr[axis] = as3int;
        bound.Swap(nextBound);
        index++
      }
    }
    if(deltaLower > 0) {
      index = lowerIndex;
      while(index < boundCount - 1 && bounds[parseInt(index + 1)].value <= lowerValue) {
        bound = bounds[index];
        nextBound = bounds[parseInt(index + 1)];
        nextProxy = nextBound.proxy;
        nextBound.stabbingCount--;
        if(nextBound.IsUpper()) {
          if(this.TestOverlapBound(oldValues, nextProxy)) {
            this.m_pairManager.RemoveBufferedPair(proxy, nextProxy)
          }
          as3arr = nextProxy.upperBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }else {
          as3arr = nextProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }
        as3arr = proxy.lowerBounds;
        as3int = as3arr[axis];
        as3int++;
        as3arr[axis] = as3int;
        bound.Swap(nextBound);
        index++
      }
    }
    if(deltaUpper < 0) {
      index = upperIndex;
      while(index > 0 && upperValue < bounds[parseInt(index - 1)].value) {
        bound = bounds[index];
        prevBound = bounds[parseInt(index - 1)];
        prevProxy = prevBound.proxy;
        prevBound.stabbingCount--;
        if(prevBound.IsLower() == true) {
          if(this.TestOverlapBound(oldValues, prevProxy)) {
            this.m_pairManager.RemoveBufferedPair(proxy, prevProxy)
          }
          as3arr = prevProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }else {
          as3arr = prevProxy.upperBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }
        as3arr = proxy.upperBounds;
        as3int = as3arr[axis];
        as3int--;
        as3arr[axis] = as3int;
        bound.Swap(prevBound);
        index--
      }
    }
  }
};
b2BroadPhase.prototype.UpdatePairs = function(callback) {
  this.m_pairManager.Commit(callback)
};
b2BroadPhase.prototype.TestOverlap = function(proxyA, proxyB) {
  var proxyA_ = proxyA;
  var proxyB_ = proxyB;
  if(proxyA_.lowerBounds[0] > proxyB_.upperBounds[0]) {
    return false
  }
  if(proxyB_.lowerBounds[0] > proxyA_.upperBounds[0]) {
    return false
  }
  if(proxyA_.lowerBounds[1] > proxyB_.upperBounds[1]) {
    return false
  }
  if(proxyB_.lowerBounds[1] > proxyA_.upperBounds[1]) {
    return false
  }
  return true
};
b2BroadPhase.prototype.GetUserData = function(proxy) {
  return proxy.userData
};
b2BroadPhase.prototype.GetFatAABB = function(proxy_) {
  var aabb = new b2AABB;
  var proxy = proxy_;
  aabb.lowerBound.x = this.m_worldAABB.lowerBound.x + this.m_bounds[0][proxy.lowerBounds[0]].value / this.m_quantizationFactor.x;
  aabb.lowerBound.y = this.m_worldAABB.lowerBound.y + this.m_bounds[1][proxy.lowerBounds[1]].value / this.m_quantizationFactor.y;
  aabb.upperBound.x = this.m_worldAABB.lowerBound.x + this.m_bounds[0][proxy.upperBounds[0]].value / this.m_quantizationFactor.x;
  aabb.upperBound.y = this.m_worldAABB.lowerBound.y + this.m_bounds[1][proxy.upperBounds[1]].value / this.m_quantizationFactor.y;
  return aabb
};
b2BroadPhase.prototype.GetProxyCount = function() {
  return this.m_proxyCount
};
b2BroadPhase.prototype.Query = function(callback, aabb) {
  var lowerValues = new Array;
  var upperValues = new Array;
  this.ComputeBounds(lowerValues, upperValues, aabb);
  var lowerIndex = 0;
  var upperIndex = 0;
  var lowerIndexOut = new Array;
  lowerIndexOut.push(lowerIndex);
  var upperIndexOut = new Array;
  upperIndexOut.push(upperIndex);
  this.QueryAxis(lowerIndexOut, upperIndexOut, lowerValues[0], upperValues[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
  this.QueryAxis(lowerIndexOut, upperIndexOut, lowerValues[1], upperValues[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
  for(var i = 0;i < this.m_queryResultCount;++i) {
    var proxy = this.m_queryResults[i];
    if(!callback(proxy)) {
      break
    }
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp()
};
b2BroadPhase.prototype.Validate = function() {
  var pair;
  var proxy1;
  var proxy2;
  var overlap;
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var boundCount = 2 * this.m_proxyCount;
    var stabbingCount = 0;
    for(var i = 0;i < boundCount;++i) {
      var bound = bounds[i];
      if(bound.IsLower() == true) {
        stabbingCount++
      }else {
        stabbingCount--
      }
    }
  }
};
b2BroadPhase.prototype.Rebalance = function(iterations) {
};
b2BroadPhase.prototype.RayCast = function(callback, input) {
  var subInput = new b2RayCastInput;
  subInput.p1.SetV(input.p1);
  subInput.p2.SetV(input.p2);
  subInput.maxFraction = input.maxFraction;
  var dx = (input.p2.x - input.p1.x) * this.m_quantizationFactor.x;
  var dy = (input.p2.y - input.p1.y) * this.m_quantizationFactor.y;
  var sx = dx < -Number.MIN_VALUE ? -1 : dx > Number.MIN_VALUE ? 1 : 0;
  var sy = dy < -Number.MIN_VALUE ? -1 : dy > Number.MIN_VALUE ? 1 : 0;
  var p1x = this.m_quantizationFactor.x * (input.p1.x - this.m_worldAABB.lowerBound.x);
  var p1y = this.m_quantizationFactor.y * (input.p1.y - this.m_worldAABB.lowerBound.y);
  var startValues = new Array;
  var startValues2 = new Array;
  startValues[0] = parseInt(p1x) & b2Settings.USHRT_MAX - 1;
  startValues[1] = parseInt(p1y) & b2Settings.USHRT_MAX - 1;
  startValues2[0] = startValues[0] + 1;
  startValues2[1] = startValues[1] + 1;
  var startIndices = new Array;
  var xIndex = 0;
  var yIndex = 0;
  var proxy;
  var lowerIndex = 0;
  var upperIndex = 0;
  var lowerIndexOut = new Array;
  lowerIndexOut.push(lowerIndex);
  var upperIndexOut = new Array;
  upperIndexOut.push(upperIndex);
  this.QueryAxis(lowerIndexOut, upperIndexOut, startValues[0], startValues2[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
  if(sx >= 0) {
    xIndex = upperIndexOut[0] - 1
  }else {
    xIndex = lowerIndexOut[0]
  }
  this.QueryAxis(lowerIndexOut, upperIndexOut, startValues[1], startValues2[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
  if(sy >= 0) {
    yIndex = upperIndexOut[0] - 1
  }else {
    yIndex = lowerIndexOut[0]
  }
  for(var i = 0;i < this.m_queryResultCount;i++) {
    subInput.maxFraction = callback(this.m_queryResults[i], subInput)
  }
  for(;;) {
    var xProgress = 0;
    var yProgress = 0;
    xIndex += sx >= 0 ? 1 : -1;
    if(xIndex < 0 || xIndex >= this.m_proxyCount * 2) {
      break
    }
    if(sx != 0) {
      xProgress = (this.m_bounds[0][xIndex].value - p1x) / dx
    }
    yIndex += sy >= 0 ? 1 : -1;
    if(yIndex < 0 || yIndex >= this.m_proxyCount * 2) {
      break
    }
    if(sy != 0) {
      yProgress = (this.m_bounds[1][yIndex].value - p1y) / dy
    }
    for(;;) {
      if(sy == 0 || sx != 0 && xProgress < yProgress) {
        if(xProgress > subInput.maxFraction) {
          break
        }
        if(sx > 0 ? this.m_bounds[0][xIndex].IsLower() : this.m_bounds[0][xIndex].IsUpper()) {
          proxy = this.m_bounds[0][xIndex].proxy;
          if(sy >= 0) {
            if(proxy.lowerBounds[1] <= yIndex - 1 && proxy.upperBounds[1] >= yIndex) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }else {
            if(proxy.lowerBounds[1] <= yIndex && proxy.upperBounds[1] >= yIndex + 1) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }
        }
        if(subInput.maxFraction == 0) {
          break
        }
        if(sx > 0) {
          xIndex++;
          if(xIndex == this.m_proxyCount * 2) {
            break
          }
        }else {
          xIndex--;
          if(xIndex < 0) {
            break
          }
        }
        xProgress = (this.m_bounds[0][xIndex].value - p1x) / dx
      }else {
        if(yProgress > subInput.maxFraction) {
          break
        }
        if(sy > 0 ? this.m_bounds[1][yIndex].IsLower() : this.m_bounds[1][yIndex].IsUpper()) {
          proxy = this.m_bounds[1][yIndex].proxy;
          if(sx >= 0) {
            if(proxy.lowerBounds[0] <= xIndex - 1 && proxy.upperBounds[0] >= xIndex) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }else {
            if(proxy.lowerBounds[0] <= xIndex && proxy.upperBounds[0] >= xIndex + 1) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }
        }
        if(subInput.maxFraction == 0) {
          break
        }
        if(sy > 0) {
          yIndex++;
          if(yIndex == this.m_proxyCount * 2) {
            break
          }
        }else {
          yIndex--;
          if(yIndex < 0) {
            break
          }
        }
        yProgress = (this.m_bounds[1][yIndex].value - p1y) / dy
      }
    }
    break
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return
};
b2BroadPhase.prototype.TestOverlapBound = function(b, p) {
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var bound = bounds[p.upperBounds[axis]];
    if(b.lowerValues[axis] > bound.value) {
      return false
    }
    bound = bounds[p.lowerBounds[axis]];
    if(b.upperValues[axis] < bound.value) {
      return false
    }
  }
  return true
};
b2BroadPhase.prototype.m_pairManager = new b2PairManager;
b2BroadPhase.prototype.m_proxyPool = new Array;
b2BroadPhase.prototype.m_freeProxy = null;
b2BroadPhase.prototype.m_bounds = null;
b2BroadPhase.prototype.m_querySortKeys = new Array;
b2BroadPhase.prototype.m_queryResults = new Array;
b2BroadPhase.prototype.m_queryResultCount = 0;
b2BroadPhase.prototype.m_worldAABB = null;
b2BroadPhase.prototype.m_quantizationFactor = new b2Vec2;
b2BroadPhase.prototype.m_proxyCount = 0;
b2BroadPhase.prototype.m_timeStamp = 0;var b2Manifold = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Manifold.prototype.__constructor = function() {
  this.m_points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i] = new b2ManifoldPoint
  }
  this.m_localPlaneNormal = new b2Vec2;
  this.m_localPoint = new b2Vec2
};
b2Manifold.prototype.__varz = function() {
};
b2Manifold.e_circles = 1;
b2Manifold.e_faceA = 2;
b2Manifold.e_faceB = 4;
b2Manifold.prototype.Reset = function() {
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i].Reset()
  }
  this.m_localPlaneNormal.SetZero();
  this.m_localPoint.SetZero();
  this.m_type = 0;
  this.m_pointCount = 0
};
b2Manifold.prototype.Set = function(m) {
  this.m_pointCount = m.m_pointCount;
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i].Set(m.m_points[i])
  }
  this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
  this.m_localPoint.SetV(m.m_localPoint);
  this.m_type = m.m_type
};
b2Manifold.prototype.Copy = function() {
  var copy = new b2Manifold;
  copy.Set(this);
  return copy
};
b2Manifold.prototype.m_points = null;
b2Manifold.prototype.m_localPlaneNormal = null;
b2Manifold.prototype.m_localPoint = null;
b2Manifold.prototype.m_type = 0;
b2Manifold.prototype.m_pointCount = 0;var b2CircleShape = function() {
  b2Shape.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2CircleShape.prototype, b2Shape.prototype);
b2CircleShape.prototype._super = b2Shape.prototype;
b2CircleShape.prototype.__constructor = function(radius) {
  this._super.__constructor.apply(this, []);
  this.m_type = b2Shape.e_circleShape;
  this.m_radius = radius
};
b2CircleShape.prototype.__varz = function() {
  this.m_p = new b2Vec2
};
b2CircleShape.prototype.Copy = function() {
  var s = new b2CircleShape;
  s.Set(this);
  return s
};
b2CircleShape.prototype.Set = function(other) {
  this._super.Set.apply(this, [other]);
  if(isInstanceOf(other, b2CircleShape)) {
    var other2 = other;
    this.m_p.SetV(other2.m_p)
  }
};
b2CircleShape.prototype.TestPoint = function(transform, p) {
  var tMat = transform.R;
  var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
  var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
  dX = p.x - dX;
  dY = p.y - dY;
  return dX * dX + dY * dY <= this.m_radius * this.m_radius
};
b2CircleShape.prototype.RayCast = function(output, input, transform) {
  var tMat = transform.R;
  var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
  var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
  var sX = input.p1.x - positionX;
  var sY = input.p1.y - positionY;
  var b = sX * sX + sY * sY - this.m_radius * this.m_radius;
  var rX = input.p2.x - input.p1.x;
  var rY = input.p2.y - input.p1.y;
  var c = sX * rX + sY * rY;
  var rr = rX * rX + rY * rY;
  var sigma = c * c - rr * b;
  if(sigma < 0 || rr < Number.MIN_VALUE) {
    return false
  }
  var a = -(c + Math.sqrt(sigma));
  if(0 <= a && a <= input.maxFraction * rr) {
    a /= rr;
    output.fraction = a;
    output.normal.x = sX + a * rX;
    output.normal.y = sY + a * rY;
    output.normal.Normalize();
    return true
  }
  return false
};
b2CircleShape.prototype.ComputeAABB = function(aabb, transform) {
  var tMat = transform.R;
  var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
  var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
  aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
  aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius)
};
b2CircleShape.prototype.ComputeMass = function(massData, density) {
  massData.mass = density * b2Settings.b2_pi * this.m_radius * this.m_radius;
  massData.center.SetV(this.m_p);
  massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
};
b2CircleShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  var p = b2Math.MulX(xf, this.m_p);
  var l = -(b2Math.Dot(normal, p) - offset);
  if(l < -this.m_radius + Number.MIN_VALUE) {
    return 0
  }
  if(l > this.m_radius) {
    c.SetV(p);
    return Math.PI * this.m_radius * this.m_radius
  }
  var r2 = this.m_radius * this.m_radius;
  var l2 = l * l;
  var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
  var com = -2 / 3 * Math.pow(r2 - l2, 1.5) / area;
  c.x = p.x + normal.x * com;
  c.y = p.y + normal.y * com;
  return area
};
b2CircleShape.prototype.GetLocalPosition = function() {
  return this.m_p
};
b2CircleShape.prototype.SetLocalPosition = function(position) {
  this.m_p.SetV(position)
};
b2CircleShape.prototype.GetRadius = function() {
  return this.m_radius
};
b2CircleShape.prototype.SetRadius = function(radius) {
  this.m_radius = radius
};
b2CircleShape.prototype.m_p = new b2Vec2;var b2Joint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Joint.prototype.__constructor = function(def) {
  b2Settings.b2Assert(def.bodyA != def.bodyB);
  this.m_type = def.type;
  this.m_prev = null;
  this.m_next = null;
  this.m_bodyA = def.bodyA;
  this.m_bodyB = def.bodyB;
  this.m_collideConnected = def.collideConnected;
  this.m_islandFlag = false;
  this.m_userData = def.userData
};
b2Joint.prototype.__varz = function() {
  this.m_edgeA = new b2JointEdge;
  this.m_edgeB = new b2JointEdge;
  this.m_localCenterA = new b2Vec2;
  this.m_localCenterB = new b2Vec2
};
b2Joint.Create = function(def, allocator) {
  var joint = null;
  switch(def.type) {
    case b2Joint.e_distanceJoint:
      joint = new b2DistanceJoint(def);
      break;
    case b2Joint.e_mouseJoint:
      joint = new b2MouseJoint(def);
      break;
    case b2Joint.e_prismaticJoint:
      joint = new b2PrismaticJoint(def);
      break;
    case b2Joint.e_revoluteJoint:
      joint = new b2RevoluteJoint(def);
      break;
    case b2Joint.e_pulleyJoint:
      joint = new b2PulleyJoint(def);
      break;
    case b2Joint.e_gearJoint:
      joint = new b2GearJoint(def);
      break;
    case b2Joint.e_lineJoint:
      joint = new b2LineJoint(def);
      break;
    case b2Joint.e_weldJoint:
      joint = new b2WeldJoint(def);
      break;
    case b2Joint.e_frictionJoint:
      joint = new b2FrictionJoint(def);
      break;
    default:
      break
  }
  return joint
};
b2Joint.Destroy = function(joint, allocator) {
};
b2Joint.e_unknownJoint = 0;
b2Joint.e_revoluteJoint = 1;
b2Joint.e_prismaticJoint = 2;
b2Joint.e_distanceJoint = 3;
b2Joint.e_pulleyJoint = 4;
b2Joint.e_mouseJoint = 5;
b2Joint.e_gearJoint = 6;
b2Joint.e_lineJoint = 7;
b2Joint.e_weldJoint = 8;
b2Joint.e_frictionJoint = 9;
b2Joint.e_inactiveLimit = 0;
b2Joint.e_atLowerLimit = 1;
b2Joint.e_atUpperLimit = 2;
b2Joint.e_equalLimits = 3;
b2Joint.prototype.InitVelocityConstraints = function(step) {
};
b2Joint.prototype.SolveVelocityConstraints = function(step) {
};
b2Joint.prototype.FinalizeVelocityConstraints = function() {
};
b2Joint.prototype.SolvePositionConstraints = function(baumgarte) {
  return false
};
b2Joint.prototype.GetType = function() {
  return this.m_type
};
b2Joint.prototype.GetAnchorA = function() {
  return null
};
b2Joint.prototype.GetAnchorB = function() {
  return null
};
b2Joint.prototype.GetReactionForce = function(inv_dt) {
  return null
};
b2Joint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2Joint.prototype.GetBodyA = function() {
  return this.m_bodyA
};
b2Joint.prototype.GetBodyB = function() {
  return this.m_bodyB
};
b2Joint.prototype.GetNext = function() {
  return this.m_next
};
b2Joint.prototype.GetUserData = function() {
  return this.m_userData
};
b2Joint.prototype.SetUserData = function(data) {
  this.m_userData = data
};
b2Joint.prototype.IsActive = function() {
  return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
};
b2Joint.prototype.m_type = 0;
b2Joint.prototype.m_prev = null;
b2Joint.prototype.m_next = null;
b2Joint.prototype.m_edgeA = new b2JointEdge;
b2Joint.prototype.m_edgeB = new b2JointEdge;
b2Joint.prototype.m_bodyA = null;
b2Joint.prototype.m_bodyB = null;
b2Joint.prototype.m_islandFlag = null;
b2Joint.prototype.m_collideConnected = null;
b2Joint.prototype.m_userData = null;
b2Joint.prototype.m_localCenterA = new b2Vec2;
b2Joint.prototype.m_localCenterB = new b2Vec2;
b2Joint.prototype.m_invMassA = null;
b2Joint.prototype.m_invMassB = null;
b2Joint.prototype.m_invIA = null;
b2Joint.prototype.m_invIB = null;var b2LineJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2LineJoint.prototype, b2Joint.prototype);
b2LineJoint.prototype._super = b2Joint.prototype;
b2LineJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_localXAxis1.SetV(def.localAxisA);
  this.m_localYAxis1.x = -this.m_localXAxis1.y;
  this.m_localYAxis1.y = this.m_localXAxis1.x;
  this.m_impulse.SetZero();
  this.m_motorMass = 0;
  this.m_motorImpulse = 0;
  this.m_lowerTranslation = def.lowerTranslation;
  this.m_upperTranslation = def.upperTranslation;
  this.m_maxMotorForce = def.maxMotorForce;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = b2Joint.e_inactiveLimit;
  this.m_axis.SetZero();
  this.m_perp.SetZero()
};
b2LineJoint.prototype.__varz = function() {
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_localXAxis1 = new b2Vec2;
  this.m_localYAxis1 = new b2Vec2;
  this.m_axis = new b2Vec2;
  this.m_perp = new b2Vec2;
  this.m_K = new b2Mat22;
  this.m_impulse = new b2Vec2
};
b2LineJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  this.m_localCenterA.SetV(bA.GetLocalCenter());
  this.m_localCenterB.SetV(bB.GetLocalCenter());
  var xf1 = bA.GetTransform();
  var xf2 = bB.GetTransform();
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  this.m_invMassA = bA.m_invMass;
  this.m_invMassB = bB.m_invMass;
  this.m_invIA = bA.m_invI;
  this.m_invIB = bB.m_invI;
  this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
  this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
  this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
  this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
  this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
  this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var m1 = this.m_invMassA;
  var m2 = this.m_invMassB;
  var i1 = this.m_invIA;
  var i2 = this.m_invIB;
  this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
  this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
  this.m_K.col2.x = this.m_K.col1.y;
  this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
  if(this.m_enableLimit) {
    var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      this.m_limitState = b2Joint.e_equalLimits
    }else {
      if(jointTransition <= this.m_lowerTranslation) {
        if(this.m_limitState != b2Joint.e_atLowerLimit) {
          this.m_limitState = b2Joint.e_atLowerLimit;
          this.m_impulse.y = 0
        }
      }else {
        if(jointTransition >= this.m_upperTranslation) {
          if(this.m_limitState != b2Joint.e_atUpperLimit) {
            this.m_limitState = b2Joint.e_atUpperLimit;
            this.m_impulse.y = 0
          }
        }else {
          this.m_limitState = b2Joint.e_inactiveLimit;
          this.m_impulse.y = 0
        }
      }
    }
  }else {
    this.m_limitState = b2Joint.e_inactiveLimit
  }
  if(this.m_enableMotor == false) {
    this.m_motorImpulse = 0
  }
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;
    var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
    var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
    var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
    var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
    bA.m_linearVelocity.x -= this.m_invMassA * PX;
    bA.m_linearVelocity.y -= this.m_invMassA * PY;
    bA.m_angularVelocity -= this.m_invIA * L1;
    bB.m_linearVelocity.x += this.m_invMassB * PX;
    bB.m_linearVelocity.y += this.m_invMassB * PY;
    bB.m_angularVelocity += this.m_invIB * L2
  }else {
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0
  }
};
b2LineJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var v1 = bA.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var v2 = bB.m_linearVelocity;
  var w2 = bB.m_angularVelocity;
  var PX;
  var PY;
  var L1;
  var L2;
  if(this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
    var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorForce;
    this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;
    PX = impulse * this.m_axis.x;
    PY = impulse * this.m_axis.y;
    L1 = impulse * this.m_a1;
    L2 = impulse * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var f1 = this.m_impulse.Copy();
    var df = this.m_K.Solve(new b2Vec2, -Cdot1, -Cdot2);
    this.m_impulse.Add(df);
    if(this.m_limitState == b2Joint.e_atLowerLimit) {
      this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0)
    }else {
      if(this.m_limitState == b2Joint.e_atUpperLimit) {
        this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0)
      }
    }
    var b = -Cdot1 - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
    var f2r;
    if(this.m_K.col1.x != 0) {
      f2r = b / this.m_K.col1.x + f1.x
    }else {
      f2r = f1.x
    }
    this.m_impulse.x = f2r;
    df.x = this.m_impulse.x - f1.x;
    df.y = this.m_impulse.y - f1.y;
    PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
    PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
    L1 = df.x * this.m_s1 + df.y * this.m_a1;
    L2 = df.x * this.m_s2 + df.y * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }else {
    var df2;
    if(this.m_K.col1.x != 0) {
      df2 = -Cdot1 / this.m_K.col1.x
    }else {
      df2 = 0
    }
    this.m_impulse.x += df2;
    PX = df2 * this.m_perp.x;
    PY = df2 * this.m_perp.y;
    L1 = df2 * this.m_s1;
    L2 = df2 * this.m_s2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  bA.m_linearVelocity.SetV(v1);
  bA.m_angularVelocity = w1;
  bB.m_linearVelocity.SetV(v2);
  bB.m_angularVelocity = w2
};
b2LineJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var limitC;
  var oldLimitImpulse;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var c1 = bA.m_sweep.c;
  var a1 = bA.m_sweep.a;
  var c2 = bB.m_sweep.c;
  var a2 = bB.m_sweep.a;
  var tMat;
  var tX;
  var m1;
  var m2;
  var i1;
  var i2;
  var linearError = 0;
  var angularError = 0;
  var active = false;
  var C2 = 0;
  var R1 = b2Mat22.FromAngle(a1);
  var R2 = b2Mat22.FromAngle(a2);
  tMat = R1;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = R2;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = c2.x + r2X - c1.x - r1X;
  var dY = c2.y + r2Y - c1.y - r1Y;
  if(this.m_enableLimit) {
    this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
    this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
    this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
    var translation = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      C2 = b2Math.Clamp(translation, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
      linearError = b2Math.Abs(translation);
      active = true
    }else {
      if(translation <= this.m_lowerTranslation) {
        C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
        linearError = this.m_lowerTranslation - translation;
        active = true
      }else {
        if(translation >= this.m_upperTranslation) {
          C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
          linearError = translation - this.m_upperTranslation;
          active = true
        }
      }
    }
  }
  this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var impulse = new b2Vec2;
  var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
  linearError = b2Math.Max(linearError, b2Math.Abs(C1));
  angularError = 0;
  if(active) {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
    this.m_K.Solve(impulse, -C1, -C2)
  }else {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    var impulse1;
    if(k11 != 0) {
      impulse1 = -C1 / k11
    }else {
      impulse1 = 0
    }
    impulse.x = impulse1;
    impulse.y = 0
  }
  var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
  var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
  var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
  var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
  c1.x -= this.m_invMassA * PX;
  c1.y -= this.m_invMassA * PY;
  a1 -= this.m_invIA * L1;
  c2.x += this.m_invMassB * PX;
  c2.y += this.m_invMassB * PY;
  a2 += this.m_invIB * L2;
  bA.m_sweep.a = a1;
  bB.m_sweep.a = a2;
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2LineJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2LineJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2LineJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
};
b2LineJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.y
};
b2LineJoint.prototype.GetJointTranslation = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var p1 = bA.GetWorldPoint(this.m_localAnchor1);
  var p2 = bB.GetWorldPoint(this.m_localAnchor2);
  var dX = p2.x - p1.x;
  var dY = p2.y - p1.y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var translation = axis.x * dX + axis.y * dY;
  return translation
};
b2LineJoint.prototype.GetJointSpeed = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var p1X = bA.m_sweep.c.x + r1X;
  var p1Y = bA.m_sweep.c.y + r1Y;
  var p2X = bB.m_sweep.c.x + r2X;
  var p2Y = bB.m_sweep.c.y + r2Y;
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var v1 = bA.m_linearVelocity;
  var v2 = bB.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var w2 = bB.m_angularVelocity;
  var speed = dX * -w1 * axis.y + dY * w1 * axis.x + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
  return speed
};
b2LineJoint.prototype.IsLimitEnabled = function() {
  return this.m_enableLimit
};
b2LineJoint.prototype.EnableLimit = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableLimit = flag
};
b2LineJoint.prototype.GetLowerLimit = function() {
  return this.m_lowerTranslation
};
b2LineJoint.prototype.GetUpperLimit = function() {
  return this.m_upperTranslation
};
b2LineJoint.prototype.SetLimits = function(lower, upper) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_lowerTranslation = lower;
  this.m_upperTranslation = upper
};
b2LineJoint.prototype.IsMotorEnabled = function() {
  return this.m_enableMotor
};
b2LineJoint.prototype.EnableMotor = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableMotor = flag
};
b2LineJoint.prototype.SetMotorSpeed = function(speed) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_motorSpeed = speed
};
b2LineJoint.prototype.GetMotorSpeed = function() {
  return this.m_motorSpeed
};
b2LineJoint.prototype.SetMaxMotorForce = function(force) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_maxMotorForce = force
};
b2LineJoint.prototype.GetMaxMotorForce = function() {
  return this.m_maxMotorForce
};
b2LineJoint.prototype.GetMotorForce = function() {
  return this.m_motorImpulse
};
b2LineJoint.prototype.m_localAnchor1 = new b2Vec2;
b2LineJoint.prototype.m_localAnchor2 = new b2Vec2;
b2LineJoint.prototype.m_localXAxis1 = new b2Vec2;
b2LineJoint.prototype.m_localYAxis1 = new b2Vec2;
b2LineJoint.prototype.m_axis = new b2Vec2;
b2LineJoint.prototype.m_perp = new b2Vec2;
b2LineJoint.prototype.m_s1 = null;
b2LineJoint.prototype.m_s2 = null;
b2LineJoint.prototype.m_a1 = null;
b2LineJoint.prototype.m_a2 = null;
b2LineJoint.prototype.m_K = new b2Mat22;
b2LineJoint.prototype.m_impulse = new b2Vec2;
b2LineJoint.prototype.m_motorMass = null;
b2LineJoint.prototype.m_motorImpulse = null;
b2LineJoint.prototype.m_lowerTranslation = null;
b2LineJoint.prototype.m_upperTranslation = null;
b2LineJoint.prototype.m_maxMotorForce = null;
b2LineJoint.prototype.m_motorSpeed = null;
b2LineJoint.prototype.m_enableLimit = null;
b2LineJoint.prototype.m_enableMotor = null;
b2LineJoint.prototype.m_limitState = 0;var b2ContactSolver = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactSolver.prototype.__constructor = function() {
};
b2ContactSolver.prototype.__varz = function() {
  this.m_step = new b2TimeStep;
  this.m_constraints = new Array
};
b2ContactSolver.s_worldManifold = new b2WorldManifold;
b2ContactSolver.s_psm = new b2PositionSolverManifold;
b2ContactSolver.prototype.Initialize = function(step, contacts, contactCount, allocator) {
  var contact;
  this.m_step.Set(step);
  this.m_allocator = allocator;
  var i = 0;
  var tVec;
  var tMat;
  this.m_constraintCount = contactCount;
  while(this.m_constraints.length < this.m_constraintCount) {
    this.m_constraints[this.m_constraints.length] = new b2ContactConstraint
  }
  for(i = 0;i < contactCount;++i) {
    contact = contacts[i];
    var fixtureA = contact.m_fixtureA;
    var fixtureB = contact.m_fixtureB;
    var shapeA = fixtureA.m_shape;
    var shapeB = fixtureB.m_shape;
    var radiusA = shapeA.m_radius;
    var radiusB = shapeB.m_radius;
    var bodyA = fixtureA.m_body;
    var bodyB = fixtureB.m_body;
    var manifold = contact.GetManifold();
    var friction = b2Settings.b2MixFriction(fixtureA.GetFriction(), fixtureB.GetFriction());
    var restitution = b2Settings.b2MixRestitution(fixtureA.GetRestitution(), fixtureB.GetRestitution());
    var vAX = bodyA.m_linearVelocity.x;
    var vAY = bodyA.m_linearVelocity.y;
    var vBX = bodyB.m_linearVelocity.x;
    var vBY = bodyB.m_linearVelocity.y;
    var wA = bodyA.m_angularVelocity;
    var wB = bodyB.m_angularVelocity;
    b2Settings.b2Assert(manifold.m_pointCount > 0);
    b2ContactSolver.s_worldManifold.Initialize(manifold, bodyA.m_xf, radiusA, bodyB.m_xf, radiusB);
    var normalX = b2ContactSolver.s_worldManifold.m_normal.x;
    var normalY = b2ContactSolver.s_worldManifold.m_normal.y;
    var cc = this.m_constraints[i];
    cc.bodyA = bodyA;
    cc.bodyB = bodyB;
    cc.manifold = manifold;
    cc.normal.x = normalX;
    cc.normal.y = normalY;
    cc.pointCount = manifold.m_pointCount;
    cc.friction = friction;
    cc.restitution = restitution;
    cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
    cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
    cc.localPoint.x = manifold.m_localPoint.x;
    cc.localPoint.y = manifold.m_localPoint.y;
    cc.radius = radiusA + radiusB;
    cc.type = manifold.m_type;
    for(var k = 0;k < cc.pointCount;++k) {
      var cp = manifold.m_points[k];
      var ccp = cc.points[k];
      ccp.normalImpulse = cp.m_normalImpulse;
      ccp.tangentImpulse = cp.m_tangentImpulse;
      ccp.localPoint.SetV(cp.m_localPoint);
      var rAX = ccp.rA.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
      var rAY = ccp.rA.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
      var rBX = ccp.rB.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
      var rBY = ccp.rB.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
      var rnA = rAX * normalY - rAY * normalX;
      var rnB = rBX * normalY - rBY * normalX;
      rnA *= rnA;
      rnB *= rnB;
      var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
      ccp.normalMass = 1 / kNormal;
      var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
      kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
      ccp.equalizedMass = 1 / kEqualized;
      var tangentX = normalY;
      var tangentY = -normalX;
      var rtA = rAX * tangentY - rAY * tangentX;
      var rtB = rBX * tangentY - rBY * tangentX;
      rtA *= rtA;
      rtB *= rtB;
      var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
      ccp.tangentMass = 1 / kTangent;
      ccp.velocityBias = 0;
      var tX = vBX + -wB * rBY - vAX - -wA * rAY;
      var tY = vBY + wB * rBX - vAY - wA * rAX;
      var vRel = cc.normal.x * tX + cc.normal.y * tY;
      if(vRel < -b2Settings.b2_velocityThreshold) {
        ccp.velocityBias += -cc.restitution * vRel
      }
    }
    if(cc.pointCount == 2) {
      var ccp1 = cc.points[0];
      var ccp2 = cc.points[1];
      var invMassA = bodyA.m_invMass;
      var invIA = bodyA.m_invI;
      var invMassB = bodyB.m_invMass;
      var invIB = bodyB.m_invI;
      var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
      var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
      var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
      var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
      var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
      var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
      var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
      var k_maxConditionNumber = 100;
      if(k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
        cc.K.col1.Set(k11, k12);
        cc.K.col2.Set(k12, k22);
        cc.K.GetInverse(cc.normalMass)
      }else {
        cc.pointCount = 1
      }
    }
  }
};
b2ContactSolver.prototype.InitVelocityConstraints = function(step) {
  var tVec;
  var tVec2;
  var tMat;
  for(var i = 0;i < this.m_constraintCount;++i) {
    var c = this.m_constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var invMassA = bodyA.m_invMass;
    var invIA = bodyA.m_invI;
    var invMassB = bodyB.m_invMass;
    var invIB = bodyB.m_invI;
    var normalX = c.normal.x;
    var normalY = c.normal.y;
    var tangentX = normalY;
    var tangentY = -normalX;
    var tX;
    var j = 0;
    var tCount = 0;
    if(step.warmStarting) {
      tCount = c.pointCount;
      for(j = 0;j < tCount;++j) {
        var ccp = c.points[j];
        ccp.normalImpulse *= step.dtRatio;
        ccp.tangentImpulse *= step.dtRatio;
        var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
        var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
        bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
        bodyA.m_linearVelocity.x -= invMassA * PX;
        bodyA.m_linearVelocity.y -= invMassA * PY;
        bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
        bodyB.m_linearVelocity.x += invMassB * PX;
        bodyB.m_linearVelocity.y += invMassB * PY
      }
    }else {
      tCount = c.pointCount;
      for(j = 0;j < tCount;++j) {
        var ccp2 = c.points[j];
        ccp2.normalImpulse = 0;
        ccp2.tangentImpulse = 0
      }
    }
  }
};
b2ContactSolver.prototype.SolveVelocityConstraints = function() {
  var j = 0;
  var ccp;
  var rAX;
  var rAY;
  var rBX;
  var rBY;
  var dvX;
  var dvY;
  var vn;
  var vt;
  var lambda;
  var maxFriction;
  var newImpulse;
  var PX;
  var PY;
  var dX;
  var dY;
  var P1X;
  var P1Y;
  var P2X;
  var P2Y;
  var tMat;
  var tVec;
  for(var i = 0;i < this.m_constraintCount;++i) {
    var c = this.m_constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var wA = bodyA.m_angularVelocity;
    var wB = bodyB.m_angularVelocity;
    var vA = bodyA.m_linearVelocity;
    var vB = bodyB.m_linearVelocity;
    var invMassA = bodyA.m_invMass;
    var invIA = bodyA.m_invI;
    var invMassB = bodyB.m_invMass;
    var invIB = bodyB.m_invI;
    var normalX = c.normal.x;
    var normalY = c.normal.y;
    var tangentX = normalY;
    var tangentY = -normalX;
    var friction = c.friction;
    var tX;
    for(j = 0;j < c.pointCount;j++) {
      ccp = c.points[j];
      dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
      dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
      vt = dvX * tangentX + dvY * tangentY;
      lambda = ccp.tangentMass * -vt;
      maxFriction = friction * ccp.normalImpulse;
      newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, -maxFriction, maxFriction);
      lambda = newImpulse - ccp.tangentImpulse;
      PX = lambda * tangentX;
      PY = lambda * tangentY;
      vA.x -= invMassA * PX;
      vA.y -= invMassA * PY;
      wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
      vB.x += invMassB * PX;
      vB.y += invMassB * PY;
      wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
      ccp.tangentImpulse = newImpulse
    }
    var tCount = c.pointCount;
    if(c.pointCount == 1) {
      ccp = c.points[0];
      dvX = vB.x + -wB * ccp.rB.y - vA.x - -wA * ccp.rA.y;
      dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
      vn = dvX * normalX + dvY * normalY;
      lambda = -ccp.normalMass * (vn - ccp.velocityBias);
      newImpulse = ccp.normalImpulse + lambda;
      newImpulse = newImpulse > 0 ? newImpulse : 0;
      lambda = newImpulse - ccp.normalImpulse;
      PX = lambda * normalX;
      PY = lambda * normalY;
      vA.x -= invMassA * PX;
      vA.y -= invMassA * PY;
      wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
      vB.x += invMassB * PX;
      vB.y += invMassB * PY;
      wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
      ccp.normalImpulse = newImpulse
    }else {
      var cp1 = c.points[0];
      var cp2 = c.points[1];
      var aX = cp1.normalImpulse;
      var aY = cp2.normalImpulse;
      var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
      var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
      var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
      var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
      var vn1 = dv1X * normalX + dv1Y * normalY;
      var vn2 = dv2X * normalX + dv2Y * normalY;
      var bX = vn1 - cp1.velocityBias;
      var bY = vn2 - cp2.velocityBias;
      tMat = c.K;
      bX -= tMat.col1.x * aX + tMat.col2.x * aY;
      bY -= tMat.col1.y * aX + tMat.col2.y * aY;
      var k_errorTol = 0.0010;
      for(;;) {
        tMat = c.normalMass;
        var xX = -(tMat.col1.x * bX + tMat.col2.x * bY);
        var xY = -(tMat.col1.y * bX + tMat.col2.y * bY);
        if(xX >= 0 && xY >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        xX = -cp1.normalMass * bX;
        xY = 0;
        vn1 = 0;
        vn2 = c.K.col1.y * xX + bY;
        if(xX >= 0 && vn2 >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        xX = 0;
        xY = -cp2.normalMass * bY;
        vn1 = c.K.col2.x * xY + bX;
        vn2 = 0;
        if(xY >= 0 && vn1 >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        xX = 0;
        xY = 0;
        vn1 = bX;
        vn2 = bY;
        if(vn1 >= 0 && vn2 >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        break
      }
    }
    bodyA.m_angularVelocity = wA;
    bodyB.m_angularVelocity = wB
  }
};
b2ContactSolver.prototype.FinalizeVelocityConstraints = function() {
  for(var i = 0;i < this.m_constraintCount;++i) {
    var c = this.m_constraints[i];
    var m = c.manifold;
    for(var j = 0;j < c.pointCount;++j) {
      var point1 = m.m_points[j];
      var point2 = c.points[j];
      point1.m_normalImpulse = point2.normalImpulse;
      point1.m_tangentImpulse = point2.tangentImpulse
    }
  }
};
b2ContactSolver.prototype.SolvePositionConstraints = function(baumgarte) {
  var minSeparation = 0;
  for(var i = 0;i < this.m_constraintCount;i++) {
    var c = this.m_constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var invMassA = bodyA.m_mass * bodyA.m_invMass;
    var invIA = bodyA.m_mass * bodyA.m_invI;
    var invMassB = bodyB.m_mass * bodyB.m_invMass;
    var invIB = bodyB.m_mass * bodyB.m_invI;
    b2ContactSolver.s_psm.Initialize(c);
    var normal = b2ContactSolver.s_psm.m_normal;
    for(var j = 0;j < c.pointCount;j++) {
      var ccp = c.points[j];
      var point = b2ContactSolver.s_psm.m_points[j];
      var separation = b2ContactSolver.s_psm.m_separations[j];
      var rAX = point.x - bodyA.m_sweep.c.x;
      var rAY = point.y - bodyA.m_sweep.c.y;
      var rBX = point.x - bodyB.m_sweep.c.x;
      var rBY = point.y - bodyB.m_sweep.c.y;
      minSeparation = minSeparation < separation ? minSeparation : separation;
      var C = b2Math.Clamp(baumgarte * (separation + b2Settings.b2_linearSlop), -b2Settings.b2_maxLinearCorrection, 0);
      var impulse = -ccp.equalizedMass * C;
      var PX = impulse * normal.x;
      var PY = impulse * normal.y;
      bodyA.m_sweep.c.x -= invMassA * PX;
      bodyA.m_sweep.c.y -= invMassA * PY;
      bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
      bodyA.SynchronizeTransform();
      bodyB.m_sweep.c.x += invMassB * PX;
      bodyB.m_sweep.c.y += invMassB * PY;
      bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
      bodyB.SynchronizeTransform()
    }
  }
  return minSeparation > -1.5 * b2Settings.b2_linearSlop
};
b2ContactSolver.prototype.m_step = new b2TimeStep;
b2ContactSolver.prototype.m_allocator = null;
b2ContactSolver.prototype.m_constraints = new Array;
b2ContactSolver.prototype.m_constraintCount = 0;var b2Simplex = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Simplex.prototype.__constructor = function() {
  this.m_vertices[0] = this.m_v1;
  this.m_vertices[1] = this.m_v2;
  this.m_vertices[2] = this.m_v3
};
b2Simplex.prototype.__varz = function() {
  this.m_v1 = new b2SimplexVertex;
  this.m_v2 = new b2SimplexVertex;
  this.m_v3 = new b2SimplexVertex;
  this.m_vertices = new Array(3)
};
b2Simplex.prototype.ReadCache = function(cache, proxyA, transformA, proxyB, transformB) {
  b2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
  var wALocal;
  var wBLocal;
  this.m_count = cache.count;
  var vertices = this.m_vertices;
  for(var i = 0;i < this.m_count;i++) {
    var v = vertices[i];
    v.indexA = cache.indexA[i];
    v.indexB = cache.indexB[i];
    wALocal = proxyA.GetVertex(v.indexA);
    wBLocal = proxyB.GetVertex(v.indexB);
    v.wA = b2Math.MulX(transformA, wALocal);
    v.wB = b2Math.MulX(transformB, wBLocal);
    v.w = b2Math.SubtractVV(v.wB, v.wA);
    v.a = 0
  }
  if(this.m_count > 1) {
    var metric1 = cache.metric;
    var metric2 = this.GetMetric();
    if(metric2 < 0.5 * metric1 || 2 * metric1 < metric2 || metric2 < Number.MIN_VALUE) {
      this.m_count = 0
    }
  }
  if(this.m_count == 0) {
    v = vertices[0];
    v.indexA = 0;
    v.indexB = 0;
    wALocal = proxyA.GetVertex(0);
    wBLocal = proxyB.GetVertex(0);
    v.wA = b2Math.MulX(transformA, wALocal);
    v.wB = b2Math.MulX(transformB, wBLocal);
    v.w = b2Math.SubtractVV(v.wB, v.wA);
    this.m_count = 1
  }
};
b2Simplex.prototype.WriteCache = function(cache) {
  cache.metric = this.GetMetric();
  cache.count = parseInt(this.m_count);
  var vertices = this.m_vertices;
  for(var i = 0;i < this.m_count;i++) {
    cache.indexA[i] = parseInt(vertices[i].indexA);
    cache.indexB[i] = parseInt(vertices[i].indexB)
  }
};
b2Simplex.prototype.GetSearchDirection = function() {
  switch(this.m_count) {
    case 1:
      return this.m_v1.w.GetNegative();
    case 2:
      var e12 = b2Math.SubtractVV(this.m_v2.w, this.m_v1.w);
      var sgn = b2Math.CrossVV(e12, this.m_v1.w.GetNegative());
      if(sgn > 0) {
        return b2Math.CrossFV(1, e12)
      }else {
        return b2Math.CrossVF(e12, 1)
      }
    ;
    default:
      b2Settings.b2Assert(false);
      return new b2Vec2
  }
};
b2Simplex.prototype.GetClosestPoint = function() {
  switch(this.m_count) {
    case 0:
      b2Settings.b2Assert(false);
      return new b2Vec2;
    case 1:
      return this.m_v1.w;
    case 2:
      return new b2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
    default:
      b2Settings.b2Assert(false);
      return new b2Vec2
  }
};
b2Simplex.prototype.GetWitnessPoints = function(pA, pB) {
  switch(this.m_count) {
    case 0:
      b2Settings.b2Assert(false);
      break;
    case 1:
      pA.SetV(this.m_v1.wA);
      pB.SetV(this.m_v1.wB);
      break;
    case 2:
      pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
      pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
      pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
      pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
      break;
    case 3:
      pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
      pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
      break;
    default:
      b2Settings.b2Assert(false);
      break
  }
};
b2Simplex.prototype.GetMetric = function() {
  switch(this.m_count) {
    case 0:
      b2Settings.b2Assert(false);
      return 0;
    case 1:
      return 0;
    case 2:
      return b2Math.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
    case 3:
      return b2Math.CrossVV(b2Math.SubtractVV(this.m_v2.w, this.m_v1.w), b2Math.SubtractVV(this.m_v3.w, this.m_v1.w));
    default:
      b2Settings.b2Assert(false);
      return 0
  }
};
b2Simplex.prototype.Solve2 = function() {
  var w1 = this.m_v1.w;
  var w2 = this.m_v2.w;
  var e12 = b2Math.SubtractVV(w2, w1);
  var d12_2 = -(w1.x * e12.x + w1.y * e12.y);
  if(d12_2 <= 0) {
    this.m_v1.a = 1;
    this.m_count = 1;
    return
  }
  var d12_1 = w2.x * e12.x + w2.y * e12.y;
  if(d12_1 <= 0) {
    this.m_v2.a = 1;
    this.m_count = 1;
    this.m_v1.Set(this.m_v2);
    return
  }
  var inv_d12 = 1 / (d12_1 + d12_2);
  this.m_v1.a = d12_1 * inv_d12;
  this.m_v2.a = d12_2 * inv_d12;
  this.m_count = 2
};
b2Simplex.prototype.Solve3 = function() {
  var w1 = this.m_v1.w;
  var w2 = this.m_v2.w;
  var w3 = this.m_v3.w;
  var e12 = b2Math.SubtractVV(w2, w1);
  var w1e12 = b2Math.Dot(w1, e12);
  var w2e12 = b2Math.Dot(w2, e12);
  var d12_1 = w2e12;
  var d12_2 = -w1e12;
  var e13 = b2Math.SubtractVV(w3, w1);
  var w1e13 = b2Math.Dot(w1, e13);
  var w3e13 = b2Math.Dot(w3, e13);
  var d13_1 = w3e13;
  var d13_2 = -w1e13;
  var e23 = b2Math.SubtractVV(w3, w2);
  var w2e23 = b2Math.Dot(w2, e23);
  var w3e23 = b2Math.Dot(w3, e23);
  var d23_1 = w3e23;
  var d23_2 = -w2e23;
  var n123 = b2Math.CrossVV(e12, e13);
  var d123_1 = n123 * b2Math.CrossVV(w2, w3);
  var d123_2 = n123 * b2Math.CrossVV(w3, w1);
  var d123_3 = n123 * b2Math.CrossVV(w1, w2);
  if(d12_2 <= 0 && d13_2 <= 0) {
    this.m_v1.a = 1;
    this.m_count = 1;
    return
  }
  if(d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
    var inv_d12 = 1 / (d12_1 + d12_2);
    this.m_v1.a = d12_1 * inv_d12;
    this.m_v2.a = d12_2 * inv_d12;
    this.m_count = 2;
    return
  }
  if(d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
    var inv_d13 = 1 / (d13_1 + d13_2);
    this.m_v1.a = d13_1 * inv_d13;
    this.m_v3.a = d13_2 * inv_d13;
    this.m_count = 2;
    this.m_v2.Set(this.m_v3);
    return
  }
  if(d12_1 <= 0 && d23_2 <= 0) {
    this.m_v2.a = 1;
    this.m_count = 1;
    this.m_v1.Set(this.m_v2);
    return
  }
  if(d13_1 <= 0 && d23_1 <= 0) {
    this.m_v3.a = 1;
    this.m_count = 1;
    this.m_v1.Set(this.m_v3);
    return
  }
  if(d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
    var inv_d23 = 1 / (d23_1 + d23_2);
    this.m_v2.a = d23_1 * inv_d23;
    this.m_v3.a = d23_2 * inv_d23;
    this.m_count = 2;
    this.m_v1.Set(this.m_v3);
    return
  }
  var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
  this.m_v1.a = d123_1 * inv_d123;
  this.m_v2.a = d123_2 * inv_d123;
  this.m_v3.a = d123_3 * inv_d123;
  this.m_count = 3
};
b2Simplex.prototype.m_v1 = new b2SimplexVertex;
b2Simplex.prototype.m_v2 = new b2SimplexVertex;
b2Simplex.prototype.m_v3 = new b2SimplexVertex;
b2Simplex.prototype.m_vertices = new Array(3);
b2Simplex.prototype.m_count = 0;var b2WeldJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2WeldJoint.prototype, b2Joint.prototype);
b2WeldJoint.prototype._super = b2Joint.prototype;
b2WeldJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_localAnchorA.SetV(def.localAnchorA);
  this.m_localAnchorB.SetV(def.localAnchorB);
  this.m_referenceAngle = def.referenceAngle;
  this.m_impulse.SetZero();
  this.m_mass = new b2Mat33
};
b2WeldJoint.prototype.__varz = function() {
  this.m_localAnchorA = new b2Vec2;
  this.m_localAnchorB = new b2Vec2;
  this.m_impulse = new b2Vec3;
  this.m_mass = new b2Mat33
};
b2WeldJoint.prototype.InitVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
  this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
  this.m_mass.col3.x = -rAY * iA - rBY * iB;
  this.m_mass.col1.y = this.m_mass.col2.x;
  this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
  this.m_mass.col3.y = rAX * iA + rBX * iB;
  this.m_mass.col1.z = this.m_mass.col3.x;
  this.m_mass.col2.z = this.m_mass.col3.y;
  this.m_mass.col3.z = iA + iB;
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_impulse.z *= step.dtRatio;
    bA.m_linearVelocity.x -= mA * this.m_impulse.x;
    bA.m_linearVelocity.y -= mA * this.m_impulse.y;
    bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
    bB.m_linearVelocity.x += mB * this.m_impulse.x;
    bB.m_linearVelocity.y += mB * this.m_impulse.y;
    bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z)
  }else {
    this.m_impulse.SetZero()
  }
};
b2WeldJoint.prototype.SolveVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var vA = bA.m_linearVelocity;
  var wA = bA.m_angularVelocity;
  var vB = bB.m_linearVelocity;
  var wB = bB.m_angularVelocity;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
  var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
  var Cdot2 = wB - wA;
  var impulse = new b2Vec3;
  this.m_mass.Solve33(impulse, -Cdot1X, -Cdot1Y, -Cdot2);
  this.m_impulse.Add(impulse);
  vA.x -= mA * impulse.x;
  vA.y -= mA * impulse.y;
  wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
  vB.x += mB * impulse.x;
  vB.y += mB * impulse.y;
  wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
  bA.m_angularVelocity = wA;
  bB.m_angularVelocity = wB
};
b2WeldJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
  var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
  var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
  var k_allowedStretch = 10 * b2Settings.b2_linearSlop;
  var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
  var angularError = b2Math.Abs(C2);
  if(positionError > k_allowedStretch) {
    iA *= 1;
    iB *= 1
  }
  this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
  this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
  this.m_mass.col3.x = -rAY * iA - rBY * iB;
  this.m_mass.col1.y = this.m_mass.col2.x;
  this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
  this.m_mass.col3.y = rAX * iA + rBX * iB;
  this.m_mass.col1.z = this.m_mass.col3.x;
  this.m_mass.col2.z = this.m_mass.col3.y;
  this.m_mass.col3.z = iA + iB;
  var impulse = new b2Vec3;
  this.m_mass.Solve33(impulse, -C1X, -C1Y, -C2);
  bA.m_sweep.c.x -= mA * impulse.x;
  bA.m_sweep.c.y -= mA * impulse.y;
  bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
  bB.m_sweep.c.x += mB * impulse.x;
  bB.m_sweep.c.y += mB * impulse.y;
  bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2WeldJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
};
b2WeldJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
};
b2WeldJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
};
b2WeldJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.z
};
b2WeldJoint.prototype.m_localAnchorA = new b2Vec2;
b2WeldJoint.prototype.m_localAnchorB = new b2Vec2;
b2WeldJoint.prototype.m_referenceAngle = null;
b2WeldJoint.prototype.m_impulse = new b2Vec3;
b2WeldJoint.prototype.m_mass = new b2Mat33;var b2Math = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Math.prototype.__constructor = function() {
};
b2Math.prototype.__varz = function() {
};
b2Math.IsValid = function(x) {
  return isFinite(x)
};
b2Math.Dot = function(a, b) {
  return a.x * b.x + a.y * b.y
};
b2Math.CrossVV = function(a, b) {
  return a.x * b.y - a.y * b.x
};
b2Math.CrossVF = function(a, s) {
  var v = new b2Vec2(s * a.y, -s * a.x);
  return v
};
b2Math.CrossFV = function(s, a) {
  var v = new b2Vec2(-s * a.y, s * a.x);
  return v
};
b2Math.MulMV = function(A, v) {
  var u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
  return u
};
b2Math.MulTMV = function(A, v) {
  var u = new b2Vec2(b2Math.Dot(v, A.col1), b2Math.Dot(v, A.col2));
  return u
};
b2Math.MulX = function(T, v) {
  var a = b2Math.MulMV(T.R, v);
  a.x += T.position.x;
  a.y += T.position.y;
  return a
};
b2Math.MulXT = function(T, v) {
  var a = b2Math.SubtractVV(v, T.position);
  var tX = a.x * T.R.col1.x + a.y * T.R.col1.y;
  a.y = a.x * T.R.col2.x + a.y * T.R.col2.y;
  a.x = tX;
  return a
};
b2Math.AddVV = function(a, b) {
  var v = new b2Vec2(a.x + b.x, a.y + b.y);
  return v
};
b2Math.SubtractVV = function(a, b) {
  var v = new b2Vec2(a.x - b.x, a.y - b.y);
  return v
};
b2Math.Distance = function(a, b) {
  var cX = a.x - b.x;
  var cY = a.y - b.y;
  return Math.sqrt(cX * cX + cY * cY)
};
b2Math.DistanceSquared = function(a, b) {
  var cX = a.x - b.x;
  var cY = a.y - b.y;
  return cX * cX + cY * cY
};
b2Math.MulFV = function(s, a) {
  var v = new b2Vec2(s * a.x, s * a.y);
  return v
};
b2Math.AddMM = function(A, B) {
  var C = b2Mat22.FromVV(b2Math.AddVV(A.col1, B.col1), b2Math.AddVV(A.col2, B.col2));
  return C
};
b2Math.MulMM = function(A, B) {
  var C = b2Mat22.FromVV(b2Math.MulMV(A, B.col1), b2Math.MulMV(A, B.col2));
  return C
};
b2Math.MulTMM = function(A, B) {
  var c1 = new b2Vec2(b2Math.Dot(A.col1, B.col1), b2Math.Dot(A.col2, B.col1));
  var c2 = new b2Vec2(b2Math.Dot(A.col1, B.col2), b2Math.Dot(A.col2, B.col2));
  var C = b2Mat22.FromVV(c1, c2);
  return C
};
b2Math.Abs = function(a) {
  return a > 0 ? a : -a
};
b2Math.AbsV = function(a) {
  var b = new b2Vec2(b2Math.Abs(a.x), b2Math.Abs(a.y));
  return b
};
b2Math.AbsM = function(A) {
  var B = b2Mat22.FromVV(b2Math.AbsV(A.col1), b2Math.AbsV(A.col2));
  return B
};
b2Math.Min = function(a, b) {
  return a < b ? a : b
};
b2Math.MinV = function(a, b) {
  var c = new b2Vec2(b2Math.Min(a.x, b.x), b2Math.Min(a.y, b.y));
  return c
};
b2Math.Max = function(a, b) {
  return a > b ? a : b
};
b2Math.MaxV = function(a, b) {
  var c = new b2Vec2(b2Math.Max(a.x, b.x), b2Math.Max(a.y, b.y));
  return c
};
b2Math.Clamp = function(a, low, high) {
  return a < low ? low : a > high ? high : a
};
b2Math.ClampV = function(a, low, high) {
  return b2Math.MaxV(low, b2Math.MinV(a, high))
};
b2Math.Swap = function(a, b) {
  var tmp = a[0];
  a[0] = b[0];
  b[0] = tmp
};
b2Math.Random = function() {
  return Math.random() * 2 - 1
};
b2Math.RandomRange = function(lo, hi) {
  var r = Math.random();
  r = (hi - lo) * r + lo;
  return r
};
b2Math.NextPowerOfTwo = function(x) {
  x |= x >> 1 & 2147483647;
  x |= x >> 2 & 1073741823;
  x |= x >> 4 & 268435455;
  x |= x >> 8 & 16777215;
  x |= x >> 16 & 65535;
  return x + 1
};
b2Math.IsPowerOfTwo = function(x) {
  var result = x > 0 && (x & x - 1) == 0;
  return result
};
b2Math.b2Vec2_zero = new b2Vec2(0, 0);
b2Math.b2Mat22_identity = b2Mat22.FromVV(new b2Vec2(1, 0), new b2Vec2(0, 1));
b2Math.b2Transform_identity = new b2Transform(b2Math.b2Vec2_zero, b2Math.b2Mat22_identity);var b2PulleyJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PulleyJoint.prototype, b2Joint.prototype);
b2PulleyJoint.prototype._super = b2Joint.prototype;
b2PulleyJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_ground = this.m_bodyA.m_world.m_groundBody;
  this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
  this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
  this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
  this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_ratio = def.ratio;
  this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
  this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
  this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
  this.m_impulse = 0;
  this.m_limitImpulse1 = 0;
  this.m_limitImpulse2 = 0
};
b2PulleyJoint.prototype.__varz = function() {
  this.m_groundAnchor1 = new b2Vec2;
  this.m_groundAnchor2 = new b2Vec2;
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_u1 = new b2Vec2;
  this.m_u2 = new b2Vec2
};
b2PulleyJoint.b2_minPulleyLength = 2;
b2PulleyJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var p1X = bA.m_sweep.c.x + r1X;
  var p1Y = bA.m_sweep.c.y + r1Y;
  var p2X = bB.m_sweep.c.x + r2X;
  var p2Y = bB.m_sweep.c.y + r2Y;
  var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
  var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
  var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
  var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
  this.m_u1.Set(p1X - s1X, p1Y - s1Y);
  this.m_u2.Set(p2X - s2X, p2Y - s2Y);
  var length1 = this.m_u1.Length();
  var length2 = this.m_u2.Length();
  if(length1 > b2Settings.b2_linearSlop) {
    this.m_u1.Multiply(1 / length1)
  }else {
    this.m_u1.SetZero()
  }
  if(length2 > b2Settings.b2_linearSlop) {
    this.m_u2.Multiply(1 / length2)
  }else {
    this.m_u2.SetZero()
  }
  var C = this.m_constant - length1 - this.m_ratio * length2;
  if(C > 0) {
    this.m_state = b2Joint.e_inactiveLimit;
    this.m_impulse = 0
  }else {
    this.m_state = b2Joint.e_atUpperLimit
  }
  if(length1 < this.m_maxLength1) {
    this.m_limitState1 = b2Joint.e_inactiveLimit;
    this.m_limitImpulse1 = 0
  }else {
    this.m_limitState1 = b2Joint.e_atUpperLimit
  }
  if(length2 < this.m_maxLength2) {
    this.m_limitState2 = b2Joint.e_inactiveLimit;
    this.m_limitImpulse2 = 0
  }else {
    this.m_limitState2 = b2Joint.e_atUpperLimit
  }
  var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
  var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
  this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
  this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
  this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
  this.m_limitMass1 = 1 / this.m_limitMass1;
  this.m_limitMass2 = 1 / this.m_limitMass2;
  this.m_pulleyMass = 1 / this.m_pulleyMass;
  if(step.warmStarting) {
    this.m_impulse *= step.dtRatio;
    this.m_limitImpulse1 *= step.dtRatio;
    this.m_limitImpulse2 *= step.dtRatio;
    var P1X = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x;
    var P1Y = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y;
    var P2X = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x;
    var P2Y = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
    bA.m_linearVelocity.x += bA.m_invMass * P1X;
    bA.m_linearVelocity.y += bA.m_invMass * P1Y;
    bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
    bB.m_linearVelocity.x += bB.m_invMass * P2X;
    bB.m_linearVelocity.y += bB.m_invMass * P2Y;
    bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
  }else {
    this.m_impulse = 0;
    this.m_limitImpulse1 = 0;
    this.m_limitImpulse2 = 0
  }
};
b2PulleyJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var v1X;
  var v1Y;
  var v2X;
  var v2Y;
  var P1X;
  var P1Y;
  var P2X;
  var P2Y;
  var Cdot;
  var impulse;
  var oldImpulse;
  if(this.m_state == b2Joint.e_atUpperLimit) {
    v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
    v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
    v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
    v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
    Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
    impulse = this.m_pulleyMass * -Cdot;
    oldImpulse = this.m_impulse;
    this.m_impulse = b2Math.Max(0, this.m_impulse + impulse);
    impulse = this.m_impulse - oldImpulse;
    P1X = -impulse * this.m_u1.x;
    P1Y = -impulse * this.m_u1.y;
    P2X = -this.m_ratio * impulse * this.m_u2.x;
    P2Y = -this.m_ratio * impulse * this.m_u2.y;
    bA.m_linearVelocity.x += bA.m_invMass * P1X;
    bA.m_linearVelocity.y += bA.m_invMass * P1Y;
    bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
    bB.m_linearVelocity.x += bB.m_invMass * P2X;
    bB.m_linearVelocity.y += bB.m_invMass * P2Y;
    bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
  }
  if(this.m_limitState1 == b2Joint.e_atUpperLimit) {
    v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
    v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
    Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y);
    impulse = -this.m_limitMass1 * Cdot;
    oldImpulse = this.m_limitImpulse1;
    this.m_limitImpulse1 = b2Math.Max(0, this.m_limitImpulse1 + impulse);
    impulse = this.m_limitImpulse1 - oldImpulse;
    P1X = -impulse * this.m_u1.x;
    P1Y = -impulse * this.m_u1.y;
    bA.m_linearVelocity.x += bA.m_invMass * P1X;
    bA.m_linearVelocity.y += bA.m_invMass * P1Y;
    bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X)
  }
  if(this.m_limitState2 == b2Joint.e_atUpperLimit) {
    v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
    v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
    Cdot = -(this.m_u2.x * v2X + this.m_u2.y * v2Y);
    impulse = -this.m_limitMass2 * Cdot;
    oldImpulse = this.m_limitImpulse2;
    this.m_limitImpulse2 = b2Math.Max(0, this.m_limitImpulse2 + impulse);
    impulse = this.m_limitImpulse2 - oldImpulse;
    P2X = -impulse * this.m_u2.x;
    P2Y = -impulse * this.m_u2.y;
    bB.m_linearVelocity.x += bB.m_invMass * P2X;
    bB.m_linearVelocity.y += bB.m_invMass * P2Y;
    bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
  }
};
b2PulleyJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
  var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
  var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
  var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
  var r1X;
  var r1Y;
  var r2X;
  var r2Y;
  var p1X;
  var p1Y;
  var p2X;
  var p2Y;
  var length1;
  var length2;
  var C;
  var impulse;
  var oldImpulse;
  var oldLimitPositionImpulse;
  var tX;
  var linearError = 0;
  if(this.m_state == b2Joint.e_atUpperLimit) {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    p1X = bA.m_sweep.c.x + r1X;
    p1Y = bA.m_sweep.c.y + r1Y;
    p2X = bB.m_sweep.c.x + r2X;
    p2Y = bB.m_sweep.c.y + r2Y;
    this.m_u1.Set(p1X - s1X, p1Y - s1Y);
    this.m_u2.Set(p2X - s2X, p2Y - s2Y);
    length1 = this.m_u1.Length();
    length2 = this.m_u2.Length();
    if(length1 > b2Settings.b2_linearSlop) {
      this.m_u1.Multiply(1 / length1)
    }else {
      this.m_u1.SetZero()
    }
    if(length2 > b2Settings.b2_linearSlop) {
      this.m_u2.Multiply(1 / length2)
    }else {
      this.m_u2.SetZero()
    }
    C = this.m_constant - length1 - this.m_ratio * length2;
    linearError = b2Math.Max(linearError, -C);
    C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
    impulse = -this.m_pulleyMass * C;
    p1X = -impulse * this.m_u1.x;
    p1Y = -impulse * this.m_u1.y;
    p2X = -this.m_ratio * impulse * this.m_u2.x;
    p2Y = -this.m_ratio * impulse * this.m_u2.y;
    bA.m_sweep.c.x += bA.m_invMass * p1X;
    bA.m_sweep.c.y += bA.m_invMass * p1Y;
    bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
    bB.m_sweep.c.x += bB.m_invMass * p2X;
    bB.m_sweep.c.y += bB.m_invMass * p2Y;
    bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
    bA.SynchronizeTransform();
    bB.SynchronizeTransform()
  }
  if(this.m_limitState1 == b2Joint.e_atUpperLimit) {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    p1X = bA.m_sweep.c.x + r1X;
    p1Y = bA.m_sweep.c.y + r1Y;
    this.m_u1.Set(p1X - s1X, p1Y - s1Y);
    length1 = this.m_u1.Length();
    if(length1 > b2Settings.b2_linearSlop) {
      this.m_u1.x *= 1 / length1;
      this.m_u1.y *= 1 / length1
    }else {
      this.m_u1.SetZero()
    }
    C = this.m_maxLength1 - length1;
    linearError = b2Math.Max(linearError, -C);
    C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
    impulse = -this.m_limitMass1 * C;
    p1X = -impulse * this.m_u1.x;
    p1Y = -impulse * this.m_u1.y;
    bA.m_sweep.c.x += bA.m_invMass * p1X;
    bA.m_sweep.c.y += bA.m_invMass * p1Y;
    bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
    bA.SynchronizeTransform()
  }
  if(this.m_limitState2 == b2Joint.e_atUpperLimit) {
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    p2X = bB.m_sweep.c.x + r2X;
    p2Y = bB.m_sweep.c.y + r2Y;
    this.m_u2.Set(p2X - s2X, p2Y - s2Y);
    length2 = this.m_u2.Length();
    if(length2 > b2Settings.b2_linearSlop) {
      this.m_u2.x *= 1 / length2;
      this.m_u2.y *= 1 / length2
    }else {
      this.m_u2.SetZero()
    }
    C = this.m_maxLength2 - length2;
    linearError = b2Math.Max(linearError, -C);
    C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
    impulse = -this.m_limitMass2 * C;
    p2X = -impulse * this.m_u2.x;
    p2Y = -impulse * this.m_u2.y;
    bB.m_sweep.c.x += bB.m_invMass * p2X;
    bB.m_sweep.c.y += bB.m_invMass * p2Y;
    bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
    bB.SynchronizeTransform()
  }
  return linearError < b2Settings.b2_linearSlop
};
b2PulleyJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2PulleyJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2PulleyJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y)
};
b2PulleyJoint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2PulleyJoint.prototype.GetGroundAnchorA = function() {
  var a = this.m_ground.m_xf.position.Copy();
  a.Add(this.m_groundAnchor1);
  return a
};
b2PulleyJoint.prototype.GetGroundAnchorB = function() {
  var a = this.m_ground.m_xf.position.Copy();
  a.Add(this.m_groundAnchor2);
  return a
};
b2PulleyJoint.prototype.GetLength1 = function() {
  var p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
  var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
  var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
  var dX = p.x - sX;
  var dY = p.y - sY;
  return Math.sqrt(dX * dX + dY * dY)
};
b2PulleyJoint.prototype.GetLength2 = function() {
  var p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
  var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
  var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
  var dX = p.x - sX;
  var dY = p.y - sY;
  return Math.sqrt(dX * dX + dY * dY)
};
b2PulleyJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
b2PulleyJoint.prototype.m_ground = null;
b2PulleyJoint.prototype.m_groundAnchor1 = new b2Vec2;
b2PulleyJoint.prototype.m_groundAnchor2 = new b2Vec2;
b2PulleyJoint.prototype.m_localAnchor1 = new b2Vec2;
b2PulleyJoint.prototype.m_localAnchor2 = new b2Vec2;
b2PulleyJoint.prototype.m_u1 = new b2Vec2;
b2PulleyJoint.prototype.m_u2 = new b2Vec2;
b2PulleyJoint.prototype.m_constant = null;
b2PulleyJoint.prototype.m_ratio = null;
b2PulleyJoint.prototype.m_maxLength1 = null;
b2PulleyJoint.prototype.m_maxLength2 = null;
b2PulleyJoint.prototype.m_pulleyMass = null;
b2PulleyJoint.prototype.m_limitMass1 = null;
b2PulleyJoint.prototype.m_limitMass2 = null;
b2PulleyJoint.prototype.m_impulse = null;
b2PulleyJoint.prototype.m_limitImpulse1 = null;
b2PulleyJoint.prototype.m_limitImpulse2 = null;
b2PulleyJoint.prototype.m_state = 0;
b2PulleyJoint.prototype.m_limitState1 = 0;
b2PulleyJoint.prototype.m_limitState2 = 0;var b2PrismaticJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PrismaticJoint.prototype, b2Joint.prototype);
b2PrismaticJoint.prototype._super = b2Joint.prototype;
b2PrismaticJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_localXAxis1.SetV(def.localAxisA);
  this.m_localYAxis1.x = -this.m_localXAxis1.y;
  this.m_localYAxis1.y = this.m_localXAxis1.x;
  this.m_refAngle = def.referenceAngle;
  this.m_impulse.SetZero();
  this.m_motorMass = 0;
  this.m_motorImpulse = 0;
  this.m_lowerTranslation = def.lowerTranslation;
  this.m_upperTranslation = def.upperTranslation;
  this.m_maxMotorForce = def.maxMotorForce;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = b2Joint.e_inactiveLimit;
  this.m_axis.SetZero();
  this.m_perp.SetZero()
};
b2PrismaticJoint.prototype.__varz = function() {
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_localXAxis1 = new b2Vec2;
  this.m_localYAxis1 = new b2Vec2;
  this.m_axis = new b2Vec2;
  this.m_perp = new b2Vec2;
  this.m_K = new b2Mat33;
  this.m_impulse = new b2Vec3
};
b2PrismaticJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  this.m_localCenterA.SetV(bA.GetLocalCenter());
  this.m_localCenterB.SetV(bB.GetLocalCenter());
  var xf1 = bA.GetTransform();
  var xf2 = bB.GetTransform();
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  this.m_invMassA = bA.m_invMass;
  this.m_invMassB = bB.m_invMass;
  this.m_invIA = bA.m_invI;
  this.m_invIB = bB.m_invI;
  this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
  this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
  this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
  this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
  if(this.m_motorMass > Number.MIN_VALUE) {
    this.m_motorMass = 1 / this.m_motorMass
  }
  this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var m1 = this.m_invMassA;
  var m2 = this.m_invMassB;
  var i1 = this.m_invIA;
  var i2 = this.m_invIB;
  this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
  this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
  this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
  this.m_K.col2.x = this.m_K.col1.y;
  this.m_K.col2.y = i1 + i2;
  this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
  this.m_K.col3.x = this.m_K.col1.z;
  this.m_K.col3.y = this.m_K.col2.z;
  this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
  if(this.m_enableLimit) {
    var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      this.m_limitState = b2Joint.e_equalLimits
    }else {
      if(jointTransition <= this.m_lowerTranslation) {
        if(this.m_limitState != b2Joint.e_atLowerLimit) {
          this.m_limitState = b2Joint.e_atLowerLimit;
          this.m_impulse.z = 0
        }
      }else {
        if(jointTransition >= this.m_upperTranslation) {
          if(this.m_limitState != b2Joint.e_atUpperLimit) {
            this.m_limitState = b2Joint.e_atUpperLimit;
            this.m_impulse.z = 0
          }
        }else {
          this.m_limitState = b2Joint.e_inactiveLimit;
          this.m_impulse.z = 0
        }
      }
    }
  }else {
    this.m_limitState = b2Joint.e_inactiveLimit
  }
  if(this.m_enableMotor == false) {
    this.m_motorImpulse = 0
  }
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;
    var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
    var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
    var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
    var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
    bA.m_linearVelocity.x -= this.m_invMassA * PX;
    bA.m_linearVelocity.y -= this.m_invMassA * PY;
    bA.m_angularVelocity -= this.m_invIA * L1;
    bB.m_linearVelocity.x += this.m_invMassB * PX;
    bB.m_linearVelocity.y += this.m_invMassB * PY;
    bB.m_angularVelocity += this.m_invIB * L2
  }else {
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0
  }
};
b2PrismaticJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var v1 = bA.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var v2 = bB.m_linearVelocity;
  var w2 = bB.m_angularVelocity;
  var PX;
  var PY;
  var L1;
  var L2;
  if(this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
    var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorForce;
    this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;
    PX = impulse * this.m_axis.x;
    PY = impulse * this.m_axis.y;
    L1 = impulse * this.m_a1;
    L2 = impulse * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
  var Cdot1Y = w2 - w1;
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var f1 = this.m_impulse.Copy();
    var df = this.m_K.Solve33(new b2Vec3, -Cdot1X, -Cdot1Y, -Cdot2);
    this.m_impulse.Add(df);
    if(this.m_limitState == b2Joint.e_atLowerLimit) {
      this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0)
    }else {
      if(this.m_limitState == b2Joint.e_atUpperLimit) {
        this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0)
      }
    }
    var bX = -Cdot1X - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
    var bY = -Cdot1Y - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
    var f2r = this.m_K.Solve22(new b2Vec2, bX, bY);
    f2r.x += f1.x;
    f2r.y += f1.y;
    this.m_impulse.x = f2r.x;
    this.m_impulse.y = f2r.y;
    df.x = this.m_impulse.x - f1.x;
    df.y = this.m_impulse.y - f1.y;
    df.z = this.m_impulse.z - f1.z;
    PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
    PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
    L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
    L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }else {
    var df2 = this.m_K.Solve22(new b2Vec2, -Cdot1X, -Cdot1Y);
    this.m_impulse.x += df2.x;
    this.m_impulse.y += df2.y;
    PX = df2.x * this.m_perp.x;
    PY = df2.x * this.m_perp.y;
    L1 = df2.x * this.m_s1 + df2.y;
    L2 = df2.x * this.m_s2 + df2.y;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  bA.m_linearVelocity.SetV(v1);
  bA.m_angularVelocity = w1;
  bB.m_linearVelocity.SetV(v2);
  bB.m_angularVelocity = w2
};
b2PrismaticJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var limitC;
  var oldLimitImpulse;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var c1 = bA.m_sweep.c;
  var a1 = bA.m_sweep.a;
  var c2 = bB.m_sweep.c;
  var a2 = bB.m_sweep.a;
  var tMat;
  var tX;
  var m1;
  var m2;
  var i1;
  var i2;
  var linearError = 0;
  var angularError = 0;
  var active = false;
  var C2 = 0;
  var R1 = b2Mat22.FromAngle(a1);
  var R2 = b2Mat22.FromAngle(a2);
  tMat = R1;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = R2;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = c2.x + r2X - c1.x - r1X;
  var dY = c2.y + r2Y - c1.y - r1Y;
  if(this.m_enableLimit) {
    this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
    this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
    this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
    var translation = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      C2 = b2Math.Clamp(translation, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
      linearError = b2Math.Abs(translation);
      active = true
    }else {
      if(translation <= this.m_lowerTranslation) {
        C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
        linearError = this.m_lowerTranslation - translation;
        active = true
      }else {
        if(translation >= this.m_upperTranslation) {
          C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
          linearError = translation - this.m_upperTranslation;
          active = true
        }
      }
    }
  }
  this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var impulse = new b2Vec3;
  var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
  var C1Y = a2 - a1 - this.m_refAngle;
  linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
  angularError = b2Math.Abs(C1Y);
  if(active) {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
    this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = i1 + i2;
    this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
    this.m_K.col3.x = this.m_K.col1.z;
    this.m_K.col3.y = this.m_K.col2.z;
    this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
    this.m_K.Solve33(impulse, -C1X, -C1Y, -C2)
  }else {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    var k12 = i1 * this.m_s1 + i2 * this.m_s2;
    var k22 = i1 + i2;
    this.m_K.col1.Set(k11, k12, 0);
    this.m_K.col2.Set(k12, k22, 0);
    var impulse1 = this.m_K.Solve22(new b2Vec2, -C1X, -C1Y);
    impulse.x = impulse1.x;
    impulse.y = impulse1.y;
    impulse.z = 0
  }
  var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
  var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
  var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
  var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
  c1.x -= this.m_invMassA * PX;
  c1.y -= this.m_invMassA * PY;
  a1 -= this.m_invIA * L1;
  c2.x += this.m_invMassB * PX;
  c2.y += this.m_invMassB * PY;
  a2 += this.m_invIB * L2;
  bA.m_sweep.a = a1;
  bB.m_sweep.a = a2;
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2PrismaticJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2PrismaticJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2PrismaticJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
};
b2PrismaticJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.y
};
b2PrismaticJoint.prototype.GetJointTranslation = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var p1 = bA.GetWorldPoint(this.m_localAnchor1);
  var p2 = bB.GetWorldPoint(this.m_localAnchor2);
  var dX = p2.x - p1.x;
  var dY = p2.y - p1.y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var translation = axis.x * dX + axis.y * dY;
  return translation
};
b2PrismaticJoint.prototype.GetJointSpeed = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var p1X = bA.m_sweep.c.x + r1X;
  var p1Y = bA.m_sweep.c.y + r1Y;
  var p2X = bB.m_sweep.c.x + r2X;
  var p2Y = bB.m_sweep.c.y + r2Y;
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var v1 = bA.m_linearVelocity;
  var v2 = bB.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var w2 = bB.m_angularVelocity;
  var speed = dX * -w1 * axis.y + dY * w1 * axis.x + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
  return speed
};
b2PrismaticJoint.prototype.IsLimitEnabled = function() {
  return this.m_enableLimit
};
b2PrismaticJoint.prototype.EnableLimit = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableLimit = flag
};
b2PrismaticJoint.prototype.GetLowerLimit = function() {
  return this.m_lowerTranslation
};
b2PrismaticJoint.prototype.GetUpperLimit = function() {
  return this.m_upperTranslation
};
b2PrismaticJoint.prototype.SetLimits = function(lower, upper) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_lowerTranslation = lower;
  this.m_upperTranslation = upper
};
b2PrismaticJoint.prototype.IsMotorEnabled = function() {
  return this.m_enableMotor
};
b2PrismaticJoint.prototype.EnableMotor = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableMotor = flag
};
b2PrismaticJoint.prototype.SetMotorSpeed = function(speed) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_motorSpeed = speed
};
b2PrismaticJoint.prototype.GetMotorSpeed = function() {
  return this.m_motorSpeed
};
b2PrismaticJoint.prototype.SetMaxMotorForce = function(force) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_maxMotorForce = force
};
b2PrismaticJoint.prototype.GetMotorForce = function() {
  return this.m_motorImpulse
};
b2PrismaticJoint.prototype.m_localAnchor1 = new b2Vec2;
b2PrismaticJoint.prototype.m_localAnchor2 = new b2Vec2;
b2PrismaticJoint.prototype.m_localXAxis1 = new b2Vec2;
b2PrismaticJoint.prototype.m_localYAxis1 = new b2Vec2;
b2PrismaticJoint.prototype.m_refAngle = null;
b2PrismaticJoint.prototype.m_axis = new b2Vec2;
b2PrismaticJoint.prototype.m_perp = new b2Vec2;
b2PrismaticJoint.prototype.m_s1 = null;
b2PrismaticJoint.prototype.m_s2 = null;
b2PrismaticJoint.prototype.m_a1 = null;
b2PrismaticJoint.prototype.m_a2 = null;
b2PrismaticJoint.prototype.m_K = new b2Mat33;
b2PrismaticJoint.prototype.m_impulse = new b2Vec3;
b2PrismaticJoint.prototype.m_motorMass = null;
b2PrismaticJoint.prototype.m_motorImpulse = null;
b2PrismaticJoint.prototype.m_lowerTranslation = null;
b2PrismaticJoint.prototype.m_upperTranslation = null;
b2PrismaticJoint.prototype.m_maxMotorForce = null;
b2PrismaticJoint.prototype.m_motorSpeed = null;
b2PrismaticJoint.prototype.m_enableLimit = null;
b2PrismaticJoint.prototype.m_enableMotor = null;
b2PrismaticJoint.prototype.m_limitState = 0;var b2RevoluteJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2RevoluteJoint.prototype, b2Joint.prototype);
b2RevoluteJoint.prototype._super = b2Joint.prototype;
b2RevoluteJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_referenceAngle = def.referenceAngle;
  this.m_impulse.SetZero();
  this.m_motorImpulse = 0;
  this.m_lowerAngle = def.lowerAngle;
  this.m_upperAngle = def.upperAngle;
  this.m_maxMotorTorque = def.maxMotorTorque;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = b2Joint.e_inactiveLimit
};
b2RevoluteJoint.prototype.__varz = function() {
  this.K = new b2Mat22;
  this.K1 = new b2Mat22;
  this.K2 = new b2Mat22;
  this.K3 = new b2Mat22;
  this.impulse3 = new b2Vec3;
  this.impulse2 = new b2Vec2;
  this.reduced = new b2Vec2;
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_impulse = new b2Vec3;
  this.m_mass = new b2Mat33
};
b2RevoluteJoint.tImpulse = new b2Vec2;
b2RevoluteJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  if(this.m_enableMotor || this.m_enableLimit) {
  }
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var m1 = bA.m_invMass;
  var m2 = bB.m_invMass;
  var i1 = bA.m_invI;
  var i2 = bB.m_invI;
  this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
  this.m_mass.col2.x = -r1Y * r1X * i1 - r2Y * r2X * i2;
  this.m_mass.col3.x = -r1Y * i1 - r2Y * i2;
  this.m_mass.col1.y = this.m_mass.col2.x;
  this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
  this.m_mass.col3.y = r1X * i1 + r2X * i2;
  this.m_mass.col1.z = this.m_mass.col3.x;
  this.m_mass.col2.z = this.m_mass.col3.y;
  this.m_mass.col3.z = i1 + i2;
  this.m_motorMass = 1 / (i1 + i2);
  if(this.m_enableMotor == false) {
    this.m_motorImpulse = 0
  }
  if(this.m_enableLimit) {
    var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
    if(b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings.b2_angularSlop) {
      this.m_limitState = b2Joint.e_equalLimits
    }else {
      if(jointAngle <= this.m_lowerAngle) {
        if(this.m_limitState != b2Joint.e_atLowerLimit) {
          this.m_impulse.z = 0
        }
        this.m_limitState = b2Joint.e_atLowerLimit
      }else {
        if(jointAngle >= this.m_upperAngle) {
          if(this.m_limitState != b2Joint.e_atUpperLimit) {
            this.m_impulse.z = 0
          }
          this.m_limitState = b2Joint.e_atUpperLimit
        }else {
          this.m_limitState = b2Joint.e_inactiveLimit;
          this.m_impulse.z = 0
        }
      }
    }
  }else {
    this.m_limitState = b2Joint.e_inactiveLimit
  }
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;
    var PX = this.m_impulse.x;
    var PY = this.m_impulse.y;
    bA.m_linearVelocity.x -= m1 * PX;
    bA.m_linearVelocity.y -= m1 * PY;
    bA.m_angularVelocity -= i1 * (r1X * PY - r1Y * PX + this.m_motorImpulse + this.m_impulse.z);
    bB.m_linearVelocity.x += m2 * PX;
    bB.m_linearVelocity.y += m2 * PY;
    bB.m_angularVelocity += i2 * (r2X * PY - r2Y * PX + this.m_motorImpulse + this.m_impulse.z)
  }else {
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0
  }
};
b2RevoluteJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  var newImpulse;
  var r1X;
  var r1Y;
  var r2X;
  var r2Y;
  var v1 = bA.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var v2 = bB.m_linearVelocity;
  var w2 = bB.m_angularVelocity;
  var m1 = bA.m_invMass;
  var m2 = bB.m_invMass;
  var i1 = bA.m_invI;
  var i2 = bB.m_invI;
  if(this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
    var Cdot = w2 - w1 - this.m_motorSpeed;
    var impulse = this.m_motorMass * -Cdot;
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorTorque;
    this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;
    w1 -= i1 * impulse;
    w2 += i2 * impulse
  }
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    var Cdot1X = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
    var Cdot1Y = v2.y + w2 * r2X - v1.y - w1 * r1X;
    var Cdot2 = w2 - w1;
    this.m_mass.Solve33(this.impulse3, -Cdot1X, -Cdot1Y, -Cdot2);
    if(this.m_limitState == b2Joint.e_equalLimits) {
      this.m_impulse.Add(this.impulse3)
    }else {
      if(this.m_limitState == b2Joint.e_atLowerLimit) {
        newImpulse = this.m_impulse.z + this.impulse3.z;
        if(newImpulse < 0) {
          this.m_mass.Solve22(this.reduced, -Cdot1X, -Cdot1Y);
          this.impulse3.x = this.reduced.x;
          this.impulse3.y = this.reduced.y;
          this.impulse3.z = -this.m_impulse.z;
          this.m_impulse.x += this.reduced.x;
          this.m_impulse.y += this.reduced.y;
          this.m_impulse.z = 0
        }
      }else {
        if(this.m_limitState == b2Joint.e_atUpperLimit) {
          newImpulse = this.m_impulse.z + this.impulse3.z;
          if(newImpulse > 0) {
            this.m_mass.Solve22(this.reduced, -Cdot1X, -Cdot1Y);
            this.impulse3.x = this.reduced.x;
            this.impulse3.y = this.reduced.y;
            this.impulse3.z = -this.m_impulse.z;
            this.m_impulse.x += this.reduced.x;
            this.m_impulse.y += this.reduced.y;
            this.m_impulse.z = 0
          }
        }
      }
    }
    v1.x -= m1 * this.impulse3.x;
    v1.y -= m1 * this.impulse3.y;
    w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
    v2.x += m2 * this.impulse3.x;
    v2.y += m2 * this.impulse3.y;
    w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z)
  }else {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    var CdotX = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
    var CdotY = v2.y + w2 * r2X - v1.y - w1 * r1X;
    this.m_mass.Solve22(this.impulse2, -CdotX, -CdotY);
    this.m_impulse.x += this.impulse2.x;
    this.m_impulse.y += this.impulse2.y;
    v1.x -= m1 * this.impulse2.x;
    v1.y -= m1 * this.impulse2.y;
    w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
    v2.x += m2 * this.impulse2.x;
    v2.y += m2 * this.impulse2.y;
    w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x)
  }
  bA.m_linearVelocity.SetV(v1);
  bA.m_angularVelocity = w1;
  bB.m_linearVelocity.SetV(v2);
  bB.m_angularVelocity = w2
};
b2RevoluteJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var oldLimitImpulse;
  var C;
  var tMat;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var angularError = 0;
  var positionError = 0;
  var tX;
  var impulseX;
  var impulseY;
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
    var limitImpulse = 0;
    if(this.m_limitState == b2Joint.e_equalLimits) {
      C = b2Math.Clamp(angle - this.m_lowerAngle, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
      limitImpulse = -this.m_motorMass * C;
      angularError = b2Math.Abs(C)
    }else {
      if(this.m_limitState == b2Joint.e_atLowerLimit) {
        C = angle - this.m_lowerAngle;
        angularError = -C;
        C = b2Math.Clamp(C + b2Settings.b2_angularSlop, -b2Settings.b2_maxAngularCorrection, 0);
        limitImpulse = -this.m_motorMass * C
      }else {
        if(this.m_limitState == b2Joint.e_atUpperLimit) {
          C = angle - this.m_upperAngle;
          angularError = C;
          C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0, b2Settings.b2_maxAngularCorrection);
          limitImpulse = -this.m_motorMass * C
        }
      }
    }
    bA.m_sweep.a -= bA.m_invI * limitImpulse;
    bB.m_sweep.a += bB.m_invI * limitImpulse;
    bA.SynchronizeTransform();
    bB.SynchronizeTransform()
  }
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  var CLengthSquared = CX * CX + CY * CY;
  var CLength = Math.sqrt(CLengthSquared);
  positionError = CLength;
  var invMass1 = bA.m_invMass;
  var invMass2 = bB.m_invMass;
  var invI1 = bA.m_invI;
  var invI2 = bB.m_invI;
  var k_allowedStretch = 10 * b2Settings.b2_linearSlop;
  if(CLengthSquared > k_allowedStretch * k_allowedStretch) {
    var uX = CX / CLength;
    var uY = CY / CLength;
    var k = invMass1 + invMass2;
    var m = 1 / k;
    impulseX = m * -CX;
    impulseY = m * -CY;
    var k_beta = 0.5;
    bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
    bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
    bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
    bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
    CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
    CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y
  }
  this.K1.col1.x = invMass1 + invMass2;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = invMass1 + invMass2;
  this.K2.col1.x = invI1 * r1Y * r1Y;
  this.K2.col2.x = -invI1 * r1X * r1Y;
  this.K2.col1.y = -invI1 * r1X * r1Y;
  this.K2.col2.y = invI1 * r1X * r1X;
  this.K3.col1.x = invI2 * r2Y * r2Y;
  this.K3.col2.x = -invI2 * r2X * r2Y;
  this.K3.col1.y = -invI2 * r2X * r2Y;
  this.K3.col2.y = invI2 * r2X * r2X;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.AddM(this.K3);
  this.K.Solve(b2RevoluteJoint.tImpulse, -CX, -CY);
  impulseX = b2RevoluteJoint.tImpulse.x;
  impulseY = b2RevoluteJoint.tImpulse.y;
  bA.m_sweep.c.x -= bA.m_invMass * impulseX;
  bA.m_sweep.c.y -= bA.m_invMass * impulseY;
  bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
  bB.m_sweep.c.x += bB.m_invMass * impulseX;
  bB.m_sweep.c.y += bB.m_invMass * impulseY;
  bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2RevoluteJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2RevoluteJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2RevoluteJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
};
b2RevoluteJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.z
};
b2RevoluteJoint.prototype.GetJointAngle = function() {
  return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
};
b2RevoluteJoint.prototype.GetJointSpeed = function() {
  return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
};
b2RevoluteJoint.prototype.IsLimitEnabled = function() {
  return this.m_enableLimit
};
b2RevoluteJoint.prototype.EnableLimit = function(flag) {
  this.m_enableLimit = flag
};
b2RevoluteJoint.prototype.GetLowerLimit = function() {
  return this.m_lowerAngle
};
b2RevoluteJoint.prototype.GetUpperLimit = function() {
  return this.m_upperAngle
};
b2RevoluteJoint.prototype.SetLimits = function(lower, upper) {
  this.m_lowerAngle = lower;
  this.m_upperAngle = upper
};
b2RevoluteJoint.prototype.IsMotorEnabled = function() {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  return this.m_enableMotor
};
b2RevoluteJoint.prototype.EnableMotor = function(flag) {
  this.m_enableMotor = flag
};
b2RevoluteJoint.prototype.SetMotorSpeed = function(speed) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_motorSpeed = speed
};
b2RevoluteJoint.prototype.GetMotorSpeed = function() {
  return this.m_motorSpeed
};
b2RevoluteJoint.prototype.SetMaxMotorTorque = function(torque) {
  this.m_maxMotorTorque = torque
};
b2RevoluteJoint.prototype.GetMotorTorque = function() {
  return this.m_maxMotorTorque
};
b2RevoluteJoint.prototype.K = new b2Mat22;
b2RevoluteJoint.prototype.K1 = new b2Mat22;
b2RevoluteJoint.prototype.K2 = new b2Mat22;
b2RevoluteJoint.prototype.K3 = new b2Mat22;
b2RevoluteJoint.prototype.impulse3 = new b2Vec3;
b2RevoluteJoint.prototype.impulse2 = new b2Vec2;
b2RevoluteJoint.prototype.reduced = new b2Vec2;
b2RevoluteJoint.prototype.m_localAnchor1 = new b2Vec2;
b2RevoluteJoint.prototype.m_localAnchor2 = new b2Vec2;
b2RevoluteJoint.prototype.m_impulse = new b2Vec3;
b2RevoluteJoint.prototype.m_motorImpulse = null;
b2RevoluteJoint.prototype.m_mass = new b2Mat33;
b2RevoluteJoint.prototype.m_motorMass = null;
b2RevoluteJoint.prototype.m_enableMotor = null;
b2RevoluteJoint.prototype.m_maxMotorTorque = null;
b2RevoluteJoint.prototype.m_motorSpeed = null;
b2RevoluteJoint.prototype.m_enableLimit = null;
b2RevoluteJoint.prototype.m_referenceAngle = null;
b2RevoluteJoint.prototype.m_lowerAngle = null;
b2RevoluteJoint.prototype.m_upperAngle = null;
b2RevoluteJoint.prototype.m_limitState = 0;var b2JointDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2JointDef.prototype.__constructor = function() {
  this.type = b2Joint.e_unknownJoint;
  this.userData = null;
  this.bodyA = null;
  this.bodyB = null;
  this.collideConnected = false
};
b2JointDef.prototype.__varz = function() {
};
b2JointDef.prototype.type = 0;
b2JointDef.prototype.userData = null;
b2JointDef.prototype.bodyA = null;
b2JointDef.prototype.bodyB = null;
b2JointDef.prototype.collideConnected = null;var b2LineJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2LineJointDef.prototype, b2JointDef.prototype);
b2LineJointDef.prototype._super = b2JointDef.prototype;
b2LineJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_lineJoint;
  this.localAxisA.Set(1, 0);
  this.enableLimit = false;
  this.lowerTranslation = 0;
  this.upperTranslation = 0;
  this.enableMotor = false;
  this.maxMotorForce = 0;
  this.motorSpeed = 0
};
b2LineJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2;
  this.localAxisA = new b2Vec2
};
b2LineJointDef.prototype.Initialize = function(bA, bB, anchor, axis) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
  this.localAxisA = this.bodyA.GetLocalVector(axis)
};
b2LineJointDef.prototype.localAnchorA = new b2Vec2;
b2LineJointDef.prototype.localAnchorB = new b2Vec2;
b2LineJointDef.prototype.localAxisA = new b2Vec2;
b2LineJointDef.prototype.enableLimit = null;
b2LineJointDef.prototype.lowerTranslation = null;
b2LineJointDef.prototype.upperTranslation = null;
b2LineJointDef.prototype.enableMotor = null;
b2LineJointDef.prototype.maxMotorForce = null;
b2LineJointDef.prototype.motorSpeed = null;var b2DistanceJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2DistanceJoint.prototype, b2Joint.prototype);
b2DistanceJoint.prototype._super = b2Joint.prototype;
b2DistanceJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_length = def.length;
  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;
  this.m_impulse = 0;
  this.m_gamma = 0;
  this.m_bias = 0
};
b2DistanceJoint.prototype.__varz = function() {
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_u = new b2Vec2
};
b2DistanceJoint.prototype.InitVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
  if(length > b2Settings.b2_linearSlop) {
    this.m_u.Multiply(1 / length)
  }else {
    this.m_u.SetZero()
  }
  var cr1u = r1X * this.m_u.y - r1Y * this.m_u.x;
  var cr2u = r2X * this.m_u.y - r2Y * this.m_u.x;
  var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
  this.m_mass = invMass != 0 ? 1 / invMass : 0;
  if(this.m_frequencyHz > 0) {
    var C = length - this.m_length;
    var omega = 2 * Math.PI * this.m_frequencyHz;
    var d = 2 * this.m_mass * this.m_dampingRatio * omega;
    var k = this.m_mass * omega * omega;
    this.m_gamma = step.dt * (d + step.dt * k);
    this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
    this.m_bias = C * step.dt * k * this.m_gamma;
    this.m_mass = invMass + this.m_gamma;
    this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
  }
  if(step.warmStarting) {
    this.m_impulse *= step.dtRatio;
    var PX = this.m_impulse * this.m_u.x;
    var PY = this.m_impulse * this.m_u.y;
    bA.m_linearVelocity.x -= bA.m_invMass * PX;
    bA.m_linearVelocity.y -= bA.m_invMass * PY;
    bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
    bB.m_linearVelocity.x += bB.m_invMass * PX;
    bB.m_linearVelocity.y += bB.m_invMass * PY;
    bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX)
  }else {
    this.m_impulse = 0
  }
};
b2DistanceJoint.prototype.SolveVelocityConstraints = function(step) {
  var tMat;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
  var v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
  var v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
  var v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
  var Cdot = this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y);
  var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
  this.m_impulse += impulse;
  var PX = impulse * this.m_u.x;
  var PY = impulse * this.m_u.y;
  bA.m_linearVelocity.x -= bA.m_invMass * PX;
  bA.m_linearVelocity.y -= bA.m_invMass * PY;
  bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
  bB.m_linearVelocity.x += bB.m_invMass * PX;
  bB.m_linearVelocity.y += bB.m_invMass * PY;
  bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX)
};
b2DistanceJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var tMat;
  if(this.m_frequencyHz > 0) {
    return true
  }
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  var length = Math.sqrt(dX * dX + dY * dY);
  dX /= length;
  dY /= length;
  var C = length - this.m_length;
  C = b2Math.Clamp(C, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
  var impulse = -this.m_mass * C;
  this.m_u.Set(dX, dY);
  var PX = impulse * this.m_u.x;
  var PY = impulse * this.m_u.y;
  bA.m_sweep.c.x -= bA.m_invMass * PX;
  bA.m_sweep.c.y -= bA.m_invMass * PY;
  bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
  bB.m_sweep.c.x += bB.m_invMass * PX;
  bB.m_sweep.c.y += bB.m_invMass * PY;
  bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return b2Math.Abs(C) < b2Settings.b2_linearSlop
};
b2DistanceJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2DistanceJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2DistanceJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y)
};
b2DistanceJoint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2DistanceJoint.prototype.GetLength = function() {
  return this.m_length
};
b2DistanceJoint.prototype.SetLength = function(length) {
  this.m_length = length
};
b2DistanceJoint.prototype.GetFrequency = function() {
  return this.m_frequencyHz
};
b2DistanceJoint.prototype.SetFrequency = function(hz) {
  this.m_frequencyHz = hz
};
b2DistanceJoint.prototype.GetDampingRatio = function() {
  return this.m_dampingRatio
};
b2DistanceJoint.prototype.SetDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio
};
b2DistanceJoint.prototype.m_localAnchor1 = new b2Vec2;
b2DistanceJoint.prototype.m_localAnchor2 = new b2Vec2;
b2DistanceJoint.prototype.m_u = new b2Vec2;
b2DistanceJoint.prototype.m_frequencyHz = null;
b2DistanceJoint.prototype.m_dampingRatio = null;
b2DistanceJoint.prototype.m_gamma = null;
b2DistanceJoint.prototype.m_bias = null;
b2DistanceJoint.prototype.m_impulse = null;
b2DistanceJoint.prototype.m_mass = null;
b2DistanceJoint.prototype.m_length = null;var b2PulleyJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PulleyJointDef.prototype, b2JointDef.prototype);
b2PulleyJointDef.prototype._super = b2JointDef.prototype;
b2PulleyJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_pulleyJoint;
  this.groundAnchorA.Set(-1, 1);
  this.groundAnchorB.Set(1, 1);
  this.localAnchorA.Set(-1, 0);
  this.localAnchorB.Set(1, 0);
  this.lengthA = 0;
  this.maxLengthA = 0;
  this.lengthB = 0;
  this.maxLengthB = 0;
  this.ratio = 1;
  this.collideConnected = true
};
b2PulleyJointDef.prototype.__varz = function() {
  this.groundAnchorA = new b2Vec2;
  this.groundAnchorB = new b2Vec2;
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2PulleyJointDef.prototype.Initialize = function(bA, bB, gaA, gaB, anchorA, anchorB, r) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.groundAnchorA.SetV(gaA);
  this.groundAnchorB.SetV(gaB);
  this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
  var d1X = anchorA.x - gaA.x;
  var d1Y = anchorA.y - gaA.y;
  this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
  var d2X = anchorB.x - gaB.x;
  var d2Y = anchorB.y - gaB.y;
  this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
  this.ratio = r;
  var C = this.lengthA + this.ratio * this.lengthB;
  this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
  this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio
};
b2PulleyJointDef.prototype.groundAnchorA = new b2Vec2;
b2PulleyJointDef.prototype.groundAnchorB = new b2Vec2;
b2PulleyJointDef.prototype.localAnchorA = new b2Vec2;
b2PulleyJointDef.prototype.localAnchorB = new b2Vec2;
b2PulleyJointDef.prototype.lengthA = null;
b2PulleyJointDef.prototype.maxLengthA = null;
b2PulleyJointDef.prototype.lengthB = null;
b2PulleyJointDef.prototype.maxLengthB = null;
b2PulleyJointDef.prototype.ratio = null;var b2DistanceJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2DistanceJointDef.prototype, b2JointDef.prototype);
b2DistanceJointDef.prototype._super = b2JointDef.prototype;
b2DistanceJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_distanceJoint;
  this.length = 1;
  this.frequencyHz = 0;
  this.dampingRatio = 0
};
b2DistanceJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2DistanceJointDef.prototype.Initialize = function(bA, bB, anchorA, anchorB) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
  this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
  var dX = anchorB.x - anchorA.x;
  var dY = anchorB.y - anchorA.y;
  this.length = Math.sqrt(dX * dX + dY * dY);
  this.frequencyHz = 0;
  this.dampingRatio = 0
};
b2DistanceJointDef.prototype.localAnchorA = new b2Vec2;
b2DistanceJointDef.prototype.localAnchorB = new b2Vec2;
b2DistanceJointDef.prototype.length = null;
b2DistanceJointDef.prototype.frequencyHz = null;
b2DistanceJointDef.prototype.dampingRatio = null;var b2FrictionJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2FrictionJointDef.prototype, b2JointDef.prototype);
b2FrictionJointDef.prototype._super = b2JointDef.prototype;
b2FrictionJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_frictionJoint;
  this.maxForce = 0;
  this.maxTorque = 0
};
b2FrictionJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2FrictionJointDef.prototype.Initialize = function(bA, bB, anchor) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
  this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor))
};
b2FrictionJointDef.prototype.localAnchorA = new b2Vec2;
b2FrictionJointDef.prototype.localAnchorB = new b2Vec2;
b2FrictionJointDef.prototype.maxForce = null;
b2FrictionJointDef.prototype.maxTorque = null;var b2WeldJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2WeldJointDef.prototype, b2JointDef.prototype);
b2WeldJointDef.prototype._super = b2JointDef.prototype;
b2WeldJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_weldJoint;
  this.referenceAngle = 0
};
b2WeldJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2WeldJointDef.prototype.Initialize = function(bA, bB, anchor) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
  this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
  this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
};
b2WeldJointDef.prototype.localAnchorA = new b2Vec2;
b2WeldJointDef.prototype.localAnchorB = new b2Vec2;
b2WeldJointDef.prototype.referenceAngle = null;var b2GearJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2GearJointDef.prototype, b2JointDef.prototype);
b2GearJointDef.prototype._super = b2JointDef.prototype;
b2GearJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_gearJoint;
  this.joint1 = null;
  this.joint2 = null;
  this.ratio = 1
};
b2GearJointDef.prototype.__varz = function() {
};
b2GearJointDef.prototype.joint1 = null;
b2GearJointDef.prototype.joint2 = null;
b2GearJointDef.prototype.ratio = null;var b2Color = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Color.prototype.__constructor = function(rr, gg, bb) {
  this._r = parseInt(255 * b2Math.Clamp(rr, 0, 1));
  this._g = parseInt(255 * b2Math.Clamp(gg, 0, 1));
  this._b = parseInt(255 * b2Math.Clamp(bb, 0, 1))
};
b2Color.prototype.__varz = function() {
};
b2Color.prototype.Set = function(rr, gg, bb) {
  this._r = parseInt(255 * b2Math.Clamp(rr, 0, 1));
  this._g = parseInt(255 * b2Math.Clamp(gg, 0, 1));
  this._b = parseInt(255 * b2Math.Clamp(bb, 0, 1))
};
b2Color.prototype.__defineGetter__("r", function() {
  return this._r
});
b2Color.prototype.__defineSetter__("r", function(rr) {
  this._r = parseInt(255 * b2Math.Clamp(rr, 0, 1))
});
b2Color.prototype.__defineGetter__("g", function() {
  return this._g
});
b2Color.prototype.__defineSetter__("g", function(gg) {
  this._g = parseInt(255 * b2Math.Clamp(gg, 0, 1))
});
b2Color.prototype.__defineGetter__("b", function() {
  return this._g
});
b2Color.prototype.__defineSetter__("b", function(bb) {
  this._b = parseInt(255 * b2Math.Clamp(bb, 0, 1))
});
b2Color.prototype.__defineGetter__("color", function() {
  return this._r << 16 | this._g << 8 | this._b
});
b2Color.prototype._r = 0;
b2Color.prototype._g = 0;
b2Color.prototype._b = 0;var b2FrictionJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2FrictionJoint.prototype, b2Joint.prototype);
b2FrictionJoint.prototype._super = b2Joint.prototype;
b2FrictionJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_localAnchorA.SetV(def.localAnchorA);
  this.m_localAnchorB.SetV(def.localAnchorB);
  this.m_linearMass.SetZero();
  this.m_angularMass = 0;
  this.m_linearImpulse.SetZero();
  this.m_angularImpulse = 0;
  this.m_maxForce = def.maxForce;
  this.m_maxTorque = def.maxTorque
};
b2FrictionJoint.prototype.__varz = function() {
  this.m_localAnchorA = new b2Vec2;
  this.m_localAnchorB = new b2Vec2;
  this.m_linearImpulse = new b2Vec2;
  this.m_linearMass = new b2Mat22
};
b2FrictionJoint.prototype.InitVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  var K = new b2Mat22;
  K.col1.x = mA + mB;
  K.col2.x = 0;
  K.col1.y = 0;
  K.col2.y = mA + mB;
  K.col1.x += iA * rAY * rAY;
  K.col2.x += -iA * rAX * rAY;
  K.col1.y += -iA * rAX * rAY;
  K.col2.y += iA * rAX * rAX;
  K.col1.x += iB * rBY * rBY;
  K.col2.x += -iB * rBX * rBY;
  K.col1.y += -iB * rBX * rBY;
  K.col2.y += iB * rBX * rBX;
  K.GetInverse(this.m_linearMass);
  this.m_angularMass = iA + iB;
  if(this.m_angularMass > 0) {
    this.m_angularMass = 1 / this.m_angularMass
  }
  if(step.warmStarting) {
    this.m_linearImpulse.x *= step.dtRatio;
    this.m_linearImpulse.y *= step.dtRatio;
    this.m_angularImpulse *= step.dtRatio;
    var P = this.m_linearImpulse;
    bA.m_linearVelocity.x -= mA * P.x;
    bA.m_linearVelocity.y -= mA * P.y;
    bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
    bB.m_linearVelocity.x += mB * P.x;
    bB.m_linearVelocity.y += mB * P.y;
    bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse)
  }else {
    this.m_linearImpulse.SetZero();
    this.m_angularImpulse = 0
  }
};
b2FrictionJoint.prototype.SolveVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var vA = bA.m_linearVelocity;
  var wA = bA.m_angularVelocity;
  var vB = bB.m_linearVelocity;
  var wB = bB.m_angularVelocity;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var maxImpulse;
  var Cdot = wB - wA;
  var impulse = -this.m_angularMass * Cdot;
  var oldImpulse = this.m_angularImpulse;
  maxImpulse = step.dt * this.m_maxTorque;
  this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
  impulse = this.m_angularImpulse - oldImpulse;
  wA -= iA * impulse;
  wB += iB * impulse;
  var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
  var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
  var impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2(-CdotX, -CdotY));
  var oldImpulseV = this.m_linearImpulse.Copy();
  this.m_linearImpulse.Add(impulseV);
  maxImpulse = step.dt * this.m_maxForce;
  if(this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
    this.m_linearImpulse.Normalize();
    this.m_linearImpulse.Multiply(maxImpulse)
  }
  impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
  vA.x -= mA * impulseV.x;
  vA.y -= mA * impulseV.y;
  wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
  vB.x += mB * impulseV.x;
  vB.y += mB * impulseV.y;
  wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
  bA.m_angularVelocity = wA;
  bB.m_angularVelocity = wB
};
b2FrictionJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  return true
};
b2FrictionJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
};
b2FrictionJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
};
b2FrictionJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y)
};
b2FrictionJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_angularImpulse
};
b2FrictionJoint.prototype.SetMaxForce = function(force) {
  this.m_maxForce = force
};
b2FrictionJoint.prototype.GetMaxForce = function() {
  return this.m_maxForce
};
b2FrictionJoint.prototype.SetMaxTorque = function(torque) {
  this.m_maxTorque = torque
};
b2FrictionJoint.prototype.GetMaxTorque = function() {
  return this.m_maxTorque
};
b2FrictionJoint.prototype.m_localAnchorA = new b2Vec2;
b2FrictionJoint.prototype.m_localAnchorB = new b2Vec2;
b2FrictionJoint.prototype.m_linearImpulse = new b2Vec2;
b2FrictionJoint.prototype.m_angularImpulse = null;
b2FrictionJoint.prototype.m_maxForce = null;
b2FrictionJoint.prototype.m_maxTorque = null;
b2FrictionJoint.prototype.m_linearMass = new b2Mat22;
b2FrictionJoint.prototype.m_angularMass = null;var b2Distance = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Distance.prototype.__constructor = function() {
};
b2Distance.prototype.__varz = function() {
};
b2Distance.Distance = function(output, cache, input) {
  ++b2Distance.b2_gjkCalls;
  var proxyA = input.proxyA;
  var proxyB = input.proxyB;
  var transformA = input.transformA;
  var transformB = input.transformB;
  var simplex = b2Distance.s_simplex;
  simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
  var vertices = simplex.m_vertices;
  var k_maxIters = 20;
  var saveA = b2Distance.s_saveA;
  var saveB = b2Distance.s_saveB;
  var saveCount = 0;
  var closestPoint = simplex.GetClosestPoint();
  var distanceSqr1 = closestPoint.LengthSquared();
  var distanceSqr2 = distanceSqr1;
  var i = 0;
  var p;
  var iter = 0;
  while(iter < k_maxIters) {
    saveCount = simplex.m_count;
    for(i = 0;i < saveCount;i++) {
      saveA[i] = vertices[i].indexA;
      saveB[i] = vertices[i].indexB
    }
    switch(simplex.m_count) {
      case 1:
        break;
      case 2:
        simplex.Solve2();
        break;
      case 3:
        simplex.Solve3();
        break;
      default:
        b2Settings.b2Assert(false)
    }
    if(simplex.m_count == 3) {
      break
    }
    p = simplex.GetClosestPoint();
    distanceSqr2 = p.LengthSquared();
    if(distanceSqr2 > distanceSqr1) {
    }
    distanceSqr1 = distanceSqr2;
    var d = simplex.GetSearchDirection();
    if(d.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) {
      break
    }
    var vertex = vertices[simplex.m_count];
    vertex.indexA = proxyA.GetSupport(b2Math.MulTMV(transformA.R, d.GetNegative()));
    vertex.wA = b2Math.MulX(transformA, proxyA.GetVertex(vertex.indexA));
    vertex.indexB = proxyB.GetSupport(b2Math.MulTMV(transformB.R, d));
    vertex.wB = b2Math.MulX(transformB, proxyB.GetVertex(vertex.indexB));
    vertex.w = b2Math.SubtractVV(vertex.wB, vertex.wA);
    ++iter;
    ++b2Distance.b2_gjkIters;
    var duplicate = false;
    for(i = 0;i < saveCount;i++) {
      if(vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
        duplicate = true;
        break
      }
    }
    if(duplicate) {
      break
    }
    ++simplex.m_count
  }
  b2Distance.b2_gjkMaxIters = b2Math.Max(b2Distance.b2_gjkMaxIters, iter);
  simplex.GetWitnessPoints(output.pointA, output.pointB);
  output.distance = b2Math.SubtractVV(output.pointA, output.pointB).Length();
  output.iterations = iter;
  simplex.WriteCache(cache);
  if(input.useRadii) {
    var rA = proxyA.m_radius;
    var rB = proxyB.m_radius;
    if(output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
      output.distance -= rA + rB;
      var normal = b2Math.SubtractVV(output.pointB, output.pointA);
      normal.Normalize();
      output.pointA.x += rA * normal.x;
      output.pointA.y += rA * normal.y;
      output.pointB.x -= rB * normal.x;
      output.pointB.y -= rB * normal.y
    }else {
      p = new b2Vec2;
      p.x = 0.5 * (output.pointA.x + output.pointB.x);
      p.y = 0.5 * (output.pointA.y + output.pointB.y);
      output.pointA.x = output.pointB.x = p.x;
      output.pointA.y = output.pointB.y = p.y;
      output.distance = 0
    }
  }
};
b2Distance.b2_gjkCalls = 0;
b2Distance.b2_gjkIters = 0;
b2Distance.b2_gjkMaxIters = 0;
b2Distance.s_simplex = new b2Simplex;
b2Distance.s_saveA = new Array(3);
b2Distance.s_saveB = new Array(3);var b2MouseJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2MouseJoint.prototype, b2Joint.prototype);
b2MouseJoint.prototype._super = b2Joint.prototype;
b2MouseJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_target.SetV(def.target);
  var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
  var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
  var tMat = this.m_bodyB.m_xf.R;
  this.m_localAnchor.x = tX * tMat.col1.x + tY * tMat.col1.y;
  this.m_localAnchor.y = tX * tMat.col2.x + tY * tMat.col2.y;
  this.m_maxForce = def.maxForce;
  this.m_impulse.SetZero();
  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;
  this.m_beta = 0;
  this.m_gamma = 0
};
b2MouseJoint.prototype.__varz = function() {
  this.K = new b2Mat22;
  this.K1 = new b2Mat22;
  this.K2 = new b2Mat22;
  this.m_localAnchor = new b2Vec2;
  this.m_target = new b2Vec2;
  this.m_impulse = new b2Vec2;
  this.m_mass = new b2Mat22;
  this.m_C = new b2Vec2
};
b2MouseJoint.prototype.InitVelocityConstraints = function(step) {
  var b = this.m_bodyB;
  var mass = b.GetMass();
  var omega = 2 * Math.PI * this.m_frequencyHz;
  var d = 2 * mass * this.m_dampingRatio * omega;
  var k = mass * omega * omega;
  this.m_gamma = step.dt * (d + step.dt * k);
  this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
  this.m_beta = step.dt * k * this.m_gamma;
  var tMat;
  tMat = b.m_xf.R;
  var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
  var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
  var tX = tMat.col1.x * rX + tMat.col2.x * rY;
  rY = tMat.col1.y * rX + tMat.col2.y * rY;
  rX = tX;
  var invMass = b.m_invMass;
  var invI = b.m_invI;
  this.K1.col1.x = invMass;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = invMass;
  this.K2.col1.x = invI * rY * rY;
  this.K2.col2.x = -invI * rX * rY;
  this.K2.col1.y = -invI * rX * rY;
  this.K2.col2.y = invI * rX * rX;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.col1.x += this.m_gamma;
  this.K.col2.y += this.m_gamma;
  this.K.GetInverse(this.m_mass);
  this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
  this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
  b.m_angularVelocity *= 0.98;
  this.m_impulse.x *= step.dtRatio;
  this.m_impulse.y *= step.dtRatio;
  b.m_linearVelocity.x += invMass * this.m_impulse.x;
  b.m_linearVelocity.y += invMass * this.m_impulse.y;
  b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x)
};
b2MouseJoint.prototype.SolveVelocityConstraints = function(step) {
  var b = this.m_bodyB;
  var tMat;
  var tX;
  var tY;
  tMat = b.m_xf.R;
  var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
  var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
  tX = tMat.col1.x * rX + tMat.col2.x * rY;
  rY = tMat.col1.y * rX + tMat.col2.y * rY;
  rX = tX;
  var CdotX = b.m_linearVelocity.x + -b.m_angularVelocity * rY;
  var CdotY = b.m_linearVelocity.y + b.m_angularVelocity * rX;
  tMat = this.m_mass;
  tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
  tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
  var impulseX = -(tMat.col1.x * tX + tMat.col2.x * tY);
  var impulseY = -(tMat.col1.y * tX + tMat.col2.y * tY);
  var oldImpulseX = this.m_impulse.x;
  var oldImpulseY = this.m_impulse.y;
  this.m_impulse.x += impulseX;
  this.m_impulse.y += impulseY;
  var maxImpulse = step.dt * this.m_maxForce;
  if(this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
    this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length())
  }
  impulseX = this.m_impulse.x - oldImpulseX;
  impulseY = this.m_impulse.y - oldImpulseY;
  b.m_linearVelocity.x += b.m_invMass * impulseX;
  b.m_linearVelocity.y += b.m_invMass * impulseY;
  b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX)
};
b2MouseJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  return true
};
b2MouseJoint.prototype.GetAnchorA = function() {
  return this.m_target
};
b2MouseJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
};
b2MouseJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
};
b2MouseJoint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2MouseJoint.prototype.GetTarget = function() {
  return this.m_target
};
b2MouseJoint.prototype.SetTarget = function(target) {
  if(this.m_bodyB.IsAwake() == false) {
    this.m_bodyB.SetAwake(true)
  }
  this.m_target = target
};
b2MouseJoint.prototype.GetMaxForce = function() {
  return this.m_maxForce
};
b2MouseJoint.prototype.SetMaxForce = function(maxForce) {
  this.m_maxForce = maxForce
};
b2MouseJoint.prototype.GetFrequency = function() {
  return this.m_frequencyHz
};
b2MouseJoint.prototype.SetFrequency = function(hz) {
  this.m_frequencyHz = hz
};
b2MouseJoint.prototype.GetDampingRatio = function() {
  return this.m_dampingRatio
};
b2MouseJoint.prototype.SetDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio
};
b2MouseJoint.prototype.K = new b2Mat22;
b2MouseJoint.prototype.K1 = new b2Mat22;
b2MouseJoint.prototype.K2 = new b2Mat22;
b2MouseJoint.prototype.m_localAnchor = new b2Vec2;
b2MouseJoint.prototype.m_target = new b2Vec2;
b2MouseJoint.prototype.m_impulse = new b2Vec2;
b2MouseJoint.prototype.m_mass = new b2Mat22;
b2MouseJoint.prototype.m_C = new b2Vec2;
b2MouseJoint.prototype.m_maxForce = null;
b2MouseJoint.prototype.m_frequencyHz = null;
b2MouseJoint.prototype.m_dampingRatio = null;
b2MouseJoint.prototype.m_beta = null;
b2MouseJoint.prototype.m_gamma = null;var b2PrismaticJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PrismaticJointDef.prototype, b2JointDef.prototype);
b2PrismaticJointDef.prototype._super = b2JointDef.prototype;
b2PrismaticJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_prismaticJoint;
  this.localAxisA.Set(1, 0);
  this.referenceAngle = 0;
  this.enableLimit = false;
  this.lowerTranslation = 0;
  this.upperTranslation = 0;
  this.enableMotor = false;
  this.maxMotorForce = 0;
  this.motorSpeed = 0
};
b2PrismaticJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2;
  this.localAxisA = new b2Vec2
};
b2PrismaticJointDef.prototype.Initialize = function(bA, bB, anchor, axis) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
  this.localAxisA = this.bodyA.GetLocalVector(axis);
  this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
};
b2PrismaticJointDef.prototype.localAnchorA = new b2Vec2;
b2PrismaticJointDef.prototype.localAnchorB = new b2Vec2;
b2PrismaticJointDef.prototype.localAxisA = new b2Vec2;
b2PrismaticJointDef.prototype.referenceAngle = null;
b2PrismaticJointDef.prototype.enableLimit = null;
b2PrismaticJointDef.prototype.lowerTranslation = null;
b2PrismaticJointDef.prototype.upperTranslation = null;
b2PrismaticJointDef.prototype.enableMotor = null;
b2PrismaticJointDef.prototype.maxMotorForce = null;
b2PrismaticJointDef.prototype.motorSpeed = null;var b2TimeOfImpact = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2TimeOfImpact.prototype.__constructor = function() {
};
b2TimeOfImpact.prototype.__varz = function() {
};
b2TimeOfImpact.TimeOfImpact = function(input) {
  ++b2TimeOfImpact.b2_toiCalls;
  var proxyA = input.proxyA;
  var proxyB = input.proxyB;
  var sweepA = input.sweepA;
  var sweepB = input.sweepB;
  b2Settings.b2Assert(sweepA.t0 == sweepB.t0);
  b2Settings.b2Assert(1 - sweepA.t0 > Number.MIN_VALUE);
  var radius = proxyA.m_radius + proxyB.m_radius;
  var tolerance = input.tolerance;
  var alpha = 0;
  var k_maxIterations = 1E3;
  var iter = 0;
  var target = 0;
  b2TimeOfImpact.s_cache.count = 0;
  b2TimeOfImpact.s_distanceInput.useRadii = false;
  for(;;) {
    sweepA.GetTransform(b2TimeOfImpact.s_xfA, alpha);
    sweepB.GetTransform(b2TimeOfImpact.s_xfB, alpha);
    b2TimeOfImpact.s_distanceInput.proxyA = proxyA;
    b2TimeOfImpact.s_distanceInput.proxyB = proxyB;
    b2TimeOfImpact.s_distanceInput.transformA = b2TimeOfImpact.s_xfA;
    b2TimeOfImpact.s_distanceInput.transformB = b2TimeOfImpact.s_xfB;
    b2Distance.Distance(b2TimeOfImpact.s_distanceOutput, b2TimeOfImpact.s_cache, b2TimeOfImpact.s_distanceInput);
    if(b2TimeOfImpact.s_distanceOutput.distance <= 0) {
      alpha = 1;
      break
    }
    b2TimeOfImpact.s_fcn.Initialize(b2TimeOfImpact.s_cache, proxyA, b2TimeOfImpact.s_xfA, proxyB, b2TimeOfImpact.s_xfB);
    var separation = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
    if(separation <= 0) {
      alpha = 1;
      break
    }
    if(iter == 0) {
      if(separation > radius) {
        target = b2Math.Max(radius - tolerance, 0.75 * radius)
      }else {
        target = b2Math.Max(separation - tolerance, 0.02 * radius)
      }
    }
    if(separation - target < 0.5 * tolerance) {
      if(iter == 0) {
        alpha = 1;
        break
      }
      break
    }
    var newAlpha = alpha;
    var x1 = alpha;
    var x2 = 1;
    var f1 = separation;
    sweepA.GetTransform(b2TimeOfImpact.s_xfA, x2);
    sweepB.GetTransform(b2TimeOfImpact.s_xfB, x2);
    var f2 = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
    if(f2 >= target) {
      alpha = 1;
      break
    }
    var rootIterCount = 0;
    for(;;) {
      var x;
      if(rootIterCount & 1) {
        x = x1 + (target - f1) * (x2 - x1) / (f2 - f1)
      }else {
        x = 0.5 * (x1 + x2)
      }
      sweepA.GetTransform(b2TimeOfImpact.s_xfA, x);
      sweepB.GetTransform(b2TimeOfImpact.s_xfB, x);
      var f = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
      if(b2Math.Abs(f - target) < 0.025 * tolerance) {
        newAlpha = x;
        break
      }
      if(f > target) {
        x1 = x;
        f1 = f
      }else {
        x2 = x;
        f2 = f
      }
      ++rootIterCount;
      ++b2TimeOfImpact.b2_toiRootIters;
      if(rootIterCount == 50) {
        break
      }
    }
    b2TimeOfImpact.b2_toiMaxRootIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxRootIters, rootIterCount);
    if(newAlpha < (1 + 100 * Number.MIN_VALUE) * alpha) {
      break
    }
    alpha = newAlpha;
    iter++;
    ++b2TimeOfImpact.b2_toiIters;
    if(iter == k_maxIterations) {
      break
    }
  }
  b2TimeOfImpact.b2_toiMaxIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxIters, iter);
  return alpha
};
b2TimeOfImpact.b2_toiCalls = 0;
b2TimeOfImpact.b2_toiIters = 0;
b2TimeOfImpact.b2_toiMaxIters = 0;
b2TimeOfImpact.b2_toiRootIters = 0;
b2TimeOfImpact.b2_toiMaxRootIters = 0;
b2TimeOfImpact.s_cache = new b2SimplexCache;
b2TimeOfImpact.s_distanceInput = new b2DistanceInput;
b2TimeOfImpact.s_xfA = new b2Transform;
b2TimeOfImpact.s_xfB = new b2Transform;
b2TimeOfImpact.s_fcn = new b2SeparationFunction;
b2TimeOfImpact.s_distanceOutput = new b2DistanceOutput;var b2GearJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2GearJoint.prototype, b2Joint.prototype);
b2GearJoint.prototype._super = b2Joint.prototype;
b2GearJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var type1 = def.joint1.m_type;
  var type2 = def.joint2.m_type;
  this.m_revolute1 = null;
  this.m_prismatic1 = null;
  this.m_revolute2 = null;
  this.m_prismatic2 = null;
  var coordinate1;
  var coordinate2;
  this.m_ground1 = def.joint1.GetBodyA();
  this.m_bodyA = def.joint1.GetBodyB();
  if(type1 == b2Joint.e_revoluteJoint) {
    this.m_revolute1 = def.joint1;
    this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
    this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
    coordinate1 = this.m_revolute1.GetJointAngle()
  }else {
    this.m_prismatic1 = def.joint1;
    this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
    this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
    coordinate1 = this.m_prismatic1.GetJointTranslation()
  }
  this.m_ground2 = def.joint2.GetBodyA();
  this.m_bodyB = def.joint2.GetBodyB();
  if(type2 == b2Joint.e_revoluteJoint) {
    this.m_revolute2 = def.joint2;
    this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
    this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
    coordinate2 = this.m_revolute2.GetJointAngle()
  }else {
    this.m_prismatic2 = def.joint2;
    this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
    this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
    coordinate2 = this.m_prismatic2.GetJointTranslation()
  }
  this.m_ratio = def.ratio;
  this.m_constant = coordinate1 + this.m_ratio * coordinate2;
  this.m_impulse = 0
};
b2GearJoint.prototype.__varz = function() {
  this.m_groundAnchor1 = new b2Vec2;
  this.m_groundAnchor2 = new b2Vec2;
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_J = new b2Jacobian
};
b2GearJoint.prototype.InitVelocityConstraints = function(step) {
  var g1 = this.m_ground1;
  var g2 = this.m_ground2;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var ugX;
  var ugY;
  var rX;
  var rY;
  var tMat;
  var tVec;
  var crug;
  var tX;
  var K = 0;
  this.m_J.SetZero();
  if(this.m_revolute1) {
    this.m_J.angularA = -1;
    K += bA.m_invI
  }else {
    tMat = g1.m_xf.R;
    tVec = this.m_prismatic1.m_localXAxis1;
    ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
    ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
    tMat = bA.m_xf.R;
    rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * rX + tMat.col2.x * rY;
    rY = tMat.col1.y * rX + tMat.col2.y * rY;
    rX = tX;
    crug = rX * ugY - rY * ugX;
    this.m_J.linearA.Set(-ugX, -ugY);
    this.m_J.angularA = -crug;
    K += bA.m_invMass + bA.m_invI * crug * crug
  }
  if(this.m_revolute2) {
    this.m_J.angularB = -this.m_ratio;
    K += this.m_ratio * this.m_ratio * bB.m_invI
  }else {
    tMat = g2.m_xf.R;
    tVec = this.m_prismatic2.m_localXAxis1;
    ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
    ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
    tMat = bB.m_xf.R;
    rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * rX + tMat.col2.x * rY;
    rY = tMat.col1.y * rX + tMat.col2.y * rY;
    rX = tX;
    crug = rX * ugY - rY * ugX;
    this.m_J.linearB.Set(-this.m_ratio * ugX, -this.m_ratio * ugY);
    this.m_J.angularB = -this.m_ratio * crug;
    K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug)
  }
  this.m_mass = K > 0 ? 1 / K : 0;
  if(step.warmStarting) {
    bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
    bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
    bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
    bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
    bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
    bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB
  }else {
    this.m_impulse = 0
  }
};
b2GearJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
  var impulse = -this.m_mass * Cdot;
  this.m_impulse += impulse;
  bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
  bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
  bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
  bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
  bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
  bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB
};
b2GearJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var linearError = 0;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var coordinate1;
  var coordinate2;
  if(this.m_revolute1) {
    coordinate1 = this.m_revolute1.GetJointAngle()
  }else {
    coordinate1 = this.m_prismatic1.GetJointTranslation()
  }
  if(this.m_revolute2) {
    coordinate2 = this.m_revolute2.GetJointAngle()
  }else {
    coordinate2 = this.m_prismatic2.GetJointTranslation()
  }
  var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
  var impulse = -this.m_mass * C;
  bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
  bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
  bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
  bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
  bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
  bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return linearError < b2Settings.b2_linearSlop
};
b2GearJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2GearJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2GearJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y)
};
b2GearJoint.prototype.GetReactionTorque = function(inv_dt) {
  var tMat = this.m_bodyB.m_xf.R;
  var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
  var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
  var tX = tMat.col1.x * rX + tMat.col2.x * rY;
  rY = tMat.col1.y * rX + tMat.col2.y * rY;
  rX = tX;
  var PX = this.m_impulse * this.m_J.linearB.x;
  var PY = this.m_impulse * this.m_J.linearB.y;
  return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX)
};
b2GearJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
b2GearJoint.prototype.SetRatio = function(ratio) {
  this.m_ratio = ratio
};
b2GearJoint.prototype.m_ground1 = null;
b2GearJoint.prototype.m_ground2 = null;
b2GearJoint.prototype.m_revolute1 = null;
b2GearJoint.prototype.m_prismatic1 = null;
b2GearJoint.prototype.m_revolute2 = null;
b2GearJoint.prototype.m_prismatic2 = null;
b2GearJoint.prototype.m_groundAnchor1 = new b2Vec2;
b2GearJoint.prototype.m_groundAnchor2 = new b2Vec2;
b2GearJoint.prototype.m_localAnchor1 = new b2Vec2;
b2GearJoint.prototype.m_localAnchor2 = new b2Vec2;
b2GearJoint.prototype.m_J = new b2Jacobian;
b2GearJoint.prototype.m_constant = null;
b2GearJoint.prototype.m_ratio = null;
b2GearJoint.prototype.m_mass = null;
b2GearJoint.prototype.m_impulse = null;var b2TOIInput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2TOIInput.prototype.__constructor = function() {
};
b2TOIInput.prototype.__varz = function() {
  this.proxyA = new b2DistanceProxy;
  this.proxyB = new b2DistanceProxy;
  this.sweepA = new b2Sweep;
  this.sweepB = new b2Sweep
};
b2TOIInput.prototype.proxyA = new b2DistanceProxy;
b2TOIInput.prototype.proxyB = new b2DistanceProxy;
b2TOIInput.prototype.sweepA = new b2Sweep;
b2TOIInput.prototype.sweepB = new b2Sweep;
b2TOIInput.prototype.tolerance = null;var b2RevoluteJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2RevoluteJointDef.prototype, b2JointDef.prototype);
b2RevoluteJointDef.prototype._super = b2JointDef.prototype;
b2RevoluteJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_revoluteJoint;
  this.localAnchorA.Set(0, 0);
  this.localAnchorB.Set(0, 0);
  this.referenceAngle = 0;
  this.lowerAngle = 0;
  this.upperAngle = 0;
  this.maxMotorTorque = 0;
  this.motorSpeed = 0;
  this.enableLimit = false;
  this.enableMotor = false
};
b2RevoluteJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2RevoluteJointDef.prototype.Initialize = function(bA, bB, anchor) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
  this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
};
b2RevoluteJointDef.prototype.localAnchorA = new b2Vec2;
b2RevoluteJointDef.prototype.localAnchorB = new b2Vec2;
b2RevoluteJointDef.prototype.referenceAngle = null;
b2RevoluteJointDef.prototype.enableLimit = null;
b2RevoluteJointDef.prototype.lowerAngle = null;
b2RevoluteJointDef.prototype.upperAngle = null;
b2RevoluteJointDef.prototype.enableMotor = null;
b2RevoluteJointDef.prototype.motorSpeed = null;
b2RevoluteJointDef.prototype.maxMotorTorque = null;var b2MouseJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2MouseJointDef.prototype, b2JointDef.prototype);
b2MouseJointDef.prototype._super = b2JointDef.prototype;
b2MouseJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_mouseJoint;
  this.maxForce = 0;
  this.frequencyHz = 5;
  this.dampingRatio = 0.7
};
b2MouseJointDef.prototype.__varz = function() {
  this.target = new b2Vec2
};
b2MouseJointDef.prototype.target = new b2Vec2;
b2MouseJointDef.prototype.maxForce = null;
b2MouseJointDef.prototype.frequencyHz = null;
b2MouseJointDef.prototype.dampingRatio = null;var b2Contact = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Contact.prototype.__constructor = function() {
};
b2Contact.prototype.__varz = function() {
  this.m_nodeA = new b2ContactEdge;
  this.m_nodeB = new b2ContactEdge;
  this.m_manifold = new b2Manifold;
  this.m_oldManifold = new b2Manifold
};
b2Contact.s_input = new b2TOIInput;
b2Contact.e_sensorFlag = 1;
b2Contact.e_continuousFlag = 2;
b2Contact.e_islandFlag = 4;
b2Contact.e_toiFlag = 8;
b2Contact.e_touchingFlag = 16;
b2Contact.e_enabledFlag = 32;
b2Contact.e_filterFlag = 64;
b2Contact.prototype.Reset = function(fixtureA, fixtureB) {
  this.m_flags = b2Contact.e_enabledFlag;
  if(!fixtureA || !fixtureB) {
    this.m_fixtureA = null;
    this.m_fixtureB = null;
    return
  }
  if(fixtureA.IsSensor() || fixtureB.IsSensor()) {
    this.m_flags |= b2Contact.e_sensorFlag
  }
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if(bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
    this.m_flags |= b2Contact.e_continuousFlag
  }
  this.m_fixtureA = fixtureA;
  this.m_fixtureB = fixtureB;
  this.m_manifold.m_pointCount = 0;
  this.m_prev = null;
  this.m_next = null;
  this.m_nodeA.contact = null;
  this.m_nodeA.prev = null;
  this.m_nodeA.next = null;
  this.m_nodeA.other = null;
  this.m_nodeB.contact = null;
  this.m_nodeB.prev = null;
  this.m_nodeB.next = null;
  this.m_nodeB.other = null
};
b2Contact.prototype.Update = function(listener) {
  var tManifold = this.m_oldManifold;
  this.m_oldManifold = this.m_manifold;
  this.m_manifold = tManifold;
  this.m_flags |= b2Contact.e_enabledFlag;
  var touching = false;
  var wasTouching = (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
  var bodyA = this.m_fixtureA.m_body;
  var bodyB = this.m_fixtureB.m_body;
  var aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
  if(this.m_flags & b2Contact.e_sensorFlag) {
    if(aabbOverlap) {
      var shapeA = this.m_fixtureA.GetShape();
      var shapeB = this.m_fixtureB.GetShape();
      var xfA = bodyA.GetTransform();
      var xfB = bodyB.GetTransform();
      touching = b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB)
    }
    this.m_manifold.m_pointCount = 0
  }else {
    if(bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
      this.m_flags |= b2Contact.e_continuousFlag
    }else {
      this.m_flags &= ~b2Contact.e_continuousFlag
    }
    if(aabbOverlap) {
      this.Evaluate();
      touching = this.m_manifold.m_pointCount > 0;
      for(var i = 0;i < this.m_manifold.m_pointCount;++i) {
        var mp2 = this.m_manifold.m_points[i];
        mp2.m_normalImpulse = 0;
        mp2.m_tangentImpulse = 0;
        var id2 = mp2.m_id;
        for(var j = 0;j < this.m_oldManifold.m_pointCount;++j) {
          var mp1 = this.m_oldManifold.m_points[j];
          if(mp1.m_id.key == id2.key) {
            mp2.m_normalImpulse = mp1.m_normalImpulse;
            mp2.m_tangentImpulse = mp1.m_tangentImpulse;
            break
          }
        }
      }
    }else {
      this.m_manifold.m_pointCount = 0
    }
    if(touching != wasTouching) {
      bodyA.SetAwake(true);
      bodyB.SetAwake(true)
    }
  }
  if(touching) {
    this.m_flags |= b2Contact.e_touchingFlag
  }else {
    this.m_flags &= ~b2Contact.e_touchingFlag
  }
  if(wasTouching == false && touching == true) {
    listener.BeginContact(this)
  }
  if(wasTouching == true && touching == false) {
    listener.EndContact(this)
  }
  if((this.m_flags & b2Contact.e_sensorFlag) == 0) {
    listener.PreSolve(this, this.m_oldManifold)
  }
};
b2Contact.prototype.Evaluate = function() {
};
b2Contact.prototype.ComputeTOI = function(sweepA, sweepB) {
  b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
  b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
  b2Contact.s_input.sweepA = sweepA;
  b2Contact.s_input.sweepB = sweepB;
  b2Contact.s_input.tolerance = b2Settings.b2_linearSlop;
  return b2TimeOfImpact.TimeOfImpact(b2Contact.s_input)
};
b2Contact.prototype.GetManifold = function() {
  return this.m_manifold
};
b2Contact.prototype.GetWorldManifold = function(worldManifold) {
  var bodyA = this.m_fixtureA.GetBody();
  var bodyB = this.m_fixtureB.GetBody();
  var shapeA = this.m_fixtureA.GetShape();
  var shapeB = this.m_fixtureB.GetShape();
  worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius)
};
b2Contact.prototype.IsTouching = function() {
  return(this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag
};
b2Contact.prototype.IsContinuous = function() {
  return(this.m_flags & b2Contact.e_continuousFlag) == b2Contact.e_continuousFlag
};
b2Contact.prototype.SetSensor = function(sensor) {
  if(sensor) {
    this.m_flags |= b2Contact.e_sensorFlag
  }else {
    this.m_flags &= ~b2Contact.e_sensorFlag
  }
};
b2Contact.prototype.IsSensor = function() {
  return(this.m_flags & b2Contact.e_sensorFlag) == b2Contact.e_sensorFlag
};
b2Contact.prototype.SetEnabled = function(flag) {
  if(flag) {
    this.m_flags |= b2Contact.e_enabledFlag
  }else {
    this.m_flags &= ~b2Contact.e_enabledFlag
  }
};
b2Contact.prototype.IsEnabled = function() {
  return(this.m_flags & b2Contact.e_enabledFlag) == b2Contact.e_enabledFlag
};
b2Contact.prototype.GetNext = function() {
  return this.m_next
};
b2Contact.prototype.GetFixtureA = function() {
  return this.m_fixtureA
};
b2Contact.prototype.GetFixtureB = function() {
  return this.m_fixtureB
};
b2Contact.prototype.FlagForFiltering = function() {
  this.m_flags |= b2Contact.e_filterFlag
};
b2Contact.prototype.m_flags = 0;
b2Contact.prototype.m_prev = null;
b2Contact.prototype.m_next = null;
b2Contact.prototype.m_nodeA = new b2ContactEdge;
b2Contact.prototype.m_nodeB = new b2ContactEdge;
b2Contact.prototype.m_fixtureA = null;
b2Contact.prototype.m_fixtureB = null;
b2Contact.prototype.m_manifold = new b2Manifold;
b2Contact.prototype.m_oldManifold = new b2Manifold;
b2Contact.prototype.m_toi = null;var b2ContactConstraint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactConstraint.prototype.__constructor = function() {
  this.points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.points[i] = new b2ContactConstraintPoint
  }
};
b2ContactConstraint.prototype.__varz = function() {
  this.localPlaneNormal = new b2Vec2;
  this.localPoint = new b2Vec2;
  this.normal = new b2Vec2;
  this.normalMass = new b2Mat22;
  this.K = new b2Mat22
};
b2ContactConstraint.prototype.points = null;
b2ContactConstraint.prototype.localPlaneNormal = new b2Vec2;
b2ContactConstraint.prototype.localPoint = new b2Vec2;
b2ContactConstraint.prototype.normal = new b2Vec2;
b2ContactConstraint.prototype.normalMass = new b2Mat22;
b2ContactConstraint.prototype.K = new b2Mat22;
b2ContactConstraint.prototype.bodyA = null;
b2ContactConstraint.prototype.bodyB = null;
b2ContactConstraint.prototype.type = 0;
b2ContactConstraint.prototype.radius = null;
b2ContactConstraint.prototype.friction = null;
b2ContactConstraint.prototype.restitution = null;
b2ContactConstraint.prototype.pointCount = 0;
b2ContactConstraint.prototype.manifold = null;var b2ContactResult = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactResult.prototype.__constructor = function() {
};
b2ContactResult.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.normal = new b2Vec2;
  this.id = new b2ContactID
};
b2ContactResult.prototype.shape1 = null;
b2ContactResult.prototype.shape2 = null;
b2ContactResult.prototype.position = new b2Vec2;
b2ContactResult.prototype.normal = new b2Vec2;
b2ContactResult.prototype.normalImpulse = null;
b2ContactResult.prototype.tangentImpulse = null;
b2ContactResult.prototype.id = new b2ContactID;var b2PolygonContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolygonContact.prototype, b2Contact.prototype);
b2PolygonContact.prototype._super = b2Contact.prototype;
b2PolygonContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2PolygonContact.prototype.__varz = function() {
};
b2PolygonContact.Create = function(allocator) {
  return new b2PolygonContact
};
b2PolygonContact.Destroy = function(contact, allocator) {
};
b2PolygonContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  b2Collision.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2PolygonContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB])
};var ClipVertex = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
ClipVertex.prototype.__constructor = function() {
};
ClipVertex.prototype.__varz = function() {
  this.v = new b2Vec2;
  this.id = new b2ContactID
};
ClipVertex.prototype.Set = function(other) {
  this.v.SetV(other.v);
  this.id.Set(other.id)
};
ClipVertex.prototype.v = new b2Vec2;
ClipVertex.prototype.id = new b2ContactID;var b2ContactFilter = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactFilter.prototype.__constructor = function() {
};
b2ContactFilter.prototype.__varz = function() {
};
b2ContactFilter.b2_defaultFilter = new b2ContactFilter;
b2ContactFilter.prototype.ShouldCollide = function(fixtureA, fixtureB) {
  var filter1 = fixtureA.GetFilterData();
  var filter2 = fixtureB.GetFilterData();
  if(filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) {
    return filter1.groupIndex > 0
  }
  var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
  return collide
};
b2ContactFilter.prototype.RayCollide = function(userData, fixture) {
  if(!userData) {
    return true
  }
  return this.ShouldCollide(userData, fixture)
};var b2NullContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2NullContact.prototype, b2Contact.prototype);
b2NullContact.prototype._super = b2Contact.prototype;
b2NullContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2NullContact.prototype.__varz = function() {
};
b2NullContact.prototype.Evaluate = function() {
};var b2ContactListener = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactListener.prototype.__constructor = function() {
};
b2ContactListener.prototype.__varz = function() {
};
b2ContactListener.b2_defaultListener = new b2ContactListener;
b2ContactListener.prototype.BeginContact = function(contact) {
};
b2ContactListener.prototype.EndContact = function(contact) {
};
b2ContactListener.prototype.PreSolve = function(contact, oldManifold) {
};
b2ContactListener.prototype.PostSolve = function(contact, impulse) {
};var b2Island = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Island.prototype.__constructor = function() {
  this.m_bodies = new Array;
  this.m_contacts = new Array;
  this.m_joints = new Array
};
b2Island.prototype.__varz = function() {
};
b2Island.s_impulse = new b2ContactImpulse;
b2Island.prototype.Initialize = function(bodyCapacity, contactCapacity, jointCapacity, allocator, listener, contactSolver) {
  var i = 0;
  this.m_bodyCapacity = bodyCapacity;
  this.m_contactCapacity = contactCapacity;
  this.m_jointCapacity = jointCapacity;
  this.m_bodyCount = 0;
  this.m_contactCount = 0;
  this.m_jointCount = 0;
  this.m_allocator = allocator;
  this.m_listener = listener;
  this.m_contactSolver = contactSolver;
  for(i = this.m_bodies.length;i < bodyCapacity;i++) {
    this.m_bodies[i] = null
  }
  for(i = this.m_contacts.length;i < contactCapacity;i++) {
    this.m_contacts[i] = null
  }
  for(i = this.m_joints.length;i < jointCapacity;i++) {
    this.m_joints[i] = null
  }
};
b2Island.prototype.Clear = function() {
  this.m_bodyCount = 0;
  this.m_contactCount = 0;
  this.m_jointCount = 0
};
b2Island.prototype.Solve = function(step, gravity, allowSleep) {
  var i = 0;
  var j = 0;
  var b;
  var joint;
  for(i = 0;i < this.m_bodyCount;++i) {
    b = this.m_bodies[i];
    if(b.GetType() != b2Body.b2_dynamicBody) {
      continue
    }
    b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
    b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
    b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
    b.m_linearVelocity.Multiply(b2Math.Clamp(1 - step.dt * b.m_linearDamping, 0, 1));
    b.m_angularVelocity *= b2Math.Clamp(1 - step.dt * b.m_angularDamping, 0, 1)
  }
  this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount, this.m_allocator);
  var contactSolver = this.m_contactSolver;
  contactSolver.InitVelocityConstraints(step);
  for(i = 0;i < this.m_jointCount;++i) {
    joint = this.m_joints[i];
    joint.InitVelocityConstraints(step)
  }
  for(i = 0;i < step.velocityIterations;++i) {
    for(j = 0;j < this.m_jointCount;++j) {
      joint = this.m_joints[j];
      joint.SolveVelocityConstraints(step)
    }
    contactSolver.SolveVelocityConstraints()
  }
  for(i = 0;i < this.m_jointCount;++i) {
    joint = this.m_joints[i];
    joint.FinalizeVelocityConstraints()
  }
  contactSolver.FinalizeVelocityConstraints();
  for(i = 0;i < this.m_bodyCount;++i) {
    b = this.m_bodies[i];
    if(b.GetType() == b2Body.b2_staticBody) {
      continue
    }
    var translationX = step.dt * b.m_linearVelocity.x;
    var translationY = step.dt * b.m_linearVelocity.y;
    if(translationX * translationX + translationY * translationY > b2Settings.b2_maxTranslationSquared) {
      b.m_linearVelocity.Normalize();
      b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
      b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt
    }
    var rotation = step.dt * b.m_angularVelocity;
    if(rotation * rotation > b2Settings.b2_maxRotationSquared) {
      if(b.m_angularVelocity < 0) {
        b.m_angularVelocity = -b2Settings.b2_maxRotation * step.inv_dt
      }else {
        b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt
      }
    }
    b.m_sweep.c0.SetV(b.m_sweep.c);
    b.m_sweep.a0 = b.m_sweep.a;
    b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
    b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
    b.m_sweep.a += step.dt * b.m_angularVelocity;
    b.SynchronizeTransform()
  }
  for(i = 0;i < step.positionIterations;++i) {
    var contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
    var jointsOkay = true;
    for(j = 0;j < this.m_jointCount;++j) {
      joint = this.m_joints[j];
      var jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
      jointsOkay = jointsOkay && jointOkay
    }
    if(contactsOkay && jointsOkay) {
      break
    }
  }
  this.Report(contactSolver.m_constraints);
  if(allowSleep) {
    var minSleepTime = Number.MAX_VALUE;
    var linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
    var angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
    for(i = 0;i < this.m_bodyCount;++i) {
      b = this.m_bodies[i];
      if(b.GetType() == b2Body.b2_staticBody) {
        continue
      }
      if((b.m_flags & b2Body.e_allowSleepFlag) == 0) {
        b.m_sleepTime = 0;
        minSleepTime = 0
      }
      if((b.m_flags & b2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
        b.m_sleepTime = 0;
        minSleepTime = 0
      }else {
        b.m_sleepTime += step.dt;
        minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime)
      }
    }
    if(minSleepTime >= b2Settings.b2_timeToSleep) {
      for(i = 0;i < this.m_bodyCount;++i) {
        b = this.m_bodies[i];
        b.SetAwake(false)
      }
    }
  }
};
b2Island.prototype.SolveTOI = function(subStep) {
  var i = 0;
  var j = 0;
  this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount, this.m_allocator);
  var contactSolver = this.m_contactSolver;
  for(i = 0;i < this.m_jointCount;++i) {
    this.m_joints[i].InitVelocityConstraints(subStep)
  }
  for(i = 0;i < subStep.velocityIterations;++i) {
    contactSolver.SolveVelocityConstraints();
    for(j = 0;j < this.m_jointCount;++j) {
      this.m_joints[j].SolveVelocityConstraints(subStep)
    }
  }
  for(i = 0;i < this.m_bodyCount;++i) {
    var b = this.m_bodies[i];
    if(b.GetType() == b2Body.b2_staticBody) {
      continue
    }
    var translationX = subStep.dt * b.m_linearVelocity.x;
    var translationY = subStep.dt * b.m_linearVelocity.y;
    if(translationX * translationX + translationY * translationY > b2Settings.b2_maxTranslationSquared) {
      b.m_linearVelocity.Normalize();
      b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
      b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt
    }
    var rotation = subStep.dt * b.m_angularVelocity;
    if(rotation * rotation > b2Settings.b2_maxRotationSquared) {
      if(b.m_angularVelocity < 0) {
        b.m_angularVelocity = -b2Settings.b2_maxRotation * subStep.inv_dt
      }else {
        b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt
      }
    }
    b.m_sweep.c0.SetV(b.m_sweep.c);
    b.m_sweep.a0 = b.m_sweep.a;
    b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
    b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
    b.m_sweep.a += subStep.dt * b.m_angularVelocity;
    b.SynchronizeTransform()
  }
  var k_toiBaumgarte = 0.75;
  for(i = 0;i < subStep.positionIterations;++i) {
    var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
    var jointsOkay = true;
    for(j = 0;j < this.m_jointCount;++j) {
      var jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
      jointsOkay = jointsOkay && jointOkay
    }
    if(contactsOkay && jointsOkay) {
      break
    }
  }
  this.Report(contactSolver.m_constraints)
};
b2Island.prototype.Report = function(constraints) {
  if(this.m_listener == null) {
    return
  }
  for(var i = 0;i < this.m_contactCount;++i) {
    var c = this.m_contacts[i];
    var cc = constraints[i];
    for(var j = 0;j < cc.pointCount;++j) {
      b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
      b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse
    }
    this.m_listener.PostSolve(c, b2Island.s_impulse)
  }
};
b2Island.prototype.AddBody = function(body) {
  body.m_islandIndex = this.m_bodyCount;
  this.m_bodies[this.m_bodyCount++] = body
};
b2Island.prototype.AddContact = function(contact) {
  this.m_contacts[this.m_contactCount++] = contact
};
b2Island.prototype.AddJoint = function(joint) {
  this.m_joints[this.m_jointCount++] = joint
};
b2Island.prototype.m_allocator = null;
b2Island.prototype.m_listener = null;
b2Island.prototype.m_contactSolver = null;
b2Island.prototype.m_bodies = null;
b2Island.prototype.m_contacts = null;
b2Island.prototype.m_joints = null;
b2Island.prototype.m_bodyCount = 0;
b2Island.prototype.m_jointCount = 0;
b2Island.prototype.m_contactCount = 0;
b2Island.prototype.m_bodyCapacity = 0;
b2Island.prototype.m_contactCapacity = 0;
b2Island.prototype.m_jointCapacity = 0;var b2PolyAndEdgeContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolyAndEdgeContact.prototype, b2Contact.prototype);
b2PolyAndEdgeContact.prototype._super = b2Contact.prototype;
b2PolyAndEdgeContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2PolyAndEdgeContact.prototype.__varz = function() {
};
b2PolyAndEdgeContact.Create = function(allocator) {
  return new b2PolyAndEdgeContact
};
b2PolyAndEdgeContact.Destroy = function(contact, allocator) {
};
b2PolyAndEdgeContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2PolyAndEdgeContact.prototype.b2CollidePolyAndEdge = function(manifold, polygon, xf1, edge, xf2) {
};
b2PolyAndEdgeContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB]);
  b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
  b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_edgeShape)
};var b2Collision = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Collision.prototype.__constructor = function() {
};
b2Collision.prototype.__varz = function() {
};
b2Collision.MakeClipPointVector = function() {
  var r = new Array(2);
  r[0] = new ClipVertex;
  r[1] = new ClipVertex;
  return r
};
b2Collision.ClipSegmentToLine = function(vOut, vIn, normal, offset) {
  var cv;
  var numOut = 0;
  cv = vIn[0];
  var vIn0 = cv.v;
  cv = vIn[1];
  var vIn1 = cv.v;
  var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
  var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
  if(distance0 <= 0) {
    vOut[numOut++].Set(vIn[0])
  }
  if(distance1 <= 0) {
    vOut[numOut++].Set(vIn[1])
  }
  if(distance0 * distance1 < 0) {
    var interp = distance0 / (distance0 - distance1);
    cv = vOut[numOut];
    var tVec = cv.v;
    tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
    tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
    cv = vOut[numOut];
    var cv2;
    if(distance0 > 0) {
      cv2 = vIn[0];
      cv.id = cv2.id
    }else {
      cv2 = vIn[1];
      cv.id = cv2.id
    }
    ++numOut
  }
  return numOut
};
b2Collision.EdgeSeparation = function(poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.m_vertexCount;
  var vertices1 = poly1.m_vertices;
  var normals1 = poly1.m_normals;
  var count2 = poly2.m_vertexCount;
  var vertices2 = poly2.m_vertices;
  var tMat;
  var tVec;
  tMat = xf1.R;
  tVec = normals1[edge1];
  var normal1WorldX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  var normal1WorldY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  tMat = xf2.R;
  var normal1X = tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY;
  var normal1Y = tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY;
  var index = 0;
  var minDot = Number.MAX_VALUE;
  for(var i = 0;i < count2;++i) {
    tVec = vertices2[i];
    var dot = tVec.x * normal1X + tVec.y * normal1Y;
    if(dot < minDot) {
      minDot = dot;
      index = i
    }
  }
  tVec = vertices1[edge1];
  tMat = xf1.R;
  var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tVec = vertices2[index];
  tMat = xf2.R;
  var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  v2X -= v1X;
  v2Y -= v1Y;
  var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
  return separation
};
b2Collision.FindMaxSeparation = function(edgeIndex, poly1, xf1, poly2, xf2) {
  var count1 = poly1.m_vertexCount;
  var normals1 = poly1.m_normals;
  var tVec;
  var tMat;
  tMat = xf2.R;
  tVec = poly2.m_centroid;
  var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tMat = xf1.R;
  tVec = poly1.m_centroid;
  dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var dLocal1X = dX * xf1.R.col1.x + dY * xf1.R.col1.y;
  var dLocal1Y = dX * xf1.R.col2.x + dY * xf1.R.col2.y;
  var edge = 0;
  var maxDot = -Number.MAX_VALUE;
  for(var i = 0;i < count1;++i) {
    tVec = normals1[i];
    var dot = tVec.x * dLocal1X + tVec.y * dLocal1Y;
    if(dot > maxDot) {
      maxDot = dot;
      edge = i
    }
  }
  var s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
  var prevEdge = edge - 1 >= 0 ? edge - 1 : count1 - 1;
  var sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
  var nextEdge = edge + 1 < count1 ? edge + 1 : 0;
  var sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
  var bestEdge = 0;
  var bestSeparation;
  var increment = 0;
  if(sPrev > s && sPrev > sNext) {
    increment = -1;
    bestEdge = prevEdge;
    bestSeparation = sPrev
  }else {
    if(sNext > s) {
      increment = 1;
      bestEdge = nextEdge;
      bestSeparation = sNext
    }else {
      edgeIndex[0] = edge;
      return s
    }
  }
  while(true) {
    if(increment == -1) {
      edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1
    }else {
      edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0
    }
    s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
    if(s > bestSeparation) {
      bestEdge = edge;
      bestSeparation = s
    }else {
      break
    }
  }
  edgeIndex[0] = bestEdge;
  return bestSeparation
};
b2Collision.FindIncidentEdge = function(c, poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.m_vertexCount;
  var normals1 = poly1.m_normals;
  var count2 = poly2.m_vertexCount;
  var vertices2 = poly2.m_vertices;
  var normals2 = poly2.m_normals;
  var tMat;
  var tVec;
  tMat = xf1.R;
  tVec = normals1[edge1];
  var normal1X = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  var normal1Y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  tMat = xf2.R;
  var tX = tMat.col1.x * normal1X + tMat.col1.y * normal1Y;
  normal1Y = tMat.col2.x * normal1X + tMat.col2.y * normal1Y;
  normal1X = tX;
  var index = 0;
  var minDot = Number.MAX_VALUE;
  for(var i = 0;i < count2;++i) {
    tVec = normals2[i];
    var dot = normal1X * tVec.x + normal1Y * tVec.y;
    if(dot < minDot) {
      minDot = dot;
      index = i
    }
  }
  var tClip;
  var i1 = index;
  var i2 = i1 + 1 < count2 ? i1 + 1 : 0;
  tClip = c[0];
  tVec = vertices2[i1];
  tMat = xf2.R;
  tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tClip.id.features.referenceEdge = edge1;
  tClip.id.features.incidentEdge = i1;
  tClip.id.features.incidentVertex = 0;
  tClip = c[1];
  tVec = vertices2[i2];
  tMat = xf2.R;
  tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tClip.id.features.referenceEdge = edge1;
  tClip.id.features.incidentEdge = i2;
  tClip.id.features.incidentVertex = 1
};
b2Collision.CollidePolygons = function(manifold, polyA, xfA, polyB, xfB) {
  var cv;
  manifold.m_pointCount = 0;
  var totalRadius = polyA.m_radius + polyB.m_radius;
  var edgeA = 0;
  b2Collision.s_edgeAO[0] = edgeA;
  var separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
  edgeA = b2Collision.s_edgeAO[0];
  if(separationA > totalRadius) {
    return
  }
  var edgeB = 0;
  b2Collision.s_edgeBO[0] = edgeB;
  var separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
  edgeB = b2Collision.s_edgeBO[0];
  if(separationB > totalRadius) {
    return
  }
  var poly1;
  var poly2;
  var xf1;
  var xf2;
  var edge1 = 0;
  var flip = 0;
  var k_relativeTol = 0.98;
  var k_absoluteTol = 0.0010;
  var tMat;
  if(separationB > k_relativeTol * separationA + k_absoluteTol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB;
    xf2 = xfA;
    edge1 = edgeB;
    manifold.m_type = b2Manifold.e_faceB;
    flip = 1
  }else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA;
    xf2 = xfB;
    edge1 = edgeA;
    manifold.m_type = b2Manifold.e_faceA;
    flip = 0
  }
  var incidentEdge = b2Collision.s_incidentEdge;
  b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
  var count1 = poly1.m_vertexCount;
  var vertices1 = poly1.m_vertices;
  var local_v11 = vertices1[edge1];
  var local_v12;
  if(edge1 + 1 < count1) {
    local_v12 = vertices1[parseInt(edge1 + 1)]
  }else {
    local_v12 = vertices1[0]
  }
  var localTangent = b2Collision.s_localTangent;
  localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
  localTangent.Normalize();
  var localNormal = b2Collision.s_localNormal;
  localNormal.x = localTangent.y;
  localNormal.y = -localTangent.x;
  var planePoint = b2Collision.s_planePoint;
  planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
  var tangent = b2Collision.s_tangent;
  tMat = xf1.R;
  tangent.x = tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y;
  tangent.y = tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y;
  var tangent2 = b2Collision.s_tangent2;
  tangent2.x = -tangent.x;
  tangent2.y = -tangent.y;
  var normal = b2Collision.s_normal;
  normal.x = tangent.y;
  normal.y = -tangent.x;
  var v11 = b2Collision.s_v11;
  var v12 = b2Collision.s_v12;
  v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
  v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
  v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
  v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
  var frontOffset = normal.x * v11.x + normal.y * v11.y;
  var sideOffset1 = -tangent.x * v11.x - tangent.y * v11.y + totalRadius;
  var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
  var clipPoints1 = b2Collision.s_clipPoints1;
  var clipPoints2 = b2Collision.s_clipPoints2;
  var np = 0;
  np = b2Collision.ClipSegmentToLine(clipPoints1, incidentEdge, tangent2, sideOffset1);
  if(np < 2) {
    return
  }
  np = b2Collision.ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);
  if(np < 2) {
    return
  }
  manifold.m_localPlaneNormal.SetV(localNormal);
  manifold.m_localPoint.SetV(planePoint);
  var pointCount = 0;
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;++i) {
    cv = clipPoints2[i];
    var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
    if(separation <= totalRadius) {
      var cp = manifold.m_points[pointCount];
      tMat = xf2.R;
      var tX = cv.v.x - xf2.position.x;
      var tY = cv.v.y - xf2.position.y;
      cp.m_localPoint.x = tX * tMat.col1.x + tY * tMat.col1.y;
      cp.m_localPoint.y = tX * tMat.col2.x + tY * tMat.col2.y;
      cp.m_id.Set(cv.id);
      cp.m_id.features.flip = flip;
      ++pointCount
    }
  }
  manifold.m_pointCount = pointCount
};
b2Collision.CollideCircles = function(manifold, circle1, xf1, circle2, xf2) {
  manifold.m_pointCount = 0;
  var tMat;
  var tVec;
  tMat = xf1.R;
  tVec = circle1.m_p;
  var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tMat = xf2.R;
  tVec = circle2.m_p;
  var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var distSqr = dX * dX + dY * dY;
  var radius = circle1.m_radius + circle2.m_radius;
  if(distSqr > radius * radius) {
    return
  }
  manifold.m_type = b2Manifold.e_circles;
  manifold.m_localPoint.SetV(circle1.m_p);
  manifold.m_localPlaneNormal.SetZero();
  manifold.m_pointCount = 1;
  manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
  manifold.m_points[0].m_id.key = 0
};
b2Collision.CollidePolygonAndCircle = function(manifold, polygon, xf1, circle, xf2) {
  manifold.m_pointCount = 0;
  var tPoint;
  var dX;
  var dY;
  var positionX;
  var positionY;
  var tVec;
  var tMat;
  tMat = xf2.R;
  tVec = circle.m_p;
  var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  dX = cX - xf1.position.x;
  dY = cY - xf1.position.y;
  tMat = xf1.R;
  var cLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
  var cLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
  var dist;
  var normalIndex = 0;
  var separation = -Number.MAX_VALUE;
  var radius = polygon.m_radius + circle.m_radius;
  var vertexCount = polygon.m_vertexCount;
  var vertices = polygon.m_vertices;
  var normals = polygon.m_normals;
  for(var i = 0;i < vertexCount;++i) {
    tVec = vertices[i];
    dX = cLocalX - tVec.x;
    dY = cLocalY - tVec.y;
    tVec = normals[i];
    var s = tVec.x * dX + tVec.y * dY;
    if(s > radius) {
      return
    }
    if(s > separation) {
      separation = s;
      normalIndex = i
    }
  }
  var vertIndex1 = normalIndex;
  var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
  var v1 = vertices[vertIndex1];
  var v2 = vertices[vertIndex2];
  if(separation < Number.MIN_VALUE) {
    manifold.m_pointCount = 1;
    manifold.m_type = b2Manifold.e_faceA;
    manifold.m_localPlaneNormal.SetV(normals[normalIndex]);
    manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
    manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
    manifold.m_points[0].m_localPoint.SetV(circle.m_p);
    manifold.m_points[0].m_id.key = 0;
    return
  }
  var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
  var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
  if(u1 <= 0) {
    if((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) {
      return
    }
    manifold.m_pointCount = 1;
    manifold.m_type = b2Manifold.e_faceA;
    manifold.m_localPlaneNormal.x = cLocalX - v1.x;
    manifold.m_localPlaneNormal.y = cLocalY - v1.y;
    manifold.m_localPlaneNormal.Normalize();
    manifold.m_localPoint.SetV(v1);
    manifold.m_points[0].m_localPoint.SetV(circle.m_p);
    manifold.m_points[0].m_id.key = 0
  }else {
    if(u2 <= 0) {
      if((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) {
        return
      }
      manifold.m_pointCount = 1;
      manifold.m_type = b2Manifold.e_faceA;
      manifold.m_localPlaneNormal.x = cLocalX - v2.x;
      manifold.m_localPlaneNormal.y = cLocalY - v2.y;
      manifold.m_localPlaneNormal.Normalize();
      manifold.m_localPoint.SetV(v2);
      manifold.m_points[0].m_localPoint.SetV(circle.m_p);
      manifold.m_points[0].m_id.key = 0
    }else {
      var faceCenterX = 0.5 * (v1.x + v2.x);
      var faceCenterY = 0.5 * (v1.y + v2.y);
      separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
      if(separation > radius) {
        return
      }
      manifold.m_pointCount = 1;
      manifold.m_type = b2Manifold.e_faceA;
      manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
      manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
      manifold.m_localPlaneNormal.Normalize();
      manifold.m_localPoint.Set(faceCenterX, faceCenterY);
      manifold.m_points[0].m_localPoint.SetV(circle.m_p);
      manifold.m_points[0].m_id.key = 0
    }
  }
};
b2Collision.TestOverlap = function(a, b) {
  var t1 = b.lowerBound;
  var t2 = a.upperBound;
  var d1X = t1.x - t2.x;
  var d1Y = t1.y - t2.y;
  t1 = a.lowerBound;
  t2 = b.upperBound;
  var d2X = t1.x - t2.x;
  var d2Y = t1.y - t2.y;
  if(d1X > 0 || d1Y > 0) {
    return false
  }
  if(d2X > 0 || d2Y > 0) {
    return false
  }
  return true
};
b2Collision.b2_nullFeature = 255;
b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
b2Collision.s_edgeAO = new Array(1);
b2Collision.s_edgeBO = new Array(1);
b2Collision.s_localTangent = new b2Vec2;
b2Collision.s_localNormal = new b2Vec2;
b2Collision.s_planePoint = new b2Vec2;
b2Collision.s_normal = new b2Vec2;
b2Collision.s_tangent = new b2Vec2;
b2Collision.s_tangent2 = new b2Vec2;
b2Collision.s_v11 = new b2Vec2;
b2Collision.s_v12 = new b2Vec2;
b2Collision.b2CollidePolyTempVec = new b2Vec2;var b2PolyAndCircleContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolyAndCircleContact.prototype, b2Contact.prototype);
b2PolyAndCircleContact.prototype._super = b2Contact.prototype;
b2PolyAndCircleContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2PolyAndCircleContact.prototype.__varz = function() {
};
b2PolyAndCircleContact.Create = function(allocator) {
  return new b2PolyAndCircleContact
};
b2PolyAndCircleContact.Destroy = function(contact, allocator) {
};
b2PolyAndCircleContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.m_body;
  var bB = this.m_fixtureB.m_body;
  b2Collision.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2PolyAndCircleContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB]);
  b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
  b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_circleShape)
};var b2ContactPoint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactPoint.prototype.__constructor = function() {
};
b2ContactPoint.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.velocity = new b2Vec2;
  this.normal = new b2Vec2;
  this.id = new b2ContactID
};
b2ContactPoint.prototype.shape1 = null;
b2ContactPoint.prototype.shape2 = null;
b2ContactPoint.prototype.position = new b2Vec2;
b2ContactPoint.prototype.velocity = new b2Vec2;
b2ContactPoint.prototype.normal = new b2Vec2;
b2ContactPoint.prototype.separation = null;
b2ContactPoint.prototype.friction = null;
b2ContactPoint.prototype.restitution = null;
b2ContactPoint.prototype.id = new b2ContactID;var b2CircleContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2CircleContact.prototype, b2Contact.prototype);
b2CircleContact.prototype._super = b2Contact.prototype;
b2CircleContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2CircleContact.prototype.__varz = function() {
};
b2CircleContact.Create = function(allocator) {
  return new b2CircleContact
};
b2CircleContact.Destroy = function(contact, allocator) {
};
b2CircleContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  b2Collision.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2CircleContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB])
};var b2EdgeAndCircleContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2EdgeAndCircleContact.prototype, b2Contact.prototype);
b2EdgeAndCircleContact.prototype._super = b2Contact.prototype;
b2EdgeAndCircleContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2EdgeAndCircleContact.prototype.__varz = function() {
};
b2EdgeAndCircleContact.Create = function(allocator) {
  return new b2EdgeAndCircleContact
};
b2EdgeAndCircleContact.Destroy = function(contact, allocator) {
};
b2EdgeAndCircleContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle = function(manifold, edge, xf1, circle, xf2) {
};
b2EdgeAndCircleContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB])
};var b2ContactManager = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactManager.prototype.__constructor = function() {
  this.m_world = null;
  this.m_contactCount = 0;
  this.m_contactFilter = b2ContactFilter.b2_defaultFilter;
  this.m_contactListener = b2ContactListener.b2_defaultListener;
  this.m_contactFactory = new b2ContactFactory(this.m_allocator);
  this.m_broadPhase = new b2DynamicTreeBroadPhase
};
b2ContactManager.prototype.__varz = function() {
};
b2ContactManager.s_evalCP = new b2ContactPoint;
b2ContactManager.prototype.AddPair = function(proxyUserDataA, proxyUserDataB) {
  var fixtureA = proxyUserDataA;
  var fixtureB = proxyUserDataB;
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if(bodyA == bodyB) {
    return
  }
  var edge = bodyB.GetContactList();
  while(edge) {
    if(edge.other == bodyA) {
      var fA = edge.contact.GetFixtureA();
      var fB = edge.contact.GetFixtureB();
      if(fA == fixtureA && fB == fixtureB) {
        return
      }
      if(fA == fixtureB && fB == fixtureA) {
        return
      }
    }
    edge = edge.next
  }
  if(bodyB.ShouldCollide(bodyA) == false) {
    return
  }
  if(this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
    return
  }
  var c = this.m_contactFactory.Create(fixtureA, fixtureB);
  fixtureA = c.GetFixtureA();
  fixtureB = c.GetFixtureB();
  bodyA = fixtureA.m_body;
  bodyB = fixtureB.m_body;
  c.m_prev = null;
  c.m_next = this.m_world.m_contactList;
  if(this.m_world.m_contactList != null) {
    this.m_world.m_contactList.m_prev = c
  }
  this.m_world.m_contactList = c;
  c.m_nodeA.contact = c;
  c.m_nodeA.other = bodyB;
  c.m_nodeA.prev = null;
  c.m_nodeA.next = bodyA.m_contactList;
  if(bodyA.m_contactList != null) {
    bodyA.m_contactList.prev = c.m_nodeA
  }
  bodyA.m_contactList = c.m_nodeA;
  c.m_nodeB.contact = c;
  c.m_nodeB.other = bodyA;
  c.m_nodeB.prev = null;
  c.m_nodeB.next = bodyB.m_contactList;
  if(bodyB.m_contactList != null) {
    bodyB.m_contactList.prev = c.m_nodeB
  }
  bodyB.m_contactList = c.m_nodeB;
  ++this.m_world.m_contactCount;
  return
};
b2ContactManager.prototype.FindNewContacts = function() {
  var that = this;
  this.m_broadPhase.UpdatePairs(function(a, b) {
    return that.AddPair(a, b)
  })
};
b2ContactManager.prototype.Destroy = function(c) {
  var fixtureA = c.GetFixtureA();
  var fixtureB = c.GetFixtureB();
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if(c.IsTouching()) {
    this.m_contactListener.EndContact(c)
  }
  if(c.m_prev) {
    c.m_prev.m_next = c.m_next
  }
  if(c.m_next) {
    c.m_next.m_prev = c.m_prev
  }
  if(c == this.m_world.m_contactList) {
    this.m_world.m_contactList = c.m_next
  }
  if(c.m_nodeA.prev) {
    c.m_nodeA.prev.next = c.m_nodeA.next
  }
  if(c.m_nodeA.next) {
    c.m_nodeA.next.prev = c.m_nodeA.prev
  }
  if(c.m_nodeA == bodyA.m_contactList) {
    bodyA.m_contactList = c.m_nodeA.next
  }
  if(c.m_nodeB.prev) {
    c.m_nodeB.prev.next = c.m_nodeB.next
  }
  if(c.m_nodeB.next) {
    c.m_nodeB.next.prev = c.m_nodeB.prev
  }
  if(c.m_nodeB == bodyB.m_contactList) {
    bodyB.m_contactList = c.m_nodeB.next
  }
  this.m_contactFactory.Destroy(c);
  --this.m_contactCount
};
b2ContactManager.prototype.Collide = function() {
  var c = this.m_world.m_contactList;
  while(c) {
    var fixtureA = c.GetFixtureA();
    var fixtureB = c.GetFixtureB();
    var bodyA = fixtureA.GetBody();
    var bodyB = fixtureB.GetBody();
    if(bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
      c = c.GetNext();
      continue
    }
    if(c.m_flags & b2Contact.e_filterFlag) {
      if(bodyB.ShouldCollide(bodyA) == false) {
        var cNuke = c;
        c = cNuke.GetNext();
        this.Destroy(cNuke);
        continue
      }
      if(this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
        cNuke = c;
        c = cNuke.GetNext();
        this.Destroy(cNuke);
        continue
      }
      c.m_flags &= ~b2Contact.e_filterFlag
    }
    var proxyA = fixtureA.m_proxy;
    var proxyB = fixtureB.m_proxy;
    var overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
    if(overlap == false) {
      cNuke = c;
      c = cNuke.GetNext();
      this.Destroy(cNuke);
      continue
    }
    c.Update(this.m_contactListener);
    c = c.GetNext()
  }
};
b2ContactManager.prototype.m_world = null;
b2ContactManager.prototype.m_broadPhase = null;
b2ContactManager.prototype.m_contactList = null;
b2ContactManager.prototype.m_contactCount = 0;
b2ContactManager.prototype.m_contactFilter = null;
b2ContactManager.prototype.m_contactListener = null;
b2ContactManager.prototype.m_contactFactory = null;
b2ContactManager.prototype.m_allocator = null;var b2World = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2World.prototype.__constructor = function(gravity, doSleep) {
  this.m_destructionListener = null;
  this.m_debugDraw = null;
  this.m_bodyList = null;
  this.m_contactList = null;
  this.m_jointList = null;
  this.m_controllerList = null;
  this.m_bodyCount = 0;
  this.m_contactCount = 0;
  this.m_jointCount = 0;
  this.m_controllerCount = 0;
  b2World.m_warmStarting = true;
  b2World.m_continuousPhysics = true;
  this.m_allowSleep = doSleep;
  this.m_gravity = gravity;
  this.m_inv_dt0 = 0;
  this.m_contactManager.m_world = this;
  var bd = new b2BodyDef;
  this.m_groundBody = this.CreateBody(bd)
};
b2World.prototype.__varz = function() {
  this.s_stack = new Array;
  this.m_contactManager = new b2ContactManager;
  this.m_contactSolver = new b2ContactSolver;
  this.m_island = new b2Island
};
b2World.s_timestep2 = new b2TimeStep;
b2World.s_backupA = new b2Sweep;
b2World.s_backupB = new b2Sweep;
b2World.s_timestep = new b2TimeStep;
b2World.s_queue = new Array;
b2World.e_newFixture = 1;
b2World.e_locked = 2;
b2World.s_xf = new b2Transform;
b2World.s_jointColor = new b2Color(0.5, 0.8, 0.8);
b2World.m_warmStarting = null;
b2World.m_continuousPhysics = null;
b2World.prototype.Solve = function(step) {
  var b;
  for(var controller = this.m_controllerList;controller;controller = controller.m_next) {
    controller.Step(step)
  }
  var island = this.m_island;
  island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
  for(b = this.m_bodyList;b;b = b.m_next) {
    b.m_flags &= ~b2Body.e_islandFlag
  }
  for(var c = this.m_contactList;c;c = c.m_next) {
    c.m_flags &= ~b2Contact.e_islandFlag
  }
  for(var j = this.m_jointList;j;j = j.m_next) {
    j.m_islandFlag = false
  }
  var stackSize = this.m_bodyCount;
  var stack = this.s_stack;
  for(var seed = this.m_bodyList;seed;seed = seed.m_next) {
    if(seed.m_flags & b2Body.e_islandFlag) {
      continue
    }
    if(seed.IsAwake() == false || seed.IsActive() == false) {
      continue
    }
    if(seed.GetType() == b2Body.b2_staticBody) {
      continue
    }
    island.Clear();
    var stackCount = 0;
    stack[stackCount++] = seed;
    seed.m_flags |= b2Body.e_islandFlag;
    while(stackCount > 0) {
      b = stack[--stackCount];
      island.AddBody(b);
      if(b.IsAwake() == false) {
        b.SetAwake(true)
      }
      if(b.GetType() == b2Body.b2_staticBody) {
        continue
      }
      var other;
      for(var ce = b.m_contactList;ce;ce = ce.next) {
        if(ce.contact.m_flags & b2Contact.e_islandFlag) {
          continue
        }
        if(ce.contact.IsSensor() == true || ce.contact.IsEnabled() == false || ce.contact.IsTouching() == false) {
          continue
        }
        island.AddContact(ce.contact);
        ce.contact.m_flags |= b2Contact.e_islandFlag;
        other = ce.other;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        stack[stackCount++] = other;
        other.m_flags |= b2Body.e_islandFlag
      }
      for(var jn = b.m_jointList;jn;jn = jn.next) {
        if(jn.joint.m_islandFlag == true) {
          continue
        }
        other = jn.other;
        if(other.IsActive() == false) {
          continue
        }
        island.AddJoint(jn.joint);
        jn.joint.m_islandFlag = true;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        stack[stackCount++] = other;
        other.m_flags |= b2Body.e_islandFlag
      }
    }
    island.Solve(step, this.m_gravity, this.m_allowSleep);
    for(var i = 0;i < island.m_bodyCount;++i) {
      b = island.m_bodies[i];
      if(b.GetType() == b2Body.b2_staticBody) {
        b.m_flags &= ~b2Body.e_islandFlag
      }
    }
  }
  for(i = 0;i < stack.length;++i) {
    if(!stack[i]) {
      break
    }
    stack[i] = null
  }
  for(b = this.m_bodyList;b;b = b.m_next) {
    if(b.IsAwake() == false || b.IsActive() == false) {
      continue
    }
    if(b.GetType() == b2Body.b2_staticBody) {
      continue
    }
    b.SynchronizeFixtures()
  }
  this.m_contactManager.FindNewContacts()
};
b2World.prototype.SolveTOI = function(step) {
  var b;
  var fA;
  var fB;
  var bA;
  var bB;
  var cEdge;
  var j;
  var island = this.m_island;
  island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
  var queue = b2World.s_queue;
  for(b = this.m_bodyList;b;b = b.m_next) {
    b.m_flags &= ~b2Body.e_islandFlag;
    b.m_sweep.t0 = 0
  }
  var c;
  for(c = this.m_contactList;c;c = c.m_next) {
    c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag)
  }
  for(j = this.m_jointList;j;j = j.m_next) {
    j.m_islandFlag = false
  }
  for(;;) {
    var minContact = null;
    var minTOI = 1;
    for(c = this.m_contactList;c;c = c.m_next) {
      if(c.IsSensor() == true || c.IsEnabled() == false || c.IsContinuous() == false) {
        continue
      }
      var toi = 1;
      if(c.m_flags & b2Contact.e_toiFlag) {
        toi = c.m_toi
      }else {
        fA = c.m_fixtureA;
        fB = c.m_fixtureB;
        bA = fA.m_body;
        bB = fB.m_body;
        if((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) {
          continue
        }
        var t0 = bA.m_sweep.t0;
        if(bA.m_sweep.t0 < bB.m_sweep.t0) {
          t0 = bB.m_sweep.t0;
          bA.m_sweep.Advance(t0)
        }else {
          if(bB.m_sweep.t0 < bA.m_sweep.t0) {
            t0 = bA.m_sweep.t0;
            bB.m_sweep.Advance(t0)
          }
        }
        toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
        b2Settings.b2Assert(0 <= toi && toi <= 1);
        if(toi > 0 && toi < 1) {
          toi = (1 - toi) * t0 + toi;
          if(toi > 1) {
            toi = 1
          }
        }
        c.m_toi = toi;
        c.m_flags |= b2Contact.e_toiFlag
      }
      if(Number.MIN_VALUE < toi && toi < minTOI) {
        minContact = c;
        minTOI = toi
      }
    }
    if(minContact == null || 1 - 100 * Number.MIN_VALUE < minTOI) {
      break
    }
    fA = minContact.m_fixtureA;
    fB = minContact.m_fixtureB;
    bA = fA.m_body;
    bB = fB.m_body;
    b2World.s_backupA.Set(bA.m_sweep);
    b2World.s_backupB.Set(bB.m_sweep);
    bA.Advance(minTOI);
    bB.Advance(minTOI);
    minContact.Update(this.m_contactManager.m_contactListener);
    minContact.m_flags &= ~b2Contact.e_toiFlag;
    if(minContact.IsSensor() == true || minContact.IsEnabled() == false) {
      bA.m_sweep.Set(b2World.s_backupA);
      bB.m_sweep.Set(b2World.s_backupB);
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      continue
    }
    if(minContact.IsTouching() == false) {
      continue
    }
    var seed = bA;
    if(seed.GetType() != b2Body.b2_dynamicBody) {
      seed = bB
    }
    island.Clear();
    var queueStart = 0;
    var queueSize = 0;
    queue[queueStart + queueSize++] = seed;
    seed.m_flags |= b2Body.e_islandFlag;
    while(queueSize > 0) {
      b = queue[queueStart++];
      --queueSize;
      island.AddBody(b);
      if(b.IsAwake() == false) {
        b.SetAwake(true)
      }
      if(b.GetType() != b2Body.b2_dynamicBody) {
        continue
      }
      for(cEdge = b.m_contactList;cEdge;cEdge = cEdge.next) {
        if(island.m_contactCount == island.m_contactCapacity) {
          break
        }
        if(cEdge.contact.m_flags & b2Contact.e_islandFlag) {
          continue
        }
        if(cEdge.contact.IsSensor() == true || cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false) {
          continue
        }
        island.AddContact(cEdge.contact);
        cEdge.contact.m_flags |= b2Contact.e_islandFlag;
        var other = cEdge.other;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        if(other.GetType() != b2Body.b2_staticBody) {
          other.Advance(minTOI);
          other.SetAwake(true)
        }
        queue[queueStart + queueSize] = other;
        ++queueSize;
        other.m_flags |= b2Body.e_islandFlag
      }
      for(var jEdge = b.m_jointList;jEdge;jEdge = jEdge.next) {
        if(island.m_jointCount == island.m_jointCapacity) {
          continue
        }
        if(jEdge.joint.m_islandFlag == true) {
          continue
        }
        other = jEdge.other;
        if(other.IsActive() == false) {
          continue
        }
        island.AddJoint(jEdge.joint);
        jEdge.joint.m_islandFlag = true;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        if(other.GetType() != b2Body.b2_staticBody) {
          other.Advance(minTOI);
          other.SetAwake(true)
        }
        queue[queueStart + queueSize] = other;
        ++queueSize;
        other.m_flags |= b2Body.e_islandFlag
      }
    }
    var subStep = b2World.s_timestep;
    subStep.warmStarting = false;
    subStep.dt = (1 - minTOI) * step.dt;
    subStep.inv_dt = 1 / subStep.dt;
    subStep.dtRatio = 0;
    subStep.velocityIterations = step.velocityIterations;
    subStep.positionIterations = step.positionIterations;
    island.SolveTOI(subStep);
    var i = 0;
    for(i = 0;i < island.m_bodyCount;++i) {
      b = island.m_bodies[i];
      b.m_flags &= ~b2Body.e_islandFlag;
      if(b.IsAwake() == false) {
        continue
      }
      if(b.GetType() != b2Body.b2_dynamicBody) {
        continue
      }
      b.SynchronizeFixtures();
      for(cEdge = b.m_contactList;cEdge;cEdge = cEdge.next) {
        cEdge.contact.m_flags &= ~b2Contact.e_toiFlag
      }
    }
    for(i = 0;i < island.m_contactCount;++i) {
      c = island.m_contacts[i];
      c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag)
    }
    for(i = 0;i < island.m_jointCount;++i) {
      j = island.m_joints[i];
      j.m_islandFlag = false
    }
    this.m_contactManager.FindNewContacts()
  }
};
b2World.prototype.DrawJoint = function(joint) {
  var b1 = joint.GetBodyA();
  var b2 = joint.GetBodyB();
  var xf1 = b1.m_xf;
  var xf2 = b2.m_xf;
  var x1 = xf1.position;
  var x2 = xf2.position;
  var p1 = joint.GetAnchorA();
  var p2 = joint.GetAnchorB();
  var color = b2World.s_jointColor;
  switch(joint.m_type) {
    case b2Joint.e_distanceJoint:
      this.m_debugDraw.DrawSegment(p1, p2, color);
      break;
    case b2Joint.e_pulleyJoint:
      var pulley = joint;
      var s1 = pulley.GetGroundAnchorA();
      var s2 = pulley.GetGroundAnchorB();
      this.m_debugDraw.DrawSegment(s1, p1, color);
      this.m_debugDraw.DrawSegment(s2, p2, color);
      this.m_debugDraw.DrawSegment(s1, s2, color);
      break;
    case b2Joint.e_mouseJoint:
      this.m_debugDraw.DrawSegment(p1, p2, color);
      break;
    default:
      if(b1 != this.m_groundBody) {
        this.m_debugDraw.DrawSegment(x1, p1, color)
      }
      this.m_debugDraw.DrawSegment(p1, p2, color);
      if(b2 != this.m_groundBody) {
        this.m_debugDraw.DrawSegment(x2, p2, color)
      }
  }
};
b2World.prototype.DrawShape = function(shape, xf, color) {
  switch(shape.m_type) {
    case b2Shape.e_circleShape:
      var circle = shape;
      var center = b2Math.MulX(xf, circle.m_p);
      var radius = circle.m_radius;
      var axis = xf.R.col1;
      this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
      break;
    case b2Shape.e_polygonShape:
      var i = 0;
      var poly = shape;
      var vertexCount = poly.GetVertexCount();
      var localVertices = poly.GetVertices();
      var vertices = new Array(vertexCount);
      for(i = 0;i < vertexCount;++i) {
        vertices[i] = b2Math.MulX(xf, localVertices[i])
      }
      this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
      break;
    case b2Shape.e_edgeShape:
      var edge = shape;
      this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
      break
  }
};
b2World.prototype.SetDestructionListener = function(listener) {
  this.m_destructionListener = listener
};
b2World.prototype.SetContactFilter = function(filter) {
  this.m_contactManager.m_contactFilter = filter
};
b2World.prototype.SetContactListener = function(listener) {
  this.m_contactManager.m_contactListener = listener
};
b2World.prototype.SetDebugDraw = function(debugDraw) {
  this.m_debugDraw = debugDraw
};
b2World.prototype.SetBroadPhase = function(broadPhase) {
  var oldBroadPhase = this.m_contactManager.m_broadPhase;
  this.m_contactManager.m_broadPhase = broadPhase;
  for(var b = this.m_bodyList;b;b = b.m_next) {
    for(var f = b.m_fixtureList;f;f = f.m_next) {
      f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f)
    }
  }
};
b2World.prototype.Validate = function() {
  this.m_contactManager.m_broadPhase.Validate()
};
b2World.prototype.GetProxyCount = function() {
  return this.m_contactManager.m_broadPhase.GetProxyCount()
};
b2World.prototype.CreateBody = function(def) {
  if(this.IsLocked() == true) {
    return null
  }
  var b = new b2Body(def, this);
  b.m_prev = null;
  b.m_next = this.m_bodyList;
  if(this.m_bodyList) {
    this.m_bodyList.m_prev = b
  }
  this.m_bodyList = b;
  ++this.m_bodyCount;
  return b
};
b2World.prototype.DestroyBody = function(b) {
  if(this.IsLocked() == true) {
    return
  }
  var jn = b.m_jointList;
  while(jn) {
    var jn0 = jn;
    jn = jn.next;
    if(this.m_destructionListener) {
      this.m_destructionListener.SayGoodbyeJoint(jn0.joint)
    }
    this.DestroyJoint(jn0.joint)
  }
  var coe = b.m_controllerList;
  while(coe) {
    var coe0 = coe;
    coe = coe.nextController;
    coe0.controller.RemoveBody(b)
  }
  var ce = b.m_contactList;
  while(ce) {
    var ce0 = ce;
    ce = ce.next;
    this.m_contactManager.Destroy(ce0.contact)
  }
  b.m_contactList = null;
  var f = b.m_fixtureList;
  while(f) {
    var f0 = f;
    f = f.m_next;
    if(this.m_destructionListener) {
      this.m_destructionListener.SayGoodbyeFixture(f0)
    }
    f0.DestroyProxy(this.m_contactManager.m_broadPhase);
    f0.Destroy()
  }
  b.m_fixtureList = null;
  b.m_fixtureCount = 0;
  if(b.m_prev) {
    b.m_prev.m_next = b.m_next
  }
  if(b.m_next) {
    b.m_next.m_prev = b.m_prev
  }
  if(b == this.m_bodyList) {
    this.m_bodyList = b.m_next
  }
  --this.m_bodyCount
};
b2World.prototype.CreateJoint = function(def) {
  var j = b2Joint.Create(def, null);
  j.m_prev = null;
  j.m_next = this.m_jointList;
  if(this.m_jointList) {
    this.m_jointList.m_prev = j
  }
  this.m_jointList = j;
  ++this.m_jointCount;
  j.m_edgeA.joint = j;
  j.m_edgeA.other = j.m_bodyB;
  j.m_edgeA.prev = null;
  j.m_edgeA.next = j.m_bodyA.m_jointList;
  if(j.m_bodyA.m_jointList) {
    j.m_bodyA.m_jointList.prev = j.m_edgeA
  }
  j.m_bodyA.m_jointList = j.m_edgeA;
  j.m_edgeB.joint = j;
  j.m_edgeB.other = j.m_bodyA;
  j.m_edgeB.prev = null;
  j.m_edgeB.next = j.m_bodyB.m_jointList;
  if(j.m_bodyB.m_jointList) {
    j.m_bodyB.m_jointList.prev = j.m_edgeB
  }
  j.m_bodyB.m_jointList = j.m_edgeB;
  var bodyA = def.bodyA;
  var bodyB = def.bodyB;
  if(def.collideConnected == false) {
    var edge = bodyB.GetContactList();
    while(edge) {
      if(edge.other == bodyA) {
        edge.contact.FlagForFiltering()
      }
      edge = edge.next
    }
  }
  return j
};
b2World.prototype.DestroyJoint = function(j) {
  var collideConnected = j.m_collideConnected;
  if(j.m_prev) {
    j.m_prev.m_next = j.m_next
  }
  if(j.m_next) {
    j.m_next.m_prev = j.m_prev
  }
  if(j == this.m_jointList) {
    this.m_jointList = j.m_next
  }
  var bodyA = j.m_bodyA;
  var bodyB = j.m_bodyB;
  bodyA.SetAwake(true);
  bodyB.SetAwake(true);
  if(j.m_edgeA.prev) {
    j.m_edgeA.prev.next = j.m_edgeA.next
  }
  if(j.m_edgeA.next) {
    j.m_edgeA.next.prev = j.m_edgeA.prev
  }
  if(j.m_edgeA == bodyA.m_jointList) {
    bodyA.m_jointList = j.m_edgeA.next
  }
  j.m_edgeA.prev = null;
  j.m_edgeA.next = null;
  if(j.m_edgeB.prev) {
    j.m_edgeB.prev.next = j.m_edgeB.next
  }
  if(j.m_edgeB.next) {
    j.m_edgeB.next.prev = j.m_edgeB.prev
  }
  if(j.m_edgeB == bodyB.m_jointList) {
    bodyB.m_jointList = j.m_edgeB.next
  }
  j.m_edgeB.prev = null;
  j.m_edgeB.next = null;
  b2Joint.Destroy(j, null);
  --this.m_jointCount;
  if(collideConnected == false) {
    var edge = bodyB.GetContactList();
    while(edge) {
      if(edge.other == bodyA) {
        edge.contact.FlagForFiltering()
      }
      edge = edge.next
    }
  }
};
b2World.prototype.AddController = function(c) {
  c.m_next = this.m_controllerList;
  c.m_prev = null;
  this.m_controllerList = c;
  c.m_world = this;
  this.m_controllerCount++;
  return c
};
b2World.prototype.RemoveController = function(c) {
  if(c.m_prev) {
    c.m_prev.m_next = c.m_next
  }
  if(c.m_next) {
    c.m_next.m_prev = c.m_prev
  }
  if(this.m_controllerList == c) {
    this.m_controllerList = c.m_next
  }
  this.m_controllerCount--
};
b2World.prototype.CreateController = function(controller) {
  if(controller.m_world != this) {
    throw new Error("Controller can only be a member of one world");
  }
  controller.m_next = this.m_controllerList;
  controller.m_prev = null;
  if(this.m_controllerList) {
    this.m_controllerList.m_prev = controller
  }
  this.m_controllerList = controller;
  ++this.m_controllerCount;
  controller.m_world = this;
  return controller
};
b2World.prototype.DestroyController = function(controller) {
  controller.Clear();
  if(controller.m_next) {
    controller.m_next.m_prev = controller.m_prev
  }
  if(controller.m_prev) {
    controller.m_prev.m_next = controller.m_next
  }
  if(controller == this.m_controllerList) {
    this.m_controllerList = controller.m_next
  }
  --this.m_controllerCount
};
b2World.prototype.SetWarmStarting = function(flag) {
  b2World.m_warmStarting = flag
};
b2World.prototype.SetContinuousPhysics = function(flag) {
  b2World.m_continuousPhysics = flag
};
b2World.prototype.GetBodyCount = function() {
  return this.m_bodyCount
};
b2World.prototype.GetJointCount = function() {
  return this.m_jointCount
};
b2World.prototype.GetContactCount = function() {
  return this.m_contactCount
};
b2World.prototype.SetGravity = function(gravity) {
  this.m_gravity = gravity
};
b2World.prototype.GetGravity = function() {
  return this.m_gravity
};
b2World.prototype.GetGroundBody = function() {
  return this.m_groundBody
};
b2World.prototype.Step = function(dt, velocityIterations, positionIterations) {
  if(this.m_flags & b2World.e_newFixture) {
    this.m_contactManager.FindNewContacts();
    this.m_flags &= ~b2World.e_newFixture
  }
  this.m_flags |= b2World.e_locked;
  var step = b2World.s_timestep2;
  step.dt = dt;
  step.velocityIterations = velocityIterations;
  step.positionIterations = positionIterations;
  if(dt > 0) {
    step.inv_dt = 1 / dt
  }else {
    step.inv_dt = 0
  }
  step.dtRatio = this.m_inv_dt0 * dt;
  step.warmStarting = b2World.m_warmStarting;
  this.m_contactManager.Collide();
  if(step.dt > 0) {
    this.Solve(step)
  }
  if(b2World.m_continuousPhysics && step.dt > 0) {
    this.SolveTOI(step)
  }
  if(step.dt > 0) {
    this.m_inv_dt0 = step.inv_dt
  }
  this.m_flags &= ~b2World.e_locked
};
b2World.prototype.ClearForces = function() {
  for(var body = this.m_bodyList;body;body = body.m_next) {
    body.m_force.SetZero();
    body.m_torque = 0
  }
};
b2World.prototype.DrawDebugData = function() {
  if(this.m_debugDraw == null) {
    return
  }
  this.m_debugDraw.Clear();
  var flags = this.m_debugDraw.GetFlags();
  var i = 0;
  var b;
  var f;
  var s;
  var j;
  var bp;
  var invQ = new b2Vec2;
  var x1 = new b2Vec2;
  var x2 = new b2Vec2;
  var xf;
  var b1 = new b2AABB;
  var b2 = new b2AABB;
  var vs = [new b2Vec2, new b2Vec2, new b2Vec2, new b2Vec2];
  var color = new b2Color(0, 0, 0);
  if(flags & b2DebugDraw.e_shapeBit) {
    for(b = this.m_bodyList;b;b = b.m_next) {
      xf = b.m_xf;
      for(f = b.GetFixtureList();f;f = f.m_next) {
        s = f.GetShape();
        if(b.IsActive() == false) {
          color.Set(0.5, 0.5, 0.3);
          this.DrawShape(s, xf, color)
        }else {
          if(b.GetType() == b2Body.b2_staticBody) {
            color.Set(0.5, 0.9, 0.5);
            this.DrawShape(s, xf, color)
          }else {
            if(b.GetType() == b2Body.b2_kinematicBody) {
              color.Set(0.5, 0.5, 0.9);
              this.DrawShape(s, xf, color)
            }else {
              if(b.IsAwake() == false) {
                color.Set(0.6, 0.6, 0.6);
                this.DrawShape(s, xf, color)
              }else {
                color.Set(0.9, 0.7, 0.7);
                this.DrawShape(s, xf, color)
              }
            }
          }
        }
      }
    }
  }
  if(flags & b2DebugDraw.e_jointBit) {
    for(j = this.m_jointList;j;j = j.m_next) {
      this.DrawJoint(j)
    }
  }
  if(flags & b2DebugDraw.e_controllerBit) {
    for(var c = this.m_controllerList;c;c = c.m_next) {
      c.Draw(this.m_debugDraw)
    }
  }
  if(flags & b2DebugDraw.e_pairBit) {
    color.Set(0.3, 0.9, 0.9);
    for(var contact = this.m_contactManager.m_contactList;contact;contact = contact.GetNext()) {
      var fixtureA = contact.GetFixtureA();
      var fixtureB = contact.GetFixtureB();
      var cA = fixtureA.GetAABB().GetCenter();
      var cB = fixtureB.GetAABB().GetCenter();
      this.m_debugDraw.DrawSegment(cA, cB, color)
    }
  }
  if(flags & b2DebugDraw.e_aabbBit) {
    bp = this.m_contactManager.m_broadPhase;
    vs = [new b2Vec2, new b2Vec2, new b2Vec2, new b2Vec2];
    for(b = this.m_bodyList;b;b = b.GetNext()) {
      if(b.IsActive() == false) {
        continue
      }
      for(f = b.GetFixtureList();f;f = f.GetNext()) {
        var aabb = bp.GetFatAABB(f.m_proxy);
        vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
        vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
        vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
        vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
        this.m_debugDraw.DrawPolygon(vs, 4, color)
      }
    }
  }
  if(flags & b2DebugDraw.e_centerOfMassBit) {
    for(b = this.m_bodyList;b;b = b.m_next) {
      xf = b2World.s_xf;
      xf.R = b.m_xf.R;
      xf.position = b.GetWorldCenter();
      this.m_debugDraw.DrawTransform(xf)
    }
  }
};
b2World.prototype.QueryAABB = function(callback, aabb) {
  var broadPhase = this.m_contactManager.m_broadPhase;
  function WorldQueryWrapper(proxy) {
    return callback(broadPhase.GetUserData(proxy))
  }
  broadPhase.Query(WorldQueryWrapper, aabb)
};
b2World.prototype.QueryShape = function(callback, shape, transform) {
  if(transform == null) {
    transform = new b2Transform;
    transform.SetIdentity()
  }
  var broadPhase = this.m_contactManager.m_broadPhase;
  function WorldQueryWrapper(proxy) {
    var fixture = broadPhase.GetUserData(proxy);
    if(b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) {
      return callback(fixture)
    }
    return true
  }
  var aabb = new b2AABB;
  shape.ComputeAABB(aabb, transform);
  broadPhase.Query(WorldQueryWrapper, aabb)
};
b2World.prototype.QueryPoint = function(callback, p) {
  var broadPhase = this.m_contactManager.m_broadPhase;
  function WorldQueryWrapper(proxy) {
    var fixture = broadPhase.GetUserData(proxy);
    if(fixture.TestPoint(p)) {
      return callback(fixture)
    }
    return true
  }
  var aabb = new b2AABB;
  aabb.lowerBound.Set(p.x - b2Settings.b2_linearSlop, p.y - b2Settings.b2_linearSlop);
  aabb.upperBound.Set(p.x + b2Settings.b2_linearSlop, p.y + b2Settings.b2_linearSlop);
  broadPhase.Query(WorldQueryWrapper, aabb)
};
b2World.prototype.RayCast = function(callback, point1, point2) {
  var broadPhase = this.m_contactManager.m_broadPhase;
  var output = new b2RayCastOutput;
  function RayCastWrapper(input, proxy) {
    var userData = broadPhase.GetUserData(proxy);
    var fixture = userData;
    var hit = fixture.RayCast(output, input);
    if(hit) {
      var fraction = output.fraction;
      var point = new b2Vec2((1 - fraction) * point1.x + fraction * point2.x, (1 - fraction) * point1.y + fraction * point2.y);
      return callback(fixture, point, output.normal, fraction)
    }
    return input.maxFraction
  }
  var input = new b2RayCastInput(point1, point2);
  broadPhase.RayCast(RayCastWrapper, input)
};
b2World.prototype.RayCastOne = function(point1, point2) {
  var result;
  function RayCastOneWrapper(fixture, point, normal, fraction) {
    result = fixture;
    return fraction
  }
  this.RayCast(RayCastOneWrapper, point1, point2);
  return result
};
b2World.prototype.RayCastAll = function(point1, point2) {
  var result = new Array;
  function RayCastAllWrapper(fixture, point, normal, fraction) {
    result[result.length] = fixture;
    return 1
  }
  this.RayCast(RayCastAllWrapper, point1, point2);
  return result
};
b2World.prototype.GetBodyList = function() {
  return this.m_bodyList
};
b2World.prototype.GetJointList = function() {
  return this.m_jointList
};
b2World.prototype.GetContactList = function() {
  return this.m_contactList
};
b2World.prototype.IsLocked = function() {
  return(this.m_flags & b2World.e_locked) > 0
};
b2World.prototype.s_stack = new Array;
b2World.prototype.m_flags = 0;
b2World.prototype.m_contactManager = new b2ContactManager;
b2World.prototype.m_contactSolver = new b2ContactSolver;
b2World.prototype.m_island = new b2Island;
b2World.prototype.m_bodyList = null;
b2World.prototype.m_jointList = null;
b2World.prototype.m_contactList = null;
b2World.prototype.m_bodyCount = 0;
b2World.prototype.m_contactCount = 0;
b2World.prototype.m_jointCount = 0;
b2World.prototype.m_controllerList = null;
b2World.prototype.m_controllerCount = 0;
b2World.prototype.m_gravity = null;
b2World.prototype.m_allowSleep = null;
b2World.prototype.m_groundBody = null;
b2World.prototype.m_destructionListener = null;
b2World.prototype.m_debugDraw = null;
b2World.prototype.m_inv_dt0 = null;if(typeof exports !== "undefined") {
  exports.b2BoundValues = b2BoundValues;
  exports.b2Math = b2Math;
  exports.b2DistanceOutput = b2DistanceOutput;
  exports.b2Mat33 = b2Mat33;
  exports.b2ContactPoint = b2ContactPoint;
  exports.b2PairManager = b2PairManager;
  exports.b2PositionSolverManifold = b2PositionSolverManifold;
  exports.b2OBB = b2OBB;
  exports.b2CircleContact = b2CircleContact;
  exports.b2PulleyJoint = b2PulleyJoint;
  exports.b2Pair = b2Pair;
  exports.b2TimeStep = b2TimeStep;
  exports.b2FixtureDef = b2FixtureDef;
  exports.b2World = b2World;
  exports.b2PrismaticJoint = b2PrismaticJoint;
  exports.b2Controller = b2Controller;
  exports.b2ContactID = b2ContactID;
  exports.b2RevoluteJoint = b2RevoluteJoint;
  exports.b2JointDef = b2JointDef;
  exports.b2Transform = b2Transform;
  exports.b2GravityController = b2GravityController;
  exports.b2EdgeAndCircleContact = b2EdgeAndCircleContact;
  exports.b2EdgeShape = b2EdgeShape;
  exports.b2BuoyancyController = b2BuoyancyController;
  exports.b2LineJointDef = b2LineJointDef;
  exports.b2Contact = b2Contact;
  exports.b2DistanceJoint = b2DistanceJoint;
  exports.b2Body = b2Body;
  exports.b2DestructionListener = b2DestructionListener;
  exports.b2PulleyJointDef = b2PulleyJointDef;
  exports.b2ContactEdge = b2ContactEdge;
  exports.b2ContactConstraint = b2ContactConstraint;
  exports.b2ContactImpulse = b2ContactImpulse;
  exports.b2DistanceJointDef = b2DistanceJointDef;
  exports.b2ContactResult = b2ContactResult;
  exports.b2EdgeChainDef = b2EdgeChainDef;
  exports.b2Vec2 = b2Vec2;
  exports.b2Vec3 = b2Vec3;
  exports.b2DistanceProxy = b2DistanceProxy;
  exports.b2FrictionJointDef = b2FrictionJointDef;
  exports.b2PolygonContact = b2PolygonContact;
  exports.b2TensorDampingController = b2TensorDampingController;
  exports.b2ContactFactory = b2ContactFactory;
  exports.b2WeldJointDef = b2WeldJointDef;
  exports.b2ConstantAccelController = b2ConstantAccelController;
  exports.b2GearJointDef = b2GearJointDef;
  exports.ClipVertex = ClipVertex;
  exports.b2SeparationFunction = b2SeparationFunction;
  exports.b2ManifoldPoint = b2ManifoldPoint;
  exports.b2Color = b2Color;
  exports.b2PolygonShape = b2PolygonShape;
  exports.b2DynamicTreePair = b2DynamicTreePair;
  exports.b2ContactConstraintPoint = b2ContactConstraintPoint;
  exports.b2FrictionJoint = b2FrictionJoint;
  exports.b2ContactFilter = b2ContactFilter;
  exports.b2ControllerEdge = b2ControllerEdge;
  exports.b2Distance = b2Distance;
  exports.b2Fixture = b2Fixture;
  exports.b2DynamicTreeNode = b2DynamicTreeNode;
  exports.b2MouseJoint = b2MouseJoint;
  exports.b2DistanceInput = b2DistanceInput;
  exports.b2BodyDef = b2BodyDef;
  exports.b2DynamicTreeBroadPhase = b2DynamicTreeBroadPhase;
  exports.b2Settings = b2Settings;
  exports.b2Proxy = b2Proxy;
  exports.b2Point = b2Point;
  exports.b2BroadPhase = b2BroadPhase;
  exports.b2Manifold = b2Manifold;
  exports.b2WorldManifold = b2WorldManifold;
  exports.b2PrismaticJointDef = b2PrismaticJointDef;
  exports.b2RayCastOutput = b2RayCastOutput;
  exports.b2ConstantForceController = b2ConstantForceController;
  exports.b2TimeOfImpact = b2TimeOfImpact;
  exports.b2CircleShape = b2CircleShape;
  exports.b2MassData = b2MassData;
  exports.b2Joint = b2Joint;
  exports.b2GearJoint = b2GearJoint;
  exports.b2DynamicTree = b2DynamicTree;
  exports.b2JointEdge = b2JointEdge;
  exports.b2LineJoint = b2LineJoint;
  exports.b2NullContact = b2NullContact;
  exports.b2ContactListener = b2ContactListener;
  exports.b2RayCastInput = b2RayCastInput;
  exports.b2TOIInput = b2TOIInput;
  exports.Features = Features;
  exports.b2FilterData = b2FilterData;
  exports.b2Island = b2Island;
  exports.b2ContactManager = b2ContactManager;
  exports.b2ContactSolver = b2ContactSolver;
  exports.b2Simplex = b2Simplex;
  exports.b2AABB = b2AABB;
  exports.b2Jacobian = b2Jacobian;
  exports.b2Bound = b2Bound;
  exports.b2RevoluteJointDef = b2RevoluteJointDef;
  exports.b2PolyAndEdgeContact = b2PolyAndEdgeContact;
  exports.b2SimplexVertex = b2SimplexVertex;
  exports.b2WeldJoint = b2WeldJoint;
  exports.b2Collision = b2Collision;
  exports.b2Mat22 = b2Mat22;
  exports.b2SimplexCache = b2SimplexCache;
  exports.b2PolyAndCircleContact = b2PolyAndCircleContact;
  exports.b2MouseJointDef = b2MouseJointDef;
  exports.b2Shape = b2Shape;
  exports.b2Segment = b2Segment;
  exports.b2ContactRegister = b2ContactRegister;
  exports.b2DebugDraw = b2DebugDraw;
  exports.b2Sweep = b2Sweep
}
;

}};
__resources__["/__builtin__/libs/cocos2d/ActionManager.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    console = require('system').console,
    Timer = require('./Scheduler').Timer,
    Scheduler = require('./Scheduler').Scheduler,
    events = require('events');

var ActionManager = BObject.extend(/** @lends cocos.ActionManager# */{
    targets: null,
    currentTarget: null,
    currentTargetSalvaged: null,

    /**
     * <p>A singleton that manages all the actions. Normally you
     * won't need to use this singleton directly. 99% of the cases you will use the
     * cocos.nodes.Node interface, which uses this singleton. But there are some cases where
     * you might need to use this singleton. Examples:</p>
     *
     * <ul>
     * <li>When you want to run an action where the target is different from a cocos.nodes.Node</li>
     * <li>When you want to pause / resume the actions</li>
     * </ul>
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        ActionManager.superclass.init.call(this);

        Scheduler.get('sharedScheduler').scheduleUpdate({target: this, priority: 0, paused: false});
        this.targets = [];
    },

    /**
     * Adds an action with a target. If the target is already present, then the
     * action will be added to the existing target. If the target is not
     * present, a new instance of this target will be created either paused or
     * paused, and the action will be added to the newly created target. When
     * the target is paused, the queued actions won't be 'ticked'.
     *
     * @opt {cocos.nodes.Node} target Node to run the action on
     */
    addAction: function (opts) {

        var targetID = opts.target.get('id');
        var element = this.targets[targetID];

        if (!element) {
            element = this.targets[targetID] = {
                paused: false,
                target: opts.target,
                actions: []
            };
        }

        element.actions.push(opts.action);

        opts.action.startWithTarget(opts.target);
    },

    /**
     * Remove an action
     *
     * @param {cocos.actions.Action} action Action to remove
     */
    removeAction: function (action) {
        var targetID = action.originalTarget.get('id'),
            element = this.targets[targetID];

        if (!element) {
            return;
        }

        var actionIndex = element.actions.indexOf(action);

        if (actionIndex == -1) {
            return;
        }

        if (this.currentTarget == element) {
            element.currentActionSalvaged = true;
        } 
        
        element.actions[actionIndex] = null;
        element.actions.splice(actionIndex, 1); // Delete array item

        if (element.actions.length === 0) {
            if (this.currentTarget == element) {
                this.set('currentTargetSalvaged', true);
            }
        }
            
    },

    /**
     * Fetch an action belonging to a cocos.nodes.Node
     *
     * @returns {cocos.actions.Action}
     *
     * @opts {cocos.nodes.Node} target Target of the action
     * @opts {String} tag Tag of the action
     */
    getActionFromTarget: function(opts) {
        var tag = opts.tag,
            targetID = opts.target.get('id');

        var element = this.targets[targetID];
        if (!element) {
            return null;
        }
        for (var i = 0; i < element.actions.length; i++ ) {
            if (element.actions[i] && 
                (element.actions[i].get('tag') === tag)) {
                return element.actions[i];
            }
        }
        // Not found
        return null;
    },
     
    /**
     * Remove all actions for a cocos.nodes.Node
     *
     * @param {cocos.nodes.Node} target Node to remove all actions for
     */
    removeAllActionsFromTarget: function (target) {
        var targetID = target.get('id');

        var element = this.targets[targetID];
        if (!element) {
            return;
        }
        // Delete everything in array but don't replace it incase something else has a reference
        element.actions.splice(0, element.actions.length);
    },

    /**
     * @private
     */
    update: function (dt) {
        var self = this;
        util.each(this.targets, function (currentTarget, i) {

            if (!currentTarget) {
                return;
            }
            self.currentTarget = currentTarget;

            if (!currentTarget.paused) {
                util.each(currentTarget.actions, function (currentAction, j) {
                    if (!currentAction) {
                        return;
                    }

                    currentTarget.currentAction = currentAction;
                    currentTarget.currentActionSalvaged = false;

                    currentTarget.currentAction.step(dt);

                    if (currentTarget.currentAction.get('isDone')) {
                        events.trigger(currentTarget.currentAction, 'actionComplete');
                    
                        currentTarget.currentAction.stop();

                        var a = currentTarget.currentAction;
                        currentTarget.currentAction = null;
                        self.removeAction(a);
                    }

                    currentTarget.currentAction = null;

                });
            }

            if (self.currentTargetSalvaged && currentTarget.actions.length === 0) {
                self.targets[i] = null;
                delete self.targets[i];
            }
        });
    },

    pauseTarget: function (target) {
    },

    resumeTarget: function (target) {
        // TODO
    }
});

util.extend(ActionManager, /** @lends cocos.ActionManager */{
    /**
     * Singleton instance of cocos.ActionManager
     * @getter sharedManager
     * @type cocos.ActionManager
     */
    get_sharedManager: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.ActionManager = ActionManager;

}};
__resources__["/__builtin__/libs/cocos2d/actions/Action.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    console = require('system').console,
    geo = require('geometry'),
    ccp = geo.ccp;

/** 
 * @memberOf cocos.actions
 * @class Base class for Actions
 * @extends BObject
 * @constructor
 */
var Action = BObject.extend(/** @lends cocos.actions.Action# */{
    /**
     * The Node the action is being performed on
     * @type cocos.nodes.Node
     */
    target: null,
    originalTarget: null,
    
    /**
     * Unique tag to identify the action
     * @type *
     */
    tag: null,
    
    /**
     * Called every frame with it's delta time.
     *
     * @param {Float} dt The delta time
     */
    step: function (dt) {
        window.console.warn("Action.step() Override me");
    },

    /**
     * Called once per frame.
     *
     * @param {Float} time How much of the animation has played. 0.0 = just started, 1.0 just finished.
     */
    update: function (time) {
        window.console.warn("Action.update() Override me");
    },

    /**
     * Called before the action start. It will also set the target.
     *
     * @param {cocos.nodes.Node} target The Node to run the action on
     */
    startWithTarget: function (target) {
        this.target = this.originalTarget = target;
    },

    /**
     * Called after the action has finished. It will set the 'target' to nil.
     * <strong>Important</strong>: You should never call cocos.actions.Action#stop manually.
     * Instead, use cocos.nodes.Node#stopAction(action)
     */
    stop: function () {
        this.target = null;
    },

    /**
     * @getter isDone
     * @type {Boolean} 
     */
    get_isDone: function (key) {
        return true;
    },


    /**
     * Returns a copy of this Action but in reverse
     *
     * @returns {cocos.actions.Action} A new Action in reverse
     */
    reverse: function () {
    }
});

var RepeatForever = Action.extend(/** @lends cocos.actions.RepeatForever# */{
    other: null,

    /**
     * @memberOf cocos.actions
     * @class Repeats an action forever. To repeat the an action for a limited
     * number of times use the cocos.Repeat action.
     * @extends cocos.actions.Action
     * @param {cocos.actions.Action} action An action to repeat forever
     * @constructs
     */
    init: function (action) {
        RepeatForever.superclass.init(this, action);

        this.other = action;
    },

    startWithTarget: function (target) {
        RepeatForever.superclass.startWithTarget.call(this, target);

        this.other.startWithTarget(this.target);
    },

    step: function (dt) {
        this.other.step(dt);
        if (this.other.get('isDone')) {
            var diff = dt - this.other.get('duration') - this.other.get('elapsed');
            this.other.startWithTarget(this.target);

            this.other.step(diff);
        }
    },

    get_isDone: function () {
        return false;
    },

    reverse: function () {
        return RepeatForever.create(this.other.reverse());
    },

    copy: function () {
        return RepeatForever.create(this.other.copy());
    }
});

var FiniteTimeAction = Action.extend(/** @lends cocos.actions.FiniteTimeAction# */{
    /**
     * Number of seconds to run the Action for
     * @type Float
     */
    duration: 2,

    /** 
     * Repeats an action a number of times. To repeat an action forever use the
     * cocos.RepeatForever action.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.Action
     */
    init: function () {
        FiniteTimeAction.superclass.init.call(this);
    },

    /** @ignore */
    reverse: function () {
        console.log('FiniteTimeAction.reverse() Override me');
    }
});

var Speed = Action.extend(/** @lends cocos.actions.Speed# */{
    other: null,
    
    /** 
     * speed of the inner function
     * @type Float
     */
    speed: 1.0,
    
    /** 
     * Changes the speed of an action, making it take longer (speed>1)
     * or less (speed<1) time.
     * Useful to simulate 'slow motion' or 'fast forward' effect.
     * @warning This action can't be Sequenceable because it is not an IntervalAction
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.Action
     */
    init: function(opts) {
        Speed.superclass.init.call(this, opts);
        
        this.other = opts.action;
        this.speed = opts.speed;
    },
    
    startWithTarget: function(target) {
        Speed.superclass.startWithTarget.call(this, target);
        this.other.startWithTarget(this.target);
    },
    
    setSpeed: function(speed) {
        this.speed = speed;
    },
    
    stop: function() {
        this.other.stop();
        Speed.superclass.stop.call(this);
    },
    
    step: function(dt) {
        this.other.step(dt * this.speed);
    },
    
    get_isDone: function() {
        return this.other.get_isDone();
    },
    
    copy: function() {
        return Speed.create({action: this.other.copy(), speed: this.speed});
    },
    
    reverse: function() {
        return Speed.create({action: this.other.reverse(), speed: this.speed});
    }
});

var Follow = Action.extend(/** @lends cocos.actions.Follow# */{
    /**
     * node to follow
     */
    followedNode: null,
    
    /**
     * whether camera should be limited to certain area
     * @type {Boolean}
     */
    boundarySet: false,
    
    /**
     * if screensize is bigger than the boundary - update not needed 
     * @type {Boolean}
     */
    boundaryFullyCovered: false,
    
    /**
     * fast access to the screen dimensions 
     * @type {geometry.Point}
     */
    halfScreenSize: null,
    fullScreenSize: null,
    
    /**
     * world boundaries
     * @type {Float}
     */
    leftBoundary: 0,
    rightBoundary: 0,
    topBoundary: 0,
    bottomBoundary: 0,
    
    /** 
     * @class Follow an action that "follows" a node.
     *
     * Eg:
     * layer.runAction(cocos.actions.Follow.create({target: hero}))
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.Action
     *
     * @opt {cocos.nodes.Node} target
     * @opt {geometry.Rect} worldBoundary
     */
    init: function(opts) {
        Follow.superclass.init.call(this, opts);
        
        this.followedNode = opts.target;
        
        var s = require('../Director').Director.get('sharedDirector').get('winSize');
        this.fullScreenSize = geo.ccp(s.width, s.height);
        this.halfScreenSize = geo.ccpMult(this.fullScreenSize, geo.ccp(0.5, 0.5));
        
        if (opts.worldBoundary !== undefined) {
            this.boundarySet = true;
            this.leftBoundary = -((opts.worldBoundary.origin.x + opts.worldBoundary.size.width) - this.fullScreenSize.x);
            this.rightBoundary = -opts.worldBoundary.origin.x;
            this.topBoundary = -opts.worldBoundary.origin.y;
            this.bottomBoundary = -((opts.worldBoundary.origin.y+opts.worldBoundary.size.height) - this.fullScreenSize.y);
            
            if (this.rightBoundary < this.leftBoundary) {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2;
            }
            if (this.topBoundary < this.bottomBoundary)
            {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2;
            }
            if ((this.topBoundary == this.bottomBoundary) && (this.leftBoundary == this.rightBoundary)) {
                this.boundaryFullyCovered = true;
            }
        }
    },
    
    step: function(dt) {
        if (this.boundarySet) {
            // whole map fits inside a single screen, no need to modify the position - unless map boundaries are increased
            if (this.boundaryFullyCovered) {
                return;
            }
            var tempPos = geo.ccpSub(this.halfScreenSize, this.followedNode.get('position'));
            this.target.set('position', ccp(
                Math.min(Math.max(tempPos.x, this.leftBoundary), this.rightBoundary),
                Math.min(Math.max(tempPos.y, this.bottomBoundary), this.topBoundary))
            );
        } else {
            this.target.set('position', geo.ccpSub(this.halfScreenSize, this.followedNode.get('position')));
        }
    },
    
    get_isDone: function() {
        return !this.followedNode.get('isRunning');
    }
});


exports.Action = Action;
exports.RepeatForever = RepeatForever;
exports.FiniteTimeAction = FiniteTimeAction;
exports.Speed = Speed;
exports.Follow = Follow;

}};
__resources__["/__builtin__/libs/cocos2d/actions/ActionEase.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    ActionInterval = require('./ActionInterval').ActionInterval,
    geo = require('geometry'),
    ccp = geo.ccp;

var ActionEase = ActionInterval.extend(/** @lends cocos.actions.ActionEase# */{
    other: null,
    
    /**
     * @class Base class for Easing actions
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.ActionInterval} action
     */
    init: function(opts) {
        if (!opts.action) {
            throw "Ease: action argument must be non-nil";
        }
        ActionEase.superclass.init.call(this, {duration: opts.action.duration});
        
        this.other = opts.action;
    },
    
    startWithTarget: function(target) {
        ActionEase.superclass.startWithTarget.call(this, target);
        this.other.startWithTarget(this.target);
    },
    
    stop: function() {
        this.other.stop();
        ActionEase.superclass.stop.call(this);
    },
    /*
    update: function(t) {
        this.other.update(t);
    },
    */
    copy: function() {
        return ActionEase.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return ActionEase.create({action: this.other.reverse()});
    }
});

var EaseRate = ActionEase.extend(/** @lends cocos.actions.EaseRate# */{
    /**
     * rate value for the actions 
     * @type {Float} 
     */
    rate: 0,
    
    /**
    * @class Base class for Easing actions with rate parameter
    *
    * @memberOf cocos.actions
    * @constructs
    * @extends cocos.actions.ActionEase
    *
    * @opt {cocos.actions.ActionInterval} action
    * @opt {Float} rate
    */
    init: function(opts) {
        EaseRate.superclass.init.call(this, opts);

        this.rate = opts.rate;
    },
    
    copy: function() {
        return EaseRate.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseRate.create({action: this.other.reverse(), rate: 1 / this.rate});
    }
});

/**
 * @class EaseIn action with a rate
 */
var EaseIn = EaseRate.extend(/** @lends cocos.actions.EaseIn# */{
    update: function(t) {
        this.other.update(Math.pow(t, this.rate));
    },
    
    copy: function() {
        return EaseIn.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseIn.create({action: this.other.reverse(), rate: 1 / this.rate});
    }
});

/**
 * @class EaseOut action with a rate
 */
var EaseOut = EaseRate.extend(/** @lends cocos.actions.EaseOut# */{
    update: function(t) {
        this.other.update(Math.pow(t, 1/this.rate));
    },
    
    copy: function() {
        return EaseOut.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseOut.create({action: this.other.reverse(), rate: 1 / this.rate});
    }
});

/**
 * @class EaseInOut action with a rate
 */
var EaseInOut = EaseRate.extend(/** @lends cocos.actions.EaseInOut# */{
    update: function(t) {
        var sign = 1;
        var r = Math.floor(this.rate);
        if (r % 2 == 0) {
            sign = -1;
        }
        t *= 2;
        if (t < 1) {
            this.other.update(0.5 * Math.pow(t, this.rate));
        } else {
            this.other.update(sign * 0.5 * (Math.pow(t-2, this.rate) + sign * 2));
        }
    },
    
    copy: function() {
        return EaseInOut.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseInOut.create({action: this.other.reverse(), rate: this.rate});
    }
});

/**
 * @class EaseExponentialIn action
 */
var EaseExponentialIn = ActionEase.extend(/** @lends cocos.actions.EaseExponentialIn# */{
    update: function(t) {
        this.other.update((t == 0) ? 0 : (Math.pow(2, 10 * (t/1 - 1)) - 1 * 0.001));
    },
    
    copy: function() {
        return EaseExponentialIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseExponentialOut.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseExponentialOut action
 */
var EaseExponentialOut = ActionEase.extend(/** @lends cocos.actions.EaseExponentialOut# */{
    update: function(t) {
        this.other.update((t == 1) ? 1 : (-Math.pow(2, -10 * t/1) + 1));
    },
    
    copy: function() {
        return EaseExponentialOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseExponentialIn.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseExponentialInOut action
 */
var EaseExponentialInOut = ActionEase.extend(/** @lends cocos.actions.EaseExponentialInOut# */{
    update: function(t) {
        t /= 0.5;
        if (t < 1) {
            t = 0.5 * Math.pow(2, 10 * (t - 1));
        } else {
            t = 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
        }
        this.other.update(t);
    },
    
    copy: function() {
        return EaseExponentialInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseExponentialInOut.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseSineIn action
 */
var EaseSineIn = ActionEase.extend(/** @lends cocos.actions.EaseSineIn# */{
    update: function(t) {
        this.other.update(-1 * Math.cos(t * Math.PI_2) + 1);
    },
    
    copy: function() {
        return EaseSineIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseSineOut.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseSineOut action
 */
var EaseSineOut = ActionEase.extend(/** @lends cocos.actions.EaseSineOut# */{
    update: function(t) {
        this.other.update(Math.sin(t * Math.PI_2));
    },
    
    copy: function() {
        return EaseSineOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseSineIn.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseSineInOut action
 */
var EaseSineInOut = ActionEase.extend(/** @lends cocos.actions.EaseSineInOut# */{
    update: function(t) {
        this.other.update(-0.5 * (Math.cos(t * Math.PI) - 1));
    },
    
    copy: function() {
        return EaseSineInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseSineInOut.create({action: this.other.reverse()});
    }
});

var EaseElastic = ActionEase.extend(/** @lends cocos.actions.EaseElastic# */{
    /**
    * period of the wave in radians. default is 0.3
    * @type {Float}
    */
    period: 0.3,

    /**
    * @class EaseElastic Ease Elastic abstract class
    *
    * @memberOf cocos.actions
    * @constructs
    * @extends cocos.actions.ActionEase
    *
    * @opt {cocos.actions.ActionInterval} action
    * @opt {Float} period
    */
    init: function(opts) {
        EaseElastic.superclass.init.call(this, {action: opts.action});

        if (opts.period !== undefined) {
            this.period = opts.period;
        }
    },

    copy: function() {
        return EaseElastic.create({action: this.other.copy(), period: this.period});
    },

    reverse: function() {
        window.console.warn("EaseElastic reverse(): Override me");
        return null;
    }
});

var EaseElasticIn = EaseElastic.extend(/** @lends cocos.actions.EaseElasticIn# */{
    /** 
     * @class EaseElasticIn Ease Elastic In action
     */
    update: function(t) {
        var newT = 0;
        if (t == 0 || t == 1) {
            newT = t;
        } else {
            var s = this.period / 4;
            t -= 1;
            newT = -Math.pow(2, 10 * t) * Math.sin((t - s) * Math.PI*2 / this.period);
        }
        this.other.update(newT);
    },
    
    // Wish we could use base class's copy
    copy: function() {
        return EaseElasticIn.create({action: this.other.copy(), period: this.period});
    },
    
    reverse: function() {
        return exports.EaseElasticOut.create({action: this.other.reverse(), period: this.period});
    }
});

var EaseElasticOut = EaseElastic.extend(/** @lends cocos.actions.EaseElasticOut# */{
    /** 
     * @class EaseElasticOut Ease Elastic Out action
     */
    update: function(t) {
        var newT = 0;
        if (t == 0 || t == 1) {
            newT = t;
        } else {
            var s = this.period / 4;
            newT = Math.pow(2, -10 * t) * Math.sin((t - s) * Math.PI*2 / this.period) + 1;
        }
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseElasticOut.create({action: this.other.copy(), period: this.period});
    },
    
    reverse: function() {
        return exports.EaseElasticIn.create({action: this.other.reverse(), period: this.period});
    }
});

var EaseElasticInOut = EaseElastic.extend(/** @lends cocos.actions.EaseElasticInOut# */{
    /** 
     * @class EaseElasticInOut Ease Elastic InOut action
     */
    update: function(t) {
        var newT = 0;
        if (t == 0 || t == 1) {
            newT = t;
        } else {
            t *= 2;
            if (this.period == 0) {
                this.period = 0.3 * 1.5;
            }
            var s = this.period / 4;
            
            t -= 1;
            if (t < 0) {
                newT = -0.5 * Math.pow(2, 10 * t) * Math.sin((t - s) * Math.PI*2 / this.period);
            } else {
                newT = Math.pow(2, -10 * t) * Math.sin((t - s) * Math.PI*2 / this.period) * 0.5 + 1;
            }
        }
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseElasticInOut.create({action: this.other.copy(), period: this.period});
    },
    
    reverse: function() {
        return EaseElasticInOut.create({action: this.other.reverse(), period: this.period});
    }
});

var EaseBounce = ActionEase.extend(/** @lends cocos.actions.EaseBounce# */{
    /** 
     * @class EaseBounce abstract class
     */
    bounceTime: function(t) {
        // Direct cut & paste from CCActionEase.m, obviously.
        // Glad someone else figured out all this math...
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }

        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
});

var EaseBounceIn = EaseBounce.extend(/** @lends cocos.actions.EaseBounceIn# */{
    /** 
     * @class EaseBounceIn EaseBounceIn action
     */
    update: function(t) {
        var newT = 1 - this.bounceTime(1-t);
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseBounceIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBounceOut.create({action: this.other.reverse()});
    }
});

var EaseBounceOut = EaseBounce.extend(/** @lends cocos.actions.EaseBounceOut# */{
    /** 
     * @class EaseBounceOut EaseBounceOut action
     */
    update: function(t) {
        var newT = this.bounceTime(t);
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseBounceOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBounceIn.create({action: this.other.reverse()});
    }
});

var EaseBounceInOut = EaseBounce.extend(/** @lends cocos.actions.EaseBounceInOut# */{
    /** 
     * @class EaseBounceInOut EaseBounceInOut action
     */
    update: function(t) {
        var newT = 0;
        if (t < 0.5) {
            t *= 2;
            newT = (1 - this.bounceTime(1 - t)) * 0.5;
        } else {
            newT = this.bounceTime(t * 2 - 1) * 0.5 + 0.5;
        }
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseBounceInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseBounceInOut.create({action: this.other.reverse()});
    }
});

var EaseBackIn = ActionEase.extend(/** @lends cocos.actions.EaseBackIn# */{
    /** 
     * @class EaseBackIn EaseBackIn action
     */
    update: function(t) {
        var overshoot = 1.70158;
        this.other.update(t * t * ((overshoot + 1) * t - overshoot));
    },
    
    copy: function() {
        return EaseBackIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBackOut.create({action: this.other.reverse()});
    }
});

var EaseBackOut = ActionEase.extend(/** @lends cocos.actions.EaseBackOut# */{
    /** 
     * @class EaseBackOut EaseBackOut action
     */
    update: function(t) {
        var overshoot = 1.70158;
        t -= 1;
        this.other.update(t * t * ((overshoot + 1) * t + overshoot) + 1);
    },
    
    copy: function() {
        return EaseBackOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBackIn.create({action: this.other.reverse()});
    }
});

var EaseBackInOut = ActionEase.extend(/** @lends cocos.actions.EaseBackInOut# */{
    /** 
     * @class EaseBackInOut EaseBackInOut action
     */
    update: function(t) {
        // Where do these constants come from?
        var overshoot = 1.70158 * 1.525;
        t *= 2;
        if (t < 1) {
            this.other.update((t * t * ((overshoot + 1) * t - overshoot)) / 2);
        } else {
            t -= 2;
            this.other.update((t * t * ((overshoot + 1) * t + overshoot)) / 2 + 1);
        }
    },
    
    copy: function() {
        return EaseBackInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseBackInOut.create({action: this.other.reverse()});
    }
});

exports.ActionEase = ActionEase;
exports.EaseRate = EaseRate;
exports.EaseIn = EaseIn;
exports.EaseOut = EaseOut;
exports.EaseInOut = EaseInOut;
exports.EaseExponentialIn = EaseExponentialIn;
exports.EaseExponentialOut = EaseExponentialOut;
exports.EaseExponentialInOut = EaseExponentialInOut;
exports.EaseSineIn = EaseSineIn;
exports.EaseSineOut = EaseSineOut;
exports.EaseSineInOut = EaseSineInOut;
exports.EaseElastic = EaseElastic;
exports.EaseElasticIn = EaseElasticIn;
exports.EaseElasticOut = EaseElasticOut;
exports.EaseElasticInOut = EaseElasticInOut;
exports.EaseBounce = EaseBounce;
exports.EaseBounceIn = EaseBounceIn;
exports.EaseBounceOut = EaseBounceOut;
exports.EaseBounceInOut = EaseBounceInOut;
exports.EaseBackIn = EaseBackIn;
exports.EaseBackOut = EaseBackOut;
exports.EaseBackInOut = EaseBackInOut;


}};
__resources__["/__builtin__/libs/cocos2d/actions/ActionInstant.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    act = require('./Action'),
    ccp = require('geometry').ccp;

var ActionInstant = act.FiniteTimeAction.extend(/** @lends cocos.actions.ActionInstant */{
    /**
     * @class Base class for actions that triggers instantly. They have no duration.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.FiniteTimeAction
     * @constructs
     */
    init: function (opts) {
        ActionInstant.superclass.init.call(this, opts);

        this.duration = 0;
    },
    
    get_isDone: function () {
        return true;
    },
    
    step: function (dt) {
        this.update(1);
    },
    
    update: function (t) {
        // ignore
    },
    
    copy: function() {
        return this;
    },
    
    reverse: function () {
        return this.copy();
    }
});

var Show = ActionInstant.extend(/** @lends cocos.actions.Show# */{
    /** 
    * @class Show Show the node
    **/
    startWithTarget: function(target) {
        Show.superclass.startWithTarget.call(this, target);
        this.target.set('visible', true);
    },

    copy: function() {
        return Show.create();
    },
    
    reverse: function() {
        return exports.Hide.create();
    }
});

var Hide = ActionInstant.extend(/** @lends cocos.actions.Hide# */{
    /** 
    * @class Hide Hide the node
    **/
    startWithTarget: function(target) {
        Show.superclass.startWithTarget.call(this, target);
        this.target.set('visible', false);
    },

    copy: function() {
        return Hide.create();
    },
    
    reverse: function() {
        return exports.Show.create();
    }
});

var ToggleVisibility = ActionInstant.extend(/** @lends cocos.actions.ToggleVisibility# */{
    /** 
    * @class ToggleVisibility Toggles the visibility of a node
    **/
    startWithTarget: function(target) {
        ToggleVisibility.superclass.startWithTarget.call(this, target);
        var vis = this.target.get('visible');
        this.target.set('visible', !vis);
    },
    
    copy: function() {
        return ToggleVisibility.create();
    }
});

var FlipX = ActionInstant.extend(/** @lends cocos.actions.FlipX# */{
    flipX: false,

    /**
     * @class FlipX Flips a sprite horizontally
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {Boolean} flipX Should the sprite be flipped
     */
    init: function (opts) {
        FlipX.superclass.init.call(this, opts);

        this.flipX = opts.flipX;
    },
    
    startWithTarget: function (target) {
        FlipX.superclass.startWithTarget.call(this, target);

        target.set('flipX', this.flipX);
    },
    
    reverse: function () {
        return FlipX.create({flipX: !this.flipX});
    },
    
    copy: function () {
        return FlipX.create({flipX: this.flipX});
    }
});

var FlipY = ActionInstant.extend(/** @lends cocos.actions.FlipY# */{
    flipY: false,

    /**
     * @class FlipY Flips a sprite vertically
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {Boolean} flipY Should the sprite be flipped
     */
    init: function (opts) {
        FlipY.superclass.init.call(this, opts);

        this.flipY = opts.flipY;
    },
    
    startWithTarget: function (target) {
        FlipY.superclass.startWithTarget.call(this, target);

        target.set('flipY', this.flipY);
    },
    
    reverse: function () {
        return FlipY.create({flipY: !this.flipY});
    },
    
    copy: function () {
        return FlipY.create({flipY: this.flipY});
    }
});

var Place = ActionInstant.extend(/** @lends cocos.actions.Place# */{
    position: null,
    
    /**
	 * @class Place Places the node in a certain position
	 *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {geometry.Point} position
     */
    init: function(opts) {
        Place.superclass.init.call(this, opts);
        this.set('position', util.copy(opts.position));
    },
    
    startWithTarget: function(target) {
        Place.superclass.startWithTarget.call(this, target);
        this.target.set('position', this.position);
    },
    
    copy: function() {
        return Place.create({position: this.position});
    }
});

var CallFunc = ActionInstant.extend(/** @lends cocos.actions.CallFunc# */{
	callback: null,
    target: null,
    method: null,
    
	/**
	 * @class CallFunc Calls a 'callback'
	 *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {BObject} target
     * @opt {String|Function} method
     */
	init: function(opts) {
		CallFunc.superclass.init.call(this, opts);
		
		// Save target & method so that copy() can recreate callback
		this.target = opts.target;
		this.method = opts.method;
		this.callback = util.callback(this.target, this.method);
	},
	
	startWithTarget: function(target) {
		CallFunc.superclass.startWithTarget.call(this, target);
		this.execute(target);
	},
	
	execute: function(target) {
	    // Pass target to callback
		this.callback.call(this, target);
	},
	
	copy: function() {
	    return CallFunc.create({target: this.target, method: this.method});
	}
});

exports.ActionInstant = ActionInstant;
exports.Show = Show;
exports.Hide = Hide;
exports.ToggleVisibility = ToggleVisibility;
exports.FlipX = FlipX;
exports.FlipY = FlipY;
exports.Place = Place;
exports.CallFunc = CallFunc;


}};
__resources__["/__builtin__/libs/cocos2d/actions/ActionInterval.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    act = require('./Action'),
    geo = require('geometry'),
    ccp = geo.ccp;


var ActionInterval = act.FiniteTimeAction.extend(/** @lends cocos.actions.ActionInterval# */{
    /**
     * Number of seconds that have elapsed
     * @type Float
     */
    elapsed: 0.0,

    _firstTick: true,

    /**
     * Base class actions that do have a finite time duration.
     *
     * Possible actions:
     *
     * - An action with a duration of 0 seconds
     * - An action with a duration of 35.5 seconds Infinite time actions are valid
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.FiniteTimeAction
     *
     * @opt {Float} duration Number of seconds to run action for
     */
    init: function (opts) {
        ActionInterval.superclass.init.call(this, opts);

        var dur = opts.duration || 0;
        if (dur === 0) {
            dur = 0.0000001;
        }

        this.set('duration', dur);
        this.set('elapsed', 0);
        this._firstTick = true;
    },

    get_isDone: function () {
        return (this.elapsed >= this.duration);
    },

    step: function (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }

        this.update(Math.min(1, this.elapsed / this.duration));
    },

    startWithTarget: function (target) {
        ActionInterval.superclass.startWithTarget.call(this, target);

        this.elapsed = 0.0;
        this._firstTick = true;
    },

    copy: function() {
        throw "copy() not implemented";
    },
    
    reverse: function () {
        throw "Reverse Action not implemented";
    }
});

var DelayTime = ActionInterval.extend(/** @lends cocos.actions.DelayTime# */{
    /**
     * @class DelayTime Delays the action a certain amount of seconds
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     */
    update: function (t) {
        if (t === 1.0) {
            this.stop();
        }
    },

    copy: function () {
        return DelayTime.create({duration: this.get('duration')});
    },

    reverse: function () {
        return DelayTime.create({duration: this.get('duration')});
    }
});


var ScaleTo = ActionInterval.extend(/** @lends cocos.actions.ScaleTo# */{
    /**
     * Current X Scale
     * @type Float
     */
    scaleX: 1,

    /**
     * Current Y Scale
     * @type Float
     */
    scaleY: 1,

    /**
     * Initial X Scale
     * @type Float
     */
    startScaleX: 1,

    /**
     * Initial Y Scale
     * @type Float
     */
    startScaleY: 1,

    /**
     * Final X Scale
     * @type Float
     */
    endScaleX: 1,

    /**
     * Final Y Scale
     * @type Float
     */
    endScaleY: 1,

    /**
     * Delta X Scale
     * @type Float
     * @private
     */
    deltaX: 0.0,

    /**
     * Delta Y Scale
     * @type Float
     * @private
     */
    deltaY: 0.0,

    /**
     * @class ScaleTo Scales a cocos.Node object to a zoom factor by modifying it's scale attribute.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} [scale] Size to scale Node to
     * @opt {Float} [scaleX] Size to scale width of Node to
     * @opt {Float} [scaleY] Size to scale height of Node to
     */
    init: function (opts) {
        ScaleTo.superclass.init.call(this, opts);

        if (opts.scale !== undefined) {
            this.endScaleX = this.endScaleY = opts.scale;
        } else {
            this.endScaleX = opts.scaleX;
            this.endScaleY = opts.scaleY;
        }


    },

    startWithTarget: function (target) {
        ScaleTo.superclass.startWithTarget.call(this, target);

        this.startScaleX = this.target.get('scaleX');
        this.startScaleY = this.target.get('scaleY');
        this.deltaX = this.endScaleX - this.startScaleX;
        this.deltaY = this.endScaleY - this.startScaleY;
    },

    update: function (t) {
        if (!this.target) {
            return;
        }

        this.target.set('scaleX', this.startScaleX + this.deltaX * t);
        this.target.set('scaleY', this.startScaleY + this.deltaY * t);
    },

    copy: function () {
        return ScaleTo.create({duration: this.get('duration'),
                                 scaleX: this.get('endScaleX'),
                                 scaleY: this.get('endScaleY')});
    }
});

var ScaleBy = ScaleTo.extend(/** @lends cocos.actions.ScaleBy# */{
    /**
     * @class ScaleBy Scales a cocos.Node object to a zoom factor by modifying it's scale attribute.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ScaleTo
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} [scale] Size to scale Node by
     * @opt {Float} [scaleX] Size to scale width of Node by
     * @opt {Float} [scaleY] Size to scale height of Node by
     */
    init: function (opts) {
        ScaleBy.superclass.init.call(this, opts);
    },

    startWithTarget: function (target) {
        ScaleBy.superclass.startWithTarget.call(this, target);

        this.deltaX = this.startScaleX * this.endScaleX - this.startScaleX;
        this.deltaY = this.startScaleY * this.endScaleY - this.startScaleY;
    },

    reverse: function () {
        return ScaleBy.create({duration: this.get('duration'), scaleX: 1 / this.endScaleX, scaleY: 1 / this.endScaleY});
    }
});


var RotateTo = ActionInterval.extend(/** @lends cocos.actions.RotateTo# */{
    /**
     * Final angle
     * @type Float
     */
    dstAngle: 0,

    /**
     * Initial angle
     * @type Float
     */
    startAngle: 0,

    /**
     * Angle delta
     * @type Float
     */
    diffAngle: 0,

    /**
     * @class RotateTo Rotates a cocos.Node object to a certain angle by modifying its rotation
     * attribute. The direction will be decided by the shortest angle.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} angle Angle in degrees to rotate to
     */
    init: function (opts) {
        RotateTo.superclass.init.call(this, opts);

        this.dstAngle = opts.angle;
    },

    startWithTarget: function (target) {
        RotateTo.superclass.startWithTarget.call(this, target);

        this.startAngle = target.get('rotation');

        if (this.startAngle > 0) {
            this.startAngle = (this.startAngle % 360);
        } else {
            this.startAngle = (this.startAngle % -360);
        }

        this.diffAngle = this.dstAngle - this.startAngle;
        if (this.diffAngle > 180) {
            this.diffAngle -= 360;
        } else if (this.diffAngle < -180) {
            this.diffAngle += 360;
        }
    },

    update: function (t) {
        this.target.set('rotation', this.startAngle + this.diffAngle * t);
    },

    copy: function () {
        return RotateTo.create({duration: this.get('duration'), angle: this.get('dstAngle')});
    }
});

var RotateBy = RotateTo.extend(/** @lends cocos.actions.RotateBy# */{
    /**
     * Number of degrees to rotate by
     * @type Float
     */
    angle: 0,

    /**
     * @class RotateBy Rotates a cocos.Node object to a certain angle by modifying its rotation
     * attribute. The direction will be decided by the shortest angle.
     *
     * @memberOf cocos.action
     * @constructs
     * @extends cocos.actions.RotateTo
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} angle Angle in degrees to rotate by
     */
    init: function (opts) {
        RotateBy.superclass.init.call(this, opts);

        this.angle = opts.angle;
    },

    startWithTarget: function (target) {
        RotateBy.superclass.startWithTarget.call(this, target);

        this.startAngle = this.target.get('rotation');
    },

    update: function (t) {
        this.target.set('rotation', this.startAngle + this.angle * t);
    },

    copy: function () {
        return RotateBy.create({duration: this.get('duration'), angle: this.angle});
    },
    
    reverse: function () {
        return RotateBy.create({duration: this.get('duration'), angle: -this.angle});
    }
});

var MoveTo = ActionInterval.extend(/** @lends cocos.actions.MoveTo# */{
    delta: null,
    startPosition: null,
    endPosition: null,

    /**
     * @class MoveTo Animates moving a cocos.nodes.Node object to a another point.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {geometry.Point} position Destination position
     */
    init: function (opts) {
        MoveTo.superclass.init.call(this, opts);

        this.set('endPosition', util.copy(opts.position));
    },

    startWithTarget: function (target) {
        MoveTo.superclass.startWithTarget.call(this, target);

        this.set('startPosition', util.copy(target.get('position')));
        this.set('delta', geo.ccpSub(this.get('endPosition'), this.get('startPosition')));
    },

    update: function (t) {
        var startPosition = this.get('startPosition'),
            delta = this.get('delta');
        this.target.set('position', ccp(startPosition.x + delta.x * t, startPosition.y + delta.y * t));
    },
    
    copy: function() {
        return MoveTo.create({duration: this.get('duration'), position: this.get('endPosition')});
    }
});

var MoveBy = MoveTo.extend(/** @lends cocos.actions.MoveBy# */{
    /**
     * @class MoveBy Animates moving a cocos.node.Node object by a given number of pixels
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.MoveTo
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {geometry.Point} position Number of pixels to move by
     */
    init: function (opts) {
        MoveBy.superclass.init.call(this, opts);

        this.set('delta', util.copy(opts.position));
    },

    startWithTarget: function (target) {
        var dTmp = this.get('delta');
        MoveBy.superclass.startWithTarget.call(this, target);
        this.set('delta', dTmp);
    },
    
    copy: function() {
         return MoveBy.create({duration: this.get('duration'), position: this.get('delta')});
    },
    
    reverse: function() {
        var delta = this.get('delta');
        return MoveBy.create({duration: this.get('duration'), position: geo.ccp(-delta.x, -delta.y)});
    }
});

var JumpBy = ActionInterval.extend(/** @lends cocos.actions.JumpBy# */{
    /**
     * Number of pixels to jump by
     * @type geometry.Point
     */
    delta: null,
    
    /**
     * Height of jump
     * @type Float
     */
    height: 0,
    
    /**
     * Number of times to jump
     * @type Integer
     */
    jumps: 0,
    
    /**
     * Starting point
     * @type geometry.Point
     */
    startPosition: null,
    
    /**
     * @class JumpBy Moves a CCNode object simulating a parabolic jump movement by modifying it's position attribute.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {geometry.Point} startPosition Point at which jump starts
     * @opt {geometry.Point} delta Number of pixels to jump by
     * @opt {Float} height Height of jump
     * @opt {Int} jumps Number of times to repeat
     */
    init: function(opts) {
        JumpBy.superclass.init.call(this, opts);
        
        this.delta  = util.copy(opts.delta);
        this.height = opts.height;
        this.jumps  = opts.jumps;
    },
    
    copy: function() {
        return JumpBy.create({duration: this.duration, 
                                 delta: this.delta,
                                height: this.height,
                                 jumps: this.jumps});
    },
    
    startWithTarget: function(target) {
        JumpBy.superclass.startWithTarget.call(this, target);
        this.set('startPosition', target.get('position'));
    },
    
    update: function(t) {
        // parabolic jump
        var frac = (t * this.jumps) % 1.0;
        var y = this.height * 4 * frac * (1 - frac);
        y += this.delta.y * t;
        var x = this.delta.x * t;
        this.target.set('position', geo.ccp(this.startPosition.x + x, this.startPosition.y + y));
    },
    
    reverse: function() {
        return JumpBy.create({duration: this.duration,
                                 delta: geo.ccp(-this.delta.x, -this.delta.y),
                                height: this.height,
                                 jumps: this.jumps});
    }
});

var JumpTo = JumpBy.extend(/** @lends cocos.actions.JumpTo# */{
    /**
     * @class JumpTo Moves a Node object to a parabolic position simulating a jump 
     * movement by modifying it's position attribute.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.JumpBy
     */
    startWithTarget: function(target) {
        JumpTo.superclass.startWithTarget.call(this, target);
        this.delta = geo.ccp(this.delta.x - this.startPosition.x, this.delta.y - this.startPosition.y);
    }
});

var BezierBy = ActionInterval.extend(/** @lends cocos.actions.BezierBy# */{
    /**
     * @type {geometry.BezierConfig}
     */
    config: null,
    
    startPosition: null,
    
    /**
     * @class BezierBy An action that moves the target with a cubic Bezier curve by a certain distance.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opts {geometry.BezierConfig} bezier Bezier control points object
     * @opts {Float} duration
     */
    init: function(opts) {
        BezierBy.superclass.init.call(this, opts);
        
        this.config = util.copy(opts.bezier);
    },
    
    startWithTarget: function(target) {
        BezierBy.superclass.startWithTarget.call(this, target);
        this.set('startPosition', this.target.get('position'));
    },
    
    update: function(t) {
        var c = this.get('config');
        var xa = 0,
            xb = c.controlPoint1.x,
            xc = c.controlPoint2.x,
            xd = c.endPosition.x,
            ya = 0,
            yb = c.controlPoint1.y,
            yc = c.controlPoint2.y,
            yd = c.endPosition.y;
        
        var x = BezierBy.bezierat(xa, xb, xc, xd, t);
        var y = BezierBy.bezierat(ya, yb, yc, yd, t);
        
        this.target.set('position', geo.ccpAdd(this.get('startPosition'), geo.ccp(x, y)));
    },
    
    copy: function() {
        return BezierBy.create({bezier: this.get('config'), duration: this.get('duration')});
    },
    
    reverse: function() {
        var c = this.get('config'),
            bc = new geo.BezierConfig();
            
        bc.endPosition = geo.ccpNeg(c.endPosition);
        bc.controlPoint1 = geo.ccpAdd(c.controlPoint2, geo.ccpNeg(c.endPosition));
        bc.controlPoint2 = geo.ccpAdd(c.controlPoint1, geo.ccpNeg(c.endPosition));
        
        return BezierBy.create({bezier: bc, duration: this.get('duration')});
    }
});

util.extend(BezierBy, {
    /**
     * Bezier cubic formula
     * ((1 - t) + t)3 = 1 
     */
    bezierat: function(a, b, c, d, t) {
       return Math.pow(1-t, 3) * a + 
            3 * t * Math.pow(1-t, 2) * b +
            3 * Math.pow(t, 2) * (1 - t) * c +
            Math.pow(t, 3) * d;
    }
});

var BezierTo = BezierBy.extend(/** @lends cocos.actions.BezierTo# */{
    /**
     * @class BezierTo An action that moves the target with a cubic Bezier curve to a destination point.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.BezierBy
     */
    startWithTarget: function(target) {
        BezierTo.superclass.startWithTarget.call(this, target);
        
        var c = this.get('config');
        c.controlPoint1 = geo.ccpSub(c.controlPoint1, this.get('startPosition'));
        c.controlPoint2 = geo.ccpSub(c.controlPoint2, this.get('startPosition'));
        c.endPosition = geo.ccpSub(c.endPosition, this.get('startPosition'));
    }
});

var Blink = ActionInterval.extend(/** @lends cocos.actions.Blink# */{
    /**
     * @type {Integer}
     */
    times: 1,
    
    /**
     * @class Blink Blinks a Node object by modifying it's visible attribute
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opts {Integer} blinks Number of times to blink
     * @opts {Float} duration
     */
    init: function(opts) {
        Blink.superclass.init.call(this, opts);
        this.times = opts.blinks;
    },
    
    update: function(t) {
        if (! this.get_isDone()) {
            var slice = 1 / this.times;
            var m = t % slice;
            this.target.set('visible', (m > slice/2));
        }
    },
    
    copy: function() {
        return Blink.create({duration: this.get('duration'), blinks: this.get('times')});
    },
    
    reverse: function() {
        return this.copy();
    }
});

var FadeOut = ActionInterval.extend(/** @lends cocos.actions.FadeOut# */{
   /**
    * @class FadeOut Fades out a cocos.nodes.Node to zero opacity
    *
    * @memberOf cocos.actions
    * @extends cocos.actions.ActionInterval
    */     
    update: function (t) {
        var target = this.get('target');
        if (!target) return;
        target.set('opacity', 255 - (255 * t));
    },

    copy: function () {
        return FadeOut.create({duration: this.get('duration')});
    },
    
    reverse: function () {
        return exports.FadeIn.create({duration: this.get('duration')});
    }
});


var FadeIn = ActionInterval.extend(/** @lends cocos.actions.FadeIn# */{
    /**
     * @class FadeIn Fades in a cocos.nodes.Node to 100% opacity
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInterval
     */
    update: function (t) {
        var target = this.get('target');
        if (!target) return;
        target.set('opacity', t * 255);
    },

    copy: function () {
        return FadeIn.create({duration: this.get('duration')});
    },
    
    reverse: function () {
        return exports.FadeOut.create({duration: this.get('duration')});
    }
});

var FadeTo = ActionInterval.extend(/** @lends cocos.actions.FadeTo# */{
    /**
     * The final opacity
     * @type Float
     */
    toOpacity: null,

    /**
     * The initial opacity
     * @type Float
     */
    fromOpacity: null,

    /**
     * @class FadeTo Fades a cocos.nodes.Node to a given opacity
     *
     * @memberOf cocos.actions
     * @constructor
     * @extends cocos.actions.ActionInterval
     */
    init: function (opts) {
        FadeTo.superclass.init.call(this, opts);
        this.set('toOpacity', opts.toOpacity);
    },

    startWithTarget: function (target) {
        FadeTo.superclass.startWithTarget.call(this, target);
        this.set('fromOpacity', this.target.get('opacity'));
    },

    update: function (t) {
        var target = this.get('target');
        if (!target) return;

        target.set('opacity', this.fromOpacity + ( this.toOpacity - this.fromOpacity ) * t);
    },
    
    copy: function() {
        return FadeTo.create({duration: this.get('duration'), toOpacity: this.get('toOpacity')});
    }
});

var Sequence = ActionInterval.extend(/** @lends cocos.actions.Sequence# */{
    /**
     * Array of actions to run
     * @type cocos.nodes.Node[]
     */
    actions: null,

    split: 0,
    last: 0,
    
    /**
     * Runs a pair of actions sequentially, one after another
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.FiniteTimeAction} one 1st action to run
     * @opt {cocos.actions.FiniteTimeAction} two 2nd action to run
     */
    init: function (opts) {
        if (!opts.one) {
            throw "Sequence argument one must be non-nil";
        }
        if (!opts.two) {
            throw "Sequence argument two must be non-nil";
        }
        this.actions = [];
        
        var d = opts.one.get('duration') + opts.two.get('duration');
        
        Sequence.superclass.init.call(this, {duration: d});
        
        this.actions[0] = opts.one;
        this.actions[1] = opts.two;
    },
    
    startWithTarget: function (target) {
        Sequence.superclass.startWithTarget.call(this, target);
        this.split = this.actions[0].get('duration') / this.get('duration');
        this.last = -1;
    },

    stop: function () {
        this.actions[0].stop();
        this.actions[1].stop();
        Sequence.superclass.stop.call(this);
    },

    update: function (t) {
        // This is confusing but will hopefully work better in conjunction
        // with modifer actions like Repeat & Spawn...
        var found = 0;
        var new_t = 0;
        
        if (t >= this.split) {
            found = 1;
            if (this.split == 1) {
                new_t = 1;
            } else {
                new_t = (t - this.split) / (1 - this.split);
            }
        } else {
            found = 0;
            if (this.split != 0) {
                new_t = t / this.split;
            } else {
                new_t = 1;
            }
        }
        if (this.last == -1 && found == 1) {
            this.actions[0].startWithTarget(this.target);
            this.actions[0].update(1);
            this.actions[0].stop();
        }
        if (this.last != found) {
            if (this.last != -1) {
                this.actions[this.last].update(1);
                this.actions[this.last].stop();
            }
            this.actions[found].startWithTarget(this.target);
        }
        this.actions[found].update(new_t);
        this.last = found;
    },

    copy: function () {
        // Constructor will copy actions 
        return Sequence.create({actions: this.get('actions')});
    },

    reverse: function() {
        return Sequence.create({actions: [this.actions[1].reverse(), this.actions[0].reverse()]});
    }
});

util.extend(Sequence, {
    /** 
     * Override BObject.create in order to implement recursive construction
     * of actions array
     */
    create: function() {
        // Don't copy actions array, copy the actions
        var actions = arguments[0].actions;
        var prev = actions[0].copy();
        
        // Recursively create Sequence with pair of actions
        for (var i=1; i<actions.length; i++) {
            var now = actions[i].copy();
            if (now) {
                prev = this.initFromPair(prev, now);
            } else {
                break;
            }
        }
        return prev;
    },
    
    /** 
     * Create sequence object from a pair of actions
     */
    initFromPair: function(a1, a2) {
        var ret = new this();
        ret.init.apply(ret, [{one: a1, two: a2}]);
        return ret;
    }
});

var Repeat = ActionInterval.extend(/** @lends cocos.actions.Repeat# */{
    times: 1,
    total: 0,
    other: null,
    
    /**
     * @class Repeat Repeats an action a number of times.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.FiniteTimeAction} action Action to repeat
     * @opt {Number} times Number of times to repeat
     */
     init: function(opts) {
         var d = opts.action.get('duration') * opts.times;

         Repeat.superclass.init.call(this, {duration: d});
         
         this.times = opts.times;
         this.other = opts.action.copy();
         this.total = 0;
     },
     
     startWithTarget: function(target) {
         this.total = 0;
         Repeat.superclass.startWithTarget.call(this, target);
         this.other.startWithTarget(target);
     },
     
     stop: function() {
         this.other.stop();
         Repeat.superclass.stop.call(this);
     },
     
     update: function(dt) {
         var t = dt * this.times;
         
         if (t > (this.total+1)) {
             this.other.update(1);
             this.total += 1;
             this.other.stop();
             this.other.startWithTarget(this.target);
             
             // If repeat is over
             if (this.total == this.times) {
                 // set it in the original position
                 this.other.update(0);
             } else {
                 // otherwise start next repeat
                 this.other.update(t - this.total);
             }
         } else {
             var r = t % 1.0;
             
             // fix last repeat position otherwise it could be 0
             if (dt == 1) {
                 r = 1;
                 this.total += 1;
             }
             this.other.update(Math.min(r, 1));
         }
     },
     
     get_isDone: function() {
         return this.total == this.times;
     },
     
     copy: function() {
         // Constructor copies action
         return Repeat.create({action: this.other, times: this.times});
     },
     
     reverse: function() {
         return Repeat.create({action: this.other.reverse(), times: this.times});
     }
});

var Spawn = ActionInterval.extend(/** @lends cocos.actions.Spawn# */{
    one: null,
    two: null,

    /**
     * @class Spawn Executes multiple actions simultaneously
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.FiniteTimeAction} one: first action to spawn
     * @opt {cocos.actions.FiniteTimeAction} two: second action to spawn
     */
    init: function (opts) {
        var action1 = opts.one, 
            action2 = opts.two;
            
        if (!action1 || !action2) {
            throw "cocos.actions.Spawn: required actions missing";
        }
        var d1 = action1.get('duration'), 
            d2 = action2.get('duration');
        
        Spawn.superclass.init.call(this, {duration: Math.max(d1, d2)});
        
        this.set('one', action1);
        this.set('two', action2);
        
        if (d1 > d2) {
            this.set('two', Sequence.create({actions: [
                action2, 
                DelayTime.create({duration: d1-d2})
            ]}));
        } else if (d1 < d2) {
            this.set('one', Sequence.create({actions: [
                action1,
                DelayTime.create({duration: d2-d1})
            ]}));
        }
    },
    
    startWithTarget: function (target) {
        Spawn.superclass.startWithTarget.call(this, target);
        this.get('one').startWithTarget(this.target);
        this.get('two').startWithTarget(this.target);
    },
    
    stop: function () {
        this.get('one').stop();
        this.get('two').stop();
        Spawn.superclass.stop.call(this);
    },
    
    step: function (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }
        this.get('one').step(dt);
        this.get('two').step(dt);
    },
    
    update: function (t) {
        this.get('one').update(t);
        this.get('two').update(t);
    },
    
    copy: function () {
        return Spawn.create({one: this.get('one').copy(), two: this.get('two').copy()});
    },
    
    reverse: function () {
        return Spawn.create({one: this.get('one').reverse(), two: this.get('two').reverse()});
    }
});

util.extend(Spawn, {
    /**
     * Helper class function to create Spawn object from array of actions
     *
     * @opt {Array} actions: list of actions to run simultaneously
     */
    initWithActions: function (opts) {
        var now, prev = opts.actions.shift();
        while (opts.actions.length > 0) {
            now = opts.actions.shift();
            if (now) {
                prev = this.create({one: prev, two: now});
            } else {
                break;
            }
        }
        return prev;
    }
});

var Animate = ActionInterval.extend(/** @lends cocos.actions.Animate# */{
    animation: null,
    restoreOriginalFrame: true,
    origFrame: null,


    /**
     * Animates a sprite given the name of an Animation
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {cocos.Animation} animation Animation to run
     * @opt {Boolean} [restoreOriginalFrame=true] Return to first frame when finished
     */
    init: function (opts) {
        this.animation = opts.animation;
        this.restoreOriginalFrame = opts.restoreOriginalFrame !== false;
        opts.duration = this.animation.frames.length * this.animation.delay;

        Animate.superclass.init.call(this, opts);
    },

    startWithTarget: function (target) {
        Animate.superclass.startWithTarget.call(this, target);

        if (this.restoreOriginalFrame) {
            this.set('origFrame', this.target.get('displayedFrame'));
        }
    },

    stop: function () {
        if (this.target && this.restoreOriginalFrame) {
            var sprite = this.target;
            sprite.set('displayFrame', this.origFrame);
        }

        Animate.superclass.stop.call(this);
    },

    update: function (t) {
        var frames = this.animation.get('frames'),
            numberOfFrames = frames.length,
            idx = Math.floor(t * numberOfFrames);

        if (idx >= numberOfFrames) {
            idx = numberOfFrames - 1;
        }

        var sprite = this.target;
        if (!sprite.isFrameDisplayed(frames[idx])) {
            sprite.set('displayFrame', frames[idx]);
        }
    },

    copy: function () {
        return Animate.create({animation: this.animation, restoreOriginalFrame: this.restoreOriginalFrame});
    }

});

exports.ActionInterval = ActionInterval;
exports.DelayTime = DelayTime;
exports.ScaleTo = ScaleTo;
exports.ScaleBy = ScaleBy;
exports.RotateTo = RotateTo;
exports.RotateBy = RotateBy;
exports.MoveTo = MoveTo;
exports.MoveBy = MoveBy;
exports.JumpBy = JumpBy;
exports.JumpTo = JumpTo;
exports.BezierBy = BezierBy;
exports.BezierTo = BezierTo;
exports.Blink = Blink;
exports.FadeIn = FadeIn;
exports.FadeOut = FadeOut;
exports.FadeTo = FadeTo;
exports.Spawn = Spawn;
exports.Sequence = Sequence;
exports.Repeat = Repeat;
exports.Animate = Animate;

}};
__resources__["/__builtin__/libs/cocos2d/actions/index.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path');

var modules = 'Action ActionInterval ActionInstant ActionEase'.w();

/**
 * @memberOf cocos
 * @namespace Actions used to animate or change a Node
 */
var actions = {};

util.each(modules, function (mod, i) {
    util.extend(actions, require('./' + mod));
});

module.exports = actions;

}};
__resources__["/__builtin__/libs/cocos2d/Animation.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util');

var Animation = BObject.extend(/** @lends cocos.Animation# */{
    name: null,
    delay: 0.0,
    frames: null,

    /** 
     * A cocos.Animation object is used to perform animations on the Sprite objects.
     * 
     * The Animation object contains cocos.SpriteFrame objects, and a possible delay between the frames.
     * You can animate a cocos.Animation object by using the cocos.actions.Animate action.
     * 
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {cocos.SpriteFrame[]} frames Frames to animate
     * @opt {Float} [delay=0.0] Delay between each frame
     * 
     * @example
     * var animation = cocos.Animation.create({frames: [f1, f2, f3], delay: 0.1});
     * sprite.runAction(cocos.actions.Animate.create({animation: animation}));
     */
    init: function (opts) {
        Animation.superclass.init.call(this, opts);

        this.frames = opts.frames || [];
        this.delay  = opts.delay  || 0.0;
    }
});

exports.Animation = Animation;

}};
__resources__["/__builtin__/libs/cocos2d/AnimationCache.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Plist = require('Plist').Plist;

var AnimationCache = BObject.extend(/** @lends cocos.AnimationCache# */{
    /**
     * Cached animations
     * @type Object
     */
    animations: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        AnimationCache.superclass.init.call(this);

        this.set('animations', {});
    },

    /**
     * Add an animation to the cache
     *
     * @opt {String} name Unique name of the animation
     * @opt {cocos.Animcation} animation Animation to cache
     */
    addAnimation: function (opts) {
        var name = opts.name,
            animation = opts.animation;

        this.get('animations')[name] = animation;
    },

    /**
     * Remove an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     */
    removeAnimation: function (opts) {
        var name = opts.name;

        delete this.get('animations')[name];
    },

    /**
     * Get an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     * @returns {cocos.Animation} Cached animation
     */
    getAnimation: function (opts) {
        var name = opts.name;

        return this.get('animations')[name];
    }
});

/**
 * Class methods
 */
util.extend(AnimationCache, /** @lends cocos.AnimationCache */{
    /**
     * @getter sharedAnimationCache
     * @type cocos.AnimationCache
     */
    get_sharedAnimationCache: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.AnimationCache = AnimationCache;

}};
__resources__["/__builtin__/libs/cocos2d/Director.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS SHOW_REDRAW_REGIONS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp,
    events    = require('events'),
    Scheduler = require('./Scheduler').Scheduler,
    EventDispatcher = require('./EventDispatcher').EventDispatcher,
    Scene = require('./nodes/Scene').Scene;


/**
 * requestAnimationFrame for smart animating
 * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function (){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function (callback) {
                window.setTimeout(callback, 1000 / 30);
            };
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame           ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame    ||
        window.oCancelRequestAnimationFrame      ||
        window.msCancelRequestAnimationFrame     ||
        clearTimeout
} )();

var Director = BObject.extend(/** @lends cocos.Director# */{
    backgroundColor: 'rgb(0, 0, 0)',
    canvas: null,
    context: null,
    sceneStack: null,
    winSize: null,
    isPaused: false,
    maxFrameRate: 30,
    displayFPS: false,
    preloadScene: null,
    isReady: false,
    buffer: null,
    bufferCtx: null,
    swallowKeys: true,

    // Time delta
    dt: 0,
    add: 0,
    nextDeltaTimeZero: false,
    lastUpdate: 0,

    _nextScene: null,

    /**
     * <p>Creates and handles the main view and manages how and when to execute the
     * Scenes.</p>
     *
     * <p>This class is a singleton so don't instantiate it yourself, instead use
     * cocos.Director.get('sharedDirector') to return the instance.</p>
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        Director.superclass.init.call(this);

        this.set('sceneStack', []);
    },

    /**
     * Append to a HTML element. It will create a canvas tag
     *
     * @param {HTMLElement} view Any HTML element to add the application to
     */
    attachInView: function (view) {
        if (!view.tagName) {
            throw "Director.attachInView must be given a HTML DOM Node";
        }

        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }


        var canvas = document.createElement('canvas');
        this.set('canvas', canvas);
        canvas.setAttribute('width', view.clientWidth);
        canvas.setAttribute('height', view.clientHeight);

        var context = canvas.getContext('2d');
        this.set('context', context);
        
        var buffer = document.createElement('canvas');
        this.set('buffer', buffer);
        buffer.setAttribute('width', view.clientWidth);
        buffer.setAttribute('height', view.clientHeight);
        
        this.set('bufferCtx', buffer.getContext('2d'));

        if (FLIP_Y_AXIS) {
            context.translate(0, view.clientHeight);
            context.scale(1, -1);
        }

        view.appendChild(canvas);

        this.set('winSize', {width: view.clientWidth, height: view.clientHeight});


        // Setup event handling

        // Mouse events
        var eventDispatcher = EventDispatcher.get('sharedDispatcher');
        var self = this;
        function mouseDown(evt) {
            evt.locationInWindow = ccp(evt.clientX, evt.clientY);
            evt.locationInCanvas = self.convertEventToCanvas(evt);

            function mouseDragged(evt) {
                evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = self.convertEventToCanvas(evt);

                eventDispatcher.mouseDragged(evt);
            }
            function mouseUp(evt) {
                evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = self.convertEventToCanvas(evt);

                document.body.removeEventListener('mousemove', mouseDragged, false);
                document.body.removeEventListener('mouseup',   mouseUp,   false);


                eventDispatcher.mouseUp(evt);
            }

            document.body.addEventListener('mousemove', mouseDragged, false);
            document.body.addEventListener('mouseup',   mouseUp,   false);

            eventDispatcher.mouseDown(evt);
        }
        function mouseMoved(evt) {
            evt.locationInWindow = ccp(evt.clientX, evt.clientY);
            evt.locationInCanvas = self.convertEventToCanvas(evt);

            eventDispatcher.mouseMoved(evt);
        }
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mousemove', mouseMoved, false);

        var that = this;
        
        // Keyboard events
        function keyDown(evt) {
            this._keysDown = this._keysDown || {};
            eventDispatcher.keyDown(evt);
            
            if(that.swallowKeys) {
                evt.preventDefault(); 
                evt.cancelBubble = true;
                return false;
            }
        }
        function keyUp(evt) {
            eventDispatcher.keyUp(evt);
            
            if(that.swallowKeys) {
                evt.preventDefault(); 
                evt.cancelBubble = true;
                return false;
            }
        }

        document.documentElement.addEventListener('keydown', keyDown, false);
        document.documentElement.addEventListener('keyup', keyUp, false);
    },

    runPreloadScene: function () {
        var preloader = this.get('preloadScene');
        if (!preloader) {
            var PreloadScene = require('./nodes/PreloadScene').PreloadScene;
            preloader = PreloadScene.create();
            this.set('preloadScene', preloader);
        }

        events.addListener(preloader, 'complete', util.callback(this, function (preloader) {
            this.isReady = true;
            events.trigger(this, 'ready', this);
        }));

        this.pushScene(preloader);
        this.startAnimation();
    },

    /**
     * Enters the Director's main loop with the given Scene. Call it to run
     * only your FIRST scene. Don't call it if there is already a running
     * scene.
     *
     * @param {cocos.Scene} scene The scene to start
     */
    runWithScene: function (scene) {
        if (!(scene instanceof Scene)) {
            throw "Director.runWithScene must be given an instance of Scene";
        }

        if (this._runningScene) {
            throw "You can't run a Scene if another Scene is already running. Use replaceScene or pushScene instead";
        }

        this.pushScene(scene);
        this.startAnimation();
    },

    /**
     * Replaces the running scene with a new one. The running scene is
     * terminated. ONLY call it if there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to replace with
     */
    replaceScene: function (scene) {
        var index = this.sceneStack.length;

        this._sendCleanupToScene = true;
        this.sceneStack.pop();
        this.sceneStack.push(scene);
        this._nextScene = scene;
    },

    /**
     * Pops out a scene from the queue. This scene will replace the running
     * one. The running scene will be deleted. If there are no more scenes in
     * the stack the execution is terminated. ONLY call it if there is a
     * running scene.
     */
    popScene: function () {
    },

    /**
     * Suspends the execution of the running scene, pushing it on the stack of
     * suspended scenes. The new scene will be executed. Try to avoid big
     * stacks of pushed scenes to reduce memory allocation. ONLY call it if
     * there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to add to the stack
     */
    pushScene: function (scene) {
        this._nextScene = scene;
    },

    /**
     * The main loop is triggered again. Call this function only if
     * cocos.Directory#stopAnimation was called earlier.
     */
    startAnimation: function () {
        this.animate();
    },

    animate: function() {
        //this._animationTimer = setInterval(util.callback(this, 'drawScene'), 33);
        if(this.drawScene != null) {
            this.drawScene();
            window.requestAnimFrame(util.callback(this, 'animate'), this.canvas);
        }
    },

    /**
     * Stops the animation. Nothing will be drawn. The main loop won't be
     * triggered anymore. If you want to pause your animation call
     * cocos.Directory#pause instead.
     */
    stopAnimation: function () {
        if (this._animationTimer) {
            clearInterval(this._animationTimer);
            this._animationTimer = null;
        }
        else {
            window.cancelRequestAnimFrame()
        }
    },

    /**
     * Calculate time since last call
     * @private
     */
    calculateDeltaTime: function () {
        var now = (new Date()).getTime() / 1000;

        if (this.nextDeltaTimeZero) {
            this.dt = 0;
            this.nextDeltaTimeZero = false;
        }

        this.dt = Math.max(0, now - this.lastUpdate);

        this.lastUpdate = now;
    },

    /**
     * The main run loop
     * @private
     */
    drawScene: function () {
        this.calculateDeltaTime();
        
        this.realDt = this.dt;
        
        if(this.dt > 0.133) {
            this.dt /= 2;
        }
        if(this.dt > 0.066) {
            this.dt /= 2;
        }
        
        if (!this.isPaused) {
            Scheduler.get('sharedScheduler').tick(this.dt);
        }

        var context = this.get('context');
        //context.clearRect(0, 0, this.winSize.width, this.winSize.height);
        this.get('bufferCtx').clearRect(0, 0, this.winSize.width, this.winSize.height);

        if (this._nextScene) {
            this.setNextScene();
        }

        var rect = new geo.Rect(0, 0, this.winSize.width, this.winSize.height);

        if (rect) {
            context.beginPath();
            context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
            context.clip();
            context.closePath();
        }
        
        //this._runningScene.visit(context, rect);
        this._runningScene.visit(this.get('bufferCtx'), rect);
        context.drawImage(this.buffer, 0, 0);

        if (SHOW_REDRAW_REGIONS) {
            if (rect) {
                context.beginPath();
                context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                context.fillStyle = "rgba(255, 0, 0, 0.5)";
                //context.fill();
                context.closePath();
            }
        }

        if (this.get('displayFPS')) {
            this.showFPS();
        }
    },

    /**
     * Initialises the next scene
     * @private
     */
    setNextScene: function () {
        // TODO transitions

        if (this._runningScene) {
            this._runningScene.onExit();
            if (this._sendCleanupToScene) {
                this._runningScene.cleanup();
            }
        }

        this._runningScene = this._nextScene;

        this._nextScene = null;

        this._runningScene.onEnter();
    },

    convertEventToCanvas: function (evt) {
        var x = this.canvas.offsetLeft - document.documentElement.scrollLeft,
            y = this.canvas.offsetTop - document.documentElement.scrollTop;

        var o = this.canvas;
        while ((o = o.offsetParent)) {
            x += o.offsetLeft - o.scrollLeft;
            y += o.offsetTop - o.scrollTop;
        }

        var p = geo.ccpSub(evt.locationInWindow, ccp(x, y));
        if (FLIP_Y_AXIS) {
            p.y = this.canvas.height - p.y;
        }

        return p;
    },

    showFPS: function () {
        if (!this._fpsLabel) {
            var Label = require('./nodes/Label').Label;
            this._fpsLabel = Label.create({string: '', fontSize: 16});
            this._fpsLabel.set('anchorPoint', ccp(0, 1));
            this._frames = 0;
            this._accumDt = 0;
        }


        this._frames++;
        this._accumDt += this.get('dt');
        
        if (this._accumDt > 1.0 / 3.0)  {
            var frameRate = this._frames / this._accumDt;
            this._frames = 0;
            this._accumDt = 0;

            this._fpsLabel.set('string', 'FPS: ' + (Math.round(frameRate * 100) / 100).toString());
        }


        var s = this.get('winSize');
        this._fpsLabel.set('position', ccp(10, s.height - 10));

        this._fpsLabel.visit(this.get('context'));
    }

});

/**
 * Class methods
 */
util.extend(Director, /** @lends cocos.Director */{
    /**
     * A shared singleton instance of cocos.Director
     *
     * @getter sharedDirector
     * @type cocos.Director
     */
    get_sharedDirector: function (key) {
        if (!Director._instance) {
            Director._instance = this.create();
        }

        return Director._instance;
    }
});

/**
 * @memberOf cocos
 * @class Pretends to run at a constant frame rate even if it slows down
 * @extends cocos.Director
 */
var DirectorFixedSpeed = Director.extend(/** @lends cocos.DirectorFixedSpeed */{
    /**
     * Frames per second to draw.
     * @type Integer
     */
    frameRate: 60,

    /**
     * Calculate time since last call
     * @private
     */
    calculateDeltaTime: function () {
        if (this.nextDeltaTimeZero) {
            this.dt = 0;
            this.nextDeltaTimeZero = false;
        }

        this.dt = 1.0 / this.get('frameRate');
    },

    /**
     * The main loop is triggered again. Call this function only if
     * cocos.Directory#stopAnimation was called earlier.
     */
    startAnimation: function () {
        this._animationTimer = setInterval(util.callback(this, 'drawScene'), 1000 / this.get('frameRate'));
        this.drawScene();
    }

});

exports.Director = Director;
exports.DirectorFixedSpeed = DirectorFixedSpeed;

}};
__resources__["/__builtin__/libs/cocos2d/EventDispatcher.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry');

var EventDispatcher = BObject.extend(/** @lends cocos.EventDispatcher# */{
    dispatchEvents: true,
    keyboardDelegates: null,
    mouseDelegates: null,
    _keysDown: null,
    
    /**
     * This singleton is responsible for dispatching Mouse and Keyboard events.
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        EventDispatcher.superclass.init.call(this);

        this.keyboardDelegates = [];
        this.mouseDelegates = [];

        this._keysDown = {};
    },

    addDelegate: function (opts) {
        var delegate = opts.delegate,
            priority = opts.priority,
            flags    = opts.flags,
            list     = opts.list;

        var listElement = {
            delegate: delegate,
            priority: priority,
            flags: flags
        };

        var added = false;
        for (var i = 0; i < list.length; i++) {
            var elem = list[i];
            if (priority < elem.priority) {
                // Priority is lower, so insert before elem
                list.splice(i, 0, listElement);
                added = true;
                break;
            }
        }

        // High priority; append to array
        if (!added) {
            list.push(listElement);
        }
    },

    removeDelegate: function (opts) {
        var delegate = opts.delegate,
            list = opts.list;

        var idx = -1,
            i;
        for (i = 0; i < list.length; i++) {
            var l = list[i];
            if (l.delegate == delegate) {
                idx = i;
                break;
            }
        }
        if (idx == -1) {
            return;
        }
        list.splice(idx, 1);
    },
    removeAllDelegates: function (opts) {
        var list = opts.list;

        list.splice(0, list.length - 1);
    },

    addMouseDelegate: function (opts) {
        var delegate = opts.delegate,
            priority = opts.priority;

        var flags = 0;

        // TODO flags

        this.addDelegate({delegate: delegate, priority: priority, flags: flags, list: this.mouseDelegates});
    },

    removeMouseDelegate: function (opts) {
        var delegate = opts.delegate;

        this.removeDelegate({delegate: delegate, list: this.mouseDelegates});
    },

    removeAllMouseDelegate: function () {
        this.removeAllDelegates({list: this.mouseDelegates});
    },

    addKeyboardDelegate: function (opts) {
        var delegate = opts.delegate,
            priority = opts.priority;

        var flags = 0;

        // TODO flags

        this.addDelegate({delegate: delegate, priority: priority, flags: flags, list: this.keyboardDelegates});
    },

    removeKeyboardDelegate: function (opts) {
        var delegate = opts.delegate;

        this.removeDelegate({delegate: delegate, list: this.keyboardDelegates});
    },

    removeAllKeyboardDelegate: function () {
        this.removeAllDelegates({list: this.keyboardDelegates});
    },



    // Mouse Events

    mouseDown: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        this._previousMouseMovePosition = geo.ccp(evt.clientX, evt.clientY);
        this._previousMouseDragPosition = geo.ccp(evt.clientX, evt.clientY);

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseDown) {
                var swallows = entry.delegate.mouseDown(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },
    mouseMoved: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        if (this._previousMouseMovePosition) {
            evt.deltaX = evt.clientX - this._previousMouseMovePosition.x;
            evt.deltaY = evt.clientY - this._previousMouseMovePosition.y;
            if (FLIP_Y_AXIS) {
                evt.deltaY *= -1;
            }
        } else {
            evt.deltaX = 0;
            evt.deltaY = 0;
        }
        this._previousMouseMovePosition = geo.ccp(evt.clientX, evt.clientY);

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseMoved) {
                var swallows = entry.delegate.mouseMoved(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },
    mouseDragged: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        if (this._previousMouseDragPosition) {
            evt.deltaX = evt.clientX - this._previousMouseDragPosition.x;
            evt.deltaY = evt.clientY - this._previousMouseDragPosition.y;
            if (FLIP_Y_AXIS) {
                evt.deltaY *= -1;
            }
        } else {
            evt.deltaX = 0;
            evt.deltaY = 0;
        }
        this._previousMouseDragPosition = geo.ccp(evt.clientX, evt.clientY);

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseDragged) {
                var swallows = entry.delegate.mouseDragged(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },
    mouseUp: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseUp) {
                var swallows = entry.delegate.mouseUp(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },

    // Keyboard events
    keyDown: function (evt) {
        var kc = evt.keyCode;
        if (!this.dispatchEvents || this._keysDown[kc]) {
            return;
        }

        this._keysDown[kc] = true;

        for (var i = 0; i < this.keyboardDelegates.length; i++) {
            var entry = this.keyboardDelegates[i];
            if (entry.delegate.keyDown) {
                var swallows = entry.delegate.keyDown(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },

    keyUp: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        var kc = evt.keyCode;
        if (this._keysDown[kc]) {
            delete this._keysDown[kc];
        }

        for (var i = 0; i < this.keyboardDelegates.length; i++) {
            var entry = this.keyboardDelegates[i];
            if (entry.delegate.keyUp) {
                var swallows = entry.delegate.keyUp(evt);
                if (swallows) {
                    break;
                }
            }
        }
    }

});

/**
 * Class methods
 */
util.extend(EventDispatcher, /** @lends cocos.EventDispatcher */{
    /**
     * A shared singleton instance of cocos.EventDispatcher
     *
     * @getter sharedDispatcher
     * @type cocos.EventDispatcher
     */
    get_sharedDispatcher: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});
exports.EventDispatcher = EventDispatcher;

}};
__resources__["/__builtin__/libs/cocos2d/index.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path');

var modules = 'TextureAtlas Texture2D Preloader RemoteImage RemoteResource SpriteFrame SpriteFrameCache Director Animation AnimationCache Scheduler ActionManager TMXXMLParser'.w();

/**
 * @namespace All cocos2d objects live in this namespace
 */
var cocos = {
    nodes: require('./nodes'),
    actions: require('./actions')
};

util.each(modules, function (mod, i) {
    util.extend(cocos, require('./' + mod));
});

module.exports = cocos;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/AtlasNode.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var SpriteBatchNode = require('./BatchNode').SpriteBatchNode,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    geo   = require('geometry');

var AtlasNode = SpriteBatchNode.extend(/** @lends cocos.AtlasNode# */{
    /**
     * Characters per row
     * @type Integer
     */
    itemsPerRow: 0,

    /**
     * Characters per column
     * @type Integer
     */
    itemsPerColumn: 0,

    /**
     * Width of a character
     * @type Integer
     */
    itemWidth: 0,

    /**
     * Height of a character
     * @type Integer
     */
    itemHeight: 0,


    /**
     * @type cocos.TextureAtlas
     */
     textureAtlas: null,

    /**
     * @class
     * It knows how to render a TextureAtlas object. If you are going to
     * render a TextureAtlas consider subclassing cocos.nodes.AtlasNode (or a
     * subclass of cocos.nodes.AtlasNode)
     * @memberOf cocos
     * @extends cocos.nodes.SpriteBatchNode
     * @constructs
     *
     * @opt {String} file Path to Atals image
     * @opt {Integer} itemWidth Character width
     * @opt {Integer} itemHeight Character height
     * @opt {Integer} itemsToRender Quantity of items to render
     */
    init: function (opts) {
        AtlasNode.superclass.init.call(this, opts);

        this.itemWidth = opts.itemWidth;
        this.itemHeight = opts.itemHeight;
        
        this.textureAtlas = TextureAtlas.create({file: opts.file, capacity: opts.itemsToRender});


        this._calculateMaxItems();
    },

    updateAtlasValues: function () {
        throw "cocos.nodes.AtlasNode:Abstract - updateAtlasValue not overriden";
    },

    _calculateMaxItems: function () {
        var s = this.textureAtlas.get('texture.contentSize');
        this.itemsPerColumn = s.height / this.itemHeight;
        this.itemsPerRow = s.width / this.itemWidth;
    }
});

exports.AtlasNode = AtlasNode;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/BatchNode.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray SHOW_REDRAW_REGIONS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    geo = require('geometry'),
    ccp = geo.ccp,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    RenderTexture = require('./RenderTexture').RenderTexture,
    Node = require('./Node').Node;

var BatchNode = Node.extend(/** @lends cocos.nodes.BatchNode# */{
    partialDraw: false,
    contentRect: null,
    renderTexture: null,
    dirty: true,

    /**
     * Region to redraw
     * @type geometry.Rect
     */
    dirtyRegion: null,
    dynamicResize: false,

    /** @private
     * Areas that need redrawing
     *
     * Not implemented
     */
    _dirtyRects: null,


    /**
     * Draws all children to an in-memory canvas and only redraws when something changes
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {geometry.Size} size The size of the in-memory canvas used for drawing to
     * @opt {Boolean} [partialDraw=false] Draw only the area visible on screen. Small maps may be slower in some browsers if this is true.
     */
    init: function (opts) {
        BatchNode.superclass.init.call(this, opts);

        var size = opts.size || geo.sizeMake(1, 1);
        this.set('partialDraw', opts.partialDraw);

        evt.addListener(this, 'contentsize_changed', util.callback(this, this._resizeCanvas));
        
        this._dirtyRects = [];
        this.set('contentRect', geo.rectMake(0, 0, size.width, size.height));
        this.renderTexture = RenderTexture.create(size);
        this.renderTexture.sprite.set('isRelativeAnchorPoint', false);
        this.addChild({child: this.renderTexture});
    },

    addChild: function (opts) {
        BatchNode.superclass.addChild.call(this, opts);

        var child = opts.child,
            z     = opts.z;

        if (child == this.renderTexture) {
            return;
        }

        // TODO handle texture resize

        // Watch for changes in child
        var watchEvents = ['position_before_changed',
                           'scalex_before_changed',
                           'scaley_before_changed',
                           'rotation_before_changed',
                           'anchorpoint_before_changed',
                           'opacity_before_changed',
                           'visible_before_changed'];
        evt.addListener(child, watchEvents, util.callback(this, function () {
            this.addDirtyRegion(child.get('boundingBox'));
        }));

        this.addDirtyRegion(child.get('boundingBox'));
    },

    removeChild: function (opts) {
        BatchNode.superclass.removeChild.call(this, opts);

        // TODO remove istransformdirty_changed and visible_changed listeners

        this.set('dirty', true);
    },

    addDirtyRegion: function (rect) {
        // Increase rect slightly to compensate for subpixel artifacts
        rect = util.copy(rect);
        rect.origin.x -= 2;
        rect.origin.y -= 2;
        rect.size.width += 4;
        rect.size.height += 4;

        var region = this.get('dirtyRegion');
        if (!region) {
            region = rect;
        } else {
            region = geo.rectUnion(region, rect);
        }

        this.set('dirtyRegion', region);
        this.set('dirty', true);
    },

    _resizeCanvas: function (oldSize) {
        var size = this.get('contentSize');

        if (geo.sizeEqualToSize(size, oldSize)) {
            return; // No change
        }


        this.renderTexture.set('contentSize', size);
        this.set('dirty', true);
    },

    update: function () {

    },

    visit: function (context) {
        if (!this.visible) {
            return;
        }

        context.save();

        this.transform(context);

        var rect = this.get('dirtyRegion');
        // Only redraw if something changed
        if (this.dirty) {

            if (rect) {
                if (this.get('partialDraw')) {
                    // Clip region to visible area
                    var s = require('../Director').Director.get('sharedDirector').get('winSize'),
                        p = this.get('position');
                    var r = new geo.Rect(
                        0, 0,
                        s.width, s.height
                    );
                    r = geo.rectApplyAffineTransform(r, this.worldToNodeTransform());
                    rect = geo.rectIntersection(r, rect);
                }

                this.renderTexture.clear(rect);

                this.renderTexture.context.save();
                this.renderTexture.context.beginPath();
                this.renderTexture.context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                this.renderTexture.context.clip();
                this.renderTexture.context.closePath();
            } else {
                this.renderTexture.clear();
            }

            for (var i = 0, childLen = this.children.length; i < childLen; i++) {
                var c = this.children[i];
                if (c == this.renderTexture) {
                    continue;
                }

                // Draw children inside rect
                if (!rect || geo.rectOverlapsRect(c.get('boundingBox'), rect)) {
                    c.visit(this.renderTexture.context, rect);
                }
            }

            if (SHOW_REDRAW_REGIONS) {
                if (rect) {
                    this.renderTexture.context.beginPath();
                    this.renderTexture.context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                    this.renderTexture.context.fillStyle = "rgba(0, 0, 255, 0.5)";
                    this.renderTexture.context.fill();
                    this.renderTexture.context.closePath();
                }
            }

            if (rect) {
                this.renderTexture.context.restore();
            }

            this.set('dirty', false);
            this.set('dirtyRegion', null);
        }

        this.renderTexture.visit(context);

        context.restore();
    },

    draw: function (ctx) {
    },

    onEnter: function () {
        if (this.get('partialDraw')) {
            evt.addListener(this.get('parent'), 'istransformdirty_changed', util.callback(this, function () {
                var box = this.get('visibleRect');
                this.addDirtyRegion(box);
            }));
        }
    }
});

var SpriteBatchNode = BatchNode.extend(/** @lends cocos.nodes.SpriteBatchNode# */{
    textureAtlas: null,

    /**
     * @memberOf cocos.nodes
     * @class A BatchNode that accepts only Sprite using the same texture
     * @extends cocos.nodes.BatchNode
     * @constructs
     *
     * @opt {String} file (Optional) Path to image to use as sprite atlas
     * @opt {Texture2D} texture (Optional) Texture to use as sprite atlas
     * @opt {cocos.TextureAtlas} textureAtlas (Optional) TextureAtlas to use as sprite atlas
     */
    init: function (opts) {
        SpriteBatchNode.superclass.init.call(this, opts);

        var file         = opts.file,
            textureAtlas = opts.textureAtlas,
            texture      = opts.texture;

        if (file || texture) {
            textureAtlas = TextureAtlas.create({file: file, texture: texture});
        }

        this.set('textureAtlas', textureAtlas);
    },

    /**
     * @getter texture
     * @type cocos.Texture2D
     */
    get_texture: function () {
        return this.textureAtlas ? this.textureAtlas.texture : null;
    },

    set_opacity: function (newOpacity) {
        this.opacity = newOpacity;
        for (var i = 0, len = this.children.length; i < len; i++) {
            var child = this.children[i];
            child.set('opacity', newOpacity);
        }
    }

});

exports.BatchNode = BatchNode;
exports.SpriteBatchNode = SpriteBatchNode;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/index.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path');

var modules = 'AtlasNode LabelAtlas ProgressBar PreloadScene Node Layer Scene Label Sprite TMXTiledMap BatchNode RenderTexture Menu MenuItem Transition'.w();

/** 
 * @memberOf cocos
 * @namespace All cocos2d nodes. i.e. anything that can be added to a Scene
 */
var nodes = {};

util.each(modules, function (mod, i) {
    util.extend(nodes, require('./' + mod));
});

module.exports = nodes;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Label.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    console = require('system').console,
    Director = require('../Director').Director,
    Node = require('./Node').Node,
    ccp = require('geometry').ccp;

var Label = Node.extend(/** @lends cocos.nodes.Label# */{
    string:   '',
    fontName: 'Helvetica',
    fontSize: 16,
    fontColor: 'white',

    /**
     * Renders a simple text label
     *
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {String} [string=""] The text string to draw
     * @opt {Float} [fontSize=16] The size of the font
     * @opt {String} [fontName="Helvetica"] The name of the font to use
     * @opt {String} [fontColor="white"] The color of the text
     */
    init: function (opts) {
        Label.superclass.init.call(this, opts);

        util.each('fontSize fontName fontColor string'.w(), util.callback(this, function (name) {
            // Set property on init
            if (opts[name]) {
                this.set(name, opts[name]);
            }

            // Update content size
            this._updateLabelContentSize();
        }));
    },

    /** 
     * String of the font name and size to use in a format &lt;canvas&gt; understands
     *
     * @getter font
     * @type String
     */
    get_font: function (key) {
        return this.get('fontSize') + 'px ' + this.get('fontName');
    },

    draw: function (context) {
        if (FLIP_Y_AXIS) {
            context.save();

            // Flip Y axis
            context.scale(1, -1);
            context.translate(0, -this.get('fontSize'));
        }


        context.fillStyle = this.get('fontColor');
        context.font = this.get('font');
        context.textBaseline = 'top';
        if (context.fillText) {
            context.fillText(this.get('string'), 0, 0);
        } else if (context.mozDrawText) {
            context.mozDrawText(this.get('string'));
        }

        if (FLIP_Y_AXIS) {
            context.restore();
        }
    },

    /**
     * @private
     */
    _updateLabelContentSize: function () {
        var ctx = Director.get('sharedDirector').get('context');
        var size = {width: 0, height: this.get('fontSize')};

        var prevFont = ctx.font;
        ctx.font = this.get('font');

        if (ctx.measureText) {
            var txtSize = ctx.measureText(this.get('string'));
            size.width = txtSize.width;
        } else if (ctx.mozMeasureText) {
            size.width = ctx.mozMeasureText(this.get('string'));
        }

        ctx.font = prevFont;

        this.set('contentSize', size);
    }
});

module.exports.Label = Label;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/LabelAtlas.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var AtlasNode = require('./AtlasNode').AtlasNode,
    Sprite = require('./Sprite').Sprite,
    geo   = require('geometry');

var LabelAtlas = AtlasNode.extend(/** @lends cocos.nodes.LabelAtlas# */{
    string: '',

    mapStartChar: '',

    /**
     * @memberOf cocos.nodes
     * @extends cocos.nodes.BatchNode
     * @constructs
     *
     * @opt {String} [string=] Initial text to draw
     * @opt {String} charMapFile
     * @opt {Integer} itemWidth
     * @opt {Integer} itemHeight
     * @opt {String} startCharMap Single character
     */
    init: function (opts) {
        LabelAtlas.superclass.init.call(this, {
            file: opts.charMapFile,
            itemWidth: opts.itemWidth,
            itemHeight: opts.itemHeight,
            itemsToRender: opts.string.length,
            size: new geo.Size(opts.itemWidth * opts.string.length, opts.itemHeight)
        });


        this.mapStartChar = opts.startCharMap.charCodeAt(0);
        this.set('string', opts.string);
    },

    updateAtlasValue: function () {
        var n = this.string.length,
            s = this.get('string');
    
        // FIXME this should reuse children to improve performance
        while (this.children.length > 0) {
            this.removeChild(this.children[0]);
        }
        for (var i = 0; i < n; i++) {
            var a = s.charCodeAt(i) - this.mapStartChar,
                row = (a % this.itemsPerRow),
                col = Math.floor(a / this.itemsPerRow);
    
            var left = row * this.itemWidth,
                top  = col * this.itemHeight;

            var tile = Sprite.create({rect: new geo.Rect(left, top, this.itemWidth, this.itemHeight),
                              textureAtlas: this.textureAtlas});

            tile.set('position', new geo.Point(i * this.itemWidth, 0));
            tile.set('anchorPoint', new geo.Point(0, 0));
            tile.set('opacity', this.get('opacity'));
            
            this.addChild({child: tile});
        }
    },

    set_string: function (newString) {
        this.string = newString;

        this.updateAtlasValue();
    }
});


exports.LabelAtlas = LabelAtlas;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Layer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Node = require('./Node').Node,
    util = require('util'),
    evt = require('events'),
    Director = require('../Director').Director,
    ccp    = require('geometry').ccp,
    EventDispatcher = require('../EventDispatcher').EventDispatcher;

var Layer = Node.extend(/** @lends cocos.nodes.Layer# */{
    isMouseEnabled: false,
    isKeyboardEnabled: false,
    mouseDelegatePriority: 0,
    keyboardDelegatePriority: 0,

    /** 
     * A fullscreen Node. You need at least 1 layer in your app to add other nodes to.
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     */
    init: function () {
        Layer.superclass.init.call(this);

        var s = Director.get('sharedDirector').get('winSize');

        this.set('isRelativeAnchorPoint', false);
        this.anchorPoint = ccp(0.5, 0.5);
        this.set('contentSize', s);

        evt.addListener(this, 'ismouseenabled_changed', util.callback(this, function () {
            if (this.isRunning) {
                if (this.isMouseEnabled) {
                    EventDispatcher.get('sharedDispatcher').addMouseDelegate({delegate: this, priority: this.get('mouseDelegatePriority')});
                } else {
                    EventDispatcher.get('sharedDispatcher').removeMouseDelegate({delegate: this});
                }
            }
        }));


        evt.addListener(this, 'iskeyboardenabled_changed', util.callback(this, function () {
            if (this.isRunning) {
                if (this.isKeyboardEnabled) {
                    EventDispatcher.get('sharedDispatcher').addKeyboardDelegate({delegate: this, priority: this.get('keyboardDelegatePriority')});
                } else {
                    EventDispatcher.get('sharedDispatcher').removeKeyboardDelegate({delegate: this});
                }
            }
        }));
    },

    onEnter: function () {
        if (this.isMouseEnabled) {
            EventDispatcher.get('sharedDispatcher').addMouseDelegate({delegate: this, priority: this.get('mouseDelegatePriority')});
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.get('sharedDispatcher').addKeyboardDelegate({delegate: this, priority: this.get('keyboardDelegatePriority')});
        }
				
        Layer.superclass.onEnter.call(this);
    },

    onExit: function () {
        if (this.isMouseEnabled) {
            EventDispatcher.get('sharedDispatcher').removeMouseDelegate({delegate: this});
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.get('sharedDispatcher').removeKeyboardDelegate({delegate: this});
        }

        Layer.superclass.onExit.call(this);
    }
});

module.exports.Layer = Layer;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Menu.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Layer = require('./Layer').Layer,
    Director = require('../Director').Director,
    MenuItem = require('./MenuItem').MenuItem,
    geom = require('geometry'), ccp = geom.ccp;

/**
 * @private
 * @constant
 */
var kMenuStateWaiting = 0;

/**
 * @private
 * @constant
 */
var kMenuStateTrackingTouch = 1;
    

var Menu = Layer.extend(/** @lends cocos.nodes.Menu# */{
    mouseDelegatePriority: (-Number.MAX_VALUE + 1),
    state: kMenuStateWaiting,
    selectedItem: null,
    color: null,

    /**
     * A fullscreen node used to render a selection of menu options
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Layer
     *
     * @opt {cocos.nodes.MenuItem[]} items An array of MenuItems to draw on the menu
     */
    init: function (opts) {
        Menu.superclass.init.call(this, opts);

        var items = opts.items;

        this.set('isMouseEnabled', true);
        
        var s = Director.get('sharedDirector').get('winSize');

        this.set('isRelativeAnchorPoint', false);
        this.anchorPoint = ccp(0.5, 0.5);
        this.set('contentSize', s);

        this.set('position', ccp(s.width / 2, s.height / 2));


        if (items) {
            var z = 0;
            util.each(items, util.callback(this, function (item) {
                this.addChild({child: item, z: z++});
            }));
        }

        
    },

    addChild: function (opts) {
        if (!opts.child instanceof MenuItem) {
            throw "Menu only supports MenuItem objects as children";
        }

        Menu.superclass.addChild.call(this, opts);
    },

    itemForMouseEvent: function (event) {
        var location = event.locationInCanvas;

        var children = this.get('children');
        for (var i = 0, len = children.length; i < len; i++) {
            var item = children[i];

            if (item.get('visible') && item.get('isEnabled')) {
                var local = item.convertToNodeSpace(location);
                
                var r = item.get('rect');
                r.origin = ccp(0, 0);

                if (geom.rectContainsPoint(r, local)) {
                    return item;
                }

            }
        }

        return null;
    },

    mouseUp: function (event) {
        var selItem = this.get('selectedItem');

        if (selItem) {
            selItem.unselected();
            selItem.activate();
        }

        if (this.state != kMenuStateWaiting) {
            this.set('state', kMenuStateWaiting);
        }
        if (selItem) {
            return true;
        }
        return false;

    },
    mouseDown: function (event) {
        if (this.state != kMenuStateWaiting || !this.visible) {
            return false;
        }

        var selectedItem = this.itemForMouseEvent(event);
        this.set('selectedItem', selectedItem);
        if (selectedItem) {
            selectedItem.selected()
            this.set('state', kMenuStateTrackingTouch);

            return true;
        }

        return false;
    },

    mouseDragged: function (event) {
        var currentItem = this.itemForMouseEvent(event);

        if (currentItem != this.selectedItem) {
            if (this.selectedItem) {
                this.selectedItem.unselected();
            }
            this.set('selectedItem', currentItem);
            if (this.selectedItem) {
                this.selectedItem.selected();
            }
        }

        if (currentItem && this.state == kMenuStateTrackingTouch) {
            return true;
        }

        return false;
        
    }

});

exports.Menu = Menu;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/MenuItem.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Node = require('./Node').Node,
    Sprite = require('./Sprite').Sprite,
    rectMake = require('geometry').rectMake,
    ccp = require('geometry').ccp;

var MenuItem = Node.extend(/** @lends cocos.nodes.MenuItem# */{
    isEnabled: true,
    isSelected: false,
    callback: null,

    /**
     * Base class for any buttons or options in a menu
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {Function} callback Function to call when menu item is activated
     */
    init: function (opts) {
        MenuItem.superclass.init.call(this, opts);

        var callback = opts.callback;

        this.set('anchorPoint', ccp(0.5, 0.5));
        this.set('callback', callback);
    },

    activate: function () {
        if (this.isEnabled && this.callback) {
            this.callback(this);
        }
    },

    /**
     * @getter rect
     * @type geometry.Rect
     */
    get_rect: function () {
        return rectMake(
            this.position.x - this.contentSize.width  * this.anchorPoint.x,
            this.position.y - this.contentSize.height * this.anchorPoint.y,
            this.contentSize.width,
            this.contentSize.height
        );
    },

    selected: function () {
        this.isSelected = true;
    },

    unselected: function () {
        this.isSelected = false;
    }
});

var MenuItemSprite = MenuItem.extend(/** @lends cocos.nodes.MenuItemSprite# */{
    normalImage: null,
    selectedImage: null,
    disabledImage: null,

    /**
     * A menu item that accepts any cocos.nodes.Node
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.MenuItem
     *
     * @opt {cocos.nodes.Node} normalImage Main Node to draw
     * @opt {cocos.nodes.Node} selectedImage Node to draw when menu item is selected
     * @opt {cocos.nodes.Node} disabledImage Node to draw when menu item is disabled
     */
    init: function (opts) {
        MenuItemSprite.superclass.init.call(this, opts);

        var normalImage   = opts.normalImage,
            selectedImage = opts.selectedImage,
            disabledImage = opts.disabledImage;

        this.set('normalImage', normalImage);
        this.set('selectedImage', selectedImage);
        this.set('disabledImage', disabledImage);

        this.set('contentSize', normalImage.get('contentSize'));
    },

    set_normalImage: function (image) {
        if (image != this.normalImage) {
            image.set('anchorPoint', ccp(0, 0));
            image.set('visible', true);
            this.removeChild({child: this.normalImage, cleanup: true});
            this.addChild(image);

            this.normalImage = image;
        }
    },

    set_selectedImage: function (image) {
        if (image != this.selectedImage) {
            image.set('anchorPoint', ccp(0, 0));
            image.set('visible', false);
            this.removeChild({child: this.selectedImage, cleanup: true});
            this.addChild(image);

            this.selectedImage = image;
        }
    },

    set_disabledImage: function (image) {
        if (image != this.disabledImage) {
            image.set('anchorPoint', ccp(0, 0));
            image.set('visible', false);
            this.removeChild({child: this.disabledImage, cleanup: true});
            this.addChild(image);

            this.disabledImage = image;
        }
    },

    selected: function () {
        MenuItemSprite.superclass.selected.call(this);

        if (this.selectedImage) {
            this.normalImage.set('visible',   false);
            this.selectedImage.set('visible', true);
            if (this.disabledImage) this.disabledImage.set('visible', false);
        } else {
            this.normalImage.set('visible',   true);
            if (this.disabledImage) this.disabledImage.set('visible', false);
        }
    },

    unselected: function () {
        MenuItemSprite.superclass.unselected.call(this);

        this.normalImage.set('visible',   true);
        if (this.selectedImage) this.selectedImage.set('visible', false);
        if (this.disabledImage) this.disabledImage.set('visible', false);
    },

    set_isEnabled: function (enabled) {
        this.isEnabled = enabled;

        if (enabled) {
            this.normalImage.set('visible',   true);
            if (this.selectedImage) this.selectedImage.set('visible', false);
            if (this.disabledImage) this.disabledImage.set('visible', false);
        } else {
            if (this.disabledImage) {
                this.normalImage.set('visible',   false);
                if (this.selectedImage) this.selectedImage.set('visible', false);
                this.disabledImage.set('visible', true);
            } else {
                this.normalImage.set('visible',   true);
                if (this.selectedImage) this.selectedImage.set('visible', false);
            }
        }
    }

});

var MenuItemImage = MenuItemSprite.extend(/** @lends cocos.nodes.MenuItemImage# */{

    /**
     * MenuItem that accepts image files
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.MenuItemSprite
     *
     * @opt {String} normalImage Main image file to draw
     * @opt {String} selectedImage Image file to draw when menu item is selected
     * @opt {String} disabledImage Image file to draw when menu item is disabled
     */
    init: function (opts) {
        var normalI   = opts.normalImage,
            selectedI = opts.selectedImage,
            disabledI = opts.disabledImage,
            callback  = opts.callback;

        var normalImage = Sprite.create({file: normalI}),
            selectedImage = Sprite.create({file: selectedI}),
            disabledImage = null;

        if (disabledI) {
            disabledImage = Sprite.create({file: disabledI});
        }

        return MenuItemImage.superclass.init.call(this, {normalImage: normalImage, selectedImage: selectedImage, disabledImage: disabledImage, callback: callback});
    }
});

exports.MenuItem = MenuItem;
exports.MenuItemImage = MenuItemImage;
exports.MenuItemSprite = MenuItemSprite;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Node.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    Scheduler = require('../Scheduler').Scheduler,
    ActionManager = require('../ActionManager').ActionManager,
    geo = require('geometry'), ccp = geo.ccp;

var Node = BObject.extend(/** @lends cocos.nodes.Node# */{
    isCocosNode: true,

    /**
     * Is the node visible
     * @type boolean
     */
    visible: true,

    /**
     * Position relative to parent node
     * @type geometry.Point
     */
    position: null,

    /**
     * Parent node
     * @type cocos.nodes.Node
     */
    parent: null,

    /**
     * Unique tag to identify the node
     * @type *
     */
    tag: null,

    /**
     * Size of the node
     * @type geometry.Size
     */
    contentSize: null,

    /**
     * Nodes Z index. i.e. draw order
     * @type Integer
     */
    zOrder: 0,

    /**
     * Anchor point for scaling and rotation. 0x0 is top left and 1x1 is bottom right
     * @type geometry.Point
     */
    anchorPoint: null,

    /**
     * Anchor point for scaling and rotation in pixels from top left
     * @type geometry.Point
     */
    anchorPointInPixels: null,

    /**
     * Rotation angle in degrees
     * @type Float
     */
    rotation: 0,

    /**
     * X scale factor
     * @type Float
     */
    scaleX: 1,

    /**
     * Y scale factor
     * @type Float
     */
    scaleY: 1,

    /**
     * Opacity of the Node. 0 is totally transparent, 255 is totally opaque
     * @type Float
     */
    opacity: 255,

    isRunning: false,
    isRelativeAnchorPoint: true,

    isTransformDirty: true,
    isInverseDirty: true,
    inverse: null,
    transformMatrix: null,

    /**
     * The child Nodes
     * @type cocos.nodes.Node[]
     */
    children: null,

    /**
     * @memberOf cocos.nodes
     * @class The base class all visual elements extend from
     * @extends BObject
     * @constructs
     */
    init: function () {
        Node.superclass.init.call(this);
        this.set('contentSize', {width: 0, height: 0});
        this.anchorPoint = ccp(0.5, 0.5);
        this.anchorPointInPixels = ccp(0, 0);
        this.position = ccp(0, 0);
        this.children = [];

        util.each(['scaleX', 'scaleY', 'rotation', 'position', 'anchorPoint', 'contentSize', 'isRelativeAnchorPoint'], util.callback(this, function (key) {
            evt.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._dirtyTransform));
        }));
        evt.addListener(this, 'anchorpoint_changed', util.callback(this, this._updateAnchorPointInPixels));
        evt.addListener(this, 'contentsize_changed', util.callback(this, this._updateAnchorPointInPixels));
    },

    /**
     * Calculates the anchor point in pixels and updates the
     * anchorPointInPixels property
     * @private
     */
    _updateAnchorPointInPixels: function () {
        var ap = this.get('anchorPoint'),
            cs = this.get('contentSize');
        this.set('anchorPointInPixels', ccp(cs.width * ap.x, cs.height * ap.y));
    },

    /**
     * Add a child Node
     *
     * @opt {cocos.nodes.Node} child The child node to add
     * @opt {Integer} [z] Z Index for the child
     * @opt {Integer|String} [tag] A tag to reference the child with
     * @returns {cocos.nodes.Node} The node the child was added to. i.e. 'this'
     */
    addChild: function (opts) {
        if (opts.isCocosNode) {
            return this.addChild({child: opts});
        }

        var child = opts.child,
            z = opts.z,
            tag = opts.tag;

        if (z === undefined || z === null) {
            z = child.get('zOrder');
        }

        //this.insertChild({child: child, z:z});
        var added = false;


        for (var i = 0, childLen = this.children.length; i < childLen; i++) {
            var c = this.children[i];
            if (c.zOrder > z) {
                added = true;
                this.children.splice(i, 0, child);
                break;
            }
        }

        if (!added) {
            this.children.push(child);
        }

        child.set('tag', tag);
        child.set('zOrder', z);
        child.set('parent', this);

        if (this.isRunning) {
            child.onEnter();
        }

        return this;
    },
    getChild: function (opts) {
        var tag = opts.tag;

        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag == tag) {
                return this.children[i];
            }
        }

        return null;
    },

    removeChild: function (opts) {
        if (opts.isCocosNode) {
            return this.removeChild({child: opts});
        }

        var child = opts.child,
            cleanup = opts.cleanup;

        if (!child) {
            return;
        }

        var children = this.get('children'),
            idx = children.indexOf(child);

        if (idx > -1) {
            this.detatchChild({child: child, cleanup: cleanup});
        }
    },

    removeChildren: function(opts) {
        var children = this.get('children'),
            isRunning = this.get('isRunning');
        
        // Perform cleanup on each child but can't call removeChild() 
        // due to Array.splice's destructive nature during iteration.
        for (var i = 0; i < children.length; i++) {
            if (opts.cleanup) {
                children[i].cleanup();
            }
            if (isRunning) {
                children[i].onExit();
            }
            children[i].set('parent', null);
        }
        // Now safe to empty children list
        this.children = [];
    },
    
    detatchChild: function (opts) {
        var child = opts.child,
            cleanup = opts.cleanup;

        var children = this.get('children'),
            isRunning = this.get('isRunning'),
            idx = children.indexOf(child);

        if (isRunning) {
            child.onExit();
        }

        if (cleanup) {
            child.cleanup();
        }

        child.set('parent', null);
        children.splice(idx, 1);
    },

    reorderChild: function (opts) {
        var child = opts.child,
            z     = opts.z;

        var pos = this.children.indexOf(child);
        if (pos == -1) {
            throw "Node isn't a child of this node";
        }

        child.set('zOrder', z);

        // Remove child
        this.children.splice(pos, 1);

        // Add child back at correct location
        var added = false;
        for (var i = 0, childLen = this.children.length; i < childLen; i++) {
            var c = this.children[i];
            if (c.zOrder > z) {
                added = true;
                this.children.splice(i, 0, child);
                break;
            }
        }

        if (!added) {
            this.children.push(child);
        }
    },

    /**
     * Draws the node. Override to do custom drawing. If it's less efficient to
     * draw only the area inside the rect then don't bother. The result will be
     * clipped to that area anyway.
     *
     * @param {CanvasRenderingContext2D|WebGLRenderingContext} context Canvas rendering context
     * @param {geometry.Rect} rect Rectangular region that needs redrawing. Limit drawing to this area only if it's more efficient to do so.
     */
    draw: function (context, rect) {
        // All draw code goes here
    },

    /**
     * @getter scale
     * @type Float
     */
    get_scale: function () {
        if (this.scaleX != this.scaleY) {
            throw "scaleX and scaleY aren't identical";
        }

        return this.scaleX;
    },

    /**
     * @setter scale
     * @type Float
     */
    set_scale: function (val) {
        this.set('scaleX', val);
        this.set('scaleY', val);
    },
		
    scheduleUpdate: function (opts) {
        opts = opts || {};
        var priority = opts.priority || 0;

        Scheduler.get('sharedScheduler').scheduleUpdate({target: this, priority: priority, paused: !this.get('isRunning')});
    },

    /**
     * Triggered when the node is added to a scene
     *
     * @event
     */
    onEnter: function () {
        util.each(this.children, function (child) {
            child.onEnter();
        });

        this.resumeSchedulerAndActions();
        this.set('isRunning', true);
    },

    /**
     * Triggered when the node is removed from a scene
     *
     * @event
     */
    onExit: function () {
        this.pauseSchedulerAndActions();
        this.set('isRunning', false);

        util.each(this.children, function (child) {
            child.onExit();
        });
    },

    cleanup: function () {
        this.stopAllActions();
        this.unscheduleAllSelectors();
        util.each(this.children, function (child) {
            child.cleanup();
        });
    },

    resumeSchedulerAndActions: function () {
        Scheduler.get('sharedScheduler').resumeTarget(this);
        ActionManager.get('sharedManager').resumeTarget(this);
    },
    pauseSchedulerAndActions: function () {
        Scheduler.get('sharedScheduler').pauseTarget(this);
        ActionManager.get('sharedManager').pauseTarget(this);
    },
    unscheduleSelector: function (selector) {
        Scheduler.get('sharedScheduler').unschedule({target: this, method: selector});
    },
    unscheduleAllSelectors: function () {
        Scheduler.get('sharedScheduler').unscheduleAllSelectorsForTarget(this);
    },
    stopAllActions: function () {
        ActionManager.get('sharedManager').removeAllActionsFromTarget(this);
    },

    visit: function (context, rect) {
        if (!this.visible) {
            return;
        }

        context.save();

        this.transform(context);

        // Set alpha value (global only for now)
        context.globalAlpha = this.get('opacity') / 255.0;
        
        // Adjust redraw region by nodes position
        if (rect) {
            var pos = this.get('position');
            rect = new geo.Rect(rect.origin.x - pos.x, rect.origin.y - pos.y, rect.size.width, rect.size.height);
        }

        // Draw background nodes
        util.each(this.children, function (child, i) {
            if (child.zOrder < 0) {
                child.visit(context, rect);
            }
        });
        
        this.draw(context, rect);

        // Draw foreground nodes
        util.each(this.children, function (child, i) {
            if (child.zOrder >= 0) {
                child.visit(context, rect);
            }
        });

        context.restore();
    },
    transform: function (context) {
        // Translate
        if (this.isRelativeAnchorPoint && (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0)) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }

        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(this.position.x + this.anchorPointInPixels.x), Math.round(this.position.y + this.anchorPointInPixels.y));
        } else {
            context.translate(Math.round(this.position.x), Math.round(this.position.y));
        }

        // Rotate
        context.rotate(geo.degreesToRadians(this.get('rotation')));

        // Scale
        context.scale(this.scaleX, this.scaleY);

        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }
    },

    runAction: function (action) {
        ActionManager.get('sharedManager').addAction({action: action, target: this, paused: this.get('isRunning')});
    },
    
    /**
     * @opts {String} tag Tag of the action to return
     */
    getAction: function(opts) {
        return ActionManager.get('sharedManager').getActionFromTarget({target: this, tag: opts.tag});
    },
    
    nodeToParentTransform: function () {
        if (this.isTransformDirty) {
            this.transformMatrix = geo.affineTransformIdentity();

            if (!this.isRelativeAnchorPoint && !geo.pointEqualToPoint(this.anchorPointInPixels, ccp(0, 0))) {
                this.transformMatrix = geo.affineTransformTranslate(this.transformMatrix, this.anchorPointInPixels.x, this.anchorPointInPixels.y);
            }

            if (!geo.pointEqualToPoint(this.position, ccp(0, 0))) {
                this.transformMatrix = geo.affineTransformTranslate(this.transformMatrix, this.position.x, this.position.y);
            }

            if (this.rotation !== 0) {
                this.transformMatrix = geo.affineTransformRotate(this.transformMatrix, -geo.degreesToRadians(this.rotation));
            }
            if (!(this.scaleX == 1 && this.scaleY == 1)) {
                this.transformMatrix = geo.affineTransformScale(this.transformMatrix, this.scaleX, this.scaleY);
            }

            if (!geo.pointEqualToPoint(this.anchorPointInPixels, ccp(0, 0))) {
                this.transformMatrix = geo.affineTransformTranslate(this.transformMatrix, -this.anchorPointInPixels.x, -this.anchorPointInPixels.y);
            }

            this.set('isTransformDirty', false);

        }

        return this.transformMatrix;
    },

    parentToNodeTransform: function () {
        // TODO
    },

    nodeToWorldTransform: function () {
        var t = this.nodeToParentTransform();

        var p;
        for (p = this.get('parent'); p; p = p.get('parent')) {
            t = geo.affineTransformConcat(t, p.nodeToParentTransform());
        }

        return t;
    },

    worldToNodeTransform: function () {
        return geo.affineTransformInvert(this.nodeToWorldTransform());
    },

    convertToNodeSpace: function (worldPoint) {
        return geo.pointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
    },

    /**
     * @getter boundingBox
     * @type geometry.Rect
     */
    get_boundingBox: function () {
        var cs = this.get('contentSize');
        var rect = geo.rectMake(0, 0, cs.width, cs.height);
        rect = geo.rectApplyAffineTransform(rect, this.nodeToParentTransform());
        return rect;
    },

    /**
     * @getter worldBoundingBox
     * @type geometry.Rect
     */
    get_worldBoundingBox: function () {
        var cs = this.get('contentSize');

        var rect = geo.rectMake(0, 0, cs.width, cs.height);
        rect = geo.rectApplyAffineTransform(rect, this.nodeToWorldTransform());
        return rect;
    },

    /**
     * The area of the node currently visible on screen. Returns an rect even
     * if visible is false.
     *
     * @getter visibleRect
     * @type geometry.Rect
     */
    get_visibleRect: function () {
        var s = require('../Director').Director.get('sharedDirector').get('winSize');
        var rect = new geo.Rect(
            0, 0,
            s.width, s.height
        );

        return geo.rectApplyAffineTransform(rect, this.worldToNodeTransform());
    },

    /**
     * @private
     */
    _dirtyTransform: function () {
        this.set('isTransformDirty', true);
    },

    /**
     * Schedules a custom method with an interval time in seconds.
     * If time is 0 it will be ticked every frame.
     * If time is 0, it is recommended to use 'scheduleUpdate' instead.
     * 
     * If the method is already scheduled, then the interval parameter will
     * be updated without scheduling it again.
     *
     * @opt {String|Function} method Function of method name to schedule
     * @opt {Float} [interval=0] Interval in seconds
     */
    schedule: function (opts) {
        if (typeof opts == 'string') {
            return this.schedule({method: opts, interval: 0});
        }

        opts.interval = opts.interval || 0;

        Scheduler.get('sharedScheduler').schedule({target: this, method: opts.method, interval: opts.interval, paused: this.isRunning});
    },

    /**
     * Unschedules a custom method
     *
     * @param {String|Function} method
     */
    unschedule: function (method) {
        if (!method) {
            return;
        }

        if (typeof method == 'string') {
            method = this[method];
        }
        
        Scheduler.get('sharedScheduler').unschedule({target: this, method: method});
    }

});

module.exports.Node = Node;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/PreloadScene.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Scene       = require('./Scene').Scene,
    Director    = require('../Director').Director,
    Label       = require('./Label').Label,
    ProgressBar = require('./ProgressBar').ProgressBar,
    Preloader   = require('../Preloader').Preloader,
    RemoteResource = require('../RemoteResource').RemoteResource,
    geo         = require('geometry'),
    util        = require('util'),
    events      = require('events');

var PreloadScene = Scene.extend(/** @lends cocos.nodes.PreloadScene# */{
    progressBar: null,
    label: null,
    preloader: null,
    isReady: false, // True when both progress bar images have loaded
    emptyImage: "/__builtin__/libs/cocos2d/resources/progress-bar-empty.png",
    fullImage:  "/__builtin__/libs/cocos2d/resources/progress-bar-full.png",

    /**
     * @memberOf cocos.nodes
     * @extends cocos.nodes.Scene
     * @constructs
     */
    init: function (opts) {
        PreloadScene.superclass.init.call(this, opts);
        var size = Director.get('sharedDirector').get('winSize');

        // Setup 'please wait' label
        var label = Label.create({
            fontSize: 14,
            fontName: 'Helvetica',
            fontColor: '#ffffff',
            string: 'Please wait...'
        });
        label.set('position', new geo.Point(size.width / 2, (size.height / 2) + 32));
        this.set('label', label);
        this.addChild({child: label});

        // Setup preloader
        var preloader = Preloader.create();
        this.set('preloader', preloader);
        var self = this;

        // Listen for preload events
        events.addListener(preloader, 'load', function (uri, preloader) {
            var loaded = preloader.get('loaded'),
                count = preloader.get('count');
            //console.log("Loaded: %d%% -- %d of %d -- %s", (loaded / count) * 100, loaded, count, uri);
            events.trigger(self, 'load', uri, preloader);
        });

        events.addListener(preloader, 'complete', function (preloader) {
            events.trigger(self, 'complete', preloader);
        });


        // Load the images used by the progress bar
        var emptyImage = resource(this.get('emptyImage')),
            fullImage  = resource(this.get('fullImage'));


        var loaded = 0;
        function imageLoaded() {
            if (loaded == 2) {
                this.isReady = true;
                this.createProgressBar();
                if (this.get('isRunning')) {
                    preloader.load();
                }
            }
        }

        if (emptyImage instanceof RemoteResource) {
            events.addListener(emptyImage, 'load', util.callback(this, function() {
                loaded++;
                imageLoaded.call(this);
            }));
            emptyImage.load();
        } else {
            loaded++;
            imageLoaded.call(this);
        }
        if (fullImage instanceof RemoteResource) {
            events.addListener(fullImage, 'load', util.callback(this, function() {
                loaded++;
                imageLoaded.call(this);
            }));
            fullImage.load();
        } else {
            loaded++;
            imageLoaded.call(this);
        }

    },

    createProgressBar: function () {
        var preloader = this.get('preloader'),
            size = Director.get('sharedDirector').get('winSize');

        var progressBar = ProgressBar.create({
            emptyImage: "/__builtin__/libs/cocos2d/resources/progress-bar-empty.png",
            fullImage:  "/__builtin__/libs/cocos2d/resources/progress-bar-full.png"
        });

        progressBar.set('position', new geo.Point(size.width / 2, size.height / 2));

        this.set('progressBar', progressBar);
        this.addChild({child: progressBar});

        progressBar.bindTo('maxValue', preloader, 'count');
        progressBar.bindTo('value',    preloader, 'loaded');
    },

    onEnter: function () {
        PreloadScene.superclass.onEnter.call(this);
        var preloader = this.get('preloader');

        // Preload everything
        if (this.isReady) {
            preloader.load();
        }
    }
});

exports.PreloadScene = PreloadScene;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/ProgressBar.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Node   = require('./Node').Node,
    util   = require('util'),
    geo    = require('geometry'),
    events = require('events'),
    Sprite = require('./Sprite').Sprite;

var ProgressBar = Node.extend(/** @lends cocos.nodes.ProgressBar# */{
    emptySprite: null,
    fullSprite: null,
    maxValue: 100,
    value: 0,

    /**
     * @memberOf cocos.nodes
     * @extends cocos.nodes.Node
     * @constructs
     */
    init: function (opts) {
        ProgressBar.superclass.init.call(this, opts);
        var size = new geo.Size(272, 32);
        this.set('contentSize', size);

        var s;
        if (opts.emptyImage) {
            s = Sprite.create({file: opts.emptyImage, rect: new geo.Rect(0, 0, size.width, size.height)});
            s.set('anchorPoint', new geo.Point(0, 0));
            this.set('emptySprite', s);
            this.addChild({child: s});
        }
        if (opts.fullImage) {
            s = Sprite.create({file: opts.fullImage, rect: new geo.Rect(0, 0, 0, size.height)});
            s.set('anchorPoint', new geo.Point(0, 0));
            this.set('fullSprite', s);
            this.addChild({child: s});
        }

        events.addListener(this, 'maxvalue_changed', util.callback(this, 'updateImages'));
        events.addListener(this, 'value_changed', util.callback(this, 'updateImages'));

        this.updateImages();
    },

    updateImages: function () {
        var empty = this.get('emptySprite'),
            full  = this.get('fullSprite'),
            value = this.get('value'),
            size  = this.get('contentSize'),
            maxValue = this.get('maxValue'),
            ratio = (value / maxValue);

        var diff = Math.round(size.width * ratio);
        if (diff === 0) {
            full.set('visible', false);
        } else {
            full.set('visible', true);
            full.set('rect', new geo.Rect(0, 0, diff, size.height));
            full.set('contentSize', new geo.Size(diff, size.height));
        }

        if ((size.width - diff) === 0) {
            empty.set('visible', false);
        } else {
            empty.set('visible', true);
            empty.set('rect', new geo.Rect(diff, 0, size.width - diff, size.height));
            empty.set('position', new geo.Point(diff, 0));
            empty.set('contentSize', new geo.Size(size.width - diff, size.height));
        }
    }
});

exports.ProgressBar = ProgressBar;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/RenderTexture.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    Node = require('./Node').Node,
    geo = require('geometry'),
    Sprite = require('./Sprite').Sprite,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    ccp = geo.ccp;

var RenderTexture = Node.extend(/** @lends cocos.nodes.RenderTexture# */{
    canvas: null,
    context: null,
    sprite: null,

    /** 
     * An in-memory canvas which can be drawn to in the background before drawing on screen
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {Integer} width The width of the canvas
     * @opt {Integer} height The height of the canvas
     */
    init: function (opts) {
        RenderTexture.superclass.init.call(this, opts);

        var width = opts.width,
            height = opts.height;

        evt.addListener(this, 'contentsize_changed', util.callback(this, this._resizeCanvas));

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        var atlas = TextureAtlas.create({canvas: this.canvas});
        this.sprite = Sprite.create({textureAtlas: atlas, rect: {origin: ccp(0, 0), size: {width: width, height: height}}});

        this.set('contentSize', geo.sizeMake(width, height));
        this.addChild(this.sprite);
        this.set('anchorPoint', ccp(0, 0));
        this.sprite.set('anchorPoint', ccp(0, 0));

    },

    /**
     * @private
     */
    _resizeCanvas: function () {
        var size = this.get('contentSize'),
            canvas = this.get('canvas');

        canvas.width  = size.width;
        canvas.height = size.height;
        if (FLIP_Y_AXIS) {
            this.context.scale(1, -1);
            this.context.translate(0, -canvas.height);
        }

        var s = this.get('sprite');
        if (s) {
            s.set('textureRect', {rect: geo.rectMake(0, 0, size.width, size.height)});
        }
    },

    /**
     * Clear the canvas
     */
    clear: function (rect) {
        if (rect) {
            this.context.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        } else {
            this.canvas.width = this.canvas.width;
            if (FLIP_Y_AXIS) {
                this.context.scale(1, -1);
                this.context.translate(0, -this.canvas.height);
            }
        }
    }
});

module.exports.RenderTexture = RenderTexture;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Scene.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Node = require('./Node').Node,
    geo = require('geometry');

var Scene = Node.extend(/** @lends cocos.nodes.Scene */{
    /**
     * Everything in your view will be a child of this object. You need at least 1 scene per app.
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     */
    init: function () {
        Scene.superclass.init.call(this);


        var Director = require('../Director').Director;
        var s = Director.get('sharedDirector').get('winSize');
        this.set('isRelativeAnchorPoint', false);
        this.anchorPoint = new geo.Point(0.5, 0.5);
        this.set('contentSize', s);
    }

});

module.exports.Scene = Scene;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Sprite.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    Director = require('../Director').Director,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    Node = require('./Node').Node,
    geo = require('geometry'),
    ccp = geo.ccp;

var Sprite = Node.extend(/** @lends cocos.nodes.Sprite# */{
    textureAtlas: null,
    rect: null,
    dirty: true,
    recursiveDirty: true,
    quad: null,
    flipX: false,
    flipY: false,
    offsetPosition: null,
    unflippedOffsetPositionFromCenter: null,
    untrimmedSize: null,

    /**
     * A small 2D graphics than can be animated
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {String} file Path to image to use as sprite atlas
     * @opt {Rect} [rect] The rect in the sprite atlas image file to use as the sprite
     */
    init: function (opts) {
        Sprite.superclass.init.call(this, opts);

        opts = opts || {};

        var file         = opts.file,
            textureAtlas = opts.textureAtlas,
            texture      = opts.texture,
            frame        = opts.frame,
            spritesheet  = opts.spritesheet,
            rect         = opts.rect;

        this.set('offsetPosition', ccp(0, 0));
        this.set('unflippedOffsetPositionFromCenter', ccp(0, 0));


        if (frame) {
            texture = frame.get('texture');
            rect    = frame.get('rect');
        }

        util.each(['scale', 'scaleX', 'scaleY', 'rect', 'flipX', 'flipY', 'contentSize'], util.callback(this, function (key) {
            evt.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._updateQuad));
        }));
        evt.addListener(this, 'textureatlas_changed', util.callback(this, this._updateTextureQuad));

        if (file || texture) {
            textureAtlas = TextureAtlas.create({file: file, texture: texture});
        } else if (spritesheet) {
            textureAtlas = spritesheet.get('textureAtlas');
            this.set('useSpriteSheet', true);
        } else if (!textureAtlas) {
            //throw "Sprite has no texture";
        }

        if (!rect && textureAtlas) {
            rect = {origin: ccp(0, 0), size: {width: textureAtlas.texture.size.width, height: textureAtlas.texture.size.height}};
        }

        if (rect) {
            this.set('rect', rect);
            this.set('contentSize', rect.size);

            this.quad = {
                drawRect: {origin: ccp(0, 0), size: rect.size},
                textureRect: rect
            };
        }

        this.set('textureAtlas', textureAtlas);

        if (frame) {
            this.set('displayFrame', frame);
        }
    },

    /**
     * @private
     */
    _updateTextureQuad: function (obj, key, texture, oldTexture) {
        if (oldTexture) {
            oldTexture.removeQuad({quad: this.get('quad')});
        }

        if (texture) {
            texture.insertQuad({quad: this.get('quad')});
        }
    },

    /**
     * @setter textureCoords
     * @type geometry.Rect
     */
    set_textureCoords: function (rect) {
        var quad = this.get('quad');
        if (!quad) {
            quad = {
                drawRect: geo.rectMake(0, 0, 0, 0), 
                textureRect: geo.rectMake(0, 0, 0, 0)
            };
        }

        quad.textureRect = util.copy(rect);

        this.set('quad', quad);
    },

    /**
     * @setter textureRect
     * @type geometry.Rect
     */
    set_textureRect: function (opts) {
        var rect = opts.rect,
            rotated = !!opts.rotated,
            untrimmedSize = opts.untrimmedSize || rect.size;

        this.set('contentSize', untrimmedSize);
        this.set('rect', util.copy(rect));
        this.set('textureCoords', rect);

        var quad = this.get('quad');

        var relativeOffset = util.copy(this.get('unflippedOffsetPositionFromCenter'));

        if (this.get('flipX')) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.get('flipY')) {
            relativeOffset.y = -relativeOffset.y;
        }

        var offsetPosition = util.copy(this.get('offsetPosition'));
        offsetPosition.x =  relativeOffset.x + (this.get('contentSize').width  - rect.size.width) / 2;
        offsetPosition.y = -relativeOffset.y + (this.get('contentSize').height - rect.size.height) / 2;

        quad.drawRect.origin = util.copy(offsetPosition);
        quad.drawRect.size = util.copy(rect.size);
        if (this.flipX) {
            quad.drawRect.size.width *= -1;
            quad.drawRect.origin.x = -rect.size.width;
        }
        if (this.flipY) {
            quad.drawRect.size.height *= -1;
            quad.drawRect.origin.y = -rect.size.height;
        }

        this.set('quad', quad);
    },

    /**
     * @private
     */
    _updateQuad: function () {
        if (!this.get('rect')) {
            return;
        }
        if (!this.quad) {
            this.quad = {
                drawRect: geo.rectMake(0, 0, 0, 0), 
                textureRect: geo.rectMake(0, 0, 0, 0)
            };
        }

        var relativeOffset = util.copy(this.get('unflippedOffsetPositionFromCenter'));

        if (this.get('flipX')) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.get('flipY')) {
            relativeOffset.y = -relativeOffset.y;
        }

        var offsetPosition = util.copy(this.get('offsetPosition'));
        offsetPosition.x = relativeOffset.x + (this.get('contentSize').width  - this.get('rect').size.width) / 2;
        offsetPosition.y = relativeOffset.y + (this.get('contentSize').height - this.get('rect').size.height) / 2;

        this.quad.textureRect = util.copy(this.rect);
        this.quad.drawRect.origin = util.copy(offsetPosition);
        this.quad.drawRect.size = util.copy(this.rect.size);

        if (this.flipX) {
            this.quad.drawRect.size.width *= -1;
            this.quad.drawRect.origin.x = -this.rect.size.width;
        }
        if (this.flipY) {
            this.quad.drawRect.size.height *= -1;
            this.quad.drawRect.origin.y = -this.rect.size.height;
        }
    },

    updateTransform: function (ctx) {
        if (!this.useSpriteSheet) {
            throw "updateTransform is only valid when Sprite is being rendered using a SpriteSheet";
        }

        if (!this.visible) {
            this.set('dirty', false);
            this.set('recursiveDirty', false);
            return;
        }

        // TextureAtlas has hard reference to this quad so we can just update it directly
        this.quad.drawRect.origin = {
            x: this.position.x - this.anchorPointInPixels.x * this.scaleX,
            y: this.position.y - this.anchorPointInPixels.y * this.scaleY
        };
        this.quad.drawRect.size = {
            width: this.rect.size.width * this.scaleX,
            height: this.rect.size.height * this.scaleY
        };

        this.set('dirty', false);
        this.set('recursiveDirty', false);
    },

    draw: function (ctx) {
        if (!this.quad) {
            return;
        }
        this.get('textureAtlas').drawQuad(ctx, this.quad);
    },

    isFrameDisplayed: function (frame) {
        if (!this.rect || !this.textureAtlas) {
            return false;
        }
        return (frame.texture === this.textureAtlas.texture && geo.rectEqualToRect(frame.rect, this.rect));
    },


    /**
     * @setter displayFrame
     * @type cocos.SpriteFrame
     */
    set_displayFrame: function (frame) {
        if (!frame) {
            delete this.quad;
            return;
        }
        this.set('unflippedOffsetPositionFromCenter', util.copy(frame.offset));


        // change texture
        if (!this.textureAtlas || frame.texture !== this.textureAtlas.texture) {
            this.set('textureAtlas', TextureAtlas.create({texture: frame.texture}));
        }

        this.set('textureRect', {rect: frame.rect, rotated: frame.rotated, untrimmedSize: frame.originalSize});
    }
});

module.exports.Sprite = Sprite;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/TMXLayer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    SpriteBatchNode = require('./BatchNode').SpriteBatchNode,
    Sprite = require('./Sprite').Sprite,
    TMXOrientationOrtho = require('../TMXOrientation').TMXOrientationOrtho,
    TMXOrientationHex   = require('../TMXOrientation').TMXOrientationHex,
    TMXOrientationIso   = require('../TMXOrientation').TMXOrientationIso,
    geo    = require('geometry'),
    ccp    = geo.ccp,
    Node = require('./Node').Node;

var TMXLayer = SpriteBatchNode.extend(/** @lends cocos.nodes.TMXLayer# */{
    layerSize: null,
    layerName: '',
    tiles: null,
    tilset: null,
    layerOrientation: 0,
    mapTileSize: null,
    properties: null,

    /** 
     * A tile map layer loaded from a TMX file. This will probably automatically be made by cocos.TMXTiledMap
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.SpriteBatchNode
     *
     * @opt {cocos.TMXTilesetInfo} tilesetInfo
     * @opt {cocos.TMXLayerInfo} layerInfo
     * @opt {cocos.TMXMapInfo} mapInfo
     */
    init: function (opts) {
        var tilesetInfo = opts.tilesetInfo,
            layerInfo = opts.layerInfo,
            mapInfo = opts.mapInfo;

        var size = layerInfo.get('layerSize'),
            totalNumberOfTiles = size.width * size.height;

        var tex = null;
        if (tilesetInfo) {
            tex = tilesetInfo.sourceImage;
        }

        TMXLayer.superclass.init.call(this, {file: tex});

        this.set('anchorPoint', ccp(0, 0));

        this.layerName = layerInfo.get('name');
        this.layerSize = layerInfo.get('layerSize');
        this.tiles = layerInfo.get('tiles');
        this.minGID = layerInfo.get('minGID');
        this.maxGID = layerInfo.get('maxGID');
        this.opacity = layerInfo.get('opacity');
        this.properties = util.copy(layerInfo.properties);

        this.tileset = tilesetInfo;
        this.mapTileSize = mapInfo.get('tileSize');
        this.layerOrientation = mapInfo.get('orientation');

        var offset = this.calculateLayerOffset(layerInfo.get('offset'));
        this.set('position', offset);

        this.set('contentSize', geo.sizeMake(this.layerSize.width * this.mapTileSize.width, (this.layerSize.height * (this.mapTileSize.height - 1)) + this.tileset.tileSize.height));
    },

    calculateLayerOffset: function (pos) {
        var ret = ccp(0, 0);

        switch (this.layerOrientation) {
        case TMXOrientationOrtho:
            ret = ccp(pos.x * this.mapTileSize.width, pos.y * this.mapTileSize.height);
            break;
        case TMXOrientationIso:
            // TODO
            break;
        case TMXOrientationHex:
            // TODO
            break;
        }

        return ret;
    },

    setupTiles: function () {
        this.tileset.bindTo('imageSize', this.get('texture'), 'contentSize');


        for (var y = 0; y < this.layerSize.height; y++) {
            for (var x = 0; x < this.layerSize.width; x++) {
                
                var pos = x + this.layerSize.width * y,
                    gid = this.tiles[pos];
                
                if (gid !== 0) {
                    this.appendTile({gid: gid, position: ccp(x, y)});
                    
                    // Optimization: update min and max GID rendered by the layer
                    this.minGID = Math.min(gid, this.minGID);
                    this.maxGID = Math.max(gid, this.maxGID);
                }
            }
        }
    },
    appendTile: function (opts) {
        var gid = opts.gid,
            pos = opts.position;

        var z = pos.x + pos.y * this.layerSize.width;
            
        var rect = this.tileset.rectForGID(gid);
        var tile = Sprite.create({rect: rect, textureAtlas: this.textureAtlas});
        tile.set('position', this.positionAt(pos));
        tile.set('anchorPoint', ccp(0, 0));
        tile.set('opacity', this.get('opacity'));
        
        this.addChild({child: tile, z: 0, tag: z});
    },
    positionAt: function (pos) {
        switch (this.layerOrientation) {
        case TMXOrientationOrtho:
            return this.positionForOrthoAt(pos);
        case TMXOrientationIso:
            return this.positionForIsoAt(pos);
        /*
        case TMXOrientationHex:
            // TODO
        */
        default:
            return ccp(0, 0);
        }
    },
    positionForOrthoAt: function (pos) {
        var overlap = this.mapTileSize.height - this.tileset.tileSize.height;
        var x = Math.floor(pos.x * this.mapTileSize.width + 0.49);
        var y;
        if (FLIP_Y_AXIS) {
            y = Math.floor((this.get('layerSize').height - pos.y - 1) * this.mapTileSize.height + 0.49);
        } else {
            y = Math.floor(pos.y * this.mapTileSize.height + 0.49) + overlap;
        }
        return ccp(x, y);
    },

    positionForIsoAt: function (pos) {
        var mapTileSize = this.get('mapTileSize'),
            layerSize = this.get('layerSize');

        if (FLIP_Y_AXIS) {
            return ccp(
                mapTileSize.width  / 2 * (layerSize.width + pos.x - pos.y - 1),
                mapTileSize.height / 2 * ((layerSize.height * 2 - pos.x - pos.y) - 2)
            );
        } else {
            throw "Isometric tiles without FLIP_Y_AXIS is currently unsupported";
        }
    },

    /**
     * Get the tile at a specifix tile coordinate
     *
     * @param {geometry.Point} pos Position of tile to get in tile coordinates (not pixels)
     * @returns {cocos.nodes.Sprite} The tile
     */
    tileAt: function (pos) {
        var layerSize = this.get('layerSize'),
            tiles = this.get('tiles');

        if (pos.x < 0 || pos.y < 0 || pos.x >= layerSize.width || pos.y >= layerSize.height) {
            throw "TMX Layer: Invalid position";
        }

        var tile,
            gid = this.tileGIDAt(pos);

        // if GID is 0 then no tile exists at that point
        if (gid) {
            var z = pos.x + pos.y * layerSize.width;
            tile = this.getChild({tag: z});
        }

        return tile;
    },


    tileGID: function (pos) {
        var tilesPerRow = this.get('layerSize').width,
            tilePos = pos.x + (pos.y * tilesPerRow);

        return this.tiles[tilePos];
    },
    tileGIDAt: function (pos) {
        return this.tileGID(pos);
    },

    removeTile: function (pos) {
        var gid = this.tileGID(pos);
        if (gid === 0) {
            // Tile is already blank
            return;
        }

        var tiles = this.get('tiles'),
            tilesPerRow = this.get('layerSize').width,
            tilePos = pos.x + (pos.y * tilesPerRow);


        tiles[tilePos] = 0;

        var sprite = this.getChild({tag: tilePos});
        if (sprite) {
            this.removeChild({child: sprite});
        }
    }
});

exports.TMXLayer = TMXLayer;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/TMXTiledMap.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray console*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp,
    Node = require('./Node').Node,
    TMXOrientationOrtho = require('../TMXOrientation').TMXOrientationOrtho,
    TMXOrientationHex   = require('../TMXOrientation').TMXOrientationHex,
    TMXOrientationIso   = require('../TMXOrientation').TMXOrientationIso,
    TMXLayer   = require('./TMXLayer').TMXLayer,
    TMXMapInfo = require('../TMXXMLParser').TMXMapInfo;

var TMXTiledMap = Node.extend(/** @lends cocos.nodes.TMXTiledMap# */{
    mapSize: null,
    tileSize: null,
    mapOrientation: 0,
    objectGroups: null,
    properties: null,
    tileProperties: null,

    /**
     * A TMX Map loaded from a .tmx file
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {String} file The file path of the TMX map to load
     */
    init: function (opts) {
        TMXTiledMap.superclass.init.call(this, opts);

        this.set('anchorPoint', ccp(0, 0));

        var mapInfo = TMXMapInfo.create(opts.file);

        this.mapSize        = mapInfo.get('mapSize');
        this.tileSize       = mapInfo.get('tileSize');
        this.mapOrientation = mapInfo.get('orientation');
        this.objectGroups   = mapInfo.get('objectGroups');
        this.properties     = mapInfo.get('properties');
        this.tileProperties = mapInfo.get('tileProperties');

        // Add layers to map
        var idx = 0;
        util.each(mapInfo.layers, util.callback(this, function (layerInfo) {
            if (layerInfo.get('visible')) {
                var child = this.parseLayer({layerInfo: layerInfo, mapInfo: mapInfo});
                this.addChild({child: child, z: idx, tag: idx});

                var childSize   = child.get('contentSize');
                var currentSize = this.get('contentSize');
                currentSize.width  = Math.max(currentSize.width,  childSize.width);
                currentSize.height = Math.max(currentSize.height, childSize.height);
                this.set('contentSize', currentSize);

                idx++;
            }
        }));
    },
    
    parseLayer: function (opts) {
        var tileset = this.tilesetForLayer(opts);
        var layer = TMXLayer.create({tilesetInfo: tileset, layerInfo: opts.layerInfo, mapInfo: opts.mapInfo});

        layer.setupTiles();

        return layer;
    },

    tilesetForLayer: function (opts) {
        var layerInfo = opts.layerInfo,
            mapInfo = opts.mapInfo,
            size = layerInfo.get('layerSize');

        // Reverse loop
        var tileset;
        for (var i = mapInfo.tilesets.length - 1; i >= 0; i--) {
            tileset = mapInfo.tilesets[i];

            for (var y = 0; y < size.height; y++) {
                for (var x = 0; x < size.width; x++) {
                    var pos = x + size.width * y, 
                        gid = layerInfo.tiles[pos];

                    if (gid !== 0 && gid >= tileset.firstGID) {
                        return tileset;
                    }
                } // for (var x
            } // for (var y
        } // for (var i

        //console.log("cocos2d: Warning: TMX Layer '%s' has no tiles", layerInfo.name);
        return tileset;
    },

    /**
     * Get a layer
     *
     * @opt {String} name The name of the layer to get
     * @returns {cocos.nodes.TMXLayer} The layer requested
     */
    getLayer: function (opts) {
        var layerName = opts.name,
            layer = null;

        this.get('children').forEach(function (item) {
            if (item instanceof TMXLayer && item.layerName == layerName) {
                layer = item;
            }
        });
        if (layer !== null) {
            return layer;
        }
    },
    
    /**
     * Return the ObjectGroup for the secific group
     *
     * @opt {String} name The object group name
     * @returns {cocos.TMXObjectGroup} The object group
     */
    getObjectGroup: function (opts) {
        var objectGroupName = opts.name,
            objectGroup = null;

        this.objectGroups.forEach(function (item) {
            if (item.name == objectGroupName) {
                objectGroup = item;
            }
        });
        if (objectGroup !== null) {
            return objectGroup;
        }
    },

    /**
     * @deprected Since v0.2. You should now use cocos.TMXTiledMap#getObjectGroup.
     */
    objectGroupNamed: function (opts) {
        console.warn('TMXTiledMap#objectGroupNamed is deprected. Use TMXTiledMap#getObjectGroup instread');
        return this.getObjectGroup(opts);
    }
});

exports.TMXTiledMap = TMXTiledMap;


}};
__resources__["/__builtin__/libs/cocos2d/nodes/Transition.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var geo             = require('geometry'),
    util            = require('util'),
    actions         = require('../actions'),
    Scene           = require('./Scene').Scene,
    Director        = require('../Director').Director,
    EventDispatcher = require('../EventDispatcher').EventDispatcher,
    Scheduler       = require('../Scheduler').Scheduler;

/** Orientation Type used by some transitions
 */
var tOrientation = {
    kOrientationLeftOver: 0,
    kOrientationRightOver: 1,
    kOrientationUpOver: 0,
    kOrientationDownOver: 1
};

/**
 */
var TransitionScene = Scene.extend(/** @lends cocos.nodes.TransitionScene */{
    /**
     * Incoming scene
     * @type {cocos.nodes.Scene}
     */
    inScene: null,

    /**
     * Outgoing (current) scene
     * @type {cocos.nodes.Scene}
     */
    outScene: null,

    /**
     * transition duration
     * @type Float
     */
    duration: null,

    inSceneOnTop: null,
    sendCleanupToScene: null,

    /**
     * @class Base class for Transition scenes
     * @memberOf cocos.nodes
     * @extends cocos.nodes.Scene
     * @constructs
     *
     * @opt {Float} duration How long the transition should last
     * @opt {cocos.nodes.Scene} scene Income scene
     */
    init: function (opts) {
        TransitionScene.superclass.init.call(this, opts);

        this.set('duration', opts.duration);
        if (!opts.scene) {
            throw "TransitionScene requires scene property";
        }
        this.set('inScene', opts.scene);
        this.set('outScene', Director.get('sharedDirector')._runningScene);

        if (this.inScene == this.outScene) {
            throw "Incoming scene must be different from the outgoing scene";
        }
        EventDispatcher.get('sharedDispatcher').set('dispatchEvents', false);
        this.sceneOrder();
    },

    /**
     * Called after the transition finishes
     */
    finish: function () {
        var is = this.get('inScene'),
            os = this.get('outScene');

        /* clean up */
        is.set('visible', true);
        is.set('position', geo.PointZero());
        is.set('scale', 1.0);
        is.set('rotation', 0);

        os.set('visible', false);
        os.set('position', geo.PointZero());
        os.set('scale', 1.0);
        os.set('rotation', 0);

        Scheduler.get('sharedScheduler').schedule({
            target: this,
            method: this.setNewScene,
            interval: 0
        });
    },

    /**
     * Used by some transitions to hide the outer scene
     */
    hideOutShowIn: function () {
        this.get('inScene').set('visible', true);
        this.get('outScene').set('visible', false);
    },
    
    setNewScene: function (dt) {
        var dir = Director.get('sharedDirector');
        
        this.unscheduleSelector(this.setNewScene);
        // Save 'send cleanup to scene'
        // Not sure if it's cool to be accessing all these Director privates like this...
        this.set('sendCleanupToScene', dir._sendCleanupToScene);
        
        dir.replaceScene(this.get('inScene'));
        
        // enable events while transitions
        EventDispatcher.get('sharedDispatcher').set('dispatchEvents', true);

        // issue #267 
        this.get('outScene').set('visible', true);
    },

    sceneOrder: function () {
        this.set('inSceneOnTop', true);
    },

    draw: function (context, rect) {
        if (this.get('inSceneOnTop')) {
            this.get('outScene').visit(context, rect);
            this.get('inScene').visit(context, rect);
        } else {
            this.get('inScene').visit(context, rect);
            this.get('outScene').visit(context, rect);
        }
    },
    
    onEnter: function () {
        TransitionScene.superclass.onEnter.call(this);
        this.get('inScene').onEnter();
        // outScene_ should not receive the onEnter callback
    },

    onExit: function () {
        TransitionScene.superclass.onExit.call(this);
        this.get('outScene').onExit();
        // inScene_ should not receive the onExit callback
        // only the onEnterTransitionDidFinish
        if (this.get('inScene').hasOwnProperty('onEnterTransitionDidFinish')) {
            this.get('inScene').onEnterTransitionDidFinish();
        }
    },

    cleanup: function () {
        TransitionScene.superclass.cleanup.call(this);

        if (this.get('sendCleanupToScene')) {
            this.get('outScene').cleanup();
        }
    }
});

/**
 * @class Rotate and zoom out the outgoing scene, and then rotate and zoom in the incoming 
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionScene
 */
var TransitionRotoZoom = TransitionScene.extend(/** @lends cocos.nodes.TransitionRotoZoom */{
    onEnter: function() {
        TransitionRotoZoom.superclass.onEnter.call(this);
        
        var dur = this.get('duration');
        this.get('inScene').set('scale', 0.001);
        this.get('outScene').set('scale', 1.0);
        
        this.get('inScene').set('anchorPoint', geo.ccp(0.5, 0.5));
        this.get('outScene').set('anchorPoint', geo.ccp(0.5, 0.5));
        
        var outzoom = [
            actions.Spawn.initWithActions({actions: [
                actions.ScaleBy.create({scale: 0.001, duration: dur/2}),
                actions.RotateBy.create({angle: 360*2, duration: dur/2})
                ]}),
            actions.DelayTime.create({duration: dur/2})];
        
        // Can't nest sequences or reverse them very easily, so incoming scene actions must be put 
        // together manually for now...
        var inzoom = [
            actions.DelayTime.create({duration: dur/2}),
            
            actions.Spawn.initWithActions({actions: [
                actions.ScaleTo.create({scale: 1.0, duration: dur/2}),
                actions.RotateBy.create({angle: -360*2, duration: dur/2})
                ]}),
            actions.CallFunc.create({
                target: this,
                method: this.finish
            })
        ];
        
        // Sequence init() copies actions
        this.get('outScene').runAction(actions.Sequence.create({actions: outzoom}));
        this.get('inScene').runAction(actions.Sequence.create({actions: inzoom}));
    }
});

/**
 * @class Move in from to the left the incoming scene.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionScene
 */
var TransitionMoveInL = TransitionScene.extend(/** @lends cocos.nodes.TransitionMoveInL */{
    onEnter: function () {
        TransitionMoveInL.superclass.onEnter.call(this);

        this.initScenes();

        this.get('inScene').runAction(actions.Sequence.create({actions: [
            this.action(),
            actions.CallFunc.create({
                target: this,
                method: this.finish
            })]
        }));
    },
    
    action: function () {
        return actions.MoveTo.create({
            position: geo.ccp(0, 0),
            duration: this.get('duration')
        });
    },
    
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(-s.width, 0));
    }
});
    
/**
 * @class Move in from to the right the incoming scene.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionMoveInL
 */
var TransitionMoveInR = TransitionMoveInL.extend(/** @lends cocos.nodes.TransitionMoveInR */{
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(s.width, 0));
    }
});

/**
 * @class Move the incoming scene in from the top.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionMoveInL
 */
var TransitionMoveInT = TransitionMoveInL.extend(/** @lends cocos.nodes.TransitionMoveInT */{
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, s.height));
    }
});

/**
 * @class Move the incoming scene in from the bottom.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionMoveInL
 */
var TransitionMoveInB = TransitionMoveInL.extend(/** @lends cocos.nodes.TransitionMoveInB */{
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, -s.height));
    }
});

/**
 * @class Slide in the incoming scene from the left.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionScene
 */
var TransitionSlideInL = TransitionScene.extend(/** @lends cocos.nodes.TransitionSlideInL */{
    onEnter: function () {
        TransitionSlideInL.superclass.onEnter.call(this);

        this.initScenes();

        var movein = this.action();
        var moveout = this.action();
        var outAction = actions.Sequence.create({
            actions: [
            moveout, 
            actions.CallFunc.create({
                target: this,
                method: this.finish
            })]
        });
        this.get('inScene').runAction(movein);
        this.get('outScene').runAction(outAction);
    },

    sceneOrder: function () {
        this.set('inSceneOnTop', false);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(-s.width, 0));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(s.width, 0),
            duration: this.get('duration')
        });
    }
});

/** 
 * @class Slide in the incoming scene from the right.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionSlideInL
 */
var TransitionSlideInR = TransitionSlideInL.extend(/** @lends cocos.nodes.TransitionSlideInR */{
    sceneOrder: function () {
        this.set('inSceneOnTop', true);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(s.width, 0));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(-s.width, 0),
            duration: this.get('duration')
        });
    }
});

/**
 * @class Slide in the incoming scene from the top.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionSlideInL
 */
var TransitionSlideInT = TransitionSlideInL.extend(/** @lends cocos.nodes.TransitionSlideInT */{
    sceneOrder: function () {
        this.set('inSceneOnTop', false);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, s.height));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(0, -s.height),
            duration: this.get('duration')
        });
    }
});

/**
 * @class Slide in the incoming scene from the bottom.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionSlideInL
 */
var TransitionSlideInB = TransitionSlideInL.extend(/** @lends cocos.nodes.TransitionSlideInB */{
    sceneOrder: function () {
        this.set('inSceneOnTop', true);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, -s.height));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(0, s.height),
            duration: this.get('duration')
        });
    }
});

exports.TransitionScene = TransitionScene;
exports.TransitionRotoZoom = TransitionRotoZoom;
exports.TransitionMoveInL = TransitionMoveInL;
exports.TransitionMoveInR = TransitionMoveInR;
exports.TransitionMoveInT = TransitionMoveInT;
exports.TransitionMoveInB = TransitionMoveInB;
exports.TransitionSlideInL = TransitionSlideInL;
exports.TransitionSlideInR = TransitionSlideInR;
exports.TransitionSlideInT = TransitionSlideInT;
exports.TransitionSlideInB = TransitionSlideInB;

}};
__resources__["/__builtin__/libs/cocos2d/Preloader.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');

var Preloader = BObject.extend(/** @lends cocos.Preloader# */{
    /**
     * Total number of resources.
     * @type Integer
     */
    count: -1,

    /**
     * Number of resources that have finished loading
     * @type Integer
     */
    loaded: 0,

    _listeners: null,

    /**
     * @class Preloads all remote resources
     * @memberOf cocos
     * @extends BObject
     * @constructs
     */
    init: function (opts) {
        Preloader.superclass.init.call(this, opts);

        this._listeners = {};
        this.set('count', Object.keys(__remote_resources__).length);
    },

    load: function() {
        this.set('loaded', 0);
        this.set('count', Object.keys(__remote_resources__).length);

        for (var uri in __remote_resources__) {
            if (__remote_resources__.hasOwnProperty(uri)) {
                if (__resources__[uri]) {
                    // Already loaded
                    this.didLoadResource(uri);
                    continue;
                }
                var file = resource(uri);

                // Notify when a resource has loaded
                this._listeners[uri] = events.addListener(file, 'load', util.callback(this, (function(uri) {
                    return function () { this.didLoadResource(uri); };
                })(uri)));

                file.load()
            }
        }
    },
    
    didLoadResource: function(uri) {
        this.set('loaded', this.get('loaded') +1);
        if (this._listeners[uri]) {
            events.removeListener(this._listeners[uri]);
        }
        events.trigger(this, 'load', uri, this);

        if (this.get('loaded') >= this.get('count')) {
            events.trigger(this, 'complete', this);
        }
    }
});

exports.Preloader = Preloader;

}};
__resources__["/__builtin__/libs/cocos2d/RemoteImage.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events'),
    RemoteResource = require('./RemoteResource').RemoteResource;

var RemoteImage = RemoteResource.extend(/** @lends cocos.RemoteImage# */{
    /**
     * @memberOf cocos
     * @extends cocos.RemoteResource
     * @constructs
     */
    init: function (opts) {
        RemoteImage.superclass.init.call(this, opts);
    },

    /**
     * Load a remote image
     * @returns Image
     */
    load: function () {
        var img = new Image();
        var self = this;
        img.onload = function () {
            var path = self.get('path');

            var r = __remote_resources__[path];
            __resources__[path] = util.copy(r);
            __resources__[path].data = img;
            __resources__[path].meta.remote = true;

            events.trigger(self, 'load', self);
        };
        
        img.src = this.get('url');

        return img;
    }
});

exports.RemoteImage = RemoteImage;

}};
__resources__["/__builtin__/libs/cocos2d/RemoteResource.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');

var RemoteResource = BObject.extend(/** @lends cocos.RemoteResource# */{
    /**
     * The URL to the remote resource
     * @type String
     */
    url: null,

    /**
     * The path used to reference the resource in the app
     * @type String
     */
    path: null,

    /**
     * @memberOf cocos
     * @extends BObject
     * @constructs
     */
    init: function (opts) {
        RemoteResource.superclass.init.call(this, opts);

        this.set('url', opts.url);
        this.set('path', opts.path);
        
    },

    /**
     * Load the remote resource via ajax
     */
    load: function () {
        var self = this;

        $.ajax({
            url: this.get('url'),
            success: function (data) {
                var path = self.get('path');
                
                var r = __remote_resources__[path];
                __resources__[path] = util.copy(r);
                __resources__[path].data = data;
                __resources__[path].meta.remote = true;

                events.trigger(self, 'load', self);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                events.trigger(self, 'fail', textStatus, errorThrown);
            }
        });
    }
});


exports.RemoteResource = RemoteResource;

}};
__resources__["/__builtin__/libs/cocos2d/resources/progress-bar-empty.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAAgCAYAAADaBycMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwRJREFUeNrsnbFLW1EUxm9cpP0HLDgUC4JDhoJuOggdBYcg7Sw4BSl0K0inItSpUMSp4NxSHAqOBQfdInTIIAQMDoX4D7TNlJ6PnGtOg76mwUXf7wcf5N28LAfy8d6593630uv10ojMmhZNC6aqacY0ZZpMAHBX6ZouTW1T09QwnZhao/y4MoKBLJtqplXTY+oNcO+5MH01HZiOxjWQJ6YN07rpETUFKB0d077po+n8fwzkmemVaSWM6cZvpmPTqenM9MO/+0WtAe4kD0zTpjnTvGnJ//+VcM+h6b3///9pIHpVeZP6vY7MZ9Mnf6QBgPuNWhYvTM/DmHojb/3V5kYDkfO8C+ahx5Zd017qN1sAoBxocqRu2kz9dkY2kdfxSSQaiG76EF5bvpu2TV+oJUBpWTNtmZ6G15mX/nCRJsKNG8E8zjEPAHAP2E6DJuqKe0WKBrKc+rMtmV3MAwCCieyG63X3jCsDUdMkT9WqYbpHzQAgsOfekNwratlAtMJ01b9QQ0SzLTRMASDSdW/ITVN5xqwMRMvT8wpTdVeZqgWA6zhIgxkYecaiDCSu9zimRgBQQPSIBRlINQycUh8AKCB6RFUGMhMGzqgPABQQPWJGC8l+p8GW/IeJfS0AcDPaO/PTP3cnqAcAjIsM5DJcT1MSACggesSlDKQdBuaoDwAUED2iLQNphoF56gMABUSPaMpAGmFgifoAQAHRIxoyEAWoXviA8kBq1AgArqHmHpHcM05kIEpfzilDijFTEhFJ6wAQmXRvyFGH8oxWnsbVGveOf1aMWZ16AUCgngYRhx33jKvt/Eepn76cUYzZGjUDAPeCzXC9757xVyKZotsP/bPiDbcwEQDMw70g56IeulekYQNRZJmi2/OsjDIQd1L/eAd6IgDlYtL/+ztpkIfacI+4OiOGYx0AYJixj3XIcLAUQDm49YOlMhxtCVBuxj7aMrKcOFwboEzcyuHawyh8Wfmp6o0oxUxBRFOJBivAXUZhydqRr0212henXodWp7dG+fEfAQYAt2e24R/QqdsAAAAASUVORK5CYII=")};
__resources__["/__builtin__/libs/cocos2d/resources/progress-bar-full.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAAgCAYAAADaBycMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5lJREFUeNrsnT9IlVEYxo8uUdTSYmAQBoKDQ6KTf0BocAgcLpKrgjSIBC1mRVNU6hKEOISgaxENQUNDIKh3UmxwEARFKNClpaicbs/D9x6/t4vR9eJy73l+8MDx3O9zeOE8nO8957ynoVQqhQpphXqgLqgdaoGaoHNBCFGrHEGH0B60Ba1Da9BOJS83VGAg/VABGoSuKd5C1D370HvoHbRcrYFch8agUeiKYipEchxAi9ACtHsaA7kJ3YNuuT4++AlahTagbeir/fZLsRaiJjkPNUNtUCfUa+O/wT3zAXph4/+/BsJPlcchy3VE3kCvbUojhKhvmLIYhm67PuZGntinzT8NhM4z7cyD05Y5aD5kyRYhRBpwcWQcmghZOiOayJSfiXgD4UMv3WfLZ+gp9Nb906vQANQHddg7FxVrIWqWHzZR2IRWoI/QF/f7EPQIuuE+Z+7aO38ZyDPogZt53Hfmwe8hJlRHoG7FXIi6pQgthSxxWnImMuNmIs+hh2w0Wkd/yFZbInPOPC7bZ80rmYcQdU+3jfVpG/vBvGDOPTNqnnFsIEyaxKVaJkzn3cyDM5FJxVWIpJi0sR9XY+bNG4J5RSEaCHeYDtoPnLJwtSUmTMdkHkIkbSJj1j4yb4ifNfSMVhoIt6fHHabMrsalWiZMRxRDIZJmxLwgmDfEFRh6Rg8NxO/3WHXtgaCchxCp021ecJJHdNFA2l3Hhmv3KXZCiDIv8B7RTgNpcR3brt2huAkhyrzAe0QL94H8DvmR/AshP9fyPWiTmBAi22x2ydo8O/PT2keNio0QolpoIIfu72bX3lV4hBBlXuA94pAGsuc62lx7U3ETQpR5gfeIPRrIluvodO0VxU0IUeYF3iO2aCDrrqPXtXkqr6jYCZE0RfOCkzxinQbCAqr71sF6IAVr80jvkuInRNIshfx4f8E8IphnrNFAWH05VhniwRlWIorLujzSO6sYCpEks+YBwTxhOOSH6+gZO3EZl3vcD6zNMmbj1ubBmRmZiBBJmsdMyA/PjYe8xOGBecbxcf7lkFVfjrCM2ZC1v4WsjNmdoJyIEPVO0cb6lI39YF4w4Z5ZNM9QSUMhEufMShoSFVUWQpBTF1WO6FoHIdKm6msd/ExEF0sJUf+c+cVSEV1tKUTaVH21pac/6HJtIVLiTC7XLofFl1k/lbkRVjFjIaKmkG86E0LUHlwc4Yl8HqrluTjmOrg7faeSl/8IMABgRvK9Q/ireQAAAABJRU5ErkJggg==")};
__resources__["/__builtin__/libs/cocos2d/Scheduler.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util');

/** @ignore */
function HashUpdateEntry() {
    this.timers = [];
    this.timerIndex = 0;
    this.currentTimer = null;
    this.currentTimerSalvaged = false;
    this.paused = false;
}

/** @ignore */
function HashMethodEntry() {
    this.timers = [];
    this.timerIndex = 0;
    this.currentTimer = null;
    this.currentTimerSalvaged = false;
    this.paused = false;
}

var Timer = BObject.extend(/** @lends cocos.Timer# */{
    callback: null,
    interval: 0,
    elapsed: -1,

    /**
     * Runs a function repeatedly at a fixed interval
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {Function} callback The function to run at each interval
     * @opt {Float} interval Number of milliseconds to wait between each exectuion of callback
     */
    init: function (opts) {
        Timer.superclass.init(this, opts);

        this.set('callback', opts.callback);
        this.set('interval', opts.interval || 0);
        this.set('elapsed', -1);
    },

    /**
     * @private
     */
    update: function (dt) {
        if (this.elapsed == -1) {
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }

        if (this.elapsed >= this.interval) {
            this.callback(this.elapsed);
            this.elapsed = 0;
        }
    }
});


var Scheduler = BObject.extend(/** @lends cocos.Scheduler# */{
    updates0: null,
    updatesNeg: null,
    updatesPos: null,
    hashForUpdates: null,
    hashForMethods: null,
    timeScale: 1.0,

    /**
     * Runs the timers
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     * @private
     */
    init: function () {
        this.updates0 = [];
        this.updatesNeg = [];
        this.updatesPos = [];
        this.hashForUpdates = {};
        this.hashForMethods = {};
    },

    /**
     * The scheduled method will be called every 'interval' seconds.
     * If paused is YES, then it won't be called until it is resumed.
     * If 'interval' is 0, it will be called every frame, but if so, it recommened to use 'scheduleUpdateForTarget:' instead.
     * If the selector is already scheduled, then only the interval parameter will be updated without re-scheduling it again.
     */
    schedule: function (opts) {
        var target   = opts.target,
            method   = opts.method,
            interval = opts.interval,
            paused   = opts.paused || false;

        var element = this.hashForMethods[target.get('id')];

        if (!element) {
            element = new HashMethodEntry();
            this.hashForMethods[target.get('id')] = element;
            element.target = target;
            element.paused = paused;
        } else if (element.paused != paused) {
            throw "cocos.Scheduler. Trying to schedule a method with a pause value different than the target";
        }

        var timer = Timer.create({callback: util.callback(target, method), interval: interval});
        element.timers.push(timer);
    },

    /**
     * Schedules the 'update' selector for a given target with a given priority.
     * The 'update' selector will be called every frame.
     * The lower the priority, the earlier it is called.
     */
    scheduleUpdate: function (opts) {
        var target   = opts.target,
            priority = opts.priority,
            paused   = opts.paused;

        var i, len;
        var entry = {target: target, priority: priority, paused: paused};
        var added = false;

        if (priority === 0) {
            this.updates0.push(entry);
        } else if (priority < 0) {
            for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                if (priority < this.updatesNeg[i].priority) {
                    this.updatesNeg.splice(i, 0, entry);
                    added = true;
                    break;
                }
            }

            if (!added) {
                this.updatesNeg.push(entry);
            }
        } else /* priority > 0 */{
            for (i = 0, len = this.updatesPos.length; i < len; i++) {
                if (priority < this.updatesPos[i].priority) {
                    this.updatesPos.splice(i, 0, entry);
                    added = true;
                    break;
                }
            }

            if (!added) {
                this.updatesPos.push(entry);
            }
        }

        this.hashForUpdates[target.get('id')] = entry;
    },

    /**
     * 'tick' the scheduler.
     * You should NEVER call this method, unless you know what you are doing.
     */
    tick: function (dt, add) {
        var i, len, x;
        if (this.timeScale != 1.0) {
            dt *= this.timeScale;
        }

        var entry;
        for (i = 0, len = this.updatesNeg.length; i < len; i++) {
            entry = this.updatesNeg[i];
            if (entry && !entry.paused) {
                entry.target.update(dt);
            }
        }

        for (i = 0, len = this.updates0.length; i < len; i++) {
            entry = this.updates0[i];
            if (entry && !entry.paused) {
                entry.target.update(dt);
            }
        }

        for (i = 0, len = this.updatesPos.length; i < len; i++) {
            entry = this.updatesPos[i];
            if (entry && !entry.paused) {
                entry.target.update(dt);
            }
        }

        for (x in this.hashForMethods) {
            if (this.hashForMethods.hasOwnProperty(x)) {
                entry = this.hashForMethods[x];

                if (entry) {
                    for (i = 0, len = entry.timers.length; i < len; i++) {
                        var timer = entry.timers[i];
                        if (timer) {
                            timer.update(dt);
                        }
                    }
                }
            }
        }

    },

    /**
     * Unshedules a selector for a given target.
     * If you want to unschedule the "update", use unscheduleUpdateForTarget.
     */
    unschedule: function (opts) {
        if (!opts.target || !opts.method) {
            return;
        }
        var element = this.hashForMethods[opts.target.get('id')];
        if (element) {
            for (var i=0; i<element.timers.length; i++) {
                // Compare callback function
                if (element.timers[i].callback == util.callback(opts.target, opts.method)) {
                    var timer = element.timers.splice(i, 1);
                    timer = null;
                }
            }
        }
    },

    /**
     * Unschedules the update selector for a given target
     */
    unscheduleUpdateForTarget: function (target) {
        if (!target) {
            return;
        }
        var id = target.get('id'),
            elementUpdate = this.hashForUpdates[id];
        if (elementUpdate) {
            // Remove from updates list
            if (elementUpdate.priority === 0) {
                this.updates0.splice(this.updates0.indexOf(elementUpdate), 1);
            } else if (elementUpdate.priority < 0) {
                this.updatesNeg.splice(this.updatesNeg.indexOf(elementUpdate), 1);
            } else /* priority > 0 */{
                this.updatesPos.splice(this.updatesPos.indexOf(elementUpdate), 1);
            }
        }
        // Release HashMethodEntry object
        this.hashForUpdates[id] = null;
    },

    /**
     * Unschedules all selectors from all targets.
     * You should NEVER call this method, unless you know what you are doing.
     */
    unscheduleAllSelectors: function () {
        var i, x, entry;

        // Custom selectors
        for (x in this.hashForMethods) {
            if (this.hashForMethods.hasOwnProperty(x)) {
                entry = this.hashForMethods[x];
                this.unscheduleAllSelectorsForTarget(entry.target);
            }
        }
        // Updates selectors
        for (i = 0, len = this.updatesNeg.length; i < len; i++) {
            entry = this.updatesNeg[i];
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target);
            }
        }

        for (i = 0, len = this.updates0.length; i < len; i++) {
            entry = this.updates0[i];
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target);
            }
        }

        for (i = 0, len = this.updatesPos.length; i < len; i++) {
            entry = this.updatesPos[i];
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target);
            }
        }
    },

    /**
     * Unschedules all selectors for a given target.
     * This also includes the "update" selector.
     */
    unscheduleAllSelectorsForTarget: function (target) {
        if (!target) {
            return;
        }
        // Custom selector
        var element = this.hashForMethods[target.get('id')];
        if (element) {
            element.paused = true;
            element.timers = []; // Clear all timers
        }
        // Release HashMethodEntry object
        this.hashForMethods[target.get('id')] = null;

        // Update selector
        this.unscheduleUpdateForTarget(target);
    },

    /**
     * Pauses the target.
     * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.
     * If the target is not present, nothing happens.
     */

    pauseTarget: function (target) {
        var element = this.hashForMethods[target.get('id')];
        if (element) {
            element.paused = true;
        }

        var elementUpdate = this.hashForUpdates[target.get('id')];
        if (elementUpdate) {
            elementUpdate.paused = true;
        }
    },

    /**
     * Resumes the target.
     * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.
     * If the target is not present, nothing happens.
     */

    resumeTarget: function (target) {
        var element = this.hashForMethods[target.get('id')];
        if (element) {
            element.paused = false;
        }

        var elementUpdate = this.hashForUpdates[target.get('id')];
        //console.log('foo', target.get('id'), elementUpdate);
        if (elementUpdate) {
            elementUpdate.paused = false;
        }
    }
});

util.extend(Scheduler, /** @lends cocos.Scheduler */{
    /**
     * A shared singleton instance of cocos.Scheduler
     * @getter sharedScheduler 
     * @type cocos.Scheduler
     */
    get_sharedScheduler: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.Timer = Timer;
exports.Scheduler = Scheduler;

}};
__resources__["/__builtin__/libs/cocos2d/SpriteFrame.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp;

var SpriteFrame = BObject.extend(/** @lends cocos.SpriteFrame# */{
    rect: null,
    rotated: false,
    offset: null,
    originalSize: null,
    texture: null,

    /**
     * Represents a single frame of animation for a cocos.Sprite
     *
     * <p>A SpriteFrame has:<br>
     * - texture: A Texture2D that will be used by the Sprite<br>
     * - rectangle: A rectangle of the texture</p>
     *
     * <p>You can modify the frame of a Sprite by doing:</p>
     * 
     * <code>var frame = SpriteFrame.create({texture: texture, rect: rect});
     * sprite.set('displayFrame', frame);</code>
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {cocos.Texture2D} texture The texture to draw this frame using
     * @opt {geometry.Rect} rect The rectangle inside the texture to draw
     */
    init: function (opts) {
        SpriteFrame.superclass.init(this, opts);

        this.texture      = opts.texture;
        this.rect         = opts.rect;
        this.rotated      = !!opts.rotate;
        this.offset       = opts.offset || ccp(0, 0);
        this.originalSize = opts.originalSize || util.copy(this.rect.size);
    },

    /**
     * @ignore
     */
    toString: function () {
        return "[object SpriteFrame | TextureName=" + this.texture.get('name') + ", Rect = (" + this.rect.origin.x + ", " + this.rect.origin.y + ", " + this.rect.size.width + ", " + this.rect.size.height + ")]";
    },

    /**
     * Make a copy of this frame
     *
     * @returns {cocos.SpriteFrame} Exact copy of this object
     */
    copy: function () {
        return SpriteFrame.create({rect: this.rect, rotated: this.rotated, offset: this.offset, originalSize: this.originalSize, texture: this.texture});
    }

});

exports.SpriteFrame = SpriteFrame;

}};
__resources__["/__builtin__/libs/cocos2d/SpriteFrameCache.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    Plist = require('Plist').Plist,
    SpriteFrame = require('./SpriteFrame').SpriteFrame,
    Texture2D = require('./Texture2D').Texture2D;

var SpriteFrameCache = BObject.extend(/** @lends cocos.SpriteFrameCache# */{
    /**
     * List of sprite frames
     * @type Object
     */
    spriteFrames: null,

    /**
     * List of sprite frame aliases
     * @type Object
     */
    spriteFrameAliases: null,


    /**
     * @memberOf cocos
     * @extends BObject
     * @constructs
     * @singleton
     */
    init: function () {
        SpriteFrameCache.superclass.init.call(this);

        this.set('spriteFrames', {});
        this.set('spriteFrameAliases', {});
    },

    /**
     * Add SpriteFrame(s) to the cache
     *
     * @param {String} opts.file The filename of a Zwoptex .plist containing the frame definiitons.
     */
    addSpriteFrames: function (opts) {
        var plistPath = opts.file,
            plist = Plist.create({file: plistPath}),
            plistData = plist.get('data');


        var metaDataDict = plistData.metadata,
            framesDict = plistData.frames;

        var format = 0,
            texturePath = null;

        if (metaDataDict) {
            format = metaDataDict.format;
            // Get texture path from meta data
            texturePath = metaDataDict.textureFileName;
        }

        if (!texturePath) {
            // No texture path so assuming it's the same name as the .plist but ending in .png
            texturePath = plistPath.replace(/\.plist$/i, '.png');
        }


        var texture = Texture2D.create({file: texturePath});

        // Add frames
        for (var frameDictKey in framesDict) {
            if (framesDict.hasOwnProperty(frameDictKey)) {
                var frameDict = framesDict[frameDictKey],
                    spriteFrame = null;

                switch (format) {
                case 0:
                    var x = frameDict.x,
                        y =  frameDict.y,
                        w =  frameDict.width,
                        h =  frameDict.height,
                        ox = frameDict.offsetX,
                        oy = frameDict.offsetY,
                        ow = frameDict.originalWidth,
                        oh = frameDict.originalHeight;

                    // check ow/oh
                    if (!ow || !oh) {
                        //console.log("cocos2d: WARNING: originalWidth/Height not found on the CCSpriteFrame. AnchorPoint won't work as expected. Regenerate the .plist");
                    }

                    if (FLIP_Y_AXIS) {
                        oy *= -1;
                    }

                    // abs ow/oh
                    ow = Math.abs(ow);
                    oh = Math.abs(oh);

                    // create frame
                    spriteFrame = SpriteFrame.create({texture: texture,
                                                         rect: geo.rectMake(x, y, w, h),
                                                       rotate: false,
                                                       offset: geo.ccp(ox, oy),
                                                 originalSize: geo.sizeMake(ow, oh)});
                    break;

                case 1:
                case 2:
                    var frame      = geo.rectFromString(frameDict.frame),
                        rotated    = !!frameDict.rotated,
                        offset     = geo.pointFromString(frameDict.offset),
                        sourceSize = geo.sizeFromString(frameDict.sourceSize);

                    if (FLIP_Y_AXIS) {
                        offset.y *= -1;
                    }


                    // create frame
                    spriteFrame = SpriteFrame.create({texture: texture,
                                                         rect: frame,
                                                       rotate: rotated,
                                                       offset: offset,
                                                 originalSize: sourceSize});
                    break;

                case 3:
                    var spriteSize       = geo.sizeFromString(frameDict.spriteSize),
                        spriteOffset     = geo.pointFromString(frameDict.spriteOffset),
                        spriteSourceSize = geo.sizeFromString(frameDict.spriteSourceSize),
                        textureRect      = geo.rectFromString(frameDict.textureRect),
                        textureRotated   = frameDict.textureRotated;
                    

                    if (FLIP_Y_AXIS) {
                        spriteOffset.y *= -1;
                    }

                    // get aliases
                    var aliases = frameDict.aliases;
                    for (var i = 0, len = aliases.length; i < len; i++) {
                        var alias = aliases[i];
                        this.get('spriteFrameAliases')[frameDictKey] = alias;
                    }
                    
                    // create frame
                    spriteFrame = SpriteFrame.create({texture: texture,
                                                         rect: geo.rectMake(textureRect.origin.x, textureRect.origin.y, spriteSize.width, spriteSize.height),
                                                       rotate: textureRotated,
                                                       offset: spriteOffset,
                                                 originalSize: spriteSourceSize});
                    break;

                default:
                    throw "Unsupported Zwoptex format: " + format;
                }

                // Add sprite frame
                this.get('spriteFrames')[frameDictKey] = spriteFrame;
            }
        }
    },

    /**
     * Get a single SpriteFrame
     *
     * @param {String} opts.name The name of the sprite frame
     * @returns {cocos.SpriteFrame} The sprite frame
     */
    getSpriteFrame: function (opts) {
        var name = opts.name;

        var frame = this.get('spriteFrames')[name];

        if (!frame) {
            // No frame, look for an alias
            var key = this.get('spriteFrameAliases')[name];

            if (key) {
                frame = this.get('spriteFrames')[key];
            }

            if (!frame) {
                throw "Unable to find frame: " + name;
            }
        }

        return frame;
    }
});

/**
 * Class methods
 */
util.extend(SpriteFrameCache, /** @lends cocos.SpriteFrameCache */{
    /**
     * @field
     * @name cocos.SpriteFrameCache.sharedSpriteFrameCache
     * @type cocos.SpriteFrameCache
     */
    get_sharedSpriteFrameCache: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.SpriteFrameCache = SpriteFrameCache;

}};
__resources__["/__builtin__/libs/cocos2d/Texture2D.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events'),
    RemoteResource = require('./RemoteResource').RemoteResource;

var Texture2D = BObject.extend(/** @lends cocos.Texture2D# */{
    imgElement: null,
    size: null,
    name: null,
    isLoaded: false,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {String} [file] The file path of the image to use as a texture
     * @opt {Texture2D|HTMLImageElement} [data] Image data to read from
     */
    init: function (opts) {
        var file = opts.file,
            data = opts.data,
            texture = opts.texture;

        if (file) {
            this.name = file;
            data = resource(file);
        } else if (texture) {
            this.name = texture.get('name');
            data = texture.get('imgElement');
        }

        this.size = {width: 0, height: 0};

        if (data instanceof RemoteResource) {
            events.addListener(data, 'load', util.callback(this, this.dataDidLoad));
            this.set('imgElement', data.load());
        } else {
            this.set('imgElement', data);
            this.dataDidLoad(data);
        }
    },

    dataDidLoad: function (data) {
        this.isLoaded = true;
        this.set('size', {width: this.imgElement.width, height: this.imgElement.height});
        events.trigger(self, 'load', self);
    },

    drawAtPoint: function (ctx, point) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, point.x, point.y);
    },
    drawInRect: function (ctx, rect) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement,
            rect.origin.x, rect.origin.y,
            rect.size.width, rect.size.height
        );
    },

    /**
     * @getter data
     * @type {String} Base64 encoded image data
     */
    get_data: function () {
        return this.imgElement ? this.imgElement.src : null;
    },

    /**
     * @getter contentSize
     * @type {geometry.Size} Size of the texture
     */
    get_contentSize: function () {
        return this.size;
    },

    get_pixelsWide: function () {
        return this.size.width;
    },

    get_pixelsHigh: function () {
        return this.size.height;
    }
});

exports.Texture2D = Texture2D;

}};
__resources__["/__builtin__/libs/cocos2d/TextureAtlas.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Texture2D = require('./Texture2D').Texture2D;


/* QUAD STRUCTURE
 quad = {
     drawRect: <rect>, // Where the quad is drawn to
     textureRect: <rect>  // The slice of the texture to draw in drawRect
 }
*/

var TextureAtlas = BObject.extend(/** @lends cocos.TextureAtlas# */{
    quads: null,
    imgElement: null,
    texture: null,

    /**
     * A single texture that can represent lots of smaller images
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {String} file The file path of the image to use as a texture
     * @opt {Texture2D|HTMLImageElement} [data] Image data to read from
     * @opt {CanvasElement} [canvas] A canvas to use as a texture
     */
    init: function (opts) {
        var file = opts.file,
            data = opts.data,
            texture = opts.texture,
            canvas = opts.canvas;

        if (canvas) {
            // If we've been given a canvas element then we'll use that for our image
            this.imgElement = canvas;
        } else {
            texture = Texture2D.create({texture: texture, file: file, data: data});
            this.set('texture', texture);
            this.imgElement = texture.get('imgElement');
        }

        this.quads = [];
    },

    insertQuad: function (opts) {
        var quad = opts.quad,
            index = opts.index || 0;

        this.quads.splice(index, 0, quad);
    },
    removeQuad: function (opts) {
        var index = opts.index;

        this.quads.splice(index, 1);
    },


    drawQuads: function (ctx) {
        util.each(this.quads, util.callback(this, function (quad) {
            if (!quad) {
                return;
            }

            this.drawQuad(ctx, quad);
        }));
    },

    drawQuad: function (ctx, quad) {
        var sx = quad.textureRect.origin.x,
            sy = quad.textureRect.origin.y,
            sw = quad.textureRect.size.width, 
            sh = quad.textureRect.size.height;

        var dx = quad.drawRect.origin.x,
            dy = quad.drawRect.origin.y,
            dw = quad.drawRect.size.width, 
            dh = quad.drawRect.size.height;


        var scaleX = 1;
        var scaleY = 1;

        if (FLIP_Y_AXIS) {
            dy -= dh;
            dh *= -1;
        }

            
        if (dw < 0) {
            dw *= -1;
            scaleX = -1;
        }
            
        if (dh < 0) {
            dh *= -1;
            scaleY = -1;
        }

        ctx.scale(scaleX, scaleY);

        var img = this.get('imgElement');
        ctx.drawImage(img, 
            sx, sy, // Draw slice from x,y
            sw, sh, // Draw slice size
            dx, dy, // Draw at 0, 0
            dw, dh  // Draw size
        );
        ctx.scale(1, 1);
    }
});

exports.TextureAtlas = TextureAtlas;

}};
__resources__["/__builtin__/libs/cocos2d/TMXOrientation.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

/**
 * @memberOf cocos
 * @namespace
 */
var TMXOrientation = /** @lends cocos.TMXOrientation */{
    /**
     * Orthogonal orientation
     * @constant
     */
    TMXOrientationOrtho: 1,

    /**
     * Hexagonal orientation
     * @constant
     */
    TMXOrientationHex: 2,

    /**
     * Isometric orientation
     * @constant
     */
    TMXOrientationIso: 3
};

module.exports = TMXOrientation;

}};
__resources__["/__builtin__/libs/cocos2d/TMXXMLParser.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray DOMParser console*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path'),
    ccp = require('geometry').ccp,
    base64 = require('base64'),
    gzip   = require('gzip'),
    TMXOrientationOrtho = require('./TMXOrientation').TMXOrientationOrtho,
    TMXOrientationHex = require('./TMXOrientation').TMXOrientationHex,
    TMXOrientationIso = require('./TMXOrientation').TMXOrientationIso;

var TMXTilesetInfo = BObject.extend(/** @lends cocos.TMXTilesetInfo# */{
    name: '',
    firstGID: 0,
    tileSize: null,
    spacing: 0,
    margin: 0,
    sourceImage: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     */
    init: function () {
        TMXTilesetInfo.superclass.init.call(this);
    },

    rectForGID: function (gid) {
        var rect = {size: {}, origin: ccp(0, 0)};
        rect.size = util.copy(this.tileSize);
        
        gid = gid - this.firstGID;

        var imgSize = this.get('imageSize');
        
        var maxX = Math.floor((imgSize.width - this.margin * 2 + this.spacing) / (this.tileSize.width + this.spacing));
        
        rect.origin.x = (gid % maxX) * (this.tileSize.width + this.spacing) + this.margin;
        rect.origin.y = Math.floor(gid / maxX) * (this.tileSize.height + this.spacing) + this.margin;
        
        return rect;
    }
});

var TMXLayerInfo = BObject.extend(/** @lends cocos.TMXLayerInfo# */{
    name: '',
    layerSize: null,
    tiles: null,
    visible: true,
    opacity: 255,
    minGID: 100000,
    maxGID: 0,
    properties: null,
    offset: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     */
    init: function () {
        TMXLayerInfo.superclass.init.call(this);

        this.properties = {};
        this.offset = ccp(0, 0);
    }
});

var TMXObjectGroup = BObject.extend(/** @lends cocos.TMXObjectGroup# */{
    name: '',
    properties: null,
    offset: null,
    objects: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     */
    init: function () {
        TMXObjectGroup.superclass.init.call(this);

        this.properties = {};
        this.objects = {};
        this.offset = ccp(0, 0);
    },

    /**
     * Get the value for the specific property name
     *
     * @opt {String} name Property name
     * @returns {String} Property value
     */
    getProperty: function (opts) {
        var propertyName = opts.name;
        return this.properties[propertyName];
    },

    /**
     * @deprected Since v0.2. You should now use cocos.TMXObjectGroup#getProperty
     */
    propertyNamed: function (opts) {
        console.warn('TMXObjectGroup#propertyNamed is deprected. Use TMXTiledMap#getProperty instread');
        return this.getProperty(opts);
    },

    /**
     * Get the object for the specific object name. It will return the 1st
     * object found on the array for the given name.
     *
     * @opt {String} name Object name
     * @returns {Object} Object
     */
    getObject: function (opts) {
        var objectName = opts.name;
        var object = null;
        
        this.objects.forEach(function (item) {
            if (item.name == objectName) {
                object = item;
            }
        });
        if (object !== null) {
            return object;
        }
    },

    /**
     * @deprected Since v0.2. You should now use cocos.TMXObjectGroup#getProperty
     */
    objectNamed: function (opts) {
        console.warn('TMXObjectGroup#objectNamed is deprected. Use TMXObjectGroup#getObject instread');
        return this.getObject(opts);
    }
});

var TMXMapInfo = BObject.extend(/** @lends cocos.TMXMapInfo# */{
    filename: '',
    orientation: 0,
    mapSize: null,
    tileSize: null,
    layer: null,
    tilesets: null,
    objectGroups: null,
    properties: null,
    tileProperties: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @param {String} tmxFile The file path of the TMX file to load
     */
    init: function (tmxFile) {
        TMXMapInfo.superclass.init.call(this, tmxFile);

        this.tilesets = [];
        this.layers = [];
        this.objectGroups = [];
        this.properties = {};
        this.tileProperties = {};
        this.filename = tmxFile;

        this.parseXMLFile(tmxFile);
    },

    parseXMLFile: function (xmlFile) {
        var parser = new DOMParser(),
            doc = parser.parseFromString(resource(xmlFile), 'text/xml');

        // PARSE <map>
        var map = doc.documentElement;

        // Set Orientation
        switch (map.getAttribute('orientation')) {
        case 'orthogonal':
            this.orientation = TMXOrientationOrtho;
            break;
        case 'isometric':
            this.orientation = TMXOrientationIso;
            break;
        case 'hexagonal':
            this.orientation = TMXOrientationHex;
            break;
        default:
            throw "cocos2d: TMXFomat: Unsupported orientation: " + map.getAttribute('orientation');
        }
        this.mapSize = {width: parseInt(map.getAttribute('width'), 10), height: parseInt(map.getAttribute('height'), 10)};
        this.tileSize = {width: parseInt(map.getAttribute('tilewidth'), 10), height: parseInt(map.getAttribute('tileheight'), 10)};


        // PARSE <tilesets>
        var tilesets = map.getElementsByTagName('tileset');
        var i, j, len, jen, s;
        for (i = 0, len = tilesets.length; i < len; i++) {
            var t = tilesets[i];

            var tileset = TMXTilesetInfo.create();
            tileset.set('name', t.getAttribute('name'));
            tileset.set('firstGID', parseInt(t.getAttribute('firstgid'), 10));
            if (t.getAttribute('spacing')) {
                tileset.set('spacing', parseInt(t.getAttribute('spacing'), 10));
            }
            if (t.getAttribute('margin')) {
                tileset.set('margin', parseInt(t.getAttribute('margin'), 10));
            }

            s = {};
            s.width = parseInt(t.getAttribute('tilewidth'), 10);
            s.height = parseInt(t.getAttribute('tileheight'), 10);
            tileset.set('tileSize', s);

            // PARSE <image> We assume there's only 1
            var image = t.getElementsByTagName('image')[0];
            tileset.set('sourceImage', path.join(path.dirname(this.filename), image.getAttribute('source')));

            this.tilesets.push(tileset);
        }

        // PARSE <layers>
        var layers = map.getElementsByTagName('layer');
        for (i = 0, len = layers.length; i < len; i++) {
            var l = layers[i];
            var data = l.getElementsByTagName('data')[0];
            var layer = TMXLayerInfo.create();

            layer.set('name', l.getAttribute('name'));
            if (l.getAttribute('visible') !== false) {
                layer.set('visible', true);
            } else {
                layer.set('visible', !!parseInt(l.getAttribute('visible'), 10));
            }

            s = {};
            s.width = parseInt(l.getAttribute('width'), 10);
            s.height = parseInt(l.getAttribute('height'), 10);
            layer.set('layerSize', s);

            var opacity = l.getAttribute('opacity');
            if (!opacity && opacity !== 0) {
                layer.set('opacity', 255);
            } else {
                layer.set('opacity', 255 * parseFloat(opacity));
            }

            var x = parseInt(l.getAttribute('x'), 10),
                y = parseInt(l.getAttribute('y'), 10);
            if (isNaN(x)) {
                x = 0;
            }
            if (isNaN(y)) {
                y = 0;
            }
            layer.set('offset', ccp(x, y));


            // Firefox has a 4KB limit on node values. It will split larger
            // nodes up into multiple nodes. So, we'll stitch them back
            // together.
            var nodeValue = '';
            for (j = 0, jen = data.childNodes.length; j < jen; j++) {
                nodeValue += data.childNodes[j].nodeValue;
            }

            // Unpack the tilemap data
            var compression = data.getAttribute('compression');
            switch (compression) {
            case 'gzip':
                layer.set('tiles', gzip.unzipBase64AsArray(nodeValue, 4));
                break;
                
            // Uncompressed
            case null:
            case '': 
                layer.set('tiles', base64.decodeAsArray(nodeValue, 4));
                break;

            default: 
                throw "Unsupported TMX Tile Map compression: " + compression;
            }

            this.layers.push(layer);
        }

        // TODO PARSE <tile>

        // PARSE <objectgroup>
        var objectgroups = map.getElementsByTagName('objectgroup');
        for (i = 0, len = objectgroups.length; i < len; i++) {
            var g = objectgroups[i],
                objectGroup = TMXObjectGroup.create();

            objectGroup.set('name', g.getAttribute('name'));
            
            var properties = g.querySelectorAll('objectgroup > properties property'),
                propertiesValue = {},
                property;
            
            for (j = 0; j < properties.length; j++) {
                property = properties[j];
                if (property.getAttribute('name')) {
                    propertiesValue[property.getAttribute('name')] = property.getAttribute('value');
                }
            }
           
            objectGroup.set('properties', propertiesValue);

            var objectsArray = [],
                objects = g.querySelectorAll('object');

            for (j = 0; j < objects.length; j++) {
                var object = objects[j];
                var objectValue = {
                    x       : parseInt(object.getAttribute('x'), 10),
                    y       : parseInt(object.getAttribute('y'), 10),
                    width   : parseInt(object.getAttribute('width'), 10),
                    height  : parseInt(object.getAttribute('height'), 10)
                };
                if (object.getAttribute('name')) {
                    objectValue.name = object.getAttribute('name');
                }
                if (object.getAttribute('type')) {
                    objectValue.type = object.getAttribute('type');
                }
                properties = object.querySelectorAll('property');
                for (var k = 0; k < properties.length; k++) {
                    property = properties[k];
                    if (property.getAttribute('name')) {
                        objectValue[property.getAttribute('name')] = property.getAttribute('value');
                    }
                }
                objectsArray.push(objectValue);

            }
            objectGroup.set('objects', objectsArray);
            this.objectGroups.push(objectGroup);
        }


        // PARSE <map><property>
        var properties = doc.querySelectorAll('map > properties > property');

        for (i = 0; i < properties.length; i++) {
            var property = properties[i];
            if (property.getAttribute('name')) {
                this.properties[property.getAttribute('name')] = property.getAttribute('value');
            }
        }
    }
});

exports.TMXMapInfo = TMXMapInfo;
exports.TMXLayerInfo = TMXLayerInfo;
exports.TMXTilesetInfo = TMXTilesetInfo;
exports.TMXObjectGroup = TMXObjectGroup;

}};
__resources__["/__builtin__/libs/geometry.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util');

var RE_PAIR = /\{\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*\}/,
    RE_DOUBLE_PAIR = /\{\s*(\{[\s\d,.\-]+\})\s*,\s*(\{[\s\d,.\-]+\})\s*\}/;

Math.PI_2 = 1.57079632679489661923132169163975144     /* pi/2 */

/** @namespace */
var geometry = {
    /**
     * @class
     * A 2D point in space
     *
     * @param {Float} x X value
     * @param {Float} y Y value
     */
    Point: function (x, y) {
        /**
         * X coordinate
         * @type Float
         */
        this.x = x;

        /**
         * Y coordinate
         * @type Float
         */
        this.y = y;
    },

    /**
     * @class
     * A 2D size
     *
     * @param {Float} w Width
     * @param {Float} h Height
     */
    Size: function (w, h) {
        /**
         * Width
         * @type Float
         */
        this.width = w;

        /**
         * Height
         * @type Float
         */
        this.height = h;
    },

    /**
     * @class
     * A rectangle
     *
     * @param {Float} x X value
     * @param {Float} y Y value
     * @param {Float} w Width
     * @param {Float} h Height
     */
    Rect: function (x, y, w, h) {
        /**
         * Coordinate in 2D space
         * @type {geometry.Point}
         */
        this.origin = new geometry.Point(x, y);

        /**
         * Size in 2D space
         * @type {geometry.Size}
         */
        this.size   = new geometry.Size(w, h);
    },

    /**
     * @class
     * Transform matrix
     *
     * @param {Float} a
     * @param {Float} b
     * @param {Float} c
     * @param {Float} d
     * @param {Float} tx
     * @param {Float} ty
     */
    TransformMatrix: function (a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    },

    /**
     * @class 
     * Bezier curve control object
     *
     * @param {geometry.Point} controlPoint1
     * @param {geometry.Point} controlPoint2
     * @param {geometry.Point} endPoint
     */
    BezierConfig: function(p1, p2, ep) {
        this.controlPoint1 = util.copy(p1);
        this.controlPoint2 = util.copy(p2);
        this.endPosition = util.copy(ep);
    },
    
    /**
     * Creates a geometry.Point instance
     *
     * @param {Float} x X coordinate
     * @param {Float} y Y coordinate
     * @returns {geometry.Point} 
     */
    ccp: function (x, y) {
        return module.exports.pointMake(x, y);
    },

    /**
     * Add the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    ccpAdd: function (p1, p2) {
        return geometry.ccp(p1.x + p2.x, p1.y + p2.y);
    },

    /**
     * Subtract the values of two points
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    ccpSub: function (p1, p2) {
        return geometry.ccp(p1.x - p2.x, p1.y - p2.y);
    },

    /**
     * Muliply the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    ccpMult: function (p1, p2) {
        return geometry.ccp(p1.x * p2.x, p1.y * p2.y);
    },


    /**
     * Invert the values of a geometry.Point
     *
     * @param {geometry.Point} p Point to invert
     * @returns {geometry.Point} New point
     */
    ccpNeg: function (p) {
        return geometry.ccp(-p.x, -p.y);
    },

    /**
     * Round values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    ccpRound: function (p) {
        return geometry.ccp(Math.round(p.x), Math.round(p.y));
    },

    /**
     * Round up values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    ccpCeil: function (p) {
        return geometry.ccp(Math.ceil(p.x), Math.ceil(p.y));
    },

    /**
     * Round down values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    ccpFloor: function (p) {
        return geometry.ccp(Math.floor(p.x), Math.floor(p.y));
    },

    /**
     * A point at 0x0
     *
     * @returns {geometry.Point} New point at 0x0
     */
    PointZero: function () {
        return geometry.ccp(0, 0);
    },

    /**
     * @returns {geometry.Rect}
     */
    rectMake: function (x, y, w, h) {
        return new geometry.Rect(x, y, w, h);
    },

    /**
     * @returns {geometry.Rect}
     */
    rectFromString: function (str) {
        var matches = str.match(RE_DOUBLE_PAIR),
            p = geometry.pointFromString(matches[1]),
            s = geometry.sizeFromString(matches[2]);

        return geometry.rectMake(p.x, p.y, s.width, s.height);
    },

    /**
     * @returns {geometry.Size}
     */
    sizeMake: function (w, h) {
        return new geometry.Size(w, h);
    },

    /**
     * @returns {geometry.Size}
     */
    sizeFromString: function (str) {
        var matches = str.match(RE_PAIR),
            w = parseFloat(matches[1]),
            h = parseFloat(matches[2]);

        return geometry.sizeMake(w, h);
    },

    /**
     * @returns {geometry.Point}
     */
    pointMake: function (x, y) {
        return new geometry.Point(x, y);
    },

    /**
     * @returns {geometry.Point}
     */
    pointFromString: function (str) {
        var matches = str.match(RE_PAIR),
            x = parseFloat(matches[1]),
            y = parseFloat(matches[2]);

        return geometry.pointMake(x, y);
    },

    /**
     * @returns {Boolean}
     */
    rectContainsPoint: function (r, p) {
        return ((p.x >= r.origin.x && p.x <= r.origin.x + r.size.width) &&
                (p.y >= r.origin.y && p.y <= r.origin.y + r.size.height));
    },

    /**
     * Returns the smallest rectangle that contains the two source rectangles.
     *
     * @param {geometry.Rect} r1
     * @param {geometry.Rect} r2
     * @returns {geometry.Rect}
     */
    rectUnion: function (r1, r2) {
        var rect = new geometry.Rect(0, 0, 0, 0);

        rect.origin.x = Math.min(r1.origin.x, r2.origin.x);
        rect.origin.y = Math.min(r1.origin.y, r2.origin.y);
        rect.size.width = Math.max(r1.origin.x + r1.size.width, r2.origin.x + r2.size.width) - rect.origin.x;
        rect.size.height = Math.max(r1.origin.y + r1.size.height, r2.origin.y + r2.size.height) - rect.origin.y;

        return rect;
    },

    /**
     * @returns {Boolean}
     */
    rectOverlapsRect: function (r1, r2) {
        if (r1.origin.x + r1.size.width < r2.origin.x) {
            return false;
        }
        if (r2.origin.x + r2.size.width < r1.origin.x) {
            return false;
        }
        if (r1.origin.y + r1.size.height < r2.origin.y) {
            return false;
        }
        if (r2.origin.y + r2.size.height < r1.origin.y) {
            return false;
        }

        return true;
    },

    /**
     * Returns the overlapping portion of 2 rectangles
     *
     * @param {geometry.Rect} lhsRect First rectangle
     * @param {geometry.Rect} rhsRect Second rectangle
     * @returns {geometry.Rect} The overlapping portion of the 2 rectangles
     */
    rectIntersection: function (lhsRect, rhsRect) {

        var intersection = new geometry.Rect(
            Math.max(geometry.rectGetMinX(lhsRect), geometry.rectGetMinX(rhsRect)),
            Math.max(geometry.rectGetMinY(lhsRect), geometry.rectGetMinY(rhsRect)),
            0,
            0
        );

        intersection.size.width = Math.min(geometry.rectGetMaxX(lhsRect), geometry.rectGetMaxX(rhsRect)) - geometry.rectGetMinX(intersection);
        intersection.size.height = Math.min(geometry.rectGetMaxY(lhsRect), geometry.rectGetMaxY(rhsRect)) - geometry.rectGetMinY(intersection);

        return intersection;
    },

    /**
     * @returns {Boolean}
     */
    pointEqualToPoint: function (point1, point2) {
        return (point1.x == point2.x && point1.y == point2.y);
    },

    /**
     * @returns {Boolean}
     */
    sizeEqualToSize: function (size1, size2) {
        return (size1.width == size2.width && size1.height == size2.height);
    },

    /**
     * @returns {Boolean}
     */
    rectEqualToRect: function (rect1, rect2) {
        return (module.exports.sizeEqualToSize(rect1.size, rect2.size) && module.exports.pointEqualToPoint(rect1.origin, rect2.origin));
    },

    /**
     * @returns {Float}
     */
    rectGetMinX: function (rect) {
        return rect.origin.x;
    },

    /**
     * @returns {Float}
     */
    rectGetMinY: function (rect) {
        return rect.origin.y;
    },

    /**
     * @returns {Float}
     */
    rectGetMaxX: function (rect) {
        return rect.origin.x + rect.size.width;
    },

    /**
     * @returns {Float}
     */
    rectGetMaxY: function (rect) {
        return rect.origin.y + rect.size.height;
    },

    boundingRectMake: function (p1, p2, p3, p4) {
        var minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        var minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        var maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        var maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

        return new geometry.Rect(minX, minY, (maxX - minX), (maxY - minY));
    },

    /**
     * @returns {geometry.Point}
     */
    pointApplyAffineTransform: function (point, t) {

        /*
        aPoint.x * aTransform.a + aPoint.y * aTransform.c + aTransform.tx,
        aPoint.x * aTransform.b + aPoint.y * aTransform.d + aTransform.ty
        */

        return new geometry.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty);

    },

    /**
     * Apply a transform matrix to a rectangle
     *
     * @param {geometry.Rect} rect Rectangle to transform
     * @param {geometry.TransformMatrix} trans TransformMatrix to apply to rectangle
     * @returns {geometry.Rect} A new transformed rectangle
     */
    rectApplyAffineTransform: function (rect, trans) {

        var p1 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMinY(rect));
        var p2 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMinY(rect));
        var p3 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMaxY(rect));
        var p4 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMaxY(rect));

        p1 = geometry.pointApplyAffineTransform(p1, trans);
        p2 = geometry.pointApplyAffineTransform(p2, trans);
        p3 = geometry.pointApplyAffineTransform(p3, trans);
        p4 = geometry.pointApplyAffineTransform(p4, trans);

        return geometry.boundingRectMake(p1, p2, p3, p4);
    },

    /**
     * Inverts a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to invert
     * @returns {geometry.TransformMatrix} New transform matrix
     */
    affineTransformInvert: function (trans) {
        var determinant = 1 / (trans.a * trans.d - trans.b * trans.c);

        return new geometry.TransformMatrix(
            determinant * trans.d,
            -determinant * trans.b,
            -determinant * trans.c,
            determinant * trans.a,
            determinant * (trans.c * trans.ty - trans.d * trans.tx),
            determinant * (trans.b * trans.tx - trans.a * trans.ty)
        );
    },

    /**
     * Multiply 2 transform matrices together
     * @param {geometry.TransformMatrix} lhs Left matrix
     * @param {geometry.TransformMatrix} rhs Right matrix
     * @returns {geometry.TransformMatrix} New transform matrix
     */
    affineTransformConcat: function (lhs, rhs) {
        return new geometry.TransformMatrix(
            lhs.a * rhs.a + lhs.b * rhs.c,
            lhs.a * rhs.b + lhs.b * rhs.d,
            lhs.c * rhs.a + lhs.d * rhs.c,
            lhs.c * rhs.b + lhs.d * rhs.d,
            lhs.tx * rhs.a + lhs.ty * rhs.c + rhs.tx,
            lhs.tx * rhs.b + lhs.ty * rhs.d + rhs.ty
        );
    },

    /**
     * @returns {Float}
     */
    degreesToRadians: function (angle) {
        return angle / 180.0 * Math.PI;
    },

    /**
     * @returns {Float}
     */
    radiansToDegrees: function (angle) {
        return angle * (180.0 / Math.PI);
    },

    /**
     * Translate (move) a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to translate
     * @param {Float} tx Amount to translate along X axis
     * @param {Float} ty Amount to translate along Y axis
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    affineTransformTranslate: function (trans, tx, ty) {
        var newTrans = util.copy(trans);
        newTrans.tx = trans.tx + trans.a * tx + trans.c * ty;
        newTrans.ty = trans.ty + trans.b * tx + trans.d * ty;
        return newTrans;
    },

    /**
     * Rotate a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to rotate
     * @param {Float} angle Angle in radians
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    affineTransformRotate: function (trans, angle) {
        var sin = Math.sin(angle),
            cos = Math.cos(angle);

        return new geometry.TransformMatrix(
            trans.a * cos + trans.c * sin,
            trans.b * cos + trans.d * sin,
            trans.c * cos - trans.a * sin,
            trans.d * cos - trans.b * sin,
            trans.tx,
            trans.ty
        );
    },

    /**
     * Scale a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to scale
     * @param {Float} sx X scale factor
     * @param {Float} [sy=sx] Y scale factor
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    affineTransformScale: function (trans, sx, sy) {
        if (sy === undefined) {
            sy = sx;
        }

        return new geometry.TransformMatrix(trans.a * sx, trans.b * sx, trans.c * sy, trans.d * sy, trans.tx, trans.ty);
    },

    /**
     * @returns {geometry.TransformMatrix} identity matrix
     */
    affineTransformIdentity: function () {
        return new geometry.TransformMatrix(1, 0, 0, 1, 0, 0);
    }
};

module.exports = geometry;

}};
__resources__["/__builtin__/libs/gzip.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/**
 * @fileoverview 
 */

/** @ignore */
var JXG = require('./JXGUtil');

/**
 * @namespace
 * Wrappers around JXG's GZip utils
 * @see JXG.Util
 */
var gzip = {
    /**
     * Unpack a gzipped byte array
     *
     * @param {Integer[]} input Byte array
     * @returns {String} Unpacked byte string
     */
    unzip: function(input) {
        return (new JXG.Util.Unzip(input)).unzip()[0][0];
    },

    /**
     * Unpack a gzipped byte string encoded as base64
     *
     * @param {String} input Byte string encoded as base64
     * @returns {String} Unpacked byte string
     */
    unzipBase64: function(input) {
        return (new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(input))).unzip()[0][0];
    },

    /**
     * Unpack a gzipped byte string encoded as base64
     *
     * @param {String} input Byte string encoded as base64
     * @param {Integer} bytes Bytes per array item
     * @returns {Integer[]} Unpacked byte array
     */
    unzipBase64AsArray: function(input, bytes) {
        bytes = bytes || 1;

        var dec = this.unzipBase64(input),
            ar = [], i, j, len;
        for (i = 0, len = dec.length/bytes; i < len; i++){
            ar[i] = 0;
            for (j = bytes-1; j >= 0; --j){
                ar[i] += dec.charCodeAt((i *bytes) +j) << (j *8);
            }
        }
        return ar;
    },

    /**
     * Unpack a gzipped byte array
     *
     * @param {Integer[]} input Byte array
     * @param {Integer} bytes Bytes per array item
     * @returns {Integer[]} Unpacked byte array
     */
    unzipAsArray: function (input, bytes) {
        bytes = bytes || 1;

        var dec = this.unzip(input),
            ar = [], i, j, len;
        for (i = 0, len = dec.length/bytes; i < len; i++){
            ar[i] = 0;
            for (j = bytes-1; j >= 0; --j){
                ar[i] += dec.charCodeAt((i *bytes) +j) << (j *8);
            }
        }
        return ar;
    }

};

module.exports = gzip;

}};
__resources__["/__builtin__/libs/JXGUtil.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*
    Copyright 2008,2009
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @fileoverview Utilities for uncompressing and base64 decoding
 */

/** @namespace */
var JXG = {};

/**
  * @class Util class
  * Class for gunzipping, unzipping and base64 decoding of files.
  * It is used for reading GEONExT, Geogebra and Intergeo files.
  *
  * Only Huffman codes are decoded in gunzip.
  * The code is based on the source code for gunzip.c by Pasi Ojala 
  * @see <a href="http://www.cs.tut.fi/~albert/Dev/gunzip/gunzip.c">http://www.cs.tut.fi/~albert/Dev/gunzip/gunzip.c</a>
  * @see <a href="http://www.cs.tut.fi/~albert">http://www.cs.tut.fi/~albert</a>
  */
JXG.Util = {};
                                 
/**
 * Unzip zip files
 */
JXG.Util.Unzip = function (barray){
    var outputArr = [],
        output = "",
        debug = false,
        gpflags,
        files = 0,
        unzipped = [],
        crc,
        buf32k = new Array(32768),
        bIdx = 0,
        modeZIP=false,

        CRC, SIZE,
    
        bitReverse = [
        0x00, 0x80, 0x40, 0xc0, 0x20, 0xa0, 0x60, 0xe0,
        0x10, 0x90, 0x50, 0xd0, 0x30, 0xb0, 0x70, 0xf0,
        0x08, 0x88, 0x48, 0xc8, 0x28, 0xa8, 0x68, 0xe8,
        0x18, 0x98, 0x58, 0xd8, 0x38, 0xb8, 0x78, 0xf8,
        0x04, 0x84, 0x44, 0xc4, 0x24, 0xa4, 0x64, 0xe4,
        0x14, 0x94, 0x54, 0xd4, 0x34, 0xb4, 0x74, 0xf4,
        0x0c, 0x8c, 0x4c, 0xcc, 0x2c, 0xac, 0x6c, 0xec,
        0x1c, 0x9c, 0x5c, 0xdc, 0x3c, 0xbc, 0x7c, 0xfc,
        0x02, 0x82, 0x42, 0xc2, 0x22, 0xa2, 0x62, 0xe2,
        0x12, 0x92, 0x52, 0xd2, 0x32, 0xb2, 0x72, 0xf2,
        0x0a, 0x8a, 0x4a, 0xca, 0x2a, 0xaa, 0x6a, 0xea,
        0x1a, 0x9a, 0x5a, 0xda, 0x3a, 0xba, 0x7a, 0xfa,
        0x06, 0x86, 0x46, 0xc6, 0x26, 0xa6, 0x66, 0xe6,
        0x16, 0x96, 0x56, 0xd6, 0x36, 0xb6, 0x76, 0xf6,
        0x0e, 0x8e, 0x4e, 0xce, 0x2e, 0xae, 0x6e, 0xee,
        0x1e, 0x9e, 0x5e, 0xde, 0x3e, 0xbe, 0x7e, 0xfe,
        0x01, 0x81, 0x41, 0xc1, 0x21, 0xa1, 0x61, 0xe1,
        0x11, 0x91, 0x51, 0xd1, 0x31, 0xb1, 0x71, 0xf1,
        0x09, 0x89, 0x49, 0xc9, 0x29, 0xa9, 0x69, 0xe9,
        0x19, 0x99, 0x59, 0xd9, 0x39, 0xb9, 0x79, 0xf9,
        0x05, 0x85, 0x45, 0xc5, 0x25, 0xa5, 0x65, 0xe5,
        0x15, 0x95, 0x55, 0xd5, 0x35, 0xb5, 0x75, 0xf5,
        0x0d, 0x8d, 0x4d, 0xcd, 0x2d, 0xad, 0x6d, 0xed,
        0x1d, 0x9d, 0x5d, 0xdd, 0x3d, 0xbd, 0x7d, 0xfd,
        0x03, 0x83, 0x43, 0xc3, 0x23, 0xa3, 0x63, 0xe3,
        0x13, 0x93, 0x53, 0xd3, 0x33, 0xb3, 0x73, 0xf3,
        0x0b, 0x8b, 0x4b, 0xcb, 0x2b, 0xab, 0x6b, 0xeb,
        0x1b, 0x9b, 0x5b, 0xdb, 0x3b, 0xbb, 0x7b, 0xfb,
        0x07, 0x87, 0x47, 0xc7, 0x27, 0xa7, 0x67, 0xe7,
        0x17, 0x97, 0x57, 0xd7, 0x37, 0xb7, 0x77, 0xf7,
        0x0f, 0x8f, 0x4f, 0xcf, 0x2f, 0xaf, 0x6f, 0xef,
        0x1f, 0x9f, 0x5f, 0xdf, 0x3f, 0xbf, 0x7f, 0xff
    ],
    
    cplens = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
    ],

    cplext = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99
    ], /* 99==invalid */

    cpdist = [
        0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0007, 0x0009, 0x000d,
        0x0011, 0x0019, 0x0021, 0x0031, 0x0041, 0x0061, 0x0081, 0x00c1,
        0x0101, 0x0181, 0x0201, 0x0301, 0x0401, 0x0601, 0x0801, 0x0c01,
        0x1001, 0x1801, 0x2001, 0x3001, 0x4001, 0x6001
    ],

    cpdext = [
        0,  0,  0,  0,  1,  1,  2,  2,
        3,  3,  4,  4,  5,  5,  6,  6,
        7,  7,  8,  8,  9,  9, 10, 10,
        11, 11, 12, 12, 13, 13
    ],
    
    border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    
    bA = barray,

    bytepos=0,
    bitpos=0,
    bb = 1,
    bits=0,
    
    NAMEMAX = 256,
    
    nameBuf = [],
    
    fileout;
    
    function readByte(){
        bits+=8;
        if (bytepos<bA.length){
            //if (debug)
            //    document.write(bytepos+": "+bA[bytepos]+"<br>");
            return bA[bytepos++];
        } else
            return -1;
    };

    function byteAlign(){
        bb = 1;
    };
    
    function readBit(){
        var carry;
        bits++;
        carry = (bb & 1);
        bb >>= 1;
        if (bb==0){
            bb = readByte();
            carry = (bb & 1);
            bb = (bb>>1) | 0x80;
        }
        return carry;
    };

    function readBits(a) {
        var res = 0,
            i = a;
    
        while(i--) {
            res = (res<<1) | readBit();
        }
        if(a) {
            res = bitReverse[res]>>(8-a);
        }
        return res;
    };
        
    function flushBuffer(){
        //document.write('FLUSHBUFFER:'+buf32k);
        bIdx = 0;
    };
    function addBuffer(a){
        SIZE++;
        //CRC=updcrc(a,crc);
        buf32k[bIdx++] = a;
        outputArr.push(String.fromCharCode(a));
        //output+=String.fromCharCode(a);
        if(bIdx==0x8000){
            //document.write('ADDBUFFER:'+buf32k);
            bIdx=0;
        }
    };
    
    function HufNode() {
        this.b0=0;
        this.b1=0;
        this.jump = null;
        this.jumppos = -1;
    };

    var LITERALS = 288;
    
    var literalTree = new Array(LITERALS);
    var distanceTree = new Array(32);
    var treepos=0;
    var Places = null;
    var Places2 = null;
    
    var impDistanceTree = new Array(64);
    var impLengthTree = new Array(64);
    
    var len = 0;
    var fpos = new Array(17);
    fpos[0]=0;
    var flens;
    var fmax;
    
    function IsPat() {
        while (1) {
            if (fpos[len] >= fmax)
                return -1;
            if (flens[fpos[len]] == len)
                return fpos[len]++;
            fpos[len]++;
        }
    };

    function Rec() {
        var curplace = Places[treepos];
        var tmp;
        if (debug)
    		document.write("<br>len:"+len+" treepos:"+treepos);
        if(len==17) { //war 17
            return -1;
        }
        treepos++;
        len++;
    	
        tmp = IsPat();
        if (debug)
        	document.write("<br>IsPat "+tmp);
        if(tmp >= 0) {
            curplace.b0 = tmp;    /* leaf cell for 0-bit */
            if (debug)
            	document.write("<br>b0 "+curplace.b0);
        } else {
        /* Not a Leaf cell */
        curplace.b0 = 0x8000;
        if (debug)
        	document.write("<br>b0 "+curplace.b0);
        if(Rec())
            return -1;
        }
        tmp = IsPat();
        if(tmp >= 0) {
            curplace.b1 = tmp;    /* leaf cell for 1-bit */
            if (debug)
            	document.write("<br>b1 "+curplace.b1);
            curplace.jump = null;    /* Just for the display routine */
        } else {
            /* Not a Leaf cell */
            curplace.b1 = 0x8000;
            if (debug)
            	document.write("<br>b1 "+curplace.b1);
            curplace.jump = Places[treepos];
            curplace.jumppos = treepos;
            if(Rec())
                return -1;
        }
        len--;
        return 0;
    };

    function CreateTree(currentTree, numval, lengths, show) {
        var i;
        /* Create the Huffman decode tree/table */
        //document.write("<br>createtree<br>");
        if (debug)
        	document.write("currentTree "+currentTree+" numval "+numval+" lengths "+lengths+" show "+show);
        Places = currentTree;
        treepos=0;
        flens = lengths;
        fmax  = numval;
        for (i=0;i<17;i++)
            fpos[i] = 0;
        len = 0;
        if(Rec()) {
            //fprintf(stderr, "invalid huffman tree\n");
            if (debug)
            	alert("invalid huffman tree\n");
            return -1;
        }
        if (debug){
        	document.write('<br>Tree: '+Places.length);
        	for (var a=0;a<32;a++){
            	document.write("Places["+a+"].b0="+Places[a].b0+"<br>");
            	document.write("Places["+a+"].b1="+Places[a].b1+"<br>");
        	}
        }

        return 0;
    };
    
    function DecodeValue(currentTree) {
        var len, i,
            xtreepos=0,
            X = currentTree[xtreepos],
            b;

        /* decode one symbol of the data */
        while(1) {
            b=readBit();
            if (debug)
            	document.write("b="+b);
            if(b) {
                if(!(X.b1 & 0x8000)){
                	if (debug)
                    	document.write("ret1");
                    return X.b1;    /* If leaf node, return data */
                }
                X = X.jump;
                len = currentTree.length;
                for (i=0;i<len;i++){
                    if (currentTree[i]===X){
                        xtreepos=i;
                        break;
                    }
                }
                //xtreepos++;
            } else {
                if(!(X.b0 & 0x8000)){
                	if (debug)
                    	document.write("ret2");
                    return X.b0;    /* If leaf node, return data */
                }
                //X++; //??????????????????
                xtreepos++;
                X = currentTree[xtreepos];
            }
        }
        if (debug)
        	document.write("ret3");
        return -1;
    };
    
    function DeflateLoop() {
    var last, c, type, i, len;

    do {
        /*if((last = readBit())){
            fprintf(errfp, "Last Block: ");
        } else {
            fprintf(errfp, "Not Last Block: ");
        }*/
        last = readBit();
        type = readBits(2);
        switch(type) {
            case 0:
            	if (debug)
                	alert("Stored\n");
                break;
            case 1:
            	if (debug)
                	alert("Fixed Huffman codes\n");
                break;
            case 2:
            	if (debug)
                	alert("Dynamic Huffman codes\n");
                break;
            case 3:
            	if (debug)
                	alert("Reserved block type!!\n");
                break;
            default:
            	if (debug)
                	alert("Unexpected value %d!\n", type);
                break;
        }

        if(type==0) {
            var blockLen, cSum;

            // Stored 
            byteAlign();
            blockLen = readByte();
            blockLen |= (readByte()<<8);

            cSum = readByte();
            cSum |= (readByte()<<8);

            if(((blockLen ^ ~cSum) & 0xffff)) {
                document.write("BlockLen checksum mismatch\n");
            }
            while(blockLen--) {
                c = readByte();
                addBuffer(c);
            }
        } else if(type==1) {
            var j;

            /* Fixed Huffman tables -- fixed decode routine */
            while(1) {
            /*
                256    0000000        0
                :   :     :
                279    0010111        23
                0   00110000    48
                :    :      :
                143    10111111    191
                280 11000000    192
                :    :      :
                287 11000111    199
                144    110010000    400
                :    :       :
                255    111111111    511
    
                Note the bit order!
                */

            j = (bitReverse[readBits(7)]>>1);
            if(j > 23) {
                j = (j<<1) | readBit();    /* 48..255 */

                if(j > 199) {    /* 200..255 */
                    j -= 128;    /*  72..127 */
                    j = (j<<1) | readBit();        /* 144..255 << */
                } else {        /*  48..199 */
                    j -= 48;    /*   0..151 */
                    if(j > 143) {
                        j = j+136;    /* 280..287 << */
                        /*   0..143 << */
                    }
                }
            } else {    /*   0..23 */
                j += 256;    /* 256..279 << */
            }
            if(j < 256) {
                addBuffer(j);
                //document.write("out:"+String.fromCharCode(j));
                /*fprintf(errfp, "@%d %02x\n", SIZE, j);*/
            } else if(j == 256) {
                /* EOF */
                break;
            } else {
                var len, dist;

                j -= 256 + 1;    /* bytes + EOF */
                len = readBits(cplext[j]) + cplens[j];

                j = bitReverse[readBits(5)]>>3;
                if(cpdext[j] > 8) {
                    dist = readBits(8);
                    dist |= (readBits(cpdext[j]-8)<<8);
                } else {
                    dist = readBits(cpdext[j]);
                }
                dist += cpdist[j];

                /*fprintf(errfp, "@%d (l%02x,d%04x)\n", SIZE, len, dist);*/
                for(j=0;j<len;j++) {
                    var c = buf32k[(bIdx - dist) & 0x7fff];
                    addBuffer(c);
                }
            }
            } // while
        } else if(type==2) {
            var j, n, literalCodes, distCodes, lenCodes;
            var ll = new Array(288+32);    // "static" just to preserve stack
    
            // Dynamic Huffman tables 
    
            literalCodes = 257 + readBits(5);
            distCodes = 1 + readBits(5);
            lenCodes = 4 + readBits(4);
            //document.write("<br>param: "+literalCodes+" "+distCodes+" "+lenCodes+"<br>");
            for(j=0; j<19; j++) {
                ll[j] = 0;
            }
    
            // Get the decode tree code lengths
    
            //document.write("<br>");
            for(j=0; j<lenCodes; j++) {
                ll[border[j]] = readBits(3);
                //document.write(ll[border[j]]+" ");
            }
            //fprintf(errfp, "\n");
            //document.write('<br>ll:'+ll);
            len = distanceTree.length;
            for (i=0; i<len; i++)
                distanceTree[i]=new HufNode();
            if(CreateTree(distanceTree, 19, ll, 0)) {
                flushBuffer();
                return 1;
            }
            if (debug){
            	document.write("<br>distanceTree");
            	for(var a=0;a<distanceTree.length;a++){
                	document.write("<br>"+distanceTree[a].b0+" "+distanceTree[a].b1+" "+distanceTree[a].jump+" "+distanceTree[a].jumppos);
                	/*if (distanceTree[a].jumppos!=-1)
                    	document.write(" "+distanceTree[a].jump.b0+" "+distanceTree[a].jump.b1);
                	*/
            	}
            }
            //document.write('<BR>tree created');
    
            //read in literal and distance code lengths
            n = literalCodes + distCodes;
            i = 0;
            var z=-1;
            if (debug)
            	document.write("<br>n="+n+" bits: "+bits+"<br>");
            while(i < n) {
                z++;
                j = DecodeValue(distanceTree);
                if (debug)
                	document.write("<br>"+z+" i:"+i+" decode: "+j+"    bits "+bits+"<br>");
                if(j<16) {    // length of code in bits (0..15)
                       ll[i++] = j;
                } else if(j==16) {    // repeat last length 3 to 6 times 
                       var l;
                    j = 3 + readBits(2);
                    if(i+j > n) {
                        flushBuffer();
                        return 1;
                    }
                    l = i ? ll[i-1] : 0;
                    while(j--) {
                        ll[i++] = l;
                    }
                } else {
                    if(j==17) {        // 3 to 10 zero length codes
                        j = 3 + readBits(3);
                    } else {        // j == 18: 11 to 138 zero length codes 
                        j = 11 + readBits(7);
                    }
                    if(i+j > n) {
                        flushBuffer();
                        return 1;
                    }
                    while(j--) {
                        ll[i++] = 0;
                    }
                }
            }
            /*for(j=0; j<literalCodes+distCodes; j++) {
                //fprintf(errfp, "%d ", ll[j]);
                if ((j&7)==7)
                    fprintf(errfp, "\n");
            }
            fprintf(errfp, "\n");*/
            // Can overwrite tree decode tree as it is not used anymore
            len = literalTree.length;
            for (i=0; i<len; i++)
                literalTree[i]=new HufNode();
            if(CreateTree(literalTree, literalCodes, ll, 0)) {
                flushBuffer();
                return 1;
            }
            len = literalTree.length;
            for (i=0; i<len; i++)
                distanceTree[i]=new HufNode();
            var ll2 = new Array();
            for (i=literalCodes; i <ll.length; i++){
                ll2[i-literalCodes]=ll[i];
            }    
            if(CreateTree(distanceTree, distCodes, ll2, 0)) {
                flushBuffer();
                return 1;
            }
            if (debug)
           		document.write("<br>literalTree");
            while(1) {
                j = DecodeValue(literalTree);
                if(j >= 256) {        // In C64: if carry set
                    var len, dist;
                    j -= 256;
                    if(j == 0) {
                        // EOF
                        break;
                    }
                    j--;
                    len = readBits(cplext[j]) + cplens[j];
    
                    j = DecodeValue(distanceTree);
                    if(cpdext[j] > 8) {
                        dist = readBits(8);
                        dist |= (readBits(cpdext[j]-8)<<8);
                    } else {
                        dist = readBits(cpdext[j]);
                    }
                    dist += cpdist[j];
                    while(len--) {
                        var c = buf32k[(bIdx - dist) & 0x7fff];
                        addBuffer(c);
                    }
                } else {
                    addBuffer(j);
                }
            }
        }
    } while(!last);
    flushBuffer();

    byteAlign();
    return 0;
};

JXG.Util.Unzip.prototype.unzipFile = function(name) {
    var i;
	this.unzip();
	//alert(unzipped[0][1]);
	for (i=0;i<unzipped.length;i++){
		if(unzipped[i][1]==name) {
			return unzipped[i][0];
		}
	}
	
  };
    
    
JXG.Util.Unzip.prototype.unzip = function() {
	//convertToByteArray(input);
	if (debug)
		alert(bA);
	/*for (i=0;i<bA.length*8;i++){
		document.write(readBit());
		if ((i+1)%8==0)
			document.write(" ");
	}*/
	/*for (i=0;i<bA.length;i++){
		document.write(readByte()+" ");
		if ((i+1)%8==0)
			document.write(" ");
	}
	for (i=0;i<bA.length;i++){
		document.write(bA[i]+" ");
		if ((i+1)%16==0)
			document.write("<br>");
	}	
	*/
	//alert(bA);
	nextFile();
	return unzipped;
  };
    
 function nextFile(){
 	if (debug)
 		alert("NEXTFILE");
 	outputArr = [];
 	var tmp = [];
 	modeZIP = false;
	tmp[0] = readByte();
	tmp[1] = readByte();
	if (debug)
		alert("type: "+tmp[0]+" "+tmp[1]);
	if (tmp[0] == parseInt("78",16) && tmp[1] == parseInt("da",16)){ //GZIP
		if (debug)
			alert("GEONExT-GZIP");
		DeflateLoop();
		if (debug)
			alert(outputArr.join(''));
		unzipped[files] = new Array(2);
    	unzipped[files][0] = outputArr.join('');
    	unzipped[files][1] = "geonext.gxt";
    	files++;
	}
	if (tmp[0] == parseInt("1f",16) && tmp[1] == parseInt("8b",16)){ //GZIP
		if (debug)
			alert("GZIP");
		//DeflateLoop();
		skipdir();
		if (debug)
			alert(outputArr.join(''));
		unzipped[files] = new Array(2);
    	unzipped[files][0] = outputArr.join('');
    	unzipped[files][1] = "file";
    	files++;
	}
	if (tmp[0] == parseInt("50",16) && tmp[1] == parseInt("4b",16)){ //ZIP
		modeZIP = true;
		tmp[2] = readByte();
		tmp[3] = readByte();
		if (tmp[2] == parseInt("3",16) && tmp[3] == parseInt("4",16)){
			//MODE_ZIP
			tmp[0] = readByte();
			tmp[1] = readByte();
			if (debug)
				alert("ZIP-Version: "+tmp[1]+" "+tmp[0]/10+"."+tmp[0]%10);
			
			gpflags = readByte();
			gpflags |= (readByte()<<8);
			if (debug)
				alert("gpflags: "+gpflags);
			
			var method = readByte();
			method |= (readByte()<<8);
			if (debug)
				alert("method: "+method);
			
			readByte();
			readByte();
			readByte();
			readByte();
			
			var crc = readByte();
			crc |= (readByte()<<8);
			crc |= (readByte()<<16);
			crc |= (readByte()<<24);
			
			var compSize = readByte();
			compSize |= (readByte()<<8);
			compSize |= (readByte()<<16);
			compSize |= (readByte()<<24);
			
			var size = readByte();
			size |= (readByte()<<8);
			size |= (readByte()<<16);
			size |= (readByte()<<24);
			
			if (debug)
				alert("local CRC: "+crc+"\nlocal Size: "+size+"\nlocal CompSize: "+compSize);
			
			var filelen = readByte();
			filelen |= (readByte()<<8);
			
			var extralen = readByte();
			extralen |= (readByte()<<8);
			
			if (debug)
				alert("filelen "+filelen);
			i = 0;
			nameBuf = [];
			while (filelen--){ 
				var c = readByte();
				if (c == "/" | c ==":"){
					i = 0;
				} else if (i < NAMEMAX-1)
					nameBuf[i++] = String.fromCharCode(c);
			}
			if (debug)
				alert("nameBuf: "+nameBuf);
			
			//nameBuf[i] = "\0";
			if (!fileout)
				fileout = nameBuf;
			
			var i = 0;
			while (i < extralen){
				c = readByte();
				i++;
			}
				
			CRC = 0xffffffff;
			SIZE = 0;
			
			if (size = 0 && fileOut.charAt(fileout.length-1)=="/"){
				//skipdir
				if (debug)
					alert("skipdir");
			}
			if (method == 8){
				DeflateLoop();
				if (debug)
					alert(outputArr.join(''));
				unzipped[files] = new Array(2);
				unzipped[files][0] = outputArr.join('');
    			unzipped[files][1] = nameBuf.join('');
    			files++;
				//return outputArr.join('');
			}
			skipdir();
		}
	}
 };
	
function skipdir(){
    var crc, 
        tmp = [],
        compSize, size, os, i, c;
    
	if ((gpflags & 8)) {
		tmp[0] = readByte();
		tmp[1] = readByte();
		tmp[2] = readByte();
		tmp[3] = readByte();
		
		if (tmp[0] == parseInt("50",16) && 
            tmp[1] == parseInt("4b",16) && 
            tmp[2] == parseInt("07",16) && 
            tmp[3] == parseInt("08",16))
        {
            crc = readByte();
            crc |= (readByte()<<8);
            crc |= (readByte()<<16);
            crc |= (readByte()<<24);
		} else {
			crc = tmp[0] | (tmp[1]<<8) | (tmp[2]<<16) | (tmp[3]<<24);
		}
		
		compSize = readByte();
		compSize |= (readByte()<<8);
		compSize |= (readByte()<<16);
		compSize |= (readByte()<<24);
		
		size = readByte();
		size |= (readByte()<<8);
		size |= (readByte()<<16);
		size |= (readByte()<<24);
		
		if (debug)
			alert("CRC:");
	}

	if (modeZIP)
		nextFile();
	
	tmp[0] = readByte();
	if (tmp[0] != 8) {
		if (debug)
			alert("Unknown compression method!");
        return 0;	
	}
	
	gpflags = readByte();
	if (debug){
		if ((gpflags & ~(parseInt("1f",16))))
			alert("Unknown flags set!");
	}
	
	readByte();
	readByte();
	readByte();
	readByte();
	
	readByte();
	os = readByte();
	
	if ((gpflags & 4)){
		tmp[0] = readByte();
		tmp[2] = readByte();
		len = tmp[0] + 256*tmp[1];
		if (debug)
			alert("Extra field size: "+len);
		for (i=0;i<len;i++)
			readByte();
	}
	
	if ((gpflags & 8)){
		i=0;
		nameBuf=[];
		while (c=readByte()){
			if(c == "7" || c == ":")
				i=0;
			if (i<NAMEMAX-1)
				nameBuf[i++] = c;
		}
		//nameBuf[i] = "\0";
		if (debug)
			alert("original file name: "+nameBuf);
	}
		
	if ((gpflags & 16)){
		while (c=readByte()){
			//FILE COMMENT
		}
	}
	
	if ((gpflags & 2)){
		readByte();
		readByte();
	}
	
	DeflateLoop();
	
	crc = readByte();
	crc |= (readByte()<<8);
	crc |= (readByte()<<16);
	crc |= (readByte()<<24);
	
	size = readByte();
	size |= (readByte()<<8);
	size |= (readByte()<<16);
	size |= (readByte()<<24);
	
	if (modeZIP)
		nextFile();
	
};

};

/**
*  Base64 encoding / decoding
*  @see <a href="http://www.webtoolkit.info/">http://www.webtoolkit.info/</A>
*/
JXG.Util.Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = [],
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0;

        input = JXG.Util.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output.push([this._keyStr.charAt(enc1),
                         this._keyStr.charAt(enc2),
                         this._keyStr.charAt(enc3),
                         this._keyStr.charAt(enc4)].join(''));
        }

        return output.join('');
    },

    // public method for decoding
    decode : function (input, utf8) {
        var output = [],
            chr1, chr2, chr3,
            enc1, enc2, enc3, enc4,
            i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output.push(String.fromCharCode(chr1));

            if (enc3 != 64) {
                output.push(String.fromCharCode(chr2));
            }
            if (enc4 != 64) {
                output.push(String.fromCharCode(chr3));
            }
        }
        
        output = output.join(''); 
        
        if (utf8) {
            output = JXG.Util.Base64._utf8_decode(output);
        }
        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = [],
            i = 0,
            c = 0, c2 = 0, c3 = 0;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string.push(String.fromCharCode(c));
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
                i += 3;
            }
        }
        return string.join('');
    },
    
    _destrip: function (stripped, wrap){
        var lines = [], lineno, i,
            destripped = [];
        
        if (wrap==null) 
            wrap = 76;
            
        stripped.replace(/ /g, "");
        lineno = stripped.length / wrap;
        for (i = 0; i < lineno; i++)
            lines[i]=stripped.substr(i * wrap, wrap);
        if (lineno != stripped.length / wrap)
            lines[lines.length]=stripped.substr(lineno * wrap, stripped.length-(lineno * wrap));
            
        for (i = 0; i < lines.length; i++)
            destripped.push(lines[i]);
        return destripped.join('\n');
    },
    
    decodeAsArray: function (input){
        var dec = this.decode(input),
            ar = [], i;
        for (i=0;i<dec.length;i++){
            ar[i]=dec.charCodeAt(i);
        }
        return ar;
    },
    
    decodeGEONExT : function (input) {
        return decodeAsArray(destrip(input),false);
    }
};

/**
 * @private
 */
JXG.Util.asciiCharCodeAt = function(str,i){
	var c = str.charCodeAt(i);
	if (c>255){
    	switch (c) {
			case 8364: c=128;
	    	break;
	    	case 8218: c=130;
	    	break;
	    	case 402: c=131;
	    	break;
	    	case 8222: c=132;
	    	break;
	    	case 8230: c=133;
	    	break;
	    	case 8224: c=134;
	    	break;
	    	case 8225: c=135;
	    	break;
	    	case 710: c=136;
	    	break;
	    	case 8240: c=137;
	    	break;
	    	case 352: c=138;
	    	break;
	    	case 8249: c=139;
	    	break;
	    	case 338: c=140;
	    	break;
	    	case 381: c=142;
	    	break;
	    	case 8216: c=145;
	    	break;
	    	case 8217: c=146;
	    	break;
	    	case 8220: c=147;
	    	break;
	    	case 8221: c=148;
	    	break;
	    	case 8226: c=149;
	    	break;
	    	case 8211: c=150;
	    	break;
	    	case 8212: c=151;
	    	break;
	    	case 732: c=152;
	    	break;
	    	case 8482: c=153;
	    	break;
	    	case 353: c=154;
	    	break;
	    	case 8250: c=155;
	    	break;
	    	case 339: c=156;
	    	break;
	    	case 382: c=158;
	    	break;
	    	case 376: c=159;
	    	break;
	    	default:
	    	break;
	    }
	}
	return c;
};

/**
 * Decoding string into utf-8
 * @param {String} string to decode
 * @return {String} utf8 decoded string
 */
JXG.Util.utf8Decode = function(utftext) {
  var string = [];
  var i = 0;
  var c = 0, c1 = 0, c2 = 0;

  while ( i < utftext.length ) {
    c = utftext.charCodeAt(i);

    if (c < 128) {
      string.push(String.fromCharCode(c));
      i++;
    } else if((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i+1);
      string.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i+1);
      c3 = utftext.charCodeAt(i+2);
      string.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
      i += 3;
    }
  };
  return string.join('');
};

// Added to exports for Cocos2d
module.exports = JXG;

}};
__resources__["/__builtin__/libs/Plist.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/**
 * XML Node types
 */
var ELEMENT_NODE                = 1,
    ATTRIBUTE_NODE              = 2,
    TEXT_NODE                   = 3,
    CDATA_SECTION_NODE          = 4,
    ENTITY_REFERENCE_NODE       = 5,
    ENTITY_NODE                 = 6,
    PROCESSING_INSTRUCTION_NODE = 7,
    COMMENT_NODE                = 8,
    DOCUMENT_NODE               = 9,
    DOCUMENT_TYPE_NODE          = 10,
    DOCUMENT_FRAGMENT_NODE      = 11,
    NOTATION_NODE               = 12;


var Plist = BObject.extend (/** @lends Plist# */{
    /**
     * The unserialized data inside the Plist file
     * @type Object
     */
    data: null,

    /**
     * An object representation of an XML Property List file
     *
     * @constructs
     * @extends BObject
     * @param {Options} opts Options
     * @config {String} [file] The path to a .plist file
     * @config {String} [data] The contents of a .plist file
     */
    init: function(opts) {
        var file = opts['file'],
            data = opts['data'];

        if (file && !data) {
            data = resource(file);
        }


        var parser = new DOMParser(),
            doc = parser.parseFromString(data, 'text/xml'),
            plist = doc.documentElement;

        if (plist.tagName != 'plist') {
            throw "Not a plist file";
        }


        // Get first real node
        var node = null;
        for (var i = 0, len = plist.childNodes.length; i < len; i++) {
            node = plist.childNodes[i];
            if (node.nodeType == ELEMENT_NODE) {
                break;
            }
        }

        this.set('data', this.parseNode_(node));
    },


    /**
     * @private
     * Parses an XML node inside the Plist file
     * @returns {Object/Array/String/Integer/Float} A JS representation of the node value
     */
    parseNode_: function(node) {
        var data = null;
        switch(node.tagName) {
        case 'dict':
            data = this.parseDict_(node); 
            break;
        case 'array':
            data = this.parseArray_(node); 
            break;
        case 'string':
            // FIXME - This needs to handle Firefox's 4KB nodeValue limit
            data = node.firstChild.nodeValue;
            break
        case 'false':
            data = false;
            break
        case 'true':
            data = true;
            break
        case 'real':
            data = parseFloat(node.firstChild.nodeValue);
            break
        case 'integer':
            data = parseInt(node.firstChild.nodeValue, 10);
            break
        }

        return data;
    },

    /**
     * @private
     * Parses a <dict> node in a plist file
     *
     * @param {XMLElement}
     * @returns {Object} A simple key/value JS Object representing the <dict>
     */
    parseDict_: function(node) {
        var data = {};

        var key = null;
        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            var child = node.childNodes[i];
            if (child.nodeType != ELEMENT_NODE) {
                continue;
            }

            // Grab the key, next noe should be the value
            if (child.tagName == 'key') {
                key = child.firstChild.nodeValue;
            } else {
                // Parse the value node
                data[key] = this.parseNode_(child);
            }
        }


        return data;
    },

    /**
     * @private
     * Parses an <array> node in a plist file
     *
     * @param {XMLElement}
     * @returns {Array} A simple JS Array representing the <array>
     */
    parseArray_: function(node) {
        var data = [];

        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            var child = node.childNodes[i];
            if (child.nodeType != ELEMENT_NODE) {
                continue;
            }

            data.push(this.parseNode_(child));
        }

        return data;
    }
});


exports.Plist = Plist;

}};
__resources__["/__builtin__/libs/qunit.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*
 * QUnit - A JavaScript Unit Testing Framework
 * 
 * http://docs.jquery.com/QUnit
 *
 * Copyright (c) 2011 John Resig, Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * or GPL (GPL-LICENSE.txt) licenses.
 */

(function(window) {

var defined = {
	setTimeout: typeof window.setTimeout !== "undefined",
	sessionStorage: (function() {
		try {
			return !!sessionStorage.getItem;
		} catch(e){
			return false;
		}
  })()
}

var testId = 0;

var Test = function(name, testName, expected, testEnvironmentArg, async, callback) {
	this.name = name;
	this.testName = testName;
	this.expected = expected;
	this.testEnvironmentArg = testEnvironmentArg;
	this.async = async;
	this.callback = callback;
	this.assertions = [];
};
Test.prototype = {
	init: function() {
		var tests = id("qunit-tests");
		if (tests) {
			var b = document.createElement("strong");
				b.innerHTML = "Running " + this.name;
			var li = document.createElement("li");
				li.appendChild( b );
				li.id = this.id = "test-output" + testId++;
			tests.appendChild( li );
		}
	},
	setup: function() {
		if (this.module != config.previousModule) {
			if ( config.previousModule ) {
				QUnit.moduleDone( {
					name: config.previousModule,
					failed: config.moduleStats.bad,
					passed: config.moduleStats.all - config.moduleStats.bad,
					total: config.moduleStats.all
				} );
			}
			config.previousModule = this.module;
			config.moduleStats = { all: 0, bad: 0 };
			QUnit.moduleStart( {
				name: this.module
			} );
		}

		config.current = this;
		this.testEnvironment = extend({
			setup: function() {},
			teardown: function() {}
		}, this.moduleTestEnvironment);
		if (this.testEnvironmentArg) {
			extend(this.testEnvironment, this.testEnvironmentArg);
		}

		QUnit.testStart( {
			name: this.testName
		} );

		// allow utility functions to access the current test environment
		// TODO why??
		QUnit.current_testEnvironment = this.testEnvironment;
		
		try {
			if ( !config.pollution ) {
				saveGlobal();
			}

			this.testEnvironment.setup.call(this.testEnvironment);
		} catch(e) {
			QUnit.ok( false, "Setup failed on " + this.testName + ": " + e.message );
		}
	},
	run: function() {
		if ( this.async ) {
			QUnit.stop();
		}

		if ( config.notrycatch ) {
			this.callback.call(this.testEnvironment);
			return;
		}
		try {
			this.callback.call(this.testEnvironment);
		} catch(e) {
			fail("Test " + this.testName + " died, exception and test follows", e, this.callback);
			QUnit.ok( false, "Died on test #" + (this.assertions.length + 1) + ": " + e.message + " - " + QUnit.jsDump.parse(e) );
			// else next test will carry the responsibility
			saveGlobal();

			// Restart the tests if they're blocking
			if ( config.blocking ) {
				start();
			}
		}
	},
	teardown: function() {
		try {
			checkPollution();
			this.testEnvironment.teardown.call(this.testEnvironment);
		} catch(e) {
			QUnit.ok( false, "Teardown failed on " + this.testName + ": " + e.message );
		}
	},
	finish: function() {
		if ( this.expected && this.expected != this.assertions.length ) {
			QUnit.ok( false, "Expected " + this.expected + " assertions, but " + this.assertions.length + " were run" );
		}
		
		var good = 0, bad = 0,
			tests = id("qunit-tests");

		config.stats.all += this.assertions.length;
		config.moduleStats.all += this.assertions.length;

		if ( tests ) {
			var ol  = document.createElement("ol");

			for ( var i = 0; i < this.assertions.length; i++ ) {
				var assertion = this.assertions[i];

				var li = document.createElement("li");
				li.className = assertion.result ? "pass" : "fail";
				li.innerHTML = assertion.message || (assertion.result ? "okay" : "failed");
				ol.appendChild( li );

				if ( assertion.result ) {
					good++;
				} else {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				}
			}

			// store result when possible
			defined.sessionStorage && sessionStorage.setItem("qunit-" + this.testName, bad);

			if (bad == 0) {
				ol.style.display = "none";
			}

			var b = document.createElement("strong");
			b.innerHTML = this.name + " <b class='counts'>(<b class='failed'>" + bad + "</b>, <b class='passed'>" + good + "</b>, " + this.assertions.length + ")</b>";
			
			addEvent(b, "click", function() {
				var next = b.nextSibling, display = next.style.display;
				next.style.display = display === "none" ? "block" : "none";
			});
			
			addEvent(b, "dblclick", function(e) {
				var target = e && e.target ? e.target : window.event.srcElement;
				if ( target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "b" ) {
					target = target.parentNode;
				}
				if ( window.location && target.nodeName.toLowerCase() === "strong" ) {
					window.location.search = "?" + encodeURIComponent(getText([target]).replace(/\(.+\)$/, "").replace(/(^\s*|\s*$)/g, ""));
				}
			});

			var li = id(this.id);
			li.className = bad ? "fail" : "pass";
			li.style.display = resultDisplayStyle(!bad);
			li.removeChild( li.firstChild );
			li.appendChild( b );
			li.appendChild( ol );

		} else {
			for ( var i = 0; i < this.assertions.length; i++ ) {
				if ( !this.assertions[i].result ) {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				}
			}
		}

		try {
			QUnit.reset();
		} catch(e) {
			fail("reset() failed, following Test " + this.testName + ", exception and reset fn follows", e, QUnit.reset);
		}

		QUnit.testDone( {
			name: this.testName,
			failed: bad,
			passed: this.assertions.length - bad,
			total: this.assertions.length
		} );
	},
	
	queue: function() {
		var test = this;
		synchronize(function() {
			test.init();
		});
		function run() {
			// each of these can by async
			synchronize(function() {
				test.setup();
			});
			synchronize(function() {
				test.run();
			});
			synchronize(function() {
				test.teardown();
			});
			synchronize(function() {
				test.finish();
			});
		}
		// defer when previous test run passed, if storage is available
		var bad = defined.sessionStorage && +sessionStorage.getItem("qunit-" + this.testName);
		if (bad) {
			run();
		} else {
			synchronize(run);
		};
	}
	
}

var QUnit = {

	// call on start of module test to prepend name to all tests
	module: function(name, testEnvironment) {
		config.currentModule = name;
		config.currentModuleTestEnviroment = testEnvironment;
	},

	asyncTest: function(testName, expected, callback) {
		if ( arguments.length === 2 ) {
			callback = expected;
			expected = 0;
		}

		QUnit.test(testName, expected, callback, true);
	},
	
	test: function(testName, expected, callback, async) {
		var name = '<span class="test-name">' + testName + '</span>', testEnvironmentArg;

		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		}
		// is 2nd argument a testEnvironment?
		if ( expected && typeof expected === 'object') {
			testEnvironmentArg =  expected;
			expected = null;
		}

		if ( config.currentModule ) {
			name = '<span class="module-name">' + config.currentModule + "</span>: " + name;
		}

		if ( !validTest(config.currentModule + ": " + testName) ) {
			return;
		}
		
		var test = new Test(name, testName, expected, testEnvironmentArg, async, callback);
		test.module = config.currentModule;
		test.moduleTestEnvironment = config.currentModuleTestEnviroment;
		test.queue();
	},
	
	/**
	 * Specify the number of expected assertions to gurantee that failed test (no assertions are run at all) don't slip through.
	 */
	expect: function(asserts) {
		config.current.expected = asserts;
	},

	/**
	 * Asserts true.
	 * @example ok( "asdfasdf".length > 5, "There must be at least 5 chars" );
	 */
	ok: function(a, msg) {
		a = !!a;
		var details = {
			result: a,
			message: msg
		};
		msg = escapeHtml(msg);
		QUnit.log(details);
		config.current.assertions.push({
			result: a,
			message: msg
		});
	},

	/**
	 * Checks that the first two arguments are equal, with an optional message.
	 * Prints out both actual and expected values.
	 *
	 * Prefered to ok( actual == expected, message )
	 *
	 * @example equal( format("Received {0} bytes.", 2), "Received 2 bytes." );
	 *
	 * @param Object actual
	 * @param Object expected
	 * @param String message (optional)
	 */
	equal: function(actual, expected, message) {
		QUnit.push(expected == actual, actual, expected, message);
	},

	notEqual: function(actual, expected, message) {
		QUnit.push(expected != actual, actual, expected, message);
	},
	
	deepEqual: function(actual, expected, message) {
		QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
	},

	notDeepEqual: function(actual, expected, message) {
		QUnit.push(!QUnit.equiv(actual, expected), actual, expected, message);
	},

	strictEqual: function(actual, expected, message) {
		QUnit.push(expected === actual, actual, expected, message);
	},

	notStrictEqual: function(actual, expected, message) {
		QUnit.push(expected !== actual, actual, expected, message);
	},

	raises: function(block, expected, message) {
		var actual, ok = false;
	
		if (typeof expected === 'string') {
			message = expected;
			expected = null;
		}
	
		try {
			block();
		} catch (e) {
			actual = e;
		}
	
		if (actual) {
			// we don't want to validate thrown error
			if (!expected) {
				ok = true;
			// expected is a regexp	
			} else if (QUnit.objectType(expected) === "regexp") {
				ok = expected.test(actual);
			// expected is a constructor	
			} else if (actual instanceof expected) {
				ok = true;
			// expected is a validation function which returns true is validation passed	
			} else if (expected.call({}, actual) === true) {
				ok = true;
			}
		}
			
		QUnit.ok(ok, message);
	},

	start: function() {
		config.semaphore--;
		if (config.semaphore > 0) {
			// don't start until equal number of stop-calls
			return;
		}
		if (config.semaphore < 0) {
			// ignore if start is called more often then stop
			config.semaphore = 0;
		}
		// A slight delay, to avoid any current callbacks
		if ( defined.setTimeout ) {
			window.setTimeout(function() {
				if ( config.timeout ) {
					clearTimeout(config.timeout);
				}

				config.blocking = false;
				process();
			}, 13);
		} else {
			config.blocking = false;
			process();
		}
	},
	
	stop: function(timeout) {
		config.semaphore++;
		config.blocking = true;

		if ( timeout && defined.setTimeout ) {
			clearTimeout(config.timeout);
			config.timeout = window.setTimeout(function() {
				QUnit.ok( false, "Test timed out" );
				QUnit.start();
			}, timeout);
		}
	}

};

// Backwards compatibility, deprecated
QUnit.equals = QUnit.equal;
QUnit.same = QUnit.deepEqual;

// Maintain internal state
var config = {
	// The queue of tests to run
	queue: [],

	// block until document ready
	blocking: true
};

// Load paramaters
(function() {
	var location = window.location || { search: "", protocol: "file:" },
		GETParams = location.search.slice(1).split('&');

	for ( var i = 0; i < GETParams.length; i++ ) {
		GETParams[i] = decodeURIComponent( GETParams[i] );
		if ( GETParams[i] === "noglobals" ) {
			GETParams.splice( i, 1 );
			i--;
			config.noglobals = true;
		} else if ( GETParams[i] === "notrycatch" ) {
			GETParams.splice( i, 1 );
			i--;
			config.notrycatch = true;
		} else if ( GETParams[i].search('=') > -1 ) {
			GETParams.splice( i, 1 );
			i--;
		}
	}
	
	// restrict modules/tests by get parameters
	config.filters = GETParams;
	
	// Figure out if we're running the tests from a server or not
	QUnit.isLocal = !!(location.protocol === 'file:');
})();

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	extend(window, QUnit);
	window.QUnit = QUnit;
} else {
	extend(exports, QUnit);
	exports.QUnit = QUnit;
}

// define these after exposing globals to keep them in these QUnit namespace only
extend(QUnit, {
	config: config,

	// Initialize the configuration options
	init: function() {
		extend(config, {
			stats: { all: 0, bad: 0 },
			moduleStats: { all: 0, bad: 0 },
			started: +new Date,
			updateRate: 1000,
			blocking: false,
			autostart: true,
			autorun: false,
			filters: [],
			queue: [],
			semaphore: 0
		});

		var tests = id("qunit-tests"),
			banner = id("qunit-banner"),
			result = id("qunit-testresult");

		if ( tests ) {
			tests.innerHTML = "";
		}

		if ( banner ) {
			banner.className = "";
		}

		if ( result ) {
			result.parentNode.removeChild( result );
		}
	},
	
	/**
	 * Resets the test setup. Useful for tests that modify the DOM.
	 * 
	 * If jQuery is available, uses jQuery's html(), otherwise just innerHTML.
	 */
	reset: function() {
		if ( window.jQuery ) {
			jQuery( "#main, #qunit-fixture" ).html( config.fixture );
		} else {
			var main = id( 'main' ) || id( 'qunit-fixture' );
			if ( main ) {
				main.innerHTML = config.fixture;
			}
		}
	},
	
	/**
	 * Trigger an event on an element.
	 *
	 * @example triggerEvent( document.body, "click" );
	 *
	 * @param DOMElement elem
	 * @param String type
	 */
	triggerEvent: function( elem, type, event ) {
		if ( document.createEvent ) {
			event = document.createEvent("MouseEvents");
			event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			elem.dispatchEvent( event );

		} else if ( elem.fireEvent ) {
			elem.fireEvent("on"+type);
		}
	},
	
	// Safe object type checking
	is: function( type, obj ) {
		return QUnit.objectType( obj ) == type;
	},
	
	objectType: function( obj ) {
		if (typeof obj === "undefined") {
				return "undefined";

		// consider: typeof null === object
		}
		if (obj === null) {
				return "null";
		}

		var type = Object.prototype.toString.call( obj )
			.match(/^\[object\s(.*)\]$/)[1] || '';

		switch (type) {
				case 'Number':
						if (isNaN(obj)) {
								return "nan";
						} else {
								return "number";
						}
				case 'String':
				case 'Boolean':
				case 'Array':
				case 'Date':
				case 'RegExp':
				case 'Function':
						return type.toLowerCase();
		}
		if (typeof obj === "object") {
				return "object";
		}
		return undefined;
	},
	
	push: function(result, actual, expected, message) {
		var details = {
			result: result,
			message: message,
			actual: actual,
			expected: expected
		};
		
		message = escapeHtml(message) || (result ? "okay" : "failed");
		message = '<span class="test-message">' + message + "</span>";
		expected = escapeHtml(QUnit.jsDump.parse(expected));
		actual = escapeHtml(QUnit.jsDump.parse(actual));
		var output = message + '<table><tr class="test-expected"><th>Expected: </th><td><pre>' + expected + '</pre></td></tr>';
		if (actual != expected) {
			output += '<tr class="test-actual"><th>Result: </th><td><pre>' + actual + '</pre></td></tr>';
			output += '<tr class="test-diff"><th>Diff: </th><td><pre>' + QUnit.diff(expected, actual) +'</pre></td></tr>';
		}
		if (!result) {
			var source = sourceFromStacktrace();
			if (source) {
				details.source = source;
				output += '<tr class="test-source"><th>Source: </th><td><pre>' + source +'</pre></td></tr>';
			}
		}
		output += "</table>";
		
		QUnit.log(details);
		
		config.current.assertions.push({
			result: !!result,
			message: output
		});
	},
	
	// Logging callbacks; all receive a single argument with the listed properties
	// run test/logs.html for any related changes
	begin: function() {},
	// done: { failed, passed, total, runtime }
	done: function() {},
	// log: { result, actual, expected, message }
	log: function() {},
	// testStart: { name }
	testStart: function() {},
	// testDone: { name, failed, passed, total }
	testDone: function() {},
	// moduleStart: { name }
	moduleStart: function() {},
	// moduleDone: { name, failed, passed, total }
	moduleDone: function() {}
});

if ( typeof document === "undefined" || document.readyState === "complete" ) {
	config.autorun = true;
}

addEvent(window, "load", function() {
	QUnit.begin({});
	
	// Initialize the config, saving the execution queue
	var oldconfig = extend({}, config);
	QUnit.init();
	extend(config, oldconfig);

	config.blocking = false;

	var userAgent = id("qunit-userAgent");
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	}
	var banner = id("qunit-header");
	if ( banner ) {
		var paramsIndex = location.href.lastIndexOf(location.search);
		if ( paramsIndex > -1 ) {
			var mainPageLocation = location.href.slice(0, paramsIndex);
			if ( mainPageLocation == location.href ) {
				banner.innerHTML = '<a href=""> ' + banner.innerHTML + '</a> ';
			} else {
				var testName = decodeURIComponent(location.search.slice(1));
				banner.innerHTML = '<a href="' + mainPageLocation + '">' + banner.innerHTML + '</a> &#8250; <a href="">' + testName + '</a>';
			}
		}
	}
	
	var toolbar = id("qunit-testrunner-toolbar");
	if ( toolbar ) {
		var filter = document.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		addEvent( filter, "click", function() {
			var li = document.getElementsByTagName("li");
			for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("pass") > -1 ) {
					li[i].style.display = filter.checked ? "none" : "";
				}
			}
			if ( defined.sessionStorage ) {
				sessionStorage.setItem("qunit-filter-passed-tests", filter.checked ? "true" : "");
			}
		});
		if ( defined.sessionStorage && sessionStorage.getItem("qunit-filter-passed-tests") ) {
			filter.checked = true;
		}
		toolbar.appendChild( filter );

		var label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );
	}

	var main = id('main') || id('qunit-fixture');
	if ( main ) {
		config.fixture = main.innerHTML;
	}

	if (config.autostart) {
		QUnit.start();
	}
});

function done() {
	config.autorun = true;

	// Log the last module results
	if ( config.currentModule ) {
		QUnit.moduleDone( {
			name: config.currentModule,
			failed: config.moduleStats.bad,
			passed: config.moduleStats.all - config.moduleStats.bad,
			total: config.moduleStats.all
		} );
	}

	var banner = id("qunit-banner"),
		tests = id("qunit-tests"),
		runtime = +new Date - config.started,
		passed = config.stats.all - config.stats.bad,
		html = [
			'Tests completed in ',
			runtime,
			' milliseconds.<br/>',
			'<span class="passed">',
			passed,
			'</span> tests of <span class="total">',
			config.stats.all,
			'</span> passed, <span class="failed">',
			config.stats.bad,
			'</span> failed.'
		].join('');

	if ( banner ) {
		banner.className = (config.stats.bad ? "qunit-fail" : "qunit-pass");
	}

	if ( tests ) {	
		var result = id("qunit-testresult");

		if ( !result ) {
			result = document.createElement("p");
			result.id = "qunit-testresult";
			result.className = "result";
			tests.parentNode.insertBefore( result, tests.nextSibling );
		}

		result.innerHTML = html;
	}

	QUnit.done( {
		failed: config.stats.bad,
		passed: passed, 
		total: config.stats.all,
		runtime: runtime
	} );
}

function validTest( name ) {
	var i = config.filters.length,
		run = false;

	if ( !i ) {
		return true;
	}
	
	while ( i-- ) {
		var filter = config.filters[i],
			not = filter.charAt(0) == '!';

		if ( not ) {
			filter = filter.slice(1);
		}

		if ( name.indexOf(filter) !== -1 ) {
			return !not;
		}

		if ( not ) {
			run = true;
		}
	}

	return run;
}

// so far supports only Firefox, Chrome and Opera (buggy)
// could be extended in the future to use something like https://github.com/csnover/TraceKit
function sourceFromStacktrace() {
	try {
		throw new Error();
	} catch ( e ) {
		if (e.stacktrace) {
			// Opera
			return e.stacktrace.split("\n")[6];
		} else if (e.stack) {
			// Firefox, Chrome
			return e.stack.split("\n")[4];
		}
	}
}

function resultDisplayStyle(passed) {
	return passed && id("qunit-filter-pass") && id("qunit-filter-pass").checked ? 'none' : '';
}

function escapeHtml(s) {
	if (!s) {
		return "";
	}
	s = s + "";
	return s.replace(/[\&"<>\\]/g, function(s) {
		switch(s) {
			case "&": return "&amp;";
			case "\\": return "\\\\";
			case '"': return '\"';
			case "<": return "&lt;";
			case ">": return "&gt;";
			default: return s;
		}
	});
}

function synchronize( callback ) {
	config.queue.push( callback );

	if ( config.autorun && !config.blocking ) {
		process();
	}
}

function process() {
	var start = (new Date()).getTime();

	while ( config.queue.length && !config.blocking ) {
		if ( config.updateRate <= 0 || (((new Date()).getTime() - start) < config.updateRate) ) {
			config.queue.shift()();
		} else {
			window.setTimeout( process, 13 );
			break;
		}
	}
  if (!config.blocking && !config.queue.length) {
    done();
  }
}

function saveGlobal() {
	config.pollution = [];
	
	if ( config.noglobals ) {
		for ( var key in window ) {
			config.pollution.push( key );
		}
	}
}

function checkPollution( name ) {
	var old = config.pollution;
	saveGlobal();
	
	var newGlobals = diff( old, config.pollution );
	if ( newGlobals.length > 0 ) {
		ok( false, "Introduced global variable(s): " + newGlobals.join(", ") );
		config.current.expected++;
	}

	var deletedGlobals = diff( config.pollution, old );
	if ( deletedGlobals.length > 0 ) {
		ok( false, "Deleted global variable(s): " + deletedGlobals.join(", ") );
		config.current.expected++;
	}
}

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var result = a.slice();
	for ( var i = 0; i < result.length; i++ ) {
		for ( var j = 0; j < b.length; j++ ) {
			if ( result[i] === b[j] ) {
				result.splice(i, 1);
				i--;
				break;
			}
		}
	}
	return result;
}

function fail(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.warn(callback.toString());

	} else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	}
}

function extend(a, b) {
	for ( var prop in b ) {
		a[prop] = b[prop];
	}

	return a;
}

function addEvent(elem, type, fn) {
	if ( elem.addEventListener ) {
		elem.addEventListener( type, fn, false );
	} else if ( elem.attachEvent ) {
		elem.attachEvent( "on" + type, fn );
	} else {
		fn();
	}
}

function id(name) {
	return !!(typeof document !== "undefined" && document && document.getElementById) &&
		document.getElementById( name );
}

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rathé <prathe@gmail.com>
QUnit.equiv = function () {

    var innerEquiv; // the real equiv function
    var callers = []; // stack to decide between skip/abort functions
    var parents = []; // stack to avoiding loops from circular referencing

    // Call the o related callback with the given arguments.
    function bindCallbacks(o, callbacks, args) {
        var prop = QUnit.objectType(o);
        if (prop) {
            if (QUnit.objectType(callbacks[prop]) === "function") {
                return callbacks[prop].apply(callbacks, args);
            } else {
                return callbacks[prop]; // or undefined
            }
        }
    }
    
    var callbacks = function () {

        // for string, boolean, number and null
        function useStrictEquality(b, a) {
            if (b instanceof a.constructor || a instanceof b.constructor) {
                // to catch short annotaion VS 'new' annotation of a declaration
                // e.g. var i = 1;
                //      var j = new Number(1);
                return a == b;
            } else {
                return a === b;
            }
        }

        return {
            "string": useStrictEquality,
            "boolean": useStrictEquality,
            "number": useStrictEquality,
            "null": useStrictEquality,
            "undefined": useStrictEquality,

            "nan": function (b) {
                return isNaN(b);
            },

            "date": function (b, a) {
                return QUnit.objectType(b) === "date" && a.valueOf() === b.valueOf();
            },

            "regexp": function (b, a) {
                return QUnit.objectType(b) === "regexp" &&
                    a.source === b.source && // the regex itself
                    a.global === b.global && // and its modifers (gmi) ...
                    a.ignoreCase === b.ignoreCase &&
                    a.multiline === b.multiline;
            },

            // - skip when the property is a method of an instance (OOP)
            // - abort otherwise,
            //   initial === would have catch identical references anyway
            "function": function () {
                var caller = callers[callers.length - 1];
                return caller !== Object &&
                        typeof caller !== "undefined";
            },

            "array": function (b, a) {
                var i, j, loop;
                var len;

                // b could be an object literal here
                if ( ! (QUnit.objectType(b) === "array")) {
                    return false;
                }   
                
                len = a.length;
                if (len !== b.length) { // safe and faster
                    return false;
                }
                
                //track reference to avoid circular references
                parents.push(a);
                for (i = 0; i < len; i++) {
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i]){
                            loop = true;//dont rewalk array
                        }
                    }
                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        parents.pop();
                        return false;
                    }
                }
                parents.pop();
                return true;
            },

            "object": function (b, a) {
                var i, j, loop;
                var eq = true; // unless we can proove it
                var aProperties = [], bProperties = []; // collection of strings

                // comparing constructors is more strict than using instanceof
                if ( a.constructor !== b.constructor) {
                    return false;
                }

                // stack constructor before traversing properties
                callers.push(a.constructor);
                //track reference to avoid circular references
                parents.push(a);
                
                for (i in a) { // be strict: don't ensures hasOwnProperty and go deep
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i])
                            loop = true; //don't go down the same path twice
                    }
                    aProperties.push(i); // collect a's properties

                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        eq = false;
                        break;
                    }
                }

                callers.pop(); // unstack, we are done
                parents.pop();

                for (i in b) {
                    bProperties.push(i); // collect b's properties
                }

                // Ensures identical properties name
                return eq && innerEquiv(aProperties.sort(), bProperties.sort());
            }
        };
    }();

    innerEquiv = function () { // can take multiple arguments
        var args = Array.prototype.slice.apply(arguments);
        if (args.length < 2) {
            return true; // end transition
        }

        return (function (a, b) {
            if (a === b) {
                return true; // catch the most you can
            } else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || QUnit.objectType(a) !== QUnit.objectType(b)) {
                return false; // don't lose time with error prone cases
            } else {
                return bindCallbacks(a, callbacks, [b, a]);
            }

        // apply transition with (1..n) arguments
        })(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length -1));
    };

    return innerEquiv;

}();

/**
 * jsDump
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
 * Date: 5/15/2008
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */
QUnit.jsDump = (function() {
	function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
	};
	function literal( o ) {
		return o + '';	
	};
	function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join )
			arr = arr.join( ',' + s + inner );
		if ( !arr )
			return pre + post;
		return [ pre, inner + arr, base + post ].join(s);
	};
	function array( arr ) {
		var i = arr.length,	ret = Array(i);					
		this.up();
		while ( i-- )
			ret[i] = this.parse( arr[i] );				
		this.down();
		return join( '[', ret, ']' );
	};
	
	var reName = /^function (\w+)/;
	
	var jsDump = {
		parse:function( obj, type ) { //type is used mostly internally, you can fix a (custom)type in advance
			var	parser = this.parsers[ type || this.typeOf(obj) ];
			type = typeof parser;			
			
			return type == 'function' ? parser.call( this, obj ) :
				   type == 'string' ? parser :
				   this.parsers.error;
		},
		typeOf:function( obj ) {
			var type;
			if ( obj === null ) {
				type = "null";
			} else if (typeof obj === "undefined") {
				type = "undefined";
			} else if (QUnit.is("RegExp", obj)) {
				type = "regexp";
			} else if (QUnit.is("Date", obj)) {
				type = "date";
			} else if (QUnit.is("Function", obj)) {
				type = "function";
			} else if (typeof obj.setInterval !== undefined && typeof obj.document !== "undefined" && typeof obj.nodeType === "undefined") {
				type = "window";
			} else if (obj.nodeType === 9) {
				type = "document";
			} else if (obj.nodeType) {
				type = "node";
			} else if (typeof obj === "object" && typeof obj.length === "number" && obj.length >= 0) {
				type = "array";
			} else {
				type = typeof obj;
			}
			return type;
		},
		separator:function() {
			return this.multiline ?	this.HTML ? '<br />' : '\n' : this.HTML ? '&nbsp;' : ' ';
		},
		indent:function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
			if ( !this.multiline )
				return '';
			var chr = this.indentChar;
			if ( this.HTML )
				chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
			return Array( this._depth_ + (extra||0) ).join(chr);
		},
		up:function( a ) {
			this._depth_ += a || 1;
		},
		down:function( a ) {
			this._depth_ -= a || 1;
		},
		setParser:function( name, parser ) {
			this.parsers[name] = parser;
		},
		// The next 3 are exposed so you can use them
		quote:quote, 
		literal:literal,
		join:join,
		//
		_depth_: 1,
		// This is the list of parsers, to modify them, use jsDump.setParser
		parsers:{
			window: '[Window]',
			document: '[Document]',
			error:'[ERROR]', //when no parser is found, shouldn't happen
			unknown: '[Unknown]',
			'null':'null',
			undefined:'undefined',
			'function':function( fn ) {
				var ret = 'function',
					name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];//functions never have name in IE
				if ( name )
					ret += ' ' + name;
				ret += '(';
				
				ret = [ ret, QUnit.jsDump.parse( fn, 'functionArgs' ), '){'].join('');
				return join( ret, QUnit.jsDump.parse(fn,'functionCode'), '}' );
			},
			array: array,
			nodelist: array,
			arguments: array,
			object:function( map ) {
				var ret = [ ];
				QUnit.jsDump.up();
				for ( var key in map )
					ret.push( QUnit.jsDump.parse(key,'key') + ': ' + QUnit.jsDump.parse(map[key]) );
				QUnit.jsDump.down();
				return join( '{', ret, '}' );
			},
			node:function( node ) {
				var open = QUnit.jsDump.HTML ? '&lt;' : '<',
					close = QUnit.jsDump.HTML ? '&gt;' : '>';
					
				var tag = node.nodeName.toLowerCase(),
					ret = open + tag;
					
				for ( var a in QUnit.jsDump.DOMAttrs ) {
					var val = node[QUnit.jsDump.DOMAttrs[a]];
					if ( val )
						ret += ' ' + a + '=' + QUnit.jsDump.parse( val, 'attribute' );
				}
				return ret + close + open + '/' + tag + close;
			},
			functionArgs:function( fn ) {//function calls it internally, it's the arguments part of the function
				var l = fn.length;
				if ( !l ) return '';				
				
				var args = Array(l);
				while ( l-- )
					args[l] = String.fromCharCode(97+l);//97 is 'a'
				return ' ' + args.join(', ') + ' ';
			},
			key:quote, //object calls it internally, the key part of an item in a map
			functionCode:'[code]', //function calls it internally, it's the content of the function
			attribute:quote, //node calls it internally, it's an html attribute value
			string:quote,
			date:quote,
			regexp:literal, //regex
			number:literal,
			'boolean':literal
		},
		DOMAttrs:{//attributes to dump from nodes, name=>realName
			id:'id',
			name:'name',
			'class':'className'
		},
		HTML:false,//if true, entities are escaped ( <, >, \t, space and \n )
		indentChar:'  ',//indentation unit
		multiline:true //if true, items in a collection, are separated by a \n, else just a space.
	};

	return jsDump;
})();

// from Sizzle.js
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
};

/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *  
 * Usage: QUnit.diff(expected, actual)
 * 
 * QUnit.diff("the quick brown fox jumped over", "the quick fox jumps over") == "the  quick <del>brown </del> fox <del>jumped </del><ins>jumps </ins> over"
 */
QUnit.diff = (function() {
	function diff(o, n){
		var ns = new Object();
		var os = new Object();
		
		for (var i = 0; i < n.length; i++) {
			if (ns[n[i]] == null) 
				ns[n[i]] = {
					rows: new Array(),
					o: null
				};
			ns[n[i]].rows.push(i);
		}
		
		for (var i = 0; i < o.length; i++) {
			if (os[o[i]] == null) 
				os[o[i]] = {
					rows: new Array(),
					n: null
				};
			os[o[i]].rows.push(i);
		}
		
		for (var i in ns) {
			if (ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1) {
				n[ns[i].rows[0]] = {
					text: n[ns[i].rows[0]],
					row: os[i].rows[0]
				};
				o[os[i].rows[0]] = {
					text: o[os[i].rows[0]],
					row: ns[i].rows[0]
				};
			}
		}
		
		for (var i = 0; i < n.length - 1; i++) {
			if (n[i].text != null && n[i + 1].text == null && n[i].row + 1 < o.length && o[n[i].row + 1].text == null &&
			n[i + 1] == o[n[i].row + 1]) {
				n[i + 1] = {
					text: n[i + 1],
					row: n[i].row + 1
				};
				o[n[i].row + 1] = {
					text: o[n[i].row + 1],
					row: i + 1
				};
			}
		}
		
		for (var i = n.length - 1; i > 0; i--) {
			if (n[i].text != null && n[i - 1].text == null && n[i].row > 0 && o[n[i].row - 1].text == null &&
			n[i - 1] == o[n[i].row - 1]) {
				n[i - 1] = {
					text: n[i - 1],
					row: n[i].row - 1
				};
				o[n[i].row - 1] = {
					text: o[n[i].row - 1],
					row: i - 1
				};
			}
		}
		
		return {
			o: o,
			n: n
		};
	}
	
	return function(o, n){
		o = o.replace(/\s+$/, '');
		n = n.replace(/\s+$/, '');
		var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/));

		var str = "";
		
		var oSpace = o.match(/\s+/g);
		if (oSpace == null) {
			oSpace = [" "];
		}
		else {
			oSpace.push(" ");
		}
		var nSpace = n.match(/\s+/g);
		if (nSpace == null) {
			nSpace = [" "];
		}
		else {
			nSpace.push(" ");
		}
		
		if (out.n.length == 0) {
			for (var i = 0; i < out.o.length; i++) {
				str += '<del>' + out.o[i] + oSpace[i] + "</del>";
			}
		}
		else {
			if (out.n[0].text == null) {
				for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
					str += '<del>' + out.o[n] + oSpace[n] + "</del>";
				}
			}
			
			for (var i = 0; i < out.n.length; i++) {
				if (out.n[i].text == null) {
					str += '<ins>' + out.n[i] + nSpace[i] + "</ins>";
				}
				else {
					var pre = "";
					
					for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++) {
						pre += '<del>' + out.o[n] + oSpace[n] + "</del>";
					}
					str += " " + out.n[i].text + nSpace[i] + pre;
				}
			}
		}
		
		return str;
	};
})();

})(this);

}};
__resources__["/__builtin__/libs/util.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
var path = require('path');

/**
 * @namespace
 * Useful utility functions
 */
var util = {
    /**
     * Merge two or more objects and return the result.
     *
     * @param {Object} firstObject First object to merge with
     * @param {Object} secondObject Second object to merge with
     * @param {Object} [...] More objects to merge
     * @returns {Object} A new object containing the properties of all the objects passed in
     */
    merge: function(firstObject, secondObject) {
        var result = {};

        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];

            for (var x in obj) {
                if (!obj.hasOwnProperty(x)) {
                    continue;
                }

                result[x] = obj[x];
            }
        };

        return result;
    },

    /**
     * Creates a deep copy of an object
     *
     * @param {Object} obj The Object to copy
     * @returns {Object} A copy of the original Object
     */
    copy: function(obj) {
        if (obj === null) {
            return null;
        }

        var copy;

        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = arguments.callee(obj[i]);
            }
        } else if (typeof(obj) == 'object') {
            if (typeof(obj.copy) == 'function') {
                copy = obj.copy();
            } else {
                copy = {};

                var o, x;
                for (x in obj) {
                    copy[x] = arguments.callee(obj[x]);
                }
            }
        } else {
            // Primative type. Doesn't need copying
            copy = obj;
        }

        return copy;
    },

    /**
     * Iterates over an array and calls a function for each item.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The original array
     */
    each: function(arr, func) {
        var i = 0,
            len = arr.length;
        for (i = 0; i < len; i++) {
            func(arr[i], i);
        }

        return arr;
    },

    /**
     * Iterates over an array, calls a function for each item and returns the results.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The return values from each function call
     */
    map: function(arr, func) {
        var i = 0,
            len = arr.length,
            result = [];

        for (i = 0; i < len; i++) {
            result.push(func(arr[i], i));
        }

        return result;
    },

    extend: function(target, ext) {
        if (arguments.length < 2) {
            throw "You must provide at least a target and 1 object to extend from"
        }

        var i, j, obj, key, val;

        for (i = 1; i < arguments.length; i++) {
            obj = arguments[i];
            for (key in obj) {
                // Don't copy built-ins
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }

                val = obj[key];
                // Don't copy undefineds or references to target (would cause infinite loop)
                if (val === undefined || val === target) {
                    continue;
                }

                // Replace existing function and store reference to it in .base
                if (val instanceof Function && target[key] && val !== target[key]) {
                    val.base = target[key];
                    val._isProperty = val.base._isProperty;
                }
                target[key] = val;

                if (val instanceof Function) {
                    // If this function observes make a reference to it so we can set
                    // them up when this get instantiated
                    if (val._observing) {
                        // Force a COPY of the array or we will probably end up with various
                        // classes sharing the same one.
                        if (!target._observingFunctions) {
                            target._observingFunctions = [];
                        } else {
                            target._observingFunctions = target._observingFunctions.slice(0);
                        }


                        for (j = 0; j<val._observing.length; j++) {
                            target._observingFunctions.push({property:val._observing[j], method: key});
                        }
                    } // if (val._observing)

                    // If this is a computer property then add it to the list so get/set know where to look
                    if (val._isProperty) {
                        if (!target._computedProperties) {
                            target._computedProperties = [];
                        } else {
                            target._computedProperties = target._computedProperties.slice(0);
                        }

                        target._computedProperties.push(key)
                    }
                }
        
            }
        }


        return target;
    },

    beget: function(o) {
        var F = function(){};
        F.prototype = o;
        var ret  = new F();
        F.prototype = null;
        return ret;
    },

    callback: function(target, method) {
        if (typeof(method) == 'string') {
            var methodName = method;
            method = target[method];
            if (!method) {
                throw "Callback to undefined method: " + methodName;
            }
        }
        if (!method) {
            throw "Callback with no method to call";
        }

        return function() {
            method.apply(target, arguments);
        }
    },

    domReady: function() {
        if (this._isReady) {
            return;
        }

        if (!document.body) {
            setTimeout(function() { util.domReady(); }, 13);
        }

        window.__isReady = true;

        if (window.__readyList) {
            var fn, i = 0;
            while ( (fn = window.__readyList[ i++ ]) ) {
                fn.call(document);
            }

            window.__readyList = null;
            delete window.__readyList;
        }
    },


    /**
     * Adapted from jQuery
     * @ignore
     */
    bindReady: function() {

        if (window.__readyBound) {
            return;
        }

        window.__readyBound = true;

        // Catch cases where $(document).ready() is called after the
        // browser event has already occurred.
        if ( document.readyState === "complete" ) {
            return util.domReady();
        }

        // Mozilla, Opera and webkit nightlies currently support this event
        if ( document.addEventListener ) {
            // Use the handy event callback
            //document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            
            // A fallback to window.onload, that will always work
            window.addEventListener( "load", util.domReady, false );

        // If IE event model is used
        } else if ( document.attachEvent ) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            //document.attachEvent("onreadystatechange", DOMContentLoaded);
            
            // A fallback to window.onload, that will always work
            window.attachEvent( "onload", util.domReady );

            // If IE and not a frame
            /*
            // continually check to see if the document is ready
            var toplevel = false;

            try {
                toplevel = window.frameElement == null;
            } catch(e) {}

            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
            */
        }
    },



    ready: function(func) {
        if (window.__isReady) {
            func()
        } else {
            if (!window.__readyList) {
                window.__readyList = [];
            }
            window.__readyList.push(func);
        }

        util.bindReady();
    },


    /**
     * Tests if a given object is an Array
     *
     * @param {Array} ar The object to test
     *
     * @returns {Boolean} True if it is an Array, otherwise false
     */
    isArray: function(ar) {
      return ar instanceof Array
          || (ar && ar !== Object.prototype && util.isArray(ar.__proto__));
    },


    /**
     * Tests if a given object is a RegExp
     *
     * @param {RegExp} ar The object to test
     *
     * @returns {Boolean} True if it is an RegExp, otherwise false
     */
    isRegExp: function(re) {
      var s = ""+re;
      return re instanceof RegExp // easy case
          || typeof(re) === "function" // duck-type for context-switching evalcx case
          && re.constructor.name === "RegExp"
          && re.compile
          && re.test
          && re.exec
          && s.charAt(0) === "/"
          && s.substr(-1) === "/";
    },


    /**
     * Tests if a given object is a Date
     *
     * @param {Date} ar The object to test
     *
     * @returns {Boolean} True if it is an Date, otherwise false
     */
    isDate: function(d) {
        if (d instanceof Date) return true;
        if (typeof d !== "object") return false;
        var properties = Date.prototype && Object.getOwnPropertyNames(Date.prototype);
        var proto = d.__proto__ && Object.getOwnPropertyNames(d.__proto__);
        return JSON.stringify(proto) === JSON.stringify(properties);
    },

    /**
     * Utility to populate a namespace's index with its modules
     *
     * @param {Object} parent The module the namespace lives in. parent.exports will be populated automatically
     * @param {String} modules A space separated string of all the module names
     *
     * @returns {Object} The index namespace
     */
    populateIndex: function(parent, modules) {
        var namespace = {};
        modules = modules.split(' ');

        util.each(modules, function(mod, i) {
            // Use the global 'require' which allows overriding the parent module
            util.extend(namespace, window.require('./' + mod, parent));
        });

        util.extend(parent.exports, namespace);

        return namespace;
    }


}

util.extend(String.prototype, /** @scope String.prototype */ {
    /**
     * Create an array of words from a string
     *
     * @returns {String[]} Array of the words in the string
     */
    w: function() {
        return this.split(' ');
    }
});




module.exports = util;

}};
__resources__["/__builtin__/path.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/** @namespace */
var path = {
    /**
     * Returns full directory path for the filename given. The path must be formed using forward slashes '/'.
     *
     * @param {String} path Path to return the directory name of
     * @returns {String} Directory name
     */
    dirname: function(path) {
        var tokens = path.split('/');
        tokens.pop();
        return tokens.join('/');
    },

    /**
     * Returns just the filename portion of a path.
     *
     * @param {String} path Path to return the filename portion of
     * @returns {String} Filename
     */
    basename: function(path) {
        var tokens = path.split('/');
        return tokens[tokens.length-1];
    },

    /**
     * Joins multiple paths together to form a single path
     * @param {String} ... Any number of string arguments to join together
     * @returns {String} The joined path
     */
    join: function () {
        return module.exports.normalize(Array.prototype.join.call(arguments, "/"));
    },

    /**
     * Tests if a path exists
     *
     * @param {String} path Path to test
     * @returns {Boolean} True if the path exists, false if not
     */
    exists: function(path) {
        return (__resources__[path] !== undefined);
    },

    /**
     * @private
     */
    normalizeArray: function (parts, keepBlanks) {
      var directories = [], prev;
      for (var i = 0, l = parts.length - 1; i <= l; i++) {
        var directory = parts[i];

        // if it's blank, but it's not the first thing, and not the last thing, skip it.
        if (directory === "" && i !== 0 && i !== l && !keepBlanks) continue;

        // if it's a dot, and there was some previous dir already, then skip it.
        if (directory === "." && prev !== undefined) continue;

        // if it starts with "", and is a . or .., then skip it.
        if (directories.length === 1 && directories[0] === "" && (
            directory === "." || directory === "..")) continue;

        if (
          directory === ".."
          && directories.length
          && prev !== ".."
          && prev !== "."
          && prev !== undefined
          && (prev !== "" || keepBlanks)
        ) {
          directories.pop();
          prev = directories.slice(-1)[0]
        } else {
          if (prev === ".") directories.pop();
          directories.push(directory);
          prev = directory;
        }
      }
      return directories;
    },

    /**
     * Returns the real path by expanding any '.' and '..' portions
     *
     * @param {String} path Path to normalize
     * @param {Boolean} [keepBlanks=false] Whether to keep blanks. i.e. double slashes in a path
     * @returns {String} Normalized path
     */
    normalize: function (path, keepBlanks) {
      return module.exports.normalizeArray(path.split("/"), keepBlanks).join("/");
    }
};

module.exports = path;

}};
__resources__["/__builtin__/system.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/** @namespace */
var system = {
    /** @namespace */
    stdio: {
        /**
         * Print text and objects to the debug console if the browser has one
         * 
         * @param {*} Any value to output
         */
        print: function() {
            if (console) {
                console.log.apply(console, arguments);
            } else {
                // TODO
            }
        }
    }
};

if (window.console) {
    system.console = window.console
} else {
    system.console = {
        log: function(){}
    }
}

}};
__resources__["/AudioMixer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Cocos requires
var cocos = require('cocos2d');
var events = require('events');

// Static requires
var MOT = require('ModifyOverTime').ModifyOverTime;

// Project requires
var AudioTrack = require('AudioTrack').AudioTrack;

// Only need a single Audio Mixer, so the class is static
// Responsible for managing all the audio in the app
var AudioMixer = BObject.extend({
    sounds : null, // Dictionary of AudioTracks
    availible : false, // true if browser supports <audio>
    ogg : false, // true if browser supports ogg/oga format
    mp3 : false, // true is browser supports mp3 format
    muted : false, // Whether or not all audio should be muted
    volume : 1, // Master volume
    
    init: function () {
        AudioMixer.superclass.init.call(this);
        
        this.sounds = {};
        
        // If AudioMixer is disabled, do not do anything else
        if(!AudioMixer.enabled) {
            console.log("AudioMixer is currently disabled");
            return;
        }
        
        this.crossFadeComplete = this.crossFadeComplete.bind(this);

        var a = document.createElement('audio');
        // Detect <audio> capability
        if(a.canPlayType) {
            this.set('availible', true);
            
            // Detect ogg/oga capability
            var check = a.canPlayType('audio/ogg; codecs="vorbis"');
            if(check != '' && check != 'no') {
                this.set('ogg', true);
            }
            
            // Detect mp3 capability
            check = a.canPlayType('audio/mpeg;')
            if(check != '' && check != 'no') {
                this.set('mp3', true);
            }
        }
    },

    // Load a sound, do NOT supply a file extension with the filename
    loadSound: function(ref, filename) {
        if(!this.get('availible')) {
            return;
        }
        
        // Set file extension based on filetype(s) supported
        if(this.get('ogg')) {
            filename += '.ogg';
        }
        else if(this.get('mp3')) {
            filename += '.mp3';
        }
        else {
            console.log('Can play audio, but no supported audio type availible');
            return
        }
        
        if(!this.checkRef(ref)) {
            var sndList = this.get('sounds');
            
            try {
                sndList[ref] = AudioTrack.create(filename);
            }
            catch(exception) {
                console.log(exception);
            }
            
            this.set('sounds', sndList);
        }
        else {
            console.log('AudioTrack already exists at reference: ' + ref);
        }
    },

    // Plays a sound
    playSound: function(ref, force) {
        if(!this.availible) {
            return;
        }
        
        if(this.checkRef(ref)) {
            if(force) {
                this.sounds[ref].forcePlay();
            }
            else {
                this.sounds[ref].play();
            }
        }
    },

    // Sets a sound to loop continuously, also starts playing the sound if it is not already playing
    loopSound: function(ref) {
        if(!this.availible) {
            return;
        }
        
        if(this.checkRef(ref)) {
            this.sounds[ref].loop = true;
            
            this.playSound(ref);
        }
    },

    // Stops a sound, also disables looping
    stopSound: function(ref) {
        if(!this.availible) {
            return;
        }
        
        if(this.checkRef(ref)) {
            this.sounds[ref].loop = false;
            this.sounds[ref].stop();
        }
    },

    // Sets whether or not all sound is to be muted
    setMute: function(b) {
        if(!this.availible) {
            return;
        }
        
        this.muted = b;
        
        for(snd in this.sounds) {
            this.sounds[snd].setMute(b);
        }
    },

    // Sets the master volume
    setMasterVolume: function(v) {
        if(!this.availible) {
            return;
        }
        
        // Keep the volume level within acceptable range
        v = Math.min(Math.max(0, v), 1);
        
        this.volume = v;
        
        for(snd in this.sounds) {
            this.sounds[snd].updateMasterVolume(v);
        }
    },
    
    // Gets the specificied AudioTrack if it exists
    getSound: function(ref) {
        if(this.checkRef(ref)) {
            return this.get('sounds')[ref];
        }
        return null;
    },
    
    // Cross fades from the specified track to the other specified track over the specified duration
    crossFade: function(from, to, dur) {
        var f = this.getSound(from);
        var t = this.getSound(to);
        
        if(f && t) {
            MOT.create(1, -1, dur).bindFunc(f, f.setVolume);
            MOT.create(0, 1, dur).bindFunc(t, t.setVolume);
        }
        
        setTimeout(this.crossFadeComplete, dur * 1000);
    },
    
    crossFadeComplete: function() {
        events.trigger(this, 'crossFadeComplete');
    },

    // Checks to see if the reference has a valid entry in the dictionary
    checkRef: function(ref) {
        if(ref in this.sounds) {
            return true;
        }
        return false;
    }
});

// Static constants
AudioMixer.enabled = true; // Setting to false disables constructor, preventing audio from playing

exports.AudioMixer = AudioMixer
}};
__resources__["/AudioTrack.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Cocos requires
var cocos = require('cocos2d')

// Wrapper class for the <audio> element
var AudioTrack = BObject.extend({
    audio : null, // Holds the actual audio element
    loop : false, // Whether or not the track should loop on ending
    isPlaying : false, // True if the track is current playing
    volume : 1, // [0-1] the volume for this specific AudioTrack
    masterVolume: 1, // [0-1] the volume of the AudioMixer
    init: function(file) {
        this.audio = document.createElement('audio');
        this.audio.setAttribute('src', file);
        this.audio.addEventListener('ended', this.endCallback.bind(this), false);
        this.set('isPlaying', false);
    },
    
    // Starts playing the audio if it is not already playing
    // Returns true if the audio started to play
    play: function() {
        if(this.audio.networkState != HTMLMediaElement.NETWORK_NO_SOURCE) {
            if(!this.get('isPlaying')) {
                this.audio.play();
                this.set('isPlaying', true);
                return true;
            }
        }
        return false;
    },
    
    // Forces the audio to start playing regardless of its current state
    forcePlay: function() {
        this.stop();
        this.play();
    },
    
    // Stops the audio if it is currently playing
    // Returns true if the audio was stopped
    stop: function() {
        if(this.audio.networkState != HTMLMediaElement.NETWORK_NO_SOURCE) {
            if(this.get('isPlaying')) {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.set('isPlaying', false);
                return true;
            }
        }
        return false;
    },
    
    // Called when a track finishes playing, loops if needed
    endCallback: function() {
        this.set('isPlaying', false);
        
        if(this.get('loop')) {
            this.play();
        }
    },
    
    // Sets the muted attribute for the audio
    setMute: function(b) {
        if(this.audio.networkState != HTMLMediaElement.NETWORK_NO_SOURCE) {
            this.audio.muted = b;
        }
    },
    
    // Called by AudioMixer when the master volume level is changed
    updateMasterVolume: function(v) {
        if(this.audio.networkState != HTMLMediaElement.NETWORK_NO_SOURCE) {
            this.set('masterVolume', v);
            this.audio.volume = v * this.get('volume');
        }
    },
    
    // Called to change the volume of this specific AudioTrack
    setVolume: function(v) {
        if(this.audio.networkState != HTMLMediaElement.NETWORK_NO_SOURCE) {
            // Keep the volume level within acceptable range
            v = Math.min(Math.max(0, v), 1);
            
            this.set('volume', v);
            this.audio.volume = this.get('masterVolume') * v;
        }
    }
});

exports.AudioTrack = AudioTrack
}};
__resources__["/Ball.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var geo = require('geometry');

var Content = require('Content').Content;
var XML = require('XML').XML;

var Ball = cocos.nodes.Node.extend({
    v       : null,     // Velocity vector of the ball
    p       : null,     // Position of the ball
    
    radius  : 37,       // Radius of the ball
    
    correct : false,    // If true, the ball is a correct answer
    bonus   : false,    // If true, the ball is a bonus ball
    lineLoc : 0,        // 
    
    content : null,     // Holds the content to be displayed on the ball
    ball    : null,     // Holds the sprite of a blank ball
    
    init: function(xml) {
        Ball.superclass.init.call(this);
        
        this.p = new geo.Point(Math.random()*750+20, Math.random()*400+20);
        this.v = new geo.Point(Math.random()*80-40, Math.random()*40-20);
        
        this.set('position', this.p);
        
        this.correct = xml.attributes['correct'] == 'false' ? false : true;
        this.bonus = xml.attributes['bonus'] == 'false' ? false : true;
        this.lineLoc = xml.attributes['lineLoc'];
        
        this.ball = cocos.nodes.Sprite.create({file: '/resources/ball-blank.png'});
        this.addChild({child: this.ball});
        
        var displayHack = XML.getDeepChildByName(xml, 'ContentSettings')
        displayHack.attributes['fontColor'] = '#FFF';
        displayHack.attributes['fontSize'] = 36;
        displayHack.attributes['bgShow'] = false;
        
        this.content = Content.buildFrom(XML.getChildByName(xml, 'Content'));
        this.content.set('anchorPoint', new geo.Point(0, 0));
        this.addChild({child: this.content});
    },
    
    // Moves the ball based on its current velocity vector and time elapsed since last frame
    move: function(dt) {
        this.p.x += this.v.x * dt;
        this.p.y += this.v.y * dt;
        
        if(this.p.x < -1 * 40) {
            this.p.x += (792 + 80);
        }
        else if(this.p.x > 792 + 40) {
            this.p.x -= (792 + 80);
        }
        
        if(this.p.x < 0) {
            if(this.v.x > -10 && this.v.x < 0)
                this.p.x -= 15 * dt;
            else if(this.v.x < 10 && this.v.x > 0)
                this.p.x += 15 * dt;
        }
        else if(this.p.x > 790) {
            if(this.v.x > -10 && this.v.x < 0)
                this.p.x -= 15 * dt;
            else if(this.v.x < 10 && this.v.x > 0)
                this.p.x += 15 * dt;
        }
        
        if(this.p.y - this.radius < 0) {
            this.v.y *= -1;
        }
        else if(this.p.y + this.radius > 450) {
            this.v.y *= -1;
        }
    },
    
    // Checks to see if this ball is colliding with the provided coordinates
    isCollidingPoint: function(x, y) {
        var dx = Math.abs(this.p.x - x);
        var dy = Math.abs(this.p.y - y);
        
        if(dx < this.radius && dy < this.radius) {
            if(Math.sqrt(dx * dx + dy * dy) < this.radius) {
                return true;
            }
        }
    },
    
    // Checks to see if this balls is colliding with the other specified ball
    isColliding: function(other) {
        var twoR = this.radius + other.radius;
        
        var dx = Math.abs(this.p.x - other.p.x);
        var dy = Math.abs(this.p.y - other.p.y);
        
        if(dx < twoR && dy < twoR) {
            if(Math.sqrt(dx * dx + dy * dy) < twoR) {
                return true;
            }
        }
        
        return false;
    },
    
    // Resolves a collision between this and the other ball
    collide: function(other) {
        // minimum translation distance to push balls apart after intersecting
        var delta = Vector(this.p.x - other.p.x, this.p.y - other.p.y)
        var deltaLen = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        var mtd = delta.multBy(((this.radius + other.radius)-deltaLen)/deltaLen); 

        // push-pull them apart based off their mass
        this.p = geo.ccpAdd(this.p, mtd);
        other.p = other.ccpSub(this.p, mtd);
/*
        // impact speed
        Vector2d v = (this.v.subtract(other.v));
        float vn = v.dot(mtd.normalize());

        // sphere intersecting but moving away from each other already
        if (vn > 0.0) return;

        // collision impulse
        float i = (-(1.0 + Constants.restitution) * vn) / (im1 + im2);
        Vector2d impulse = mtd.multiply(i);

        // change in momentum
        this.velocity = this.velocity.add(impulse.multiply(im1));
        ball.velocity = ball.velocity.subtract(impulse.multiply(im2));*/
    },
});

exports.Ball = Ball;
}};
__resources__["/Content.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Project Imports
var FractionRenderer = require('FractionRenderer').FractionRenderer;
//var LabelBG = require('LabelBG').LabelBG; //HACK
var PieChart = require('PieChart').PieChart;

// Static Imports
var XML = require('XML').XML;

// Represents a single question to be answered by the player
var Content = BObject.extend({
    init: function(opts) {
        Content.superclass.init.call(this, opts);
    }
});

// Holds registered subclasses' creation functions
Content.registeredContent = {};

// Every defined subclass used should be registered, the cls should be the class
Content.registerContent = function(str, cls) {
    Content.registeredContent[str] = cls;
}

Content.initialize = function () {
    //Content.registerContent(LabelBG.identifier, LabelBG); //HACK
    Content.registerContent('Fraction', FractionRenderer);
    Content.registerContent('PieChart', PieChart);
}

Content._validateNode = function (xmlNode) {
    if(xmlNode.attributes.hasOwnProperty('TYPE')) {
        if(Content.registeredContent.hasOwnProperty(xmlNode.attributes.TYPE)) {
            return true;
        }
    }
    return false;
}

// Build Content subclass from parsed XML
Content.buildFrom = function(xmlNode) {
    if(Content._validateNode(xmlNode)) {
        var cs = XML.getChildByName(xmlNode, 'ContentSettings');
        if(cs) {
            return Content.registeredContent[xmlNode.attributes.TYPE].create.call(
                Content.registeredContent[xmlNode.attributes.TYPE], cs.attributes);
        }
    }
    
    return null;
}

exports.Content = Content;
}};
__resources__["/EndOfGameDisplay.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Cocos imports
var cocos = require('cocos2d');
var geo = require('geometry');
var events = require('events');

// Static imports
var MAC = require('MathAttackControl').MathAttackControl;
var MOT = require('ModifyOverTime').ModifyOverTime;

GuiNode = cocos.nodes.Node.extend({
    init: function(opts) {
        GuiNode.superclass.init.call(this, opts);
        this._actionComplete = this._actionComplete.bind(this);
    },
    
    // Slides a label in from the right
    slideLabelIn: function (l, d) {
        this.addChild({child: l});
        var a = cocos.actions.MoveTo.create({position: new geo.Point(30, l.get('position').y), duration: d});
        a.startWithTarget(l);
        l.runAction(a);
        
        events.addListener(a, 'actionComplete', this._actionComplete);
    },
    
    // Totals a label up over time
    totalLabelUp: function(label, link, value, duration) {
        this.addChild({child: label});
        
        var m = MOT.create(0, value, duration);
        m.bind(this, link);
        
        events.addListener(m, 'Completed', this._actionComplete);
    },
    
    // Causes a label to appear
    showLabel: function (l, d) {
        this.addChild({child: l});
        
        setTimeout(this._actionComplete, d * 1000);
    },
    
    // Triggers 'actionComplete'
    _actionComplete: function () {
        events.trigger(this, 'actionComplete');
    }
});

TotalLine = GuiNode.extend({
    step        : 0,        // Current animation step
    
    name        : null,     // Label to display for the line
    instances   : null,     // Displays the numer of incorrect answers
    xLabel      : null,     // Displays the multiplication symbol
    amount      : null,     // Displays the time penalty for each incorrect answer
    eLabel      : null,     // Displays the equals sign
    result      : null,     // Displays the total time lost to penalties
    medal       : null,     //
    
    instT       : 0,        // Numeric total number of instances
    instLink    : 0,        // Binding value for counting up animation
    resultT     : 0,        // Numeric total for the result value
    resultLink  : 0,        // Binding value for counting up animation
    
    init: function (name, inst, amt) {
        TotalLine.superclass.init.call(this);
    
        this.instT = inst;
        this.resultT = amt * inst;
    
        // Labels for the line
        this.buildLabel(name, 'name', -500);
        this.buildLabel('0', 'instances', 100);
        this.buildLabel('X', 'xLabel', 120);
        this.buildLabel((amt == 0 ? '0' : amt), 'amount', 145);
        this.buildLabel('=', 'eLabel', 200);
        this.buildLabel('0', 'result', 350);
        this.get('result').set('anchorPoint', new geo.Point(1, 0.5));
    },
    
    // Builds a basic label for the line
    buildLabel: function(s, l, x) {
        lbl = cocos.nodes.Label.create({string: s});
        lbl.set('position', new geo.Point(x, 0));
        lbl.set('anchorPoint', new geo.Point(0, 0.5));
        this.set(l, lbl);
    },
    
    // Start the animation sequence
    start: function() {
        events.addListener(this, 'actionComplete', this.next.bind(this));
        this.next();
    },
    
    // Performs the next step in the animation
    next: function() {
        var step = this.get('step');
        
        if(step == 0)
            this.slideLabelIn(this.get('name'), 0.75);
        else if(step == 1)
            this.showLabel(this.get('instances'), 0.05);
        else if(step == 2)
            this.showLabel(this.get('xLabel'), 0.05);
        else if(step == 3)
            this.showLabel(this.get('amount'), 0.05);
        else if(step == 4)
            this.showLabel(this.get('eLabel'), 0.05);
        else if(step == 5)
            this.showLabel(this.get('result'), 0.05);
        else if(step == 6) {
            this.totalLabelUp(this.get('instances'), 'instLink', this.get('instT'), 0.5);
            this.totalLabelUp(this.get('result'), 'resultLink', this.get('resultT'), 0.5);
        }
        else if(step == 8) {
            events.trigger(this, 'animationCompleted');
        }
        
        this.set('step', step + 1);
    }
});

// Responsible for displaying the player's stats at the end of the game
//TODO: Allow for a variable number of totaling lines
EndOfGameDisplay = GuiNode.extend({
    elapsedLabel    : null,     // Text label for the elapsed line
    elapsedTime     : null,     // Displays the elapsed time
    elapsedLink     : 0,        // Holds the raw value of elapsedTime
    lines           : null,     // Holds the sub-TotalLines
    
    totalLabel  : null,     // Label for displaying the total score
    totalLink   : 0,        // Numeric link for the total score
    total       : 0,        // The actual total score
    totalLineX  : 250,      // Right side of total line
    
    step        : 0,        // Current animation step
    
    timeAmt     : 0.0,      // Elapsed time to display
    abort       : false,    // Abort state of the game
    
    sliderX     : 410,      // X location of the slider on the medal line
    
    init: function (ta, a, right, wrong, bonus) {
        EndOfGameDisplay.superclass.init.call(this);
    
        this.set('timeAmt', ta);
        this.set('abort', a);
    
        var lbl;
        var opts = {};
        
        this.bg = cocos.nodes.Sprite.create({file: '/resources/Score_Card/Window_Postgame.png'});
        this.scaleTo(this.bg, 440, 550)
        this.bg.set('anchorPoint', new geo.Point(0, 0));
        this.addChild({child: this.bg});
        
        // Text label for time elapsed
        opts['string'] = 'Elapsed Time';
        lbl = cocos.nodes.Label.create(opts);
        lbl.set('position', new geo.Point(-500, 40));
        lbl.set('anchorPoint', new geo.Point(0, 0.5));
        this.set('elapsedLabel', lbl);
        
        // Displays time elapsed
        opts['string'] = '0.0';
        lbl = cocos.nodes.Label.create(opts);
        lbl.set('position', new geo.Point(390, 40));
        lbl.set('anchorPoint', new geo.Point(1, 0.5));
        this.set('elapsedTime', lbl);
        
        this.lines = [];
        this.lines[0] = TotalLine.create('Correct'  , right, 120);
        this.lines[1] = TotalLine.create('Incorrect', wrong, -100);
        this.lines[2] = TotalLine.create('Bonus'    , bonus, 25);
        
        for(var i=0; i<3; i+=1) {
            this.lines[i].set('position', new geo.Point(30, 80 + 40*i));
            events.addListener(this.lines[i], 'animationCompleted', this.next.bind(this));
            this.addChild({child: this.lines[i]});
        }

        // Holds overall total
        opts['string'] = '0';
        lbl = cocos.nodes.Label.create(opts);
        lbl.set('position', new geo.Point(390, 200));
        lbl.set('anchorPoint', new geo.Point(1, 0.5));
        this.set('totalLabel', lbl);
        
        var dir = '/resources/Score_Card/Window_MedalGained/Window_MedalGained_';
        this.metalTextures = [
            cocos.nodes.Sprite.create({file: dir + 'Gold.png'}),
            cocos.nodes.Sprite.create({file: dir + 'Silver.png'}),
            cocos.nodes.Sprite.create({file: dir + 'Bronze.png'}),
            cocos.nodes.Sprite.create({file: dir + 'None.png'}),
        ]
        
        var x = 30;
        for(i=0; i<4; i+=1) {
            this.scaleTo(this.metalTextures[i], MAC.proportions[i] * 380, 20)
            this.metalTextures[i].set('position', new geo.Point(x, 260));
            this.metalTextures[i].set('anchorPoint', new geo.Point(0, 0));
            this.addChild({child: this.metalTextures[i]});
            
            x += MAC.proportions[i] * 380;
        }
        
        this.needle = cocos.nodes.Sprite.create({file: dir + 'Needle.png'});
        this.needle.set('position', new geo.Point(this.sliderX, 280))
        this.addChild({child:this.needle});
    },
    
    //TODO: Really should be a util function, or put in cocos.nodes.Node
    scaleTo: function(s, x, y) {
        var c = s.get('contentSize');
        s.set('scaleX', x / c.width);
        s.set('scaleY', y / c.height);
    },
    
    // Called every frame
    update: function(dt) {
        this.fix(this.get('elapsedTime'), this.get('elapsedLink'), 1);
        
        for(var i in this.lines) {
            this.fix(this.lines[i].get('instances'), this.lines[i].get('instLink'), 0);
            this.fix(this.lines[i].get('result'), this.lines[i].get('resultLink'), 0);
        }
        
        this.fix(this.get('totalLabel'), this.get('totalLink'), 0);
    },
    
    // Keeps the label's string value fixed to three positions
    fix: function(l, v, p) {
        f = parseFloat(v);
        l.set('string', f.toFixed(p));
    },
    
    // Start the animation sequence
    start: function() {
        this.scheduleUpdate();
        events.addListener(this, 'actionComplete', this.next.bind(this));
        this.next();
    },
    
    // Begins the next step in the animation process
    next: function() {
        var step = this.get('step');
        
        if(step == 0)
            this.slideLabelIn(this.get('elapsedLabel'), 0.75);
        else if(step == 1)
            this.totalLabelUp(this.get('elapsedTime'), 'elapsedLink', this.get('timeAmt'), 0.5);
        else if(step == 2)
            this.lines[0].start();
        else if(step == 3)
            this.lines[1].start();
        else if(step == 4)
            this.lines[2].start();
        else if(step == 5) {
            var m = MOT.create(this.totalLineX, 125, 0.2);
            m.bind(this, 'totalLineX');
            
            events.addListener(m, 'Completed', this._actionComplete);
        }
        else if(step == 6) {
            this.total = this.lines[0].resultT + this.lines[1].resultT + this.lines[2].resultT;
            this.totalLabelUp(this.get('totalLabel'), 'totalLink', this.total, 1.0);
            
            var x;
            if(this.get('abort') || this.total < MAC.medalScores[4])
                x = 0;
            else
                x = -380 * Math.min(1, Math.max(0, this.total / (MAC.medalScores[0] - MAC.medalScores[4])));
            
            MOT.create(this.sliderX, x, 1.0).bind(this, 'sliderX');
        }
        else if(step == 7) {
            var dir = '/resources/Score_Card/Medals/Medal_'
            if(this.get('abort') || this.total < MAC.medalScores[3])
                this.medal = cocos.nodes.Sprite.create({file: dir + 'None.png'});
            else if(this.total > MAC.medalScores[1])
                this.medal = cocos.nodes.Sprite.create({file: dir + 'Gold.png'});
            else if(this.total > MAC.medalScores[2])
                this.medal = cocos.nodes.Sprite.create({file: dir + 'Silver.png'});
            else
                this.medal = cocos.nodes.Sprite.create({file: dir + 'Bronze.png'});
            
            this.medal.set('position', new geo.Point(290, 420));
            this.medal.set('anchorPoint', new geo.Point(0.5, 0.5));
            this.medal.set('scaleX', 1);
            this.medal.set('scaleY', 1);
            this.addChild({child: this.medal});
            
            setTimeout(this.next.bind(this), 250);
        }
        else
            events.trigger(this, 'animationCompleted');
        
        this.set('step', step + 1);
    },
    
    // Handles all the low level drawing calls
    // TODO: Unmagic number these
    draw: function (ctx) {
        // Draw the totaling line
        if(this.get('step') >= 6) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = '4';
            ctx.beginPath();
            ctx.moveTo(250, 180);
            ctx.lineTo(this.get('totalLineX'), 180);
            ctx.stroke();
        }
        
        //HACK: Laziness...
        this.needle.position.x = this.sliderX;
    }
});

exports.EndOfGameDisplay = EndOfGameDisplay
}};
__resources__["/FractionRenderer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');

// TODO: Subclass this off a Value/Expression class or have it pulled in when needed by such a class
var FractionRenderer = cocos.nodes.Node.extend({
    numerator   : 1,            // The numerator of the fraction
    denominator : 2,            // The denominator of the fraction
    whole       : null,         // The mixed number component of the fraction
    bgColor     : '#fff',       // Color of the background rectangle
    fontColor   : '#000',       // Color of the numerator and denominator (TODO: Seperate for numerator/denominator?)
    fontSize    : '16',         // Size of the numerator and denominator text
    fontName    : 'Helvetica',  // Font of the numerator and denominator
    lineColor   : '#a22',       // Color of the fraction bar between the numerator and denominator
    init: function(opts) {
        FractionRenderer.superclass.init.call(this);
        
        // Set properties from the option object
        util.each('numerator denominator whole bgColor fontColor seperatorColor fontName fontColor fontSize'.w(), util.callback(this, function (name) {
            if (opts[name]) {
                this.set(name, opts[name]);
            }
        }));
        
        // Create the numerical labels for the numerator and denominator
        var opts = Object();
        opts["string"] = this.get("numerator");
        opts["fontName"] = this.get("fontName");
        opts["fontColor"] = this.get("fontColor");
        opts["fontSize"] = this.get("fontSize");
        
        var n = cocos.nodes.Label.create(opts);
        n.bindTo('opacity', this, 'opacity');
        this.addChild({child: n});
        
        opts["string"] = this.get("denominator");
        var d = cocos.nodes.Label.create(opts);
        d.bindTo('opacity', this, 'opacity');
        this.addChild({child: d});
        
        // Figuring out combined content size
        var v = n.get('contentSize').height / 2 + d.get('contentSize').height / 2 + 36;
        var h = Math.max(n.get('contentSize').width, d.get('contentSize').width) + 10;
        
        // Regular fraction defaults
        if(this.get('whole') == null) {
            n.set('position', new geom.Point(0, -15));
            d.set('position', new geom.Point(0, 15));
            
            this.set('contentSize', new geom.Size(h, v));
        }
        // Account for the inclusion of a mixed number
        else {
            opts["string"] = this.get("whole");
            opts["fontSize"] *= 2;
            var w = cocos.nodes.Label.create(opts);
            w.bindTo('opacity', this, 'opacity');
            this.addChild({child: w});
            
            n.set('anchorPoint', new geom.Point(1, 0.5));
            n.set('position', new geom.Point(h / 2 + 2, -15));
            d.set('anchorPoint', new geom.Point(1, 0.5));
            d.set('position', new geom.Point(h / 2 + 2, 15));
            
            w.set('anchorPoint', new geom.Point(0, 0.5));
            w.set('position', new geom.Point(h / -2 - 2, 0));
            
            h += w.get('contentSize').width;
            
            this.set('contentSize', new geom.Size(h, v));
        }
    },
    
    // Draw the background and the horizontal fraction bar
    draw: function(context) {
        var size = this.get('contentSize');
    
        context.fillStyle = this.get('bgColor');
        context.beginPath();
        context.moveTo(size.width /  2, size.height /  2);
        context.lineTo(size.width /  2, size.height / -2);
        context.lineTo(size.width / -2, size.height / -2);
        context.lineTo(size.width / -2, size.height /  2);
        context.closePath();
        context.fill();
        
        context.strokeStyle = this.get('lineColor');
        context.beginPath();
        if(this.get('whole') == null) {
            context.moveTo(size.width / -4, 0);
            context.lineTo(size.width /  4, 0);
        }
        // Account for offset due to mixed number presence
        else {
            context.moveTo(2                 , 0);
            context.lineTo(size.width / 2 - 2, 0);
        }
        context.closePath();
        context.stroke();
    },
});

exports.FractionRenderer = FractionRenderer
}};
__resources__["/Game.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var events = require('events');

var GameView = require('GameView').GameView;
var Question = require('Question').Question;

var MAC = require('MathAttackControl').MathAttackControl;
var XML = require('XML').XML;

var Game = cocos.nodes.Node.extend({
    questions       : null,     // List of questions for the current stage
    timeRemaining   : 60,       // Time remaining on current stage
    timeElapsed     : 0,        // Time elapsed on current stage
    score           : 0,        // Current score
    currentQuestion : -1,       // Current question index
    
    view            : null,     // Holds the GameView
    
    right           : 0,        // Number of correct answers for the current question
    wrong           : 0,        // Number of incorrect answers for the current question
    
    rightTotal      : 0,        // Total correct answers for the stage
    wrongTotal      : 0,        // Total incorrect answers for the stage
    bonusTotal      : 0,        // Total number of bonus seconds for the stage
    
    transition      : false,    // True during question transitions, blocks input when true

    init: function(xml) {
        Game.superclass.init.call(this);
        
        var medals = XML.getDeepChildByName(xml, 'MEDALS');
        if(medals != null) {
            for(var i=0; i<medals.children.length; i++) {
                var m = medals.children[i]
                if(m.attributes.hasOwnProperty('Id') && m.attributes.hasOwnProperty('Score'))
                    MAC.medalScores[m.attributes['Id']] = parseInt(m.attributes['Score']);
            }
        }
        MAC.medalScores[0] = MAC.medalScores[1] * 1.4;
        MAC.calcProportions();
        
        this.questions = [];
        var problemRoot = XML.getDeepChildByName(xml, 'PROBLEM_SET');
        var q = XML.getChildrenByName(problemRoot, 'QUESTION');
        for(var i=0; i<q.length; i+=1) {
            this.questions.push(Question.create(q[i]));
        }
        
        this.view = GameView.create();
        this.addChild({child: this.view});
    },
    
    // Fade screen out in prepartion for a question swap.
    prepareNextQuestion: function() {
        if(!this.transition) {
            this.transition = true;
            this.view.fadeCycle();
            setTimeout(this.nextQuestion.bind(this), 500);
        }
    },
    
    // Move to next question, or trigger the end of the game
    nextQuestion: function() {
        // Remove the previous question, if there was one
        if(this.currentQuestion > -1) {
            this.questions[this.currentQuestion].right = this.right;
            this.questions[this.currentQuestion].wrong = this.wrong;
        
            this.view.removeChild({child: this.questions[this.currentQuestion]});
            cocos.Scheduler.get('sharedScheduler').unscheduleUpdateForTarget(this.questions[this.currentQuestion]);
        }
    
        // Progress through the question array
        this.currentQuestion += 1;
        
        // Check for end of game (due to running out of questions)
        if(this.currentQuestion < this.questions.length) {
            
            // Setup and add the next question
            this.view.addChild({child: this.questions[this.currentQuestion]});
            this.questions[this.currentQuestion].scheduleUpdate();
            this.view.nextQuestion();
            
            // Reset answer type totals
            this.right = 0;
            this.wrong = 0;
            
            // Set the current round's timer
            this.timeRemaining = this.questions[this.currentQuestion].timeLimit;
            
            // No longer transitioning, enable input
            this.transition = false;
        }
        else {
            // Clear icons and numberline at the end of the game
            this.view.resetCounters();
            this.view.line.clearAllSlots();
            
            events.trigger(this, 'endOfGame');
        }
    },
    
    // Resolve mouse click input
    input: function(x, y) {
        // Ignore if we do not have a valid question
        if(this.currentQuestion < 0 || this.currentQuestion >= this.questions.length || this.transition)
            return;
    
        // Get the result from the quesion
        var rv = this.questions[this.currentQuestion].input(x, y);
        
        // Update view based on return value
        if(rv.retVal == 1) {
            this.view.line.correctSlot(rv.lineLoc);
            this.view.enableRemaining(this.right);
            this.right += 1;
            this.rightTotal += 1;
            
            this.modifyScore(120);
        }
        else if(rv.retVal == 2) {
            this.modifyScore(1000);
        }
        else if(rv.retVal == 0) {
            this.view.line.incorrectSlot(rv.lineLoc);
            this.view.enableMiss(this.wrong);
            this.wrong += 1;
            this.wrongTotal += 1;
            
            this.modifyScore(-100);
        }
        
        // If we have hit an answer limit, move to the next question
        if(this.right >= 7 || this.wrong >= 3) {
            // Only apply time bonus for correctly ending a round
            if(this.right >= 7) {
                var bonus = Math.round(this.timeRemaining);
                
                this.modifyScore(bonus * 25);
                this.bonusTotal += bonus;
                this.questions[this.currentQuestion].bonus = bonus;
            }
            this.prepareNextQuestion();
        }
    },
    
    // Starts the game
    startGame: function() {
        this.scheduleUpdate();
        this.nextQuestion();
    },
    
    // Change the player's score value
    modifyScore: function(val) {
        this.score += val;
        this.view.scoreCount.set('string', this.score);
        this.view.scoreCount._updateLabelContentSize();
    },
    
    // Tracks time
    update: function(dt) {
        // Update timers
        this.timeElapsed += dt;
        this.timeRemaining -= dt;
        
        // Check for end of the game (due to timer running out)
        if(this.timeRemaining <= 0) {
            this.timeRemaining = 0;
            this.prepareNextQuestion();
        }
        
        // Update the numerical displays of the GameView
        if(this.timeRemaining.toFixed) {
            this.view.timeCount.set('string', this.timeRemaining.toFixed(0));
        }
    }
});

exports.Game = Game;
}};
__resources__["/GameView.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var geo = require('geometry');

var Numberline = require('Numberline').Numberline;

var MOT = require('ModifyOverTime').ModifyOverTime;
var XML = require('XML').XML;

var GameView = cocos.nodes.Node.extend({
    roundLabel      : null,     // Text label "Round"
    roundCount      : null,     // Current round number as a text label
    
    timeLabel       : null,     // Text label "Time"
    timeCount       : null,     // Current time remaining as a text label
    
    remainingLabel  : null,     // Text label "Remaining"
    
    incorrectLabel  : null,     // Text label "Misses"
    
    scoreLabel      : null,     // Text label "Score"
    scoreCount      : null,     // Current score as a text label
    
    line            : null,     // Holds the numberline
    
    misses          : null,     // Indicators for incorrect answers
    corrects        : null,     // Indicators for correct answers

    init: function(xml) {
        GameView.superclass.init.call(this);
        
        // Background of cut out question window
        var bg = cocos.nodes.Sprite.create({file: '/resources/whiteback.png'});
        bg.set('position', new geo.Point(450, 300));
        bg.set('zOrder', -1);
        this.addChild({child: bg});
        
        // Pane used to create a fade effect between questions
        this.fadePane = cocos.nodes.Sprite.create({file: '/resources/whiteback.png'});
        this.fadePane.set('position', new geo.Point(450, 300));
        this.fadePane.set('zOrder', 1);
        this.fadePane.set('opacity',0);
        this.addChild({child: this.fadePane});
        
        // Foreground window
        var fg = cocos.nodes.Sprite.create({file: '/resources/background.png'});
        fg.set('anchorPoint', new geo.Point(0, 0));
        fg.set('zOrder', 2);
        this.addChild({child: fg});
        
        // Numberline
        this.line = Numberline.create();
        this.line.set('anchorPoint', new geo.Point(0, 0));
        this.line.set('position', new geo.Point(65, 5));
        this.line.set('zOrder', 3);
        this.addChild({child: this.line});
        
        // Text labels
        var tc = '#000000';
        this.buildLabel('roundLabel',       'Round',    tc, 110, 545);
        this.buildLabel('roundCount',       '0',        tc, 110, 575);
        this.buildLabel('timeLabel',        'Time',     tc, 230, 545);
        this.buildLabel('timeCount',        '0',        tc, 230, 575);
        this.buildLabel('remainingLabel',   'Correct',  tc, 430, 545);
        this.buildLabel('incorrectLabel',   'Misses',   tc, 640, 545);
        this.buildLabel('scoreLabel',       'Score',    tc, 780, 545);
        this.buildLabel('scoreCount',       '0',        tc, 780, 575);
        
        // Incorrect answer indicators
        this.misses = [[], []];
        for(var i=0; i<3; i+=1) {
            this.misses[0].push(cocos.nodes.Sprite.create({file: '/resources/status-incorrect-gray.png'}));
            this.misses[0][i].set('position', new geo.Point(618 + i*22, 575));
            this.misses[0][i].set('zOrder', 3);
            this.misses[1].push(cocos.nodes.Sprite.create({file: '/resources/status-incorrect-red.png'}));
            this.misses[1][i].set('position', new geo.Point(618 + i*22, 575));
            this.misses[1][i].set('zOrder', 3);
            this.addChild({child: this.misses[0][i]});
        }
        
        // Correct answers remaining indicators
        this.corrects = [[], []];
        for(var i=0; i<7; i+=1) {
            this.corrects[0].push(cocos.nodes.Sprite.create({file: '/resources/status-correct-gray.png'}));
            this.corrects[0][i].set('position', new geo.Point(364 + i*22, 575));
            this.corrects[0][i].set('zOrder', 3);
            this.corrects[1].push(cocos.nodes.Sprite.create({file: '/resources/status-correct-green.png'}));
            this.corrects[1][i].set('position', new geo.Point(364 + i*22, 575));
            this.corrects[1][i].set('zOrder', 3);
            this.addChild({child: this.corrects[0][i]});
        }
    },
    
    // Helper function for initializing all of the labels
    buildLabel: function(name, str, fc, x, y) {
        this[name] = cocos.nodes.Label.create({fontColor: fc, string: str});
        this[name].set('position', new geo.Point(x, y));
        this[name].set('zOrder', 3);
        this.addChild({child: this[name]});
    },
    
    // Enables the specified miss icon
    enableMiss: function(i) {
        this.removeChild({child: this.misses[0][i]});
        this.addChild({child: this.misses[1][i]});
    },
    
    // Enables the specified remaining icon
    enableRemaining: function(i) {
        this.removeChild({child: this.corrects[0][i]});
        this.addChild({child: this.corrects[1][i]});
    },
    
    // Resets the icon based counters
    resetCounters: function() {
        for(var i=0; i<this.misses[0].length; i+=1) {
            this.removeChild({child: this.misses[0][i]});
            this.removeChild({child: this.misses[1][i]});
            this.addChild({child: this.misses[0][i]});
        }
        
        for(var i=0; i<this.corrects[0].length; i+=1) {
            this.removeChild({child: this.corrects[0][i]});
            this.removeChild({child: this.corrects[1][i]});
            this.addChild({child: this.corrects[0][i]});
        }
    },
    
    // Prepares the GameView for a new question
    nextQuestion: function() {
        this.roundCount.set('string', parseInt(this.roundCount.get('string')) + 1);
        this.resetCounters();
        this.line.clearAllSlots();
    },
    
    // Fades the fadePane in and out
    fadeCycle: function() {
        MOT.create(0, 255, 0.5).bind(this.fadePane, 'opacity');
        
        var that = this;
        setTimeout(function(){ MOT.create(255, -255, 0.5).bind(that.fadePane, 'opacity'); }, 500);
    }
});

exports.GameView = GameView;
}};
__resources__["/KeyboardLayer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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
    
// Handles reading keyboard input, allows us to ignore "Key Repeat" settings as the key is either down, or up
var KeyboardLayer = cocos.nodes.Layer.extend({
    anyKey      : false,// true if any key has been pressed since the last time it was checked
    keys        : null, // Holds the array of key statuses
    bindings    : {},   // Holds the application specific bindings
    init: function() {
        // You must always call the super class version of init
        KeyboardLayer.superclass.init.call(this);
        
        // Enables detecting keypresses
        this.set('isKeyboardEnabled', true);
        
        // Build the array to hold keyboard state
        this.keys = Array(256);
        for(key in this.keys) {
            key = 0;
        }
    },
    
    // Sets key to true when pressed
    keyDown: function(evt) {
        this.anyKey = true;
        this.keys[evt.keyCode] = KeyboardLayer.PRESS;
    },
    
    // Sets key to false when no longer pressed
    keyUp: function(evt) {
        this.keys[evt.keyCode] = KeyboardLayer.UP;
    },
    
    // Check to see if a valid key is pressed
    // Returns false is the key was invalid or not pressed
    // Returns 1 if this is the first time we are detecting the press, 2 if we have detected this press previously
    checkKey: function(keyCode) {
        if(keyCode > -1 && keyCode < 256) {
            var ret = this.keys[keyCode];
            
            // Lets us know if we have polled this key before and the user has not let it back up
            if(ret == KeyboardLayer.PRESS) {
                this.keys[keyCode] = KeyboardLayer.HOLD;
            }
            
            return ret;
        }
        
        return false;
    },
    
    // Checks to see if any key has been pressed since it was last checked
    checkAnyKey: function() {
        if(this.anyKey) {
            this.anyKey = false;
            return true;
        }
        return false;
    },
    
    // Adds a key to a binding, or create the binding if none exists
    addToBinding: function(bind, to) {
        var b = this.get('bindings');
        
        if(!bind in b) {
            b[bind] = [to];
        }
        else {
            b[bind].push(to);
        }
        
        this.set('bindings', b);
        return true;
    },
    
    // Removes a key from a binding, returns false if bind or rm was not found
    removeFromBinding: function(bind, rm) {
        var b = this.get('bindings');
        
        if(bind in b) {
            var i=0
            while(i<b[bind].length && b[bind][i] != rm) {
                i+=1;
            }
            
            if(i<b[bind].length && b[bind][i] == rm) {
                b[bind].splice(i, 1);
                this.set('bindings', b);
                return true;
            }
        }
        return false;
    },
    
    // Explicitly set a binding to a list of keys
    setBinding: function(bind, list) {
        var b = this.get('bindings');
        b[bind] = list;
        this.set('bindings', b);
        return true;
    },
    
    // Clears all keys from a binding, returns false in bind was not in bindings
    clearBinding: function(bind, to) {
        var b = this.get('bindings');
        
        if(bind in b) {
            delete b[bind];
            this.set('bindings', b);
            return true;
        }
        return false;
    },
    
    // Checks to see if any key in the binding is pressed and returns the highest state of any such button pressed
    checkBinding: function(bind) {
        var ret = KeyboardLayer.UP;
        
        if(bind in this.bindings) {
            for(var i = 0; i < this.bindings[bind].length; i += 1) {
                var temp = this.checkKey(this.bindings[bind][i]);
                if(temp > ret) {
                    ret = temp;
                }
            }
            
            return ret;
        }
    },
});

// Static constants
KeyboardLayer.UP        = 0;    // Key is up and was not recently released
KeyboardLayer.PRESS     = 1;    // Key has just been pressed (KeyDown)
KeyboardLayer.HOLD      = 2;    // Key is down and not been released

exports.KeyboardLayer = KeyboardLayer
}};
__resources__["/LabelBG.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Global imports
var Content = require('Content').Content;

var LabelBG = cocos.nodes.Node.extend({
    label : null, // The label that the class wraps
    bgColor: '#FFFFFF', // The color of the background that will be behind the label
    bgShow : null, // If true, use the colored background
    
    init: function(opts) {
        // You must always call the super class version of init
        LabelBG.superclass.init.call(this, opts);
        
        opts['string'] = this.defaulter(opts, 'string', '');
        opts['fontName'] = this.defaulter(opts, 'fontName', 'Helvetica');
        opts['fontColor'] = this.defaulter(opts, 'fontColor', '#000');
        opts['fontSize'] = this.defaulter(opts, 'fontSize', '16');
        
        this.bgShow = true;
        if(opts.hasOwnProperty('bgShow')) {
            if(!opts['bgShow'] || opts['bgShow'] == "false") {
                this.bgShow = false;
            }
        }
        
        var label = cocos.nodes.Label.create(opts)
        label.bindTo('opacity', this, 'opacity');
        this.set('label', label);
        this.addChild({child: label});
        
        this.set('bgColor', this.defaulter(opts, 'bgColor', '#FFFFFF'));

        this.set('contentSize', this.get('label').get('contentSize'));
    },
    
    // Draws the background for the label
    draw: function(context) {
        if(this.bgShow) {
            var size = this.get('contentSize');
            
            context.fillStyle = this.get('bgColor');
            context.fillRect(size.width * -0.6, size.height * -0.75, size.width * 1.2, size.height * 1.5);
        }
    },
    
    //TODO: Put into a utility script/class
    defaulter: function(obj, prop, def) {
        return obj.hasOwnProperty(prop) ? obj[prop] : def;
    }
});

// Static helper function to build the creation options object
LabelBG.helper = function(String, FontColor, BgColor, FontSize, FontName) {
    return {
        string      : String,
        fontColor   : FontColor,
        bgColor     : BgColor,
        fontSize    : FontSize,
        fontName    : FontName
    };
}

LabelBG.identifier = 'String';

exports.LabelBG = LabelBG
}};
__resources__["/main.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Project Imports
var AudioMixer = require('AudioMixer').AudioMixer;
var EOGD = require('EndOfGameDisplay').EndOfGameDisplay;
var Game = require('Game').Game;
var KeyboardLayer = require('KeyboardLayer').KeyboardLayer
var Preloader = require('Preloader').Preloader;

var LabelBG = require('LabelBG').LabelBG;   //HACK

// Static Imports
var MAC = require('MathAttackControl').MathAttackControl;
var MOT = require('ModifyOverTime').ModifyOverTime;
var XML = require('XML').XML;
var Content = require('Content').Content;

// TODO: De-magic number these
/* Zorder
0   Anything not mentioned
*/

// Create a new layer
// TODO: Clean up main, it is getting bloated
var FluencyApp = KeyboardLayer.extend({
    questionList: [],       // List of all questions in the input
    audioMixer  : null,     // AudioMixer for sound effects
    musicMixer  : null,     // AudioMixer for music
    gameID      : '',       // Unique ID for the game
    
    endOfGameCallback : null,   // Holds the name of the window function to call back to at the end of the game
    
    version     : 'v 0.9.0',    // Current version number
    
    // Remote resources loaded successfully, proceed as normal
    runRemotely: function() {
        if(resource("resources/testset.xml") !== undefined) {
            this.parseXML(resource("resources/testset.xml"));
        }
        else {
            console.log("ERROR: No remote XML found to parse.");
        }
    },
    
    // Not the 'real init', sets up and starts preloading
    init: function() {
        // You must always call the super class version of init
        FluencyApp.superclass.init.call(this);
        
        Content.initialize();
        Content.registerContent(LabelBG.identifier, LabelBG);   //HACK
        
        // Explicitly enable audio
        AudioMixer.enabled = true;
        var dir = 'sound/mathattack/'
        // Set up basic audio
        var AM = AudioMixer.create();
        this.set('audioMixer', AM);
        
        var MM = AudioMixer.create();
        this.set('musicMixer', MM);
        
        this.started = false;
        this.ended = false;
        
        var preloader = Preloader.create();
        this.addChild({child: preloader});
        this.set('preloader', preloader);
        
        events.addListener(preloader, 'loaded', this.delayedInit.bind(this));
    },
    
    delayedInit: function() {
        // Remove the 'preloader'
        var preloader = this.get('preloader')
        this.removeChild({child: preloader});
        cocos.Scheduler.get('sharedScheduler').unscheduleUpdateForTarget(preloader);
        this.set('preloader', null);
        
        // Get "command line" arguments from the div tag
        var app_div = $('#cocos_test_app')
        var xml_path = app_div.attr('data');
        this.set('gameID', app_div.attr('gameid'));
        this.set('endOfGameCallback', app_div.attr('callback'));
        
        // Allow this Layer to catch mouse events
        this.set('isMouseEnabled', true);
        
        // Set up remote resources, default value allows for running 'locally'
        // TODO: Remove default in production, replace with error
        __remote_resources__["resources/testset.xml"] = {meta: {mimetype: "application/xml"}, data: xml_path ? xml_path : "ma.xml"};
        
        // Preload remote resources
        var p = cocos.Preloader.create();
        events.addListener(p, 'complete', this.runRemotely.bind(this));
        p.load();
        
        events.trigger(this, 'loaded');
    },
    
    // Parses the level xml file
    parseXML: function(xmlDoc) {
        var xml = XML.parser(xmlDoc.firstChild);
    
        // Parse and process questions
        this.game = Game.create(xml);
        
        this.preprocessingComplete();
    },
    
    // The 'real init()' called after all the preloading/parsing is completed
    preprocessingComplete: function () {
        // Create key bindings
        this.setBinding('ABORT', [27]); // [ESC]
        
        this.addChild({child: this.game});
        
        // Add version number
        var vtag = cocos.nodes.Label.create({string: this.get('version')})
        vtag.set('anchor-point', new geo.Point(0.5, 0.5));
        vtag.set('position', new geo.Point(850, 590));
        this.addChild({child: vtag});
    },
    
    // Three second countdown before the game begins (after pressing the start button on the menu layer)
    // TODO: Make countdown more noticible
    countdown: function() {
        // Set audio levels
        this.musicMixer.setMasterVolume(0.35);
        
        setTimeout(this.startGame.bind(this), 2500);
        
        var cd = cocos.nodes.Label.create({string: '3', fontColor: '#000000'});
        cd.set('scaleX', 10);
        cd.set('scaleY', 10);
        cd.set('position', new geo.Point(450, 300));
        
        this.set('cdt', cd);
        this.addChild({child: cd});
        
        var that = this;
        setTimeout(function () { that.get('cdt').set('string', '2'); }, 750)
        setTimeout(function () { that.get('cdt').set('string', '1'); }, 1500)
        setTimeout(function () { that.get('cdt').set('string', 'GO!'); that.get('cdt').set('position', new geo.Point(375, 300)); }, 2250)
        setTimeout(function () { that.removeChild(that.get('cdt')); }, 2750)
        
        // Catch window unloads at this point as aborts
        $(window).unload(this.endOfGame.bind(this, null));
    },
    
    // Starts the game
    startGame: function() {
        this.started = true;
        events.addListener(this.game, 'endOfGame', this.endOfGame.bind(this, true));
        
        this.scheduleUpdate();
        this.game.startGame();
    },
    
    // Called when game ends, should collect results, display them to the screen and output the result XML
    // finished = null on window.unload, false on abort, true on completion
    endOfGame: function(finished) {
        if(this.ended)
            return;
        this.ended = true;
        //$(window).unbind('unload')
        
        // Stopping the game
        s = cocos.Scheduler.get('sharedScheduler')
        s.unscheduleUpdateForTarget(this);
        s.unscheduleUpdateForTarget(this.game);
        
        // Checks to see if abort was related to window.unload
        if(finished != null) {
            var e = EOGD.create(this.game.timeElapsed, !finished, this.game.rightTotal, this.game.wrongTotal, this.game.bonusTotal);
            e.set('position', new geo.Point(210, 25));
            e.set('zOrder', 12);
            
            this.addChild({child: e});
            setTimeout(e.start.bind(e), 1000);
        }
    
        // If the 'command line' specified a call back, feed the callback the xml
        if(this.get('endOfGameCallback')) {
            if(finished) {
                window[this.get('endOfGameCallback')](this.writeXML('FINISH'));
            }
            else {
                window[this.get('endOfGameCallback')](this.writeXML('ABORT'));
            }
        }
    },

    // Writes the output xml file as a string and returns it
    // TODO: Decide on a new format if needed and update
    writeXML: function(state) {
        // Get needed values
        var ref = this.get('gameID');
        var g = this.game;
        
        var t = g.timeElapsed;
        var s = g.score;
        var m = ' - ';
        
        // Determine medal string
        if(state == 'FINISH') {
            if(s >= MAC.medalScores[1])
                m = "Gold";
            else if(s >= MAC.medalScores[2])
                m = "Silver";
            else if(s >= MAC.medalScores[3])
                m = "Bronze";
        }
        
        // Convert times to milliseconds for reporting
        t = Math.round(t * 1000)
        
        // Question level details
        var detail = ''
        for(var i=0; i<g.questions.length; i+=1) {
            detail += g.questions[i].toXML(i+1);
        }
        
        // Build the XML string
        var x =
        '<OUTPUT>\n' + 
        '    <GAME_REFERENCE_NUMBER ID="' + ref + '"/>\n' + 
        '    <SCORE_SUMMARY>\n' + 
        '        <Score CorrectAnswers="' + g.rightTotal + '" IncorrectAnswers="' + g.wrongTotal + '" BonusSeconds="' + g.bonusTotal + '" ElapsedTime="' + t + '" Score="' + s +'" Medal="' + m + '"/>\n' + 
        '    </SCORE_SUMMARY>\n' +
        '    <SCORE_DETAIL>\n' +
                detail +
        '    </SCORE_DETAIL>\n' + 
        '    <END_STATE STATE="' + state + '"/>\n' +
        '</OUTPUT>';
        
        return x;
    },
    
    // Code to be run when the game is finished
    cleanup: function() {
        // Clear the bind
        $(window).unbind('unload');
        
        cocos.Scheduler.get('sharedScheduler').unscheduleUpdateForTarget(this);
        
        var d = cocos.Director.get('sharedDirector');
        
        // Stop the main loop and clear the scenes
        d.stopAnimation();
        delete d.sceneStack.pop();
        delete d.sceneStack.pop();
        
        // Clear the setup functions
        d.attachInView = null;
        d.runWithScene = null;
        
        // Clear the animating functions
        d.startAnimation = null;
        d.animate = null;
        d.drawScene = null;
        
        // Clear the instance
        d._instance = null;
    },
    
    // Toggles the AudioMixer's mute
    muteAudioHandler: function() {
        var AM = this.get('audioMixer');
        AM.setMute(!AM.get('muted'));
    },
    
    // Toggles the MusicMixer's mute
    muteMusicHandler: function() {
        var MM = this.get('musicMixer');
        MM.setMute(!MM.get('muted'));
    },
    
    // Called every frame, manages keyboard input
    update: function(dt) {
        // 'ESC' Abort game, discreet
        if(this.checkBinding('ABORT') == KeyboardLayer.PRESS && this.started && !this.ended) {
            this.endOfGame(false);
        }
        
    },
    
    // Callback for mouseDown events
    mouseDown: function (evt) {
        if(this.started && !this.ended) {
            this.game.input(evt.locationInCanvas.x, evt.locationInCanvas.y);
        }
    }
});

// For button-like interactions (e.g. starting the game)
// TODO: Extend Menu with functions making it easier to tie the Menu into an app
var MenuLayer = cocos.nodes.Menu.extend({
    startButton : null,     // Holds the button to start the game
    startGame   : null,     // Holds the function in the app that starts the game
    muted       : false,    // State of the volume mute button
    mutedMusic  : false,    // State of the volume mute button
    init: function() {
        MenuLayer.superclass.init.call(this, {});
    },
    
    createMenu: function() {
        var dir = '/resources/';
    
        // Create the button
        var opts = Object();
        opts['normalImage']   = dir + 'button-start.png';
        opts['selectedImage'] = dir + 'button-start.png';
        opts['disabledImage'] = dir + 'button-start.png';
        // We use this callback so we can do cleanup before handing everything over to the main game
        opts['callback'] = this.startButtonCallback.bind(this);
        
        var sb = cocos.nodes.MenuItemImage.create(opts);
        sb.set('position', new geo.Point(0, 0));
        sb.set('scaleX', 0.5);
        sb.set('scaleY', 0.5);
        this.set('startButton', sb);
        this.addChild({child: sb});
        
        // Create the volume control
        dir = '/resources/';
        // TODO: Make a better basic (toggle)button (extend MenuItemImage?)
        opts['normalImage'] = dir + 'fx-on.png';
        opts['selectedImage'] = dir + 'fx-click.png';
        opts['disabledImage'] = dir + 'fx-click.png';
        opts['callback'] = this.volumeCallback.bind(this);
        
        var vc = cocos.nodes.MenuItemImage.create(opts);
        vc.set('position', new geo.Point(425, 170));
        this.set('volumeButtonOn', vc);
        this.addChild({child: vc});
        
        opts['normalImage'] = dir + 'music-on.png';
        opts['selectedImage'] = dir + 'music-click.png';
        opts['disabledImage'] = dir + 'music-click.png';
        opts['callback'] = this.musicCallback.bind(this);
        vc = cocos.nodes.MenuItemImage.create(opts);
        vc.set('position', new geo.Point(425, 205));
        this.set('musicButtonOn', vc);
        this.addChild({child: vc});
        
        opts['normalImage'] = dir + 'fx-off.png';
        opts['selectedImage'] = dir + 'fx-click.png';
        opts['disabledImage'] = dir + 'fx-click.png';
        opts['callback'] = this.volumeCallback.bind(this);
        
        vc = cocos.nodes.MenuItemImage.create(opts);
        vc.set('position', new geo.Point(425, 170));
        this.set('volumeButtonOff', vc);
        
        opts['normalImage'] = dir + 'music-off.png';
        opts['selectedImage'] = dir + 'music-click.png';
        opts['disabledImage'] = dir + 'music-click.png';
        opts['callback'] = this.musicCallback.bind(this);
        vc = cocos.nodes.MenuItemImage.create(opts);
        vc.set('position', new geo.Point(425, 205));
        this.set('musicButtonOff', vc);
    },
    
    // Called when the button is pressed, clears the button, then hands control over to the main game
    startButtonCallback: function() {
        this.removeChild(this.get('startButton'));
        events.trigger(this, "startGameEvent");
    },
    
    volumeCallback: function() {
        events.trigger(this, "muteAudioEvent");
        
        var m = this.get('muted')
        if(!m) {
            this.removeChild(this.get('volumeButtonOn'));
            this.addChild({child: this.get('volumeButtonOff')});
        }
        else {
            this.removeChild(this.get('volumeButtonOff'));
            this.addChild({child: this.get('volumeButtonOn')});
        }
        this.set('muted', !m);
    },
    
    musicCallback: function() {
        events.trigger(this, "muteMusicEvent");
        
        var m = this.get('mutedMusic')
        if(!m) {
            this.removeChild(this.get('musicButtonOn'));
            this.addChild({child: this.get('musicButtonOff')});
        }
        else {
            this.removeChild(this.get('musicButtonOff'));
            this.addChild({child: this.get('musicButtonOn')});
        }
        this.set('mutedMusic', !m);
    },
});

// Initialise application
exports.main = function() {
    // From: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
    // This defines function.bind for web browsers that have not implemented it:
    // Firefox < 4 ; Chrome < 7 ; IE < 9 ; Safari (all) ; Opera (all)
    if (!Function.prototype.bind) {  
        Function.prototype.bind = function (oThis) {  
        
            if (typeof this !== "function") { // closest thing possible to the ECMAScript 5 internal IsCallable function  
                throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");  
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
                };  

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    
    // Setup the director
    var director = cocos.Director.get('sharedDirector');
    director.attachInView(document.getElementById('cocos_test_app'));
    
    var scene = cocos.nodes.Scene.create();     // Create a scene
    var app = FluencyApp.create();              // Create the layers
    var menu = MenuLayer.create();
    
    // Set up inter-layer events
    events.addListener(app, 'loaded', menu.createMenu.bind(menu));
    
    events.addListener(menu, 'startGameEvent', app.countdown.bind(app));
    events.addListener(menu, 'muteAudioEvent', app.muteAudioHandler.bind(app));
    events.addListener(menu, 'muteMusicEvent', app.muteMusicHandler.bind(app));
    
    // Add our layers to the scene
    scene.addChild({child: app});
    scene.addChild({child: menu});
    
    // Allow the App layer to directly access the UI layer
    app.set('menuLayer', menu);
    
    // Run the scene
    director.runWithScene(scene);
};
}};
__resources__["/MathAttackControl.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Static class, so nothing much here
var MathAttackControl = BObject.extend({
    init: function() {
        MathAttackControl.superclass.init.call(this);
    }
});

MathAttackControl.calcProportions = function() {
    MathAttackControl.proportions = [];
    MathAttackControl.proportions[0] = (MathAttackControl.medalScores[0] - MathAttackControl.medalScores[1]) / MathAttackControl.medalScores[0];
    MathAttackControl.proportions[1] = (MathAttackControl.medalScores[1] - MathAttackControl.medalScores[2]) / MathAttackControl.medalScores[0];
    MathAttackControl.proportions[2] = (MathAttackControl.medalScores[2] - MathAttackControl.medalScores[3]) / MathAttackControl.medalScores[0];
    MathAttackControl.proportions[3] = (MathAttackControl.medalScores[3] - MathAttackControl.medalScores[4]) / MathAttackControl.medalScores[0];
}

MathAttackControl.medalScores = [100, 90, 60, 40, 0] // List of important medal score values [max, gold, silver, bronze, 0]

exports.MathAttackControl = MathAttackControl
}};
__resources__["/ModifyOverTime.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var events = require('events');

// Automatically handles changing a value over time (just bindTo "value" to the value you want to change)
var ModifyOverTime = BObject.extend({
    duration: 0,    // Remaining duration of the change
    rate    : 0,    // Rate at which the value changes per second
    value   : null, // The value that is being changed
    
    init: function (x, amount, time) {
        ModifyOverTime.superclass.init.call();
        
        // Initialize
        this.set('value', x);
        this.set('rate', amount / time);
        this.set('duration', time);
        
        // Force calling updates since this will not be added to the scene
        cocos.Scheduler.get('sharedScheduler').scheduleUpdate({target: this, priority: 0, paused: false});
        
        // Keep track of this instance so we can remove it automatically later
        ModifyOverTime.list.push(this);
    },
    
    // Shortcut for bindTo
    bind: function (obj, str) {
        this.bindTo('value', obj, str);
    },
    
    bindFunc: function (obj, func) {
        this.obj = obj;
        this.func = func;
    },

    // Changes value over time
    update: function (dt) {
        var dur = this.get('duration');
        
        // Keep changing as long as there is duration remaining
        if(dur > 0) {
            // Check the case that the tick is longer than our remaining time
            var edt = Math.min(dt, dur);
            this.set('duration', dur - edt);
            
            var rate = this.get('rate');
            this.set('value', this.get('value') + rate * edt);
            
            if(this.func) {
                this.func.apply(this.obj, [this.get('value') + rate * edt]);
            }
        }
        
        // Otherwise change is complete
        else {
            // Let anyone who wants to know that this change has finished
            events.trigger(this, 'Completed', this);
            
            // Then kill it
            this.kill();
        }
    },
    
    // Calling this directly will stop the MOT from modifying and remove it just like if its duration expired, but will not notify anything that it has ended
    kill: function () {
        // Clean up
        cocos.Scheduler.get('sharedScheduler').unscheduleUpdateForTarget(this);
        events.clearInstanceListeners(this);
        this.unbind(this.get('value'));
        
        // and remove
        var index = ModifyOverTime.list.indexOf(this);
        ModifyOverTime.list.splice(index, 1);
    },
    
    pause: function () {
        cocos.Scheduler.get('sharedScheduler').pauseTarget(this);
    },
    
    resume: function () {
        cocos.Scheduler.get('sharedScheduler').resumeTarget(this);
    },
});

// Static variables
ModifyOverTime.list = [];

exports.ModifyOverTime = ModifyOverTime;
}};
__resources__["/Numberline.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var geo = require('geometry');

var Numberline = cocos.nodes.Node.extend({
    content  : null,    // Labels to overlay on the line

    correct  : null,    // Correct background for the numberline
    incorrect: null,    // Incorrect background for the numberline
    status   : null,    // Holds the state of each slot (true means the slot is currently displaying a value)
    
    init: function(xml) {
        Numberline.superclass.init.call(this);
    
        // Displays the blank numberline
        this.line = cocos.nodes.Sprite.create({file: '/resources/empty_line.png'});
        this.line.set('anchorPoint', new geo.Point(0, 0));
        this.line.set('zOrder', 1);
        this.addChild({child: this.line});
        
        this.content = [];
        this.status = [];
        
        // Displayed content values for each slot on the numberline
        for(var i=0; i<21; i+=1) {
            this.content.push(cocos.nodes.Label.create({string: (i-10 == 0 ? '0' : i-10), fontColor: "#FFF"}));
            this.content[i].set('position', new geo.Point(32.125 + i*35.5, 32));
            this.content[i].set('zOrder', 1);
            
            // Initialize the status array
            this.status.push(false);
        }
        
        // Holds background (in)correct colors for the numberline
        this.correct = [];
        this.incorrect = [];
        
        // Special cased left side arrow head
        this.correct.push(cocos.nodes.Sprite.create({file: '/resources/right.png'}));
        this.correct[0].set('position', new geo.Point(49 - 35.5, 32));
        this.correct[0].set('anchorPoint', new geo.Point(0, 0.5));
        this.incorrect.push(cocos.nodes.Sprite.create({file: '/resources/wrong.png'}));
        this.incorrect[0].set('position', new geo.Point(49 - 35.5, 32));
        this.incorrect[0].set('anchorPoint', new geo.Point(0, 0.5));
        
        // Generate background colors along the numberline
        for(var i=1; i<20; i+=1) {
            this.correct.push(cocos.nodes.Sprite.create({file: '/resources/right.png'}));
            this.correct[i].set('position', new geo.Point(49 + (i-1)*35.5, 32));
            this.correct[i].set('anchorPoint', new geo.Point(0, 0.5));
            this.incorrect.push(cocos.nodes.Sprite.create({file: '/resources/wrong.png'}));
            this.incorrect[i].set('position', new geo.Point(49 + (i-1)*35.5, 32));
            this.incorrect[i].set('anchorPoint', new geo.Point(0, 0.5));
        }
        
        // Special cased right side arrow head
        this.correct.push(cocos.nodes.Sprite.create({file: '/resources/right.png'}));
        this.correct[20].set('position', new geo.Point(49 + 19 * 35.5, 32));
        this.correct[20].set('anchorPoint', new geo.Point(0, 0.5));
        this.incorrect.push(cocos.nodes.Sprite.create({file: '/resources/wrong.png'}));
        this.incorrect[20].set('position', new geo.Point(49 + 19 * 35.5, 32));
        this.incorrect[20].set('anchorPoint', new geo.Point(0, 0.5));
    },
    
    // Activate the specified correct icon
    correctSlot: function (i) {
        if(!this.status[i]) {
            this.addChild({child: this.correct[i]});
            this.addChild({child: this.content[i]});
            this.status[i] = true;
        }
    },
    
    // Activate the specified incorrect icon
    incorrectSlot: function (i) {
        if(!this.status[i]) {
            this.addChild({child: this.incorrect[i]});
            this.addChild({child: this.content[i]});
            this.status[i] = true;
        }
    },
    
    // Reset a specific slot on the numberline
    clearSlot: function (i) {
        this.removeChild({child: this.correct[i]});
        this.removeChild({child: this.incorrect[i]});
        this.removeChild({child: this.content[i]});
        this.status[i] = false;
    },
    
    // Reset the entire numberline
    clearAllSlots: function (i) {
        for(var i=0; i<this.correct.length; i+=1) {
            this.clearSlot(i);
        }
    }
});

exports.Numberline = Numberline;
}};
__resources__["/PieChart.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');

// Draws a pie chart
var PieChart = cocos.nodes.Node.extend({
    numSections :2,         // Total number of pie slices
    numFilled   :1,         // Number of filled pie slices
    bgColor     :'#FFFFFF', // Color of the background
    lineColor   :'#000000', // Color of the lines used to outlijne and mark each section
    fillColor   :'#00A0A0', // Color of the filled in sections
    radius      :10,        // Size of the chart
    init: function(opts) {
        PieChart.superclass.init.call(this);
        
        //Set properties from the option object
        util.each('numSections numFilled bgColor lineColor fillColor radius'.w(), util.callback(this, function (name) {
            if (opts[name]) {
                this.set(name, opts[name]);
            }
        }));
        
        // Explictly set contentSize so it plays nice with formating based on it
        this.set('contentSize', new geom.Size(this.get('radius') * 2.4, this.get('radius') * 2.4));
    },
    
    // Draws the PieChart to the canvas
    draw: function(context) {
        var r = this.get('radius');
        
        // Draw background
        context.fillStyle = this.get('bgColor');
        context.fillRect(r * -1.2, r * -1.2, r * 2.4, r * 2.4);
    
        var step = Math.PI*2 / this.get('numSections');
        var offset = Math.PI * 3 / 2    //This is so we draw with 'up' as our 0
    
        // Draw the filled portion
        context.fillStyle = this.get('fillColor');
        context.beginPath();
        context.arc(0, 0, r, offset, offset + step * this.get('numFilled'));
        context.lineTo(0, 0);
        context.lineTo(0, -1 * r);
        context.closePath();
        context.fill();
    
        // Draw the outline
        context.strokeStyle = this.get('lineColor');
        context.beginPath();
        context.arc(0, 0, r, 0, Math.PI*2);
        context.closePath();
        context.stroke();
        
        // Draw the individual dividers
        for(var i=0; i<this.get('numSections'); i+= 1) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(Math.sin(i*step)*r, Math.cos(i*step)*r*-1)
            context.closePath();
            context.stroke();
        }
    },
});

// Static helper function to build the creation options object
PieChart.helper = function(Sections, Filled, BgColor, LineColor, FillColor, Radius) {
    return {
        numSections : Sections,
        numFilled   : Filled,
        bgColor     : BgColor,
        lineColor   : LineColor,
        fillColor   : FillColor,
        radius      : Radius
    };
}

exports.PieChart = PieChart
}};
__resources__["/Preloader.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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
var events = require('events');

// Preloading screen
var Preloader = cocos.nodes.Node.extend({
    pct: 0.0,       // Percent loaded
    
    init: function() {
        Preloader.superclass.init.call(this);
        
        this.scheduleUpdate();
    },
    
    // Fake loading update
    update: function(dt) {
        this.pct += dt;
        if(this.pct > 1) {
            this.pct = 1;
            events.trigger(this, 'loaded');
        }
    },
    
    // Draw the screen
    draw: function(context) {
        // Cover the screen
        context.fillStyle = "#FFFFFF";
        context.fillRect(-10, -10, 920, 620);
    }
});

exports.Preloader = Preloader
}};
__resources__["/Question.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

var cocos = require('cocos2d');
var geo = require('geometry');

var Ball = require('Ball').Ball;

var Content = require('Content').Content;
var XML = require('XML').XML;

var Question = cocos.nodes.Node.extend({
    qContent    : null,     // Content displayed as question
    
    balls       : null,     // Array of all active balls
    
    elapsedTime : 0,        // Time elapsed on this question
    right       : 0,        // Number of correct answers selected
    wrong       : 0,        // Number of incorrect answers selected
    bonus       : 0,
    
    timeLimit   : 30,       // Time allowed for this question
    
    init: function(xml) {
        Question.superclass.init.call(this);
        
        // Position the Question inside the frame of the GameView's foreground.
        this.set('position', new geo.Point(61, 77));
        this.set('anchorPoint', new geo.Point(0, 0));
        
        // Modify the content's display settings
        var displayHack = XML.getChildByName(XML.getChildByName(xml, 'EQUATION'), 'ContentSettings');
        displayHack.attributes['fontSize'] = 48;
        displayHack.attributes['bgShow'] = false;
        
        // Question content to be displayed
        this.qContent = Content.buildFrom(XML.getChildByName(xml, 'EQUATION'));
        this.qContent.set('position', new geo.Point(135, 30));
        this.qContent.set('anchorPoint', new geo.Point(0, 0));
        //this.qContent.set('zOrder', 5);
        this.qContent.set('zOrder', 5);
        
        // Box that the question content appears within
        this.qBox = cocos.nodes.Sprite.create({file: '/resources/questionBox.png'});
        this.qBox.set('position', new geo.Point(400, 24));
        this.qBox.set('zOrder', 11);
        this.addChild({child: this.qBox});
        
        this.qBox.addChild({child: this.qContent});
        
        // Generate the balls for the question
        this.balls = [];
        var xb = XML.getChildrenByName(XML.getChildByName(xml, 'BALLS'), 'BALL');
        //for(var i=0; i<xb.length; i+=1) {
        //    this.balls.push(Ball.create(xb[i]));
        //    this.addChild({child: this.balls[i]});
        //}
        for(var i=0; i<xb.length; i+=1) {
            var ball1 = Ball.create(xb[i]);
            ball1.set('zOrder', xb.length - i);
            this.balls.push(ball1);
            this.addChild({child: this.balls[i]});
        }
    },
    
    // Resolve mouse input for this question
    input: function(x, y) {
        // Bring values into Question coordinate space
        var p = this.get('position');
        x -= p.x;
        y -= p.y;
        
        // Check translated coordinates against the question's balls
        for(var i=0; i<this.balls.length; i+=1) {
            if(this.balls[i].isCollidingPoint(x, y)) {
                var rv = 0;
                
                if(this.balls[i].correct) {
                    rv = 1;
                }
                else if(this.balls[i].bonus) {
                    rv = 2;
                }
                
                var ll = this.balls[i].lineLoc;
                
                this.removeChild(this.balls[i]);
                this.balls.splice(i, 1);
                
                return {retVal: rv, lineLoc: ll};
            }
        }
        
        return {retVal: -1};
    },
    
    // Deals with ball motion and collision
    update: function(dt) {
        this.elapsedTime += dt;
        
        // Move balls
        var i=0;
        for(var i=0; i<this.balls.length; i+=1) {
            this.balls[i].move(dt);
        }
        
        /*/ The check for and resolve any collisions
        for(var i=0; i<this.balls.length; i+=1) {
            for(var j=i+1; j<this.balls.length; j+=1) {
                if(this.balls[i].isColliding(this.balls[j])) {
                    //this.balls.collide(this.balls[j]);
                }
            }
        }//*/
    },
    
    toXML: function(i) {
        return '        <Question Number= "' + i + '" Correct= "' + this.right + '" Incorrect= "' + this.wrong + '" Bonus= "' + this.bonus +'" />\n';
    }
});

Question.height     = 468;
Question.width      = 792;
Question.bufferW    = 20;       // Minimum buffer value = radius
Question.hardW      = true;

exports.Question = Question;
}};
__resources__["/resources/background.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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AIAgBAAAQBACAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAABKEhAAAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAAAgCA0BAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEAAAACEIAAAAEIQAAAIIQAAAAQQgAAIAgBAAAQBACAAAgCAEAABCEv1VKadm+arUaP/74Y9WpBwAArrEv1s7Pz9cvi6pSKbIsE4S/N+VyOUqlpYc4NjYWH3744Z9TSmVTGgAAuFrvv//+37744os/RsSSK0+bNm2K9evX12zl5tapU6dSuVxOP52wxa16++23p9dee+0fKaV1pjUAAPArzbT38OHDf7/55ptnsixb0heNjY3p3XffTSmlVK1Wa66ZsrTSusp8nLTIsix2794dJ0+eXPEpN910U/bkk0/GAw88EBs2bIicDgUAAPBfmJ+fj08++STeeeedOHv2bIqIZetCH3nkkXj77bejqampJo8xt0G46Pz583H//ffH1NSUGQ0AAFw3mzZtiqNHj8bDDz98+YJUrcn9TWVuueWWeO+992Lr1q1mLAAAcF1s3Lgxjh8/XtMxmPsgzLIsUkqxbdu2GBkZiQMHDpi5AADAb/LYY4/FmTNnYseOHTX/tbPcLxm90tTUVLz44osxMjISFy9ejIWFhZifnzerAQCAZerq6mLNmjVRKpVi79698cwzz8SDDz54OQRr9cpg4YLwyhNWqVTi9OnTMT09Hd9++23Nn0gAAOA6x1KWRWNjY9x9992xY8eOqKury98xpgLeWrOW1/gCAAD/v45YDEVBCAAAQE0rGQIAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAACAIAQAAEAQAgAAIAgBAAAQhAAAAAhCAAAABCEAAACCEAAAAEEIAACAIAQAAEAQAgAAIAgBAAAQhADADZZS+sW/f74PAEEIAORIlmWRUopqtRpZli3ZX6lUluwDQBACAAWKRQAEIQCQUymlyLIsSqXSsiWjV+4DIN+y5FUfAPiVeLzybwDywRVCAGBVWZbF3NycGAQQhABAEdXX1xsEAEEIABTyzULpP28XfMsEQBACAAU0NzdnEAAEIQAAAIIQACjOG4aStwwAeeRnJwCAVbm7KEC++bgPAFhVlmVRqVTcUAZAEAIAhXyzYLkoQG75YSEA4BdZMgqQXz7yAwAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAEIQAAAAIQgAAAAQhAAAAghAAAABBCAAAgCAEAABAEAIAACAIAQAAuE7+Dd8OiWMRdGKUAAAAAElFTkSuQmCC")};
__resources__["/resources/ball-blank.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk5JREFUeNrsnMFtgzAUhg1dINkgnSCMwLFbhBFy7akjoE6QbJJsEDIBbECO7Sm1Kxw5xDa2BcbA/0u/VKqqTT+9Zz8b+0XEv1bUKXVCvRWeu3SmvlFfqQvheXZiYHLqC/W9R1+a35tMHRCLmD112TMglcvm762mBGlDffAESOVD8zmCjqSxIcmgBRdpLPzrwEBx183nCyLlToFCavs0ZmpmAUeTLsoy36DyiUFqO/cF6jBxUOLgP+hsd5kJKLGoXQGUHTCk3hgpmc8cVG+DfrYQUNzOZcVmgnVUH3WYU+F6WhgosdK3XuvdF+y9TZlQLxxWLau/YsXsN6kNtIEK8JfZMZIM6iWBuN6pK1VkfYGPmkckGaugZ635W6S4VYBC8sL8JbLK0Df5R1LVjF2PyEoASruSSURYOzDRaifCSsFDq5SPWZgFDWfFGFFlrCQmMzhU4SsVGawtOBhpG2PRbL64jpotCchAMRAAFmABFmABFmABAWANBusMDEY6M1g3cDDSjcG6goORrkhDizTETqm51nzMKsBCq4KPWQSp2J2C4gPbWr7DSv9vveONdLcq0nojzfQNLlI9uOAUjcEsSCSnaNg3jmDzpKO4wsHJP720J/8qRNdTVFVdP4TTyorTym8SWD/Uv9QfC46qT9tCHTcsLLQhuLtjpYzgVpiVcN/QUrjJainckbYQbt8vOCUH7eswp0HfW8cQsaxALxrLwhVdjiyF/lkOsyU6szmkJnr+OUQaukk6aBZ9SqORIo79cylx74DLvi6I5+NSfwIMABD/F1/oa7D3AAAAAElFTkSuQmCC")};
__resources__["/resources/button-start.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/empty_line.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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K2RmZkKtVveKc1D3pg719fXFs88+i6VLl+KNN95AVVWV1eILIQQMBgP27NkTVlRUJFevXt1PCGFUqVQcjURERERkdyqVCr///rv6X//6l/q99957+Ntvv1mCQuuFxGPGjMGnn36KsWPH9si6gUcGG9mZJdR2kpGRgbS0NDQ0NLRJY+avbU5XyluKvL29UVJSgieeeIIjlYiIiIhs4qeffsKMGTNw7do1y89a16KtN88BABcXF6xfvx5r1qzpveGmN3f8mjVrUFZWhtdee82SppQdLYSA0WiE0WjkbUREREREZFft1aLK2QGNRoPXXnsNZWVlvToQ9PpQAADjx4/Hnj17cOTIEYwbN67Nsw3MevGEBxERERH9DbWuRZXBYNy4cThy5Aj27NmD8ePH9/pz6RM34zs7OyMwMBCXL19Geno6nJycGAKIiIiIqNeFBCcnJ6Snp+Py5csIDAyEs7Nzn/jufW6F7po1a1BTU4OIiAg4OTlZfq68fUhKCZPJxJFJRERERDZjMpms/jCtrD+dnJwQERGBmpqaXn+r0N8iFADA8OHDUVhYiPz8fPj6+lqCgPnCuLq6YsSIERy5RERERGQzI0aMgKurqyUQmAOCr68v8vPzUVhYiOHDh/fJc+uze3kKIRAREYHTp08jKysL7u7ukFIiODgYubm5HLVEREREZHO5ubkIDg6GlBLu7u7IysrC6dOnERER0ac3vvkPzFNtCHhVAvEAAAAASUVORK5CYII=")};
__resources__["/resources/fx-click.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhMUOFxNtk0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAXRJREFUSMfNV+2NwyAMddAN4BEYgREYgREyQjtB0wlQJ2AE1Ak8QiY4MUK7wbtfRUmbJuSj6VlCCoL42fhh7AoATUlVVdObOgKgmtQ5BjwXcI4Bg8BrAUsMUJ8GfadTfRr0nW61B+gQhqIvidrL22evizxmZvLeU0qJAFAIYRu2T40QAroiIij5b2KMb2DmDNi2LZgZzLwa+GfqOIwx+ft6vdL9ft8usbwbdV2jbdvscUoJIgJjDLz3EBGICKy1+Z8YI0QEMUYYY34XHXXTNBgSay201rjdbtmg5/3OueUx1lrjcDhkZSEEWGtzjOu6zmve+2xICGE9uay1WXnTNC/rMcbeaaSUisi3OnMdj8fe/HK5FBFwNbD3vjc/nU7EzJ8Fds6Rc46IiM7nc85ypZltUYyZOZPpkcm68e5esU3JNQSite6RbOweVwB2fZ0epdB33+OScnTrwu+7Hu/ldRdDze0Atqqt1ZL2Y4uC/n+1MHs0bX++BhBBAORBKAAAAABJRU5ErkJggg==")};
__resources__["/resources/fx-off.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhMSOAoXEcsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAixJREFUSMfNl7Fr20AUhz/Jxk4KhoN2KhQui4dCIJApXeIsJUtBoVOnOEtw6ZD4L4g9ZhIeitvJ2jomoVsnTclkoiGTl8hLmkACBpuYFmJ1sa6OkWxhNXJ/k053uu+9e3dP7zQiqA6eDniAFjLG7xsAH8OHKU0c8Bm8FBFmCTDiAfg04dPADhO8xRmAQQb0gXLAVFoQ9Bn/VvcBcO2poWFwLQloEFz3Xy7y9Bpl6P7u1RIAa0OWAqemfJARgjXT5MPlJbueR6HRmBnus9L1CN6+MU3yxaJq56SM5XUdvLQewVsfeuc4fN/YiL3kOpD2piSKFysr6tk9OeF3pxMb7AHa12Gwg5QvFlne2+P5EN51XXquy2m5TH57WxnVrFa5sm0A3h4dkRWCX50O9s5OqKHpSZblpFRQv52TkqwQXNRqvD8/JyME61LybWmJ1UoFaRgA/Njamrg6qXdQCevsuS69dptXm5sAtCyLs3KZW8ehf33N/c0N0jDICkFGCF6XSqQWFmhZFs7h4dQ4h6rrutw5zt92u82VbStPWpaFe3wMwPL+Phkh6A5DEWWDxdLZGOSiVou0AWOD10zzUXv14ICMENPBXgyoNAy1mZrVqjr30zKbB+iz5uhRwE/bplmpqHhLw+BloTAxe+mDGcGFRkMtqe/taLzXR/rHNfCT1peE/k7+MpdA0xkWZknpYbwCScJr39tHx6mfgLf9/6rYm2t5O9eCfq5XmCQubX8AsmjI5ZbiVJUAAAAASUVORK5CYII=")};
__resources__["/resources/fx-on.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhMSFDjPfSgAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAi9JREFUSMfNl79r20AUgD/JxkkKhoN2KhSUxUMhYMiULnGWkqWg0KlTnKW4dEj0F8QeMwkPxe0kbR2T0K2TpmQy0ZDJS+QlTaABg01MC7Y62DrsRpKN3ch9k073pO/90tM7hWmkho8K+IASoRPs9YEPkVpS4hU+4ZOaqBVuRA/4GP1k+IaJz8oMwDADuoDx8E1KKPQJ/1buH8KVR4dGwJVEoCFwVd5c4fFlhKHK6lUSACtDlgSn4vVFRmBumFy9u8J/72MVrNnhQ1aa2mRvzVcmxVxRrrWsNp/XNfz0SJYjvQ2g7p3L1ret+UOuQjq2DQL5Z3l5feqd0vrdmh/sg8KXQbLDpJgrsr+2T/7pAO61PbyOh3FmsJvblUZV6hWcaweA49fHiCVB61eLPWcv0tB0nGFaVpPQYK1lNcSSoHpZ5eLtBSIj0DY1Vr+uUl4vo2s6ADvfd2Kjk+IN5ahNr+PR7DTZfrENgN2wMc4N3J8uN90bbu9v0TUdsSQQGUHpZYnl1DJ2w+bIPZqU5mjx2h7unSvXzXYT59qRntgNmxPvBICDtQNERuC1B6mYor7mE+N8HFK9rE5VgHODzQ1zbH24fojIiCnA/uxQXdNlMVXqFfndT+xsPqiz9uhRgPPDoVwvy3zrmk7heSG2e6n0ZwNbBUuGNPB2NN/WphUd8n7Qsz4n9HcKxqESyqC4eiQnvb8nkCS8Hno7/jl1E/C2+18Newsdbxc60C/0CJPAoe0PhGLI5RDP8IsAAAAASUVORK5CYII=")};
__resources__["/resources/music-click.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhMXJ/po6HsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAWpJREFUSMfNV+2NhSAQRHIFbAdaAiVQgiVYgiXYCSVYwlqCHagVgBXs/bjD6BNdOH2+m4SEhM3MfqFLRkSCQ5ZlvNEKRJSxnGfCqYIpDgSFrwrGOCDfLXrEKd8tesQtnxANaUjxIcinon2NOiliABDWWkFE7EJEvttjl9aaYmGtPeVKilhrHW3b9/3p+VeKcJ7nQgghnHOHxEopAQCscFKqEZGIiJqmObQZhoGIiOq65vjihT2qqmJttNb31BgAlv04jmwPcKmOFlZKLfuu64I2RVEse+fctebyzeKjCRH6My985FhUcymllkZZAxE3NtbanY0xhu2Xw1S3bbtJXah2iLipvcc0TXHfaq5ea8zzvClBCJdS7e/sK9bXJFQKay0BAH89f0ef3QEAkDFmIRyGgcqy3PXB2kFEJKVUzPfgZ+Z68rfoZzAZO47ePfh9dgJ5Kuq1hkx9Adw1W8u/PD/uGOj/1xPmiUfbN9RX63dA64jiAAAAAElFTkSuQmCC")};
__resources__["/resources/music-off.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhMXG9UHlPwAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAc5JREFUSMfNl7FOAkEQhr9dLhiMJpdgow0+wj2CNnYWV+oTSKx8A9/AUBgsfQMKK23kBUxI7GyERhtIIBBJiLI2t5cDd/fuDB5OuTs3/8y//+zOCTJYE5QEFCAsPnpvDtTtbrE5Ha5BlcgQxZDEF3Du+NS4cQWq8gtAUwJT4MIQSphAN1mtfRjAxV+D2sBFEaAmcKkXK/y9JTGkVq8oAFhEWAAeQCnjh2Xf5/T1lbLvp/q+t9vcHR7+WNdYspmj2p0gyAQKUA0Ca9VNUFLmoGr34CCz76DTse5JwFM5LortWg2A2XBoDVyNWOk7gBXg5RHV9v4+AM+NBk+Xl0afk0gDk17PKbI8TMdUj7vd1ORcVJMHOCmqiQV4L6GB/qqAdxIqfWu3jT5bUbVaBy7zsrTFhu/HNJsC6ko1ze+WxDIBV4OAo1YrDmZqk2oQcPz4+KO3XRqIqVaWDRPo8tmZQAHGDkXrdpIiRZ3LNhuNFvrVdl2m3dly7rhrXeuDTsdI6Ww4TFX0HJB1ECa678OQl9vbhXN7CMMFRT+E4UKC+mFwKVpFw6DQz6JHMfYZDYHxEd8U8CYr4Gx5ApkWUO30Xw17ax1v1zrQr/UXpoiftm8keLLj6LpteAAAAABJRU5ErkJggg==")};
__resources__["/resources/music-on.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhMYC08omFcAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAdtJREFUSMfNlz1Ow0AQhb/dWKAgkCyFBprkCD5C0tBRuIQTEFFxA26AUqBQ5gYpqKCJL4BkiY4mSQMNSI4SESmCmCLY+dtd2wgcprI8s/N2Zt/szArSSJMQCYSA0NhEuilQ11rFYja4JqSQaKXexCdwrl+pVlwRUvwBoGoDY+Bi3ZNQgu7wu/K+Di7+HFQDLnIBVYDL+GeRv5cFDBmzV+QALL6xAAuAQrp19pZN97SLvWUn2novHrXb2rqiEEXcTB+ts++kAgVwSo4+6iahXDjlRKkeVFPb+m++XinBMl6DK1LeKwMQTAKtY6c0y4r/6hsvFisLqSp7FQAajw0uHy6VNt2TGQf6o76RZDILKaNU94a9xM0ZU00G4EVS9UZq4OrhnAPGVGcBdvbnLPWePXW0u5X4O5gERn9WmrKwt+04zSqHUaRRmr0XLzEQywTYPmrHzlRl4pQcOsedtdo2cWCe6lCtUIGunp0KFKA/7Cf2aakrJxUowGAyWKpX3XWZdGdLpmRaHP3333xlSoNJkMhopiCpI1Tpdu9cWk+tpXNz790lRrv37tIGo8ZgZHQ4GwZF3BYt8pGP2RA4P+GbHHpyCJytTiDjHKId/6thb6Pj7UYH+o0+YXJ4tH0B9JSy47FgifIAAAAASUVORK5CYII=")};
__resources__["/resources/numberLine.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/questionBox.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAAA+CAYAAAA1fp6CAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhAEJXfPdpwAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAlhJREFUeNrt271x2mAYwPFXWgA8gXV4ANSltEfQBqbSudQGXoEyRwUbaAQo04kBYosJBAvgNDknvuiD+FLE1u9X0Dw6iudO/3vFRxT+zksAPrPoX14oGCAkf4gHoiEcMF6vDWiaZnZpWUQD6G1FLBzAhaeQNyeQSDiA95xAokvCMZlMQlEUIcuyVZqm1gefUF3XoSzLfLlchsPhMBiQwXjM5/Ow3W5X0+nUdmEEjsdjKIoi32w2F8VDOIA3FotFb0B64/H8/LxKksQWYaQnkDRN845HmKjzdx739/dBOGC8ptNpKIqicx7f3t7O2gZZln21Phi3LMtWHaOXeLfbPbVNkiSJrQ7Gre/pIw4dn3f4Shbo43QBiAcgHoB4AOIBIB6AeADiAYgHIB4A4gH/lfP5LB7AO27C+GPehuIBiAcgHoB4AOIBIB6AeADiAYgHIB4A4gGIByAegHgA4gEgHoB4AOIBiAcgHgDiAYgHIB7AR47HfD6/aRtst1vbAbrjsd/vn9oGdV3PrQfGre8Q0fnYsl6vv1gdjNt6vc47RlFnPHa7XSjL8mx9ME5VVYXNZtN98miaZjaZTFqHi8XioaoqW4SROR6PIcuyvO+a+Orq6qkoitbh6XQKd3d3+XK5zK0TxqEsy3OSJPnhcOi6JHp9aZpmliTJ99Pp1PmG19fXIcuykKbptyRJ9lYMn+qkca6q6qEsy7DfD97ev+LxmxdrBIbC0RYPAQEGw9EVDwEBesMRQvfvPKKesAAj8fOb2NYWDP23RURgxNGo6/rGNoBBj4+Ps0uv/QHw9Z3czL/7fAAAAABJRU5ErkJggg==")};
__resources__["/resources/right.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAIAAABjfH+IAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhIpHuVqETkAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAACpJREFUSMftzUEBAAAEBLCjfwFttfCxFVhlcqATjUaj0Wg0Go1Go9F8bRa/bADhDOZJxAAAAABJRU5ErkJggg==")};
__resources__["/resources/Score_Card/Medals/Medal_Bronze.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/Score_Card/Medals/Medal_Gold.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/Score_Card/Medals/Medal_None.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/Score_Card/Medals/Medal_Silver.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACwCAYAAABqxX7PAAAgAElEQVR4nO1932/bZpruQ1GmIkWM1FCVK9eu1Tqxm8JB03hmdhMUiIEC6QwQYHN2b/auWaR2zt1k787d5vwFJ3u3dVpszt3cFMhgg8Vugd3j3LTnDODUszFqRBu3ysojVRqxpixFCjWieS6s98tHipJIWbJlJw8QxKIokqIevr/f9xPwCi1YXFyMmKZ5DsA5QRCipmnO2/cRBGEZAHZ2dlYFQdB8Pp/22Wef/X6fL/VIQzjoCxgGLC4ufgLgqmmaUUEQ5vd4uDSAVQCrRNw7d+482Os1vox4acn56aef/oUgCFcBXBUEITrIc5mmqQFYbUrbNIB7S0tLpUGe8yjgpSLnXgkpSRIkSXK1b61Wg2EYnXZJm6a5bJrmPZ/Pt/yKrK040uRcXFyMYFddz8MlIcPhMAKBACRJwtjY2J6vQdd11Ot1VKtVGIaBarWKSqXiRNx7pmku7+zs3Pviiy+e7vnERwBHkpxNh+YagFudCClJEmRZRjgchizLCAQC+3aNjUYDlUoF5XIZ5XIZtVqNvWeaJpkAt15miXrkyLmwsHBJEIS7AJL290RRRDQaPRAydoOu66jVaigWiyiVXvCxSdTbeAnt1CNDzqYKvwXgJr9dFEUoisIkpN/vP5Dr84JGowFN06Bpmp2od30+3+2XJWR1JMjZdHTu8io8GAwiHo8jGo0eCkK2g67r0DQNqqoy1U/SdGlp6X8f8OUNFIeanDdu3HjfNM1bAK4CL6SkoigIhUIHe3EDgKZpFrVvmuYqgLuCINw9iir/UJJzYWHh14Ig3ETTrgyHw1AUBbFYbE/HbTQaqNVqqFarqNVq0HUdhmFYnJV24MNMoVAIoiiy/2VZ3tN12VGtVpHNZnmSath1/o4USQ8VOe3OjiRJmJiYwNTUFMbHx5FKpVwRiaBpGqrVKsrlMur1Our1+mAuvHmtwWAQoVAIoVCoL/avnaTYjZ3evnPnzt/v+YKHAIeGnM0U4116rSgKzpw5g4mJCSaZstkscrlc22MQEQuFwkCJ6BbBYBCyLO/ZWdN1HZlMxqLuTdO89fnnn/+2n9e73zgU5Gyq8dv0enJyEnNzcy1q/PHjx6hUKpZt5XKZORRdMjYArEF4AJ5VMgXbKeDuIlMEYNdeDofDiEajPTtxmqYhk8nwD95tHOJY6dCTs+n0rNLrX/ziF5idnW358YrFIp4+3U2s6LoOVVWhqmpbCUlkkGUZoVAIkiQNNO5ZLpeh6zoLvHeT3JFIBLFYDNGo97R/JpNBoVCgl2nTNK8dxuKToSYnhYhCoVA0FAphbm4OyWSyZT8iZrlcRjabbZGehEgkwtToQXvzuq6jXC6jUqlAVdW2+0mSxCIQXh4eXdexsbHBh5/uCoJw8zBJ0aElJ9mYiqLg/fffRzKZbJGWjUYDuVwO3333HVRVdSSloigIh8N79uQHjWq1Ck3TUCgU2poBRFIvpkY2m+WPeaik6FCSc3Fx8e8A3FIUBRcuXHAswCgWi1hfX0cmk2khZb9CSweFcrmMfD7frkAE4XAYY2NjrknqJEXv3LnzN3296AFgqMh548aN93d2du4KgnAuHo/jww8/bCFYsVhELpdDOp1u8cwVRUEikRiqnPle0Gg0UCgUmPq3IxKJYGxszLWJwtuipmmu7uzsXB3mCqihIefCwsIlAPcEQYgmEgl89NFHlptO9qSqqhYpIEkSEonEoZWSbqHrOnK5nKN9Go/HEY/HXT2U+Xwem5ubAHaD9007dCjToENBTj6GOTU1hUuXLjH7kqRHOp1GuVzG5uYmU3WTk5NHnpR26LqOVCrV4u2Loojx8XFX96NcLmNjY4M3GW4vLS39bf+vdm84cHI2sz7LkiThww8/xKlTp9h71WoVGxsbWF1dZT9GOBzG6Oho31OChw1k3thJGgwGMTU11VWKHgZv/kDJef369Umfz7caCASiV65csTz1xWIRGxsbSKVSCIVCjiGkV9hV07lczuI4iaKIeDzetZK/0WggnU5bMkuCIMwPC0HFgzrx4uJiRBCEfwkEAkk7MTOZDP7rv/4LqVQKAHD69OmDusyhB4XJTNPEs2fPAACmaaJSqaBareLEiRPw+XyOn/X5fDh58iQMw8CzZ88gCMIbpmn+95///Of/srKykt/P7+GEAyPn+fPn/yEQCPySJ2aj0cD333+Pn376Cd9//z3q9Trefffdtjf3FXbh8/lYgqFaraLRaADYVd3FYhHHjh3DsWPH2n4+EolAkiSUSiUIgnDMNM2/npub+78PHz48UE/+QMi5sLDw60Ag8D/sxEylUqhUKkin09je3sbp06ePTFhoPxAIBPD6669DFEVsb28D2JWiW1tbkCTJMeQUDodhGAYrQtE0DaZpHhME4drc3Fx6ZWXlwKru952cN27ceF+SpHtOxKzVasjn88jn83jnnXdeeqenV1ABybNnz5gULZVKjmo+kUjgnXfegSRJEEURx44dw9bWFkzTBICrB0nQfSVnk5jLV65cOcbbmP/5n//J0ndPnz5FPB7H6Ojofl7akcPIyAhef/11AGABfF3Xsb29jddee40RtFQqQZIkxGIxxGIxnDx5Ejs7O1BV9cAJum/kbLbrrn744YfRt956i20nb5HCRsePH8c777yzX5d15EFFLtvb2zBNE41GA1tbW5BlGSMjIwDAvHXqSFUUBYZhQNM0igIcCEH3hZxNYi6fPXs2+cEHH7DtmUwGxWKRqXXTNIfOAapWqyiVStA0jfWY079qtQrTNGEYBvuhhxHHjh1DLBbD9vY2Go0GDMPA1tYWTpw4wa67UqmgXq8jGo1iZGQE0WgU9Xod29vbB0bQgcc5iZgzMzPn5ufn2XZN07CxsQEAePLkCUqlEqanpw/UzqRBB2RieGn5AHZtvVAohGg0OpT2sj2uKYoipqenLY6SoigsplwsFpFKpbC+vs7iqDs7O1f3q8J+4JLz/Pnz/xKLxf78o48+YilJXdfx5MkTmKaJfD6PP/7xj4jH48xG2i80Gg1sb2/jxx9/RCaTQTabxdbWFiqVCnMkvKBer+PZs2dQVRWFQgHPnz+HKIpDE3GguCaFjSg2ytugtVoNmqbhtddeY8XYoiiiWCySDfrL/YqDDpScCwsL/xgIBK5evnwZJ06cYNspN1ytVvH9998jHA7vm51ZrVbx008/4Q9/+AMymQy2trZct1J4gWmaqNVqUFUVmqZhZGSkY6xxP0GV/6TK7U5So9FAsVjEiRMnIMsyXn/9dTx//py8+GOmaf71Bx988Jtvv/12oJmkgan1hYWFfxQE4dqlS5cwMzPDtqfTaaiqikajgbW1NQDAmTNnBt4ioaqqq/YIAhUpBwIB1ubr5jzUROdUi+m1xG3Q0DQN6XSaxTmnp6dbCrrj8TgMw4CqqqhWq1hfXwewP6nOgZCTqowmJyfx8ccfs+1Odub4+PhAwkY0zoXzONuC7yfqZwtHsVhsqdD3Uj20H6hWq0ilUh0JyoP/DbE7v+m/Dera+k5OqjJSFAVXrlxhEpEkpWEYrOcnHA5bpOpeQTWP3QjJT5cLBAIDd154CUWIx+OYmJgY6Hndwk7Q9957r+P+fDPhIKvq+2pzXr9+fVIQhGVBEI796le/stiZ33//PWq1GhqNBp48eQKfz4fTp0/3ZY5RuVxGLpfD06dPUavVyHBnEEURJ06cwBtvvIGJiQmMjY0hGo0iFArti7NCoZxnz54xs+LZs2col8tDIUFHRkZw4sQJbG1tMV/g5MmTbfcPhUKo1+uo1WoQBOHcoEJMfSXnz372s2VBEJKzs7MWiahpGmupIJK++eabiEQiezpfuVxm7Rr2sE84HEY8Hsebb76JiYkJnDx5EqFQ6MCGevl8PsRiMVYBBMAVEfYLPEHJQez0+0SjUd6Gv/qzn/3sXr89+L6Rc3Fx8e8EQfhrSZJw+fJlSyU7Bdip1SIcDmNycrLnc1GtJz+5IxgM4uTJk3jzzTeRTCYRi8UQDoeHLjgeiUSY1AHA5jHt9UHtByiisL29jUql0rZYhBCNRrG1tUXmyi/n5uburqys6P26nr6Q88aNG+8D+A0AfPTRR7DnzXVdZ+rcMIyuRrcTGo0G/vjHP+KHH37ATz/9BMMwmHR8++23MTo6ikgkMjQxxU6IRqOoVqvQ9d3f8dmzZwiFQkMRaqLyOor3Hj9+vO099fl8kGUZxWIRAKKmab7x8OHDvgXo90xOypkLgnBMURRcvHiRvadpGvL5XUn/448/olQqIZFI4LXXXvN0jnK5jMePH6NWqyEej+ONN96wSMdhSne6BalQcpK2t7cRi8WG4rscO3YMkiRha2uLBeTbCZORkRG+FvTc+fPntYcPH/6/flzHnsl5/vz5fxAE4c+B3VExdqlpGAZ0XcfTp08xMjKCZDLp+geoVqv4j//4D2iaho8++gjz8/M4ffo04vE4Pa2HFjapA9M0YZrmUKh34IXT8+zZM1Sr1Y6OWygUYppAEIRf9sv+3NNj2gwbXQPQEhbKZrPMHsxkMjAMAxMTE57UuSjuPjuGYaBcLrPtoVAIiURiL5c+FAiFQlAUhb0uFApM1Q8DkskkwuEwKpUKMplM133p99rZ2bnbj/PvVYewyW9zc3NsI7XzArsquVQqsQJYLwgEAoyE2WzW8l48Hu/5oocJ9oes0wjHg8DU1BQkSUKhUICmaW338/v9mJ6eBgAIgnBucXHxf+313D2Ts+mdnwN2g9q81OR7y4lUva7pE4/HIYoiG9RF8Pv9CAaDvV7+0IDqJwmU2h0W+P1+TE1NQRRFpNPpjtdm02g3m4MyekZP5ORWrgAAnD17lr1H4wcBsByz1+FTPPx+P/vxqBuTwP+og4Qoiq5XbusFdi3QaercQSAUCrEcezqd7rjv2NgYf69ud9q3G3pyiObm5n4D4F1gV2ry5XCbm5sshkcpu7fffntPwe+RkREUi0WUy2XLg+Dz+QbqGCmKgomJCUxOTmJ0dJRllo4fPw6/38+GxO4VIyMj0DSNSaXnz58PXZsKdXaWSqWuYa9QKARVVSEIwhtzc3NYWVnpaaqdZ3I2Y5rsiTh37hzLEZNXDrxIKZ48eXLPKbqRkRG21Ek8HmceLW33QpBGo8FqLlVVRT6fZ3/z/wqFAra3t1l/DX8tVFA8OjqKUCiEP/3pT3se4/2nP/2JFYgYhgFFUYZuiZoTJ06gWCxC07SOYa9AIMAyYaZpnuu1vM4zOc+fP/8bQRCS9Hp+fp4FaZ2k5qlTp/oSu6vVaqjVavD5fJbpHxTu6IZisYhsNounT5+ySqFarcYWKrD/o6r4p0+f4vHjxy0kJVDe3N4z7hXkdBBocYNhgs/ng9/vx9bWFp4/f94x7Xr8+HEqUD4mCMK5hw8feh4W5omczdDRLXqtKArOnTsHYFci/fDDDwBeSM3XX3/dc8C9HahzsFqt4t1332VShfqynWDPKvUapqnX64yk7exn6hnnc+de4Pf7W7TAMOTc7aCYZqlU6rhEIxG5GZxPfvDBB6sPHz587OVcXkXaLf4FhQ4AqxGfz+chimJfY5FECGojIITDYcf9NU3D2toaNjc3+7ZyRqVSwf379/FP//RPLaEtAtmovYB3utqNDh8GTExMQBTFrrFPyuABgM/nu910pF3DtVHTLIebp9fUHEUgcuq6ztKU/bSZqLWgXq+jUCgwh8Hv9yMSiVjWiKRqezv4FStoPaB2oAWzqGCZJ3gul8P9+/eRSCRw+fLlFulB6p/sby/fkbc7hxWBQADxeBy5XA7FYrGjTzE2NkZRliR21yX9n27P41qt//znP78F4M/p9enTp9m4wmq1yoLHZHc6zXDfK8i+NAzDElfd2dlh5Hzy5EmLmg+Hw0gkEnjrrbcQi8UQCoW6Viv5fD4EAgFEIhHm+Ph8PouHXqlUsLm5iampqZbvSqu30VgYN7CbKNSmO4yQZRmqqqJUKnV1jrgil/lz587ddesceVHrV/kXU1NT7G8y5Gm1W68rP7gFqXZ7mi8Wi7EgMS9BaVblzMwMYrHYnh6WaDSKZDKJs2fP4he/+AUuXLgAURShqiq++uorx8+Mjo62NTucYE8qVKvVnq93P5BMJmEYhsWRcwJf8S+KouvYpytyXr9+fRLc+uW0qgOBbEAy6AeV945GoxBFEYZhYG1tzUJQGslNGB8fx3vvvdfTOj7dYBgG6vU6M2toRr0TvMwVpWY6wjCsMtcJsiwjEokgl8t1dDZtWbCrbjNHrsgpiuI1/jW/Km+xWGRqrlAosL6cQYEkUTabxdraGh4/fox//ud/ZnPORVHE1NTUvgSxQ6EQ0yDLy8uW9CqB7DO34KXnsEtO4IVU7FYTYBNYt9wcuys5m/WaN+k12W8EkppUsj9oUpAkJCKkUilGzGAwiDNnzgxEWna6Hqpub6fevZCTf7CH2SkikFTkM1yd9gMAQRDm3UhPN5LzpiAI7NdWFIWpHvLMgV2VLknSwIlBx69UKpaFWBVFwfT09IFUwlO5mKqqePy4NZRnL+7ohMMSTuKRSCRc2Z5epWdHctqlJmVJSKWTjddoNKCq6r4UYlDoCNhVJaIoYnJyciDRAS/XRNJxZWXFcR+392bYskJuQA9foVDoKj3pt3MjPbtJTovUtDs6RE5S7ftVJUTSk4YADEN7LZGzUqk4Sk9Zll1VNvEOEYChKp/rBKpa6lTzCcBu9t3qtG9bcjY9dPZhURQtKpsf7VIoFPa1uYzK8OwT0g4SfGkfjdmxoxeTx+uku4NCKBRCOBzu6hjRMAugu/RsS05RFG/yr+1rgPMZoVqttm9OSLlcRjAYPFA13g50D2guU7v3O+EwF1CPjY2xXvxOsEnPa+32a0tO0zQtH+I9TqrXA3ZVul2qDhKyLA9drSOBJ5ZT7t1NwfWwPXBeQFKxm2MUjUaZiSMIwrWmlm6BIzmb65wzttmb63m7QlXVFqn6soIPordTb4OsqB8GJJNJV60mvH9ij6MTHMkpCIIlVdmujWC/VfphAElPJ7UOHH1y8nHPTrA5z9ec9mmn1s/xL9qRb79V+mFCO3Iehokke0UikehKzkAgwNcdJD/99NO/sO/TTnIycgaDwbY3tFwuvyJmG7QLoB91yQm8eAC9qHa7tgYcyNnsEWLoRL5SqfSKnAPGYfXeY7FYV+nJc4eGc/BoIefOzk5LCMkJdOJX5HRGOwnZrdLIXt1zWB3NaDTaNUbLZ/uAXUecf99CzuZKvtfodadZ6BRvfAVntMuWdetjGvYyuX7DJj0tqt0uOS1vdiqUrVar+5aufFnhpVB5GKEoSlvHkGDTvO3JaQ+8dwoaVyqVoVwI6qBBZW7txu90qzQ6DDWcbkGdmp3Aq3ZBEKK8amfkbKr0ef6D7chXLpddL3/ysoHsLKduADfE42s4X5aHn/+ePp9vnv3N7WMRqZ1GLler1UOvcgYBsiclSXKUnN1UHGAl8FF4+N0UTLdT7YycpmnO83tQ1Y+TXVkul4/Ejes3yJnhW6Z5uBnQxTtERyEmGgqFuj6UgUCA/65JyrW3lZxjY2OQZRnJZBKzs7NsRTMaJnrmzJlXDpEN9CM4rS9EffDdQPscFbNJFEVXGoNX7ZQE8gO7gXfTNC2ylbeZAoEA6yIsl8tsSnEgEEA0Gm1ZAOplBf0ITj1D3QLS/OeBwxt8tyMYDLJ1ATohHA4zzdK0O3/rAwDTNM/Zd24nFcvlsqUvPRqNYnZ2dmhmmR8UaPBXu559r+Q8KskNv9/vKnbLS07iI6l1Czk7tffmcrkWT9Tv9+PUqVNsRPPLCAoRtevZd9OsxjtDR8lTt7eeOIG3Oylq5Cg5O9mSxWKxbQwvGo3i7NmzmJycfOlISpLRyd7UdR3xeByJRKJjlIM6WY+KvUnoxe68fv36JCVuLeTs1DDmpssyFoshFouxC9J1HfV6HYZhoFqtshmYRwXUfSpJkuO9CQQCLQ90sVhEoVBgDhCv9o+KSieEQiHout5VG/B2ts/nS/qb0+Msd6MT+er1umuVQ/u1279arbJlXA4zccmQj8fjriVeLBZDNBpFLpdrWaniqJFTFEVXvyl/7wRBmPf7fL6kfad2KjmbzfY1fEQX40Renrj1et3S7TlM0HWd9czww83cwO/3Y2JiAtFoFKurqwCwL4Mp9ht8z1knyLLMZmEBu6GkFk+9nU1Jnvp+wIm41BZSLBYt0+QGjaD4A2rG247v5XI51Ot11hHaC/iJxkeNmMDuA+d2qnQwGESlUoFpmvN+u0rvhEqlcqBtBoFAgMVWyc6jhQwGCcn3oyM5+WVt9jIKhx/CcFQW/+IRjXbuxuQhyzKLbPhgk5ydJGM2mx2aZf38fj9GR0fx3nvvYXp6eqBx1vKfWpQLgBe2piRJbDa+52OXy2wC8qAn9B0UMhnD9dwnLpyU9JumGRUEoeXNwwRZliHLMsrlMjKZTN8l6Q5aszX8EorJZLJnUj169Ij9Paz9+HuFl3lk3H1MeuoBUFW152UC9wOyLGN6epp5wG7QTRNQBMFO+EKhwOzEXm1NXdfZqnRH0REieFnFhA8n+e01nN3CSMMO3gNOp9Mt1yxJEmRZRjQaRTgcdt2jUy6XLYFk3rvulZxra2vs+obFXBoEvNRd8L9Hyy/TST0dJpUvyzLOnDmDXC6HarWKaDQKWZZ7zryQ6QDsOjB0w/nlDr1A13Wm0sPhMP7sz/4M2Wz20Azu8gL6TuVy2VNa1pNaP2wlciRF+w2awSlJEmZnZ3s6Bi815+bmEI1GEY1Gkc/nkcvlXuoqLyrLdE3OQS6AepiwsrLCPM9ew0flcpkRPJFIWJatGR0dRTQahaZp+xImGzT20hPlmpyHwd4cNMrlssW77lWlf/311+zvubm5lvcDgQBGR0cxOjqKcrkMTdNQLpf7RtREIsHWSeoGcgh7Pf9eNMDh7Ng/IHz99dcWVdxLWRstDgvskqRb9IO3dXVdZyTpJJFof766KRgM9jSggf+OVLOaz+ddxy17XW8UeEVO10in04xU09PTjhKvG3Rdx/LyMnvt9RiUITso+P1+ZhtTnJcPqTnjxShIL9X9pmlqLeTUNA26rrfchLGxsbbD+I86dF1nqliSJFy4cKGn4/D26uTk5L7GjO2hMPv8UDdSnIff72d9Ztlstq0krVRkACr7jAestuxdrVaxvr6OeDyOeDzODnhYBucPAmtra+zm95oNKhaLllnxFy9e7Nv1dUM6ncby8nJXv4FittPT066JKssyZmZmUCwWsbm52SJF3RQZt4MjlQ3DQC6Xg6qqSCQSCAQCrpqUjiKKxaJFY/SizgHgwYMH7O/Z2dl9bcN49OiRK4e2Xq8jlUohlUphdnbW0wMUi8UgyzI2NjaY40RF5oC3GHmlUoEgCK1qXZJUAGPsYvllmd14d0cJuq5bVmVLJBI9kWplZcVSJNKO4MViEQ8ePICqqgiHw7h48WLP2SceiqJY1HgikUAymWRxa1qamsr/gF1tkcvlcOXKFdeaIhAIYHp6GqlUCrVazSI1e0jgtKr1er19oP0o9bW4wfLyssWWajcsoRPskvfs2bOWH5siAPPz86wEENiVHl999RWuXLniqGK//PLLlgLeyclJnD17tmX/6elpZlIsLi62HIv213Ud6XQa33zzDer1OlRVxf379z0R1O/3M4Ly987t58l8NE1Ta5nP2clGaLeEyVHEo0ePLFojHA5bguVuwavzcDjcIjXX1taQSqVQLBYxMzODTz75xJJ1Wl5edgzHOFWWP3361BKHJfDE4Pu67Ct+BAIBzMzM4K/+6q+YVFVV1bMj7Pf7MTU1ZeEKDeXoBi6WuuozTXPV7UmDwSBSqRQeP358pDNGuq63/CC92Jq8Ogc6O0FEoEAggLm5OaYGSYI6QZIkXL58GZcvX2bbnEjrtO3+/fu4f/++I/llWcalS5fYNaytrTkuXdMJ9l4wyoS5rb0VBGHVB8DS7d8pZkVzbyqVCntKj6IkJbVG6EVq2tU52XntwNuygUAAV65cYeTI5XKWrBKBvGvefqxUKi1k48lJoR/alkqlcP/+/ZbPxGIxS8iMSvvcwk5mvtnx1KlTmJ2dxfj4OCKRiMUeLZfLME1TW1paKvkEQbCQs1OKyu4MkHf35MmTI0PSbDbb8kP0IjV5dQ6gbWy0naqLxWIWgtLa8gRJklCpVJgG44/TrZnMXsCjqiq++eablv1mZmZYKV8qlfKU7bHHUe3coRTtqVOncPbsWZw5c4YfHLcK7LZptKj1Thfh9F6pVEIqlcLq6qqrsSvDDPuP1IvUtKvz2dnZtrMAZFluW+0Vi8UsKvubb75hZCTS0Hn447cTFPSZQCDA/lYUBZIkMXPNDv7B9CI9ecnpJnQWCoUgyzJUVYUgCMvALjnT9h07xcQ6eV2GYWBjYwPfffcd8vk8y0qUy2Wk02msrq5iZWWFvb+XvOsg8OjRoxap4zVYblfnnUJH/D7tMDY2hkuXdtcurdfruH//vmXqCkmoXtdpTyaTTEI7OT5jY2NMKqfTaVfHJNOP4KVAJpfLYWdnZ1dymqbZcsa9jn6u1WrY3NxkAd1UKmVpf+Xf92poDwpOTlA3O9EJTup8r/nwmZmZFoKSAKH7x0vfdg+900MwOTnJ7MtKpeJIQD4e6gb8MRRFcR0bpu/i8/mWgd02jRa13kly9jMQX6/XLZmog1w33e4EAd5tTbs6t9dqusXS0hKA3R/20qVLiMVimJmZgaqqrEiZHiQnKdnO5uTvL43PoW1EoGw22/JAxmIxFlYrFotdfyde/XtpP0mn0zBNc/XOnTslAPAtLS2VYFPtnSSnlwZ5t6BM1KNHjw5kYL+TEzQ7O+upEMKuzoH2TlAn8PYiBcHpfl+8eNHRPs1ms56vtV6vOx6rmzPVLQ1aLBYtx/Cq0sneBF7k1lcBJGljJ5vF7/cPrIWgXq9jfX3dc4VMO1CRbqcZTJWQheYAABNGSURBVI1Gw1KQAbizE+2wq/NOTlAn2J0ZkpJk+16+fBlffvml5bt4jZTQg+j2HnsxvfiH3ItKL5fLUFUVOzs7y7SNMkQtqv0gQ0O5XA7fffddT1KUUnCPHj3CxsYGCoUCKpVK2yd+Y2Oj5WHzaifa1blTJsgrFEVhmaK1tTVmx8myjPn5ecu+dO5uGRh6n2zHyckXy5zzuX87+O/WrY+Mtze99Fc1Vbr2+eef/5a20XzOZfvO1WoViUQC77///oEUfNRqNayvr7t+aikdt7a2BlVVXVXhOFV0e7UTndT5/Px8z04QT5KLFy8yR4jP5CSTSbYdeKFqu0kpGjxBhSUk2fmeJqdRjXxlUafvlU6n2f302jKdSqUsKh1oqnUnp4jaOKn6mX96AoGAY0HyIEADEhKJBBRFaSlYJdXNRwPcoFqtYnNzs2X7XtX51NSUp8qler1ukVb2h2pmZgaVSgUrKytYXl7Gxx9/zLYrioJ6ve5aPSuKwtQuLwGp+ESSpJbiFj7u28254aWml+Y/zk69x2/3A8DS0lJpYWFhlV/KulKpMILG43FXI+wGBcMwsLm56UimXtBoNLCxsdGy/S//8i8hyzIajYarqu2vv/7acl8kSUI4HLZM8QgGgxgdHW1LWFVVu1Y7zc3NsTaR5eVlptbtNq0sy47hnmw2y+Yw0bWRLVssFpknbq+YKpfLluN10ihkThG8OEKpVAqmaWqCILSSEwCJVEZOKjgeGxtDKBRivcT8+4cVm5ubjmGjWCyGdDrN1J4oiohGo5YfjBrF0ul0iyM1NTVlITU5YaVSCZFIBKdOnXK8Hp647aQTOUJELrvdyR/H/iDwwwzoYcrlci01nnatwefzw+FwRzWdSqUs6zC51R7cSJ57zcgRA7uTpmneEwTBspw1X/2uKIqFnKIoupYww4R8Pt+iBRRFYT8MOYL0XZ3mgDp5+NRu2w6lUgmZTMYy5IHsaTelZLIs4/Lly7h//z5SqVRH29hOjG7rlE5OTraQnW/oA7pnyvhSPS+mETcy6K79PVbPeefOnQemaVoS46qqMo85FotZbKNAIHDoGv6d7ExJkphzQSGnbrCvuxQMBl3ZfYVCwTEKwhOn03H4VOaDBw9acuFEcr6ckR4AOi8fe00kErh06RI+/vhji3YoFouWLtHJycmOUpNvcPMiNQE2PSV9586dB/b37GLvHoBr9KJWq0FVVSYR7OX+h0m1NxoNx8KFCxcuMNvNzWQ6+1RlURQ9jdve2NjA9PS0Zdk9Lz8mScsHDx4wZ4y22fPtwAs1Tj7E2bNnO9qD2WwWX331lcVDdzIhePD31YvU5Eh91+l9SyW83ZUHYHEc4vG4JawUDocPTamc0ypzs7Oz7IetVqtdnT5d11skLzUAuoVhGEilUtA0jUkbr87mzMwMk4DffPMNCzHRCMh6vW7ZRlheXmZOkB3FYhH/+q//asnbA+jaolEulxk5e5SaAHDb6f0Wydn0mtigyEwmw8JGfr8f4+PjzBY5LPZmNpttsR0VRbHYUW4qbuwED4fDPQ18peotIslXX33VUpqXy+U6huumpqZYkuHLL79k5WZErEwmY6koomPmcjnXbReU1+8EXmp6CbpTQ51pmncpl26HJbq+srKiz83NvcuHlBqNBhRFwcmTJwHs1t1pmsYaker1OkRRhM/X0o40FKB+ah6KouDKlSvs4Uqn09je3u54nHw+b5E4oiji3Xff3dP3FkURwWAQhrE7ltruQYdCIUb+arWKUqmEbDaLP/zhD8jn8zh+/DiKxSJ0XUelUrE8OM+fP4eu6yiVSigUCjBN0/V1KYqCX/3qV3jrrbc67qfrOv7t3/4NhmEgkUjggw8+cH2O3/3ud5SuvPrtt986krNF9DW99mv8tvX1dUsYZGJigj0xsiy7qlQ5CPDz1gmSJFlUVSaT6apWq9VqS/wwmUzuWXPQeJlYLMaWjOEHZjlVSvHw+/1IJBLQNM1SOxAMBi0LH0xPTyOTyXSt8wyHw11tUh78GEcvRS5kCpimufzFF188bbdfy939/PPPf7u4uJgGVwhSKBSQz+fZUyzLMiKRCFOVfr9/6MJK1Wq1JdBuJybFNLvBrs4VRen7iOxAIMDCTDSwy03kgKbRdUIoFMLMzAzy+TwKhYLluBTLTSQSiMfjrueZ8sNvp6enPQknzqy41Wm/dmy6y3/QMAysr69bbsLExARTJeFwGLlcbiCDWntBo9FoIRQRMxaLsffdrGVknzYsSRLGx8cHct2EQQ3s6kbkUqmEUqmEcDjMHsB2Aocfae7FQ+elplP4iIejwWQYxl37tkwmY7G5+D4Uv98PURSHpu2CH4kCWIlZrVaRSqVcEdOuzilsNEwaYhCg7tq1tTU8efIExWKxJSpD0m8PHvqtbvs63uUvvvji6cLCwl3e9qzVakilUhbxPTo6ykIiiqIgk8m0TdHtF548eWKxrcLhMC5fvswWinUqkXMCSVeCKIosPjkoNBoNNnuTllbkwS/77AadBsS6mddpGAaTpjz4oLvXuCalKrtJTaDDfE6fz3fbNM1r/LZ0Ot1iXySTSayvrzNV5HUofT+RyWQsN5K88kAgYClwcINcLsekryRJmJqa6hsxKRNF/5O33Q1eGte6QVGUnuYw8esvTU9PIxgMWsrqAGstcK1WY8KAMlqGYVjS5O3QlpyfffbZ7xcWFpb5pWAqlQo2NjYs5AwEAojH48jlckgkEtjY2Oipb2avyGazlgzP9PQ0Kxp26/gQ+MVWg8Eg3nvvPc/X4yQFh2lF5F5HWtKYQ1EUoSgKfv/737v6HNeRebuTh86jm/F0C8Cy/eKmpqYsBB0bG4OmaajVamyixH4ORqWALuHChQs4e/YsGo0GvvvuO881AHSsYDCIiYkJ1uphNwdoGW47+inhvCAcDjOtxTev0WsK2gPeUqYEqpsFdrOFXh40qnQXBOGW2890JOedO3ce2KWnqqrY2Nho8eRIvY+NjeHRo0eIRqMDn0pHThipa75bkUJJvUgqVVURDAbZsIGDQCei8WV1iqK49uyDwSD+/d//HUBvqxOTDS5JkusFZEWxinyeha9u2cviOsGN23kLNum5sbGBsbExS+goFAohkUggl8shmUwy+3SQnq0oikytzM3NMeO83ZRdt5icnITf73csSHZ7Xfb55/ziAQSedCSlnfbrF/jjeg1V8XallwSEJH2Dp0+j1PL7917O2fUMTtKTbE9FUSxfmNT77kVJA419koPDS0tgN82414p58uzthb9OxOkXmSga4gR7vafdC7e/btfr02s3A1/w4qWjEgB+97s4gDp8Pt81r+d1RX+fz3fTPioxnU47FrySep+YmMD6+jqCwWDfU5vVahWFQgGXLl2ynF/TtL61cvBLrBw07DZsrzZtr2MraUU5URQ9JSCy2SxJ29ufffaZO8+Jg6uqheaBLWVN9Xod6XS6ZVY8qXfy4jc3N/sanE+n04z8PDHtcclXaEUv9jetJAd4U+dcAiMNFwF3J3gpqbllr5SnpjMin2nsPtHxeBySJGFsbIwNnO3XahwUhLZPs/Paffkyw20gn3/gI5GIayeKbyAUBOGqFyeIh2tyNk9wi99mGAYymQz7AoIYhvH8e/j9fhbgnZqaYvWL/QCp2kKhYJHIh3304n7CLTl5de4lYE95d9M0b/aizgmeihHv3Lnz9/YBDIVCAblcjvWqiMfeAQDWUkwD7NtNMPMK3g7kjzcswe1hBsVk3QzJKBaLLCaaSCRcq/N8Pk9ZuntevXM7PFfK7uzsXLNvS6fTbF1zHolEAsFgEKFQCOPj41BVtS8jD+1jVYBX5HQDMnu6hZF479xLtT/XQJgG14vWKzzPmfn2229LzXjiPG2jL22aJhRFYdXhPp8Px48fx9bWFkKhEOr1OgqFAiRJ2lP4pV6vs9nnVBjLV+e/gjOojUMQhLYRlEajgSdPnrAOh9OnT7uSmtRA2Gg0NJ/P98ulpSX3hQxt0GuPwW3YxibmcjlomtaiuklqAsD4+DiCwSCePn26p9U4SLVTRyHQ0yJMLx3cBN43NzdZundqasp1sJ6ycYIg7MnO5NETOZeWlkr2iiVg9wKdVHcsFrPYn0TQXm1QWZaZ3UTnGpaY5DCjm63Jr7LhZbU6GuBlmubdpaWl/73nC22i59zinTt3HiwuLt4GwMqfaFKx3+9vyQdPTEzAMAw2G4hGcQPoqXSLhovlcjnMzMwgGo32LQC/36AKJh5OhSbt2rANw/BU3OIUcuOLZyKRiOvCHerBMk1z1T4xZq8Q9nqAhYWF/8OnNoEXc8bPnDnTYls+fvwYlUqF2Si1Wq2n2kK+X/qTTz5BIBDoqQJpUKBFSfnKJafBsPvlyAWDQYvkVBSFCQ++1jUYDLquiaDPmaap+Xy++X6pc8KeqzIEQbhqmmaa73Xf3NyELMtIpVIt1eNTU1OMlHuRoLIsQ5IklqnarxpSIh2/Ii7/etBkkySJ2ddOlfG8KnZT7c6P6KF4phdiAuirncljz5ITAD799NO/8Pl8lvF1VKRLfTf8TWs0Gtjc3ISqqhYJGolEMDEx4doIz2QyKBQKrOLdPlzLK0i97jfx+ComKiThizm6DW3tFdRPRWreSdM5wdZVcHtpaelv+35x6BM5AWBhYeHXgiBY8u+8up6ammpJf1GFOqW7KpWKp14dXdcZIWdnZ139gERAqk4n225Q5gDFZEnS0zUOsjTODXhiernnPDGbduZ8r+nJbugbOQFn+3N8fJwFcePxeEu2gf+yJAmp+sVNNRPZmXa7lRbnIptvUAQkNUuSjv53o1IPCnZiup3GbCOmtrOzc85ty0Uv6Cs5FxcXI6ZpLvPjbIAXDhKwq+6TyaTlKeWr1vkb4GZVDX5/+4DbfoCIRsQj6TcoVTtoUCx6LxITAARBODcIO5NHX8kJANevX58URXEZ3MQQoLW/2S5F+UEH/JMdDocxMTHR9gY2Gg3XTVbtwKteXvodpNodBEgzAd46Sh06V6/1M57ZDn0nJwDcuHHj/Z2dnWXeg3d6SvlRKCSFnjx5glKpZCEreZHtSra6dVfyko///2UK3PP3yEu4iCc0AJimeXOvBR1uMRByAu4JSqB6QQrkE/hBCJFIpGOog/eygcF5uYcJuq5bJqB4WYDM/tA3xxX+zUAu1AEDIyewS1B7e4eXp5Zgl6JunaWXHXyjnyRJmJiYcFUwzIf3CPtNTGDA5ASAhYWFSwDu8RLUySlyA1oau16v93yMlwF8HBnYDemNj4+7Egj22CdwMMQE9oGcgDNB9zJ7iPLA9Xq9q6p/2aBpGjKZDHuAJyYmXNvWTiN7DoqYwD6RE2hvg3pd8YwHjaAxDMMxhvoygRapqlQqkCTJ0xLhHUZC7otX3g77Rk6gfZiJD9R7RaPRgKqqbCgqLUP4MjlC9JDS/CIqT3QD3lSy4UCJCewzOYH2gfpOK5y5Ba2hSCMZ4/H4kbZJybwJBoOIRqOencRsNuu4HCGGgJjAAZCTsLCw8I/22fPBYNBT9XU70NAFTdMQDocRjUY7TukddlAqlmK0NDKRSOn1fpXLZWQymZZ0brP1+6qb2Zn7gQMjJwAsLi5+AtsCSd0C7l6haRqKxSIqlQqi0ajncSoHhXZ2YLeMWbdj0irMdpimuerz+a4NOiXpBQdKToDFQu/BZod6CX+4QaPRgKZpbOWJUCjEJOqwIZ/Ps55xQjgcxtjYWM8PFh/hsGPQ1UW94sDJCezaodiVoFf57f2WojxonXZSlzQb6aCqiUiq8ZNLSG17cXDsKJfLljHZdpimeVcQhJvDRkxgSMhJcIqHArtS1Osyfl6g6zqbQsxLFuq5H2SxLz0gpL6JkHudb6rressYch6maWqmaV77/PPPf9vzSQaMoSInwLz523ZnSRRFxOPxPUmRXkDk4RvOvC4c4HTMWq0GURRZLagsywiHw3v+bjSzvY0XDmA47UsnDB05CU0petsechqG3LpT85pbDKoiilKWmqZ1HGhmmuZNQRDuDqMat2NoyUlYWFj4NYBbdlXvNQtyVFGtVqFpGsuUdUBaEISrwy4teQw9OQHmMN0yTfOanaSk7l+2rFAn79uOwyQteRwKchKa6c+b7Uh6mOKYvcCeqnWBe4Ig3DpM0pLHoSInoZMkBXZVPhH1KKQvi8UiWynPzYDcZg3tzWHJ9PSKQ0lOHs0s0y3YgvgEkqjRaPTQtGY0Gg1UKhXLyGs3aAbTbw9DXrwfOPTkJDQHO1wzTXPeSZryiEQikGW5p7z0IEC99BS24pfkc4OjRkrCkSEnoanyrzZV/ny3/fm+c5KugzYFaD11Cvx7JSPBNM27AO4edvXdDkeOnDyaDtQ8dtOiV7vsboF9WEIv5oB9iFc/Bjs0l+i7bRjG3UEONBgGHGly8lhcXIzs7OzMC4JwtSlRkwd8Sa7RLGW7Z5rmvWFON/YbLw057eCkatI0zeSwEbZpRy7v7Owsv0yE5PHSktMJ169fn/T5fFcFQZh341j1E83ugFUAq4ZhLB91le0Gr8jZBc3GvCg5V6ZpzgOI2nP+LpFuzjJdBaDt7OysiqKYPqxB8kHj/wNu9Z1lKYRyAQAAAABJRU5ErkJggg==")};
__resources__["/resources/Score_Card/Window_MedalGained/Window_MedalGained_Bronze.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAAARCAYAAAASYy0RAAACKUlEQVR4nO3cT27TQBQG8O97Tvc9gm/QpGLBrjkCh2gVbgHHaLLiKGFPW1eAhAQL5wZmC8o8FkRtSDx2/tpu+H7b57GfZsZPo7E8xILfjd/B8R6HUQCelYdYgCiPuRcwi7SznJfXswPlJwfk95Or7Rr48DiZvADBMyRWtJ0GACB4xlejn22ncYr8/vYCsPP4BXu8A0w+8PJ61tv5BtXOAQ6jUceb8gCB4JFGc/inceyGOYA8EsxBlsccOSwSa2FiVw548BREutuN0Qc8PpHWsA9g8+ujYyZrWDXHmxd/p2QvAQCONM4MUwBHK94NYwpUFLaqPqx4kRqf2HUDvtdc4D6NRaRjrO0ERERke08r7+8/ZgHE7zaTERGRGk4Hlor3w5evc4C/2stIRETqBPhK8f787bWKt4hItzF4AJaKd2I0UnvgIiJd5nQCS8X7LCGpD5giIp3miyr9VLx7iRlJFW8RkQ6bO1dW3mbb/SUnIiKNO1v87/G8550waSsZERHZVLKy8u6ZtkxERDrObQ7gnz1v7XeLiHQd0XteeU9uBldOrbxPnnvhYOTUxuaQGLadg7wc7pjWXUN6BqDmtEbm9JAfJCkATksBT0tjjnRx5tJ6FvA+yC0OiltpzwBgaeX994nIPNIBpE93fdjmDtu5dao6v2nuLAxhq8LqtGw0ufvvjvSc3Az0cf0EBEPxdvzw2HYee/h4jJvejgYXFuKnejpjx2aLiEjn/QFJoKVdiZAj7AAAAABJRU5ErkJggg==")};
__resources__["/resources/Score_Card/Window_MedalGained/Window_MedalGained_Gold.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAAARCAYAAAASYy0RAAACMklEQVR4nO3cT26bQBQG8O8bIOs4J+AGqaMsuouPUClSr9MepRdIzuAeoIRcICK7RCiKu21hXhdEEZYBx3/B7vfbWPID5mkGP4/4M8SbPL/5BuA7tmMGWNoeY2PMzGaka4yFoWWj0fXjlvKTLcrz26vV9rDJThI5ACRTM8z6zgMAgqBIz86+/u47j2P0+np7XhQ4bd9i/d9AGOLHaHT9GK57gCVOAU464l+aviQJwBp3KAogz28aY2bISMuaY8xINMZIy8xcY6yPE7trwEkfmzFe78j2Ceg6kRZaW3H75jGTRWbD6auyDFp/U7KZotjdOBcFpwB2Vrz3ikQMMG6JtTJr/7Po48TuGvAq13Vtsq+IDJHrOwEREVnd+8z75eXBk/jbZzIiItKNpAG14v30dFeS/NNfSiIisoxZOV+8n5/vPwNQ8RYRGTYP1Ip3GJoDnK6Bi4gMWFlWTy+8F+8ocjTTDUwRkSE7Oak+68XbQU+fiIgMWllifuYdhlzxLTkREdm3KKreB6nNvBH0lo2IiHzIwjXvINDNShGRoYuiqlTXZ94q3iIiA+d97Zp3koyvvNfM+/hZ64qOezbpOwE5KNNlG5hZ6lz3ao1mzJzz2baS8t7FpMXNbbWvt1QtFMcVFn6b55wHUJt5vzWYks0dQNp03cY+atudu0xX5++bGWfO+ZUKq/cuvbz89d8t6ZkkY91cPw6zi4u7+76T2MDPXRw0Scbn6FjV0/vmZbNFROQA/ANbJbu9A3smkAAAAABJRU5ErkJggg==")};
__resources__["/resources/Score_Card/Window_MedalGained/Window_MedalGained_Needle.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/Score_Card/Window_MedalGained/Window_MedalGained_None.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAAARCAYAAAASYy0RAAABqElEQVR4nO3czW6rMBiE4ekxwgIRKdvk/u8s66yQsGzFahf9kU5knEAhxOn7LOsUPlGYulSaN0nvknQ4HHQ8HrWEy+Ui51xyLcaoYRgmr4UQFEJYZD4sq+u6SZ/f7XYrTfL8hmFQjHHrMSRJzrmnmeXVNE0jY8zo+m+egfP5rBCCqtlHyKiqKjvcfr9f9Hze+9Fgz62FEOS9T65tcWPnfuDWWtV1Peu4bdtmb6TUHFW1yq0B4Jf6vl8vvB/NWitrbXLtL+/yALyuf1sPAACYjvAGgAIR3gBQoJ/w5t0wAJSDnTcAFIjwBoACEd4AUCDeeQNAgdh5A0CBCG8AKBDhDQAFqqTprXBbm9vM9ujCpetSrLG527ZV13Wrz5Zre3wk/r+CKfq+v/mZezIhV0Q3R64srq7r0b6lpXKokj6rWK8v0K0LlqpvfYWKSWOMmqaZ9b0xxtnhOOe8r3C957jebBhj1Lbtf19LPTxbtCXeEzz3ylUmP8Pxxoy1Wj7q/Gvx3st7v/hzeKtO9jtj3vTV5w0AqeBI7TBTvzAl/qqaYu4bhNPpJOecPgAuhcJR5pCaNgAAAABJRU5ErkJggg==")};
__resources__["/resources/Score_Card/Window_MedalGained/Window_MedalGained_Silver.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAAARCAYAAAASYy0RAAAB+UlEQVR4nO3cQW7qMBAG4H9slHWPwA1eFbHorhyhx2HFe/JJepR2D1G6RkhU4gB02yc8XYAqoHHSBIID/J+U1STWYJPBSsQItqbT6V9V/YfTWAHIQzERKYyp6soYE7pukabp+0myo5PKsuyxzvmqOmwplc7z3ufW2lXsPIBNLoPB4CN2Htcoy7I/AO5C8WPuARF5TtP0vdd0gAp3AIahoKo+hWLe++Cgk8kkFFpsj8KYiBTGVHVhjCmMxfhily24974vIv0m46rqfWjcgFrnl60Z7RORTs1XyT1FR2hzjUXkBUBrxfvc+tujkKoGL2z4Y9GKqgUv+xxEdFtM7ASIiKi+7533crn0AP5HzIWIiKopsFO8Z7PZWkQ+4+VDRERV1uv1fvGez+cPAFi8iYg6TFU9sFO8rbUGfAZORNRp3nsBdoq3MUZEhMWbiKjDrLUADnbeLN5ERN2mqvs7b2ttrX/JERHR+YkIgJ3i3ev1bLRsiIjoV4p23nxkQkR0IVi8iYguyN7O2zn36L1n8b5+Zd0ez2kYOwG6KC+/OCcXkapujcEmdU2oah+BnkplMdRs/HbImE2pPmxMlWNzg/+w7WTVtpNObpWKCT63YKvckCRJ8tFodHMtPZ1zfLl+HVbj8fgtdhJHeG1jUOdcaTvZJEm6sAEjIqImvgCbKa3ylIIhmgAAAABJRU5ErkJggg==")};
__resources__["/resources/Score_Card/Window_Postgame.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/status-correct-gray.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCFhUMBBevx1kAAADKSURBVDjL1ZXBDcIwDEVfMgEjgL0AbNBOBEzQESgT0RGyQEJH6AbhQFSpbSQozYV/jOWnyN/5MWTkvd8DZ6ACjrOyAzrgrqr9vNdkYDfgwndqVfWaBXrvd8Ajc6NPckCtqsMI3ABbQG06aDbASL0NgEkGPCmjg01ultLZptUopcpunN1ilpbC+g+gK8hzNj30UurKL7aI9EBbANaKSG9ijIQQNoeDiJxGl0VkAOofDXKp952HMcZJNYSwKmBFZBqwc6AxZtUXMO9/AUnXSeW0Wez2AAAAAElFTkSuQmCC")};
__resources__["/resources/status-correct-green.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCFhULLG1b+WQAAACsSURBVDjL1ZXBDcIwDEVfPQEjwAawQTuNj4UJOgLh2GnoCN6AjsAIHGKpUhsJ1LoH/jGRnyx/56eipJ4j0AI1cJ7dGjAAD5RxXloVYHfgym9KKLcysOcAPAsdfZMBDcp7Aq6HLaDiB90GGF7b5Q6zAS9idBJ3M0qt+GpEqZaNs1vMUgjWfwAtkGfiDz1Kww6LnSMoBcASyhgXDsplcjlHT7PSIPPavQM26Av4AOZWK/W+f48XAAAAAElFTkSuQmCC")};
__resources__["/resources/status-incorrect-gray.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCFhUJAoO7likAAADVSURBVDjLtZXbDcIwDEVPog7QHbxYOwFs0GYC2gnoYp6BbgAfGBQBTV0p3K8oj6PEvnaCqrbAAJx5agVmERkpSFVH4AS0NjUBKajqJYPlWkSk34Bdge7H0hRU9V64yBe0AAMgUlZnABcMoLGYtTvQ93jnAmsEZvbVOWAAc/A+xaFFRPpwJD6e5IUjGfQ4IRzwmMtWkcr635OrJqWqbaxrDJVCmIKq3nZKD2Dxll7jgb3iYzVdgrbxSAZtvJQOROu0LtM6oFME0gd0BdJWt86gyfaSfwEPKtNpV3kqwNAAAAAASUVORK5CYII=")};
__resources__["/resources/status-incorrect-red.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCFhUJGH7Zb1MAAAD2SURBVDjLtZWxDYMwEEWfgYJ0jJARKClZwDtARRkyQUIV0ZHSVVgBiSUyTdggKXAiioCPiHwJyQLu6Xz3fVYGIuAElIwagGsBZxZkxu8HxniABqh8DZcJDCAEUg37HroZ2M3GhJPXCRAqA8+FRNoC8i+wbC7AY1mZBYhgAIGtWeSAftaOBAZfww5IHT/G9nGpVtKtCNQWkKs19ZE0T63poMQJasZj2S8wiW1W639b3rQpW9rGt1Oj3KB8sQalDDwcRw+glR69QAJ718e4oZG3poN23S4FeHbSikwrgDa+hrudvMnkCqgLOM5l0UOnR4fEk6ndANUL0E5DIX/+PWsAAAAASUVORK5CYII=")};
__resources__["/resources/whiteback.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA5gAAAJsCAIAAAAX3ptRAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCHRMlKLK9z+IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAACe5JREFUeNrt1jENAAAIBDHAv+dHBBNJK+Gm6yQFAADfjAQAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAABhZAAAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwCAkQUAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIwsAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQDAyAIAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAAIysBAAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAYGQBAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAAAjCwAARhYAAIwsAABGFgAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAYGQBAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAAAjCwAARhYAAIwsAABGFgAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAYGQBAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAAAjCwAARhYAAIwsAABGFgAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAAAjCwAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAAAjCwAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAAAjCwAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAMLIAAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAGFkAADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAICRBQAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjCwAABhZAAAwsgAAYGQBADCyAABgZAEAwMgCAGBkAQDAyAIAgJEFAMDIAgCAkQUAACMLAABGFgAAIwsAAEYWAACMLAAARhYAAIwsAAAYWQAAjKwEAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQAAIwsAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAADCyAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQAAIwsAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAADCyAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgBgZAEAwMgCAICRBQAAIwsAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAAEYWAACMLAAAGFkAADCyAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgCAkQUAwMgCAICRBQAAIwsAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAABhZAACMLAAAGFkAADCyAAAYWQAAMLIAAGBkAQAwsgAAYGQBAMDIAgCAkQUAwMgCAICRBQAAIwsAgJEFAAAjCwAARhYAACMLAABGFgAAjCwAABhZAACMLAAAGFkAADCyAAAYWQAAMLIAAHC3ADsH1Rwl1iUAAAAASUVORK5CYII=")};
__resources__["/resources/wrong.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAIAAABjfH+IAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDAhIpGXsOhJoAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAClJREFUSMftzUEBAAAEBLCjfwFttfCxFVhNLnQ0Go1Go9FoNBqNRvO2WcAFAOGd8nCDAAAAAElFTkSuQmCC")};
__resources__["/XML.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
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

// Static class, so nothing much here
var XML = BObject.extend({
    init: function() {
        XML.superclass.init.call(this);
    }
});

// Simple, general XML parser
XML.parser = function(root, ret) {
	var r = {}

    r.name = root.tagName;
    
	// Process attributes
    r.attributes = {}
	for (var i = 0; i < root.attributes.length; i++) {
		var n = root.attributes[i].nodeName;
        
        r.attributes[n] = root.attributes[i].nodeValue;
	}
	
    r.children = [];
    
    // Process children
	for (var i = root.firstElementChild; i != null; i = i.nextElementSibling) {
		r.children.push(XML.parser(i));
	}
	
    // Process tagged value (ex: <TAG>This info here<INNER></INNER>but not here</TAG>
    r.value = null;
    if(root.childNodes) {
        if(root.childNodes.length > 0) {
            r.value = root.childNodes[0].nodeValue;
        }
    }
	
	return r;
}

// Gets the first child of the current node with the specified name
XML.getChildByName = function(root, name) {
    for(var i = 0; i < root.children.length; i++) {
        if(root.children[i].name == name) {
            return root.children[i];
        }
    }
    
    return null;
}

// As getChildByName, but at any depth from the current node
XML.getDeepChildByName = function(root, name) {
    for(var i = 0; i < root.children.length; i++) {
        if(root.children[i].name == name) {
            return root.children[i];
        }
        else {
            var ret = XML.getDeepChildByName(root.children[i], name);
            if(ret != null) {
                return ret;
            }
        }
    }
    
    return null;
}

// Gets an array of all children with the specified name
XML.getChildrenByName = function(root, name) {
    var ret = []
    
    for(var i = 0; i < root.children.length; i++) {
        if(root.children[i].name == name) {
            ret.push(root.children[i]);
        }
    }
    
    return ret;
}

exports.XML = XML
}};/*globals module exports resource require window Module __main_module_name__ __resources__*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

function resource(path) {
    // Check for packed resource
    var r = __resources__[path];
    if (r) {
        return r.data;
    }

    // Check for remote resource
    r = __remote_resources__[path];
    if (r) {
        // Load remote image
        if (r.meta.mimetype.split('/')[0] == 'image') {
            return require('cocos2d').RemoteImage.create({url: r.data, path: path});
        } else {
            return require('cocos2d').RemoteResource.create({url: r.data, path: path});
        }
    }

    throw("Unable to find resource: " + path.toString());
}

(function () {
    var process = {};
    var modulePaths = ['/__builtin__', '/__builtin__/libs', '/libs', '/'];

    var path; // Will be loaded further down

    function resolveModulePath(request, parent) {
        // If not a relative path then search the modulePaths for it
        var start = request.substring(0, 2);
        if (start !== "./" && start !== "..") {
            return modulePaths;
        }

        var parentIsIndex = path.basename(parent.filename).match(/^index\.js$/),
            parentPath    = parentIsIndex ? parent.id : path.dirname(parent.id);

        // Relative path so searching inside parent's directory
        return [path.dirname(parent.filename)];
    }

    function findModulePath(id, dirs) {
        if (id.charAt(0) === '/') {
            dirs = [''];
        }
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            var p = path.join(dir, id);

            // Check for index first
            if (path.exists(path.join(p, 'index.js'))) {
                return path.join(p, 'index.js');
            } else if (path.exists(p + '.js')) {
                return p + '.js';
            }
        }

        return false;
    }

    function loadModule(request, parent) {
        parent = parent || process.mainModule;

        var paths    = resolveModulePath(request, parent),
            filename = findModulePath(request, paths);

        if (filename === false) {
            throw "Unable to find module: " + request;
        }


        if (parent) {
            var cachedModule = parent.moduleCache[filename];
            if (cachedModule) {
                return cachedModule;
            }
        }

        //console.log('Loading module: ', filename);

        var module = new Module(filename, parent);

        // Assign main module to process
        if (request == __main_module_name__ && !process.mainModule) {
            process.mainModule = module;
        }

        // Run all the code in the module
        module._initialize(filename);

        return module;
    }

    function Module(id, parent) {
        this.id = id;
        this.parent = parent;
        this.children = [];
        this.exports = {};

        if (parent) {
            this.moduleCache = parent.moduleCache;
            parent.children.push(this);
        } else {
            this.moduleCache = {};
        }
        this.moduleCache[this.id] = this;

        this.filename = null;
        this.dirname = null;
    }

    Module.prototype._initialize = function (filename) {
        var module = this;
        function require(request) {
            return loadModule(request, module).exports;
        }

        this.filename = filename;

        // Work around incase this IS the path module
        if (path) {
            this.dirname = path.dirname(filename);
        } else {
            this.dirname = '';
        }

        require.paths = modulePaths;
        require.main = process.mainModule;

        __resources__[this.filename].data.apply(this.exports, [this.exports, require, this, this.filename, this.dirname]);

        return this;
    };

    // Manually load the path module because we need it to load other modules
    path = (new Module('path'))._initialize('/__builtin__/path.js').exports;

    var util = loadModule('util').exports;
    util.ready(function () {
        // Populate globals
        var globals = loadModule('global').exports;
        for (var x in globals) {
            if (globals.hasOwnProperty(x)) {
                window[x] = globals[x];
            }
        }

        // Add a global require. Useful in the debug console.
        window.require = function require(request, parent) {
            return loadModule(request, parent).exports;
        };
        window.require.paths = modulePaths;

        process.mainModule = loadModule(__main_module_name__);

        window.require.main = process.mainModule;

        if (process.mainModule.exports.main) {
            process.mainModule.exports.main();
        }

    });
})();

// vim:ft=javascript

})();
