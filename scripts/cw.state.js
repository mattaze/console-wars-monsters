/**
 * console-wars-basic.js
 * version 0.1
 * state of the game. save and load
 * JSON compatible
 */

cw.state = {
    player: {},
    zones: {
        Playstation: {
            id:"ps",
            name:"Playstation",
            zone:"Playstation",
            floor: 1,
            floors: [
                {
                floor: 0,
                searches: 0,
                stairs: -1,
                boss: -1,
                }
            ]
        }
    }
};

cw.stateTemplate = {
    zone: {
        id:"string",
        name: "string",
        zone: "string",
        floor: 1, //current floor on - start 1, array[floor - 1];
        floors: [
            {
                floor: 0,
                searches: 0,
                stairs: -1,
                boss: -1
            }
        ]
    }
};