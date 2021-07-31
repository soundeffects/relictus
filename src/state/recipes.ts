import { recipes } from '../content.json';
import * as ModuleState from './modules';
import * as LocationState from './locations';


interface Recipe {
  activated?: boolean;
  requirements?: {
    operation: ModuleState.ModuleOperation;
    items?: string[];
    flags?: string[];
    parameter?: string;
  }
  result: {
    score?: number;
    flag?: string;
    event?: string;
    consumeItems?: boolean;
    items?: string[];
    convertModule?: string;
    move?: string;
  }
}


export let score = 0;


export const recipesList: Map<string, Recipe[]> = new Map();


const flagList: string[] = [];


function satisfiesRequirements(
  recipe: Recipe,
  operation: ModuleState.ModuleOperation,
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


export interface RecipeActivation {
  event?: string;
  score?: number;
}


export interface RemoveInventory {
  (items: string[]): void;
}


export interface ConvertModule {
  (toModule: string): void;
}


function activateRecipe(
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
    const leftovers = LocationState.removeContents(location, recipe.requirements?.items ?? []);
    removeInventory(leftovers);
  }
  if (result.items)
    LocationState.addContents(location, result.items);
  if (result.convertModule)
    convertModule(result.convertModule);

  return {
    event: result.event,
    score: result.score
  }
}


export function checkRecipes(
  module: string,
  operation: ModuleState.ModuleOperation,
  location: string,
  inventory: string[],
  removeInventory: RemoveInventory,
  convertModule: ConvertModule
): RecipeActivation[]
{
  const response: RecipeActivation[] = [];
  const contents = LocationState.getContents(location);
  const availableItems = inventory.concat(contents ?? []);
  
  recipesList.get(module)?.forEach((recipe: Recipe) => {
    if (satisfiesRequirements(recipe, operation, availableItems))
      response.push(activateRecipe(recipe, location, removeInventory, convertModule));
  });
  
  return response;
}


export function resetRecipes(): void {
  score = 0;
  recipesList.clear();
  flagList.splice(0, flagList.length);

  interface RecipeJSON {
    catalyst: string;
    repeatable: boolean;
    requirements?: {
      operation?: string;
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

  recipes.forEach((recipe: RecipeJSON) => {
    const newRecipe: Recipe = recipe;
    if (!recipe.repeatable)
      newRecipe.activated = false;

    recipesList.get(recipe.catalyst)?.push(newRecipe) 
      || recipesList.set(recipe.catalyst, [ newRecipe ]);
  });
}
