export default class Bot {
  #name;
  #shorthand;
  #modules;
  #location;
  
  constructor(name, location) {
    this.#name = name;
    this.#shorthand = null;
    this.#modules = [];
    this.#location = location;
  }
  
  get name() {
    return this.#name;
  }
  
  get modules() {
    return this.#modules;
  }
  
  get location() {
    return this.#location;
  }
  
  set location(value) {
    this.#location = value;
  }
  
  get shorthand() {
    return this.#shorthand;
  }
  
  set shorthand(value) {
    this.#shorthand = value;
  }
  
  addModule(module) {
    this.#modules.push(module);
  }
  
  removeModule(module) {
    const i = this.#modules.indexOf(module);
    if (i > -1)
      this.#modules.splice(i, 1);
  }
}