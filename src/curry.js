export function sum2(x, y) {
  return x + y;
}
export function sum4(a, b, c, d) {
  return a + b + c + d;
}

export function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curriedFunc.apply(this, args.concat(moreArgs));
      };
    }
  };
}
