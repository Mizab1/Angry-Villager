import { MCFunction, summon, rel, NBT } from "sandstone";

export const summonBowMan = MCFunction("enemies/summon_bow_man", () => {
  summon("minecraft:skeleton", rel(0, 0, 0), {
    DeathLootTable: "minecraft:bat",
    CustomName: '{"text":"Bowman"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    Silent: NBT.byte(1),
    Tags: ["enemy", " bowman"],
    HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
    ArmorItems: [{}, {}, {}, { id: "minecraft:leather_helmet", Count: NBT.byte(1) }],
    ArmorDropChances: [NBT.float(0.0), NBT.float(0.0), NBT.float(0.0), NBT.float(0.0)],
  });
});
