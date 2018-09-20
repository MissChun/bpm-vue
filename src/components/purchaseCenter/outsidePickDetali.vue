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
              <p>外销单详情</p>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  外销单信息
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="40">
              <el-col :span="6">
                <div class="label-list">
                  <label>业务单号:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.order_number}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>意向液厂:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.plan_fluid_name" placement="top-start" v-if="outsidePickDetalisData.plan_fluid_name">
                      <span>{{outsidePickDetalisData.plan_fluid_name}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>计划采购时间:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.plan_time" placement="top-start" v-if="outsidePickDetalisData.plan_time">
                      <span>{{outsidePickDetalisData.plan_time}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>客户简称:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.short_name" placement="top-start" v-if="outsidePickDetalisData.short_name">
                      <span>{{outsidePickDetalisData.short_name}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="6">
                <div class="label-list ">
                  <label>付款方名称:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.payer_name" placement="top-start" v-if="outsidePickDetalisData.payer_name">
                      <span>{{outsidePickDetalisData.payer_name}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>实际装车时间:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.actual_time" placement="top-start" v-if="outsidePickDetalisData.actual_time">
                      <span>{{outsidePickDetalisData.actual_time}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>实际装车吨位:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.actual_quantity}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>销售单价:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.unit_price}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="6">
                <div class="label-list">
                  <label>最终售价:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.sale_price}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>销售总额:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.total_price}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>下单人:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.sale_man_name}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>下单人电话:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.sale_man_phone}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="6">
                <div class="label-list">
                  <label>备注:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.mark}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
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
                  <label>供应商名称:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.supplier_name" placement="top-start" v-if="outsidePickDetalisData.supplier_name">
                      <span>{{outsidePickDetalisData.supplier_name}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>液厂名称:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.fluid_name" placement="top-start" v-if="outsidePickDetalisData.fluid_name">
                      <span>{{outsidePickDetalisData.fluid_name}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>实际液厂:</label>
                  <div class="detail-form-item whiteSpan">
                    <el-tooltip class="item" effect="light" :open-delay="1000" :content="outsidePickDetalisData.actual_fluid_name" placement="top-start" v-if="outsidePickDetalisData.actual_fluid_name">
                      <span>{{outsidePickDetalisData.actual_fluid_name}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>采购单价:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.buy_price}}</div>
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
              </el-row>
            </div>
            <el-row :gutter="40">
              <el-col :span="6">
                <div class="label-list">
                  <label>车牌号:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.tractor_plate_number}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>主驾:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.driver}}</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="label-list">
                  <label>联系方式:</label>
                  <div class="detail-form-item">{{outsidePickDetalisData.driver_phone}}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: 'outsidePickDetali',
  props: ['backLink'],
  computed: {
    outsidePickId: function() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      pageLoading: false,
      outsidePickDetalisData: {}
    }
  },
  methods: {
    outsidePickDetalis: function() {
      this.pageLoading = true;
      this.$$http("outsidePickDetalis", { id: this.outsidePickId }).then((result) => {
        this.pageLoading = false;
        if (result.data.code == 0) {
          this.outsidePickDetalisData = result.data.data;
        }
      }).catch(() => {
        this.pageLoading = false;
      });
    }
  },
  created: function() {
    this.outsidePickDetalis();
  }
}

</script>
