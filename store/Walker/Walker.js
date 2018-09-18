// MIT © 2018 azu
"use strict";

export class Walker {

  countItems(data) {
    let count = 0;
    for (const _item of this.walk(data)) {
      count++;
    }
    return count;
  }

  /**
   * @param data
   * @param currentPath
   * @returns {IterableIterator<{ key:string, value: any, currentPath:string}>}
   */
  * walk(data, currentPath = "") {
    if (!data) {
      return;
    }
    if (typeof data !== "object") {
      return;
    }
    for (const entry of Object.entries(data)) {
      const [key, value] = entry;
      if (value && value.status && value.status.standard_track) {
        yield { key, value, currentPath }
      } else {
        yield* this.walk(value, `${currentPath}/${key}`);
      }
    }
  }
}
