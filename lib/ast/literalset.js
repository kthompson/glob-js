var util = require("util");
var SubSegment = require("./subsegment").SubSegment;

function LiteralSet(items){
    this.items = items;
}
util.inherits(LiteralSet, SubSegment);
LiteralSet.prototype.text = function(){
    return '{' + this.items.map(function(item){return item.text();}).join(',') + '}';
};

LiteralSet.prototype.isWildcard = function(){
    return true;
};
LiteralSet.prototype.toString = function(){
    return '(' + this.items.map(function(item){return item.toString();}).join('|') + ')';
};

exports.LiteralSet = LiteralSet;