<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="运费约定" name="freight">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="30">
                <el-col :span="6">
                  <el-form-item label="承运商:">
                    <el-select v-model="searchFilters.agreements__carrier " @change="startSearch" filterable placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.carrierSelect" :key="key" :label="item.carrier_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="液厂:">
                    <el-select v-model="searchFilters.agreements__fluid" filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.liquidSelect" :key="key" :label="item.actual_fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="success" @click="addPerson">新增</el-button> -->
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :width="item.width?item.width:140" :label="item.title">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :page-count="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="标准里程" name="mileage"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'freightDataList',
  computed: {
    employmentTypeSelect: function() {
      console.log('this.$store.getters.getIncludeAllSelect', this.$store.state.common.selectData.carrier_driver_work_type);
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'freight',
      searchFilters: {
        agreements__carrier: '',
        agreements__fluid: '',
        // keyword: '',
        // field: 'name',
      },
      selectData: {
        carrierSelect: [], //承运商
        liquidSelect: [] //液厂
      },
      thTableList: [{
        title: '起点里程',
        param: 'name',
        width: ''
      }, {
        title: '终点里程',
        param: 'contact_name',
        width: ''
      }, {
        title: '起步价（元/吨）',
        param: 'contact_phone',
        width: ''
      }, {
        title: '变动费率（元/吨/公里）',
        param: 'detail_address',
        width: '200'
      }, {
        title: '生效承运商',
        param: 'deficiency_standard',
        width: ''
      }, {
        title: '生效液厂',
        param: 'created_at',
        width: ''
      }, {
        title: '生效时间',
        param: 'detail_address',
        width: ''
      }, {
        title: '失效时间',
        param: 'deficiency_standard',
        width: ''
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }],
      tableData: []
    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        // agreements__carrier: this.searchFilters.agreements__carrier,
        // agreements__fluid: this.searchFilters.agreements__fluid
      };

      // postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getFreightList', postData).then((results) => {
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
    getCarrierList: function() {
      let postData = {
        need_all: true
      };

      this.$$http('getCarrierList', postData).then((results) => {
        console.log('results', results.data.data);
        if (results.data && results.data.code == 0) {
          this.selectData.carrierSelect = results.data.data;
        }
      }).catch((err) => {})

    },
    getFluidList: function() {
      let postData = {
        need_all: true
      };

      this.$$http('getFluidList', postData).then((results) => {
        console.log('results', results.data.data);
        if (results.data && results.data.code == 0) {
          this.selectData.liquidSelect = results.data.data;
        }
      }).catch((err) => {})

    },
    handleClick: function(tab, event) {
      console.log('tab', tab);
      if (tab.name === 'mileage') {
        this.$router.push({ path: "/serviceManage/standardDataManage/mileageDataList" });
      }
    },
    handleMenuClick: function(command) {
      this.$router.push({ path: "/serviceManage/standardDataManage/freightDetail", query: { id: command.id, carrier: 'b57461f6-b221-4620-bc06-304ef3ccac91', fluid: 'fc7fc26a-2de5-40ee-a96c-54c8432fff85' } });
    },

    pageChange: function() {
      setTimeout(() => {
        console.log('currentPage', this.pageData.currentPage);
        this.getList();
      })
    }
  },
  activated() {
    this.activeName = 'freight'
  },
  created: function() {
    this.getList();
    this.getCarrierList();
    this.getFluidList();
  }
}

</script>
