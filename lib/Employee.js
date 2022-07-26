class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.emailAddress = email; //
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

module.exports = Employee;