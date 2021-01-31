import Descript from '../types/Descript';
import Item from '../types/Item';


/**
 * Direction
 * A simple enum for the four directions on a ship: 
 * fore - forwards
 * starboard - right
 * aft - backwards
 * port - left
 */
export default enum Direction {
  fore,
  starboard,
  aft,
  port
}

/**
 * oppositeDirection
 * Returns the opposite direction of the provided direction.
 * Fore and aft are opposites, starboard and port are opposites.
 */
export function oppositeDirection(direction: Direction): Direction {
  return Direction[(direction + 2) % 4];
}

class Location extends Descript {
  private portals: Location[];
  private items: Item[];

  public constructor(description: string) {
    super(description);

    this.portals = new Location[4];
    this.items = [];
  }

  public move(direction: Direction): Location {
    return this.portals[direction];
  }

  public link(direction: direction, location: Location): void {
    this.portals[direction] = location;
    location.portals[oppositeDirection(direction)] = this;
  }

  public addItem(item: Item): void {
    items.push(obj);
  }

  public removeItem(name: string): Item {
    let removed = null;
    
    items.every((item, index) => {
      if (item.matchName(name)) {
        removed = item;
        items.splice(index, 1);
        return false;
      }
      return true;
    });

    return removed;
  }
}

const locations: Map = new Map();

let position: Location;

export function createLocation(description: string): void {
    
}

export function linkLocations(from: Location, direction: direction, to: Location) {
    
}

export function move(direction): Location {
    
}

export function describe(filter: string): string[] {
   
} 
