import {
  BLOCKS,
  ITEMS,
  LiteralUnion,
  RootNBT,
  Selector,
  SelectorClass,
  TimeArgument,
  execute,
  nbtParser,
  rel,
  schedule,
  setblock,
  tag,
} from "sandstone";

/**
 * Concatenates the given item with the parsed nbt string.
 *
 * @param {LiteralUnion<ITEMS>} item - The item to be concatenated.
 * @param {RootNBT} nbt - The nbt string to be parsed.
 * @return {string} The concatenated string.
 */
export function i(item: LiteralUnion<ITEMS>, nbt: RootNBT): string {
  return `${item}${nbtParser(nbt)}`;
}

/**
 * Generates a string by concatenating a block with its corresponding NBT.
 *
 * @param {LiteralUnion<BLOCKS>} block - The block to concatenate.
 * @param {RootNBT} nbt - The NBT to concatenate.
 * @return {string} The concatenated string.
 */
export function b(block: LiteralUnion<BLOCKS>, nbt: RootNBT): string {
  return `${block}${nbtParser(nbt)}`;
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The generated random integer.
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomFloatFromInterval(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

/**
 * Generates a random number within a given range, excluding certain values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {number[]} exclude - An array of values to exclude from the range.
 * @returns {number | null} - A random number within the range, excluding the specified values. Returns null if all values are excluded.
 */
export function getRandomNumberInRange(min: number, max: number, exclude: number[]): number | null {
  if (max <= min) {
    throw new Error("Invalid range. 'max' should be greater than 'min'.");
  }

  const range = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  // Filter out excluded values
  const availableValues = range.filter((value) => !exclude.includes(value));

  if (availableValues.length === 0) {
    // All values are excluded, return null or handle it as you like
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableValues.length);
  return availableValues[randomIndex];
}

export function randomWithDec(): number {
  let randomNum = Math.random() * 2 - 1;
  let shortRandomNum = parseFloat(randomNum.toFixed(1));

  if (shortRandomNum == 0.0) {
    shortRandomNum = 0.1;
  } else if (shortRandomNum == -1.0) {
    shortRandomNum = -0.9;
  } else if (shortRandomNum == 1.0) {
    shortRandomNum = 0.9;
  }
  return shortRandomNum;
}

/**
 * Replaces each block within the specified range (inclusive), excluding a specified block, with another block or a randomly selected block from an array of blocks.
 *
 * @param {[x: number, y: number, z: number]} from - The starting coordinates of the range (inclusive).
 * @param {[x: number, y: number, z: number]} to - The ending coordinates of the range (inclusive).
 * @param {LiteralUnion<BLOCKS>} blockToExclude - The block to exclude from replacement.
 * @param {LiteralUnion<BLOCKS> | Array<LiteralUnion<BLOCKS>>} blockToPlace - The block or array of blocks to replace with.
 * @return {void} This function does not return a value.
 */
export function fillRandom(
  from: [x: number, y: number, z: number],
  to: [x: number, y: number, z: number],
  blockToExclude: LiteralUnion<BLOCKS>,
  blockToPlace: LiteralUnion<BLOCKS> | Array<LiteralUnion<BLOCKS>>
): void {
  for (let i = from[0]; i <= to[0]; i++) {
    for (let j = from[1]; j <= to[1]; j++) {
      for (let k = from[2]; k <= to[2]; k++) {
        execute
          .positioned(rel(i, j, k))
          .if.block(rel(0, 0, 0), blockToExclude)
          .run(() => {
            if (typeof blockToPlace === "string") {
              setblock(rel(0, 0, 0), blockToPlace);
            } else if (Array.isArray(blockToPlace)) {
              setblock(rel(0, 0, 0), blockToPlace[Math.floor(Math.random() * blockToPlace.length)]);
            }
          });
      }
    }
  }
}

export function genDiscOfBlock(
  radius: number,
  density: number,
  floorCoord: number,
  blockToExclude: LiteralUnion<BLOCKS>,
  blockToPlace: LiteralUnion<BLOCKS> | Array<LiteralUnion<BLOCKS>>,
  radiusGap: number = 1
): void {
  for (let i = 1; i <= radius; i++) {
    for (let j = 1; j <= density; j++) {
      let x = Math.cos(j) * i * radiusGap;
      let z = Math.sin(j) * i * radiusGap;

      execute.if.block(rel(0, floorCoord, 0), blockToExclude).run(() => {
        if (typeof blockToPlace === "string") {
          setblock(rel(x, floorCoord, z), blockToPlace);
        } else if (Array.isArray(blockToPlace)) {
          setblock(rel(x, floorCoord, z), blockToPlace[Math.floor(Math.random() * blockToPlace.length)]);
        }
      });
    }
  }
}

export function genFullDiscOfBlock(radius: number, pointDensity: number): void {
  const circumference: number = 2 * Math.PI * radius;
  const numPoints: number = Math.ceil(circumference * pointDensity);

  const angleIncrement: number = (2 * Math.PI) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const angle: number = i * angleIncrement;
    const x: number = parseFloat((radius * Math.cos(angle)).toFixed(3));
    const z: number = parseFloat((radius * Math.sin(angle)).toFixed(3));

    setblock(rel(x, 0, z), "minecraft:stone");
  }
}

/**
 * A class that can be used to run a function only once.
 * @param {() => void} callback - The function to run.
 **/
export class RunOnce {
  private localTag: string;

  /**
   * runOnce is used to run a function only once.
   * @context It is called in the relational (as) context of an entity.
   * @important It does not provide the positional context by default.
   * @param {() => void} callback - The function to run once.
   */
  constructor(callback: () => void) {
    this.localTag = "run_once_" + Math.random().toString(36).slice(2);

    // Check if the entity does not have the tag
    execute.as(Selector("@s", { tag: `!${this.localTag}` })).run(() => {
      // Run the callback
      callback();
      // Add the tag to the entity
      tag("@s").add(this.localTag);
    });
  }

  /**
   * Removes the tag from the entity.
   */
  public resetSelf() {
    execute.as(Selector("@s", { tag: `${this.localTag}` })).run(() => {
      tag("@s").remove(this.localTag);
    });
  }

  /**
   * Removes the tag from all entities.
   */
  public resetAll() {
    execute.as(Selector("@e", { tag: `${this.localTag}` })).run(() => {
      tag("@s").remove(this.localTag);
    });
  }

  /**
   * Removes the tag from the given entity.
   * @param {SelectorClass} entity - The entity to remove the tag from.
   */
  public resetOn(entity: SelectorClass) {
    execute.as(entity).run(() => {
      tag("@s").remove(this.localTag);
    });
  }

  /**
   * Returns the tag associated with this instance.
   *
   * @return {string} The tag associated with this instance.
   */
  public getTag(): string {
    return this.localTag;
  }
}

export class runAfter {
  private localTag: string;
  private entityContext: SelectorClass;
  private time: TimeArgument;

  /**
   * This class is used to run a function after a specified time. retaining the context of the entity itself.
   *
   * @param {SelectorClass} entityContext - The entity context to run the callback on.
   * @param {() => void} callback - The callback function to run after the specified time.
   * @param {TimeArgument} time - The time to wait before running the callback.
   */
  constructor(entityContext: SelectorClass, callback: () => void, time: TimeArgument) {
    this.localTag = "run_after_" + Math.random().toString(36).slice(2);
    this.entityContext = entityContext;
    this.time = time;

    execute
      .as(this.entityContext)
      .as(Selector("@s", { tag: `!${this.localTag}` }))
      .run(() => {
        // Add the tag
        tag("@s").add(this.localTag);
        // Schedule the callback
        schedule.function(() => {
          execute
            .as(this.entityContext)
            .as(Selector("@s", { tag: this.localTag }))
            .at("@s")
            .run(() => {
              callback();
            });
        }, this.time);
      });
  }

  /**
   * Returns the tag associated with this instance.
   *
   * @return {string} The tag associated with this instance.
   */
  public getTag(): string {
    return this.localTag;
  }

  /**
   * Returns the entity context associated with this instance.
   *
   * @return {SelectorClass} The entity context associated with this instance.
   */
  public getEntityContext(): SelectorClass {
    return this.entityContext;
  }

  /**
   * Retrieves the time associated with this instance.
   *
   * @return {TimeArgument} The time associated with this instance.
   */
  public getTime(): TimeArgument {
    return this.time;
  }
}
