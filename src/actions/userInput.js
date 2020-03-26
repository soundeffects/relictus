import Message from './message';

export default function(time, text) {
  return {
    type: 'USER_INPUT',
    payload: new Message(time, text, true)
  };
}