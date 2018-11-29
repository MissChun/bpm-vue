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
                <div class="detail-form-item">{{detailData.delivery_order.business_price}}</div>
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
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.carriers[0].carrier_name)"></div>
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
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.delivery_order.actual_fluid_name)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>液厂地址:</label>
                  <div class="detail-form-item"><span v-if="detailData.delivery_order&&detailData.delivery_order.fluid_address.length<13">{{detailData.delivery_order.fluid_address}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="detailData.delivery_order.fluid_address" placement="top-start">
                    <a>{{detailData.delivery_order.fluid_address.slice(0,10)}}....</a>
                  </el-tooltip></div>
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
                  <label>实际到厂时间:</label>
                  <div class="detail-form-item" >
                    <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="loadArr[0].last_active_time">
                      <div slot="content" style="width:180px;">
                        <el-row>
                          <el-col><span >原数据:</span>{{loadArr[0].active_time}}</el-col>
                          <el-col >新数据:{{loadArr[0].last_active_time}}</el-col>
                        </el-row>
                      </div>
                    <div v-if="loadArr[0].active_time">{{loadArr[0].active_time}}<img style="margin-left:5px;vertical-align:top" v-if="loadArr[0].last_active_time" src="@/assets/img/tipGroup_4.png" alt="" ></div>
                    <div v-else>无<img style="margin-left:5px;vertical-align:top" v-if="loadArr[0].last_active_time" src="@/assets/img/tipGroup_4.png" alt="" ></div>
                  </el-tooltip>
                  <span v-else>{{loadArr[0].active_time}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>实际装车吨位:</label>
                  <div class="detail-form-item">
                      <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="loadArr[0].last_active_tonnage">
                        <div slot="content" style="width:120px;">
                          <el-row>
                            <el-col><span v-if="loadArr[0].last_active_tonnage">原数据:</span>{{loadArr[0].active_tonnage}}吨</el-col>
                            <el-col >新数据:{{loadArr[0].last_active_tonnage}}吨</el-col>
                          </el-row>
                        </div>
                      <span v-if="loadArr[0].active_tonnage">{{loadArr[0].active_tonnage}}<img style="margin-left:5px;vertical-align:top" v-if="loadArr[0].last_active_tonnage" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                      <span v-else>无<img style="margin-left:5px;vertical-align:top" v-if="loadArr[0].last_active_tonnage" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                    </el-tooltip>
                    <span v-else>{{loadArr[0].active_tonnage}}</span>
                  </div>
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
                卸货信息{{index+1}}<span v-if="item.status.key=='canceled'">(已取消)</span>
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
                  <div class="detail-form-item"><span v-if="item.business_order&&item.business_order.station_address.length<13">{{item.business_order.station_address}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="item.business_order.station_address" placement="top-start">
                    <a>{{item.business_order.station_address.slice(0,10)}}....</a>
                  </el-tooltip></div>
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
                  <label>计划到站时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.plan_arrive_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>实际吨位:</label>
                  <div class="detail-form-item" >
                      <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="item.last_actual_quantity">
                        <div slot="content" style="width:120px;">
                          <el-row>
                            <el-col><span >原数据:</span>{{item.active_tonnage}}吨</el-col>
                            <el-col v-if="item.last_actual_quantity">新数据:{{item.last_actual_quantity}}吨</el-col>
                          </el-row>
                        </div>
                      <span v-if="item.active_tonnage">{{item.active_tonnage}}<img style="margin-left:5px;vertical-align:top" v-if="item.last_actual_quantity" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                      <span v-else>无<img style="margin-left:5px;vertical-align:top" v-if="item.last_actual_quantity" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                    </el-tooltip>
                    <span v-else>{{item.active_tonnage}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>实际到站时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.arrival_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>下单人:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.sale_man_name)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>下单人电话:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.business_order.sale_man_phone)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="label-list">
                  <label>实际里程:</label>
                   <div class="detail-form-item" >
                      <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="item.last_weight_active_mile">
                        <div slot="content" style="width:120px;">
                          <el-row>
                            <el-col><span >原数据:</span>{{item.weight_active_mile}}km</el-col>
                            <el-col v-if="item.last_weight_active_mile">新数据:{{item.last_weight_active_mile}}km</el-col>
                          </el-row>
                        </div>
                      <div v-if="item.weight_active_mile">
                        <span>{{item.weight_active_mile}}km</span>
                        <img style="margin-left:5px;vertical-align:top" v-if="item.last_weight_active_mile" src="@/assets/img/tipGroup_4.png" alt="" >
                      </div>
                      <div v-if="!item.weight_active_mile">无
                         <img style="margin-left:5px;vertical-align:top" v-if="item.last_weight_active_mile" src="@/assets/img/tipGroup_4.png" alt="" >
                      </div>

                    </el-tooltip>
                    <span v-else>{{item.weight_active_mile}}km</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>实际卸货时间:</label>
                  <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time)"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="label-list">
                  <label>离站时间:</label>
                  <div class="detail-form-item" >
                      <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="item.last_weight_audit_time">
                        <div slot="content" style="width:180px;">
                          <el-row>
                            <el-col><span >原数据:</span>{{item.weight_audit_time}}</el-col>
                            <el-col v-if="item.last_weight_audit_time">新数据:{{item.last_weight_audit_time}}</el-col>
                          </el-row>
                        </div>
                      <div v-if="item.weight_audit_time">
                        <span>{{item.weight_audit_time}}</span>
                        <img style="margin-left:5px;vertical-align:top" v-if="item.last_weight_audit_time" src="@/assets/img/tipGroup_4.png" alt="" >
                      </div>
                      <div v-if="!item.weight_audit_time">无
                         <img style="margin-left:5px;vertical-align:top" v-if="item.last_weight_audit_time" src="@/assets/img/tipGroup_4.png" alt="" >
                      </div>

                    </el-tooltip>
                    <span v-else>{{item.weight_audit_time}}</span>
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

            <el-col :span="8">
              <div class="label-list">
                <label>车辆所属:</label>
                <div class="detail-form-item">
                  <span v-if="detailData.delivery_order&&detailData.delivery_order.carriers" v-html="pbFunc.dealNullData(transPowerData.tractor.carrier.name)"></span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="detail-list detail-form" v-for="(item,index) in unloadArr" :key="item.id">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                卸车费用约定{{index+1}}<span v-if="item.status.key=='canceled'">(已取消)</span>
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
                <div class="label-list" v-if="false">
                  <label>标准里程:</label>
                   <div class="detail-form-item" >
                      <el-tooltip class="item" effect="light" :open-delay="1000" placement="top-start" v-if="item.standard_mile">
                        <div slot="content" style="width:120px;">
                          <el-row>
                            <el-col><span >原数据:</span>{{item.weight_active_mile}}km</el-col>
                            <el-col v-if="item.last_standard_mile">新数据:{{item.last_standard_mile}}km</el-col>
                          </el-row>
                        </div>
                      <div v-if="item.standard_mile">
                        <span>{{item.standard_mile}}km</span>
                        <img style="margin-left:5px;vertical-align:top" v-if="item.last_standard_mile" src="@/assets/img/tipGroup_4.png" alt="" >
                      </div>
                      <div v-if="!item.standard_mile">无
                         <img style="margin-left:5px;vertical-align:top" v-if="item.last_standard_mile" src="@/assets/img/tipGroup_4.png" alt="" >
                      </div>

                    </el-tooltip>
                    <span v-else>{{item.standard_mile}}km</span>
                  </div>
                </div>
              </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>气差允许范围:</label>
                <div class="detail-form-item">{{item.kui_tons_standard}}kg</div>
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
        <div class="detail-list detail-form" v-if="isCheck">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="12" :offset="6" class="text-center">
                磅单信息
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="40">
            <el-col :span="8">
              <div class="label-list">
                <label>装车磅单:</label>
                <div class="detail-form-item">
                  <span class="text-blue cursor-pointer" v-on:click="showImg(loadingInfo.weight_note_id)">查看磅单</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8" v-if="orderId">
              <div class="label-list">
                <label>卸车磅单:</label>
                <div class="detail-form-item">
                  <span class="text-blue cursor-pointer" v-on:click="showImg(unloadInfo.weight_note_id)">查看磅单（{{unloadInfo.destination}}）</span>
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
  props: ['backLink', 'isCheck'],
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
      loadingInfo: {}, //装车磅单
      unloadInfo: {}, //卸车磅单
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
        if (results.data && results.data.code == 0 && results.data.data) {
          this.transPowerData = results.data.data.results[0];
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
    this.getOrderDetail();
  }
}

</script>
<style scoped lang="less">
.detail-main {
  min-height: 500px;
}
