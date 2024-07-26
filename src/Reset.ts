import { MCFunction } from "sandstone";
import { enemyCounterScore, waveCounterScore } from "./Gameplay/Tick";

MCFunction("reset_side_score", () => {
  enemyCounterScore.set(0);
  waveCounterScore.set(0);
});
