var mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
});

function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What do you want to do ?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })
    .then(function (answer) {
      switch (answer.task) {
        case "View All Employees":
          viewAll();
          break;
        case "View All Employees By Department":
          viewAllByDepartment();
          break;
        case "View All Employees By Manager":
          viewAllByManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
      }
    });
}

function viewAll() {
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department , r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id",
    function (err, res) {
      if (err) throw err;
      console.log("----------------------------------------------------");
      console.table(res);
      console.log("----------------------------------------------------");
      start();
    }
  );
}

function viewAllByDepartment() {
  connection.query("SELECT name FROM department", function (err, res) {
    if (err) throw err;
    let departmentList = [];
    res.forEach((element) => {
      departmentList.push(element.name);
    });
    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Select Department ?",
        choices: departmentList,
      })
      .then(function (answer) {
        let department = answer.department;
        connection.query(
          "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department , r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id AND d.name = ?",
          [department],
          function (err, res) {
            if (err) throw err;
            console.log("----------------------------------------------------");
            console.table(res);
            console.log("----------------------------------------------------");
            start();
          }
        );
      });
  });
}

function viewAllByManager() {
  connection.query(
    "SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee",
    function (err, res) {
      if (err) throw err;
      let managersList = [];
      res.forEach((element) => {
        managersList.push(element.manager);
      });
      inquirer
        .prompt({
          name: "manager",
          type: "list",
          message: "Select Manager ?",
          choices: managersList,
        })
        .then(function (answer) {
          let manager_firstname = answer.manager.split(" ")[0];
          let manager_lastname = answer.manager.split(" ")[1];
          connection.query(
            "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department , r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN employee m ON m.id = e.manager_id AND m.first_name =  ? AND m.last_name = ? LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id",
            [manager_firstname, manager_lastname],
            function (err, res) {
              if (err) throw err;
              console.log(
                "----------------------------------------------------"
              );
              console.table(res);
              console.log(
                "----------------------------------------------------"
              );
              start();
            }
          );
        });
    }
  );
}

start();
