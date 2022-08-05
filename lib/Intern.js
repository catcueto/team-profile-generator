// Importing employee.js data
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, emailAddress, school) {
    // we use super as a property lookup
    super(name, id, emailAddress);
    this.school = school;
  }
  getSchool() {
    // adding school property for intern
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
