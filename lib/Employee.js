var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
});
class Employee {
  constructor(id, first_name, last_name, role_id, manager_id) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }

  add() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [this.first_name, this.last_name, this.role_id, this.manager_id],
        function (err, res) {
          if (err) throw err;
          resolve("Employee Added");
        }
      );
    });
  }

  remove() {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM employee where id = ?",
        [this.id],
        function (err, res) {
          if (err) throw err;
          resolve("Employee Removed");
        }
      );
    });
  }

  updateRole() {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE employee SET role_id = ? where id = ?",
        [this.role_id, this.id],
        function (err, res) {
          if (err) throw err;
          resolve("Employee Role Updated");
        }
      );
    });
  }

  updateManager() {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE employee SET manager_id = ? where id = ?",
        [this.manager_id, this.id],
        function (err, res) {
          if (err) throw err;
          resolve("Employee Manager Updated");
        }
      );
    });
  }
}
module.exports = Employee;
