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
  
  get shorthand() {
    return this.#shorthand;
  }
  
  set shorthand(value) {
    this.#shorthand = value;
  }
  
  addModule(module) {
    this.#modules = [...this.#modules, module];
  }
  
  removeModule(module) {
    const i = this.#modules.indexOf(module);
    if (i > -1)
      this.#modules.splice(i, 1);
  }
}