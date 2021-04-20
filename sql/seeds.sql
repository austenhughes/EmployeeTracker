INSERT INTO departments (departmentName) 
values
('GOD'), 
('research'),
('secret'),
('sales');
INSERT INTO roles (jobTitle) 
values 
('manager'),
('robot'),
('monkey'),
('bob');
INSERT INTO employees (firstName, lastName, jobTitleID, ManagerID, departmentID, salary) 
values 
('bob', 'bobman', '4', '1', '1', '20000.00'),
('bob2', 'bobsmith', '3', '8', '2', '200000.00'),
('bob3', 'bobington', '2', '5', '3', '2000.00'),
('bob4', 'bobner', '1', '1', '8', '20000000.00'),
('bob5', 'boblinger', '4', '1', '1', '20000.00'),
('bob6', 'boberger', '3', '5', '3', '200000.00'),
('bob7', 'bobMcbob', '2', '8', '2', '2000.00'),
('bob8', 'bobit', '1', '1', '1', '20000000.00');