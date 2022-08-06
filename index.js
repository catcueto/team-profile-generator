const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");

// lib for classes
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const team = []; //empty array so we can later add team members

// ADDING MANAGER + INPUT VALUES
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
        name: "emailAddress",
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
        response.emailAddress,
        response.officeNumber
      );
      // sending manager to the beginning of the team array (initially empty)
      team.unshift(manager);
      addEmployee();
    });
}

// PROMPTS THE USER WITH TEAM ROLES
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
        name: "emailAddress",
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
        const intern = new Intern(employeeDeets.name, employeeDeets.id, employeeDeets.emailAddress, employeeDeets.school);
        // adding intern info to the end of the array
        team.push(intern);
        addEmployee();
      }
      // if the user wants to add an Engineer to its team
      else if (employeeDeets.addAnother === 'Add Engineer') {
        const engineer = new Engineer(employeeDeets.name, employeeDeets.id, employeeDeets.emailAddress, employeeDeets.gitHub);
        team.push(engineer);
        addEmployee();
      }
      // when the user is done adding employees, run the generateHTMl()
      else {
        console.log("Team is coming together!");
        generateHTML();
      }
    });
}


function importCard(role) {
  // role comes from nextTeamMember ();
  switch (role.getRole()) {
    case "Engineer":
      return; //ADD CARD STYLE
    case "Intern":
      return; //ADD CARD STYLE
  }
}

// function to check if any employee cards need to be creates, and if so, passes the employee from the employeesArray to the createEmployeeCard function, which will create the html for the card, and then that text is returned and added to the overall text for return to the createInfoCards function

// CHECK
function checkForEmployees() {
  if (employeesArray.length > 1) {
    // creates the employeeCards variable which will hold the collective text of all employee info cards
    let employeeCards = createEmployeeCard(employeesArray[1]);
    for (let i = 2; i < employeesArray.length; i++) {
      employeeCards += createEmployeeCard(employeesArray[i]);
    }
    return employeeCards;
  } else {
    return '';
  }
}


// GENERATING EMPLOYEE CARDS 
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
          Email: <a href="mailto:${employee.emailAddress}> ${employee.emailAddress}</a>
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
      Email: <a href="mailto:${employee.emailAddress}> ${employee.emailAddress}</a>
    </li>
      <li class="list-group-item">
        GitHub: <a href="https://github.com/${employee.gitHub}">${employee.gitHub}</a>
      </li>
    </ul>
  </div>`;


      return `<!DOCTYPE html>
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
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="title">My Team</h1>
      </div>
    </div>

    <div
      class="card-group container-fluid d-flex justify-content-between cards-custom"
    >
      <div class="card text-bg-info mb-3 card-unit" style="max-width: 20rem">
        <div class="card-header">
          <h5 class="member-name">Catalina</h5>
          <ion-icon name="cafe-outline" class="icon"></ion-icon>
          <div class="card-text m-2 role-names">${manager.name}</div>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${manager.id}</li>
        <li class="list-group-item">
          Email: <a href="mailto:${manager.emailAddress}">${manager.emailAddress
        }</a>
        </li>
        <li class="list-group-item">Office number: ${manager.officeNumber}</li>
      </ul>
    </div>
              ${createInfoCard()}
              </div>
      </div>
  </body>
  </html>`;
  }

  const buildTeam = function () {
    const newHTML = createHTML(team[0]);
    fs.watch("./dist/index.html", newHTML, (error) =>
      error
        ? console.error(error)
        : console.log("Creating HTML file in dist folder")
    );
  };
  addManager();
