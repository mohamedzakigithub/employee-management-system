const Employee = require("./lib/Employee");
const Role = require("./lib/Role");
const Department = require("./lib/Department");
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
});

function start() {
  console.log("----------------------------------------------------");
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
        "Add role",
        "Remove role",
        "Add department",
        "Remove department",
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
        case "Add role":
          addRole();
          break;
        case "Remove role":
          removeRole();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Remove department":
          removeDepartment();
          break;
      }
    });
}

function getEmployees() {
  return new Promise(function (resolve, reject) {
    const employeeList = [];
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      res.forEach((el) => {
        employeeList.push({
          id: el.id,
          first_name: el.first_name,
          last_name: el.last_name,
          role_id: el.role_id,
          manager_id: el.manager_id,
        });
      });
      resolve(employeeList);
    });
  });
}

function getRoles() {
  return new Promise(function (resolve, reject) {
    const roleList = [];
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      res.forEach((el) => {
        roleList.push({
          id: el.id,
          title: el.title,
        });
      });
      resolve(roleList);
    });
  });
}

function getDepartments() {
  return new Promise(function (resolve, reject) {
    const departmentList = [];
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      res.forEach((el) => {
        departmentList.push({
          id: el.id,
          name: el.name,
        });
      });
      resolve(departmentList);
    });
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

async function viewAllByDepartment() {
  const departmentList = await getDepartments();
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
}

async function viewAllByManager() {
  let employeeList = await getEmployees();
  managersList = employeeList.map((el) => el.first_name + " " + el.last_name);
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
          console.log("----------------------------------------------------");
          console.table(res);
          console.log("----------------------------------------------------");
          start();
        }
      );
    });
}

async function addEmployee() {
  const employeeList = await getEmployees();
  const roles = await getRoles();
  const roleList = roles.map((el) => el.title);
  const managersList = employeeList.map(
    (el) => el.first_name + " " + el.last_name
  );
  const answer = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "Enter employee first name:",
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter employee last name:",
    },
    {
      name: "role",
      type: "list",
      message: "Select employee role:",
      choices: roleList,
    },
    {
      name: "manager",
      type: "list",
      message: "Select employee manager:",
      choices: managersList,
    },
  ]);
  const first_name = answer.first_name;
  const last_name = answer.last_name;
  const role_id = roles.find((el) => el.title == answer.role).id;
  const manager_id = employeeList.find(
    (el) => el.first_name + " " + el.last_name == answer.manager
  ).id;
  employee = new Employee(null, first_name, last_name, role_id, manager_id);
  const result = await employee.add();
  console.log(result);
  start();
}

async function removeEmployee() {
  const employees = await getEmployees();
  const employeeList = employees.map(
    (el) => el.first_name + " " + el.last_name
  );
  const answer = await inquirer.prompt({
    name: "employee",
    type: "list",
    message: "Select employee to remove:",
    choices: employeeList,
  });
  const id = employees.find(
    (el) => el.first_name + " " + el.last_name == answer.employee
  ).id;
  employee = new Employee(id);
  const result = await employee.remove();
  console.log(result);
  start();
  id;
}

async function addRole() {
  const departments = await getDepartments();
  const departmentList = departments.map((el) => el.name);
  const answer = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter new role name:",
    },
    {
      name: "salary",
      type: "input",
      message: "Enter new role salary:",
    },
    {
      name: "department",
      type: "list",
      message: "Select department: ",
      choices: departmentList,
    },
  ]);
  const title = answer.title;
  const salary = answer.salary;
  const department_id = departments.find((el) => el.name == answer.department)
    .id;
  role = new Role(null, title, salary, department_id);
  const result = await role.add();
  console.log(result);
  start();
}

async function removeRole() {
  const roles = await getRoles();
  const roleList = roles.map((el) => el.title);
  const answer = await inquirer.prompt({
    name: "title",
    type: "list",
    message: "Select role to remove:",
    choices: roleList,
  });
  const title = answer.title;
  const id = roles.find((el) => el.title == answer.title).id;
  role = new Role(id);
  const result = await role.remove();
  console.log(result);
  start();
}

// Handle departments

async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter new department name:",
    },
  ]);
  const name = answer.name;
  department = new Department(null, name);
  const result = await department.add();
  console.log(result);
  start();
}

async function removeDepartment() {
  const departments = await getDepartments();
  const departmentList = departments.map((el) => el.name);
  const answer = await inquirer.prompt({
    name: "name",
    type: "list",
    message: "Select department to remove:",
    choices: departmentList,
  });
  const name = answer.name;
  const id = departments.find((el) => el.name == answer.name).id;
  department = new Department(id);
  const result = await department.remove();
  console.log(result);
  start();
}

start();
