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

</style>
<template>
  <div style="position:relative;font-size: 10px;">
    <noData v-if="ListData.length==0&&ListDataSearch"></noData>
    <el-table claas="listTableAll" :data="ListData" style="width: 100%" :span-method="SpanMethod" :default-expand-all="expandStatus" :expand-row-keys="returnId" :row-key="getRowKeys" @expand-change="changeExpand" ref="tableConList" height="500">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="width:90%;float:left;font-size:13px;padding:10px 0 10px 45px;">
            <div  style="margin:10px 0;">
              <el-row style="margin-top:5px;">

                <el-col :span="4">
                  客户简称: <span v-if="props.row.short_name&&props.row.short_name.length<10">{{props.row.short_name}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.short_name" placement="top-start">
                    <span>{{props.row.short_name.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  付款方客户简称: <span v-if="props.row.payer_name&&props.row.payer_name.length<8">{{props.row.payer_name}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.payer_name" placement="top-start">
                    <span>{{props.row.payer_name.slice(0,5)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4" class="whiteSpan">
                  计划采购时间: 
                  <el-tooltip  class="item" effect="light" :content="props.row.plan_time" placement="top-start">
                    <span>{{props.row.plan_time.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  车号:  <span v-if="props.row.tractor_plate_number&&props.row.tractor_plate_number.length<10">{{props.row.tractor_plate_number}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.tractor_plate_number" placement="top-start">
                    <span>{{props.row.tractor_plate_number.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  主驾: <span v-if="props.row.driver&&props.row.driver.length<10">{{props.row.driver}} </span>
                </el-col> 

                 <el-col :span="4">
                  联系方式: <span v-if="props.row.driver_phone">{{props.row.driver_phone}}</span>
                </el-col> 

              </el-row>

              <el-row style="margin-top:5px;">
                <el-col :span="4" class="whiteSpan">
                  实际到厂时间: 
                  <el-tooltip  class="item" effect="light" :content="props.row.actual_time" placement="top-start">
                    <span>{{props.row.actual_time}}</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  液厂名称: <span v-if="props.row.fluid_name&&props.row.fluid_name.length<10">{{props.row.fluid_name}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.fluid_name" placement="top-start">
                    <span v-if="props.row.fluid_name">{{props.row.fluid_name.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  实际液厂: <span v-if="props.row.actual_fluid_name&&props.row.actual_fluid_name.length<10">{{props.row.actual_fluid_name}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.actual_fluid_name" placement="top-start">
                    <span v-if="props.row.actual_fluid_name">{{props.row.actual_fluid_name.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  实际装车吨位: <span v-if="props.row.actual_quantity&&props.row.actual_quantity.length<10">{{props.row.actual_quantity}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.actual_quantity" placement="top-start">
                    <span v-if="props.row.actual_quantity">{{props.row.actual_quantity.slice(0,8)}}....</span>
                  </el-tooltip>
                  <router-link target="_blank" :to="'/imgReview?imgList='+props.row.weight_note_image_url" v-if="props.row.weight_note_image_url">
                      <span style="color:#409EFF">(磅单)</span>
                  </router-link>
                </el-col> 

                <el-col :span="4">
                  最终售价: <span v-if="props.row.sale_price &&props.row.sale_price .length<10">{{props.row.sale_price }}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.sale_price " placement="top-start">
                    <span v-if="props.row.sale_price ">{{props.row.sale_price .slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  销售总额: <span v-if="props.row.total_price&&props.row.total_price.length<10">{{props.row.total_price}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.total_price" placement="top-start">
                    <span v-if="props.row.total_price">{{props.row.total_price.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 
              </el-row>

              <el-row style="margin-top:5px;">
                <el-col :span="4" class="whiteSpan">
                  下单人: 
                  <el-tooltip  class="item" effect="light" :content="props.row.sale_man_name" placement="top-start">
                    <span>{{props.row.sale_man_name}}</span>
                  </el-tooltip>
                </el-col> 

                <el-col :span="4">
                  下单人电话: <span v-if="props.row.sale_man_phone&&props.row.sale_man_phone.length<15">{{props.row.sale_man_phone}}</span>
                  <el-tooltip v-else class="item" effect="light" :content="props.row.sale_man_phone" placement="top-start">
                    <span v-if="props.row.sale_man_phone">{{props.row.sale_man_phone.slice(0,8)}}....</span>
                  </el-tooltip>
                </el-col> 
              </el-row>
            </div>
            <div style="clear:both"></div>
          </div>
          <div style="width:100px;float:right;padding-left:10px;">
            <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key"  style="margin-top:10px;">
              <el-col>
                <el-button :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="业务单号" prop="" min-width="150">
        <template slot-scope="props" >
           <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.order_number" placement="top-start" v-if="props.row.order_number">
                 <el-button @click="gotoDetalis(props.row)" style="line-height: 0;height: 0;padding-left: 0;"  type="text" >{{props.row.order_number}}</el-button>
            </el-tooltip>
           <span v-else>无</span>
       </template>
      </el-table-column>
       <el-table-column label="计划采购时间" prop="" min-width="150">
        <template slot-scope="props">
          <div class="whiteSpan"> 
             <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.plan_time" placement="top-start" v-if="props.row.plan_time">
                 <span >{{props.row.plan_time}}</span>
            </el-tooltip>
           <span v-else>无</span>
          </div>
       </template>
      </el-table-column>
       <el-table-column label="销售单价" prop="" min-width="150">
        <template slot-scope="props">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.unit_price" placement="top-start" v-if="props.row.unit_price">
                <span >{{props.row.unit_price}}</span>
            </el-tooltip>
            <span v-else>无</span>
       </template>
      </el-table-column>
       <el-table-column label="意向液厂" prop="" min-width="150">
        <template slot-scope="props">
          <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.plan_fluid_name" placement="top-start" v-if="props.row.plan_fluid_name">
                <span >{{props.row.plan_fluid_name}}</span>
            </el-tooltip>
            <span v-else>无</span>
       </template>
      </el-table-column>
       <el-table-column label="车辆信息" prop="" min-width="150">
        <template slot-scope="props">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.tractor_plate_number" placement="top-start" v-if="props.row.tractor_plate_number">
                <span >{{props.row.tractor_plate_number}}</span>
            </el-tooltip>
            <span v-else>无</span>
       </template>
      </el-table-column>
       <el-table-column label="实际到厂时间" prop="" min-width="150">
        <template slot-scope="props">
          <div class="whiteSpan">
            <el-tooltip  class="item" effect="light" :open-delay="1000"  :content="props.row.actual_time" placement="top-start" v-if="props.row.actual_time">
                <span >{{props.row.actual_time}}</span>
            </el-tooltip>
            <span v-else>无</span>
        </div>
       </template>
      </el-table-column>
       <el-table-column label="实际装车吨位" prop="" min-width="150">
        
       <template slot-scope="props">
         <span >{{props.row.actual_quantity}}</span>
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
          <el-row v-for="(item,key) in buttonAll[props.row.status.key]" :key="key" >
              <el-col v-if="key==0">
                <el-button  :type="item.type" :plan="item.attrPlan" size="mini" @click="operation(item.methods_type,props.row)">{{item.text}}</el-button>
              </el-col>
            </el-row>   
        </template>
      </el-table-column>
    </el-table>

  <el-dialog title="外销单审核通过" :visible.sync="dialogParam.departemntPassShow" v-loading="loadingArr.departemntPassLoading"  width="30%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;" :before-close="handleClose">
      <el-form class="change_Status" label-width="120px" ref="upSuccessForm" style="width:80%;margin-left:10%" :rules="rules" :model="passParam">
        <el-form-item label="供应商名称:" label-width="120px" prop="supplier_id">
          <el-select v-model="passParam.supplier_id" filterable placeholder="请选择" @change="supplierChange" v-loading="loadingArr.supplierLoading" >
              <el-option v-for="(item,key) in selectData.supplierList" :key="item.id" :label="item.supplier_name" :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="液厂名称:" abel-width="120px" prop="actual_fluid">
          <el-select v-model="choosedFluidId" filterable placeholder="请选择" v-loading="loadingArr.fluidLoading" @change="bindFluidName">
              <el-option v-for="(item,key) in selectData.fluidList" :key="item.id" :label="item.fluid_name" :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购单价:" label-width="120px" prop="buy_price">
          <el-input placeholder="请输入" type="text" v-model="passParam.buy_price" style="width:100px;"></el-input><span style="margin-left:5px">元</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="handleClose">取 消</el-button>
       <el-button type="primary" @click="upDepartemntPass">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="外销单审核拒绝" :visible.sync="dialogParam.departemntCancleShow" v-loading="loadingArr.departemntCancleLoading"  width="30%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;" :before-close="handleClose">
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
    var onlyNum = (rule, value, callback) => {
      if ((value + "").match(/^\d+(\.\d+)?$/) || value == '' || value == null) {
        callback();
      } else {
        callback(new Error("采购单价为非负数字"));
      }
    };
    return {
      choosedFluidId:'',
      noDataObj:{
        imgUrl:require("../../../assets/img/tms_no_data.png")
      },
      loadingArr:{
        fluidLoading:false,
        departemntPassLoading:false,
        departemntCancleLoading:false
      },
      rules: {
        actual_fluid:[
          { required: true, message: '请选择供应商', trigger: 'blur' },
        ],
        supplier_id:[
          { required: true, message: '请选择液厂', trigger: 'blur' },
        ],
        buy_price:[
          { required: true, message: '采购价必填', trigger: 'blur' },
          { validator: onlyNum, trigger: 'blur' }
        ],
      },
      cancleRules: {
        approval_mark:[
          { min: 1, max: 100, message: '请输入1~100字拒绝原因', trigger: 'blur' },
          { required: true, message: '拒绝原因必填', trigger: 'blur' },
        ],
      },
      lockFalg: false,
      delayTime:500,
      loadPosition:{},
      ListDataSearch:false,
      dialogParam:{
        departemntPassShow:false,
        departemntCancleShow:false
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
        }]
      },
      seletPadding: false,
      returnId:[],
      selectData:{
        supplierList:[],
        fluidList:[]
      },
      
      passParam:{
        buy_price:"",
        actual_fluid:"",
        supplier_id:"",
        id:"",
        fluid_name:""
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
      this.dialogParam.departemntPassShow = false;
      this.dialogParam.departemntCancleShow = false;
      this.refuseParam={approval_mark:"",action:"denied",order_id:""};
      this.passParam={buy_price:"",actual_fluid:"",supplier_id:"",id:"",fluid_name:""};
      this.choosedFluidId = '';
    },
    bindFluidName:function(){
      this.selectData.fluidList.forEach((item,index)=>{
        if(item.id==this.choosedFluidId){
          this.passParam.fluid_name=item.fluid_name;
          this.passParam.actual_fluid=item.actual_fluid;
        }
      });
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
      //this.$router.push({ path: `/purchaseCenter/outsidePick/outsidePickDetalisTab/outsidePickDetalis/${rowData.id}` });
      window.open(`#/purchaseCenter/outsidePick/outsidePickDetalisTab/outsidePickDetalis/${rowData.id}`, '_blank')
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
           var sendData=this.refuseParam;
          this.loadingArr.departemntCancleLoading=true;
          this.$$http("upDepartemntcancle",sendData).then((results)=>{
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
        }else{
          return false
        }
      });
    },
    upDepartemntPass:function(){
      this.$refs['upSuccessForm'].validate((valid) => {
         if(valid){
          var sendData=this.passParam;
          this.loadingArr.departemntPassLoading=true;
          this.$$http("upDepartemntPass",sendData).then((results)=>{
            this.loadingArr.departemntPassLoading=false;
            if(results.data.code==0){
              this.dialogParam.departemntPassShow=false;
              this.passParam={buy_price:"",actual_fluid:"",supplier_id:"",id:"",fluid_name:""};
              this.choosedFluidId = '';
              this.$message({
                message: '审核通过成功',
                type: 'success'
              });
              this.$emit('searchList');
            }
          }).catch((err)=>{
            this.loadingArr.departemntPassLoading=false;
          });
         }else{
          return false;
         }
      });
    },
    operation: function(type, rowData) {
      if (type == 'departemntPass') {
        this.dialogParam.departemntPassShow=true;
        this.passParam.id=rowData.id;
      } else if(type == 'cancle'){
        this.dialogParam.departemntCancleShow=true;
        this.refuseParam.order_id=rowData.id;
      } else if(type=='canclePass'){
        this.$$http("upDepartemntcancle",{order_id:rowData.id,action:"pass"}).then((results)=>{
        if(results.data.code==0){
          this.$message({
            message: '审核通过',
            type: 'success'
          });
          this.$emit('searchList');
        }
      }).catch((err)=>{
      });
      }
    },
    supplierChange:function(){
      var sendData = {};
      sendData.supplier = this.passParam.supplier_id;
      this.loadingArr.fluidLoading = true;
      this.$$http("getFulid", sendData).then((results) => {
        this.loadingArr.fluidLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          this.selectData.fluidList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.fluidLoading = false;
      });
    },
    getSupplier:function(){
      this.loadingArr.supplierLoading = true;
      this.$$http("getSupplier", {need_all:'true'}).then((results) => {
        this.loadingArr.supplierLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          this.selectData.supplierList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.supplierLoading = false;
      });
    }
  },
  created() {
    if(this.expandStatus){
      this.ListData.forEach((item)=>{
        this.returnId.push(item.id)
      });
    }
    this.getSupplier();
  },
  watch: {
    ListData:{
      handler(val, oldVal) {
        this.expandArr();
        setTimeout(()=>{
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
