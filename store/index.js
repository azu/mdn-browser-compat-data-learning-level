import Vuex from 'vuex'
import * as MDN from "./MDN.js";

const store = () => new Vuex.Store({
  modules: {
    MDN: MDN
  },
  strict: false,
});

export default store
