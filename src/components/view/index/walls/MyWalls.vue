<template>
  <div class="wp">
    <wallCard
      v-for="wall in walls"
      :key="wall.id"
      :id="wall.id"
      :author="wall.author"
      :likes="wall.likes"
      :liked="wall.liked"
      :WJSON="wall.wallJSON"
    />
    <div class="loading" v-show="!toTheEnd && loading">
      <b-spinner small type="grow"></b-spinner>Loading...
    </div>
    <div class="loading" v-show="toTheEnd">已加载全部</div>
  </div>
</template>

<script>
import WallCard from "./MyCard.vue";
import { mapState, mapActions } from "vuex";
export default {
  data: function() {
    return {};
  },
  computed: {
    ...mapState("myWall", ["walls", "loading", "toTheEnd"])
  },
  components: {
    WallCard
  },
  created() {
    this.$store.dispatch("myWall/initWalls");
  },
  updated(){

  },
  mounted: function() {
    this.$store.dispatch("myWall/loadWalls");
    this.loadmoreEvent();
  },
  methods: {
    reqLoadmore() {
      this.$store.dispatch("myWall/loadWalls");
    },
    loadmoreEvent() {
      let t = this;
      window.onscroll = function(e) {
        let visibleTop =
          document.body.scrollTop || document.documentElement.scrollTop; //当前可视范围的顶部
        let visibleHeight = document.documentElement.clientHeight; //可视范围的高度
        let allHeight = document.body.clientHeight; //整个文档的高度，因此visibleTop + viibleHeight == allHeight;
        if (visibleTop + visibleHeight >= allHeight && !t.loading) {
          console.log("到达底部了~~~");
          t.reqLoadmore();
        }
      };
    }
  }
};
</script>

<style>
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 36px;
  color: white;
  font-size: 24px;
}

.loading span {
  width: 3rem;
  height: 3rem;
}
</style>
