<!-- waybillDetail.vue -->
</style>
<template>
  <!--   <div class="detail-main">
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="运单详情" name="first"> -->
  <div class="detail-main border-top-clear" v-loading="pageLoading">
    <el-container v-show="!pageLoading">
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: backLink}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>运单详情</p>
          </el-col>
        </el-row>
      </el-header>
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
            <el-col :span="8">
              <div class="label-list">
                <label>供应商:</label>
                <div class="detail-form-item">{{detailData.delivery_order.supplier_name}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>采购价:</label>
                <div class="detail-form-item">{{detailData.delivery_order.unit_price}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="8">
              <div class="label-list">
                <label>采购优惠:</label>
                <div class="detail-form-item">{{detailData.delivery_order.discount_price}}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>液厂名称:</label>
                <div class="detail-form-item">{{detailData.delivery_order.fluid_name}}</div>
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
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(transPowerData.tractor&&transPowerData.tractor.carrier&&transPowerData.tractor.carrier.name)"></div>
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
                  <label>实际液厂:</label>
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
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr.length&&loadArr[0].plan_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>计划装车吨位:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr.length&&loadArr[0].plan_tonnage)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>实际装车时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr.length&&loadArr[0].active_time)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>实际装车吨位:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(loadArr.length&&loadArr[0].active_tonnage)"></div>
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
                卸货信息{{index+1}}
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
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.created_at)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>站点:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.station)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>站点地址:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.station_address)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>收货人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.consignee)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>收货人电话:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.consignee_phone)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>计划吨位:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.plan_tonnage)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>计划卸货时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.plan_arrive_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>实际吨位:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.check_quantity)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>实际卸货时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.active_time)"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                车辆信息
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>车牌号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(transPowerData.tractor&&transPowerData.tractor.plate_number)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>驾驶员:</label>
                <div class="detail-form-item">
                  <span v-html="pbFunc.dealNullData(transPowerData.master_driver&&transPowerData.master_driver.name)"></span>
                  <span style="margin-left:15px;" v-html="pbFunc.dealNullData(transPowerData.master_driver&&transPowerData.master_driver.mobile_phone)"></span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>挂车号:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(transPowerData.semitrailer&&transPowerData.semitrailer.plate_number)"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>副驾驶:</label>
                <div class="detail-form-item">
                  <span v-if="transPowerData.vice_driver&&transPowerData.vice_driver.name" v-html="pbFunc.dealNullData(transPowerData.vice_driver.name)"></span>
                  <span style="margin-left:15px;" v-if="transPowerData.vice_driver&&transPowerData.vice_driver.mobile_phone" v-html="pbFunc.dealNullData(transPowerData.vice_driver.mobile_phone)"></span>
                  <span v-else v-html="pbFunc.dealNullData('')"></span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>押运员:</label>
                <div class="detail-form-item" v-if="transPowerData.escort_staff">
                  <span v-if="transPowerData.escort_staff&&transPowerData.escort_staff.name" v-html="pbFunc.dealNullData(transPowerData.escort_staff.name)"></span>
                  <span style="margin-left:15px;" v-if="transPowerData.escort_staff&&transPowerData.escort_staff.mobile_phone" v-html="pbFunc.dealNullData(transPowerData.escort_staff.mobile_phone)"></span>
                  <span v-else v-html="pbFunc.dealNullData('')"></span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form" v-for="(item,index) in unloadArr" :key="item.id">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                卸车费用约定{{index+1}}
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>计费方式:</label>
                <div class="detail-form-item" v-html="pbFunc.dealNullData(item.bill_type)"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>标准运价:</label>
                <div class="detail-form-item"><span v-if="item.initial_price>0">{{item.initial_price}}元+</span><span>{{item.change_rate}}元/吨/每公里</span></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>标准里程:</label>
                <div class="detail-form-item">{{item.standard_mile}}KM</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>气差允许范围:</label>
                <div class="detail-form-item">0</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>待时计算标准:</label>
                <div class="detail-form-item">
                  <span v-if="item.free_hour">{{item.free_hour}}小时</span>
                  <span v-else v-html="pbFunc.dealNullData('')"></span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-list">
                <label>待时计费标准:</label>
                <div class="detail-form-item">
                  <span v-if="item.overtime_price">{{item.overtime_price}}/小时</span>
                  <span v-else v-html="pbFunc.dealNullData('')"></span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                榜单信息
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>装车榜单:</label>
                <div class="detail-form-item">
                  <span class="text-blue cursor-pointer" v-on:click="showImg(loadingInfo.weight_note_id)">点击查看榜单</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8" v-if="orderId">
              <div class="label-list">
                <label>卸车榜单:</label>
                <div class="detail-form-item">
                  <span class="text-blue cursor-pointer" v-on:click="showImg(unloadInfo.weight_note_id)">点击查看榜单</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <img-review :imgObject.sync='imgObject'></img-review>
  </div>
</template>
<script>
import imgReview from '@/components/common/imgReview';
export default {
  name: 'uWaybillDetail',
  props: ['backLink'],
  components: {
    imgReview: imgReview
  },
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    },
    orderId: function() {
      return this.$route.params.orderId ? this.$route.params.orderId : '';
    },
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: {
        delivery_order: {},
      },
      transPowerData: {
        tractor: {
          carrier: {}
        }
      },
      loadArr: [{}],
      unloadArr: [],
      poundImg: [],
      imgObject: {
        imgList: [],
        showPreview: false,
        previewIndex: 0,
      },
      loadingInfo: {}, //装车榜单
      unloadInfo: {}, //卸车榜单
    }
  },
  methods: {
    showImg: function(id) {
      var vm = this;
      if (vm.poundImg[id]) {
        var imgList = vm.poundImg[id];
        this.imgObject.imgList = [imgList];
        this.imgObject.showPreview = true;
      } else {
        if (id) {
          var sendData = {};
          //sendData.section_trip = this.setpId;
          sendData.id = id;
          if (vm.poundImg[id]) {
            var imgList = vm.poundImg[id];
            this.imgObject.imgList = imgList;
            this.imgObject.showPreview = true;
          } else {
            this.$$http("getPundList", sendData).then(results => {
              if (results.data.code == 0) {
                vm.poundImg[results.data.data.data[0].id] = results.data.data.data[0].image_url;
                var imgList = [results.data.data.data[0].image_url];
                vm.imgObject.imgList = imgList;
                vm.imgObject.showPreview = true;
              }
            });
          }
        }
      }
    },
    getOrderDetail: function() {
      this.pageLoading = true;
      var vm = this;
      let postData = {
        id: this.willId
      }
      this.$$http('getConOrderDetail', postData).then((results) => {
        this.pageLoading = false;
        console.log('results', results);
        if (results.data && results.data.code == 0 && results.data.data) {
          this.detailData = results.data.data;
          /* 获取运力 */
          var unloadArr = [],
            loadArr = [];

          for (var i = 0; i < vm.detailData.trips.length; i++) {
            if (vm.detailData.trips[i].section_type.key == 'unload') {
              unloadArr.push(vm.detailData.trips[i]);
              if (vm.detailData.trips[i].business_order.id === this.orderId) {
                this.unloadInfo = this.detailData.trips[i];
              }
            } else {
              loadArr.push(this.detailData.trips[i]);
              this.loadingInfo = this.detailData.trips[i];
            }
          }
          vm.unloadArr = unloadArr;
          vm.loadArr = loadArr;
          if (vm.detailData.trips && vm.detailData.trips.length && vm.detailData.trips[0].capacity) {
            vm.getTransPowerInfo(vm.detailData.trips[0].capacity);
          }
        } else {
          vm.$message({
            message: results.data.msg,
            type: 'error'
          });
        }
      }).catch((err) => {

      })
    },
    getTransPowerInfo: function(id) {
      let postData = {
        tractor_list: [id]
      }
      this.$$http('getTransPowerInfo', postData).then((results) => {
        //console.log('getTransPowerInfo', results);
        if (results.data && results.data.code == 0 && results.data.data) {
          this.transPowerData = results.data.data.results[0];
          //console.log('this.transPowerData', this.transPowerData);
        } else {
          this.$message({
            message: results.data.msg,
            type: 'error'
          });
        }
      }).catch((err) => {

      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    console.log('this.$route', this.$route.params.id, this.id);
    this.getOrderDetail();
  }
}

</script>
<style scoped lang="less">
.detail-main {
  min-height: 500px;
}
