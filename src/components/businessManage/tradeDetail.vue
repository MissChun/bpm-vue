<style scoped lang="less">


</style>
<template>
  <div class="detail-main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: backLink}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>业务单信息</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="pageLoading">
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                业务单信息
              </el-col>
              <el-col :span="6" class="text-right">
                <!-- <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button> -->
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>业务单号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>业务单生成时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.created_at)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>下单人:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.sale_name)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>区域经理:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.leader_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>客户简称:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.short_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>客户名称:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.consumer_name)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>付款方:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.payer_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>来源液厂:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.actual_fluid_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>卸车待时费:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.waiting_total)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>销售价格:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.unit_price)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>销售总价:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.total_price)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>结算价格:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.settlement_price)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>结算总价:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.settlement_total_price)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>备注:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.mark)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                卸货信息
              </el-col>
              <el-col :span="6" class="text-right">
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>业务单号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.order_number)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>业务单生成时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.created_at)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>站点:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.station)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>站点地址:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.station_address)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>收货人:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.consignee)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>收货人电话:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.consignee_phone)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>计划吨位:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.plan_tonnage)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>计划卸货时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.plan_arrive_time)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>实际吨位:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.weight_note&&detailData.weight_note.checked_tonnage_unload)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>实际卸货时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.actual_unload_time)"></div>
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
              <el-col :span="6" class="text-right">
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>运单号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.waybill_number)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>运单生成时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.created_at)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>承运商:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.trader)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>卸货区域:</label>
                <div class="detail-form-item" v-if="detailData.deliver_order&&detailData.deliver_order.destination">
                  <span v-for="item in detailData.deliver_order.destination">{{item}}<span v-if="item">、</span></span>
                </div>
                <div class="detail-form-item" v-else><span class="text-stance">无</span></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>液厂:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.fluid_name)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>液厂地址:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.fluid_address)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>计划装车时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.trips&&detailData.deliver_order.trips[0].plan_time)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>实际装车时间:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.active_time)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>计划装车吨位:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order &&detailData.deliver_order.plan_tonnage)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>实际装车吨位:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.weight_note &&detailData.weight_note.checked_tonnage_pickup)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="label-list">
                <label>备注:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.deliver_order&&detailData.deliver_order.mark)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                车辆信息
              </el-col>
              <el-col :span="6" class="text-right">
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>车牌号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tms_tractor&&detailData.tms_tractor.tractor&&detailData.tms_tractor.tractor.plate_number)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>燃油类型:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tms_tractor&&detailData.tms_tractor.tractor&&detailData.tms_tractor.tractor.fuel_type.verbose)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>挂车号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tms_tractor&&detailData.tms_tractor.semitrailer&&detailData.tms_tractor.semitrailer.plate_number)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-list">
                <label>驾驶员:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tms_tractor&&detailData.tms_tractor.master_driver&&detailData.tms_tractor.master_driver.name+' '+detailData.tms_tractor.master_driver.mobile_phone)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>副驾驶:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tms_tractor&&detailData.tms_tractor.vice_driver&&detailData.tms_tractor.vice_driver.name+' '+detailData.tms_tractor.vice_driver.mobile_phone)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>押运员:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.tms_tractor&&detailData.tms_tractor.escort_staff&&detailData.tms_tractor.escort_staff.name+' '+detailData.tms_tractor.escort_staff.mobile_phone)"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'tradeBusinessDetail',
  props: ['backLink'],
  data() {
    return {
      pageLoading: false,
      activeStep: 0,
      activeName: 'process',
      detailData: {

      },
      refuseDialog: {
        isShow: false,
        id: this.$route.query.id
      },
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    id: function() {
      return this.$route.query.id;
    }
  },
  methods: {
    getDetail: function() {
      this.pageLoading = true;
      this.$$http('getBusinessDetail', { business_order_id: this.id }).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.detailData = results.data.data;
          this.detailData.settlement_total_price = parseFloat(this.detailData.settlement_price ? this.detailData.settlement_price : 0) * parseFloat(this.detailData.weight_note.checked_tonnage_unload ? this.detailData.weight_note.checked_tonnage_unload : 0);
          for (let i in this.detailData.trips) {
            if (this.detailData.trips[i].section_type === 'pickup') {
              this.detailData.deliver_order.pickup = this.detailData.trips[i];
            } else if (this.detailData.trips[i].section_type === 'unload') {
              this.detailData.deliver_order.unload = this.detailData.trips[i];
            }
          }
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },

    handleRemove: function(file, fileList) {

    },
    handlePreview: function(file) {

    },
    handleClick() {

    },
  }
}

</script>
