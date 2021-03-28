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
        // updateEmployeeRole();
        editWhat();
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

function editWhat(){
  inquirer.prompt(
    [
      {
      name: 'editChoice',
      type: 'list',
      message: 'What would you like to edit?',
      choices: [
      'employee',
      'department',
      'job/role'
      ]
          },
      ])
      .then((answer) => {
          editThis = answer.editChoice;
          direct4();
        })  
}

function direct4(){
  switch(editThis) {
    case 'employee':
    editEmployeeStart();
      break;
    case 'department':
    editDepartment();
      break;
    case 'job/role':
    editRole();
      break;
    default:
        console.log("not working")
}
}

function editEmployeeStart(){
  inquirer.prompt(
    [
      {
      name: 'editEmployeeDetails',
      type: 'list',
      message: 'What would you like to edit?',
      choices: [
      'firstName',
      'lastName',
      'job/roleID',
      'salary',
      'managerID',
      'departmentID',
      ]
          },
      ])
      .then((answer) => {
          editEmployee = answer.editEmployeeDetails;
          direct5();
        })  
};

function direct5(){
  switch(editEmployee) {
    case 'firstName':
    updateFirstName();
      break;
    case 'lastName':
    updateLastName();
      break;
    case 'job/roleID':
    updateEmployeeRole();
      break;
    case 'salary':
    updateSalary();
      break;
    case 'managerID':
    updateManager();
      break;
    case 'departmentID':
    updateDepartment();
      break;
    default:
        console.log("goodby")
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
      'Employee',
      'Manger'
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
    case 'Manger':
    selectManager();
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
            res.forEach(({ firstName, lastName, salary, managerID, departmentID, jobTitleID }) => {
            employeeByDepartmentArray.push("firstName",firstName,"lastName",lastName,"$",salary,"managerID",managerID,"departmentID",departmentID,"jobTitleID",jobTitleID);
          });
            connection.end();
            console.log(employeeByDepartmentArray);
            return employeeByDepartmentArray;
          };
    })
  })
});
};

function selectManager(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt(
      {
        name: 'managerTeamsSorted',
        type: 'list',
        message: 'Which managers employee team would you like to see? ',
        choices() {
          const ManagerTeamsArray = [];
          results.forEach(({ managerID }) => {
          ManagerTeamsArray.push(managerID);
          });
          return ManagerTeamsArray;
        },
    } 
    )
    .then((answer) => {
      connection.query(
        'SELECT * FROM employees WHERE ?',
        {managerID: answer.managerTeamsSorted},
        (err, res) => {
          if (err) throw err;
          else {
            const employeeByManagerArray = [];
            res.forEach(({ firstName, lastName, salary, managerID, departmentID, jobTitleID }) => {
            employeeByManagerArray.push("firstName",firstName,"lastName",lastName,"$",salary,"managerID",managerID,"departmentID",departmentID,"jobTitleID",jobTitleID);
          });
            connection.end();
            console.log(employeeByManagerArray);
            return employeeByManagerArray;
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
            res.forEach(({ firstName, lastName, salary, managerID, departmentID, jobTitleID }) => {
            employeeByRolesArray.push("firstName",firstName,"lastName",lastName,"$",salary,"managerID",managerID,"departmentID",departmentID,"jobTitleID",jobTitleID);
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
        res.forEach(({ firstName, lastName, salary, managerID, departmentID, jobTitleID }) => {
        employeesSortedArray.push("firstName",firstName,"lastName",lastName,"$",salary,"managerID",managerID,"departmentID",departmentID,"jobTitleID",jobTitleID);
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
inquirer.prompt([
  {
    name: 'newDepartment',
    type: 'input',
    message: 'what is the new department?',
  },
])
.then((answer) => {
connection.query(
  'INSERT INTO departments SET ?',
  {departmentName : answer.newDepartment},
  (err, res) => {
    if (err) throw err;
  })
});
};

function addRole(){
  inquirer.prompt([
    {
      name: 'newRole',
      type: 'input',
      message: 'what is the new role/title?',
    },
  ])
  .then((answer) => {
  connection.query(
    'INSERT INTO roles SET ?',
    {jobTitle : answer.newRole},
    (err, res) => {
      if (err) throw err;
    })
  });
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
      message: 'What is your job title/role ID?',
      choices() {
        const titleArray = [];
        results.forEach(({ jobTitleID }) => {
        titleArray.push(jobTitleID);
        });
        return titleArray;
      },    
  },
  {
      name: 'department',
      type: 'list',
      message: 'What is your department ID?',
      choices() {
          const departmentArray = [];
          results.forEach(({ departmentID }) => {
          departmentArray.push(departmentID);
          });
          return departmentArray;
        },    
  },
  {
      name: 'manager',
      type: 'list',
      message: 'What is your managers ID?',
      choices() {
        const managerArray = [];
        results.forEach(({ managerID }) => {
        managerArray.push(managerID);
        });
        return managerArray;
      },
  }, 
  ])
  .then((answer) => {
    connection.query(
      'INSERT INTO employees SET ?',
      {
        firstName: answer.firstName,
        lastName: answer.lastName,
        jobTitleID: answer.role,
        managerID: answer.manager,
        departmentID: answer.department,
        salary: answer.salary
      },
      (err, res) => {
        if (err) throw err;
      })
      connection.end();
});
});
}

function updateEmployeeRole(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateEmployee',
        type: 'list',
        message: 'for which employee : ',
        choices() {
          const updateEmployeeArray = [];
          results.forEach(({ firstName }) => {
          updateEmployeeArray.push(firstName);
          });
          return updateEmployeeArray;
        }
      },
      {
        name: 'updateRole',
        type: 'list',
        message: 'update role id to : ',
        choices() {
          const updateRoleArray = [];
          results.forEach(({ jobTitleID }) => {
          updateRoleArray.push(jobTitleID);
          });
          return updateRoleArray;
        }
      }, 
    ]).then((answer) => {
  connection.query(
  'UPDATE employees SET ? WHERE ?',
  [
    {jobTitleID: answer.updateRole},
    {firstName: answer.updateEmployee},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function updateManager(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateEmployee',
        type: 'list',
        message: 'for which employee : ',
        choices() {
          const updateEmployeeArray = [];
          results.forEach(({ firstName }) => {
          updateEmployeeArray.push(firstName);
          });
          return updateEmployeeArray;
        }
      },
      {
        name: 'updateManager',
        type: 'list',
        message: 'New manager : ',
        choices() {
          const updateManagerArray = [];
          results.forEach(({ managerID }) => {
          updateManagerArray.push(managerID);
          });
          return updateManagerArray;
        }
      }, 
    ]).then((answer) => {
  connection.query(
  'UPDATE employees SET ? WHERE ?',
  [
    {managerID: answer.updateManger},
    {firstName: answer.updateEmployee},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function updateDepartment(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateEmployee',
        type: 'list',
        message: 'for which employee : ',
        choices() {
          const updateEmployeeArray = [];
          results.forEach(({ firstName }) => {
          updateEmployeeArray.push(firstName);
          });
          return updateEmployeeArray;
        }
      },
      {
        name: 'updateDepartment',
        type: 'list',
        message: 'New department : ',
        choices() {
          const updateDepartmentArray = [];
          results.forEach(({ departmentID }) => {
            updateDepartmentArray.push(departmentID);
          });
          return updateDepartmentArray;
        }
      }, 
    ]).then((answer) => {
  connection.query(
  'UPDATE employees SET ? WHERE ?',
  [
    {departmentID: answer.updateDepartment},
    {firstName: answer.updateEmployee},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function updateFirstName(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateEmployee',
        type: 'list',
        message: 'for which employee : ',
        choices() {
          const updateEmployeeArray = [];
          results.forEach(({ firstName }) => {
          updateEmployeeArray.push(firstName);
          });
          return updateEmployeeArray;
        }
      },
      {
        name: 'updateFirstName',
        type: 'input',
        message: 'update first name to : ',
      }, 
     
    ]).then((answer) => {
  connection.query(
  'UPDATE employees SET ? WHERE ?',
  [
    {firstName: answer.updateFirstName},
    {firstName: answer.updateEmployee},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function updateLastName(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateEmployee',
        type: 'list',
        message: 'for which employee : ',
        choices() {
          const updateEmployeeArray = [];
          results.forEach(({ firstName }) => {
          updateEmployeeArray.push(firstName);
          });
          return updateEmployeeArray;
        }
      },
      {
        name: 'updateLastName',
        type: 'input',
        message: 'update last name to : ',
      }
    ]).then((answer) => {
  connection.query(
  'UPDATE employees SET ? WHERE ?',
  [
    {lastName: answer.updateLastName},
    {firstName: answer.updateEmployee},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function updateSalary(){
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateEmployee',
        type: 'list',
        message: 'for which employee : ',
        choices() {
          const updateEmployeeArray = [];
          results.forEach(({ firstName }) => {
          updateEmployeeArray.push(firstName);
          });
          return updateEmployeeArray;
        }
      },
      {
        name: 'updateSalary',
        type: 'input',
        message: 'New salary : ',
      }
    ]).then((answer) => {
  connection.query(
  'UPDATE employees SET ? WHERE ?',
  [
    {salary: answer.updateSalary},
    {firstName: answer.updateEmployee},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function editRole(){
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateRoleTitle',
        type: 'list',
        message: 'for which role/Title : ',
        choices() {
          const updateTitleArray = [];
          results.forEach(({ jobTitle }) => {
          updateTitleArray.push(jobTitle);
          });
          return updateTitleArray;
        }
      },
      {
        name: 'updateRoleTo',
        type: 'input',
        message: 'update role to : ',
      }
    ]).then((answer) => {
  connection.query(
  'UPDATE roles SET ? WHERE ?',
  [
    {jobTitle: answer.updateRoleTo},
    {jobTitle: answer.updateRoleTitle},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

function editDepartment(){
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'updateDepartmentTitle',
        type: 'list',
        message: 'for which department : ',
        choices() {
          const updateDepartmentArray = [];
          results.forEach(({ departmentName }) => {
          updateDepartmentArray.push(departmentName);
          });
          return updateDepartmentArray;
        }
      },
      {
        name: 'updateDepartmentTo',
        type: 'input',
        message: 'update department to : ',
      }
    ]).then((answer) => {
  connection.query(
  'UPDATE departments SET ? WHERE ?',
  [
    {departmentName: answer.updateDepartmentTo},
    {departmentName: answer.updateDepartmentTitle},
  ],
  (err, res) => {
    if (err) throw err;
  });
connection.end();
});
})
}

let choice = "";
let sorting = "";
let addingWhat = "";
let editThis = "";
let editEmployee = "";



  
