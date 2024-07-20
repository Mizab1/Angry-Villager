import { give, item, MCFunction, NBT, summon } from "sandstone";

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
    summon("minecraft:pillager", coords, {
      PersistenceRequired: NBT.byte(1),
      CanPickUpLoot: NBT.byte(0),
      PatrolLeader: NBT.byte(0),
      Patrolling: NBT.byte(0),
      CanJoinRaid: NBT.byte(0),
      Tags: ["enemy", " custom_pillager"],
    });
  });

  enemiesVindicatorSpawnCoords.forEach((coords) => {
    summon("minecraft:vindicator", coords, {
      PersistenceRequired: NBT.byte(1),
      CanPickUpLoot: NBT.byte(0),
      PatrolLeader: NBT.byte(0),
      Patrolling: NBT.byte(0),
      CanJoinRaid: NBT.byte(0),
      Tags: ["enemy", " custom_vindicator"],
      HandItems: [
        {
          id: "minecraft:iron_axe",
          Count: NBT.byte(1),
          tag: {
            AttributeModifiers: [
              {
                AttributeName: "generic.attack_damage",
                Name: "generic.attack_damage",
                Amount: 1,
                Operation: 0,
                UUID: NBT.intArray([199699329, 1439778767, -1927542810, 257854477]),
                Slot: "mainhand",
              },
            ],
          },
        },
        {},
      ],
      Attributes: [{ Name: "generic.attack_damage", Base: 1 }],
    });
  });
});
