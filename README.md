# Employee Management System

A node.js CLI app that uses Mysql database to manage employees.

- [Demo](#Demo)
- [Installation](#Installation)
- [Usage](#Usage)
- [Dependencies](#Dependencies)

## Demo

![](/demo.gif)

## Installation

Clone the app repository then run the following command to install the app dependencies.

```sh
npm install
```

Run the Mysql query in the schema.sql file to initialize and seed the database.

Add your local Mysql database server password in the create connection object in the app.js file

## Usage

To run the app, use the following command in a terminal.

```sh
node app.js
```

Then follow the command prompt to select a task to do.

## Dependencies

The app uses the following node modules.

- mysql
- inquirer
- figlet

In addition the app used the following classes as local modules to handle database queries.

- Employee
- Role
- Department
