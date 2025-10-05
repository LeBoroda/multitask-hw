import { curry, sum2, sum4 } from "./curry";

describe("curry functions test", () => {
  describe("Should be a function", () => {
    it("sum2 should be function", () => {
      expect(sum2).toBeInstanceOf(Function);
    });
    it("sum4 should be function", () => {
      expect(sum4).toBeInstanceOf(Function);
    });
    it("curry should be function", () => {
      expect(curry).toBeInstanceOf(Function);
    });
  });
  describe("sum 2 tests", () => {
    it("should add 2 numbers correctly", () => {
      expect(sum2(1, 3)).toBe(4);
      expect(sum2(0, 0)).toBe(0);
    });
  });
  describe("sum 4 tests", () => {
    it("should add 4 numbers correctly", () => {
      expect(sum4(1, 2, 3, 4)).toBe(10);
      expect(sum4(-1, 0, 6, 5)).toBe(10);
    });
  });
  describe("curry sum2 tests", () => {
    it("should add 2 numbers correctly", () => {
      const curriedSum2 = curry(sum2);
      expect(curriedSum2(3)(4)).toBe(7);
      expect(curriedSum2(10, 5)).toBe(15);
    });
  });
  describe("curry sum4 tests", () => {
    it("should add 4 numbers correctly", () => {
      const curriedSum4 = curry(sum4);
      expect(curriedSum4(1)(2)(3)(4)).toBe(10);
      expect(curriedSum4(1, 2)(3, 4)).toBe(10);
      expect(curriedSum4(1, 2, 3)(4)).toBe(10);
    });
  });
});
