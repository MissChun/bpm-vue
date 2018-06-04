<style scoped lang="less">
.searchSection {
  /deep/ input {
    width: 80px;
  }
  /deep/ .el-range-editor.el-input__inner {
    width: 100%;
  }
}

</style>
<template>
  <div>
    <div class="tab-screen">
      <el-form class="search-filters-form" label-width="80px" status-icon ref="seachHeadCarListFrom">
        <el-row :gutter="0">
          <el-col :span="14">
            <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen">
              <el-select v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6" :offset="2" class="searchSection">
            <el-form-item label="计划装货时间:" label-width="105px">
              <el-date-picker v-model="timeParam.load_plan_time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;" class="searchSection">
          <el-col :span="6">
            <el-form-item label="实际装货时间:" label-width="105px">
              <el-date-picker v-model="timeParam.active_time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="计划卸货时间:" label-width="105px">
              <el-date-picker v-model="timeParam.unload_plan_time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="实际卸货时间:" label-width="105px">
              <el-date-picker v-model="timeParam.unload_active_time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="listOrder nav-tab" v-loading="pageLoading" style="margin-top:40px;">
      <el-tabs v-model="fifterName" type="card" @tab-click="clickFifter">
        <el-tab-pane v-for="(item,index) in statusList[status]" :label="item.value" :name="item.key">
          <div v-if="item.key==fifterName">
            <keep-alive>
              <orderConFifter :ListData="listFifterData" :status="fifterName" @changeTabs="changeTabs" @searchList="searchList"></orderConFifter>
            </keep-alive>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
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
      expandStatus: true,
      fifterName: "all",
      statusList: {
        'first': [{ key: 'all', value: '全部' }, { key: 'driver_pending_confirmation', value: '司机未确认' }, { key: 'to_fluid', value: '前往装车' }, { key: 'reach_fluid', value: '已到装货地' }, { key: 'loading_waiting_audit', value: '已装车待审核' }, { key: 'loading_audit_failed', value: '装车审核拒绝' }],
        'second': [{ key: 'all', value: '全部' }, { key: 'waiting_match', value: '待匹配卸货单' }, { key: 'already_match', value: '已匹配卸货单' }],
        'third': [{ key: 'all', value: '全部' }, { key: 'to_site', value: '前往卸货地' }, { key: 'reach_site', value: '已到卸货地' }, { key: 'unloading_waiting_audit', value: '已卸车待审核' }, { key: 'unloading_audit_failed', value: '卸车审核失败' }],
        'fourth': [{ key: 'all', value: '全部' }, { key: 'waiting_settlement', value: '待提交结算' }, { key: 'in_settlement', value: '结算中' }],
        'fifth': [{ key: 'all', value: '全部' }, { key: 'canceing', value: '运单取消中' }, { key: 'editing', value: '运单修改中' }, { key: 'bading', value: '故障中' }],
        'sxith': [{ key: 'all', value: '全部' }, { key: 'finished', value: '已完成' }, { key: 'canceled', value: '已取消' }]
      },
      timeParam: {
        unload_active_time: [],
        unload_plan_time: [],
        active_time: [],
        load_plan_time: []
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'station_name', value: '供应商' },
          { id: 'order_number', value: '订单号' },
          { id: 'fluid_name', value: '液厂名' },
          { id: 'waybill_number', value: '运单号' },
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
        field: "",
      },
    };
  },
  props: ['status'],
  computed: {

  },
  methods: {
    changeTabs: function(name) {
      this.$emit("changeTab", name);
    },
    searchList: function() {
      var sendData = {};
      var vm = this;

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
        }
      } else {
        sendData.status = this.fifterName;
      }

      if (this.timeParam.unload_active_time.length > 0) {
        sendData.unload_active_time_end = this.timeParam.unload_active_time[1];
        sendData.unload_active_time_start = this.timeParam.unload_active_time[0]; //实际卸货
      }
      if (this.timeParam.unload_plan_time.length > 0) {
        sendData.unload_plan_time_start = this.timeParam.unload_plan_time[0]; //计划卸货
        sendData.unload_plan_time_end = this.timeParam.unload_plan_time[1];
      }
      if (this.timeParam.active_time.length > 0) {
        sendData.active_time_start = this.timeParam.active_time[0]; //实际装车
        sendData.active_time_end = this.timeParam.active_time[1];
      }
      if (this.timeParam.load_plan_time.length > 0) {
        sendData.load_plan_time_start = this.timeParam.load_plan_time[0]; //计划装车
        sendData.load_plan_time_end = this.timeParam.load_plan_time[1];
      }
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }

      if (this.searchStatus) {
        sendData = this.saveSendData;
      }
      this.pageLoading = true;
      this.$$http("searchConOrderList", sendData).then((results) => {
        vm.pageLoading = false;
        vm.saveSendData = sendData;
        vm.searchStatus = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          vm.pageData.totalPage = Math.ceil(results.data.data.count / vm.pageData.pageSize);
          var sendData = {};
          if (dataBody.length > 0) {
            sendData.tractor_list = [dataBody[0].capacity]
            vm.$$http("getTransPowerInfo", sendData).then((transPowerInfo) => {
              if (transPowerInfo.data.code == 0) {

                dataBody[0].transPowerInfo = transPowerInfo.data.data.results[0];
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
      this.searchList();
    },
    fifterData: function(listData) {
      this.listFifterData = listData;
    },
    pageChange: function() {
      setTimeout(() => {
        this.searchStatus = true;
        this.searchList();
      });
    }
  },
  created() {
    //this.listFifterData = this.listData;
    this.searchList();
  }
};

</script>
