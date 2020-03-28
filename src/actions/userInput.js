import { Message } from '../structure';
import currentTime from './time';

export default function(text) {
  return {
    type: 'USER_INPUT',
    payload: new Message(currentTime(), text, 2)
  };
}