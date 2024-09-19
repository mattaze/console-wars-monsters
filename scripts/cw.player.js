/**
 * console-wars-basic.js
 * version 0.1
 * player operations
 */

(function() {
    //** make this a little bit more context safe */
    let self = this.player = {};
    self.system = this;

    /** variable is exposed */
    self.public_variable = null;

    self.items = [];
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
        self.system.state.player = self.system.state.player || lib.js.copy(self.newPlayerState);

        self.system.state.player.name = lib.js.random(RandomNames);

        let m1 = self.system.monsters.random(1);
        m1.name = m1.id;
        self.system.state.player.monsters.push(m1);

        let m2 = self.system.monsters.random(1);
        m2.name = m2.id;
        self.system.state.player.monsters.push(m2);

        self.system.state.player.items = [
            {id: "HealingPotion", title:"Healing Potion", desc:"", type:"healing item", impact:"hp", mod:"+20", target:"all", quantity:2},
        ];
    };

    self.newPlayerState = {
        /** variable is exposed */
        //self.public_variable = null;
        name: "player name",
        monsters: [],
        items: [],
        zones: {
            Nintendo: {
                id: "Nintendo",
                title: "Nintendo",
                currentFloor: 0,
                maxFloor: 2,
                floors: [
                    {
                        id: 0,
                        floor: 0,
                        explored: 0,
                        bossFound: false,
                        bossKilled: false,
                        stairsFound: false
                    }
                ]
            },
            Playstation: {
                title: "Playstation",
                id: "Playstation",
                currentFloor: 0,
                maxFloor: 2,
                floors: [
                    {
                        id: 0,
                        explored: 0,
                        bossFound: false,
                        bossKilled: false,
                        stairsDown: false
                    }
                ]
            },
            XBox: {
                title: "XBox",
                id: "XBox",
                currentFloor: 0,
                maxFloor: 2,
                floors: [
                    {
                        id: 0,
                        explored: 0,
                        bossFound: false,
                        bossKilled: false,
                        stairsDown: false
                    }
                ]
            },
            Other: {
                title: "Other",
                id: "Other",
                currentFloor: 0,
                maxFloor: 2,
                floors: [
                    {
                        id: 0,
                        explored: 0,
                        bossFound: false,
                        bossKilled: false,
                        stairsDown: false
                    }
                ]
            }
        }
    };


    return self;
}).apply(cw);


var RandomNames = [
"Mewot",
"Jasper",
"Harry",
"Isaac",
"Ethan",
"Reece",
"Cooper",
"Iengat",
"Aiden",
"Evan"];