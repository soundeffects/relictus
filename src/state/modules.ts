import { modules } from '../content.json';


/**
 * Modules have a name, a paragraph of help on how to use
 * the module, and a list of commands and aliases (and what
 * ModuleOperation these commands are linked to). Modules
 * can also have inventory, but this only relevant when 
 * modules are attached to bots, so this information is
 * handled by the Bot state.
 */
interface Module {
  name: string;
  primary: string;
  primaryAliases: string[];
  primaryHelp: string;
  secondary?: string;
  secondaryAliases?: string[];
  secondaryHelp?: string;
  tertiary?: string;
  tertiaryAliases?: string[];
  tertiaryHelp?: string;
}


/**
 * Stores all instances of modules, mapped to by id.
 */
const moduleList: Map<string, Module> = new Map();


/**
 * If a module with the given 'id' is found, returns the
 * name of that module. IF no module with the given 'id' is
 * found, throws an exception.
 */
export function nameModule(id: string): string | undefined {
  const module = moduleList.get(id);
  if (!module)
    throw "Invalid module id!";

  return module.name;
}


/**
 * Bundles together a module executing one of it's commands,
 * and any parameters passed along.
 */
export interface ModuleOperation {
  module: string;
  command: string;
  parameters: string[];
}


/**
 * When provided with the 'ids' of modules installed on a
 * bot, and the command (or the string 'tokens' that make up
 * the command), this method returns what ModuleOperation
 * should be performed by the bot. If no other operation
 * applies, the 'fail' operation will be returned.
 */
export function findModuleOperations(ids: string[], tokens: string[]): ModuleOperation[] {
  const ops: ModuleOperation[] = [];

  if (tokens.length === 0)
    throw "The 'tokens' array provided must have a length of 1 or greater!";

  const modules = ids.map(id => {
    const module = moduleList.get(id);
    if (!module)
      throw "Invalid module id!";
    
    return module;
  });


  modules.forEach(module => {
    const command = tokens.shift() ?? ""; // coalesce just to remove error messages

    function checkAliases(main: string | undefined, aliases: string[] | undefined) {
      if (main && aliases?.concat(main).includes(command))
        ops.push({
          module: module.name,
          command: main,
          parameters: tokens
        });
    }
    checkAliases(module.primary, module.primaryAliases);
    checkAliases(module.secondary, module.secondaryAliases);
    checkAliases(module.tertiary, module.tertiaryAliases);
  });

  return ops;
}


/**
 * An object that bundles the name, help, and list of
 * commands and aliases of a module.
 */
export interface ModuleHelp {
  name: string;
  primaryAliases: string[];
  primaryHelp: string;
  secondaryAliases?: string[];
  secondaryHelp?: string;
  tertiaryAliases?: string[];
  tertiaryHelp?: string;
}


/**
 * If a module with the given 'id' is found, returns the 
 * name of the module, a paragraph of help on how to use the
 * module, and the valid commands and aliases of the module.
 * If no module is found with the given 'id,' returns
 * undefined.
 */
export function moduleHelp(id: string): ModuleHelp {
  const module = moduleList.get(id);
  if (!module)
    throw "Invalid module id!";

  return {
    name: module.name,
    help: module.help,
    commands: Array.from(module.commands.keys())
  };
}

/**
 * Clears and re-adds modules to the list, according to the
 * content JSON file.
 */
export function resetModules(): void {
  moduleList.clear();

  interface ModuleJSON {
    id: string;
    name: string;
    primary: string;
    primaryAliases: string[];
    primaryHelp: string[];
    secondary?: string;
    secondaryAliases?: string[];
    secondaryHelp?: string[];
    tertiary?: string;
    tertiaryAliases?: string[];
    tertiaryHelp?: string[];
  }

  modules.forEach((module: ModuleJSON) =>
    moduleList.set(module.id,
      {
        name: module.name,
        primary: module.primary,
        primaryAliases: module.primaryAliases,
        primaryHelp: module.primaryHelp.join(),
        secondary: module.secondary,
        secondaryAliases: module.secondaryAliases,
        secondaryHelp: module.secondaryHelp?.join(),
        tertiary: module.tertiary,
        tertiaryAliases: module.tertiaryAliases,
        tertiaryHelp: module.tertiaryHelp?.join()
      }
    )
  );
}
