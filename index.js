const fs = require("fs");
const path = require('path');
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
        name: "email,
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
        when: (role) => role.addAnother !== "No additional employees. My team is complete"
      },

      {
        type: "input",
        name: "id",
        message: "What's the employee ID number?",
        when: (role) => role.addAnother !== "No additional employees. My team is complete"
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the email address for this employee:",
        when: (role) => role.addAnother !== "No additional employees. My team is complete"
      },
      {
        type: "input",
        name: "school",
        message: "What school is your intern's attending?",
        // this will only run when user is adding an intern
        when: (role) => role.addAnother === "Add Intern"
      },
      {
        type: "input",
        name: "gitHub",
        message: "What is your engineer's GitHub username?",
        // this will only run when user is adding an engineer
        when: (role) => role.addAnother === "Add Engineer"
      }
    ]).then(employeeDeets => {
      // if the user wants to add an Intern to its team
      if (employeeDeets.addAnother === "Add Intern") {
        const intern = new Intern(employeeDeets.name, employeeDeets.id, employeeDeets.email, employeeDeets.school);
        // adding intern info to the end of the array
        team.push(intern);
        addEmployee();
      }
      // if the user wants to add an Engineer to its team
      else if (employeeDeets.addAnother === "Add Engineer") {
        const engineer = new Engineer(employeeDeets.name, employeeDeets.id, employeeDeets.email, employeeDeets.gitHub);
        team.push(engineer);
        addEmployee();
      }
      // when the user is done adding employees, run the writeHTMl()
      else {
        // console.log("Team is coming together!");
        writeHTML();
      }
    });
}

// TODO: CREATE MPLOYEE CARDS FOR ENGINEER AND INTERN
function createEmplCard(employee) {
  switch (employee.getRole()) {
    case "Intern":
      return `
      <div class="card text-bg-info mb-3 card-unit" style="max-width: 20rem">
      <div class="card-header">
        <h5 class="member-name">${employee.name}</h5>
        <ion-icon name="cafe-outline" class="icon"></ion-icon>
        <div class="card-text m-2 role-names">Intern
        <li class="list-group-item">${employee.id}</li>
        <li class="list-group-item">
          Email: <a href="mailto:${employee.email}> ${employee.email}</a>
        </li>
        <li class="list-group-item">School: ${employee.school}</li>
      </ul>
    </div>`;

    case "Engineer":
      return `
    <div class="card text-bg-info mb-3 card-unit" style="max-width: 18rem">
    <div class="card-header">
      <h5 class="member-name">${employee.name}</h5>
      <ion-icon name="glasses-outline" class="icon"></ion-icon>
      <div class="card-text m-2 role-names">Engineer</div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.id}</li>
      <li class="list-group-item">
      Email: <a href="mailto:${employee.email}> ${employee.email}</a>
    </li>
      <li class="list-group-item">
        GitHub: <a href="https://github.com/${employee.gitHub}">${employee.gitHub}</a>
      </li>
    </ul>
  </div>`;

// TODO: CHECK TO SEE IF NEW EMPLOYEE CARD NEEDS TO BE CREATED BASED ON USER'S INPUT
  function employeeCheck() {
    if (team.length > 1) {
      // this variable holds all the text info for all employee cards
      let emplCard = generateEmplCard(team[1]);
        for (let i = 2; i < team.length; i++) {
          emplCard += generateEmplCard(team[i]);
          }
          return emplCard;
        } else {
          return '';
        }
      }

// TODO: CREATES MANAGER INFO CARD
  function managerInfoCard() {
          return `
  <div class="card text-bg-info mb-3 card-unit" style="max-width: 20rem">
          <div class="text-white" style="background-color: #34a853;">
              <h5 class="card-title m-2">${team[0].name}</h5>
              <ion-icon name="cafe-outline" class="icon"></ion-icon>
              <h5 class="card-text m-2">Manager</h5>
          </div>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${team[0].id}</li>
              <li class="list-group-item"><a href="mailto: ${team[0].email}" target="_blank">Email: ${team[0].email}</a></li>
              <li class="list-group-item">
              Email: <a href="mailto: ${team[0].email}">${team[0].email}</a>
            </li>
              <li class="list-group-item">Office Number: ${team[0].officeNumber}</li>
          </ul>
  </div>
      ${employeeCheck()}
  `}

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
        ${managerInfoCard()}
    </div>
  </body>
</html>`
      }

// TODO: WRITE HTML FILE
    function writeHTML() {
        return fs.writeFile("./dist/index.html", generateHTML(), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Visit the html file in the dist folder to view how your team came together")
          }
        });
      }

// // This function is the initializer
addManager(); 







