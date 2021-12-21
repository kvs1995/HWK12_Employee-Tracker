
//require inquirer
const inquirer = require('inquirer');


//potential classes
// const Employee = require('./lib/employee');
// const Manager = require('./lib/manager');

//question prompts
const questions = [
    // WHEN I start the application
    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    // {
    //     type: 'list',
    //     name: 'action',
    //     message: 'What would you like to do?',
    //     choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
    // },
    // //add department
    // {
    //     type: 'input',
    //     name: 'departmentName',
    //     message: 'What is the a name of the department?',
    //     when: (questions) => questions.action === 'Add department',
    // },
    // {
    //     type: 'input',
    //     name: 'roleName',
    //     message: 'What is the a name of the role',
    //     when: (questions) => questions.action === 'Add roles',
    // },
    // {
    //     type: 'input',
    //     name: 'roleSalary',
    //     message: 'What is the a salary of the role?',
    //     when: (questions) => questions.action === 'Add roles',
    // },
    // {
    //     type: 'input',
    //     name: 'roleDept',
    //     message: 'Which department does the role belong to?',
    //     when: (questions) => questions.action === 'Add roles',
    // },
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?"

    }
]

const init = async() => {
    const answer = await inquirer.prompt(questions)
    const employee = answer.firstName

    console.log(answer) 
    
    console.log(employee)
    return employee
}
// init();
// init();
module.exports = init