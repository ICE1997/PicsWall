<template>
  <div class="wp">
    <wallCard
      v-for="publisher in publishers"
      :key="publisher.id"
      :author="publisher.author"
      :likes="publisher.likes"
      :src="publisher.bcp"
      :alt="publisher.name"
    />
  </div>
</template>

<script>
import WallCard from "./WallCard.vue";
import {mapState,mapActions} from 'vuex'
export default {
  data: function() {
    return {
    };
  },
  watch: {
    publishers: function() {}
  },
  computed: {
    ...mapState('picsWall',['publishers'])
  },
  components: {
    WallCard
  },
  mounted: function() {
    this.$store.dispatch('picsWall/loadPublishers');
  },
  methods: {},

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
}
</style>
