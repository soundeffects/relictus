export default class Module {
  #name;
  #action;
  #shorthand;
  #status;
  
  constructor(name, action = null) {
    this.#name = name;
    if (!action) {
      this.#action = name;
    } else {
      this.#action = action;
    }
    this.#shorthand = null;
    this.#status = "Operational";
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
  
  checkLocked(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    if (!actor.locked) {
      return this.use(actor, parameters, bots, flags, addFlag, addBot, addScore);
    }
    return [["Error: this bot is not responding to attempted connections.", 'error']];
  }
  
  // required by all modules
  use(actor, parameters, bots, flags, addFlag, addBot, addScore) {
    return [["Error: this module does not have a use. This is likely a bug.", 'error']];
  }
  
  // required by all modules
  report() {
    return ["Error: this module does not have a report function. This is likely a bug.", 'error'];
  }
  
  // required by all modules
  help() {
    return "Error: this module does not have help documentation. This is likely a bug."
  }
}