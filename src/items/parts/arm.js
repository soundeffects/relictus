import { Item } from '../../structure';

export default class ArmPart extends Item {
  constructor() {
    super(['Arm Part', 'arm', 'part']);
    this.description = "This part seems to be a mechanical grasper attached to an arm. It seems to be intended for use on a lander.";
    this.glance = "A lander part seems to have floated to the pad, hitting one of the arms and coming to a stop.";
  }
}