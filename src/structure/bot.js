class Bot {
  #name;
  #process;
  #modules;
  
  constructor(name) {
    this.#name = name;
    this.#process = 'none';
    this.#modules = [];
  }
  
  get name() {
    return this.#name;
  }
  
  get process() {
    return this.#process;
  }
  
  get modules() {
    return this.#modules;
  }
  
  addModule(module) {
    this.#modules.concat(module);
  }
  
  removeModule(module) {
    //TODO
  }
}