import { Bot, rootLocation } from '../structure';
import { LifeSupport, Reactor, Navigation, Communication, Surveillance, Propulsion, Activate, BackupBattery } from '../modules';

const system = new Bot('system', rootLocation);
system.addModule(new LifeSupport());
system.addModule(new Reactor());
system.addModule(new Navigation());
system.addModule(new Communication());
system.addModule(new Surveillance());
system.addModule(new Propulsion());
system.addModule(new Activate());
system.addModule(new BackupBattery());

export default function(state = [system], action) {
  switch (action.type) {
    case 'GAME_RESPONSE':
      return [...state, ...action.payload.newBots];
    default:
      return state;
  }
}