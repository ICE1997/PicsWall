<template>
  <b-container class="main">
    <b-alert
      :variant="style"
      dismissible
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      :show="dismissCountDown"
    >{{alertText}}</b-alert>
    <b-form>
      <b-form-group label="用户名" label-for="inputUsername">
        <b-form-input id="loginInputUsername" v-model="loginUsername" trim></b-form-input>
      </b-form-group>
      <b-form-group label="密码" label-for="loginInputPsw">
        <b-form-input id="loginInputPsw" v-model="loginPassword" type="password" trim></b-form-input>
      </b-form-group>
      <b-container class="btns">
        <b-row align-h="end">
          <b-col cols="12">
            <b-button @click="login" block variant="primary">登录</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dismissCountDown: 0,
      dismissSecs: 2,
      style: "",
      alertText: "",

      loginUsername: "",
      loginPassword: ""
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(type, text) {
      this.dismissCountDown = this.dismissSecs;
      this.style = type;
      this.alertText = text;
    },
    login() {
      this.loginUserNameState = "";
      this.loginPSWState = "";
      let loginInfo = {
        username: this.loginUsername,
        password: this.loginPassword
      };
      this.$store.dispatch("user/login", loginInfo).then(() => {
        let succeed = this.loginState.succeed;
        let code = this.loginState.responseCode;
        if (!succeed) {
          this.showAlert("danger", "密码或账户错误!");
        } else {
          console.log("登录成功!");   
        }
      });
    }
  },
  computed: {
    ...mapState("user", ["loginState"])
  }
};
</script>


<style>
.btns {
  text-align: center;
}

.btns button {
  padding: 8px 16px;
}
</style>

<style scoped>
.main {
  width: 70%;
}
</style>

