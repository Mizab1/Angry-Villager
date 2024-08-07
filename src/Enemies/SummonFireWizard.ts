import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonFireWizard = MCFunction("enemies/summon_fire_wizard", () => {
  summon("minecraft:pillager", rel(0, 0, 0), {
    DeathLootTable: "minecraft:bat",
    CustomName: '{"text":"Pyromancer"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", "fire_pillager"],
    HandItems: [{ id: "minecraft:fire_charge", Count: NBT.byte(1) }, {}],
    HandDropChances: [NBT.float(0.0), NBT.float(0.0)],
  });
});
