import { execute, loc, MCFunction, raw, Selector } from "sandstone";
import { raycast } from "sandstone-raycast";
import { isTemporalOngoing } from "../../Gameplay/Tick";
import { self } from "../../Tick";

// Constants to configure the robot
const firingDistance: number = 30;

MCFunction(
  "attacks/robot/fire",
  () => {
    // Shoot laser
    execute
      .as(Selector("@e", { type: "minecraft:zombie", tag: "robot" }))
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
    runEach: "60t",
  }
);

const shootLaserRaycast = () => {
  raycast(
    "raycast/robot/main",
    // @ts-ignore
    "#aestd1:passthrough",
    null,
    MCFunction("raycast/robot/update", () => {
      raw(`particle dust 1 1 1 1 ^-0.6 ^ ^ 0 0 0 0 3 normal`);
      execute.as(Selector("@a", { distance: [Infinity, 3] })).run(() => {
        raw(`damage @s 2 minecraft:magic`);
      });
    }),
    MCFunction("raycast/robot/hit", () => {}),
    0.5,
    firingDistance
  );
};
