import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveTornadoAbility = MCFunction("ability/tornado/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Tornado","color":"gold","italic":false}',
        Lore: [
          '{"text":"Summons a tornado where you are looking","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100002,
      tornado_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
