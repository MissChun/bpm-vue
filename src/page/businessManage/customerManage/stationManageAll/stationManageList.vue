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
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="客户名称:">
                            <el-select v-model="searchFilters.consumer_id" filterable remote clearable @change="startSearch" placeholder="请输入选择" :remote-method="customerList" :loading="loading">
                              <el-option v-for="(item,key) in customerSearchList" :key="key" :label="item.consumer_name" :value="item.id"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="状态:">
                            <el-select v-model="searchFilters.is_active" @change="startSearch" placeholder="请输入选择">
                              <el-option v-for="(item,key) in selectData.isActiveSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div class="operation-btn text-right">
                      <el-button type="success" @click="addSite">新增</el-button>
                    </div>
                    <div class="table-list mt-25" v-loading="pageLoading">
                      <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                        <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:''">
                          <template slot-scope="scope">
                            <div v-if="item.param==='is_active'">{{scope.row.is_active?'已启用':'未启用'}}</div>
                            <div v-if="item.param==='addresss'">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</div>
                            <div v-if="item.param!=='addresss'&&item.param!=='is_active'">{{scope.row[item.param]}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="150" fixed="right">
                          <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">编辑</el-button>
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
        <el-tab-pane label="客户付款方管理" name="customerPayManage"></el-tab-pane>
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
      loading: false,
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      searachPostData: {}, //搜索参数
      searchFilters: {
        consumer_id: '',
        is_active: '',
        keyword: '',
        field: 'station_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'station_name', value: '站点名称' }
        ],
        isActiveSelect: [
          { id: '', value: '全部' },
          { id: 'True', value: '已启用' },
          { id: 'False', value: '未启用' },
        ]
      },
      thTableList: [{
        title: '站点名称',
        param: 'station_name',
        width: ''
      }, {
        title: '实际站点名称',
        param: 'map_station_name',
        width: ''
      }, {
        title: '站点类型',
        param: 'station_type_display',
        width: ''
      }, {
        title: '所属客户',
        param: 'short_name',
        width: ''
      }, {
        title: '联系人',
        param: 'consignee',
        width: ''
      }, {
        title: '联系电话',
        param: 'consignee_phone',
        width: ''
      }, {
        title: '地址',
        param: 'addresss',
        width: '250'
      }, {
        title: '状态',
        param: 'is_active',
        width: ''
      }],
      tableData: [],
      customerSearchList: []
    };
  },
  computed: {

  },
  methods: {
    jumpPage(row) {
      console.log('row', row);

      this.$router.push({
        path: '/businessManage/customerManage/stationManageAll/stationManageEditAdd',
        query: {
          id: row.rowData.id,
        }
      })
    },
    addSite() {
      this.$router.push({
        path: '/businessManage/customerManage/stationManageAll/stationManageEditAdd',
      })
    },
    pageChange() {
      setTimeout(() => {
        this.getList();
      });
    },

    clicktabs: function(targetName) {
      if (targetName.name == 'customerManage') {
        this.$router.push({ path: "/businessManage/customerManage/customerManageAll/customerManageList" });
      }else if(targetName.name == 'customerPayManage'){
        this.$router.push({ path: "/businessManage/customerManage/customerPayManageAll" });
      }
    },
    clickChildtabs: function(targetName) {
      if (targetName.name == 'statationMap') {
        this.$router.push({ path: "/businessManage/customerManage/stationManageAll/stationManageMap" });
      }
    },
    customerList(query) {
      // if (query !== '') {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     this.customerSearchList = this.selectData.consumerSelect.filter(item => {
      //       console.log('item', item)
      //       return item.consumer_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      //     });
      //   }, 200);
      // } else {
      //   this.customerSearchList = [];
      // }
      let postData = {
        page_size: 100,
        page: 1,
      }
      if (query) {
        postData.consumer_name = query;
      }
      this.loading = true;
      this.$$http('searchCustomerList', postData).then((result) => {
        this.loading = false;
        if (result.data.code == 0) {
          this.customerSearchList = result.data.data.data;
        }
      }).catch((error) => {
        this.loading = false;
      });
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searachPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        consumer_id: this.searachPostData.consumer_id,
        is_active: this.searachPostData.is_active
      };
      postData[this.searachPostData.field] = this.searachPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      // if (this.searachPostData.is_active === true || this.searachPostData.is_active === false) {
      //   postData.is_active = this.searachPostData.is_active;
      // }

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
