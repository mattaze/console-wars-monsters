//"use strict";

(function() {
    let self = this;

    /**
     * player with monsters list and active monster
     */
    self._player = null;

    /**
     * enemy with monsters list and active monster
     */
    self._enemy = null;

    /**
     * shows players active monster attack moves
     */
    self.menu_attack = function(){
        //menu action
        //
    };

    /**
     * show players monsters list
     */
    self.menu_monsters = function() {

    };

    /**
     * shows players item list
     */
    self.menu_items = function() {

    };

    /**
     * show players run option
     */
    self.menu_run = function() {

    };

    /**
     * start battle
     */
    self.load = function(player, enemy) {
        self._player = player;
        self._enemy = enemy;
        self.update();
    };

    /**
     * update dom info
     */
    self.update = function() {
        cw.dom.update(self._player, "player");
        cw.dom.update(self._enemy, "enemy");
    };
    
    /**
     * 
     * @param {*} move  
     */
    self.attack = function(move) {
        //basic testing attack
        self._enemy.h =  self._enemy.h - 1;

        self.update();
    };

    return self;
}).apply(cw.battle = {});