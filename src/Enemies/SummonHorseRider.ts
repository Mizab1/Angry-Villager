import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonHorseRider = MCFunction("enemies/summon_horse_rider", () => {
  summon("minecraft:horse", rel(0, 0, 0), {
    Tags: ["enemy_horse"],
    DeathLootTable: "minecraft:bat",
    PersistenceRequired: NBT.byte(1),
    Variant: 772,
    Passengers: [
      {
        id: "minecraft:zombie",
        DeathLootTable: "minecraft:bat",
        CustomName: '{"text":"Horse Rider"}',
        PersistenceRequired: NBT.byte(1),
        CanPickUpLoot: NBT.byte(0),
        Silent: NBT.byte(1),
        Tags: ["enemy", "horse_rider"],
        Health: NBT.float(20),
        HandItems: [{ id: "minecraft:diamond_sword", Count: NBT.byte(1) }, {}],
        HandDropChances: [NBT.float(0.0), NBT.float(0.0)],
        ArmorItems: [{}, {}, {}, { id: "minecraft:chainmail_helmet", Count: NBT.byte(1) }],
        ArmorDropChances: [NBT.float(0.0), NBT.float(0.0), NBT.float(0.0), NBT.float(0.0)],
      },
    ],
  });
});
