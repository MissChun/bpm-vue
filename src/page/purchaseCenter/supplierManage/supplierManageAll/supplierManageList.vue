<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="供应商管理" name="supplierManage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="fifterParam.keyword" class="search-filters-screen" @keyup.native.13="pageChange">
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
        <el-tab-pane label="供应商液厂" name="supplierFluids">
        </el-tab-pane>
      </el-tabs>
      <div class="operation-btn text-right">
        <el-button type="primary" @click="exportList">导出</el-button>
        <el-button type="success" @click="addSupplierManage">新增</el-button>
      </div>
      <div class="table-list" v-loading="pageLoading">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
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
  name: 'supplierManageList',
  data() {
    return {
      activeName: "supplierManage",
      fifterParam: {
        keyword: "",
        field: "supplier_name",
      },
      thTableList: [{
        title: '供应商名称',
        param: 'supplier_name',
        width: ''
      }, {
        title: '供应商简称',
        param: 'supplier_short_name',
        width: ''
      }, {
        title: '联系人',
        param: 'contact',
        width: ''
      }, {
        title: '联系电话',
        param: 'contact_phone',
        width: ''
      }, {
        title: '合同类型',
        param: 'supplier_type.verbose',
        width: '250'
      }, {
        title: '所在地区',
        param: 'address',
        width: ''
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }],
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
          { id: 'supplier_name', value: '供应商名称' },
          { id: 'supplier_short_name', value: '供应商简称' },
          { id: 'contact_phone', value: '联系电话' },
        ]
      },
      tableData: [],
      saveSendData: {}
    }
  },
  computed: {

  },
  methods: {
    addSupplierManage: function() {
      this.$router.push({ path: "/purchaseCenter/supplierManage/supplierManageAll/supplierManageEditAdd" });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'supplierFluids') {
        this.$router.push({ path: "/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsList" });
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
      sendData.pageSize = 10;
      this.$$http('searchSupplierList', sendData).then(function(result) {
        var resultData;
        vm.pageStatus = false;
        if (result.data.code == 0) {
          vm.tableData = result.data.data.data;
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
        this.$router.push({ path: "/purchaseCenter/supplierManage/supplierManageAll/supplierManageDetalis?supplierId=" + scope.rowData.id });
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
    this.activeName = 'supplierManage';
  },
};

</script>
