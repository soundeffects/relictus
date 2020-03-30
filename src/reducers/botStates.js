import { Bot, Module, rootLocation } from '../structure';

const system = new Bot('system', rootLocation);
system.shorthand = 'sys';
system.addModule(new Module('Activate', 0));

export default function(state = [system], action) {
  switch (action.type) {
    default:
      return state;
  }
}