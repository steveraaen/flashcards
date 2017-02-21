var fs = var fs = require('fs');
// 2 kinds of cards, basic and cloze
var bCard;
var cCard;
// First command line input defines which card to build
var func = process.argv[2];
// Assignments for basic
var front = process.argv[3];
var back = process.argv[4];
// Assignments for cloze
var fullText = process.argv[3];
var cloze = process.argv[4];
var ellipse = '...';
var clozeToBasic;
var cardStr;

function writeCard(){
    fs.appendFile('cards.txt', cardStr + '\r', function(err){
        if (err) throw err;
    })
}
if (func === 'b') {
    function MakeBasic(f, b) {
        if (!(this instanceof MakeBasic)){
            return new MakeBasic(front, back)
        }
        this.front = front;
        this.back = back;
    }
    bCard = new MakeBasic(front, back);
    cardStr = JSON.stringify(bCard);
    writeCard();
} else if(func === 'c') {
    function MakeCloze(text){
        if (!(this instanceof MakeCloze)){
            return new MakeCloze(fullText)
        }
        this.fullText = fullText;    
        this.cloze = cloze; 

    }
    cCard = new MakeCloze(fullText);
    cardStr = JSON.stringify(cCard);



MakeCloze.prototype.clozeOnly = function(){
        MakeCloze.prototype.cloze = cloze;
        MakeCloze.prototype.partial = fullText.replace(cloze, ellipse);
        MakeCloze.prototype.fullText = fullText;
}
cCard.clozeOnly()

function cToB(){
back = cCard.__proto__.fullText;
front = cCard.__proto__.partial;
clozeToBasic = MakeBasic(back, front)
cardStr = JSON.stringify(clozeToBasic)
writeCard()
}
cToB()
console.log(clozeToBasic);
}




































