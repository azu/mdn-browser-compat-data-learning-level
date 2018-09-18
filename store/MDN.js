// MIT © 2018 azu

import { CategoryName } from "./Walker/mdn-util.js";

export const state = {
  /**
   * [{
        "name": "Document.documentElement"
        "category": "API",
        "path": "/api/Document/documentElement",
        "description": "",
        "mdn_url": "https://developer.mozilla.org/docs/Web/API/Document/documentElement",
      }]
   */
  mdn: {},
  /**
   * [{ path: String ,selection: "yes" | "no" }]
   */
  viewItems: [],
  currentItem: {},
};

export const types = {
  setMDN: "setMDN",
  answerItem: "answerItem",
  initialItem: "initialItem",
  nextItem: "nextItem",
  setCurrentItem: "setCurrentItem"
};

export const actions = {
  [types.setMDN]: ({ commit }, mdn) => {
    commit(types.setMDN, { mdn: mdn })
  },
  [types.answerItem]: ({ commit }, { path, selection }) => {
    commit(types.answerItem, { path, selection })
  },
  [types.initialItem]: ({ dispatch }) => {
    // return dispatch(types.nextItem)
  },
  [types.nextItem]: ({ commit, state }, { path } = {}) => {
    // if it is ended, loop to first
    const firstItem = state.mdn[0];
    if (!firstItem) {
      throw new Error("First item is not found");
    }
    if (!path) {
      return commit(types.setCurrentItem, { item: firstItem });
    }
    const currentItemIndex = state.mdn.findIndex(item => item.path === path);
    if (currentItemIndex === -1) {
      return commit(types.setCurrentItem, { item: firstItem });
    }
    const nextItem = state.mdn[currentItemIndex + 1];
    if (!nextItem) {
      return commit(types.setCurrentItem, { item: firstItem });
    }
    return commit(types.setCurrentItem, { item: nextItem });
  },
  [types.setCurrentItem]: ({ commit, state }, { path } = {}) => {
    const currentItem = state.mdn.find(item => item.path === path);
    if (!currentItem) {
      return;
    }
    return commit(types.setCurrentItem, { item: currentItem });
  }
};

export const mutations = {
  [types.setMDN]: (state, action) => {
    state.mdn = Object.freeze(action.mdn);
  },
  [types.answerItem]: (state, { path, selection }) => {
    const index = state.viewItems.findIndex(item => item.path === path);
    if (index === -1) {
      state.viewItems.push({ path, selection })
    } else {
      state.viewItems[index] = { path, selection };
    }
  },
  [types.setCurrentItem]: (state, { item }) => {
    state.currentItem = item;
  }
};

const formatPercent = (child, parent) => {
  return Math.round((child / parent) * 100) + "%";
};
export const getters = {
  currentItem: (state) => state.currentItem,
  currentPath: (state) => {
    if (!state.currentItem) {
      return undefined;
    }
    return state.currentItem.path;
  },
  viewedYesItemCount: (state) => {
    return state.viewItems.filter(value => value.selection === "yes").length;
  },
  viewedNoItemCount: (state) => {
    return state.viewItems.filter(value => value.selection === "no").length;
  },
  viewedItemCount: (state) => {
    return state.viewItems.length;
  },
  totalItemCount: (state) => {
    return state.mdn.length;
  },
  responseRate: (state) => {
    const viewCount = state.viewItems.length;
    const totalCount = state.mdn.length;
    return `Response Rate:${viewCount}/${totalCount}(${formatPercent(viewCount, totalCount)})`;
  },
  formattedResults: (state) => {
    const viewCount = state.viewItems.length;
    const totalCount = state.mdn.length;
    const itemsByName = CategoryName.map(name => {
      const lowerName = name.toLowerCase();
      const totalItems = state.mdn.filter(item => item.path.startsWith(`/${lowerName}`));
      const yesItems = state.viewItems.filter(item => item.path.startsWith(`/${lowerName}`))
        .filter(item => item.selection === "yes");
      return {
        name,
        totalItems: totalItems,
        yesItems
      }
    });
    const allYes = state.viewItems.filter(item => item.selection === "yes");
    return `
All:${allYes.length}/${totalCount}(${formatPercent(allYes.length, totalCount)})
${itemsByName.map(result => {
      return `${result.name}:${result.yesItems.length}/${result.totalItems.length}(${formatPercent(result.yesItems.length, result.totalItems.length)})`
    }).join("\n")}
    `.trim();
  }
};
