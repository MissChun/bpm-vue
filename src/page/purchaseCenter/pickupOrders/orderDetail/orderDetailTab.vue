<style scoped lang="less">
.detail-main {
  min-height: 500px;
  border-top: 0 none;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
          <div class="detail-main" v-loading="pageLoading">
            <el-container v-show="!pageLoading">
              <el-main>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        提货订单信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="6">
                      <div class="label-list">
                        <label>订单号:</label>
                        <div class="detail-form-item">{{detailData.order_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>订单生成时间:</label>
                        <div class="detail-form-item">{{detailData.created_at}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>托运方:</label>
                        <div class="detail-form-item">{{detailData.trader}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>需求车数:</label>
                        <div class="detail-form-item">{{detailData.require_car_number}}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        装货信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="6">
                      <div class="label-list">
                        <label>承运商:</label>
                        <div class="detail-form-item"><span v-for="(item,index) in detailData.carriers">{{item.carrier_name}}<span v-if="index!=detailData.carriers.length-1">,</span></span></div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>卸货区域:</label>
                        <div class="detail-form-item">{{detailData.destination[0]}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>液厂:</label>
                        <div class="detail-form-item">{{detailData.fluid_name}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>液厂地址:</label>
                        <div class="detail-form-item">{{detailData.plan_tonnage}}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="6">
                      <div class="label-list">
                        <label>
                          计划装货时间:</label>
                        <div class="detail-form-item">{{detailData.plan_time}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>计划装货吨位:</label>
                        <div class="detail-form-item">{{detailData.plan_tonnage}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>备注:</label>
                        <div class="detail-form-item">{{detailData.mark}}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        费用约定
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="6">
                      <div class="label-list">
                        <label>计费方式:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>标准运价:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>标准里程:</label>
                        <div class="detail-form-item">{{detailData.standard_mile}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>气差允许范围:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="6">
                      <div class="label-list">
                        <label>待时计算标准:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>待时计费标准:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆指派" name="second">
        </el-tab-pane>
        <el-tab-pane label="订单记录" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    operationStatus: function() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: { destination: [] },
      thTableList: [{
        title: '装卸地',
        param: 'name',
      }, {
        title: '标准里程',
        param: 'address',
      }, {
        title: '计划时间',
        param: 'date',
      }, {
        title: '计划吨位',
        param: 'four',
      }],
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${this.id}/${this.operationStatus}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/orderRecordsTab/${this.id}/${this.operationStatus}` });
      }
    },
    getOrderDetail: function() {
      this.pageLoading = true;
      var sendData = {};
      sendData.id = this.$route.params.id;
      this.$$http('getPickOrderDetail', sendData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0 && results.data.data) {
          this.detailData = results.data.data;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    this.getOrderDetail();
  }
}

</script>
