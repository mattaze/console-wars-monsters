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
    },
    zones: {
        Playstation: {
            id:"ps",
            name:"Playstation",
            zone:"Playstation",
            deleteme:"i dont need to exist",
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