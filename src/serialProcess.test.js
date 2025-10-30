import { serialProcess } from "./serialProcess";

describe("Serial Processor Tests", () => {
  describe("serialProcessor", () => {
    it("should be a function", () => {
      expect(serialProcess).toBeInstanceOf(Function);
    });
  });
  describe("serialProcess", () => {
    it("processes elements in correct order and returns correct results", async () => {
      const input = [1, 2, 3];
      const processor = jest.fn((el, index, list, done) => {
        setTimeout(() => done(el * 2), 10);
      });

      const results = await serialProcess(input, processor);

      expect(results).toEqual([2, 4, 6]);
      expect(processor).toHaveBeenCalledTimes(input.length);

      expect(processor.mock.calls[0][0]).toBe(1);
      expect(processor.mock.calls[1][0]).toBe(2);
      expect(processor.mock.calls[2][0]).toBe(3);
    });

    it("returns empty array on empty input", async () => {
      const results = await serialProcess([], jest.fn());
      expect(results).toEqual([]);
    });

    it("maintains processing order", async () => {
      const executionOrder = [];
      const input = [1, 2, 3];

      const processor = (el, index, list, done) => {
        executionOrder.push(`start ${el}`);
        setTimeout(
          () => {
            executionOrder.push(`end ${el}`);
            done(el);
          },
          50 - el * 10,
        );
      };

      const results = await serialProcess(input, processor);

      expect(results).toEqual(input);
      expect(executionOrder).toEqual([
        "start 1",
        "end 1",
        "start 2",
        "end 2",
        "start 3",
        "end 3",
      ]);
    });
  });
});
