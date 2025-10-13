export function promisify(cb) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      cb(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}
