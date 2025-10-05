export class User {
  askName() {
    this.name = prompt("What is your name?");
    return this;
  }
  askAge() {
    this.age = prompt("What is your age?");
    return this;
  }

  showAgeInConsole() {
    console.log(`Age: ${this.age}`);
    return this;
  }
  showNameInAlert() {
    alert(`Name: ${this.name}`);
    return this;
  }
}
