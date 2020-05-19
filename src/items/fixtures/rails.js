import { Fixture } from '../../structure';

export default class Rails extends Fixture {
  constructor() {
    super(['Rails', 'path']);
    this.description = "There are metal rails indented into the floor of the ship, which the bots wheels clip onto so that it can move in zero gravity.";
  }
}