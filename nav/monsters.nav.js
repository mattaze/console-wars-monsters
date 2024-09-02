


Game.ShowMonsters = function (callfrom) {
        //back to zone
    //back to hub, battle
    let nav = [{ d: "Back 🔙", action: "Goto", v: callfrom }];
    
    Player.Monsters.forEach(mon => nav.push({d:mon.name, action:"ShowMonster", v: item.id, callfrom: callfrom}));

    Game.DisplayPrompt(nav);
    Game.Util.ShowOptions();
}

Game.ShowMonster = function (id, callfrom) {
    
}