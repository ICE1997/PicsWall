<template>
  <div id="app" ref="app">
    <m-go-top/>
    <m-header/>
    <m-content/>
    <m-footer/>
  </div>
</template>

<script>
import mHeader from "./components/Header.vue";
import mContent from "./components/Content.vue";
import mGoTop from "./components/GoTop.vue";
import mFooter from "./components/Footer.vue";
import mLogin from "./components/Login.vue";
export default {
  name: "App",
  components: {
    mHeader,
    mContent,
    mGoTop,
    mFooter,
    mLogin
  }
};
</script>

<style scoped>
#app {
  background-image: url("/src/img/wall.jpg");
}
</style>


