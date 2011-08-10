var names = ['Path', 'Segment', 'SubSegment', 'Identifier', 'CharacterSet', 'LiteralSet', 'Wildcard', 'Root', 'WildcardSegment'];

names.forEach(function(name){
    exports[name] = require(__dirname+"/ast/"+name.toLowerCase())[name];
});
