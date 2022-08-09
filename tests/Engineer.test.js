const Engineer = require("../lib/Engineer");

// testing Engineer class
describe("Engineer", () => {
  describe("Employee Properties", () => {
    it("This should create an engineer object with: 'name', 'id', 'email, and 'gitHub'", () => {
      const engineer = new Engineer(
        "Solange",
        8,
        "example@gmail.com",
        "sollymolly"
      );
      expect(engineer).toEqual({
        name: "Solange",
        id: 8,
        email: "example@gmail.com",
        gitHub: "sollymolly",
      });
    });
  });

  describe("getName", () => {
    it("This should return employee's name", () => {
      const engineer = new Engineer(
        "Solange",
        8,
        "example@email.com",
        "sollymolly"
      );
      expect(engineer.getName()).toEqual("Solange");
    });
  });

  describe("getID", () => {
    it("This should return Engineer's id", () => {
      const engineer = new Engineer(
        "Solange",
        8,
        "example@email.com",
        "sollymolly"
      );
      expect(engineer.getID()).toEqual(8);
    });
  });

  describe("getEmail", () => {
    it("This should return employee's email", () => {
      const engineer = new Engineer(
        "Solange",
        8,
        "example@email.com",
        "sollymolly"
      );
      expect(engineer.getEmail()).toEqual("example@email.com");
    });
  });

  describe("getGitHub", () => {
    it("This should return employee's email", () => {
      const engineer = new Engineer(
        "Solange",
        8,
        "example@email.com",
        "sollymolly"
      );
      expect(engineer.getGithub()).toEqual("sollymolly");
    });
  });

  describe("getRole", () => {
    it("This should return employee's role", () => {
      const engineer = new Engineer("Solange", 8, "example@email.com");
      expect(engineer.getRole()).toEqual("Engineer");
    });
  });
});
