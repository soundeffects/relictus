export default class Bot {
  #name;
  #shorthand;
  #modules;
  #location;
  #locked;
  
  constructor(name, location) {
    this.#name = name;
    this.#shorthand = null;
    this.#modules = [];
    this.#location = location;
    this.#locked = false;
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
  
  get locked() {
    return this.#locked;
  }
  
  toggleLocked() {
    this.#locked = !this.#locked;
  }
  
  addModule(module) {
    this.#modules.push(module);
  }
  
  removeModule(module) {
    if (module.constructor === String) module = this.findModule(module);
    const i = this.#modules.indexOf(module);
    if (i > -1) this.#modules.splice(i, 1);
    return module;
  }
  
  findModule(name) {
    if (!name) return null;
    var returnModule = null;
    this.#modules.forEach(module => {
      if (module.name.toLowerCase() === name.toLowerCase()) {
        returnModule = module;
      }
    });
    return returnModule;
  }
}