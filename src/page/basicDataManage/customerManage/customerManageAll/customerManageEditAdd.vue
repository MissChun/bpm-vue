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
            <el-form class="addTailcarform" label-width="130px" ref="addEditFormSetp1" :rules="rules" :model="customerFrom" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="客户名称:" prop="consumer_name">
                    <el-input :autofocus="true" placeholder="请输入客户名称" type="text" v-model="customerFrom.consumer_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户简称:" prop="short_name">
                    <el-input placeholder="请输入客户简称" type="text" v-model="customerFrom.short_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户等级:" prop="consumer_level">
                    <el-select v-model="customerFrom.consumer_level" placeholder="请选择客户等级">
                      <el-option v-for="(item,key) in selectData.customerType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="联系人:" prop="contact_person">
                    <el-input placeholder="请输入联系人" type="text" v-model="customerFrom.contact_person"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话:" prop="contact_phone">
                    <el-input placeholder="请输入联系电话" type="text" v-model="customerFrom.contact_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="分属业务员:" prop="sale_man" v-loading="saleManPading">
                    <el-select v-model="customerFrom.sale_man" filterable placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.saleMan" :key="key" :label="item.nick_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="社会统一信用代码:" prop="social_credit_code">
                    <el-input placeholder="请输入" type="num" v-model="customerFrom.social_credit_code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地址:" prop="volume">
                    <el-input placeholder="请输入" type="num" v-model="customerFrom.consumer_address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="信用额度:" prop="credit_limit">
                    <el-input placeholder="请输入" type="num" v-model="customerFrom.credit_limit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="customerId">
                  <el-form-item label="付款方:" prop="payer_name">
                    <el-select v-model="customerFrom.payer_name" v-loading="payerLoading" filterable multiple clearable @change="payerSelect" placeholder="请输入选择">
                      <el-option v-for="(item,key) in payerList" :key="item.id" :label="item.payer" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else>
                  <el-form-item label="付款方:" prop="payerType">
                    <el-row :gutter="0">
                      <el-col :span="10" style="width:300px">
                        <el-radio-group v-model="customerFrom.payerType" @change="selectPayerType">
                          <el-radio :label="false">设为付款方</el-radio>
                          <el-radio :label="true">选择已有付款方</el-radio>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="6" v-if="customerFrom.payerType">
                        <el-select v-model="customerFrom.payer" v-loading="payerLoading" filterable multiple clearable placeholder="请输入选择">
                          <el-option v-for="(item,key) in payerList" :key="item.id" :label="item.payer" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户类别:">
                    <el-select v-model="customerFrom.consumer_category" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.consumerCategoryList" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
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
            <el-form class="addTailcarform" label-width="120px" ref="addEditFormSetp2" :rules="rules" :model="customerFrom" status-icon>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="卸车免费等待时长(小时):" prop="free_hour" label-width="200px">
                    <el-input placeholder="请输入卸车免费等待时长:" type="num" v-model.trim="customerFrom.free_hour"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="超时计算单价(元/小时):" prop="free_hour" label-width="200px">
                    <el-input placeholder="请输入超时计算单价:" type="num" v-model.trim="customerFrom.waiting_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="亏吨标准(kg):" prop="kui_tons_standard">
                    <el-input placeholder="请输入亏吨标准:" type="num" v-model.trim="customerFrom.kui_tons_standard"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="结算方式:" prop="settlement_cycle">
                    <el-select v-model="customerFrom.settlement_cycle" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.settlementType" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="success" @click="goOtherSetp('update','nextStep','addEditFormSetp2')">保存并下一步</el-button>
                  <el-button type="primary" @click="goOtherSetp('update','out','addEditFormSetp2')">保存并退出</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <el-form class="addTailcarform" label-width="160px" ref="addEditFormSetp3" :rules="rules" :model="customerFrom" status-icon :label-position="'left'">
              <el-row :gutter="82">
                <el-col :span="12">
                  <el-form-item label="合同编号:" prop="contract_no">
                    <el-input placeholder="请输入合同编号" type="num" v-model="customerFrom.contract_no"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同起始日期:" prop="contract_start_date" :editable="editable">
                    <el-date-picker @blur="VaDate" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="请选择" v-model="customerFrom.contract_start_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="12">
                  <el-form-item label="合同截止日期:" prop="contract_end_date" :editable="editable">
                    <el-date-picker @blur="VaDate" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="请选择" v-model="customerFrom.contract_end_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="primary" @click="goOtherSetp('update','out','addEditFormSetp3')">保存并且退出</el-button>
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
  name: 'customerManageEditAdd',
  data() {
    var phoneVa = (rule, value, callback) => {
      if ((value + "").match(/^\d{3,4}-?\d{7,8}$/) || value.match(/^[1][3,4,5,7,8][0-9]{9}$/)) {
        callback();
      } else {
        callback(new Error("应为11位手机号或12位座机号"));
      }
    };
    var numVa = (rule, value, callback) => {
      if ((value + "").match(/^([1-9]\d*|0)(\.\d{1,2})?$/) || value == "") {
        callback();
      } else {
        callback(new Error("应为最多两位小数的有效数值"));
      }
    };
    var startVa = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if ((this.customerFrom.contract_end_date != "" && this.customerFrom.contract_end_date != 'undefined')) {
          if (((new Date(value)) - (new Date(this.customerFrom.contract_end_date)) < 0) || value == "") {
            callback();
          } else {
            callback(new Error("合同起始日期需小于合同截止日期"));
          }
        } else {
          callback();
        }
      }
    };
    var endVa = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if ((this.customerFrom.contract_start_date != "" && this.customerFrom.contract_start_date != 'undefined')) {
          if (((new Date(this.customerFrom.contract_start_date)) - (new Date(value)) < 0) || value == "") {
            callback();
          } else {
            callback(new Error("合同截止日期需大于合同起始日期"));
          }
        } else {
          callback();
        }
      }
    };
    var social_credit_codeVa = (rule, value, callback) => {
      if ((value + "").match(/^([A-Z0-9]{18})$/) || !value) {
        callback();
      } else {
        callback(new Error("由18位数字和大写字母组成"));
      }
    }
    var needNumVa = (rule, value, callback) => {
      if (!((value + "").match(/^([0-9]\d{0,6})(\.\d{1,2})?$/) || value == "" || value == null) || value > 1000000) {
        callback(new Error("请输入0-100万正数"));
      } else {
        callback();
      }
    };
    return {
      editable: false,
      editStatus: false,
      titleType: "新增客户",
      editable: false,
      pageLoading: false,
      saleManPading: false,
      payerLoading: false,
      customerFrom1Arr: ['consumer_name', 'short_name', 'consumer_level', 'contact_person', 'contact_phone', 'sale_man', 'social_credit_code', 'consumer_address', 'credit_limit', 'payer', 'consumer_category'],
      customerFrom2Arr: ['free_hour', 'waiting_price', 'kui_tons_standard', 'settlement_cycle'],
      customerFrom3Arr: ['contract_no', 'contract_start_date', 'contract_end_date'],
      customerFrom: {
        free_hour: "",
        waiting_price: "",
        contract_start_date: "",
        contract_end_date: "",
        social_credit_codeVa: "",
        kui_tons_standard: 200,
        credit_limit: "",
        payerType: '',
        payer: [],
        payer_name: [],
        free_hour: '',
        waiting_price: '',
        contract_start_date: '',
        contract_end_date: '',
        social_credit_codeVa: '',
        kui_tons_standard: '',
        credit_limit: '',
        consumer_name: '',
        short_name: '',
        consumer_level: '',
        contact_person: '',
        contact_phone: '',
        sale_man: '',
        social_credit_code: '',
        consumer_address: '',
        credit_limit: '',
        consumer_category: 'empty'
      },
      payerList: [],
      rules: {
        //1
        payerType: [
          { required: true, message: '该项为必选项', trigger: 'change' }
        ],
        payer_name: [
          { required: true, message: '该项为必选项', trigger: 'change' }
        ],
        consumer_name: [
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { min: 1, max: 20, message: '客户名称为1~20个字符', trigger: 'blur' }
        ],
        short_name: [
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { min: 1, max: 20, message: '客户简称为1~20个字符', trigger: 'blur' }
        ],
        consumer_level: [
          { required: true, message: '该项为必填项', trigger: 'change' }
        ],
        contact_person: [
          { min: 0, max: 20, message: '客户简称为1~20个字符', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '该项为必填项', trigger: 'blur' },
          { validator: phoneVa, trigger: 'blur' },
        ],
        sale_man: [
          { required: true, message: '该项为必填项', trigger: 'change' }
        ],
        social_credit_code: [{ validator: social_credit_codeVa, trigger: 'blur' }],
        consumer_address: [],
        //2
        free_hour: [
          { validator: numVa, trigger: 'blur' },
        ],
        waiting_price: [
          { validator: numVa, trigger: 'blur' },
        ],
        kui_tons_standard: [
          { validator: numVa, trigger: 'blur' },
        ],
        settlement_cycle: [],
        //3
        contract_no: [],
        contract_start_date: [
          { validator: startVa, trigger: 'blur' },
        ],
        contract_end_date: [
          { validator: endVa, trigger: 'blur' },
        ],
        credit_limit: [
          { validator: needNumVa, trigger: 'blur' },
        ]
      },
      customerId: '',

    }
  },
  created() {
    if (this.$route.query.customerId) {
      this.customerId = this.$route.query.customerId;
      this.getCustomerDetlis(this.$route.query.customerId);
      this.titleType = "编辑客户";
      this.editStatus = true;
    }
    this.getSaleMan();
    this.getPayerList();
  },
  computed: {
    selectData: function() {
      return {
        customerType: [{
          verbose: "一类客户",
          key: "a"
        }, {
          verbose: "二类客户",
          key: "b"
        }, {
          verbose: "三类客户",
          key: "c"
        }],
        //saleMan: this.$store.state.common.selectData.saleMan,
        settlementType: [{
          verbose: "预付",
          key: "0"
        }, {
          verbose: "货到付款",
          key: "1"
        }, {
          verbose: "周结",
          key: "2"
        }, {
          verbose: "月结",
          key: "3"
        }, {
          verbose: "见票付款",
          key: "4"
        }],
        consumerCategoryList: [{
          label: "--空--",
          value: "empty"
        }, {
          label: "加气站",
          value: "gas_station"
        }, {
          label: "城市燃气",
          value: "urban_gas"
        }, {
          label: "工业用气",
          value: "industrial_gas"
        }, {
          label: "发电用气",
          value: "generate_electricity"
        }, {
          label: "固定站点",
          value: "fixation"
        }, {
          label: "贸易商",
          value: "trafficker"
        }, {
          label: "大客户",
          value: "big_customer"
        }, {
          label: "其他",
          value: "other"
        }],
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
    selectPayerType(label) {
      this.customerFrom.payerType = label;
      if (!label) {
        this.customerFrom.payer = '';
      }
    },
    payerSelect(payers) {

      this.customerFrom.payer = [];
      for (let i in this.payerList) {
        for (let j in payers) {
          console.log(this.payerList[i].payer, payers[j])
          if (this.payerList[i].payer === payers[j]) {
            this.customerFrom.payer.push(this.payerList[i].id);
          }
        }
      }
      console.log(this.customerFrom.payer, payers)
    },
    getPayerList(query) {
      let postData = {
        // page: 1,
        // page_size: 100
        need_all: true
      }
      if (query) {
        postData.payer = query;
      }
      this.payerLoading = true;
      this.$$http('searchCustomerPayList', postData).then((result) => {
        this.payerLoading = false;
        if (result.data && result.data.code == 0) {
          this.payerList = result.data.data;
        }
      })
    },
    VaDate: function() {
      this.validatorFrom('addEditFormSetp3');
    },
    goOtherSetp: function(stepInfo, operation, formName) {
      if (stepInfo == "add" && !this.customerId) {
        this.createFrom(operation, formName);
      } else if ((stepInfo == "update" && this.activeStep >= 1) || this.customerId) {
        this.updateFrom(operation, formName);
      }
    },
    goDetalis: function() {
      if (this.$route.query.operate === 'edit') {
        this.$router.push({
          path: `/basicDataManage/customerManage/customerManageAll/customerManageDetalis/${ this.customerId }/`
        });
      } else {
        this.$router.push({ path: "/basicDataManage/customerManage/customerManageAll" });
      }
    },
    getSaleMan: function() {
      var sendData = {
        department_identity: 'business',
        need_all: true
      };
      var vm = this;
      this.saleManPading = true;
      this.$$http("getSaleManList", sendData).then((result) => {
        if (result.data.code == 0) {
          vm.selectData.saleMan = result.data.data;
        }
        vm.saleManPading = false;
      }).catch(() => {
        vm.saleManPading = false;
      });
    },
    updateFrom: function(operation, formName) {
      var vm = this;

      this.validatorFrom(formName, (result) => {

        if (result == 'true') {
          var sendData = this.pbFunc.deepcopy(vm.customerFrom);
          sendData = vm.pbFunc.fifterObjIsNull(sendData);
          sendData = vm.pbFunc.fifterbyArr(sendData, vm['customerFrom' + (parseInt(vm.activeStep) + 1) + 'Arr']);
          vm.pageLoading = true;
          sendData.id = vm.customerId;
          return
          this.$$http('upadtecustomerFrom', sendData).then((result) => {
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
                  path: "/basicDataManage/customerManage/customerManageAll/customerManageEditAdd",
                  query: {
                    customerId: vm.customerId,
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
    getCustomerDetlis: function(customerId) {
      this.pageLoading = true;
      var vm = this;
      var sendData = {
        id: customerId
      }
      let detailData = {};
      this.$$http('getCustomerDetlis', sendData).then((result) => {
        if (result.data.code == 0) {
          detailData = result.data.data;


          let peyerArr = [],
            payerNameArr = [];
          if (detailData.payer_info) {
            for (let i in detailData.payer_info) {
              peyerArr.push(detailData.payer_info[i].id);
              payerNameArr.push(detailData.payer_info[i].payer_name);
            }
          }
          for (let i in this.customerFrom) {
            if (i === 'peyer' || i === 'payer_name') {
              this.$set(this.customerFrom, i, []);
            } else {
              this.$set(this.customerFrom, i, detailData[i]);
            }
            // console.log(i, detailData[i])
          }
          this.customerFrom.payer = [...new Set(peyerArr)];
          this.customerFrom.payer_name = [...new Set(payerNameArr)];
          // console.log('detailData',this.customerFrom);
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
          var sendData = this.pbFunc.deepcopy(this.customerFrom);

          sendData = this.pbFunc.fifterObjIsNull(sendData);
          sendData = this.pbFunc.fifterbyArr(sendData, this.customerFrom1Arr);
          sendData.is_confirmed = 1;
          this.$$http('creatCustomerFrom', sendData).then((result) => {
            vm.pageLoading = false;
            if (result.data.code == 0) {
              vm.customerFrom.id = result.data.data.id;
              vm.customerId = result.data.data.id;
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
                  path: "/basicDataManage/customerManage/customerManageAll/customerManageEditAdd",
                  query: {
                    customerId: vm.customerId,
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
