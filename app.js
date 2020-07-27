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
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Managere"
        ]
    }).then(function(answer) {
        switch (answer.options) {
        case "View All Employees":
        viewAllEmployees();
        break;

        case "View All Departments":
        viewAllDepartments();
        break;

        case "View All Employees by Manager":
        //add function
        console.log("Nothing");
        break;

        case "Add Employee":
        //add function
        console.log("Nothing");
        break;

        case "Remove Employee":
        //add function
        console.log("Nothing");
        break;

        case "Update Employee Role":
        //add function
        console.log("Nothing");
        break;

        case "Update Employee Managere":
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
        options()
    })
 
}

//* Functions for options *//

function viewAllEmployees(answer) {
    const query = "SELECT e.first_name, e.last_name, title, salary, department_name, m.first_name, m.last_name FROM `role` INNER JOIN department ON department.id =`role`.department_id INNER JOIN employee AS e ON e.role_id = `role`.id LEFT JOIN employee AS m ON m.id = e.manager_id;"
    connection.query(query, function(err, res) {
      if(err) throw err;
      console.log(res);
    }) ;
    options();
}

function viewAllDepartments(answer) {
    const query = "SELECT * FROM department"
    connection.query(query, function(err, res) {
        if(err) throw err;
        console.log(res);
    })
}
