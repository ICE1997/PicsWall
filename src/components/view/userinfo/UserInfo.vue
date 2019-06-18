<template>
  <div class="user">
    <GoTop/>
    <header class="m-header">
      <Nav class="navigator"/>
      <div class="blur"></div>
      <transition appear name="fadeInDown">
        <div class="username">{{username}}</div>
      </transition>

      <transition appear name="fadeInDown">
        <div class="followedFans">关注人数:{{followedFans}}</div>
      </transition>

      <div class="briefIntro">{{info.briefIntro}}</div>

      <transition appear name="fadeInDown">
        <b-button @click="follow" v-if="!followed" class="follow">关注</b-button>
        <b-button @click="follow" v-if="followed" class="follow">已关注</b-button>
      </transition>
      <transition appear name="fadeInDown">
        <div class="usericon">{{firstA}}</div>
      </transition>

      <div class="userinfo">
        <div class="phone">
          QQ:
          <span>{{info.qq}}</span>
        </div>
        <div class="email">
          E-mail:
          <span>{{info.email}}</span>
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
import Wall from "../userinfo/Wall.vue";
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
    ...mapState("otherszone", ["username", "info", "followed", "followedFans"]),
    ...mapState("user", ["logined"]),
    firstA() {
      return this.username.charAt(0);
    }
  },
  methods: {
    follow() {
      this.$store.dispatch("otherszone/follow");
    }
  },
  watch: {
    logined() {
      this.$store.dispatch("user/init");
    }
  },
  created() {
    this.$store.dispatch("user/init");
    this.$store.dispatch("otherszone/init");
    this.$store.dispatch("otherszone/checkFollowed");
    this.$store.dispatch("otherszone/loadInfo");
    this.$store.dispatch("otherszone/getFollowersNum");
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

.followedFans {
  position: absolute;
  color: white;
  align-self: center;
  bottom: 70px;
  right: 42%;
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

.phone span,
.email span {
  padding-left: 16px;
}
</style>






