import Item from './item';

export default class SolderedItem extends Item {
  #one;
  #two;
  
  constructor(itemOne, itemTwo) {
    super(["Soldered Item"]);
    
    this.glance = "There is a soldered item here.";
    
    this.#one = itemOne;
    this.#two = itemTwo;
  }
  
  get description() {
    return `This is a soldered combination of two items. To describe the first item: ${this.#one.description} To describe the second: ${this.#two.description}`;
  }
}