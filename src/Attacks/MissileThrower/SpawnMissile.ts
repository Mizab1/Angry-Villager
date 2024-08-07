// import { execute, MCFunction, particle, rel, Selector } from "sandstone";
// import { self } from "../../Tick";

// MCFunction(
//   "attacks/spawn_missile",
//   () => {
//     execute
//       .as(Selector("@e", { type: "minecraft:vindicator", tag: "missile_thrower" }))
//       .at(self)
//       .run(() => {
//         // Display particle
//         particle("minecraft:campfire_cosy_smoke", rel(0, 1, 0), [0.5, 0.5, 0.5], 0.1, 6);

//         // ! The implementation of missile is done using MCB language in MCB internal
//         execute.positioned(rel(0, 1, 0)).run.functionCmd("internal:missiles");
//       });
//   },
//   {
//     runEach: "180t",
//   }
// );
