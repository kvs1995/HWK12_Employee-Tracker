const express = require('express')
// import and requre mysql
const mysql = require('mysql2')
const { testQuery, selectEmp,endParan } = require('./helpers/utils')
// const test = require('./assets/index');
const init = require('./assets/index');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//create mysql connection 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'Password1',
        database:'employee_db'
    },
    //log to console once the database is connected
    console.log(`Connected to the employee_db database`)
);

const lezgo = async() => {

    const tryUno =  await init();
    // db.query(`${testQuery}${tryUno}${endParan}`),  (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(result);
    // }
    db.query(`${testQuery}`, tryUno,  (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    })

    db.query(`${selectEmp}`, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
    });

    waitPlease()
}

const waitPlease = async() => {
    app.use((req, res) => {
        res.status(404).end();
    });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}

lezgo();