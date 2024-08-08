import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonHorseriderBowman = MCFunction("enemies/summon_horserider_bowman", () => {
  summon("minecraft:horse", rel(0, 0, 0), {
    Tags: ["enemy_horse"],
    DeathLootTable: "minecraft:bat",
    PersistenceRequired: NBT.byte(1),
    Variant: 1,
    Passengers: [
      {
        id: "minecraft:pillager",
        DeathLootTable: "minecraft:bat",
        CustomName: '{"text":"Horse Rider"}',
        PersistenceRequired: NBT.byte(1),
        CanPickUpLoot: NBT.byte(0),
        PatrolLeader: NBT.byte(0),
        Patrolling: NBT.byte(0),
        CanJoinRaid: NBT.byte(0),
        Tags: ["enemy", " normal_pillager"],
        HandItems: [{ id: "minecraft:crossbow", Count: NBT.byte(1) }, {}],
      },
    ],
  });
});
