var Token = require('./token').Token;

function Scanner(source){
    this.source = source;
    this.sourceIndex = 0;
    this.currentCharacter = this.source[this.sourceIndex];
}

Scanner.prototype.source = null;
Scanner.prototype.sourceIndex = null;
Scanner.prototype.currentCharacter = null;
Scanner.prototype.currentSpelling = "";
Scanner.prototype.currentKind = null;



Scanner.prototype.take = function(expected){
    if(this.currentCharacter ==  expected){
        this.takeIt();
    }
    else
    {
        throw new Error("Syntax Error");
    }
};

Scanner.prototype.takeIt = function(){
    this.currentSpelling += this.currentCharacter;
    this.currentCharacter = this.source[++this.sourceIndex];
};

Scanner.prototype.isAlphaNumeric = function(character){
  return /^[0-9a-zA-Z\. ]$/.test(character);
};

Scanner.prototype.scanToken = function(){
    if(this.isAlphaNumeric(this.currentCharacter)){
        while(this.isAlphaNumeric(this.currentCharacter)){
            this.takeIt();
        }
        return Token.IDENTIFIER;
    }

    switch(this.currentCharacter){
        case '*':
            this.takeIt();
            if(this.currentCharacter == '*'){
                this.takeIt();
                return Token.DIRECTORY_WILDCARD;
            }

            return Token.WILDCARD;
        case '?':
            this.takeIt();
            return Token.CHARACTER_WILDCARD;

        case '[':
            this.takeIt();
            return Token.CHARACTER_SET_START;

        case ']':
            this.takeIt();
            return Token.CHARACTER_SET_END;

        case '{':
            this.takeIt();
            return Token.LITERAL_SET_START;

        case ',':
            this.takeIt();
            return Token.LITERAL_SET_SEPERATOR;


        case '}':
            this.takeIt();
            return Token.LITERAL_SET_END;

        case '/':
        case '\\':
            this.takeIt();
            return Token.PATH_SEPERATOR;

        case ':':
            this.takeIt();
            return Token.WINDOWS_ROOT;

        case undefined:
            return Token.EOT;

        default:
            throw new Error("Unable to scan for next token. Stuck on '"+this.currentCharacter+"'");
    }
};

Scanner.prototype.peek = function()
{
    var index = this.sourceIndex;
    var token = this.scan();
    this.sourceIndex = index;
    this.currentCharacter = this.source[this.sourceIndex];
    return token;
};


Scanner.prototype.scan = function(){
    this.currentSpelling = "";
    this.currentKind = this.scanToken();

    return new Token(this.currentKind, this.currentSpelling);
};

exports.Scanner = Scanner;