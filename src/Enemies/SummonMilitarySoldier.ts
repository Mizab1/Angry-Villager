import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonMilitarySoldier = MCFunction("enemies/summon_military_soldier", () => {
  summon("minecraft:pillager", rel(0, 0, 0), {
    DeathLootTable: "minecraft:bat",
    CustomName: '{"text":"Military Soldier"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", " military_soldier"],
    HandItems: [{ id: "minecraft:crossbow", Count: NBT.byte(1), tag: { CustomModelData: 100001 } }, {}],
    HandDropChances: [NBT.float(0.0), NBT.float(0.0)],
  });
});
