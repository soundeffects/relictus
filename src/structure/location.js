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
  
  getLocation(direction) {
    switch(direction) {
      case 'port':
        return this.#port;
      case 'starboard':
        return this.#starboard;
      case 'fore':
        return this.#fore;
      case 'aft':
        return this.#aft;
    }
  }
  
  getPathways() {
    var response = 'There ';
    var directions = [];
    
    if (this.#port) directions = ['port'];
    if (this.#starboard) directions = [...directions, 'starboard'];
    if (this.#fore) directions = [...directions, 'fore'];
    if (this.#aft) directions = [...directions, 'aft'];
    
    if (directions.length === 0) response += 'are no pathways from here.';
    else if (directions.length === 1) response += `is a pathway to ${directions[0]}.`;
    else if (directions.length === 2) response += `are pathways to ${directions[0]} and to ${directions[1]}.`;
    else {
      response += 'are pathways ';
      directions.forEach((direction, index) => {
        if (index === directions.length - 1)
          response += `and to ${direction}.`;
        else
          response += `to ${direction}, `
      });
    }
    
    return response;
  }
  
  addContent(content) {
    this.#contents = [...this.#contents, content];
  }
  
  removeContent(content) {
    const i = this.#contents.indexOf(content);
    if (i > -1)
      this.#contents.splice(i, 1);
  }
  
  link(location, direction, oneWay = false) {
    switch (direction) {
      default:
      case 'port':
        this.#port = location;
        if (!oneWay) location.link(this, 'starboard', true);
        break;
      case 'starboard':
        this.#starboard = location;
        if (!oneWay) location.link(this, 'port', true);
        break;
      case 'fore':
        this.#fore = location;
        if (!oneWay) location.link(this, 'aft', true);
        break;
      case 'aft':
        this.#aft = location;
        if (!oneWay) location.link(this, 'fore', true);
        break;
    }
  }
}