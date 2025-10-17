import { greetAlice } from "./myBind.js";
import { User } from "./chainUser.js";
import { ForceConstructor } from "./forcedUser.js";
import { curry, sum2, sum4 } from "./curry.js";
import { promisify } from "./promisify.js";
import { Parallel } from "./parallel.js";
import { fetchRetry } from "./fetchRetry.js";
import { debounce } from "./debounce.js";
import {serialProcess} from "./serialProcess.js";

console.log(greetAlice("!"));

const u = new User();
u.askName().askAge().showAgeInConsole().showNameInAlert();

const fU = ForceConstructor("ForcedUser");
console.log(fU.name);
const dU = new ForceConstructor("DeliberateUser");
console.log(dU.name);

const curried2 = curry(sum2); // 3
const curried4 = curry(sum4); // 14

console.log(`Sum2 result: ${sum2(1, 2)}`);
console.log(`Curry result: ${curried2(1)(2)}`);

console.log(`Sum4 result: ${sum4(2, 3, 4, 5)}`);
console.log(`Curry result: ${curried4(2)(3)(4)(5)}`);

function sum(a, b, cb) {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      cb(null, a + b); // успех
    } else {
      cb("Ошибка"); // ошибка
    }
  }, 100);
}

const promisifiedSum = promisify(sum);

promisifiedSum(2, 3)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

const runner = new Parallel(2);

runner
  .job((done) => setTimeout(() => done("A"), 3000))
  .job((done) => setTimeout(() => done("B"), 2000))
  .job((done) => setTimeout(() => done("C"), 1000))
  .done((results) => {
    console.log(results); // ['A', 'B', 'C']
  });

fetchRetry("https://dummyjson.com/products", 3, 1000)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Ошибка после всех попыток:", error));

function onInput(event) {
  console.log("Запрос к серверу:", event.target.value);
}
const debouncedOnInput = debounce(onInput, 500);
let inputElement = document.querySelector("input");
inputElement.addEventListener("input", debouncedOnInput);

serialProcess([1, 2, 3, 4, 5], (el, index, list, done) => {
  console.log(`${el} start`);
  setTimeout(() => {
    console.log(`${el} end`);
    done(el * el);
  }, el * 100);
}).then((list) => console.log(list)); // [1, 4, 9, 16, 25]