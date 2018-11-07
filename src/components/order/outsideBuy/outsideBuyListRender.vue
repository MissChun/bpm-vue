<style scoped lang="less">
.listTableAll {
  text-align: left;
  font-size: 13px;
}

.el-table {
  /deep/ .el-table__header-wrapper tr th .cell {
    text-align: left;
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
      text-align: left;
    }
    td {
      border-bottom: 0px solid #ebeef5;
      font-size: 13px;
      height: 25px;
      padding: 5px 0;
      .el-table th.is-leaf {
        border-top: none;
      }
    }
    .colinfo {
      float: left;
      height: 30px;
      line-height: 30px;
      font-size: 10px;
    }
    .el-icon-location {
      font-size: 10px;
      margin-left: 5px;
      color: #409eff;
    }
    .carList .el-col {
      height: 25px;
      line-height: 25px;
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

.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}

.el-icon-location {
  cursor: pointer;
}

#map-container {
  height: 400px;
  width: 100%;
}

.listDetalis .el-row {
  margin-top: 10px;
}

.listDetalis>div:nth-child(1) {
  margin-top: 0px;
}

.unloadList {
  margin-top: 30px;
}
.marginleft{
  margin-left:8px;
}
</style>
<template>
  <div style="position:relative;font-size: 10px;">
    <noData v-if="ListData.length==0&&ListDataSearch"></noData>
    <el-table claas="listTableAll" :data="buyListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandStatus" :expand-row-keys="returnId" :row-key="getRowKeys" @expand-change="changeExpand" ref="tableConList" height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="width:90%;float:left;font-size:13px;padding:10px 0 10px 45px;">
            <!-- 装车模块的信息-->
            <div  style="margin:5px 0;">
              <div>
              <el-row  style="position:relative;margin-top:5px;" :gutter="20">
                <!-- <el-col :span="4" style="position:absolute;left:-20px;margin-top:15px;" ><span>{{props.$index+1}}.</span></el-col> -->
                <el-col v-for="(loadItem,loadIndex) in loadRender" :span="4" class="whiteSpan" >
                   {{loadItem.tltle}}:
                  <el-tooltip v-if="!loadRender.keyMore" class="item" effect="light" :content="props.row.waybill[loadItem.valueKey]" placement="top-start" :open-delay="1500">
                    <span v-if="props.row.waybill[loadItem.valueKey]">
                      {{props.row.waybill[loadItem.valueKey]}}
                      <router-link target="_blank" :to="'/imgReview?imgList='+props.row.waybill[loadItem.poundUrl]" v-if="loadItem.pound">
                          <span style="color:#409EFF">(磅单)</span>
                      </router-link>
                    </span>
                  </el-tooltip>
                  <span v-if="loadItem.keyMore">
                    <span v-for="(valueKey,valuindex) in loadItem.valueKey" v-bind:class="{'marginleft':valuindex>0}">{{props.row.waybill[valueKey]}}</span>
                  </span>

                </el-col>
              </el-row>
            </div>
            <!-- 匹配的模块信息 -->
            <div style="margin-top:5px;" v-if="matchStatusArr.indexOf(props.row.status.key)>-1">
                <el-row style="position:relative;margin-top:5px;" v-for="(uitem,uindex) in props.row.unload_trips"  :gutter="20" >
                    <el-col :span="4" style="position:absolute;left:-20px;"><span>{{uindex+1}}.</span></el-col>
                   <el-col :span="4" class="whiteSpan" v-for="(Ritem,Rindex) in unloadTripsRender">
                    {{Ritem.tltle}}:
                    <el-tooltip  class="item" effect="light" :content="uitem.business_order[Ritem.valueKey]" placement="top-start" :open-delay="1500">
                      <span>{{uitem.business_order[Ritem.valueKey]}}</span>
                    </el-tooltip>
                  </el-col>
                </el-row>
            </div>

            <!-- 卸车模块的信息 -->
            <div style="margin-top:5px;" v-if="unloadStatusArr.indexOf(props.row.status.key)>-1&&props.row.section_type.key=='unload'">
              <el-row  style="position:relative;margin-top:5px;"  :gutter="20">
                <!-- <el-col :span="4" style="position:absolute;left:-20px;margin-top:15px;" ><span>{{props.$index+1}}.</span></el-col> -->
                <el-col v-for="(unloadItem,unloadIndex) in unloadStationRender" :span="4" class="whiteSpan" style="margin-top:10px;">
                   {{unloadItem.tltle}}:
                  <el-tooltip v-if="!unloadItem.keyMore" class="item" effect="light" :content="props.row.unloadInfo[unloadItem.valueKey]" placement="top-start" :open-delay="1500">
                    <span v-if="props.row.unloadInfo[unloadItem.valueKey]">{{props.row.unloadInfo[unloadItem.valueKey]}}
                       <router-link target="_blank" :to="'/imgReview?imgList='+props.row.unloadInfo[unloadItem.poundKey]" v-if="unloadItem.pound&&props.row.unloadInfo[unloadItem.poundKey]">
                          <span style="color:#409EFF">(磅单)</span>
                      </router-link>
                    </span>
                  </el-tooltip>
                  <span v-if="unloadItem.keyMore">
                      <span v-for="(valueKey,valuindex) in unloadItem.valueKey" v-bind:class="{'marginleft':valuindex>0}">
                        <el-tooltip class="item" effect="light" :content="props.row.unloadInfo[valueKey]" placement="top-start" :open-delay="1500">
                        <span>{{props.row.unloadInfo[valueKey]}}</span>
                        </el-tooltip>
                      </span>
                  </span>
                </el-col>
              </el-row>
            </div>

            </div>
            <div style="clear:both"></div>
          </div>
          <div style="width:100px;float:right;padding-left:10px;">
            <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key"  style="margin-top:10px;">
              <el-col>
                <el-button v-if="!(props.row.status.key=='cancel_check'&&props.row.section_type.key=='unload')" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="运单号" prop="" min-width="150">
        <template slot-scope="props" >
           <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.waybill_number" placement="top-start" v-if="props.row.waybill.waybill_number">
                 <el-button @click="gotoDetalis(props.row)" style="line-height: 0;height: 0;padding-left: 0;"  type="text" >{{props.row.waybill.waybill_number}}</el-button>
            </el-tooltip>
           <span v-else>无</span>
       </template>
      </el-table-column>

      <el-table-column label="业务单号" prop="" min-width="150">
        <template slot-scope="props" >
           <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.business_order&&props.row.business_order.order_number" placement="top-start" v-if="props.row.business_order&&props.row.business_order.order_number">
                 <span>{{props.row.business_order.order_number}}</span>
            </el-tooltip>
           <span v-else>无</span>
       </template>
      </el-table-column>

       <el-table-column label="液厂" prop="" min-width="150">
        <template slot-scope="props">
          <div class="whiteSpan">
             <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.actual_fluid_name" placement="top-start" v-if="props.row.waybill.actual_fluid_name">
                 <span >{{props.row.waybill.actual_fluid_name}}</span>
            </el-tooltip>
           <span v-else>无</span>
          </div>
       </template>
      </el-table-column>
       <el-table-column label="采购单价" prop="" min-width="150">
          <template slot-scope="props">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.buy_price" placement="top-start" v-if="props.row.waybill.buy_price">
                <span >{{props.row.waybill.buy_price}}</span>
            </el-tooltip>
            <span v-else>无</span>
       </template>
      </el-table-column>
       <el-table-column label="车辆信息" prop="" min-width="150">
        <template slot-scope="props">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.tractor_plate_number" placement="top-start" v-if="props.row.waybill.tractor_plate_number">
                <span >{{props.row.waybill.tractor_plate_number}}</span>
            </el-tooltip>
            <span v-else>无</span>
       </template>
      </el-table-column>
       <el-table-column label="实际到厂时间" prop="" min-width="150">
        <template slot-scope="props">
          <div class="whiteSpan">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.actual_time" placement="top-start" v-if="props.row.waybill.actual_time">
                <span >{{props.row.waybill.actual_time}}</span>
            </el-tooltip>
            <span v-else>无</span>
        </div>
       </template>
      </el-table-column>

      <el-table-column label="实际装车吨位" prop="" min-width="150">
        <template slot-scope="props">
          <div class="whiteSpan">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.actual_quantity" placement="top-start" v-if="props.row.waybill.actual_quantity">
                <span >{{props.row.waybill.actual_quantity}}</span>
            </el-tooltip>
            <span v-else>无</span>
        </div>
       </template>
      </el-table-column>

       <el-table-column label="卸货信息" prop="" min-width="150">
       <template slot-scope="props">
         <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.waybill.actual_quantity" placement="top-start" v-if="props.row.waybill.actual_quantity">
              <div slot="content" style="width:130px;">
                <el-row v-for="(Uitem,Uindex) in props.row.unload_trips" v-bind:class="{unloadList:Uindex!=0}">
                  <el-col style="margin-top:10px;">站点:{{Uitem.business_order.station}}</el-col>
                  <el-col style="margin-top:10px;" >计划吨位:<span v-if="Uitem.business_order.plan_tonnage">{{Uitem.business_order.plan_tonnage}}吨</span></el-col>
                  <el-col style="margin-top:10px;" class="whiteSpan">
                    计划到站时间:
                    <el-tooltip class="item" effect="light" :open-delay="1000"  :content="Uitem.business_order.plan_arrive_time" placement="top-start" v-if="Uitem.business_order.plan_arrive_time">
                      <span >{{Uitem.business_order.plan_arrive_time}}</span>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </div>
              <div class="whiteSpan">
                <span v-for="(unloadTripStep,stepIndex) in props.row.unload_trips">
                  <span v-if="stepIndex!=props.row.unload_trips.length-1">{{unloadTripStep.business_order&&unloadTripStep.business_order.station}}/</span>
                   <span v-else>{{unloadTripStep.business_order&&unloadTripStep.business_order.station}}</span>
                </span>
            </div>
        </el-tooltip>
         <!-- <span >{{props.row.business_order&&props.row.business_order.station}}</span> -->
        </template>
      </el-table-column>

       <el-table-column label="状态" prop="" min-width="150" >
        <template slot-scope="props">
            <span v-if="props.row.status.verbose&&props.row.status.verbose.length<10">{{props.row.status.verbose}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.status.verbose" placement="top-start">
                    <span v-if="props.row.status.verbose">{{props.row.status.verbose.slice(0,8)}}....</span>
                  </el-tooltip>
       </template>
      </el-table-column>
      <el-table-column label="操作" prop="" width="100" fixed="right">
        <template slot-scope="props">
          <!-- <el-row v-for="(items,keys) in buttonAll[props.row.status.key]" :key="keys" >
              <el-col>
                <el-button  :type="items.type" :plan="items.attrPlan" size="mini" @click="operation(items.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
          </el-row> -->

           <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key" >
              <el-col v-if="key==0">

                <el-button v-if="!(props.row.status.key=='cancel_check'&&props.row.section_type.key=='unload')" :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>

        </template>
      </el-table-column>
    </el-table>



    <el-dialog title="外采单审核拒绝" :visible.sync="dialogParam.departemntCancleShow" v-loading="loadingArr.departemntCancleLoading"  width="30%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;" :before-close="handleClose">
      <el-form class="change_Status" label-width="120px" ref="upCancelFrom" style="width:80%;margin-left:10%" :rules="cancleRules" :model="refuseParam">
        <el-form-item label="拒绝原因:" label-width="120px" prop="approval_mark">
          <el-input type="textarea" :rows="3" v-model="refuseParam.approval_mark"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="handleClose">取 消</el-button>
       <el-button type="primary" @click="upDepartemntCancle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import noData from '@/components/common/noData';
export default {
  name: 'orderFifterList',
   components: {
    noData,
  },
  data() {
    return {
      noDataObj:{
        imgUrl:require("../../../assets/img/tms_no_data.png")
      },
      loadingArr:{
        fluidLoading:false,
        departemntPassLoading:false,
        departemntCancleLoading:false
      },
      lockFalg: false,
      delayTime:500,
      loadPosition:{},
      ListDataSearch:false,
      dialogParam:{
        departemntPassShow:false,
        departemntCancleShow:false
      },
      cancleRules: {
        approval_mark:[
          { min: 1, max: 100, message: '请输入1~100字拒绝原因', trigger: 'blur' },
          { required: true, message: '拒绝原因必填', trigger: 'blur' },
        ],
      },
      buyListData:[],
      matchStatusArr:['confirm_match','already_match'],
      unloadStatusArr:['waiting_settlement','in_settlement','to_unloading','canceled','finished','cancel_check'],
      loadRender:[
        {'tltle':"供应商名称",valueKey:"supplier_name"},
        {'tltle':"液厂",valueKey:"actual_fluid_name"},
        {'tltle':"实际到厂时间",valueKey:"actual_time"},
        {'tltle':"装车吨位",valueKey:"actual_quantity","pound":true,'poundUrl':"weight_note_image_url"},
        {'tltle':"车号",valueKey:"tractor_plate_number"},
        {'tltle':"主驾",valueKey:['driver','driver_phone'],keyMore:true},
      ],
      unloadTripsRender:[
        {'tltle':"卸货站",valueKey:"station"},
        {'tltle':"卸货站地址",valueKey:"station_address"},
        {'tltle':"计划到站时间",valueKey:"plan_arrive_time"},
        {'tltle':"计划卸车",valueKey:"plan_tonnage"},
        {'tltle':"收货人",valueKey:"consignee"},
        {'tltle':"收货人电话",valueKey:"consignee_phone"},
      ],
      unloadStationRender:[
        {'tltle':"卸货站",valueKey:"station"},
        {'tltle':"卸货站地址",valueKey:"station_address"},
        {'tltle':"计划到站时间",valueKey:"plan_arrive_time"},
        {'tltle':"计划卸车",valueKey:"plan_tonnage"},
        {'tltle':"收货人",valueKey:"consignee"},
        {'tltle':"收货人电话",valueKey:"consignee_phone"},

        {'tltle':"实际卸车吨位",valueKey:"active_tonnage",'pound':true,'poundKey':'weight_note_image_url'},
        {'tltle':"离站时间",valueKey:"leave_time"},
        {'tltle':"实际到站时间",valueKey:"arrival_time"},
        {'tltle':"外采单下单人",valueKey:["sale_man_name","sale_man_phone"],keyMore:true},
        {'tltle':"业务单下单人",valueKey:['sale_name','sale_phone'],keyMore:true},
      ],

       unloadStationFiFter:{
        station:['business_order'],
        active_tonnage:['business_order'],
        station_address:['business_order'],
        plan_arrive_time:['business_order'],
        plan_tonnage:['business_order'],
        consignee:['business_order'],
        consignee_phone:['business_order'],
        active_tonnage:[],
        leave_time:[],
        arrival_time:[],
        sale_man_name:['waybill'],
        sale_man_phone:['waybill'],
        sale_name:['business_order'],
        sale_phone:['business_order'],
        weight_note_image_url:[],
      },
      buttonAll: {
        create_department_check:[{
          text: "通过",
          type: "success",
          methods_type: "departemntPass",
        },{
          text: "拒绝",
          type: "danger",
          methods_type: "cancle",
        }],
        cancel_check:[{
          text: "通过",
          type: "success",
          methods_type: "canclePass",

        }],
        waiting_match:[{
          text: "匹配卸货单",
          type: "primary",

          methods_type: "matchUnload",
        }],
        confirm_match:[],
        already_match:[{
          text: "变更卸货单",
          type: "primary",
          methods_type: "changeUnload",
        }]
      },
      seletPadding: false,
      returnId:[],
      selectData:{
        supplierList:[],
        fluidList:[]
      },

      refuseParam:{
        approval_mark:"",
        action:"denied",
        order_id:""
      },
    };
  },
  props: ['ListData','firstMenu','secondMenu','expandStatus'],
  computed: {

  },
  mounted: function() {
    /*生成地图*/
    // var vm=this;

    // this.getDetail().then((results) => {
    //   let lnglat = [results.data.data.location.longitude, results.data.data.location.latitude];

    //   landmarkMap.setCenter(lnglat);
    //   positionMark.setPosition(lnglat);
    // });
  },
  methods: {
    changeExpand:function(){

    },
    handleClose:function(done){
      this.dialogParam.departemntCancleShow = false;
      this.refuseParam={approval_mark:"",action:"denied",order_id:""};
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
    gotoDetalis: function(rowData) {
      //this.$router.push({ path: `/purchaseCenter/outsideBuy/outsideBuyDetalisTab/outsideBuyDetalis/${rowData.waybill.id}/${rowData.id}` });
      window.open(`#/orderManage/outsideBuy/outsideBuyDetalisTab/outsideBuyDetalis/${rowData.waybill.id}/${rowData.id}`, '_blank')
    },

    SpanMethod: function({ row, column, rowIndex, columnIndex }) {

    },
    upStatus: function() {

    },
    getRowKeys: function(row) {
      return row.id;
    },
    upDepartemntCancle:function(){
      this.$refs['upCancelFrom'].validate((valid) => {
        if(valid){
            this.judgeStatus('create_department_check',this.refuseParam.order_id,(isJudge)=>{
            if(isJudge){
              var sendData=this.refuseParam;
              this.loadingArr.departemntCancleLoading=true;
              this.$$http("upDepartemntBuyCheck",sendData).then((results)=>{
                this.loadingArr.departemntCancleLoading=false;
                if(results.data.code==0){
                  this.dialogParam.departemntCancleShow=false;
                  this.refuseParam={approval_mark:"",action:"denied",order_id:""};
                  this.$message({
                    message: '审核拒绝成功',
                    type: 'success'
                  });
                  this.$emit('searchList');
                }
              }).catch((err)=>{
                this.loadingArr.departemntCancleLoading=false;
              });
            }
          });
        }else{
          return false;
        }
      });

    },
    operation: function(type, rowData) {
      if (type == 'departemntPass') {
        this.judgeStatus('create_department_check',rowData.id,(isJudge)=>{
          if(isJudge){
            this.$$http("upDepartemntBuyCheck",{order_id:rowData.id,action:'pass'}).then((results)=>{
            if(results.data.code==0){
              this.$message({
                message: '审核通过成功',
                type: 'success'
              });
              this.$emit('searchList');
            }
            }).catch((err)=>{

            });
          }
        });
      } else if(type == 'cancle'){
        this.dialogParam.departemntCancleShow=true;
        this.refuseParam.order_id=rowData.id;
      } else if(type=='canclePass'){
        this.judgeStatus('cancel_check',rowData.id,(isJudge)=>{
          this.$$http("upDepartemntBuyCheck",{order_id:rowData.id,action:"pass"}).then((results)=>{
          if(results.data.code==0){
            this.$message({
              message: '取消审核通过',
              type: 'success'
            });
            this.$emit('searchList');
          }
        }).catch((err)=>{

        });
      });
      }else if(type=='matchUnload'){
        //this.$router.push({ path: `/purchaseCenter/outsideBuy/outsideUnloadMatchTabs/outsideUnloadMatchList/${rowData.waybill.id}/${rowData.id}`});
        window.open(`#/orderManage/outsideBuy/outsideUnloadMatchTabs/outsideUnloadMatchList/${rowData.waybill.id}/${rowData.id}`, '_blank')
      }else if(type=='changeUnload'){
        //this.$router.push({ path: `/orderManage/outsideBuy/outsideUnloadMatchTabs/outsideUnloadMatchList/${rowData.waybill.id}/${rowData.id}`});
        window.open(`#/orderManage/outsideBuy/outsideUnloadMatchTabs/outsideUnloadMatchList/${rowData.waybill.id}/${rowData.id}`, '_blank')
      }
    },
    judgeStatus:function(status,trip_id,callBack){
      this.$$http("outBuyStepDetalis",{trip_id:trip_id}).then((results)=>{
        if(results.data.code==0){
          if(status==results.data.data.status.key){
            callBack(true);
          }else{
            this.uptip();
            callBack(false);
          }
        }else{
          callBack(true);
        }
      }).catch(()=>{
        this.uptip();
        callBack(false);
      });
    },
    uptip:function(){
      this.$confirm('当前状态已经改变', '请核实', {
        confirmButtonText: '确认',
        showCancelButton: false,
        type: 'warning',
        center: true,
        closeOnClickModal: false,
        showClose: false,
        closeOnPressEscape: false
      }).then(() => {
        this.$router.go(0);
      })
    },
    handleData:function(){
      var vm=this;
      this.buyListData=this.pbFunc.deepcopy(this.ListData);
      this.buyListData.forEach((item,index)=>{ //遍历整个数据源
        if(this.unloadStatusArr.indexOf(item.status.key)>-1&&item.section_type.key=='unload'){//如果当前状态为需要展示卸货信息
          var unloadInfoMiddle={};//定一个临时装卸货地信息的

          for(let unloadKey in this.unloadStationFiFter){
            var middleValue=item;//拿到第一层
            this.unloadStationFiFter[unloadKey].forEach((undefined,hierarchyIndex)=>{//根据层数取数据
              middleValue=middleValue[vm.unloadStationFiFter[unloadKey][hierarchyIndex]];
            });
            unloadInfoMiddle[unloadKey]=middleValue[unloadKey];//给临时的装数据的对象复制上key和value
          }
          item.unloadInfo=unloadInfoMiddle;
        }
      });
    }
  },
  created() {
    if(this.expandStatus){
      this.ListData.forEach((item)=>{
        this.returnId.push(item.id)
      });
    }
    if(this.ListData.length>0){
      this.handleData();
    }
  },
  watch: {
    ListData:{
      handler(val, oldVal) {
        this.expandArr();
        setTimeout(()=>{
          this.handleData();
          this.ListDataSearch=true;
        })
      },
      deep:true
    },
    expandStatus:{
      handler(val, oldVal) {
        setTimeout(()=>{
          this.expandArr();
        })
      },
    }
  }
}

</script>
