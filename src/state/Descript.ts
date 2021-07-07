/**
 * DescriptionFilter
 * A delegate for selecting which descriptions should be
 * shown. Arg can be any item by which to select off of.
 */
export interface DescriptionFilter {
  (descript: Descript, arg: any): boolean;
}


/**
 * filterDescriptionsByName
 * A DescriptionFilter that will select only those descripts
 * that match a specific name.
 */
export const filterDescriptionsByName: DescriptionFilter = (descript: Descript, arg: string) => {
  return descript.matchName(arg);
};


/**
 * filterDescriptionsBySeen
 * A DescriptionFilter that will select only those descripts
 * that have not been seen yet.
 */
export const filterDescriptionsBySeen: DescriptionFilter = (descript: Descript, arg: any) => {
  return !descript.seen;
};


/**
 * filterDescriptionsAll
 * An indiscriminate DescriptionFilter, allows all descripts.
 */
export const filterDescriptionsAll: DescriptionFilter = (descript: Descript, arg: any) => {
  return true;
}


/**
 * Descript
 * An abstract class to be inherited by any object that
 * has a description, including Locations and Items.
 *
 * This class provides basic functionality for filtering
 * out descriptions that have already been seen, and for
 * matching an input to the name of a Descript.
 */
export default abstract class Descript {
  private names: string[];
  private description: string;
  private _seen: boolean;

  public constructor(names: string[], description: string) {
    this.names = names;
    this.description = description;
    this._seen = false;
  }
  
  public describe(filter: DescriptionFilter, arg: any): string | null {
    if (filter(this, arg))
      return this.description;
    return null;
  }

  public get seen(): boolean {
    return this._seen;
  }

  public matchName(given: string): boolean {
    return this.names.includes(given.toLowerCase());
  }

  public get name(): string {
    return this.names[0];
  }
}
