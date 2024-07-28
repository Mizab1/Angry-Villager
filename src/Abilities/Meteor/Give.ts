import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/UtilFunctions";

export const giveMeteorAbility = MCFunction("ability/meteor/give", () => {
  give(
    self,
    i("minecraft:carrot_on_a_stick", {
      display: {
        Name: '{"text":"Meteor","color":"gold","italic":false}',
        Lore: [
          '{"text":"Summons a meteor where you are looking","color":"light_purple","italic":true}',
          '{"text":"By pressing right click","color":"light_purple","italic":true}',
        ],
      },
      CustomModelData: 100001,
      meteor_ability: NBT.byte(1),
      is_ability: NBT.byte(1),
    })
  );
});
