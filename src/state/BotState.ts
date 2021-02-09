class Bot {
  private modules: string[];
  private position: string;

  public constructor() {
    this.modules = [];
    this.position = '';
  }
}


const bots: Map<string, Bot> = new Map();


export function botCommand(bot: string, use: string, on: string): string[] {
  return [];
}
