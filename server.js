const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '1234',
    database: 'work_db'
  },
  console.log(`Connected to the work_db database.`)
);

// Create a movie
const begin = () => {
  inquirer.prompt([
    {
    type: 'list',
    name: 'options',
    message: 'Choose an option.',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'End'
    ]}
  ])
  .then((responses) => {
    const {options} = responses;

    if(options == 'View All Departments')
    {
      console.log('view all depts')
      viewAllDepts();
    };

    if(options == 'View All Roles')
    {
      console.log('view all roles')
      viewAllRoles();
      begin();
    };

    if(options == 'View All Employess')
    {
      console.log('view all employees')
      viewAllEmp();
      begin();
    };

    if(options == 'Add Department')
    {
      console.log('add dept')
      addDept();
      begin();
    };

    if(options == 'Add Role')
    {
      console.log('add role')
      addRole();
      begin();
    };

    if(options == 'Add Employee')
    {
      console.log('add employee')
      addEmp();
      begin();
    };

    if(options == 'End'){
      end();
    }
  });

viewAllDepts = () =>{
  db.query('SELECT id, name AS "Name" FROM work_db.department', function (err, results) {
    console.table(results);
  });
};

viewAllRoles = () =>{
  db.query(`SELECT role.id, role.title, department.name AS "Department",
            role.salary FROM work_db.role
        JOIN department ON role.department_id = department.id;
    `, function (err, results) {
    console.table(results);
  });
};

viewAllEmp = ()=>{
  db.query(`
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
LEFT OUTER JOIN employee AS b ON a.manager_id = b.id;;
  `, function (err, results) {
    console.table(results);
  });
};

async function addDept() {
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "addDept",
      message: "Add department name",
    }]);
  await db.query(`INSERT INTO department(name) VALUES ("${response.addDept}")`);
};


const end = () =>{
  console.log('end');
}
};

const init = () =>{
begin();
};

init();
