/**
 * console-wars-basic.js
 * version 0.1
 * battle operations
 */

// NEXT TASK: load monster info 0- name, hp, type

// Step 1 - get fight button to make attack action, remove enemy hp
// step 2 - update enemy hp
// step 3 - 


/**
 * global functions:
 * load - first function to call to start a section
 *      cw.battle.load
 *      cw.sounds.load
 * ...
 */


//load players

//bind controls

//attack move

//response move

var cw = {};
(function() {
    let self = this;

    /** what mode system currently in : Battle, World, - used for action referencing and which namespace to call */
    self.mode = "battle";

    /**
     * start system
     */
    self.load = function() {
        self.player.load();
        let enemy_temp = self.monsters.random();

        self.battle.load(self.player.monsters[0], enemy_temp);
    };

    // ######### binding section ####
    window.addEventListener('load', self.load);
    //###############################

    return self;
}).apply(cw);

