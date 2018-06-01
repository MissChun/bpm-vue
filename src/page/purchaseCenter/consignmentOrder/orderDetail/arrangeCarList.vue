<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="列表" name="first">
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
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item label="状态:">
                    <el-select v-model="searchFilters.orderStateList" @change="startSearch" size="mini" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.orderStateListSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图" name="second">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  data() {
    return {
      activeName: 'first',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: '',
        pageSize: 10,
      },
      searchFilters: {
        keyword: '',
        field: '1',
        orderStateList: '',
      },
      selectData: {
        fieldSelect: [{
          value: '车号',
          id: '1',
        }, {
          value: '姓名',
          id: '2',
        }, {
          value: '电话',
          id: '3',
        }],
        orderStateListSelect: [{
          value: '车号',
          id: '1',
        }]
      },
      thTableList: [{
        title: '变更',
        param: 'plate_number',
        width: ''
      }, {
        title: '状态',
        param: 'vin_number',
        width: ''
      }, {
        title: '提货单号',
        param: 'attributes.verbose',
        width: ''
      }, {
        title: '车号',
        param: 'carrier.name',
        width: ''
      }, {
        title: '挂车',
        param: 'vehicle_type.verbose',
        width: '250'
      }, {
        title: '司机',
        param: 'brand',
        width: ''
      }, {
        title: '司机电话',
        param: 'brand',
        width: ''
      }, {
        title: '押运',
        param: 'brand',
        width: ''
      }, {
        title: '押运电话',
        param: 'brand',
        width: ''
      }, {
        title: '副驾',
        param: 'brand',
        width: ''
      }, {
        title: '副驾电话',
        param: 'brand',
        width: ''
      }],
      tableData: [],
    }
  },

  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: "/orders/orderDetail/arrangeCarTab/arrangeCarMap" });
      }
    },
    importList: function() {

    },
    exportList: function() {

    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
      };
      this.pageLoading = true;
      this.$$http('getDriversList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;
          this.pageData.totalPage = Math.ceil(parseInt(results.data.data.count) / this.pageData.pageSize);

          console.log('this.tableData', this.tableData, this.pageData.totalPage);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    this.getList();
  }
}

</script>
