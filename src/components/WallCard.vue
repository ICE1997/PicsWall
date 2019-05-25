<template>
  <div class="card wp-card">
    <img class="wp-card-img" :src="src" :alt="alt">
    <div class="wp-card-info">
      <div class="publisher">发布者:{{ author }}</div>
      <div class="like">
        <font-awesome-icon icon="heart" class="icon"/>
        <span class="p-num">{{ likes }}人</span>
      </div>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free'
export default {
  props: ["author", "likes", "src", "alt"]
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
}

.wp-card .wp-card-info .like .p-num {
  position: relative;
  margin-left: 8px;
}
</style>