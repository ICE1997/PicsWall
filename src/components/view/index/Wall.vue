<template>
  <div  class="wp">
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
        },
        {
          id: 6,
          author: "你才",
          likes: "66333",
          bcp: "/src/img/head.jpg",
          name: "背景图"
        }
      ]
    };
  },
  watch: {
 
  },
  computed: {

  },
  components: {
    WallCard
  },
  mounted: function() {

  },
  methods:{
      ig: function() {
        let t = this;
        let r;
        let content = { "imgpath": "uploads\\img-1559654220746.jpg" };
        fetch("http://192.168.77.16:3000/load/img", {
          method:'post',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(content)
        }).then(response=>response.blob()).then((data)=>{
          console.log(data);
          let reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = function(e) {
            console.log("OK" + this.result);
          }
        })
        return r;
      },
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
