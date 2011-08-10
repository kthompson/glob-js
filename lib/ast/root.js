var util = require("util");
var Segment = require("./segment").Segment;

function Root(value) {
    this.value = value;
}
util.inherits(Root, Segment);
Root.prototype.text = function () {
    if(this.value) {
        if(this.value instanceof String)
            return this.value; //cwd

        return this.value.text() + ':'; // windows
    }
    return '/'; //linux
};

Root.prototype.isWildcard = function () {
    return false;
};

Root.prototype.toString = function () {
    if(this.value) {
        if(this.value instanceof String)
            return this.value; // cwd

        return this.value.text() + ':'; //windows
    }
    return ''; // linux
};

exports.Root = Root;