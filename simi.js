var fs = require("fs");
var inquirer = require("inquirer");

"use strict";
// BasicCard constructor..
function BasicCard (front, back) {
    if (!this instanceof BasicCard) {
        return new BasicCard (front, back);
    }
    this.front = front;
    this.back = back;
};

// adding a prototype function to the BasicCard constructor..
BasicCard.prototype.displayBasicCard = function() {
    console.log("Question(Front): " + this.front + "\nAnswer(Back): " + this.back);
};

// ClozeCard constructor..
function ClozeCard (text, cloze) {
    if (!this instanceof ClozeCard) {
        return new CloseCard (text, cloze);
    }
    this.text = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, "..........");
}

// prototype function to display full text
ClozeCard.prototype.displayFullText = function() {
    console.log("Full Text: " + this.text);
}

// prototype function to display cloze text..
ClozeCard.prototype.displayClozeText = function () {
    console.log("Cloze: " + this.cloze);
}

// prototype function to display partial text..
ClozeCard.prototype.displayPartialText = function () {
    console.log("Partial Text: " + this.partial);
}

startFlashcard();

function startFlashcard() {
    inquirer.prompt([{
        name: "confirm",
        type: "rawlist",
        message: "Welcome to FlashCard! Are you ready?",
        choices: ["Yes", "No"]
    }]).then(function(response) {
        var confirm = response.confirm;

        if(confirm === "Yes") {
            playFlashcard();
        } else if (confirm === "No") {
            console.log("Please visit us again!");
            return;
        }
    });
}

function playFlashcard() {
    inquirer.prompt([{
        name: "cardType",
        type: "rawlist",
        message: "Select Category",
        choices: ["Basic", "Cloze"]
    }]).then (function(response) {
        var cardType = response.cardType;
        if(cardType === "Basic") {
            basicQuestion();
        } else {
            clozeQuestion();
        }
    })
}

function basicQuestion() {
    inquirer.prompt([{
        name: "front",
        type: "input",
        message: "Enter question(Front): "
    },{
        name: "back",
        type: "input",
        message: "Enter Answer(Back): "
    }]).then(function(basic){
        var basicFlashcard = new BasicCard(basic.front, basic.back);
        console.log("Basic Flashcard Added!");
        console.log("=========================");
        basicFlashcard.displayBasicCard();
        console.log("=========================");

        fs.appendFile("basicCard.json", JSON.stringify(basicFlashcard) + "\n" , function(err)  {
            if (err) throw err;    
        })
    })
}

function clozeQuestion() {
    inquirer.prompt([{
        name: "text",
        type: "input",
        message: "Enter full statement: "
    }, {
        name: "cloze",
        type: "input",
        message: "Enter the Cloze word(s): "
    }]).then(function(cloze) {
        var clozeFlashcard = new ClozeCard(cloze.text, cloze.cloze);
        console.log("Cloze Flashcard Added!");
        console.log("=========================");
        clozeFlashcard.displayPartialText();
        clozeFlashcard.displayClozeText();
        clozeFlashcard.displayFullText();
        console.log("=========================");

        fs.appendFile("clozeCard.json", JSON.stringify(clozeFlashcard) + "\n", function(err){
            if(err) throw err;
        });
    });
}
