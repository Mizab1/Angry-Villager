import { MCFunction, NBT, rel, summon } from "sandstone";

const summonTank = MCFunction("enemies/summon_tank", () => {
  summon("minecraft:zombie", rel(0, 0, 0), {
    Silent: NBT.byte(1),
    PersistenceRequired: NBT.byte(1),
    Health: NBT.float(40),
    Tags: ["tank", "enemy"],
    ArmorItems: [{}, {}, {}, { id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { CustomModelData: 100003 } }],
    ArmorDropChances: [NBT.float(0.0), NBT.float(0.0), NBT.float(0.0), NBT.float(0.0)],
    ActiveEffects: [{ Id: 14, Amplifier: NBT.byte(1), Duration: 999999, ShowParticles: NBT.byte(0) }],
    Attributes: [
      { Name: "generic.max_health", Base: 40 },
      { Name: "generic.attack_damage", Base: 8 },
    ],
    CustomName: '{"text":"Tank"}',
    DeathLootTable: "minecraft:bat",
  });
});
