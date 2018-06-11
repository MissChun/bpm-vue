</style>
<template>
  <div class="detail-main">
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first">
          <purchase-detail></purchase-detail>
          <!--  <div class="detail-main" v-loading="pageLoading">
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
                    <el-col :span="8">
                      <div class="label-list">
                        <label>订单号:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.order_number)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>订单生成时间:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.created_at)"></div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>托运方:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.trader)"></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>需求车数:</label>
                        <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.require_car_number)"></div>
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
                  <div>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>运单号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.waybill_number)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>运单生成时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.created_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>承运方:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(transPowerData.tractor.carrier.name)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>卸货区域:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.unload_area)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>液厂:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.fluid_name)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>液厂地址:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.fluid_address)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划装车时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr[0].plan_time)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际装车时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr[0].active_time)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划装车吨位:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr[0].plan_tonnage)"></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际装车吨位:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr[0].active_tonnage)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>备注:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.mark)"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="detail-list detail-form" v-if="unloadArr.length==0">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        卸货信息
                      </el-col>
                    </el-row>
                  </div>
                  <div class="text-center">
                    无数据
                  </div>
                </div>
                <div class="detail-list detail-form" v-for="(item,index) in unloadArr" :key="index">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        卸货信息{{index}}
                      </el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>业务单号:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.order_number)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>业务单生成时间:</label>
                          <div class="detail-form-item" v-html="pbFunc.dealNullData(item.created_at)"></div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>站点:</label>
                          <div class="detail-form-item" v-html=""></div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>站点地址:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>收货人:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>收货人电话:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划吨位:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划卸货时间:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际吨位:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际协会时间:</label>
                          <div class="detail-form-item" v-html="">xx</div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
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
                    <el-col :span="8">
                      <div class="label-list">
                        <label>计费方式:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>标准运价:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>标准里程:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>气差允许范围:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>待时计算标准:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>待时计费标准:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
            </el-container>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second">
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import purchaseDetail from '@/components/consignmentCenter/purchaseDetail';
export default {
  name: 'orderDetailTab',
  components: {
    purchaseDetail: purchaseDetail
  },
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    },
  },
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/consignmentRouteplay/${this.setpId}/${this.willId}` });
      }
    },

  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">
.detail-main {
  min-height: 500px;
}
