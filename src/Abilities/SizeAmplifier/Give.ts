import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveSizeAmplifierAbility = MCFunction("ability/size_amplifier/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Size Amplifier","color":"gold","italic":false}',
        Lore: [
          '{"text":"Increase the size of the player for a few seconds","color":"light_purple","italic":true}',
          '{"text":"Used by pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100010,
      size_amplifier_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
