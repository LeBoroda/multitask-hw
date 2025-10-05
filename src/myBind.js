export function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

Function.prototype.myBind = function (context, ...rest) {
  const fn = this;
  return function (...args) {
    return fn.call(context, ...rest.concat(args));
  };
};

const person = { name: "Алиса" };
const greetAlice = greet.myBind(person, "Привет");

console.log(greetAlice("!")); // Ожидаемый результат: "Привет, Алиса!"
