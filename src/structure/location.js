export default class Location {
  #name;
  #description;
  #contents;
  #port;
  #starboard;
  #fore;
  #aft;
  
  constructor(name, description = 'This room is nondescript.', contents = []) {
    this.#name = name;
    this.#description = description;
    this.#contents = contents;
  }
  
  get name() {
    return this.#name;
  }
  
  get description() {
    return this.#description;
  }
  
  set description(text) {
    this.#description = text;
  }
  
  get contents() {
    return this.#contents;
  }
  
  get port() {
    return this.#port;
  }
  
  set port(location) {
    this.#port = location;
  }
  
  get starboard() {
    return this.#starboard;
  }
  
  set starboard(location) {
    this.#starboard = location;
  }
  
  get fore() {
    return this.#fore;
  }
  
  set fore(location) {
    this.#fore = location;
  }
  
  get aft() {
    return this.#aft;
  }
  
  set aft(location) {
    this.#aft = location;
  }
  
  addContent(content) {
    this.#contents = [...this.#contents, content];
  }
  
  removeContent(content) {
    const i = this.#contents.indexOf(content);
    if (i > -1)
      this.#contents.splice(i, 1);
  }
}