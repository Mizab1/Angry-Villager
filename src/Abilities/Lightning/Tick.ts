import { MCFunction, Objective, Score, Selector, _, execute, loc, playsound, raw, rel, summon, tellraw } from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("ltng_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 100;

// ! Ticking function
export const lightningTick = MCFunction("ability/lightning/tick", () => {}, {
  runEachTick: true,
});

// * Functions
export const lightningLogic = MCFunction("ability/lightning/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:item.trident.thunder", "master", "@a", rel(0, 0, 0), 1, 0.5);
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .run(() => {
        raycast(
          "raycast/lightning/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/lightning/update", () => {
            raw(`particle dust 0.941 0.941 0.941 2 ^-1 ^-1 ^ 0.2 0.2 0.2 0 3 normal`);
          }),
          MCFunction("raycast/lightning/hit", () => {
            summonLightning();
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
export const lightningCooldownLogic = MCFunction("ability/lightning/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);

    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Lightning Bolt Ability is charged!", color: "dark_purple" });
    });
    // // ! Change the namespace
    // _.if(Selector("@s", { predicate: `angry_villager:${abilitiesNamesDict.lightning_ability}` }), () => {
    //   const itemModifier = ItemModifier(abilitiesNamesDict.lightning_ability, {
    //     function: "set_damage",
    //     damage: {
    //       type: "minecraft:score",
    //       target: "this",
    //       score: cooldownScore.objective.name,
    //       scale: 1 / COOL_DOWN_TIME,
    //     },
    //   });
    //   itemModifier.modify.entity(self, "weapon.mainhand");
    // });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const summonLightning = MCFunction("ability/lightning/summon_lightning", () => {
  // Summon lightning on the nearby entity
  summon("minecraft:lightning_bolt", rel(0, 0, 0), { Tags: ["lightning_bolt"] });
  execute.at(Selector("@e", { distance: [Infinity, 6] })).run(() => {
    summon("minecraft:lightning_bolt", rel(0, 0, 0), { Tags: ["lightning_bolt"] });
  });
});
