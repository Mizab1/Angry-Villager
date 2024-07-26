import { effect, MCFunction, Selector } from "sandstone";

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

MCFunction("load", () => {}, {
  runOnLoad: true,
});
