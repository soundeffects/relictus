import { Message } from '../structure';

export default function(text) {
  return {
    type: 'USER_INPUT',
    payload: new Message(text, 'user')
  };
}