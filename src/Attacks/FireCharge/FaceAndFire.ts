import { Data, execute, loc, MCFunction, particle, rel, scoreboard, Selector, summon, teleport } from "sandstone";
import { self } from "../../Tick";
import { posX1, posX2, posY1, posY2, posZ1, posZ2 } from "../Tick";

// Constants to configure the fireball
const FiringDistance: number = 30;
const ActivationDistance: number = 40;

MCFunction(
  "attacks/fire_charge/face_and_fire",
  () => {
    // Spawn the fire charge
    execute
      .as(Selector("@e", { type: "minecraft:pillager", tag: "fire_pillager" }))
      .at(self)
      .run(() => {
        // Face the pillager to the nearest player
        execute
          .facingEntity(Selector("@a", { distance: [Infinity, ActivationDistance], limit: 1, sort: "nearest" }), "feet")
          .run(() => {
            teleport(self, rel(0, 0, 0), rel(0, 0));
          });

        // Spawn the fireball
        execute
          .anchored("eyes")
          .positioned(loc(0, 0, 1))
          .if(Selector("@a", { distance: [Infinity, FiringDistance] }))
          .run(() => {
            summon("minecraft:fireball", rel(0, 0, 0), {
              Tags: ["fireball"],
            });

            // Display thr particle
            particle("minecraft:flame", rel(0, 0, 0), [0.5, 0.5, 0.5], 0.05, 10);
          });
      });

    // Set the Power of the fireball
    execute
      .as(Selector("@e", { type: "minecraft:fireball", tag: "fireball" }))
      .at(self)
      .rotatedAs(Selector("@e", { type: "minecraft:pillager", tag: "fire_pillager", limit: 1, sort: "nearest" }))
      .run(() => {
        // Variable that stores the cannon data
        const fireballData = Data("entity", "@s");

        // Store the initial position of the fire charge
        posX1.set(fireballData.select("Pos[0]"), 1000);
        posY1.set(fireballData.select("Pos[1]"), 1000);
        posZ1.set(fireballData.select("Pos[2]"), 1000);

        // Teleport the fire charge forward
        teleport(self, loc(0, 0, 0.1));

        // Store the final position of the fire charge
        posX2.set(fireballData.select("Pos[0]"), 1000);
        posY2.set(fireballData.select("Pos[1]"), 1000);
        posZ2.set(fireballData.select("Pos[2]"), 1000);

        // Subtract the final position from the initial position
        posX2["-="](posX1);
        posY2["-="](posY1);
        posZ2["-="](posZ1);

        // Modify the motion data of the fire charge to the new value
        execute.store.result.entity(self, "power[0]", "double", 0.005).run(() => {
          scoreboard.players.get(posX2.target, posX2.objective.name);
        });
        execute.store.result.entity(self, "power[1]", "double", 0.005).run(() => {
          scoreboard.players.get(posY2.target, posY2.objective.name);
        });
        execute.store.result.entity(self, "power[2]", "double", 0.005).run(() => {
          scoreboard.players.get(posZ2.target, posZ2.objective.name);
        });
      });
  },
  {
    runEach: "120t",
  }
);
