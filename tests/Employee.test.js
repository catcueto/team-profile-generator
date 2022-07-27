const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("Employee Properties", () => {
    it("This should return Employee object: name, id, and email", () => {
      const obj = new Employee("Steve", 13, "stevegreen@gmail.com");
      expect(obj.name).toEqual("Steve");
      expect(obj.id).toEqual(13);
      expect(obj.emailAddress).toEqual("stevegreen@gmail.com");
    });
  });

  describe("Employee Methods", () => {
    it("Testing for the return of Employee object: name, id, and emailAddress and employee role", () => {
      const roleMethod = new Employee("Jessica", 18, "Teagrin@gmail.com");
      expect(roleMethod.getName()).toEqual("Jessica");
      expect(roleMethod.getId()).toEqual(18);
      expect(roleMethod.getEmail()).toEqual("Teagrin@gmail.com");
      expect(roleMethod.getRole()).toEqual("Employee");
    });
  });
});
