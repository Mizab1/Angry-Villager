import {
  ItemModifier,
  MCFunction,
  NBT,
  Objective,
  Score,
  Selector,
  _,
  execute,
  kill,
  loc,
  particle,
  playsound,
  rel,
  summon,
} from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";
import { abilitiesNamesDict } from "../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("meteor_cooldown", "dummy")("@s");
const COOL_DOWN_TIME = 60;

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
          MCFunction("raycast/meteor/update", () => {}),
          MCFunction("raycast/meteor/hit", () => {
            execute.positioned(rel(0, 40, 0)).run(() => {
              summonMeteor();
            });
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

export const meteorCooldownLogic = MCFunction("ability/meteor/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);
    // ! Change the namespace
    _.if(Selector("@s", { predicate: `angry_villager:${abilitiesNamesDict.meteorAbility}` }), () => {
      const itemModifier = ItemModifier(abilitiesNamesDict.meteorAbility, {
        function: "set_damage",
        damage: {
          type: "minecraft:score",
          target: "this",
          score: cooldownScore.objective.name,
          scale: 1 / COOL_DOWN_TIME,
        },
      });
      itemModifier.modify.entity(self, "weapon.mainhand");
    });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const summonMeteor = MCFunction("ability/meteor/summon_meteor", () => {
  // ! Use this with a positional offset
  summon("minecraft:armor_stand", rel(0, 0, 0), {
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
      execute.unless.block(rel(0, -0.35, 0), "#aestd1:air").run(() => {
        // Create a impact explosion
        summon("minecraft:creeper", rel(0, 0, 0), {
          ExplosionRadius: NBT.byte(2),
          Fuse: 0,
          ignited: NBT.byte(1),
        });
        // Kill the armor stand
        kill(self);
      });
    });
});
