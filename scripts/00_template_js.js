/**
 * console-wars-basic.js
 * version 0.1
 * XXX operations
 */

(function() {
    //** make this a little bit more context safe */
    let self = this;

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
     * @param {Object} type 
     * @param {String} console_text send to console
     */
    self.public_function = function(type, console_text) {
        private_function(console_text);
    };

    return self;
}).apply(cw.XXX = {});