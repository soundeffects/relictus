import { Bot } from '../structure';
import Map from '../map';
import { LifeSupport, Reactor, Navigation, Communication, Surveillance, Propulsion, Activator, BackupBattery } from '../modules';

function newSystemBot() {
  const system = new Bot('System', Map.cpu);
  system.addModule(new LifeSupport());
  system.addModule(new Reactor());
  system.addModule(new Navigation());
  system.addModule(new Communication());
  system.addModule(new Surveillance());
  system.addModule(new Propulsion());
  system.addModule(new Activator());
  system.addModule(new BackupBattery());
  return system;
};

export default function(state = [newSystemBot()], action) {
  switch (action.type) {
    case 'GAME_RESPONSE':
      if (action.payload.reset) return [newSystemBot()];
      return [...state, ...action.payload.newBots];
    default:
      return state;
  }
}