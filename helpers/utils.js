
// const init = require('../assets/index')


//test query
// const testQuery = 'INSERT INTO employee (first_name) VALUES ("'
const testQuery = 'INSERT INTO employee (first_name) VALUES (?)'
// console.log(testQuery)
//ending paratheses
const endParan = '")'
//select * f
const selectEmp= `SELECT * from employee`
module.exports = { testQuery, selectEmp, endParan }