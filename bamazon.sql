DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60) NULL,
    price FLOAT(11,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price,stock_quantity)
VALUES
    ("Soap","Personal Care", 4.99, 1500),
    ("Doc Martens","Shoes", 120, 150),
    ("Bed", "Furniture" , 1200, 50),
    ("Toothpaste","Personal Care",6.85, 1500),
    ("Lottery","Misc", 5.00, 999999999),
    ("Batteries","Electronics", 4.99, 1500),
    ("Gray T-Shirt","Clothing", 12.99, 900),
    ("Harry Potter","Books", 19.99, 250),
    ("Seeds","Gardening", 1.99, 400),
    ("Ice cream","Frozen Goods",8.99, 900);