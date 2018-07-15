<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="客户管理" name="customerManage">
        </el-tab-pane>
        <el-tab-pane label="客户站点" name="customerStation">
        </el-tab-pane>
        <el-tab-pane label="客户付款方管理" name="customerPayManage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen" @keyup.native.13="searchList">
                    <el-select size="mini" v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" @click="exportList">导出</el-button> -->
        <el-button type="success" @click="addCustomerPayManage">新增</el-button>
      </div>
      <div class="table-list" v-loading="pageLoading">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column label="付款方名称" align="center" prop="payer">
          </el-table-column>
          <el-table-column label="客户名称" align="center">
            <template slot-scope="scope">
              <el-row v-if="scope.row.consumer&&scope.row.consumer.length>0" :title="scope.row.customerTitle">
                <el-col v-for="(item,index) in scope.row.consumer" :key="key" v-if="index<5">
                  {{item.consumer_name}}
                </el-col>
                <el-col v-else>......</el-col>
              </el-row>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="客户简称" align="center">
            <template slot-scope="scope">
              <el-row v-if="scope.row.consumer&&scope.row.consumer.length>0" :title="scope.row.customerShortTitle">
                <el-col v-for="(item,index) in scope.row.consumer" :key="key" v-if="index<5">
                  {{item.short_name}}
                </el-col>
                <el-col v-else>......</el-col>
              </el-row>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="业务员" align="center">
            <template slot-scope="scope">
              <el-row v-if="scope.row.consumer&&scope.row.consumer.length>0" :title="scope.row.saleManTitle">
                <el-col v-for="(item,index) in scope.row.consumer" :key="key" v-if="index<5">
                  {{item.sale_man_name}}
                </el-col>
                <el-col v-else>......</el-col>
              </el-row>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" align="center" prop="created_at">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next,jumper" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'customerPayManageList',
  data() {
    return {
      activeName: "customerPayManage",
      fifterParam: {
        keyword: "",
        field: "consumer_name",
      },

      pageStatus: false,
      seachListParam: {

      },
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      selectData: {
        fieldSelect: [
          { id: 'consumer_name', value: '客户名称' },
          { id: 'short_name', value: '客户简称' },
          { id: 'payer', value: '付款方名称' },
          { id: 'sale_man_name', value: '分属业务员' },
        ]
      },
      tableData: [],
      saveSendData: {}
    }
  },
  computed: {

  },
  methods: {
    addCustomerPayManage: function() {
      this.$router.push({ path: "/businessManage/customerManage/customerPayManageAll/customerPayManageEditAdd" });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'customerStation') {
        this.$router.push({ path: "/businessManage/customerManage/stationManageAll" });
      } else if (targetName.name == 'customerManage') {
        this.$router.push({ path: "/businessManage/customerManage/customerManageAll" });
      }
    },
    searchList: function() {
      var vm = this;
      var sendData = this.pbFunc.deepcopy(this.seachListParam);
      sendData[this.fifterParam.field] = this.fifterParam.keyword;
      vm.pageLoading = true;
      if (vm.pageStatus) {
        sendData = this.saveSendData;
        sendData.page = vm.pageData.currentPage;
      } else {
        this.saveSendData = sendData;
        sendData.page = 1;
      }
      sendData.pageSize = vm.pageData.pageSize;
      this.$$http('searchCustomerPayList', sendData).then(function(result) {
        var resultData;
        vm.pageStatus = false;
        if (result.data.code == 0) {
          vm.tableData = result.data.data.data;
          vm.tableData.forEach(Titem => {
            Titem.customerTitle = "";
            Titem.saleManTitle = "";
            if (Titem.consumer && Titem.consumer.length > 0) {
              Titem.consumer.forEach(Citem => {
                Titem.customerTitle += Citem.consumer_name + ",";
                Titem.saleManTitle += Citem.sale_man_name + ",";
                Titem.customerShortTitle+=Citem.short_name+",";
              });
            }
          });
          vm.pageData.totalPage = Math.ceil(result.data.data.count / vm.pageData.pageSize);
          vm.pageLoading = false;
        }
      }).catch(function(error) {
        vm.pageLoading = false;
      });
    },
    exportList: function() {

    },
    jumpPage: function(scope) {
      if (scope.operator == "show") {
        this.$router.push({ path: "/businessManage/customerManage/customerPayManageAll/customerPayManageDetalis?customerPayId=" + scope.rowData.id });
      } else if (scope.operator == "operation") {

      }
    },
    pageChange: function() {
      setTimeout(() => {
        this.pageStatus = true;
        this.searchList();
      });
    }
  },
  created() {

  },
  mounted: function() {
    this.searchList();
  },
  activated: function() {
    this.activeName = 'customerManage';
  },
};

</script>
