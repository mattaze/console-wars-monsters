Game.ZoneExplore = function (zoneId) {
    // text action
    // click anywhere
    //   is encounter, find key, find stairs, 

    let zone = Game.State.CurrentZone;

    let floor = zone.floors[zone.currentFloor];
    
    Game.ZoneExploreTest(zone);
    floor.explored++;
}

Game.ZoneFightBoss = function (zoneId) {
    let floor = Game.Zone.GetFloorCurrent();

    let message = "you enter the boss room and kill them.";
    floor.bossKilled = true;

    Game.Util.ShowMessage(message, "GotoZone");
}

Game.ZoneStairsUp = function (zoneId) {
    let floor = Game.Zone.GetFloorCurrent();
    if(floor.id == 0) {
        message = "you are at the top floor."
    }
    message = "you take the stairs up ⬆️ to floor: " + floor
    
    Game.Util.ShowMessage(message, "GotoZone");
}

Game.ZoneStairsDown = function (zoneId) {
    let floor = Game.Zone.GetFloorCurrent();
    let message = "";
    if(floor.stairsFound == false) {
        message = "stairs not found.";
    }
    else {
        floor = Game.Zone.MoveDownFloor(floor);
        message = "you take the stairs down ⬇️ to floor: " + floor.floor;
    }

    Game.Util.ShowMessage(message, "GotoZone");
}

Game.Zone = {};

Game.Zone.MoveDownFloor = function (floor) {
    return Game.Zone.MoveFloor(floor, 1);
}
Game.Zone.MoveUpFloor = function (floor) {
    return Game.Zone.MoveFloor(florr, -1);
}
Game.Zone.MoveFloor = function (floor, direction) {
    let zone = Game.State.CurrentZone;
    
    let floor_number = floor.floor + direction;
    floor = zone.floors[floor_number];
    // if max floor?

    if(!floor) {
        //make new floor
        floor = {id: floor_number, floor: floor_number};
        zone.floors[floor_number] = floor;
    }
    zone.currentFloor = floor.id;

    return floor;
}

Game.Zone.GetFloor = function (zone) {
    return zone.floors[zone.currentFloor];
}
Game.Zone.GetFloorCurrent = function() {
    return Game.Zone.GetFloor(Game.State.CurrentZone);
}

Game.Zone.GetFloorNav = function(zone) {
    let floor = zone.floors[zone.currentFloor];
    let nav = Navs.Zone;

    nav.find(z => z.id == g.Explore).v = zone.zoneId;
    let boss_fight = nav.find(z => z.id == g.BossRoom);

    boss_fight.d = floor.bossFound ? "Fight Boss ⚔️" : "Boss Not Found ❌";
    if(floor.bossKilled) { boss_fight.d = "Boss Dead 😵"; }
    boss_fight.disabled = floor.bossKilled ? true : !floor.bossFound;

    nav.find(z => z.id == "stairsdown").disabled = !floor.stairsFound;
    nav.find(z => z.id == "stairsup").disabled = floor.id == 0;
    
    return nav;
}

Game.Zone.ShowInfo = function (zone) {
    let floor = Game.Zone.GetFloor(zone);
    cw.dom.update(floor, "zone");

    // util.setContentByObject(floor, "floor", "zi-");
    // util.setContentByObject(floor, "explored", "zi-");
    // util.setContent("zi-stairsFound", floor.stairsFound);
    // util.setContent("zi-bossFound", floor.bossFound);
    // util.setContent("zi-bossKilled", floor.bossKilled);

}
util.setContentByObject = function (obj, id, prefix) {
    util.setContent(prefix + id, obj[id]);
}

/*
    Defeat Boss => access to stairs down
    or
    finding stairs seperate to boss


*/

function rnd(n) { n = Number.isInteger(n) && n>0 ? n : 100; let min=1; while(n--){let rand = Math.random(); min = rand<min ? rand : min}; console.log(min);}

// n = n<0 ? 100: n!-num for(var x=0; x<n;)}

console.log()

Game.ZoneExploreTest = function (zone) {
    Game.Util.ShowMessages();

    let floor = Game.Zone.GetFloor(zone);
    let found = "you found nothing.";
    let rand = Math.random();

    let boss_chance = floor.bossFound == false ? Math.min(0.02*floor.explored, 0.2) : 0;

    let item_chance = 0.1;
    let stairs_chance = floor.stairsFound ? 0 : floor.bossKilled ? 0.2 : 0.1;


    if(rand < boss_chance) {
        found = "you found the <strong>Boss Door</strong>";
        floor.bossFound = true;
    }
    else if(rand < boss_chance + stairs_chance) {
        found = "you found <span class='explore-stairs'>Stairs</span>";
        floor.stairsFound = true;
    }
    else if(rand < boss_chance + stairs_chance + item_chance) {
        found = "you found <strong>Pokeball</strong>";
    }
    
    else if(rand < 0.95) {
        //enemy.name
        found = "you have encountered <span class='explore-encounter'>Rampage Mario</span>";
    }
    else {
        found = "you found nothing.";
    }

    if(debug) {
        found +=  " {rand: " + rand + "}";
    }

    Game.Util.ShowMessage(found, "GotoZone");
}