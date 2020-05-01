# Employee Management System

A node.js CLI app that uses Mysql database to manage employees.

- [Installation](#Installation)
- [Usage](#Usage)
- [Dependencies](#Dependencies)
- [Tests](#Tests)

## Installation

Clone the app repository then run the following command to install the app dependencies.

```sh
npm install
```

## Usage

To run the app, use the following command in a terminal.

```sh
node app.js
```

Then follow the command prompt to enter the requested information.

After entering data for all the team members, a team.html file will be generated in the output folder.

## Dependencies

The app uses the following node modules.

- fs
- inquirer
- path
- jest

In addition the app used the following classes as local modules.

- Employee
- Manager
- Engineer
- Intern

## Tests

The app uses jest library to setup and run unit tests to test the classes.

To run the test use the following command.

```sh
npm run test
```

Here is the output of a test run

```sh

> jest --verbose test/*

 PASS  test/Engineer.test.js
  √ Can set GitHUb account via constructor (4ms)
  √ getRole() should return "Engineer" (1ms)
  √ Can get GitHub username via getGithub()

 PASS  test/Manager.test.js
  √ Can set office number via constructor argument (4ms)
  √ getRole() should return "Manager" (1ms)
  √ Can get office number via getOffice()

 PASS  test/Intern.test.js
  √ Can set school via constructor (4ms)
  √ getRole() should return "Intern"
  √ Can get school via getSchool() (1ms)

 PASS  test/Employee.test.js
  √ Can instantiate Employee instance (12ms)
  √ Can set name via constructor arguments
  √ Can set id via constructor argument (1ms)
  √ Can set email via constructor argument
  √ Can get name via getName() (1ms)
  √ Can get id via getId() (2ms)
  √ Can get email via getEmail() (1ms)
  √ getRole() should return "Employee"

Test Suites: 4 passed, 4 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        4.052s
Ran all test suites matching /test\\*/i.
```
