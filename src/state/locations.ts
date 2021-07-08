import { locations } from '../content.json';
import { validItemId, describeItem } from './items';


/**
 * Locations are places which contain items and contents and
 * can be explored by bots. Each location will have a name,
 * description, list of item ids as contents, and a series
 * of links to other locations in specific directions.
 */
interface Location {
  name: string;
  description: string;
  links: Map<string, string>;
  contents: string[];
}


/**
 * Stores all instances of locations, mapped by id.
 */
const location_list: Map<string, Location> = new Map();


/**
 * If a location is found with the given id, returns its
 * name. Otherwise, returns an empty string.
 */
export function nameLocation(id: string): string {
  return location_list.get(id)?.name || "";
}


/**
 * If a location is found with the given id, returns its
 * description. Otherwise, returns an empty string.
 */
export function describeLocation(id: string): string {
  return location_list.get(id)?.description || "";
}


/**
 * If a location is found with the given id, and the
 * the location has items within it, returns the
 * descriptions of every item in an array. Otherwise,
 * returns an empty array.
 */
export function describeContents(id: string): string[] {
  const descs: string[] = [];
  const contents = location_list.get(id)?.contents;

  contents?.forEach(item => descs.push(describeItem(item)));

  return descs;
}


/**
 * If a location is found with the given id, and the item_id
 * provided is valid, adds the item to the location's
 * contents.
 */
export function addToLocation(id: string, item_id: string): void {
  if (validItemId(item_id))
    location_list.get(id)?.contents.push(item_id);
}


/**
 * If a location is found with the given id, and the item_id
 * is found within the location's contents, removes the
 * item from the contents.
 */
export function removeFromLocation(id: string, item_id: string): void {
  const loc = location_list.get(id);
  if (loc)
    loc.contents = loc.contents.filter(item => item !== item_id)
}


/**
 * If a location is found with the given id, and a link is
 * found in the given direction, returns the id of the
 * location on the other end of the link. Otherwise, returns
 * an empty string.
 */
export function getLocationLink(id: string, direction: string): string {
  return location_list.get(id)?.links.get(direction) || "";
}


/**
 * Clears the list of locations, and re-adds them according
 * to the content json file.
 */
export function resetLocations(): void {
  location_list.clear();
  
  interface LocationJSON {
    id: string,
    name: string,
    description: string,
    links: object,
    contents: string[]
  };

  function objectToMap(obj: any): Map<string, string> {
    const map: Map<string, string> = new Map();
    Object.keys(obj).forEach(key => map.set(key, obj[key]));
    return map;
  }

  locations.forEach((location: LocationJSON) =>
    location_list.set(location.id,
      {
        name: location.name,
        description: location.description,
        links: objectToMap(location.links),
        contents: location.contents
      }
    )
  );
}
