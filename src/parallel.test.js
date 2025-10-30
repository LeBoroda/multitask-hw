import { Parallel } from "./parallel";

describe("Parallel class tests", () => {
  describe("Is function tests", () => {
    it("Parallel should be function", () => {
      expect(Parallel).toBeInstanceOf(Function);
    });
    it("job should be function", () => {
      expect(Parallel.prototype.job).toBeInstanceOf(Function);
    });
    it("done should be function", () => {
      expect(Parallel.prototype.done).toBeInstanceOf(Function);
    });
  });
  describe("Parallel", () => {
    it("should execute all jobs in correct order", () => {
      const p = new Parallel(2);
      return new Promise((resolve) => {
        p.job((cb) => setTimeout(() => cb("A"), 300))
          .job((cb) => setTimeout(() => cb("B"), 100))
          .job((cb) => setTimeout(() => cb("C"), 200))
          .done((results) => {
            expect(results).toEqual(["A", "B", "C"]);
            resolve();
          });
      });
    });

    it("should limit amount of threads", () => {
      const limit = 2;
      const p = new Parallel(limit);

      let running = 0;
      let maxRunning = 0;

      const job = (val, delay) => (d) => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        setTimeout(() => {
          running--;
          d(val);
        }, delay);
      };
      return new Promise((resolve) => {
        p.job(job("A", 100))
          .job(job("B", 100))
          .job(job("C", 100))
          .job(job("D", 100))
          .done((results) => {
            expect(results).toEqual(["A", "B", "C", "D"]);
            expect(maxRunning).toBeLessThanOrEqual(limit);
            resolve();
          });
      });
    });

    it("should work correctly when limit = Infinity", () => {
      const p = new Parallel();
      return new Promise((resolve) => {
        p.job((cb) => setTimeout(() => cb(1), 30))
          .job((cb) => setTimeout(() => cb(2), 20))
          .job((cb) => setTimeout(() => cb(3), 10))
          .done((results) => {
            expect(results).toEqual([1, 2, 3]);
            resolve();
          });
      });
    });

    it("should call done() async if no jobs added", () => {
      const p = new Parallel(3);
      let syncFlag = true;
      return new Promise((resolve) => {
        p.done((results) => {
          expect(syncFlag).toBe(false);
          expect(results).toEqual([]);
          resolve();
        });
        syncFlag = false;
      });
    });

    it("should return results in same order as job adding order", () => {
      const p = new Parallel(3);
      return new Promise((resolve) => {
        p.job((cb) => setTimeout(() => cb("first"), 200))
          .job((cb) => setTimeout(() => cb("second"), 50))
          .job((cb) => setTimeout(() => cb("third"), 100))
          .done((results) => {
            expect(results).toEqual(["first", "second", "third"]);
            resolve();
          });
      });
    });
  });
});
