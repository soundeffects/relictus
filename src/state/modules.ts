import { modules } from '../content.json';


/**
 * There are only a few different ways a module can be used.
 * Each of these module operations get handled differently
 * when a Bot tries to act by using a module.
 */
export enum ModuleOperation {
  catalyze,
  describe,
  move,
  carry,
  drop,
  fail
}


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
  help: string;
  commands: Map<string, ModuleOperation>;
}


/**
 * Stores all instances of modules, mapped to by id.
 */
const moduleList: Map<string, Module> = new Map();


/**
 * If a module with the given 'id' is found, returns the
 * name of that module. Otherwise, returns undefined.
 */
export function nameModule(id: string): string | undefined {
  return moduleList.get(id)?.name;
}


/**
 * When provided with the 'ids' of modules installed on a
 * bot, and the command (or the string 'tokens' that make up
 * the command), this method returns what ModuleOperation
 * should be performed by the bot. If no other operation
 * applies, the 'fail' operation will be returned.
 */
export function findModuleOperation(ids: string[], tokens: string[]): ModuleOperation {
  return ModuleOperation.fail;
}


/**
 * An object that bundles the name, help, and list of
 * commands and aliases of a module.
 */
export interface ModuleHelp {
  name: string;
  help: string;
  commands: string[];
}


/**
 * If a module with the given 'id' is found, returns the 
 * name of the module, a paragraph of help on how to use the
 * module, and the valid commands and aliases of the module.
 * If no module is found with the given 'id,' returns
 * undefined.
 */
export function moduleHelp(id: string): ModuleHelp | undefined {
  const module = moduleList.get(id);
  if (!module)
    return undefined;

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
    help: string[];
    commands: {
      catalyze?: string[];
      describe?: string[];
      move?: string[];
      carry?: string[];
      drop?: string[];
    }
  }

  modules.forEach((module: ModuleJSON) => {
    const command_map: Map<string, ModuleOperation> = new Map();

    function set_map(commands: string[] | undefined, operation: ModuleOperation) {
      commands?.forEach(command => command_map.set(command, operation));
    }

    set_map(module.commands.catalyze, ModuleOperation.catalyze);
    set_map(module.commands.describe, ModuleOperation.describe);
    set_map(module.commands.move, ModuleOperation.move);
    set_map(module.commands.carry, ModuleOperation.carry);
    set_map(module.commands.drop, ModuleOperation.drop);

    moduleList.set(module.id,
      {
        name: module.name,
        help: module.help.join(),
        commands: command_map
      }
    )
  });
}
