// MIT © 2018 azu
"use strict";
import { Walker } from "./Walker.js";

// https://github.com/mdn/browser-compat-data#repository-contents
const CategoryName = [
  "API",
  "CSS",
  "HTML",
  "HTTP",
  "JavaScript",
  "MathML",
  "SVG",
  "WebDriver",
  "WebExtensions",
  "XPath",
  "XSLT"
];

export const toArray = (data) => {
  const walker = new Walker();
  const items = [];
  for (const item of walker.walk(data)) {
    if (item.value && item.value.status && item.value.status.standard_track) {
      const category = CategoryName.find(name => {
        const PREFIX_CATEGORY = `/${name.toLowerCase()}/`;
        return item.currentPath.includes(PREFIX_CATEGORY);
      });
      const name = item.currentPath
        .replace(`/${category.toLowerCase()}/`, "")
        .replace(/\//g, ".");
      items.push({
        name,
        category,
        mdn_url: item.value.mdn_url,
        description: item.value.description || "",
        path: item.currentPath
      });
    }
  }
  return items;
};
