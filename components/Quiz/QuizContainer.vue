<template>
  <div class="QuizContainer">
    <div class="QuizContainer-main">
      <h1 class="QuizContainer-mainTitle">TEST DATA</h1>
    </div>
    <div class="QuizContainer-selection">
      <div class="QuizContainer-yes"></div>
      <div class="QuizContainer-no"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuizContainer"
  }
</script>

<style scoped>
  .QuizContainer, .QuizContainer-selection {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
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

  .QuizContainer-mainTitle {
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
