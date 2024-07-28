import { execute, MCFunction, rel } from "sandstone";

export const summonCatapult = MCFunction("enemies/summon_catapult", () => {
  execute.positioned(rel(-4, 4, 1)).run.functionCmd("tf_catapult:summon/place");
});
