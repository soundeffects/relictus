/**
 * Flag
 * Flags are used to keep track of linear events in the story.
 *
 * The Flag class combines fields relevant to a single flag, including 
 * score, whether its active, and its dependencies. Only the active field
 * is mutable.
 *
 * For example, a flag "BuiltRocket" is the way the game would know that
 * the player has already built a rocket. It might have a dependency of
 * "FoundRocket", so that BuiltRocket cannot be activated before FoundRocket.
 * It also might have a score, which updates the player's total score when the
 * flag is activated.
 */ 
class Flag {
  private dependencies: string[];
  private score: number;
  private _active: boolean;

  public constructor(score: number, dependencies: string[]) {
    this.dependencies = dependencies;
    this.score = score;
    this._active = false;
  }
 
  public get active(): boolean { return this._active; }
  
  public activate(): boolean { 
    // Checks if all dependencies have been activated
    let dependenciesClear = true;
    this.dependencies.every(dependency => {
      if (!flagIsActive(dependency))
        return dependenciesClear = false;
      return true;
    });
    
    if (!dependenciesClear) return false;

    // Updates score and activates
    score += this.score;
    return this._active = true;
  }
  
  // Should only be used if resetting the flags
  public deactivate(): void {
    this._active = false;
  }
}


/**
 * flags
 * Maps given names of flags to the flag class. Stores all instances of flags.
 */
const flags = new Map();


/**
 * score
 * Stores the score of the player.
 */
export let score = 0;


/**
 * activateFlag
 * Returns true if dependencies are met and flag is inactive,
 * false otherwise. If it returns true, it activates the flag.
 */
export function activateFlag(name: string): boolean {
  return flags.get(name)?.activate();
}


/**
 * flagIsActive
 * Returns false if flag is not found or is not active, true otherwise.
 */
export function flagIsActive(name: string): boolean {
  return flags.get(name)?.active;
}


/**
 * createFlag
 * Adds a new flag to the map of flags, with the name, score, and dependencies
 * given. The dependencies array is a list of the names of the flags this
 * flag will depend on.
 *
 * If a flag name is provided that already exists, will simply update that flag.
 */
export function createFlag(name: string, dependencies: string[] = [], score:number = 0): void {
  flags.set(name, new Flag(score, dependencies));
}


/**
 * resetFlags
 * Resets all flags so that none are activated, and sets the score to 0.
 */
export function resetFlags(): void {
  flags.forEach(flag => { flag.deactivate(); });
  score = 0;
}

/**
 * testSetup
 * Removes all flags from the flags map. Should only be used for testing.
 */
export function testSetup(): void {
  flags.clear();
  score = 0;
}
