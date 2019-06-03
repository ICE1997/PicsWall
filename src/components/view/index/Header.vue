<template>
  <header class="container-fluid header" id="mHeader">
    <m-nav/>
    <p class="container-fluid slogan">Old Days</p>
    <b-nav v-if="login" class="d-flex justify-content-center align-items-center title-box">
      <b-nav-item class="title">首页</b-nav-item>
      <b-nav-item class="title">好友</b-nav-item>
      <b-nav-item class="title">我的</b-nav-item>
    </b-nav>
  </header>
</template>

<script>
import mNav from "./Navigator.vue";

export default {
  data: function() {
    return {
      login: true
    };
  },
  components: {
    mNav
  }
};
</script>

<style scoped>
.header {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 521px;
}

.header .slogan {
  position: absolute;
  color: white;
  left: -35%;
  font-size: 5rem;
  text-align: center;
  top: 50%;
}

.header .title-box {
  position: absolute;
  width: 60%;
  height: 64px;
  bottom: -32px;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.header .title-box .title {
  font-size: 24px;
  margin: 0 16px;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: all 0.3s;
  cursor: pointer;
}

.title a {
  color: white !important;
}


.title a:hover {
  color: rgba(255, 255, 255, .75) !important;
}

.header .title-box .title:active {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}
</style>


