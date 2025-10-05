import { greet } from "./myBind";

describe("Polyfill custom bind tests", () => {
  describe("Is Function test", () => {
    it("greet() should be function", () => {
      expect(greet).toBeInstanceOf(Function);
    });
    it("myBind is function", () => {
      expect(greet.myBind).toBeInstanceOf(Function);
    });
  });
  describe("Function tests", () => {
    it("should return function", () => {
      expect(greet.myBind({}, "")).toBeInstanceOf(Function);
    });
    it("should greet Indigo Montoya with context (myBind)", () => {
      const person = { name: "Indigo Montoya" };
      const greetAlice = greet.myBind(person, "Hello");
      expect(greetAlice("!")).toBe("Hello, Indigo Montoya!");
    });
  });
});
