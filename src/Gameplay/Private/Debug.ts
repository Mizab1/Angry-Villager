import { MCFunction } from "sandstone";
import { isUpgradedLightningAbility, isUpgradedMeteorAbility } from "../Tick";

MCFunction("gameplay/private/debug/unlock_upgrades", () => {
  isUpgradedMeteorAbility.set(1);
  isUpgradedLightningAbility.set(1);
});
MCFunction("gameplay/private/debug/lock_upgrades", () => {
  isUpgradedLightningAbility.set(0);
  isUpgradedMeteorAbility.set(0);
});
