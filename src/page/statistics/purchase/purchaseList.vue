<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div>
    <div class="nav-tab">
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
              <el-form-item label="计划装车时间:" label-width="105px">
                <el-date-picker v-model="planArriveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="20" class="total-data">
            一共0单，实际装车吨位0吨，采购总额0元，优惠总额0元
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'">
                <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                <span class="text-blue" v-on:click="handleMenuClick({operator:'check',id:scope.row.id})">{{scope.row.waybill}}</span>
              </div>
              <div v-else>{{scope.row[item.param]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleMenuClick({operator:'edit',id:scope.row.id})">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'purchaseList',
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
      statusActive: 'create_manager_check',
      planArriveTime: [], //计划到站时间
      createdAt: [], //下计划日期
      searchFilters: {
        plan_arrive_time: [],
        created_at: '',
        keyword: '',
        field: 'waybill',
      },

      statusTabList: [{
        title: '经理审批中',
        key: 'create_manager_check',
      }, {
        title: '部门审批中',
        key: 'create_department_check',
      }],
      selectData: {
        isBindSelect: [
          { id: '', value: '全部' },
          { id: false, value: '未绑定' },
          { id: true, value: '已绑定' }
        ],
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'supplier', value: '供应商' },
          { id: 'plate_number', value: '车号' },
        ]
      },
      thTableList: [{
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '供应商',
        param: 'supplier',
        width: ''
      }, {
        title: '液厂',
        param: 'fluid',
        width: ''
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '实际装车时间',
        param: 'active_time',
        width: ''
      }, {
        title: '实际装车吨位（吨）',
        param: 'active_tonnage',
        width: ''
      }, {
        title: '采购单价（元）',
        param: 'unit_price',
        width: ''
      }, {
        title: '业务优惠（元）',
        param: 'business_price',
        width: ''
      }, {
        title: '优惠单价（元）',
        param: 'discount_price',
        width: ''
      }, {
        title: '采购总额',
        param: 'unit_sum_price',
        width: ''
      }, {
        title: '优惠总额',
        param: 'discounts_sum_price',
        width: ''
      }],
      tableData: []
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    handleMenuClick(row){
      if(row.operator === 'check'){
        this.$router.push({ path: `/statistics/purchase/purchaseDetail/${row.id}` });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.getList(this.statusActive);

    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      };
      if (this.planArriveTime instanceof Array && this.planArriveTime.length > 0) {
        postData.plan_arrive_time_start = this.planArriveTime[0] + ' 00:00:00';
        postData.plan_arrive_time_end = this.planArriveTime[1] + ' 23:59:59';
      }
      if (this.createdAt instanceof Array && this.createdAt.length > 0) {
        postData.created_at_start = this.createdAt[0] + ' 00:00:00';
        postData.created_at_end = this.createdAt[1] + ' 23:59:59';
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getPurchaseStatisticsList', postData).then((results) => {
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
