import { Fixture } from '../../structure';

export default class Surgeon extends Fixture {
  constructor() {
    super(['Brain Surgeon', 'surgeon', 'apparatus']);
    this.description = "This apparatus is a glass cylinder about as tall as a person, and the same measurement wide. Inside there are three long, delicate machine arms sprouting out from a metal disk forming the top of the apparatus. Each arm has an intricate tool on its tip, and not quite sure what their functions may be. There's a sliding glass door that forms a hatch on the front for accessing the inside of this apparatus. Pipes lead into the top of the apparatus.";
  }
}