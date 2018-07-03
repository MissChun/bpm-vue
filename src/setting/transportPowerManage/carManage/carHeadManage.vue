<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="牵引车管理" name="first">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="seachListParam" status-icon ref="seachHeadCarListFrom" :rules="rules">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" size="mini" v-model="fifterParam.keyword" class="search-filters-screen">
                    <el-select size="mini" v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item label="品牌型号:" size="mini">
                    <el-input placeholder="请输入" type="num" v-model="fifterParam.brand"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="挂车管理" name="second">
        </el-tab-pane>
      </el-tabs>
      <div class="operation-btn text-right">
        <!-- <el-button type="primary" @click="importList">导入</el-button> -->
        <!-- <el-button type="primary" @click="exportList">导出</el-button> -->
        <el-button type="primary" @click="addHeadCarPage">新增</el-button>
      </div>
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">查看</el-button>
              <el-dropdown trigger="click" @command="jumpPage">
                <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{operator:'show',rowData:scope.row}">查看</el-dropdown-item>
                  <el-dropdown-item :command="{operator:'operation',rowData:scope.row}">操作日志</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'carHeadManage',
  data() {
    return {
      fifterParam: {
        keyword: "",
        field: "",
      },
      seachListParam: {
        plate_number: '',
        vin_number: '',
        brand: '',
        page: 1
      },
      rules: {},
      activeName: 'first',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      thTableList: [{
        title: '牵引车车牌号',
        param: 'plate_number',
        width: ''
      }, {
        title: '车架号',
        param: 'vin_number',
        width: ''
      }, {
        title: '车辆归属',
        param: 'attributes.verbose',
        width: ''
      }, {
        title: '车辆所属',
        param: 'carrier.name',
        width: ''
      }, {
        title: '车辆类型',
        param: 'vehicle_type.verbose',
        width: '250'
      }, {
        title: '品牌型号',
        param: 'brand',
        width: ''
      }],
      selectData: {
        vehicle_type_Select: this.$store.state.common.selectData.truck_attributes,
        brand_Select: this.$store.state.common.selectData.semitrailer_vehicle_type,
        fieldSelect: [
          { id: 'plate_number', value: '挂车牌' },
          { id: 'vin_number', value: '车架号' },
        ]
      },
      tableData: [],
    }
  },

  methods: {
    addHeadCarPage: function() {
      this.$router.push({ path: "/transportPowerManage/carManage/addEditCarHeadManage" });
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: "/transportPowerManage/carManage/carTailManage" });
      }
    },
    importList: function() {

    },
    exportList: function() {

    },
    searchList: function() {
      var vm = this;
      if (this.seachListParam[this.fifterParam.field]) {
        this.seachListParam[this.fifterParam.field] = this.fifterParam.keyword;
      }
      this.$$http('searchHeadCarList', this.seachListParam).then(function(result) {
        var resultData;
        if (result.data.code == 0) {
          vm.tableData = result.data.data.results;
          vm.pageData.totalPage = Math.ceil(result.data.count / vm.pageData.pageSize);
          vm.pageLoading = false;
        }
      }).catch(function(error) {
        vm.pageLoading = false;
      });
    },
    jumpPage: function(scope) {
      if (scope.operator == "edit") {

      } else if (scope.operator == "show") {
        this.$router.push({ path: "/transportPowerManage/carManage/showCarHeadManage?headId=" + scope.rowData.id });
      } else if (scope.operator == "operation") {

      }
    },
    pageChange: function() {
      this.seachListParam.page = this.pageData.currentPage;
      this.searchList();
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  mounted: function() {
    this.searchList();
  }
}

</script>
