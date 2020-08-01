import { Item } from '../../structure';

export default class BotCore extends Item {
  constructor() {
    super(['Bot Core', 'bot', 'core']);
    this.description = "This little robot core is ready to be activated. It has wheels and a camera already installed.";
    this.glance = "There's what appears to be the body of a bot sitting unactivated.";
  }
}