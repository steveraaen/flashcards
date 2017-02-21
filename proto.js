// This is a command line interface.  Use argv[2] = 'b' construct a basic card, 
// and argv[2] = 'c' for a cloze card.  Prototype function MakeCloze.prototype.clozeOnly
// creates the cloze deleted text and adds it as a proto property (as well as the cloze 
// and full text).  Function cToB uses those proto properties to build a new basic card 
// with only front and back properties. So that function writeCard is used to add all
// cards, regardless of how they were created to the same 'cards.txt' file

var fs = require('fs');
// 2 kinds of cards, basic and cloze
var bCard;
var cCard;
var cardStr;
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
// function to write new card to file
function writeCard() {
    fs.appendFile('cards.txt', cardStr + '\r', function(err) {
        if (err) throw err;
    })
}
// Make basic card if argv[2] = 'b'
if (func === 'b') {
    function MakeBasic(f, b) {
        if (!(this instanceof MakeBasic)) {
            return new MakeBasic(front, back)
        }
        this.front = front;
        this.back = back;
    }
    bCard = new MakeBasic(front, back);

    // stringify and write basic card
    cardStr = JSON.stringify(bCard);
    console.log('New basic card added fo file' + cardStr)
    writeCard();
    // Make cloze card if argv[2] = 'c'
} else if (func === 'c') {
    if (cloze === null || cloze === undefined){
        console.log('You forgot to add the cloze after the text.  Try again');
        return;
    }
    function MakeCloze(text) {
        if (!(this instanceof MakeCloze)) {
            return new MakeCloze(fullText)
        }
        this.fullText = fullText;
        this.cloze = cloze;
    }
    cCard = new MakeCloze(fullText);
    cardStr = JSON.stringify(cCard);
    // Create partial text property & add as .__proto__. properties

    MakeCloze.prototype.clozeOnly = function() {
        MakeCloze.prototype.cloze = cloze;
        MakeCloze.prototype.partial = fullText.replace(cloze, ellipse);
        MakeCloze.prototype.fullText = fullText;
    }
    cCard.clozeOnly()
        // function to convert cloze to basic by simply running the original MakeBasic constructor 
        //and writeCard functions
    function cToB() {
        back = cCard.__proto__.fullText;
        front = cCard.__proto__.partial;
        clozeToBasic = MakeBasic(back, front)
        cardStr = JSON.stringify(clozeToBasic)
        writeCard(cardStr)
    }
    cToB()
    console.log('new basic card created from cloze inputs'  + cardStr);
}
