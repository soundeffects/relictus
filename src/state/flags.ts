import { flags } from '../content.json';


/**
 * Flags are used to keep track of story events. They will
 * activate according to player actions and can add to a
 * player's score. A flag cannot be activated before all its
 * dependencies have been activated.
 */ 
class Flag {
  private dependencies: string[];
  private score: number;
  private _active: boolean;
  
  public constructor(score: number, dependencies: string[]) {
    this.score = score;
    this.dependencies = dependencies;
    this._active = false;
  }

  public get active(): boolean { return this._active; }
  
  public activate(): boolean {
    if (this._active)
      return false;

    let dependenciesClear = true;
    this.dependencies.every(dependency =>
      dependenciesClear = flagIsActive(dependency)
    );
    
    if (dependenciesClear)
      score += this.score;

    return this._active = dependenciesClear;
  }
}


/**
 * Stores all instances of flags, mapped to by id.
 */
const flag_list: Map<string, Flag> = new Map();


/**
 * Score of the player.
 */
export let score = 0;


/**
 * If 'id' leads to a flag that is not activated and its
 * dependencies are activated; activates the flag and
 * returns true. Otherwise, returns false.
 */
export function activateFlag(id: string): boolean {
  return flag_list.get(id)?.activate() || false;
}


/**
 * Returns true if 'id' leads to a flag that is active.
 * Otherwise, returns false.
 */
export function flagIsActive(id: string): boolean {
  return flag_list.get(id)?.active || false;
}


/**
 * Deactivates and reloads flags according to content json
 * file, sets score to zero.
 */
export function resetFlags(): void {
  score = 0;
  flag_list.clear();
  
  flags.forEach((flag: {
      id: string,
      comment: string,
      score: number,
      dependencies?: string[]
    }) =>
    flag_list.set(
      flag.id,
      new Flag(flag.score, flag.dependencies || [])
    )
  );
}
