import { Bot, Module, rootLocation } from '../structure';

const firstBot = new Bot('Zero', rootLocation);
firstBot.addModule(new Module('Wheels', 0));
firstBot.addModule(new Module('Camera', 0));
firstBot.addModule(new Module('Grasper', 0));

export default function(state = [firstBot], action) {
  switch (action.type) {
    default:
      return state;
  }
}