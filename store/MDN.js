// MIT © 2018 azu
import { Walker } from "./Walker/Walker.js";

export const state = {
  mdn: {}
};

export const types = {
  setMDN: "setMDN"
};

export const actions = {
  [types.setMDN]: ({ commit }, mdn) => {
    commit(types.setMDN, { mdn: mdn })
  }
};

export const mutations = {
  [types.setMDN]: (state, action) => {
    state.mdn = Object.freeze(action.mdn);
  }
};

export const getters = {
  totalCount: (state) => {
    const walker = new Walker();
    return walker.countItems(state.mdn);
  }
};
