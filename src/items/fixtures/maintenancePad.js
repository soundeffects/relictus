import { Fixture } from '../../structure';

export default class MaintenancePad extends Fixture {
  constructor() {
    super(['Maintenance Pad', 'pad', 'platform', 'maintenance', 'arms', 'tools']);
    this.description = "A small circular pad, just big enough to comfortably fit a rover or a bot such as the one you're controlling now. The platform is raised above the ground level, and from the sides of the raised platform there are small arms sprouting out, which angle around so that they have access to the pad. There are four of these, and each is coming out from the side of the platform, evenly spaced along its diameter. The final product looks somewhat like a spider on its back. Each of the arms has a tool, but they're too small for you to tell what each does.";
  }
}