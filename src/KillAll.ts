import { execute, kill, MCFunction, Selector } from "sandstone";
import { self } from "./Tick";

MCFunction("kill_all", () => {
  kill(Selector("@e", { tag: ["enemy", "!no_kill_cmd"] }));
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tf_catapult" }))
    .at(self)
    .run.functionCmd("tf_catapult:death");
});
