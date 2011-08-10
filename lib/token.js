
function Token(kind, spelling){
    this.kind = kind;
    this.spelling = spelling;
}
Token.prototype.kind = null;
Token.prototype.spelling = null;

Token.WILDCARD =  0;               // *
Token.CHARACTER_WILDCARD = 1;      // ?
Token.DIRECTORY_WILDCARD = 2;      // **

Token.CHARACTER_SET_START = 3;     // [
Token.CHARACTER_SET_END = 4;       // ]

Token.LITERAL_SET_START = 5;       // {
Token.LITERAL_SET_SEPERATOR = 6;   // ,
Token.LITERAL_SET_END = 7;         // }

Token.PATH_SEPERATOR = 8;          // / \

Token.IDENTIFIER = 9;              // Letter or Number

Token.WINDOWS_ROOT = 10;           // :

Token.EOT = 100;


exports.Token = Token;