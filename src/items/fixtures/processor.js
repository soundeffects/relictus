import { Fixture } from '../../structure';

export default class Wires extends Fixture {
  constructor() {
    super(['Processor', 'CPU', 'switches', 'labels', 'panels']);
    this.description = "In total, this tubular structure taking up the space of the room appears to be a computer's processing unit. There are a few labels marking some manual switches. There are also some light indicators and display panels. Most of them are dark, but a few of the indicators are flashing. Among the switches, the ones marked 'Power' and 'Manual Override' catch your eye.";
  }
}