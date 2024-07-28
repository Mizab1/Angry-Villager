import { MCFunction, execute, raw, gamerule } from "sandstone";

MCFunction(
  "load",
  () => {
    execute.as("@a").run.raw(`scale reset pehkui:base`);
    execute.as("@a").run.raw(`scale reset pehkui:entity_reach`);
    raw(`fly disable @a`);
    raw(`scale persist set pehkui:base true @a`);
    gamerule("doFireTick", false);
    gamerule("commandBlockOutput", false);
    gamerule("doImmediateRespawn", true);
  },
  {
    runOnLoad: true,
  }
);
