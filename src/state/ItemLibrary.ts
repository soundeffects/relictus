import { readFileSync } from 'fs';
import { DescriptionFilter } from './Descript';
import Usable, { Use } from './Usable';

/**
 * CarryingClass
 * Used to determine what kind of modules are required on a bot in order
 * to move/carry the item, or to disallow carrying in general.
 */
export enum CarryingClass {
  small,
  medium,
  large,
  fluid,
  fixed
}


/**
 * Item
 * A dynamic object that can be carried by bots or placed in Locations.
 * Extends Usable, meaning items usually have uses, depending on the
 * environment, and they have descriptions.
 * 
 * An item also has a carrying class, which determines what bot modules
 * are allowed to carry or move it.
 */
export default class Item extends Usable {
  private _carryingClass: CarryingClass;

  public constructor(names: string[], description: string, carryingClass: CarryingClass,
      use: Use = Usable.NoUse) { 
    super(names, description, use);
    this._carryingClass = carryingClass;
  }

  public canCarry(carryingClasses: CarryingClass[]): boolean {
    return carryingClasses.includes(this._carryingClass);
  }
}


/**
 * itemLibrary
 * A map of all possible items, from primary name to Item object.
 */
const itemLibrary: Map<string, Item> = new Map(); 


/**
 * lookupItem 
 * Searches the given names in the itemLibrary in order to return
 * the Item object for a name. Returns undefined if the item was
 * not found.
 */
export function lookupItem(name: string): Item | undefined {
  let lookup: Item | undefined = itemLibrary.get(name);

  if(!lookup) {
    itemLibrary.forEach(item => {
      if (item.matchName(name))
        lookup = item;
    });
  }

  return lookup;
}


/**
 * resetItemLibrary
 * Clears the current itemLibrary, and reads from the items content
 * text file in order to populate the item library with items, their
 * names, descriptions, uses, and carrying classes.
 *
 * The format of the item content text file must be as follows:
 * 
 * The first line must start with the ITEM keyword, followed by
 * the names of the item. The first name will be the primary name.
 * 
 * The following lines may contain the DESC, CARRY, or USE keywords
 * in any order.
 * 
 * With the DESC keyword (which must be isolated on one
 * line), all following lines will be part of the description of the
 * item, until the next DESC keyword is read on a line.
 *
 * With the CARRY keyword, the next token on the line will be read as
 * the carry class of the item.
 *
 * With the USE keyword, the next token on the line will be read as the
 * Use function of the item.
 */
export function resetItemLibrary(): void {
  itemLibrary.clear();

  const lines: string[] = readFileSync('./src/content/items.txt', 'utf-8').split('\n');
  
  // initialize storage variables for args
  let args: ReadingArgs = {
    names: [],
    description: '',
    use: Usable.NoUse,
    carryingClass: CarryingClass.small,
    descMode: false,
    firstItem: true
  }; 

  lines.forEach(line => {
    readLine(line, args);
  });
}


/**
 * ReadingArgs
 * A struct used for passing arguments for reading items from
 * text files between methods.
 */
interface ReadingArgs {
  names: string[],
  description: string,
  use: Use,
  carryingClass: CarryingClass,
  descMode: boolean,
  firstItem: boolean
}


/**
 * readLine
 * A helper method for resetItemLibrary, which takes a line
 * from the item content text file, and reads either by token
 * for relevant fields to the item and stores them in ReadingArgs,
 * or reads by line into the description of the item. For more
 * detailed formatting guides, see the documentation for
 * resetItemLibrary.
 */
function readLine(line: string, args: ReadingArgs) {
  // in descMode, don't look for anything but the escape token 
  if (args.descMode) {
    if (line.substr(0, 4) === 'DESC') {
      args.descMode = false;
      return;
    }
    args.description += line;

  // out of descMode, read by tokens
  } else {
    const tokens: string[] = line.split(' ');
    
    switch(tokens.shift()) {
      case 'ITEM':
        if (!args.firstItem)
          createItem(args);

        // All the tokens after the ITEM keyword are names
        args.names = tokens;
        break;
      case 'DESC':
        args.descMode = true;
        break;
      case 'CARRY':
        args.carryingClass = CarryingClass[tokens[0] as keyof typeof CarryingClass];
    }
  }
}


/**
 * createItem
 * A helper method for readLine and resetItemLibrary. Given a
 * ReadingArgs struct, it will create an item and store it
 * in the itemLibrary.
 */
function createItem(args: ReadingArgs) {
  const item: Item = new Item(
    args.names,
    args.description,
    args.use,
    args.carryingClass
  );
  itemLibrary.set(args.names[0], item);
}
