import {
  MCFunction,
  NBT,
  Objective,
  Score,
  Selector,
  TimeArgument,
  _,
  execute,
  fill,
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
import { spawnTrianglePattern } from "../../Gameplay/ParticlePattern/Spawn/Triangle";
import { self } from "../../Tick";
import { RunOnce } from "../../Utils/UtilFunctions";

// Global Variables
const cooldownScore: Score<string> = Objective.create("fr_stm_cdn", "dummy")("@s");
const fireStormLifeScore: Score<string> = Objective.create("fire_storm_life", "dummy")("@s");
const COOL_DOWN_TIME = 220;
const FIRE_STORM_LIFE = 360;
const DISPLAY_PATTERN_TIME: TimeArgument = "5s";

// ! Ticking function
export const fireStormTick = MCFunction(
  "ability/fire_storm/tick",
  () => {
    fireStormRunningLogic();
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const fireStormLogic = MCFunction("ability/fire_storm/logic", () => {
  _.if(cooldownScore.matches(COOL_DOWN_TIME), () => {
    playsound("minecraft:block.fire.extinguish", "master", "@a", rel(0, 0, 0), 1, 0.8);
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .run(() => {
        raycast(
          "raycast/fire_storm/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/fire_storm/update", () => {
            raw(`particle dust 0.788 0.765 0.063 2 ^-1 ^-1 ^ 0.2 0.2 0.2 0 3 normal`);
          }),
          MCFunction("raycast/fire_storm/hit", () => {
            execute.positioned(rel(0, 0.35, 0)).run(() => spawnTrianglePattern());
            execute.positioned(rel(0, 40, 0)).run(() => {
              spawnTrianglePattern();
              summonFireStorm();

              // Schedule the function to kill the particle
              schedule.function(() => {
                kill(Selector("@e", { type: "minecraft:armor_stand", tag: "triangle_pattern" }));
              }, DISPLAY_PATTERN_TIME);
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
export const fireStormCooldownLogic = MCFunction("ability/fire_storm/cooldown_logic", () => {
  _.if(cooldownScore.matches([Infinity, COOL_DOWN_TIME - 1]), () => {
    cooldownScore.add(1);

    // Give the feedback
    _.if(cooldownScore.matches(COOL_DOWN_TIME - 1), () => {
      tellraw(self, { text: "Firestorm Ability is charged!", color: "yellow" });
    });
  }).else(() => {
    cooldownScore.set(COOL_DOWN_TIME);
  });
});

const summonFireStorm = MCFunction("ability/fire_storm/summon_fire_storm", () => {
  // ! Use this with a positional offset
  summon("minecraft:zombified_piglin", rel(0, 0, 0), {
    Tags: ["fire_storm", "new_fire_storm"],
    PersistenceRequired: NBT.byte(1),
    CanPickUpLoot: NBT.byte(0),
    Health: NBT.float(999),
    ActiveEffects: [{ Id: 14, Amplifier: NBT.byte(1), Duration: 999999, ShowParticles: NBT.byte(0) }],
    Attributes: [{ Name: "generic.max_health", Base: 999 }],
  });
});
const fireStormRunningLogic = MCFunction("ability/fire_storm/fire_storm_running_logic", () => {
  execute
    .as(Selector("@e", { type: "minecraft:zombified_piglin", tag: ["fire_storm"] }))
    .at(self)
    .run(() => {
      // Set the tornado life
      new RunOnce(() => {
        fireStormLifeScore.set(FIRE_STORM_LIFE);
      });

      // Particle to be displayed as the tornado
      for (let i = 0; i < 30; i++) {
        particle(
          "minecraft:sweep_attack",
          rel(0, 0.5 + i * 1.3, 0),
          [(0.3 * i) / 2, 0.2, (0.3 * i) / 2],
          0,
          Math.round(i / 3),
          "force"
        );
        particle(
          "minecraft:flame",
          rel(0, 0.5 + i * 1.3, 0),
          [(0.5 * i) / 2, 0.2, (0.5 * i) / 2],
          0.15,
          Math.round(3 * (i / 8)),
          "force"
        );
        particle("minecraft:smoke", rel(0, 0.5 + i * 1.3, 0), [0.3 * i, 0.2, 0.3 * i], 0.5, Math.round(3 * (i / 10)), "force");
      }

      // Push entities
      _.if(fireStormLifeScore.moduloBy(10).matches(0), () => {
        fill(rel(-2, -2, -2), rel(2, 0, 2), "minecraft:fire replace #aestd1:air");
      });

      // Kill the tornado after the score is 0
      _.if(fireStormLifeScore.matches([0, Infinity]), () => {
        fireStormLifeScore.remove(1);
      }).else(() => {
        kill(self);
      });
    });
});
