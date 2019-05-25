<template>
  <nav class="navbar navbar-expand-lg navigation">
    <div class="container-fluid mask"></div>
    <div v-if="login" class="btn-group auth" role="group" aria-label="按钮组">
      <button class="btn btn-auth">登录</button>
      <button class="btn btn-auth">注册</button>
    </div>
    <div v-else class="auth">Haha</div>
  </nav>
</template>


<<script>
export default {
  data() {
    return {
      login:true
    }
  },
}

</script>
<style scoped>
.navigation {
  position: relative;
  height: 44px;
}

.navigation .mask {
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.navigation .auth {
  position: absolute;
  right: 0;
}

.auth .btn-auth {
  color: #fff;
}

.auth .btn-auth:hover {
  color: #fff;
  background-color: brown;
  border-color: brown;
}

.auth .btn-auth:focus,
.auth .btn-auth.focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0);
}

.auth .btn-auth:not(:disabled):not(.disabled):active:focus,
.auth .btn-auth:not(:disabled):not(.disabled).active:focus,
.auth .show > .btn-auth.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(245, 47, 47, 0.5);
}
</style>

