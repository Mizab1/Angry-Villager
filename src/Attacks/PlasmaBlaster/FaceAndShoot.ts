import { execute, loc, MCFunction, raw, rel, Selector, teleport } from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";
import { isTemporalOngoing } from "../../Gameplay/Tick";

// Constants to configure the blaster
const firingDistance: number = 30;
const activationDistance: number = 40;

MCFunction(
  "attacks/plasma_blaster/face",
  () => {
    execute
      .as(Selector("@e", { type: "minecraft:zombie", tag: "plasma_blaster" }))
      .at(self)
      .run(() => {
        // Kill the blaster if there is no ground
        execute.if.block(rel(0, -0.35, 0), "#aestd1:air").run.kill(self);

        // Face the blaster to the nearest player
        execute
          .facingEntity(Selector("@a", { distance: [Infinity, activationDistance], limit: 1, sort: "nearest" }), "feet")
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
  "attacks/plasma_blaster/fire",
  () => {
    // Spawn the laser
    execute
      .as(Selector("@e", { type: "minecraft:zombie", tag: "plasma_blaster" }))
      .at(self)
      .if(isTemporalOngoing.equalTo(0))
      .if(Selector("@a", { distance: [Infinity, firingDistance] }))
      .anchored("eyes")
      .run(() => {
        execute.positioned(loc(0, 0, 1)).run(() => {
          shootLaserRaycast();
        });
      });
  },
  {
    runEach: "50t",
  }
);

const shootLaserRaycast = () => {
  raycast(
    "raycast/plasma_blaster/main",
    // @ts-ignore
    "#aestd1:passthrough",
    null,
    MCFunction("raycast/plasma_blaster/update", () => {
      raw(`particle dust 0.239 0.392 1.000 1 ^0.8 ^ ^ 0 0 0 0 3 normal`);
      raw(`particle dust 0.239 0.392 1.000 1 ^-0.8 ^ ^ 0 0 0 0 3 normal`);
      execute.as(Selector("@a", { distance: [Infinity, 2] })).run(() => {
        raw(`damage @s 4 minecraft:magic`);
      });
    }),
    MCFunction("raycast/plasma_blaster/hit", () => {}),
    0.5,
    firingDistance
  );
};
