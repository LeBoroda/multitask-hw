export function promisify(functionWithCb) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      functionWithCb(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}
