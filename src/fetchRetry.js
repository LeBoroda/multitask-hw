export async function fetchRetry(url, retries, delay) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Http error");
    }
    return response;
  } catch (err) {
    if (!retries) {
      throw err;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchRetry(url, retries - 1, delay);
  }
}
