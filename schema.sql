CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;


CREATE TABLE department (
departmentID INT NOT NULL AUTO_INCREMENT,
department_name TEXT NOT NULL,
PRIMARY KEY(departmentID)
);


CREATE TABLE employeeRole (
roleID INT NOT NULL AUTO_INCREMENT, 
title TEXT NOT NULL,
salary DECIMAL NOT NULL,
departmentID INT,
PRIMARY KEY(roleID),
FOREIGN KEY (departmentID) REFERENCES department(departmentID)
);


CREATE TABLE employee (
employeeID INT NOT NULL AUTO_INCREMENT,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
roleID INT,
managerID INT,
PRIMARY KEY(employeeID),
FOREIGN KEY (roleID) REFERENCES employeeRole(roleID)
);