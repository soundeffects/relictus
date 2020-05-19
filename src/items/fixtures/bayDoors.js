import { Fixture } from '../../structure';

export default class BayDoors extends Fixture {
  constructor() {
    super(['Cargo Bay Doors', 'doorway', 'doors', 'hatch', 'door']);
    this.description = "Imposing doors several times the size of your small bot are the only thing between you and outer space.";
    this.blockDirections(['port', 'fore', 'aft']);
  }
}