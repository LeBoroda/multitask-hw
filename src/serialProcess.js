export function serialProcess(array, processor) {
  const results = [];
  let promises = Promise.resolve();

  array.forEach((el, index, list) => {
    promises = promises.then(() => {
      return new Promise((resolve) => {
        processor(el, index, list, (result) => {
          results[index] = result;
          resolve();
        });
      });
    });
  });
  return promises.then(() => results);
}
