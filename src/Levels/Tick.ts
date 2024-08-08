import { _, MCFunction, raw } from "sandstone";
import { isStarted, levelCounterScore } from "../Gameplay/Tick";

MCFunction("levels/tick", () => {}, {
  runEachTick: true,
  onConflict: "append",
});

MCFunction("levels/give_effect_tick", () => {}, {
  runEachTick: true,
  onConflict: "append",
});

MCFunction(
  "levels/enable_flying",
  () => {
    _.if(_.and(isStarted.equalTo(1), levelCounterScore.matches([8, 10])), () => {
      raw(`fly enable @a`);
    });
  },
  {
    runEach: "10t",
  }
);
