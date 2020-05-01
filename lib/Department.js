// Define and export the Department class
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

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  add() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [this.name],
        function (err, res) {
          if (err) throw err;
          resolve("Department Added");
        }
      );
    });
  }
  remove() {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM department where id = ?",
        [this.id],
        function (err, res) {
          if (err) throw err;
          resolve("Department Removed");
        }
      );
    });
  }
}

module.exports = Department;
