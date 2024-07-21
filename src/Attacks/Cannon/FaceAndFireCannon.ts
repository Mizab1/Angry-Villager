import { Data, execute, loc, MCFunction, rel, scoreboard, Selector, summon, teleport } from "sandstone";
import { self } from "../../Tick";
import { posX1, posX2, posY1, posY2, posZ1, posZ2 } from "../Tick";
import { cannonEntity } from "./PlaceCannon";

// Constants to configure the cannon
const FiringDistance: number = 30;
const ActivationDistance: number = 40;

MCFunction(
  "attacks/cannon/face",
  () => {
    execute
      .as(Selector("@e", { type: cannonEntity, tag: "cannon" }))
      .at(self)
      .run(() => {
        // Kill the cannon if there is no ground
        execute.if.block(rel(0, -0.35, 0), "#aestd1:air").run.kill(self);

        // Face the cannon to the nearest player
        execute
          .facingEntity(Selector("@a", { distance: [Infinity, ActivationDistance], limit: 1, sort: "nearest" }), "eyes")
          .run(() => {
            teleport(self, rel(0, 0, 0), rel(0, 0));
          });
      });
  },
  {
    runEach: "10t",
  }
);

MCFunction(
  "attacks/cannon/fire",
  () => {
    // Spawn the cannon ball
    execute
      .as(Selector("@e", { type: cannonEntity, tag: "cannon" }))
      .at(self)
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .if(Selector("@a", { distance: [Infinity, FiringDistance] }))
      .run(() => {
        summon("minecraft:tnt", rel(0, 0, 0), {
          Tags: ["cannon_ball"],
          Fuse: 40,
        });
      });

    // Fire the cannon
    execute
      .as(Selector("@e", { type: "minecraft:tnt", tag: "cannon_ball" }))
      .at(self)
      .rotatedAs(Selector("@e", { type: cannonEntity, tag: "cannon", limit: 1, sort: "nearest" }))
      .run(() => {
        // Variable that stores the cannon data
        const cannonData = Data("entity", "@s");

        // Store the initial position of the cannon ball
        posX1.set(cannonData.select("Pos[0]"), 1000);
        posY1.set(cannonData.select("Pos[1]"), 1000);
        posZ1.set(cannonData.select("Pos[2]"), 1000);

        // Teleport the cannon ball forward
        teleport(self, loc(0, 0, 0.1));

        // Store the final position of the cannon ball
        posX2.set(cannonData.select("Pos[0]"), 1000);
        posY2.set(cannonData.select("Pos[1]"), 1000);
        posZ2.set(cannonData.select("Pos[2]"), 1000);

        // Subtract the final position from the initial position
        posX2["-="](posX1);
        posY2["-="](posY1);
        posZ2["-="](posZ1);

        // Modify the motion data of the cannon ball to the new value
        execute.store.result.entity(self, "Motion[0]", "double", 0.02).run(() => {
          scoreboard.players.get(posX2.target, posX2.objective.name);
        });
        execute.store.result.entity(self, "Motion[1]", "double", 0.02).run(() => {
          scoreboard.players.get(posY2.target, posY2.objective.name);
        });
        execute.store.result.entity(self, "Motion[2]", "double", 0.02).run(() => {
          scoreboard.players.get(posZ2.target, posZ2.objective.name);
        });
      });
  },
  {
    runEach: "50t",
  }
);
