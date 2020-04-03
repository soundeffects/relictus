import Item from './item';

export default class Fixture extends Item {
  #blocking;
  
  constructor(names, description, blocking) {
    super(names, description);
    
    this.#blocking = blocking;
  }
  
  get blocking() {
    return this.#blocking;
  }
  
  set blocking(value) {
    this.#blocking = value; 
  }
}