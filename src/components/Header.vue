<template>
  <header class="container-fluid header" id="mHeader">
    <m-nav/>
    <p class="container-fluid slogan">Old Days</p>
    <div class="d-flex justify-content-center title-box">
      <div class="d-inline title">首页</div>
      <div class="d-inline title">好友</div>
      <div class="d-inline title">我的</div>
    </div>
  </header>
</template>

<script>
import mNav from "./Navigator.vue";

export default {
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
            height: 64px;
            width: 60%;
            bottom: -32px;
            margin-left: 20%;
            margin-right: 20%;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 99;
        }
        
        .header .title-box .title {
            position: relative;
            font-size: 24px;
            line-height: 64px;
            color: white;
            padding-left: 2rem;
            padding-right: 2rem;
            margin: 0 auto;
            transition: all 0.3s;
            cursor: pointer;
        }

        .header .title-box .title:active {
            background-color: rgba(0, 0, 0, 0.7);
            transform: scale(1.1);
        }
</style>


