import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveEarthquakeAbility = MCFunction("ability/earthquake/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Earthquake","color":"gold","italic":false}',
        Lore: [
          '{"text":"Create a earthquake where you are looking","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100004,
      earthquake_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
