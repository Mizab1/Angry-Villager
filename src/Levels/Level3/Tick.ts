import { _, abs, clear, execute, give, item, MCFunction, sleep, spawnpoint, teleport, tellraw, title } from "sandstone";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { startLevel4 } from "../Level4/Tick";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(495, 150, 1003);
const levelStartViewAngle = abs(-155, 1);
const levelNumber = 3;
const villageNumber = 2;
const nextLevel = startLevel4;

const showTip = () => {
  tellraw("@a", { text: "TIP: You unlocked your first power that is lightning bolt, use it in your advantage", color: "green" });
};

const giveToolsToAllPlayers = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/give_tools_to_players`, () => {
  give("@a", "minecraft:diamond_sword");
  give("@a", "minecraft:bow");
  give("@a", "minecraft:arrow", 20);
  give("@a", "minecraft:shield");

  // Ability
  execute.as("@a").run(() => giveLightningAbility());

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:leather_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:leather_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:leather_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:leather_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(496, 150, 1017),
    abs(497, 150, 1038),
    abs(488, 150, 1039),
    abs(509, 150, 985),
    abs(514, 150, 996),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [
    abs(514, 150, 1014),
    abs(524, 150, 1019),
    abs(496, 150, 970),
    abs(483, 150, 984),
    abs(480, 150, 974),
    abs(480, 150, 961),
  ];

  enemiesEnchantedPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonEnchantedPillager();
    });
  });

  enemiesEnchantedVindicatorSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(6, "minecraft:iron_axe");
    });
  });
});

// ! Don't modify these
export const startLevel3 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
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
