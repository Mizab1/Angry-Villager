import { _, effect, execute, kill, MCFunction, Objective, raw, scoreboard, Selector, tellraw } from "sandstone";
import { countEnemies } from "./EnemyCounter";

// Side scores for information
const gameScoreboard = Objective.create("game_scb", "dummy", { text: "Game", color: "gold" });
export const enemyCounterScore = gameScoreboard("Enemy:");
export const levelCounterScore = gameScoreboard("Level:");

// Private Scoreboard
const gameplayPrivateScoreboard = Objective.create("pvt_gmply", "dummy");
export const isStarted = gameplayPrivateScoreboard("is_started");
export const isTemporalOngoing = gameplayPrivateScoreboard("is_temporal_ongoing");

MCFunction(
  "gameplay/load",
  () => {
    scoreboard.objectives.setDisplay("sidebar", gameScoreboard.name);
  },
  {
    runOnLoad: true,
  }
);

MCFunction(
  "gameplay/tick",
  () => {
    countEnemies();
    execute.if(isTemporalOngoing.equalTo(1)).run(() => {
      kill(Selector("@e", { type: "minecraft:armor_stand", tag: "missile" }));
      kill(Selector("@e", { type: "minecraft:tnt" }));
      kill(Selector("@e", { type: "minecraft:arrow" }));
      kill(Selector("@e", { type: "minecraft:armor_stand", tag: "tfcp_proj" }));
    });
  },
  {
    runEachTick: true,
  }
);

MCFunction(
  "gameplay/highlight_enemies",
  () => {
    _.if(isStarted.equalTo(1), () => {
      effect.give(Selector("@e", { tag: "enemy" }), "minecraft:glowing", 6, 1, false);
      tellraw("@a", { text: "All enemies are highlighted", color: "red" });
    });
  },
  {
    runEach: "60s",
  }
);
