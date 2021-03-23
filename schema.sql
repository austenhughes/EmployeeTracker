DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL,
  departmentName VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  jobTitle VARCHAR(30) NULL,
  salery DECIMAL(10,2) NULL,
  departmentID INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30) NULL,
  lastName VARCHAR(30) NULL,
  jobTitleID INT NULL,
  ManagerID INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

