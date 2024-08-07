import { MCFunction, NBT, rel, summon } from "sandstone";

const summonPlasmaBlaster = MCFunction("enemies/summon_plasma_blaster", () => {
  summon("minecraft:zombie", rel(0, 0, 0), {
    Tags: ["plasma_blaster", "enemy"],
    PersistenceRequired: NBT.byte(1),
    ArmorItems: [{}, {}, {}, { id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { CustomModelData: 100006 } }],
    ArmorDropChances: [NBT.float(0.0), NBT.float(0.0), NBT.float(0.0), NBT.float(0.0)],
    Silent: NBT.byte(1),
    NoAI: NBT.byte(1),
    ActiveEffects: [{ Id: 14, Amplifier: NBT.byte(1), Duration: 999999, ShowParticles: NBT.byte(0) }],
    CustomName: '{"text":"Plasma Blaster"}',
    Attributes: [{ Name: "generic.max_health", Base: 20 }],
    Health: NBT.float(20),
    DeathLootTable: "minecraft:bat",
  });
});
