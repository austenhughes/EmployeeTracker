const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'Merlin0502!',
  database: 'employeeDB',
});


const run = () => {
  inquirer.prompt(
      [
        {
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
        'sort employees',
        'add employee',
        'exit'
        ]
            },
        ])
        .then((answer) => {
            choice = answer.start;
            direct();
          })
};

function direct() {
    switch(choice) {
        case 'sort employees':
        sortEmployees();
          break;
        case 'add employee':
        addEmployee();
          break;
        default:
            console.log("goodby")
            connection.end();
    }
};

function sortEmployees() {
  inquirer.prompt(
    {
      name: 'sort',
      type: 'list',
      message: 'sort by : ',
      choices: [
      'Department',
      'Role',
      'Employee'
      ]
    })
    .then((answer) => {
      sorting = answer.sort;
      direct2();
    });  
};

function direct2 (){
  switch(sorting) {
    case 'Department':
    sortByDepartment();
      break;
    case 'Role':
    sortByRole();
      break;
    case 'Employee':
    sortByEmployee();
      break;
    default:
        console.log("not working")
}
};

function sortByDepartment(){
console.log("bob over here")
};
function sortByRole(){
console.log("bob over there")
};
function sortByEmployee(){
console.log("bob everywhere")
};

function addEmployee() { 
    inquirer.prompt([
    {
    name: 'firstName',
    type: 'input',
    message: 'first name?',
  },
  {
    name: 'lastName',
    type: 'input',
    message: 'last name?',
  },
  {
    name: 'salary',
    type: 'input',
    message: 'what is your yearly salary?',
  },
  {
      name: 'role',
      type: 'list',
      message: 'What is your job title/role?',
      choices: [
      '1) Bob',
      '2) Robot',
      '3) Person',
      '4) DOG'
      ]
  },
  {
      name: 'department',
      type: 'list',
      message: 'What is your department?',
      choices: [
      '1) Employee',
      '2) Manager',
      '3) Research',
      '4) GOD'
      ]
  },
  {
      name: 'manager',
      type: 'list',
      message: 'Who is your manager?',
      choices: [
      '1) choice 1',
      '2) choice 2',
      '3) choice 3',
      '4) choice 4'
      ]
  } 
  ])};
 
let choice = "";
let sorting = "";

run();
    

