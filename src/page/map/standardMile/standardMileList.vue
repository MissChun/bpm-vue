<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="列表" name="first">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.position_type" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain>导入</el-button> -->
            <!-- <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="addStandardMile">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
              </el-table-column>
              <el-table-column label="启用状态" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.is_active"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next,jumper" :total="totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'standardMileList',
  computed: {

  },
  data() {
    return {
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      pageLoading: false,
      activeName: 'first',
      tableData: [],
      thTableList: [{
        title: '液厂名称',
        param: 'fluid_factory.fluid_name',
        width: ''
      }, {
        title: '液厂详细地址',
        param: 'fluid_factory.address',
        width: ''
      }, {
        title: '站点名称',
        param: 'fluid_site.position_name',
        width: ''
      }, {
        title: '站点详细地址',
        param: 'fluid_site.address',
        width: ''
      }, {
        title: '标准里程',
        param: 'standard_mileage',
        width: ''
      }],
      selectData: {
        fieldSelect: [{
          value: '液厂名称',
          id: '1'
        }, {
          value: '站点名称',
          id: '2'
        }],
      },
      searchFilters: {
        keyword: '',
        position_type: '1',
      }
    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    pageChange: function() {
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
      };
      //postData[this.searchFilters.field] = this.searchFilters.keyword;
      this.pageLoading = true;
      this.$$http('getStandardMileList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    addStandardMile: function() {
      this.$router.push({ path: '/mapManage/standardMile/editStandardMile' });
    },
    handleMenuClick: function(command) {
      if (command.operator === 'check') {
        this.$router.push({ path: `/mapManage/standardMile/standardMileDetail/${command.id}` });
      }
    }
  },
  created: function() {
    this.getList();
  },
}

</script>
