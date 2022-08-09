const Manager = require("../lib/manager");

// testing Manager class
describe("Manager", () => {
  describe("Manager Properties", () => {
    it("This should create a manager object with: 'name', 'id', 'email, and 'officeNumber'", () => {
      const manager = new Manager("Solange", 8, "example@gmail.com", 105);
      expect(manager).toEqual({
        name: "Solange",
        id: 8,
        email: "example@gmail.com",
        officeNumber: 105,
      });
    });
  });

  describe("getName", () => {
    it("This should return manager's name", () => {
      const manager = new Manager("Solange", 8, "example@email.com", 105);
      expect(manager.getName()).toEqual("Solange");
    });
  });

  describe("getID", () => {
    it("This should return manager's id", () => {
      const manager = new Manager("Solange", 8, "example@email.com", 105);
      expect(manager.getID()).toEqual(8);
    });
  });

  describe("getEmail", () => {
    it("This should return manager's email", () => {
      const manager = new Manager("Solange", 8, "example@email.com", 105);
      expect(manager.getEmail()).toEqual("example@email.com");
    });
  });

  describe("getOfficeNumber", () => {
    it("This should return manager's office number", () => {
      const manager = new Manager("Solange", 8, "example@email.com", 10);
      expect(manager.getOfficeNumber()).toEqual(105);
    });
  });

  describe("getRole", () => {
    it("This should return manager's role", () => {
      const manager = new Manager("Solange", 8, "example@email.com", 105);
      expect(manager.getRole()).toEqual("Manager");
    });
  });
});
