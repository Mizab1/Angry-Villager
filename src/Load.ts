import { MCFunction, execute, gamerule, raw } from "sandstone";

MCFunction(
  "load",
  () => {
    execute.as("@a").run.raw(`scale reset pehkui:base`);
    execute.as("@a").run.raw(`scale reset pehkui:entity_reach`);
    raw(`fly disable @a[gamemode=!creative]`);
    raw(`scale persist set pehkui:base true @a`);
    gamerule("doFireTick", false);
    gamerule("commandBlockOutput", false);
    gamerule("doImmediateRespawn", true);
  },
  {
    runOnLoad: true,
  }
);
