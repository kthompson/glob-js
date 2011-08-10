var util = require("util");
var SubSegment = require("./subsegment").SubSegment;

function Identifier(text){
    this.value = text;
}
util.inherits(Identifier, SubSegment);
Identifier.prototype.text = function(){
    return this.value;
};

Identifier.prototype.isWildcard = function(){
    return false;
};

Identifier.prototype.toString = function(){
    return this.text().replace(/\./, '\\.');
};

exports.Identifier = Identifier;