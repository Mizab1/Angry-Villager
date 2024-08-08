import {
  MCFunction,
  NBT,
  Objective,
  Score,
  Selector,
  TimeArgument,
  _,
  execute,
  kill,
  loc,
  particle,
  playsound,
  raw,
  rel,
  schedule,
  summon,
  tellraw,
} from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";
import { spawnHexagonPattern } from "../../Gameplay/ParticlePattern/Spawn/Hexagon";

// Global Variables
const cooldownScore: Score<string> = Objective.create("meteor_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 80;
const DISPLAY_PATTERN_TIME: TimeArgument = "2s";

// ! Ticking function
export const meteorTick = MCFunction(
  "ability/meteor/tick",
  () => {
    fallingMeteorLogic();
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const meteorLogic = MCFunction("ability/meteor/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:item.totem.use", "master", "@a", rel(0, 0, 0), 1, 0.5);
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .run(() => {
        raycast(
          "raycast/meteor/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/meteor/update", () => {
            raw(`particle dust 0.412 0.431 0.404 2 ^-1 ^-1 ^ 0.2 0.2 0.2 0 3 normal`);
          }),
          MCFunction("raycast/meteor/hit", () => {
            execute.positioned(rel(0, 0.35, 0)).run(() => spawnHexagonPattern());

            execute.positioned(rel(0, 40, 0)).run(() => {
              spawnHexagonPattern();
              summonMeteor();
            });
            // Add a cooldown
            cooldownScore.set(0);

            // Schedule the function to kill the particle
            schedule.function(() => {
              kill(Selector("@e", { type: "minecraft:armor_stand", tag: "hexagon_pattern" }));
            }, DISPLAY_PATTERN_TIME);
          }),
          1,
          60
        );
      });
  }).else(() => {
    playsound("minecraft:block.anvil.land", "master", self, rel(0, 0, 0), 0.6, 1.5);
  });
});

export const meteorCooldownLogic = MCFunction("ability/meteor/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);

    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Meteor Ability is charged!", color: "green" });
    });
    // // ! Change the namespace
    // _.if(Selector("@s", { predicate: `angry_villager:${abilitiesNamesDict.meteorAbility}` }), () => {
    //   const itemModifier = ItemModifier(abilitiesNamesDict.meteorAbility, {
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

const summonMeteor = MCFunction("ability/meteor/summon_meteor", () => {
  // ! Use this with a positional offset
  execute.align("xyz").run.summon("minecraft:armor_stand", rel(-0.5, 0, -0.5), {
    Invisible: NBT.byte(1),
    Tags: ["falling_meteor"],
    ArmorItems: [{}, {}, {}, { id: "minecraft:wooden_hoe", Count: NBT.byte(1), tag: { CustomModelData: 100001 } }],
  });
});

const fallingMeteorLogic = MCFunction("ability/meteor/meteor_explode", () => {
  execute
    .as(Selector("@e", { type: "armor_stand", tag: ["falling_meteor"] }))
    .at(self)
    .run(() => {
      // If the meteor if in the air, display the particles
      particle("minecraft:flame", rel(0, 6, 0), [0.5, 0.5, 0.5], 0.1, 6, "force");
      particle("minecraft:campfire_cosy_smoke", rel(0, 6, 0), [0.5, 0.5, 0.5], 0.05, 3, "force");

      // Check if the armor stand/ Meteor is on the ground
      _.if(_.not(_.block(rel(0, -0.5, 0), "#aestd1:air")), () => {
        // Create a impact explosion
        summon("minecraft:creeper", rel(0, 0, 0), {
          ExplosionRadius: NBT.byte(4),
          Fuse: 0,
          ignited: NBT.byte(1),
        });
        // Kill the armor stand
        kill(self);
      });
    });
});
