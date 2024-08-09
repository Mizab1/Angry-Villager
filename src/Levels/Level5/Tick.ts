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
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveHealingLightAbility } from "../../Abilities/HealingLight/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveSizeAmplifierAbility } from "../../Abilities/SizeAmplifier/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonCannon } from "../../Enemies/SummonCannon";
import { summonCatapult } from "../../Enemies/SummonCatapult";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonHorseriderBowman } from "../../Enemies/SummonHorseriderBowman";
import {
  enemyCounterScore,
  isStarted,
  isUpgradedLightningAbility,
  isUpgradedMeteorAbility,
  levelCounterScore,
} from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { startLevel6 } from "../Level6/Tick";
import { summonHorserider } from "../../Enemies/SummonHorserider";
import { bossbarName } from "../../Gameplay/DivinityBar";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(2277, 18, 133);
const levelStartViewAngle = abs(-90, 0);
const levelNumber = 5;
const nextLevel = startLevel6;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You have unlocked Firestorm and Tornado Ability. Watch out for cannons in this level",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/level_${levelNumber}/give_tools_to_players`, () => {
  // Disable the upgraded ability
  isUpgradedLightningAbility.set(0);
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
  execute.as("@a").run(() => giveFireStormAbility());
  execute.as("@a").run(() => giveTornadoAbility());
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
  const enemiesCannonSpawnCoords = [
    abs(2306, 21, 122),
    abs(2306, 21, 144),
    abs(2348, 18, 133),
    abs(2328, 21, 144),
    abs(2328, 21, 122),
  ];
  const enemiesCatapultSpawnCoords = [abs(2294, 18, 110), abs(2297, 18, 156), abs(2322, 18, 159), abs(2318, 18, 107)];
  const enemiesHorseriderSpawnCoords = [
    abs(2292, 18, 143),
    abs(2293, 18, 153),
    abs(2302, 18, 157),
    abs(2317, 18, 158),
    abs(2331, 18, 154),
    abs(2342, 18, 127),
  ];
  const enemiesHorseriderBowmanSpawnCoords = [
    abs(2341, 18, 145),
    abs(2288, 18, 134),
    abs(2292, 18, 126),
    abs(2295, 18, 114),
    abs(2337, 18, 132),
    abs(2340, 18, 114),
  ];
  const enemiesFireWizardSpawnCoords = [abs(2326, 18, 108), abs(2309, 18, 108), abs(2316, 18, 101)];

  enemiesCannonSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonCannon();
    });
  });

  enemiesCatapultSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonCatapult();
    });
  });

  enemiesHorseriderSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonHorserider();
    });
  });

  enemiesHorseriderBowmanSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonHorseriderBowman();
    });
  });

  enemiesFireWizardSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonFireWizard();
    });
  });
});

// ! Don't modify these
export const startLevel5 = MCFunction(`levels/level_${levelNumber}/start`, async () => {
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
