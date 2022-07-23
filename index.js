"use strict";

const inquirer = require("inquirer");
const fs = require("fs");

// lib for classes
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const { generate } = require("rxjs");

const team = []; //empty array so we can later add team members
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

const buildTeam = function () {
  const newHTML = generateHTML(team[0]);
  fs.watch("./dist/index.html", newHTML, (error) =>
    error
      ? console.error(error)
      : console.log("Creating HTML file in dist folder")
  );
};

function addManager();