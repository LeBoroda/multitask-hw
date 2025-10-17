import { debounce } from "./debounce";

jest.useFakeTimers();

describe("Test debounce()", () => {
  let fn;
  let debouncedFn;

  beforeEach(() => {
    fn = jest.fn();
    debouncedFn = debounce(fn, 500);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe("Debounce", () => {
    it("should be a funciton", () => {
      expect(debounce).toBeInstanceOf(Function);
    });
  });
  describe("debounce", () => {
    it("should call the debounced function after delay", () => {
      debouncedFn("arg1", "arg2");
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(499);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith("arg1", "arg2");
    });

    it("should call function only once if called multiple times quickly", () => {
      debouncedFn("first");
      debouncedFn("second");
      debouncedFn("third");

      jest.advanceTimersByTime(499);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith("third");
    });

    it("should call function multiple times if calls are spaced by more than delay", () => {
      debouncedFn("first");
      jest.advanceTimersByTime(500);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith("first");

      debouncedFn("second");
      jest.advanceTimersByTime(500);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith("second");
    });
  });
});
