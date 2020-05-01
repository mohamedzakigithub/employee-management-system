DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name) VALUES
('Management'),
('Workshop'),
('Sales');

INSERT INTO role (title, salary, department_id) VALUES
('CEO', 10000, 1),
('Workshop manager', 6000, 2),
('Sales manager', 4000, 3),
('Technician', 2000, 2),
('Sales rep', 1000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Smith', 1, 1),
('Jack', 'David', 2, 1),
('Sarah', 'Peter', 3, 1),
('Mohamed', 'Zaki', 4, 2),
('Dina', 'Ahmed', 5, 3);