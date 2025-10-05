import { greetAlice } from "./myBind.js";
import { User } from "./chainUser.js";
import { ForceConstructor } from "./forcedUser.js";
import { curry, sum2, sum4 } from "./curry.js";

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
