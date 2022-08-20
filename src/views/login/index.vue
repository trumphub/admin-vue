<template>
  <div class="login-container">
    <h1>Login Form</h1>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      @keyup.native.enter="handleLogin"
    >
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off">
          <svg-icon slot="prefix" icon-class="user" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        >
          <svg-icon slot="prefix" icon-class="password" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" @click="handleLogin" type="primary"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!["admin", "editor"].includes(value)) {
        callback(new Error("用户名错误"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码至少为六位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push(this.$route.query.redirect || "/");
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: #eee;
  h1 {
    text-align: center;
    padding: 160px 0 30px;
  }
  .el-form {
    width: 520px;
    margin: auto;
    ::v-deep .el-input__prefix,
    ::v-deep .el-input__suffix {
      width: 25px;
    }
    ::v-deep .el-input__suffix {
      cursor: pointer;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
