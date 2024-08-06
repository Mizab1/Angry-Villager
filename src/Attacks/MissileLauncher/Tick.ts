import { execute, functionCmd, MCFunction, particle, rel, Selector } from "sandstone";
import { self } from "../../Tick";

MCFunction(
  "attacks/spawn_missile",
  () => {
    execute
      .as(Selector("@e", { type: "minecraft:zombie", tag: "missile_launcher" }))
      .at(self)
      .run(() => {
        // ! The implementation of missile is done using MCB language in MCB internal
        execute.positioned(rel(0, 1, 1)).run(() => {
          // Display particle
          particle("minecraft:campfire_cosy_smoke", rel(0, 1, 0), [0.5, 0.5, 0.5], 0.1, 3);
          particle("minecraft:cloud", rel(0, 1, 0), [0.5, 0.5, 0.5], 0.4, 10);

          functionCmd("internal:missiles");
        });
      });
  },
  {
    runEach: "180t",
  }
);
