import { greetAlice } from "./myBind.js";
import { User } from "./chainUser.js";
import { ForceConstructor } from "./forcedUser.js";

console.log(greetAlice("!"));

const u = new User();
u.askName().askAge().showAgeInConsole().showNameInAlert();

const fU = ForceConstructor("ForcedUser");
console.log(fU.name);
const dU = new ForceConstructor("DeliberateUser");
console.log(dU.name);
