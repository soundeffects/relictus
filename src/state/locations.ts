import { locations } from '../content.json';
import Descript, { filterDescriptionsBySeen } from './Descript';

class Location extends Descript {
  //private content: Item[];
  private links: Map<string, string>;
  
  public constructor(
    name: string,
    description: string,
    links: Map<string, string>
  ) {
    super([name], description);
    this.links = links;
  }
}

const location_list: Map<string, Location> = new Map();

export function nameLocation(id: string): string {
  return location_list.get(id)?.name || "";
}

export function describeLocation(id: string): string {
  const loc = location_list.get(id);
  return loc?.describe(filterDescriptionsBySeen, null) || "";
}

export function describeContents(id: string): string[] {
  const descs: string[] = [];
  const contents = location_list.get(id)?.contents;
  contents.forEach(item => {
    descs.push(item.describe(filterDescriptionsBySeen, null));
  });
  return descs;
}

export function addToLocation(id: string, item_id: string) {
  
}

export function removeFromLocation(id: string, item_id: string) {
  
}

export function getLocationLink(id: string, direction: string) {
  
}

export function resetLocations(): void {
  location_list.clear();
  
  function objectToMap(obj: any): Map<string, string> {
    const map: Map<string, string> = new Map();
    Object.keys(obj).forEach(key => map.set(key, obj[key]));
    return map;
  }

  locations.forEach((location: {
    id: string,
    name: string,
    description: string,
    links: object,
    content: string[]
  }) =>
    location_list.set(
      location.id,
      new Location(
        location.name,
        location.description,
        objectToMap(location.links)
      )
    )
  );
}
