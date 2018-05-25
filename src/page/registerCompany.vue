<style scoped lang="less">


</style>
<template>
  <div>
    <public-header></public-header>
    <div class="user-page" @keyup.enter="onSubmit">
      <div>
        <div class="user-page-title">企业信息</div>
        <el-form :model="registerForm" ref="registerForm" :rules="rules" label-width="120px" class="user-form">
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model.trim="registerForm.name" type="text" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contact_name">
            <el-input v-model.trim="registerForm.contact_name" type="text" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contact_phone">
            <el-input v-model.trim="registerForm.contact_phone" type="text" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="公司地址：" prop="area">
            <choose-address :address.sync="address"></choose-address>
            <!-- <el-row :gutter="0">
              <el-col :md="8">
                <el-select v-model="registerForm.detail_address" placeholder="省">
                  <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8">
                <el-select v-model="registerForm.detail_address" placeholder="市">
                  <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-col>
              <el-col :md="8">
                <el-select v-model="registerForm.detail_address" placeholder="区">
                  <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-col>
            </el-row> -->
          </el-form-item>
          <el-form-item prop="detail_address">
            <el-row>
              <el-input v-model.trim="registerForm.detail_address" minlength="4" maxlength="100" type="textarea" :rows="3" placeholder="请输入公司地址"></el-input>
            </el-row>
          </el-form-item>
          <el-form-item label="企业类型：" prop="carrier_type">
            <el-select v-model="registerForm.carrier_type" placeholder="请选择">
              <el-option v-for="(item,key) in carrierType" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
            <div class="user-checked">
              <el-checkbox v-model="checked">我已阅读并同意</el-checkbox><span class="text-blue cursor-pointer" v-on:click="dialogUserProtocol=true">《用户协议》</span>
            </div>
          </el-form-item>
          <div class="user-page-btn">
            <el-form-item>
              <el-button type="success" @click="onSubmit" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
            </el-form-item>
            <el-form-item>已有账号，请<span class="text-blue cursor-pointer" v-on:click="linkLogin()">登录</span></el-form-item>
          </div>
          <div class="user-page-img"><img src="../assets/img/user_5.png"></div>
        </el-form>
      </div>
      <user-protocol :dialog-user-protocol="dialogUserProtocol" v-on:agree="agreeProtocol"></user-protocol>
    </div>
  </div>
</template>
<script>
import chooseAddress from '../components/chooseAddress';
import publicHeader from '../components/publicHeader';
import userProtocol from '../components/userProtocol';
export default {
  components: {
    chooseAddress: chooseAddress,
    publicHeader: publicHeader,
    userProtocol: userProtocol
  },
  data() {
    return {
      dialogUserProtocol: false,
      address: {
        province: '',
        city: '',
        area: '',
      },
      registerForm: {
        user_id: '',
        name: '',
        contact_name: '',
        contact_phone: '',
        area: '',
        detail_address: '',
        carrier_type: ''
      },
      checked: true,
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z]{4,30}$/, message: '企业名称为中文、英文，不能输入数字、标点符号，4-30个字符', trigger: 'blur' },
        ],
        contact_name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z]{2,20}$/gi, message: '联系人为2-20个字符，支持中文、字母', trigger: 'blur' },
        ],
        contact_phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /(^(\(0\d{2}\)|0\d{2}-|\s)?\d{7,8}$)|(^1\d{10}$)/, message: '手机或座机号格式不正确，请重新输入', trigger: 'blur' } ///^\d{3,4}-?\d{7,8}$/=====/^((0\d{2,3}-\d{7,8})|(1\d{10}$))$/
        ],
        area: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        detail_address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' },
          { min: 4, max: 100, message: '请输入4-100字符', trigger: 'blur' }
        ],
        carrier_type: [
          { required: true, message: '请选择企业类型', trigger: 'blur' }
        ]

      },
      msgBtn: {
        getCodeText: '获取验证码',
        isLoading: false,
        isDisabled: false,
      },
      submitBtn: {
        btnText: '提交注册',
        isLoading: false,
        isDisabled: false,
      }


    };
  },
  computed: {
    carrierType: function() {
      return this.$store.state.common.selectData.carrier_carrier_type;
    },
    user_id: function() {
      return this.$route.query.user_id || '';
    }
  },
  methods: {
    agreeProtocol: function() {
      console.log('this.dialogUserProtocol', this.dialogUserProtocol);
      this.dialogUserProtocol = false;
      this.checked = true;
    },
    onSubmit() {
      console.log('user_id', this.user_id);
      this.registerForm.user_id = this.user_id
      this.registerForm.area = this.address.area
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          if (this.checked) {
            this.submitBtn.isDisabled = true;
            this.submitBtn.btnText = '注册中';
            this.submitBtn.isLoading = true;
            this.$$http('addCarrier', this.registerForm).then((results) => {
              console.log('注册成功', results.data);
              // this.pageLoading = false;
              this.submitBtn.btnText = '注册';
              this.submitBtn.isLoading = false;
              this.submitBtn.isDisabled = false;
              if (results.data && results.data.code == 0) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({ path: "registerSuccess"});
                }, 3000)

              }

            }).catch((err) => {
              this.submitBtn.btnText = '注册';
              this.submitBtn.isLoading = false;
              this.submitBtn.isDisabled = false;
            })
          } else {
            this.$message.error('请勾选用户协议');
          }
        } else {
          this.submitBtn.isDisabled = false;
        }
      });


    },
    linkLogin: function() {
      this.$router.push({ path: "login" });
    },
  },

  created() {

  }
};

</script>
