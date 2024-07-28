import { _, abs, clear, execute, give, item, MCFunction, NBT, sleep, spawnpoint, teleport, tellraw, title } from "sandstone";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonAxeThrower } from "../../Enemies/SummonAxeThrower";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonHealer } from "../../Enemies/SummonHealer";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";
import { startLevel8 } from "../Level8/Tick";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(1488, 150, 1536);
const levelStartViewAngle = abs(180, 0);
const levelNumber = 7;
const villageNumber = 4;
const nextLevel = startLevel8;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: Some villager can now throw axe at you so be cautious. You also unlocked the Meteor Ability",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/give_tools_to_players`, () => {
  give("@a", "minecraft:netherite_sword");
  give(
    "@a",
    i("minecraft:crossbow", {
      Enchantments: [{ id: "minecraft:multishot", lvl: NBT.short(1) }],
    })
  );
  give("@a", "minecraft:arrow", 32);
  give("@a", "minecraft:shield");

  // Ability
  execute.as("@a").run(() => giveLightningAbility());
  execute.as("@a").run(() => giveTornadoAbility());
  execute.as("@a").run(() => giveFireStormAbility());
  execute.as("@a").run(() => giveMeteorAbility());

  // Convert to giant
  // ! MOD USED
  execute.as("@a").run.raw(`scale set pehkui:base 3`);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesHealerSpawnCoords = [abs(1466, 150, 1480), abs(1469, 149, 1532), abs(1498, 149, 1488), abs(1470, 150, 1520)];
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(1496, 150, 1509),
    abs(1486, 150, 1522),
    abs(1494, 150, 1528),
    abs(1486, 150, 1512),
    abs(1502, 150, 1530),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [
    abs(1504, 150, 1509),
    abs(1497, 150, 1520),
    abs(1509, 151, 1531),
    abs(1476, 150, 1515),
    abs(1476, 150, 1498),
  ];
  const enemiesFireWizardSpawnCoords = [abs(1481, 149, 1530), abs(1469, 149, 1532), abs(1473, 150, 1487)];
  const enemiesAxeThrowerSpawnCoords = [abs(1476, 149, 1482), abs(1480, 149, 1492), abs(1493, 150, 1497), abs(1503, 149, 1482)];

  enemiesHealerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonHealer();
    });
  });

  enemiesEnchantedPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonEnchantedPillager();
    });
  });

  enemiesEnchantedVindicatorSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(8, "minecraft:diamond_axe");
    });
  });

  enemiesFireWizardSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonFireWizard();
    });
  });

  enemiesAxeThrowerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonAxeThrower();
    });
  });
});

// ! Don't modify these
export const startLevel7 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
  // Teleport player to the village
  teleport("@a", levelStartCoords, levelStartViewAngle);

  // Set the spawnpoint
  spawnpoint("@a", levelStartCoords);

  // Kill any residual mobs
  execute.at("@a").run(() => killAllEnemy());

  // Set the level counter
  levelCounterScore.set(levelNumber);

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

const levelEndSequence = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/end`, async () => {
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
