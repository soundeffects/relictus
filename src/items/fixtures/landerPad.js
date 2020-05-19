import { Fixture } from '../../structure';

export default class LanderPad extends Fixture {
  constructor() {
    super(['Lander Pad', 'pad', 'platform', 'arms', 'solderer', 'grasper']);
    this.description = "The giant platform probably serves as a pad for construction, considering the two mechanical arms equipped for that sort of work, reaching down from the cieling above. The tools on the arms are a solderer and a grasper, you reckon. The arms hang limp at the moment.";
  }
}