const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("Intern Properties", () => {
    it("This should return an object containing the intern's school name", () => {
      const obj = new Intern(
        "Victoria",
        45,
        "vdias@gmail.com",
        "George Mason University"
      );
      expect(obj.school).toEqual("George Mason University");
    });
  });

  describe("Intern Method", () => {
    it("Testing for the return of school and employee role", () => {
      const roleMethod = new Intern("Richard", 4, "rmcg@yahoo.com", "GMU");
      expect(roleMethod.getSchool()).toEqual("GMU");
      expect(roleMethod.getRole()).toEqual("Intern");
    });
  });
});
