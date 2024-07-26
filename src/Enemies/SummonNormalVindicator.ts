import { MCFunction, NBT, rel, summon } from "sandstone";

MCFunction("enemies/summon_normal_vindicator", () => {
  summonNormalVindicator();
});

export const summonNormalVindicator = (damage?: number) => {
  summon("minecraft:vindicator", rel(0, 0, 0), {
    CustomName: '{"text":"Axe Wielder"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", "normal_vindicator"],
    HandItems: [
      {
        id: "minecraft:wooden_axe",
        Count: NBT.byte(1),
        tag: {
          AttributeModifiers: [
            {
              AttributeName: "generic.attack_damage",
              Name: "generic.attack_damage",
              Amount: 6 || damage,
              Operation: 0,
              UUID: NBT.intArray([199699329, 1439778767, -1927542810, 257854477]),
              Slot: "mainhand",
            },
          ],
        },
      },
      {},
    ],
    Attributes: [{ Name: "generic.attack_damage", Base: 0 }],
  });
};
