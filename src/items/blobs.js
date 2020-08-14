import { Item } from '../structure';

export default class Blobs extends Item {
  constructor() {
    super(['Blobs of Water', 'water', 'blobs', 'liquid']);
    this.description = "This liquid is clinging to the walls in large blobs, likely because the surface tension and zero gravity environment. The liquid looks pretty clear, but has a slight yellow hue. It's probably leakage from the pipes in the room.";
    this.glance = "There's liquid clinging to the walls in blobs, likely a product of surface tension and zero gravity.";
    this.tangible = false;
  }
}