//"use strict";

(function() {
    let self = this.battle = {}
    self.system =  this;

    self.menus = {};
    self.menus.battleMenu = [
        {id: "attacksMenu", t: "🤺 Attack", action: "battle.attacksMenu", value: ""},
        {id: "Items", t: "👜 Items", action:"ShowItems", value:"Zone"},
        {id: "Monsters", t: "👹 Monsters", action:"battle.ShowMonsters", value:"Zone"},
        {id: "Leave Zone", t: "🏃‍♂️ Run", action: "BattleRun", value: "", disabled: false }
    ];
    
    
    // 2024 function
    self.start = function (val) {
        self.load();
        self.system.dom.messageAction(self._enemy.id + " approaches!", "battle.menu");
    }

    self.menu = function (val) {
        nav = self.menus.battleMenu;
        self.system.dom.setMenuAndDisplay("action-menu", nav);
    }

    self.attacksMenu = function () {
        let nav = self.system.monsters.getMonsterMovesNav(self._player, "battle.attack", "unknown");

        nav.push({t: "🔙 Back", action: "battle.menu"});
        self.system.dom.setMenuAndDisplay("action-menu", nav);
        //self.system.dom.setMenu('battle-menu-attack', self._player.am);
    }

    
    /**
     * start battle
     */
    self.load = function(zone_info) {
        self._player = self.system.state.player.monsters[0];
        if(zone_info) {
         //   self.zoneInfo = zone_info || {};
        }
        
        //self._enemy = self.system.monsters.random(self.zoneInfo.floor);
        self._enemy = self.system.monsters.random();
        
        document.querySelector('.right-column').classList.remove('hide');
        self.update();

        //clear MessageRoll at start of each new battle.
        self.system.dom.messageRollClear();

        self.system.sounds.play(self.system.sounds.types.other.encounter);
    };





    // ###################################################
    // ###################################
    // ###################



    
    self.actionStack = ["menu", "action", "actionPriority", "isDead"];
    self.nextAction = "menu";
    //actionStack removed in favour of nextAction - all functions need to return something
    //or goes back to menu
    self.next = function(action) {
        //let next_action = self[self.actionStack[0]](action);
        let next_action = self[self.nextAction](action);
        
        if(next_action === null) {
            self.nextAction = "menu";
            
            //remove first action
            //self.actionStack.shift();
        }
        // else if(next_action === -1) {
        //     //remove and use next
        //     self.next();
        // }
        else if(next_action) {
            if(next_action.includes(":")){
                next_action = next_action.split(":");
                self.nextAction = next_action[1];
                return next_action[0];
            }
            //add as first action
            //self.actionStack.unshift(next_action);
            self.nextAction = next_action;
        }
        // if(!battle_over) {
        //     //move to next actionStack
        //      self.actionStack.push(self.actionStack.shift());
        // }
        else {
            //return true if battle is over.
            return ;
        }
    };

    /**
     * player with monsters list and active monster
     */
    self._player = null;

    /**
     * enemy with monsters list and active monster
     */
    self._enemy = null;

    /**
     * shows players active monster attack moves
     * REPLACED with menu 2019-03-31
     */
    self.menuAttack = function(){
        //menu action
        //
    };

    /**
     * show players monsters list
     */
    self.menu_monsters = function() {

    };

    /**
     * shows players item list
     */
    self.menu_items = function() {

    };

    /**
     * show players run option
     */
    self.menu_run = function() {

    };


    /**
     * update dom info
     */
    self.update = function() {
        self.system.dom.update(self._player, "player");
        if(self._enemy) {
            self.system.dom.update(self._enemy, "enemy");
        }
    };
    
    // self.attackText = function(attack) {
    //     if(!attack) {
    //         return;
    //     }
    //     let text = {};
    //     text.
        
    // }
    self.text = {
        attack_used: "@a used @m",
        
        
        no_effect: "It doesn't affect [target]",
        effective_false: "It's not very effective...",
        effective_true: "It's super effective!",
        
        critical: "Critical hit", //after attack used message
        
        //why all of pokemon messages end in !
        
        missed: "@a's attack missed!",
        avoided: "[target] avoided the attack!",
        
        stat_change_plus: "[target]'s [attack] increase its [stat]!",
        stat_change: "[target]'s [stat] [change]!", //fell!
        
        down: "Enemy [name] fainted!",
        
        xp: "[name] gained [num] xp",
        level_up: "[name] grew to level [lvl]",
        
        display_stats_change: "function to display stats window???",
        
        learned: "[name] learned [attack]",
        defeated: "[name] defeated [name]", //defeating another HUNTER
        
        lowEnergy: "There's not enough power for this move!",
    };
    
    /**
     * stored return action after message
     */
    self._messageReturnAction = "";
    
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
            self.system.dom.message(text);
            return "message";
        }
        else {
            //user clicked while message displayed
            //call message if finished
            // click while loading text will finish text load. dom.message returns true
            // another click - message might still return true if only 1 page of text has been shown so far.
            return self.system.dom.message() ? "message" : self._messageReturnAction;
        }
    };
    
    /**
     * does the character have enough energy to use
     * @param {string} move 
     * @returns {boolean} can use
     */
    self.attackCheck = function(move) {
        let attack_info = self.getMoveInfo(self._player, move);
        if(attack_info) {
            return attack_info.e <= self._player.e;
        }
        return true;
    };
    
    /**
     * 
     */
    self.getMoveInfo = function(monster, move) {
        if(typeof move !== "string") {
            return move;
        }
        
        let found = monster.am.find(function(attack_move) {
            if(attack_move.name) {
                return attack_move.name == attack_move;
            }
            return false;
        });
        if(!found) {
            found = attacks[move];
        }
        found.n = move;
        return found;
    };
    
    /**
     * check affinity of move and using monster
     * @param {Object} move
     */
     self.moveAffinity = function(monster, move) {
         //1 - no affinity
         //2 - affinity - fire + fire, grass +> water
         //0.4 - bad affinity water +> fire
         if(!move.t || move.t == "Normal") {
             return 1;
         }
         let affinity = 1;
         let moves = monster.type;
         if(Array.isArray(moves)) {
             affinity = moves.indexOf(move) < 0 ? 1 : 2;
         }
         //check for BAD affinity
         
         return affinity;
     };
    
    
     self.moveObj = function moveObj(user, monster, move) {
        this.user = user;
        this.monster = monster;
        this.move = move;
        this.hit = false;
        this.target = {};
        this.damage = 0;
        this.dodged = true;
        this.effective = 0;
        this.critical = false;
    };
    
    /**
     * @param {moveObj} action
     */
    self.criticalMod = function(action) {
        //TODO add item mods
        //action.monster.item;
        return Math.random <= 0.06 ? 2 : 1;
    };
    self.effectiveMod = function(action) {
        //type check attack vs target
        let rand = Math.random();
        return rand < 0.2 ? 0.5 : rand < 0.4 ? 2 : 1;
    };
    
    /**
     * build the attack object for this monster and move
     * @param {Object} monster monster using attack move
     * @param {String} move name of move (or object if possible)
     */
    self.rollAttack = function(monster, move, user, target) {
        //get move info
        let move_info = self.getMoveInfo(monster, move);
        let action = new self.moveObj(user, monster, move_info);
        
        action.target = target;
        
        //hits?
        //move a (accuracy) vs (monster.ss (speed) MOD random)
        //below is just move accuracy above random
        action.hit = Math.random() <= (move_info.a / 100);
        //TODO - item mods for isHit
        
        //power
        //monster affinity
        let affinity = self.moveAffinity(monster, move_info);
        
        let power = monster[move_info.m];
        
        //is critical
        action.critical = self.criticalMod(action);
        action.effective = self.effectiveMod(action);
        
        action.damage = Math.floor(power * (move_info.p / 100) * affinity * action.critical * action.effective) + 1;
        //TODO item modifier on damage
        
        return action;
    };
    
    /**
     * 
     * @param {*} move  
     */
    self.attack = function(move) {
        //CAN player use move?
        let can_use = self.attackCheck(move);
        if(can_use == false) {
            //attack is disabled so cannot click - so unlikly to hit this
            return self.message(true, self.text.lowEnergy, "attack");
        }
        
        //Attack can be used - roll if PLayer or Enemy is next
        let player_action = self.rollAttack(self._player, move, "player", self._enemy);
        let enemy_action = self.enemyAction();
        
        let actions = self.attackPrioity(player_action, enemy_action);
        
        //TODO decide who goes next?
        
        //for now - run playersMove
        //self.runActions(true);
        self.runActions3(actions);
    };

    self.attackPrioity = function (player_action, enemy_action) {
        return [player_action, enemy_action];
    };
    
    self._runActionTurn = {};
    self._runActionNext = "";
    
    self._pText = function(user, text) {
        return "<p class='" + user + "-text'>" + text + "</p>";
    };
    
    self.energyRecovery = function(monster) {
        monster.e += 10;
        if(monster.e > 100) {
            monster.e = 100;
        }
    };
    
    self.energyRecoveryAuto = function() {
        self.energyRecovery(self._player);
        self.energyRecovery(self._enemy);
    };
    
    self.domText = function(text) {
        self.system.output.elm.insertAdjacentHTML('beforeend', text);
        self.system.output.elm.scrollTop = self.system.output.elm.scrollHeight;
    };
    

    self._actions = [];
    self._currentAction = {};
    self.runActions3 = function (actions) {
        //store
        self._actions = actions;
        let action = actions.shift();
        if(action == undefined) {
            //end of actions
            self.system.dom.error("runActions3 - no more actions, so missing something in end of action");
        }
        else {
            self._currentAction = action;

            let message = self.useAction(action);
            self.system.dom.messageRollAction(message, "battleActionHit");
        }
    }
    self.system.battleActionHit = function () {
        let action = self._currentAction;
        let message = "";
        let nextAction = "";

        if(action.hit) {
            let hp = action.target.h;
            action.target.h = action.target.h - action.damage;
            
            //self.domText(self._pText(action.user, "hit"));
            message = self._pText(action.user, "hit");
            nextAction = "battleActionImpact";
            
            self.system.sounds.random();

            
            // if(self.system.settings.battleNumbers) {
            //     //self.domText(self._pText(action.user, "Damage: " + action.damage));
            //     messages.push([self._pText(action.user, "Damage: " + action.damage), "next"]);
            // }
            
        }
        else {
            //no hit
            self.system.sounds.miss();
            
            let missed_text = self.text.missed.replace('@a', action.monster.name || action.monster.id);
            message = self._pText(action.user, missed_text);
            nextAction = "battleActionEnd";
        }

        self.update();

        self.system.dom.messageRollAction(message, nextAction, "", "sound option");
    }

    
    //   x used action
    // button
    // miss or show damage drop
    //    it hit  - it was super effective
    //    it missed

    self.system.battleActionImpact = function () {
        let message = self.effectiveMessage(self._currentAction);
        if(message) {
            self.system.dom.messageRollAction(message, "battleActionCritical", "", "sound option");
        }
        else {
            //normal effective, move to Critical
            self.system.battleActionCritical();
        }

    }

    self.system.battleActionCritical = function () {
        let action = self._currentAction;
        if(action.critical) {
            let crit_text ="<span class='critical'>" + self.text.critical + "</span>";
            //self.domText(self._pText(action.user, crit_text));
            message = self._pText(action.user, crit_text);
            self.system.dom.messageRollAction(message, "battleActionEnd", "", "sound option");
        }
        else {
            self.system.battleActionEnd();
        }
    }

    self.system.battleActionEnd = function () {
        let action = self._currentAction;
        //state of target
        let is_dead_message = self.isDeadMessage(action);
        if(is_dead_message) {
            self.system.dom.messageRollAction(is_dead_message, "battleActionDeadEnd", "", "sound option");
        }
        else{
            action = self._actions.shift();
            if(action == undefined) {
                //end end action
                // attackMenu if both still alive
                // monster switch if player dead, and has more monsters
                // zone if enemy dead
                // game over if it is player character that is dead

                // goto 
                //self.system.dom.messageRollAction(messages[0], "battleActionHit");
                self.system.dom.messageRollSpace();
                self.system.menu();
            }
            else {
                self._currentAction = action;
                //self.runActions3(self._actions);
                let message = self.useAction(action);
                self.system.dom.messageRollAction(message, "battleActionHit");
            }
        }
    }

    self.isDeadMessage = function (action) {
        let target_dead = action.target.h <= 0; 

        if(target_dead) {
            return self._pText(action.user, 
                (action.target.name || action.target.id) + " is killed!"
                );
        }
    }

    self.system.battleActionDeadEnd = function () {
        //if player dead - 

        if(self._player.h <= 0) {
            let message = "";
            let action = "";

            if(self.system.state.HasBattleReadyMonsters()) {
                //monster switch TODO
                //has player character died - then is Game Over.
                message = "has more monsters, should do monster switch menu, but game over.";
                //monster switch should allow player character to be selected

                message = self._pText("player", message);
                self.system.dom.messageRollAction(message, "battleMonsterSwitch", "", "sound option");
            }
            else {
                message = "out of monsters, "
                
                message = self._pText("player", message);
                self.system.dom.messageRollAction(message, "GameOver", "", "sound option");
            }


        }
        else {
            self._enemy = null;
            //clear 
            document.querySelector('.right-column').classList.add('hide');
            //approaching = self._enemy.id;

            message = self._pText("player", "XP gain value goes here.");
            self.system.dom.messageRollAction(message, "Goto", "Zone", "sound option");
        }
    }

    self.useAction = function (action) {
        let use_move_txt = lib.func.rp(self.text.attack_used, 
            {"@a": action.monster.name || action.monster.id, "@m": action.move.n});
        //self.domText(self._pText(action.user, use_move_txt));
        let message = self._pText(action.user, use_move_txt);
        
        //energy cost
        action.monster.e -= action.move.e;
        return message;
    }




    self.effectiveMessage = function (action) {
        if(action.effective == 1) {
            //nothing added to messages
        }
        else {
            let message = "";
            if(action.effective == 2) {
                message = "<span class='effective effective-super'>" + self.text.effective_true + "</span>";
            }
            else if(action.effective == 0.5) {
                message = "<span class='effective effective-not'>" + self.text.effective_false + "</span>";
            }

            return self._pText(action.user, message);
        }
    }

    
    
    
    /**
     * roll action for enemy
     * use item, attack
     * if a HUNTER - run, switch monster
     */
    self.enemyAction = function(){
        //very basic, random attack
        return self.rollAttack(self._enemy, lib.js.random(self._enemy.am), "enemy", self._player);
        //return new self.obj.action("attack", lib.js.random(self._enemy));
    };
    
    //set of object returned by actions. to bundle
    self.obj = {};
    self.obj.action = function(action, value) {
        this.action = action;
        this.value = value;
    };


    //
    self.ShowMonsters = function () {
        let back = { t: "🔙 Back", action: "battle.menu", keycode: "Backspace,Escape"};
        let nav = self.system.state.getShowMonstersNav("battle.showMonster");
        nav.unshift(back);

        self.dom.setMenuAndDisplay("action-menu", nav);
    }

    self.showMonster = function (uid) {
        //Show monster info
        let monster = cw.state.getMonster(uid);


        let nav = [
            { t: "⚔️ Moves", action: "battle.ShowMonsterMoves", value: uid},
            { t: "↔️ SWITCH", action: "battle.SwitchMonster", value: uid},
            { t: "🔙 BACK", action: "battle.ShowMonsters", keycode: "Backspace,Escape"}
        ]
    }

    self.SwapMonster = function (uid) {
        let monster = cw.state.getMonster(uid);
        self._player = monster;

        //console.error("battle swapMonster TODO - : " + uid);

        self.update();
    }
    self.ShowMonsterMoves = function (uid) {
        let monster = cw.state.getMonster(uid);

        let nav = self.system.monsters.getMonsterMovesNav(monster, "battle.attack", "unknown");
        nav.unshift({ t: "🔙 BACK", action: "battle.ShowMonster", value: uid, keycode: "Backspace,Escape"});

        console.log("todo: showMonsterMoves")
    }

    return self;
}).apply(cw);

/*
X Uses Swift Attack
    hit
    Not very effective
    Critical Hit
Y Uses Slow Attack
    miss
[go to BattleMenu]


Mario Uses Avoid
    - regained Energy -> regain a little Enery / regain a lot of Energy (for area bonuses)
Pika uses attack
    hit
    Mario is dead


Death and go to Monster Select to swap in.


issue: when win second Fight, it error with unknown zone in GetFloorNav

 */