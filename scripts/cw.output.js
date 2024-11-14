/**
 * console-wars-basic.js
 * version 0.1
 * Output operations
 */

(function() {
    //** make this a little bit more context safe */
    let self = this.output = {};
    self.elm = document.getElementById("output-text");
    self.nextButton = document.getElementById("output-next");

    /** variable is exposed */
    self.public_variable = null;

    /** underscore notation for private, but this is still exposed publicly */
    self._exposed_private = null;

    /** private enclosed variable to this namespace */
    let private_variable = null;

    /**
     * 
     * @param {*} test 
     */
    function private_function (test) {
        console.log(text);
    }

    /**
     * load primary 
     */
    self.load = function() {
        
    };
    
    /**
     * output one line of message. Display will wrap if needed
     */
    self.write = function(line) {
        //self.elm.appendChild("<p>" + line + "</p>");
        self.elm.insertAdjacentHTML('beforeend', "<p>" + line + "</p>" );
    };
    
    /**
     * empty output window
     */
    self.clear = function() {
        self.elm.innerHTML = "";
    };

    return self;
}).apply(cw);