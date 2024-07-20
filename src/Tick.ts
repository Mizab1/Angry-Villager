import { execute, MCFunction, rel, Selector, teleport } from "sandstone";

// Global Variables
export const self = Selector("@s");

MCFunction(
  "tick",
  () => {
    // /summon item_display ~ ~ ~ {Tags:["rotate"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[1f,0f,0f,1f],translation:[0f,0f,0f],scale:[1f,1f,1f]},item:{id:"minecraft:iron_axe",Count:1b}}
    // Rotate the entities that have rotate tag
    execute
      .as(Selector("@e", { type: "#internal:rotating_entities", tag: "rotate" }))
      .at(self)
      .run(() => {
        teleport(self, rel(0, 0, 0), rel(-40, 0));
      });
  },
  {
    runEachTick: true,
  }
);

MCFunction("load", () => {}, {
  runOnLoad: true,
});
