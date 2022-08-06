const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("Engineer Properties", () => {
    it("This should return Engineer object containing GitHub username", () => {
      const obj = new Engineer(
        "Brooke",
        30,
        "brookerus@aol.com",
        "brookiebookie"
      );
      expect(obj.gitHhub).toEqual("brookiebookie");
    });
  });

  describe("Engineer Method", () => {
    it("This should return github username and role", () => {
      const roleMethod = new Engineer(
        "Kendrick",
        27,
        "kmatmc@gmail.com",
        "kennayyy"
      );

      expect(roleMethod.getGithub()).toEqual("FrankGitHub");
      expect(roleMethod.getRole()).toEqual("Engineer");
    });
  });
});
