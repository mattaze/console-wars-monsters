/**
 * console-wars-basic.js
 * version 0.1
 * state of the game. save and load
 * JSON compatible
 */


// cw.state = {
//     player: {
//         /** variable is exposed */
//         //self.public_variable = null;
//         name: "player name",
//         monsters: [],
//         items: [],
//         zones: {
//             Nintendo: {
//                 id: "Nintendo",
//                 title: "Nintendo",
//                 currentFloor: 0,
//                 maxFloor: 2,
//                 floors: [
//                     {
//                         id: 0,
//                         floor: 0,
//                         explored: 0,
//                         bossFound: false,
//                         bossKilled: false,
//                         stairsFound: false
//                     }
//                 ]
//             },
//             Playstation: {
//                 title: "Playstation",
//                 id: "Playstation",
//                 currentFloor: 0,
//                 maxFloor: 2,
//                 floors: [
//                     {
//                         id: 0,
//                         explored: 0,
//                         bossFound: false,
//                         bossKilled: false,
//                         stairsDown: false
//                     }
//                 ]
//             },
//             XBox: {
//                 title: "XBox",
//                 id: "XBox",
//                 currentFloor: 0,
//                 maxFloor: 2,
//                 floors: [
//                     {
//                         id: 0,
//                         explored: 0,
//                         bossFound: false,
//                         bossKilled: false,
//                         stairsDown: false
//                     }
//                 ]
//             },
//             Other: {
//                 title: "Other",
//                 id: "Other",
//                 currentFloor: 0,
//                 maxFloor: 2,
//                 floors: [
//                     {
//                         id: 0,
//                         explored: 0,
//                         bossFound: false,
//                         bossKilled: false,
//                         stairsDown: false
//                     }
//                 ]
//             }
//         }
//     },
//     zones: {
//         Playstation: {
//             id:"ps",
//             name:"Playstation",
//             zone:"Playstation",
//             deleteme:"i dont need to exist",
//             floor: 5,
//             floors: {
//                 "1": {
//                     floor: 0,
//                     searches: 0,
//                     stairs: 0,
//                     boss: -1,
//                 }
//             }
//         }
//     }
// };


(function() {
    //** make this a little bit more context safe */
    let self = this.state = {};
    self.system = this;

    // self.player

    self.GetFloor = function (zone_id, floor_num) {
        let zone = self.GetZone(zone_id);
        let floor = zone.floors[zone.currentFloor];
        return floor;
    };

    self.GetZone = function (zone_id) {
        //null zone_id should be removed
        if(!zone_id) { console.error("zone id is null, this should be removed and value put into button press. CurrentZoneId = " + self.player.CurrentZoneId )};

        let zone = zone_id ? self.player.zones[zone_id] : self.player.zones[self.player.CurrentZoneId];

        return zone;
    }


    return self;
}).apply(cw);
