<style scoped lang="less">
// .left-arrow-d {
//   height: 80px;
//   line-height: 80px;
//   text-align: center;
//   cursor: pointer;
// }
.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

// .icon-down-arrow {
//   font-size: 35px;
//   color: rgb(222, 222, 222);
//   vertical-align: middle;
//   transform: rotate(90deg);
//   display: inline-block;
// }
// .right-arrow-d {
//   height: 80px;
//   line-height: 80px;
//   text-align: center;
//   pointer: cursor;
// }
// .el-header p {
//   font-size: 25px;
//   text-align: center;
//   height: 80px;
//   line-height: 80px;
//   margin: 0 0;
// }
// .el-main {
//   padding-top: 0;
// }
// .detail-main {
//   margin: 30px 5%;
//   .el-input {
//     width: 100%;
//   }
//   .el-select {
//     width: 100%;
//   }
// }
.unloadList {
  margin-top: 30px;
}
.waitMatch{
  cursor:pointer;
  margin-left:15px;
  color:#409EFF;
}
.alreayMatch{
  cursor:pointer;
  margin-left:15px;
  color:#F56C6C;
}
</style>
<template>
  <div class="detail-main">
    <el-container>
      <!-- <el-header>
  <el-row>
    <el-col :span="1" class="left-arrow-d"><i class="icon-down-arrow" v-on:click="goOrderList"></i></el-col>
    <el-col :span="22">
      <p>新增提货单</p>
    </el-col>
  </el-row>
</el-header>
 -->
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="goOrderList"></div>
          </el-col>
          <el-col :span="20">
            <p>新增提货单</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="loadingArr.pageLoading" class="mt-30">
        <div>
          <el-form class="addPickOrder" label-width="120px" :model="pickOrderParam" status-icon :rules="rules" ref="addPickOrderForm">
            <div class="detail-form-title text-center">提货计划详情</div>
            <div class="detail-form">
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="供应商名称:" prop="supplier">
                    <el-select v-model="pickOrderParam.supplier" filterable placeholder="请选择" @change="searchList()" v-loading="loadingArr.supplierLoading" >
                      <el-option v-for="(item,key) in selectData.supplierList" :key="item.id" :label="item.supplier_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="液厂名称:" prop="fluid">
                    <el-select v-model="pickOrderParam.fluid" filterable placeholder="请选择" v-loading="loadingArr.fluidLoading" @change="changeBindText('fluidName')">
                      <el-option v-for="(item,key) in selectData.fluidList" :key="item.id" :label="item.fluid_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="计划时间:" prop="plan_time">
                    <el-date-picker v-model="pickOrderParam.plan_time" type="datetime" placeholder="选择日期时间" default-time="00:00:00" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="需求车辆:" prop="require_car_number">
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.require_car_number" :disabled="createNum>0"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="计划吨位:" prop="plan_tonnage">
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.plan_tonnage"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="采购价:" prop="unit_price">
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.unit_price"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="采购优惠:" prop="business_price">
                    <el-input placeholder="请输入" type="text" v-model="pickOrderParam.business_price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注:" prop="mark">
                    <el-input placeholder="请输入" type="textarea" v-model="pickOrderParam.mark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row class="detail-form-title"><el-col :span="8"  style="color:#F56C6C;font-size:14px;padding-left:20px;">如需提前匹配卸货地，请填写以下信息</el-col> <el-col :span="8" class="text-center">卸货计划详情</el-col></el-row>
            <div class="detail-form">

              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="生成订单个数:" prop="unload_area">
                    <el-select v-model="createNum" filterable placeholder="请选择" v-loading="loadingArr.unloadLoading"  @change="changeUnloadNum">
                      <el-option v-for="(item,key) in selectData.createNumList"  :label="item.value" :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="alreayMatch" :offset="1" :span="13" style="line-height:40px;font-size:14px;"> 系统将按照“订单个数”生成数个托运订单，每个订单一辆车，执行一个单卸/分卸运单"</el-col>
              </el-row>

              <el-row v-for="(Citem,Cindex) in creatOrderList">
                <el-col :span="8" style="font-size:14px;line-height:40px;">
                  <el-form-item  prop="unload_area">
                    <div slot="label" style="position:relative;">
                      <span style="position:absolute;left:-20px;">
                        <el-tooltip placment="right-end" v-if="creatOrderList.length>0&&Cindex==creatOrderList.length-1">
                          <div slot="content" style="width:250px;">
                            <div>可预先匹配卸货地，司机、调度等角色可在装车阶段查看卸货地信息。</div>
                            <div>装车审核通过后，系统自动匹配卸货地，也可在此时变更卸货地。</div>
                          </div>
                          <span><img style="margin-left:5px;vertical-align:middle" src="@/assets/img/tipGroup_4.png" alt="" ></span>
                        </el-tooltip>
                      </span>
                      预匹配卸货地:
                    </div>
                    <span v-if="Citem.unloadInfo.length==0" class="waitMatch" @click="changeUnload(Citem,Cindex)">匹配卸货地</span>
                    <el-tooltip placement="right-end" v-else>
                      <div slot="content" style="width:250px;"> 
                        <el-row v-for="(unloadItem,unloadIndex) in Citem.unloadInfo" v-bind:class="{unloadList:unloadIndex!=0}">
                          <el-col >业务单号:{{unloadItem.order_number}}</el-col>
                          <el-col style="margin-top:10px;">站点:{{unloadItem.station}}</el-col>
                          <el-col style="margin-top:10px;">需求液厂:{{unloadItem.actual_fluid_name}}</el-col>
                          <el-col style="margin-top:10px;">计划吨位:{{unloadItem.plan_tonnage}}吨</el-col>
                          <el-col style="margin-top:10px;">到站时间:{{unloadItem.plan_arrive_time}}</el-col>
                        </el-row>
                      </div>
                      <span  class="alreayMatch" @click="changeUnload(Citem,Cindex)">已匹配卸货地,点击查看或者修改</span>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
            <div class="detail-form-title text-center">托运计划</div>
            <div class="detail-form">
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="承运方式:" prop="consignment_type">
                    <el-radio v-model="pickOrderParam.consignment_type" label="own" border>自有贸易</el-radio>
                    <el-radio v-model="pickOrderParam.consignment_type" label="external" border>外部承运</el-radio>
                    <!--  <el-radio v-model="pickOrderParam.consignment_type" label="together" border>共同承运</el-radio> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="承运商:" v-loading="loadingArr.carriersLoading" prop="carriers">
                    <el-col :span="13" v-if="pickOrderParam.consignment_type=='own'||pickOrderParam.consignment_type=='together'" :offset="1">
                      <el-form-item label="自有:" label-width="60px">
                        <el-select v-model="carriersParam.ownCarriers" filterable placeholder="请选择" @change="changeBindText('carriers')">
                          <el-option v-for="(item,key) in selectData.carriersOwnList" :key="item.id" :label="item.carrier_name" :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13" :offset="1" v-if="pickOrderParam.consignment_type=='external'||pickOrderParam.consignment_type=='together'">
                      <el-form-item label="外部:" label-width="60px" prop="carriers">
                        <el-select v-model="carriersParam.extendCarriers" filterable placeholder="请选择" @change="changeBindText('carriers')">
                          <el-option v-for="(item,key) in selectData.carriersOutList" :key="item.id" :label="item.carrier_name" :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="6" :offset="9">
                <el-button type="success" @click="goOrderList">取消</el-button>
                <el-button type="primary" @click="upOrder" style="margin-left:20px;">提交</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="确认生成订单" :visible.sync="sureAdd" center width="40%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;">
      <el-form label-width="125px" status-icon>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货液厂:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(bindText.fluidName)"></div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货时间:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(pickOrderParam.plan_time)"></div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货车数:</label>
              <div class="detail-form-item" v-if="pickOrderParam.require_car_number!=''"><span v-html="pbFunc.dealNullData(pickOrderParam.require_car_number)"></span>车</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>提货吨位:</label>
              <div class="detail-form-item" v-if="pickOrderParam.plan_tonnage!=''"><span v-html="pbFunc.dealNullData(pickOrderParam.plan_tonnage)"></span>吨</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>指定承运:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(bindText.carriersName)"></div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <div class="label-list">
              <label>此订单采购价:</label>
              <div class="detail-form-item" v-html="pbFunc.dealNullData(pickOrderParam.unit_price)"></div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="sureAdd = false">返 回</el-button>
       <el-button type="primary" @click="sendRe">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog title="匹配卸货单" :visible.sync="unloadMatchDiago" center width="80%" :lock-scroll="lockFalg" :modal-append-to-body="lockFalg" style="-webkit-backface-visibility: hidden;"  :close-on-click-modal="lockFalg"  :close-on-press-escape="lockFalg" :show-close="lockFalg">
      <div class="table-list">
        <el-table :data="renderUnloadArr" stripe style="width: 100%" size="mini" max-height="350">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" class="match-btn"  v-if="!(alreayChooseUnloadID.indexOf(scope.row.id)>-1)" @click="matchUnload(scope.row,'match')">匹配</el-button>
              <el-button type="text" size="mini" class="match-btn"  v-if="alreayChooseUnloadID.indexOf(scope.row.id)>-1" @click="matchUnload(scope.row,'cancle')">取消匹配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-list text-center ">
        <el-pagination  layout="prev, pager, next ,jumper" :page-count="pageData.totalPage " :page-size="pageData.pageSize " :current-page.sync="pageData.currentPage " @current-change="pageChange " v-if="pageData.totalPage>1">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: center;">
       <el-button @click="closeUnloadMatch">取  消</el-button>
       <el-button type="primary" @click="sureUnloadMatch">确认匹配</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'addNewPickUpOrder',
  data() {
    var needNumVa = (rule, value, callback) => {
      if (!((value+"").match(/^[0-9]\d{0,1}$/)) || value == '0') {
        callback(new Error("只能是1-99的正整数"));
      } else {
        callback();
      }
    };
    var planTongVa = (rule, value, callback) => {
      if ((!(value + "").match(/^([1-9]\d{0,1})(\.\d{1,3})?$/)) || value == '0' || parseInt(value) > 99) {
        callback(new Error("不能大于99且最多3位小数"));
      } else {
        callback();
      }
    };
    var discountVa = (rule, value, callback) => {
      if(value==""){
       callback();
      }else{
       if (parseInt(value) > parseInt(this.pickOrderParam.unit_price)) {
          callback(new Error("不能大于采购价"));
        } else if (!((value + "").match(/^\d+(\.\d+)?$/) || value == '' || value == null)) {
          callback(new Error("只能输入数字"));
        } else {
          callback();
        }
      }
    }
    return {
      lockFalg: false,
      sureAdd: false,
      unloadMatchDiago:false,
      loadingArr: {
        supplierLoading: false,
        pageLoading: false,
        unloadLoading: false,
        fluidLoading: false,
        carriersLoading: false
      },
      pickOrderParam: {
        supplier: "",
        fluid: "",
        plan_time: '',
        require_car_number: '',
        trader: '',
        consignment_type: 'own',
        plan_tonnage: '',
        business_price: '0',
        unit_price: '0',
        mark: '',
        unload_area: ''
      },
      thTableList: [
        {title: '业务单号',param: 'order_number',width: ''}, 
        {title: '业务单状态',param: 'status_display',width: ''}, 
        {title: '客户简称',param: 'short_name',width: ''}, 
        {title: '业务员',param: 'sale_name',width: ''}, 
        {title: '液厂',param: 'actual_fluid_name',width: ''}, 
        {title: '站点',param: 'station',width: '180'}, 
        {title: '站点地址',param: 'station_address',width: ''}, 
        {title: '计划到站时间',param: 'plan_arrive_time', width: ''}, 
        {title: '计划吨位',param: 'plan_tonnage',width: ''},
        {title: '收货人',param: 'consignee',width: ''},
        {title: '收货人电话',param: 'consignee_phone',width: ''},
      ],
      bindText: {
        fluidName: '',
        carriersName: ''
      },
      carriersParam: {
        ownCarriers: "",
        extendCarriers: ""
      },
      unloadOrderArr:[],
      rules: {
        supplier: [
          { required: true, message: '请选择供应商', trigger: 'change' },
        ],
        fluid: [
          { required: true, message: '请选择液厂', trigger: 'change' },
        ],
        plan_time: [
          { required: true, message: '请填写计划时间', trigger: 'blur' },
        ],
        require_car_number: [
          { validator: needNumVa, trigger: 'blur' }
        ],
        plan_tonnage: [
          { validator: planTongVa, trigger: 'blur' }
        ],
        unit_price: [

        ],
        business_price: [
          //{ validator: discountVa, trigger: 'blur' }
        ],
        mark: [
          { min: 0, max: 200, message: '最多200个字段', trigger: 'change' }
        ],
      },
      selectData: {
        supplierList: [],
        fluidList: [],
        unloadList: [],
        carriersOwnList: [],
        carriersOutList: [],
        createNumList:[
          {value:"不匹配卸货",key:0},
          {value:"1单",key:1},
          {value:"2单",key:2},
          {value:"3单",key:3},
          {value:"4单",key:4},
          {value:"5单",key:5},
        ]
      },
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      createNum:0,
      creatOrderList:[],
      allUnloadArr:[],
      alreayChooseUnloadID:[],
      opearIndex:0,
      saveInfo:[],
      renderUnloadArr:[],
      saveNum:""
    };
  },
  computed: {

  },
  methods: {
    matchUnload:function(unloadData,status){
      let thisCar=this.creatOrderList[this.opearIndex];
      if(status==='match'){
        this.alreayChooseUnloadID.push(unloadData.id);
        thisCar.unloadInfo.push(unloadData);
      }else if(status==='cancle'){
        var middleArr=[];
        var middleIDarr=[];
          thisCar.unloadInfo.forEach((item,index)=>{
            if(!(item.id===unloadData.id)){
              middleArr.push(item);
            }
          });
          this.alreayChooseUnloadID.forEach((idItem,idIndex)=>{
            if(!(idItem==unloadData.id)){
              middleIDarr.push(idItem);
            }
          });
          thisCar.unloadInfo=middleArr;
          this.alreayChooseUnloadID=middleIDarr;
        }
    },
    sureUnloadMatch:function(){
      //this.aCarMatchId=[];
      this.unloadMatchDiago=false;
    },
    closeUnloadMatch:function(){
      //this.aCarMatchId=[];
      this.unloadMatchDiago=false;
      this.pageData.currentPage=1;
      if(this.opearIndex){
       this.creatOrderList[this.opearIndex].unloadInfo=this.saveInfo;
      }
    },

    changeUnloadNum:function(){
      if(this.creatOrderList.length>this.createNum){
        let spliceNum=this.createNum;
        this.creatOrderList=this.creatOrderList.splice(0,spliceNum);
        if(this.createNum==0){
          this.creatOrderList=[];
          if(this.saveNum||this.saveNum==0){
            this.pickOrderParam.require_car_number=this.saveNum;
          }else{
            this.pickOrderParam.require_car_number="";
          }
        }
      }else if(this.creatOrderList.length<this.createNum){
        if(this.creatOrderList.length==0){
          this.saveNum=this.pickOrderParam.require_car_number;
        }
         this.pickOrderParam.require_car_number=1;
        let addNum=this.createNum-this.creatOrderList.length;
        for(let i=0;i<addNum;i++){
          this.creatOrderList.push({unloadInfo:[]});
        }
      }
    },
    changeUnload:function(orderUnloadAlone,index){
      this.renderUnloadArr=[];
      this.pageData.currentPage=1;
      this.getAllUnloadOrder(index);
      this.opearIndex=index;
      this.unloadMatchDiago=true;
      this.saveInfo=this.creatOrderList[this.opearIndex].unloadInfo;
    },
    fifterRnderUnload:function(index){
      var middleArr=[];
        this.renderUnloadArr=[];
        this.allUnloadArr.forEach((unloadItem)=>{
          var addFalge=true;
          if(this.alreayChooseUnloadID.indexOf(unloadItem.id)>-1){
            addFalge=false;
          }
          if(addFalge){
            this.renderUnloadArr.push(unloadItem);
          }
        });
        var addList=[];
        this.creatOrderList[index].unloadInfo.forEach(item=>{
          this.allUnloadArr.forEach((unItem)=>{
            if(unItem.id==item.id){
              addList.push(item);
            }
          })
        });
        this.renderUnloadArr=addList.concat(this.renderUnloadArr);
    },
    goOrderList: function() {
      this.$router.push({ path: "/orderManage/pickupOrders/ordersList" });
    },
    upOrder: function() {
      this.$refs['addPickOrderForm'].validate((valid) => {
        if (valid) {
          this.sureAdd = true;
        }
      });
    },
    sendRe: function() {
      var carriers = [];
      if (this.pickOrderParam.consignment_type == 'own') {
        if (this.carriersParam.ownCarriers) {
          carriers = [this.carriersParam.ownCarriers];
        }
      } else if (this.pickOrderParam.consignment_type == 'external') {
        if (this.carriersParam.extendCarriers) {
          carriers = [this.carriersParam.extendCarriers];
        }
      }
      var sendData = this.pbFunc.deepcopy(this.pickOrderParam);
      let pre_business_order_list=[];
      this.creatOrderList.forEach(Citem=>{
        let middleString="";
        Citem.unloadInfo.forEach((unItem,index)=>{
          if(index!=Citem.unloadInfo.length-1){
            middleString+=(unItem.id+",");
          }else{
            middleString+=unItem.id;
          }
        });
        if(middleString){
          pre_business_order_list.push(middleString);
        }
      });
      sendData.pre_business_order_list=pre_business_order_list;
      sendData.carriers = carriers;
      this.loadingArr.pageLoading = true;
      this.$$http("cratePickUpOrder", sendData).then((results) => {
        this.loadingArr.pageLoading = false;
        if (results.data.code == 0) {
          this.$message({
            message: '创建托运单成功',
            type: 'success'
          });
          this.$router.push({ path: "/orderManage/pickupOrders" });
        }
      }).catch(() => {
        this.loadingArr.pageLoading = false;
      });
    },
    searchList: function() {
      this.getFulid(this.pickOrderParam.supplier);
    },
    changeBindText: function(type) {
      if (type == 'fluidName') {
        //液厂变化
        var fluidId = this.pickOrderParam.fluid;
        for (let i in this.selectData.fluidList) {
          if (this.selectData.fluidList[i].id == fluidId) {
            this.bindText.fluidName = this.selectData.fluidList[i].fluid_name;
          }
        }
      } else {
        //承运商变化
        var ownCarriersId = this.carriersParam.ownCarriers;
        var extendCarriersId = this.carriersParam.extendCarriers;
        for (let j in this.selectData.carriersOwnList) {
          if (this.selectData.carriersOwnList[j].id == ownCarriersId) {
            this.bindText.carriersName = this.selectData.carriersOwnList[j].carrier_name;
          }
        }
        for (let o in this.selectData.carriersOutList) {
          if (this.selectData.carriersOutList[o].id == extendCarriersId) {
            this.bindText.carriersName = this.selectData.carriersOutList[o].carrier_name;
          }
        }
      }
    },
    getFulid: function(supplierId) {
      var sendData = {};
      if (supplierId) {
        sendData.supplier = supplierId;
      }
      this.loadingArr.fluidLoading = true;
      this.$$http("getFulid", sendData).then((results) => {
        this.loadingArr.fluidLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          this.pickOrderParam.fluid="";
          this.selectData.fluidList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.fluidLoading = false;
      });
    },
    getSupplier: function() {
      var sendData = {need_all:'true'};

      this.loadingArr.supplierLoading = true;
      this.$$http("getSupplier", sendData).then((results) => {
        this.loadingArr.supplierLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          this.selectData.supplierList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.supplierLoading = false;
      });

    },
    getCarriers: function() {
      var sendData = {};
      this.loadingArr.carriersLoading = true;
      sendData.carrier_type = "own";
      this.$$http("getCarriers", sendData).then((results) => {
        this.loadingArr.carriersLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          this.selectData.carriersOwnList = dataBody;
          if(dataBody&&dataBody.length>0){
            this.carriersParam.ownCarriers=dataBody[0].id;
            this.bindText.carriersName = dataBody[0].carrier_name;
          }
        }
      }).catch(() => {
        this.loadingArr.carriersLoading = false;
      });
      sendData.carrier_type = "external";
      this.$$http("getCarriers", sendData).then((results) => {
        this.loadingArr.carriersLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          this.selectData.carriersOutList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.carriersLoading = false;
      });
    },
    getUnload: function(trader) {
      var sendData = {};
      sendData.trader = trader;
      this.$$http("getUnload", sendData).then((results) => {
        this.loadingArr.unloadLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          this.selectData.unloadList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.unloadLoading = false;
      });
    },
    getTrade: function() {
      var sendData = {};
      var vm = this;
      this.loadingArr.unloadLoading = true;
      this.$$http("getCompanies", sendData).then((results) => {
        if (results.data.code == 0) {
          vm.pickOrderParam.trader = results.data.data.data[0].id;
          vm.getUnload(results.data.data.data[0].id);
        }
      });
    },

    getAllUnloadOrder:function(index){
      let postData={
        status:'waiting_related',
        // need_all:true,
      };
      this.loadingArr.unloadLoading = true;
      postData.page_size = this.pageData.pageSize;
      postData.page = this.pageData.currentPage;
      this.$$http('getBusinessList', postData).then((results) => {
        this.loadingArr.unloadLoading = false;
        if(results.data.code==0){
          this.allUnloadArr=results.data.data.data;
          this.pageData.totalPage = Math.ceil(results.data.data.count / this.pageData.pageSize);
          if(index!=undefined){
            this.fifterRnderUnload(index);
          }
        }else{
          this.$message.error('获取卸货单失败');
        }
      }).catch(()=>{
        this.loadingArr.unloadLoading = false;
        this.$message.error('获取卸货单失败');
      });
    },
     pageChange: function() {
      setTimeout(() => {
        this.getAllUnloadOrder(this.opearIndex);
      })
    },
  },
 
  created() {
    this.getSupplier();
    //this.getFulid();
    this.getTrade();
    this.getCarriers();
    //this.getAllUnloadOrder();
    //this.getUnload();
  }
};

</script>
