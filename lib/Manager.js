// Importing data from Employee.js
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, emailAddress, officeNumber) {
    super(name, id, emailAddress);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
}

// Exporting Manager data
module.exports = Manager;
