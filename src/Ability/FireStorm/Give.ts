import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

const giveFireStormAbility = MCFunction("ability/fire_storm/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Fire Storm","color":"gold","italic":false}',
        Lore: [
          '{"text":"Summons a fire storm on the mob you are looking","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100005,
      fire_storm_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
