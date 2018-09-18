<template>
  <section class="container">

    <a href="https://github.com/azu/mdn-browser-compat-data-learning-level"><img
      style="position: absolute; top: 0; right: 0; border: 0; z-index: 10;"
      src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
    <header class="App-header">
      <h1 class="App-headerTitle">Do you know MDN APIs?</h1>
      <p class="App-headerMeta">
        <span>Yes: {{viewedYesItemCount}} / No: {{viewedNoItemCount}}</span>
        ｜<span>Viewed: {{viewedItemCount}} / Total: {{totalItemCount}}</span>
        ｜<span>Current: {{currentPath}}</span>
      </p>
      <p class="App-headerShare">
        <button class="App-headerShareButton" @click="shareResults()">Share results to Twitter</button>
        <button class="App-headerShareButton" @click="copyResuls()">Copy results</button>
      </p>
    </header>
    <quiz-container class="App-QuizContainer"
                    :title="currentItem.name"
                    :category="currentItem.category"
                    :mdn-url="currentItem.mdn_url"
                    :description="currentItem.description"
                    :on-select-yes="onSelectYes"
                    :on-select-no="onSelectNo"
    />
  </section>
</template>

<script>
  import QuizContainer from "../components/Quiz/QuizContainer"
  import { mapGetters } from 'vuex'
  import { types } from '../store/MDN.js'
  import { toArray } from "../store/Walker/mdn-util.js";

  const copy = require('clipboard-copy');

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
      },
      shareResults() {
        const results = this.formattedResults;
        const message = `Do you know MDN APIs?
${results}`;
        const pageURL = "https://mdn-browser-compat-data-learning-level.netlify.com/";
        const shareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageURL)}&text=${encodeURIComponent(message)}`;
        window.open(shareURL, "_blank");
      },
      copyResuls() {
        copy(this.formattedResults);
      }
    },
    computed: {
      ...mapGetters([
        "currentPath",
        "currentItem",
        "totalItemCount",
        "viewedItemCount",
        "viewedNoItemCount",
        "viewedYesItemCount",
        "formattedResults"
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
  }

  .App-headerTitle {
    padding: 0.5rem 1rem;
  }

  .App-headerMeta {
    background-color: #2a8d9b;
    padding: 0.5rem 1rem;
  }

  .App-headerShare > button {
    margin-right: 4px;
  }

  .App-headerShareButton {
    border-radius: 3px;
    box-shadow: 0 3px 0 rgba(136, 136, 136, 1);
    color: #066370;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    padding: 4px 8px;
  }

  .App-headerShare {
    padding: 0.5rem 1rem;
  }

  .App-QuizContainer {
    width: 100%;
    height: 100%;
  }
</style>

