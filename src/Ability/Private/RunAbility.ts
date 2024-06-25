import { Predicate, Selector, _ } from "sandstone";

/**
 * Checks if the player is using a custom item and runs a callback if they are.
 *
 * @param {string} predicateName - The name of the custom predicate to check.
 * @param {string} customNBT - The custom NBT tag to check for in the item.
 * @param {() => void} callback - The callback function to run if the player is using the custom item.
 */
export const runAbility = (predicateNameAndNBT: string, callback: { (): void }) => {
  // Create a  custom predicate
  const predicate = Predicate(
    predicateNameAndNBT,
    {
      condition: "minecraft:entity_properties",
      entity: "this",
      predicate: {
        type: "minecraft:player",
        equipment: {
          mainhand: {
            items: ["minecraft:carrot_on_a_stick"],
            nbt: `{${predicateNameAndNBT}:1b}`,
          },
        },
      },
    },
    {
      onConflict: "replace",
    }
  );

  // check if the player is using the custom item from which the predicate was created
  _.if(Selector("@s", { predicate: predicate }), () => {
    callback();
  });
};
