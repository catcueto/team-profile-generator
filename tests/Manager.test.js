const Manager = require("../lib/manager");

describe("Manager", () => {
  describe("Manager Properties", () => {
    it("This should return Manager object: name, id, emailAddress, and officeNumber", () => {
      const obj = new Manager("Catalina", 7, "ccueto@gmail.com", 1);
      expect(obj.name).toEqual("Catalina");
      expect(obj.id).toEqual(7);
      expect(obj.emailAddress).toEqual("ccueto@gmail.com");
      expect(obj.officeNumber).toEqual(1);
    });
  });
  describe("Manager Method", () => {
    it("This should return the role method", () => {
      const roleMethod = new Manager("Catalina", 7, "ccueto@gmail.com", 1);
      expect(roleMethod.getRole()).toEqual("Manager");
    });
  });
});
