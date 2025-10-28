export function ForceConstructor(name) {
  if (!new.target) {
    return new ForceConstructor(name);
  }
  this.name = name;
}
