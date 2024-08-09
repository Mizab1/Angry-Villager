import { MCFunction, Objective, Score, Selector, _, effect, playsound, rel, schedule, tellraw } from "sandstone";
import { isTemporalOngoing } from "../../Gameplay/Tick";
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
    playsound("minecraft:item.totem.use", "master", self);

    effect.give(Selector("@e", { tag: "enemy" }), "minecraft:slowness", FREEZE_FOR, 100);
    isTemporalOngoing.set(1);

    cooldownScore.set(0);

    schedule.function(() => {
      isTemporalOngoing.set(0);
    }, FREEZE_FOR + "s");
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});
export const temporalCooldownLogic = MCFunction("ability/temporal/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Stop Time Ability is charged!", color: "dark_green" });
    });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});
