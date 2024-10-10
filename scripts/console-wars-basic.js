/**
 * console-wars-basic.js
 * version 0.1
 * battle operations
 */

debug = true;

// NEXT TASK: load monster info 0- name, hp, type

// Step 1 - get fight button to make attack action, remove enemy hp
// step 2 - update enemy hp
// step 3 - 


/**
 * global functions:
 * load - first function to call to start a section
 *      cw.battle.load
 *      cw.sounds.load
 * ...
 */


//load players

//bind controls

//attack move

//response move

 //aka system
var cw = cw ?? {};
(function() {
    //this is system
    let self = this;


    /** what mode system currently in : Battle, World, - used for action referencing and which namespace to call */
    self.mode = "battle";
    //self.actionNow = "battle";
    self.actionNow = "menu";
    self.actionStack = ["overworld", "menu", "battle"];
    self.next = function (action, value){
        console.log(`cw.next nextAction: ${self.actionNow} ${action} - ${value}`);

        let menu = ""; //defunt oject, replaced with value parameter

        //sep2024 replace with not using actionNow and next()
        if(self[action]) {
            self[action](value);
        }
        else {
            console.log("calling the old next system - x6543");
            if(menu) {
                self[menu][action]();
                return;
            }

            let next_action = self[self.actionNow].next(action);
            if(next_action) {
                //move to next actionStack
            //    self.actionNow = self.actionStack.push(self.actionNow);
            //    self.actionStack.shift();
                self.actionNow = next_action;
                //call actionNow load
                if(self.actionNow == "battle") {
                    self[self.actionNow].load(self.menu.zoneInfo);
                }
                self[self.actionNow].load();
            }
            else {
                
            }
        }
    };

    
    self.menuItems = {
        back: { t: "🔙 Back", action: "Goto", v: "callfrom" }
    };

    self.g = self.g || {};
    self.g.logo = {
        playstation_logo : "<img class='img-emoji' src='images/logos/playstation_logo.png' />",
        nintendo_logo : "<img class='img-emoji' src='images/logos/nintendo_logo.png' />",
        xbox_logo : "<img class='img-emoji' src='images/logos/xbox_logo.png' />",
    }

    self.menus = {};
    self.menus.hubMenu = [
        {id: "nintendo", t: self.g.logo.nintendo_logo + " Nintendo", action: "GotoZone", value: "Nintendo"},
        {id: "playstation", t: self.g.logo.playstation_logo + " Playstation", action: "GotoZone", value: "Playstation"},
        {id: "xbox", t: self.g.logo.xbox_logo + " XBox", action: "GotoZone", value: "XBox"},
        {id: "other", t: "🕹️ Other", action: "GotoZone", value: "Other"},
        {id: "items", t: "👜 Items", action:"showItems", value:"Hub"},
        {id: "monsters", t: "👹 Monsters", action:"showMonsters", value:"Hub"},
    ];
    self.menus.zoneMenu = [
        {id: "Explore", t: "🔍 Explore", action: "ZoneExplore", value: ""},
        {id: "StairsUp", t: "⬆️ Take Stairs Up", action: "ZoneStairsUp", value: "", disabled: true},
        {id: "StairsDown", t: "⬇️ Take Stairs Down", action: "ZoneStairsDown", value: "", disabled: true},
        {id: "Boss", t: "⚔️ Fight Boss", action: "ZoneFightBoss", value: "", d: true},
        {id: "Items", t: "👜 Items", action:"showItems", value:"Zone"},
        {id: "Monsters", t: "👹 Monsters", action:"ShowMonsters", value:"Zone"},
        {id: "Leave Zone", t: "🔙 Leave Zone", action: "Goto", value: "Hub" }
    ];
    

    self.showItems = function (callfrom) {
        console.log("showItems inital work - 19qv")
        //back to zone
        //back to hub, battle
        let nav = [{ t: "🔙 Back", action: "Goto", v: callfrom }];
        
        self.state.player.items.forEach(item => nav.push({t:item.name, action:"showItem", value: item.id, callfrom: callfrom}));
    
        self.dom.setMenuAndDisplay("action-menu", nav);
    };
    self.showItem = function (item_id, callfrom) {
        console.log("showItem: " + item_id + " callfrom: " + callfrom);
    }

    self.showMonsters = function (callfrom) {
        //self.monsters.showMonster();
        
        //{id: "Leave Zone", t: "🔙 Leave Zone", action: "Goto", value: "Hub" }
        let nav = [{ t: "🔙 Back", action: "Goto", v: callfrom }];
        self.state.player.monsters.forEach(mon => nav.push({t:mon.name, action: "showMonster", value: mon.uid, callfrom: callfrom}));
        
        self.dom.setMenuAndDisplay("action-menu", nav);
    };

    self.showMonster = function (uid, callfrom) {
        console.log("showMonster: " + uid + " callfrom: " + callfrom + " NEED WORK ADDED");
        self.dom.error("showMonster: " + uid + " callfrom: " + callfrom + " NEED WORK ADDED");
    }

    
    self.ZoneExplore = function (zone_floor) {
        console.log("cw.ZoneExplore - searching");

        self.zone.Explore(zone_floor);
    }



    self.startBattle = function () {
        self.battle.load();

        self.actionNow = "battle";
        return "battle";
    };

    self.NewGame = function () {
        self.player.load();
        self.dom.update(cw.state.player.monsters[0], "player");
        
        self.dom.setMenuAndDisplay("action-menu", self.menus.hubMenu);

        let hubinfo = {zone:"Hub", floor: "_", "_floor" : {searches: "_"}}
        self.dom.update(hubinfo, "zone");
        return "hub";
    }

    /**
     * start system
     */
    self.load = function () {
        self.sounds.backgroundMusic(self.sounds.types.music.battle);
       
        
        self.menu.load();
        self.actionNow = "menu";
    };

    // ######### binding section ####
    window.addEventListener('load', self.load);
    //###############################

    return self;
}).apply(cw);

//settings
(function() {
    let self = this.settings = {};
    
    /**
     * display battle numbers to user
     */
    self.battleNumbers = true;
    
    /**
     * auto assign monster level stats or allow for user to choose.
     * stat increase v0.1 system:
     *  each monster type has defined stat preference:
     *  given 4 points each level.
     *  +1 always given to a stat
     *  HP: * <always give to star
     *  pp: 1
     *  ep: 2
     *  sp: 1
     *  df: 2 < 2x more likely then 1
     *  ee: 0 < never give - if type has zero use for this stat, don't waste points
     *  // sum is 6:  so 1/6 change for pp increase.
     */
    self.autoStats = true;

    return self;
}).apply(cw);


//dictionary info is loaded
var dictionary = {
    "Swipe" : "Swipe",
};
/**
 * dictionary list
 */
function dic (text) {
    var value = dictionary[text];
    return value || text;
}

/**
 * console-wars-basic.js
 * version 0.1
 * main menu navigation
 */
(function() {
    let self = this.menu = {};
    self.system = this;
    
    self.hubInfo = {zone:"Hub", floor: "_", "_floor" : {searches: "_"}};
    
    self.zoneInfo = self.hubInfo;
    
    
    self.startMenu = [
        {id: "NewGame", t:"New Game", action:"NewGame", value:""},
        {id: "loadGame", t: "Load Game"}
    ];
    self.loadMenu = [
        "Game 1",
        "Game 2",
        "Game 3"
    ]
    //self.zones = [{ps: "Playstation"}];
    /*self.hubMenu = [
        "Nintendo",
        "Playstation",
        "XBox",
        "Other",
        "Items",
        "Monsters"
    ];
    */
    /* self.zoneMenu = [
        "❌ Explore",
        "⬇️ Take Stairs",
        "Fight Boss",
        "Items",
        "Monsters",
        "Leave Zone"
    ]; */


    /**
     * t: text
     * d: disabled
    **/
    //id would attach as data-action on dom
    

    self.nextAction = "hub";

    self.next = function (action, value) {
        console.log(`2cw.menu: nextAction: ${self.nextAction} ${action}`);

        console.log("i want to remove this - c122");
        
        //sep2024 replace with not using actionNow and next()
        if(self[action]) {
            self[action](value);
        }
        else {
            let action_stack = self[self.nextAction](action);
            if(action_stack) {
                if(action_stack.includes(":")){
                    action_stack = action_stack.split(":");
                    self.nextAction = action_stack[1];
                    return action_stack[0];
                }
                else {
                    self.nextAction = action_stack;
                }
            }
        }
        
        //how to send back to system that nextAction should switch to battle?
        //return action_stack;
        
        self.update();
    };

    self.update = function () {
        self.system.dom.update(self.zoneInfo, "zone");
    };
    
    self._loaded = false;
    self.load = function () {
        if(self._loaded) {
            self.next();
            return;
        }
        self._loaded = true;
        
        //show hub
        //self.setDisplay(self.hubMenu);
        self.setDisplay(self.startMenu);
        self.nextAction = "hub";
        return "hub";
    };
    
    self.explore = function () {
        //successful explore action
        //self.zoneInfo._floor.searches++;
        self.setDisplay(self.system.menus.zoneMenu);
        return "zone";
    };
    
    self.setDisplay = function (array) {
        self.system.dom.setMenu("action-menu", array);
        cw.dom.setDisplay("action-menu");
    };
    
    self.startGame = function (type){
        type = type.replace(" ", "");
        if(self["start" + type]) {
            return self["start" + type]();
        }
    };
    /* self.startNewGame = function () {
        cw.player.load();
        cw.dom.update(cw.state.player.monsters[0], "player");
        
        self.setDisplay(self.hubMenu);
        self.system.dom.update(self.zoneInfo, "zone");
        return "hub";
    }; */
    self.startLoadGame = function () {
        
    };

    self.loadGame = function () {
        let save1 = localStorage.getItem('cw-save-1');
        let save2 = localStorage.getItem('cw-save-2');
        let save3 = localStorage.getItem('cw-save-3');

        let menu = [
            {id: "loadSave1", t: !save1 ? "" : JSON.parse(save1).player.name},
            {id: "loadSave2", t: "another player name"},
            {id: "loadSave2", t: "", d: true},
            {id: "mainMenu", t: "Back"}
        ]

        self.setDisplay(menu);
    }
    
    //pick zone on the HUB menu
    self.hub = function (zone) {
        if(!zone) {
            return;
        }
        /* if(self.startMenu.indexOf(zone) >= 0) {
            return self.startGame(zone);
        } */
        if(self[zone]) {
            self[zone]();
            return "hub";
        }

        //get zone:
        self.zoneInfo = self.getZone(zone);
        
        self.system.dom.update(self.zoneInfo, "zone");
        
        self.setDisplay(self.system.menus.zoneMenu);
        return "zone";
    };
    
    /**
     * @param {String} zone Name or id?
     */
    self.getZone = function (zone) {
        let state_zone = self.system.state.zones[zone];
        if(!state_zone) {
            //create
            state_zone = self.createZone(zone);
        }
        state_zone._floor = self.getFloor(state_zone, state_zone.floor);
        return state_zone;
    };
    
    self.createZone = function (zone) {
        let state_zone = lib.js.copy(self.system.stateTemplate.zone);
        state_zone.name = zone;
        state_zone.id = zone;
        state_zone.zone = zone;
        self.system.state.zones[zone] = state_zone;
        return state_zone;
    };

    /**
     * get floor from zone,
     * creates new floor at request number if does not exist
     * @param {*} zone 
     * @param {*} floor_num 
     */
    self.getFloor = function (zone, floor_num) {
        let floor = zone.floors[floor_num];
        if(!floor) {
            floor = self.createFloor(zone, floor);
        }
        return floor;
    }

    self.createFloor = function (zone, floor_num) {
        let floor = lib.js.copy(self.system.stateTemplate.floor);
        floor.floor = floor_num;
        zone.floors[floor_num] = floor;
        return floor;
    }
    
    self.zone = function (action) {
        //user doing action in zone  
        if (action === "Explore") {
            //searches= 0 : 10% boss, 5% stairs, 5% item, 15% no encounter
            // 
            let encounter = self.encounterRoll(self.zoneInfo._floor);
            console.log(encounter);
            self.zoneInfo._floor.searches++;
            //random for Monster encounter, item, stairs, boss
            
            //enter battle
            return "battle:explore";
        }
        else if (action === "Leave Zone") {
            self.setDisplay(self.hubMenu);
            self.zoneInfo = self.hubInfo;
            return "hub";
        }
    };

    /**
     * roll random number and get 
     * @param {object} floor
     */
    self.encounterRoll = function (floor) {
        let roll = Math.random() * (100 - 0) + 0;
        return self.encounterCheck(floor, roll);
    }

    /**
     * check which encounter for given floor state and roll number
     * @param {object} floor
     * @param {number} roll 0 - 100
     */
    self.encounterCheck = function (floor, roll) {
        let seed = floor.searches;
        let chance = 0;
        console.log(`seed: ${seed}, roll: ${roll}`);
        
        //higher number, higher chance for boss/
        if(floor.boss < 1) {
            //still not found or killed boss
            //.1 at seed0
            //.5 seed 8
            //.05 each floor
            let boss_base = 10;
            let boost = 5 * seed;
            boost = boost < 40 ? boost : 40;
            chance = boss_base + (5 *seed);
            console.log("boss chance: " + chance);
            if(roll < chance) {
                return "boss";
            }
        }
        if(floor.stairs == 0) {
            //is boss defeated
            if(floor.boss == 1) {
                //50%
                chance = 50;
                if(roll < chance) {
                    return "stairs";
                }
            }
            else {
                //10% after boss search
                chance += 10;
                if(roll < chance) {
                    console.log(`stairs: chance ${chance}, roll ${roll}`)
                    return "stairs";
                }
            }
        }
        //item
        chance += 5;
        if(roll < chance) {
            console.log(`item: chance ${chance}, roll ${roll}`)
            return "item";
        }
        chance += 10;
        if(roll < chance) {
            console.log(`nothing: chance ${chance}, roll ${roll}`)
            return "nothing";
        }

        return "monster";
    }

    self.save = function () {
        localStorage.setItem('cw-save-1', JSON.stringify(self.system.state));
    }
    
    /**
     * set message window
     * @param {boolean} control self check to stop next passing button click
     * 
     */
    self.message = function (control, text, return_action) {
        if(return_action) {
            self._messageReturnAction = return_action;
        }
        
        if(control === true, text) {
            cw.dom.message(text);
            return "message";
        }
        else {
            //user clicked while message displayed
            //call message if finished
            // click while loading text will finish text load. dom.message returns true
            // another click - message might still return true if only 1 page of text has been shown so far.
            return cw.dom.message() ? "message" : self._messageReturnAction;
        }
    };
    
    return self;
}).apply(cw);