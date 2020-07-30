DROP DATABASE [IF EXISTS] employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;


CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
department_name TEXT NOT NULL,
PRIMARY KEY(id)
);


CREATE TABLE `role ` (
id INT NOT NULL AUTO_INCREMENT, 
title TEXT NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
PRIMARY KEY(id),
FOREIGN KEY (department_id) REFERENCES department(department_id)
);


CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY (role_id) REFERENCES `role`(id)
);