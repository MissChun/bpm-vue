<style scoped lang="less">
  .searchSection {

  /deep/ .el-range-editor.el-input__inner {
    width: 100%;
  }
}

/deep/ .el-table {
  &:before {
    height: 0;
  }
  th {
    &.is-leaf {
      border: none;
    }
  }
}
.nav-tab-setting /deep/ .el-tabs__header .el-tabs__nav .el-tabs__item {
  height:44px;
}
.nav-tab-setting /deep/ .el-tabs__header .el-tabs__nav .el-tabs__item.is-active:after {
   position: absolute;
   bottom: 0;
   left: 18%;
   display: block;
   width: 64%;
   height: 0px !important;
   content: " ";
   background-color:white;
}
.tagerLable{
  margin-left:10px;background-color:#4a9bf8;color:white;
 margin-top:3px;
  .el-icon-close {
    color:white;
  }
}
/deep/ .el-tag .el-icon-close{
  color:white;
}
</style>
<template>
  <div>
    <div class="tab-content" style="position:relative;">
      <el-form class="search-filters-form" label-width="80px" status-icon ref="seachHeadCarListFrom">
        <el-row :gutter="0">
          <el-col :span="15">
            <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen" @keyup.native.13="searchList">
              <el-select v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="" class="searchSection">
          <el-col :span="8" class="searchSection">
            <el-form-item align="right" label="计划装货时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" :picker-options="pickerOptions" v-model="timeParam.load_plan_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item align="right" label="实际装货时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" :picker-options="pickerOptions" v-model="timeParam.active_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item align="right" label="承运类型:" label-width="105px">
              <el-select v-model="carrier_type" placeholder="请选择" @change="searchList" style="width:90%;">
                <el-option v-for="(item,key) in selectData.carrier_type_select" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="" class="searchSection">
          <el-col :span="8" v-if="status!='first'">
            <el-form-item align="right" label="计划卸货时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" :picker-options="pickerOptions" v-model="timeParam.unload_plan_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="status!='first'&&status!='second'">
            <el-form-item label="实际到站时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" align="right" :picker-options="pickerOptions" v-model="timeParam.unload_active_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8" v-if="status!='first'&&status!='second'&&status!='fifth'">
            <el-form-item label="实际卸货时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" align="right" :picker-options="pickerOptions" v-model="timeParam.unload_work_end_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <el-button type="primary" style="position:absolute;right:80px;bottom:-53px;z-index:500" @click="changeExtendsStatus" v-if="expandStatus">收起<i class="el-icon-arrow-up el-icon--right"></i></el-button>
      <el-button type="primary" style="position:absolute;right:80px;bottom:-53px;z-index:500" @click="changeExtendsStatus" v-if="!expandStatus">展开<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-button type="primary" style="position:absolute;right:0;bottom:-53px;z-index:500" @click="exportOrder" :loading="exportLoading" v-if="status !== 'seven'">导出</el-button>
      <el-button type="primary" style="position:absolute;right:0;bottom:-53px;z-index:500" @click="loadingAllDialog = true" v-if="status == 'seven'">导出</el-button>
    </div>
    <div class="nav-tab-setting mt-25" style="position:relative">
      <div style="position:absolute;left:285px;z-index:500;width:600px;height:40px;top:-5px;">
        <el-row :gutter="3" style="height:100%;">
          <el-col :key="tag.key" v-for="tag in tagArr" :span="5">
            <el-tag  closable :disable-transitions="false" @close="handleClose(tag)" class="tagerLable" style="" size="mini"> 
              {{tag.value}}
            </el-tag>
          </el-col>
        </el-row>
        
      </div>
      <el-tabs v-model="status">
       <el-tab-pane  :name="status" v-loading="pageLoading">
        <div slot="label" style="height:36px">
          <span>状态:</span>
          <el-select v-model="fifterNameArr" placeholder="请选择" size="mini"  class="selectFi" @change="secondMenuChange" multiple collapse-tags>
            <el-option
              v-for="item in statusList[status]"
              :label="item.value"
              :value="item.key"
              >
            </el-option>
          </el-select>
        </div>
          <div class="tab-content padding-clear-top" >
            <keep-alive>
                <orderConFifter :ListData="listFifterData" :firstMenu="status" :secondMenu="fifterName" @changeTabs="changeTabs" :expandStatus="expandStatus" @searchList="searchList"></orderConFifter>
            </keep-alive>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if=" pageData.totalPage>1">
      </el-pagination>
    </div>
    <el-dialog center width="30%" :visible.sync="loadingAllDialog" :lock-scroll="false" :modal-append-to-body="false">
      <div>
        <div class="text-center md-40">
          <el-radio v-model="loadingAllRadio" label="1">导出卸车完成数据</el-radio>
          <el-radio v-model="loadingAllRadio" label="2">导出所有数据</el-radio>
        </div>
        <div class="text-center">
          <el-button @click="loadingAllDialog = false">取 消</el-button>
          <el-button type="primary" @click="exportOrder" :loading="exportLoading">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'orderStatusComonents',
  components: {
    orderConFifter: () =>
      import ("./orderConFifterList.vue")
  },
  data() {
    return {
      editable: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '今天',
          onClick(picker) {
            const end = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " 23:59:59";
            const start = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " 00:00:00";
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      expandStatus: true,
      pageLoading: false,
      exportLoading: false,
      tagArr:[],
      fifterNameArr:[],
      statusList: {
        'first': [{ key: 'driver_pending_confirmation', value: '司机未确认' }, { key: 'to_fluid', value: '前往装车' }, { key: 'reach_fluid', value: '已到装货地' }, { key: 'loading_waiting_audit', value: '已装车待审核' }, { key: 'loading_audit_failed', value: '装车审核拒绝' }],
        'second': [{ key: 'waiting_match', value: '待匹配卸货单' }, { key: 'confirm_match', value: "已匹配待确认" }, { key: 'already_match', value: '已匹配已确认' }],
        'third': [{ key: 'unload_driver_pending_confirmation', value: '司机未确认' }, { key: 'to_site', value: '前往卸货地' }, { key: 'reach_site', value: '已到卸货地' }, { key: 'unloading_waiting_audit', value: '已卸车待审核' }, { key: 'unloading_audit_failed', value: '卸车审核失败' },{ key: 'waiting_settlement', value: '待提交结算' }, { key: 'in_settlement', value: '结算中' },{ key: 'finished', value: '已完成' }],
        'fourth': [{ key: 'canceing', value: '运单取消中' }, { key: 'editing', value: '运单修改中' }, { key: 'bading', value: '车辆变更中' },{ key: 'canceled', value: '已取消' }],
        'fifth': [{ key: 'all', value: '全部' }],
      },
      allStatusList: {
        'first': [{ key: 'driver_pending_confirmation', value: '司机未确认' }, { key: 'to_fluid', value: '前往装车' }, { key: 'reach_fluid', value: '已到装货地' }, { key: 'loading_waiting_audit', value: '已装车待审核' }, { key: 'loading_audit_failed', value: '装车审核拒绝' }],
        'second': [{ key: 'waiting_match', value: '待匹配卸货单' }, { key: 'confirm_match', value: "已匹配待确认" }, { key: 'already_match', value: '已匹配已确认' }],
        'third': [{ key: 'unload_driver_pending_confirmation', value: '司机未确认' }, { key: 'to_site', value: '前往卸货地' }, { key: 'reach_site', value: '已到卸货地' }, { key: 'unloading_waiting_audit', value: '已卸车待审核' }, { key: 'unloading_audit_failed', value: '卸车审核失败' },{ key: 'waiting_settlement', value: '待提交结算' }, { key: 'in_settlement', value: '结算中' },{ key: 'finished', value: '已完成' }],
        'fourth': [{ key: 'canceing', value: '运单取消中' }, { key: 'editing', value: '运单修改中' }, { key: 'bading', value: '车辆变更中' },{ key: 'canceled', value: '已取消' }],
        'fifth': [{ key: 'all', value: '全部' }],
      },
      timeParam: {
        unload_active_time: [],
        unload_plan_time: [],
        active_time: [],
        load_plan_time: [],
        unload_work_end_time:[]
      },
      carrier_type: "",
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'carrier_name', value: '承运商' },
          { id: 'order_number', value: '订单号' },
          { id: 'truck_no', value: '车号' },
          { id: 'fluid_name', value: '液厂名' },
          { id: 'waybill_number', value: '运单号' },
          { id: 'order_station', value: '卸货站点' },
        ],
        carrier_type_select: [
          { id: '', value: '全部' },
          { id: 'own', value: '自有承运商(自有)' },
          { id: 'external', value: '外部承运商(合作)' },
        ]
      },
      searchStatus: false,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      listFifterData: [],
      saveSendData: {},
      fifterParam: {
        keyword: "",
        field: "truck_no",
      },
      loadingAllDialog: false,
      loadingAllRadio: '2',
    };
  },
  props: {
    status: String,
    countParam: Object,
    secondActiveName: String
  },
  computed: {
    fifterName: function(){
      var returnFiferName="";
      this.fifterNameArr.forEach((item,index)=>{
        if(item!="all"){
          if(this.fifterNameArr.length>1&&index!=this.fifterNameArr.length-1){
            returnFiferName+=(item+',');
          }else{
            returnFiferName+=item;
          }
        }
      });
      return returnFiferName
    }
  },
  methods: {
    handleClose:function(tag) {
      this.fifterNameArr.splice(this.fifterNameArr.indexOf(tag.key), 1);
      this.tagArr.splice(this.fifterNameArr.indexOf(tag.key), 1)
      this.secondMenuChange();
    },
    chiledchangeTabs: function(tabsObj) {
      this.$emit("childchangeTabs", tabsObj);
    },
    changeExtendsStatus: function() {
      this.expandStatus = !this.expandStatus;
    },
    secondMenuChange:function(){
       var status = this.fifterName;
      //重新查询一次数据
      
      //this.$emit("changeTabs", this.status);
      let middleTagArr=[];
      this.fifterNameArr.forEach(item=>{
        this.statusList[this.status].forEach(tagItem=>{
          if(tagItem.key==item){
            middleTagArr.push(tagItem);
          }
        })
      });
      this.tagArr=middleTagArr;
      this.$emit("childchangeTabs", { first: this.status, second:this.fifterName });
      if(this.fifterNameArr.length==0){
        this.listFifterData=[];
      }else{
        this.searchList(this.fifterName);
      }
    },
    changeTabs: function(name) {
      this.$emit("changeTabs", name);
    },
    exportOrder: function() {
      var sendData = {};
      var vm = this;
      this.exportLoading = true;

      if(this.status=='first'){
        sendData.search='all_truck_loaded';
      }else if(this.status=='second'){
        sendData.search='all_match';
      }else if(this.status=='third'){
        sendData.search='all_unload';
      }else if(this.status=='fourth'){
        sendData.search='all_change';
      }else if(this.status=='fifth'){
        sendData.search='';
      }
      if (this.fifterName.indexOf('canceling')>0|this.fifterName.indexOf('modifying')>0||this.fifterName.indexOf('abnormal')>0) {
        sendData.interrupt_status = this.fifterName;
      } else {
        sendData.child_search = this.fifterName;
      }
      if (this.timeParam.unload_active_time instanceof Array && this.timeParam.unload_active_time.length > 0) {
        sendData.unload_active_time_end = this.timeParam.unload_active_time[1];
        sendData.unload_active_time_start = this.timeParam.unload_active_time[0]; //实际卸货
      }
      if (this.timeParam.unload_plan_time instanceof Array && this.timeParam.unload_plan_time.length > 0) {
        sendData.unload_plan_time_start = this.timeParam.unload_plan_time[0]; //计划卸货
        sendData.unload_plan_time_end = this.timeParam.unload_plan_time[1];
      }
      if (this.timeParam.active_time instanceof Array && this.timeParam.active_time.length > 0) {
        sendData.load_active_time_start = this.timeParam.active_time[0]; //实际装车
        sendData.load_active_time_end = this.timeParam.active_time[1];
      }
      if (this.timeParam.load_plan_time instanceof Array && this.timeParam.load_plan_time.length > 0) {
        sendData.load_plan_time_start = this.timeParam.load_plan_time[0]; //计划装车
        sendData.load_plan_time_end = this.timeParam.load_plan_time[1];
      }
      if (this.timeParam.unload_work_end_time instanceof Array && this.timeParam.unload_work_end_time.length > 0) {
        sendData.unload_work_end_time_start = this.timeParam.unload_work_end_time[0]; //计划装车
        sendData.unload_work_end_time_end = this.timeParam.unload_work_end_time[1];
      }
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      sendData.carrier_type = this.carrier_type;
      sendData.page = this.pageData.currentPage;
      sendData.pageSize = this.pageData.pageSize;
      sendData.export_excel = 'export'
      let url = 'http://bpm.hhtdlng.com';
      axios.get('/api/v1/section-trips/', {
        method: 'get',
        responseType: 'blob',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          'Authorization': 'jwt ' + this.pbFunc.getLocalData('token', true)
        },
        params: sendData,
      }).then((res) => {
        // let fileName = res.headers['content-disposition'].match(/fushun(\S*)xls/)[0];
        // fileDownload(res.data, fileName);
        //如果用方法一 ，这里需要安装 npm install js-file-download --save ,然后引用 var fileDownload = require('js-file-download')，使用详情见github;
        this.exportLoading = false;
        this.loadingAllDialog = false;
        if (res.data && res.status == 200) {
          // let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(res.data);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = objectUrl;
          link.setAttribute('download', '托运订单.xlsx');
          document.body.appendChild(link);
          link.click()
        }
      }).catch(function(res) {
        this.exportLoading = false;
      });
    },
    searchList: function(targetName) {
      //
      var sendData = {};
      var vm = this;
      this.pageLoading = true;
      if(this.status=='first'){
        sendData.search='all_truck_loaded';
      }else if(this.status=='second'){
        sendData.search='all_match';
      }else if(this.status=='third'){
        sendData.search='all_unload';
      }else if(this.status=='fourth'){
        sendData.search='all_change';
      }else if(this.status=='fifth'){
        sendData.search='';
      }
      if (this.fifterName.indexOf('canceling')>0|this.fifterName.indexOf('modifying')>0||this.fifterName.indexOf('abnormal')>0) {
        sendData.interrupt_status = this.fifterName;
      } else {
        sendData.child_search = this.fifterName;
      }

      if (this.timeParam.unload_active_time instanceof Array && this.timeParam.unload_active_time.length > 0) {
        sendData.unload_active_time_end = this.timeParam.unload_active_time[1];
        sendData.unload_active_time_start = this.timeParam.unload_active_time[0]; //实际卸货
      }
      if (this.timeParam.unload_plan_time instanceof Array && this.timeParam.unload_plan_time.length > 0) {
        sendData.unload_plan_time_start = this.timeParam.unload_plan_time[0]; //计划卸货
        sendData.unload_plan_time_end = this.timeParam.unload_plan_time[1];
      }
      if (this.timeParam.active_time instanceof Array && this.timeParam.active_time.length > 0) {
        sendData.load_active_time_start = this.timeParam.active_time[0]; //实际装车
        sendData.load_active_time_end = this.timeParam.active_time[1];
      }
      if (this.timeParam.load_plan_time instanceof Array && this.timeParam.load_plan_time.length > 0) {
        sendData.load_plan_time_start = this.timeParam.load_plan_time[0]; //计划装车
        sendData.load_plan_time_end = this.timeParam.load_plan_time[1];
      }
      if (this.timeParam.unload_work_end_time instanceof Array && this.timeParam.unload_work_end_time.length > 0) {
        sendData.unload_work_end_time_start = this.timeParam.unload_work_end_time[0]; //计划装车
        sendData.unload_work_end_time_end = this.timeParam.unload_work_end_time[1];
      }
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      sendData.carrier_type = this.carrier_type;
      if (this.searchStatus) {
        sendData = this.saveSendData;
        sendData.page = this.pageData.currentPage;
      } else {
        vm.saveSendData = sendData;
        this.pageData.currentPage = 1;
        sendData.page = this.pageData.currentPage;
      }
      sendData.pageSize = this.pageData.pageSize;
      this.$$http("searchConOrderList", sendData).then((results) => {
        vm.pageLoading = false;
        vm.searchStatus = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          vm.pageData.totalPage = Math.ceil(results.data.data.count / vm.pageData.pageSize);
          var sendData = {};
          if (dataBody.length > 0) {
            var capacityList = [];
            for (var i = 0; i < dataBody.length; i++) {
              capacityList.push(dataBody[i].capacity);
            }
            sendData.tractor_list = capacityList
            vm.$$http("getTransPowerInfo", sendData).then((transPowerInfo) => {
              if (transPowerInfo.data.code == 0) {
                var transPowerInfoList = transPowerInfo.data.data.results;
                dataBody.forEach((Ditem, index) => {
                  Ditem.transPowerInfo = {
                    tractor: {},
                    semitrailer: {},
                    master_driver: {},
                    vice_driver: {},
                    escort_staff: {},
                  };
                  transPowerInfoList.forEach((Ttiem) => {
                    var status = true;
                    if (Ditem.capacity == Ttiem.id) {
                      Ttiem.tractor = Ttiem.tractor ? Ttiem.tractor : {};
                      Ttiem.semitrailer = Ttiem.semitrailer ? Ttiem.semitrailer : {};
                      Ttiem.master_driver = Ttiem.master_driver ? Ttiem.master_driver : {};
                      Ttiem.vice_driver = Ttiem.vice_driver ? Ttiem.vice_driver : {};
                      Ttiem.escort_staff = Ttiem.escort_staff ? Ttiem.escort_staff : {};
                      Ditem.transPowerInfo = Ttiem;
                      status = false;
                    }
                  });
                });
                //dataBody[0].transPowerInfo = transPowerInfo.data.data.results[0];
                vm.listFifterData = vm.dealDataByStatus(dataBody);
                // vm.listFifterData = dataBody;
              }
            }).catch(() => {

            });
          } else {
            vm.listFifterData = [];
          }

        }
      }).catch(() => {
        vm.pageLoading = false;
      });
    },
    dealDataByStatus: function(dataBody) {
      for (var i in dataBody) {
        if (dataBody[i].status.key == 'already_match' || dataBody[i].status.key == 'waiting_match') {
          var middleArr = [];
          for (var unIndex in dataBody[i].unload_trips) {
            if (dataBody[i].unload_trips[unIndex].status.key != 'canceled') {
              middleArr.push(dataBody[i].unload_trips[unIndex]);
            }
          }
          dataBody[i].unload_trips = middleArr;
        }
      }
      return dataBody;
    },
    clickFifter: function(targetName) {
      var status = targetName.name;
      //重新查询一次数据
      this.searchList(targetName);
      //this.$emit("changeTabs", this.status);
      this.$emit("childchangeTabs", { first: this.status, second: targetName.name });
    },
    fifterData: function(listData) {
      this.listFifterData = listData;
    },
    pageChange: function() {
      setTimeout(() => {
        if (this.saveSendData.export_excel) {
          delete this.saveSendData.export_excel
        }
        this.searchStatus = true;
        this.searchList();
      });
    },
    // assemblyData: function(val) {
    //   var renderStatus = this.pbFunc.deepcopy(this.allStatusList);
    //   var assemblyData = renderStatus[this.status]; //当前tabs数组
    //   var add = "";
    //   if (this.status == 'first') {
    //     add = '_driver';
    //   } else if (this.status == 'second') {
    //     add = '_match';
    //   } else if (this.status == 'third') {
    //     add = '_unload';
    //   } else if (this.status == 'fourth') {
    //     add = '_settlement';
    //   } else if (this.status == 'fifth') {
    //     add = '_change';
    //   } else if (this.status == 'sxith') {
    //     add = '_finish';
    //   }
    //   for (var i in assemblyData) {
    //     for (var j in val) { //传入过来的数值
    //       if (assemblyData[i].key + "_count" == j || (i == 0 && (assemblyData[i].key + add + "_count") == j)) {
    //         if (val[j] > 99) {
    //           assemblyData[i].value += "(99+)";
    //         } else {
    //           assemblyData[i].value += "(" + val[j] + ")";
    //         }
    //       }
    //     }
    //   }
    //   this.statusList[this.status] = assemblyData;
    // }
  },
  mounted() {
    // this.assemblyData(this.countParam);
  },
  created() {
    if(!this.secondActiveName||this.secondActiveName=='all'){
      let fifterName="";
      this.statusList[this.status].forEach((item,index)=>{
        if(this.statusList[this.status].length-1!=index&&this.statusList[this.status].length>1){
          fifterName+=(item.key+",");
        }else{
          fifterName+=(item.key);
        }
        this.fifterNameArr.push(item.key);
        this.tagArr.push(item);
      })
    }else{
      let middleTagArr=[];
      this.secondActiveName.split(",").forEach(Sitem=>{
        this.fifterNameArr.push(Sitem);
        this.statusList[this.status].forEach(tagItem=>{
          if(tagItem.key==Sitem){
            middleTagArr.push(tagItem);
          }
        })
      })
      this.tagArr=middleTagArr;
    }
    //this.listFifterData = this.listData;
    this.searchList();
  },
  watch: {
    // countParam: {
    //   handler(val, oldVal) {
    //     this.assemblyData(val);
    //   }
    // }
  }
};

</script>
