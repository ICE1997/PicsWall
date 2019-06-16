<template>
  <div class="wp">
    <transition appear name="fadeInDown">
      <a class="mcard" href="./editor.html" target="_blank">+</a>
    </transition>
    <wallCard
      v-for="wall in myWalls"
      :key="wall.id"
      :id="wall.id"
      :author="wall.author"
      :likes="wall.likes"
      :liked="wall.liked"
      :WJSON="wall.wallJSON"
    />
  </div>
</template>

<script>
import WallCard from "./WallCard.vue";
import { mapState, mapActions } from "vuex";
export default {
  data: function() {
    return {};
  },
  computed: {
    ...mapState("picsWall", ["myWalls"])
  },
  components: {
    WallCard
  },
  mounted: function() {
    this.$store.dispatch("picsWall/loadMyWalls");
  },
  methods: {}
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

.mcard {
  position: relative;
  display: inline-block;
  text-decoration: none;
  width: 800px;
  height: 400px;
  margin: 16px;
  line-height: 400px;
  text-align: center;
  color: white;
  font-size: 64px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  transition: all 0.5s;
}

.mcard:hover {
  background-color: rgba(0, 0, 0, 0.5);
  color: black;
  cursor: pointer;
  text-decoration: none;
}
</style>


<style scoped>
.wp {
  position: relative;
  margin: 0 auto;
  padding: 0;
  padding-top: 8px;
  padding-bottom: 48px;
  text-align: center;
}
</style>
