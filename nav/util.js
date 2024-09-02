var util = {};
util.setContent = function (id, value) {
    let elm = util.getElm(id);
    if(!elm) {
        throw new Error("cannot find element with id: " + id);
    }
    else {
        elm.textContent = value;
    }
}
util.getElm = function (id) {
    return document.getElementById(id);
}
//z => z.id == "stairsdown"
util.find = function (arr, property, match) {
    return arr.find(item => item[property] == match);
}