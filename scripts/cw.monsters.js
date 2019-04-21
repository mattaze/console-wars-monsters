/**
 * console-wars-basic.js
 * version 0.1
 * monster operations
 */

(function() {
    let self = this;
    self._count = 0;
    self.count = function() {
        if(self._count == 0) {
            self._count = lib.js.propertiesCount(monsters);
        }
        return self._count;
    };
    
    self.load = function() {
        
    };
    window.addEventListener('load', self.load);
    
    /**
     * spend XP for random monsters and if using auto XP mode.
     * @param {Monster} monster randomly spend all unused xp, according to base monster info
     */
    self.randomXPSpend = function(monster) {
        
    };
    
    /**
     * 
     * @param {Number} lvl of monster to generate
     */
    self.random = function(level) {
        if(!level) {
            level = 1;
        }
        //let max = self.count;
        
        let keys = Object.keys(monsters);
        let monster = lib.js.copy(
            monsters[
                keys[Math.floor(Math.random() * keys.length)]
            ]
        );
        monster.l = level;
        monster.xp = 10 + level - 1;
        monster.h = 1;
        
        return monster;
        //bitwise version of floor  return obj[keys[ keys.length * Math.random() << 0]];
        

        // let rand = Math.round(Math.random() * self.count()) - 1;
        // let counter = 0;
        // let return_monster;
        // for(let attribute in monsters) {
        //     if(counter >= rand) {
        //         return_monster = monsters[attribute];
        //         break;
        //     }
        //     counter++;
        // }
        //return lib.js.copy(return_monster);
    };

    /**
     * roll a monster into long format
     */
    self.roll = function() {
        //pp => physical-power
        //am => attacks
    };

    return self;
}).apply(cw.monsters = {});