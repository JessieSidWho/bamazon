var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

// Intial Start Function
function start() {
  connection.query('SELECT * FROM Products', function(err, res){

      for (var i in res) {
          console.log(`| Item: ${res[i].product_name}  
| Price: ${res[i].price} 
| Stock: ${res[i].stock_quantity}
           `);
        // const table = cTable.getTable([
        //       {
        //           Item: res[i].product_name,
        //           Price: res[i].price,
        //           Stock: res[i].stock_quantity
        //       }
        //   ])
        //   console.log(table);
       }
      
      inquirer.prompt([{
          name: "choice",
          type: "rawlist",
          message: "What would you like to buy?",
          choices: function(value) {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].product_name);
              }
              return choiceArray;
          }
      }, {

          name: "quantity",
          type: "input",
          message: "How many would you like to buy?",
          validate: function(value) {
              if (isNaN(value) == false) {
                  return true;
              } else {
                  return false;
              }
          }
      }]).then(function(response) {
          for (var i = 0; i < res.length; i++) {
              if (res[i].product_name == response.choice) {
                  var chosenItem = res[i];
              }
          }

          var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(response.quantity);

          if (chosenItem.stock_quantity < parseInt(response.quantity)) {
              console.log("Insufficient quantity!");

              repurchase();
          } else {
              connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updateStock}, {item_id: chosenItem.item_id}], function(err, res) {
                  console.log("Purchase successful!");

                  var Total = (parseInt(response.quantity)*chosenItem.price).toFixed(2);
                  console.log("Your total is $" + Total);

                  repurchase();
              });
          }

      }); 
                       
  }); 
  
}

// Repurchase Function
function repurchase() {
  inquirer.prompt({
      name: "repurchase",
      type: "list",
      choices: ["Yes", "No"],
      message: "Would you like to purchase another item?"
  }).then(function(response) {
      if (response.repurchase == "Yes") {
          start();
      }
      else {
          console.log("Thanks for choosing Baller-Boy Motors! Have an awesome day!")
      }
  });
}