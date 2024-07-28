import { _, execute, MCFunction, Objective, rel, scoreboard, Selector, teleport } from "sandstone";
import { self } from "../../Tick";

const isLoaded = Objective.create("ctplt_ld", "dummy")("@s");

const firingDistance: Array<number> = [10, 45];

MCFunction(
  "attacks/catapult/load_or_fire",
  () => {
    execute
      .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tf_catapult" }))
      .at(self)
      .run(() => {
        // Face the player
        execute
          .facingEntity(Selector("@a", { distance: [firingDistance[0], firingDistance[1]], limit: 1, sort: "nearest" }), "eyes")
          .run(() => {
            teleport(self, rel(0, 0, 0), ["~", "0"]);
            // Shoot or load
            _.if(isLoaded, () => {
              scoreboard.players.set("@s", "tfcp_anim", 10);
              isLoaded.set(0);
            }).else(() => {
              scoreboard.players.set("@s", "tfcp_anim", -10);
              isLoaded.set(1);
            });
          });
      });
  },
  {
    runEach: "40t",
  }
);
