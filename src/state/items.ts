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
 * module. They can be identified by multiple names, have a
 * description, and possibly a use. They can be carried 
 * according to their carry class rules.
 */
interface Item {
  names: string[];
  description: string;
  carry: CarryClass;
}


/**
 * Stores all instances of items, mapped by id.
 */
const item_list: Map<string, Item> = new Map();


/**
 * If the id provided maps to an item, returns true.
 * Otherwise, returns false.
 */
export function validItemId(id: string): boolean {
  return item_list.has(id);
}


/**
 * If an item with the given id is found, and the item's
 * list of names includes the given name, return true.
 * Otherwise, return false.
 */
export function itemIncludesName(id: string, name: string): boolean {
  return item_list.get(id)?.names.includes(name) || false;
}


/**
 * If an item with the given id is found, returns the item's
 * description. Otherwise, returns an empty string.
 */
export function describeItem(id: string): string {
  return item_list.get(id)?.description || "";
}


/**
 * If an item with the given id is found, and the item's
 * carry class is the same as the one provided, then return
 * true. Otherwise, return false.
 */
export function carryItem(id: string, cc: CarryClass): boolean {
  return item_list.get(id)?.carry === cc;
}


/**
 * Clears and re-adds items to the list according to the
 * content json file.
 */
export function resetItems(): void {
  item_list.clear();
  
  interface ItemJSON {
    id: string,
    names: string[],
    description: string,
    carry: string
  };

  items.forEach((item: ItemJSON) =>
    item_list.set(item.id,
      {
        names: item.names,
        description: item.description,
        carry: CarryClass[item.carry as keyof typeof CarryClass]
      }
    )
  );
}
