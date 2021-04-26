const inquirer = require('inquirer');
const mysql = require('mysql');
require("console.table");

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

function run()  {
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
        'information',
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
        editWhat();
          break;
        case 'information':
        whatInformation();
          break;
        default:
            console.log("goodby")
            connection.end();
    }
};

function whatInformation(){
  inquirer.prompt(
    [
      {
      name: 'viewChoice',
      type: 'list',
      message: 'What would you like to view?',
      choices: [
      // 'all employees',
      'managers',
      'department names',
      'jobs/roles'
      ]
          },
      ])
      .then((answer) => {
          viewThis = answer.viewChoice;
          direct6();
        }) 
};  

function direct6(){
  switch(viewThis) {
    // case 'all employees':
    // viewEmployees();
    //   break;
    case 'managers':
    viewManagers();
      break;
    case 'department names':
    viewDepartments();
      break;
    case 'jobs/roles':
    viewRoles();
      break;
    default:
        console.log("not working")}
};

function viewManagers(){
  connection.query(
    'SELECT * FROM employees WHERE ?',
    {jobTitleID: 1},
    (err, res) => {
      if (err) throw err;
      else {
        const allManagersArray = [];
        res.forEach(({ id, firstName, lastName }) => {
          allManagersArray.push("id",id,"firstName",firstName,"lastName",lastName);
      });
        console.table(allManagersArray);
        return allManagersArray;
      };
})
  run();
}

// function viewEmployees(){
//   connection.query(
//     'SELECT * FROM employees',
//     (err, res) => {
//       if (err) throw err;
//       else {
//         const allEmployeeArray = [];
//         res.forEach(({ firstName, lastName, salary, managerID, departmentID, jobTitleID }) => {
//           allEmployeeArray.push("firstName",firstName,"lastName",lastName,"$",salary,"managerID",managerID,"departmentID",departmentID,"jobTitleID",jobTitleID);
//       });
//         console.log(allEmployeeArray);
//         return allEmployeeArray;
//       };
// })
//   run();
// };

function viewDepartments(){
  connection.query(
    'SELECT * FROM departments',
    (err, res) => {
      if (err) throw err;
      else {
        const allDepartmentsArray = [];
        res.forEach(({ id, departmentName }) => {
          allDepartmentsArray.push("id",id, "department name",departmentName);
      });
        console.table(allDepartmentsArray);
        return allDepartmentsArray;
      };
})
  run();
};

function viewRoles(){
  connection.query(
    'SELECT * FROM roles',
    (err, res) => {
      if (err) throw err;
      else {
        const allRolesArray = [];
        res.forEach(({ id, jobTitle }) => {
          allRolesArray.push("id",id, "job title",jobTitle);
      });
        console.table(allRolesArray);
        return allRolesArray;
      };
})
  run();
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
};

function direct3(){
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
        console.log("not working")}
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
};

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
        console.log("not working")}
};

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
        console.log("goodby")}
};

function sortEmployees(){
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

function direct2(){
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
      console.log("not working")}
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
            console.table(employeeByDepartmentArray);
            return employeeByDepartmentArray;
          };
    })
  })
  .then(() => {
  run()
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
        message: 'Which managers managers team would you like to see? ',
        choices() {
          let ManagerTeamsArray = [];
          let filteredArray = [];
          results.forEach(({ managerID }) => {
          ManagerTeamsArray.push(managerID);
          filteredArray = ManagerTeamsArray.filter((c ,index) =>{
          return ManagerTeamsArray.indexOf(c) === index;
          });
          });
          return filteredArray;
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
            console.table(employeeByManagerArray);
            return employeeByManagerArray;
          };
    })
  })
  .then(() => {
    run()
    }); 
})
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
            console.table(employeeByRolesArray);
            return employeeByRolesArray;
          };
    })
  })
  .then(() => {
  run()
  });
    })
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
        employeesSortedArray.push(firstName,lastName,salary,managerID,departmentID,jobTitleID);
      });
        console.table(employeesSortedArray);
        return employeesSortedArray;
      };
    })
  })   
  .then(() => {
    run()
    });
    })
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
    })
    .then(() => {
    run()
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
    })
    .then(() => {
    run()
    });
};

function addEmployee(){
  
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
  // {
  //     name: 'role',
  //     type: 'list',
  //     message: 'What is your job title/role ID?',
      // choices() {
      //   let titleArray = [];
      //   let filteredArray = [];

      //   results.forEach(({ jobTitleID }) => {
      //   titleArray.push(jobTitleID);

      //   filteredArray = titleArray.filter((c ,index) =>{
      //   return titleArray.indexOf(c) === index;
      //   });
      //   });
      //   return filteredArray;
      // },    
  // },
  {
    name: 'role',
    type: 'input',
    message: 'what is your role ID?',
  },
  {
    name: 'department',
    type: 'input',
    message: 'what is your department ID',
  },
  {
    name: 'manager',
    type: 'input',
    message: 'What is your managers ID?',
  }
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
  })
  .then(() => {
    run()
    });
  })
};

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
        type: 'input',
        message: 'new role ID : ',
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
    })
    .then(() => {
      run()
      });
    })
};

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
        name: 'updateManger',
        type: 'input',
        message: 'New manger ID : ',
      }  
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
    })
    .then(() => {
      run()
      });
    })
};

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
        type: 'input',
        message: 'New department ID : ',
      } 
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
    })
    .then(() => {
      run()
      });
    })
};

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
    })
    .then(() => {
      run()
      });
    })  
};

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
    })
    .then(() => {
      run()
      });
    })
};

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
    })
    .then(() => {
      run()
      });
    })
};

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
    })
    .then(() => {
      run()
      });
    })
};

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
    })
    .then(() => {
      run()
      });
    })
};

let choice = "";
let sorting = "";
let addingWhat = "";
let viewThis = "";
let editThis = "";
let editEmployee = "";



  
