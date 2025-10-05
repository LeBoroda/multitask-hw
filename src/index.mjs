import { greetAlice } from "./myBind.js";
import {User} from "./chainUser.js";

console.log(greetAlice("!"));

const u = new User();
u.askName().askAge().showAgeInConsole().showNameInAlert();