SELECT * FROM employee;
SELECT id,
    first_name AS "First Name",
    last_name AS "Last Name",
    role.title AS "Title",
    department._name AS "Department",
    role.salary AS "Salary",
    CONCAT(first_name, " ", last_name) AS "Manager"
FROM employee AS a
JOIN role ON a.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT OUTER JOIN employee AS b ON a.manager_id = b.id;
