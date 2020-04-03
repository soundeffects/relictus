import { Item } from '../structure';

export default class PaperSlip extends Item {
  constructor() {
    super(['Slip of Paper', 'paper slip', 'slip', 'paper'],
    'There is a slip of paper reads: Thanks for your help with my development of this game! Please share any ideas you have to make it better!');
  }
}