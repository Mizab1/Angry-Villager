import { execute, kill, MCFunction, Selector } from "sandstone";
import { self } from "./Tick";

export const killAllEnemy = MCFunction("kill_all", () => {
  kill(Selector("@e", { tag: ["enemy", "!no_kill_cmd"] }));
  kill(Selector("@e", { tag: ["rotating_axe"] }));
  kill(Selector("@e", { type: "minecraft:fireball" }));
  kill(Selector("@e", { type: "minecraft:armor_stand", tag: "falling_meteor" }));
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tf_catapult" }))
    .at(self)
    .run.functionCmd("tf_catapult:death");
});
