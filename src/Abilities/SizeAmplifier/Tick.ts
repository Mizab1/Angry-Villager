import { MCFunction, Objective, Score, _, effect, playsound, raw, rel, schedule, tellraw } from "sandstone";
import { self } from "../../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("size_cdn", "dummy")("@s");
const COOL_DOWN_TIME = 200;
const DURATION = 5;

// ! Ticking function
export const sizeAmplifierTick = MCFunction("ability/size_amplifier/tick", () => {}, {
  runEachTick: true,
});

// * Functions
export const sizeAmplifierLogic = MCFunction("ability/size_amplifier/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:item.trident.thunder", "master", self, rel(0, 0, 0), 1, 0.4);

    // Increase size
    // ! MOD USED
    raw(`scale set pehkui:entity_reach 15 @a`);
    raw(`scale set pehkui:base 2 @a`);

    // Apply effect
    effect.give("@a", "minecraft:strength", DURATION, 5, true);

    // Set the cooldown
    cooldownScore.set(0);

    schedule.function(() => {
      // Revert the size
      // ! MOD USED
      raw(`scale set pehkui:base 1 @a`);
      raw(`scale reset pehkui:entity_reach @a`);
    }, DURATION + "s");
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});
export const sizeAmplifierCooldownLogic = MCFunction("ability/size_amplifier/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Size Amplifier Ability is charged!", color: "gold" });
    });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});
