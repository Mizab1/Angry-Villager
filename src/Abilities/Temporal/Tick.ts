import { MCFunction, Objective, Score, Selector, _, effect, playsound, rel, tellraw } from "sandstone";
import { self } from "../../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("tempo_cdn", "dummy")("@s");
const COOL_DOWN_TIME = 160;
const FREEZE_FOR = 4;

// ! Ticking function
export const temporalTick = MCFunction("ability/temporal/tick", () => {}, {
  runEachTick: true,
});

// * Functions
export const temporalLogic = MCFunction("ability/temporal/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:item.trident.thunder", "master", "@a", rel(0, 0, 0), 1, 0.2);

    effect.give(Selector("@e", { tag: "enemy" }), "minecraft:slowness", FREEZE_FOR, 100);
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});
export const temporalCooldownLogic = MCFunction("ability/temporal/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Stop Time Ability is charged!", color: "dark_purple" });
    });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});
