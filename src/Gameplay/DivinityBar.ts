import { bossbar, MCFunction } from "sandstone";

export const bossbarName = "divinity_bar";

export const createDivinityBar = MCFunction("gameplay/create_divinity_bar", () => {
  // Bossbar
  bossbar.add(bossbarName, { text: "Divinity Bar", color: "gold" });
  bossbar.set(bossbarName).color("yellow");
  bossbar.set(bossbarName).max(7);
  bossbar.set(bossbarName).style("progress");
  // @ts-ignore
  bossbar.set(bossbarName).visible(true);
  bossbar.set(bossbarName).players("@a");
});
