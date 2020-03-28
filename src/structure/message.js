export default class Message {
  #time;
  #text;
  #userInput;
  
  constructor(time, text, userInput) {
    this.#time = time.toLocaleString('en-US', {minimumIntegerDigits: 7, useGrouping: false});
    this.#text = text;
    this.#userInput = userInput;
  }
  
  get time() {
    return this.#time;
  }
  
  get text() {
    return this.#text;
  }
  
  get userInput() {
    return this.#userInput;
  }
}