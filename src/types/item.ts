import Descript from './Descript';

/**
 * Item
 * A dynamic object that can be carried around or placed in Locations.
 * May have some use cases, where it can have unique effects.
 */
export default class Item extends Descript {
  private movable: boolean;

  public constructor(description: string) {
    super(description);

    this.movable = true;
  }
}
