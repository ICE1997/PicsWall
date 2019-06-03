<template>
  <b-navbar toggleable="lg" type="dark" variant="mBlack">
    <b-navbar-brand href="#">Moments</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!login" class="ml-auto">
         <b-nav-item >登录</b-nav-item>
         <b-nav-item >注册</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="auth">Haha</b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<<script>
export default {
  data() {
    return {
      login:false
    }
  },
}

</script>
<style>
.btn-auth {
  color: #fff !important;
}

.btn-auth:hover {
  color: #fff;
  background-color: brown;
  border-color: brown;
}

.btn-auth:focus,
.btn-auth.focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0);
}

.btn-auth:not(:disabled):not(.disabled):active:focus,
.btn-auth:not(:disabled):not(.disabled).active:focus,
.show > .btn-auth.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(245, 47, 47, 0.5);
}
</style>

<style scoped>
.bg-mBlack {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

a{
  color: rgba(255, 255, 255, 1) !important;
}

a:hover,
a:focus{
  color: rgba(255, 255, 255, 0.75) !important;
}
</style>

