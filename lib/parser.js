var Scanner = require("./scanner").Scanner;
var Token = require('./token').Token;
var Ast = require("./ast");


function Parser(pattern) {
    if (pattern) {
        this.scanner = new Scanner(pattern);
    }
}
Parser.prototype.currentToken = null;

Parser.prototype.accept = function(expectedKind) {
    if (this.currentToken.kind == expectedKind) {
        this.acceptIt();
        return;
    }

    throw new Error("Parser error Unexpected kind detected.");
};

Parser.prototype.acceptIt = function() {
    if (this.scanner == null) {
        throw new Error("No source text was provided");
    }
    this.currentToken = this.scanner.scan();
};

Parser.prototype.parseIdentifier = function() {
    if (this.currentToken.kind == Token.IDENTIFIER) {
        var identifier = new Ast.Identifier(this.currentToken.spelling);
        this.acceptIt();
        return identifier;
    }

    throw new Error("Unable to parse Identifier");
};

Parser.prototype.parseLiteralSet = function() {
    var items = [];
    this.accept(Token.LITERAL_SET_START);
    items.push(this.parseIdentifier());

    while (this.currentToken.kind == Token.LITERAL_SET_SEPERATOR) {
        this.acceptIt();
        items.push(this.parseIdentifier());
    }
    this.accept(Token.LITERAL_SET_END);
    return new Ast.LiteralSet(items)
};

Parser.prototype.parseCharacterSet = function() {
    this.accept(Token.CHARACTER_SET_START);
    var characterSet = this.parseIdentifier();
    this.accept(Token.CHARACTER_SET_END);
    return new Ast.CharacterSet(characterSet);
};

Parser.prototype.parseWildcard = function(type) {
    this.accept(type);
    return new Ast.Wildcard(type);
};

Parser.prototype.parseSubSegment = function() {
    switch (this.currentToken.kind) {
        case Token.IDENTIFIER:
            return this.parseIdentifier();
        case Token.CHARACTER_SET_START:
            return this.parseCharacterSet();
        case Token.LITERAL_SET_START:
            return this.parseLiteralSet();
        case Token.CHARACTER_WILDCARD:
        case Token.WILDCARD:
            return this.parseWildcard(this.currentToken.kind);
        default:
            throw new Error("Unable to parse PathSubSegment");
    }

};

Parser.prototype.parseSegment = function() {
    if (this.currentToken.kind == Token.DIRECTORY_WILDCARD) {
        this.acceptIt();
        return new Ast.WildcardSegment();
    }

    var items = [];
    while (true) {
        switch (this.currentToken.kind) {
            case Token.IDENTIFIER:
            case Token.CHARACTER_SET_START:
            case Token.LITERAL_SET_START:
            case Token.CHARACTER_WILDCARD:
            case Token.WILDCARD:
                items.push(this.parseSubSegment());
                continue;
            default:
                break;
        }
        break;
    }

    return new Ast.Segment(items);
};

Parser.prototype.parseRoot = function () {
    if (this.currentToken.kind == Token.PATH_SEPERATOR)
        return new Ast.Root(); //dont eat it so we can leave it for the segments


    if(this.currentToken.kind == Token.IDENTIFIER &&
       this.currentToken.spelling.length == 1     &&
       this.scanner.peek().kind == Token.WINDOWS_ROOT)
    {
        var ident = this.parseIdentifier();
        this.accept(Token.WINDOWS_ROOT);
        return new Ast.Root(ident);

    }

    return new Ast.Root(process.cwd());
};

Parser.prototype.parsePath = function() {
    var items = [];

    items.push(this.parseRoot());

    while (this.currentToken.kind == Token.PATH_SEPERATOR)  {
        this.acceptIt();
        items.push(this.parseSegment());
    }

    return new Ast.Path(items);
};

Parser.prototype.parse = function(text) {
    if (text)
        this.scanner = new Scanner(text);

    this.acceptIt();
    var path = this.parsePath();
    if (this.currentToken.kind != Token.EOT) {
        throw new Error("Expected EOT");
    }

    return path;
};


exports.Parser = Parser;