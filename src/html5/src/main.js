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
var Background = require('Background').Background;
var Dashboard = require('Dashboard').Dashboard
var Intermission = require('Intermission').Intermission;
var KeyboardLayer = require('KeyboardLayer').KeyboardLayer
var Player = require('Player').Player;
var PNode = require('PerspectiveNode').PerspectiveNode;
var Question = require('Question').Question;
var EOGD = require('EndOfGameDisplay').EndOfGameDisplay;
var Preloader = require('Preloader').Preloader;

// Static Imports
var RC = require('RaceControl').RaceControl;
var MOT = require('ModifyOverTime').ModifyOverTime;
var XML = require('XML').XML;

// Content Imports
var LabelBG = require('LabelBG').LabelBG;
var PieChart = require('PieChart').PieChart;
var FractionRenderer = require('FractionRenderer').FractionRenderer;

// TODO: De-magic number these
/* Zorder
-10 Background
-5  Finish Line
-4  Trees
-1  Dashboard
0   Anything not mentioned
100 Question Delimiters
*/

// Create a new layer
// TODO: Clean up main, it is getting bloated
var FluencyApp = KeyboardLayer.extend({
    player      : null,     // Holds the player
    background  : null,     // Holds the the background object
    dash        : null,     // Holds the right hand side dashboard
    questionList: [],       // List of all questions in the input
    audioMixer  : null,     // AudioMixer
    medalCars   : [],       // Contains the pace cars
    gameID      : '',       // Unique ID for the game
    
    endOfGameCallback : null,   //Holds the name of the window function to call back to at the end of the game
    
    version     : 'v 0.1.2',// Current version number
    
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
        
        var preloader = Preloader.create();
        this.addChild({child: preloader});
        this.preloader = preloader;
        
        events.addListener(preloader, 'loaded', this.delayedInit.bind(this));
    },
    
    delayedInit: function() {
        this.removeChild({child: this.preloader});
    
        // Static binds
        this.addMeHandler = this.addMeHandler.bind(this)
        this.answerQuestion = this.answerQuestion.bind(this)
        this.removeMeHandler = this.removeMeHandler.bind(this)
        
        // Set up basic audio
        var AM = AudioMixer.create();
        AM.loadSound('bg', "sound/01 Yellow Line");
        AM.loadSound('wipeout', "sound/Carscreech");
        this.set('audioMixer', AM);
        
        // Create player
        var player = Player.create();
        player.set('position', new geo.Point(400, 450));
        this.set('player', player);
        
        // Create dashboard
        var dash = Dashboard.create();
        dash.set('position', new geo.Point(800, 0));
        this.set('dash', dash);
        
        // Get "command line" arguments from the div tag
        var app_div = $('#cocos_test_app')
        var xml_path = app_div.attr('data');
        this.set('gameID', app_div.attr('gameid'));
        this.set('endOfGameCallback', app_div.attr('callback'));
        
        // Uncomment to run locally
        //this.runLocally();
        //return;
        
        // Set up remote resources, default value allows for running 'locally'
        // TODO: Remove default in production, replace with error
        __remote_resources__["resources/testset.xml"] = {meta: {mimetype: "application/xml"}, data: xml_path ? xml_path : "set002.xml"};
        
        // Preload remote resources
        var p = cocos.Preloader.create();
        events.addListener(p, 'complete', this.runRemotely.bind(this));
        p.load();
    },
    
    // Remote resources failed to load, generate dummy data then proceed
    // TODO: Determine what to do if we get 404s in production
    // TODO: Bring this up to date with latest Question implementation
    runLocally: function() {
        console.log("Now running locally from this point forward");
        
        var list = [];
        for(var i=0; i<6; i+=1) {
            var inter = Intermission.create(20000+i, i*500+10);
            inter.idle();
            for(var j=1; j<4; j+=1) {
                list[list.length] = Question.create(1, 10000+i, 30000+i, i*500 + j*150 + 10);
                events.addListener(list[list.length - 1], 'questionTimeExpired', this.answerQuestion);
                events.addListener(list[list.length - 1], 'addMe', this.addMeHandler);
                list[list.length - 1].idle();
            }
        }
        
        this.set('questionList', list);
        
        this.preprocessingComplete();
    },
    
    // Parses the level xml file
    // TODO: Decide on input file format and rewrite this as needed.
    // TODO: Make the parser not expload on bad XML files
    // TODO: Overhaul parser to generic pull, specific parse rather than semi-specific traverse
    // TODO: Actually do some of the above TODOs
    parseXML: function(xmlDoc) {
        // Parse medal information
        var medals = XML.parseMedals(xmlDoc);
        
        // Parse and set player speed values
        this.parseSpeed(xmlDoc);
        
        // Get the penalty time for incorrect answers
        this.parsePenalty(xmlDoc);
    
        // Parse and process questions
        RC.finishLine = this.parseProblemSet(xmlDoc) + RC.finishSpacing;
        
        // Process medal information
        medals[0] = RC.finishLine / this.get('player').get('maxSpeed');
        medals[medals.length] = medals[medals.length - 1] * 1.5;
        RC.times = medals;

        // Sanity check
        if(medals[0] > medals[1]) {
            console.log("WARNING: Calculated minimum time (" + medal[0] +") is longer than the maximum allowed time for a gold medal (" + medal[1] +").");
        }
        
        this.preprocessingComplete();
    },
    
    // Parse the penalty settings
    parsePenalty: function (root) {
        var time, speed;
        // Legacy support
        var hurix = XML.getFirstByTag(root, 'DEFAULT_PENALTY');
        if(hurix != null) {
            time = XML.safeGetAttr(hurix, 'VALUE') / 1000;
        }
        else {
            root = XML.getFirstByTag(root, 'PenaltySettings');
            if(root != null) {
                time = XML.safeComboGet(root, 'TimeLost', 'VALUE');
                speed = XML.safeComboGet(root, 'SpeedLost', 'VALUE');
            }
        }
        
        // Cannot use nonNullSet on a static object
        if(time != null) {
            RC.penaltyTime = time;
        }
        if(speed != null) {
            RC.penaltySpeed = speed * -1;
        }
    },
    
    // Parse and set player speed values
    parseSpeed: function (root) {
        var min, max, speed, accel, decel, turbo;
        // Legacy support
        var hurix = XML.getFirstByTag(root, 'MinTPQ');
        if(hurix != null) {
            // Get raw value and transform to seconds
            max = XML.safeComboGet(root, 'MinTPQ', 'VALUE') / 1000;
            min = XML.safeComboGet(root, 'MaxTPQ', 'VALUE') / 1000;
            speed = XML.safeComboGet(root, 'DTPQ', 'VALUE') / 1000;
            accel = XML.safeComboGet(root, 'SpeedImpact_Up', 'VALUE') / 250;
            decel = XML.safeComboGet(root, 'SpeedImpact_Down', 'VALUE') / 250;
            turbo = null;
            
            max = RC.questionSpacing / max
            if(min != 0) {
                min = RC.questionSpacing / min
            }
            else {
                min = 0
            }
            speed = RC.questionSpacing / speed
        }
        else {
            root = XML.getFirstByTag(root, 'SpeedSettings');
            if(root != null) {
                max = XML.safeComboGet(root, 'Max', 'VALUE');
                min = XML.safeComboGet(root, 'Min', 'VALUE');
                speed = XML.safeComboGet(root, 'Default', 'VALUE');
                accel = XML.safeComboGet(root, 'Acceleration', 'VALUE');
                decel = XML.safeComboGet(root, 'Deceleration', 'VALUE');
                turbo = XML.safeComboGet(root, 'Turbo', 'VALUE');
            }
        }
        
        // Set the values on the player, avoiding overwriting default values with null
        var p = this.get('player')
        this.nonNullSet(p, 'maxSpeed', max);
        this.nonNullSet(p, 'minSpeed', min);
        this.nonNullSet(p, 'zVelocity', speed==null ? min : speed);
        this.nonNullSet(p, 'acceleration', accel==null ? decel : accel);
        this.nonNullSet(p, 'deceleration', decel==null ? accel : decel);
        
        this.nonNullSet(p, 'turboSpeed', turbo==null ? max : turbo);
    },
    
    // Helper to avoid writing over default values
    nonNullSet : function(obj, key, val){
        if(val != null) {
            obj.set(key, val);
        }
    },
    
    // Parses the PROBLEM_SET
    parseProblemSet: function (root) {
        var problemRoot = XML.getFirstByTag(root, 'PROBLEM_SET');
        var subset = problemRoot.firstElementChild;
        var z = 0;
        var once = true;
        
        while(subset != null) {
            z = this.parseProblemSubset(subset, z, once);
            once = false;
            
            subset = subset.nextElementSibling;
        }
        
        return z
    },
    
    // Parses a subset within the PROBLEM_SET
    parseProblemSubset: function (subset, z, once) {
        var node = subset.firstElementChild;
        var interContent;
        
        var hurix = XML.safeGetAttr(node, 'VALUE');
        if(hurix) {
            interContent = LabelBG.create(LabelBG.helper(hurix,'#000','#fff'));
        }
        else {
            interContent = this.parseContent(node);
        }
        
        // Not the first subset
        if(!once) {
            z += RC.intermissionSpacing;
            // Gets the intermission value
            
            var inter = Intermission.create(interContent, z);
            events.addListener(inter, 'changeSelector', this.get('player').startIntermission);
            events.addListener(inter, 'changeSelector', this.get('dash').pauseTimer.bind(this.get('dash')));
            inter.idle();
        }
        else {
            this.set('startSelector', interContent);
        }
        
        // Interate over questions in subset
        var list = this.get('questionList');
        node = node.nextElementSibling;
        while(node != null) {
            z += RC.questionSpacing
            var q = this.parseProblem(node)
            
            
            // Create a question
            list[list.length] = Question.create(q[0], q[1], q[2], z, q[3], q[4]);
            events.addListener(list[list.length - 1], 'questionTimeExpired', this.answerQuestion);
            events.addListener(list[list.length - 1], 'addMe', this.addMeHandler);
            list[list.length - 1].idle();
            
            node = node.nextElementSibling;
        }
        
        this.set('questionList', list);
        
        return z;
    },
    
    // Parses a question within the subset
    parseProblem: function (node) {
        var ans, d1, d2, p1, p2;
        
        // Answer is the same in all formats (except for case, ugh...), so get it first
        // TODO: Revise answer in new format
        ans = XML.safeComboGet(node, 'Answer', 'VALUE');
        if(!ans) {
            ans = XML.safeComboGet(node, 'ANSWER', 'VALUE');
        }
        
        // Legacy check
        var hurix = node.getElementsByTagName('DELIMETERS_TEXT');
        if(hurix.length > 0) {
            var child = hurix[0].firstElementChild;
            d1 = LabelBG.create(LabelBG.helper(child.getAttribute('VALUE'),'#000','#fff'));
            
            if(child.nextElementSibling != null) {
                d2 = LabelBG.create(LabelBG.helper(child.nextElementSibling.getAttribute('VALUE'),'#000','#fff'));
            }
        }
        else {
            node = XML.getFirstByTag(node, 'Content');
            d1 = this.parseContent(node);
            p1 = this.parsePerspective(node);
            
            node = node.nextElementSibling;
            d2 = this.parseContent(node);
            p2 = this.parsePerspective(node);
        }
        
        return [ans, d1, d2, p1, p2];
    },
    
    // Parses a single piece of <CONTENT>
    parseContent: function (node) {
        var type = XML.safeGetAttr(node, 'TYPE');
        var opts = XML.getFirstByTag(node, 'ContentSettings');
        
        var content = null;
        
        if(opts == null) {
            console.log("ERROR: No <ContentSettings> in a content item.");
            return null;
        }
        
        if(type == 'String') {
            content = LabelBG.create(LabelBG.helperXML(opts));
        }
        else if(type == 'Fraction') {
            content = FractionRenderer.create(FractionRenderer.helperXML(opts));
        }
        else if(type == 'PieChart') {
            content = PieChart.create(PieChart.helperXML(opts));
        }
        else {
            console.log('ERROR: Unsupported <Content TYPE = "' + type + '">.');
            return null;
        }
        
        return content;
    },
    
    // Parses the <PERSPECTIVE_SETTINGS> node
    parsePerspective: function(node) {
        var p = XML.getFirstByTag(node, 'PerspectiveSettings');
        var opts = {};
        
        opts['visibility'] = XML.safeComboGet(p, 'Visibility', 'VALUE');
        opts['minScale']   = XML.safeComboGet(p, 'MinScale', 'VALUE');
        opts['maxScale']   = XML.safeComboGet(p, 'MaxScale', 'VALUE');
        
        return opts
    },
    
    // The 'real init()' called after all the preloading/parsing is completed
    preprocessingComplete: function () {
        // Create key bindings
        this.setBinding('MOVE_LEFT',    [65, 37]);  // [A, ARROW_LEFT]
        this.setBinding('MOVE_RIGHT',   [68, 39]);  // [D, ARROW_RIGHT]
        this.setBinding('SPEED_UP',     [87, 38]);  // [W, ARROW_UP]
        this.setBinding('SPEED_DOWN',   [83, 40]);  // [S, ARROW_DOWN]
        this.setBinding('TURBO',        [32]);      // [SPACE]
        this.setBinding('ABORT',        [27]);      // [ESC]
        this.setBinding('SHOW_FPS',     [80]);      // [P]
        
        // Draw background
        var bg = Background.create();
        bg.set('zOrder', -10);
        this.set('background', bg);
        this.addChild({child: bg});
        
        var player = this.get('player');
        
        // Add the right hand side dash
        var dash = this.get('dash');
        dash.set('maxSpeed', player.get('maxSpeed'));
        this.addChild({child: dash});
        dash.set('zOrder', -1);
        
        events.addListener(player, 'IntermissionComplete', dash.unpauseTimer.bind(dash));
        
        // Add player
        this.addChild({child: player});
        
        // Create finish line
        var opts = {
            maxScale    : 1.00,
            alignH      : 0.5,
            alignV      : 0,
            visibility  : 1,
            xCoordinate : 0,
            zCoordinate : RC.finishLine,
            dropoffDist : -10,
        }
        opts['content'] = cocos.nodes.Sprite.create({file: '/resources/finishline.png',});
        opts['content'].set('scaleX', 2);
        opts['content'].set('scaleY', 0.5);
        
        var fl = PNode.create(opts);
        events.addListener(fl, 'addMe', this.addMeHandler);
        fl.idle();
        fl.set('zOrder', -5);
        
        // Add version number
        var vtag = cocos.nodes.Label.create({string: this.get('version')})
        vtag.set('anchor-point', new geo.Point(0.5, 0.5));
        vtag.set('position', new geo.Point(850, 590));
        this.addChild({child: vtag});
        
        // Create FPS meter
        var fps = cocos.nodes.Label.create({string: '0 FPS'})
        fps.set('position', new geo.Point(20, 20));
        this.fps = fps;
        this.fpsTracker = [30, 30, 30, 30, 30];
        this.fpsToggle = false;
        
        // Calculate new min safe time
        var m = Math.min(RC.questionSpacing, RC.intermissionSpacing);
        m = Math.min(m, RC.finishSpacing);
        
        RC.maxTimeWindow = m / player.get('maxSpeed') * 0.9;
        
        // Generate things to the side of the road
        var sprite = cocos.nodes.Sprite.create({file: '/resources/tree_1.png',});
        
        for(var t=10; t<RC.finishLine + 100; t += Math.ceil(Math.random()*6+4)) {
            if(Math.random() < 0.25) {
                var p = PNode.create({xCoordinate: 4 * Math.random() + 5.5, zCoordinate: t, content: sprite, alignH: 0.5, alignV: 0.5})
                p.set('zOrder', -4);
                events.addListener(p, 'addMe', this.addMeHandler);
                p.idle();
            }
            if(Math.random() < 0.25) {
                var p = PNode.create({xCoordinate: -4 * Math.random() - 5.5, zCoordinate: t, content: sprite, alignH: 0.5, alignV: 0.5})
                p.set('zOrder', -4);
                events.addListener(p, 'addMe', this.addMeHandler);
                p.idle();
            }
        }
    },
    
    // Three second countdown before the game begins (after pressing the start button on the menu layer)
    // TODO: Make countdown more noticible
    countdown: function () {
        this.get('dash').bindTo('speed', this.get('player'), 'zVelocity');
        setTimeout(this.startGame.bind(this), RC.initialCountdown);
        this.get('audioMixer').playSound('bg');
        
        var cd = cocos.nodes.Label.create({string: '3', textColor: '#000000'});
        cd.set('scaleX', 10);
        cd.set('scaleY', 10);
        cd.set('position', new geo.Point(400, 300));
        
        this.set('cdt', cd);
        this.addChild({child: cd});
        
        // Set the starting value on the player's car
        this.get('player').changeSelectorByForce(this.get('startSelector'));
        
        var that = this;
        setTimeout(function () { that.get('cdt').set('string', '2'); }, 1000)
        setTimeout(function () { that.get('cdt').set('string', '1'); }, 2000)
        setTimeout(function () { that.get('cdt').set('string', 'GO!'); that.get('cdt').set('position', new geo.Point(300, 300)); }, 3000)
        setTimeout(function () { that.removeChild(that.get('cdt')); }, 3500)
        
        // Catch window unloads at this point as aborts
        $(window).unload(this.endOfGame.bind(this, null));
    },
    
    // Starts the game
    startGame: function () {
        // Schedule per frame update function
        this.scheduleUpdate();
        var p = this.get('player');
        p.scheduleUpdate();
        this.get('dash').start();
        
        var ds = p.get('zVelocity');
        p.set('zVelocity', 0);
        MOT.create(0, ds, 0.2).bind(p, 'zVelocity');
        
        var medalCars = []
        
        var opts = {
            maxScale    : 1.00,
            alignH      : 0.5,
            alignV      : 0,
            visibility  : 1,
            xCoordinate : 4.5,
            zCoordinate : 0,
            dropoffDist : -10,
            delOnDrop   : false,
        }
        
        // Ghost cars representing medal cutoffs
        // TODO: Make seperate class, support lines in addition to cars
        for(var i=0; i<3; i+= 1) {
            var car = cocos.nodes.Sprite.create({file: '/resources/car'+i+'.png'});
            car.set('opacity', 192);
        
            opts['content'] = car
            medalCars[i] = PNode.create(opts)
            medalCars[i].zVelocity = RC.finishLine / RC.times[i+1];
            medalCars[i].scheduleUpdate();
            this.addChild({child: medalCars[i]});
            
            events.addListener(medalCars[i], 'addMe', this.addMeHandler);
            events.addListener(medalCars[i], 'removeMe', this.removeMeHandler);
        }
        
        this.set('medalCars', medalCars);
    },
    
    // Handles add requests from PerspectiveNodes
    // TODO: Make a PerspectiveView class to handle these functions?
    // STATIC BIND
    addMeHandler: function (toAdd) {
        this.addChild({child: toAdd});
        events.addListener(toAdd, 'removeMe', this.removeMeHandler);
    },
    
    // Handles removal requests from PerspectiveNodes
    // STATIC BIND
    removeMeHandler: function (toRemove) {
        this.removeChild(toRemove);
    },
    
    // Called when game ends, should collect results, display them to the screen and output the result XML
    // finished = null on window.unload, false on abort, true on completion
    endOfGame: function(finished) {
        if(finished != null) {
            $(window).unbind('unload')
            $(window).unload(this.cleanup.bind(this, null));
        }
        else {
            this.cleanup();
        }
    
        // Stop the player from moving further and the dash from increasing the elapsed time
        cocos.Scheduler.get('sharedScheduler').unscheduleUpdateForTarget(this.get('player'));
        cocos.Scheduler.get('sharedScheduler').unscheduleUpdateForTarget(this);
        
        this.dash.pauseTimer();
        
        // Stops the medal pace cars
        var mc = this.get('medalCars');
        mc[0].set('zVelocity', 0);
        mc[1].set('zVelocity', 0);
        mc[2].set('zVelocity', 0);
    
        var ql = this.get('questionList')
        var i = 0, correct = 0, incorrect = 0, unanswered = 0;
        
        // Tally question results
        while(i < ql.length) {
            if(ql[i].get('answeredCorrectly')) {
                correct += 1;
            }
            else if(ql[i].get('answeredCorrectly') == false) {
                incorrect += 1;
            }
            else {
                unanswered += 1;
            }
            i += 1;
        }
        
        var tt = this.get('dash').getTotalTime()
        var m = 1;
        
        if(finished) {
            while(m < 4 && RC.times[m] < tt) {
                m += 1;
            }
        }
        else {
            m = 4;
        }
        
        // Checks to see if abort was related to window.unload
        if(finished != null) {
            //alert("Correct: " + correct + '\nTotal Time: ' + tt + '\nMedal Earned: ' + RC.medalNames[m] );
            var e = EOGD.create(this.get('dash').get('elapsedTime'), incorrect + unanswered, !finished);
            e.set('position', new geo.Point(200, 50));
            this.addChild({child: e});
            events.addListener(e, 'complete', this.cleanup.bind(this));
            e.start();
        }
    
        // If the 'command line' specified a call back, feed the callback the xml
        if(this.get('endOfGameCallback')) {
            if(finished) {
                window[this.get('endOfGameCallback')](this.writeXML(correct, 'FINISH'));
            }
            else {
                window[this.get('endOfGameCallback')](this.writeXML(correct, 'ABORT'));
            }
        }
    },

    // Writes the output xml file as a string and returns it
    // TODO: Decide on a new format if needed and update
    writeXML: function(correct, state) {
        // Get needed values
        var ref = this.get('gameID');
        var d = this.get('dash');
        var e = d.get('elapsedTime');
        var p = d.get('pTime');
        var m;
        
        // Determine medal string
        if(e + p < RC.times[1] && state == 'FINISH') {
            m = "Gold";
        }
        else if(e + p < RC.times[2] && state == 'FINISH') {
            m = "Silver";
        }
        else if(e + p < RC.times[3] && state == 'FINISH') {
            m = "Bronze";
        }
        else {
            m = " - ";
        }
        
        // Convert times to milliseconds for reporting
        e = Math.round(e * 1000)
        p = Math.round(p * 1000)
        
        // Build the XML string
        var x =
        '<OUTPUT>\n' + 
        '    <GAME_REFERENCE_NUMBER ID="' + ref + '"/>\n' + 
        '    <SCORE_SUMMARY>\n' + 
        '        <Score CorrectAnswers="' + correct +'" ElapsedTime="' + e + '" PenaltyTime="' + p + '" TotalScore="' + (e + p) +'" Medal="' + m + '"/>\n' + 
        '    </SCORE_SUMMARY>\n' +
        '    <SCORE_DETAILS>\n';
                var i = 0;
                var ql = this.get('questionList');
                while(i < ql.length) {
                x += '        <SCORE QuestionIndex="' + (i+1) +'" AnswerValue="' +  ql[i].get('correctAnswer') + '" TimeTaken="' + Math.round(ql[i].get('timeElapsed') * 1000) + '" LaneChosen="' + ql[i].get('answer') + '"/>\n';
                i += 1;
                }
            x += '    </SCORE_DETAILS>\n' + 
        '    <END_STATE STATE="' + state + '"/>\n' +
        '</OUTPUT>';
        
        return x;
    },
    
    // Code to be run when the game is finished
    cleanup: function() {
        // Clear the bind
        $(window).unbind('unload');
        
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
    
    // Handles answering the current question when time expires
    // STATIC BIND
    answerQuestion: function(question) {
        var result;
        
        var player = this.get('player');
        var playerX = player.get('xCoordinate');
        
        // Determine answer based on the lane
        if(playerX < PNode.roadWidth / -6) {
            result = question.answerQuestion(0);
        }
        else if(playerX < PNode.roadWidth / 6) {
            result = question.answerQuestion(1);
        }
        else {
            result = question.answerQuestion(2);
        }
        
        // Handle correct / incorrect feedback
        if(result) {
            // TODO: correct sounds effects
        }
        else {
            var t = this.get('dash').get('pTime') + RC.penaltyTime + this.get('dash').get('elapsedTime')
        
            player.wipeout(1);
            this.get('audioMixer').playSound('wipeout', true);
            this.get('dash').modifyPenaltyTime(RC.penaltyTime);
            
            var c = this.get('medalCars')
            for(var i=0; i<3; i+=1) {
                var rd = RC.finishLine - c[i].get('zCoordinate');
                var rt = RC.times[i+1] - t;
                if(rt > 0 && rd > 0) {
                    c[i].set('zVelocity', rd / rt);
                }
                else if (rd > 0) {
                    c[i].set('zVelocity', rd / 1);
                }
            }
            this.set('medalCars', c);
        }
        
        player.endTurboBoost();
    },
    
    // Toggles the AudioMixer's mute
    muteHandler: function() {
        var AM = this.get('audioMixer');
        AM.setMute(!AM.get('muted'));
    },
    
    // Called every frame, manages keyboard input
    update: function(dt) {
        var player = this.get('player');
        var playerX = player.get('xCoordinate');
        
        if(player.get('zCoordinate') > RC.finishLine) {
            this.endOfGame(true);
            return;
        }
        
    // Move the player according to keyboard
        // 'A' / 'LEFT' Move left, discreet
        if(this.checkBinding('MOVE_LEFT') == KeyboardLayer.PRESS) {
            playerX -= 3
            if(playerX < -3) {
                playerX = -3
            }
            player.set('xCoordinate', playerX);
        }
        // 'D' / 'RIGHT' Move right, discreet
        else if(this.checkBinding('MOVE_RIGHT') == KeyboardLayer.PRESS) {
            playerX += 3
            if(playerX > 3) {
                playerX = 3
            }
            player.set('xCoordinate', playerX);
        }
        
        // 'S' / 'DOWN' Slow down, press
        if(this.checkBinding('SPEED_DOWN') > KeyboardLayer.UP) {
            player.decelerate(dt);
        }
        // 'W' / 'UP' Speed up, press
        else if(this.checkBinding('SPEED_UP') > KeyboardLayer.UP) {
            player.accelerate(dt);
        }
        
        // 'SPACE' turbo boost, discreet
        if(this.checkBinding('TURBO') == KeyboardLayer.PRESS) {
            player.startTurboBoost();
        }
        
        // 'ESC' Abort game, discreet
        if(this.checkBinding('ABORT') == KeyboardLayer.PRESS) {
            this.endOfGame(false);
        }
        
        // FPS calculations and display
        var sub = parseFloat(0);
        var cur = 1 / dt;
        
        // Get rid of oldest frame, add this frame
        this.fpsTracker.shift();
        this.fpsTracker.push(cur);
        
        // Log spikes to console if FPS tracker is enabled
        if(this.fpsToggle) {
            if(1 / dt < 20) {
                console.log('FPS Spike down frame ( ' + cur.toFixed(1) + ' FPS / ' + (dt*1000).toFixed(0) + ' ms dt )');
            }
        }
        
        // Smooth over multiple frames
        this.fps.set('fontColor', '#FFFFFF');
        for(t in this.fpsTracker){
            sub += this.fpsTracker[t];
            
            // Flash red on low framerate spikes
            if(this.fpsTracker[t] < 20) {
                this.fps.set('fontColor', '#DD2222');
            }
        }
        
        // Update the FPS tracker label
        this.fps.set('string', (sub / this.fpsTracker.length).toFixed(1) + ' FPS');
        
        // 'P' Toggle showing FPS tracker, discreet
        if(this.checkBinding('SHOW_FPS') == KeyboardLayer.PRESS) {
            if(!this.get('fpsToggle')) {
                this.addChild({child: this.fps});
                this.fpsToggle = true;
            }
            else {
                this.removeChild({child: this.fps});
                this.fpsToggle = false;
            }
        }
    },
});

// For button-like interactions (e.g. starting the game)
// TODO: Extend Menu with functions making it easier to tie the Menu into an app
var MenuLayer = cocos.nodes.Menu.extend({
    startButton : null,     // Holds the button to start the game
    startGame   : null,     // Holds the function in the app that starts the game
    muted       : false,    // State of the volume mute button
    init: function() {
        MenuLayer.superclass.init.call(this, {});
        
        setTimeout(function () {that.createMenu();}, 3300)
    },
    
    createMenu: function() {
        // Create the button
        var opts = Object();
        opts['normalImage'] = '/resources/start-button.png';
        opts['selectedImage'] = '/resources/start-button.png';
        opts['disabledImage'] = '/resources/start-button.png';
        // We use this callback so we can do cleanup before handing everything over to the main game
        opts['callback'] = this.startButtonCallback.bind(this);
        
        var sb = cocos.nodes.MenuItemImage.create(opts);
        sb.set('position', new geo.Point(0, 0));
        sb.set('scaleX', 0.5);
        sb.set('scaleY', 0.5);
        this.set('startButton', sb);
        this.addChild({child: sb});
        
        // Create the volume control
        // TODO: Make a better basic (toggle)button (extend MenuItemImage?)
        opts['normalImage'] = '/resources/volume-control.png';
        opts['selectedImage'] = '/resources/volume-control.png';
        opts['disabledImage'] = '/resources/volume-control.png';
        opts['callback'] = this.volumeCallback.bind(this);
        
        var vc = cocos.nodes.MenuItemImage.create(opts);
        vc.set('position', new geo.Point(400, 250));
        this.set('volumeButtonOn', vc);
        this.addChild({child: vc});
        
        opts['normalImage'] = '/resources/volume-control-off.png';
        opts['selectedImage'] = '/resources/volume-control-off.png';
        opts['disabledImage'] = '/resources/volume-control-off.png';
        opts['callback'] = this.volumeCallback.bind(this);
        
        var vc = cocos.nodes.MenuItemImage.create(opts);
        vc.set('position', new geo.Point(400, 250));
        this.set('volumeButtonOff', vc);
    },
    
    // Called when the button is pressed, clears the button, then hands control over to the main game
    startButtonCallback: function() {
        this.removeChild(this.get('startButton'));
        events.trigger(this, "startGameEvent");
    },
    
    // Called when the volume button is pressed
    // TODO: Seperate this into two functions (mute/unmute)?
    // TODO: Implement a slider/levels to set master volume
    volumeCallback: function() {
        events.trigger(this, "muteEvent");
        
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
    }
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
    
    // Get director
    var director = cocos.Director.get('sharedDirector');

    // Attach director to our <div> element
    director.attachInView(document.getElementById('cocos_test_app'));
    
    // Create a scene
    var scene = cocos.nodes.Scene.create();

    // Create our layers
    var app = FluencyApp.create();
    var menu = MenuLayer.create();
    
    // Set up inter-layer events
    events.addListener(menu, "startGameEvent", app.countdown.bind(app));
    events.addListener(menu, "muteEvent", app.muteHandler.bind(app));
    
    // Add our layers to the scene
    scene.addChild({child: app});
    scene.addChild({child: menu});
    
    // Run the scene
    director.runWithScene(scene);
};