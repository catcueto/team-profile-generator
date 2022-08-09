// Importing employee.js data
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    // we use super as a property lookup
    super(name, id, email);
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
