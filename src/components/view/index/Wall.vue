<template>
  <div class= "wp">
    <wall-card
      v-for="publisher in publishers"
      :key="publisher.id"
      :author="publisher.author"
      :likes="publisher.likes"
      :src="publisher.bcp"
      :alt="publisher.name"
    ></wall-card>
  </div>
</template>


<script>
import WallCard from "./WallCard.vue";
export default {
  data: function() {
    return {
      publishers: [
        {
          id: 1,
          author: "何某某",
          likes: "999",
          bcp: "/src/img/head1.jpg",
          name: "沙滩"
        },
        {
          id: 2,
          author: "杨某某",
          likes: "2",
          bcp: "/src/img/head.jpg",
          name: "枫叶"
        },
        {
          id: 3,
          author: "你才",
          likes: "66333",
          bcp: "/src/img/head.jpg",
          name: "背景图"
        },
        {
          id: 4,
          author: "你才",
          likes: "66333",
          bcp: "/src/img/head.jpg",
          name: "背景图"
        },
        {
          id: 5,
          author: "你才",
          likes: "66333",
          bcp: "/src/img/head.jpg",
          name: "背景图"
        }
      ]
    };
  },
  components: {
    WallCard
  }
};
</script>


<style scoped>
.wp {
  position: relative;
  margin: 0 auto;
  padding: 0;
  padding-top: 8px;
  padding-bottom: 48px;
}
</style>
