/**
 * name: inherit from containing object id
 *  only player monsters have alternative naming
 * 
 * uid: unique id generated for each caputer monsters- to avoid duplicates
 * 
 * l: level - gain +1 for each xp - start 1
 * xp: experience points - unspent - start 10
 * 
 * h  : health
 * e  : energy/power/memory amount
 * mh: max health
 * hp: health points (1 hp = 5 mh or h)
 * 
 * pp : physical power
 * ep : element power
 * pd : physical defense
 * ed : element defense
 *     
 * ss : speed stat
 * 
 * am : attack moves
 */

/**
 * Issues list:
 * id and main monster loop paramter is the same.
 * or use array, and reference each monster by fixed known array id.
 */

/**
 * shorthand dictionary
 * d.t = dictionary type
 */
var d = {
    t:{
        n: "Normal",
        f: "Flying",
        e: "Electric"
    }
};

 /**
  * Short hand notation of monsters
  */
var monsters = {
    "Bat": {
        id: "Bat",
        name: "Bat",
        // image: {
        //     url: "images/monsters/Pipoya_RPG_Monster_Pack/pipo-enemy001.png"
        // },
        image: "images/monsters/Pipoya_RPG_Monster_Pack/pipo-enemy001.png",
        
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        type: d.t.e,
        am: ["Quick Attack", "Swift", "Wing Attack", "Evade"]
        
    },
    "Lightning Bat": {
        id: "Lightning Bat",
        name: "Lightning Bat",
        image: {
            url: "images/monsters/Pipoya_RPG_Monster_Pack/pipo-enemy001b.png",
            attribute: "Pipoya RPG Monster Pack"
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        type: [d.t.e, d.t.f],
        am: ["Quick Attack", "Swift", "Electric Ball", "Evade"]
    },
    "Super Mario Rampage": {
        id: "Super Mario Rampage",
        name: "Super Mario Rampage",
        image: {
            url: "images/monsters/ref/super_mario_rampage.png",
            attribute: "not sure - http://gprime.net/contact/"
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "uncommon",
        type: ["Shooter", "Normal"],
        am: ["Rampage", "Tackle", "Evade"] //"Scatter Shot", "Bazooka"
    },
    "Electric Rat": {
        id: "Electric Rat",
        name: "Electric Rat",
        image: {
            sprite: true,
            sheet: "pokemon1",
            x: -1920,
            y: 0,
            w: 80,
            h: 80,
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "common",
        type: ["Electric", "Normal"],
        am: ["Quick Attack", "Swift", "Electric Ball", "Evade"]
    },
    "Pikachu": {
        id: "Electric Rat",
        name: "Electric Rat",
        image: {
            sprite: true,
            sheet: "pokemon1",
            x: -1920,
            y: 0,
            w: 80,
            h: 80,
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "legend",
        type: ["Electric", "Normal"],
        am: ["Quick Attack", "Swift", "Electric Ball", "Evade"]
    },
    "Pigeon": {
        id: "Pigeon",
        name: "Pigeon",
        image: {
            sprite: true,
            sheet: "pokemon1",
            x: -1200,
            y: 0,
            w: 80,
            h: 80,
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "common",
        type: "Flying",
        am: ["Quick Attack", "Swift", "Electric Ball", "Evade"]
    },
    "Zombie Bulbasaur": {
        id: "Zombie Bulbasaur",
        name: "Zombie Bulbasaur",
        image: {
            sprite: true,
            sheet: "ZombiePokemon1",
            x: 0,
            y: 0,
            w: 180,
            h: 180,
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "uncommon",
        type: ["Zombie", "Grass"],
        am: ["Bite", "Slow Attack", "Zombie Bite", "Evade"]
    },
    "Zombie Charmander": {
        id: "Zombie Charmander",
        name: "Zombie Charmander",
        image: {
            sprite: true,
            sheet: "ZombiePokemon1",
            x: 0,
            y: -360,
            w: 180,
            h: 180,
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "uncommon",
        type: ["Zombie", "Fire"],
        am: ["Swift", "Slow Attack", "Bad Breath", "Evade"]
    },
    "Zombie Abra": {
        id: "Zombie Abra",
        name: "Zombie Abra",
        image: {
            sprite: true,
            sheet: "ZombiePokemon1",
            x: -540,
            y: -360,
            w: 180,
            h: 180,
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        rarity: "uncommon",
        type: ["Zombie", "Psychic"],
        am: ["Tackle", "Swift", "Slow Attack", "Evade"]
    },
    "Master Chief 1": {
        id: "Master Chief 1",
        name: "Master Chief 1",
        image: {
            url: "images/monsters/halo/halo_master_chief_1.jpg",
            attribute: "not sure - reddit"
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        zone: "XBox",
        console: "XBox",
        rarity: "uncommon",
        type: ["Shooter", "Normal"],
        am: ["Rampage", "Tackle", "Evade"] //"Scatter Shot", "Bazooka"
    },
    "Cursor": {
        id: "Cursor",
        name: "Cursor",
        image: {
            url: "images/monsters/pc/cursor.png",
            attribute: "pixel art"
        },
        h: 5,
        e: 100,
        mh: 5,
        hp: 1,
        
        pp: 1,
        ep: 1,
        pd: 1,
        ed: 1,
        ss: 1,
        zone: "PC",
        console: "PC",
        rarity: "uncommon",
        type: ["Icon"],
        am: ["Drag", "Click", "Double Click", "Evade"] //"Scatter Shot", "Bazooka"
    },
};

// Item: 

var SpriteSheets = {
    pokemon1: {
        url: "images/monsters/ref/all_721_pokemon_sprite_sheet_by_cknightsofni_d8lzsow.png",
        attribute: "cknightsofni_d8lzsow - pokemon co",
        w: 2000,
        h: 4090
    },
    ZombiePokemon1: {
        url: "images/monsters/ref/pokemon_zombie_.jpg",
        attribute: "http://youbentmywookie.com/wtf/japanese-authorities-ask-citizens-not-to-hunt-pokemon-at-fukushima-23396 - pokemon co",
        w: 1080,
        h: 540
    }
};

//repeat will run attack again in next round
//multi will do attack multiple times in one round

//if type is not defined - normal
//m: move type : pp Physical  ep : Elemental
var attacks = {
    "Quick Attack": {d: "User attacks first.", m: "pp", p: 40, e: 20, a:100, mod: {priority: 1}},
    "Swift": {d: "User attacks first.", m: "pp", p: 60, e: 40, a:130, mod:{priority: 1} },
    "Rampage": {d: "Mindlessly attacks for a few turns", m: "pp", p: 110, e: 70, a: 70, mod:{repeat: [2, 6]}},
    "Slow Attack": {d:"User goes last.", m: "pp", p: 40, e: 0, a: 100, mod: {priority: 2}},
    "Tackle": {d: "A full-body charge attack.", m:"pp", p:40, e: 10, a: 100},
    
    "Wing Attack": {d: "Strikes the target with wings.", m:"pp", t: d.t.f, p: 60, e:35, a: 100 },
    "Electric Ball": {t: "Electric", m:"ep", p: 40, e: 25, a: 90},
    "Bite":  {t: "Dark", m: "pp", p: 40, e: 25, a: 90},
    
    "Evade": {d: "Attempt to dodge", m:"pp", p:"0", e: -20, a:0, mod:{boost:"ss", repeat: 1, add:"e"}},
    "Defense Stance": {d: "Brace in defense", m: "self", e: 30, mod:{boost: "pd", repeat: 1, add:"e"}},
    
    "Bad Breath": {t: "Poison", m:"ep", p: 50, e: 20, a: 70, mod:{poison:1}},
    "Zombie Bite": {d:"Chance to convert to wild zombie on kill.", t: "Zombie", m:"pp", p: 20, e: 40, a: 90, mod:{convert:"wild.zombie"}},
    
    "Drag": {t: "Electric", m:"ep", p: 30, e: 30, a: 70},
    "Click": {t: "Electric", m:"ep", p: 40, e: 35, a: 90},
    "Double Click": {t: "Electric", m:"ep", p: 60, e: 40, a: 90, mod:{multi:2}},
};

//attack that critical if target.p is low.



/*
    Nintendo:

    Metal Mario - only weak to water

    Jump Man (arcade) -> Super Mario (nes) -> Super Mario World (snes)
    Mario 64 -> Mario Cube -> Mario Wii -> Mario Switch

    Link 2d -> Link 3d
    Link Legend -> Link Past -> Link Time -> Link Waker -> Link Princess
        -> Link Sword -> Link Wild

    Link mobile -- Link Awakening -> Link 4 swords -> Link Hourglass -> 



    Other / 
 */