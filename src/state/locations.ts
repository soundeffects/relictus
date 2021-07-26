import { locations } from '../content.json';
import * as ItemState from './items';


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
 * If a location is found with the given 'id,' returns true.
 * Otherwise, returns false.
 */
export function validLocationId(id: string): boolean {
  return locationList.has(id);
}


/**
 * An object that bundles the name alongside the description
 * of a location.
 */
export interface LocationDescription {
  name: string;
  descriptions: string[];
}


// Creates a single-sentence list of items from an array
function listItems(items: string[]): string {
  let item_sentence = "There ";
  
  items.forEach((item, index) => {
    const plural = ItemState.itemIsPlural(item);
    const isStart = index === 0;
    const isEnd = index === items.length - 1;

    if (isStart) {
      if (plural)
        item_sentence += "are ";
      else
        item_sentence += "is ";
    } else if (isEnd) {
      item_sentence += "and "
    }

    if (plural)
      item_sentence += "some " + ItemState.nameItem(item);
    else
      item_sentence += "a " + ItemState.nameItem(item);

    if (isEnd)
      item_sentence += " here.";
    else
      item_sentence += ", ";
    
  });

  return item_sentence;
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

  const descs: string[] = [location.description];
  const looseItems: string[] = [];
  location.contents.forEach(item => {
    // if item is not a fixture, put into abbreviated list
    if (!ItemState.itemHasCarryClass(item, ItemState.CarryClass.fixed))
      looseItems.push(item);

    // for fixtures, describe fully
    else {
      const desc = ItemState.describeItem(item);
      if (desc)
        descs.push(desc);
    }
  });
  descs.push(listItems(looseItems));

  return { name: location.name, descriptions: descs };
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
      descriptions: [ listItems(location.contents) ]
    };
  }

  return describeLocation(id);
}

/**
 * If a location is found with the given 'id,' and the
 * 'item_id' provided is valid, adds the item to the 
 * location's contents.
 */
export function addToLocation(id: string, item_id: string): void {
  if (ItemState.validItemId(item_id))
    locationList.get(id)?.contents.push(item_id);
}


/**
 * If a location is found with the given 'id,' and the
 * 'item_id' is found within the location's contents,
 * removes the item from the contents.
 */
export function removeFromLocation(id: string, item_id: string): void {
  const loc = locationList.get(id);
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
