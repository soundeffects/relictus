export default class Item {
  #names;
  #glance;
  #description;
  #viewed;
  
  constructor(names, description = 'This item is non-descript.', glance = 'There is a non-descript item.') {
    this.#names = names;
    this.#description = description;
    this.#glance = glance;
    this.#viewed = false;
  }
  
  get names() {
    return this.#names;
  }
  
  addName(name) {
    this.#names.push(name);
  }
  
  removeName(name) {
    const i = this.#names.indexOf(name);
    if (i > -1)
      this.#names.splice(i, 1);
  }
  
  get description() {
    this.#viewed = true;
    return this.#description;
  }
  
  set description(value) {
    this.#description = value;
  }
  
  get viewed() {
    return this.#viewed;
  }
  
  set viewed(value) {
    this.#viewed = value;
  }
  
  // required by all items
  use(actor, parameters, bots, stage, advanceStage, addBot) {
    return [["There's nothing to use this item on!", '']];
  }
}