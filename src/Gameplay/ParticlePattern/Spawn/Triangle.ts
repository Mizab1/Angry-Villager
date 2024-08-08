import { MCFunction, NBT, rel, summon } from "sandstone";

const spawnTrianglePattern = MCFunction("gameplay/particle_pattern/spawn/triangle", () => {
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    NoGravity: NBT.byte(1),
    Tags: ["triangle_pattern", "rotate_clockwise", "pattern"],
  });
});
