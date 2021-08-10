import { events } from '../content.json';


/**
 * Events are activated by recipes, when certain conditions
 * have been met. Some events are repeatable, others are
 * not. Events will always have some text describing what
 * happens to the player, and can sometimes increase the
 * player's score.
 */
interface Event {
  score?: number;
  repeatable: boolean;
  message: string;
  active: boolean;
}


/**
 * Stores all the events, indexed by id.
 */
const eventList: Map<string, Event> = new Map();


/**
 * Stores the player's score.
 */
export let score: number;


/**
 * If an event with the given 'id' is found, returns whether
 * that event is active or not. If no event with 'id' is
 * found, throws an exception.
 */
export function eventIsActive(id: string): boolean {
  const event = eventList.get(id);
  if (!event)
    throw "Invalid event id!";

  return event.active;
}


/**
 * Bundles whether the event got activated, along with the
 * message and score increase of the event if it did get
 * activated.
 */
export interface EventResponse {
  activated: boolean;
  message?: string;
  scoreIncrease?: number;
}


/**
 * If an event is found with the given 'id,' activates it
 * if it is repeatable or not already active. If score is
 * to be increased, it does so. It then returns an
 * appropriate EventResponse. If no event is found with the
 * given 'id,' throws an exception.
 */
export function activateEvent(id: string): EventResponse {
  const event = eventList.get(id);
  if (!event)
    throw "Invalid event id!";
  
  const didActivate = !event.active || event.repeatable;
  
  const response = { activated: didActivate };
  
  if (didActivate) {
    Object.defineProperty(response, 'message', event.message);
    if (event.score) {
      score += event.score
      Object.defineProperty(response, 'scoreIncrease', event.score);
    }
  }

  return response;
}


/**
 * Clears all events out of the list, and replaces them with
 * new events read from the content JSON file. Also resets
 * the player's score.
 */
export function resetEvents() {
  eventList.clear();
  score = 0;

  interface EventJSON {
    id: string;
    score?: number;
    repeatable: boolean;
    message: string[];
  }

  events.forEach((event: EventJSON) =>
    eventList.set(event.id, {
      score: event.score,
      repeatable: event.repeatable,
      message: event.message.join(),
      active: false
    })
  );
}
