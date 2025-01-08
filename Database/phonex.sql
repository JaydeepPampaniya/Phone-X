create database phonexapis;
use phonexapis;

CREATE TABLE signup (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(100) NOT NULL,
    createdat VARCHAR(100) NOT NULL,
    lastlogin VARCHAR(100),
    PRIMARY KEY (id)
);

alter table signup modify column email VARCHAR(100) NOT NULL UNIQUE;

CREATE TABLE additem (
    id INT NOT NULL AUTO_INCREMENT,
    image VARCHAR(100) NOT NULL,
    companyName VARCHAR(100) NOT NULL,
    deviceName VARCHAR(100) NOT NULL,
    originalPrice DECIMAL(10,2) NOT NULL,
	currentPrice DECIMAL(10,2) NOT NULL,
	discount DECIMAL(10,2) NOT NULL,
    description VARCHAR(10000) NOT NULL,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE adminsignup (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE bagitem (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    productId INT NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    categoryName VARCHAR(100) NOT NULL,
    categoryImage VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE delivery (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(100) NOT NULL,
    pincode VARCHAR(100) NOT NULL,
    locality VARCHAR(100) NOT NULL,
    address VARCHAR(1000) NOT NULL,
    cityTownDistrict VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    productId INT NOT NULL,
    userId INT NOT NULL,
    orderdate VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

select * from signup;
insert into adminsignup values(1,'admin','admin@gmail.com','admin@123');

select * from additem;
select * from bagitem;

insert into bagitem values (1,4,1),(2,8,5);





