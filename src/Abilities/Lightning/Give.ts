import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveLightningAbility = MCFunction("ability/lightning/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Lightning","color":"gold","italic":false}',
        Lore: [
          '{"text":"Summons a lightning on the mob you are looking","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100003,
      lightning_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
