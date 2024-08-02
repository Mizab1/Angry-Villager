import { execute, MCFunction, NBT, rel, Selector, summon, tag } from "sandstone";
import { self } from "../Tick";

export const summonTurret = MCFunction("enemies/summon_turret", () => {
  // Summon base
  summon("minecraft:armor_stand", rel(0.5, -0.23, 0.5), {
    Tags: ["ld_new_block", "ld_block", "ld_turret"],
    Invisible: NBT.byte(1),
    Invulnerable: NBT.byte(1),
    Marker: NBT.byte(1),
    Small: NBT.byte(1),
    Fire: 1000000,
    ld_channel: 0,
    ArmorItems: [
      {},
      {},
      {},
      {
        id: "minecraft:birch_button",
        Count: NBT.byte(1),
        tag: {
          LockdownData: {
            id: 15,
            block_model: 10008,
            item_model: 10009,
            block_id: 1,
            item_id: 1,
            function_model: 10009,
            channel: 0,
          },
          CustomModelData: 10008,
        },
      },
    ],
  });

  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", limit: 1, sort: "nearest", tag: ["ld_turret", "ld_new_block"] }))
    .at(self)
    .positioned(rel(0, 0.23, 0))
    .run(() => {
      // Summon turret
      summon("minecraft:armor_stand", rel(0, 0, 0), {
        Tags: ["ld_turret_blaster"],
        Invulnerable: NBT.byte(1),
        Small: NBT.byte(1),
        Marker: NBT.byte(1),
        NoGravity: NBT.byte(1),
        Invisible: NBT.byte(1),
        ArmorItems: [{}, {}, {}, { id: "minecraft:birch_button", Count: NBT.byte(1), tag: { CustomModelData: 10009 } }],
      });

      // Summon hitbox
      summon("minecraft:bee", rel(0, 0, 0), {
        NoAI: NBT.byte(1),
        NoGravity: NBT.byte(1),
        Silent: NBT.byte(1),
        Invisible: NBT.byte(1),
        DeathTime: 15,
        Tags: ["ld_invisible", "ld_turret_hitbox"],
        ActiveEffects: [{ Id: 14, lvl: 1, Duration: 1000000, ShowParticles: NBT.byte(0) }],
        Attributes: [{ Name: "minecraft:generic.max_health", Base: NBT.double(35) }],
        Health: 35,
      });

      // Destroy the turret if the block below is air
      execute.if
        .block(rel(0, -1, 0), "#lockdown:passthrough")
        .run.kill(Selector("@e", { type: "minecraft:bee", tag: "ld_turret_hitbox", sort: "nearest", limit: 1 }));
    });

  // Register the finish of the process
  tag(Selector("@e", { type: "minecraft:armor_stand", tag: "ld_new_block", sort: "nearest", limit: 1 })).remove("ld_new_block");
});
