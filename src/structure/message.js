export default class Message {
  #time;
  #text;
  #style;
  
  constructor(time, text, style = 0) {
    this.#time = time.toLocaleString('en-US', {minimumIntegerDigits: 7, useGrouping: false});
    this.#text = text;
    this.#style = style; // 0: readout, 1: emotive, 2: input
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