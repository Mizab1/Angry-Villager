import { MCFunction, NBT, rel, summon } from "sandstone";

export const summonMissileThrower = MCFunction("enemies/summon_missile_thrower", () => {
  summon("minecraft:vindicator", rel(0, 0, 0), {
    CustomName: '{"text":"Missile Operator"}',
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    PatrolLeader: NBT.byte(0),
    Patrolling: NBT.byte(0),
    CanJoinRaid: NBT.byte(0),
    Tags: ["enemy", "missile_thrower"],
    Attributes: [{ Name: "generic.attack_damage", Base: 1 }],
  });
});
