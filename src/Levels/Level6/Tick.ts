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
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveHealingLightAbility } from "../../Abilities/HealingLight/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveSizeAmplifierAbility } from "../../Abilities/SizeAmplifier/Give";
import { giveTemporalAbility } from "../../Abilities/Temporal/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonHealer } from "../../Enemies/SummonHealer";
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
import { startLevel7 } from "../Level7/Tick";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(2830, 15, 42);
const levelStartViewAngle = abs(0, 0);
const levelNumber = 6;
const nextLevel = startLevel7;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You have unlocked the Temporal Ability and upgraded Meteor Ability. Watch out for army forces, tanks, drones, etc. Good Luck!",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/level_${levelNumber}/give_tools_to_players`, () => {
  // Disable the upgraded ability
  isUpgradedLightningAbility.set(0);
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
  const enemiesMilitarySoldierSpawnCoords = [];
  const enemiesMissileLauncherSpawnCoords = [];
  const enemiesTankSpawnCoords = [];
  const enemiesDroneSpawnCoords = [];

  enemiesMilitarySoldierSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonHealer();
    });
  });

  enemiesMissileLauncherSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonEnchantedPillager();
    });
  });

  enemiesTankSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(8, "minecraft:diamond_axe");
    });
  });

  enemiesDroneSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonFireWizard();
    });
  });
});

// ! Don't modify these
export const startLevel6 = MCFunction(`levels/level_${levelNumber}/start`, async () => {
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
  // nextLevel();
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
