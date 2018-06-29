<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="客户管理" name="customerManage">
        </el-tab-pane>
        <el-tab-pane label="客户站点" name="stationManage">
          <div class="tab-screen">
            <div class="nav-tab-setting">
              <el-tabs v-model="childActiveName" type="card" @tab-click="clickChildtabs">
                <el-tab-pane label="列表" name="statationList">
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
                      <el-row :gutter="10">
                        <el-col :span="6">
                          <el-form-item label="客户名称:">
                            <el-select v-model="searchFilters.consumer_name" multiple filterable remote reserve-keyword @change="startSearch" placeholder="请输入选择" :remote-method="customerSearch" :loading="loading">
                              <el-option v-for="(item,key) in customerSearchList" :key="item.id" :label="item.consumer_name" :value="item.id"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div class="table-list mt-25" v-loading="pageLoading">
                      <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
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
                      <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
                      </el-pagination>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="地图" name="statationMap">
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'stationManageList',
  components: {

  },
  data() {

    return {
      activeName: 'stationManage',
      childActiveName: 'statationList',
      loading:false,
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      searachPostData: {}, //搜索参数
      searchFilters: {
        consumer_name: '',
        keyword: '',
        field: 'station_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'station_name', value: '站点名称' }
        ],
        consumerSelect: []
      },
      thTableList: [{
        title: '站点名称',
        param: 'station_name',
        width: ''
      }, {
        title: '实际站点名称',
        param: 'supplier_name',
        width: ''
      }, {
        title: '站点类型',
        param: 'actual_fluid_name',
        width: ''
      }, {
        title: '所属客户',
        param: 'consumer_name',
        width: ''
      }, {
        title: '联系人',
        param: 'coordinate',
        width: ''
      }, {
        title: '联系电话',
        param: 'created_timestamp',
        width: ''
      }, {
        title: '地址',
        param: 'address',
        width: '250'
      }, {
        title: '状态',
        param: 'coordinate',
        width: ''
      }],
      tableData: [],
      customerSearchList:[]
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
    clicktabs: function() {

    },
    clickChildtabs: function() {

    },
    customerSearch(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.customerSearchList = this.selectData.consumerSelect.filter(item => {
            console.log('item',item)
            return item.consumer_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.customerSearchList = [];
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searachPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    customerList: function() {
      let postData = {
        page: 1,
        page_size: 100,
        consumer_name: ''
      }
      this.$$http('searchCustomerList', postData).then(function(result) {
        if (result.data && result.data.code == 0) {
          selectData.consumerSelect = result.data.data.data;
        }
      }).catch(function(error) {});
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      };
      postData[this.searachPostData.field] = this.searachPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getStationList', postData).then((results) => {
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
    this.customerList();
  }
};

</script>
<style scoped lang="less">


</style>
