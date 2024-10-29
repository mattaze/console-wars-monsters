(function() {
    //** make this a little bit more context safe */
    let self = this.items = {};
    self.system = this;

    self.ItemTypes = {
        HealingItems: {name:"Healing Item", desc:"Healing Items provide resoration of Healing Points (HP). Might also harm some undead monsters."},
        
    };

    self.Library = {
        HealingPotion: {id: "HealingPotion", name:"Healing Potion", desc:"Basic potion of healing. Restores HP.", type:"healing item", impact:"hp", mod:"+20", target:"all"},
        RedShell: {id: "RedShell", name:"Red Shell", desc:"Red shell locks on to the target and goes.", type:"attack item", dd:"high accuracy when 1 target. decent damage"},
    
        //capture items
        BugNet: {id: "BugNet", name: "Bug Net", desc:"Net with tiny holes. Great for capturing delicate small bugs.", type:"capture", targetSize:"s,m", target:"bug"},
        FlyTrap: {id: "FlyTrap", name: "Fly Trap", desc:"Sticky paper with a scent that flies are attracted to. Other buys might also get caught on this.", type:"capture", targetSize:"tiny", target:"bug"}
    
    }

    self.system.showItems = function (callfrom) {
        console.log("showItems initial work - 19qv")
        //back to zone
        //back to hub, battle
        let nav = [{ t: "🔙 Back", action: "Goto", value: callfrom }];
        
        self.system.state.player.items.forEach(item => nav.push({t:item.name, action:"showItem", value: item.id, callfrom: callfrom}));
    
        self.system.dom.setMenuAndDisplay("action-menu", nav);
    };





    // notes: items that single version of. cannot find duplicates, and use does not remove them
    //    use:perma permanent 
    // 



    /**
     * pick an item found in location
     * @param {*} zone_id 
     * @param {*} floor 
     * @returns 
     */
    self.FindItem = function (zone_id, floor) {
        let item = lib.js.copy(lib.js.random(self.Library));
        return item;
    }

    return self;
}).apply(cw);