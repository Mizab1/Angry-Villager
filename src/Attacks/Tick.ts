import { execute, kill, MCFunction, raw, rel, Selector, teleport } from "sandstone";
import { self } from "../Tick";

const AXE_TAG = "rotating_axe";

MCFunction(
  "attacks/tick",
  () => {
    // Teleport the rotating axe towards the player
    execute
      .as(Selector("@e", { type: "minecraft:armor_stand", tag: "axe_vehicle" }))
      .at(self)
      .run(() => {
        raw(`teleport @s ^-0.4 ^ ^0.8 facing entity @p`);
      });

    // Rotate the entities that have rotate tag
    execute
      .as(Selector("@e", { type: "#internal:rotating_entities", tag: "rotate" }))
      .at(self)
      .run(() => {
        teleport(self, rel(0, 0, 0), rel(-40, 0));
      });

    // Register the damage if the rotating axe meets the player
    execute
      .as("@a")
      .at(self)
      .if(Selector("@e", { type: "minecraft:armor_stand", tag: AXE_TAG, distance: [Infinity, 2] }))
      .run(() => {
        kill(Selector("@e", { tag: AXE_TAG, distance: [Infinity, 4] }));
        raw(`damage @s 2`);
      });
  },
  {
    runEachTick: true,
  }
);
