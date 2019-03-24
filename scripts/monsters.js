/**
 * name: inherit from containing object
 *  only player monsters have alternative naming
 * 
 * h  : health
 * mh: max health
 * 
 * pp : physical power
 * ep : element power
 * pd : physical defense
 * ed : element defense
 *      es : evasion stat ???
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
  * Short hand notation of monsters
  */
var monsters = {
    "Bat": {
        id: "Bat",
        // image: {
        //     url: "images/monsters/Pipoya_RPG_Monster_Pack/pipo-enemy001.png"
        // },
        image: "images/monsters/Pipoya_RPG_Monster_Pack/pipo-enemy001.png",
        h: 20,
        mh: 20,
        pp: 20,
        ep: 20,
        pd: 20,
        ed: 20,
        ss: 60,
        type: ["fly"],
        am: ["quick-attack", "swift", "wing-attack"]
        
    },
    "Lightning Bat": {
        id: "Lightning Bat",
        image: {
            url: "images/monsters/Pipoya_RPG_Monster_Pack/pipo-enemy001b.png",
            attribute: "Pipoya RPG Monster Pack"
        },
        h: 20,
        mh: 20,
        pp: 20,
        ep: 30,
        pd: 20,
        ed: 20,
        ss: 60,
        type: ["electic", "fly"],
        am: ["quick-attack", "swift", "electic-ball"]
    },
    "Super Mario Rampage": {
        id: "Super Mario Rampage",
        image: {
            url: "images/monsters/ref/super_mario_rampage.png",
            attribute: "not sure - http://gprime.net/contact/"
        },
        h: 20,
        mh: 20,
        pp: 20,
        ep: 30,
        pd: 20,
        ed: 20,
        ss: 60,
        rarity: "uncommon",
        type: ["guns", "fake"],
        am: ["quick-attack", "swift", "electic-ball"]
    },
    "Super Mario Rampage": {
        id: "Electric Rat",
        image: {
            url: "images/monsters/ref/all_721_pokemon_sprite_sheet_by_cknightsofni_d8lzsow.png",
            sprite: true,
            attribute: "not sure - http://gprime.net/contact/"
        },
        h: 20,
        mh: 20,
        pp: 20,
        ep: 30,
        pd: 20,
        ed: 20,
        ss: 60,
        rarity: "uncommon",
        type: ["guns", "fake"],
        am: ["quick-attack", "swift", "electic-ball"]
    }
    
    images\monsters\ref\all_721_pokemon_sprite_sheet_by_cknightsofni_d8lzsow.png
};

