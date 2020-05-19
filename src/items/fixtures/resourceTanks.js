import { Fixture } from '../../structure';

export default class ResourceTanks extends Fixture {
  constructor() {
    super(['Resource Tanks', 'tank', 'tanks', 'cylinder', 'cylinders', 'labels', 'propellant', 'iron']);
    this.description = "These giant cylinders, reaching from cieling to floor, are all perfectly intact. They are labeled with vertical text along the length of the cylinders. Each cylinder holds a useful resource for the ship, such as 'Control Propellant,' 'Soldering Iron,', 'Oxygen,' 'Water,' and more. There doesn't seem to be a tap or other way to access the resources inside these tanks, though.";
  }
}