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
  methods: {}
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
</style>
