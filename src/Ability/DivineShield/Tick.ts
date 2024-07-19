import {
  MCFunction,
  Objective,
  Score,
  Selector,
  _,
  effect,
  execute,
  kill,
  particle,
  playsound,
  rel,
  say,
  schedule,
  tag,
} from "sandstone";
import { self } from "../../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("divine_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 160;
const PROTECT_THIS = "protect_this";
const PROTECT_DURATION = 4;
const SPHERE_RADIUS = 5;

// ! Ticking function
export const divineShieldTick = MCFunction(
  "ability/divine_shield/tick",
  () => {
    execute.at(Selector("@a", { tag: PROTECT_THIS })).run(() => {
      // Display the sphere around the player
      for (let theta = 0; theta <= 20; theta++) {
        for (let phi = 0; phi <= 20; phi++) {
          // @ts-ignore
          particle(
            "minecraft:dust",
            [1.0, 1.0, 1.0],
            1,
            rel(
              parseFloat((SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi)).toFixed(4)),
              parseFloat((SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi)).toFixed(4)),
              parseFloat((SPHERE_RADIUS * Math.cos(phi)).toFixed(4))
            ),
            [0.3, 0.3, 0.3],
            0,
            1,
            "normal"
          );
        }
      }

      // Kill or deflect all the attacks from the player
      kill(Selector("@e", { type: "#aestd1:projectiles", distance: [Infinity, SPHERE_RADIUS + 1] }));
    });
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const divineShieldLogic = MCFunction("ability/divine_shield/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    // Play the sound at the player's position
    playsound("minecraft:block.beacon.activate", "master", "@a", rel(0, 0, 0), 1, 1.3);
    executeDivineShield();
    cooldownScore.set(0);
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});
export const divineShieldCooldownLogic = MCFunction("ability/divine_shield/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const executeDivineShield = MCFunction("ability/divine_shield/execute_divine_shield", () => {
  // Add a tag so it can be targeted later
  tag(self).add(PROTECT_THIS);

  // Delete the appointed tag after some time
  schedule.function(() => {
    execute.as(Selector("@a", { tag: PROTECT_THIS })).run(() => {
      tag(self).remove(PROTECT_THIS);
    });
  }, `${PROTECT_DURATION}s`);
});
