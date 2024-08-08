import { MCFunction, NBT, rel, summon } from "sandstone";

export const spawnHexagonPattern = MCFunction("gameplay/particle_pattern/spawn/hexagon", () => {
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    NoGravity: NBT.byte(1),
    Tags: ["hexagon_pattern", "rotate_clockwise", "pattern"],
  });
});
