
//require inquirer
const inquirer = require('inquirer');


//potential classes
// const Employee = require('./lib/employee');
// const Manager = require('./lib/manager');

//question prompts
const questions = [
    // {
    //     type: 'list',
    //     name: 'action',
    //     message: 'What would you like to do?',
    //     choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
    // },
    {
        type: 'input',
        name: 'addEmployee',
        message: "What is the employee's first name?"
    }
]

const init = async() => {
    const answer = await inquirer.prompt(questions)
    const employee = answer.addEmployee
    // console.log(employee.addEmployee) 
    console.log(employee)
    return employee
}
// init();
// init();
module.exports = init