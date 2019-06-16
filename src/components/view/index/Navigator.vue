<template>
  <b-navbar toggleable="lg" type="mdark" variant="mBlack">
    <b-navbar-brand href="index.html">Moments</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="!logined" class="ml-auto">
        <b-nav-item v-b-modal.modal-center-login>登录</b-nav-item>
        <b-modal id="modal-center-login" centered hide-footer title="登录">
          <LoginModule/>
        </b-modal>
        <b-nav-item v-b-modal.modal-center-signup>注册</b-nav-item>
        <b-modal id="modal-center-signup" centered hide-footer title="注册">
          <RegisterModule/>
        </b-modal>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-text style="color:white;">Hello!</b-nav-text>
        <b-nav-item-dropdown id="auth-nav-dropdown" :text="user" right>
          <b-dropdown-item href="./myzone.html" target="_blank">个人空间</b-dropdown-item>
          <b-dropdown-item @click="logout">注销</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<<script>
import {mapState,mapActions} from 'vuex'
import LoginModule from './Login.vue'
import RegisterModule from './Register.vue'

export default {
  components:{
    LoginModule,RegisterModule
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      logined: state=>state.user.logined,
      user: state=>state.user.userInfo.username
    }),
  },
  methods: {
    ...mapActions('user',['logout']),
  },
  mounted() {
    
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

.navbar-mdark .navbar-brand {
  color: #fff;
}

.navbar-mdark .navbar-brand:hover,
.navbar-mdark .navbar-brand:focus {
  color: #fff;
}

.navbar-mdark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 1);
}

.navbar-mdark .navbar-nav .nav-link:hover,
.navbar-mdark .navbar-nav .nav-link:focus {
  color: rgba(255, 255, 255, 0.75);
}

.navbar-mdark .navbar-nav .nav-link.disabled {
  color: rgba(255, 255, 255, 0.25);
}

.navbar-mdark .navbar-nav .show > .nav-link,
.navbar-mdark .navbar-nav .active > .nav-link,
.navbar-mdark .navbar-nav .nav-link.show,
.navbar-mdark .navbar-nav .nav-link.active {
  color: #fff;
}

.navbar-mdark .navbar-toggler {
  color: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.navbar-mdark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-mdark .navbar-text {
  color: rgba(255, 255, 255, 1);
}

.navbar-mdark .navbar-text a {
  color: #fff;
}

.navbar-mdark .navbar-text a:hover,
.navbar-mdark .navbar-text a:focus {
  color: #fff;
}
</style>

<style scoped>
.bg-mBlack {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

a {
  color: rgba(255, 255, 255, 1) !important;
}

a:hover,
a:focus {
  color: rgba(255, 255, 255, 0.75) !important;
}
</style>

