<template>
  <div class="login">
    <div class="login_box">
      <div class="top_img">
        <img src="../assets/logo.png">
      </div>
      <el-form ref="loginRef" label-width="0px" class="login_form" :rules="formRules" :model="loginForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" v-if="!show">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.checkPass" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item ref="form" class="btns">
          <el-button type="primary" @click="login" v-if="show">登录</el-button>
          <el-button type="primary" @click="submit" v-if="!show">提交注册</el-button>
          <el-button type="success" @click="register" v-if="show">注册</el-button>
          <el-button type="success" @click="back" v-if="!show">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginForm.checkPass !== '') {
            this.$refs.loginRef.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          checkPass: ''
        },
        show: true,
        formRules: {
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            // {required: true, message: "请输入密码", trigger: "blur"},
            // {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            // {required: true, message: "请再次输入密码", trigger: "blur"},
            // {min: 6, max: 16, message: '两次密码不同', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ]
        },

      }
    },
    methods: {
      clear() {
        this.loginForm.password = ''
        this.loginForm.username = ''
        this.loginForm.checkPass = ''
      },
      login() {
        this.$refs.loginRef.validate(e => {
          if (!e) return
          this.$axios.post('login?username=' + this.loginForm.username + '&password=' + this.loginForm.password).then(e => {
            console.log(e.data.code)
            if (e.data.code == true) {
              this.$message.success('登录成功')
              var user = e.data.msg;
              sessionStorage.setItem('user', JSON.stringify(user))
              console.log(user)
              if (user.rid == '1') {
                this.$router.push('/')
              } else {
                this.$router.push('/ServerHome')
              }
            } else {
              this.$message.error('登陆失败')
              this.clear()
            }
          })
        })
      },
      register() {
        this.clear()
        this.show = !this.show
      },
      back() {
        this.clear()
        this.show = !this.show
      },
      submit() {
        this.$refs.loginRef.validate(e => {
          if (!e) {
            this.clear()
            this.$refs.loginRef.clearValidate();
            return
          }
          this.$axios.post('register?username=' + this.loginForm.username + '&password=' + this.loginForm.password).then(e => {
            if (e.data == false) {
              this.clear()
              this.$message.error('注册失败')
            } else {
              this.$message.success('注册成功!')
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    /*background-color: #2b4b6b;*/
    background-image: url(http://localhost:8080/upload/bgc.png);
    height: 100%;
    width: 100%;
    position: absolute;
    background-size: 100% 100%;
  }

  .login_box {
    width: 450px;
    height: 380px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

  }

  .top_img {
    height: 130px;
    width: 130px;
    border: 1px solid #eeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 8px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -25%);
    background-color: #fff;
  }

  .top_img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .btns {
    text-align: center;
  }

  .login_form {
    position: absolute;
    bottom: -15px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }


</style>
