import { abs, execute, MCFunction, playsound, raw, sleep, teleport, tellraw } from "sandstone";
import { self } from "../Tick";

export const endGame = MCFunction("levels/end_game", async () => {
  // Teleport to celebration room
  teleport("@a", abs(-140, -12, 153), abs(180, 0));

  await sleep("30t");

  // Send the message
  tellraw("@a", { text: "The world has become more religious now", color: "yellow" });
  execute.as("@a").at(self).run.playsound("minecraft:ui.toast.challenge_complete", "master", self);

  // Play the sound
  playsound("minecraft:music_disc.pigstep", "master", "@a", abs(-140, -12, 153));

  await sleep("30t");

  // Fireworks
  raw(
    `summon firework_rocket -144 -9 149 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
  raw(
    `summon firework_rocket -144 -9 154 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
  raw(
    `summon firework_rocket -136 -9 154 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
  raw(
    `summon firework_rocket -136 -9 149 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
});
