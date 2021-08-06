import { recipes } from '../content.json';
import { ModuleOperation } from './modules';
import {
  addContents,
  getContents,
  removeContents
} from './locations';


/**
 * A recipe can have an 'activated' field. If it does, it
 * can only be activated once. A recipe can have a
 * 'requirements' field, which describes which operation,
 * items, and flags must be applicable to activate the
 * recipe. All recipes must have a 'result' field, which
 * describes the effects that a recipe will have upon
 * completion.
 */
interface Recipe {
  activated?: boolean;
  requirements?: {
    operation?: ModuleOperation;
    items?: string[];
    flags?: string[];
  }
  result: {
    score?: number;
    flag?: string;
    event?: string;
    consumeItems?: boolean;
    items?: string[];
    convertModule?: string;
  }
}


/**
 * This value keeps track of the player's score, a measure
 * of how well they are playing the game.
 */
export let score = 0;


/**
 * This stores all recipes. The key is the module which
 * catalyzes the recipe, and each key leads to an array of
 * recipes which could possibly be activated upon an action
 * by the module.
 */
const recipesList: Map<string, Recipe[]> = new Map();


/**
 * This stores all activated flags of the game. Flags are
 * used by recipes to gate activation until certain other
 * recipes have been activated first.
 */
const flagList: string[] = [];


/**
 * This helper method for checkRecipes takes in context in
 * order to determine whether the requirements of a recipe
 * are met. If so returns true, otherwise returns false.
 */
function satisfiesRequirements(
  recipe: Recipe,
  operation: ModuleOperation,
  availableItems: string[]
): boolean 
{
  const satisfiesOperation = operation === recipe.requirements?.operation;
  const satisfiesItems = recipe.requirements?.items?.every(item =>
    availableItems.includes(item)
  ) || true;
  const satisfiesFlags = recipe.requirements?.flags?.every(flag =>
    flagList.includes(flag)
  ) || true;

  return satisfiesOperation && satisfiesItems && satisfiesFlags && !recipe.activated;
}


/**
 * A response type which is sent out by checkRecipes, for
 * whoever called the method to handle. Bundles a possible
 * score update and possible event description together.
 */
export interface RecipeActivation {
  event?: string;
  score?: number;
}


/**
 * A description for a function that must be passed to
 * checkRecipes, in order for checkRecipes to be able to
 * remove items from a bot's inventory.
 */
export interface RemoveInventory {
  (items: string[]): void;
}


/**
 * A description for a function that must be passed to
 * checkRecipes, in order for checkRecipes to be able to
 * transform the module that catalyzed this recipe into
 * another module.
 */
export interface ConvertModule {
  (toModule: string): void;
}


/**
 * This helper method for checkRecipes handles the logic of
 * applying results of a recipe, given the context this
 * recipe was activated in.
 */
function applyResults(
  recipe: Recipe,
  location: string,
  removeInventory: RemoveInventory,
  convertModule: ConvertModule
): RecipeActivation
{
  const result = recipe.result;
  if (result.score)
    score += result.score;
  if (result.flag)
    flagList.push(result.flag);
  if (result.consumeItems) {
    const leftovers = removeContents(location, recipe.requirements?.items ?? []);
    removeInventory(leftovers);
  }
  if (result.items)
    addContents(location, result.items);
  if (result.convertModule)
    convertModule(result.convertModule);

  return {
    event: result.event,
    score: result.score
  }
}


/**
 * Takes in several parameters relating to the context of a
 * bot after performing an action. Checks the recipe list,
 * and if any recipe has their requirements met, will
 * activate those recipes and apply their results.
 */
export function checkRecipes(
  module: string,
  operation: ModuleOperation,
  location: string,
  inventory: string[],
  removeInventory: RemoveInventory,
  convertModule: ConvertModule
): RecipeActivation[]
{
  const response: RecipeActivation[] = [];
  const contents = getContents(location);
  const availableItems = inventory.concat(contents ?? []);
  
  recipesList.get(module)?.forEach((recipe: Recipe) => {
    if (satisfiesRequirements(recipe, operation, availableItems))
      response.push(applyResults(recipe, location, removeInventory, convertModule));
  });
  
  return response;
}


/**
 * Clears the recipe and flag list, sets the score to zero,
 * and then re-adds the recipes to the list, according to
 * the content JSON file.
 */
export function resetRecipes(): void {
  score = 0;
  recipesList.clear();
  flagList.splice(0, flagList.length);

  interface RecipeJSON {
    catalyst: string;
    requirements?: {
      operation?: string;
      items?: string[];
      events?: string[];
    }
    result: {
      event?: string;
      consumeItems?: boolean;
      items?: string[];
      convertModule?: string;
    }
  }

  recipes.forEach((recipe: RecipeJSON) => {
    const newRecipe: Recipe = { result: recipe.result }
    
    if (recipe.requirements) {
      newRecipe.requirements = {
        items: recipe.requirements.items,
        flags: recipe.requirements.flags
      }
      if (recipe.requirements.operation)
        newRecipe.requirements.operation = 
          ModuleOperation[recipe.requirements.operation as keyof typeof ModuleOperation];
    }
    recipesList.get(recipe.catalyst)?.push(newRecipe) 
      || recipesList.set(recipe.catalyst, [ newRecipe ]);
  });
}
