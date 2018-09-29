<style scoped lang="less">
.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}
.detail-main {
  border-top: 0;
}
</style>
<template>
  <div>
<!--     <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="外采单详情" name="first"> -->
          <div class="detail-main" v-loading="pageLoading">
            <el-container v-show="!pageLoading">
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: backLink}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>外采单详情</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        外采单信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>运单号:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.waybill_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>订单生成时间:</label>
                        <div class="detail-form-item whiteSpan">
                          <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsideBuyDetalisData.created_at" placement="top-start" v-if="outsideBuyDetalisData.created_at">
                            <span>{{outsideBuyDetalisData.created_at}}</span>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>供应商:</label>
                        <div class="detail-form-item whiteSpan">
                          <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsideBuyDetalisData.supplier_name" placement="top-start" v-if="outsideBuyDetalisData.supplier_name">
                            <span>{{outsideBuyDetalisData.supplier_name}}</span>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>实际到厂时间:</label>
                        <div class="detail-form-item whiteSpan">
                          <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsideBuyDetalisData.actual_time" placement="top-start" v-if="outsideBuyDetalisData.actual_time">
                            <span>{{outsideBuyDetalisData.actual_time}}</span>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list ">
                        <label>采购时间:</label>
                        <div class="detail-form-item whiteSpan">
                          <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsideBuyDetalisData.buy_time" placement="top-start" v-if="outsideBuyDetalisData.buy_time">
                            <span>{{outsideBuyDetalisData.buy_time}}</span>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>液厂:</label>
                        <div class="detail-form-item whiteSpan">
                          <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsideBuyDetalisData.actual_fluid_name" placement="top-start" v-if="outsideBuyDetalisData.actual_fluid_name">
                            <span>{{outsideBuyDetalisData.actual_fluid_name}}</span>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>实际装车吨位:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.actual_quantity}}</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>采购单价:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.buy_price}}</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>采购总额:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.total_price}}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form" v-for="(item,index) in outsideBuyDetalisData.trips" :key="index">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        卸货信息{{index+1}}<span v-if="item.status.key=='canceled'">(已取消)</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>卸货单号:</label>
                          <div class="detail-form-item">{{item.business_order.order_number}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>卸货站点:</label>
                          <div class="detail-form-item">{{item.business_order.station}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>卸货地址:</label>
                          <div class="detail-form-item whiteSpan">
                            <el-tooltip class="item" effect="light" :open-delay="1000" :content="item.business_order.station_address" placement="top-start" v-if="item.business_order.station_address">
                              <span>{{item.business_order.station_address}}</span>
                            </el-tooltip>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>收货人:</label>
                          <div class="detail-form-item">{{item.business_order.consignee}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>联系方式:</label>
                          <div class="detail-form-item">{{item.business_order.consignee_phone}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划到站时间:</label>
                          <div class="detail-form-item">{{item.business_order.plan_arrive_time}}</div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>计划卸货吨位:</label>
                          <div class="detail-form-item">{{item.business_order.plan_tonnage}}吨</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>业务单下单人:</label>
                          <div class="detail-form-item">{{item.business_order.sale_name}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>业务单下单人电话:</label>
                          <div class="detail-form-item">{{item.business_order.sale_phone}}</div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际到站时间:</label>
                          <div class="detail-form-item">{{item.arrival_time}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>离站时间:</label>
                          <div class="detail-form-item">{{item.leave_time}}</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际里程:</label>
                          <div class="detail-form-item">{{item.practical_mile}}公里</div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="8">
                        <div class="label-list">
                          <label>实际卸车吨位:</label>
                          <div class="detail-form-item">{{item.active_tonnage}}吨</div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="label-list">
                          <label>卸车磅单:</label>
                          <div class="detail-form-item">
                            <router-link target="_blank" :to="'/imgReview?imgList='+item.weight_note_image_url" v-if="item.weight_note_image_url">
                              <span style="color:#409EFF">磅单>></span>
                            </router-link>
                            <span v-else>无</span>
                          </div>
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
                    <el-col :span="6">
                      <div class="label-list">
                        <label>车牌号:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.tractor_plate_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>主驾:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.driver}}</div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="label-list">
                        <label>联系方式:</label>
                        <div class="detail-form-item">{{outsideBuyDetalisData.driver_phone}}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
            </el-container>
          </div>
     <!--    </el-tab-pane>
        <el-tab-pane label="外采单进程" name="second">
        </el-tab-pane>
      </el-tabs> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'outsideBuyDetali',
  props: ['backLink'],
  computed: {
    outsideBuyWaybillId: function() {
      return this.$route.params.waybillId;
    },
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      outsideBuyDetalisData: {}
    }
  },
  methods: {
    outsideBuyDetalis: function() {
      this.pageLoading = true;
      this.$$http("outsideBuyDetalis", { id: this.outsideBuyWaybillId }).then((result) => {
        this.pageLoading = false;
        if (result.data.code == 0) {
          this.outsideBuyDetalisData = result.data.data;
        }
      }).catch(() => {
        this.pageLoading = false;
      });
    }
  },
  created: function() {
    this.outsideBuyDetalis();
  }
}

</script>
