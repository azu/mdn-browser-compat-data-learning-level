<template>
  <div class="QuizContainer">
    <div class="QuizContainer-keylayer">
      <button class="QuizContainer-keylayerYes" v-shortkey="['arrowleft']" @shortkey="handleSelectYes()">←YES</button>
      <button class="QuizContainer-keylayerNo" v-shortkey="['arrowright']" @shortkey="handleSelectNo()">No→</button>
    </div>
    <div class="QuizContainer-main">
      <div class="QuizContainer-mainContent">
        <template v-if="mdnUrl">
          <h1 class="QuizContainer-mainTitle"><a :href=mdnUrl>{{title}}</a></h1>
        </template>
        <template v-else>
          <h1 class="QuizContainer-mainTitle">{{title}}</h1>
        </template>
        <p class="QuizContainer-mainDescription" v-html="description"></p>
      </div>
    </div>
    <div class="QuizContainer-selection">
      <div class="QuizContainer-yes"></div>
      <div class="QuizContainer-no"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuizContainer",
    props: {
      title: String,
      description: String,
      mdnUrl: String,
      onSelectYes: Function,
      onSelectNo: Function
    },
    methods: {
      handleSelectYes() {
        this.onSelectYes();
      },
      handleSelectNo() {
        this.onSelectNo();
      }
    }
  }
</script>

<style scoped>
  .QuizContainer, .QuizContainer-selection {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .QuizContainer-keylayer {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  .QuizContainer-keylayerYes, .QuizContainer-keylayerNo {
    position: absolute;
    width: 20%;
    height: 100%;
    background: transparent;
    border: none;
    font-size: 48px;
    color: #fff;
  }

  .QuizContainer-keylayerYes {
    top: 0;
    left: 0;
  }

  .QuizContainer-keylayerNo {
    top: 0;
    right: 0;
  }

  .QuizContainer-main {
    z-index: 1;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .QuizContainer-mainContent {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    min-width: 40em;
    min-height: 5em;
  }

  .QuizContainer-mainTitle {
    text-align: center;
    font-size: 32px;
  }

  .QuizContainer-mainTitle, .QuizContainer-mainTitle > a {
    color: rgba(16, 16, 16, 0.94);
  }

  .QuizContainer-mainDescription {
    text-align: center;
  }

  .QuizContainer-yes, .QuizContainer-no {
    flex: 1;
  }

  .QuizContainer-yes {
    color: #fff;
    background-color: #2a8d9b;
  }

  .QuizContainer-no {
    color: #fff;
    background-color: #d57264;
  }
</style>
