import { execute, kill, MCFunction, Selector } from "sandstone";
import { self } from "./Tick";

export const killAllEnemy = MCFunction("kill_all", () => {
  kill(Selector("@e", { tag: ["enemy", "!no_kill_cmd"] }));
  kill(Selector("@e", { tag: ["rotating_axe"] }));
  kill(Selector("@e", { type: "minecraft:fireball" }));
  kill(Selector("@e", { type: "minecraft:armor_stand", tag: "falling_meteor" }));
  kill(Selector("@e", { type: "minecraft:armor_stand", tag: "pattern" }));
  kill(Selector("@e", { type: "minecraft:armor_stand", tag: "missile" }));
  kill(Selector("@e", { type: "minecraft:bee", tag: "ld_drone_hitbox" }));
  kill(Selector("@e", { type: "minecraft:bee", tag: "ld_turret_hitbox" }));
  kill(Selector("@e", { type: "minecraft:horse", tag: "enemy_horse" }));
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tf_catapult" }))
    .at(self)
    .run.functionCmd("tf_catapult:death");
});
