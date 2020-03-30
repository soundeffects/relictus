import { Message } from '../structure';
import parseInput from './parseInput';

export default function(input, bots, stage) {
  var messages = [];
  var newStage = stage;
  var clearLog = false;
  
  function newMessage(text, style = '') {
    messages = [...messages, new Message(text, style)];
  }
  
  function advanceStage(currentStage, path = 0) {
    switch(currentStage) {
      case 'needs reboot':
        newStage = 'starting out';
        break;
      default:
    }
  }
  
  function setClearLog() {
    clearLog = true;
  }
  
  parseInput(input.toLowerCase(), bots, stage, newMessage, advanceStage, setClearLog);
  
  return {
    type: 'GAME_RESPONSE',
    payload: {
      messages: messages,
      stage: newStage,
      clearLog: clearLog
    }
  };
}