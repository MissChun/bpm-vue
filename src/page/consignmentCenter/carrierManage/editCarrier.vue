<!-- editCarrier.vue -->
<style scoped lang="less">
/deep/ .code {
  input {
    border-color: #dcdfe6!important;
  }
  i {
    display: none;
  }
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
            <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span> -->
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">承运商信息</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="承运商名称:" prop="carrier_name">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.carrier_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人:" prop="contact">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.contact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话:" prop="contact_phone">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.contact_phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="地址:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="承运类型:" prop="carrier_type">
                    <el-select v-model="editMsgForm.carrier_type" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.carrierTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否启用:">
                    <el-switch v-model="editMsgForm.isValidName" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="16">
                  <el-form-item label="代码:" prop="codeMsg">
                    <el-row>
                      <el-col :span="8">
                        <div class="code">
                          <el-select v-model="editMsgForm.code" placeholder="请选择" @change="codeTab" :disabled="editMsgForm.code==='credit_code'&&detail.credit_code?true:false">
                            <el-option v-for="(item,key) in selectData.codeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                          </el-select>
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.codeMsg"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="false">
                  <el-form-item label="营业执照:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="editMsgForm.license_pic" list-type="picture">
                      <el-button size="small" type="primary" plain>上传图片</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button>
                  <el-button type="primary" @click="editBasics(saveBasicAndReviewBtn,'out')" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <div class="detail-form-title text-center">卸车待时规则</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpTwo" :rules="rules" :model="editMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="免费等待时长:" prop="free_hour">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="editMsgForm.free_hour"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="超时计算单价:" prop="overtime_price">
                    <el-input placeholder="请输入" type="text" v-model="editMsgForm.overtime_price"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="editUnload(saveBasicAndReviewBtn)" :loading="saveBasicAndReviewBtn.isLoading" :disabled="saveBasicAndReviewBtn.isDisabled">{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'editCarrier',
  computed: {
    titleType: function() {
      return this.$route.query.id ? '编辑承运商' : '新增承运商';
    },
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    id: function() {
      return this.$route.query.id || '';
    },
    returnPage: function() {
      return this.$route.query.id ? '详情页' : '列表页';
    },
  },
  data() {
    return {
      pageLoading: false,

      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      addType: '默认新增',
      selectCustomer: '',
      editMsgForm: {
        carrier_name: '',
        contact: '',
        contact_phone: '',
        address: '',
        isValidName: true,
        carrier_type: 'own',
        license_pic: [],
        code: 'credit_code',
        codeMsg: '',
        free_hour: '',
        overtime_price: ''
      },
      sociology: [
        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
        { pattern: /^([A-Z0-9]{18})$/, message: '由18位数字和大写字母组成', trigger: 'blur' }
      ],
      structure: [
        { required: true, message: '请输入组织机构代码', trigger: 'blur' },
        { pattern: /^([A-Z0-9]{9})$/, message: '由9位数字和大写字母组成', trigger: 'blur' }
      ],
      selectData: {
        codeSelect: [
          { id: 'credit_code', value: '统一社会信用代码（三合一）' },
          { id: 'organization_code', value: '组织机构代码（非三合一）' },
        ],
        carrierTypeSelect: [
          { id: 'own', value: '自有承运' },
          { id: 'external', value: '外部承运' }
        ],
      },
      rules: {
        carrier_name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { min: 1, max: 20, message: '客户名称为1~20个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '联系人为2~10个字符', trigger: 'blur' }
        ],
        carrier_type: [
          { required: true, message: '请选择承运商类型', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /(^(\(0\d{2,3}\)|0\d{2,3}-|\s)?\d{7,8}$)|(^1\d{10}$)/, message: '请输入座机号或者手机号', trigger: 'blur' }
        ],
        codeMsg: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { pattern: /^([A-Z0-9]{18})$/, message: '由18位数字和大写字母组成', trigger: 'blur' }
        ],
        free_hour: [
          { required: true, message: '请输入免费等待时长', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        ],
        overtime_price: [
          { required: true, message: '请输入超时计算单价', trigger: 'blur' },
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        ],

      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false,
      },
      nextStepBtn: {
        isLoading: false,
        btnText: '保存并下一步',
        isDisabled: false,
      },
      detail: {},
      customerList: [],
      isDisabled: false
    }
  },
  created() {
    if (this.id) {
      this.getDetail();
    }
  },
  methods: {
    codeTab() {
      this.editMsgForm.codeMsg = '';
      this.$refs['addFormSetpOne'].clearValidate();
      if (this.editMsgForm.code === 'credit_code') {
        this.rules.codeMsg = this.sociology;
      } else {
        this.rules.codeMsg = this.structure;
      }
    },
    returnToPage: function() {
      if (this.$route.query.id) {
        this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.$route.query.id } });
      } else {
        this.$router.push({ path: "/consignmentCenter/carrierManage/carrierList" });
      }
    },
    handleRemove(file, fileList) {

    },
    handlePreview(file) {

    },
    getDetail: function() {
      this.$$http('getCarrierDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;

          this.editMsgForm = {

            carrier_name: this.detail.carrier_name,
            contact: this.detail.contact,
            contact_phone: this.detail.contact_phone,
            address: this.detail.address,
            isValidName: this.detail.is_valid.key === 'valid' ? true : false,
            carrier_type: this.detail.carrier_type.key,
            license_pic: [],
            code: this.detail.credit_code ? 'credit_code' : 'organization_code',
            codeMsg: this.detail.credit_code ? this.detail.credit_code : this.detail.organization_code,
            free_hour: this.detail.free_hour,
            overtime_price: this.detail.overtime_price

          }
          console.log('this.editMsgForm.code', this.editMsgForm.code)
          if (this.editMsgForm.code === 'credit_code') {
            this.rules.codeMsg = this.sociology;
          } else {
            this.rules.codeMsg = this.structure;
          }
        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'addCarrier';
      // postData.company = 'cacf2c4d-9290-4f88-bfa0-be842df32e3b';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 如果id存在则为编辑 */
          if (this.id) {
            postData.id = this.id;
            apiName = 'updateCarrier';
          }

          btnObject.btnText = '正在提交';
          btnObject.isLoading = true;

          //postData = this.pbFunc.fifterObjIsNull(postData);
          this.$$http(apiName, postData).then((results) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;

            if (results.data && results.data.code == 0 && results.data.data) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              if (isReview) {
                if (this.id) {
                  this.$router.push({ path: "/consignmentCenter/carrierManage/carrierDetail", query: { id: this.id } });
                } else {
                  this.$router.push({ path: "/consignmentCenter/carrierManage/carrierList" });
                }

              } else {
                let id = results.data.data.id;
                this.$router.push({ path: "/consignmentCenter/carrierManage/editCarrier", query: { activeStep: stepNum - 1, id: id } });
              }
            }
          }).catch((err) => {
            btnObject.btnText = btnTextCopy;
            btnObject.isLoading = false;
            btnObject.isDisabled = false;
          })
        } else {
          btnObject.isDisabled = false;
        }
      });
    },
    editBasics(btn, btnType) {

      let formName = 'addFormSetpOne';
      let btnObject = btn;


      if (this.editMsgForm.isValidName) {
        this.editMsgForm.is_valid = 'valid'
      } else {
        this.editMsgForm.is_valid = 'invalid'
      }
      let keyArray = ['carrier_name', 'contact', 'contact_phone', 'address', 'is_valid', 'carrier_type'];
      if (this.editMsgForm.code === 'credit_code') {
        this.editMsgForm.credit_code = this.editMsgForm.codeMsg;
        keyArray.push('credit_code');
      } else if (this.editMsgForm.code === 'organization_code') {
        this.editMsgForm.organization_code = this.editMsgForm.codeMsg;
        keyArray.push('organization_code');
      }
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);

      if (btnType === 'next') {
        this.editAjax(postData, formName, btnObject, 2);
      } else if (btnType === 'out') {
        this.editAjax(postData, formName, btnObject, null, true);
      }
    },
    editUnload(btn) {

      let formName = 'addFormSetpTwo';
      let btnObject = btn;
      let keyArray = ['free_hour', 'overtime_price'];
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
      this.editAjax(postData, formName, btnObject, null, true);
    },
    // saveBasicAndReview() {
    //   let formName = 'addClientFormSetpOne';
    //   let btnObject = this.saveBasicAndReviewBtn;
    //   let keyArray = ['name', 'work_type', 'mobile_phone', 'staff_type', 'id_number', 'on_job_status', 'gender', 'birthday', 'age', 'family_member_name', 'family_member_phone', 'drive_license_allow_type', 'detail_address'];
    //   let postData = this.pbFunc.fifterbyArr(this.userForm, keyArray);
    //   postData.area = this.userForm.address.area || this.userForm.address.city || '';
    //   this.editAjax(postData, formName, btnObject, null, true);
    // },
  }
}

</script>
