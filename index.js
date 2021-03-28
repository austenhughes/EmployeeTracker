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
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    inquirer.prompt(
      {
        name: 'departmentsSorted',
        type: 'list',
        message: 'what department would you like to see',
        choices() {
          const departmentArray = [];
          results.forEach(({ id }) => {
          departmentArray.push(id);
          });
          return departmentArray;
        },
    } 
    )
    .then((answer) => {
      connection.query(
        'SELECT * FROM employees WHERE ?',
        {departmentID: answer.departmentsSorted},
        (err, res) => {
          if (err) throw err;
          else {
            const employeeByDepartmentArray = [];
            res.forEach(({ firstName }) => {
            employeeByDepartmentArray.push(firstName); 
          });
            connection.end();
            console.log(employeeByDepartmentArray);
            return employeeByDepartmentArray;
          };
    })
  })
});
};

function selectRole(){
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    inquirer.prompt(
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
    } 
    )
    .then((answer) => {
      connection.query(
        'SELECT * FROM employees WHERE ?',
        {jobTitleID: answer.rolesSorted},
        (err, res) => {
          if (err) throw err;
          else {
            const employeeByRolesArray = [];
            res.forEach(({ firstName }) => {
            employeeByRolesArray.push(firstName);
          });
            connection.end(); 
            console.log(employeeByRolesArray);
            return employeeByRolesArray;
          };
    })
  })
});
};
  
function sortByEmployee(){
connection.query('SELECT * FROM employees', (err, results) => {
if (err) throw err;
inquirer.prompt(
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
} 
)
.then((answer) => {
  connection.query(
    'SELECT * FROM employees WHERE ?',
    {firstName: answer.employeesSorted},
    (err, res) => {
      if (err) throw err;
      else {
        const employeesSortedArray = [];
        res.forEach(({ firstName }) => {
        employeesSortedArray.push(firstName);
      });
        connection.end(); 
        console.log(employeesSortedArray);
        return employeesSortedArray;
        // sortByRole();
      };
})
})
});
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
      type: 'list',
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
      type: 'list',
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




