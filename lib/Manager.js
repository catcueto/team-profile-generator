const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    // adding officeNumber property to manager
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

// Exporting Manager data
module.exports = Manager;
