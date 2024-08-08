import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonAxeThrower = MCFunction("enemies/summon_axe_thrower", () => {
  summon("minecraft:vindicator", rel(0, 0, 0), {
    DeathLootTable: "minecraft:bat",
    CustomName: '{"text":"Axe Thrower"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", "axe_thrower"],
    HandItems: [
      {
        id: "minecraft:wooden_axe",
        Count: NBT.byte(1),
        tag: {
          AttributeModifiers: [
            {
              AttributeName: "generic.attack_damage",
              Name: "generic.attack_damage",
              Amount: 1,
              Operation: 0,
              UUID: NBT.intArray([199700329, 1439775667, -1927589810, 253654477]),
              Slot: "mainhand",
            },
          ],
        },
      },
      {},
    ],
    HandDropChances: [NBT.float(0.0), NBT.float(0.0)],
    Attributes: [{ Name: "generic.attack_damage", Base: 0 }],
  });
});
