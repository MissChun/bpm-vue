<template>
  <div id="addeditHeadCarPage">
    <el-container>
      <el-header style="margin-top:15px;height:80px">
        <el-row>
          <el-col :span="2" class="left-arrow-d"><span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span>
          </el-col>
          <el-col :span="20">
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
            <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp1" :rules="rules" :model="headCarFormStep1" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="牵引车牌:" prop="plate_number">
                    <el-input :autofocus="true" placeholder="请输入" type="text" v-model="headCarFormStep1.plate_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆归属:" prop="attributes">
                    <el-select v-model="headCarFormStep1.attributes" placeholder="请选择车辆归属" :disabled="editStatus">
                      <el-option v-for="(item,key) in selectData.ascriptionSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆所属:" prop="carrier">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.carrier.name" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="车架号:" prop="vin_number">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.vin_number" :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发动机号:" prop="engine_number">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.engine_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆类型:" prop="vehicle_type">
                    <el-select v-model="headCarFormStep1.vehicle_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.carTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="品牌型号:" prop="brand">
                    <el-input placeholder="请输入" type="text" v-model="headCarFormStep1.brand"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="整备质量:" prop="total_weight">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.total_weight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="牵引车总质量:" prop="towing_weight">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.towing_weight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="外廓长:" prop="length">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.length"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廓宽:" prop="width">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.width"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外廓高:" prop="height">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.height"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运输介质:">
                    <el-select v-model="headCarFormStep1.trans_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.transportTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="燃料类型:" prop="fuel_type">
                    <el-select v-model="headCarFormStep1.fuel_type" placeholder="请选择车辆类型">
                      <el-option v-for="(item,key) in selectData.fuelTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="危险品灯号:" prop="danger_product_lamp">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.danger_product_lamp"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="危险品灯号到期日期:" prop="dangerousNumDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.danger_product_due_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="气瓶编号:" prop="gas_bottle_number">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.gas_bottle_number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="压力表编号:" prop="pressureGaugeNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.pressure_gauge_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="压力表编号到期日期:" prop="pressureGaugeDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.pressure_gauge_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号1:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_1_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_1_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号2:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_2_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_2_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号3:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_3_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_3_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
              <el-collapse-transition>
                <el-row :gutter="80" v-if="headCarFormStep1.fuel_type=='GAS'">
                  <el-col :span="8">
                    <el-form-item label="安全阀编号4:" prop="safetyValveNum">
                      <el-input placeholder="请输入" type="num" v-model="headCarFormStep1.safety_valve_4_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全阀到期日期:" prop="safetyValveNumDate" label-width="150px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep1.safety_valve_4_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-transition>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="success" @click="goOtherSetp('add','nextStep','addEditFormSetp1')">填写证件信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('add','out','addEditFormSetp1')">保存并退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==1">
            <el-form class="addheadcarform" label-width="100px" ref="addEditFormSetp2" :rules="rules" :model="headCarFormStep2" status-icon :label-position="'left'">
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="行驶证编号:" prop="license_number">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep2.license_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证发证日期:" prop="getDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep2.license_register_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行驶证年审日期:" prop="examineDrivingDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep2.license_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="8">
                  <el-form-item label="运营证号:" prop="operation_number">
                    <el-input placeholder="请输入" type="num" v-model="headCarFormStep2.operation_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证发证日期:" prop="operationDate" label-width="150px">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="headCarFormStep2.operation_issue_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营运证年审日期:" prop="examineOperationDate" label-width="150px">
                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="headCarFormStep2.operation_verify_date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-button type="success" @click="goOtherSetp('update','nextStep','addEditFormSetp2')">填写保险信息</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="goOtherSetp('update','out','addEditFormSetp2')">保存并退出</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==2">
            <el-form class="addheadcarform" label-width="100px" :rules="rules" :model="headCarFormStep3" status-icon :label-position="'left'" ref="addInsuanceFromStep3">
              <el-row class="insurance-form-head">
                <el-col :span="22" style="padding-left:10px;">保单填写</el-col>
                <el-col :span="2" style="text-align:right;">
                  <el-button @click="addInsuranceListForm">新增</el-button>
                </el-col>
              </el-row>
              <div v-for="(item,key) in headCarFormStep3.tractor_insurances" :key="key" class="alone-insurance-form">
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="保险类型:" prop="insuranceType" label-width="120px">
                      <el-select v-model="item.insurance_type">
                        <el-option v-for="(insurance,insuranceKey) in selectData.insuranceTypeSelect" :key="insuranceKey" :label="insurance.verbose" :value="insurance.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保单号:" prop="getDrivingDate" label-width="120px">
                      <el-input placeholder="请输入" type="text" v-model="item.insurance_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="投保方式:" prop="insurance_menth">
                      <el-select v-model="item.insurance_method">
                        <el-option v-for="(insurance_m,insurance_m_Key) in selectData.insurancMethodSelect" :key="insurance_m_Key" :label="insurance_m.verbose" :value="insurance_m.key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保公司:" prop="examineDrivingDate" label-width="120px">
                      <el-input placeholder="请输入" type="text" v-model="item.insurance_company"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保险金额:" prop="insuranceAmout" label-width="120px">
                      <el-input placeholder="请输入" type="text" v-model="item.amount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <el-form-item label="入保日期:" prop="insurance_start_date" label-width="120px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.insurance_start_date" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="到期日期:" label-width="120px">
                      <el-date-picker value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="item.insurance_due_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" style="font-size:32px;text-align:right;" v-if="headCarFormStep3.tractor_insurances.length>1">
                    <i class="el-icon-delete" style="cursor:pointer;" @click="deleteInsuranceFrom(key)"></i>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <el-row>
              <el-col :span="6" :offset="11">
                <el-button type="primary" @click="goOtherSetp('update','out','addInsuanceFromStep3')">保存并且退出</el-button>
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
      if (value.match(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/)) {
        callback();
      } else {
        callback(new Error("车牌号格式为：一个汉字+6个字段，如：鲁GP8996"));
      }
    };
    var buyInsuranceDateVa = (rule, value, callback) => {
      if (new Date(value).getTime() > new Date().getTime()) {
        callback(new Error("入保时间不能大于当前时间"));
      } else {
        callback();
      }
    };
    var onlyNum = (rule, value, callback) => {
      if ((value + "").match(/^\d+(\.\d+)?$/) || value == '' || value == null) {
        callback();
      } else {
        callback(new Error("只能是数字"));
      }
    };
    var dangerVa = (rule, value, callback) => {
      if (value.match(/^[0-9]{8}[/-]{1}[0-9]{2}$/) || value == "") {
        callback();
      } else {
        callback(new Error("危险品灯号由10个数值组成，如37060111-16"));
      }
    };
    return {
      editStatus: false,
      activeStep: 0,
      titleType: "新增牵引车",
      headId: "",
      pageLoading: false,
      stepTitle: '基础信息',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      headCarFormStep1: {
        plate_number: '', //车牌号
        attributes: 'SELF_SUPPORT', //车辆归属
        carrier: this.$store.state.common.users.carrier,
        vin_number: '',
        engine_number: '',
        vehicle_type: 'HEAVE_TOWING_SEMITRAILER', //
        brand: '',
        total_weight: '',
        towing_weight: '',
        length: '',
        width: '',
        height: '',
        trans_type: 'LNG', //
        fuel_type: '', //
        danger_product_lamp: '',
        danger_product_due_date: '',
        gas_bottle_number: '',
        pressure_gauge_number: '',
        pressure_gauge_due_date: '',
        safety_valve_1_number: '',
        safety_valve_1_due_date: '',
        safety_valve_2_number: '',
        safety_valve_2_due_date: '',
        safety_valve_3_number: '',
        safety_valve_3_due_date: '',
        safety_valve_4_number: '',
        safety_valve_4_due_date: ''

      },
      headCarFormStep2: {
        license_number: '',
        license_register_date: '',
        license_verify_date: '',
        operation_number: '',
        operation_issue_date: '',
        operation_verify_date: ''

      },
      headCarFormStep3: {
        tractor_insurances: []
      },
      rules: {
        plate_number: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { validator: headCarNumVa, trigger: 'blur' }
        ],
        attributes: [
          { required: true, message: '请选择车辆归属', trigger: 'blur' }
        ],
        vin_number: [
          { required: true, message: '车架号不能为空', trigger: 'blur' },
          { min: 17, max: 17, message: '车架号为17个字段，如：LZZ1CLVB6GA107016', trigger: 'blur' }
        ],
        engine_number: [
          { min: 10, max: 15, message: '发动机号为10~15个字段', trigger: 'blur' }
        ],
        fuel_type: [
          { required: true, message: '请选择燃料类型', trigger: 'blur' }
        ],
        brand: [
          { min: 10, max: 20, message: '10~20个字段', trigger: 'blur' }
        ],
        danger_product_lamp: [
          { validator: dangerVa, trigger: 'blur' },
        ],
        gas_bottle_number: [
          { required: true, message: '请填写气瓶编号', trigger: 'blur' }
        ],
        license_number: [
          { required: true, message: '行驶证编号不能为空', trigger: 'blur' }, { min: 12, max: 12, message: '行驶证为12位数字', trigger: 'blur' }, { validator: onlyNum, trigger: 'blur' }
        ],
        operation_number: [
          { required: true, message: '运营证编号不能为空', trigger: 'blur' },
          { validator: onlyNum, trigger: 'blur' }, { min: 12, max: 12, message: '运营证为12位数字', trigger: 'blur' }
        ],
        total_weight: [
          { validator: onlyNum, trigger: 'blur' }
        ],
        towing_weight: [
          { validator: onlyNum, trigger: 'blur' }
        ],
        length: [
          { validator: onlyNum, trigger: 'blur' }
        ],
        width: [
          { validator: onlyNum, trigger: 'blur' }
        ],
        height: [
          { validator: onlyNum, trigger: 'blur' }
        ],
        insuranceAmout: [
          { validator: onlyNum, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    selectData: function() {
      return {
        ascriptionSelect: this.$store.state.common.selectData.truck_attributes,
        carTypeSelect: this.$store.state.common.selectData.tractor_vehicle_type,
        transportTypeSelect: this.$store.state.common.selectData.truck_trans_type,
        fuelTypeSelect: this.$store.state.common.selectData.tractor_fuel_type,
        insuranceTypeSelect: this.$store.state.common.selectData.tractor_insurance_type,
        insurancMethodSelect: this.$store.state.common.selectData.truck_insurance_method
      }
    },
    returnPage: function() {
      return this.$route.query.headId ? '详情页' : '列表页';
    },
  },
  created() {
    if (this.$route.query.activeStep) {
      this.activeStep = parseInt(this.$route.query.activeStep);
      this.stepTitle = this.activeStep == 0 ? '基本信息填写' : (this.activeStep == 1 ? '证件信息填写' : '保险信息填写');
    }
    if (this.$route.query.headId) {
      this.headId = this.$route.query.headId;
      this.getHeadDetalis(this.$route.query.headId);
      this.titleType = "编辑牵引车";
      this.editStatus = true;
    } else {
      this.addInsuranceListForm();
    }
  },
  methods: {
    goOtherSetp: function(stepInfo, operation, formName) {
      if (stepInfo == "add" && !this.headId) {
        this.createFrom(operation, formName);
      } else if ((stepInfo == "update" && this.activeStep >= 1) || this.headId) {
        this.updateFrom(operation, formName);
      }
    },
    getHeadDetalis: function(headId) {
      var sendData = {
        id: headId
      }
      this.pageLoading = true;
      var vm = this;
      this.$$http('getHeadDetalis', sendData).then(function(result) {
        if (result.data.code == 0) {
          vm.headCarFormStep1 = vm.getTrueObj(vm.headCarFormStep1, result.data.data);

          vm.headCarFormStep1.attributes = vm.headCarFormStep1.attributes.key;
          vm.headCarFormStep1.vehicle_type = vm.headCarFormStep1.vehicle_type.key;
          vm.headCarFormStep1.trans_type = vm.headCarFormStep1.trans_type.key;
          vm.headCarFormStep1.fuel_type = vm.headCarFormStep1.fuel_type.key;

          vm.headCarFormStep3 = vm.getTrueObj(vm.headCarFormStep3, result.data.data);
          vm.headCarFormStep2 = vm.getTrueObj(vm.headCarFormStep2, result.data.data);
          var tractor_insurancesList = vm.headCarFormStep3.tractor_insurances;
          for (let i = 0; i < tractor_insurancesList.length; i++) {
            tractor_insurancesList[i].insurance_type = tractor_insurancesList[i].insurance_type.key;
            tractor_insurancesList[i].insurance_method = tractor_insurancesList[i].insurance_method.key;
          }
          vm.pageLoading = false;
          if (vm.headCarFormStep3.tractor_insurances.length == 0) {
            vm.addInsuranceListForm();
          }
        } else {
          vm.pageLoading = false;
        };
      }).catch(function() {
        vm.pageLoading = false;
      });
    },
    returnToPage: function() {
      if (this.$route.query.headId) {
        this.$router.push({ path: "/transportPowerManage/carManage/showCarHeadManage", query: { headId: this.$route.query.headId } });
      } else {
        this.$router.push({ path: "/transportPowerManage/carManage/carHeadManage" });
      }
    },
    getTrueObj: function(obj, getobj) {
      var newObj = this.pbFunc.deepcopy(obj);
      for (var value in newObj) {
        if (getobj[value]) {
          newObj[value] = getobj[value];
        }
      }
      return newObj;
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
      this.validatorFrom(formName, function(result) {
        if (result == 'true') {

          vm.pageLoading = true;
          if (vm.headCarFormStep1.fuel_type != "GAS") {
            vm.headCarFormStep1.gas_bottle_number = '',
              vm.headCarFormStep1.pressure_gauge_number = '',
              vm.headCarFormStep1.pressure_gauge_due_date = '',
              vm.headCarFormStep1.safety_valve_1_number = '',
              vm.headCarFormStep1.safety_valve_1_due_date = '',
              vm.headCarFormStep1.safety_valve_2_number = '',
              vm.headCarFormStep1.safety_valve_2_due_date = '',
              vm.headCarFormStep1.safety_valve_3_number = '',
              vm.headCarFormStep1.safety_valve_3_due_date = '',
              vm.headCarFormStep1.safety_valve_4_number = '',
              vm.headCarFormStep1.safety_valve_4_due_date = ''
          };



          var sendData = vm.pbFunc.fifterObjIsNull(vm.headCarFormStep1);

          //sendData.carrier = sendData.carrier.id ? sendData.carrier.id : null;
          delete sendData.carrier;

          vm.$$http('creatHeadFrom', sendData).then(function(result) {
            vm.pageLoading = false;
            if (result.data.code == 0) {
              vm.headCarFormStep2.id = result.data.data.id;
              vm.headCarFormStep3.id = result.data.data.id;
              vm.headId = result.data.data.id;
              if (operation == 'out') {
                //跳转查询详情页面
                vm.$router.push({ path: "/transportPowerManage/carManage/showCarHeadManage?headId=" + vm.headId });
              } else {
                vm.activeStep += 1;
                vm.stepTitle = "证件信息填写";
              }
            } else if (result.data.code == 400) {
              Message.error(result.data.msg);
            };

          }).catch(function() {
            vm.pageLoading = false;
          });
        }
      });

    },
    updateFrom: function(operation, formName) {
      var vm = this;
      var upSubmit = false;
      var sendData = {};
      this.validatorFrom(formName, function(result) {
        if (result == 'true') {
          upSubmit = true;
        } else {
          upSubmit = false;
        }
      });
      if (vm.activeStep == 0) {
        sendData = vm.pbFunc.deepcopy(vm.headCarFormStep1);

        sendData.carrier = sendData.carrier ? sendData.carrier.id : null;

      } else if (vm.activeStep == 1) {
        sendData = this.headCarFormStep2;
      } else if (vm.activeStep == 2) {
        sendData = vm.pbFunc.deepcopy(vm.headCarFormStep3);
        var tractor_insurances = [];
        var tractor_insurances_add = [];
        for (let i = 0; i < sendData.tractor_insurances.length; i++) {
          if (sendData.tractor_insurances[i].id) {
            tractor_insurances.push(sendData.tractor_insurances[i]);
          } else {
            tractor_insurances_add.push(sendData.tractor_insurances[i]);
          }
        }
        delete sendData.tractor_insurances;
        sendData.tractor_insurances = tractor_insurances;
        sendData.tractor_insurances_add = tractor_insurances_add;
        sendData.id = vm.headId;
      }
      var send = this.pbFunc.fifterObjIsNull(sendData);
      send.id = vm.headId;
      if (upSubmit) {
        vm.pageLoading = true;
        this.$$http('upadteHeadFrom', send).then((result) => {
          if (result.data.code == 0) {
            vm.pageLoading = false;
            if (operation == 'out') {
              //跳转查询详情页面
              vm.$router.push({ path: "/transportPowerManage/carManage/showCarHeadManage?headId=" + vm.headId });
            } else {
              vm.activeStep += 1;
              vm.stepTitle = "保险信息填写";
            }
          } else {
            vm.pageLoading = false;
          }
        }).catch(() => {
          vm.pageLoading = false;
        });
      }
    },
    fifterObj: function(Obj) {
      var object = this.pbFunc.deepcopy(Obj);
      var isEmpty = function(object) {
        for (var name in object) {
          return false;
        }
        return true;
      }
      for (var i in object) {
        var value = object[i];
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            if (value.length == 0) {
              delete object[i];
              continue;
            }
          }
          this.fifterObj(value);
          if (isEmpty(value)) {
            delete object[i];
          }
        } else {
          if (value === '' || value === null || value === undefined) {
            value = null;
          }
        }
      }
      return object;
    },
    addInsuranceListForm: function() {
      this.headCarFormStep3.tractor_insurances.push({
        insurance_type: "",
        insurance_number: "",
        insurance_company: "",
        insurance_start_date: "",
        insurance_due_date: "",
        insurance_method: "",
        amount: null
      })
    },
    deleteInsuranceFrom: function(index) {
      var vm = this;
      if (this.headCarFormStep3.tractor_insurances[index].id) {
        vm.pageLoading = true;
        var send = {
          id: this.headId,
          tractor_insurance_id: this.headCarFormStep3.tractor_insurances[index].id
        }
        this.$$http('deleteInsuranceFrom', send).then(function(result) {
          vm.pageLoading = false;
          if (result.data.code == 0) {
            vm.headCarFormStep3.tractor_insurances.splice(index, 1);
          }
        }).catch(function() {
          vm.pageLoading = false;
        });
      } else {
        vm.headCarFormStep3.tractor_insurances.splice(index, 1);
      }
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

.addheadcarform {
  margin: 30px 5%;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

#addeditHeadCarPage {
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

#addeditHeadCarPage {
  background-color: white;
}

.icon-arrow-lift {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

</style>
