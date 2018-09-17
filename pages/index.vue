<template>
  <section class="container">
    <p> / {{totalCount}}</p>
    <quiz-container class="App-QuizContainer"/>
  </section>
</template>

<script>
  import QuizContainer from "../components/Quiz/QuizContainer"
  import { mapGetters } from 'vuex'
  import { types } from '../store/MDN.js'
  export default {
    components: {
      QuizContainer
    },
    data() {
      return {
        mdn: Object.freeze({})
      }
    },
    fetch({ store }) {
      if (process.server) {
        const compatData = require("mdn-browser-compat-data");
        store.dispatch(types.setMDN, compatData);
      }
    },
    mounted: function() {
      // console.log(this.$store.state.MDN);
    },
    computed: {
      ...mapGetters([
        "totalCount"
      ])
    }
  }
</script>

<style>
  .container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .App-QuizContainer {
    width: 100%;
    height: 100%;
  }
</style>

