import { events } from '../content.json';


interface Event {
  score: number;
  repeatable: boolean;
  message: string;
  active: boolean;
}


const eventList: Map<string, Event> = new Map();


export let score: number;


export function eventIsActive(id: string): boolean {
  const event = eventList.get(id);
  if (!event)
    throw "Invalid event id!";

  return event.active;
}


export interface EventResponse {
  activated: boolean;
  message?: string;
  scoreIncrease?: number;
}


export function activateEvent(id: string): EventResponse {
  const event = eventList.get(id);
  if (!event)
    throw "Invalid event id!";
  
  const didActivate = !event.active || event.repeatable;
  
  const response = { activated: didActivate };
  
  if (didActivate) {
    Object.defineProperty(response, 'message', event.message);
    if (event.score > 0) {
      score += event.score
      Object.defineProperty(response, 'scoreIncrease', event.score);
    }
  }

  return response;
}


export function resetEvents() {
  eventList.clear();
  score = 0;

  interface EventJSON {
    id: string;
    score: number;
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
