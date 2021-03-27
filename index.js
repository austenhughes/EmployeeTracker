const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'Merlin0502!',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  run();
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
        'add',
        'edit',
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
        case 'add':
        addWhat();
          break;
        case 'edit':
        updateEmployeeRole();
          break;
        default:
            console.log("goodby")
            connection.end();
    }
};

function addWhat(){
  inquirer.prompt(
    [
      {
      name: 'addChoice',
      type: 'list',
      message: 'What would you like to add?',
      choices: [
      'employee',
      'department',
      'job/role'
      ]
          },
      ])
      .then((answer) => {
          addingWhat = answer.addChoice;
          direct3();
        })  
}

function direct3 (){
  switch(addingWhat) {
    case 'employee':
    addEmployee();
      break;
    case 'department':
    addDepartment();
      break;
    case 'job/role':
    addRole();
      break;
    default:
        console.log("not working")
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
    selectDepartment();
      break;
    case 'Role':
    selectRole();
      break;
    case 'Employee':
    sortByEmployee();
      break;
    default:
        console.log("not working")
}
};

function selectDepartment(){
sortByDepartment();
};

function sortByDepartment(){
console.log("sortByDepartment working");
run();
};

function selectRole(){
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'rolesSorted',
        type: 'list',
        message: 'who would you like to see',
        choices() {
          const rolesArray = [];
          results.forEach(({ id }) => {
          rolesArray.push(id);
          });
          return rolesArray;
        },
    }, 
    ])
    })
    connection.end()
    .then((answer) => {
      const query = 'SELECT * FROM employees WHERE roles.id = ?';
      connection.query(query, answer.rolesSorted , (err, res) => {
        res.forEach(({firstName, lastName,}) => {
          console.log(
            `fist: ${firstName} || last: ${lastName}`
          );
        });
    });
    connection.end();
    // connection.end();
    // sortByRole();
    });
  

// function sortByRole(){
// console.log("sortByRole working");
// const query = 'SELECT * FROM employees WHERE roles.id = ?'
// connection.query(query, sortingRole , (err, results) => {
// if (err) throw err;
// console.log(results)
// });
// connection.end();
};

function sortByEmployee(){
connection.query('SELECT * FROM employees', (err, results) => {
if (err) throw err;
inquirer.prompt([
  {
    name: 'employeesSorted',
    type: 'list',
    message: 'select an employee',
    choices() {
      const employeeArray = [];
      results.forEach(({ firstName }) => {
      employeeArray.push(firstName);
      });
      return employeeArray;
    },
}, 
])
});
connection.end();
};

function addDepartment(){
console.log("addDepartment working");
run();
};

function addRole(){
console.log("addRole working");
run();
};

function addEmployee() {
  
  connection.query('SELECT * FROM departments, roles, employees', (err, results) => {
  if (err) throw err;

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
      type: 'rawlist',
      message: 'What is your job title/role?',
      choices() {
        const titleArray = [];
        results.forEach(({ jobTitle }) => {
        titleArray.push(jobTitle);
        });
        return titleArray;
      },    
  },
  {
      name: 'department',
      type: 'rawlist',
      message: 'What is your department?',
      choices() {
          const departmentArray = [];
          results.forEach(({ departmentName }) => {
          departmentArray.push(departmentName);
          });
          return departmentArray;
        },    
  },
  {
      name: 'manager',
      type: 'list',
      message: 'Who is your manager?',
      choices() {
        const managerArray = [];
        results.forEach(({ firstName }) => {
        managerArray.push(firstName);
        });
        return managerArray;
      },
  }, 
  ])
});
connection.end();
};

function updateEmployeeRole(){
console.log("updateEmployeeRole working");
run();
};
 
let choice = "";
let sorting = "";
let addingWhat = "";
let sortingRole = "";


    

