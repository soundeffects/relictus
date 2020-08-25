import { Item } from '../../structure';

export default class TankPart extends Item {
  constructor() {
    super(['Liquid Tank Part', 'tank', 'part']);
    this.description = "A medium-sized, reinforced tank with a square pump sticking out of the side. It seems to get the job done.";
    this.glance = "A tank part is floating nearby.";
  }
}