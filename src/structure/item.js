export default class Item {
  #names;
  #glance;
  #description;
  #tangible;
  
  constructor(names) {
    this.#names = names;
    this.#description = 'This item is non-descript.';
    this.#glance = 'There is a non-descript item.';
    this.#tangible = true;
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
    return this.#description;
  }
  
  set description(value) {
    this.#description = value;
  }
  
  get glance() {
    return this.#glance;
  }
  
  set glance(value) {
    this.#glance = value;
  }
  
  get tangible() {
    return this.#tangible;
  }
  
  set tangible(value) {
    this.#tangible = value;
  }
  
  // required by all items
  use(actor, parameters, bots, flags, addFlag, addScore) {
    return [["There's nothing to use this item on!", '']];
  }
}