import Location from './location';

const root = new Location('First Room');
const offshoot = new Location('Aft Room');

root.link(offshoot, 'aft');

export default root;