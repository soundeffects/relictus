import { locations } from '../content.json';
import {
  describeItem,
  listAllItems,
  describeFixedElseList,
  itemHasCarryClass,
  CarryClass
} from './items';


/**
 * Locations are places which contain items and contents and
 * can be explored by bots. Each location will have a name,
 * description, list of item ids as contents, and a series
 * of links to other locations in specific directions. The
 * description of a location is automatically printed if it
 * has not yet been seen.
 */
interface Location {
  name: string;
  description: string;
  links: Map<string, string>;
  contents: string[];
  seen: boolean;
}


/**
 * Stores all instances of locations, mapped by id.
 */
const locationList: Map<string, Location> = new Map();


/**
 * An object that bundles the name alongside the description
 * of a location.
 */
export interface LocationDescription {
  name: string;
  descriptions: string[];
}


/**
 * If a location is found with the given 'id,' returns a
 * full description of the location, including the
 * name and description elements of the location, as well as
 * the descriptions of fixtures (items with carry class
 * "fixed") in the location and a list of other, non-fixture
 * items. If no location was found with the given 'id,'
 * returns undefined.
 */
export function describeLocation(id: string): LocationDescription | undefined {
  const location = locationList.get(id);
  if (!location)
    return undefined;

  return {
    name: location.name,
    descriptions: describeFixedElseList(location.contents)
  };
}


/**
 * If a location is found with the given 'id,' and the
 * location has not been seen before, return a full
 * description of the location (see describeLocation). If
 * the location has been seen before, then return a
 * shortened description, consisting only of the name and
 * a single-sentence list of the items in the location.
 * If no location was found with the given 'id,' return
 * undefined.
 */
export function autoDescribeLocation(id: string): LocationDescription | undefined {
  const location = locationList.get(id);
  if (!location)
    return undefined;

  if (location.seen) {
    return {
      name: location.name,
      descriptions: [ listAllItems(location.contents) ]
    };
  }

  return describeLocation(id);
}

/**
 * If a location is found with the given 'id,' then for each
 * member of 'item_ids,' the item will be added to the
 * location's contents.
 */
export function addContents(id: string, item_ids: string[]): void {
  const contents = locationList.get(id)?.contents;
  if (contents)
    item_ids.forEach(item => contents.push(item));
}


/**
 * If a location is found with the given 'id,' then returns
 * the contents of the location: a list of items. Otherwise,
 * returns undefined.
 */
export function getContents(id: string): string[] | undefined {
  return locationList.get(id)?.contents;
}


/**
 * If a location is found with the given 'id,' then for each
 * member of 'item_ids,' the item will be removed from
 * the location's contents, if possible. Any items that are
 * not able to be removed will be returned in an array.
 */
export function removeContents(id: string, item_ids: string[]): string[] {
  const contents = locationList.get(id)?.contents;
  const leftovers: string[] = [];

  if (contents) {
    item_ids.forEach(item => {
      if (contents.includes(item))
        contents.splice(contents.indexOf(item, 1));
      else
        leftovers.push(item);
    });
  }

  return leftovers;
}


/**
 * If a location is found with the given id, and a link is
 * found in the given direction, returns the id of the
 * location on the other end of the link. Otherwise, returns
 * an empty string.
 */
export function getLocationLink(id: string, direction: string): string {
  return locationList.get(id)?.links.get(direction) || "";
}


/**
 * Clears the list of locations, and re-adds them according
 * to the content json file.
 */
export function resetLocations(): void {
  locationList.clear();
  
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
    locationList.set(location.id,
      {
        name: location.name,
        description: location.description,
        links: objectToMap(location.links),
        contents: location.contents,
        seen: false
      }
    )
  );
}
