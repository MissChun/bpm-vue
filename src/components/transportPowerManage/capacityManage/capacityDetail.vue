<!-- personDetail.vue -->
<style scoped lang="less">


</style>
<template>
  <div id="capacityDetail" class="detail-main">
    <el-container>
      <el-header style="margin-top:15px;">
        <p>车辆绑定信息</p>
      </el-header>
      <el-main>
        <el-form label-width="120px" :model="headData" status-icon>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  基础信息
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="牵引车牌:">
                  <div class="detail-form-item">{{headData.tractor.plate_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆归属:">
                  <div class="detail-form-item">{{headData.tractor.attributes.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆所属:">
                  <div class="detail-form-item">{{headData.tractor.carrier.name}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="挂车状态:">
                  <div class="detail-form-item">{{headData.truck_bind_status | formatBindStatus}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="人员状态:">
                  <div class="detail-form-item">{{headData.staff_bind_status | formatBindStatus}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信息状态:">
                  <div class="detail-form-item">{{headData.complete_status | formatStatus}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="detail-list detail-form" v-if="headData.truck_bind_status">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  挂车绑定信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" plain @click="unbindTruck()">解绑挂车</el-button>
                  <el-button type="primary" size="mini" @click="goEditDetail(0, headData)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="挂车牌:">
                  <div class="detail-form-item">{{headData.semitrailer.plate_number}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆归属:">
                  <div class="detail-form-item">{{headData.tractor.attributes.verbose}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆所属:">
                  <div class="detail-form-item">{{headData.tractor.carrier.name}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="随车电话:">
                  <div class="detail-form-item">{{headData.car_belong_phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆分组:">
                  <div class="detail-form-item">{{headData.group.group_name}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="detail-list detail-form" v-if="headData.staff_bind_status">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  人员绑定信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" plain @click="unbindStaff()">解绑人员</el-button>
                  <el-button type="primary" size="mini" @click="goEditDetail(1, headData)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="主驾驶:">
                  <div class="detail-form-item">{{headData.master_driver.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话号码:">
                  <div class="detail-form-item">{{headData.master_driver.mobile_phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号码:">
                  <div class="detail-form-item">{{headData.master_driver.id_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40" v-if="headData.vice_driver">
              <el-col :span="8">
                <el-form-item label="副驾驶:">
                  <div class="detail-form-item">{{headData.vice_driver.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话号码:">
                  <div class="detail-form-item">{{headData.vice_driver.mobile_phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号码:">
                  <div class="detail-form-item">{{headData.vice_driver.id_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40" v-if="headData.escort_staff">
              <el-col :span="8">
                <el-form-item label="押运员:">
                  <div class="detail-form-item">{{headData.escort_staff.name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话号码:">
                  <div class="detail-form-item">{{headData.escort_staff.mobile_phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号码:">
                  <div class="detail-form-item">{{headData.escort_staff.id_number}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'capacityDetail',
  data() {
    return {
      headData: {
        tractor: {
          plate_number: '',
          attributes: {
            verbose: ''
          },
          carrier: {
            name: ''
          }
        },
        semitrailer: {
          plate_number: ''
        },
        group: {
          group_name: ''
        },
        master_driver: {
          name: '',
          id_number: '',
          mobile_phone: ''
        },
        vice_driver: {
          name: '',
          id_number: '',
          mobile_phone: ''
        },
        escort_staff: {
          name: '',
          id_number: '',
          mobile_phone: ''
        },
        car_belong_phone: '',
        truck_bind_status: '',
        staff_bind_status: '',
        complete_status: ''
      },
      paddingloading: false
    }
  },
  activated() {
    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.query.capacityId;
    }
  },
  filters: {
    formatBindStatus: function(value) {
      return value ? '已绑定' : '未绑定'
    },
    formatStatus: function(value) {
      return value ? '已完善' : '未完善'
    }
  },
  methods: {
    getDetail: function() {
      this.paddingloading = true;
      this.$$http('getCapacityDetail', { id: this.id }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.headData = results.data.data;
          this.paddingloading = false;
        } else {
          this.paddingloading = false;
          Message.error("获取数据失败");
        }
      }).catch(() => {
        this.paddingloading = false;
      })

    },
    unbindTruck: function() {

    },
    unbindStaff: function() {

    },
    goEditDetail: function(number, data) {
      this.$router.push({ name: 'editCapacity', params: { capacityInfo: data, activeStep: number } });
    },
  }
}

</script>
