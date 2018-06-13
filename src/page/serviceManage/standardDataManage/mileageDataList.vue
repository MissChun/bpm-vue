<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="运费约定" name="freight">
        </el-tab-pane>
        <el-tab-pane label="标准里程" name="mileage">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="30">
                <el-col :span="6">
                  <el-form-item label="承运商:">
                    <el-select v-model="searchFilters.carriers" @change="startSearch" filterable placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.carrierSelect" :key="key" :label="item.carrier_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="液厂:">
                    <el-select v-model="searchFilters.fluid" filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.liquidSelect" :key="key" :label="item.actual_fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="站点:">
                    <el-select v-model="searchFilters.station" filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.siteSelect" :key="key" :label="item.station_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="editMile">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                <template slot-scope="scope">
                  <div v-if="item.param_two">{{scope.row[item.param][item.param_two]}}</div>
                  <div v-else>
                    <span v-if="item.param==='carriers'" :title="scope.row.carriersList">
                      <span v-for="(row,key) in scope.row.carriers" v-if="key<5" class="text-blue">{{row.carrier_name}}<br></span>
                    </span>
                    <span v-else>{{scope.row[item.param]}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
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
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mileageDataList',
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
      activeName: 'mileage',
      searchFilters: {
        fluid: '',
        station: '',
        carriers: '',
        field: '',
      },
      selectData: {
        carrierSelect: [{
          id: '',
          carrier_name: '全部'
        }], //承运商
        liquidSelect: [{
          id: '',
          actual_fluid_name: '全部'
        }], //液厂
        siteSelect: [{
          id: '',
          station_name: '全部'
        }], //站点
      },
      thTableList: [{
        title: '液厂',
        param: 'actual_fluid_name',
        width: ''
      }, {
        title: '站点',
        param: 'station_name',
        width: ''
      }, {
        title: '标准里程',
        param: 'mile',
        width: ''
      }, {
        title: '生效承运商',
        param: 'carriers',
        width: '200'
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }, {
        title: '启用状态',
        param: 'is_active',
        param_two: 'verbose',
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
        fluid: this.searchFilters.fluid,
        station: this.searchFilters.station,
        carriers: this.searchFilters.carriers
      };
      postData = this.pbFunc.fifterObjIsNull(postData);

      // postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getStandardMileList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          for (let i in this.tableData) {
            this.tableData[i].carriersList = '';
            for (let j in this.tableData[i].carriers) {
              this.tableData[i].carriersList += this.tableData[i].carriers[j].carrier_name + (j < this.tableData[i].carriers.length-1 ? '，' : '')
            }
          }

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
          this.selectData.carrierSelect = this.selectData.carrierSelect.concat(results.data.data);
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
          this.selectData.liquidSelect = this.selectData.liquidSelect.concat(results.data.data);
        }
      }).catch((err) => {})

    },
    getSiteList: function() {
      let postData = {
        need_all: true
      };

      this.$$http('getSiteList', postData).then((results) => {
        console.log('results', results.data.data);
        if (results.data && results.data.code == 0) {
          this.selectData.siteSelect = this.selectData.siteSelect.concat(results.data.data);
        }
      }).catch((err) => {})

    },
    handleClick: function(tab, event) {
      if (tab.name === 'freight') {
        this.$router.push({ path: "/serviceManage/standardDataManage/freightDataList" });
      }
    },
    handleMenuClick: function(command) {
      this.$router.push({ path: "/serviceManage/standardDataManage/mileageDetail", query: { id: command.id } });
    },
    editMile(isEdit) {
      // if(isEdit){

      // }else{
      this.$router.push({ path: "/serviceManage/standardDataManage/editMileage" });
      // }

    },
    pageChange: function() {
      setTimeout(() => {
        console.log('currentPage', this.pageData.currentPage);
        this.getList();
      })
    }
  },
  activated() {
    this.activeName = 'mileage'
  },
  created: function() {
    this.getList();
    this.getCarrierList();
    this.getFluidList();
    this.getSiteList();
  }
}

</script>
