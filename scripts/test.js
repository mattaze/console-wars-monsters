/**
 * console-wars-basic.js
 * version 0.1
 * testing functions
 */



var test = {};
(function() {
    let self = this;

    self.pass = 0;
    self.fail = 0;

    //run all tests
    self.runAll = function(input){
        self.pass = 0;
        self.fail = 0;

        for(const prop in self) {
            if(lib.isFunction(self[prop]) && prop != "runAll" && prop != "l" && prop != "l2") {
                self.l2(`testing: ${prop}`);
                self[prop]();
            }
        }
        self.l2(`testing results: pass: ${self.pass} fail: ${self.fail}`);
    };

    self.encounterCheck_should_be_boss = function() {
        let floor = {
            searches : 0,
            boss : -1
        }
        var actual = cw.menu.encounterCheck(floor, 2);
        
        self.l("boss", actual);
    }
    
    self.l = function(expected, actual) {
        let result = expected == actual;
        let color =  "color:green;";
        if(result) {
            self.pass++;
        }
        else {
            self.fail++;
            color = "color:red;";
        }

        let str = `%c testing: ${expected} == ${actual} : ${result}`;
        console.info(str, color);
    }
    self.l2 = function(str) {
        console.info(`%c ${str}`, "color:blue;");
    }

    return self;
}).apply(test);