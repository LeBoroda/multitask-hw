import { fetchRetry } from "./fetchRetry";

globalThis.fetch = jest.fn();

describe("fetchRetry function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchRetry should be a function", () => {
    expect(fetchRetry).toBeInstanceOf(Function);
  });

  it("should successfully fetch on first try", async () => {
    const mockResponse = { ok: true };
    globalThis.fetch.mockResolvedValueOnce(mockResponse);

    const promise = fetchRetry("https://fakelink.com", 3, 1000);
    const result = await promise;

    expect(result).toBe(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("should retry after failure and succeed", async () => {
    const mockResponse = { ok: true };

    globalThis.fetch
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce(mockResponse);

    const promise = fetchRetry("https://fakelink.com", 3, 1000);

    const result = await promise;
    expect(result).toBe(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it("should fail after exceeding retries", async () => {
    const error = new Error("Network error");
    globalThis.fetch.mockRejectedValue(error);
    const promise = fetchRetry("https://fakelink.com", 2, 50);

    await expect(promise).rejects.toThrow("Network error");
    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
  });
});
