<!-- personDetail.vue -->
<style scoped lang="less">
.el-form-item {
  margin-bottom: 0px;
}

.el-main {
  padding-top: 0px;
}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>查看牵引车</p>
      </el-header>
      <el-main>
        <el-form class="addheaduserform" label-width="145px" :model="headData" status-icon>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  基础信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="车牌号:">
                  <div class="detail-form-item">{{headData.plate_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆归属:">
                  <div class="detail-form-item">{{headData.attributes.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆所属:">
                  <div class="detail-form-item">{{headData.carrier.name}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="车架号:">
                  <div class="detail-form-item">{{headData.vin_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发动机号:">
                  <div class="detail-form-item">{{headData.engine_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆类型:">
                  <div class="detail-form-item">{{headData.vehicle_type.verbose}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="品牌型号:">
                  <div class="detail-form-item">{{headData.brand}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装备质量:">
                  <div class="detail-form-item">{{headData.total_weight}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="牵引车总质量:">
                  <div class="detail-form-item">{{headData.towing_weight}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="长度:">
                  <div class="detail-form-item">{{headData.length}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="宽度:">
                  <div class="detail-form-item">{{headData.width}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="高度:">
                  <div class="detail-form-item">{{headData.height}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="运输介质:">
                  <div class="detail-form-item">{{headData.trans_type.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="燃料类型:">
                  <div class="detail-form-item">{{headData.fuel_type.verbose}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="危险品灯号:">
                  <div class="detail-form-item">{{headData.danger_product_lamp}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="危险品灯号到期日期:">
                  <div class="detail-form-item">{{headData.danger_product_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form" v-if="headData.fuel_type.key=='GAS'">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  气瓶信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="气瓶编号:">
                  <div class="detail-form-item">{{headData.gas_bottle_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="压力表编号:">
                  <div class="detail-form-item">{{headData.pressure_gauge_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="压力表到期日期:">
                  <div class="detail-form-item">{{headData.pressure_gauge_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="安全阀编号1:">
                  <div class="detail-form-item">{{headData.safety_valve_1_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="安全阀到期日期:">
                  <div class="detail-form-item">{{headData.safety_valve_1_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="安全阀编号2:">
                  <div class="detail-form-item">{{headData.safety_valve_2_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="安全阀到期日期:">
                  <div class="detail-form-item">{{headData.safety_valve_2_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="安全阀编号3:">
                  <div class="detail-form-item">{{headData.safety_valve_3_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="安全阀到期日期:">
                  <div class="detail-form-item">{{headData.safety_valve_3_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="安全阀编号4:">
                  <div class="detail-form-item">{{headData.safety_valve_4_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="安全阀到期日期:">
                  <div class="detail-form-item">{{headData.safety_valve_4_due_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  证件信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="行驶证档案编号:">
                  <div class="detail-form-item">{{headData.license_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行驶证发证日期:">
                  <div class="detail-form-item">{{headData.license_register_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运营者年审日期:">
                  <div class="detail-form-item">{{headData.license_verify_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="运营证号:">
                  <div class="detail-form-item">{{headData.operation_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运营证发证日期:">
                  <div class="detail-form-item">{{headData.operation_issue_date}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行驶证年审日期:">
                  <div class="detail-form-item">{{headData.operation_verify_date}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  保险信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(2)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <div v-for="(item,key) in headData.tractor_insurances">
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="保险类型:" prop="qualification_certificate_number">
                    <div class="detail-form-item">{{item.insurance_type.verbose}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保单号:">
                    <div class="detail-form-item">{{item.insurance_number}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="投保方式:">
                    <div class="detail-form-item">{{item.insurance_method.verbose}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="入保公司:">
                    <div class="detail-form-item">{{item.insurance_company}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保险金额:">
                    <div class="detail-form-item">{{item.amount}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="入保日期:">
                    <div class="detail-form-item">{{item.insurance_start_date}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="到期日期:">
                    <div class="detail-form-item">{{item.insurance_due_date}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!-- </el-form> -->
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'showHeadDetails',

  data() {
    return {
      headData: {
        plate_number: '', //车牌号
        attributes: { key: '', verbose: '' }, //车辆归属
        carrier: { name: '', id: '' },
        vin_number: '',
        engine_number: '',
        vehicle_type: { key: '', verbose: '' },
        brand: '',
        total_weight: '',
        towing_weight: '',
        length: '',
        width: '',
        height: '',
        trans_type: { key: '', verbose: '' },
        fuel_type: { key: 'GAS', verbose: '' },
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
        safety_valve_4_due_date: '',
        license_number: '',
        license_register_date: '',
        license_verify_date: '',
        operation_number: '',
        operation_issue_date: '',
        operation_verify_date: '',
        tractor_insurances: []
      },
      paddingloading: false
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    headId: function() {
      return this.$route.query.headId;
    }
  },
  methods: {
    getDetail: function() {
      this.paddingloading = true;
      this.$$http('getHeadDetalis', { id: this.headId }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.headData = results.data.data;
          var obj = { key: '', verbose: '' };
          for (var i = 0; i < this.headData.tractor_insurances.length; i++) {
            this.headData.tractor_insurances[i].insurance_type = this.headData.tractor_insurances[i].insurance_type ? this.headData.tractor_insurances[i].insurance_type : obj;
            this.headData.tractor_insurances[i].insurance_method = this.headData.tractor_insurances[i].insurance_method ? this.headData.tractor_insurances[i].insurance_method : obj;
          }
          this.paddingloading = false;
        } else {
          this.paddingloading = false;
          Message.error("获取数据失败");
        }
      }).catch(() => {
        this.paddingloading = false;
      })

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/transportPowerManage/carManage/addEditCarHeadManage?activeStep=" + number + "&headId=" + this.headId });
    },

  }
}

</script>
