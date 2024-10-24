/**
 * console-wars-basic.js
 * version 0.1
 * zone interactions
 */

var g = g || {};
g.Explore = "Explore";
g.BossRoom = "BossRoom";


(function() {
    //** make this a little bit more context safe */
    let self = this.zone = {};
    self.system = this;

    self.menus = {};
    self.menus.zoneMenu = [
        {id: "Explore", t: "🔍 Explore", action: "ZoneExplore", value: ""},
        {id: "StairsUp", t: "⬆️ Take Stairs Up", action: "ZoneStairsUp", value: "", disabled: true},
        {id: "StairsDown", t: "⬇️ Take Stairs Down", action: "ZoneStairsDown", value: "", disabled: true},
        {id: "BossRoom", t: "⚔️ Fight Boss", action: "ZoneFightBoss", value: "", disabled: true},
        {id: "Items", t: "👜 Items", action:"showItems", value:"Zone"},
        {id: "Monsters", t: "👹 Monsters", action:"showMonsters", value:"Zone"},
        {id: "Leave Zone", t: "🔙 Leave Zone", action: "Goto", value: "Hub" }
    ];

    // go to given or current zone (for back to zone on items and monsters)
    self.system.GotoZone = function (zone_id) {
        console.log("cw.zone GotoZone " + zone_id);

        let player = self.system.state.player;
        let zone = self.system.state.GetZone(zone_id);

        //it would be nice when user loads game, the shown Zone they left from.
        player.CurrentZoneId = zone_id;
        //player.CurrentFloor = zone.floors[zone.currentFloor];
        
        let nav = self.GetFloorNav(zone);

        self.system.dom.setMenuAndDisplay("action-menu", nav);
        
        /*
        Game.Zone.ShowInfo(zone);
        let nav = Game.Zone.GetFloorNav(zone);
    
        Game.Util.ShowNav(zone.title, nav);
        */
        
    };

    self.GetFloorNav =  function(zone) {
        let floor = zone.floors[zone.currentFloor];
        let nav = self.menus.zoneMenu;

        nav.find(z => z.id == g.Explore).v = zone.zoneId;

        let boss_fight = nav.find(z => z.id == "BossRoom");
        boss_fight.t = floor.bossFound ? "Fight Boss ⚔️" : "Boss Not Found ❌";
        if(floor.bossKilled) { boss_fight.d = "Boss Dead 😵"; }
        boss_fight.disabled = floor.bossKilled ? true : !floor.bossFound;

        nav.find(z => z.id == "StairsDown").disabled = !floor.stairsFound;
        nav.find(z => z.id == "StairsUp").disabled = floor.id == 0;
        nav.find(z => z.id == "Explore").value = zone.id + "," + floor.id;
        
        return nav;
    }

    self.Explore = function (zone_id, floor_num) {
        //Game.Util.ShowMessages();

        let floor = self.system.state.GetFloor(zone_id, floor_num);
        floor.explored++;

        let found = "you found nothing.";
        let rand = Math.random();

        let boss_chance = floor.bossFound == false ? Math.min(0.02*floor.explored, 0.2) : 0;

        let item_chance = 0.1;
        let stairs_chance = floor.stairsFound ? 0 : floor.bossKilled ? 0.2 : 0.1;

        //ability to modify change of encounters. Monster or Items.

        let action = "GotoZone";
        let value = zone_id;

        /*
        if(rand < boss_chance) {
            //0 - 0.2
            found = "you found the <strong>Boss Door</strong>";
            floor.bossFound = true;
        }
        else if(rand < boss_chance + stairs_chance) {
            // (0-0.2) + (0 if found || boss killed 0.2/0.1)
            // 0 - 0.4
            found = "you found <span class='explore-stairs'>Stairs</span>";
            floor.stairsFound = true;
        }
        else if(rand < boss_chance + stairs_chance + item_chance) {
            // (0-0.2) + (stairs) + item 0.1
            // 0.1 - 0.5
            let item = self.system.items.FindItem(zone_id, floor_num);

            found = "you found <strong>" + item.name + "</strong>";

            self.system.state.AddItem()
        }
        else if(rand < 0.95) {
            //remaining - 0.1 - 0.95
            //self.system.monsters.random
            
            found = "you have encountered a MONSTER 🧌";

            action = "battle";
            value = "0"; //random encounter
            //object pass: {}
        }
        else {
            found = "you found nothing.";
        }
        */

        let monster_chance = 0.4;
        let nothing_chance = 0.05;

        // alt calulation - plug into array with weights, then rand into that
        // removes ifs, and allows adding in other things dynamiclly
        var event_base = [
            ['boss_door',boss_chance], 
            ['stairs_found', stairs_chance], 
            ['random_monster', monster_chance],
            ['item_found', item_chance],
            ['nothing', nothing_chance]
        ];
        //expand chance to 100 - assuming smallest is 0.01
        let events = [];
        event_base.forEach(chance => events.push(...(Array(chance[1]*100).fill(chance[0]))));
        
        let event = lib.js.random(events);
        action_result = self.events[event](floor);

        // ["","",""] - found message, action, value
        found = action_result[0];
        action = action_result[1] || "GotoZone";
        value = action_result[2] || zone_id;

        if(debug) {
            found +=  " {rand: " + rand + "}";
        }

        //
        //  boss of 10 weight 
        // no find 0.5 weight
        // or iterate through adding each untill over flows

        self.system.dom.messageAction(found, action, value);
    }

    self.events = {};
    self.events.boss_door = function (floor) {
        floor.bossFound = true;
        return ["you found the <strong>Boss Door</strong>"];
    };
    self.events.stairs_found = function (floor) {
        floor.stairsFound = true;
        return ["you found <span class='explore-stairs'>Stairs</span>"];
    };
    self.events.random_monster = function (floor) {
        return ["you have encountered a <span class='danger-text'> MONSTER " + self.system.monsters.randomEmoji()+ "'</span>"
            ,"battle", "0"];
    };
    self.events.item_found = function (floor) {
        let item = self.system.items.FindItem(zone_id, floor_num);
        self.system.state.AddItem()

        return ["you found <strong>" + item.name + "</strong>"];
    }
    self.events.nothing = function (floor) {
        return found = ["you found nothing."];
    }

    return self;
}).apply(cw);