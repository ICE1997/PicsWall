<template>
  <b-container fluid class="wp-card" :style="bcg">
    <b-container class="wp-card-info">
      <div class="publisher">发布者:{{ author }}</div>
      <div class="like">
        <font-awesome-icon v-on:click="like" icon="heart" class="icon"/>
        <span class="p-num">{{ likeNum }}人</span>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import "@fortawesome/fontawesome-free";
export default {
  props: ["author", "likes", "src", "alt"],
  data: function() {
    return {
      liked: false,
      likeNum: this.likes,
      bcg: {
        backgroundImage: "url(" + this.src + ")"
      }
    };
  },
  computed: {},
  watch:{
    
  },
  methods: {
    like: function(e) {
      if (this.liked === false) {
        console.log("已赞");
        this.changeColor(e, "red");
        this.likeNum++;
        this.liked = true;
      }else {
        console.log("已取消赞");
        this.changeColor(e, "grey");
        this.likeNum--;
        this.liked = false;
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
    }
  }
};
</script>

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
}

.wp-card .wp-card-info {
  position: absolute;
  height: 64px;
  line-height: 64px;
  margin: 0 -15px;
  text-align: center;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
}

.wp-card .wp-card-info .like {
  position: absolute;
  display: inline-block;
  left: 5%;
  top: 0;
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