<style scoped lang="less">
.des {
  width: 300px;
  margin-bottom: 15px;
}

</style>
<template>
  <div>
    <public-header></public-header>
    <div class="user-page" @keyup.enter="login">
      <div class="user-page-title">登录</div>
      <el-form class="user-form" label-width="100px" :rules="rules" :model="ruleForm" status-icon ref="ruleForm">
        <div class="des" v-if="isLogin">请您<a class="cursor-pointer text-blue" v-on:click="toLink('company')">填写企业信息</a>并提交注册审核！</div>
        <el-form-item label="用户名：" prop="username">
          <el-input :autofocus="true" placeholder="请输入用户名／手机号" v-model="ruleForm.username" onkeyup="this.value=this.value.replace(/\s+/g,'')">
          </el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" onkeyup="this.value=this.value.replace(/\s+/g,'')">
          </el-input>
        </el-form-item>
        <!--  <el-form-item label="验证码：" prop="verify_code" validate-on-rule-change>
          <el-row>
            <el-col :span="15">
              <el-input placeholder="请输入验证码" type="text" v-model="ruleForm.verify_code" class="vaInput" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="4"> </el-input>
            </el-col>
            <el-col :span="8" :offset="1"><img :src="verifyCodeData.image_code_path" width="100%" height="32" v-on:click="refreshVaImg"></el-col>
          </el-row>
        </el-form-item> -->
        <div class="user-page-btn">
          <!-- <el-form-item>忘记密码？<span v-on:click="toLink('reset')" class="text-blue cursor-pointer">找回密码</span></el-form-item> -->
          <el-form-item>
            <el-button @click.native="login()" type="success" :loading="submitBtn.isBtnLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
          </el-form-item>
          <!-- <el-form-item>没有账号，<span v-on:click="toLink('register')" class="text-blue cursor-pointer">请注册</span></el-form-item> -->
        </div>
        <div class="user-page-img"><img src="../assets/img/user_1.png"></div>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import publicHeader from '../components/publicHeader'
export default {
  components: {
    publicHeader: publicHeader,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.match(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/)) {
        callback();
      } else if (value.indexOf(" ") != -1) {
        callback(new Error('密码不能包含空格'));
      } else {
        callback(new Error("密码不正确"));
      }
    };
    // const validateNum = (rule, value, callback) => {
    //   if (value == "") {
    //     callback(new Error("验证码不能为空"));
    //   } else {
    //     if (value !== this.vaImgNum) {
    //       callback(new Error("验证码不正确"));
    //     }
    //   }
    // };
    const checkImgCode = (rule, value, callback) => {
      if ((value.toUpperCase()) != this.verifyCodeData.verify_code) {
        callback(new Error('验证码错误'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        // verify_key: '',
        // verify_code: ''
      },
      isLogin: false,
      userId: '',
      verifyCodeData: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
          { min: 4, max: 20, message: '用户名或手机号不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { validator: validatePass, trigger: 'blur' }
        ],
        // verify_code: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' },
        //   { validator: checkImgCode, trigger: 'blur' }
        // ]
      },
      submitBtn: {
        btnText: '登录',
        isLoading: false,
        isDisabled: false,
      }
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    },

  },
  methods: {

    getUser() {
      this.$$http('getUser', {}).then((results) => {
        if (results.data && results.data.code === 0) {
          this.$store.state.common.users = results.data.data;
        }
      }).catch((err) => {
        this.$message.error('获取用户信息失败');
      })
    },
    loginAjax() {
      return new Promise((resolve, reject) => {
        // this.ruleForm.verify_key = this.verifyCodeData.verify_key;
        this.submitBtn.isDisabled = true;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.submitBtn.btnText = '登录中';
            this.submitBtn.isBtnLoading = true;
            this.$$http('login', this.ruleForm).then((results) => {
              this.submitBtn.btnText = '登录';
              this.submitBtn.isDisabled = false;
              this.submitBtn.isBtnLoading = false;
              if (results.data && results.data.code === 0) {
                resolve(results);
                this.pbFunc.setLocalData('token', results.data.data.token, true);
                this.pbFunc.setLocalData('user', results.data.data.user, true);
                if (results.data.data.user && results.data.data.user.menus && results.data.data.user.menus.length) {

                  this.pbFunc.setLocalData('menuList', results.data.data.user.menus, true);
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  this.$emit('login');
                } else {
                  this.$alert('还没有设置权限！请联系管理员', '请注意', {
                    confirmButtonText: '关闭',
                  });
                }
              } else {

                reject(results);
              }
            }).catch((err) => {
              this.$message.error('登录失败');
              this.submitBtn.isDisabled = false;
              this.submitBtn.isBtnLoading = false;
              reject(err);
            })
          } else {
            this.submitBtn.isDisabled = false;
          }
        });
      })

    },

    login() {
      this.loginAjax();
    },
    toLink(type) {
      if (type === 'register') {
        this.$router.push({ path: '/register' });
      } else if (type === 'reset') {
        this.$router.push({ path: '/forgetPassword' });
      } else if (type === 'company') {
        this.$router.push({ path: "registerCompany", query: { user_id: this.userId } });
      }
    },
    callbackerr(cuowu) {

    },
    toLogin(loginFrom) {
      var vm = this;
      this.$refs[loginFrom].validate((valid) => {
        if (!valid) {
          var callbackInfo = { errorField: "ValNum", errorMessage: "有错误" }
          // console.log(vm);
          // console.log(this.$refs.loginFrom.fields.filter((item) => (item.prop === callbackInfo.errorField)));
          this.$refs.loginFrom.fields.filter((item) => (item.prop === callbackInfo.errorField))[0].error = callbackInfo.errorMessage;
        } else {
          return false;
        }
      });
      //this.$router.push({ path: '/register' });
    },
    refreshVaImg() {
      this.$$http('imageVerifyCode', {}).then((results) => {
        if (results.data && results.data.code === 0) {
          this.verifyCodeData = results.data.data;
        }
      }).catch((err) => {
        // this.pageLoading = false;
      })
    },
  },
  created() {
    sessionStorage.clear();
    // this.refreshVaImg();
    // this.enterLogin(event);
  }
};

</script>
