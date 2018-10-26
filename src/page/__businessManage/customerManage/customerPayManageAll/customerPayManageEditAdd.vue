<template>
  <div id="addeditTailCarPage" class="detail-main">
    <el-container>
      <el-header class="mt-5">
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="goDetalis"></div>
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <el-col class="stepTitle mt-25">
          {{stepTitle}}
        </el-col>
      </el-row>
      <el-main v-loading="pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addTailcarform" label-width="150px" ref="addEditFormSetp1" :rules="rules" :model="customerPayFrom" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="付款方名称:" prop="payer">
                    <el-input :autofocus="true" placeholder="请输入付款方名称" type="text" v-model="customerPayFrom.payer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" >
                  <el-form-item label="客户名称:" prop="consumer" > 
                    <el-select v-model="customerPayFrom.consumer" multiple  filterable style="margin-left: 20px;" placeholder="请选择客户" v-loading="customerLoading">
                      <el-option v-for="item in customerSelectData" :key="item.id" :label="item.consumer_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="goOtherSetp('add','out','addEditFormSetp1')">保存并退出</el-button>
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
  name: 'customerPayManageEditAdd',
  data() {
    return {
      editable: false,
      editStatus: false,
      titleType: "新增付款方",
      editable: false,
      pageLoading: false,
      customerLoading:false,
      customerPayFrom1Arr: ['payer', 'consumer'],
      customerPayFrom: {
        consumer:[],
        payer:""
      },
      customerPayData:{},
      customerSelectData:[],
      rules: {
        //1
        consumer: [
          { required: true, message: '该项为必填项', trigger: 'change' },
        ],
        payer: [
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { min: 0, max: 20, message: '付款方名称为1~20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.customerPayId) {
      this.customerPayId = this.$route.query.customerPayId;
      this.getCustomerPayDetlis(this.$route.query.customerPayId);
      this.titleType = "编辑付款方";
      this.editStatus = true;
    }
    this.getCustomerList();
  },
  computed: {
    returnPage: function() {
      return (this.$route.query.operate === 'edit') ? '详情页' : '列表页';
    },
    stepTitle: function() {
      let stepTitle = '';
      let activeStep = this.$route.query.activeStep ? Number(this.$route.query.activeStep) : 0;
      switch (activeStep) {
        case 1:
          stepTitle = "业务约定";
          break;
        case 2:
          stepTitle = "合同信息";
          break;
        default:
          stepTitle = "基本资料填写";
      }

      return stepTitle;
    },
    activeStep: function() {
      return this.$route.query.activeStep ? Number(this.$route.query.activeStep) : 0;
    }
  },
  methods: {
    goOtherSetp: function(stepInfo, operation, formName) {
      if (stepInfo == "add" && !this.customerPayId) {
        this.createFrom(operation, formName);
      } else if ((stepInfo == "update" && this.activeStep >= 1) || this.customerPayId) {
        this.updateFrom(operation, formName);
      }
    },
    goDetalis: function() {
      if (this.$route.query.operate === 'edit') {
        this.$router.push({
          path: `/businessManage/customerManage/customerPayManageAll/customerPayManageDetalis?customerPayId=${ this.customerPayId }`
        });
      } else {
        this.$router.push({ path: "/businessManage/customerManage/customerPayManageAll" });
      }
    },
    getCustomerList: function() {
      var sendData = {
        need_all:true
      };
      var vm = this;
      this.customerLoading = true;
      this.$$http("searchPayCustomerList", sendData).then((result) => {
        if (result.data.code == 0) {
          vm.customerSelectData = result.data.data.data;
          vm.customerPayData.consumer.forEach(item=>{
            vm.customerPayFrom.consumer.push(item.id);
          });
        }
        vm.customerLoading = false;
      }).catch(() => {
        vm.customerLoading = false;
      });
    },
    updateFrom: function(operation, formName) {
      var vm = this;
      this.validatorFrom(formName, (result) => {
        if (result == 'true') {
          var sendData = this.pbFunc.deepcopy(vm.customerPayFrom);
          sendData = vm.pbFunc.fifterObjIsNull(sendData);
          sendData = vm.pbFunc.fifterbyArr(sendData, vm['customerPayFrom' + (parseInt(vm.activeStep) + 1) + 'Arr']);
          vm.pageLoading = true;
          sendData.id = vm.customerPayId;
          this.$$http('upadtecustomerPayFrom', sendData).then((result) => {
            if (result.data.code == 0) {
              vm.$message({
                message: '成功',
                type: 'success'
              });
              if (operation == 'out') {
                //跳转详情
                //vm.$router.push({ path: "/transportPowerManage/carManage/showCarTailManage?tailId=" + this.tailId });
                vm.goDetalis();
              } else {
                let nextStep = Number(vm.activeStep) + 1;
                vm.pageLoading = false;
                vm.$router.push({
                  path: "/businessManage/customerManage/customerPayManageAll/customerPayManageEditAdd",
                  query: {
                    customerPayId: vm.customerPayd, 
                    activeStep: nextStep,
                    operate: vm.$route.query.operate
                  }
                });
              }
            } else {
              vm.pageLoading = false;
            }
          }).catch(() => {
            vm.pageLoading = false;
          });
        }
      });

    },
    getCustomerPayDetlis: function(customerPayId) {
      this.pageLoading = true;
      var vm = this;
      var sendData = {
        id: customerPayId
      }
      this.$$http('getCustomerPayDetlis', sendData).then((result) => {
        if (result.data.code == 0) {
          this.customerPayFrom.payer = result.data.data.payer;
          this.customerPayData=result.data.data;
          
          this.pageLoading = false;
        } else {
          this.pageLoading = false;
        }
      })
    },
    validatorFrom: function(formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback('true');
        } else {
          callback('fasle');
          return false;
        }
      });
    },
    createFrom: function(operation, formName) {
      var vm = this;
      this.validatorFrom(formName, (result) => {
        if (result == 'true') {
          this.pageLoading = true;
          var sendData = this.pbFunc.deepcopy(this.customerPayFrom);

          sendData = this.pbFunc.fifterObjIsNull(sendData);
          sendData = this.pbFunc.fifterbyArr(sendData, this.customerPayFrom1Arr);
          this.$$http('creatCustomerPayFrom', sendData).then((result) => {
            vm.pageLoading = false;
            if (result.data.code == 0) {
              if (operation == 'out') {
                vm.goDetalis();
                //this.$router.push({ path: "/transportPowerManage/carManage/showCarTailManage?tailId=" + this.tailId });
              } else {
                vm.$message({
                  message: '添加成功',
                  type: 'success'
                });
                let nextStep = Number(vm.activeStep) + 1;
                vm.$router.push({
                  path: "/businessManage/customerManage/customerPayManageAll/customerPayManageEditAdd",
                  query: {
                    customerPayId: vm.customerPayId,
                    activeStep: nextStep,
                    operate: this.$route.query.operate
                  }
                });
              }
            } else if (result.data.code == 400) {
              Message.error(result.data.msg);
            };
          }).catch(() => {
            this.pageLoading = false;
          });
        } else {
          vm.$message({
            showClose: true,
            message: '请验证表单',
            type: 'error'
          });
        }
      });
    },
  }
}

</script>
<style scoped lang="less">
.el-header p {
  font-size: 25px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: 0 0;
}

.addTailcarform {
  margin: 30px 5%;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

#addeditTailCarPage {
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

#addeditTailCarPage {
  background-color: white;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 46px;
  text-align: center; // font-size: 18px;
  line-height: 46px;
}

.detail-main .go-return {
  margin-top: 22px;
}

.right-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  pointer: cursor;
}

</style>
