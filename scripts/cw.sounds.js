/**
 * console-wars-basic.js
 * version 0.1
 * sound operations
 */

(function() {
    let self = this;
    self.background = null;
    
    self.types = {
        music: {
            battle: "sounds/Legendary_JRPG_Battle_Music_Pack/01 Furious Battle/Battle-Furious_min.mp3",
            eight_bit_battle_16: "sounds/Legendary_JRPG_Battle_Music_Pack/8bit-Battle01_16k.mp3",
            conflict_8: "sounds/Legendary_JRPG_Battle_Music_Pack/Battle-Conflict_8k.mp3",
            battle_samurai_16: "sounds/Legendary_JRPG_Battle_Music_Pack/Battle-SAMURAI_16k.mp3",
            battle_samurai_24: "sounds/Legendary_JRPG_Battle_Music_Pack/Battle-SAMURAI_24k.mp3"
        },
        move: {
            charge2: "sounds/8bit Sound Pack/mp3/Charge2_mini.mp3",
            arrow: "sounds/8bit Sound Pack/mp3/Arrow_mini.mp3",
            miss: "sounds/8bit Sound Pack/mp3/alien_edit.mp3"
        },
        other: {
            encounter: "sounds/8bit Sound Pack/mp3/Encounter.mp3",
        }
    };
    
    self.backgroundMusic = function(url) {
        // self.background = new Audio(url);
        // self.background.loop = true;
        // self.background.play();
        
        self.background = document.querySelector('audio');
        self.background.src = lib.js.random(self.types.music);
        self.background.loop = true;
        let promise = undefined;
        //promise = self.background.play();

        if (promise !== undefined) {
            promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            function click_play_music(){
                document.removeEventListener("click", click_play_music);
                self.background.src = lib.js.random(self.types.music);
                self.background.loop = true;
                self.background.play();
            }
            document.addEventListener("click",click_play_music);
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
        }
    };

    self.play = function(url) {
        new Audio(url).play();
    };

    
    self.stop = function(type) {
        self[type].pause();
        self[type].currentTime = 0;
    };
    
    self.random = function() {
        let sound_effect = Math.random() > 0.5 ? self.types.move.charge2 : self.types.move.arrow;
        self.play(sound_effect);
    };
    self.miss = function() {
        self.play(self.types.move.miss);
    };

    return self;
}).apply(cw.sounds = {});