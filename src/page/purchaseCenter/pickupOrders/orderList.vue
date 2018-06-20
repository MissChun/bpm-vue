<style scoped lang="less">
.listOrder {
  margin-top: 35px;
}
.nav-tab{
  position: relative;
  .add-btn{
    position: absolute;
    right:0;
    top: -13px;
    z-index: 2;
  }
}
</style>
<template>
  <div>

    <div class="nav-tab">
      <div class="text-right add-btn">
        <el-button type="primary" @click="goAddNewOder">新增提货单</el-button>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="公有提货单" name="first">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" status-icon ref="seachHeadCarListFrom">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" @keyup.native.13="searchList" class="search-filters-screen" size="medium">
                    <el-select v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
                  </el-input>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="计划装货时间:" prop="buyInsuranceDate" label-width="105px">
                    <el-date-picker :editable="editable" :picker-options="pickerOptions" v-model="timeParam" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="listOrder nav-tab" v-loading="pageLoading">
      <el-tabs v-model="thisFifterName" type="card" @tab-click="clickFifter">
        <el-tab-pane :label="statusName.all_count" name="all">
          <div v-if="thisFifterName=='all'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.appoint_count" name="appoint">
          <div v-if="thisFifterName=='appoint'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.determine_count" name="determine">
          <div v-if="thisFifterName=='determine'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.confirmed_count" name="confirmed">
          <div v-if="thisFifterName=='confirmed'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="statusName.history_count" name="history">
          <div v-if="thisFifterName=='history'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ordersList',
  components: {
    orderFifterList: () =>
      import ("../../../components/order/orderFifterList.vue")
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
        }, ]
      },
      searchStatus: false,
      pageLoading: false,
      fifterParam: {
        keyword: "",
        field: "",
      },
      statusName: {
        all_count: '全部',
        appoint_count: '待指派',
        determine_count: '待确认',
        confirmed_count: '已确认',
        history_count: '历史'
      },
      allStatusName: {
        all_count: '全部',
        appoint_count: '待指派',
        determine_count: '待确认',
        confirmed_count: '已确认',
        history_count: '历史'
      },
      timeParam: [],
      listFifterData: [],
      activeName: 'first',
      thisFifterName: 'all',
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'trader_name', value: '托运商' },
          { id: 'order_number', value: '订单号' },
          { id: 'fluid_name', value: '液厂名' },
          { id: 'waybill_number', value: '运单号' },
        ]
      },
    };
  },
  computed: {
    fifterName: function() {
      if (this.$route.query.goTo) {
        return this.$route.query.goTo
      } else {
        return 'all'
      }
    },
  },
  methods: {
    clicktabs: function(targetName) {

    },
    goAddNewOder: function() {
      this.$router.push({ path: "/purchaseCenter/pickupOrders/addNewPickUpOrder" });
    },
    searchList: function() {
      var sendData = {};
      var vm = this;
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      if (this.timeParam instanceof Array && this.timeParam.length > 0) {
        sendData.plan_time_start = this.timeParam[0];
        sendData.plan_time_end = this.timeParam[1];
      }
      if (this.thisFifterName != "all") {
        sendData.status = this.thisFifterName;
      }
      if (this.searchStatus) {
        sendData = this.saveSendData;
      }
      if (this.thisFifterName == 'history') {
        sendData.history = true;
        delete sendData.status;
      }
      sendData.page = this.pageData.currentPage;
      sendData.page_size = this.pageData.pageSize;
      this.pageLoading = true;

      this.$$http("searchPickOrderList", sendData).then((results) => {
        this.pageLoading = false;
        if (results.data.code == 0) {
          vm.saveSendData = sendData;
          vm.searchStatus = false;
          var dataBody = results.data.data.data;
          vm.pageData.totalPage = Math.ceil(results.data.data.count / vm.pageData.pageSize);
          this.listFifterData = dataBody;
        }
      }).catch((err) => {
        this.pageLoading = false;
        console.log('err', err);
      });
      this.getCountList();
    },
    clickFifter: function(targetName) {
      var status = targetName.name;
      //重新查询一次数据
      this.$router.push({ path: "/purchaseCenter/pickupOrders?goTo=" + this.thisFifterName });
    },
    pageChange: function() {
      setTimeout(() => {
        this.searchStatus = true;
        this.searchList();
      });
    },
    getCountList: function() {
      var renderStatus = this.pbFunc.deepcopy(this.allStatusName);
      this.$$http("getCount", {}).then(results => {
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          for (var i in dataBody) {
            if (dataBody[i] > 99) {
              dataBody[i] = '99+';
            }
            renderStatus[i] += "(" + dataBody[i] + ")";
          }
          this.statusName = renderStatus;
        }
      }).catch((err) => {
        console.log('err', err);
      });
    }
  },
  created() {
    //this.listFifterData = this.listData;
    if (this.thisFifterName != this.fifterName) {
      this.thisFifterName = this.fifterName;
    }
    this.searchList();
  },
  watch: {
    '$route' (to, from) {
      //刷新参数放到这里里面去触发就可以刷新相同界面了
      this.thisFifterName = this.$route.query.goTo || "all";
      this.searchList();
    }
  }
};

</script>
