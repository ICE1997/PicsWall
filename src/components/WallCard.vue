<template>
  <div class="card wp-card">
    <img class="wp-card-img" :src="src" :alt="alt">
    <div class="wp-card-info">
      <div class="publisher">发布者:{{ author }}</div>
      <div class="like">
        <font-awesome-icon v-on:click="changeColor" icon="heart" class="icon"/>
        <span class="p-num">{{ likes }}人</span>
      </div>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free";
export default {
  props: ["author", "likes", "src", "alt"],
  data: function() {
    return{
      clicked: 0
    }
  },
  methods: {
    changeColor: function(e) {
      if(this.clicked === 0) {
      let likeIcon = e.target;
      switch(likeIcon.tagName) {
        case 'svg':
          likeIcon.style.color = 'black';
          break;
        case 'path':
          likeIcon.parentElement.style.color = 'black';
          break;
        default:
      }
      this.likes++;
      this.clicked = 1;
      console.log(likeIcon);
      }else {
        alert("已赞!");
      }

    }
  }
};
</script>

<style scoped>
.wp-card {
  position: relative;
  height: 512px;
  width: 50%;
  margin: 0 auto;
  margin-top: 32px;
}

.wp-card .wp-card-img {
  width: 100%;
  height: 100%;
}

.wp-card .wp-card-info {
  position: absolute;
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
}

.wp-card .wp-card-info .like {
  position: absolute;
  display: inline-block;
  left: 64px;
  top: 0;
}

.wp-card .wp-card-info .like .icon {
  color: red;
  transition: all 0.5s;
}

.wp-card .wp-card-info .like .p-num {
  position: relative;
  margin-left: 8px;
}
</style>