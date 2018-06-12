<style scoped lang="less">
.detail-main {

  border: none;
}

.label-list {
  margin-bottom: 0px;
}

.el-collapse-item {
  /deep/ .el-collapse-item__header {
    padding-left: 20px;

    background-color: #fafafa;
  }
  /deep/ .el-collapse-item__content {
    padding-top: 25px;
  }
}

.orderPossing {
  border: 1px solid #ebeef5;
  border-top: none;
  overflow-y: auto;
  max-height: 600px;
  overflow-x: hidden;
}

.el-button {
  margin-left: 0;
}
.garyColor{
  color:gary;
}
.label-list label{
  width:100px;
}
.label-list {
  padding-left:100px;
}
.borderB {
  border-bottom:1px solid #ebeef5;
}
.paddingCancle /deep/ .el-collapse-item__content{
  padding-top:0;
  padding-bottom:0; 
}
.padds{
  padding: 25px 0 0px 0
}
</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="运单进程" name="second" style="background-color:white">
          <el-container v-show="!pageLoading">
            <el-main>
              <el-row style="">
                <el-col :span="20" class="orderPossing">
                  <el-collapse v-model="extendsArr">
                    <el-collapse-item :title="statusType[item.type]" :name="key" v-for="(item,key) in detailData" :key="key"  v-bind:class="{paddingCancle: item.type=='confirm_match'}">
                      <div v-if="item.type === 'driver_pending_confirmation'">
                        <el-row>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>生成运单号</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>生成运单时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.waybill_create_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'reach_fluid'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>车号:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'to_fluid'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>司机:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.master_driver)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>副驾:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.copilot_name)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>押运:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.supercargo_name)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>车号:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>确认运单时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.operation === '上传装车铅封'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车铅封审核:</label>
                              <div class="detail-form-item">
                                <el-button type="text" style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showSeal',item.car_seal)">点击查看铅封</el-button>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="(item.type === 'waiting_seal'||item.type=='loading_waiting_audit')&&item.operation!='上传装车铅封'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>液厂:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.fluid)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>液厂地址:</label>
                              <div class="detail-form-item" style="height:24px">
                                <el-tooltip class="item" effect="dark" :content="item.fluid_address" placement="top-start" style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                  <el-button type="text" style="height:24px;line-height:24px;padding-left:0">{{item.fluid_address}}</el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>计划到厂时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plan_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车毛重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.gross_weight)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>实际到厂时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.active_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车皮重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.tare_weight)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车净重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.net_weight)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装液开始时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_start_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装液完成时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>装车磅单审核:</label>
                              <div class="detail-form-item">
                                <el-button type="text " style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showPound',item.weight_id)">点击查看磅单</el-button>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>

                      <div v-if="item.type=='unloading_waiting_audit'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>站点:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.station)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>站点地址:</label>
                              <div class="detail-form-item" style="height:24px">
                                <el-tooltip class="item" effect="dark" :content="item.fluid_address" placement="top-start" style="width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                  <el-button type="text" style="height:24px;line-height:24px;padding-left:0">{{item.station_address}}</el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>收货人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.contact)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                           <el-col :span="8">
                            <div class="label-list">
                              <label>收货人电话:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.contact_phone)"></div>
                            </div>
                          </el-col>
                           <el-col :span="8">
                            <div class="label-list">
                              <label>计划到站时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>卸车毛重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.gross_weight)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>实际到站时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.active_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>卸车皮重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.tare_weight)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>卸车净重:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.net_weight)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>卸车开始时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_start_time)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>卸车完成时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.work_end_time)"></div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>卸车磅单审核:</label>
                              <div class="detail-form-item">
                                <el-button type="text " style="height:0;line-height:0;text-align:left;padding-left:0;" @click="showImg('showPound',item.weight_id)">点击查看磅单</el-button>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>

                      <div v-if="item.type === 'confirm_match'" style="margin-top:-20px;">
                        <div v-for="(Mitem,Mkey) in item.waiting_matchArr" v-bind:class="{ garyColor: Mitem.status!='new',padds:Mkey==0,borderB:item.waiting_matchArr.length>1&&Mkey!=item.waiting_matchArr.length-1 }"  style="border-left:none;border-right:none;">
                        <el-row style="padding:15px 0;" >
                        <el-col :span="22">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>站点:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.station)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>收货人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.consignee)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>计划卸车吨位:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.plan_tonnage)">吨</div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>站点地址:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.station_address)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>收货人电话:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.consignee_phone)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>计划到站时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(Mitem.plate_number)"></div>
                            </div>
                          </el-col>
                        </el-row>
                         </el-col>
                         <el-col :span="2">
                          <div v-if="Mitem.status!='new'" style="line-height:48px;"><el-tag type="success">待取消</el-tag></div>
                          <div v-else style="line-height:48px;"><el-tag type="success">待确认</el-tag></div>
                         </el-col>
                      </el-row>
                      </div>
                      </div>
                      <div v-if="item.type === 'to_site'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                       <div v-if="item.type === 'confirm_match'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      
                      <div v-if="item.type === 'waiting_match'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>

                      <div v-if="item.type === 'reach_site'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>车号:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.plate_number)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'unloading_audit_failed'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>拒绝原因:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.reason)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                       <div v-if="item.type === 'in_settlement'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operation)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="item.type === 'to_site'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                       <div v-if="item.type === 'already_match'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>


                      <div v-if="item.type === 'waiting_settlement'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                       <div v-if="item.type === 'finished'">
                        <el-row :gutter="40">
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作人:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operator)"></div>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="label-list">
                              <label>操作时间:</label>
                              <div class="detail-form-item" v-html="pbFunc.dealNullData(item.operated_at)"></div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>

                    </el-collapse-item>
                  </el-collapse>
                </el-col>
                <el-col :span="2" :offset="1">
                  <div v-if="detailData.length>1">
                    <div v-for="(item,key) in allButton[detailData[detailData.length-1].type]">
                      <el-button style="margin-top:20px;width:100%" :type="item.type" @click="orderOperation(item.methods)">{{item.text}}</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="轨迹地图" name="third">
        </el-tab-pane>
      </el-tabs>
  </div>               
    <img-review :imgObject.sync='imgObject'></img-review>
  </div>
</template>
<script>
import imgReview from '@/components/common/imgReview';
export default {
  name: 'orderProcess',
  activeName: "second",
  computed: {
    setpId: function() {
      return this.$route.params.setpId;
    },
    willId: function() {
      return this.$route.params.willId;
    }
  },
  components: {
    imgReview: imgReview,
  },
  data() {
    return {
      extendsArr:[],
      statusType:{
       driver_pending_confirmation:'司机未确认',
        to_fluid:'前往装车',
        reach_fluid:'已到装货地',
        waiting_seal:'待上传铅封',
        loading_waiting_audit:'已装车待审核',
        loading_audit_failed:'装车审核失败',
        waiting_match:'待匹配卸货单',
        confirm_match:'待确认卸货单',
        already_match:'已匹配卸货单',
        to_site:'前往卸货地',
        reach_site:'已到卸货地',
        unloading_waiting_audit:'已卸车待审核',
        unloading_audit_failed:'卸车审核失败',
        waiting_settlement:'待提交结算',
        in_settlement:'结算中',
        finished:'已完成',
        canceled:'已取消'
      },
      lockFalg: false,
      activeName: 'second',
      pageLoading: false,
      detailData: [],
      dialog: {
        sureLoadEx: false,
        cancleLoadEx: false,
      },
      imgObject: {
        imgList: [],
        showPreview: false,
        previewIndex: 0,
      },
      otherInput: "",
      surePound: {},
      exPound: {},
      sealImgList: [],
      poundImg: {},
      suerId:"",
      allButton: {
       
      }
    }
  },
  methods: {
    showImg: function(type, id) {
      var vm = this;
      if (type == 'showPound') {
        if (vm.poundImg[id]) {
          var imgList = vm.poundImg[id];
          this.imgObject.imgList = imgList;
          this.imgObject.showPreview = true;
        } else {
          if (id) {
            var sendData = {};
            sendData.section_trip = this.setpId;
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
      } else if (type == 'showSeal') {
        if(this.sealImgList.length>0){
          vm.imgObject.imgList = this.sealImgList;
          vm.imgObject.showPreview = true;
        }else{
          var sendData={};
          sendData.section_trip=this.setpId;
          sendData.id=id;
          this.$$http("getSeal",sendData).then(results=>{
            if(results.data.code==0){
              vm.imgObject.imgList = results.data.data.data[0].image_url_list;
              this.sealImgList=results.data.data.data[0].image_url_list;
              vm.imgObject.showPreview = true;
            }else{
              vm.$message.error("获取铅封照片出错");
            }
          }).catch(()=>{
              vm.$message.error("获取铅封照片出错");
          });
        }
      }
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${this.setpId}/${this.willId}` });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/consignmentRouteplay/${this.setpId}/${this.willId}` });
      }
    },
    orderOperation: function(type) {
    
      
    },
    getData: function() {
      var sendData = {};
      sendData.id = this.setpId;
      var vm = this;
      vm.pageLoading = true,
        this.$$http("orderProcess", sendData).then((results) => {
          vm.pageLoading = false;
          if (results.data.code == 0) {
            vm.$$http("getSectionTrips",{id:vm.setpId}).then(stepInfo=>{
              if(stepInfo.data.code==0){
                vm.suerId=stepInfo.data.data.identify;
              }
            });
            vm.detailData = results.data.data;
            vm.extendsArr.push(vm.detailData.length-1);
            if(vm.detailData[vm.detailData.length-1].operation=="上传装车铅封"){
              vm.extendsArr.push(vm.detailData.length-2);
            }
          }
        }).catch(() => {
          vm.pageLoading = false;
        });
    }
  },
  created: function() {
    this.getData();
  },
  activated: function() {
    this.activeName = 'second';
  }
}

</script>
