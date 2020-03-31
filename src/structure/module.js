export default class Module {
  #name;
  #shorthand;
  #status;
  
  constructor(name, status = 'Operational') {
    this.#name = name;
    this.#shorthand = null;
    this.#status = status;
  }
  
  get name() {
    return this.#name;
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
  
  // required by all modules
  use() {
    return [['text', 'style']];
  }
  
  // required by all modules
  report() {
    return ['text', 'style'];
  }
  
  // required by all modules
  help() {
    return 'text';
  }
}