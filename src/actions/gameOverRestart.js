import { flagNames, Message } from '../structure';
import { resetMap } from '../map';
import languageParsing from './languageParsing';

export default function() {
  var messages = [];
  
  function newMessage(text, style) {
    messages = [...messages, new Message(text, style)];
  }
  
  function doReset() {
    resetMap();
  }
  
  languageParsing('restart', [], [flagNames.RESTARTED], newMessage, null, doReset, null, null);
  
  return {
    type: 'GAME_OVER_RESTART',
    payload: { messages: messages }
  };
}