import { readFileSync } from 'fs';


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
    if (this._active)
      return false;

    // Checks if all dependencies have been activated
    let dependenciesClear = true;
    this.dependencies.every(dependency => {
      if (!flagIsActive(dependency))
        return dependenciesClear = false;
      return true;
    });
    if (!dependenciesClear) return false;

    score += this.score;
    return this._active = true;
  }
}


/**
 * flags
 * Maps given names of flags to the flag class. Stores all instances of flags.
 */
const flags: Map<string, Flag> = new Map();


/**
 * score
 * Stores the score of the player.
 */
export let score = 0;


/**
 * activateFlag
 * Returns undefined if the flag is not found.
 * If the flag is not active and all it's dependencies are met,
 * it will activate the flag and return true. Otherwise, it
 * returns false.
 */
export function activateFlag(name: string): boolean | undefined {
  return flags.get(name)?.activate();
}


/**
 * flagIsActive
 * Returns undefined if the flag is not found.
 * Returns false if the flag is found but not active.
 * Returns true if the flag is found and is active.
 */
export function flagIsActive(name: string): boolean | undefined {
  return flags.get(name)?.active;
}


/**
 * resetFlags
 * Clears the flags map and score, and reads in a content text file
 * to create the flags again.
 *
 * The text file must exist at './src/content/flags.txt'. It must
 * be a collection of flags on each line, where the formatting is
 * as follows:
 *
 * FLAG flagName score dependency1 depedency2 ...
 *
 * Where FLAG is a keyword, flagName is a string to name the flag,
 * score is a number for the flag's score, and a list (of any length)
 * of names of other flags follows as the dependency list.
 */
export function resetFlags(): void {
  score = 0;
  flags.clear();

  let lines: string[] = readFileSync('./src/content/flags.txt', 'utf-8').split('\n'); 

  lines.forEach(line => {
    const tokens: string[] = line.split(' ');
    
    // First token must be the keyword
    if (tokens.shift() === 'FLAG') {
      
      // Second token is the name
      const name: string = String(tokens.shift());
      
      // Third token (if it exists) is the score
      let score: number = 0;
      if (tokens.length > 0)
        score = Number(tokens.shift());
      
      // The rest are dependencies
      const dependencies: string[] = tokens;

      flags.set(name, new Flag(score, dependencies));
    }
  })
}
