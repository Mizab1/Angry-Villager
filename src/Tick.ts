import { execute, MCFunction, rel, Selector, teleport } from "sandstone";

// Global Variables
export const self = Selector("@s");

MCFunction("tick", () => {}, {
  runEachTick: true,
});

MCFunction("load", () => {}, {
  runOnLoad: true,
});
