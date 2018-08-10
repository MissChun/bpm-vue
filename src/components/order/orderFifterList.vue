<style scoped lang="less">

.el-table {
   th{
      background-color: transparent;
    }
    tr{
      background-color: transparent;
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
      height:25px;
      padding:0;
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
    .el-table__row {
     
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
.el-table th, .el-table tr{

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

.el-icon-location {
  cursor: pointer;
}

#map-container {
  height: 400px;
  width: 100%;
}
.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-size:13px;
}
.fontContro{
  font-size:13px;
}
.buttonContent .el-row{
  margin-top:10px;
}
.buttonContent>div:nth-child(1){
  margin-top:0px;
}

</style>
<template>
  <div style="position:relative;">
    <noData v-if="ListData.length==0"></noData>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandStatus"  :expand-row-keys="returnId" :row-key="getRowKeys" v-loading="pageLoading" size="mini" height="550" :row-click="rowClick"  :cell-click="rowClick">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="width:90%;float:left;padding-left:45px;font-size:13px;">
            <el-row style="margin-top:5px;">
              <el-col :span="4">
                实际液厂:<span v-if="props.row.actual_fluid_address.length<10">{{props.row.actual_fluid_address}}</span>
                <el-tooltip v-else class="item" effect="lightlight" :content="props.row.actual_fluid_address" placement="top-start">
                  <span>{{props.row.actual_fluid_address.slice(0,8)}}....</span>
                  </el-tooltip>
              </el-col>
              <el-col :span="4">
                采购价:{{props.row.unit_price}}
              </el-col>
              <el-col :span="4">
                托运方:<span v-if="props.row.trader.length<10">{{props.row.trader}}</span>
                <el-tooltip v-else class="item" effect="light" :content="props.row.trader" placement="top-start">
                  <span>{{props.row.trader.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                下计划人:{{props.row.creator_name}}
              </el-col>
              <el-col :span="4">
                需求车数:{{props.row.require_car_number}}辆
              </el-col>
              <el-col :span="3">
                确认车数:{{props.row.sure_car_number}}辆
              </el-col>
              <el-col :span="1">
                <el-tooltip :content="props.row.mark||'暂无备注'" placement="top" effect="light" :open-delay="delayTime">
                  <el-button style="height:0px;line-height:0px;" type="text">备注<i class="el-icon-document"></i></el-button>
                </el-tooltip>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="4">
                卸货区域:<span v-if="props.row.destination.length>0">{{props.row.destination[0]}}</span><span v-else>暂无</span>
              </el-col>
              <el-col :span="4">
                采购优惠:{{props.row.business_price}}
              </el-col>
              <el-col :span="4">
                承运方:<span v-if="props.row.carriers&&props.row.trader.length<10">{{props.row.carriers[0].carrier_name}}</span>
                <el-tooltip v-else class="item" effect="light" :content="props.row.carriers[0].carrier_name" placement="top-start">
                  <span>{{props.row.carriers[0].carrier_name.slice(0,8)}}....</span>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                下计划时间:
                <el-tooltip  class="item" effect="light" :open-delay="2000"  :content="props.row.created_at" placement="top-start" v-if="props.row.created_at">
                    <span >{{props.row.created_at}}</span>
                 </el-tooltip>
                 <span v-else>无</span>
              </el-col>
              <el-col :span="4">
                提交车数:{{props.row.submit_car_number}}
              </el-col>
            </el-row>
          </div>
          <div style="width:100px;float:right;padding-left:10px;" class="buttonContent">
            <el-row v-if="props.row.status.key=='appoint'||props.row.status.key=='determine'">
              <el-col style="text-align:left" class="">
                <el-button  type="danger" size="mini" plain @click="operation('cancleOrder',props.row)">取消订单</el-button>
              </el-col>
            </el-row >
            <el-row >
              <el-col v-if="props.row.status.key=='determine'" style="text-align:left">
                <el-button  type="success" size="mini" plain @click="operation('suerOrder',props.row)">确认订单</el-button>
              </el-col>
            </el-row>
            <el-row >
              <el-col style="text-align:left">
                <el-button type="primary" size="mini" @click="operation('showDetalis',props.row)">查看详情</el-button>
              </el-col>
            </el-row>
          </div>
          <div style="clear:both"></div>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="" min-width="150">
        <template slot-scope="props">
          <el-button class="fontContro" type="text" style="height:0px;line-height:0px;padding:0" @click="gotoOrderDetalis(props.row)">{{props.row.order_number}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="液厂" prop="" min-width="150">
        <template slot-scope="props">
          <span class="fontContro">{{props.row.fluid_name}}</span><i class="el-icon-location primary" @click="showMapDetalis('load',props.row.actual_fluid_id)"></i>
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="" min-width="150">
        <template slot-scope="props">
              <el-button class="fontContro whiteSpan" type="text" style="line-height:0px;padding:0" v-if="props.row.supplier_name.length<8"><span>{{props.row.supplier_name}}</span></el-button>
          <el-tooltip v-else class="item" effect="light" :content="props.row.supplier_name" placement="top-start">
              <el-button class="fontContro whiteSpan" type="text" style="line-height:0px;padding:0" ><span>{{props.row.supplier_name.slice(0,6)}}....</span></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="计划时间" prop="" min-width="150">
        <template slot-scope="props">
          <el-tooltip  class="item" effect="light" :open-delay="2000"  :content="props.row.plan_time" placement="top-start" v-if="props.row.plan_time">
                 <span >{{props.row.plan_time}}</span>
             </el-tooltip>
           <span v-else>无</span> 
        </template>
      </el-table-column>

      <el-table-column label="计划吨位" prop="" min-width="150">
        <template slot-scope="props">
           <span class="fontContro">{{props.row.plan_tonnage}}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆信息" prop="" min-width="150">
        <template slot-scope="props">
           <span class="fontContro">{{props.row.sure_car_number}}/{{props.row.require_car_number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="" min-width="150">
        <template slot-scope="props">
           <span class="fontContro">{{props.row.status.verbose}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" prop="" fixed="right" width="100">
        <template slot-scope="props">
          <el-button class="fontContro" v-if="props.row.status.key=='appoint'" type="danger" size="mini" plain @click="operation('cancleOrder',props.row)">取消订单</el-button>
          <el-button class="fontContro" v-if="props.row.status.key=='determine'" type="success" size="mini" plain @click="operation('suerOrder',props.row)">确认订单</el-button>
          <el-button class="fontContro" v-if="props.row.status.key!='determine'&&props.row.status.key!='appoint'" type="primary" size="mini" @click="operation('showDetalis',props.row)">查看详情</el-button>
        </template>
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
import noData from '@/components/common/noData';
export default {
  name: 'orderFifterList',
  data() {
    return {
      showMap: false,
      delayTime: 500,
      pageLoading: false,
      expandFalg: false,
      lockFalg: false,
      loadPosition: {},
      returnId:[]
    };
  },
  props:['expandStatus','ListData'],
  components: {
    noData: noData
  },
  computed: {
    
  },
 
  methods: {
    rowClick:function(row, event, column){
      
    },
    expandArr: function() {
      if(this.expandStatus){
        this.ListData.forEach((item)=>{
          this.returnId.push(item.id);
        });
      }else{
        this.returnId=[];
      }
    },
    SpanMethod: function({ row, column, rowIndex, columnIndex }) {
      
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
    showMapDetalis: function(type, id) {
      var vm = this;
      if (type == "load") {
        this.$$http('getFulidDetalis', { id: id }).then((results) => {
          if (results.data.code == 0) {
            vm.showMap = true;
            var pointObj = results.data.data;
            vm.loadPosition.longitude = pointObj.coordinate.longitude;
            vm.loadPosition.latitude = pointObj.coordinate.latitude;
            vm.loadPosition.position = pointObj.coordinate.address;
            //vm.openDigo(pointObj.coordinate);
          }
        }).catch(() => {

        });
      }
    },
    openDigo: function(obj) {
      var vm = this;
      setTimeout(() => {
        landmarkMap = new AMap.Map('map-container', {
          zoom: 10,
        });
        // /*创建点标记*/
        positionMark = new AMap.Marker({
          map: landmarkMap,
        });
        positionMark.setLabel({
          content: vm.loadPosition.position,
          offset: new AMap.Pixel(30, 0)
        });
        let lnglat = [vm.loadPosition.longitude, vm.loadPosition.latitude];
        landmarkMap.setCenter(lnglat);
        positionMark.setPosition(lnglat);
      }, 100);
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
          this.$$http("canclePickOrder", sendData,(results)=>{
            if (results.data.code == 0) {
              vm.$emit("refreshList");
            }else if(results.data.code == -1){
              this.$alert(results.data.msg, '提示', {
                confirmButtonText: '确定',
              });
            }
          },function(){

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
    if(this.expandStatus){
      this.ListData.forEach((item)=>{
        this.returnId.push(item.id)
      });
    }
  },
  watch: {
    expandStatus:{
      handler(val, oldVal) {
        var vm=this;
        setTimeout(()=>{
          vm.expandArr();
        })
      },
    }
  }
};

</script>
