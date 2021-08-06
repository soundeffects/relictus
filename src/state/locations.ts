import { locations } from '../content.json';
import {
  validItemId,
  listAllItems,
  describeFixedElseList,
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
 * throws an exception.
 */
export function longDescribeLocation(id: string): LocationDescription {
  const location = locationList.get(id);
  if (!location)
    throw "Invalid location id!";

  return {
    name: location.name,
    descriptions: [
      location.description,
      ...describeFixedElseList(location.contents)
    ]
  };
}


/**
 * If a location is found with the given 'id,' and the
 * location has not been seen before, return a full
 * description of the location (see describeLocation). If
 * the location has been seen before, then return a
 * shortened description, consisting only of the name and
 * a single-sentence list of the items in the location.
 * If no location was found with the given 'id,' throws an
 * exception.
 */
export function shortDescribeLocation(id: string): LocationDescription {
  const location = locationList.get(id);
  if (!location)
    throw "Invalid location id!";

  return {
    name: location.name,
    descriptions: [ listAllItems(location.contents) ]
  };
}

/**
 * If a location is found with the given 'id,' then for each
 * member of 'item_ids,' the item will be added to the
 * location's contents. If no location is found with the
 * given 'id,' throws an exception. If no item is found for
 * any member of 'item_ids,' throws an exception.
 */
export function addContents(id: string, item_ids: string[]): void {
  const location = locationList.get(id);
  if (!location)
    throw "Invalid location id!";

  item_ids.forEach(item => {
    if (validItemId(item))
      location.contents.push(item)
    else
      throw "Invalid item id!";
  });
}


/**
 * If a location is found with the given 'id,' then returns
 * the contents of the location: a list of items. If no
 * location is found with the given 'id,' throws an
 * exception.
 */
export function getContents(id: string): string[] {
  const location = locationList.get(id);
  if (!location)
    throw "Invalid location id!";

  return location.contents;
}


/**
 * If a location is found with the given 'id,' then for each
 * member of 'item_ids,' the item will be removed from
 * the location's contents, if possible. Any items that are
 * not able to be removed will be returned in an array. If
 * no location is found with the given 'id,' throws an
 * exception. If no item is found for any member of
 * 'item_ids,' throws an exception.
 */
export function removeContents(id: string, item_ids: string[]): string[] {
  const location = locationList.get(id);
  if (!location)
    throw "Invalid location id!";

  const leftovers: string[] = [];
  const { contents } = location;

  item_ids.forEach(item => {
    if (!validItemId(item))
      throw "Invalid item id!";
    else if (contents.includes(item))
      contents.splice(contents.indexOf(item, 1));
    else
      leftovers.push(item);
  });

  return leftovers;
}


/**
 * If a location is found with the given 'id,' and a link is
 * found in the given direction, returns the id of the
 * location on the other end of the link. If no link is
 * found in the given direction, returns undefined. If no
 * location is found with the given 'id,' throws an
 * exception.
 */
export function getLocationLink(id: string, direction: string): string | undefined {
  const location = locationList.get(id);
  if (!location)
    throw "Invalid location id!";

  return location.links.get(direction);
}


/**
 * Clears the list of locations, and re-adds them according
 * to the content json file. Expects items to be in a stable
 * state (resetItems must be called before this). If any
 * item to be added as content is found invalid according to
 * the content json file, it will throw an exception.
 */
export function resetLocations(): void {
  locationList.clear();
  
  interface LocationJSON {
    id: string,
    name: string,
    description: string[],
    links: object,
    contents: string[]
  };

  function objectToMap(obj: any): Map<string, string> {
    const map: Map<string, string> = new Map();
    Object.keys(obj).forEach(key => map.set(key, obj[key]));
    return map;
  }

  function checkContents(contents: string[]): string[] {
    contents.forEach(item => {
      if (!validItemId(item))
        throw "Invalid item id in content JSON!";
    });
    return contents;
  }

  locations.forEach((location: LocationJSON) =>
    locationList.set(location.id,
      {
        name: location.name,
        description: location.description.join(),
        links: objectToMap(location.links),
        contents: checkContents(location.contents)
      }
    )
  );
}
