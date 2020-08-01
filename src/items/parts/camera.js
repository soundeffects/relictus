import { Item } from '../../structure';

export default class CameraPart extends Item {
  constructor() {
    super(['Camera Part', 'camera', 'part']);
    this.description = "The adjusting lens and camera body have been removed from the bot core they originally were attached to, and are now floating around.";
    this.glance = "A camera part is floating nearby.";
  }
}