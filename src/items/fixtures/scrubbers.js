import { Fixture } from '../../structure';

export default class Scrubbers extends Fixture {
  constructor() {
    super(['Scrubbers', 'machinery', 'vat', 'vats', 'machines', 'machine', 'oxygen', 'glucose', 'water']);
    this.description = "Upon inspection, these machines seem to be filtering various life support chemicals including oxygen, water and glucose according to the labels on sides. There are pipes, wires, and a few maintainence hatches secured by bolts onto the sides of the machines. All in all, these machines seem to be in good repair.";
  }
}