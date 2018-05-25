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
      background-color: rgb(250, 250, 250);
    }
    .el-table__expanded-cell[class*=cell] {
      padding-left: 0;
      padding-right: 0;
    }
    .listDetalis {
      float: left;
      text-align: center;
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
  }
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

</style>
<template>
  <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :expand-row-keys="expandArr" :row-key="getRowKeys">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="listDetalis" style="width:75%;padding-left:48px;">
          <div v-for="(item,index) in props.row.section_trips">
            <el-row class="loadInfo commh" style="width:100%;" v-if="index==0">
              <el-col :span="7" class="colinfo">装:<span>{{item.destination}}</span><i class="el-icon-location primary"></i>
              </el-col>
              <el-col :span="3" class="colinfo">{{item.standard_mile}}km
              </el-col>
              <el-col :span="4" class="colinfo">{{item.plan_time}}
              </el-col>
              <el-col :span="4" class="colinfo">{{item.plan_time}}
              </el-col>
              <el-col :span="3" class="colinfo">{{item.plan_tonnage}}
              </el-col>
              <el-col :span="3" class="colinfo">{{item.plan_tonnage}}
              </el-col>
            </el-row>
            <el-row class="loadInfo commh" style="width:100%;" v-else>
              <el-col :span="7" class="colinfo">装:<span>{{item.destination}}</span><i class="el-icon-location primary"></i>
              </el-col>
              <el-col :span="3" class="colinfo">{{item.standard_mile}}km
              </el-col>
              <el-col :span="4" class="colinfo">{{item.plan_time}}
              </el-col>
              <el-col :span="4" class="colinfo">{{item.plan_time}}
              </el-col>
              <el-col :span="3" class="colinfo">{{item.plan_tonnage}}
              </el-col>
              <el-col :span="3" class="colinfo">{{item.plan_tonnage}}
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="listDetalis carList" style="width:15%">
          <el-row class="commh carInfo">
            <el-col>车号:{{props.row.transPowerInfo.tractor.plate_number}}</el-col>
          </el-row>
          <el-row class="commh carInfo">
            <el-col>挂车:{{props.row.transPowerInfo.semitrailer?props.row.transPowerInfo.semitrailer.plate_number:""}}</el-col>
          </el-row>
          <el-row class="commh carInfo">
            <el-col>驾驶员:{{props.row.transPowerInfo.master_driver?props.row.transPowerInfo.master_driver.name:""}}</el-col>
          </el-row>
          <el-row class="commh carInfo">
            <el-col>副驾:{{props.row.transPowerInfo.vice_driver?props.row.transPowerInfo.vice_driver.name:""}}</el-col>
          </el-row>
        </div>
        <div class="listDetalis opButton" style="width:9%">
        </div>
        <div style="clear:both"></div>
      </template>
    </el-table-column>
    <el-table-column label="装卸地" prop="delivery_order.order_number" min-width="21.875%" type>
      <template slot-scope="props">
        订单号:{{props.row.delivery_order.order_number}}
      </template>
    </el-table-column>
    <el-table-column label="标准里程" prop="waybill_number" min-width="9.375%">
      <template slot-scope="props">
        运单号:{{props.row.waybill_number}}
      </template>
    </el-table-column>
    <el-table-column label="计划时间" prop="transPowerInfo.tractor.carrier.name" min-width="12.5%">
      <template slot-scope="props">
        托运商:{{props.row.delivery_order.trader}}
      </template>
    </el-table-column>
    <el-table-column label="实际时间" prop="discount_price" min-width="12.5%">
      <template slot-scope="props">
        标准运费:
      </template>
    </el-table-column>
    <el-table-column label="计划吨位" min-width="9.375%">
      <template slot-scope="scope">
        <div style="text-align:center;">
          <el-tooltip :content="scope.row.delivery_order.mark" placement="top" effect="light">
            <el-button type="text">备注<i class="el-icon-document"></i></el-button>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="实际吨位" prop="" min-width="9.375%">
    </el-table-column>
    <el-table-column label="车辆信息" prop="" min-width="15%">
    </el-table-column>
    <el-table-column label="操作" prop="" min-width="13%">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'orderFifterList',
  data() {
    return {
      buttonAll: {
        driver_pending_confirmation: [{
          text: "",
        }],
        to_fluid: {},
        reach_fluid: {},
        loading_waiting_audit: {},
        loading_audit_failed: {},
        waiting_match: {},
        already_match: {},
        to_site: {},
        reach_site: {},
        unloading_waiting_audit: {},
        unloading_audit_failed: {},
        waiting_settlement: {},
        in_settlement: {},
        finished: {},
        canceled: {},
      }
    };
  },
  props: ['ListData'],
  computed: {
    expandArr: function() {
      return [this.ListData[0].id];
    }
  },
  mounted() {

  },
  methods: {
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      } else if (columnIndex === 3) {
        return [1, 2];
      }
    },
    getRowKeys: function(row) {
      return row.id;
    },
    operation: function(type, rowData) {
      if (type == "addCar") {
        //传入一个订单号跳转订单详情-车辆指派页面
        this.$router.push({ path: `/orders/consignmentOrder/orderDetail/arrangeCarTab/arrangeCarList/${rowData.id}` });
        this.upPlanMethod();
      } else if (type == 'changePlan') {
        //传入一个订单号跳转订单详情-车辆指派页面
      } else if (type == 'showDetalis') {
        //传入一个订单号跳转订单详情-车辆指派页面
        this.$router.push({ path: `/orders/consignmentOrder/orderDetail/orderDetailTab/${rowData.id}` });
      }
    },
    upPlanMethod: function() {
      //判断各种数据弹窗
    }
  },
  created() {

  }
};

</script>
