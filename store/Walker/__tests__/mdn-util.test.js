// MIT © 2018 azu
"use strict";
import * as assert from "assert";
import { toArray } from "../mdn-util.js";

const mdn = require("mdn-browser-compat-data");
describe("mdn-util", () => {
  describe("#toArray", () => {
    it("should return array", () => {
      const array = toArray(mdn);
      assert.deepStrictEqual(array[0], {
        "category": "API",
        "name": "ANGLE_instanced_arrays",
        "path": "/api/ANGLE_instanced_arrays",
        "description": "",
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/ANGLE_instanced_arrays"
      });
      assert.deepStrictEqual(array[100], {
        "category": "API",
        "path": "/api/AudioContext/createMediaElementSource",
        "description": "",
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/AudioContext/createMediaElementSource",
        "name": "AudioContext.createMediaElementSource",
      });
      assert.deepStrictEqual(array[1000], {
        "category": "API",
        "path": "/api/Document/documentElement",
        "description": "",
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/Document/documentElement",
        "name": "Document.documentElement"
      });

    });
  });
});
