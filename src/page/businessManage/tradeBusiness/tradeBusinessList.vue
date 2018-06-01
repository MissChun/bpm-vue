<!-- tradeBusiness.vue -->
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in tabList" :label="item.title" :name="item.key" :key="index">
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
                <el-col :span="8">
                  <el-form-item label="计划到站日期:" label-width="105px">
                    <el-date-picker v-model="planArriveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下计划日期:" label-width="105px">
                    <el-date-picker v-model="createdAt" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain>导入</el-button> -->
            <!-- <el-button type="primary">导出</el-button> -->
            <!-- <el-button type="success">新增</el-button> -->
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <div class="nav-tab-setting">
        <el-tabs v-model="statusActive" @tab-click="statusClick">
          <el-tab-pane v-for="(tab,key) in statusTabList" :key="key" :label="tab.title" :name="tab.key">
            <div class="table-list">
              <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                  <template slot-scope="scope">
                    <div v-if="item.param === 'order_number'" class="order-color">
                      <router-link :to="{path: '/businessManage/tradeBusiness/businessDetail', query: { id: scope.row.id }}">{{scope.row.order_number}}</router-link>
                    </div>
                    <div v-else>{{scope.row[item.param]}}</div>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="操作" align="center" width="150" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
            <div class="page-list text-center">
              <el-pagination background layout="prev, pager, next" :page-count="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    // statusTabList(){
    //   return this.tabList[0].tabs;
    // }
  },

  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'add',
      statusActive: 'waiting_manager_check',
      planArriveTime: [], //计划到站时间
      createdAt: [], //下计划日期
      searchFilters: {
        plan_arrive_time: [],
        created_at: '',
        keyword: '',
        field: 'customer_name',
      },
      tabList: [{
        title: '新增',
        key: 'add',
        tabs: [{
          title: '经理审批中',
          key: 'waiting_manager_check',
        }, {
          title: '部门审批中',
          key: 'waiting_department_check',
        }]
      }, {
        title: '关联',
        key: 'relation',
        tabs: [{
          title: '待关联',
          key: 'waiting_related',
        }, {
          title: '待确认',
          key: 'waiting_confirm',
        }]
      }, {
        title: '卸货',
        key: 'unloading',
        tabs: [{
          title: '前往卸货地',
          key: 'to_site',
        }, {
          title: '已卸货',
          key: 'unloading',
        }]
      }, {
        title: '结算',
        key: 'settlement',
        tabs: [{
          title: '结算中',
          key: 'in_settlement',
        }, {
          title: '结算审批中',
          key: 'settlement_check',
        }]
      }, {
        title: '修改/取消',
        key: 'reviseAndCancel',
        tabs: [{
          title: '修改经理审批',
          key: 'to_site',
        }, {
          title: '修改部门审批',
          key: 'unloading',
        }, {
          title: '取消部门审批',
          key: 'unloading',
        }]
      }, {
        title: '历史',
        key: 'history',
        tabs: [{
          title: '已取消',
          key: 'canceled',
        }, {
          title: '已完成',
          key: 'finished',
        }]
      }],
      statusTabList: [{
        title: '经理审批中',
        key: 'waiting_manager_check',
      }, {
        title: '部门审批中',
        key: 'waiting_department_check',
      }],
      selectData: {
        isBindSelect: [
          { id: '', value: '全部' },
          { id: false, value: '未绑定' },
          { id: true, value: '已绑定' }
        ],
        fieldSelect: [
          { id: 'customer_name', value: '客户名称' },
          { id: 'short_name', value: '客户简称' },
          { id: 'order_number', value: '业务单号' },
          { id: 'mobile_phone', value: '供应商' },
        ]
      },
      thTableList: [{
        title: '业务单号',
        param: 'order_number',
        width: ''
      }, {
        title: '业务单类',
        param: 'business_type_name',
        width: ''
      }, {
        title: '供应商',
        param: 'mobile_phone',
        width: ''
      }, {
        title: '承运商',
        param: 'bind_tractors.plate_number',
        width: ''
      }, {
        title: '客户',
        param: 'customer_name',
        width: ''
      }, {
        title: '客户简称',
        param: 'short_name',
        width: ''
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '站点类型',
        param: 'station_type',
        width: ''
      }, {
        title: '实际液厂',
        param: 'actual_fluid',
        width: ''
      }, {
        title: '计划吨位',
        param: 'plan_tonnage',
        width: ''
      }, {
        title: '单价',
        param: 'unit_price',
        width: ''
      }, {
        title: '计划到站时间',
        param: 'plan_arrive_time',
        width: '200'
      }, {
        title: '下计划时间',
        param: 'created_at',
        width: '200'
      }, {
        title: '状态',
        param: 'status_display',
        width: ''
      }, {
        title: '业务员',
        param: 'sale_name',
        width: ''
      }],
      tableData: []
    }
  },
  methods: {

    handleClick: function(tab, event) {
      console.log('tabhandleClick', tab);
      for (let i in this.tabList) {
        if (this.tabList[i].key === tab.name) {
          this.statusTabList = this.tabList[i].tabs;
          this.statusActive = this.statusTabList[0].key;
        }
      }
      this.getList(this.statusActive);
      console.log('tabs', this.statusTabList)
    },
    statusClick(tab, event) {
      this.statusActive = tab.name;
      this.getList(this.statusActive);
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.getList(this.statusActive);
    },
    getList(status) {
      let postData = {
        page: this.pageData.currentPage,
        // status: status
      };
      if (this.planArriveTime instanceof Array&&this.planArriveTime.length > 0) {
        postData.plan_arrive_time_start = this.planArriveTime[0] + ' 00:00:00';
        postData.plan_arrive_time_end = this.planArriveTime[1] + ' 23:59:59';
      }
      if (this.createdAt instanceof Array&&this.createdAt.length > 0) {
        postData.created_at_start = this.createdAt[0] + ' 00:00:00';
        postData.created_at_end = this.createdAt[1] + ' 23:59:59';
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getBusinessList', postData).then((results) => {
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

    }
  },
  created() {
    this.getList(this.statusActive);
  }

}

</script>
<style>


</style>
