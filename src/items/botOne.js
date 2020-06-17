import { Item } from '../structure';

export default class BotOne extends Item {
  constructor() {
    super(['Bot One', 'bot']);
    this.description = "This little box of a bot seems to be equipped with little wheels to access the rails, but little else.";
    this.glance = "There's a half-complete bot sitting on the pad.";
    this.solderable = true;
  }
}