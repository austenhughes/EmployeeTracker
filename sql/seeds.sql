INSERT INTO departments (departmentName) 
values
('GOD'), 
('research'),
('secret'),
('sales');
INSERT INTO roles (jobTitle, salery, departmentID) 
values 
('robot', '2000000.00', '1'),
('manager', '200000.00', '2'),
('monkey', '20000.00', '3'),
('bob', '2000.00', '4');
INSERT INTO employees (firstName, lastName, jobTitleID, ManagerID) 
values 
('bob', 'bobman', '4', '0'),
('bob2', 'bobsmith', '3', '1'),
('bob3', 'bobington', '2', '1'),
('bob4', 'bobner', '1', '3');