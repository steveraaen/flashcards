var fs = require('fs');
// 2 kinds of cards, basic and cloze
var bCard = {};
var cCard = {};
// First command line input defines which card to build
var func = process.argv[2];
// Assignments for basic
var front = process.argv[3];
var back = process.argv[4];
// Assignments for cloze
var full = process.argv[3];
var cloze = process.argv[4];
var remain = process.argv[5];
var cardStr;
// Choose basic or cloze
if (func === 'b') {
    basicCard()
}
else if (func === 'c'){
    clozeCard()
}
// Construct scope safe basic object 
function basicCard(){
    function MakeBasic(f, b){
        if(!(this instanceof MakeBasic)){
            return new MakeBasic(front, back)
        }
        this.front = front;
        this.back = back;
    }
MakeBasic.call(bCard, front, back)
/*    bCard = new MakeBasic(front, back)*/
// Save basic card to ext file
        cardStr = JSON.stringify(bCard);
        fs.appendFile('cards.txt', cardStr + '\r', function(err){
            if (err) throw err;
        })   
}
// Construct scope safe cloze object 
function clozeCard(){
    function MakeCloze(f, c, r){
        if(!(this instanceof MakeCloze)){
            return new MakeCloze(full, cloze, remain)
        }
        this.full = full;
        this.cloze = cloze;
        this.remain = remain;
    }
    cCard = new MakeCloze(full, cloze, remain)
// Save cloze card to ext file
        cardStr = JSON.stringify(cCard);
        fs.appendFile('cards.txt', cardStr + '\r', function(err){
            if (err) throw err;
        })   
}

var bProto = Object.getPrototypeOf(bCard);
console.log(bProto)





