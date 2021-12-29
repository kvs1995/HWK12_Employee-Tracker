//require mysql2, express, utls, asiiart-logo, console.table, inquirer.
const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')
const consoleTable = require('console.table')
const asciiart = require('asciiart-logo')

//potentially require the utils for the sql query
const { empMiddle,empUpdateFirst, empUpdateSecond,countEmp, viewAllSelect, whereRoleSelect, whereDeptSelect, empInsert, deptInsert, roleInsert,  empRoleJoin, empRoleIn} = require('./helpers/utils')
const res = require('express/lib/response')

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
db.connect(err => 
    {
        if (err) 
            { console.error(err); } 
        else {
        //otherwise initial options prompt
            console.log(`Connected to the employee_db database`);
            initialPrompt();
        }
    }
);

///////////////////////////////////////////////////////
function initialPrompt() {
    inquirer.prompt(
        [
            {
                type:'list',
                loop:false,
                name:'action',
                message:'What would you like to do?',
                choices: ['View all employees', 'View all roles','View all departments','Add employee',  'Add role', 'Add department','Update employee role', 'Quit']
            }
        ]
    )
    .then(selectedOption => 
        {
            switch(selectedOption.action) {
                case 'View all employees': viewAll('employee');
                    break;
                case 'View all roles': viewAll('role');
                    break;
                case 'View all departments': viewAll('department');
                    break;
                case 'Add employee': addEmployee();
                    break;
                case 'Add role': addRole();
                    break;
                case 'Add department': addDepartment();
                    break;
                case 'Update employee role': updateEmployeeRole();
                    break;
                case 'Quit': db.end();
                    break;
            }
        }
    )
};


/////////////////////////////////////////////////////
const viewAll = async(table) => {
    db.query(viewAllSelect,table, (err,result) => 
        {
            if (err) { console.log(err); }
            console.table(result);
            
            setTimeout(() => initialPrompt(), 2500)
        }
    )
}


/////////////////////////////////////////////////////
const addEmployee = async() => {
    db.query(viewAllSelect, 'role', (err, result) => 
        {
            if (err) console.error(err);

            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        type:'input',
                        name:'lastName',
                        message:'What is the employee\'s last name?',
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s role? Please select an option below.',
                        choices: function() {
                            let choicesList = [];
                            for (let i = 0; i < result.length; i++) {
                                choicesList.push(result[i].title)
                            };
                            return choicesList;
                        }
                    }
                ]
            )
            .then(answers => 
                {
                    let {firstName, lastName, role } = answers
                    db.query(whereRoleSelect, role, (err, result) =>
                        {
                            if (err) console.error(err);
                            const role_id = result[0].id;

                            db.query(empInsert,[firstName,lastName,role_id], (err, result) => 
                                {
                                    if(err) 
                                        {console.error(err);}
                                    else {
                                        console.log('Employee successfully added!')
                                        initialPrompt();
                                        // viewAll('employee')
                                    }
                                }
                            )
                        }
                    )
                }
            )
        }
    )
}

//////////////////////////////////////////////////////

const addRole = async() => {
    db.query(viewAllSelect, 'department', (err, result) =>
        {
            if (err) console.error(err);
//             console.log(viewAllSelect)

            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name:'title',
                        message: 'What is the name of the role?'
                    },
                    {
                        type:'number',
                        name:'salary',
                        message: 'What is the salary of the role?'
                    },
                    {
                        type:'list',
                        name:'department',
                        message:'Which department does the role belong to?',
                        choices: function() {
                            let choicesList = []
                            for (let i = 0; i < result.length; i++) {
                                choicesList.push(result[i].name)
                                
                            };
                            return choicesList;
                        }
                    }
                ]
            )
            .then(answers => 
                {
                    let { title, salary, department } = answers
                    db.query(whereDeptSelect, department, (err, result) => 
                        {
                            if (err) console.error(err);
                            const department_id = result[0].id

                            db.query(roleInsert, [title, salary, department_id], (err, result) => 
                                {
                                    if (err) console.error(err);
                                    else {
                                        console.log(`Successfully added the ${title} role to the database!`)
                                        // viewAll('role');
                                        initialPrompt();
                                    }
                                }
                            )
                        }
                    )
                }    
            )
        }
    )
}

/////////////////////////////////////////////////////
const addDepartment = async() => {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]
    )
    .then(answers => 
        {
            let { name } = answers
            db.query(deptInsert, name, (err, result) => 
                {
                    if (err) {console.error(err);}
                    else {
                        console.log(`Department ${name} was successfully added to the database!`)
                        initialPrompt();
                    }
                }
            )
        }
    )
}

////////////////////////////////////////////////////
const updateEmployeeRole = async() => {
    db.query(empRoleJoin, (err, result) => 
        {
            inquirer.prompt(
                [
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee\'s role do you want to udpate?',
                        choices: function() {
                            let choicesList = []
                            for (let i = 0; i < result.length; i++) {
                                choicesList.push(result[i].full_name);
                            }
                            return choicesList
                        }
                    }
                ]
            )
            .then(answers => 
                {

                    let first_name = answers.employee.split(' ')[0]
                    let last_name = answers.employee.split(' ')[1]

                   
                    db.query(countEmp,[first_name,last_name], (err, result) =>
                        {  
                            if (err) console.error(err);
                            // let updateEmpId = []

                            filterString = ''
                            for (let i = 0; i < result.length; i++) {
                                filterString += result[i].id

                                // console.log(i)
                                if (i !== (result.length - 1)) {
                                    filterString += ","
                                }
                            }

                
                            
                            db.query(`${empRoleIn}${filterString})`,(err, result) => 
                                {   
                                    if (err) console.error(err);


                                    // console.log(result)
                                    inquirer.prompt(
                                        [
                                            {
                                                type: 'list',
                                                name: 'originalRole',
                                                message: `Please specify the role you would like to udpate.`,
                                                choices: function() {
                                                    let rolelist = [];
                                                    for (let i = 0; i < result.length; i++) {
                                                        rolelist.push(result[i].title)
                                                    }
                                                    return rolelist;
                                                }
                                            },

                                        ]
                                    )                                   
                                    .then(answers => 
                                        {
                                            let originalRole = answers.originalRole
                                                                                            
                                            db.query(viewAllSelect, 'role', (err, result) => 
                                                {
                                                    if (err) console.error(err);
                                                    inquirer.prompt(
                                                        [
                                                            {
                                                                type: 'list',
                                                                name: 'targetRole',
                                                                message: `Please specify what you would like to update the employee role to.`,
                                                                choices: function() {
                                                                    let choicesList = [];
                                                                    for (let i = 0; i < result.length; i++) {
                                                                        choicesList.push(result[i].title)
                                                                    }
                                                                    return choicesList;
                                                                }
                                                            }
                                                        ]
                                                    )
                                                    .then(answers =>
                                                        {
                                                            let targetRole = answers.targetRole

                                                            db.query(`${empUpdateFirst}'${targetRole}'${empMiddle}(${filterString})${empUpdateSecond}'${originalRole}')`, (err, result) => 
                                                                {
                                                                    if (err) console.error(err)
                                                                    else {
                                                                        console.log('success!')
                                                                        initialPrompt();
                                                                    }
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                } 
                            )                            
                        }
                    )
                }
            )
        }
    )
}
