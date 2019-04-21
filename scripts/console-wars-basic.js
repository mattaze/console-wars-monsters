/**
 * console-wars-basic.js
 * version 0.1
 * battle operations
 */

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
var cw = {};
(function() {
    let self = this;

    /** what mode system currently in : Battle, World, - used for action referencing and which namespace to call */
    self.mode = "battle";
    //self.actionNow = "battle";
    self.actionNow = "menu";
    self.actionStack = ["overworld", "menu", "battle"];
    self.next = function(input){
        let next_action = self[self.actionNow].next(input);
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
    };
    
    self.startBattle = function() {
        self.battle.load();
        
        self.actionNow = "battle";
        return "battle";
    };

    /**
     * start system
     */
    self.load = function() {
        self.sounds.backgroundMusic(self.sounds.types.music.battle);
       
        self.player.load();
        self.dom.update(self.player.monsters[0], "player");
        
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
    "Swipe" : "Swipe"
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
    
    
    //self.zones = [{ps: "Playstation"}];
    self.hubMenu = [
        "Nintendo",
        "Playstation",
        "XBox",
        "Other",
        "Items",
        "Monsters"
    ];
    self.zoneMenu = [
        "Explore",
        "Take Stairs",
        "Fight Boss",
        "Items",
        "Monsters",
        "Leave Zone"
    ];
    //id would attach as data-action on dom
    self.hubMenuADV = [
        {id: "nintendo", t: "Nintendo"},
        {id: "playstation", t: "Playstation"},
        {id: "xbox", t: "XBox"},
        {id: "other", t: "Other"},
        {id: "items", t: "Items"},
        {id: "monsters", t: "Monsters"},
    ];
    
    self.nextAction = "hub";
    self.next = function(action) {
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
        
        //how to send back to system that nextAction should switch to battle?
        //return action_stack;
        
        self.update();
    };
    
    self.update = function() {
        self.system.dom.update(self.zoneInfo, "zone");
    };
    
    self._loaded = false;
    self.load = function() {
        if(self._loaded) {
            self.next();
            return;
        }
        self._loaded = true;
        
        //show hub
        self.setDisplay(self.hubMenu);
        self.system.dom.update(self.zoneInfo, "zone");
        self.nextAction = "hub";
        return "hub";
    };
    
    self.explore = function() {
        //successful explore action
        //self.zoneInfo._floor.searches++;
        self.setDisplay(self.zoneMenu);
        return "zone";
    };
    
    self.setDisplay = function(array) {
        self.system.dom.setMenu("action-menu", array);
        cw.dom.setDisplay("action-menu");
    };
    
    //pick zone on the HUB menu
    self.hub = function(zone) {
        if(!zone) {
            return;
        }
        //ignore Monsters/Items
        if(zone == "Monsters" || zone == "Items") {
            return;
        }
        
        //get zone:
        self.zoneInfo = self.getZone(zone);
        
        self.system.dom.update(self.zoneInfo, "zone");
        
        self.setDisplay(self.zoneMenu);
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
        state_zone._floor = state_zone.floors[state_zone.floor - 1];
        return state_zone;
    };
    
    self.createZone = function(zone) {
        let state_zone = lib.js.copy(self.system.stateTemplate.zone);
        state_zone.name = zone;
        state_zone.id = zone;
        state_zone.zone = zone;
        self.system.state.zones[zone] = state_zone;
        return state_zone;
    };
    
    self.zone = function (action) {
        //user doing action in zone  
        if (action === "Explore") {
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
     * set message window
     * @param {boolean} control self check to stop next passing button click
     * 
     */
    self.message = function(control, text, return_action) {
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