Items = {};
Items.

Items.Library = 

(function() {
    //** make this a little bit more context safe */
    let self = this.items = {};
    self.system = this;

    self.ItemTypes = {
        HealingItems: {title:"Healing Item", desc:"Healing Items provide resoration of Healing Points (HP). Might also harm some undead monsters."},
        
    };

    self.Library = {
        HealingPotion: {id: "HealingPotion", name:"Healing Potion", desc:"Basic potion of healing. Restores HP.", type:"healing item", impact:"hp", mod:"+20", target:"all"},
        RedShell: {id: "RedShell", name:"Red Shell", desc:"Red shell locks on to the target and goes.", type:"attack item", dd:"high accuracy when 1 target. decent damage"},
    
        //capture items
        BugNet: {id: "BugNet", name: "Bug Net", desc:"Net with tiny holes. Great for capturing delicate small bugs.", type:"capture", targetSize:"s,m", target:"bug"},
        FlyTrap: {id: "FlyTrap", name: "Fly Trap", desc:"Sticky paper with a scent that flies are attracted to. Other buys might also get caught on this.", type:"capture", targetSize:"tiny", target:"bug"}
    
    }

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