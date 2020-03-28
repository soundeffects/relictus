import Location from './location';

function link(location1, location2, direction) {
  switch (direction) {
    default:
    case 'port':
      location1.port = location2;
      location2.starboard = location1;
      break;
    case 'starboard':
      location1.starboard = location2;
      location2.port = location1;
      break;
    case 'fore':
      location1.fore = location2;
      location2.aft = location1;
      break;
    case 'aft':
      location1.aft = location2;
      location2.fore = location1;
      break;
  }
}

const root = new Location('First Room');
const offshoot = new Location('Aft Room');

link(root, offshoot, 'aft');

export default root;