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
const flagList: Map<string, Flag> = new Map();


/**
 * Score of the player.
 */
export let score = 0;


/**
 * Returns true if a flag is found with the given 'id,'
 * otherwise returns false.
 */
export function validFlagId(id: string): boolean {
  return flagList.has(id);
}


/**
 * Finds a flag with the given 'id,' and activates it, as
 * long as it is not already active and all of its
 * dependencies are active. If the flag meets these
 * requirements, returns true, otherwise returns false.
 * If no flag was found with the given 'id,' returns
 * undefined.
 */
export function activateFlag(id: string): boolean | undefined {
  const flag = flagList.get(id);
  if (!flag)
    return undefined;
  if (flag.active)
    return false;

  let dependenciesClear = true;
  flag.dependencies.every(dependency => {
    if (!flagIsActive(dependency))
      return dependenciesClear = false;
    return true;
  });
  
  if (dependenciesClear)
    score += flag.score;

  return flag.active = dependenciesClear;
}


/**
 * Returns true if 'id' leads to a flag that is active,
 * returns false if the flag is not active. Returns
 * undefined if no flag is found with the given 'id.'
 */
export function flagIsActive(id: string): boolean | undefined {
  return flagList.get(id)?.active;
}


/**
 * Deactivates and reloads flags according to content json
 * file, sets score to zero.
 */
export function resetFlags(): void {
  score = 0;
  flagList.clear();
  
  interface FlagJSON {
    id: string,
    comment: string,
    score: number,
    dependencies?: string[]
  }

  flags.forEach((flag: FlagJSON) =>
    flagList.set(flag.id,
      {
        score: flag.score,
        dependencies: flag.dependencies || [],
        active: false
      }
    )
  );
}
