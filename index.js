const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

// lib for classes
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const team = []; //empty array so we can later add team members

// ADDING MANAGER PROMPTS
const addManager = [
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
  {
    type: "list",
    message: "Would you like to add another employee?",
    choices: ["YES", "NO"],
    name: "addEmployee",
  },
];

// ADDING ENGINEER
const addEngineer = [
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the engineer's employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the engineer's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the engineer's github username?",
    name: "gitHub",
  },
  {
    type: "list",
    message: "Would you like to add another employee?",
    choices: ["YES", "No, my team is complete"],
    name: "addEmployee",
  },
];

// ADDING INTERN
const addIntern = [
  {
    type: "input",
    message: "What is the intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the intern's employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the intern's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What school does the intern attend??",
    name: "school",
  },
  {
    type: "list",
    message: "Would you like to add another employee?",
    choices: ["YES", "No, my team is complete"],
    name: "addEmployee",
  },
];

// FUNCTION for the user to pick what employee is being added
function selectEmployee() {
  // ask which type of employee should be added
  inquirer
    .prompt({
      type: "list",
      message: "What role does the selected employee have?",
      choices: ["Engineer", "Intern"],
      name: "role",
    })
    .then((answer) => {
      // use the answer to determine which set of questions should be asked next
      if (answer.role === "Engineer") {
        renderEngineer();
      } else {
        renderIntern();
      }
    });
}

// ADDING ENGINEER TO EMPLOYEE LIST
function renderEngineer() {
  inquirer.prompt(addEngineer).then((answer) => {
    // we push to add engineer to the team
    team.push(
      new Engineer(answer.name, answer.id, answer.email, answer.gitHub)
    );
    // if user wants to add more employees
    if (answer.addEmployee === "YES") {
      // then select employee role
      selectEmployee();
    } else {
      // if done, write the file
      writeToFile();
    }
  });
}

// ADDING INTERN TO EMPLOYEE LIST
function renderIntern() {
  inquirer.prompt(addIntern).then((answer) => {
    // we push to add engineer to the team
    team.push(new Intern(answer.name, answer.id, answer.email, answer.school));
    // if user wants to add more employees
    if (answer.addEmployee === "YES") {
      // then select employee role
      selectEmployee();
    } else {
      // if done, write the file
      writeToFile();
    }
  });
}

// FUNCTION TO WRITE HTML FILE
function writeToFile() {
  let htmlData = generateHTML();
  fs.writeFile("./dist/index.html", htmlData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Go to the dist folder to see how your team came together in the index.html file"
      );
    }
  });
}

// TODO: GENERATES HTML to then pass into the fs.WriteFile ()
function generateHTML() {
  let pageContent = `
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
    <title>Team Profile Generator</title>
  </head>

  <body>
  <div class="jumbotron jumbotron-fluid p-3 text-white" style="background-color: #adff2f;">
      <div class="container">
      <h1 class="display-5 text-center">My Team</h1>
    </div>
  </div>
  <section
  class="card-group container-fluid d-flex justify-content-between cards-custom"
>`;
  // **************************************************************************************
  // Create logic to generate employee cards
  pageContent += createEmplCard(team[0]);
  team.forEach((employee) => {
    if (employee.getRole() === "Engineer")
      pageContent += createEmplCard(employee);
  });
  team.forEach((employee) => {
    if (employee.getRole() === "Intern")
      pageContent += createEmplCard(employee);
  });
  // **************************************************************************************
  pageContent += `
    </section>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </body>
    </html>`;
  return pageContent;
}

// FUNCTION TO CREATE EMPLOYEE CARDS
function createEmplCard(employee) {
  return `
  <div class="card text-bg-info mb-3 card-unit" style = "max-width: 20rem">
  <div class="text-white p-3" style="background-color: #34a853;">
      <h4>${employee.getName()}</h4>
      <h5>${employee.getRole()}</h5>
  </div>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${employee.getID()}</li>
  <li class="list-group-item"><a href="mailto: ${employee.getEmail()}" target="_blank">Email: ${employee.getEmail()}</a></li>
      <li class="list-group-item">${roleChecking(employee)}</li>
  </ul>
</div>`;
}

// CHECKING TO SEE WHETHER WE NEED TO ADD office number, gitHub, or school
function roleChecking(employee) {
  if (employee.getRole() === "Manager")
    return `Office Number: ${employee.getOfficeNumber()}`;
  else if (employee.getRole() === "Engineer") {
    return `Github: <a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}</a>`;
  } else if (employee.getRole() === "Intern")
    return `School: ${employee.getSchool()}`;
}

// FUNCTION THAT WILL START OUR CMS
function init() {
  inquirer.prompt(addManager).then((answer) => {
    // Manager will be added first
    team.push(
      new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
    );
    // Does the user want to add more employees to its team?
    if (answer.addEmployee === "YES") {
      // If yes, pick what kind of employee you want to add
      selectEmployee();
    } else {
      // Otherwise, write html file
      writeToFile();
    }
  });
}

// This function is the initializer
init();
