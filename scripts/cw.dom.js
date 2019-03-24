/**
 * DOM management javascript
 */

(function() {
    //alt apply - cw passed in
    //this = cw object.
    let self = this.dom = {};
    self.system = this; //engine??

    /**
     * global click event handler
     * @param
     */
    self.clickEvent = function(event) {
        if(event.target.nodeName == 'BUTTON') {
            let action = event.target.dataset.action;
            console.log('button clicked - ' + action);

            let action_function = self.system[self.system.mode][action];
            if(action_function) {
                action_function();
            }

            return false;
        }
    };
    window.addEventListener("click", self.clickEvent, false);

    /**
     * update DOM
     * @param {Object} obj reference object
     * @param {String} target base 'data-' attribute reference
     */
    self.update = function(obj, target) {
        //if span -
        let elements = document.querySelectorAll("[data-" + target + "]");
        elements.forEach((elm) => {
            let attribute = elm.dataset[target];
            
            if(self.updateType[elm.nodeName]) {
                self.updateType[elm.nodeName](elm, lib.byString(obj, attribute));
            }
            else {
                elm.textContent = lib.byString(obj, attribute);
            }
        });
    };
    
    self.updateType = {};
    self.updateType.IMG = function(img_elm, attribute) {
        //could you data define what part of element attribute needs updating - text - textContent/ style??
        var url = attribute.url || attribute.src || attribute;
        img_elm.src = url;
        return img_elm;
    };

    return self;
}).apply(cw);