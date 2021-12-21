//require mysql2, express, utls, asiiart-logo, console.table, inquirer.
const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')
const consoleTable = require('console.table')
const asciiart = require('asciiart-logo')

//potentially require the utils for the sql query
const { viewAllSelect } = require('./helpers/utils')

//create the db connection
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'Password1',
        database:'employee_db'
    },



);

//error handling for the db connection
db.connect(err => {
    if (err) {
        console.error(err);
    } else {
        //otherwise initial options prompt

        console.log(`Connected to the employee_db database`);
        initialPrompt();
    }

});
let ViewAllTable ='';

// console.log(initialPrompt())
// const viewAll = async(ViewAllTable) => {
//     db.query(viewAllSelect, ViewAllTable, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//             console.log(result);
//     });
// }

//initial prompt - choose action: WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function initialPrompt() {
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'What would you like to do?',
            choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
        }
    ])

    .then(selectedOption => {
        // console.log(selectedOption.action)
        switch (selectedOption.action) {
            case 'View all employees':
                //couple options: put a function here or set the sql string to the select statment + a set variable 'employee'. 
                ViewAllTable = 'employee'
                // console.log(ViewAllTable)
                viewAll(ViewAllTable)
                break;                
            case 'View all roles': 
                ViewAllTable = 'role'
                viewAll(ViewAllTable)
                break;
            case 'View all departments':  
                ViewAllTable = 'department'
                viewAll(ViewAllTable)
            case 'Add employee':
                return;
            case 'Add role':
                return;
            case 'Add department':
                return;

            case 'Update employee role':
                return;

            case 'Quit':
                db.end();
                break;
        }
    })


};


//create functions for each option, use .separator() option inbetween each action to keep it clean

//view alls
// console.log(initialPrompt())
const viewAll = async(ViewAllTable) => {
    db.query(viewAllSelect, ViewAllTable, (err, result) => {
        if (err) {
            console.log(err);
        }
            console.log(result);
    });
}



//add options
//add employee

//add role

//add department

//update employee role

//quit --> use db.quit


// init function 
const init = async() => {
    const initialPrompt = {
        type:'list',
        name:'action',
        message:'What would you like to do?',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
        }
    const selectedOption = await inquirer.prompt(initialPrompt)

    
};

//export init



// const lezgo = async() => {

//     const tryUno =  await init();
//     // db.query(`${testQuery}${tryUno}${endParan}`),  (err, result) => {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     console.log(result);
//     // }
//     db.query(testQuery, tryUno,  (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(result);
//     })

//     db.query(selectEmp, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
//     });

//     waitPlease()
// }

// const waitPlease = async() => {
//     app.use((req, res) => {
//         res.status(404).end();
//     });
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     })
// }

// lezgo();