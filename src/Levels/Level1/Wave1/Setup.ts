import { execute, give, item, MCFunction, NBT, summon } from "sandstone";
import { summonNormalPillager } from "../../../Enemies/SummonNormalPillager";
import { summonNormalVindicator } from "../../../Enemies/SummonNormalVindicator";

const tpPlayerToVillage = MCFunction("levels/level_1/wave_1/tp_player_to_village", () => {
  // TODO: Add the village coordinates here
});

const giveToolsToPlayers = MCFunction("levels/level_1/wave_1/give_tools_to_players", () => {
  give("@a", "minecraft:diamond_sword");

  // Give full set of armor
  item.replace.entity("@a", "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity("@a", "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity("@a", "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity("@a", "armor.feet").with("minecraft:iron_boots", 1);
});

const spawnEnemies = MCFunction("levels/level_1/wave_1/spawn_enemies", () => {
  const enemiesPillagerSpawnCoords = [
    // TODO: Add the coordinates of the enemies here in abs()
  ];
  const enemiesVindicatorSpawnCoords = [
    // TODO: Add the coordinates of the enemies here in abs()
  ];

  enemiesPillagerSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalPillager();
    });
  });

  enemiesVindicatorSpawnCoords.forEach((coords) => {
    execute.positioned(coords).run(() => {
      summonNormalVindicator();
    });
  });
});
