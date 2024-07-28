import { MCFunction, execute, raw, gamerule } from "sandstone";

MCFunction(
  "load",
  () => {
    execute.as("@a").run.raw(`scale reset`);
    raw(`scale persist set pehkui:base true @a`);
    gamerule("doFireTick", false);
    gamerule("commandBlockOutput", false);
    gamerule("doImmediateRespawn", true);
  },
  {
    runOnLoad: true,
  }
);
