const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "d0Lc3d23!",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    welcome();
    console.log("You are connected to your database!");
});




function options() {
    inquirer
    .prompt({
        name: "options",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Remove Employee",
            "Add Department",
            "Remove Department",
            "Add a role",
            "Remove a role",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    }).then(function(answer) {
        switch (answer.options) {
        case "View All Employees":
        viewAllEmployees();
        break;

        case "View All Departments":
        viewAllDepartments();
        break;

        case "View All Roles":
        viewAllRoles();
        break;

        case "Add Employee":
        // addEmployee();
        console.log("Add employee");
        break;

        case "Remove Employee":
        //add function
        console.log("Nothing");
        break;

        case "Add Department":
        addDepartment();
        break;

        case "Remove Department":
        removeDepartment();
        break;

        case "Add a role":
        addRole();
        break;

        case "Remove a role":
        //add function
        console.log("Nothing");
        break;

        case "Update Employee Role":
        //add function
        console.log("Nothing");
        break;

        case "Update Employee Manager":
        //add function
        console.log("Nothing");
        break;
        }

    
    })
}


function welcome() {
    connection.connect(function(err){
        figlet.text('Employee Managment', function(err,data) {
            if (err) {
                console.log("Uh oh, there's an error.");
                console.dir(err);
                return;
            }
            console.log(data);
        })
    })
    options();
 
}

//* Functions for options *//

//* EMPLOYEE FUNCTION *//

function viewAllEmployees(answer) {
    const query = "SELECT e.first_name, e.last_name, title, salary, department_name, m.first_name, m.last_name FROM `role` INNER JOIN department ON department.id =`role`.department_id INNER JOIN employee AS e ON e.role_id = `role`.id LEFT JOIN employee AS m ON m.id = e.manager_id;"
    connection.query(query, function(err, res) {
      if(err) throw err;
      console.log(res);
    }) ;
}


// function addEmployee(answer) {
//     inquirer
//     .prompt(
//         {
//             type: 'input',
//             name: 'first_name',
//             message: 'What is the employees first name?'
//         },
//         {
//             type: 'input',
//             name: 'last_name',
//             message: 'What is the employees last name?'
//         },
//         {
//             type: 'list',
//             name: 'role',
//             message:'What is the employees role?',
//             choices: [
//                 "Sales Lead",
//                 "Salesperson",
//                 "Load Engineer",
//                 "Software Engineer",
//                 "Accountant",
//                 "Legal Team Lead",
//                 "Lawyer"
//             ]
//         },
//         {
//             type: 'number',
//             name: 'manager_id',
//             message: 'What is your managers ID number? If they do not have manager, write null'
//         }

//     ).then(function(answers => {
//         if(answers.role === "Sales Lead") {
//             roleid = 1
//         }else {
//             roleid = 2
//         }
//         console.log("roleid", roleid);

//         // connection.query(`INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`, function(err, data){
//         //     if(err) throw err;
//         //     console.log("Employee sucessfully added!")
//         })
//         options();
//     }
// }

//* DEPARTMENT FUNCTIONS *//

function viewAllDepartments(answer) {
    const query = "SELECT * FROM department"
    connection.query(query, function(err, res) {
        if(err) throw err;
        console.log(res);
    })

}

function addDepartment() { 
    inquirer
    .prompt ({
        type: 'input',
        name: 'deptName',
        message: 'What is the departments name?'
    }).then(answers => {
        const query = "INSERT INTO department (department_name) VALUES (?)";
        connection.query(query, [answers.deptName], function (err, data) {
            if (err) throw err;
            console.log(answers.deptName + " department sucessfully added!");
        })
    })
}

function removeDepartment() {
    inquirer
    .prompt({
        type: 'input',
        name:'removeDept',
        message: 'Which department would you like to remove?'
    }).then(answers => {
        const query = "DELETE FROM department WHERE department_name = (?)"
        connection.query(query, [answers.removeDept], function(err, data) {
            if (err) throw err;
            console.log("Sucessfully deleted " + ' " ' +  answers.removeDept + ' " ');
        })
    })
    // options();
}

//* ROLE FUNCTIONS *//

function viewAllRoles(answer) {
    const query = "SELECT title FROM `role`"
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log(res);
    })
 
}

function addRole() {
    const prompt = inquirer.createPromptModule();
    prompt ([
        {
        type: 'input',
        name: 'role_name',
        message: 'What is the name of the new role?'
    },
    {
        type: 'decimal',
        name: 'salary',
        message: 'What will be the salary of the new role? '
    },
    {
        type: 'number',
        name: 'department_id',
        message: 'What is the new role department id? For refrence view the departments'
    
    }
    ]).then (answers => {
        const query = "INSERT INTO `role` (title, salary, department_id) VALUES (?,?,?) "
    connection.query(query, [answers.role_name, answers.salary, answers.department_id], function(err, data) {
        if (err) throw err;
        console.log("You sucessfully added the " + '"' + answers.role_name + '"' + "role" );
    })
    })
}
