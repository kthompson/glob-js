var util = require("util");
var Segment = require("./segment").Segment;


function WildcardSegment(){
}
util.inherits(WildcardSegment, Segment);
WildcardSegment.prototype.text = function(){
    return '**';
};
WildcardSegment.prototype.isWildcard = function(){
    return true;
};
WildcardSegment.prototype.toString = function(){
    return '.*';
};

exports.WildcardSegment = WildcardSegment;