import { effect, execute, gamerule, MCFunction, raw, Selector } from "sandstone";

// Global Variables
export const self = Selector("@s");

MCFunction(
  "tick",
  () => {
    effect.give("@a", "minecraft:saturation", 500, 0, true);
  },
  {
    runEachTick: true,
  }
);

MCFunction(
  "load",
  () => {
    execute.as("@a").run.raw(`scale reset`);
    gamerule("doFireTick", false);
  },
  {
    runOnLoad: true,
  }
);
