<template>
  <section class="container">
    <header class="App-header">
      <h1>Do you know this API?</h1>
      <p>
        <span>Yes: {{viewedYesItemCount}} / No:{{viewedNoItemCount}}</span>
        ｜<span>Viewed: {{viewedItemCount}} / Total: {{totalItemCount}}</span>
        ｜<span>Current: {{currentPath}}</span>
      </p>
    </header>
    <quiz-container class="App-QuizContainer"
                    :title="currentItem.name"
                    :mdn-url="currentItem.mdn_url"
                    :description="currentItem.description"
                    :on-select-yes="onSelectYes"
                    :on-select-no="onSelectNo"
    />
    :on-select-no="onSelectNo"/>
  </section>
</template>

<script>
  import QuizContainer from "../components/Quiz/QuizContainer"
  import { mapGetters } from 'vuex'
  import { types } from '../store/MDN.js'
  import { toArray } from "../store/Walker/mdn-util.js";

  export default {
    components: {
      QuizContainer
    },
    fetch({ store }) {
      if (process.server) {
        const compatData = require("mdn-browser-compat-data");
        store.dispatch(types.setMDN, toArray(compatData));
      }
    },
    mounted: function() {
      const currentPath = this.$store.getters.currentPath;
      console.log("currentPath", currentPath);
      if (!currentPath) {
        this.$store.dispatch(types.initialItem);
      } else {
        this.$store.dispatch(types.setCurrentItem, { path: currentPath })
      }
    },
    methods: {
      onSelectYes() {
        this.$store.dispatch(types.answerItem, {
          path: this.currentPath,
          selection: "yes"
        }).then(() => {
          return this.$store.dispatch(types.nextItem, { path: this.currentPath });
        });
      },
      onSelectNo() {
        this.$store.dispatch(types.answerItem, {
          path: this.currentPath,
          selection: "no"
        }).then(() => {
          return this.$store.dispatch(types.nextItem, { path: this.currentPath });
        });
      }
    },
    computed: {
      ...mapGetters([
        "currentPath",
        "currentItem",
        "totalItemCount",
        "viewedItemCount",
        "viewedNoItemCount",
        "viewedYesItemCount"
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

  .App-header {
    color: #fff;
    background-color: #066370;
    padding: 0.5rem 1rem;
  }

  .App-QuizContainer {
    width: 100%;
    height: 100%;
  }
</style>

