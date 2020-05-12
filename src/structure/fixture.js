import Item from './item';

export default class Fixture extends Item {
  #blocking;
  
  constructor(names) {
    super(names);
    
    this.#blocking = null;
  }
  
  get blocking() {
    return this.#blocking;
  }
  
  set blocking(value) {
    this.#blocking = value; 
  }
}