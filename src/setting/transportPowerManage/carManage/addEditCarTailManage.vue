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

.left-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

.icon-down-arrow {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
  transform: rotate(90deg);
  display: inline-block;
}



.right-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  pointer: cursor;
}

</style>
<template>
  <div id="addeditTailCarPage">
    <el-container>
      <el-header style="height:80px">
        <el-row>
          <el-col :span="1" class="left-arrow-d"><i class="icon-down-arrow" v-on:click="goDetalis"></i></el-col>
          <el-col :span="22">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <el-col class="stepTitle">
          {{stepTitle}}
        </el-col>
      </el-row>
      <el-main v-loading="pageLoading">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form class="addTailcarform" label-width="115px" ref="addEditFormSetp1" :rules="rules" :model="tailCarFormStep" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="挂车牌:" prop="plate_number">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="tailCarFormStep.plate_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆归属:" prop="attributes">
                    <el-select v-model="tailCarFormStep.attributes" placeholder="请选择车辆归属">
                      <el-option v-for="(item,key) in selectData.ascriptionSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆所属:" prop="carrier">
                    <el-input placeholder="请输入" type="text" v-model="tailCarFormStep.carrier.name" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="车架号:" prop="vin_number">
                    <el-input placeholder="请输入" type="text" v-model="tailCarFormStep.vin_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆类型:" prop="vehicle_type">
                    <el-select v-model="tailCarFormStep.vehicle_type" placeholder="请选择车辆类型" @change="changeSelect">
                      <el-option v-for="(item,key) in selectData.carTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="品牌型号:" prop="brand">
                    <el-input placeholder="请输入" type="text" v-model="tailCarFormStep.brand"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="核定载质量(kg):">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.transport_weight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="罐体容积(m):" prop="valume">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.valume"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="外廊长(m):" prop="length">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.length"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊宽(m):" prop="width">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廊高(m):" prop="height">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.height"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运输介质:">
                    <el-select v-model="tailCarFormStep.trans_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.transportTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆注册日期:">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep.register_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="success" @click="goOtherSetp('add','nextStep')">填写证件信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('add','out')">保存并退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form class="addTailcarform" label-width="100px" ref="addEditFormSetp2" :rules="rules" :model="tailCarFormStep" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="行驶证编号:" prop="license_number">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.license_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证发证日期:" prop="license_register_date" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep.license_register_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证年审日期:" prop="license_verify_date" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep.license_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运营证号:" prop="operation_number">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.operation_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证发证日期:" prop="operation_issue_date" label-width="150px">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="tailCarFormStep.operation_issue_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证年审日期:" prop="operation_verify_date" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep.operation_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="success" @click="goOtherSetp('update','nextStep')">填写保险信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('update','out')">保存并退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <el-form class="addTailcarform" label-width="100px" :rules="rules" :model="tailCarFormStep" status-icon :label-position="'left'" ref="addInsuanceFrom">
              <el-row class="insurance-form-head">
                <el-col :span="22" style="padding-left:10px;">保单填写</el-col>
                <el-col :span="2" style="text-align:right;">
                  <el-button @click="addInsuranceListForm">新增</el-button>
                </el-col>
              </el-row>
              <div v-for="(item,key) in tailCarFormStep.semitrailer_insurances" :key="key" class="alone-insurance-form">
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="保险类型:" prop="insurance_type">
                      <el-select v-model="item.insurance_type.key">
                        <el-option v-for="(insurance,insuranceKey) in selectData.insuranceTypeSelect" :key="insuranceKey" :label="insurance.verbose" :value="insurance.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保单号:" prop="getDrivingDate">
                      <el-input placeholder="请输入" type="text" v-model="item.insurance_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="投保方式:" prop="insurance_menth">
                      <el-select v-model="item.insurance_method.key">
                        <el-option v-for="(insurance_m,insurance_m_Key) in selectData.insurancMethodSelect" :key="insurance_m_Key" :label="insurance_m.verbose" :value="insurance_m.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保公司:" prop="examineDrivingDate">
                      <el-input placeholder="请输入" type="text" v-model="item.insurance_company"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="金额:" prop="examineDrivingDate">
                      <el-input placeholder="请输入" type="text" v-model="item.amount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保日期:" prop="buyInsuranceDate">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.insurance_start_date" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="到期日期:">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.insurance_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" style="font-size:32px;text-align:right;" v-if="tailCarFormStep.semitrailer_insurances.length>1">
                    <i class="el-icon-delete" style="cursor:pointer;" @click="deleteInsuranceFrom(key)"></i>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <el-col :span="6" :offset="8">
              <el-button type="success" @click="goOtherSetp('update','nextStep')">填写其他信息</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="goOtherSetp('update','out')">保存并退出</el-button>
            </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==3">
            <el-form class="addTailcarform" label-width="160px" ref="addEditFormSetp2" :rules="rules" :model="tailCarFormStep" status-icon :label-position="'left'">
              <el-row :gutter="82">
                <el-col :span="12">
                  <el-form-item label="罐检报告编号:" prop="bottle_report_number">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.bottle_report_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="罐检检验日期:" prop="bottle_verify_date">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="tailCarFormStep.bottle_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="12">
                  <el-form-item label="压力容器证编号:" prop="pressure_bottle_number">
                    <el-input placeholder="请输入" type="num" v-model="tailCarFormStep.pressure_bottle_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="压力容器检验日期:" prop="pressure_bottle_verify_date">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="tailCarFormStep.pressure_bottle_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="11">
                <el-button type="primary" @click="goOtherSetp('update')">保存并且退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'addCarHeadManage',
  data() {
    var headCarNumVa = (rule, value, callback) => {
      if (value.match(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/)) {
        callback();
      } else {
        callback(new Error("车牌号为:一个汉字+6个字段，如：鲁GP8996"));
      }
    };
    var buyInsuranceDateVa = (rule, value, callback) => {
      if (new Date(value).getTime() > new Date().getTime()) {
        callback(new Error("入保时间不能大于当前时间"));
      } else {
        callback();
      }
    };
    return {
      titleType: "新增挂车",
      stepTitle: "基本信息填写",
      activeStep: 0,
      pageLoading: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      tailCarFormStep1Arr: ['plate_number', 'attributes', 'carrier', 'vin_number', 'vin_number', 'vehicle_type', 'brand', 'transport_weight', 'valume', 'length',
        'width', 'trans_type', 'register_date'
      ],
      tailCarFormStep2Arr: ['license_number', 'license_register_date', 'license_register_date', 'operation_number', 'operation_issue_date', 'operation_verify_date'],
      tailCarFormStep3Arr: ['semitrailer_insurances', 'semitrailer_insurances_add'],
      tailCarFormStep4Arr: ['bottle_report_number', 'bottle_verify_date', 'pressure_bottle_number', 'pressure_bottle_verify_date'],
      tailCarFormStep: {
        plate_number: "鲁GL8996", //挂车排
        attributes: '', //车辆归属
        carrier: { name: '胜通物流公司', id: '55555c1f-1ffe-4419-9646-157c1aa0571d' }, //车辆所属
        vin_number: "LZZ1CLVB6GA107016", //车架号
        vehicle_type: '',
        brand: "1231231233", //品牌型号
        transport_weight: "", //质量
        valume: "", //灌装容积
        length: "", //长
        width: "", //宽
        height: "", //高
        trans_type: '',
        register_date: "", //车辆注册日期

        license_number: "", //驾驶行驶证编号
        license_register_date: "", //发证日期
        license_register_date: "", //运营年审日期
        operation_number: "", //运营号
        operation_issue_date: "", //运营证发布日期
        operation_verify_date: "", //运营证年审日期

        operation_verify_date: "", //行驶证年审日期
        semitrailer_insurances: [],
        bottle_report_number: "", //罐体报告编号
        bottle_verify_date: "11111", //罐体检验日期
        pressure_bottle_number: "", //压力容器编号
        pressure_bottle_verify_date: "", //压力容器检验日期

      },
      rules: {
        plate_number: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { validator: headCarNumVa, trigger: 'blur' }
        ],
        attributes: [
          { required: true, message: '请选择车辆归属', trigger: 'blur' }
        ],
        carrier: [
          { required: true, message: '请填写车辆所属', trigger: 'blur' }
        ],
        vin_number: [
          { min: 17, max: 17, message: '车架号17个字段，如：LZZ1CLVB6GA107016', trigger: 'blur' }
        ],
        vehicle_type: [
          { required: true, message: '请选择车辆类型', trigger: 'blur' }
        ],
        brand: [
          { min: 10, max: 20, message: '10~20个字段,如:圣达因SDY5300GDY', trigger: 'blur' }
        ],
        buyInsuranceDate: [
          { validator: buyInsuranceDateVa, trigger: 'blur' }
        ],
        valume: [
          { type: 'number', message: '只能由数字组成' }
        ],
        length: [
          { type: 'number', message: '只能由数字组成' }
        ],
        width: [
          { type: 'number', message: '只能由数字组成' }
        ],
        height: [
          { type: 'number', message: '只能由数字组成' }
        ],

      }
    }
  },
  created() {
    if (this.$route.query.activeStep) {
      this.activeStep = parseInt(this.$route.query.activeStep);
      this.stepTitle = this.activeStep == 0 ? '基本信息填写' : (this.activeStep == 1 ? '证件信息填写' : (this.activeStep == 2 ? '保险信息填写' : '其他信息填写'));

    }
    if (this.$route.query.tailId) {
      this.tailId = this.$route.query.tailId;
      this.getTailDetalis(this.$route.query.tailId);
      this.titleType = "编辑挂车";
    }
  },
  computed: {
    selectData: function() {
      return {
        ascriptionSelect: this.$store.state.common.selectData.truck_attributes,
        carTypeSelect: this.$store.state.common.selectData.semitrailer_vehicle_type,
        transportTypeSelect: this.$store.state.common.selectData.truck_trans_type,
        fuelTypeSelect: this.$store.state.common.selectData.tractor_fuel_type,
        insuranceTypeSelect: this.$store.state.common.selectData.tractor_insurance_type,
        insurancMethodSelect: this.$store.state.common.selectData.truck_insurance_method
      }
    }
  },
  methods: {
    changeSelect: function(key) {
      this.tailCarFormStep.vehicle_type.verbose = this.selectData.carTypeSelect.find((item) => {
        return item.key === key;
      }).verbose;
    },
    goOtherSetp: function(stepInfo, operation, formName) {
      if (stepInfo == "add" && !this.tailId) {
        this.createFrom(operation, formName);
      } else if ((stepInfo == "update" && this.activeStep >= 1) || this.tailId) {
        this.updateFrom(operation, formName);
      }
    },
    goDetalis: function() {
      if (this.tailId) {
        this.$router.push({ path: "/transportPowerManage/carManage/showCarTailManage?tailId=" + this.tailId });
      }
    },
    addInsuranceListForm: function(addInsuanceFrom) {
      this.tailCarFormStep.semitrailer_insurances.push({
        insurance_type: { key: "", verbose: "" },
        insurance_number: "",
        insurance_company: "",
        insurance_start_date: "",
        insurance_due_date: "",
        insurance_method: { key: "", verbose: "" },
        amount: "",
      })
    },
    updateFrom: function(operation, fromName) {
      var sendData = this.pbFunc.deepcopy(this.tailCarFormStep);
      if (this.activeStep == 0) {} else if (this.activeStep == 1) {} else if (this.activeStep == 2) {
        var semitrailer_insurances = [];
        var semitrailer_insurances_add = [];
        for (let i = 0; i < sendData.semitrailer_insurances.length; i++) {
          sendData.semitrailer_insurances[i].insurance_type = sendData.semitrailer_insurances[i].insurance_type.key;
          sendData.semitrailer_insurances[i].insurance_method = sendData.semitrailer_insurances[i].insurance_method.key;
          if (sendData.semitrailer_insurances[i].id) {
            semitrailer_insurances.push(sendData.semitrailer_insurances[i]);
          } else {
            semitrailer_insurances_add.push(sendData.semitrailer_insurances[i]);
          }
        }
        delete sendData.semitrailer_insurances;
        sendData.semitrailer_insurances = semitrailer_insurances;
        sendData.semitrailer_insurances_add = semitrailer_insurances_add;
      } else if (this.activeStep == 3) {
        sendData = this.pbFunc.fifterbyArr(sendData, this.tailCarFormStep4Arr);
      }
      sendData = this.pbFunc.fifterObjIsNull(sendData);
      sendData = this.pbFunc.fifterbyArr(sendData, this['tailCarFormStep' + (parseInt(this.activeStep) + 1) + 'Arr']);
      this.pageLoading = true;
      sendData.id = this.tailId;
      this.$$http('upadteTailFrom', sendData).then((result) => {
        if (result.data.code == 0) {
          if (operation == 'out') {
            //跳转详情
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.activeStep += 1;
            this.pageLoading = false;
            if (this.activeStep == 2) {
              this.addInsuranceListForm();
            }
          }
        } else {
          this.pageLoading = false;
        }
      }).catch(() => {
        this.pageLoading = false;
      });
    },
    getTailDetalis: function(tailId) {
      this.pageLoading = true;
      var sendData = {
        id: tailId
      }
      this.$$http('getTailDetalis', sendData).then((result) => {
        if (result.data.code == 0) {
          this.tailCarFormStep = result.data.data;

          this.tailCarFormStep.attributes = sendData.attributes.key;
          this.tailCarFormStep.vehicle_type = sendData.vehicle_type.key;
          this.tailCarFormStep.trans_type = sendData.trans_type.key;

          if (this.$route.query.activeStep == 2 && !this.tailCarFormStep.semitrailer_insurances.length) {
            this.addInsuranceListForm();
          }
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
      this.validatorFrom(formName, function(result) {
        if (result == 'true') {
          this.pageLoading = true;
          var sendData = this.pbFunc.deepcopy(this.tailCarFormStep);

          sendData = this.pbFunc.fifterObjIsNull(sendData);
          sendData = this.pbFunc.fifterbyArr(sendData, this.tailCarFormStep1Arr);
          this.$$http('creatTailFrom', sendData).then((result) => {
            this.pageLoading = false;
            if (result.data.code == 0) {
              this.tailCarFormStep.id = result.data.data.id;
              this.tailId = result.data.data.id;
              if (operation == 'out') {
                this.$router.push({ path: "/transportPowerManage/carManage/showCarTailManage?tailId=" + this.tailId });
              } else {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.activeStep += 1;
                if (this.activeStep == 1) {
                  this.stepTitle = tailCarFormStep.plate_number + "证件信息填写";
                } else if (this.activeStep == 2) {
                  this.stepTitle = tailCarFormStep.plate_number + "保险信息填写";
                } else if (this.activeStep == 3) {
                  this.stepTitle = tailCarFormStep.plate_number + "其他信息填写";
                }
              }
            } else if (result.data.code == 400) {
              Message.error(result.data.msg);
            };
          }).catch(() => {
            this.pageLoading = false;
          });
        } else {
          this.$message({
            showClose: true,
            message: '请验证表单',
            type: 'error'
          });
        }
      });

    },
    deleteInsuranceFrom: function(index) {
      if (this.tailCarFormStep.semitrailer_insurances[index].id) {
        vm.pageLoading = true;
        var send = {
          id: this.tailId,
          tractor_insurance_id: this.tailCarFormStep.semitrailer_insurances[index].id
        }
        this.$$http('deleteInsuranceFromTail', send).then((result) => {
          this.pageLoading = false;
          if (result.data.code == 0) {
            this.tailCarFormStep.semitrailer_insurances = this.tailCarFormStep.semitrailer_insurances.splice(index, 1);
          }
        }).catch(() => {
          this.pageLoading = false;
        });
      } else {
        this.tailCarFormStep.semitrailer_insurances = this.tailCarFormStep.semitrailer_insurances.splice(index, 1);
      }
    }
  }
}

</script>
