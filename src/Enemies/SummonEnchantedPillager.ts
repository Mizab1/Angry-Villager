import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonEnchantedPillager = MCFunction("enemies/summon_enchanted_pillager", () => {
  summon("minecraft:pillager", rel(0, 0, 0), {
    CustomName: '{"text":"Soldier"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", " normal_pillager"],
    HandItems: [
      {
        id: "minecraft:crossbow",
        Count: NBT.byte(1),
        tag: {
          Enchantments: [
            { id: "minecraft:multishot", lvl: NBT.short(1) },
            { id: "minecraft:piercing", lvl: NBT.short(1) },
            { id: "minecraft:quick_charge", lvl: NBT.short(2) },
          ],
        },
      },
      {},
    ],
  });
});
