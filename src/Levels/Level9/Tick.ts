import {
  _,
  abs,
  clear,
  execute,
  give,
  item,
  MCFunction,
  NBT,
  raw,
  say,
  sleep,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { giveDivineShieldAbility } from "../../Abilities/DivineShield/Give";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveHealingLightAbility } from "../../Abilities/HealingLight/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonAxeThrower } from "../../Enemies/SummonAxeThrower";
import { summonCannon } from "../../Enemies/SummonCannon";
import { summonCatapult } from "../../Enemies/SummonCatapult";
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
const levelStartCoords = abs(2488, 150, 1539);
const levelStartViewAngle = abs(180, 0);
const levelNumber = 9;
const villageNumber = 4;
const nextLevel = 0;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: You have now unlocked Healing Ability. Your reach is also extended. Be cautious enemies are using catapult",
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
  item.replace.entity("@a", "weapon.offhand").with("minecraft:shield", 1);

  // Ability
  execute.as("@a").run(() => giveLightningAbility());
  execute.as("@a").run(() => giveTornadoAbility());
  execute.as("@a").run(() => giveFireStormAbility());
  execute.as("@a").run(() => giveMeteorAbility());
  execute.as("@a").run(() => giveDivineShieldAbility());
  execute.as("@a").run(() => giveHealingLightAbility());

  // Misc
  give("@a", "minecraft:arrow", 32);

  // Convert to giant
  // ! MOD USED
  execute.as("@a").run.raw(`scale reset`);
  raw(`fly enable @a`);
  execute.as("@a").run.raw(`scale set pehkui:entity_reach 50 @a`);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesHealerSpawnCoords = [abs(2492, 150, 1530), abs(2484, 149, 1530)];
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(2509, 151, 1530),
    abs(2471, 150, 1516),
    abs(2476, 150, 1510),
    abs(2487, 150, 1510),
    abs(2497, 150, 1503),
    abs(2485, 149, 1495),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [abs(2467, 149, 1534), abs(2476, 150, 1523)];
  const enemiesFireWizardSpawnCoords = [abs(2486, 150, 1518), abs(2498, 150, 1522), abs(2499, 149, 1489), abs(2504, 149, 1480)];
  const enemiesAxeThrowerSpawnCoords = [abs(2472, 149, 1530), abs(2476, 149, 1484), abs(2466, 150, 1481)];

  const enemiesCannonSpawnCoords = [abs(2487, 155, 1503), abs(2497, 150, 1497)];
  const enemiesCatapultSpawnCoords = [abs(2503, 150, 1529), abs(2477, 150, 1505)];

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

  enemiesCatapultSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonCatapult();
    });
  });
});

// ! Don't modify these
export const startLevel9 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
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
