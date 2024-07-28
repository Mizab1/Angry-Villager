import { _, abs, clear, execute, give, item, MCFunction, NBT, raw, sleep, spawnpoint, teleport, tellraw, title } from "sandstone";
import { giveDivineShieldAbility } from "../../Abilities/DivineShield/Give";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonAxeThrower } from "../../Enemies/SummonAxeThrower";
import { summonCannon } from "../../Enemies/SummonCannon";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonHealer } from "../../Enemies/SummonHealer";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";
import { startLevel9 } from "../Level9/Tick";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(1988, 150, 1532);
const levelStartViewAngle = abs(180, 0);
const levelNumber = 8;
const villageNumber = 4;
const nextLevel = startLevel9;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You are now promoted to Skywalker, meaning that you can fly. You have now unlocked the Shield Ability. Be cautious villagers are now using cannons",
    color: "green",
  });
};

const giveToolsToAllPlayers = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/give_tools_to_players`, () => {
  give("@a", "minecraft:netherite_axe");
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
  execute.as("@a").run(() => giveDivineShieldAbility());

  // Convert to giant
  // ! MOD USED
  execute.as("@a").run.raw(`scale reset`);
  raw(`fly enable @a`);
  execute.as("@a").run.raw(`scale set pehkui:entity_reach 30 @a`);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesHealerSpawnCoords = [abs(1973, 149, 1527), abs(1967, 149, 1524), abs(1971, 150, 1516)];
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(1977, 150, 1495),
    abs(1974, 150, 1487),
    abs(1967, 150, 1473),
    abs(1995, 150, 1491),
    abs(1990, 150, 1496),
    abs(1987, 150, 1505),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [abs(1997, 150, 1508), abs(1997, 150, 1500)];
  const enemiesFireWizardSpawnCoords = [abs(1986, 150, 1515), abs(1982, 149, 1523), abs(1975, 150, 1507), abs(1977, 149, 1478)];
  const enemiesAxeThrowerSpawnCoords = [
    abs(2010, 151, 1523),
    abs(2003, 150, 1528),
    abs(1997, 150, 1517),
    abs(2005, 150, 1502),
    abs(2004, 149, 1475),
  ];
  const enemiesCannonSpawnCoords = [abs(1981, 154, 1511), abs(1992, 154, 1505), abs(1987, 155, 1496)];
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

  enemiesCannonSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonCannon();
    });
  });
});

// ! Don't modify these
export const startLevel8 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
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
