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
    td {
      border-bottom: 0px solid #ebeef5;
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
    .expanded td {
      text-align: center
    }
    .el-table__row {
      td {
        text-align: center
      } 
      position: relative;
    }
    .el-table__row td:nth-child(1) .cell {
      padding-left: 30px;
    }
    .el-table__expanded-cell[class*=cell] {
      padding: 16px 0;
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
.el-icon-location{
  cursor:pointer;
}
#map-container {
  height: 400px;
  width: 100%;
}
</style>
<template>
  <div>
  <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandFalg" :row-key="getRowKeys" v-loading="pageLoading" size="medium" height="550">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="listDetalis" style="width:75%;padding-left:48px;">
          <el-row class="loadInfo commh" style="width:100%;">
            <el-col :span="7" class="colinfo">装:<span style="color:rgb(97,126,253);font-weight:bold;font-size:16px;">{{props.row.fluid_name}}</span><i class="el-icon-location primary" @click="showMapDetalis('load',props.row.actual_fluid_id)"></i>
            </el-col>
            <el-col :span="3" class="colinfo">{{props.row.standard_mile}}km
            </el-col>
            <el-col :span="4" class="colinfo">{{props.row.plan_time.split(" ")[0]}}</br>{{props.row.plan_time.split(" ")[1]}}
            </el-col>
            <el-col :span="4" class="colinfo">无
            </el-col>
            <el-col :span="3" class="colinfo">{{props.row.plan_tonnage}}
            </el-col>
            <el-col :span="3" class="colinfo">无
            </el-col>
          </el-row>
          <el-row class="loadInfo commh" style="width:100%;" v-for="(item,key) in props.row.destination">
            <el-col :span="7" class="colinfo">
              卸货区域:<span>{{item}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="listDetalis carList" style="width:15%">
          <el-row style="width:80%;" class="commh">
            <el-col>需求车数:{{props.row.require_car_number}}辆</el-col>
          </el-row>
          <el-row style="width:80%;" class="commh">
            <el-col>提交车数:{{props.row.submit_car_number}}辆</el-col>
          </el-row>
          <el-row style="width:80%;" class="commh">
            <el-col>确认车数:{{props.row.sure_car_number}}辆</el-col>
          </el-row>
        </div>
        <div class="listDetalis opButton" style="width:9%">
          <el-row v-if="props.row.status.key=='appoint'||props.row.status.key=='determine'">
            <el-col>
              <el-button type="danger" size="mini" plain @click="operation('cancleOrder',props.row)">取消订单</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="props.row.status.key=='determine'">
              <el-button type="success" size="mini" plain @click="operation('suerOrder',props.row)">确认订单</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="props.row.status.key=='determine'||props.row.status.key=='confirmed'||props.row.status.key=='finished'||props.row.status.key=='canceled'">
              <el-button type="primary" size="mini" @click="operation('showDetalis',props.row)">查看详情</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="clear:both"></div>
      </template>
    </el-table-column>
    <el-table-column label="装卸地" prop="id" min-width="21.875%" type>
      <template slot-scope="props">
        <div>
          <el-row justify="space-between" type="flex">
            <el-col :span="5">
              <el-button type="text" style="height:0px;line-height:0px;" @click="gotoOrderDetalis(props.row)">订单号:{{props.row.order_number}}</el-button>
            </el-col>
            <el-col :span="5" v-if="props.row.carriers&&props.row.carriers[0]">承运方:{{props.row.carriers[0].carrier_name}}</el-col>
            <el-col :span="5">
              <el-tooltip :content="props.row.mark||'暂无备注'" placement="top" effect="light" :open-delay="delayTime">
                <el-button style="height:0px;line-height:0px;" type="text">备注<i class="el-icon-document"></i></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="4"> 状态:{{props.row.status.verbose}}
            </el-col>
          </el-row>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="标准里程" prop="carry_type_info.carry_name" min-width="9.375%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="计划时间" prop="carriers.supplier_name" min-width="12.5%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="实际时间" prop="discount_price" min-width="12.5%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="计划吨位" min-width="9.375%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="实际吨位" prop="" min-width="9.375%">
      <template slot-scope="props">
      </template>
    </el-table-column>
    <el-table-column label="车辆信息" prop="" min-width="15%">
    </el-table-column>
    <el-table-column label="操作" prop="" min-width="13%">
    </el-table-column>
  </el-table>
   <el-dialog title="详细地址" :visible.sync="showMap" width="50%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" @open="openDigo">
      <div id="map-container" v-if="showMap"></div>
    </el-dialog>
</div>
</template>
<script>
let landmarkMap;
let positionMark;
export default {
  name: 'orderFifterList',
  data() {
    return {
      showMap:false,
      delayTime:500,
      expandStatus: true,
      pageLoading: false,
      expandFalg: true,
      lockFalg:false,
      loadPosition:{},
    };
  },
  props: {
    ListData: {
      type: Array,
      default: []
    }
  },
  computed: {
    expandArr: function() {
      var returnId = [];
      if (this.ListData[0]) {
        returnId.push(this.ListData[0].id);
      }
      return returnId;
    }
  },
  methods: {
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return [1, 8];
      }
    },
    getRowKeys: function(row) {
      return row.id;
    },
    gotoOrderDetalis: function(row) {
      var type = "";
      if (row.status.key == 'appoint') {
        type = 'add';
      } else {
        type = 'edit';
      }
      this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/orderDetailTab/${row.id}/${type}` });
    },
    showMapDetalis:function(type,id){
     var vm=this;
     if(type=="load"){
        this.$$http('getFulidDetalis',{id:id}).then((results)=>{
          if(results.data.code==0){
            vm.showMap=true;
            var pointObj=results.data.data;
            vm.loadPosition.longitude=pointObj.coordinate.longitude;
            vm.loadPosition.latitude=pointObj.coordinate.latitude;
            vm.loadPosition.position=pointObj.coordinate.address;
            //vm.openDigo(pointObj.coordinate);
          }
        }).catch(()=>{

        });
      }
    },
    openDigo:function(obj){
      var vm=this;
      setTimeout(()=>{
        landmarkMap = new AMap.Map('map-container', {
          zoom: 10,
        });
      // /*创建点标记*/
        positionMark = new AMap.Marker({
            map:landmarkMap,
          });
         positionMark.setLabel({
            content: vm.loadPosition.position,
            offset: new AMap.Pixel(30, 0)
         });
        let lnglat = [vm.loadPosition.longitude, vm.loadPosition.latitude];
        landmarkMap.setCenter(lnglat);
        positionMark.setPosition(lnglat);
      },100);  
    },
    operation: function(type, rowData) {
      var vm = this;

      if (type == "cancleOrder") {
        var sendData = {
          id: rowData.id
        };
        //传入一个订单号跳转订单详情-车辆指派页面
        this.$confirm('是否取消采购单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$$http("canclePickOrder", sendData).then((results) => {
            if (results.data.code == 0) {
              vm.$emit("refreshList");
            }
          }).catch(() => {

          });
        }).catch(() => {

        });

        this.upPlanMethod();
      } else if (type == 'suerOrder') {
        // var sendData = {
        //   delivery_order_id: rowData.id
        // };
        // this.$$http("surePickOrder", sendData).then((results) => {
        //   if (results.data.code == 0) {
        //     this.$confirm('是确认采购单?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       this.$emit("refreshList");
        //     }).catch(() => {

        //     });

        //   }
        // }).catch(() => {

        // });
        //传入一个订单号跳转订单详情-车辆指派页面
        this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${rowData.id}/add` });
      } else if (type == 'showDetalis') {
        //传入一个订单号跳转订单详情-车辆指派页面
      var type = "";
      if (rowData.status.key == 'appoint') {
        type = 'add';
      } else {
        type = 'edit';
      }
      this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${rowData.id}/${type}` });
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
