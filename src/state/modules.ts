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
 * Modules can have
 */
interface Module {
  name: string;
  help: string;
  commands: Map<string, ModuleOperation>;
}


const module_list: Map<string, Module> = new Map();


export function nameModule(id: string): string | undefined {
  return module_list.get(id)?.name;
}


export function findModuleOperation(ids: string[], tokens: string[]): ModuleOperation {
  return ModuleOperation.fail;
}


export interface ModuleHelp {
  name: string;
  help: string;
  commands: string[];
}


export function moduleHelp(id: string): ModuleHelp | undefined {
  const module = module_list.get(id);
  if (!module)
    return undefined;

  return {
    name: module.name,
    help: module.help,
    commands: Array.from(module.commands.keys())
  };
}


export function resetModules() {
  module_list.clear();

  interface ModuleJSON {
    id: string;
    name: string;
    help: string;
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

    module.commands.catalyze?.forEach(command =>
      command_map.set(command, ModuleOperation.catalyze)
    );
    module.commands.describe?.forEach(command =>
      command_map.set(command, ModuleOperation.describe)
    );
    module.commands.move?.forEach(command =>
      command_map.set(command, ModuleOperation.move)
    );
    module.commands.carry?.forEach(command =>
      command_map.set(command, ModuleOperation.carry)
    );
    module.commands.drop?.forEach(command =>
      command_map.set(command, ModuleOperation.drop)
    );

    module_list.set(module.id,
      {
        name: module.name,
        help: module.help,
        commands: command_map
      }
    )
  });
}
