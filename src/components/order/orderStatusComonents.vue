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
                <el-select  v-model="carrier_type"  placeholder="请选择" @change="searchList" style="width:90%;">
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
            <el-form-item label="实际卸货时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" align="right" :picker-options="pickerOptions" v-model="timeParam.unload_active_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" style="position:absolute;right:0;bottom:-53px;z-index:500" @click="exportOrder"  :loading="exportLoading">导出</el-button>
    </div>

    <div class="nav-tab-setting mt-25" >
      <el-tabs v-model="fifterName" @tab-click="clickFifter" >
        <el-tab-pane v-for="(item,index) in statusList[status]" :key="index" :label="item.value" :name="item.key" v-loading="pageLoading">
          <div class="tab-content padding-clear-top" v-if="item.key==fifterName">
            <keep-alive>
              <orderConFifter :ListData="listFifterData" :status="fifterName" @chiledchangeTabs="chiledchangeTabs" @changeTabs="changeTabs" @searchList="searchList"></orderConFifter>
            </keep-alive>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if=" pageData.totalPage>1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
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
      exportLoading:false,
      fifterName: "",
      statusList: {
        'first': [{ key: 'all', value: '全部' }, { key: 'driver_pending_confirmation', value: '司机未确认' }, { key: 'to_fluid', value: '前往装车' }, { key: 'reach_fluid', value: '已到装货地' }, { key: 'loading_waiting_audit', value: '已装车待审核' }, { key: 'loading_audit_failed', value: '装车审核拒绝' }],
        'second': [{ key: 'all', value: '全部' }, { key: 'waiting_match', value: '待匹配卸货单' }, { key: 'confirm_match', value: "已匹配待确认" }, { key: 'already_match', value: '已匹配已确认' }],
        'third': [{ key: 'all', value: '全部' }, { key: 'to_site', value: '前往卸货地' }, { key: 'reach_site', value: '已到卸货地' }, { key: 'unloading_waiting_audit', value: '已卸车待审核' }, { key: 'unloading_audit_failed', value: '卸车审核失败' }],
        'fourth': [{ key: 'all', value: '全部' }, { key: 'waiting_settlement', value: '待提交结算' }, { key: 'in_settlement', value: '结算中' }],
        'fifth': [{ key: 'all', value: '全部' }, { key: 'canceing', value: '运单取消中' }, { key: 'modifying', value: '运单修改中' }, { key: 'abnormal', value: '故障中' }],
        'sxith': [{ key: 'all', value: '全部' }, { key: 'finished', value: '已完成' }, { key: 'canceled', value: '已取消' }]
      },
      allStatusList: {
        'first': [{ key: 'all', value: '全部' }, { key: 'driver_pending_confirmation', value: '司机未确认' }, { key: 'to_fluid', value: '前往装车' }, { key: 'reach_fluid', value: '已到装货地' }, { key: 'loading_waiting_audit', value: '已装车待审核' }, { key: 'loading_audit_failed', value: '装车审核拒绝' }],
        'second': [{ key: 'all', value: '全部' }, { key: 'waiting_match', value: '待匹配卸货单' }, { key: 'confirm_match', value: "已匹配待确认" }, { key: 'already_match', value: '已匹配已确认' }],
        'third': [{ key: 'all', value: '全部' }, { key: 'to_site', value: '前往卸货地' }, { key: 'reach_site', value: '已到卸货地' }, { key: 'unloading_waiting_audit', value: '已卸车待审核' }, { key: 'unloading_audit_failed', value: '卸车审核失败' }],
        'fourth': [{ key: 'all', value: '全部' }, { key: 'waiting_settlement', value: '待提交结算' }, { key: 'in_settlement', value: '结算中' }],
        'fifth': [{ key: 'all', value: '全部' }, { key: 'canceling', value: '运单取消中' }, { key: 'modifying', value: '运单修改中' }, { key: 'abnormal', value: '故障中' }],
        'sxith': [{ key: 'all', value: '全部' }, { key: 'finished', value: '已完成' }, { key: 'canceled', value: '已取消' }],
        'seven': [{ key: 'all', value: '全部' }]
      },
      timeParam: {
        unload_active_time: [],
        unload_plan_time: [],
        active_time: [],
        load_plan_time: []
      },
      carrier_type:"",
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'carrier_name', value: '承运商' },
          { id: 'order_number', value: '订单号' },
          { id: 'truck_no', value: '车号' },
          { id: 'fluid_name', value: '液厂名' },
          { id: 'waybill_number', value: '运单号' },
        ],
        carrier_type_select:[
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
    };
  },
  props: {
    status: String,
    countParam: Object,
    secondActiveName:String
  },
  methods: {
    chiledchangeTabs: function(tabsObj) {
      this.$emit("childchangeTabs", tabsObj);
    },
    changeTabs: function(name) {
      this.$emit("changeTabs", name);
    },
    exportOrder:function(){
      var sendData = {};
      var vm = this;
      this.exportLoading = true;
      if (this.fifterName == 'all') {
        if (this.status == 'first') {
          sendData.search = 'all_truck_loaded';
        } else if (this.status == 'second') {
          sendData.search = 'all_match';
        } else if (this.status == 'third') {
          sendData.search = 'all_unload';
        } else if (this.status == 'fourth') {
          sendData.search = 'all_settle';
        } else if (this.status == 'fifth') {
          sendData.search = 'all_change';
        } else if (this.status == 'sxith') {
          sendData.search = 'all_finish';
        }else if (this.status == 'seven') {
          sendData.search = '';
        }
      } else {
        if (this.fifterName == 'canceling' || this.fifterName == 'modifying' || this.fifterName == 'abnormal') {
          sendData.interrupt_status = this.fifterName;
        } else {
          sendData.status = this.fifterName;
        }
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
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      sendData.carrier_type=this.carrier_type;
      if (this.searchStatus) {
        sendData = this.saveSendData;
        sendData.page = this.pageData.currentPage;
      } else {
        vm.saveSendData = sendData;
        this.pageData.currentPage = 1;
        sendData.page = this.pageData.currentPage;
      }
      sendData.pageSize = this.pageData.pageSize;
      sendData.export_excel='export'
      this.$$http("exportOrder", sendData).then((results) => {
        this.exportLoading = false;
        if(results.data&&results.data.code==0){
          window.open(results.data.data.down_url);
        }
      });
    },
    searchList: function(targetName) {
      //
      var sendData = {};
      var vm = this;
      this.pageLoading = true;
      if (this.fifterName == 'all') {
        if (this.status == 'first') {
          sendData.search = 'all_truck_loaded';
        } else if (this.status == 'second') {
          sendData.search = 'all_match';
        } else if (this.status == 'third') {
          sendData.search = 'all_unload';
        } else if (this.status == 'fourth') {
          sendData.search = 'all_settle';
        } else if (this.status == 'fifth') {
          sendData.search = 'all_change';
        } else if (this.status == 'sxith') {
          sendData.search = 'all_finish';
        }else if (this.status == 'seven') {
          sendData.search = '';
        }
      } else {
        if (this.fifterName == 'canceling' || this.fifterName == 'modifying' || this.fifterName == 'abnormal') {
          sendData.interrupt_status = this.fifterName;
        } else {
          sendData.status = this.fifterName;
        }
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
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      sendData.carrier_type=this.carrier_type;
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
                vm.listFifterData = dataBody;
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
    clickFifter: function(targetName) {
      var status = targetName.name;
      //重新查询一次数据
      this.searchList(targetName);
      //this.$emit("changeTabs", this.status);
      this.$emit("childchangeTabs", { first: this.status, second:targetName.name });
    },
    fifterData: function(listData) {
      this.listFifterData = listData;
    },
    pageChange: function() {
      setTimeout(() => {
        if(this.saveSendData.export_excel){
          delete this.saveSendData.export_excel
        }
        this.searchStatus = true;
        this.searchList();
      });
    },
    assemblyData: function(val) {
      var renderStatus = this.pbFunc.deepcopy(this.allStatusList);
      var assemblyData = renderStatus[this.status]; //当前tabs数组
      var add = "";
      if (this.status == 'first') {
        add = '_driver';
      } else if (this.status == 'second') {
        add = '_match';
      } else if (this.status == 'third') {
        add = '_unload';
      } else if (this.status == 'fourth') {
        add = '_settlement';
      } else if (this.status == 'fifth') {
        add = '_change';
      } else if (this.status == 'sxith') {
        add = '_finish';
      }
      for (var i in assemblyData) {
        for (var j in val) { //传入过来的数值
          if (assemblyData[i].key + "_count" == j || (i == 0 && (assemblyData[i].key + add + "_count") == j)) {
            if (val[j] > 99) {
              assemblyData[i].value += "(99+)";
            } else {
              assemblyData[i].value += "(" + val[j] + ")";
            }
          }
        }
      }
      this.statusList[this.status] = assemblyData;
    }
  },
  mounted() {
    this.assemblyData(this.countParam);
  },
  created() {
    this.fifterName=this.secondActiveName;
    //this.listFifterData = this.listData;
    this.searchList();
  },
  watch: {
    countParam: {
      handler(val, oldVal) {
        this.assemblyData(val);
      }
    }
  }
};

</script>
