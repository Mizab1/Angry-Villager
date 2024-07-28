import { _, abs, clear, execute, give, item, MCFunction, NBT, say, sleep, spawnpoint, teleport, tellraw, title } from "sandstone";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonNormalPillager } from "../../Enemies/SummonNormalPillager";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";
import { startLevel6 } from "../Level6/Tick";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(1036, 150, 985);
const levelStartViewAngle = abs(58, -1);
const levelNumber = 5;
const villageNumber = 3;
const nextLevel = startLevel6;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You have unlocked firestorm ability and now became larger than before. Use these for you advantage",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/give_tools_to_players`, () => {
  give("@a", "minecraft:diamond_sword");
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
  execute.as("@a").run.raw(`scale set pehkui:base 4`);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesPillagerSpawnCoords = [
    abs(1020, 150, 983),
    abs(1007, 150, 983),
    abs(1009, 150, 975),
    abs(974, 150, 1007),
    abs(967, 150, 1001),
  ];
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(995, 150, 983),
    abs(1009, 150, 994),
    abs(1009, 150, 1007),
    abs(1009, 150, 1021),
    abs(1003, 150, 1028),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [
    abs(988, 150, 1037),
    abs(988, 150, 1049),
    abs(975, 150, 1028),
    abs(961, 150, 1028),
    abs(948, 150, 1028),
  ];
  const enemiesFireWizardSpawnCoords = [
    abs(988, 150, 1022),
    abs(988, 150, 1003),
    abs(988, 150, 993),
    abs(943, 150, 1005),
    abs(938, 150, 995),
    abs(988, 150, 971),
  ];

  enemiesPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalPillager();
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
export const startLevel5 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
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
  killAllEnemy();

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
