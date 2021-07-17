class Bot {

  private name: string;
  private modules: Module[];
  private location: string;
    
  
  public constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
    this.modules = [];
  }

  public act(tokens: string[]): string {
    const command = tokens.shift();
    const target = tokens.shift();

    switch (command) {
      case "move":
        this.move(target);
      case "use":
        this.use(target);
        
    }
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
