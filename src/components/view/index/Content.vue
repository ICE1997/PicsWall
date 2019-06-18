<template>
  <b-container class="main-content" fluid>
    <b-nav class="d-flex justify-content-center align-items-center title-box">
      <b-nav-item
        class="title"
        to="/"
        exact-active-class="hasSelected"
      >首页</b-nav-item>
      <b-nav-item
        v-show="logined"
        class="title"
        to="/followed"
        exact-active-class="hasSelected"
      >关注</b-nav-item>
      <b-nav-item
        class="title"
        to="/public"
        exact-active-class="hasSelected"
      >公共墙</b-nav-item>
      <b-nav-item
        v-show="logined"
        class="title"
        to="/my"
        exact-active-class="hasSelected"
      >我的</b-nav-item>
    </b-nav>
    <router-view></router-view>
  </b-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
    ...mapState("user", ["logined"]),
    },
    methods: {
  }
}
</script>

<style>

.main-content {
  position: relative;
}

.title-box {
  position: absolute;
  width: 60%;
  height: 64px;
  top: -32px;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.title-box .title {
  font-size: 24px;
  margin: 0 16px;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: all 0.3s;
  cursor: pointer;
}

.title a {
  color: white !important;
  transition: all 0.5s;
}

.title a:hover {
  color: rgba(255, 255, 255, 0.75) !important;
}

.title-box .title:active {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
