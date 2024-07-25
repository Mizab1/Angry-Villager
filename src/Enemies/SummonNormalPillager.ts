import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonNormalPillager = MCFunction("enemies/summon_normal_pillager", () => {
  summon("minecraft:pillager", rel(0, 0, 0), {
    CustomName: '{"text":"Soldier"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", " normal_pillager"],
    HandItems: [{ id: "minecraft:crossbow", Count: NBT.byte(1) }, {}],
  });
});
