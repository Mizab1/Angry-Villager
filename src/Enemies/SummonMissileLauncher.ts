import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonMissileLauncher = MCFunction("enemies/summon_missile_launcher", () => {
  summon("minecraft:zombie", rel(0, 0, 0), {
    Tags: ["missile_launcher", "enemy"],
    PersistenceRequired: NBT.byte(1),
    ArmorItems: [
      {},
      {},
      {},
      { id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { Unbreakable: NBT.byte(1), CustomModelData: 100004 } },
    ],
    ArmorDropChances: [NBT.float(0.0), NBT.float(0.0), NBT.float(0.0), NBT.float(0.0)],
    Silent: NBT.byte(1),
    NoAI: NBT.byte(1),
    ActiveEffects: [{ Id: 14, Amplifier: NBT.byte(1), Duration: 999999, ShowParticles: NBT.byte(0) }],
    CustomName: '{"text":"Missile Launcher"}',
    Attributes: [{ Name: "generic.max_health", Base: 20 }],
    Health: NBT.float(20),
    DeathLootTable: "minecraft:bat",
  });
});
