var fs = require('fs');
// 2 kinds of cards, basic and cloze
var bCard;
var cCard;
// First command line input defines which card to build
var func = process.argv[2];
// Assignments for basic
var name = process.argv[3];
var front = process.argv[4];
var back = process.argv[5];
// Assignments for cloze
var full = process.argv[3];
var cloze = process.argv[4];
var remain = process.argv[5];
var cardStr;
// main function
function eitherCard() {
    if (func === 'basic') {
// Build basic card
        function BasicCard(n, f, b) {
            this.name = name;
            this.front = front;
            this.back = back;
        }
        bCard = new BasicCard(name, front, back);
// Save it to a file
        function saveBCard() {
            bCardStr = JSON.stringify(bCard);
            fs.appendFile('basic.txt', bCardStr + '\r', function(err) {
                if (err) throw err;
            })
        }
        saveBCard()
    }  if (func === 'cloze') {
// Build cloze card
        function ClozeCard(f, c, r) {
            this.full = full;
            this.cloze = cloze;
            this.rmein = remain;
        }
        cCard = new ClozeCard(full, cloze, remain);
// Save it to a file
        function saveCCard() {
            cCardStr = JSON.stringify(cCard);
            fs.appendFile('cloze.txt', cCardStr + '\r', function(err) {
                if (err) throw err;
            })
        }
    }
    saveCCard()
}
eitherCard()