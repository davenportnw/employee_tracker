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
            "Update Employee"
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
        addEmployee();
        break;

        case "Remove Employee":
        deleteEmployee();
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
        deleteRole();
        break;

        case "Update Employee":
        updateEmployee();
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


function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'number',
            name: 'role_id',
            message:'What is the employees roleID?',
            validate: function(value) {
                if(value <= 5) {
                    return true;
                }else{
                    return 'Must be a number between 1- 5'
                }

            }
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is your managers ID number? If they do not have manager, press enter',
            default: 0
        }

    ]).then( answers => {
        connection.query(`INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`, function(err, data){
        if(err) throw err;
        console.log("Employee sucessfully added!")
        })
    })
}


function deleteEmployee() {
    inquirer
    .prompt({
        type: 'input',
        name: 'name',
        message: 'Which employee would you like to remove?'
    }).then (answers => {
        const query = "DELETE FROM employee WHERE first_name = ? "
        connection.query(query, [answers.name], function(err, data) {
            if(err) throw err;
            console.log("You have sucessfully removed " + '"' + answers.name + '"');
        })
    })
}

function updateEmployee() {
    inquirer
    .prompt([ 
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to update?',
            choices: [
                "Update Name",
                "Update Role ID",
                "Update Manager ID"
            ]
        }
    ]).then (answers => {
        switch (answers.choices) {
            case "Update Name":
            updateName();
            break;

            case "Update Role ID":
            //add function
            console.log("Nothing");
            break;

            case "Update Manager ID":
            //add function
            console.log("Nothing");
            break;
    }
})

//Update employee functions//

function updateName() { 
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'changeFirstname',
            message: 'Which employee would you like to change? (First name only)'

        },
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the updated first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the updated last name?'
        }
    ]).then (answers => {
        const query1 = "UPDATE employee SET first_name = ? WHERE first_name = ?"
        connection.query(query1, [answers.firstName,answers.changeFirstName], function(err, data) { 
            if(err) throw err;
            console.log("You have sucessfully updated!" )
        })
        const query2 = "UPDATE employee SET last_name =? WHERE first_name =?"
        connection.query(query2, [answers.lastName, answers.changeFirstName], function(err, data) { 
            if(err) throw err;

        })
    })
}
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

function viewAllRoles() {
    const query = "SELECT title FROM `role`"
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log(res);
    })
};

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
};


function deleteRole() {
    inquirer
    .prompt ({
        type: 'input',
        name: 'role',
        message: 'What role would you like to delete?'
    }).then (answers => {
        const query = "DELETE FROM `role` WHERE title = ? "
        connection.query(query, [answers.role], function(err, data) {
            if (err) throw err;
            console.log("You have sucessfully deleted " + '" ' + answers.role + ' "' + "role" );
        })
    })
}}