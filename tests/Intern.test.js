const Intern = require("../lib/Intern");

// testing Intern class
describe("Intern", () => {
  describe("Intern Properties", () => {
    it("This should create an intern object with: 'name', 'id', 'email, and 'school'", () => {
      const intern = new Intern(
        "Solange",
        8,
        "example@gmail.com",
        "George Mason University"
      );
      expect(intern).toEqual({
        name: "Solange",
        id: 8,
        email: "example@gmail.com",
        school: "George Mason University",
      });
    });
  });

  describe("getName", () => {
    it("This should return intern's name", () => {
      const intern = new Intern(
        "Solange",
        8,
        "example@email.com",
        "George Mason University"
      );
      expect(intern.getName()).toEqual("Solange");
    });
  });

  describe("getID", () => {
    it("This should return intern's id", () => {
      const intern = new Intern(
        "Solange",
        8,
        "example@email.com",
        "George Mason University"
      );
      expect(intern.getID()).toEqual(8);
    });
  });

  describe("getEmail", () => {
    it("This should return intern's email", () => {
      const intern = new Intern(
        "Solange",
        8,
        "example@email.com",
        "George Mason University"
      );
      expect(intern.getEmail()).toEqual("example@email.com");
    });
  });

  describe("getSchool", () => {
    it("This should return intern's school", () => {
      const intern = new Intern(
        "Solange",
        8,
        "example@email.com",
        "George Mason University"
      );
      expect(intern.getSchool()).toEqual("George Mason University");
    });
  });

  describe("getRole", () => {
    it("This should return intern's role", () => {
      const intern = new Intern(
        "Solange",
        8,
        "example@email.com",
        "George Mason University"
      );
      expect(intern.getRole()).toEqual("Intern");
    });
  });
});
