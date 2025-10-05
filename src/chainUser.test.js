import { User } from "./chainUser";

describe("Test user chain constructor", () => {
  let user;
  let promptSpy;
  let alertSpy;
  let consoleLogSpy;

  beforeEach(() => {
    user = new User();
    promptSpy = jest.spyOn(global, "prompt");
    alertSpy = jest.spyOn(global, "alert").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    user = undefined;
    jest.clearAllMocks();
  });
  describe("Is it a function", () => {
    it("User should be function", () => {
      expect(User).toBeInstanceOf(Function);
    });
    it("askName should be function", () => {
      expect(user.askName).toBeInstanceOf(Function);
    });
    it("askAge should be function", () => {
      expect(user.showAgeInConsole).toBeInstanceOf(Function);
    });
    it("showAgeInConsole should be function", () => {
      expect(user.showNameInAlert).toBeInstanceOf(Function);
    });
    it("showNameInAlert should be function", () => {
      expect(user.askAge).toBeInstanceOf(Function);
    });
  });
  describe("Test User functions", () => {
    describe("Ask name", () => {
      it("should show prompt with name request", () => {
        user.askName();
        expect(promptSpy).toHaveBeenCalledWith("What is your name?");
      });
      it("should save user name", () => {
        promptSpy.mockReturnValue("Toto");
        user.askName();
        expect(user.name).toBe("Toto");
      });
      it("should return user object", () => {
        promptSpy.mockReturnValue("Toto");
        const result = user.askName();
        expect(result).toBe(user);
      });
    });
    describe("Ask age", () => {
      it("askAge should show prompt with age request", () => {
        user.askAge();
        expect(promptSpy).toHaveBeenCalledWith("What is your age?");
      });
      it("askAge should save user age", () => {
        promptSpy.mockReturnValue("13");
        user.askAge();
        expect(user.age).toBe("13");
      });
      it("askAge should return user object", () => {
        promptSpy.mockReturnValue("13");
        const result = user.askAge();
        expect(result).toBe(user);
      });
    });
    describe("Show name in alert", () => {
      it("should show name in alert", () => {
        user.name = "Toto";
        user.showNameInAlert();
        expect(alertSpy).toHaveBeenCalledWith("Name: Toto");
      });
      it("should return user object", () => {
        user.name = "Toto";
        const result = user.showNameInAlert();
        expect(result).toBe(user);
      });
    });
    describe("Show age in console", () => {
      it("should show age in console", () => {
        user.age = "69";
        user.showAgeInConsole();
        expect(consoleLogSpy).toHaveBeenCalledWith("Age: 69");
      });
      it("should return user object", () => {
        user.age = "69";
        const result = user.showAgeInConsole();
        expect(result).toBe(user);
      });
    });
  });
});
