import { flags } from '../content.json';


/**
 * Flags are used to keep track of story events. They will
 * activate according to player actions and can add to a
 * player's score. A flag cannot be activated before all its
 * dependencies have been activated.
 */ 
interface Flag {
  dependencies: string[];
  score: number;
  active: boolean;
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
  const flag = flag_list.get(id);
  if (!flag || flag.active)
    return false;

  let dependenciesClear = true;
  flag.dependencies.every(dependency =>
    dependenciesClear = flagIsActive(dependency)
  );
  
  if (dependenciesClear)
    score += flag.score;

  return flag.active = dependenciesClear;
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
  
  interface FlagJSON {
    id: string,
    comment: string,
    score: number,
    dependencies?: string[]
  }

  flags.forEach((flag: FlagJSON) =>
    flag_list.set(flag.id,
      {
        score: flag.score,
        dependencies: flag.dependencies || [],
        active: false
      }
    )
  );
}
