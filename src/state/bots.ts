
  interface Module {
    name: string;
    status: string;
    description: string;
    actions: string[];
    inventory: string;
  }

interface ActionFunc {
  (input: string): string;
}


class Bot {

  private name: string;
  private modules: Module[];
  private location: string;
  private actionFuncs: Map<string, ActionFunc>;
    
  
  public constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
    this.modules = [];

    this.actionFuncs = new Map();
    this.actionFuncs.set('move', this.move);
    this.actionFuncs.set('use', this.use);
    this.actionFuncs.set('view', this.view);
    this.actionFuncs.set('grab', this.grab);
    this.actionFuncs.set('drop', this.drop);
  }

  public act(input: string): string {
    return "";
  }

  public move(direction: string): string {
    return "";
  }

  public use(tool: string): string {
    return "";
  }

  public view(target: string): string {
    return "";
  }

  public grab(object: string): string {
    return "";
  }

  public drop(object: string): string {
    return "";
  }
}


export let active_bot: Bot;


const bot_list: Bot[] = [];


export function resetBots() {
  bot_list.splice(0, bot_list.length)
  
  bot_list.push(new Bot('Zero', 'cargo'));
  active_bot = bot_list[0];
}
