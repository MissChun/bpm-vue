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
    </el-form>
    <div class="table-list mt-25" v-loading="pageLoading">
      <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="jumpPage({operator:'show',rowData:scope.row})">编辑</el-button>
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
</template>
<script>
export default {
  name: 'fluidsList',
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      searachPostData: {}, //搜索参数
      searchFilters: {
        carrier_type: '',
        keyword: '',
        field: 'supplier_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'supplier_name', value: '供应商名称' },
          { id: 'supplier_short_name', value: '液厂名称' }
        ]
      },
      thTableList: [{
        title: '液厂名称',
        param: 'fluid_name',
        width: ''
      }, {
        title: '所属供应商',
        param: 'supplier_name',
        width: ''
      }, {
        title: '实际液厂名称',
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
    };
  },
  computed: {

  },
  methods: {
    startSearch() {
      this.pageData.currentPage = 1;
      this.searachPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      };
      postData[this.searachPostData.field] = this.searachPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getFluidsList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;

          this.pageData.totalCount = results.data.data.count;

          console.log('this.tableData', this.tableData, this.pageData.totalCount);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
  },
  created() {
    this.getList();
  },

};

</script>
