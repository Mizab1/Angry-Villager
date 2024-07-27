import { effect, execute, gamerule, MCFunction, raw, Selector } from "sandstone";

// Global Variables
export const self = Selector("@s");

MCFunction(
  "tick",
  () => {
    effect.give("@a", "minecraft:saturation", 500, 0, true);

    // Kills villager and iron golem
    // kill(Selector("@e", { type: "minecraft:villager" }));
    // kill(Selector("@e", { type: "minecraft:iron_golem" }));
  },
  {
    runEachTick: true,
  }
);

MCFunction(
  "load",
  () => {
    execute.as("@a").run.raw(`scale reset`);
    raw(`scale persist set pehkui:base true @a`);
    gamerule("doFireTick", false);
    gamerule("commandBlockOutput", false);
  },
  {
    runOnLoad: true,
  }
);
