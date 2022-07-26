"use strict";

const inquirer = require("inquirer");
const fs = require("fs");

// lib for classes
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const { cachedDataVersionTag } = require("v8");
const team = []; //empty array so we can later add team members

// ADDING MANAGER + INPUT VALUES
function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the team manager's name?",
        name: "name",
        default: "Catalina",
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
        default: "ccueto@gmail.com",
      },
      {
        type: "input",
        message: "What is the team manager's office number?",
        name: "officeNumber",
        default: "1",
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
      team.push(manager);
      nextTeamMember();
    });
}

// PROMPTS THE USER WITH TEAM ROLES
function nextTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "role",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then((answer) => {
      if (answer.role === "Engineer") {
        addEngineer();
      } else if (answer.role === "Intern") {
        addIntern();
      } else {
        console.log("Team is coming together!");
        console.log(team);
        buildTeam();
      }
    });
}

// ADDING ENGINEER EMPLOYEE
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
        default: "Amy",
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
        default: "11",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please include only numeric values.";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "emailAddress",
        default: "amyagu@gmail.com",
      },
      {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "gitHub",
        default: "amyagu",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.emailAddress,
        response.gitHub
      );
      team.push(engineer);
      nextTeamMember();
    });
}

// ADDING AN INTERN EMPLOYEE
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        default: "Kelly",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        default: "27",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please include only numeric values.";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "emailAddress",
        default: "kellyg@gmail.com",
      },
      {
        type: "input",
        message: "What is your intern's GitHub username?",
        name: "gitHub",
        default: "kellyg",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.emailAddress,
        response.gitHub
      );
      team.push(engineer);
      nextTeamMember();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        default: "Victoria",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        default: "45",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please include only numeric values.";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "emailAddress",
        default: "vdias@gmail.com",
      },
      {
        type: "input",
        message: "What is your intern's GitHub username?",
        name: "gitHub",
        default: "vdias",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.emailAddress,
        response.gitHub
      );
      team.push(engineer);
      nextTeamMember();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        default: "Celina",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        default: "59",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please include only numeric values.";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "emailAddress",
        default: "cfig@yahoo.com",
      },
      {
        type: "input",
        message: "What is your intern's GitHub username?",
        name: "gitHub",
        default: "cfig",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.emailAddress,
        response.gitHub
      );
      team.push(engineer);
      nextTeamMember();
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

function createInfoCard() {
  let cards = " ";
  for (var i = 0; i < team.length; i++) {
    cards += importCard(team[i]);
  }
  console.log(cards);
  return cards.replace("undefined", "");
}

const buildTeam = function () {
  const newHTML = generateHTML(team[0]);
  fs.watch("./dist/index.html", newHTML, (error) =>
    error
      ? console.error(error)
      : console.log("Creating HTML file in dist folder")
  );
};

function createHTML(manager) {
  return `<!DOCTYPE html>`
  <html lang = 'en'>
}

addManager();
