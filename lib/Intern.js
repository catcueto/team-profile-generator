// Importing employee.js data
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, emailAddress, gitHub) {
    // we use super as a property lookup
    super(name, id, emailAddress);
    this.gitHub = gitHub;
  }
  getSchool() {
    return this.gitHub;
  }
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
