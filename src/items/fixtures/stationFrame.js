import { Fixture } from '../../structure';

export default class StationFrame extends Fixture {
  constructor() {
    super(['Bot Station Frame', 'frame', 'rectangle', 'box']);
    this.description = "The metal frame goes over the head of this bot, and has open sides but a sheet for a roof. It reminds you of a marketplace vendor, with a canvas overhead, shading the wares. The wares in this case would be the various scraps of technology and machinery, and the half-built, half-damaged bots each waiting on different railway spots underneath the frame.";
  }
}