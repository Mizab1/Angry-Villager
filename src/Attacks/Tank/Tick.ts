import { Data, execute, loc, MCFunction, particle, raw, rel, scoreboard, Selector, summon, teleport } from "sandstone";
import { self } from "../../Tick";
import { posX1, posX2, posY1, posY2, posZ1, posZ2 } from "../Tick";

const firingDistance: number = 30;

export const tankTick = MCFunction("attacks/tank/tick", () => {
  // Stabilize the y axis of the tank
  execute
    .as(Selector("@e", { type: "minecraft:zombie", tag: "tank" }))
    .at(self)
    .run.teleport(self, rel(0, 0, 0), ["~", "0"]);
});

// Fire the tank
MCFunction(
  "attacks/tank/fire",
  () => {
    // Spawn the tank bullet
    execute
      .as(Selector("@e", { type: "minecraft:zombie", tag: "tank" }))
      .at(self)
      .anchored("eyes")
      .positioned(loc(0, 0, 4))
      .if(Selector("@a", { distance: [Infinity, firingDistance] }))
      .run(() => {
        particle("minecraft:cloud", rel(0, 0, 0), [0.5, 0.5, 0.5], 0.4, 5);
        summon("minecraft:tnt", rel(0, 0, 0), {
          Tags: ["tank_bullet"],
          Fuse: 40,
        });
      });

    // Fire the tank
    execute
      .as(Selector("@e", { type: "minecraft:tnt", tag: "tank_bullet" }))
      .at(self)
      .rotatedAs(Selector("@e", { type: "minecraft:zombie", tag: "tank", limit: 1, sort: "nearest" }))
      .run(() => {
        // Variable that stores the tank data
        const tankBulletData = Data("entity", "@s");

        // Store the initial position of the tank bullet
        posX1.set(tankBulletData.select("Pos[0]"), 1000);
        posY1.set(tankBulletData.select("Pos[1]"), 1000);
        posZ1.set(tankBulletData.select("Pos[2]"), 1000);

        // Teleport the tank bullet forward
        teleport(self, loc(0, 0, 0.1));

        // Store the final position of the tank bullet
        posX2.set(tankBulletData.select("Pos[0]"), 1000);
        posY2.set(tankBulletData.select("Pos[1]"), 1000);
        posZ2.set(tankBulletData.select("Pos[2]"), 1000);

        // Subtract the final position from the initial position
        posX2["-="](posX1);
        posY2["-="](posY1);
        posZ2["-="](posZ1);

        // Modify the motion data of the tank bullet to the new value
        execute.store.result.entity(self, "Motion[0]", "double", 0.015).run(() => {
          scoreboard.players.get(posX2.target, posX2.objective.name);
        });
        execute.store.result.entity(self, "Motion[1]", "double", 0.015).run(() => {
          scoreboard.players.get(posY2.target, posY2.objective.name);
        });
        execute.store.result.entity(self, "Motion[2]", "double", 0.015).run(() => {
          scoreboard.players.get(posZ2.target, posZ2.objective.name);
        });
      });
  },
  {
    runEach: "50t",
  }
);
