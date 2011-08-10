var fs = require('fs');
var Parser = require("./parser").Parser;
var Ast = require("./ast");

exports.glob = function(pattern, flags, cb){
    var parser = new Parser(pattern);
    var path = parser.parse();
    var calm = [];
	
	if(typeof flags  === 'function' && !cb)
		cb = flags;

    for(var segment; path.items.length && (segment = path.items.shift());){
        if(segment.isWildcard()){
            path.items.unshift(segment);
            break;
        } else {
            calm.push(segment.toString());
        }
    }

    var root = withSlash(calm.join('/'));

    walk(root, path.items, cb);
};

exports.fnmatch = function(pattern, str) {
    var parser = new Parser(pattern);
    var path = parser.parse();
    var re = new RegExp(path.toString());

    return re.test(str);
};

function withSlash(s){
    if(s.substr(-1) === '/' || s.substr(-1) === '\\')
        return s;

    return s + '/';
}

var walk = function(dir, segments, done) {
    var results = [];
    fs.readdir(dir, function(err, list)
    {
        if (err)
            return done(err);

        var segment = segments.shift();
        var re = new RegExp(segment.toString());
        var dw = false;

        if(segment instanceof Ast.WildcardSegment)
        {
            //this can be used multiple levels deep so push it back on the stack and we can deal with it later
            segments.unshift(segment);
            dw = true;
        }

        var pending = list.length;
        if(pending == 0)
        {
            done(null, list);
            return;
        }

        var tryComplete = function(){
            if (!--pending){
                done(null, results);
            }
        };

        var subwalk = function(f, sgmnts)
        {
            walk(f, sgmnts, function(err, res)
            {
                if(err)
                    console.log("ERROR in subwalk:" +f);

                results = results.concat(res);
                tryComplete();
            });
        };

        list.forEach(function(file)
        {
            var part = file;
            var pathTest = re.test(part);
            file = withSlash(dir) + file;
            fs.stat(file, function(err, stat)
            {
                if (stat && stat.isDirectory())
                {
                    var min = 0;
                    if(dw) //we have a directory wildcard so lets create an extra call including the DW
                    {
                        pending++;
                        // check keeping dir Wildcard
                        subwalk(file, segments.slice(0));
                        min++;
                    }

                    //(segments.length > 0 && (pathTest))
                    //(segments.length > 1)

                    // check without dir Wildcard
                    if(segments.length > min && (min == 1 || pathTest))
                    {
                        subwalk(file, segments.slice(min));
                        return;
                    }
                }

                if(pathTest && segments.length == 0)
                    results.push(file);


                tryComplete();
            });
        });
    });
};

