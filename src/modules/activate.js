import { Module } from '../structure';

export default class Activate extends Module {
  constructor() {
    super('Activate');
  }
  
  /*use() {
    TODO
  }*/
  
  report() {
    var response = `No bots detected. Use 'system activate' to find and activate all available bots.`;
    
    return [response, ''];
  }
  
  help() {
    return 'The activation operation allows the system to purpose bots aboard the ship for different tasks. Using activation in the terminal allows the terminal user to control the bot directly.';
  }
}