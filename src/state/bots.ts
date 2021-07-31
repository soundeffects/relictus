interface Bot {
  
};


/**
 * Exactly three bots can be active at any one time. They
 * are accesible through this Tuple.
 */
export const bots: [Bot | null, Bot | null, Bot | null] = [null, null, null];


/**
 * This value determines which bot is currently being given
 * commands.
 */
export let activeBot: number = 0;


/**
 * Increments the active bot counter if there is more than
 * one bot, so that the currently active bot is swapped.
 */
export function nextActiveBot(): void {
  let numBots;
  if (bots[2])
    numBots = 3;
  else if (bots[1])
    numBots = 2;
  else
    return;

  activeBot++;
  if (activeBot >= numBots)
    activeBot = 0;
}


export interface BotResponse {
  messages: string[];
};


export function commandBot(tokens: string[]): BotResponse {
  return { messages: [] };
}


/**
 * Clears the bots Tuple, and sets the first item of the
 * Tuple to be the bot 'Zero.'
 */
export function resetBots() {
  bots[0] = new Bot('Zero', 'cargo');
  bots[1] = bots[2] = null;
  activeBot= 0;
}
