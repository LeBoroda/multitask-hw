import { ForceConstructor } from "./forcedUser";

describe("Forced Constructor tests", () => {
  describe("Is it a function", () => {
    it("should be a function", () => {
      expect(ForceConstructor).toBeInstanceOf(Function);
    });
  });
  describe("Create user", () => {
    it("should create user with new operator", () => {
      const deliberateUser = new ForceConstructor("DU");
      expect(deliberateUser).toBeInstanceOf(ForceConstructor);
      expect(deliberateUser.name).toBe("DU");
    });
    it("should create user without new operator", () => {
      const forcedUser = ForceConstructor("FU");
      expect(forcedUser).toBeInstanceOf(ForceConstructor);
      expect(forcedUser.name).toBe("FU");
    });
  });
});
