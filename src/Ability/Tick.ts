import { MCFunction, Objective, Score, _, execute } from "sandstone";
import { self } from "../Tick";
import { meteorCooldownLogic, meteorLogic, meteorTick } from "./Meteor/Tick";
import { runAbility } from "./Private/RunAbility";
import { tornadoCooldownLogic, tornadoLogic, tornadoTick } from "./Tornado/Tick";
import { lightningCooldownLogic, lightningLogic, lightningTick } from "./Lightning/Tick";

// Global Variable
const selfRightClickCAOS: Score<string> = Objective.create(
  "right_click_caos",
  "minecraft.used:minecraft.carrot_on_a_stick"
)("@s");

// * Dictionary fr names of abilities
export const abilitiesNamesDict = {
  meteorAbility: "meteor_ability",
  tornado_ability: "tornado_ability",
  lightning_ability: "lightning_ability",
};

// Functions
const checkUsedAbility = MCFunction("ability/check_used", () => {
  execute
    .as("@a")
    .at(self)
    .run(() => {
      // Cooldown logic
      meteorCooldownLogic();
      tornadoCooldownLogic();
      lightningCooldownLogic();

      // Check which ability was used
      _.if(selfRightClickCAOS.greaterThan(0), () => {
        // Run the ability logic according to the item
        runAbility(abilitiesNamesDict.meteorAbility, () => {
          meteorLogic();
        });
        runAbility(abilitiesNamesDict.tornado_ability, () => {
          tornadoLogic();
        });
        runAbility(abilitiesNamesDict.lightning_ability, () => {
          lightningLogic();
        });

        // Reset the COAS score
        selfRightClickCAOS.set(0);
      });
    });
});

// ! Ticking Function
const Tick = MCFunction(
  "ability/tick",
  () => {
    // Check the used ability
    checkUsedAbility();

    // Ability specific functions
    meteorTick();
    tornadoTick();
    lightningTick();
  },
  {
    runEachTick: true,
  }
);
