DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT ,
    FOREIGN KEY (department_id) REFERENCES department(id) 
    ON DELETE SET NULL

);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) 
    ON DELETE SET NULL
);
-- update employee
-- set employee.role_id = roleID
-- from (
-- SELECT employee.id as empID, role_id as role_id,'' as roleID,'' as roletitle FROM employee 
-- LEFT JOIN role ON employee.id = role.id 
-- UNION 
-- SELECT '' as empID,'' as role_id,role.id as roleID, role.title FROM employee 
-- RIGHT JOIN role ON employee.id = role.id)
-- where roletitle = 'test'
-- and empID = 2

-- `update employee 
-- set role_id = (select id 
--                 from role 
--                 where role.title = ${promptrole}) 
-- where employee.first_name = ${promptfirstname}`


-- SELECT ee.*, ra.title
-- FROM employee ee
--     inner join role ra on ra.id = ee.role_id
-- where ee.id = 2