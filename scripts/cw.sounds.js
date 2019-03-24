/**
 * console-wars-basic.js
 * version 0.1
 * sound operations
 */

(function() {
    let self = this;
    self.background = null;

    self.playSound = function(url) {
        self.background = new Audio(url);
        self.background.play();
    };

    
    self.stop = function(type) {
        self[type].pause();
        self[type].currentTime = 0;
    };

    return self;
}).apply(cw.sounds = {});