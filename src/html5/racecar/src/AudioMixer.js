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
var MOT = require('/ModifyOverTime');

// Project requires
var AudioTrack = require('/AudioTrack');

// Only need a single Audio Mixer, so the class is static
// Responsible for managing all the audio in the app
function AudioMixer() {
    AudioMixer.superclass.constructor.call(this);
    
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
        this.availible = true;
        
        // Detect ogg/oga capability
        var check = a.canPlayType('audio/ogg; codecs="vorbis"');
        if(check != '' && check != 'no') {
            this.ogg = true;
        }
        
        // Detect mp3 capability
        check = a.canPlayType('audio/mpeg;')
        if(check != '' && check != 'no') {
            this.mp3 = true;
        }
    }
}

AudioMixer.inherit(Object, {
    sounds      : null,  // Dictionary of AudioTracks
    availible   : false, // true if browser supports <audio>
    ogg         : false, // true if browser supports ogg/oga format
    mp3         : false, // true is browser supports mp3 format
    muted       : false, // Whether or not all audio should be muted
    volume      : 1,     // Master volume

    // Load a sound, do NOT supply a file extension with the filename
    loadSound: function(ref, filename) {
        if(!this.availible) {
            return;
        }
        
        // Set file extension based on filetype(s) supported
        if(this.ogg) {
            filename += '.ogg';
        }
        else if(this.mp3) {
            filename += '.mp3';
        }
        else {
            console.log('Can play audio, but no supported audio type availible');
            return
        }
        
        if(!this.checkRef(ref)) {
            try {
                this.sounds[ref] = new AudioTrack(filename);
            }
            catch(exception) {
                console.log(exception);
            }
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
    
    // Sets specific track's volume
    setTrackVolume: function(t, v) {
        if(!this.availible) {
            return;
        }
        
        if(this.checkRef(t)) {
            this.getSound(t).setVolume(v);
        }
    },
    
    // Gets the specificied AudioTrack if it exists
    getSound: function(ref) {
        if(this.checkRef(ref)) {
            return this.sounds[ref];
        }
        return null;
    },
    
    // Cross fades from the specified track to the other specified track over the specified duration
    crossFade: function(from, to, dur) {
        var f = this.getSound(from);
        var t = this.getSound(to);
        
        if(f && t) {
            (new MOT(1, -1, dur)).bindFunc(f, f.setVolume);
            (new MOT(0, 1, dur)).bindFunc(t, t.setVolume);
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

module.exports = AudioMixer