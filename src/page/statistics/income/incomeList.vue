<style type="text/css" scoped lang="less">
/deep/ .total-data {
  line-height: 40px;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <div class="tab-screen border-top">
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
              <el-form-item label="实际装车时间:" label-width="105px">
                <el-date-picker v-model="activeTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际离站时间:" label-width="105px">
                <el-date-picker v-model="leaveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="20" class="total-data">
            一共{{tableData.waybill?tableData.waybill:0}}单，采购优惠后总额{{tableData.unit_sum_pri?tableData.unit_sum_pri:0}}元，销售待时后总额{{tableData.waiting_charg?tableData.waiting_charg:0}}元，运费合计{{tableData.summati?tableData.summati:0}}元，能源利润{{tableData.energy_prof?tableData.energy_prof:0}}元
          </el-col>
          <el-col :span="4" class="text-right">
            <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportIncomeData'"></export-button>
            <!-- <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableData.data?tableData.data.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':tableData.data&&!tableData.data.data.length}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'||item.param === 'business_order'">
                <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                <span class="text-blue" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
              </div>
              <div v-else>{{scope.row[item.param]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="运费合计" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.summation}}</div>
            </template>
          </el-table-column>
          <el-table-column label="毛利润" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.gross_profit}}</div>
            </template>
          </el-table-column>
          <el-table-column label="能源利润" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.energy_profit}}</div>
            </template>
          </el-table-column>
        </el-table>
        <no-data v-if="!pageLoading && !tableData.data.data.length"></no-data>
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
  name: 'incomeList',
  computed: {

  },

  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      exportType: {
        type: 'income',
        filename: '收入统计'
      },
      leaveTime: [], //实际离站时间
      activeTime: [], //实际装车时间
      searchPostData: {}, //搜索参数
      searchFilters: {
        is_reconciliation: [],
        keyword: '',
        field: 'waybill',
      },
      selectData: {
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'supplier', value: '供应商' },
          { id: 'consumer_name', value: '客户名称' },
          { id: 'carrier', value: '承运商' }
        ]
      },
      thTableList: [{
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '业务单号',
        param: 'business_order',
        width: ''
      }, {
        title: '供应商',
        param: 'supplier',
        width: ''
      }, {
        title: '客户名称',
        param: 'consumer_name',
        width: ''
      }, {
        title: '承运商',
        param: 'carrier',
        width: '200'
      }, {
        title: '实际液厂',
        param: 'fluid',
        width: ''
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '实际装车时间',
        param: 'active_time',
        width: '180'
      }, {
        title: '实际离站时间',
        param: 'leave_time',
        width: '180'
      }, {
        title: '采购优惠后总额',
        param: 'unit_sum_price',
        width: ''
      }, {
        title: '销售待时后总额',
        param: 'waiting_charges',
        width: ''
      }],
      tableData: [],
      exportPostData: {}, //导出筛选
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        this.$router.push({ path: `/statistics/income/incomeWaybillDetail/${row.waybill_id}/${row.business_order_id}` });
      } else if (tpye === 'business_order') {
        this.$router.push({ path: `/statistics/income/incomeBusinessDetail/`, query: { id: row.business_order_id } });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList(this.statusActive);

    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        is_reconciliation: this.searchPostData.is_reconciliation
      };
      if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
        postData.leave_time_start = this.leaveTime[0];
        postData.leave_time_end = this.leaveTime[1];
      }
      if (this.activeTime instanceof Array && this.activeTime.length > 0) {
        postData.active_time_start = this.activeTime[0];
        postData.active_time_end = this.activeTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.$$http('getIncomeStatisticsList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          this.pageData.totalCount = results.data.data.count;
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
