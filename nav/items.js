//{id: "HealingPotion", title:"Healing Potion", desc:"", type:"healing item", impact:"hp", mod:"+20", target:"all"},
//{id: "RedShell", title:"Red Shell", desc:"Red shell locks on to the target and goes.", type:"attack item"},

//values: hub, zone, battle


Game.ShowItems = function (callfrom) {
    //back to zone
    //back to hub, battle
    let nav = [{ d: "Back 🔙", action: "Goto", v: callfrom }];
    
    Player.Items.forEach(item => nav.push({d:item.title, action:"ShowItem", v: item.id, callfrom: callfrom}));

    Game.DisplayPrompt(nav);
    Game.Util.ShowOptions();
    //hub, zone, battle
    //    monster
    //{ id:"Explore", d: "Explore", action: "ItemDetail", v: "request_menu" }
}




Game.ShowItem = function(value, callfrom) {
    //zone/hub -> item use on self or monsters
    //battle -> includes enemy

    //back to item, or use
    // condition for use?
    let item = util.find(Player.Items, "id", value);

    let nav = Game.Items.ShowItemNav;
    util.find(nav, "id", "use").v = value;
    util.find(nav, "id", "back").v = callfrom;
    util.find(nav, "id", "discard").v = callfrom;

    cw.dom.update(item, "item");
    Game.Util.ShowItem(nav);

}

Game.Items = {

};
Game.Items.ShowItemNav = [
    { id:"use", d: "Use", action: "UseItem", v: "-" },
    { id:"back", d: "Back", action: "ShowItems", v: "" },
    //discard how many
    { id:"discard", d: "Discard", action: "Discard", v: "-item-" }
];


Game.Library = {};
Game.Library.ItemTypes = {
    HealingItems: {title:"Healing Item", desc:"Healing Items provide resoration of Healing Points (HP). Might also harm some undead monsters."},
    
};

Game.Library.Items = {
    HealingPotion: {id: "HealingPotion", title:"Healing Potion", desc:"Basic potion of healing. Restores HP.", type:"healing item", impact:"hp", mod:"+20", target:"all"},
    RedShell: {id: "RedShell", title:"Red Shell", desc:"Red shell locks on to the target and goes.", type:"attack item"},

    //capture items
    BugNet: {id: "BugNet", title: "Bug Net", desc:"", type:"capture"}

}

//Game.Items.List
