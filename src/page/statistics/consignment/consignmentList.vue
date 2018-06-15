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
              <el-form-item label="实际装车时间:" label-width="105px">
                <el-date-picker v-model="leaveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际离站时间:" label-width="105px">
                <el-date-picker v-model="activeTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否对账:">
                <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.isReconciliationsSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="20" class="total-data">
            一共{{tableData.waybill?tableData.waybill:0}}单，销售总额{{tableData.waiting_charg?tableData.waiting_charg:0}}元
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableData.data?tableData.data.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading">
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
              <div>{{scope.row.waiting_charges}}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否对账" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.is_reconciliation.verbose}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
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
  name: 'salesList',
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
      leaveTime: [], //实际离站时间
      activeTime: [], //实际装车时间
      searchFilters: {
        is_reconciliation: [],
        keyword: '',
        field: 'waybill',
      },
      selectData: {
        isReconciliationsSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '未对账' },
          { id: 'finished', value: '已对账' }
        ],
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'carrier', value: '承运商' },
          { id: 'consumer_name', value: '客户名称' },
          { id: 'plate_number', value: '车号' }
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
        title: '承运商',
        param: 'carrier',
        width: '200'
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '实际液厂',
        param: 'fluid',
        width: ''
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '计划装车时间',
        param: 'plan_loading_time',
        width: '180'
      }, {
        title: '实际装车时间',
        param: 'active_time',
        width: '180'
      }, {
        title: '实际离站时间',
        param: 'leave_time',
        width: '180'
      }, {
        title: '装车吨位',
        param: 'plan_tonnage',
        width: ''
      }, {
        title: '实收吨位',
        param: 'actual_quantity',
        width: ''
      }, {
        title: '亏吨',
        param: 'deficiency',
        width: ''
      }, {
        title: '核算吨位',
        param: 'check_quantity',
        width: ''
      }, {
        title: '标准里程',
        param: 'stand_mile',
        width: ''
      }, {
        title: '起步价',
        param: 'initial_price',
        width: ''
      }, {
        title: '标准运费',
        param: 'freight_value',
        width: ''
      }, {
        title: '气差金额',
        param: 'difference_value',
        width: ''
      }, {
        title: '卸车待时金额',
        param: 'waiting_price',
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
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        this.$router.push({ path: `/statistics/consignment/consignmentWaybillDetail/${row.waybill_id}` });
      } else if (tpye === 'business_order') {
        this.$router.push({ path: `/statistics/consignment/consignmentBusinessDetail/`, query: { id: row.business_order_id } });
      } else if (tpye === 'edit') {
        this.$router.push({ path: `/statistics/consignment/editConsignment/`, query: { id: row.id } });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.getList(this.statusActive);

    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        is_reconciliation: this.searchFilters.is_reconciliation
      };
      if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
        postData.leave_time_start = this.leaveTime[0] + ' 00:00:00';
        postData.leave_time_end = this.leaveTime[1] + ' 23:59:59';
      }
      if (this.activeTime instanceof Array && this.activeTime.length > 0) {
        postData.active_time_start = this.activeTime[0] + ' 00:00:00';
        postData.active_time_end = this.activeTime[1] + ' 23:59:59';
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getConsignmentStatisticsList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;

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
