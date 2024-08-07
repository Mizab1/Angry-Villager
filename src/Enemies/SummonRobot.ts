import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonRobot = MCFunction("enemies/summon_robot", () => {
  summon("minecraft:zombie", rel(0, 0, 0), {
    DeathLootTable: "minecraft:bat",
    CustomName: '{"text":"Robot"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    Tags: ["enemy", "robot"],
    Health: NBT.float(20),
    HandItems: [{ id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { CustomModelData: 100007 } }, {}],
    HandDropChances: [NBT.float(0.0), NBT.float(0.0)],
    ArmorItems: [{}, {}, {}, { id: "minecraft:chainmail_helmet", Count: NBT.byte(1) }],
    ArmorDropChances: [NBT.float(0.0), NBT.float(0.0), NBT.float(0.0), NBT.float(0.0)],
    Attributes: [
      { Name: "generic.max_health", Base: 20 },
      { Name: "generic.movement_speed", Base: 0.3 },
    ],
  });
});
