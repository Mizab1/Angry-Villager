import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonHealer = MCFunction("enemies/summon_healer", () => {
  summon("minecraft:witch", rel(0, 0, 0), {
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", "healer"],
    HandItems: [{ id: "minecraft:splash_potion", Count: NBT.byte(1), tag: { Potion: "minecraft:healing" } }, {}],
  });
});
