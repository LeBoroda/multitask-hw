import { greetAlice } from "./myBind.js";
import { User } from "./chainUser.js";
import { ForceConstructor } from "./forcedUser.js";
import { curry, sum2, sum4 } from "./curry.js";
import {promisify} from "./promisify.js";

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