import { execute, MCFunction, NBT, rel, Selector, summon } from "sandstone";
import { self } from "../Tick";

export const summonDrone = MCFunction("enemies/summon_drone", () => {
  // Summon drone model
  summon("minecraft:bee", rel(0, 0, 0), {
    NoAI: NBT.byte(1),
    Silent: NBT.byte(1),
    Invisible: NBT.byte(1),
    Tags: ["ld_invisible", "ld_drone_hitbox", "ld_new_hitbox"],
    ActiveEffects: [{ Id: 14, lvl: 1, Duration: 1000000, ShowParticles: NBT.byte(0) }],
    Passengers: [
      {
        id: "minecraft:armor_stand",
        Invisible: NBT.byte(1),
        Invulnerable: NBT.byte(1),
        Marker: NBT.byte(1),
        Small: NBT.byte(1),
        Fire: 1000000,
        Tags: ["ld_drone"],
        ArmorItems: [
          {},
          {},
          {},
          {
            id: "minecraft:birch_button",
            Count: NBT.byte(1),
            tag: {
              LockdownData: {
                id: 7,
                block_model: 10006,
                item_model: 10006,
                block_id: 1,
                item_id: 1,
                function_model: 10007,
                channel: 0,
              },
              CustomModelData: 10006,
            },
          },
        ],
      },
    ],
  });

  // Run as bee
  execute
    .as(Selector("@e", { type: "minecraft:bee", limit: 1, sort: "nearest", tag: ["ld_new_hitbox", "ld_drone_hitbox"] }))
    .at(self)
    .positioned(rel(0, 0, 0))
    .run.functionCmd("lockdown:place_block/drone_setup");
});
