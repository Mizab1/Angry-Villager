import {
  MCFunction,
  Objective,
  Score,
  Selector,
  _,
  effect,
  execute,
  particle,
  playsound,
  rel,
  schedule,
  tag,
  tellraw,
} from "sandstone";
import { self } from "../../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("healing_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 140;
const EFFECT_LAST_FOR = 4;
const HEAL_THIS_TAG = "heal_this";

// ! Ticking function
export const healingLightTick = MCFunction(
  "ability/healing_light/tick",
  () => {
    execute.at(Selector("@a", { tag: HEAL_THIS_TAG })).run(() => {
      particle("minecraft:flash", rel(0, 0, 0), [2, 2, 2], 0, 2, "normal");
    });
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const healingLightLogic = MCFunction("ability/healing_light/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    // Play the sound at the position of the player
    playsound("minecraft:item.trident.return", "master", "@a", rel(0, 0, 0), 1, 0.2);
    executeHealingEffect();
    cooldownScore.set(0);
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});
export const healingLightCooldownLogic = MCFunction("ability/healing_light/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);

    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Healing Light Ability is charged!", color: "dark_aqua" });
    });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const executeHealingEffect = MCFunction("ability/healing_light/execute_healing_effect", () => {
  // Add a tag so it can be targeted later
  tag(self).add(HEAL_THIS_TAG);

  // Apply the healing effect
  effect.give(self, "minecraft:regeneration", EFFECT_LAST_FOR, 4);

  // Delete the appointed tag after some time
  schedule.function(() => {
    execute.as(Selector("@a", { tag: HEAL_THIS_TAG })).run(() => {
      tag(self).remove(HEAL_THIS_TAG);
    });
  }, `${EFFECT_LAST_FOR}s`);
});
