import {
  _,
  abs,
  clear,
  effect,
  execute,
  gamemode,
  give,
  item,
  MCFunction,
  setblock,
  sleep,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
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
import { startLevel5 } from "../Level5/Tick";
import { giveHealingLightAbility } from "../../Abilities/HealingLight/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveSizeAmplifierAbility } from "../../Abilities/SizeAmplifier/Give";
import { summonAxeThrower } from "../../Enemies/SummonAxeThrower";
import { summonHealer } from "../../Enemies/SummonHealer";
import { summonNormalPillager } from "../../Enemies/SummonNormalPillager";
import { summonCatapult } from "../../Enemies/SummonCatapult";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(1823, 19, 152);
const levelStartViewAngle = abs(180, 2);
const levelNumber = 4;
const nextLevel = startLevel5;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You unlocked Healing Light and Meteor Ability and upgraded lightning power. Watch out for catapult!",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/level_${levelNumber}/give_tools_to_players`, () => {
  // Disable the upgraded ability
  isUpgradedLightningAbility.set(1);
  isUpgradedMeteorAbility.set(0);

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
  const enemiesPillagerSpawnCoords = [abs(1825, 19, 139), abs(1836, 19, 141), abs(1805, 18, 142)];
  const enemiesAxeManSpawnCoords = [abs(1808, 19, 132), abs(1811, 19, 115)];
  const enemiesSwordsManSpawnCoords = [abs(1832, 19, 116), abs(1840, 19, 121)];
  const enemiesAxeThrowerSpawnCoords = [abs(1805, 19, 91), abs(1799, 19, 95), abs(1823, 19, 111)];
  const enemiesFireWizardSpawnCoords = [abs(1834, 18, 99), abs(1842, 18, 92)];
  const enemiesHealerSpawnCoords = [abs(1815, 18, 104), abs(1845, 20, 142)];
  const enemiesCatapultSpawnCoords = [abs(1821, 19, 126), abs(1832, 19, 121), abs(1829, 19, 111)];

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

  enemiesFireWizardSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonFireWizard();
    });
  });

  enemiesHealerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonHealer();
    });
  });

  enemiesCatapultSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonCatapult();
    });
  });
});

// ! Don't modify these
export const startLevel4 = MCFunction(`levels/level_${levelNumber}/start`, async () => {
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
