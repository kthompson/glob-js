var util = require("util");
var SubSegment = require("./subsegment").SubSegment;


function CharacterSet(identifier){
    this.identifier = identifier;
}
util.inherits(CharacterSet, SubSegment);
CharacterSet.prototype.text = function(){
    return '[' + this.identifier.text() + ']';
};
CharacterSet.prototype.isWildcard = function(){
    return true;
};

CharacterSet.prototype.toString = function(){
    return '[' + this.identifier.toString() + ']';
};

exports.CharacterSet = CharacterSet;