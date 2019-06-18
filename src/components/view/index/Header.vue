<template>
  <header class="container-fluid header" id="mHeader">
    <m-nav/>
    <p class="container-fluid slogan">Old Days</p>
  </header>
</template>

<script>
import { mapState } from "vuex";
import mNav from "./Navigator.vue";

export default {
  data: function() {
    return {};
  },
  computed: {
    ...mapState("user", ["logined"]),
    ...mapState("switcher", ["selectedIndex"])
  },
  methods: {
    select(index) {
      let payload = {
        index: index
      };
      this.$store.dispatch("switcher/setSelectedIndex", payload);
    }
  },
  components: {
    mNav
  },
  mounted() {}
};
</script>

<style>
.hasSelected {
  border-bottom: 3px solid white;
}
</style>


<style scoped>
.header {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 521px;
}

.header .slogan {
  position: absolute;
  color: white;
  left: -35%;
  font-size: 5rem;
  text-align: center;
  top: 50%;
}

.header .title-box {
  position: absolute;
  width: 60%;
  height: 64px;
  bottom: -32px;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.header .title-box .title {
  font-size: 24px;
  margin: 0 16px;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: all 0.3s;
  cursor: pointer;
}

.title a {
  color: white !important;
}

.title a:hover {
  color: rgba(255, 255, 255, 0.75) !important;
}

.header .title-box .title:active {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>


