<template>
  <div :style="{backgroundImage:'url(' + url + ')'}" class="pic-container"></div>
</template>

<script>
export default {
  props: {
      url:String
  }
};
</script>


<style>
.pic-container {
  position: relative;
  display: inline-block;
  background-color: #fff;
  width: 25%;
  height: 0;
  padding-bottom: 12.5%;
  border-radius: 8px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
}

</style>
