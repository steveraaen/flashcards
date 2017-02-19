var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");

var cardsArray = [];
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "felisa",
    database: "flashcards"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log(connection.threadId)
    doFlash();
});

function doFlash() {
    inquirer.prompt({
        name: 'addPlay',
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add a new card?",
            "Play Flash?"
        ]
    }).then(function(answer) {
        switch (answer.addPlay) {
            case "Add a new card?":
                addCard();
                break;
            case "Play Flash?":
                playFlash();
                break;
        }
    })

    function addCard() {
        inquirer.prompt([{
                name: 'addFront',
                type: 'input',
                message: 'enter the question'
            }, {
                name: 'addBack',
                type: 'input',
                message: 'Enter the answer'
            }, {
                name: 'addNext',
                type: 'confirm',
                message: 'Card saved.  Would you like to add another?'
            }

        ]).then(function(answer) {
            console.log(answer.addNext)

            var answerString = JSON.stringify(answer)

            fs.appendFile('cards.txt', answerString, function(err) {
                if (err) throw err;
            })
            if(answer.addNext === true){
                addCard()
            }
            else{
                console.log("Your card has been saved.")
            }

        })
    }
}
