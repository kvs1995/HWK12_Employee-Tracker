

const viewAllSelect = 'SELECT * from ??'
const whereRoleSelect = 'SELECT id FROM role WHERE title = ?'
const whereDeptSelect = 'SELECT id FROM department WHERE name = ?'
const empInsert = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?);'
const deptInsert = 'INSERT INTO department (name) VALUES (?)'
const roleInsert = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
// const empToUpdate = 'SELECT '
const countEmp = 'SELECT * from employee ee WHERE ee.first_name = ? and ee.last_name = ?'
const empRoleIn = 'SELECT employee.id, ra.title as title, ra.id as roleID from employee  inner join role ra on ra.id = employee.role_id WHERE employee.id in ('
const empRoleJoin = 'SELECT ee.id as EmpID, CONCAT(first_name, " ", last_name) as full_name, ra.title as title from employee ee inner join role ra on ra.id = ee.role_id'

const empUpdateFirst = 'UPDATE employee  SET role_id = (SELECT id FROM role WHERE title = '
const empMiddle = ') WHERE id in '
const empUpdateSecond = ' and role_id = (select id from role where title = '
module.exports = { empMiddle, empUpdateFirst, empUpdateSecond,viewAllSelect, whereRoleSelect, countEmp, whereDeptSelect, empInsert, deptInsert, roleInsert,  empRoleJoin, empRoleIn }