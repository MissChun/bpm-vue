<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="采购价管理" name="purchasePrice">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <el-button type="primary">导出</el-button>
            <!-- <el-button type="success" @click="addPerson">新增</el-button> -->
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" border>
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :width="item.width?item.width:140" :label="item.title">
              </el-table-column>
              <el-table-column label="操作" align="center" width="140" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="目的地设置" name="destination"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'purchasePriceList',
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      thTableList: [],
      tableData: [],
      activeName: 'purchasePrice',
      searchFilters: {
        keyword: '',
        field: 'fluid',
      },
      selectData: {
        fieldSelect: [
          { id: 'fluid', value: '液厂名称' },
          { id: 'suppliers', value: '供应商' },
        ]
      },
    };
  },
  computed: {

  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      // this.getList();
    },
    handleClick(tab, event) {
      console.log('tab', tab);
      if (tab.name === 'destination') {
        this.$router.push({ path: "/purchaseCenter/purchasePriceManage/destinationSetting/destinationSettingList" });
      }
    },
    activated() {
      this.activeName = 'purchasePrice'
    },
  },
  created() {

  }
};

</script>
