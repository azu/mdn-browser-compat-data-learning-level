// MIT © 2018 azu
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'mdn-browser-compat-data-learning-level',
    reducer: (persistedState) => {
      const stateFilter = Object.assign({}, persistedState);
      const blackList = ['mdn'];
      blackList.forEach((item) => {
        delete stateFilter[item]
      });
      return stateFilter
    }
  })(store)
}
