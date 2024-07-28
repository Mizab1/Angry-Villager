import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveDivineShieldAbility = MCFunction("ability/divine_shield/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Divine Shield","color":"gold","italic":false}',
        Lore: [
          '{"text":"Create a divine shield around you which protects you","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100008,
      divine_shield_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
