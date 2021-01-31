import Descript from '../types/descript';
import Item from '../types/item';


/**
 * Direction
 * A simple enum for the four directions on a ship: 
 * fore - forwards
 * starboard - right
 * aft - backwards
 * port - left
 */
export enum Direction {
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
  // Directions are arranged such that this formula works
  return (direction + 2) % 4;
}



class Location extends Descript {
  private portals: string[];
  private items: Item[];

  public constructor(names: string[], description: string, portals: string[]) {
    super(names, description);
    this.portals = portals;
    this.items = [];
  }
  
  public portal(direction: Direction): string {
    return this.portals[direction];
  }

  public addItem(item: Item): void {
    this.items.push(item);
  }
  
  public removeItem(name: string): Item | undefined {
    let removed: Item | undefined = undefined;
    
    this.items.every((item, index) => {
      if (item.matchName(name)) {
        removed = item;
        this.items.splice(index, 1);
        return false;
      }
      return true;
    });

    return removed;
  }
  
  public describe(filter: DescriptionFilter, arg: any): string[] {
    const descriptions: string[] = [];
    
    if (filter(this, arg))
      descriptions.push(this.description);
  
    this.items.forEach(item => {
      if (filter(item, arg))
        descriptions.push(item.description);
    });

    return descriptions;
  }
}

const locations: Map<string, Location> = new Map();

export function createLocation(name: string, description: string, portals: string[]): void {
  locations.set(name, new Location([name], description, portals));
}

export function move(from: string, direction: Direction): string | undefined {
  return locations.get(from)?.portal(direction);
}

export function describe(location: string, filter: DescriptionFilter = filterDescriptionsBySeen,
    arg: any = null): string[] {
  return locations.get(location)?.describe(filter, arg) || [];
}

export function addItemToLocation(item: Item, location: string): void {
  locations.get(location)?.addItem(item);
}

export function removeItemFromLocation(item: string, location: string): Item | undefined {
  return locations.get(location)?.removeItem(item);
}
