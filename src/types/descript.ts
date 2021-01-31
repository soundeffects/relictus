/**
 * Descript
 * An abstract class to be inherited by any object that
 * has a description, including Locations, Items, and more.
 *
 * This class provides basic functionality for filtering
 * out descriptions that have already been seen, and for
 * matching an input to the name of a Descript.
 */
export default abstract class Descript {
  private names: string[];
  private _description: string;
  private _seen: boolean;

  public constructor(description: string) {
    this._description = description;
    this._seen = false;
  }
  
  public get description(): string {
    this._seen = true;
    return this._description;
  }

  public get seen(): boolean {
    return this._seen;
  }

  public matchName(given: string): boolean {
    return names.includes(given.toLowerCase());
  }
}
