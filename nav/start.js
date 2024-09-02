Game.Test = function () {
    let mon = cw.monsters.random(1);
    mon.name = mon.id;
    Player.Monsters.push(mon);

    let mon2 = cw.monsters.random(1);
    mon2.name = mon2.id;
    Player.Monsters.push(mon2);
}

Game.Load = function () {
    document.body.addEventListener("click", Game.BodyClick);

    Game.Test();

    Game.gotoWelcome();
}

Game.Load();