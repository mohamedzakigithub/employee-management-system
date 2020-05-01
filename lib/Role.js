// Define and export the Role class
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

class Role {
  constructor(id, title, salary, department_id) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }

  add() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [this.title, this.salary, this.department_id],
        function (err, res) {
          if (err) throw err;
          resolve("Role Added");
        }
      );
    });
  }
  remove() {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM role where id = ?", [this.id], function (
        err,
        res
      ) {
        if (err) throw err;
        resolve("Role Removed");
      });
    });
  }
}

module.exports = Role;
