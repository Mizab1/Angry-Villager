import type { SandstoneConfig } from "sandstone";
import { addDependencies } from "./AddDependencies";

export default {
  name: "Angry Villager",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 26,
  namespace: "angry_villager",
  packUid: "yWLtRRPa",
  // saveOptions: { path: "./output/datapack" },
  saveOptions: { world: "Angry villager" },
  onConflict: {
    default: "warn",
  },
  scripts: {
    afterAll: () => {
      // @ts-ignore
      let worldName = this.default.saveOptions.world;
      addDependencies(worldName);
    },
  },
} as SandstoneConfig;
