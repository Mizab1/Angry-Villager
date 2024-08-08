import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonFuturisticSoldier = MCFunction("enemies/summon_futuristic_soldier", () => {
  summon("minecraft:pillager", rel(0, 0, 0), {
    DeathLootTable: "minecraft:bat",
    CustomName: '{"text":"Futuristic Soldier"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", " futuristic_soldier"],
    HandItems: [{ id: "minecraft:crossbow", Count: NBT.byte(1), tag: { CustomModelData: 100002 } }, {}],
    HandDropChances: [NBT.float(0.0), NBT.float(0.0)],
  });
});
