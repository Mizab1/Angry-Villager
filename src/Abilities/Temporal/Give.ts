import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveTemporalAbility = MCFunction("ability/temporal/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Stop Time","color":"gold","italic":false}',
        Lore: [
          '{"text":"Stop the time from passing for few seconds","color":"light_purple","italic":true}',
          '{"text":"Used by pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100009,
      temporal_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
