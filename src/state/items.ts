import { items } from '../content.json';


/**
 * If a module has the same carry class as an item, that
 * module can carry that item.
 */
export enum CarryClass {
  small,
  large,
  fluid,
  fixed
}


/**
 * Items either exist in a location or are carried by a
 * module. They can be identified by multiple names, and
 * they have a description that is printed automatically
 * when the item has not been seen before. They can be 
 * carried by modules according to their carry class.
 */
interface Item {
  names: string[];
  description: string;
  carry: CarryClass;
  plural: boolean;
}


/**
 * Stores all instances of items, mapped by id.
 */
const itemList: Map<string, Item> = new Map();


/**
 * If an item with the given 'id' is found, returns the
 * item's name. If no item with the given 'id' is found,
 * throws an exception.
 */
export function nameItem(id: string): string {
  const item = itemList.get(id);
  if (!item)
    throw "Invalid item id!";

  return item.names[0];
}


/**
 * If an item with the given 'id' is found, returns the
 * item's description. If no item with the given 'id' is
 * found, throws an exception.
 */
export function describeItem(id: string): string {
  const item = itemList.get(id);
  if (!item)
    throw "Invalid item id!";

  return item.description;
}


/**
 * If an item exists with the given 'id,' returns true.
 * Otherwise returns false.
 */
export function validItemId(id: string): boolean {
  return itemList.has(id);
}


// Returns a single-sentence list of the items provided
// Undefined behavior for empty list
function listSentence(items: Item[]): string {
  let list_sentence = "There ";

  items.forEach((item, index) => {
    const isStart = index === 0;
    const isEnd = index === items.length - 1;

    if (isStart) {
      if (item.plural)
        list_sentence += "are ";
      else
        list_sentence += "is ";
    } else if (isEnd) {
      list_sentence += "and ";
    }

    if (item.plural)
      list_sentence += "some " + item.names[0];
    else
      list_sentence += "a " + item.names[0];

    if (isEnd)
      list_sentence += " here.";
    else
      list_sentence += ", ";
  });

  return list_sentence;
}


/**
 * Given an empty array of 'itemIds,' will return a sentence
 * saying nothing is there. Given a full array, it will
 * provide a single sentence listing all the items present.
 * If any id in the array is invalid, it will throw an
 * exception.
 */
export function listAllItems(itemIds: string[]): string {
  if (itemIds.length === 0)
    return "There is nothing here.";

  const items = itemIds.map(id => {
    const item = itemList.get(id)
    if (!item)
      throw "Invalid item id in list!";
    return item;
  });

  return listSentence(items);
}


/**
 * Given an empty array, it will return an empty array. If
 * given an array with items that have the 'fixed' carry
 * class, it will add all of those item's descriptions to
 * the array it returns. For any other items, it will put
 * their names in a single sentence list at the end of the
 * array it returns. If any item id in the array provided is
 * invalid, it will throw an exception.
 */
export function describeFixedElseList(itemIds: string[]): string[] {
  const descriptions: string[] = [];
  const looseItems: Item[] = [];
  
  itemIds.map(item => itemList.get(item))
  .forEach(item => {
    if (!item)
      throw "Invalid item id in list!";
    
    if (item.carry === CarryClass.fixed)
      descriptions.push(item.description);
    else
      looseItems.push(item);
  });

  if (looseItems.length > 0)
    descriptions.push(listSentence(looseItems))

  return descriptions;
}


/**
 * If an item with the given 'id' is found, and the item's
 * carry class is the same as the 'cc' provided, returns
 * true. If the carry class differs, returns false. If no
 * item could be found with the given 'id,' throws an
 * exception.
 */
export function itemHasCarryClass(id: string, cc: CarryClass): boolean {
  const item = itemList.get(id);
  if (!item)
    throw "Invalid item id!";

  return item.carry === cc;
}


/**
 * Clears and re-adds items to the list according to the
 * content json file.
 */
export function resetItems(): void {
  itemList.clear();
  
  interface ItemJSON {
    id: string;
    names: string[];
    plural: boolean;
    description: string[];
    carry: string;
  };

  items.forEach((item: ItemJSON) =>
    itemList.set(item.id,
      {
        names: item.names,
        plural: item.plural,
        description: item.description.join(),
        carry: CarryClass[item.carry as keyof typeof CarryClass]
      }
    )
  );
}
