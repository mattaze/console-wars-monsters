/**
 * console-wars-basic.js
 * version 0.1
 * state of the game. save and load
 * JSON compatible
 */

cw.state = {
    player: {
        /** variable is exposed */
        //self.public_variable = null;
        name: "player name",
        monsters: []
    },
    zones: {
        Playstation: {
            id:"ps",
            name:"Playstation",
            zone:"Playstation",
            floor: 5,
            floors: {
                "1": {
                    floor: 0,
                    searches: 0,
                    stairs: 0,
                    boss: -1,
                }
            }
        }
    }
};

cw.stateTemplate = {
    zone: {
        id:"string",
        name: "string",
        zone: "string",
        floor: 1, //current floor on - start 1, array[floor - 1];
        floors: {
            "1": {
                floor: 0,
                searches: 0,
                stairs: 0,
                boss: -1
            }
        }
    },
    floor: {
        floor: 0,
        searches: 0,
        stairs: 0,
        boss: -1
    }
};