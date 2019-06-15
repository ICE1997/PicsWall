<template>
  <section class="material-container">
    <header class="title">
      <div>{{type}}</div>
    </header>
    <section class="box" :id="id">
      <transition-group appear name="rotateIn">
        <PicContainer v-for="data in dataSet" :key="data.id" :url="data.s"/>
      </transition-group>
    </section>
  </section>
</template>

<script>
import PicContainer from "./PicContainer.vue";
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  props: {
    id: String,
    type: String,
    dataSet: Array
  },
  components: {
    PicContainer
  },
  computed: {},
  methods: {
  }
};
</script>


<style>
.material-container {
  display: inline-block;
  height: 50%;
  width: 100%;
}

.material-container .title {
  position: relative;
  height: 10%;
  width: 100%;
  color: white;
  border-bottom: 0.5px solid #d8d8d8;
  border-top: 0.5px solid #d8d8d8;
}

.material-container .title div {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.material-container .box {
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.rotateIn-enter-active {
  animation: rotateIn 1s;
}

@-webkit-keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes rotateIn {
  from {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: rotate3d(0, 0, 1, -200deg);
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateIn {
  -webkit-animation-name: rotateIn;
  animation-name: rotateIn;
}
</style>

