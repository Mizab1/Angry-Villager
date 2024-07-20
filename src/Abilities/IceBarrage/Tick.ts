import {
  MCFunction,
  NBT,
  Objective,
  Score,
  Selector,
  _,
  effect,
  execute,
  loc,
  particle,
  playsound,
  raw,
  rel,
  schedule,
  summon,
} from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";
import { randomIntFromInterval } from "../../Utils/UtilFunctions";

// Global Variables
const cooldownScore: Score<string> = Objective.create("ice_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 120;
const ICE_BARRAGE_AFFECTED_TAG: string = "ice_barrage_affected";

// ! Ticking function
export const iceBarrageTick = MCFunction(
  "ability/ice_barrage/tick",
  () => {
    execute
      .as(Selector("@e", { tag: ICE_BARRAGE_AFFECTED_TAG }))
      .at(self)
      .run(() => {
        particle("minecraft:snowflake", rel(0, 0, 0), [0.2, 0.2, 0.2], 0.1, 3, "force");
        effect.give(self, "minecraft:slowness", 2, 100, true);
      });
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const iceBarrageLogic = MCFunction("ability/ice_barrage/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:block.amethyst_block.place", "master", "@a", rel(0, 0, 0), 1, 0.1);
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .run(() => {
        raycast(
          "raycast/ice_barrage/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/ice_barrage/update", () => {
            raw(`particle dust 0.302 0.698 1.000 2 ^-1 ^-1 ^ 0.2 0.2 0.2 0 3 normal`);
          }),
          MCFunction("raycast/ice_barrage/hit", () => {
            executeIceBarrage();
            // Add a cooldown
            cooldownScore.set(0);
          }),
          1,
          60
        );
      });
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});
export const iceBarrageCooldownLogic = MCFunction("ability/ice_barrage/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const executeIceBarrage = MCFunction("ability/ice_barrage/execute_ice_barrage", () => {
  // Create the ice barrage marker
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    Marker: NBT.byte(1),
    Tags: ["ice_barrage_as"],
  });

  // Create a 3x3 falling ice model
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      summon("minecraft:falling_block", rel(i, 5 + parseFloat(Math.random().toFixed(2)), j), {
        BlockState: { Name: "minecraft:snow", Properties: { layers: `${randomIntFromInterval(1, 4)}` } },
        Time: 1,
        DropItem: NBT.byte(0),
        HurtEntities: NBT.byte(1),
      });
    }
  }
  particle("minecraft:snowflake", rel(0, 5, 0), [1, 3, 1], 0, 500, "force");

  // Play the sound
  playsound("minecraft:block.snow.hit", "master", "@a", rel(0, 0, 0), 1, 0.5);

  // Give the tag to the entities for the freezing effect and particle
  execute
    .as(Selector("@e", { type: "#aestd1:mobs", distance: [Infinity, 8] }))
    .at(self)
    .run.tag(self)
    .add(ICE_BARRAGE_AFFECTED_TAG);
  schedule.function(() => {
    execute
      .as(Selector("@e", { tag: ICE_BARRAGE_AFFECTED_TAG }))
      .run.tag(self)
      .remove(ICE_BARRAGE_AFFECTED_TAG);
  }, "6s");
});
