var util = require('util');
var Parser = require("./parser").Parser;
var Scanner = require("./scanner").Scanner;
var Token = require('./token').Token;
var glob = require("./glob").glob;

var parser = new Parser();

function parse(text){
    console.log("Parsing: " + text);
    var ast = parser.parse(text);
    console.log(util.inspect(ast, false, null));
    ast.items.forEach(function(segment){

        console.log('Wildcard: ' + segment.isWildcard());
        console.log('text: ' + segment.text());
        console.log('Regex: ' + segment.toString());
        console.log();
    });
}

function scan(text){
    console.log("=========================");
    console.log(text);
    console.log("=========================");
    var scanner = new Scanner(text);
    var token;
    while((token = scanner.scan()).kind != Token.EOT){
        console.dir(token);
    }
}

//parse('c:/t*mp*');
//parse('/t*mp*');
//scan("/hello/how/**/you/*.rb");
//scan("/hello/how/**/you?/*.rb");
//scan("/dev/sd[abcd]1");
//scan('**/mixins/*.js');
//scan('/**/mixins/*.js');
//var scanner = new Scanner('c:/**/mixins/*.js');
//
//console.dir(scanner.peek());
//console.dir(scanner.peek());
//console.dir(scanner.peek());
//console.dir(scanner.scan());
//console.log("=========================");
//
//console.dir(scanner.peek());
//console.dir(scanner.peek());
//console.dir(scanner.peek());
//console.dir(scanner.scan());


//
glob('C:/Documents and Settings/kthompson/t*mp*', 0, function(err, results){
    console.log("COMPLETED");
    if(err){
        console.log('Error: '+err);
        return;
    }

    console.log("results.length="+results.length);
    results.forEach(function(file){
        console.log(file);
    });
});