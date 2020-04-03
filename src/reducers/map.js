import { Location } from '../structure';
import { PaperSlip, BrainTank } from '../items';

const root = new Location('First Room', 'A small and dreary room.');
const offshoot = new Location('Aft Room', "A large area with chords and machines cluttering the interior. You don't understand much of the displays.");

root.addContent(new BrainTank());
offshoot.addContent(new PaperSlip());

root.link(offshoot, 'aft');

export default root;