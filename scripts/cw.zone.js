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

        let found = "you found nothing.";
        let rand = Math.random();

        let boss_chance = floor.bossFound == false ? Math.min(0.02*floor.explored, 0.2) : 0;

        let item_chance = 0.1;
        let stairs_chance = floor.stairsFound ? 0 : floor.bossKilled ? 0.2 : 0.1;

        //ability to modify change of encounters. Monster or Items.

        if(rand < boss_chance) {
            found = "you found the <strong>Boss Door</strong>";
            floor.bossFound = true;
        }
        else if(rand < boss_chance + stairs_chance) {
            found = "you found <span class='explore-stairs'>Stairs</span>";
            floor.stairsFound = true;
        }
        else if(rand < boss_chance + stairs_chance + item_chance) {
            let item = self.system.items.FindItem(zone_id, floor_num);

            found = "you found <strong>" + item.name + "</strong>";

            self.system.state.AddItem()
        }
        
        else if(rand < 0.95) {
            //enemy.name
            found = "you have encountered <span class='explore-encounter'>Rampage Mario</span>";
            
            action = "";
        }
        else {
            found = "you found nothing.";
            action = "GotoZone";
            value = "";
        }

        if(debug) {
            found +=  " {rand: " + rand + "}";
        }

        self.system.dom.messageAction(found, "GotoZone", zone_id);
    }

    return self;
}).apply(cw);