<style type="text/css" scoped lang="less">
.operation-btn-content{
  padding-right: 490px;

  position:relative;
  .operation-btn-op{
    position:absolute;
    right:0;
    top:0;
  }
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
                  <el-option v-for="(item,key) in filterParam.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="装车完成时间:" label-width="105px">
                <el-date-picker v-model="planArriveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <!-- <el-date-picker v-model="planArriveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="运单状态:">
                <el-select v-model="searchFilters.waybill_status" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.waybillStatus.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="是否对账:">
                <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.isReconciliations.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="是否开票:">
                <el-select v-model="searchFilters.is_invoice" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.isInvoice.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="24">
            <div class="operation-btn-content">
              <div class="total-data" v-if="multipleSelection.length==0">
                一共{{tableData.waybill?tableData.waybill:0}}单，实际装车吨位{{tableData.active_tonna?tableData.active_tonna:0}}吨，采购总额{{tableData.unit_sum_pri?tableData.unit_sum_pri:0}}元，采购优惠后总额{{tableData.discounts_sum_pri?tableData.discounts_sum_pri:0}}元
              </div>
              <div class="total-data" v-else>
                当前选择{{chooseCount.num}}单，实际装车吨位{{chooseCount.active_tonna}}吨，采购总额{{chooseCount.unit_sum_pri}}元，采购优惠后总额{{chooseCount.discounts_sum_pri}}元
              </div>
              <div class="operation-btn-op">
                <el-button type="primary" @click="showDialog('batch')">批量修改</el-button>
                <el-button type="success" plain @click="updatePostData">获取最新数据</el-button>
                <el-button type="primary" plain @click="batchReconciliation('reconciliation')">批量对账</el-button>
                <el-button type="success" @click="batchReconciliation('invoice')">批量开票</el-button>
                <!-- <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportPurchaseData'"></export-button>-->
                <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('procurement')">{{exportBtn.text}}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableDataObj.data?tableDataObj.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange" :class="{'tabal-height-500':!tableDataObj.len}">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'">
                <span class="text-blue cursor-pointer" v-on:click="handleMenuClick({operator:'check',id:scope.row.waybill_id,waybill:scope.row.waybill})">{{scope.row.waybill}}</span>
              </div>
              <div v-else>
                <span v-if="item.param ==='is_invoice'||item.param ==='is_reconciliation'||item.param ==='waybill_status'">{{scope.row[item.param].verbose}}</span>
                <span v-else>
                  <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]&&scope.row[item.adjustParam]!=scope.row[item.param]"><span>{{scope.row[item.adjustParam]}}</span></div>
              <div v-if="item.param==='remark_adjust'||item.param==='remark'" class='td-hover' :title="scope.row[item.param]">{{scope.row[item.param]}}</div>
              <span v-else v-html="scope.row[item.param]"></span>
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
            <div class="adjust" v-if="scope.row.discounts_sum_differ"><span>{{scope.row.discounts_sum_differ}}</span></div>
            <span>{{scope.row.discounts_sum_price}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <div v-if="scope.row.is_reconciliation.key==='finished'&&scope.row.is_invoice.key==='no'">
            <el-button type="success" size="mini" plain v-if="scope.row.is_adjust.key==='no'" @click="showDialog('adjust',scope.row)">调账</el-button>
            <el-button type="success" size="mini" v-if="scope.row.is_invoice.key==='no'" @click="reconciliations(false,scope.row.id,'','invoice')">开票</el-button>
          </div>
          <div v-if="scope.row.is_reconciliation.key==='unfinished'">
            <el-button type="primary" plain size="mini" @click="reconciliations(false,scope.row.id,'','reconciliation')">对账</el-button>
            <el-button type="primary" size="mini" @click="handleMenuClick({operator:'edit',id:scope.row.id})">编辑</el-button>
          </div>
        </template>
      </el-table-column>
      </el-table>
      <no-data v-if="!pageLoading && !tableDataObj.len"></no-data>
    </div>
    <div class="page-list text-center">
      <el-pagination background layout="prev, pager, next ,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
      </el-pagination>
    </div>
  </div>
  <purchase-adjustment-dialog :account-adjust-is-show="accountAdjustIsShow" v-on:closeDialogBtn="closeDialog" :purchase-row="purchaseRow"></purchase-adjustment-dialog>
  <update-new-data-dialog :is-show="updateDataIsShow" v-on:closeDialogBtn="updateCloseDialog" :api-name="'updatePurchaseStatisticsList'" :type-str="'采购数据'" :filter-param="filterParam" :update-data="updateData" :ids="getNewDataIds"></update-new-data-dialog>
  <batch-update-dialog v-on:closeDialogBtn="batchUpdateCloseDialog" :is-show="batchUpdateIsShow" :number="multipleSelection.length" :ids="batchIds"></batch-update-dialog>
  </div>
</template>
<script>
import purchaseAdjustmentDialog from '@/components/statistics/purchaseAdjustmentDialog';
import updateNewDataDialog from '@/components/statistics/updateNewDataDialog';
import batchUpdateDialog from '@/components/statistics/batchUpdateDialog';

export default {
  name: 'purchaseList',
  components: {
    purchaseAdjustmentDialog: purchaseAdjustmentDialog,
    updateNewDataDialog:updateNewDataDialog,
    batchUpdateDialog:batchUpdateDialog
  },
  computed: {
    // statusTabList(){
    //   return this.tabList[0].tabs;
    // }
  },

  data() {
    return {
      pageLoading: false,
      updateDataIsShow:false,//更新数据弹窗
      batchUpdateIsShow:false,//批量修改
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      tableDataObj: {
        len: '', //长度
        data: [], //内容
      },
      chooseCount:{
        num:0,
        active_tonna:"0",//实际吨位
        unit_sum_pri:"0",//采购总额
        discounts_sum_pri:"0",//优惠后总额
      },
      activeName: 'add',
      statusActive: 'create_manager_check',
      planArriveTime: ['2018-9-30 16:00:00','2018-10-30 16:00:00'], //计划到站时间
      createdAt: [], //下计划日期
      searchPostData: {}, //搜索参数
      searchFilters: {
        plan_arrive_time: [],
        waybill_status: '',
        is_reconciliation: this.$route.query.is_reconciliation ? this.$route.query.is_reconciliation : '',
        is_invoice: this.$route.query.is_invoice ? this.$route.query.is_invoice : '',
        keyword: '',
        field: 'plate_number',
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
      // selectData: {
      //   isReconciliationsSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'unfinished', value: '未对账' },
      //     { id: 'finished', value: '已对账' }
      //   ],
      //   waybillStatusSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'is_loading', value: '已装车待卸货' },
      //     { id: 'is_unload', value: '卸货完成' }
      //   ],
      //   isInvoiceSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'yes', value: '已开票' },
      //     { id: 'no', value: '未开票' }
      //   ],
      //   fieldSelect: [
      //     { id: 'waybill', value: '运单号' },
      //     { id: 'supplier', value: '供应商' },
      //     { id: 'plate_number', value: '车号' },
      //     { id: 'fluid', value: '液厂' },
      //   ]
      // },
      thTableList: [
        {
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
          title: '实际到厂时间',
          param: 'active_time',
          width: '200'
        }, {
          title: '装车完成时间',
          param: 'work_end_time',
          width: '200'
        }, {
          title: '实际装车吨位（吨）',
          param: 'active_tonnage',
          width: '150',
          isAdjust: true,
          adjustParam: 'active_tonnage_differ'
        }, {
          title: '采购单价（元）',
          param: 'unit_price',
          width: '',
          isAdjust: true,
          adjustParam: 'unit_price_differ'
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
          title: '备注',
          param: 'remark',
          width: '170'
        }, {
          title: '对账时间',
          param: 'reconciliation_time',
          width: '180'
        }, {
          title: '调账备注',
          param: 'remark_adjust',
          width: '170'
        }, {
          title: '调账时间',
          param: 'adjust_time',
          width: '180'
        }, {
          title: '开票时间',
          param: 'invoice_time',
          width: '180'
        }
      ],
      tableData: [],
      multipleSelection: [], //所选数据   
      exportPostData: {}, //导出筛选
      accountAdjustIsShow: false, //调账弹窗
      purchaseRow: {}, //调账信息
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      filterParam:{
        fieldSelect:[
          {
            id: 'waybill',
            value: '运单号',
          },{
            id: 'supplier',
            value: '供应商',
          },{
            id: 'plate_number',
            value: '车号',
          },{
            id: 'fluid',
            value: '液厂',
          },
        ],
        waybillStatus: {
          id: 'waybill_status',
          value: '运单状态',
          data: [
            { id: '', value: '全部' },
            { id: 'is_loading', value: '已装车待卸货' },
            { id: 'is_unload', value: '卸货完成' }
          ],
        },
        isReconciliations: {
          id: 'is_reconciliation',
          value: '是否对账',
          data: [
            { id: '', value: '全部' },
            { id: 'unfinished', value: '未对账' },
            { id: 'finished', value: '已对账' }
          ],
        },
        isInvoice: {
          id: 'is_invoice',
          value: '是否开票',
          data: [
            { id: '', value: '全部' },
            { id: 'yes', value: '已开票' },
            { id: 'no', value: '未开票' }
          ],
        },
        times:[
          {
            id: 'work_end_time_start',
            timeEnd:'work_end_time_end',
            value: '装车完成时间'
          }
        ],
      },//筛选参数
      updateData:{},
      batchIds:[],//可批量修改数据的ID
      getNewDataIds:[]//获取最新数据的ID
    }
  },
  methods: {
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    // 更新数据
    updatePostData(){
      this.updateData = this.postDataFilter(this.updateData);
      this.getNewDataIds = [];
      for(let i in this.multipleSelection){
        if(this.multipleSelection[i].is_reconciliation.key ==='unfinished'){
          this.getNewDataIds.push(this.multipleSelection[i].id);
        }
      }
      if(this.getNewDataIds.length){
        this.updateDataIsShow = true;
      }else{
        this.$message.warning('没有勾选未对账运单数据或筛选条件');
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(val.length>0){
        this.calculation();
      }
    },
    calculation:function(){
      var newfifterCount={num:0,active_tonna:"0.00",unit_sum_pri:"0.00",discounts_sum_pri:"0.00"};
      this.multipleSelection.forEach(item=>{
        newfifterCount.num++;
        // newfifterCount.check_quantity_sum=(parseFloat(newfifterCount.check_quantity_sum)+parseFloat(item.check_quantity_sum)).toFixed(2);
        newfifterCount.active_tonna=(parseFloat(newfifterCount.active_tonna)+parseFloat(item.active_tonnage)).toFixed(2);
        newfifterCount.unit_sum_pri=(parseFloat(newfifterCount.unit_sum_pri)+parseFloat(item.unit_sum_price)).toFixed(2);
        newfifterCount.discounts_sum_pri=(parseFloat(newfifterCount.discounts_sum_pri)+parseFloat(item.discounts_sum_price)).toFixed(2);
      });
      this.chooseCount=newfifterCount;
    },
    handleMenuClick(row) {
      if (row.operator === 'check') {
        if (row.waybill.indexOf("TE") != -1) {
          //this.$router.push({ path: `/statistics/purchase/purchaseOutsideBuyDetali/${row.id}` });
          window.open(`#/statistics/purchase/purchaseOutsideBuyDetali/${row.id}`, '_blank')
        } else if (row.waybill.indexOf("TSE") != -1) {

        } else {
          //this.$router.push({ path: `/statistics/purchase/purchaseWaybillDetail/${row.id}` });
          window.open(`#/statistics/purchase/purchaseWaybillDetail/${row.id}`, '_blank')
        }
      } else if (row.operator === 'edit') {
        window.open(`#/statistics/purchase/editPurchase?id=${row.id}`, '_blank')
        //this.$router.push({ path: `/statistics/purchase/editPurchase`, query: { id: row.id } });
      }
    },
    startSearch() {
      console.log('planArriveTime',this.planArriveTime);
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
    // 批量修改 采购优惠 业务优惠
    batchUpdateCloseDialog(isSave){
      this.batchUpdateIsShow = false;
      if (isSave) {
        this.getList();
      }
    },
    updateCloseDialog(isSave){
      this.updateDataIsShow = false;
      if (isSave) {
        this.getList();
      }
    },
    // 调账
    showDialog(type,row) {
      if(type === 'adjust'){
        this.accountAdjustIsShow = true;
      }else if(type === 'batch'){
        if(this.multipleSelection.length){
          this.batchIds = this.batchDataHandle('reconciliation');
          if(this.batchIds.length){
            this.batchUpdateIsShow = true;
          }else{
            this.$message.warning('已勾选中没有可修改（未对账）数据！');
          }
        }else{
          this.$message.warning('没有勾选批量修改数据！');
        }
      }
      if(row){
        this.purchaseRow = row;
      }
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
    // 不同状态的id列表
    batchDataHandle(type){
      let ids = [];
      for(let i in this.multipleSelection){
        if(this.multipleSelection[i].is_reconciliation.key === 'unfinished'&&type==='reconciliation'){
          ids.push(this.multipleSelection[i].id);
        }
      }
      return ids;
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
        postData.work_end_time_start = this.planArriveTime[0];
        postData.work_end_time_end = this.planArriveTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.updateData = postData;
      this.$$http('getPurchaseStatisticsList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          for (let i in this.tableData.data.data) {
            // this.tableData.data.data[i].active_tonnage_dvalue = '';
            // this.tableData.data.data[i].unit_price_dvalue = '';
            // this.tableData.data.data[i].discounts_sum_dvalue = '';
            // if (this.tableData.data.data[i].active_tonnage_adjust) {
            //   this.tableData.data.data[i].active_tonnage_dvalue = (parseFloat(this.tableData.data.data[i].active_tonnage_adjust) * 1000 - parseFloat(this.tableData.data.data[i].active_tonnage) * 1000) / 1000;
            // }
            // if (this.tableData.data.data[i].unit_price_adjust) {
            //   this.tableData.data.data[i].unit_price_dvalue = (parseFloat(this.tableData.data.data[i].unit_price_adjust) * 100 - parseFloat(this.tableData.data.data[i].unit_price) * 100) / 100;
            // }
            // if (this.tableData.data.data[i].discounts_sum_adjust) {
            //   this.tableData.data.data[i].discounts_sum_dvalue = (parseFloat(this.tableData.data.data[i].discounts_sum_adjust) * 100 - parseFloat(this.tableData.data.data[i].discounts_sum_price) * 100) / 100;
            //   this.tableData.data.data[i].discounts_sum_dvalue = (this.tableData.data.data[i].discounts_sum_dvalue).toFixed(2);
            // }
            this.tableData.data.data[i].station = (this.tableData.data.data[i].station.join(',')).replace(',', '<br/>');
          }
          this.tableDataObj = {
            len: this.tableData.data.data.length,
            data: this.tableData.data.data
          }
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    postDataFilter(postData) {
      for (let i in postData) {
        if (i === 'page' || i === 'page_size') {
          delete postData[i];
        }
      }
      return postData;
    },
    exportTableData() {

      const exportThTableList = [{
        title: '运单号',
        id: 1,
      }, {
        title: '供应商',
        id: 2
      }, {
        title: '调账供应商',
        id: 174
      }, {
        title: '液厂名称',
        id: 4
      }, {
        title: '车号',
        id: 5
      }, {
        title: '实际到厂时间',
        id: 6
      }, {
        title: '装车完成时间',
        id: 124
      }, {
        title: '实际装车吨位',
        id: 9
      }, {
        title: '调账实际装车吨位差值',
        id: 176
      }, {
        title: '采购单价',
        id: 7
      }, {
        title: '调账采购单价差值',
        id: 175
      }, {
        title: '卸货站',
        id: 3
      }, {
        title: '业务优惠',
        id: 10
      }, {
        title: '采购优惠',
        id: 8
      }, {
        title: '运单状态',
        id: 15
      }, {
        title: '是否对账',
        id: 11
      }, {
        title: '是否开票',
        id: 14
      }, {
        title: '备注',
        id: 164
      }, {
        title: '对账时间',
        id: 163
      }, {
        title: '调账备注',
        id: 114
      }, {
        title: '调账时间',
        id: 115
      }, {
        title: '开票时间',
        id: 162
      }, {
        title: '采购总额',
        id: 12
      }, {
        title: '优惠后总额',
        id: 13
      }, {
        title: '调账优惠后总额差值',
        id: 177
      }]
      const exportThTableListIds = exportThTableList.map(item => item.id);
      let postData = {
        filename: '采购数据',
        page_arg: 'procurement',
        ids: exportThTableListIds
      };
      this.exportPostData = this.postDataFilter(this.exportPostData);
      let newPostData = Object.assign(this.exportPostData, postData);
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }
      this.$$http('exportPurchaseData', newPostData).then((results) => {
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
    }
  },
  created() {
    let nowDate = new Date();
    let nowDateDetail = this.pbFunc.getDateDetail(nowDate);
    let nowDateStr = nowDateDetail.year + '-' + nowDateDetail.month + '-' +  nowDateDetail.day + ' ' + nowDateDetail.hour + ':' + nowDateDetail.minute + ':' +  nowDateDetail.second;
    this.planArriveTime = ['2018-10-01 08:00:00',nowDateStr];
    this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
    this.getList();
  }

}

</script>
