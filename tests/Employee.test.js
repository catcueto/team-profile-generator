const Employee = require("../lib/Employee");

// testing Employee class
describe("Employee", () => {
  describe("Employee Properties", () => {
    it("This should create an employee object with: 'name', 'id', and 'email'", () => {
      const employee = new Employee("Solange", 8, "example@gmail.com");
      expect(employee).toEqual({
        name: "Solange",
        id: 8,
        email: "example@gmail.com",
      });
    });
  });

  describe("emplName", () => {
    it("This should return employee's name", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.emplName()).toEqual("Solange");
    });
  });

  describe("emplID", () => {
    it("This should return employee's id", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.emplID()).toEqual(8);
    });
  });

  describe("emplEmail", () => {
    it("This should return employee's email", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.emplEmail()).toEqual("example@email.com");
    });
  });

  describe("employeeRole", () => {
    it("This should return employee's role", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.getRole()).toEqual("Employee");
    });
  });
});
