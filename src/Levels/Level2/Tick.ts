import { _, abs, clear, execute, give, item, MCFunction, sleep, spawnpoint, teleport, tellraw, title } from "sandstone";
import { summonNormalPillager } from "../../Enemies/SummonNormalPillager";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { startLevel3 } from "../Level3/Tick";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(16, 150, 1537);
const levelNumber = 2;
const villageNumber = 1;
const nextLevel = startLevel3;

const showTip = () => {
  tellraw("@a", { text: "TIP: You now have a bow, you can shoot projectile and dodge attacks", color: "green" });
};

const giveToolsToAllPlayers = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/give_tools_to_players`, () => {
  give("@a", "minecraft:diamond_sword");
  give("@a", "minecraft:bow");
  give("@a", "minecraft:arrow", 12);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:leather_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:leather_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:leather_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:leather_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesPillagerSpawnCoords = [
    abs(1, 150, 1514),
    abs(-25, 150, 1502),
    abs(-14, 150, 1482),
    abs(4, 150, 1500),
    abs(20, 150, 1504),
  ];
  const enemiesVindicatorSpawnCoords = [
    abs(-32, 150, 1508),
    abs(-49, 150, 1499),
    abs(-10, 150, 1533),
    abs(-9, 150, 1551),
    abs(-3, 150, 1530),
  ];

  enemiesPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalPillager();
    });
  });

  enemiesVindicatorSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator(8);
    });
  });
});

// ! Don't modify these
export const startLevel2 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
  // Teleport player to the village
  teleport("@a", levelStartCoords);

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
  killAllEnemy();

  // Unset the level started variable
  isStarted.set(0);

  await sleep("1s");

  // Display the title to all the player
  title("@a").title({ text: "You have completed the level!", color: "gold" });
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
