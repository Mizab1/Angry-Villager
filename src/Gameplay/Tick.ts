import { effect, execute, MCFunction, Objective, raw, scoreboard, Selector } from "sandstone";
import { countEnemies } from "./EnemyCounter";

// Side scores for information
const gameScoreboard = Objective.create("game_scb", "dummy", { text: "Game", color: "gold" });
export const enemyCounterScore = gameScoreboard("Enemy:");
export const levelCounterScore = gameScoreboard("Level:");

// Trigger score for highlighting
const triggerHighlightScore = Objective.create("highlight", "trigger")("@s");
const enableHighlightTrigger = () => raw(`scoreboard players enable @a highlight`);

// Private Scoreboard
const gameplayPrivateScoreboard = Objective.create("pvt_gmply", "dummy");
export const isStarted = gameplayPrivateScoreboard("is_started");

MCFunction(
  "gameplay/load",
  () => {
    scoreboard.objectives.setDisplay("sidebar", gameScoreboard.name);
    enableHighlightTrigger();
  },
  {
    runOnLoad: true,
  }
);

MCFunction(
  "gameplay/tick",
  () => {
    countEnemies();
    highlightEnemies();
  },
  {
    runEachTick: true,
  }
);

const highlightEnemies = MCFunction("gameplay/highlight_enemies", () => {
  execute
    .as("@a")
    .if(triggerHighlightScore.greaterThan(0))
    .run(() => {
      effect.give(Selector("@e", { tag: "enemy" }), "minecraft:glowing", 6, 1, false);
      triggerHighlightScore.set(0);
      enableHighlightTrigger();
    });
});
