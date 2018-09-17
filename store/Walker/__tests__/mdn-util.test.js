// MIT © 2018 azu
"use strict";
import { toArray } from "../mdn-util.js";

const mdn = require("mdn-browser-compat-data");
describe("mdn-util", () => {
  describe("#toArray", () => {
    it("should return array", () => {
      const array = toArray(mdn);
      console.log(array);
    });
  });
});
