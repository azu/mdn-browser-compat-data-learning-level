import Vuex from 'vuex'
import * as MDN from "./MDN.js";

const store = () => new Vuex.Store({
  modules: {
    MDN: MDN
  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store
