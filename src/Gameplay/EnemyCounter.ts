import { execute, MCFunction, Selector } from "sandstone";
import { enemyCounterScore } from "./Tick";

export const countEnemies = MCFunction("gameplay/enemy_counter", () => {
  enemyCounterScore.set(0);
  execute.as(Selector("@e", { tag: "enemy" })).run(() => {
    enemyCounterScore.add(1);
  });
});
