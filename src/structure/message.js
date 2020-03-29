import currentTime from './time';

export default class Message {
  #time;
  #text;
  #style;
  
  constructor(text, style = '') {
    this.#time = currentTime().toLocaleString('en-US', {minimumIntegerDigits: 7, useGrouping: false});
    this.#text = text;
    this.#style = style;
  }
  
  get time() {
    return this.#time;
  }
  
  get text() {
    return this.#text;
  }
  
  get style() {
    return this.#style;
  }
}