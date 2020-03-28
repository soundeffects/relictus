import Message from '../structure/message';

export default function(time) {
  return {
    type: 'GAME_RESPONSE',
    payload: new Message(time, 'Responding!', false)
  };
}