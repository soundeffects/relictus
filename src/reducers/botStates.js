import { Bot, Module, rootLocation } from '../structure';

const system = new Bot('system', rootLocation);
system.addModule(new Module('Life_Support', 0));
system.addModule(new Module('Reactor', 0, 'Damaged'));
system.addModule(new Module('Navigation', 0, 'Compromised'));
system.addModule(new Module('Communication', 0, 'Compromised'));
system.addModule(new Module('Surveillance', 0, 'Compromised'));
system.addModule(new Module('Thrusters', 0, 'Compromised'));
system.addModule(new Module('Activate', 0, "No active bots detected. Use 'system activate' to find and activate available bots."));

export default function(state = [system], action) {
  switch (action.type) {
    case 'GAME_RESPONSE':
      return [...state, ...action.payload.newBots];
    default:
      return state;
  }
}