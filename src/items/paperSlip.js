import { Item } from '../structure';

export default class PaperSlip extends Item {
  constructor() {
    super(['Slip of Paper', 'paper slip', 'slip', 'paper']);
    this.description = "There's writing on the paper. It reads: 'Thanks for your help with my development of this game! Please share any ideas you have to make it better!'";
    this.glance = "There's a slip of paper on the floor.";
  }
}