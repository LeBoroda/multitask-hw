import { promisify } from "./promisify";

describe("Promisify test", () => {
  let sumFuncSucc, sumFuncErr;
  beforeEach(() => {
    sumFuncSucc = (a, b, cb) => {
      setTimeout(() => {
        cb(null, a + b); // успех
      }, 100);
    };
    sumFuncErr = (a, b, cb) => {
      setTimeout(() => {
        cb("Ошибка"); // ошибка
      }, 100);
    };
  });
  describe("Is function tests", () => {
    it("promisify() should be function", () => {
      expect(promisify(sumFuncSucc)).toBeInstanceOf(Function);
    });
  });
  describe("Functional tests", () => {
    it("should return function", () => {
      expect(promisify(sumFuncSucc)).toBeInstanceOf(Function);
    });
    it("should return correct number if resolved", async () => {
      const promisifiedSum = promisify(sumFuncSucc);
      await expect(promisifiedSum(1, 2)).resolves.toBe(3);
    });
    it("should return error if rejected", async () => {
      const promisifiedSum = promisify(sumFuncErr);
      await expect(promisifiedSum(1, 2)).rejects.toBe("Ошибка");
    });
  });
});
