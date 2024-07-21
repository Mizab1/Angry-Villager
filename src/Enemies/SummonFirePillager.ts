import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonFirePillager = MCFunction("enemies/summon_fire_pillager", () => {
  summon("minecraft:pillager", rel(0, 0, 0), {
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", "fire_pillager"],
    HandItems: [{ id: "minecraft:fire_charge", Count: NBT.byte(1) }, {}],
  });
});