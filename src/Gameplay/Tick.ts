import { MCFunction, Objective, scoreboard } from "sandstone";
import { countEnemies } from "./EnemyCounter";

const gameScoreboard = Objective.create("game_scb", "dummy", { text: "Game", color: "gold" });
export const enemyCounterScore = gameScoreboard("Wave:");

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
