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
                <el-date-picker v-model="planArriveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <!-- <el-date-picker v-model="planArriveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="运单状态:">
                <el-select v-model="searchFilters.waybill_status" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.waybillStatusSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="是否对账:">
                <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.isReconciliationsSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="是否开票:">
                <el-select v-model="searchFilters.is_invoice" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.isInvoiceSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--    <el-row :gutter="10">

          </el-row> -->
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="14" class="total-data">
            一共{{tableData.waybill?tableData.waybill:0}}单，实际装车吨位{{tableData.active_tonna?tableData.active_tonna:0}}吨，采购总额{{tableData.unit_sum_pri?tableData.unit_sum_pri:0}}元，采购优惠后总额{{tableData.discounts_sum_pri?tableData.discounts_sum_pri:0}}元
          </el-col>
          <el-col :span="10" class="text-right">
            <el-button type="primary" plain @click="batchReconciliation('reconciliation')">批量对账</el-button>
            <el-button type="success" @click="batchReconciliation('invoice')">批量开票</el-button>
            <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportPurchaseData'"></export-button>
            <!-- <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('procurement')">{{exportBtn.text}}</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableData.data?tableData.data.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange" :class="{'tabal-height-500':tableData.data&&!tableData.data.data.length}">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'">
                <span class="text-blue cursor-pointer" v-on:click="handleMenuClick({operator:'check',id:scope.row.waybill_id})">{{scope.row.waybill}}</span>
              </div>
              <div v-else>
                <span v-if="item.param ==='is_invoice'||item.param ==='is_reconciliation'||item.param ==='waybill_status'">{{scope.row[item.param].verbose}}</span>
                <span v-else>
                  <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]&&scope.row[item.adjustParam]!=scope.row[item.param]"><span>{{scope.row[item.adjustParam]}}</span></div>
              <span v-html="scope.row[item.param]"></span>
              </span>
      </div>
      </template>
      </el-table-column>
      <el-table-column label="采购总额" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <div>{{scope.row.unit_sum_price}}</div>
        </template>
      </el-table-column>
      <el-table-column label="优惠后总额" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <div>
            <div class="adjust" v-if="scope.row.discounts_sum_dvalue"><span>{{scope.row.discounts_sum_dvalue}}</span></div>
            <span>{{scope.row.discounts_sum_price}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <div v-if="scope.row.is_reconciliation.key==='finished'&&scope.row.is_invoice.key==='no'">
            <el-button type="success" size="mini" plain v-if="scope.row.is_adjust.key==='no'" @click="accountAdjust(scope.row)">调账</el-button>
            <el-button type="success" size="mini" v-if="scope.row.is_invoice.key==='no'" @click="reconciliations(false,scope.row.id,'','invoice')">开票</el-button>
          </div>
          <div v-if="scope.row.is_reconciliation.key==='unfinished'">
            <el-button type="primary" plain size="mini" @click="reconciliations(false,scope.row.id,'','reconciliation')">对账</el-button>
            <el-button type="primary" size="mini" @click="handleMenuClick({operator:'edit',id:scope.row.id})">编辑</el-button>
          </div>
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
  <purchase-adjustment-dialog :account-adjust-is-show="accountAdjustIsShow" v-on:closeDialogBtn="closeDialog" :purchase-row="purchaseRow"></purchase-adjustment-dialog>
  </div>
</template>
<script>
import purchaseAdjustmentDialog from '@/components/statistics/purchaseAdjustmentDialog';
export default {
  name: 'purchaseList',
  components: {
    purchaseAdjustmentDialog: purchaseAdjustmentDialog
  },
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
      searchPostData: {}, //搜索参数
      searchFilters: {
        plan_arrive_time: [],
        waybill_status: '',
        is_reconciliation: this.$route.query.is_reconciliation ? this.$route.query.is_reconciliation : '',
        is_invoice: this.$route.query.is_invoice ? this.$route.query.is_invoice : '',
        keyword: '',
        field: 'waybill',
      },
      exportType: {
        type: 'procurement',
        filename: '采购数据'
      },
      statusTabList: [{
        title: '经理审批中',
        key: 'create_manager_check',
      }, {
        title: '部门审批中',
        key: 'create_department_check',
      }],
      selectData: {
        isReconciliationsSelect: [
          { id: '', value: '全部' },
          { id: 'unfinished', value: '未对账' },
          { id: 'finished', value: '已对账' }
        ],
        waybillStatusSelect: [
          { id: '', value: '全部' },
          { id: 'is_loading', value: '已装车待卸货' },
          { id: 'is_unload', value: '卸货完成' }
        ],
        isInvoiceSelect: [
          { id: '', value: '全部' },
          { id: 'yes', value: '已开票' },
          { id: 'no', value: '未开票' }
        ],
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'supplier', value: '供应商' },
          { id: 'plate_number', value: '车号' },
          { id: 'fluid', value: '液厂' },
        ]
      },
      thTableList: [{
        title: '运单号',
        param: 'waybill',
        width: ''
      }, {
        title: '供应商',
        param: 'supplier',
        width: '200',
        isAdjust: true,
        adjustParam: 'supplier_adjust'
      }, {
        title: '液厂名称',
        param: 'fluid',
        width: ''
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '实际装车时间',
        param: 'active_time',
        width: '200'
      }, {
        title: '实际装车吨位（吨）',
        param: 'active_tonnage',
        width: '150',
        isAdjust: true,
        adjustParam: 'active_tonnage_dvalue'
      }, {
        title: '采购单价（元）',
        param: 'unit_price',
        width: '',
        isAdjust: true,
        adjustParam: 'unit_price_dvalue'
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '业务优惠（元）',
        param: 'business_price',
        width: ''
      }, {
        title: '采购优惠（元）',
        param: 'discount_price',
        width: ''
      }, {
        title: '运单状态',
        param: 'waybill_status',
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
        title: '调账备注',
        param: 'remark_adjust',
        width: ''
      }, {
        title: '调账时间',
        param: 'adjust_time',
        width: '180'
      }],
      tableData: [],
      multipleSelection: [], //所选数据   
      exportPostData: {}, //导出筛选
      accountAdjustIsShow: false, //调账弹窗
      purchaseRow: {}, //调账信息
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
    handleMenuClick(row) {
      if (row.operator === 'check') {
        this.$router.push({ path: `/statistics/purchase/purchaseWaybillDetail/${row.id}` });
      } else if (row.operator === 'edit') {
        this.$router.push({ path: `/statistics/purchase/editPurchase`, query: { id: row.id } });
      }
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList(this.statusActive);
      if (this.pbFunc.objSize(this.$route.query)) {
        this.$router.push({ path: this.$route.path })
      }
    },
    closeDialog: function(isSave) {
      this.accountAdjustIsShow = false;
      if (isSave) {
        this.getList();
      }

    },
    // 调账
    accountAdjust(row) {
      this.accountAdjustIsShow = true;
      this.purchaseRow = row;
    },
    // 全部对账
    getUnReconciliations() {
      let postData = {
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
      postData.batch = 'unfinished';
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.reconciliationsBtn.isDisabled = true;
      this.reconciliationsBtn.isLoading = true;
      this.$$http('getConsignmentStatisticsList', postData).then((results) => {
        this.reconciliationsBtn.isDisabled = false;
        this.reconciliationsBtn.isLoading = false;
        if (results.data && results.data.code == 0) {
          this.reconciliations(true, '', results.data);
        }
      }).catch((err) => {
        this.reconciliationsBtn.isDisabled = false;
        this.reconciliationsBtn.isLoading = false;
      })
    },
    // 批量对账、开票弹窗
    batchReconciliation(type) {
      let ids = [];
      let price = 0;
      for (let i in this.multipleSelection) {
        if (this.multipleSelection[i].is_reconciliation.key === 'unfinished' && type === 'reconciliation') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].discounts_sum_price) * 100;
        }
        if (this.multipleSelection[i].is_invoice.key === 'no' && this.multipleSelection[i].is_reconciliation.key === 'finished' && type === 'invoice') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].discounts_sum_price) * 100;
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
          content = '未' + title + '共有' + ids.length + '单，优惠后总额合计' + price + '元，是否要对所选运单进行批量' + title + '？';
          postData.id = ids;

        } else {
          this.$message({
            message: '请勾选未' + title + '数据',
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
          this.$$http('batchPurchseStatisticsStatus', postData).then((results) => {
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
        waybill_status: this.searchPostData.waybill_status,
        is_reconciliation: this.searchPostData.is_reconciliation,
        is_invoice: this.searchPostData.is_invoice,
      };
      if (this.planArriveTime instanceof Array && this.planArriveTime.length > 0) {
        postData.active_time_start = this.planArriveTime[0];
        postData.active_time_end = this.planArriveTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.$$http('getPurchaseStatisticsList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          for (let i in this.tableData.data.data) {
            this.tableData.data.data[i].active_tonnage_dvalue = '';
            this.tableData.data.data[i].unit_price_dvalue = '';
            this.tableData.data.data[i].discounts_sum_dvalue = '';
            if (this.tableData.data.data[i].active_tonnage_adjust) {
              this.tableData.data.data[i].active_tonnage_dvalue = (parseFloat(this.tableData.data.data[i].active_tonnage_adjust) * 1000 - parseFloat(this.tableData.data.data[i].active_tonnage) * 1000) / 1000;
            }
            if (this.tableData.data.data[i].unit_price_adjust) {
              this.tableData.data.data[i].unit_price_dvalue = (parseFloat(this.tableData.data.data[i].unit_price_adjust) * 100 - parseFloat(this.tableData.data.data[i].unit_price) * 100) / 100;
            }
            if (this.tableData.data.data[i].discounts_sum_adjust) {
              this.tableData.data.data[i].discounts_sum_dvalue = (parseFloat(this.tableData.data.data[i].discounts_sum_adjust) * 100 - parseFloat(this.tableData.data.data[i].discounts_sum_price) * 100) / 100;
              this.tableData.data.data[i].discounts_sum_dvalue = (this.tableData.data.data[i].discounts_sum_dvalue).toFixed(2);
            }
            this.tableData.data.data[i].station = this.tableData.data.data[i].station.replace(',', '<br/>');
          }

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
