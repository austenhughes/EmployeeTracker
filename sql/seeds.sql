INSERT INTO departments (departmentName) 
values
('GOD'), 
('research'),
('secret'),
('sales');
INSERT INTO roles (jobTitle) 
values 
('robot'),
('manager'),
('monkey'),
('bob');
INSERT INTO employees (firstName, lastName, jobTitleID, ManagerID, departmentID, salary) 
values 
('bob', 'bobman', '4', '1', '1', '20000.00'),
('bob2', 'bobsmith', '3', '1', '1', '200000.00'),
('bob3', 'bobington', '2', '1', '2', '2000.00'),
('bob4', 'bobner', '1', '3', '4', '20000000.00');