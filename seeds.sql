INSERT INTO departments (departmentName) 
values
('GOD'), 
('research'),
('manager'),
('employee');
INSERT INTO roles (jobTitle, salery, departmentID) 
values 
('DOG', '2000000.00', '4'),
('person', '200000.00', '3'),
('robot', '20000.00', '2'),
('bob', '2000.00', '1');
INSERT INTO employees (firstName, lastName, jobTitleID, ManagerID) 
values 
('bob', 'bobman', '4', 'emploee ID of manager'),
('bob2', 'bobsmith', '3', '0'),
('bob3', 'bobington', '2', '0'),
('bob4', 'bobner', '1', '0');