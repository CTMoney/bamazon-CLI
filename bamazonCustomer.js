const mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require('dotenv').config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon_db"
});


var choicesArr = [], stock = [], item = [], price = [];

connection.connect((err) => {

    if (err) { throw err }
    console.log("\nWelcome to Bamazon!\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) { throw err }
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id}.) ${res[i].product_name}: $${res[i].price}`);
            choicesArr.push(`${res[i].item_id}.) ${res[i].product_name}: $${res[i].price}`);
            stock.push(res[i].stock_quantity);
            item.push(res[i].product_name);
            price.push(res[i].price);
        }
        console.log(`\n`);
    })
    setTimeout(() => {
        inquirer
            .prompt([{
                type: "list",
                message: "What would you like to purchase?",
                choices: choicesArr,
                name: "product_selected"
            },
            {
                message: "How much would you like?",
                name: "amount_selected"
            }])
            .then((res) => {
                let z = choicesArr.indexOf(res.product_selected);
                if (res.amount_selected > stock[z]) {
                    console.log(`Sorry we don't have enough stock to cover that order!`);
                    console.log(`We currently only have ${stock[z]} of ${item[z]}`);
                    connection.end()
                }
                if (res.amount_selected < stock[z]) {
                    let newStockQuant = stock[z] - res.amount_selected;
                    let itemID = z + 1;
                    let totalCost = (price[z] * res.amount_selected + ((price[z] * res.amount_selected) * 0.07)).toFixed(2);
                    console.log("\nHere you go!");
                    console.log(`x${res.amount_selected}: ${item[z]}`);
                    console.log(`Total Cost: $${totalCost}\nThank you and have a wonderful day!`);

                    connection.query(`UPDATE products SET ? WHERE ?`,
                    [
                        {
                            stock_quantity: newStockQuant
                        },
                        {
                            item_id: itemID
                        }
                    ],
                        function (err, res) {
                            if (err) { throw err }
                        })
                    connection.end()
                }
            })

    }, 250);


});
