import {
  _,
  abs,
  bossbar,
  clear,
  effect,
  execute,
  gamemode,
  MCFunction,
  sleep,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { summonBowMan } from "../../Enemies/SummonBowMan";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import {
  enemyCounterScore,
  isStarted,
  isUpgradedLightningAbility,
  isUpgradedMeteorAbility,
  levelCounterScore,
} from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { startLevel2 } from "../Level2/Tick";
import { bossbarName, createDivinityBar } from "../../Gameplay/DivinityBar";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(314, 19, 135);
const levelStartViewAngle = abs(-152, 1);
const levelNumber = 1;
const nextLevel = startLevel2;

const showTip = () => {
  tellraw("@a", { text: "TIP: You basically have to dodge the attacks and kill enemies", color: "green" });
};

const giveToolsToAllPlayers = MCFunction(`levels/level_${levelNumber}/give_tools_to_players`, () => {
  // Disable the upgraded ability
  isUpgradedLightningAbility.set(0);
  isUpgradedMeteorAbility.set(0);

  // Change the gamemode
  gamemode("survival", "@a");
});

const giveEffects = MCFunction(
  "levels/give_effect_tick",
  () => {
    _.if(_.and(isStarted.equalTo(1), levelCounterScore.equalTo(levelNumber)), () => {
      effect.give("@a", "minecraft:strength", 15, 2, true);
      effect.give("@a", "minecraft:jump_boost", 15, 2, true);
      effect.give("@a", "minecraft:speed", 15, 1, true);
    });
  },
  { onConflict: "append" }
);

const spawnEnemiesAtCoord = MCFunction(`levels/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesBowmanSpawnCoords = [abs(279, 19, 124), abs(282, 19, 113), abs(292, 19, 113), abs(306, 19, 113)];
  const enemiesAxeManSpawnCoords = [abs(288, 19, 124), abs(307, 19, 100), abs(320, 19, 95), abs(326, 19, 107)];
  const enemiesSwordsManSpawnCoords = [
    abs(321, 19, 151),
    abs(322, 19, 162),
    abs(321, 19, 136),
    abs(305, 19, 124),
    abs(338, 19, 120),
  ];

  enemiesBowmanSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonBowMan();
    });
  });

  enemiesAxeManSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(4, "minecraft:stone_axe");
    });
  });

  enemiesSwordsManSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(4, "minecraft:stone_sword");
    });
  });
});

// ! Don't modify these
export const startLevel1 = MCFunction(`levels/level_${levelNumber}/start`, async () => {
  // Create the bossbar
  createDivinityBar();

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

  tellraw("@a", { text: "Initializing the next level", color: "red" });

  await sleep("6s");

  // Start the next level
  nextLevel();
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
