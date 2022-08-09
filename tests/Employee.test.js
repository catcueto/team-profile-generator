const Employee = require("../lib/Employee");

// testing Employee class
describe("Employee", () => {
  describe("Employee Properties", () => {
    it('This should create an employee object with: "name", "id, and "email"', () => {
      const employee = new Employee("Solange", 8, "example@gmail.com");
      expect(employee).toEqual({
        name: "Solange",
        id: 8,
        email: "example@gmail.com",
      });
    });
  });

  describe("getName", () => {
    it("This should return employee's name", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.getName()).toEqual("Solange");
    });
  });

  describe("getID", () => {
    it("This should return employee's id", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.getID()).toEqual(8);
    });
  });

  describe("getEmail", () => {
    it("This should return employee's email", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.getEmail()).toEqual("example@email.com");
    });
  });

  describe("getRole", () => {
    it("This should return employee's role", () => {
      const employee = new Employee("Solange", 8, "example@email.com");
      expect(employee.getRole()).toEqual("Employee");
    });
  });
});
