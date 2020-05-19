import { Fixture } from '../../structure';

export default class PartDebris extends Fixture {
  constructor() {
    super(['Part Debris', 'parts', 'debris', 'tech', 'scraps']);
    this.description = "Parts are floating freely around the room; including wheels, cameras, sensors, and other material. Most seems to have been damaged over time after bumping into things in the zero gravity. There are a few pieces that seem to still be packaged or wrapped however; perhaps there is something functional inside.";
  }
}