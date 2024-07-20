import { MCFunction, NBT, rel, summon } from "sandstone";

const summonRotatingAxe = MCFunction("attacks/rotating_axe/summon", () => {
  summon("minecraft:armor_stand", rel(0, 0, 0), {
    NoGravity: NBT.byte(1),
    Invisible: NBT.byte(1),
    Tags: ["axe_vehicle", "rotating_axe"],
    Passengers: [
      {
        id: "minecraft:item_display",
        Tags: ["rotate", "rotating_axe"],
        transformation: {
          left_rotation: [NBT.float(0), NBT.float(0), NBT.float(0), NBT.float(1)],
          right_rotation: [NBT.float(1), NBT.float(0), NBT.float(0), NBT.float(1)],
          translation: [NBT.float(0), NBT.float(0), NBT.float(0)],
          scale: [NBT.float(1), NBT.float(1), NBT.float(1)],
        },
        item: { id: "minecraft:iron_axe", Count: NBT.byte(1) },
      },
    ],
  });
});
