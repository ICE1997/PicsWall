<template>
  <transition appear name="fadeInLeft">
    <b-container class="wp-card">
      <b-button @click="edit" variant="light" class="editBTN">编辑</b-button>
      <canvas :id="id"></canvas>
      <b-container class="wp-card-info">
        <a
          @click="checkoutAuthor(author)"
          class="publisher"
          href="./userinfo.html"
          target="_blank"
        >{{author}}</a>
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
    checkoutAuthor(author) {
      let payload = {
        user: author
      };
      this.$store.dispatch("otherszone/checkoutAuthor", payload);
    },
    like: function(e) {
      if (this.logined) {
        let payload = {
          id: this.id
        };
        this.$store.dispatch("publicWall/like", payload);
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
    },
    edit() {
      let editable = true;
      let payload = {
        id: this.id
      };
      this.$store.dispatch("editor/reqEdit", payload).then(data => {
        if (data) {
          this.$store.dispatch("editor/setEditalbe");
          window.open("editor.html");
        } else {
          console.log("不可编辑~~~");
        }
      });
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
  transition: all 0.3s;
}

.wp-card .wp-card-info .like .p-num {
  position: relative;
  margin-left: 8px;
}

.editBTN {
  position: absolute;
  top: 0;
  right: 0;
}

.editBTN {
}
</style>