/**
 * lib.js
 * version 0.1
 * simplified operations
 */

var lib = {};

/**
 * template element cloning
 */
lib.clone = function(id) {
	return document.getElementById(id).content.cloneNode(true);
};

lib.empty = function(elm) {
	var clone_node = elm.cloneNode(false);
    elm.parentNode.replaceChild(clone_node, elm);
    return clone_node;
};
lib.objectToHTML = function(js_object, element) {
    var sub_element;
    var set_value;
    for(const prop in js_object) {
        sub_element = element.querySelector("." + prop);
        if(sub_element) {
            if(sub_element.nodeName == "INPUT") {
                if(sub_element.type == "checkbox") {
                    sub_element.checked = js_object[prop] ? true : false;
                }
                else if(sub_element.type == "text") {
                    sub_element.value = js_object[prop];
                }
            }
            else {
                set_value = js_object[prop];
                if(sub_element.dataset.format) {
                    set_value = sub_element.dataset.format.replace("$", set_value);
                }
                sub_element.textContent = set_value;
            }
        }
    }
};

// lib.dom = {};
// lib.dom.set = function()

/**
 * get object by string
 * @param {Object} o object for attribute
 * @param {String} s dot notation to attribute
 */
lib.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};


/**
 * sub library of javascript functions. to avoid overlapping names for Element functions
 */
lib.js = {};

/**
 * copy an object
 */
lib.js.copy = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

lib.js.propertiesCount = function(obj) {
    var count = 0;
    for(let attribute in obj) {
        count++;
    }
    return count;
}