
function Path(items){
    this.items = items;
}
Path.prototype.text = function(){
    return this.items.map(function(item){
        return item.text();
    }).join('/');
};

Path.prototype.toString = function () {
    return this.items.map(function(item){
        return item.toString();
    }).join('/');
};


exports.Path = Path