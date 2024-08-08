import { MCFunction, NBT, rel, summon } from "sandstone";

export const spawnRingsPattern = MCFunction("gameplay/particle_pattern/spawn/rings", () => {
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    NoGravity: NBT.byte(1),
    Tags: ["rings_pattern", "rotate_anti_clockwise", "pattern"],
  });
});
