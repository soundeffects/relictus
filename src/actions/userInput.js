import Message from '../structure/message';

export default function(time, text) {
  return {
    type: 'USER_INPUT',
    payload: new Message(time, text, true)
  };
}