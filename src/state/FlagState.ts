// Flags are used to keep track of linear events in the story.

// For example, a flag "BuiltRocket" is the way the game would know that
// the player has already built a rocket. It might have a dependency of
// "FoundRocket", so that BuiltRocket cannot be activated before FoundRocket.

// It might have a score, which updates the player's total score when the
// flag is activated.
export default namespace FlagState {


  // The Flag class combines fields relevant to a single flag, including name,
  // score, whether its active, and its dependencies. Only the "active" field
  // is mutable, and can never be deactivated.
  class Flag {
    private dependencies: string[];
    private name: string;
    private score: number;
    private active: boolean;

    public constructor(name: string, score: number, dependencies: string[]) {
      this.dependencies = dependencies;
      this.name = name;
      this.score = score;
      this.active = false;
    }

    public get name(): string { return this.name; }
    public get dependencies(): string[] { return this.dependencies; }
    public get score(): number { return this.score; }
    public get active(): boolean { return this.active; }

    public activate(): void { this.active = true; }
  }


  // A map holding all defined flags.
  const flags = {
    "test": new Flag("gameStarted", 1, [])
  };


  // Keeping track of player score.
  let score = 0;


  // Returns true if all dependencies are met and flag activated, false otherwise.
  export function activate(name: string): boolean {
    const flag: Flag = flags[name];
    if (!flag)
      return false;

    flag.dependencies.forEach(dependencyName => {
      if (!flags[dependencyName].active)
        return false;
    });

    flag.activate();
    score += flag.score;
    return true;
  }


  // Returns false if flag is not found or is not active, true otherwise.
  export function isActive(name: string): boolean {
    const flag: Flag = flags[name];
    if (!flag)
      return false;
    return flags.active;
  }
}
