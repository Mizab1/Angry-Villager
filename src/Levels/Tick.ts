import { MCFunction } from "sandstone";

MCFunction("levels/tick", () => {}, {
  runEachTick: true,
  onConflict: "append",
});
