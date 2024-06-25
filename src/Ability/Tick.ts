import { MCFunction, Objective, Score, _, execute } from "sandstone";
import { self } from "../Tick";
import { meteorLogic, meteorTick } from "./Meteor/Tick";
import { runAbility } from "./Private/RunAbility";

// Global Variable
const selfRightClickCAOS: Score<string> = Objective.create(
  "right_click_caos",
  "minecraft.used:minecraft.carrot_on_a_stick"
)("@s");

// * Dictionary fr names of abilities
export const abilitiesNamesDict = {
  meteorAbility: "meteor_ability",
};

// Functions
const checkUsedAbility = MCFunction("ability/check_used", () => {
  execute
    .as("@a")
    .at(self)
    .run(() => {
      _.if(selfRightClickCAOS.greaterThan(0), () => {
        // Run the ability logic according to the item
        runAbility(abilitiesNamesDict.meteorAbility, "meteor_ability", () => {
          meteorLogic();
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
  },
  {
    runEachTick: true,
  }
);
