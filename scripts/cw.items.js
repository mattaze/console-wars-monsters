Items = {};
Items.ItemTypes = {
    HealingItems: {title:"Healing Item", desc:"Healing Items provide resoration of Healing Points (HP). Might also harm some undead monsters."},
    
};

Items.Library = {
    HealingPotion: {id: "HealingPotion", name:"Healing Potion", desc:"Basic potion of healing. Restores HP.", type:"healing item", impact:"hp", mod:"+20", target:"all"},
    RedShell: {id: "RedShell", name:"Red Shell", desc:"Red shell locks on to the target and goes.", type:"attack item"},

    //capture items
    BugNet: {id: "BugNet", name: "Bug Net", desc:"", type:"capture"}

}