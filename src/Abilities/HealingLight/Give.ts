import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveHealingLightAbility = MCFunction("ability/healing_light/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Healing Light","color":"gold","italic":false}',
        Lore: [
          '{"text":"Creates a healing light sphere around you","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100007,
      healing_light_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
