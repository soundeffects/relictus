import Location from './location';

const root = new Location('First Room', 'A small and dreary room. It contains a large tank with a cloud liquid, lit by yellow lights in the middle.');
const offshoot = new Location('Aft Room', "A large area with chords and machines cluttering the interior. You don't understand much of the displays.");

root.link(offshoot, 'aft');

export default root;