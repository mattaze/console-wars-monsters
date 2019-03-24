/**
 * console-wars-basic.js
 * version 0.1
 * player operations
 */

(function() {
    //** make this a little bit more context safe */
    let self = this;

    /** variable is exposed */
    self.public_variable = null;

    self.monsters = [];
    self.name = "player name";

    /** underscore notation for private, but this is still exposed publicly */
    self._exposed_private = null;

    /** private enclosed variable to this namespace */
    let private_variable = null;

    /**
     * 
     * @param {*} test 
     */
    function private_function (test) {
        console.log(text);
    }

    /**
     * load player data
     */
    self.load = function() {
        let first_monster = cw.monsters.random();
        first_monster.name = "Players Bat";
        self.monsters.push(first_monster);
    };

    return self;
}).apply(cw.player = {});