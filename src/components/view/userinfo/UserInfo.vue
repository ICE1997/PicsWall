<template>
  <div>
    <header class="m-header">
      <Nav class="navigator"/>
      <div class="blur"></div>
      <div class="username">HFS</div>

      <div class="briefIntro">This is me!</div>
      <div class="usericon">H</div>

      <div class="userinfo">
        <div class="phone">手机号:18756005001</div>
        <div class="email">E-mail:592092078@qq.com</div>
      </div>
    </header>

    <div class="main">
      <div class="wall">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
    </div>

    <Foot />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-image: url("/dist/img/blue.jpg");
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}

.navigator {
  width: 100%;
  align-self: flex-start;
  z-index: 99;
}

.main {
  position: relative;
  /* height: 1920px; */
  padding: 32px;
  /* background-color: #fff; */
}

.foot {
  height: 84px;
  background-color: rgba(0, 0, 0, 0.5);
}

.m-header {
  position: relative;
  display: flex;
  height: 360px;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid white;
  background-attachment: fixed;
}

.m-header .blur {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  background-image: url("/dist/img/blue.jpg");
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}

.username {
  position: absolute;
  color: white;
  align-self: center;
  font-size: 64px;
}

.usericon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 64px;
  height: 64px;
  bottom: -32px;
  font-size: 24px;
  border-radius: 50%;
  background-color: #fff;
}

.briefIntro {
  display: flex;
  position: absolute;
  height: 32px;
  width: 45%;
  bottom: 0;
  left: 0;
  align-items: center;
  color: white;
  justify-content: center;
}

.userinfo {
  display: flex;
  position: absolute;
  height: 32px;
  width: 45%;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
}

.userinfo div {
  color: white;
  font-size: 16px;
  width: 50%;
  text-align: center;
}

.wall {
  margin-top: 16px;
  height: 100%;
  text-align: center;
}

.card {
  display: inline-block;
  width: 800px;
  height: 400px;
  margin: 16px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>


<script>

import Nav from '../index/Navigator.vue'
import Foot from '../index/Footer.vue'
export default {
    components:{
        Nav,Foot
    }
}
</script>

