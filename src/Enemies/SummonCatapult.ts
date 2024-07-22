import { execute, functionCmd, MCFunction, rel } from "sandstone";

const summonCatapult = MCFunction("enemies/summon_catapult", () => {
  execute.positioned(rel(-4, 4, 0)).run.functionCmd("tf_catapult:summon/place");
});
