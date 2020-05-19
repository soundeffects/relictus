import Item from './item';

export default class Fixture extends Item {
  #blocking;
  
  constructor(names) {
    super(names);
    
    this.#blocking = [];
  }
  
  get blocking() {
    return this.#blocking;
  }
  
  blockDirection(direction) {
    this.#blocking.push(direction);
    this.#blocking.push(direction.charAt(0));
  }
  
  blockDirections(directions) {
    directions.forEach(direction => this.blockDirection(direction));
  }
  
  unblockDirection(direction) {
    let i = this.#blocking.indexOf(direction);
    if (i > -1) this.#blocking.splice(i, 1);
    
    i = this.#blocking.indexOf(direction.charAt(0));
    if (i > -1) this.#blocking.splice(i, 1);
  }
}