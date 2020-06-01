import { Message } from '../structure';
import { resetMap } from '../map';
import languageParsing from './languageParsing';

export default function(input, bots, flags) {
  var messages = [];
  var newFlags = [];
  var reset = false;
  var newBots = [];
  var score = 0;
  
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
    resetMap();
    reset = true;
  }
  
  function addBot(bot) {
    newBots = [...newBots, bot];
  }
  
  function addScore(value) {
    score += value;
  }
  
  languageParsing(input.toLowerCase(), bots, flags, newMessage, addFlag, doReset, addBot, addScore);
  
  return {
    type: 'GAME_RESPONSE',
    payload: {
      messages: messages,
      newFlags: newFlags,
      reset: reset,
      newBots: newBots,
      score: score
    }
  };
}