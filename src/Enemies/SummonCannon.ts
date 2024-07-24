import { ENTITY_TYPES, MCFunction, NBT, rel, summon } from "sandstone";

export const cannonEntity: ENTITY_TYPES = "minecraft:zombie";

const summonCannon = MCFunction("enemies/summon_cannon", () => {
  // summon("minecraft:armor_stand", rel(0, 0, 0), {
  //   Invisible: NBT.byte(1),
  //   Tags: ["cannon"],
  //   ArmorItems: [{}, {}, {}, { id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { CustomModelData: 100002 } }],
  // });

  // summon zombie ~ ~ ~ {Silent:1b,DeathLootTable:"minecraft:bat",PersistenceRequired:1b,NoAI:1b,ArmorItems:[{},{},{},{id:"minecraft:wooden_hoe",Count:1b,tag:{CustomModelData:100002}}],ActiveEffects:[{Id:14,Amplifier:1b,Duration:999999,ShowParticles:0b}]}
  summon(cannonEntity, rel(0, 0, 0), {
    Tags: ["cannon", "enemy"],
    Silent: NBT.byte(1),
    PersistenceRequired: NBT.byte(1),
    NoAI: NBT.byte(1),
    ActiveEffects: [{ Id: 14, Amplifier: NBT.byte(1), Duration: 999999, ShowParticles: NBT.byte(0) }],
    ArmorItems: [{}, {}, {}, { id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { CustomModelData: 100002 } }],
    DeathLootTable: "minecraft:bat",
  });
});
