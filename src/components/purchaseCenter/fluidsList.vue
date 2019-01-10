<!-- fluidsList.vue -->
<style scoped lang="less">
</style>
<template>
  <div>
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
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="供应商名称:" label-width="105px">
            <el-select v-model="searchFilters.supplier" clearable filterable remote :loading="getSupplierLoading" @change="startSearch" placeholder="请输入选择供应商" :remote-method="searchSupplierList">
              <el-option v-for="(item,key) in supplierList" :key="key" :label="item.supplier_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="operation-btn text-right">
      <el-button type="success" @click="addFluids">新增</el-button>
    </div>
    <div class="table-list mt-25" v-loading="pageLoading">
      <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="jumpPage({operator:'show',rowData:scope.row})">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <no-data v-if="!pageLoading && !tableData.length"></no-data>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fluidsList',
  data() {
    return {
      getSupplierLoading: false,
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      searachPostData: {}, //搜索参数
      searchFilters: {
        supplier: '',
        keyword: '',
        field: 'fluid_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'fluid_name', value: '供方液厂名称' },
          { id: 'fluid', value: '液厂' }
        ]
      },
      thTableList: [{
        title: '供方液厂名称',
        param: 'fluid_name',
        width: ''
      }, {
        title: '所属供应商',
        param: 'supplier_name',
        width: ''
      }, {
        title: '液厂',
        param: 'actual_fluid_name',
        width: ''
      }, {
        title: '气种',
        param: 'fluid_type',
        width: ''
      }, {
        title: '地址',
        param: 'coordinate',
        width: '250'
      }],
      tableData: [],
      supplierList: []
    };
  },
  computed: {

  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      });
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searachPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    searchSupplierList: function(query) {
      let postData = {
        page_size: 100,
        page: 1,
      }
      if (query) {
        postData.supplier_name = query;
      }
      this.getSupplierLoading = true;
      this.$$http('searchSupplierList', postData).then((result) => {
        this.getSupplierLoading = false;
        if (result.data.code == 0) {
          this.supplierList = result.data.data.data;
        }
      }).catch((error) => {
        this.getSupplierLoading = false;
      });
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        supplier: this.searachPostData.supplier
      };
      postData[this.searachPostData.field] = this.searachPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getFluidsList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;

          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    jumpPage(row) {

      // this.$router.push({
      //   path: '/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsEditAdd',
      //   query: {
      //     id: row.rowData.id,
      //   }
      // })

      window.open(`#/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsEditAdd?id=${row.rowData.id}`, '_blank')
    },
    addFluids() {
      // this.$router.push({
      //   path: '/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsEditAdd',
      // })
      window.open(`#/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsEditAdd`, '_blank')
    }
  },
  created() {
    this.getList();
    this.searchSupplierList();
  },

};

</script>
