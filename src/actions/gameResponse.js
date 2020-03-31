import { Message } from '../structure';
import languageParsing from './languageParsing';

export default function(input, bots, stage) {
  var messages = [];
  var newStage = stage;
  var clearLog = false;
  var newBots = [];
  
  function newMessage(text, style = '') {
    messages = [...messages, new Message(text, style)];
  }
  
  function advanceStage(currentStage, path = 0) {
    switch(currentStage) {
      case 'needs reboot':
        newStage = 'starting out';
        break;
      case 'starting out':
        newStage = 'first bot';
    }
  }
  
  function setClearLog() {
    clearLog = true;
  }
  
  function addBot(bot) {
    newBots = [...newBots, bot];
  }
  
  languageParsing(input.toLowerCase(), bots, stage, newMessage, advanceStage, setClearLog, addBot);
  
  return {
    type: 'GAME_RESPONSE',
    payload: {
      messages: messages,
      stage: newStage,
      clearLog: clearLog,
      newBots: newBots
    }
  };
}