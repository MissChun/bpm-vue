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
              <el-form-item label="实际到厂时间:" label-width="105px">
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
            <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('ledger')">{{exportBtn.text}}</el-button>
            <!-- <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportLedgerData'"></export-button> -->
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableDataObj.data?tableDataObj.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" :class="{'tabal-height-500':!tableDataObj.len}">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'||item.param === 'business_order'">
                <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
              </div>
              <div v-else>
                <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]"><span>{{scope.row[item.adjustParam]}}</span></div>
                <div>{{scope.row[item.param]}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="运费合计" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div class="adjust" v-if="scope.row.waiting_charges_differ_log"><span>{{scope.row.waiting_charges_differ_log}}</span></div>
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
        <no-data v-if="!pageLoading && !tableDataObj.len"></no-data>
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
      tableDataObj: {
        len: '', //长度
        data: [], //内容
      },
      exportType: {
        type: 'ledger',
        filename: '业务台账'
      },
      leaveTime: [], //实际离站时间
      activeTime: [], //实际到厂时间
      searchPostData: {}, //搜索参数
      searchFilters: {
        is_reconciliation: [],
        keyword: '',
        field: 'plate_number',
      },
      selectData: {
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'business_order', value: '业务单' },
          { id: 'plate_number', value: '车号' },
          { id: 'fluid', value: '实际液厂' },
          { id: 'supplier', value: '供应商' },
          { id: 'station', value: '卸货地' },
          { id: 'consumer_name', value: '客户名称' },
          { id: 'payer_name', value: '付款方' },
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
        width: '',
        isAdjust: true,
        adjustParam: 'supplier_adjust'
      }, {
        title: '客户简称',
        param: 'consumer_short_name',
        width: '',
        isAdjust: true,
        adjustParam: 'short_name_adjust'
      }, {
        title: '客户名称',
        param: 'consumer_name',
        width: ''
      }, {
        title: '付款方',
        param: 'payer_name',
        width: '200',
        isAdjust: true,
        adjustParam: 'payer_name_adjust'
      }, {
        title: '承运商',
        param: 'carrier',
        width: '200',
        isAdjust: true,
        adjustParam: 'carrier_adjust'
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '实际液厂',
        param: 'fluid',
        width: ''
      }, {
        title: '实际到厂时间',
        param: 'active_time',
        width: '180'
      }, {
        title: '装车完成时间',
        param: 'work_end_time',
        width: '180'
      }, {
        title: '采购单价',
        param: 'buy_price',
        width: '',
        isAdjust: true,
        adjustParam: 'unit_price_differ'
      }, {
        title: '实际装车吨位',
        param: 'active_tonnage',
        width: '',
        isAdjust: true,
        adjustParam: 'active_tonnage_differ'
      }, {
        title: '采购优惠',
        param: 'discount_price',
        width: ''
      }, {
        title: '业务优惠',
        param: 'business_price',
        width: ''
      }, {
        title: '采购总额',
        param: 'discounts_sum_price',
        width: ''
      }, {
        title: '采购优惠后总额',
        param: 'unit_sum_price',
        width: '',
        isAdjust: true,
        adjustParam: 'discounts_sum_differ'
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '实际离站时间',
        param: 'leave_time',
        width: '180'
      }, {
        title: '销售单价',
        param: 'sale_price',
        width: '',
        isAdjust: true,
        adjustParam: 'unit_price_differ_sale'
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
        width: '',
        isAdjust: true,
        adjustParam: 'check_quantity_differ'
      }, {
        title: '卸车待时金额',
        param: 'waiting_price',
        width: ''
      }, {
        title: '销售总额',
        param: 'sell_rental',
        width: ''
      }, {
        title: '销售待时后总额',
        param: 'waiting_charges',
        width: '',
        isAdjust: true,
        adjustParam: 'waiting_charges_differ'
      }, {
        title: '卸车数',
        param: 'unload_nums',
        width: '',
        isAdjust: true,
        adjustParam: 'unload_nums_differ'
      }, {
        title: '业务员',
        param: 'sale_man',
        width: ''
      }, {
        title: '标准里程',
        param: 'stand_mile',
        width: '',
        isAdjust: true,
        adjustParam: 'stand_mile_differ'
      }, {
        title: '起步价',
        param: 'initial_price',
        width: ''
      }, {
        title: '运输费率',
        param: 'change_rate',
        width: ''
      }, {
        title: '标准运价',
        param: 'stand_freight',
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
        title: '分卸费',
        param: 'lcl_cost',
        width: ''
      }],
      tableData: [],
      exportPostData: {}, //导出筛选
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
    }
  },
  methods: {
    postDataFilter(postData) {
      for (let i in postData) {
        if (i === 'page' || i === 'page_size') {
          delete postData[i];
        }
      }
      return postData;
    },
    exportTableData(type) {
      const exportThTableList = [{
        title:'运单号',
        id:76
      },{
        title:'业务单号',
        id:77
      },{
        title:'承运商',
        id:81
      },{
        title:'调账承运商',
        id:208
      },{
        title:'客户简称',
        id:211
      },{
        title:'调账简称',
        id:210
      },{
        title:'客户名称',
        id:82
      },{
        title:'付款方名称',
        id:90
      },{
        title:'调账付款方',
        id:201
      },{
        title:'车号',
        id:113
      },{
        title:'实际到厂时间',
        id:84
      },{
        title:'装车完成时间',
        id:127
      },{
        title:'供应商',
        id:78
      },{
        title:'调账供应商',
        id:209
      },{
        title:'实际液厂',
        id:79
      },{
        title:'采购单价',
        id:91
      },{
        title:'调账采购单价差值',
        id:189
      },{
        title:'优惠单价',
        id:92
      },{
        title:'业务优惠',
        id:94
      },{
        title:'实际装车吨位',
        id:93
      },{
        title:'调账实际装车吨位差值',
        id:191
      },{
        title:'采购优惠后总额',
        id:83
      },{
        title:'采购总额',
        id:108
      },{
        title:'调账优惠后总额差值',
        id:193
      },{
        title:'实际离站时间',
        id:85
      },{
        title:'卸货站',
        id:80
      },{
        title:'销售单价',
        id:95
      },{
        title:'调帐结算价格差值',
        id:203
      },{
        title:'实收吨位',
        id:97
      },{
        title:'亏吨',
        id:96
      },{
        title:'核算吨位',
        id:98
      },{
        title:'调账吨位差值',
        id:195
      },{
        title:'销售总额',
        id:101
      },{
        title:'卸车待时金额',
        id:100
      },{
        title:'销售待时后总额',
        id:86
      },{
        title:'调账待时后总额差值',
        id:199
      },{
        title:'卸车数',
        id:99
      },{
        title:'调账卸车差值',
        id:197
      },{
        title:'业务员',
        id:102
      },{
        title:'毛利润',
        id:88
      },{
        title:'标准里程',
        id:103
      },{
        title:'调账标准里程差值',
        id:205
      },{
        title:'起步价',
        id:104
      },{
        title:'运输费率',
        id:105
      },{
        title:'标准运价',
        id:173
      },{
        title:'运费合计',
        id:87
      },{
        title:'调账运费合计差值',
        id:207
      },{
        title:'气差金额',
        id:106
      },{
        title:'分卸费',
        id:107
      },{
        title:'能源利润',
        id:89
      },]

      const exportThTableListIds = exportThTableList.map(item => item.id);

      let postData = {
        filename: '业务台账',
        page_arg: type,
        ids: exportThTableListIds
      };
      this.exportPostData = this.postDataFilter(this.exportPostData);
      let newPostData = Object.assign(this.exportPostData, postData);
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }
      this.$$http('exportLedgerData', newPostData).then((results) => {
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
        if (results.data && results.data.code == 0) {
          window.open(results.data.data.filename);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        } else {
          this.$message.error('导出失败');
        }
      }).catch((err) => {
        this.$message.error('导出失败');
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
      })
    },
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        if (row.waybill.indexOf("TE") != -1) {
          //this.$router.push({ path: `/statistics/income/incomeOutsideBuyDetali/${row.waybill_id}` });
          window.open(`#/statistics/income/incomeOutsideBuyDetali/${row.waybill_id}`, '_blank')
        } else if (row.waybill.indexOf("TSE") != -1) {

        } else {
          //this.$router.push({ path: `/statistics/income/incomeWaybillDetail/${row.waybill_id}/${row.business_order_id}` });
          window.open(`#/statistics/income/incomeWaybillDetail/${row.waybill_id}/${row.business_order_id}`, '_blank')
        }
      } else if (tpye === 'business_order') {
        if (row.business_order.indexOf("SE") != -1) {
          //this.$router.push({ path: `/statistics/income/incomeOutsidePickDetali/${row.business_order_id}` });
          window.open(`#/statistics/income/incomeOutsidePickDetali/${row.business_order_id}`, '_blank')
        } else {
          //this.$router.push({ path: `/statistics/income/incomeBusinessDetail/`, query: { id: row.business_order_id } });
          window.open(`#/statistics/income/incomeBusinessDetail?id=${row.business_order_id}`, '_blank')
        }
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
      this.$$http('getLedgerList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          this.tableDataObj = {
            len: this.tableData.data.data.length,
            data: this.tableData.data.data
          }
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
