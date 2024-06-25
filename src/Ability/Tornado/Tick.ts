import {
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
  tag,
  title,
} from "sandstone";
import { raycast } from "sandstone-raycast";
import { self } from "../../Tick";
import { abilitiesNamesDict } from "../Tick";

// Global Variables
const cooldownScore: Score<string> = Objective.create("tornado_cooldown", "dummy")("@s");
const tornadoLifeScore: Score<string> = Objective.create("tornado_life", "dummy")("@s");

const TORNADO_LIFE = 240;

// ! Ticking function
export const tornadoTick = MCFunction(
  "ability/tornado/tick",
  () => {
    tornadoCooldownLogic();
    tornadoRunningLogic();
  },
  {
    runEachTick: true,
  }
);

// * Functions
export const tornadoLogic = MCFunction("ability/tornado/logic", () => {
  _.if(cooldownScore.matches(0), () => {
    playsound("minecraft:item.trident.thunder", "master", "@a", rel(0, 0, 0), 1, 0.8);
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 1))
      .run(() => {
        raycast(
          "raycast/tornado/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/tornado/update", () => {}),
          MCFunction("raycast/tornado/hit", () => {
            execute.positioned(rel(0, 40, 0)).run(() => {
              summonTornado();
              // Add a life to the tornado
              execute.as(Selector("@e", { tag: "new_tornado" })).run(() => {
                tornadoLifeScore.set(TORNADO_LIFE);
                tag(self).remove("new_tornado");
              });
            });
            // Add a cooldown
            cooldownScore.set(300);
          }),
          1,
          60
        );
      });
  });
});
const tornadoCooldownLogic = MCFunction("ability/tornado/cooldown_logic", () => {
  execute
    .as("@a")
    .at(self)
    .run(() => {
      _.if(_.not(cooldownScore.matches([Infinity, 0])), () => {
        cooldownScore.remove(1);
        // ! Change the namespace
        _.if(Selector("@s", { predicate: `angry_villager:${abilitiesNamesDict.tornado_ability}` }), () => {
          title(self).actionbar([{ text: "Reloading.. ", color: "red" }, cooldownScore]);
        }).else(() => {
          title(self).actionbar({ text: "" });
        });
      }).else(() => {
        cooldownScore.set(0);
      });
    });
});

const summonTornado = MCFunction("ability/tornado/summon_tornado", () => {
  // ! Use this with a positional offset
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    Invisible: NBT.byte(1),
    Tags: ["tornado", "new_tornado"],
  });
});
const tornadoRunningLogic = MCFunction("ability/tornado/tornado_running_logic", () => {
  execute
    .as(Selector("@e", { tag: ["tornado"] }))
    .at(self)
    .run(() => {
      // Particle to be displayed as the tornado
      for (let i = 0; i < 20; i++) {
        particle(
          "minecraft:sweep_attack",
          rel(0, 0.5 + i * 1.3, 0),
          [(0.3 * i) / 2, 0.2, (0.3 * i) / 2],
          0,
          Math.round(3 * (i / 3)),
          "force"
        );
      }

      // Push entities
      _.if(tornadoLifeScore.moduloBy(10).matches(0), () => {
        summon("minecraft:creeper", rel(0, 0, 0), {
          ExplosionRadius: NBT.byte(-3),
          Fuse: 1,
          ignited: NBT.byte(1),
        });
      });

      // Kill the tornado after the score is 0
      _.if(tornadoLifeScore.matches([0, Infinity]), () => {
        tornadoLifeScore.remove(1);
      }).else(() => {
        kill(self);
      });
    });
});
