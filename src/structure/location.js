export default class Location {
  #name;
  #description;
  #contents;
  #port;
  #starboard;
  #fore;
  #aft;
  
  constructor(name) {
    this.#name = name;
    this.#description = "This room is non-descript.";
    this.#contents = [];
  }
  
  get name() {
    return this.#name;
  }
  
  get description() {
    return this.#description;
  }
  
  set description(value) {
    this.#description = value;
  }
  
  get contents() {
    return this.#contents;
  }
  
  findItem(name) {
    this.#contents.forEach(item => {
      item.names.forEach(itemName => {
        if (itemName.toLowerCase === name.toLowerCase)
          return item;
      });
    });
    return null;
  }
  
  getLocation(direction) {
    // ESLint keeps warning about no default case, ignoring
    // eslint-disable-next-line
    switch(direction) {
      case 'p':
      case 'port':
        return this.#port;
      case 's':
      case 'starboard':
        return this.#starboard;
      case 'f':
      case 'fore':
        return this.#fore;
      case 'a':
      case 'aft':
        return this.#aft;
    }
  }
  
  addContent(content) {
    this.#contents.push(content);
  }
  
  removeContent(name) {
    const content = this.findItem(name);
    const i = this.#contents.indexOf(content);
    if (i > -1) this.#contents.splice(i, 1);
  }
  
  clearContents() {
    this.#contents = [];
  }
  
  link(location, direction, oneWay = false) {
    switch (direction) {
      default:
      case 'p':
      case 'port':
        this.#port = location;
        if (!oneWay) location.link(this, 'starboard', true);
        break;
      case 's':
      case 'starboard':
        this.#starboard = location;
        if (!oneWay) location.link(this, 'port', true);
        break;
      case 'f':
      case 'fore':
        this.#fore = location;
        if (!oneWay) location.link(this, 'aft', true);
        break;
      case 'a':
      case 'aft':
        this.#aft = location;
        if (!oneWay) location.link(this, 'fore', true);
        break;
    }
  }
}