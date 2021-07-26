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
  seen: boolean;
  plural: boolean;
}


/**
 * Stores all instances of items, mapped by id.
 */
const itemList: Map<string, Item> = new Map();


/**
 * If the 'id' provided maps to an item, returns true.
 * Otherwise, returns false.
 */
export function validItemId(id: string): boolean {
  return itemList.has(id);
}


/**
 * If an item with the given 'id' is found, and the item's
 * list of names includes the given 'name,' return true. If
 * the item did not have 'name,' return false, and if no
 * item was found with that 'id,' return undefined.
 */
export function itemHasName(id: string, name: string): boolean | undefined {
  return itemList.get(id)?.names.includes(name);
}


/**
 * If an item with the given 'id' is found, returns the
 * item's name. Otherwise, returns undefined.
 */
export function nameItem(id: string): string | undefined {
  return itemList.get(id)?.names[0];
}


/**
 * If an item with the given 'id' is found, returns the
 * item's description. Otherwise, returns undefined.
 */
export function describeItem(id: string): string | undefined {
  return itemList.get(id)?.description;
}


/**
 * If an item with the given 'id' is found, returns whether
 * it should be referred to with plurality (upon which it
 * returns true) or not (returns false). If no item with
 * the given 'id' was found, returns undefined.
 */
 export function itemIsPlural(id: string): boolean | undefined {
  return itemList.get(id)?.plural;
 }


/**
 * If an item with the given 'id' is found, and the item's
 * carry class is the same as the 'cc' provided, returns
 * true. If the carry class differs, returns false. If no
 * item could be found with the given 'id,' returns
 * undefined.
 */
export function itemHasCarryClass(id: string, cc: CarryClass): boolean | undefined {
  const item = itemList.get(id);
  if (!item)
    return undefined;
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
    description: string;
    carry: string;
  };

  items.forEach((item: ItemJSON) =>
    itemList.set(item.id,
      {
        names: item.names,
        plural: item.plural,
        description: item.description,
        carry: CarryClass[item.carry as keyof typeof CarryClass],
        seen: false
      }
    )
  );
}
