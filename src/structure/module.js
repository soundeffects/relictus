export default class Module {
  #name;
  #shorthand;
  #use;
  #status;
  
  constructor(name, use, status = 'Operational') {
    this.#name = name;
    this.#shorthand = null;
    this.#use = use;
    this.#status = status;
  }
  
  get name() {
    return this.#name;
  }
  
  use() {
    this.#use();
  }
  
  get status() {
    return this.#status;
  }
  
  set status(value) {
    this.#status = value;
  }
  
  get shorthand() {
    return this.#shorthand;
  }
  
  set shorthand(value) {
    this.#shorthand = value;
  }
}