// MIT © 2018 azu
"use strict";
import { Walker } from "./Walker.js";

export const toArray = (data) => {
  const walker = new Walker();
  for (const item of walker.walk(data)) {
    console.log(item.currentPath);
  }
  return data;
};
