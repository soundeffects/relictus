import { Item } from '../../structure';

export default class WheelsPart extends Item {
  constructor() {
    super(['Wheeled Platform', 'wheels', 'platform', 'part']);
    this.description = "This is a rotating platform with four wheels attached. The platform allows the bot to rotate its body while moving around, wheels clipped onto the rails running along the ship. This platform is no longer attached to a bot.";
    this.glance = "A wheel module is clipped onto the rails, but no longer attached to a bot.";
  }
}