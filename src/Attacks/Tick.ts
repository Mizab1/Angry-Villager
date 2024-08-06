import { execute, MCFunction, Objective, rel, Selector, teleport } from "sandstone";
import { self } from "../Tick";
import { rotatingAxeTick } from "./RotatingAxe/Tick";
import { tankTick } from "./Tank/Tick";

// Create scores for storing the position
export const posX1 = Objective.create("pos_x1", "dummy")("@s");
export const posY1 = Objective.create("pos_y1", "dummy")("@s");
export const posZ1 = Objective.create("pos_z1", "dummy")("@s");

export const posX2 = Objective.create("pos_x2", "dummy")("@s");
export const posY2 = Objective.create("pos_y2", "dummy")("@s");
export const posZ2 = Objective.create("pos_z2", "dummy")("@s");

MCFunction(
  "attacks/tick",
  () => {
    // Tick function for rotating axe
    rotatingAxeTick();

    // Run the tick function for tanks
    tankTick();

    // Rotate the entities that have rotate tag
    execute
      .as(Selector("@e", { type: "#internal:rotating_entities", tag: "rotate" }))
      .at(self)
      .run(() => {
        teleport(self, rel(0, 0, 0), rel(-40, 0));
      });
  },
  {
    runEachTick: true,
  }
);
