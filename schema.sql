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
('Sales rep', 1000, 3),
('Sales manager', 4000, 3),
('Technician', 2000, 2),
('Workshop manager', 3000, 1),
('CEO', 10000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jerry', 'Tom', 5, 1),
('John', 'Smith', 4, 1),
('Dina', 'Ahmed', 2, 1),
('Sarah', 'Peter', 1, 3),
('Mohamed', 'Eleraky', 3, 2);