const inquirer = require('inquirer');


const run = () => {

  inquirer.prompt(
      [
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
    name: 'salery',
    type: 'input',
    message: 'what is your yearly salery?',
  },

  {
      name: 'start',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
      'sort employees?',
      'add employee'
      ]
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
      ]);
}

run();

