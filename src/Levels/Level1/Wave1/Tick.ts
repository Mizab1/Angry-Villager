import {
  _,
  abs,
  clear,
  execute,
  give,
  item,
  MCFunction,
  playsound,
  schedule,
  sleep,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { summonNormalPillager } from "../../../Enemies/SummonNormalPillager";
import { summonNormalVindicator } from "../../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, waveCounterScore } from "../../../Gameplay/Tick";
import { killAllEnemy } from "../../../KillAll";
import { self } from "../../../Tick";

// ! Change this according to the wave
const waveStartCoords = abs(-38, 150, 956);
const waveNumber = 1;
const nextWaveCoords = abs(-38, 150, 956);

const showTip = () => {
  tellraw("@a", { text: "TIP: You basically have to dodge the attacks and kill enemies", color: "green" });
};

const giveToolsToAllPlayers = MCFunction("levels/level_1/wave_1/give_tools_to_players", () => {
  give("@a", "minecraft:diamond_sword");

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction("levels/level_1/wave_1/spawn_enemies", () => {
  const enemiesPillagerSpawnCoords = [abs(-44, 150, 998), abs(-17, 150, 1005), abs(12, 150, 1006)];
  const enemiesVindicatorSpawnCoords = [abs(-5, 150, 1029), abs(-27, 150, 1007), abs(-12, 150, 978)];

  enemiesPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalPillager();
    });
  });

  enemiesVindicatorSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator();
    });
  });
});

// ! Don't modify these
const startWave1 = MCFunction("levels/level_1/wave_1/start", () => {
  // Teleport player to the village
  teleport("@a", waveStartCoords);

  // Set the spawnpoint
  spawnpoint("@a", waveStartCoords);

  // Set the wave counter
  waveCounterScore.set(waveNumber);

  // Delay
  schedule.function(async () => {
    // Display the title of the wave
    title("@a").title([{ text: `Wave ${waveNumber} Started`, color: "green" }]);

    // Play the sound
    execute.as("@a").at(self).run.playsound("minecraft:block.basalt.break", "master", self);

    // Give tools to the player
    giveToolsToAllPlayers();

    // Spawn enemies
    spawnEnemiesAtCoord();

    // Set the wave started variable
    isStarted.set(1);

    // Wait for 1 second
    await sleep("3s");

    // Give tips to the player
    showTip();
  }, "1s");
});

const waveEndSequence = MCFunction("levels/level_1/wave_1/end", () => {
  // Kill all the enemy in the wave
  killAllEnemy();

  // Unset the wave started variable
  isStarted.set(0);

  schedule.function(async () => {
    // Display the title to all the player
    title("@a").title({ text: "You have completed the wave!", color: "gold" });
    execute.as("@a").at(self).run.playsound("minecraft:ui.toast.challenge_complete", "master", self);
    clear("@a");

    await sleep("3s");

    // Teleport the player to the next scene
    teleport("@a", nextWaveCoords);
  }, "1s");
});

const checkAndEndWave = MCFunction("levels/tick", () => {
  _.if(_.and(isStarted.equalTo(1), enemyCounterScore.equalTo(0), waveCounterScore.equalTo(waveNumber)), waveEndSequence);
});
