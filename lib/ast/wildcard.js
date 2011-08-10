var util = require("util");
var SubSegment = require("./subsegment").SubSegment;
var Token = require("../token").Token;

function Wildcard(type){
    this.type = type;
}
util.inherits(Wildcard, SubSegment);
Wildcard.prototype.text = function(){
    switch(this.type){
        case Token.WILDCARD:
            return '*';
        case Token.CHARACTER_WILDCARD:
            return '?';
        default:
            throw new Error("NotImplemented");
    }
};
Wildcard.prototype.isWildcard = function(){
    return true;
};
Wildcard.prototype.toString = function(){
    switch(this.type){
        case Token.WILDCARD:
            return '.*';
        case Token.CHARACTER_WILDCARD:
            return '.{1}';
        default:
            throw new Error("NotImplemented");
    }
};

exports.Wildcard = Wildcard;