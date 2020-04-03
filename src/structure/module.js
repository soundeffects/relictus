export default class Module {
  #name;
  #action;
  #shorthand;
  #status;
  
  constructor(name, action = null, status = 'Operational') {
    this.#name = name;
    if (!action) {
      this.#action = name;
    } else {
      this.#action = action;
    }
    this.#shorthand = null;
    this.#status = status;
  }
  
  get name() {
    return this.#name;
  }
  
  get action() {
    return this.#action;
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
  use(actor, parameters, bots, stage, advanceStage, addBot) {
    return [["This module doesn't have a function!", '']];
  }
  
  // required by all modules
  report() {
    return ['Nothing to report.', ''];
  }
  
  // required by all modules
  help() {
    return "This module doesn't have a function.";
  }
}