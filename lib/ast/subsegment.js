

function SubSegment(){}
SubSegment.prototype.text = function(){
    throw new Error("NotImplemented");
};

SubSegment.prototype.isWildcard = function(){
    return false;
};

SubSegment.prototype.toString = function(){
    throw new Error("NotImplemented");
};

exports.SubSegment = SubSegment;