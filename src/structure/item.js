export default class Item {
  #name;
  #description;
  
  constructor(name, description = 'This item is non-descript.') {
    this.#name = name;
    this.#description = description;
  }
  
  get name() {
    return this.#name;
  }
  
  get description() {
    return this.#description;
  }
  
  set description(value) {
    this.#description = value;
  }
  
  // required by all items
  use(actor, parameters, bots, stage, advanceStage, addBot) {
    return [['text', 'style']];
  }
}