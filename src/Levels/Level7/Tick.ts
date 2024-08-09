import {
  _,
  abs,
  bossbar,
  clear,
  effect,
  execute,
  gamemode,
  item,
  MCFunction,
  sleep,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { giveEarthquakeAbility } from "../../Abilities/Earthquake/Give";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveHealingLightAbility } from "../../Abilities/HealingLight/Give";
import { giveIceBarrageAbility } from "../../Abilities/IceBarrage/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveSizeAmplifierAbility } from "../../Abilities/SizeAmplifier/Give";
import { giveTemporalAbility } from "../../Abilities/Temporal/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonDrone } from "../../Enemies/SummonDrone";
import { summonFuturisticMissileLauncher } from "../../Enemies/SummonFuturisticMissileLauncher";
import { summonFuturisticSoldier } from "../../Enemies/SummonFuturisticSoldier";
import { summonPlasmaBlaster } from "../../Enemies/SummonPlasmaBlaster";
import { summonRobot } from "../../Enemies/SummonRobot";
import {
  enemyCounterScore,
  isStarted,
  isUpgradedLightningAbility,
  isUpgradedMeteorAbility,
  levelCounterScore,
} from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { endGame } from "../EndGame";
import { bossbarName } from "../../Gameplay/DivinityBar";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(3337, 27, 147);
const levelStartViewAngle = abs(90, 0);
const levelNumber = 7;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You have unlocked the Ice Barrage and Earthquake Ability and Upgraded Lightning Ability.",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/level_${levelNumber}/give_tools_to_players`, () => {
  // Disable the upgraded ability
  isUpgradedLightningAbility.set(1);
  isUpgradedMeteorAbility.set(1);

  // Change the gamemode
  gamemode("survival", "@a");

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:diamond_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:diamond_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:diamond_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:diamond_boots", 1);

  // Ability
  execute.as("@a").run(() => giveSizeAmplifierAbility());
  execute.as("@a").run(() => giveLightningAbility());
  execute.as("@a").run(() => giveHealingLightAbility());
  execute.as("@a").run(() => giveMeteorAbility());
  execute.as("@a").run(() => giveFireStormAbility());
  execute.as("@a").run(() => giveTornadoAbility());
  execute.as("@a").run(() => giveTemporalAbility());
  execute.as("@a").run(() => giveEarthquakeAbility());
  execute.as("@a").run(() => giveIceBarrageAbility());
});

const giveEffects = MCFunction(
  "levels/give_effect_tick",
  () => {
    _.if(_.and(isStarted.equalTo(1), levelCounterScore.equalTo(levelNumber)), () => {
      effect.give("@a", "minecraft:strength", 15, 2, true);
      effect.give("@a", "minecraft:jump_boost", 15, 3, true);
      effect.give("@a", "minecraft:speed", 15, 2, true);
    });
  },
  { onConflict: "append" }
);

const spawnEnemiesAtCoord = MCFunction(`levels/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesRobotSpawnCoords = [
    abs(3329, 22, 150),
    abs(3319, 22, 122),
    abs(3329, 21, 133),
    abs(3329, 22, 127),
    abs(3341, 21, 136),
    abs(3342, 21, 147),
    abs(3342, 21, 164),
  ];
  const enemiesFuturisticSoldierSpawnCoords = [
    abs(3329, 22, 142),
    abs(3352, 20, 166),
    abs(3360, 20, 173),
    abs(3304, 23, 166),
    abs(3290, 23, 166),
    abs(3319, 22, 185),
    abs(3319, 22, 207),
  ];
  const enemiesDroneSpawnCoords = [abs(3319, 23, 153), abs(3319, 22, 134), abs(3333, 22, 166), abs(3311, 23, 138)];
  const enemiesPlasmaBlasterSpawnCoords = [
    abs(3339, 21, 163),
    abs(3337, 21, 135),
    abs(3322, 22, 151),
    abs(3323, 22, 187),
    abs(3326, 21, 213),
  ];
  const enemiesFuturisticMissileLauncherSpawnCoords = [
    abs(3310, 46, 147),
    abs(3311, 32, 121),
    abs(3290, 33, 144),
    abs(3307, 28, 194),
  ];

  enemiesRobotSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonRobot();
    });
  });

  enemiesFuturisticSoldierSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonFuturisticSoldier();
    });
  });

  enemiesDroneSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonDrone();
    });
  });

  enemiesPlasmaBlasterSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonPlasmaBlaster();
    });
  });

  enemiesFuturisticMissileLauncherSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonFuturisticMissileLauncher();
    });
  });
});

// ! Don't modify these
export const startLevel7 = MCFunction(`levels/level_${levelNumber}/start`, async () => {
  // Teleport player to the village
  teleport("@a", levelStartCoords, levelStartViewAngle);

  // Set the spawnpoint
  spawnpoint("@a", levelStartCoords);

  // Kill any residual mobs
  execute.at("@a").run(() => killAllEnemy());

  // Set the level counter
  levelCounterScore.set(levelNumber);

  // Clear items
  clear("@a");

  // Clear all the effects
  effect.clear("@a");

  await sleep("1s");

  // Display the title of the level
  title("@a").title([{ text: `Level ${levelNumber} Started`, color: "green" }]);

  // Play the sound
  execute.as("@a").at(self).run.playsound("minecraft:block.basalt.break", "master", self);

  // Give tools to the player
  giveToolsToAllPlayers();

  // Spawn enemies
  spawnEnemiesAtCoord();

  // Set the level started variable
  isStarted.set(1);

  // Wait for 1 second
  await sleep("3s");

  // Give tips to the player
  showTip();
});

const levelEndSequence = MCFunction(`levels/level_${levelNumber}/end`, async () => {
  // Kill all the enemy in the level
  execute.at("@a").run(() => killAllEnemy());

  // Unset the level started variable
  isStarted.set(0);

  await sleep("1s");

  // Display the title to all the player
  title("@a").title({ text: `You have completed the Level ${levelNumber}!`, color: "gold" });
  execute.as("@a").at(self).run.playsound("minecraft:ui.toast.challenge_complete", "master", self);
  clear("@a");

  // Add 1 to the bossbar
  bossbar.set(bossbarName).value(levelNumber);

  await sleep("2s");

  tellraw("@a", { text: "Initializing the Celebration Room", color: "red" });

  await sleep("6s");

  // Start the next level
  endGame();
});

const checkAndEndLevel = MCFunction(
  "levels/tick",
  () => {
    _.if(_.and(isStarted.equalTo(1), enemyCounterScore.equalTo(0), levelCounterScore.equalTo(levelNumber)), levelEndSequence);
  },
  {
    onConflict: "append",
  }
);
