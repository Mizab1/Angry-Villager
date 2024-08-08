import {
  _,
  abs,
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
import { summonAxeThrower } from "../../Enemies/SummonAxeThrower";
import { summonNormalPillager } from "../../Enemies/SummonNormalPillager";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, isUpgradedLightningAbility, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { startLevel3 } from "../Level3/Tick";
import { giveSizeAmplifierAbility } from "../../Abilities/SizeAmplifier/Give";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(1311, 19, 121);
const levelStartViewAngle = abs(-156, 2);
const levelNumber = 2;
const nextLevel = startLevel3;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You now have a custom armor and your size is also increased. You have unlocked the Size Amplifier Ability.",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/level_${levelNumber}/give_tools_to_players`, () => {
  // Disable the upgraded ability
  isUpgradedLightningAbility.set(0);
  isUpgradedLightningAbility.set(0);

  // Change the gamemode
  gamemode("survival", "@a");

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:diamond_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:diamond_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:diamond_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:diamond_boots", 1);

  execute.as("@a").run(() => giveSizeAmplifierAbility());
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
  const enemiesPillagerSpawnCoords = [abs(1308, 19, 163), abs(1314, 19, 121), abs(1303, 19, 108), abs(1298, 19, 98)];
  const enemiesAxeManSpawnCoords = [abs(1326, 19, 109), abs(1332, 19, 116), abs(1332, 19, 130)];
  const enemiesSwordsManSpawnCoords = [abs(1314, 19, 151), abs(1314, 19, 97), abs(1314, 19, 86)];
  const enemiesAxeThrowerSpawnCoords = [abs(1314, 19, 136), abs(1318, 19, 109), abs(1337, 19, 143)];

  enemiesPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalPillager();
    });
  });

  enemiesAxeManSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(6, "minecraft:iron_axe");
    });
  });

  enemiesSwordsManSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(6, "minecraft:iron_sword");
    });
  });

  enemiesAxeThrowerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonAxeThrower();
    });
  });
});

// ! Don't modify these
export const startLevel2 = MCFunction(`levels/level_${levelNumber}/start`, async () => {
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
