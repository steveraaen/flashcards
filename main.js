var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
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
        inquirer.prompt([
        {
            name: 'addFront',
            type: 'input',
            message: 'enter the question'
        }, 
        {
            name: 'addBack',
            type: 'input',
            message: 'Enter the answer'
        }
        ]).then(function(answer){

            console.log(answer.addFront)
            console.log(answer.addBack)
        })

    }
}
