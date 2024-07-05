import { MCFunction, Selector, Variable, _, execute, rel, teleport } from "sandstone";
import { randomIntFromInterval } from "./UtilFunctions";

const shakeTimer = Variable(0);
const self = Selector("@s");

// ! Ticking Function
MCFunction(
  "util/shake_screen/tick",
  () => {
    execute.if(shakeTimer.greaterThan(0)).run(() => {
      shakeTimer.remove(1);
    });
  },
  {
    runEachTick: true,
  }
);

/**
 * Shakes the screen for a specified amount of time.
 * @context It shakes the screen of the entity in context
 * @important Must be ran in a ticking function and used along with setScreenShakeTimer function
 *
 * @param {number} time - The duration of the screen shake in ticks. Defaults to 20.
 * @return {void} This function does not return anything.
 */
export const shakeScreen = (time: number = 20, intensity: [x: number, y: number]): void => {
  for (let i = 1; i <= time; i++) {
    _.if(shakeTimer.matches(i), () => {
      teleport(
        self,
        rel(0, 0, 0),
        rel(randomIntFromInterval(-intensity[0], intensity[0]), randomIntFromInterval(-intensity[1], intensity[1]))
      );
    });
  }
};

/**
 * Sets the screen shake timer to a specified time.
 * @important Must be ran a single time
 *
 * @param {number} time - The duration of the screen shake in ticks. Defaults to 20.
 * @return {void} This function does not return anything.
 */
export const setScreenShakeTimer = (time: number = 20): void => {
  shakeTimer.set(time);
};
