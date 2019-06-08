<template>
  <div id="app" ref="app">
    <m-go-top/>
    <m-header/>
    <m-content/>
    <m-footer/>
  </div>
</template>

<script>
import mHeader from "./Header.vue";
import mContent from "./Content.vue";
import mGoTop from "./GoTop.vue";
import mFooter from "./Footer.vue";
import mLogin from "./Login.vue";
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

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#app {
  background-image: url("/src/img/wall.jpg");
}
</style>


