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
              <el-form-item label="实际离站时间:" label-width="105px">
                <el-date-picker v-model="leaveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <!-- <el-date-picker v-model="leaveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否对账:">
                <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.isReconciliationsSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否开票:">
                <el-select v-model="searchFilters.is_invoice" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.isInvoiceSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="14" class="total-data">
            一共{{tableData.waybill?tableData.waybill:0}}单，核算吨位{{tableData.check_quanti?tableData.check_quanti:0}}吨，销售总额{{tableData.sell_rent?tableData.sell_rent:0}}元，待时后总额{{tableData.waiting_charg?tableData.waiting_charg:0}}元，共卸车{{tableData.unload_nu?tableData.unload_nu:0}}车
          </el-col>
          <el-col :span="10" class="text-right">
            <el-button type="primary" plain @click="batchReconciliation('reconciliation')">批量对账</el-button>
            <el-button type="success" @click="batchReconciliation('invoice')">批量开票</el-button>
            <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportSaleData'"></export-button>
            <!-- <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('sale')">{{exportBtn.text}}</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableData.data?tableData.data.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange" :class="{'tabal-height-500':tableData.data&&!tableData.data.data.length}">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <!--  < div v-if="item.param === 'waybill'||item.param === 'business_order'">
                <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link>
                <span class="text-blue" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
              </div>
              <div v-else>{{scope.row[item.param]}}</div> -->
              <div v-if="item.param === 'waybill'||item.param ==='business_order'">
                <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
              </div>
              <div v-else>
                <span v-if="item.param ==='is_invoice'||item.param ==='is_reconciliation'">{{scope.row[item.param].verbose}}</span>
                <span v-else>{{scope.row[item.param]}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="待时后总额" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.waiting_charges}}</div>
            </template>
          </el-table-column>
          <el-table-column label="业务员" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <div>{{scope.row.sale_man}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.is_reconciliation.key==='unfinished'" plain size="mini" @click="reconciliations(false,scope.row.id,'','reconciliation')">对账</el-button>
              <el-button type="success" size="mini" v-if="scope.row.is_reconciliation.key==='finished'&&scope.row.is_invoice.key==='no'" @click="reconciliations(false,scope.row.id,'','invoice')">开票</el-button>
              <el-button type="primary" v-if="scope.row.is_reconciliation.key==='unfinished'" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <no-data v-if="!pageLoading && !tableData.data.data.length"></no-data>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
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
      leaveTime: [], //离站时间
      searchPostData: {}, //搜索参数
      searchFilters: {
        plan_arrive_time: [],
        is_reconciliation: this.$route.query.is_reconciliation ? this.$route.query.is_reconciliation : '',
        is_invoice: this.$route.query.is_invoice ? this.$route.query.is_invoice : '',
        keyword: '',
        field: 'business_order',
      },
      exportType: {
        type: 'sale',
        filename: '销售数据'
      },
      selectData: {
        isInvoiceSelect: [
          { id: '', value: '全部' },
          { id: 'yes', value: '已开票' },
          { id: 'no', value: '未开票' }
        ],
        isReconciliationsSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '未对账' },
          { id: 'finished', value: '已对账' }
        ],
        fieldSelect: [
          { id: 'business_order', value: '业务单号' },
          { id: 'short_name', value: '客户简称' },
          { id: 'consumer_name', value: '客户名称' },
          { id: 'station', value: '卸货站' },
          { id: 'plate_number', value: '车号' },
          { id: 'sale_man', value: '业务员' },
          { id: 'payer_name', value: '付款方' },
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
        title: '客户简称',
        param: 'short_name',
        width: ''
      }, {
        title: '客户名称',
        param: 'consumer_name',
        width: '220'
      }, {
        title: '付款方',
        param: 'payer_name',
        width: '200'
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '实际装车时间',
        param: 'active_time',
        width: '200'
      }, {
        title: '实际液厂',
        param: 'fluid',
        width: ''
      }, {
        title: '采购单价',
        param: 'discount_price',
        width: ''
      }, {
        title: '业务优惠',
        param: 'business_price',
        width: ''
      }, {
        title: '实际离站时间',
        param: 'leave_time',
        width: '200'
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
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
        title: '销售单价',
        param: 'unit_price',
        width: ''
      }, {
        title: '卸车数',
        param: 'unload_nums',
        width: ''
      }, {
        title: '卸车待时金额',
        param: 'waiting_price',
        width: ''
      }, {
        title: '是否对账',
        param: 'is_reconciliation',
        width: ''
      }, {
        title: '是否开票',
        param: 'is_invoice',
        width: ''
      }, {
        title: '销售总额',
        param: 'sell_rental',
        width: ''
      }],
      tableData: [],
      multipleSelection: [], //所选数据 
      exportPostData: {}, //导出筛选
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        this.$router.push({ path: `/statistics/sales/salesWaybillDetail/${row.waybill_id}/${row.business_order_id}` });
      } else if (tpye === 'business_order') {
        this.$router.push({ path: `/statistics/sales/salesBusinessDetail/`, query: { id: row.business_order_id } });
      } else if (tpye === 'edit') {
        this.$router.push({ path: `/statistics/sales/editSales`, query: { id: row.id } });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
      if (this.pbFunc.objSize(this.$route.query)) {
        this.$router.push({ path: this.$route.path })
      }
    },
    // 批量对账、开票弹窗
    batchReconciliation(type) {
      let ids = [];
      let price = 0;
      for (let i in this.multipleSelection) {
        if (this.multipleSelection[i].is_reconciliation.key === 'unfinished' && type === 'reconciliation') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].sell_rental) * 100;
        }
        if (this.multipleSelection[i].is_invoice.key === 'no' && this.multipleSelection[i].is_reconciliation.key === 'finished' && type === 'invoice') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].sell_rental) * 100;
        }
      }
      this.reconciliations(true, ids, price / 100, type);
    },
    // 单个/批量 对账  开票
    reconciliations(isAll, ids, price, type) {
      let content = '';
      let postData = {};
      let title = '';
      if (type === 'reconciliation') {
        postData.is_reconciliation = 'finished';
        title = '对账';
      } else if (type === 'invoice') {
        postData.is_invoice = 'yes';
        title = '开票';
      }
      if (isAll) {
        if (ids.length) {
          content = '未' + title + '共有' + ids.length + '单，费用合计' + price + '元，是否要对所选运单进行批量' + title + '？';
          postData.id = ids;

        } else {
          this.$message({
            message: '请勾选未' + title + (type === 'invoice' ? '/未对账' : '') + '数据',
            type: 'warning'
          });
        }
      } else {
        content = '是否确认' + title + '？';
        postData.id = ids.split(',');
      }

      if (ids.length) {
        this.$confirm(content, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$$http('batchSalesStatisticsStatus', postData).then((results) => {
            if (results.data && results.data.code == 0) {
              this.getList();
            }
          })
        }).catch(() => {});
      }
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        is_reconciliation: this.searchPostData.is_reconciliation,
        is_invoice: this.searchPostData.is_invoice,
      };
      if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
        postData.leave_time_start = this.leaveTime[0];
        postData.leave_time_end = this.leaveTime[1];
      }

      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.$$http('getSalesStatisticsList', postData).then((results) => {
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
    this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
    this.getList();
  }

}

</script>
