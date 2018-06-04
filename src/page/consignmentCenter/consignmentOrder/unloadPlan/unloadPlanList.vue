<style scoped lang="less">
.el-table {
  /deep/ .el-table__fixed-header-wrapper tr th .el-checkbox__inner {
    display: none;
  }
  /deep/ tr td .cell {
    text-align: center;
  }
}

</style>
<template>
  <div class="tab-screen">
    <div>
      <div class="nav-tab">
        <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
          <el-tab-pane label="列表" name="first">
            <div class="tab-screen">
              <el-form class="search-filters-form" label-width="60px" :model="searchFilters" status-icon label-position="left">
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
                  <!-- <el-col :span="4">
                    <el-form-item label="状态:">
                      <el-select v-model="searchFilters.orderStateList" @change="startSearch" placeholder="请选择">
                        <el-option v-for="(item,key) in selectData.orderStateListSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="2">
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="table-list">
              <el-table :data="aa" ref="multipleTable" stripe style="width: 100%" v-loading="pageLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
              </el-table>
            </div>
            <div class="page-list text-center ">
              <el-pagination background layout="prev, pager, next " :page-count="pageData.totalPage " :page-size="pageData.pageSize " :current-page.sync="pageData.currentPage " @current-change="pageChange " v-if="!pageLoading && pageData.totalPage>1">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="轨迹地图" name="second">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      searchFilters: {
        keyword: '',
        field: '',
        orderStateList: '',
      },
      selectData: {
        fieldSelect: [{
          value: '车号',
          id: 'tractor.plate_number',
        }, {
          value: '姓名',
          id: 'master_driver.name',
        }, {
          value: '电话',
          id: 'master_driver.mobile_phone',
        }],
        orderStateListSelect: [{
          value: '车号',
          id: '1',
        }]
      },
      aa: [],
      thTableList: [{
        title: '变更',
        param: 'waybill.waybill_change_status',
        width: ''
      }, {
        title: '运单状态',
        param: 'waybill.status',
        width: ''
      }, {
        title: '运单号',
        param: 'waybill.waybill',
        width: ''
      }, {
        title: '车号',
        param: 'tractor.plate_number',
        width: ''
      }, {
        title: '挂车',
        param: 'semitrailer.plate_number',
        width: '250'
      }, {
        title: '司机',
        param: 'master_driver.name',
        width: ''
      }, {
        title: '司机电话',
        param: 'master_driver.mobile_phone',
        width: ''
      }, {
        title: '押运',
        param: 'escort_staff.name',
        width: ''
      }, {
        title: '押运电话',
        param: 'escort_staff.mobile_phone',
        width: ''
      }, {
        title: '副驾',
        param: 'vice_driver.name',
        width: ''
      }, {
        title: '副驾电话',
        param: 'vice_driver.mobile_phone',
        width: ''
      }],

    }
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    operationStatus: function() {
      return this.$route.params.type;
    }
  },
  methods: {
    pageChange: function() {
      setTimeout(() => {

      })
    }
  },
  startSearch: function() {

  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {

  }
}

</script>
