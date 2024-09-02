/*
    fun features:
        God mode: if input name = God
            ask, are you a God or The God
            would you like God Mode Powers enabled
            
            explorer - all areas found Stairs/Boss
            take no direct damage
        

 */

debug = true;


Navs = {
    Main: [
        { d: "New Game", "action": "NewGame", v: "" },
        { d: "Load Game", action: "GotoLoadMenu", v: "" }
    ],
    LoadGame: [
        { d: "Save 1", action: "LoadGame", v: "1" },
        { d: "Save 2", action: "LoadGame", v: "2" },
        { d: "Save 3", action: "LoadGame", v: "3" },
        { d: "Back 🔙", action: "Goto", v: "Welcome" }
    ],
    Hub: [
        //{ d: "Nintendo", action: "GotoZone", v: "Nintendo" },
        { html: "Nintendo <img class='img-emoji' src='nintendo_logo.png' />", action: "GotoZone", v: "Nintendo" },
        { html: "Playstation <img class='img-emoji' src='playstation_logo.png' />", action: "GotoZone", v: "Playstation" },
        { html: "XBox <img class='img-emoji' src='xbox_logo.png' />", action: "GotoZone", v: "XBox" },
        { d: "Other 🕹️", action: "GotoZone", v: "Other" },
        { d: "Items 🎒", action: "ShowItems", v: "Hub" },
        { d: "Monsters 👾", action: "ShowMonsters", v: "Hub" }
    ],
    Zone: [
        { id: g.Explore, d: "Explore 🔎", action: "ZoneExplore", v: "" },
        { id: g.BossRoom, d: "Fight Boss ⚔️", action: "ZoneFightBoss", v: "" },
        { id:"stairsdown", d: "Take Stairs Down ⬇️", action: "ZoneStairsDown", v: "" },
        { id:"stairsup", d: "Take Stairs Up ⬆️", action: "ZoneStairsUp", v: "" },
        { d: "Items 🎒🧰", action: "ShowItems", v: "Zone" },
        { d: "Monsters 👾", action: "ShowMonsters", v: "Zone" },
        { d: "Leave Zone 🔙", action: "Goto", v: "Hub" }
    ],

    Items: [
        { dynamic: "items" },
        { d: "back", v: "" }
    ]
}


//repeat will run attack again in next round
//multi will do attack multiple times in one round

//if type is not defined - normal
//m: move type : pp Physical  ep : Elemental
var attacks = {
    "Quick Attack": {d: "User attacks first.", m: "pp", p: 40, e: 20, a:100, mod: {priority: 1}},
    "Swift": {d: "User attacks first.", m: "pp", p: 60, e: 40, a:130, mod:{priority: 1} },
    "Drag": {t: "Electric", m:"ep", p: 30, e: 30, a: 70},
}

//target: all, host or player, own monsters, enemey

var Player = {
    Items: [
        {id: "HealingPotion", title:"Healing Potion", desc:"", type:"healing item", impact:"hp", mod:"+20", target:"all"},
        {id: "RedShell", title:"Red Shell", desc:"Red shell locks on to the target and goes.", type:"attack item"},


        //state boost potion
        //throw items at enemy - red shell higher change then green.
        //player stat boost - finding items, finding boss, finding stairs
        //                    avoiding enimes in explore

    ],
    Monsters: []
};


var Game = {};

Game.State = {
    CurrentZone: "", // would be nice if this not state, but part of UI info
    Player: {
        name: "player 1",
        items: []
    }
};

Game.Load = function () {
    document.body.addEventListener("click", Game.BodyClick);

    Game.gotoWelcome();
}


Game.GotoMappings = {
    gotoWelcome: {title: "Welcome", nav: Navs.Main},
    NewGame: {title: "Hub", nav: Navs.Hub},
    Hub: ["Hub", Navs.Hub],
    Zone: Game.GotoZone
}

Game.Goto = function(value) {
    let nav = Game.GotoMappings[value];
    if(typeof nav === 'function') {
        nav();
    }
    else {
        Game.Util.ShowNav(nav[0], nav[1]);
    }
}



// menu navigation logic ======================================================

Game.gotoWelcome = function() {
    Game.Util.ShowNav("Welcome", Navs.Main);
}

Game.NewGame = function () {
    Game.Util.ShowNav("Hub", Navs.Hub);
}

Game.GotoZone = function (zoneId) {
    let zone = zoneId ? Game.Zones[zoneId] : Game.State.CurrentZone;

    Game.State.CurrentZone = zone;
    Game.State.CurrentFloor = zone.floors[zone.currentFloor];


    Game.Zone.ShowInfo(zone);
    let nav = Game.Zone.GetFloorNav(zone);

    Game.Util.ShowNav(zone.title, nav);

}

Game.GotoLoadMenu = function () {
    let save1 = Game.Util.GetSave("game-save-1");
    let save2 = Game.Util.GetSave("game-save-2");
    let save3 = Game.Util.GetSave("game-save-3");
    
    var nav = [
        { d: save1 ? save1.name : "Save 1", action: "LoadGame", v: "1", disabled: save1 ? true : false },
        { d: save2 ? save2.name : "Save 2", action: "LoadGame", v: "2" },
        { d: save3 ? save3.name : "Save 3", action: "LoadGame", v: "3" },
        { d: "Back", action: "gotoWelcome", v: "Welcome" }
    ]
    Game.Util.ShowNav("Load Game", nav);
}

Game.Save = {};
Game.Save.GetSaveMenuItem = function (save, number) {
    return { d: save ? save.name : "Save " + number, action: "LoadGame", v: "1", disabled: save ? true : false }
}






//general functional code =====================================================

Game.BodyClick = function BodyClick(event) {
    try{
        let optionElm = event.target.closest(".option");
        if (!optionElm) { return true; }
    
        //let action = event.target.dataset.action;
        let action = optionElm.dataset.action;
        if (action) {
            let value = optionElm.dataset.value;
            Game[action](value);
        }
    }
    catch(error) {
        document.getElementById("errorlog").innerHTML = error.message;
        throw error;
    }
}

Game.DisplayPrompt = function (menu) {
    //document.getElementById("message").textContent = menu.message;
    let optionsElm = document.getElementById("options");

    var list = document.createElement('ol');

    menu.forEach(listOptions);
    function listOptions(option, index, arr) {
        let list_item = document.createElement('li');
        let button = document.createElement("button");
        list_item.appendChild(button);

        //li.setAttribute('class','option');

        if(option.html) {
            button.innerHTML = option.html;
        }
        else {
            button.textContent = option.d;
        }

        button.dataset.action = option.action;
        button.dataset.value = option.v;
        button.disabled = option.disabled;

        button.classList.add("option");

        list.appendChild(list_item);
    }

    optionsElm.innerHTML = "";
    optionsElm.appendChild(list);
};

Game.SetTitle = function (content) {
    util.setContent("main-title", content);
}

Game.Util = {};
Game.Util.ShowNav = function (title, nav) {
    Game.Util.ShowOptions();

    Game.SetTitle(title);
    Game.DisplayPrompt(nav);
}

Game.Util.ShowMessages = function () {
    Game.Util.Hide("options");
    Game.Util.Show("messages");
}


Game.Util.ShowMessage = function (message, next_action) {
    let found_elm = document.createElement("p");
    found_elm.innerHTML = message;

    var messages = util.getElm("messages");
    messages.appendChild(found_elm); 

    messages.dataset.action = next_action;

    Game.Util.ShowMessages()

    messages.scrollTop = messages.scrollHeight;

}

Game.Util.ShowOptions = function () {
    Game.Util.Hide("messages");
    Game.Util.Show("options");
}

Game.Util.Show = function (id) {
    util.getElm(id).classList.remove("hidden");
}
Game.Util.Hide = function(id) {
    util.getElm(id).classList.add("hidden");
}

Game.Util.HasSave = function (key) {
    return localStorage.getItem(key) != null;
}
Game.Util.GetSave = function (key) {
    if(key == "game-save-2") {
        return {what:"game save", name:"my name"};
    }

    let json = localStorage.getItem(key);
    if(json != null) {
        return JSON.parse(json);
    }
    return false;
}









Game.Load();