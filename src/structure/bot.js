export default class Bot {
  #name;
  #modules;
  #location;
  
  constructor(name, location) {
    this.#name = name;
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
  
  addModule(module) {
    this.#modules = [...this.#modules, module];
  }
  
  removeModule(module) {
    const i = this.#modules.indexOf(module);
    if (i > -1)
      this.#modules.splice(i, 1);
  }
}