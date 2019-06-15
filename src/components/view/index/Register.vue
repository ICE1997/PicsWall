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
      <b-form-group
        label="用户名"
        :state="regUserNameState"
        :invalid-feedback="regUserNameExist"
        label-for="regInputUsername"
      >
        <b-form-input id="regInputUsername" :state="regUserNameState" v-model="regUsername" trim></b-form-input>
      </b-form-group>
      <b-form-group label="密码" label-for="regInputPsw">
        <b-form-input id="regInputPsw" type="password" v-model="regPassword" trim></b-form-input>
      </b-form-group>

      <b-form-group
        label="邮箱"
        :state="regEmailState"
        :invalid-feedback="regEmailExist"
        label-for="regInputEmail"
      >
        <b-form-input
          id="regInputEmail"
          :state="regEmailState"
          type="email"
          v-model="regEmail"
          trim
        ></b-form-input>
      </b-form-group>

      <b-form-group label="手机号" label-for="regInputPhone">
        <b-form-input id="regInputPhone" v-model="regPhone" trim></b-form-input>
      </b-form-group>

      <b-container class="btns">
        <b-row align-h="end">
          <b-col cols="12">
            <b-button @click="register" block variant="primary">注册</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      dismissCountDown: 0,
      dismissSecs: 2,
      style: "",
      alertText: "",

      regUsername: "",
      regPassword: "",
      regEmail: "",
      regPhone: "",
      regUserNameState: "",
      regEmailState: ""
    };
  },
  computed: {
    ...mapState("user", ["registerState"]),

    regUserNameExist() {
      return "用户名已存在!";
    },
    regEmailExist() {
      return "邮箱已被注册！";
    }
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
    register() {
      this.regUserNameState = "";
      this.regEmailState = "";

      let newUser = {
        username: this.regUsername,
        password: this.regPassword,
        email: this.regEmail,
        phone: this.regPhone
      };

      this.$store.dispatch("user/register", newUser).then(() => {
        let succeed = this.registerState.succeed;
        let code = this.registerState.responseCode;
        if (!succeed) {
          switch (code) {
            case "110":
              this.regUserNameState = false;
              break;
            case "111":
              this.regEmailState = false;
              break;
            case "112":
              this.showAlert("warning","信息未填写完整!")
              break;
            default:
              this.showAlert("danger","未知错误!");
          }
        } else {
          this.showAlert("success","注册成功!");
        }
      });
    }
  },
};
</script>



<style>
.btns {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>

<style scoped>
.main {
  width: 70%;
}
</style>


