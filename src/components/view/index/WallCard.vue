<template>
  <b-container class="wp-card">
    <b-container class="wp-card-info">
      <div class="publisher">发布者:{{ author }}</div>
      <div class="like">
        <font-awesome-icon v-on:click="changeColor" icon="heart" class="icon"/>
        <span class="p-num">{{ likes }}人</span>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import "@fortawesome/fontawesome-free";
export default {
  props: ["author", "likes", "src", "alt"],
  data: function() {
    return{
      clicked: 0,
      mainProps: {
          center: true,
          fluidGrow: true,
          blank: true,
          blankColor: '#bbb',
          width: 600,
          height: 400,
          class: 'my-5'
        }
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
  height: 540px;
  width: 960px;
  /* width: 960px; */
  /* margin: 0 auto; */

  margin: 0 auto;
margin-top: 32px;
  background-color: #fff;
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
  color: red;
  transition: all 0.5s;
}

.wp-card .wp-card-info   .like .p-num {
  position: relative;
  margin-left: 8px;
}
</style>