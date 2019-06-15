<template>
  <div class="wp">
    <wallCard
      v-for="wall in walls"
      :key="wall.id"
      :id="wall.id"
      :author="wall.author"
      :likes="wall.likes"
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
    ...mapState("picsWall", ["walls"])
  },
  components: {
    WallCard
  },
  mounted: function() {
    this.$store.dispatch("picsWall/loadWalls");
  },
  methods: {
  }
};
</script>

<style>
.outerCanvas {
  position: relative;
  height: 400px;
  width: 800px;
}

.test {
  position: relative;
  margin: 0 auto;
  border: 0.5px dotted #d8d8d8;
  overflow: hidden;
}
.canvas-container {
  margin: 0 auto;
}

.wp-card-info {
  position: absolute;
  height: 64px;
  line-height: 64px;
  /* margin: 0 -15px; */
  text-align: center;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 999;
}

.wp-card-info .like {
  position: absolute;
  display: inline-block;
  left: 5%;
  top: 0;
}
.wp-card-info .like .icon {
  color: grey;
  transition: all 0.3s;
}
.wp-card-info .like .p-num {
  position: relative;
  margin-left: 8px;
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
