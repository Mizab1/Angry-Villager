import {
  MCFunction,
  NBT,
  Objective,
  Score,
  Selector,
  _,
  execute,
  kill,
  loc,
  particle,
  playsound,
  raw,
  rel,
  summon,
} from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";
import { setScreenShakeTimer, shakeScreen } from "../../Utils/ScreenShake";
import { runAfter } from "../../Utils/UtilFunctions";

// Global Variables
const cooldownScore: Score<string> = Objective.create("erthqk_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 150;
const SCREEN_SHAKE_TIMER = 80;

// ! Ticking function
export const earthquakeTick = MCFunction(
  "ability/earthquake/tick",
  () => {
    execute.if(Selector("@e", { type: "minecraft:armor_stand", tag: "earthquake_as" })).run(() => {
      execute
        .at(Selector("@e", { type: "minecraft:armor_stand", tag: "earthquake_as" }))
        .run.particle("minecraft:block", "minecraft:dirt", rel(0, 0.35, 0), [2, 2, 2], 0.5, 10, "force");
      execute
        .as("@a")
        .at(self)
        .run(() => {
          shakeScreen(SCREEN_SHAKE_TIMER, [2, 2]);
        });
    });
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const earthquakeLogic = MCFunction("ability/earthquake/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:entity.ender_dragon.growl", "master", "@a", rel(0, 0, 0), 1, 0.5);
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .run(() => {
        raycast(
          "raycast/earthquake/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/earthquake/update", () => {
            raw(`particle dust 0.588 0.549 0.294 2 ^-1 ^-1 ^ 0.2 0.2 0.2 0 3 normal`);
          }),
          MCFunction("raycast/earthquake/hit", () => {
            summonEarthquake();
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
export const earthquakeCooldownLogic = MCFunction("ability/earthquake/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const summonEarthquake = MCFunction("ability/earthquake/summon_earthquake", () => {
  // Create the earthquake marker
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    Marker: NBT.byte(1),
    Tags: ["earthquake_as"],
  });

  // Play the sound
  playsound("minecraft:entity.ender_dragon.growl", "master", "@a", rel(0, 0, 0), 1, 0.1);

  // Set the timer for screen shake
  setScreenShakeTimer(SCREEN_SHAKE_TIMER);

  // Delegate the function
  new runAfter(
    Selector("@e", { type: "minecraft:armor_stand", tag: "earthquake_as" }),
    () => {
      for (let i = -2; i <= 2; i++) {
        execute.positioned(rel(i, 0, i)).run.fill(rel(2, 1, 0), rel(-1, -2, 0), "minecraft:air");
      }

      // Play the sound
      playsound("minecraft:entity.ender_dragon.growl", "master", "@a", rel(0, 0, 0), 1, 0.1);

      // Kill the armor stand
      kill(self);
    },
    "3s"
  );
});
