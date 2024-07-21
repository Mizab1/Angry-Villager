import { execute, kill, MCFunction, raw, Selector } from "sandstone";
import { self } from "../../Tick";
import { summonRotatingAxe } from "./summonAxe";

const AXE_TAG = "rotating_axe";

export const rotatingAxeTick = MCFunction("attacks/rotating_axe/tick", () => {
  // Teleport the rotating axe towards the player
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "axe_vehicle" }))
    .at(self)
    .run(() => {
      raw(`teleport @s ^-0.4 ^ ^0.8 facing entity @p`);
    });

  // Register the damage if the rotating axe meets the player
  execute
    .as("@a")
    .at(self)
    .if(Selector("@e", { type: "minecraft:armor_stand", tag: AXE_TAG, distance: [Infinity, 1] }))
    .run(() => {
      kill(Selector("@e", { tag: AXE_TAG, distance: [Infinity, 3] }));
      raw(`damage @s 2`);
    });
});

MCFunction(
  "attacks/rotating_axe/throw_axe",
  () => {
    // Spawn the rotating axe at the position
    execute
      .as(Selector("@e", { type: "minecraft:vindicator", tag: "axe_thrower" }))
      .at(self)
      .run(() => {
        summonRotatingAxe();
      });
  },
  { runEach: "80t" }
);
