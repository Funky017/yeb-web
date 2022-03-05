<template>
  <div>
    <el-form :rules="rules"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer"
             v-loading="loading"
             element-loading-text="正在登录"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="text" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="loginForm.code" placeholder="点击图片更换验证码" class="loginImg"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
        <br />
        <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitLogin" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: "admin",
        password: '123',
        code: ''
      },
      loading: false,
      fullscreenLoading: false,
      checked: true,
      rules: {
        username: [{required: true, message:'请输入用户名', trigger:'blur'}],
        password: [{required: true, message:'请输入密码', trigger:'blur'}],
        code: [{required: true, message:'请输入验证码', trigger:'blur'}],
      }
    }
  },
  methods: {
    // 登录
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading =true;
          this.fullscreenLoading = true;  // 页面遮掩
          this.postRequest('/login', this.loginForm).then(resp => {
            // alert(JSON.stringify(resp));
            this.loading = false;
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 2000);       // 展示效果，延时
            if (resp) {
              // 存储token
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              window.sessionStorage.setItem('tokenStr', tokenStr);
              // 跳转首页；不用push原因：后退会返回到登录页面就没必要了
              this.$router.replace('/home');
            }
          })
        } else {
          this.$message.error("请输入所有字段")
          return false;
        }
      })
    },
    // 更新图片
    updateCaptcha() {
      this.captchaUrl = '/captcha?time=' + new Date();
    }
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6;
}
.loginTitle {
  margin: 8px auto 40px auto;
  text-align: center;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.loginImg {
  width: 250px;
  margin-right: 5px;
}
</style>