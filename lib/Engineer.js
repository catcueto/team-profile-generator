// Importing data from Employee.js
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, emailAddress, gitHub) {
    super(name, id, emailAddress);
    this.github = gitHub;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

// Exporting Engineer data
module.exports = Engineer;
