var mysql = require("mysql");
var inquirer = require("inquirer");

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


var start = function(){
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
    //   console.log(res);
        for(i = 0; i < res.length; i++){
            var response = res[i];
            console.log(`
                Item-ID: ${response.item_id}  ||  Product: ${response.product_name}  ||  Price: $${response.price}
            `)
        }
        connection.end();
        askToBuy();
    });
}


var askToBuy = function(){
    inquirer
    .prompt({
      name: "buy",
      type: "input",
      message: "What is the Item-ID of the product you'd like to buy: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
  }).then(function(response){
  
      
  });
}