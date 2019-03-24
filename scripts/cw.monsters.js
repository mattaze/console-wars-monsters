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
    
    self.random = function() {
        //let max = self.count;

        let rand = Math.round(Math.random() * self.count()) - 1;
        let counter = 0;
        let return_monster;
        for(let attribute in monsters) {
            if(counter >= rand) {
                return_monster = monsters[attribute];
                break;
            }
            counter++;
        }
        return lib.js.copy(return_monster);
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