<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin: 0 0;
}

.addheadcarform {
  margin: 30px 5%;
  .el-input {
    width: 250px;
  }
  .el-select {
    width: 250px;
  }
}

#addClientForm {
  border: 1px solid rgb(222, 222, 222);
}

.alone-insurance-form {
  border: 1px solid rgb(222, 222, 222);
  border-top: none;
  padding: 30px 30px 0 20px;
}

.insurance-form-head {
  background-color: #f1f1f1;
  height: 41px;
  line-height: 41px;
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header style="margin-top:15px;">
        <el-row>
          <!-- <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span>
          </el-col> -->
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <div class="detail-form-title text-center">基础人员</div>
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpOne" :rules="rules" :model="customerMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="16">
                  <el-form-item label="客户名称:" prop="name">
                    <el-row>
                      <el-col :span="8">
                        <el-select v-model="addType" placeholder="请选择" @change="selectAddType">
                          <el-option v-for="(item,key) in selectData.addTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="16">
                        <el-row>
                          <!-- :offset="1" -->
                          <el-col :span="12" v-if="addType==='PLAT'">
                            <el-select v-model="selectCustomer" @change="getSelectInfo" filterable placeholder="请选择">
                              <el-option v-for="(item,key) in customerList" :key="key" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="12">
                            <el-input placeholder="请输入" type="text" v-model="customerMsgForm.name"></el-input>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人:" prop="contact_name">
                    <el-input placeholder="请输入" type="text" :disabled="isDisabled" v-model="customerMsgForm.contact_name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="联系方式:" prop="contact_phone">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model="customerMsgForm.contact_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地址:">
                    <el-input placeholder="请输入" :disabled="isDisabled" type="text" v-model="customerMsgForm.detail_address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="亏吨标准:" prop="deficiency_standard">
                    <el-input placeholder="请输入" type="text" v-model="customerMsgForm.deficiency_standard"></el-input>KG
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="16">
                  <el-form-item label="代码:">
                    <el-row>
                      <el-col :span="8">
                        <el-select v-model="customerMsgForm.code" placeholder="请选择" :disabled="customerMsgForm.code==='license3in1_code'?true:false">
                          <el-option v-for="(item,key) in selectData.codeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="10">
                        <el-input placeholder="请输入" type="text" v-model="customerMsgForm.codeMsg"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营业执照:">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview
                    " :on-remove="handleRemove" :file-list="customerMsgForm.license_pic" list-type="picture">
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
            <el-form class="addheaduserform detail-form" label-width="120px" ref="addFormSetpTwo" :rules="rules" :model="customerMsgForm" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="免费等待时长:" prop="free_hour">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="customerMsgForm.free_hour"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="超时计算单价:" prop="overtime_price">
                    <el-input placeholder="请输入" type="text" v-model="customerMsgForm.overtime_price"></el-input>
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
  name: 'addCarHeadManage',
  computed: {
    titleType: function() {
      return this.$route.query.id ? '编辑客户' : '新增客户';
    },
    activeStep: function() {
      return this.$route.query.activeStep || 0;
    },
    id: function() {
      return this.$route.query.id || '';
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
      customerMsgForm: {
        name: '',
        contact_name: '',
        contact_phone: '',
        detail_address: '',
        deficiency_standard: '',
        free_hour: '',
        overtime_price: '',
        code: 'license3in1_code',
        codeMsg: '',
        license_pic: [],
      },
      selectData: {
        codeSelect: [
          { id: 'license3in1_code', value: '社会机构代码（三合一）' },
          { id: 'license_code', value: '组织机构代码（非三合一）' },
        ],
        addTypeSelect: [
          { id: 'OWN', value: '默认新增' },
          { id: 'PLAT', value: '选择已有' },
        ],
      },
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { min: 1, max: 20, message: '客户名称为1~20个字符', trigger: 'blur' }
        ],
        contact_name: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '联系人为2~10个字符', trigger: 'blur' }
        ],
        deficiency_standard: [
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '亏吨标准仅支持数字输入', trigger: 'blur' }
        ],
        free_hour: [
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        ],
        overtime_price: [
          { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '支持数值输入，最多支持小数点后2位', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /(^(\(0\d{2,3}\)|0\d{2,3}-|\s)?\d{7,8}$)|(^1\d{10}$)/, message: '请输入座机号或者手机号', trigger: 'blur' }
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
    this.getList();

  },
  methods: {
    handleRemove(file, fileList) {

    },
    handlePreview(file) {

    },
    selectAddType() {
      if (this.addType !== 'PLAT') {
        this.isDisabled = false;
        this.selectCustomer = '';
        this.customerMsgForm = {
          name: '',
          contact_name: '',
          contact_phone: '',
          detail_address: '',
          deficiency_standard: '',
          free_hour: '',
          overtime_price: '',
          code: 'license3in1_code',
          codeMsg: '',
          license_pic: [],
        }
      }
    },
    getSelectInfo() {
      if (this.addType === 'PLAT') {
        this.isDisabled = true;
        for (let i in this.customerList) {
          if (this.customerList[i].id === this.selectCustomer) {
            this.customerMsgForm = {
              name: this.customerList[i].name,
              contact_name: this.customerList[i].contact_name,
              contact_phone: this.customerList[i].contact_phone,
              detail_address: this.customerList[i].detail_address,
              deficiency_standard: this.customerList[i].deficiency_standard,
              free_hour: this.customerList[i].free_hour,
              overtime_price: this.customerList[i].overtime_price,
              code: this.customerList[i].license_code ? 'license_code' : 'license3in1_code',
              codeMsg: this.customerList[i].license3in1_code ? this.customerList[i].license3in1_code : this.customerList[i].license_code,
              license_pic: this.customerList[i].license_pic ? this.customerList[i].license_pic : [],
            }
          }
        }
      }

    },
    getList: function() {
      let postData = {
        page: 1
      };
      this.$$http('getCustomerList', postData).then((results) => {

        if (results.data && results.data.code == 0) {
          this.customerList = results.data.data.results;

        }
      }).catch((err) => {})

    },
    getDetail: function() {

      this.$$http('getCustomerDetail', { customer_id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.detail = results.data.data;

          this.customerMsgForm = {
            name: this.detail.name,
            contact_name: this.detail.contact_name,
            contact_phone: this.detail.contact_phone,
            detail_address: this.detail.detail_address,
            deficiency_standard: this.detail.deficiency_standard,
            free_hour: this.detail.free_hour,
            overtime_price: this.detail.overtime_price,
            code: this.detail.license_code ? 'license_code' : 'license3in1_code',
            codeMsg: this.detail.license_code ? this.detail.license_code : this.detail.license3in1_code,
            license_pic: this.detail.license_pic ? this.detail.license_pic : [],
          }

        }
      })

    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText;
      let apiName = 'addCustomer';
      btnObject.isDisabled = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* 如果id存在则为编辑 */
          if (this.id) {
            postData.customer_id = this.id;
            postData.customer_type = this.detail.customer_type;

            apiName = 'updateCustomer';
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
                this.$router.push({ path: "/clientManage/clientDetail", query: { id: results.data.data.id } });
              } else {
                let id = results.data.data.id;
                this.$router.push({ path: "/clientManage/addClient", query: { activeStep: stepNum - 1, id: id } });
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
      let keyArray = ['name', 'contact_name', 'contact_phone', 'detail_address', 'deficiency_standard', 'code', 'codeMsg'];
      let postData = this.pbFunc.fifterbyArr(this.customerMsgForm, keyArray);
      if (postData.code === 'license3in1_code') {
        postData.license3in1_code = postData.codeMsg;
      } else if (postData.code === 'license_code') {
        postData.license_code = postData.codeMsg;
      }

      if (this.addType === "PLAT") {
        postData.customer_type = 'PLAT'
      } else {
        postData.customer_type = 'OWN'
      }
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
      let postData = this.pbFunc.fifterbyArr(this.customerMsgForm, keyArray);
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
