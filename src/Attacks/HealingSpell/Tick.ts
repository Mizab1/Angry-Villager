import { effect, execute, MCFunction, particle, rel, Selector } from "sandstone";
import { self } from "../../Tick";

// The effective distance within which healer can heal
const healingDistance: number = 15;

MCFunction(
  "attacks/healing_spell/tick",
  () => {
    execute
      .as(Selector("@e", { type: "minecraft:witch", tag: "healer" }))
      .at(self)
      .run(() => {
        // Display the particle
        particle("minecraft:instant_effect", rel(0, 1, 0), [2, 0.5, 2], 0.5, 30, "force");

        execute
          .as(Selector("@e", { tag: "enemy", distance: [Infinity, healingDistance] }))
          .at(self)
          .run(() => {
            effect.give(self, "minecraft:instant_health", 1, 0);
            particle("minecraft:heart", rel(0, 1, 0), [0.5, 0.5, 0.5], 0.1, 5);
          });
      });
  },
  {
    runEach: "4s",
  }
);
