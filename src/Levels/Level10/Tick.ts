import {
  _,
  abs,
  clear,
  execute,
  gamemode,
  give,
  item,
  MCFunction,
  NBT,
  playsound,
  raw,
  say,
  sleep,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { giveDivineShieldAbility } from "../../Abilities/DivineShield/Give";
import { giveEarthquakeAbility } from "../../Abilities/Earthquake/Give";
import { giveFireStormAbility } from "../../Abilities/FireStorm/Give";
import { giveHealingLightAbility } from "../../Abilities/HealingLight/Give";
import { giveIceBarrageAbility } from "../../Abilities/IceBarrage/Give";
import { giveLightningAbility } from "../../Abilities/Lightning/Give";
import { giveMeteorAbility } from "../../Abilities/Meteor/Give";
import { giveTornadoAbility } from "../../Abilities/Tornado/Give";
import { summonAxeThrower } from "../../Enemies/SummonAxeThrower";
import { summonCannon } from "../../Enemies/SummonCannon";
import { summonCatapult } from "../../Enemies/SummonCatapult";
import { summonEnchantedPillager } from "../../Enemies/SummonEnchantedPillager";
import { summonFireWizard } from "../../Enemies/SummonFireWizard";
import { summonHealer } from "../../Enemies/SummonHealer";
import { summonMissileThrower } from "../../Enemies/SummonMissileThrower";
import { summonNormalPillager } from "../../Enemies/SummonNormalPillager";
import { summonNormalVindicator } from "../../Enemies/SummonNormalVindicator";
import { enemyCounterScore, isStarted, levelCounterScore } from "../../Gameplay/Tick";
import { killAllEnemy } from "../../KillAll";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

// ! Change this according to the level
// !! RENAME "startLevel" to the current level
const levelStartCoords = abs(2981, 150, 1531);
const levelStartViewAngle = abs(180, 0);
const levelNumber = 10;
const villageNumber = 4;
const nextLevel = 0;

const showTip = () => {
  tellraw("@a", {
    text: "TIP: This is the final level. You have unlocked Earthquake and Ice Barrage. All types of enemy will spawn now",
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
  execute.as("@a").run(() => giveIceBarrageAbility());
  execute.as("@a").run(() => giveEarthquakeAbility());

  // Misc
  give("@a", "minecraft:arrow", 32);

  // Convert to giant
  // ! MOD USED
  execute.as("@a").run.raw(`scale reset`);
  execute.as("@a").run.raw(`scale set pehkui:entity_reach 60 @a`);

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:diamond_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:diamond_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:diamond_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:diamond_boots", 1);
});

const spawnEnemiesAtCoord = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/spawn_enemies`, () => {
  const enemiesHealerSpawnCoords = [abs(2990, 150, 1497), abs(2971, 150, 1494), abs(2970, 150, 1512), abs(2972, 149, 1484)];
  const enemiesEnchantedPillagerSpawnCoords = [
    abs(2985, 150, 1523),
    abs(2974, 149, 1523),
    abs(2964, 149, 1524),
    abs(2959, 149, 1528),
    abs(2990, 150, 1502),
  ];
  const enemiesEnchantedVindicatorSpawnCoords = [abs(2966, 150, 1514), abs(2979, 150, 1511), abs(2990, 150, 1512)];
  const enemiesFireWizardSpawnCoords = [abs(2999, 150, 1522), abs(2996, 150, 1528), abs(2997, 150, 1501)];
  const enemiesAxeThrowerSpawnCoords = [abs(2979, 150, 1501), abs(2970, 150, 1497), abs(2967, 150, 1488), abs(2977, 149, 1487)];
  const enemiesMissileManSpawnCoords = [abs(2959, 150, 1474), abs(2993, 149, 1478)];
  const enemiesNormalPillagerSpawnCoords = [abs(2988, 150, 1491), abs(2970, 149, 1478), abs(3001, 149, 1471)];

  const enemiesCannonSpawnCoords = [abs(2986, 150, 1518), abs(2967, 150, 1518), abs(2980, 155, 1496)];
  const enemiesCatapultSpawnCoords = [abs(2970, 150, 1492), abs(2991, 149, 1480)];

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
  enemiesMissileManSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonMissileThrower();
    });
  });
  enemiesNormalPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalPillager();
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
export const startLevel10 = MCFunction(`levels/village_${villageNumber}/level_${levelNumber}/start`, async () => {
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

  tellraw("@a", { text: "Initializing the Celebration Room", color: "red" });

  await sleep("6s");

  gamemode("creative", "@a");

  // Teleport to celebration room
  teleport("@a", abs(2428, 161, 1006), abs(180, 0));

  // Play the sound
  playsound("minecraft:music_disc.pigstep", "master", "@a", abs(2428, 161, 1006));

  await sleep("30t");

  // Fireworks
  raw(
    `summon firework_rocket 2424 163 1003 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
  raw(
    `summon firework_rocket 2432 163 1003 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
  raw(
    `summon firework_rocket 2432 163 1008 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
  raw(
    `summon firework_rocket 2424 163 1008 {LifeTime:1,FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:4,Flicker:1b,Trail:1b,Colors:[I;7067903]},{Type:4,Flicker:1b,Trail:1b,Colors:[I;16772958]}]}}}}`
  );
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
