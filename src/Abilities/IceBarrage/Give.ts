import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveIceBarrageAbility = MCFunction("ability/ice_barrage/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Ice Barrage","color":"gold","italic":false}',
        Lore: [
          '{"text":"Create a Ice Barrage where you are looking","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100006,
      ice_barrage_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
