DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tesla Model S", "Electric", 124000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tesla Model X", "Electric", 144000, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tesla Model 3", "Electric", 60000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roadster 2", "Electric", 250000, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Porsche Taycan", "Electric", 90000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lexus LFA", "Gas", 375000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toyota Tundra", "Gas", 50000, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toyota Highlander", "Gas", 40000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lexus GS-F", "Gas", 60000, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lexus IS-F", "Gas", 50000, 9);

SELECT * FROM products;

