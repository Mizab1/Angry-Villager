import { _, abs, clear, execute, give, item, MCFunction, NBT, say, sleep, spawnpoint, teleport, tellraw, title } from "sandstone";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonHealer } from "../../Enemies/SummonHealer";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(1000, 150, 1500);
const levelStartViewAngle = abs(62, 1);
const levelNumber = 6;
const villageNumber = 3;
const nextLevel = 0;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: Look out for healers, they cab heal these enemies. Kill them first",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/give_tools_to_players`, () => {
  give("@a", "minecraft:diamond_axe");
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

  // Convert to giant
  // ! MOD USED
  execute.as("@a").run.raw(`scale set pehkui:base 5`);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesHealerSpawnCoords = [
    abs(989, 150, 1508),
    abs(971, 150, 1508),
    abs(968, 150, 1495),
    abs(1010, 150, 1476),
    abs(944, 150, 1500),
  ];
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(1010, 150, 1494),
    abs(1010, 150, 1505),
    abs(1010, 150, 1514),
    abs(1010, 150, 1525),
    abs(1021, 150, 1484),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [
    abs(989, 150, 1494),
    abs(989, 150, 1486),
    abs(989, 150, 1475),
    abs(1001, 150, 1484),
    abs(968, 150, 1502),
    abs(998, 150, 1529),
    abs(989, 150, 1522),
  ];
  const enemiesFireWizardSpawnCoords = [
    abs(989, 150, 1541),
    abs(974, 150, 1529),
    abs(958, 150, 1529),
    abs(949, 150, 1529),
    abs(944, 150, 1513),
  ];

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
});

// ! Don't modify these
export const startLevel6 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
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
  // nextLevel();
  say("Test Completed");
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
