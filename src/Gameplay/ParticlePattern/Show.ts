import { execute, MCFunction, rel, Selector } from "sandstone";
import { self } from "../../Tick";

export const showParticle = MCFunction("gameplay/particle_pattern/show", () => {
  // Triangle Pattern
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "triangle_pattern" }))
    .at(self)
    .run.functionCmd("particle_patterns:triangle");

  // Rings Pattern
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "rings_pattern" }))
    .at(self)
    .run.functionCmd("particle_patterns:rings");

  // Circles Pattern
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "circles_pattern" }))
    .at(self)
    .run.functionCmd("particle_patterns:circles");
});

export const rotateClockwise = MCFunction("gameplay/particle_pattern/rotate_clockwise", () => {
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "rotate_clockwise" }))
    .at(self)
    .run.teleport(self, rel(0, 0, 0), rel(0.7, 0));
});

export const rotateAntiClockwise = MCFunction("gameplay/particle_pattern/rotate_anti_clockwise", () => {
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "rotate_anti_clockwise" }))
    .at(self)
    .run.teleport(self, rel(0, 0, 0), rel(-0.7, 0));
});
