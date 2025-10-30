export async function fetchRetry(url, retries, delay) {
  try {
    return await fetch(url);
  } catch (err) {
    if (!retries) {
      throw err;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchRetry(url, retries - 1, delay);
  }
}
