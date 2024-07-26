import { MCFunction, Objective, scoreboard } from "sandstone";
import { countEnemies } from "./EnemyCounter";

// Side scores for information
const gameScoreboard = Objective.create("game_scb", "dummy", { text: "Game", color: "gold" });
export const enemyCounterScore = gameScoreboard("Enemy:");
export const levelCounterScore = gameScoreboard("Level:");

// Private Scoreboard
const gameplayPrivateScoreboard = Objective.create("pvt_gmply", "dummy");
export const isStarted = gameplayPrivateScoreboard("is_started");

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
  },
  {
    runEachTick: true,
  }
);
