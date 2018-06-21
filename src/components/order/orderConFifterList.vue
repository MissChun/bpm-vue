<style scoped lang="less">
.listTableAll {
  text-align: center;
}

.el-table {
  /deep/ .el-table__header-wrapper tr th .cell {
    text-align: center;
  }
  /deep/ .el-table__body {
    .el-table__row {
      background-color: #f5f6fa;
      &.expanded {
        td {
          border-top: 1px solid #e4e7ed;
          border-bottom: 1px solid #e4e7ed;
        }
      }
    }
    .el-table__expanded-cell[class*=cell] {
      padding-left: 0;
      padding-right: 0;
    }
    .listDetalis {
      float: left;
      text-align: center;
    }
    td {
      border-bottom: 0px solid #ebeef5;
      .el-table th.is-leaf{
        border-top:none;
      }
    }
    .colinfo {
      float: left;
      height: 30px;
      line-height: 30px;
    }
    .el-icon-location {
      font-size: 15px;
      margin-left: 5px;
      color: #409eff;
    }
    .carList .el-col {
      height: 25px;
      line-height: 25px;
    }
    .opButton .el-row {
      margin-top: 5px;
    }
    .el-col-3 {
      width: 11.5%;
    }
    .el-button {
      min-width: 70px;
    }
    .el-table__row td:nth-child(1) .cell {
      padding-left: 40px;
    }
  }
}

.dialog-footer {
  text-align: center;
}

.el-button--success {
  color: #67c23a !important;
  background: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}

.commh {
  line-height: 28px;
  margin-top: 5px;
  height: 28px;
}

.carInfo {
  width: 70%;
  text-align: left;
  margin-left: 15%;
}

.el-dialog__wrapper .el-dialog {
  -webkit-backface-visibility: hidden;
}
.whiteSpan{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}
</style>
<template>
  <div>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandFalg"  :row-key="getRowKeys" @expand-change="changeExpand" ref="tableConList" height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="listDetalis" style="width:75%;padding-left:48px;">
            <div>
             <el-row class="loadInfo commh" style="width:100%;">
                <el-col :span="7" class="colinfo">装:<span style="color:rgb(97,126,253);font-weight:bold;font-size:16px;">{{props.row.delivery_order.fluid}}</span><i class="el-icon-location primary"></i>
                </el-col>
                <el-col :span="3" class="colinfo">
                </el-col>
                <el-col :span="4" class="colinfo">{{props.row.delivery_order.plan_time.split(" ")[0]}}</br>{{props.row.delivery_order.plan_time.split(" ")[1]}}
                </el-col>
                <el-col :span="4" class="colinfo"><span v-if="props.row.delivery_order.active_time">{{props.row.delivery_order.active_time.split(" ")[0]}}</br>{{props.row.delivery_order.active_time.split(" ")[1]}}</span><span v-else>无</span>
                </el-col>
                <el-col :span="3" class="colinfo">{{props.row.delivery_order.plan_tonnage}}
                </el-col>
                <el-col :span="3" class="colinfo"><span v-if="props.row.delivery_order.active_tonnage">{{props.row.delivery_order.active_tonnage}}</span><span v-else>无</span>
                </el-col>
              </el-row>

               <el-row class="loadInfo commh" style="width:100%;margin-top:30px;" v-if="!(fifterStatus.indexOf(props.row.status.key)>-1)">
                <el-col :span="7" class="colinfo">卸:<span style="color:rgb(73,210,208);font-weight:bold;font-size:16px;">{{props.row.business_order.station}}</span><i class="el-icon-location primary"></i>
                </el-col>
                <el-col :span="3" class="colinfo">{{props.row.standard_mile}}km
                </el-col>
                <el-col :span="4" class="colinfo">{{props.row.plan_time.split(" ")[0]}}</br>{{props.row.plan_time.split(" ")[1]}}
                </el-col>
                <el-col :span="4" class="colinfo"><span v-if="props.row.active_time">{{props.row.active_time.split(" ")[0]}}</br>{{props.row.active_time.split(" ")[1]}}</span><span v-else>无</span>
                </el-col>
                <el-col :span="3" class="colinfo">{{props.row.plan_tonnage}}
                </el-col>
                <el-col :span="3" class="colinfo"><span v-if="props.row.active_tonnage">{{props.row.active_tonnage}}</span><span v-else>无</span>
                </el-col>
              </el-row>
               <el-row v-if="props.row.status.key=='confirm_match'" style="width:100%;margin-top:30px;">
                <el-col :span="7" class="colinfo">
                  已经匹配卸货单,<el-button style="padding-left:0" type="text" @click="operation('sureDownOrder',props.row)">前往查看</el-button>
                </el-col>
             </el-row>

              <el-row v-if="props.row.status.key=='already_match'" style="width:100%;margin-top:30px;">
                <el-col :span="7" class="colinfo">
                  已经确认卸货单,<el-button style="padding-left:0" type="text" @click="operation('sureDownOrder',props.row)">前往查看</el-button>
                </el-col>
             </el-row>
            </div>
          </div>
            <div class="listDetalis carList" style="width:15%">
            <el-row class="commh carInfo">
              <el-col class="whiteSpan" :title="props.row.transPowerInfo.tractor.plate_number">车号:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.tractor.plate_number}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo ">
              <el-col class="whiteSpan" :title="props.row.transPowerInfo.semitrailer?props.row.transPowerInfo.semitrailer.plate_number: ''">挂车:<span v-if="props.row.transPowerInfo"> {{props.row.transPowerInfo.semitrailer?props.row.transPowerInfo.semitrailer.plate_number: ""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo ">
              <el-col class="whiteSpan" :title="props.row.transPowerInfo.master_driver?props.row.transPowerInfo.master_driver.name:''">驾驶员:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.master_driver?props.row.transPowerInfo.master_driver.name:""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo ">
              <el-col class="whiteSpan" :title="props.row.transPowerInfo.vice_driver?props.row.transPowerInfo.vice_driver.name:''">副驾:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.vice_driver?props.row.transPowerInfo.vice_driver.name:""}}</span></el-col>
            </el-row>
            <el-row class="commh carInfo " >
              <el-col class="whiteSpan" :title="props.row.transPowerInfo.escort_staff?props.row.transPowerInfo.escort_staff.name:''">押运:<span v-if="props.row.transPowerInfo">{{props.row.transPowerInfo.escort_staff?props.row.transPowerInfo.escort_staff.name:""}}</span></el-col>
            </el-row>
          </div>
          <div class="listDetalis opButton" style="width:9%">
            <el-row v-for="(item,key) in buttonAll[props.row.status.key]">
              <el-col>
                <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>
          </div>
          <div style="clear:both"></div>
        </template>
      </el-table-column>
      <el-table-column label="装卸地" prop="delivery_order.order_number" min-width="21.875%" type>
        <template slot-scope="props">
          <el-row justify="space-between" type="flex">
            <el-col :span="4" :title="props.row.delivery_order.order_number" class="whiteSpan">订单号:{{props.row.delivery_order.order_number}}</el-col>
            <el-col :span="4" :title="props.row.waybill.waybill_number" class="whiteSpan">
              <a style="color:#409EFF" @click="gotoDetalis(props.row)"><span>运单号:{{props.row.waybill.waybill_number}}</span></a>
            </el-col>
            <el-col :span="4" :title="props.row.business_order.order_number" class="whiteSpan" v-if="props.row.business_order.order_number">卸货单号:{{props.row.business_order.order_number}}</el-col>
            <el-col :span="4" :title="props.row.delivery_order.trader" class="whiteSpan">托运商:{{props.row.delivery_order.trader}}</el-col>
            <el-col :span="3">标准运价:</el-col>
            <el-col :span="2">
              <el-tooltip :content="props.row.delivery_order.mark" placement="top" effect="light" :open-delay="delayTime">
                <el-button type="text" style="line-height: 0px;height: 0px;">备注<i class="el-icon-document"></i></el-button>
              </el-tooltip>
            </el-col>
            <el-col class="whiteSpan" :span="3" :title="props.row.status.verbose">状态:{{props.row.status.verbose}}</el-col>
          </el-row>
          <!-- <div style="position: absolute;height:60px;width:15px;background-color:white;left:-48px;top:0"></div>
          <div style="position: absolute;height:60px;width:15px;background-color:white;right:0;top:0"></div> -->
        </template>
      </el-table-column>
      <el-table-column label="标准里程" prop="" min-width="9.375%">
      </el-table-column>
      <el-table-column label="计划时间" prop="" min-width="12.5%">
      </el-table-column>
      <el-table-column label="实际时间" prop="" min-width="12.5%">
      </el-table-column>
      <el-table-column label="计划吨位" prop="" min-width="9.375%">
      </el-table-column>
      <el-table-column label="实际吨位" prop="" min-width="9.375%">
      </el-table-column>
      <el-table-column label="车辆信息" prop="" min-width="15%">
      </el-table-column>
      <el-table-column label="操作" prop="" min-width="13%">
      </el-table-column>
    </el-table>
    <el-dialog title="提交变更" :visible.sync="changeSatusShow" width="25%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;">
      <el-form class="change_Status" label-width="80px" ref="changeStatusForm" style="width:80%;margin-left:10%">
        <el-form-item label="变更类型:" label-width="80px">
          <el-select v-model="changeStatusParam.changeStatusType" placeholder="请选择变更类型">
            <el-option v-for="(item,key) in changeSatusTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更内容:" label-width="80px">
          <el-select v-model="changeStatusParam.changeStatusFied" filterable placeholder="请选择变更类型" v-if="changeStatusParam.changeStatusType=='truck'" v-loading="seletPadding">
            <el-option v-for="(item,key) in changeSatusCarList" :key="key" :label="item.plate_number" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="changeStatusParam.changeStatusFied" placeholder="请选择变更类型" v-else filterable>
            <el-option v-for="(item,key) in changeSatusPerList" :key="key" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" label-width="80px">
          <el-input type="textarea" :rows="3" v-model="changeStatusParam.changeSatusDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="changeSatusShow = false">取 消</el-button>
       <el-button type="primary" @click="upStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'orderFifterList',
  data() {
    return {
      lockFalg: false,
      delayTime:500,
      expandFalg:true,
      fifterStatus:['driver_pending_confirmation','to_fluid','reach_fluid','loading_waiting_audit','loading_audit_failed','waiting_match','confirm_match','already_match'],
      buttonAll: {
        //装车
        driver_pending_confirmation: [{ //司机未确认
          text: "取消运单",
          type: "danger",
          methods_type: "cancleOrder",
          attrPlan: true
        }],
        to_fluid: [{
          text: "取消运单",
          type: "danger",
          methods_type: "cancleOrder", //前往装车
          attrPlan: true
        }],
        reach_fluid: [{ //已到装货地
          text: "取消运单",
          type: "danger",
          methods_type: "cancleOrder",
          attrPlan: true
        }],
        //匹配卸车
        waiting_match: [{ //待匹配卸货单
          text: "匹配卸货单",
          type: "primary",
          methods_type: "matchUnload",
          attrPlan: true
        }],
        already_match: [{ //已匹配卸货单
          text: "变更卸货单",
          type: "primary",
          methods_type: "changeUnload",
        }],
        //卸车
        to_site: [{ //前往卸货地
          text: "变更卸货单",
          type: "primary",
          methods_type: "changeUnload",
        }],
        reach_site: [{ //已到卸货地
          text: "变更卸货单",
          type: "primary",
          methods_type: "changeUnload",
        }],
        //历史
        finished: [{ //已完成
          text: "查看详情",
          type: "primary",
          methods_type: "showDetalis",
        }],
        canceled: [{ //已取消
          text: "查看详情",
          type: "primary",
          methods_type: "showDetalis",
        }]
      },
      changeSatusShow: false,
      changeStatusParam: {
        changeStatusType: "",
        changeStatusFied: "",
        changeSatusDesc: "",
        sectiontrip: ""
      },
      changeSatusTypeSelect: [
        { key: 'truck', verbose: "车辆故障需替换" },
        { key: 'master_driver', verbose: "驾驶员更换" },
        { key: 'copilot_driver', verbose: "押运员更换" },
        { key: 'supercargo_driver', verbose: "副驾驶更换" }
      ],
      changeSatusCarList: [],
      changeSatusPerList: [],
      seletPadding: false
    };
  },
  props: ['ListData'],
  computed: {
    expandArr: function() {
      var returnId = [];
      if (this.ListData[0]) {
        returnId.push(this.ListData[0].id);
      }
      return returnId;
    }
  },
  mounted() {

  },
  methods: {
    gotoDetalis: function(rowData) {
      console.log('rowData', rowData);
      this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${rowData.id}/${rowData.waybill.id}` });
    },
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return [1, 8];
      }
    },
    upStatus: function() {
      var sendData = {};
      var vm = this;

      sendData.content = this.changeStatusParam.changeStatusFied;
      sendData.change_type = this.changeStatusParam.changeStatusType;
      sendData.desc = this.changeStatusParam.changeSatusDesc;
      sendData.sectiontrip = this.changeStatusParam.sectiontrip;
      this.$$http("upStatus", sendData).then((results) => {
        console.log('results', results)
        vm.$emit("changeTabs", 'fifth');
        vm.changeSatusShow = false;
      }).catch((err) => {
         console.log('errs',err);
      });
    },
    getRowKeys: function(row) {
      return row.id;
    },
    changeExpand: function(row, expandedRows) {
      // var vm = this;
      // if (row.transPowerInfo) {} else {
      //   var sendData = {};
      //   sendData.tractor_list = [row.capacity];
      //   vm.$$http("getTransPowerInfo", sendData).then((transPowerInfo) => {
      //     if (transPowerInfo.data.code == 0) {
      //       row.transPowerInfo = transPowerInfo.data.data.results[0];
      //       //vm.ListData[1].transPowerInfo=transPowerInfo.data.data.results[0];
      //     }
      //   }).catch((err) => {
      //     console.log('errs',err);
      //   });
      // }
    },
    operation: function(type, rowData) {
      var vm = this;
      var sendData = {};
      if (type == 'cancleOrder') { //取消运单
        sendData.id = rowData.id;
        sendData.status="canceled";
        this.$confirm('取消运单后,系统将通知承运商确认,并通知驾驶员?', '确认取消运单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$$http("changeStatusSection", sendData).then((results) => {
            if (results.data.code == 0) {
              vm.$message({
                type:"success",
                message:"取消运单成功",
              });
              vm.$emit("refreshList");
            }else{
              vm.$message.error("取消运单失败");
            }
          })

        }).catch((err) => {
          console.log('errs',err);
        });
      } else if (type == 'matchUnload') { //匹配卸货单
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/matchLoadPlan/unloadPlanList/${rowData.waybill
.id}/${rowData.id}` });
      } else if (type == 'upUnload') { //提交卸货单

      } else if (type == 'changeUnload') { //变更卸货单
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/matchLoadPlan/unloadPlanList/${rowData.waybill
.id}/${rowData.id}` });
      } else if (type == 'showDetalis') { //查看详情
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/${rowData.id}/${rowData.waybill.id}` });
      }else if (type == 'sureDownOrder') {
        this.$router.push({ path: `/consignmentCenter/consignmentOrders/orderDetail/orderProcess/${rowData.id}/${rowData.waybill.id}` });
      }
    },

    changeSatusBox: function(rowData) {
      //判断各种数据弹窗
      console.log('rowData', rowData);
      this.changeSatusShow = true;
    }
  },
  created() {

  },
  watch: {
    changeStatusParam: {
      handler(val, oldVal) {
        var sendData = {};
        var vm = this;
        if (val.changeStatusType == 'truck' && this.changeSatusCarList.length == 0) {
          sendData.pagination = false;
          this.seletPadding = true;
          this.$$http("searchHeadCarList", sendData).then((results) => {
            vm.seletPadding = false;
            if (results.data.code == 0) {
              vm.changeSatusCarList = results.data.data;
            }
            console.log('carList', results);
          }).catch((err) => {
            vm.seletPadding = false;
            console.log('errs',err);
          });
        }
        if (val.changeStatusType != 'truck' && this.changeSatusPerList.length == 0) {
          sendData.pagination = false;
          this.seletPadding = true;
          this.$$http("getDriversList", sendData).then((results) => {
            vm.seletPadding = false;
            if (results.data.code == 0) {
              vm.changeSatusPerList = results.data.data;
            }
            console.log('PerList', results);
          }).catch((err) => {
            vm.seletPadding = false;
            console.log('errs',err);
          });
        }
      },
      deep: true　
    },
    ListData: {
      handler(newValue, oldValue) {
        console.log('newValue', newValue);
        console.log('oldValue', oldValue);
      },
      deep: true
    }
  }
}

</script>
