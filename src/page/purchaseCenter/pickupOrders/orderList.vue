<style scoped lang="less">
.listOrder {
  margin-top: 35px;
}

.nav-tab {
  background: white;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-row v-if="true">
        <el-col :span="2" :offset="22">
          <el-button type="primary" @click="goAddNewOder">新增提货单</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="公有提货单" name="first">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" status-icon ref="seachHeadCarListFrom" :rules="rules">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen" size="medium">
                    <el-select v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
                  </el-input>
                </el-col>
                <el-col :span="8" :offset="2">
                  <el-form-item label="计划装货时间:" prop="buyInsuranceDate" label-width="105px">
                    <el-date-picker v-model="timeParam" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
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
      <el-tabs v-model="fifterName" type="card" @tab-click="clickFifter">
        <el-tab-pane label="全部" name="all">
          <div v-if="fifterName=='all'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待指派" name="appoint">
          <div v-if="fifterName=='appoint'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待确认" name="determine">
          <div v-if="fifterName=='determine'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已确认" name="confirmed">
          <div v-if="fifterName=='confirmed'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
            </keep-alive>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史" name="loaded">
          <div v-if="fifterName=='loaded'">
            <keep-alive>
              <orderFifterList :ListData="listFifterData" @refreshList="searchList"></orderFifterList>
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
  name: 'ordersList',
  components: {
    orderFifterList: () =>
      import ("../../../components/order/orderFifterList.vue")
  },
  data() {
    return {
      searchStatus: false,
      pageLoading: false,
      fifterParam: {
        keyword: "",
        field: "",
      },

      timeParam: [],
      listFifterData: [],
      rules: {},
      activeName: 'first',
      fifterName: 'all',
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
      if (this.timeParam.length > 0) {
        sendData.plan_time_start = this.timeParam[0];
        sendData.plan_time_end = this.timeParam[1];
      }
      if (this.fifterName != "all") {
        sendData.status = this.fifterName;
      }
      if (this.searchStatus) {
        sendData = this.saveSendData;
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
      }).catch(() => {
        this.pageLoading = false;
      });
    },
    clickFifter: function(targetName) {
      var status = targetName.name;
      //重新查询一次数据
      this.searchList();
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
