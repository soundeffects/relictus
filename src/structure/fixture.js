import Item from './item';

export default class Fixture extends Item {
  #blocking;
  
  constructor(name, description, blocking) {
    super(name, description);
    
    this.#blocking = blocking;
  }
  
  get blocking() {
    return this.#blocking;
  }
  
  set blocking(value) {
    this.#blocking = value; 
  }
}