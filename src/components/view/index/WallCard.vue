<template>
  <transition appear name="fadeInLeft">
    <b-container class="wp-card">
      <canvas :id="id"></canvas>
      <b-container class="wp-card-info">
        <div class="publisher">{{author}}</div>
        <div class="like">
          <font-awesome-icon icon="heart" @click="like" class="icon"/>
          <span class="p-num">{{likes}}人</span>
        </div>
      </b-container>
    </b-container>
  </transition>
</template>

<script>
import "@fortawesome/fontawesome-free";
import { mapState } from "vuex";
export default {
  props: ["id", "author", "likes", "WJSON"],
  data: function() {
    return {
      liked: false
    };
  },
  computed: {
    ...mapState("user", ["logined"])
  },
  watch: {},
  methods: {
    like: function(e) {
      if (this.logined) {
        if (this.liked === false) {
          this.$store.dispatch("picsWall/like", this.id);
          this.changeColor(e, "red");
          this.liked = true;
        } else {
          this.$store.dispatch("picsWall/like", this.id);
          this.changeColor(e, "grey");
          this.liked = false;
        }
      }else{
        console.log("请先登录~~~");
      }
    },
    changeColor: function(e, color) {
      let likeIcon = e.target;
      switch (likeIcon.tagName) {
        case "svg":
          likeIcon.style.color = color;
          break;
        case "path":
          likeIcon.parentElement.style.color = color;
          break;
        default:
      }
    },
    init() {
      let mcs = new fabric.StaticCanvas(this.id);
      let json = this.WJSON;
      mcs.setHeight(960 * 0.41667);
      mcs.setWidth(960 * 0.83333);
      mcs.loadFromJSON(json, mcs.renderAll.bind(mcs));
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.fadeInLeft-enter-active {
  animation: fadeInLeft 1s;
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

.wp-card {
  padding-left: 0;
  padding-right: 0;
}
</style>


<style scoped>
.wp-card {
  position: relative;
  margin-top: 2rem;
  background-color: #fff;
  width: 50%;
  height: 0;
  padding-bottom: 25%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.wp-card .wp-card-info {
  position: absolute;
  bottom: 0;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
}

.wp-card .wp-card-info .like {
  position: absolute;
  display: inline-block;
  left: 5%;
  top: 0;
}

.wp-card .wp-card-info .publisher {
  font-size: 24px;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.wp-card .wp-card-info .like .icon {
  color: grey;
  transition: all 0.3s;
}

.wp-card .wp-card-info .like .p-num {
  position: relative;
  margin-left: 8px;
}
</style>