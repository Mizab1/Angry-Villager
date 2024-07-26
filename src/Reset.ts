import { MCFunction } from "sandstone";
import { enemyCounterScore, levelCounterScore } from "./Gameplay/Tick";

MCFunction("reset_side_score", () => {
  enemyCounterScore.set(0);
  levelCounterScore.set(0);
});
