import { Message } from '../structure';
import languageParsing from './languageParsing';

export default function(input, bots, flags) {
  var messages = [];
  var newFlags = [];
  var reset = false;
  var newBots = [];
  
  function newMessage(text, style = '') {
    messages = [...messages, new Message(text, style)];
  }
  
  function addFlag(flag) {
    if (!(flags.includes(flag) || newFlags.includes(flag))) {
      newFlags = [...newFlags, flag];
      return true;
    }
    return false;
  }
  
  function doReset() {
    reset = true;
  }
  
  function addBot(bot) {
    newBots = [...newBots, bot];
  }
  
  languageParsing(input.toLowerCase(), bots, flags, newMessage, addFlag, doReset, addBot);
  
  return {
    type: 'GAME_RESPONSE',
    payload: {
      messages: messages,
      newFlags: newFlags,
      reset: reset,
      newBots: newBots
    }
  };
}