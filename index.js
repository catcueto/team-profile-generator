const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

// lib for classes
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const team = []; //empty array so we can later add team members

// TODO: ADDING MANAGER + INPUT VALUES
function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Hiya! Please enter the name of the manager:",
        name: "name",
      },
      {
        type: "input",
        message: "What is the team manager's id? ",
        name: "id",
        default: "7",
        validate: (input) => {
          // if user does not type a number
          if (isNaN(input)) {
            return "Please include only numeric values.";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is the team manager's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the team manager's office number?",
        name: "officeNumber",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please include only numeric values.";
          }
          return true;
        },
      },
    ])
    .then((response) => {
      // adding user's responses to the Manager class
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      // sending manager to the beginning of the team array (initially empty)
      team.unshift(manager);
      addEmployee();
    });
}

// TODO: PROMPT THE USER WITH TEAM ROLES
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "role",
        choices: [
          "Engineer",
          "Intern",
          "No additional employees. My team is complete",
        ],
      },
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        // when method checks for previous input; will run if user choses to add another employee
        when: (role) =>
          role.addAnother !== "No additional employees. My team is complete",
      },

      {
        type: "input",
        name: "id",
        message: "What's the employee ID number?",
        when: (role) =>
          role.addAnother !== "No additional employees. My team is complete",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the email address for this employee:",
        when: (role) =>
          role.addAnother !== "No additional employees. My team is complete",
      },
      {
        type: "input",
        name: "school",
        message: "What school is your intern's attending?",
        // this will only run when user is adding an intern
        when: (role) => role.addAnother === "Intern",
      },
      {
        type: "input",
        name: "gitHub",
        message: "What is your engineer's GitHub username?",
        // this will only run when user is adding an engineer
        when: (role) => role.addAnother === "Engineer",
      },
    ])
    .then((employeeDeets) => {
      console.log(employeeDeets);
      // if the user wants to add an Intern to its team
      if (employeeDeets.role === "Intern") {
        const intern = new Intern(
          employeeDeets.name,
          employeeDeets.id,
          employeeDeets.email,
          employeeDeets.school
        );
        // adding intern info to the end of the array
        team.push(intern);
        console.log(intern);
        // createEmplCard(intern);
      }
      // if the user wants to add an Engineer to its team
      else if (employeeDeets.role === "Engineer") {
        const engineer = new Engineer(
          employeeDeets.name,
          employeeDeets.id,
          employeeDeets.email,
          employeeDeets.gitHub
        );
        team.push(engineer);
        console.log(engineer);
        // createEmplCard(engineer);
      }
      // when the user is done adding employees, run the writeHTMl()

      // console.log("Team is coming together!");
      writeHTML();
    });
}

// TODO: CREATE MPLOYEE CARDS FOR ENGINEER AND INTERN
function createEmplCard(employee) {
  switch (employee.getRole()) {
    case "Manager":
      return `
        <div class="card text-bg-info mb-3 card-unit" style="max-width: 20rem">
      <div class="text-white" style="background-color: #34a853;">
          <h5 class="card-title m-2">${employee.name}</h5>
          <ion-icon name="cafe-outline" class="icon"></ion-icon>
          <h5 class="card-text m-2">Manager</h5>
      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${employee.id}</li>
          <li class="list-group-item"><a href="mailto: ${employee.email}" target="_blank">Email: ${employee.email}</a></li>
          <li class="list-group-item">Office Number: ${employee.officeNumber}</li>
      </ul>
</div>`;

    case "Intern":
      return `
      <div class="card text-bg-info mb-3 card-unit" style="max-width: 20rem">
      <div class="text-white" style="background-color: #34a853;">
          <h5 class="card-title m-2">${employee.name}</h5>
          <ion-icon name="cafe-outline" class="icon"></ion-icon>
          <h5 class="card-text m-2">Manager</h5>
      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${employee.id}</li>
          <li class="list-group-item">
          Email: <a href="mailto: ${employee.email}">${employee.email}</a>
        </li>
          <li class="list-group-item">School: ${employee.school}</li>
      </ul>
</div>`;

    case "Engineer":
      return `
      <div class="card text-bg-info mb-3 card-unit" style="max-width: 20rem">
      <div class="text-white" style="background-color: #34a853;">
          <h5 class="card-title m-2">${employee.name}</h5>
          <ion-icon name="cafe-outline" class="icon"></ion-icon>
          <h5 class="card-text m-2">Manager</h5>
      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${employee.id}</li>
          <li class="list-group-item"><a href="mailto: ${employee.email}" target="_blank">Email: ${employee.email}</a></li>
          <li class="list-group-item">
          Email: <a href="mailto: ${employee.email}">${employee.email}</a>
        </li>
        <li class="list-group-item">
        GitHub: <a href="https://github.com/${employee.gitHub}">${employee.gitHub}</a>
      </li>
      </ul>
</div>`;
  }
}

// TODO: GENERATES HTML to then pass into the fs.WriteFile ()
function generateHTML() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Rubik&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="stylesheet.css" />
    <title>Team Profile Generator</title>
  </head>

  <body>
  <div class="jumbotron jumbotron-fluid p-3 text-white" style="background-color: #adff2f;">
      <div class="container">
      <h1 class="display-5 text-center">My Team</h1>
    </div>
  </div>
  <div class="d-flex flex-wrap justify-content-around mt-3">
        ${team.map((employee) => createEmplCard(employee))}
    </div>
  </body>
</html>`;
}

// TODO: WRITE HTML FILE
function writeHTML() {
  console.log(team);
  return fs.writeFile("./dist/index.html", generateHTML(), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Visit the html file in the dist folder to view how your team came together"
      );
    }
  });
}

// This function is the initializer
addManager();
