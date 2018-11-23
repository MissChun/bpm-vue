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
            <el-form-item align="right" label="实际装货时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" :picker-options="pickerOptions" v-model="timeParam.actual_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="searchSection" v-if="showPlanArrTime.indexOf(status)>-1">
            <el-form-item align="right" label="计划到站时间:" label-width="105px">
              <el-date-picker @change="searchList" :editable="editable" :picker-options="pickerOptions" v-model="timeParam.plan_arrive_time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" style="position:absolute;right:25px;bottom:-53px;z-index:500" @click="changeExtendsStatus" v-if="expandStatus">收起<i class="el-icon-arrow-up el-icon--right"></i></el-button>
      <el-button type="primary" style="position:absolute;right:25px;bottom:-53px;z-index:500" @click="changeExtendsStatus" v-if="!expandStatus">展开<i class="el-icon-arrow-down el-icon--right"></i></el-button>
    </div>
    <div class="nav-tab-setting mt-25">
      <el-tabs v-model="fifterName" @tab-click="clickFifter">
        <el-tab-pane v-for="(item,index) in sendMenuData[status]" :label="item.countLable" :name="item.key" v-loading="pageLoading">
          <div class="tab-content padding-clear-top" v-if="item.key==fifterName">
            <keep-alive>
              <outsideBuyListRender :ListData="listFifterData" :firstMenu="status" :secondMenu="fifterName" @changeTabs="changeTabs" :expandStatus="expandStatus" @searchList="searchList"></outsideBuyListRender>
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
  name: 'outsidePickSecondMenu',
  components: {
    outsideBuyListRender: () =>
      import ("./outsideBuyListRender.vue")
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
      expandStatus: false,
      pageLoading: false,
      exportLoading: false,
      fifterName: "all",
      showPlanArrTime: ['all_unload', 'all_settle', 'all_change', 'all_finish', 'all_count'],
      sendMenuData: {
        'all_new': [{ key: 'all', value: '全部', countLable: "全部" }, { key: 'create_manager_check', value: '待经理审批', countLable: "待经理审批" }, { key: 'create_department_check', value: '待部门审批', countLable: "待部门审批" }],
        'all_match': [{ key: 'all', value: '全部', countLable: "全部" }, { key: 'waiting_match', value: '待匹配卸货单', countLable: "待匹配卸货单" }, { key: 'confirm_match', value: '已匹配待确认', countLable: "已匹配待确认" }, { key: 'already_match', value: '已匹配已确认', countLable: "已匹配已确认" }],
        'all_unload': [{ key: 'all', value: '全部', countLable: "全部" }],
        'all_settle': [{ key: 'all', value: '全部', countLable: "全部" }],
        'all_change': [{ key: 'all', value: '全部', countLable: "全部" }],
        'all_finish': [{ key: 'all', value: '全部', countLable: "全部" }, { key: 'finished', value: '已完成', countLable: "已完成" }, { key: 'all_cancel', value: '已经取消', countLable: "已经取消" }],
        'all_count': [{ key: 'all', value: '全部', countLable: "全部" }],
      },
      timeParam: {
        actual_time: [],
        plan_arrive_time: []
      },
      selectData: {
        fieldSelect: [
          { id: 'tractor_plate_number', value: '车号' },
          { id: 'actual_fluid_name', value: '液厂名' },
          { id: 'order_number', value: '业务单号' },
          { id: 'waybill_number', value: '运单号' },
        ],
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
        field: "actual_fluid_name",
      },
    };
  },
  props: {
    status: String,
    countParam: Array,
    secondActiveName: String
  },

  methods: {
    changeTabs: function(name) {
      this.$emit("changeTab", name);
    },
    changeExtendsStatus: function() {
      this.expandStatus = !this.expandStatus;
    },

    searchList: function(targetName) {
      //
      this.$emit("reshCount");
      var sendData = {};
      var vm = this;
      this.pageLoading = true;
      if (this.fifterName == 'all') {
        sendData.all_search = this.status;
      } else if (this.fifterName == 'all_cancel') {
        sendData.all_search = 'all_cancel';
      } else {
        sendData.status = this.fifterName;
      }

      if (this.timeParam.actual_time instanceof Array && this.timeParam.actual_time.length > 0) {
        sendData.actual_time_start = this.timeParam.actual_time[0]; //计划装车
        sendData.actual_time_end = this.timeParam.actual_time[1];
      }
      if (this.timeParam.plan_arrive_time instanceof Array && this.timeParam.plan_arrive_time.length > 0) {
        sendData.plan_arrive_time_start = this.timeParam.plan_arrive_time[0]; //计划装车
        sendData.plan_arrive_time_end = this.timeParam.plan_arrive_time[1];
      }
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      sendData.pageSize = this.pageData.pageSize;
      if (this.searchStatus) {
        sendData = this.saveSendData;
        sendData.page = this.pageData.currentPage;
      } else {
        vm.saveSendData = sendData;
        this.pageData.currentPage = 1;
        sendData.page = this.pageData.currentPage;
      }
      sendData.pageSize = this.pageData.pageSize;

      this.$$http("searchOutbuyOrder", sendData).then((results) => {
        if (results.data.code == 0) {
          this.listFifterData = results.data.data.data;
          vm.pageData.totalPage = Math.ceil(results.data.data.count / vm.pageData.pageSize);
        }
        setTimeout(() => {
          vm.pageLoading = false;
        })
        vm.searchStatus = false;
      }).catch((err) => {
        vm.pageLoading = false;
      });
    },
    clickFifter: function(targetName) {
      var status = targetName.name;
      //重新查询一次数据
      this.searchList(targetName);
      //this.$emit("changeTab", this.status);
      this.$emit("childchangeTabs", { first: this.status, second: targetName.name });
    },
    fifterData: function(listData) {
      this.listFifterData = listData;
    },
    pageChange: function() {
      setTimeout(() => {
        this.searchStatus = true;
        this.searchList();
      });
    },
    assemblyData: function(secondMenuData) {
      this.sendMenuData[this.status].map((item) => {
        for (let i in secondMenuData) {
          if (secondMenuData[i].tab_key == item.key) {
            if (secondMenuData[i].num < 99) {
              this.$set(item, "countLable", item.value + "(" + secondMenuData[i].num + ")");
              //item.countLable=item.value+"("+secondMenuData[i].num+")";
            } else {
              item.countLable = item.value + "99+";
              this.$set(item, "countLable", item.value + "(99+)");
            }
          }
        }
        return item;
      });
    }
  },
  mounted() {
    this.assemblyData(this.countParam);
  },
  created() {
    this.fifterName = this.secondActiveName;
    //this.listFifterData = this.listData;
    this.searchList();
  },
  watch: {
    countParam: {
      handler(val, oldVal) {
        this.assemblyData(val);
      },
      deep: true
    }
  }
};

</script>
