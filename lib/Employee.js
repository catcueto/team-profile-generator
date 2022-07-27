// Declaring Employee class
class Employee {
  constructor(name, id, emailAddress) {
    this.name = name;
    this.id = id;
    this.emailAddress = emailAddress;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.emailAddress;
  }

  getRole() {
    return "Employee";
  }
}

// Exporting employee data
module.exports = Employee;
