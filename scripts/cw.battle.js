//"use strict";

(function() {
    let self = this.battle = {}
    self.system =  this;
    
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
    self.menu = function(action) {
        
        if(action) {
            //attack
            cw.dom.setMenu('battle-menu-attack', self._player.am);
            cw.dom.setDisplay('battle-menu-attack');
            return "attack";
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
     * start battle
     */
    self.load = function(zone_info) {
        self._player = cw.state.player.monsters[0];
        if(zone_info) {
            self.zoneInfo = zone_info || {};
        }
        
        self._enemy = cw.monsters.random(self.zoneInfo.floor);
        
        
        document.querySelector('.right-column').classList.remove('hide');
        self.update();
        
        cw.dom.setDisplay("battle-menu-main");
        
        cw.sounds.play(cw.sounds.types.other.encounter);
        
        self.nextAction = "message";
        return self.message(true, self._enemy.id + " approaches!", "menu");
        
        //set menu
        //self.nextAction = "menu";
    };

    /**
     * update dom info
     */
    self.update = function() {
        cw.dom.update(self._player, "player");
        if(self._enemy) {
            cw.dom.update(self._enemy, "enemy");
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
            cw.dom.message(text);
            return "message";
        }
        else {
            //user clicked while message displayed
            //call message if finished
            // click while loading text will finish text load. dom.message returns true
            // another click - message might still return true if only 1 page of text has been shown so far.
            return cw.dom.message() ? "message" : self._messageReturnAction;
        }
    };
    
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
        if(!move) {
            return "attack";
        }
        //CAN player use move?
        let can_use = self.attackCheck(move);
        if(can_use == false) {
            return self.message(true, self.text.lowEnergy, "attack");
        }
        
        //Attack can be used - roll if PLayer or Enemy is next
        let player_action = self.rollAttack(self._player, move, "player", self._enemy);
        let enemy_action = self.enemyAction();
        
        self.actionOrder = [player_action, enemy_action];
        
        //TODO decide who goes next?
        
        //for now - run playersMove
        self.runActions(true);
        
        
        return "runActions";
        
        
        /*
        //basic testing attack
        self._enemy.h = self._enemy.h - 6;
        self._player.h -= Math.floor(Math.random()*6);
        
        
        // let player_action = self.playerAction("attack", move);
        // let enemy_action = self.enemyAction();
        
        let player_text = self.randomText(self._player.name, player_action);
        player_text = player_text.replace("<p>", "<p class='player-text'>");
        
        let enemy_text = self.randomText(self._enemy.id, player_action);
        enemy_text = enemy_text.replace("<p>", "<p class='enemy-text'>");
        
        cw.output.elm.innerHTML = player_text + enemy_text;
        
        ///////////////
        
        
        //block group
        
        //End condition
        if(self._enemy.h <= 0) {
            cw.output.elm.innerHTML = self.text.down.replace('[name]', self._enemy.id);
            self._enemy = cw.monsters.random();
        }
        if(self._player.h <= 0) {
            cw.output.elm.innerHTML = self.text.down.replace('[name]', self._player.name);
            self._player = cw.monsters.random();
            self._player.name = self._player.id;
        }
        
        self.update();
        
        cw.dom.setDisplay(cw.dom.elms.output);
        return "playersMove";
        */
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
        cw.output.elm.insertAdjacentHTML('beforeend', text);
        cw.output.elm.scrollTop = cw.output.elm.scrollHeight;
    };
    
    /**
     * true is false paramter check for first round development work
     */
    self.runActions = function(is_player) {
        if(!self._runActionNext) {
            self._runActionTurn = self.actionOrder.shift();
            if(!self._runActionTurn) {
                cw.dom.setDisplay("battle-menu-main");
                
                //energy recovery:
                self.energyRecoveryAuto();
                self.update();
                return "menu";
            }
            self._runActionNext = "using";
        }
        if(self._runActionNext === "battle-over") {
            self._runActionNext = "";
            return "menu:menu";
        }
        
        cw.dom.setDisplay(cw.dom.elms.output);
        
        if(self._runActionNext == "using") {
            let use_move_txt = lib.func.rp(self.text.attack_used, 
                {"@a": self._runActionTurn.monster.name || self._runActionTurn.monster.id, "@m": self._runActionTurn.move.n});
            self.domText(self._pText(self._runActionTurn.user, use_move_txt));
            
            //energy cost
            self._runActionTurn.monster.e -= self._runActionTurn.move.e;
            
            self._runActionNext = "hit";
        }
        else if(self._runActionNext == "hit") {
            if(self._runActionTurn.hit) {
                let hp = self._runActionTurn.target.h;
                self._runActionTurn.target.h = self._runActionTurn.target.h - self._runActionTurn.damage;
                
                self.domText(self._pText(self._runActionTurn.user, "hit"));
                
                cw.sounds.random();
                
                if(self._runActionTurn.effective != 1) {
                    let effect_text = "<span class='effective effective-super'>" + self.text.effective_true + "</span>";
                    if(self._runActionTurn.effective == 0.5) {
                        effect_text = "<span class='effective effective-not'>" + self.text.effective_false + "</span>";
                    }
                    self.domText(self._pText(self._runActionTurn.user, effect_text));
                }
                if(self._runActionTurn.critical) {
                    let crit_text ="<span class='critical'>" + self.text.critical + "</span>";
                    self.domText(self._pText(self._runActionTurn.user, crit_text));
                }
                
                if(cw.settings.battleNumbers) {
                    self.domText(self._pText(self._runActionTurn.user, "Damage: " + self._runActionTurn.damage));
                }
            }
            else {
                cw.sounds.miss();
                
                //no hit
                //cw.output.write()
                let missed_text = self.text.missed.replace('@a', self._runActionTurn.monster.name || self._runActionTurn.monster.id);
                missed_text = self._pText(self._runActionTurn.user, missed_text);
                //player_text = player_text.replace("<p>", "<p class='player-text'>");
                self.domText(missed_text );
            }
            
            self._runActionNext = self._runActionTurn.target.h <= 0 ? "target-dead" : undefined; 
        }
        else if(self._runActionNext == "target-dead") {
            //clear actions
            self.actionOrder = [];
            
            self.domText(self._pText(self._runActionTurn.user, 
                (self._runActionTurn.target.name || self._runActionTurn.target.id) + " is killed!"
                ) );
                
            self._runActionNext = "random-next-monster";
        }
        else if(self._runActionNext == "random-next-monster") {
            // go to ZONE menu
            
            let approaching = "";
            if(self._player.h <= 0) {
                //self._player = cw.monsters.random();
                //self._player.name = self._player.id;
                //approaching = self._player.name;
                self.domText(self._pText("player", "GAME OVER") );
            }
            else {
                self._enemy = null;
                //clear 
                document.querySelector('.right-column').classList.add('hide');
                //approaching = self._enemy.id;
            }
            
            
            self.domText(self._pText("player", "XP gain value goes here.") );
            cw.sounds.play(cw.sounds.types.other.encounter);
                
            self._runActionNext = "battle-over";
        }
        
        self.update();
        return "runActions";
    };
    
    self.playersMove = function() {
        //output is open
        cw.dom.setDisplay("battle-menu-main");
        return "menu";
    };
    
    self.playerAction = function(action, value) {
        return new self.obj.action(action, value);
    };
    
    // self.randomText = function(name, action) {
    //     let attack_text = [];
    //     attack_text.push(
    //         self.text.attack_used
    //         .replace("[name]", name)
    //         .replace("[attack]", action.value));
            
    //     let effectiveness = Math.random();
    //     if(effectiveness < 0.6) {
            
    //     }
    //     else if(effectiveness < 0.8) {
    //         attack_text.push("<span class='effective effective-super'>" + self.text.effective_true + "</span>");
    //     }
    //     else {
    //         attack_text.push("<span class='effective effective-not'>" + self.text.effective_false + "</span>");
    //     }
        
    //     if(effectiveness > 0.95) {
    //         attack_text.push("<span class='critical'>" + self.text.critical + "</span>");
    //     }
        
    //     return "<p>" + attack_text.join("<br/>") + "</p>";
    // };
    
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

    return self;
//}).apply(cw.battle = {});
}).apply(cw);