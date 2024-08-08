import { MCFunction, NBT, rel, summon } from "sandstone";

export const spawnCirclesPattern = MCFunction("gameplay/particle_pattern/spawn/circles", () => {
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    NoGravity: NBT.byte(1),
    Tags: ["circles_pattern", "rotate_clockwise", "pattern"],
  });
});
