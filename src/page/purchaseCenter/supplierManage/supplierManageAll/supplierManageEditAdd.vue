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
            <el-form class="addTailcarform" label-width="150px" ref="addEditFormSetp1" :rules="rules" :model="supplierFrom" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="供应商名称:" prop="supplier_name">
                    <el-input :autofocus="true" placeholder="请输入客户名称" type="text" v-model="supplierFrom.supplier_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="供方简称:" prop="supplier_short_name">
                    <el-input  placeholder="请输入客户简称" type="text" v-model="supplierFrom.supplier_short_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人:" prop="contact">
                     <el-input  placeholder="请输入联系人" type="text" v-model="supplierFrom.contact"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="联系电话:" prop="contact_phone">
                    <el-input  placeholder="请输入联系电话" type="text" v-model="supplierFrom.contact_phone"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="地址:" prop="address">
                    <el-input placeholder="请输入" type="num" v-model="supplierFrom.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="goOtherSetp('add','nextStep','addEditFormSetp1')">保存并下一步</el-button>
                  <el-button type="primary" @click="goOtherSetp('add','out','addEditFormSetp1')">保存并退出</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form class="addTailcarform" label-width="160px" ref="addEditFormSetp2" :rules="rules" :model="supplierFrom" status-icon :label-position="'left'">
              <el-row :gutter="82">
                <el-col :span="8">
                  <el-form-item label="合同编号:" prop="contract_no">
                    <el-input placeholder="请输入合同编号" type="num" v-model="supplierFrom.contract_no"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同类型:" prop="supplier_type">
                    <el-select v-model="supplierFrom.supplier_type" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.supplier_typeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同起始日期:" prop="contract_date" :editable="editable">
                    <el-date-picker  @blur="VaDate" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="请选择" v-model="supplierFrom.contract_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="合同截止日期:" prop="contract_life" :editable="editable">
                    <el-date-picker @blur="VaDate" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="请选择" v-model="supplierFrom.contract_life" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同地址:" prop="contract_address">
                    <el-input placeholder="请输入" type="num" v-model="supplierFrom.contract_address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="goOtherSetp('update','out','addEditFormSetp2')">保存并且退出</el-button>
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
  name: 'supplierManageEditAdd',
  data() {
    var phoneVa = (rule, value, callback) => {
      if (value.match(/^\d{3,4}-?\d{7,8}$/)||value.match(/^[1][3,4,5,7,8][0-9]{9}$/)) {
        callback();
      } else {
        callback(new Error("应为11位手机号或12位座机号"));
      }
    };
    var startVa = (rule, value, callback) => {
      if(!value){
        callback();
      }else{
        if ((this.supplierFrom.contract_life!=""&&this.supplierFrom.contract_life!='undefined')) {
          if(((new Date(value))-(new Date(this.supplierFrom.contract_life))<0)||value==""){
            callback();
          }else{
            callback(new Error("合同起始日期需小于合同截止日期"));
          }
        } else {
          callback();
        }
      }
    };
    var endVa = (rule, value, callback) => {
      if(!value){
        callback();
      }else{
        if ((this.supplierFrom.contract_date!=""&&this.supplierFrom.contract_date!='undefined')) {
          if(((new Date(this.supplierFrom.contract_date))-(new Date(value))<0)){
            callback();
          }else{
            callback(new Error("合同截止日期需大于合同起始日期"));
          }
        } else {
          callback();
        }
      }
    };
    return {
      editable:false,
      editStatus: false,
      titleType: "新增供应商",
      editable: false,
      pageLoading: false,
      saleManPading:false,
      supplierFrom1Arr: ['supplier_name', 'supplier_short_name', 'contact', 'contact_phone', 'address'],
      supplierFrom2Arr: ['contract_no', 'contract_date', 'contract_life', 'contract_address','supplier_type'],
      supplierFrom: {
        contract_date:"",
        contract_life:""
      },
      
      rules: {
        //1
        supplier_name:[
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { min: 1, max: 20, message: '供应商名称为1~20个字符', trigger: 'blur' }
        ],
        supplier_short_name:[
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { min: 1, max: 20, message: '供方为1~20个字符', trigger: 'blur' }
        ],
        contact:[
          { min: 0, max: 10, message: '联系人为1~10个字符', trigger: 'blur' }
        ],
        contact_phone:[
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { validator:phoneVa , trigger: 'blur' },
        ],
        // supplier_type:[],
        // address:[],
        // //2
        // contract_address:[],
        // supplier_type:[],
        // contract_no:[],
        contract_date:[
          { validator:startVa , trigger: 'blur' },
        ],
        contract_life:[
          { validator:endVa , trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    if (this.$route.query.supplierId) {
      this.supplierId = this.$route.query.supplierId;
      this.getSupplierDetlis(this.$route.query.supplierId);
      this.titleType = "编辑供应商";
      this.editStatus = true;
    }
  },
  computed: {
    selectData: function() {
      return {
        //saleMan: this.$store.state.common.selectData.saleMan,
        supplier_typeSelect: [{verbose:"长协合同",key:"long_association"},{verbose:"固定价",key:"fixed_price"},{verbose:"上交所订单",key:"exchange_order"},{verbose:"电商订单",key:"electricity_order"},{verbose:"其它",key:"other"}],
      }
    },
    returnPage: function() {
      return (this.$route.query.operate === 'edit') ? '详情页' : '列表页';
    },
    stepTitle: function() {
      let stepTitle = '';
      let activeStep = this.$route.query.activeStep ? Number(this.$route.query.activeStep) : 0;
      switch (activeStep) {
        case 1:
          stepTitle = "合同信息填写";
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
    VaDate:function(){
      this.validatorFrom('addEditFormSetp2');
    },
    goOtherSetp: function(stepInfo, operation, formName) {
      if (stepInfo == "add" && !this.supplierId) {
        this.createFrom(operation, formName);
      } else if ((stepInfo == "update" && this.activeStep >= 1) || this.supplierId) {
        this.updateFrom(operation, formName);
      }
    },
    goDetalis: function() {
      if (this.$route.query.operate === 'edit') {
        this.$router.push({
          path: `/purchaseCenter/supplierManage/supplierManageAll/supplierManageDetalis?supplierId=${ this.supplierId }`
        });
      } else {
        this.$router.push({ path: "/purchaseCenter/supplierManage/supplierManageAll" });
      }
    },
    updateFrom: function(operation, formName) {
      var vm = this;
      this.validatorFrom(formName, (result) => {
        if (result == 'true') {
          var sendData = this.pbFunc.deepcopy(vm.supplierFrom);
          sendData = vm.pbFunc.fifterObjIsNull(sendData);
          sendData = vm.pbFunc.fifterbyArr(sendData, vm['supplierFrom' + (parseInt(vm.activeStep) + 1) + 'Arr']);
          vm.pageLoading = true;
          sendData.id = vm.supplierId;
          this.$$http('upadteSupplierFrom', sendData).then((result) => {
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
                  path: "/purchaseCenter/supplierManage/supplierManageAll/supplierManageEditAdd",
                  query: {
                    supplierId: vm.supplierId,
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
    getSupplierDetlis: function(supplierId) {
      this.pageLoading = true;
      var vm = this;
      var sendData = {
        id: supplierId
      }
      this.$$http('getSupplierDetlis', sendData).then((result) => {
        if (result.data.code == 0) {
          this.supplierFrom = result.data.data;
          this.supplierFrom.supplier_type=this.supplierFrom.supplier_type.key?this.supplierFrom.supplier_type.key:"";
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
          var sendData = this.pbFunc.deepcopy(this.supplierFrom);

          sendData = this.pbFunc.fifterObjIsNull(sendData);
          sendData = this.pbFunc.fifterbyArr(sendData, this.supplierFrom1Arr);
          
          this.$$http('creatSupplierFrom', sendData).then((result) => {
            vm.pageLoading = false;
            if (result.data.code == 0) {
              vm.supplierFrom.id = result.data.data.id;
              vm.supplierId = result.data.data.id;
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
                  path: "/purchaseCenter/supplierManage/supplierManageAll/supplierManageEditAdd",
                  query: {
                    supplierId: vm.supplierId,
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
