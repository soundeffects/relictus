import Descript from './Descript';


/**
 * Use
 * Modules and items can have uses which change the environment.
 * This interface provides a delegate for these functions.
 */
export interface Use {
  (on: string | null): void;
}


/**
 * Usable
 * Modules and Items which implement this type
 */
export default abstract class Usable extends Descript {
  private _use: Use;
  
  public static NoUse: Use = (on: string | null) => {};

  public constructor(names: string[], description: string, use: Use = Usable.NoUse) {
    super(names, description);
    this._use = use;
  }

  public get use() {
    return this._use;
  }
}
