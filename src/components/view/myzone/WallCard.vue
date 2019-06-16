<template>
  <transition appear name="fadeInDown">
    <b-container class="wp-card">
      <canvas :id="id"></canvas>
      <b-container class="wp-card-info">
        <div class="publisher">{{author}}</div>
        <div class="like">
          <font-awesome-icon
            icon="heart"
            @click="like"
            :class="[liked ? 'redicon' : 'greyicon' ]"
            class="icon"
          />
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
  props: ["id", "author", "likes", "liked", "WJSON"],
  data: function() {
    return {};
  },
  computed: {
    ...mapState("user", ["logined"])
  },
  watch: {},
  methods: {
    like: function(e) {
      if (this.logined) {
        let payload = {
          id: this.id
        };
        this.$store.dispatch("picsWall/like", payload);
      } else {
        console.log("请先登录~~~");
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
.fadeInDown-enter-active {
  animation: fadeInDown 1s;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
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
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.wp-card {
  padding-left: 0;
  padding-right: 0;
}

.redicon {
  color: red;
}

.greyicon {
  color: grey;
}
</style>


<style scoped>
.wp-card {
  position: relative;
  display: inline-block;
  width: 800px;
  height: 400px;
  margin: 16px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.wp-card .wp-card-info {
  position: absolute;
  display: flex;
  bottom: 0;
  height: 15%;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
}

.wp-card .wp-card-info .like {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  left: 5%;
}

.wp-card .wp-card-info .publisher {
  font-size: 24px;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.wp-card .wp-card-info .like .icon {
  transition: all 0.3s;
}

.wp-card .wp-card-info .like .p-num {
  position: relative;
  margin-left: 8px;
}
</style>