export default class Module {
  #name;
  #use;
  #status;
  
  constructor(name, use, status = 2) {
    this.#name = name;
    this.#use = use;
    this.#status = status; // 0 is errored, 1 is lacking process, 2 is operational
  }
  
  get name() {
    return this.#name;
  }
  
  get use() {
    return this.#use;
  }
  
  get status() {
    return this.#status;
  }
  
  set status(value) {
    this.#status = value;
  }
}