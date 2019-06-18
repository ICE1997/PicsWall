<template>
  <div class="user">
    <GoTop/>
    <header class="m-header">
      <Nav class="navigator"/>
      <transition appear name="fadeIn">
        <div class="blur"></div>
      </transition>
      <transition appear name="fadeInDown">
        <div class="username">{{username}}</div>
      </transition>

      <transition appear name="fadeInDown">
        <div class="followedFans">关注人数:{{followedFans}}</div>
      </transition>

      <input type="text" class="briefIntro" @blur="save" v-model="info.briefIntro">

      <transition appear name="fadeInDown">
        <div class="usericon">{{firstA}}</div>
      </transition>

      <div class="userinfo">
        <div class="phone">
          手机号:
          <input @blur="save" type="text" v-model="info.qq">
        </div>
        <div class="email">
          E-mail:
          <input @blur="save" type="text" v-model="info.email">
        </div>
      </div>
    </header>

    <div class="main">
      <Wall/>
    </div>

    <Foot/>
  </div>
</template>

<script>
import Nav from "../index/Navigator.vue";
import Foot from "../index/Footer.vue";
import Wall from "../myzone/Wall.vue";
import GoTop from "../index/GoTop.vue";
import { mapState } from "vuex";

export default {
  components: {
    Nav,
    Foot,
    Wall,
    GoTop
  },
  computed: {
    username() {
      return this.$store.state.user.userInfo.username;
    },
    firstA() {
      return this.$store.state.user.userInfo.username.charAt(0);
    },
    ...mapState("myzone", ["info", "followedFans"]),
    ...mapState("user", ["logined"])
  },
  methods: {
    save() {
      this.$store.dispatch("myzone/save");
    }
  },
  watch: {
    logined() {
      this.$store.dispatch("user/init");
      this.$store.dispatch("myzone/loadinfo");
    }
  },
  created() {
    this.$store.dispatch("user/init");
    this.$store.dispatch("myzone/loadinfo");
       this.$store.dispatch("myzone/getFollowersNum");
  }
};
</script>


<style>
.fadeInDown-enter-active {
  animation: fadeInDown 1s;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeIn-enter-active {
  animation: fadeIn 0.5s;
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}

.user {
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
  padding: 32px;
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

.follow {
  position: absolute;
  bottom: 64px;
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
  text-align: center;
  color: white;
}

.followedFans {
  position: absolute;
  color: white;
  bottom: 64px;
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

.phone input,
.email input {
  padding-left: 16px;
}

input {
  color: white;
  background-color: transparent;
  border: none;
  transition: all 0.3s;
}

input:hover {
  border: 0.5px solid white;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>






