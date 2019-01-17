// MIT © 2018 azu
"use strict";
import * as assert from "assert";
import { toArray } from "../mdn-util.js";

const mdn = require("mdn-browser-compat-data");
describe("mdn-util", () => {
  describe("#toArray", () => {
    it("should return array", () => {
      const array = toArray(mdn);
      assert.ok(Array.isArray(array));
      assert.deepStrictEqual(array[0], {
        "category": "API",
        "name": "ANGLE_instanced_arrays",
        "path": "/api/ANGLE_instanced_arrays",
        "description": "",
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/ANGLE_instanced_arrays"
      });
    });
  });
});
