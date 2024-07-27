import { MCFunction, Objective, Score, _, execute } from "sandstone";
import { self } from "../Tick";
import { divineShieldCooldownLogic, divineShieldLogic, divineShieldTick } from "./DivineShield/Tick";
import { earthquakeCooldownLogic, earthquakeLogic, earthquakeTick } from "./Earthquake/Tick";
import { fireStormCooldownLogic, fireStormLogic, fireStormTick } from "./FireStorm/Tick";
import { healingLightCooldownLogic, healingLightLogic, healingLightTick } from "./HealingLight/Tick";
import { iceBarrageCooldownLogic, iceBarrageLogic, iceBarrageTick } from "./IceBarrage/Tick";
import { lightningCooldownLogic, lightningLogic, lightningTick } from "./Lightning/Tick";
import { meteorCooldownLogic, meteorLogic, meteorTick } from "./Meteor/Tick";
import { runAbility } from "./Private/RunAbility";
import { tornadoCooldownLogic, tornadoLogic, tornadoTick } from "./Tornado/Tick";

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
  earthquake_ability: "earthquake_ability",
  fire_storm_ability: "fire_storm_ability",
  ice_barrage_ability: "ice_barrage_ability",
  healing_light_ability: "healing_light_ability",
  divine_shield_ability: "divine_shield_ability",
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
      earthquakeCooldownLogic();
      fireStormCooldownLogic();
      iceBarrageCooldownLogic();
      healingLightCooldownLogic();
      divineShieldCooldownLogic();

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
        runAbility(abilitiesNamesDict.earthquake_ability, () => {
          earthquakeLogic();
        });
        runAbility(abilitiesNamesDict.fire_storm_ability, () => {
          fireStormLogic();
        });
        runAbility(abilitiesNamesDict.ice_barrage_ability, () => {
          iceBarrageLogic();
        });
        runAbility(abilitiesNamesDict.healing_light_ability, () => {
          healingLightLogic();
        });
        runAbility(abilitiesNamesDict.divine_shield_ability, () => {
          divineShieldLogic();
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
    earthquakeTick();
    fireStormTick();
    iceBarrageTick();
    healingLightTick();
    divineShieldTick();
  },
  {
    runEachTick: true,
  }
);
