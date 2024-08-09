import { bossbar, MCFunction } from "sandstone";
import { enemyCounterScore, levelCounterScore } from "./Gameplay/Tick";
import { bossbarName } from "./Gameplay/DivinityBar";

MCFunction("reset", () => {
  enemyCounterScore.set(0);
  levelCounterScore.set(0);

  //@ts-ignore
  bossbar.set(bossbarName).visible(false);
});
