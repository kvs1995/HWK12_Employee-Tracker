const express = require('express')
// import and requre mysql
const mysql = require('mysql2')

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

//set what the query is that you are pulling from mysql
db.query('', function (err, results) {
    //console.log the results
    console.table(results)
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})