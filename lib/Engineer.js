// Importing data from Employee.js
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, gitHub) {
    super(name, id, email);
    this.gitHub = gitHub;
  }
  getGithub() {
    // adding github property for engineer
    return this.gitHub;
  }
  getRole() {
    return "Engineer";
  }
}

// Exporting Engineer data
module.exports = Engineer;
