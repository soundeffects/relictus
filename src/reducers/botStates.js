import { Bot } from '../structure';
import rootLocation from './map';
import { LifeSupport, Reactor, Navigation, Communication, Surveillance, Propulsion, Activator, BackupBattery } from '../modules';

const system = new Bot('System', rootLocation);
system.addModule(new LifeSupport());
system.addModule(new Reactor());
system.addModule(new Navigation());
system.addModule(new Communication());
system.addModule(new Surveillance());
system.addModule(new Propulsion());
system.addModule(new Activator());
system.addModule(new BackupBattery());

export default function(state = [system], action) {
  switch (action.type) {
    case 'GAME_RESPONSE':
      if (action.payload.reset) return [system];
      return [...state, ...action.payload.newBots];
    default:
      return state;
  }
}