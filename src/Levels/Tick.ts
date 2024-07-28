import { _, execute, MCFunction, Objective, raw, say } from "sandstone";
import { isStarted, levelCounterScore } from "../Gameplay/Tick";

MCFunction(
  "levels/tick",
  () => {
    _.if(_.and(isStarted.equalTo(1), levelCounterScore.matches([8, 10])), () => {
      raw(`fly enable @a`);
    });
  },
  {
    runEachTick: true,
    onConflict: "append",
  }
);
