import { Fixture } from '../../structure';

export default class Scrubbers extends Fixture {
  constructor() {
    super(['Heat Lock', 'lock', 'airlock', 'portal', 'door']);
    this.description = "This solid looking door blocks the pathway aft. It is labeled in red letters: 'Heat Lock.'";
    this.blocking = 'a';
  }
}