function Segment(items){
    this.items = items;
}
Segment.prototype.text = function(){
    return this.items.map(function(item){
        return item.text();
    }).join('');
};

Segment.prototype.isWildcard = function(){
    for(var i = 0; i < this.items.length; i++){
        if(this.items[i].isWildcard())
            return true;
    }
    return false;
};

Segment.prototype.toString = function(){
  return this.items.map(function(item){
     return item.toString();
  }).join('');
};

exports.Segment = Segment;