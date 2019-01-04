<style type="text/css" scoped lang="less">

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
              <el-form-item label="实际离站时间:" label-width="105px">
                <el-date-picker v-model="leaveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <!-- <el-date-picker v-model="leaveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否对账:">
                <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.isReconciliations.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否开票:">
                <el-select v-model="searchFilters.is_invoice" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.isInvoice.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="运单状态:">
                <el-select v-model="searchFilters.waybill_status" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.waybillStatus.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户是否确认:" label-width="100px">
                <el-select v-model="searchFilters.consumer_confirm" filterable @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.consumerConfirm.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="14" v-if="multipleSelection.length==0">
            <div class="total-data">
              一共{{tableData.waybill?tableData.waybill:0}}单，核算吨位{{tableData.check_quanti?tableData.check_quanti:0}}吨，销售总额{{tableData.sell_rent?tableData.sell_rent:0}}元，待时后总额{{tableData.waiting_charg?tableData.waiting_charg:0}}元，共卸车{{tableData.unload_nu?tableData.unload_nu:0}}车
            </div>

          </el-col>

          <el-col :span="14" v-else>
            <div class="total-data">
              当前选择{{chooseCount.num}}单，核算吨位{{chooseCount.check_quantity}}吨，销售总额{{chooseCount.sell_rental}}元，待时后总额{{chooseCount.waiting_charges}}元，共卸车{{chooseCount.unload_nums}}车
            </div>
          </el-col>
          <el-col :span="10" class="text-right">
            <el-button type="success" plain @click="updatePostData">获取更新数据</el-button>
            <el-button type="primary" plain @click="batchReconciliation('reconciliation')">批量对账</el-button>
            <el-button type="success" @click="batchReconciliation('invoice')">批量开票</el-button>
            <!-- <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportSaleData'"></export-button> -->
            <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('sale')">{{exportBtn.text}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableDataObj.data?tableDataObj.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange" :class="{'tabal-height-500':!tableDataObj.len}">
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
                <span v-if="item.param ==='is_invoice'||item.param ==='is_reconciliation'||item.param ==='waybill_status'||item.param ==='business_type' || item.param === 'consumer_confirm'">{{scope.row[item.param].verbose}}</span>
                <span v-else>
                  <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]&&scope.row[item.adjustParam]!=scope.row[item.param]"><span>{{scope.row[item.adjustParam]}}</span></div>
              <div v-if="item.param==='remark_adjust'||item.param==='remark'" class='td-hover' :title="scope.row[item.param]">{{scope.row[item.param]}}</div>
              <span v-else v-html="scope.row[item.param]"></span>
              </span>
      </div>
      </template>
      </el-table-column>
      <el-table-column label="待时后总额" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <div>
            <div class="adjust" v-if="scope.row.waiting_charges_differ"><span>{{scope.row.waiting_charges_differ}}</span></div>
            {{scope.row.waiting_charges}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="业务员" align="center" width="150" fixed="right">
        <template slot-scope="scope">
          <div>{{scope.row.sale_man}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <!--  -->
          <div v-if="scope.row.waybill_status.key==='is_loading'">
            <el-tooltip class="item" effect="dark" content="未确认结算，无法对账" placement="top" :disabled="false">
              <el-button type="info" v-if="scope.row.is_reconciliation.key==='unfinished'" class="is-disabled" plain size="mini">对账</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="未确认结算，无法编辑" placement="top" :disabled="false">
              <el-button type="info" v-if="scope.row.is_reconciliation.key==='unfinished'" size="mini" class="is-disabled">编辑</el-button>
            </el-tooltip>
          </div>
          <div v-else>
            <div v-if="scope.row.is_reconciliation.key==='finished'&&scope.row.is_invoice.key==='no'">
              <el-button type="success" size="mini" plain v-if="scope.row.is_adjust.key==='no'" @click="accountAdjust(scope.row)">调账</el-button>
              <el-button type="success" size="mini" @click="reconciliations(false,scope.row.id,'','invoice')">开票</el-button>
            </div>
            <div v-if="scope.row.is_reconciliation.key==='unfinished'">
              <el-button type="primary" plain size="mini" @click="reconciliations(false,scope.row.id,'','reconciliation')">对账</el-button>
              <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
            </div>
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
  <sales-adjustment-dialog :account-adjust-is-show="accountAdjustIsShow" v-on:closeDialogBtn="closeDialog" :adjust-row="adjustRow"></sales-adjustment-dialog>
  <update-new-data-dialog :is-show="updateDataIsShow" v-on:closeDialogBtn="updateCloseDialog" :api-name="'updateSaleStatisticsList'" :type-str="'销售数据'" :filter-param="filterParam" :update-data="updateData" :ids="getNewDataIds" :all-num="pageData.totalCount"></update-new-data-dialog>
  </div>
</template>
<script>
import salesAdjustmentDialog from '@/components/statistics/salesAdjustmentDialog';
import updateNewDataDialog from '@/components/statistics/updateNewDataDialog';
export default {
  name: 'salesList',
  components: {
    salesAdjustmentDialog: salesAdjustmentDialog,
    updateNewDataDialog:updateNewDataDialog
  },
  computed: {

  },

  data() {
    return {
      pageLoading: false,
      updateDataIsShow:false,
      pageData: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
      },
      tableDataObj: {
        len: '', //长度
        data: [], //内容
      },
      leaveTime: this.$route.query.leaveTime ? (this.$route.query.leaveTime).split(',') : [], //离站时间
      searchPostData: {}, //搜索参数
      searchFilters: {
        plan_arrive_time:[],
        is_reconciliation: this.$route.query.is_reconciliation ? this.$route.query.is_reconciliation : '',
        is_invoice: this.$route.query.is_invoice ? this.$route.query.is_invoice : '',
        keyword: this.$route.query.consumer_name ? this.$route.query.consumer_name : '' ,
        waybill_status: '',
        consumer_confirm:'',
        field: this.$route.query.consumer_name ? 'consumer_name':'short_name',
      },
      exportType: {
        type: 'sale',
        filename: '销售数据'
      },
      // selectData: {
      //   isInvoiceSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'yes', value: '已开票' },
      //     { id: 'no', value: '未开票' }
      //   ],
      //   isReconciliationsSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'unfinished', value: '未对账' },
      //     { id: 'finished', value: '已对账' }
      //   ],
      //   fieldSelect: [
      //     { id: 'business_order', value: '业务单号' },
      //     { id: 'short_name', value: '客户简称' },
      //     { id: 'consumer_name', value: '客户名称' },
      //     { id: 'station', value: '卸货站' },
      //     { id: 'plate_number', value: '车号' },
      //     { id: 'sale_man', value: '业务员' },
      //     { id: 'payer_name', value: '付款方' },
      //   ],
      //   waybillStatusSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'is_loading', value: '已卸货待结算' },
      //     { id: 'is_unload', value: '结算完成' }
      //   ],
      //   consumerConfirmSelect: [
      //     { id: '', value: '全部' },
      //     { id: 'yes', value: '客户已确认' },
      //     { id: 'no', value: '客户吨位有误' },
      //     { id: 'wait_confirm', value: '客户待确认' },
      //   ],
      // },
      filterParam: {
        isInvoice: {
          id:'is_invoice',
          value:'是否开票',
          data:[
            { id: '', value: '全部' },
            { id: 'yes', value: '已开票' },
            { id: 'no', value: '未开票' }
          ]
        },
        isReconciliations: {
          id:'is_reconciliation',
          value:'是否对账',
          data:[
            { id: '', value: '全部' },
            { id: 'unfinished', value: '未对账' },
            { id: 'finished', value: '已对账' }
          ]
        },
        fieldSelect: [
          { id: 'business_order', value: '业务单号' },
          { id: 'waybill', value: '运单号' },
          { id: 'short_name', value: '客户简称' },
          { id: 'consumer_name', value: '客户名称' },
          { id: 'station', value: '卸货站' },
          { id: 'plate_number', value: '车号' },
          { id: 'sale_man', value: '业务员' },
          { id: 'payer_name', value: '付款方' },
        ],
        waybillStatus: {
          id:'waybill_status',
          value:'运单状态',
          data:[
            { id: '', value: '全部' },
            { id: 'is_loading', value: '已卸货待结算' },
            { id: 'is_unload', value: '结算完成' }
          ]
        },
        consumerConfirm: {
          id:'consumer_confirm',
          value:'客户是否确认',
          data:[
            { id: '', value: '全部' },
            { id: 'yes', value: '客户已确认' },
            { id: 'no', value: '客户吨位有误' },
            { id: 'wait_confirm', value: '客户待确认' },
          ]
        },
        times:[
          {
            id: 'leave_time_start',
            timeEnd:'leave_time_end',
            value: '实际离站时间'
          }
        ],
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
        title: '业务类型',
        param: 'business_type',
        width: '',
      }, {
        title: '客户简称',
        param: 'short_name',
        width: '',
        isAdjust: true,
        adjustParam: 'short_name_adjust'
      },
      {
        title: '客户名称',
        param: 'consumer_name',
        width: '220'
      },
      {
        title: '付款方',
        param: 'payer_name',
        width: '220',
        isAdjust: true,
        adjustParam: 'payer_name_adjust'
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      },
      // {
      //   title: '实际到厂时间',
      //   param: 'active_time',
      //   width: '200'
      // },
      {
        title: '装车完成时间',
        param: 'work_end_time',
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
        title: '销售价格',
        param: 'sale_price',
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
        title: '标准里程',
        param: 'stand_mile',
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
        title: '结算价格',
        param: 'unit_price',
        width: '',
        isAdjust: true,
        adjustParam: 'unit_price_differ'
      }, {
        title: '卸车数',
        param: 'unload_nums',
        width: '',
        isAdjust: true,
        adjustParam: 'unload_nums_differ'
      }, {
        title: '卸车待时金额',
        param: 'waiting_price',
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
        title: '销售总额',
        param: 'sell_rental',
        width: ''
      },{
        title: '客户是否确认',
        param: 'consumer_confirm',
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
        width: '180'
      }, {
        title: '调账时间',
        param: 'adjust_time',
        width: '180'
      }, {
        title: '开票时间',
        param: 'invoice_time',
        width: '180'
      }],
      tableData: [],
      multipleSelection: [], //所选数据 
      exportPostData: {}, //导出筛选
      accountAdjustIsShow: false, //调账弹窗
      adjustRow: {}, //调账信息
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      chooseCount:{
        num:0,
        check_quantity:"0.000",//实际吨位
        sell_rental:"0.00",//采购总额
        waiting_charges:"0.00",
        unload_nums:"0.0"//优惠后总额
      },
      updateData:{},
      getNewDataIds:[]//获取最新数据的ID
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
    updateCloseDialog(isSave){
      this.updateDataIsShow = false;
      if (isSave) {
        this.getList();
      }
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
      if(this.getNewDataIds.length||this.pbFunc.objSize(this.updateData)){
        this.updateDataIsShow = true;
      }else{
        this.$message.warning('没有勾选未对账运单数据可获取或筛选条件');
      }
    },
    exportTableData(type) {

      const exportThTableList = [{
        title: '运单号',
        id: 16
      }, {
        title: '业务单号',
        id: 17
      }, {
        title: '业务类型',
        id: 168
      }, {
        title: '客户简称',
        id: 20
      }, {
        title: '调账简称',
        id: 178
      }, {
        title: '客户名称',
        id: 21
      }, {
        title: '付款方',
        id: 39
      }, {
        title: '调账付款方',
        id: 179
      }, {
        title: '车牌号',
        id: 18
      }, {
        title: '实际液厂',
        id: 19
      }, {
        title: '实际到厂时间',
        id: 24
      }, {
        title: '装车完成时间',
        id: 125
      }, {
        title: '采购单价',
        id: 31
      }, {
        title: '业务优惠',
        id: 30
      }, {
        title: '装车吨位',
        id: 26

      }, {
        title: '实际离站时间',
        id: 22
      }, {
        title: '卸货站',
        id: 23
      }, {
        title: '结算价格',
        id: 29
      }, {
        title: '调帐结算价格差值',
        id: 180
      }, {
        title: '实收吨位',
        id: 27
      }, {
        title: '调账吨位差值',
        id: 183
      }, {
        title: '亏吨',
        id: 25
      }, {
        title: '标准里程',
        id: 109
      }, {
        title: '核算吨位',
        id: 28
      }, {
        title: '销售总额',
        id: 34
      }, {
        title: '卸车待时金额',
        id: 33
      }, {
        title: '待时后总额',
        id: 35
      }, {
        title: '调账待时后总额差值',
        id: 182
      }, {
        title: '卸车数',
        id: 32
      }, {
        title: '调账卸车数差值',
        id: 181
      }, {
        title: '业务员',
        id: 36
      }, {
        title: '是否对账',
        id: 37
      }, {
        title: '是否开票',
        id: 38
      }, {
        title: '对账时间',
        id: 166
      }, {
        title: '开票时间',
        id: 165
      }, {
        title: '调账备注',
        id: 116
      }, {
        title: '调账时间',
        id: 117
      }, {
        title: '运单状态',
        id: 111
      }, {
        title: '备注',
        id: 167
      }]
      const exportThTableListIds = exportThTableList.map(item => item.id);
      let postData = {
        filename: '销售统计',
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
      this.$$http('exportSaleData', newPostData).then((results) => {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(val.length>0){
        this.calculation();
      }
    },
    calculation:function(){
      var newfifterCount={num:0,check_quantity:"0.000",sell_rental:"0.00",waiting_charges:"0.00",unload_nums:"0.0"};
      this.multipleSelection.forEach(item=>{
        newfifterCount.num++;
        // newfifterCount.check_quantity_sum=(parseFloat(newfifterCount.check_quantity_sum)+parseFloat(item.check_quantity_sum)).toFixed(2);
        newfifterCount.check_quantity=(parseFloat(newfifterCount.check_quantity)+parseFloat(item.check_quantity)).toFixed(3);
        newfifterCount.sell_rental=(parseFloat(newfifterCount.sell_rental)+parseFloat(item.sell_rental)).toFixed(2);
        newfifterCount.waiting_charges=(parseFloat(newfifterCount.waiting_charges)+parseFloat(item.waiting_charges)).toFixed(2);
        newfifterCount.unload_nums=(parseFloat(newfifterCount.unload_nums)+parseFloat(item.unload_nums)).toFixed(1);
      });
      this.chooseCount=newfifterCount;
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        if (row.waybill.indexOf("TE") != -1) {
          //this.$router.push({ path: `/statistics/sales/salesOutsid:eBuyDetali/${row.waybill_id}` });
          window.open(`#/statistics/sales/salesOutsideBuyDetali/${row.waybill_id}`, '_blank')
        } else if (row.waybill.indexOf("TSE") != -1) {

        } else {
          //this.$router.push({ path: `/statistics/sales/salesWaybillDetail/${row.waybill_id}/${row.business_order_id}` });
          window.open(`#/statistics/sales/salesWaybillDetail/${row.waybill_id}/${row.business_order_id}`, '_blank')
        }
      } else if (tpye === 'business_order') {
        if (row.business_order.indexOf("SE") != -1) {
          //this.$router.push({ path: `/statistics/sales/salesOutsidePickDetali/${row.business_order_id}` });
          window.open(`#/statistics/sales/salesOutsidePickDetali/${row.business_order_id}`, '_blank')
        } else {
          //this.$router.push({ path: `/statistics/sales/salesBusinessDetail/`, query: { id: row.business_order_id } });
          window.open(`#/statistics/sales/salesBusinessDetail?id=${row.business_order_id }`, '_blank')
        }

      } else if (tpye === 'edit') {
        window.open(`#/statistics/sales/editSales?id=${row.id }`, '_blank')
        //this.$router.push({ path: `/statistics/sales/editSales`, query: { id: row.id } });
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
      this.adjustRow = row;
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
        if (this.multipleSelection[i].waybill_status.key === 'is_unload') {
          if (this.multipleSelection[i].is_reconciliation.key === 'unfinished' && type === 'reconciliation') {
            ids.push(this.multipleSelection[i].id);
            price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
          }
          if (this.multipleSelection[i].is_invoice.key === 'no' && this.multipleSelection[i].is_reconciliation.key === 'finished' && type === 'invoice') {
            ids.push(this.multipleSelection[i].id);
            price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
          }
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
          content = '未' + title + '共有' + ids.length + '单，待时后总额合计' + price + '元，是否要对所选运单进行批量' + title + '？';
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
        waybill_status: this.searchPostData.waybill_status,
        consumer_confirm:this.searchPostData.consumer_confirm
      };
      if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
        postData.leave_time_start = this.leaveTime[0];
        postData.leave_time_end = this.leaveTime[1];
      }

      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.updateData = postData;
      this.$$http('getSalesStatisticsList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          for (let i in this.tableData.data.data) {
            // this.tableData.data.data[i].check_quantity_dvalue = '';
            // this.tableData.data.data[i].unit_price_dvalue = '';
            // this.tableData.data.data[i].unload_nums_dvalue = '';
            // this.tableData.data.data[i].waiting_charges_dvalue = '';
            // if (this.tableData.data.data[i].check_quantity_adjust) {
            //   this.tableData.data.data[i].check_quantity_dvalue = (parseFloat(this.tableData.data.data[i].check_quantity_adjust) * 1000 - parseFloat(this.tableData.data.data[i].check_quantity) * 1000) / 1000;
            // }
            // if (this.tableData.data.data[i].unit_price_adjust) {
            //   this.tableData.data.data[i].unit_price_dvalue = (parseFloat(this.tableData.data.data[i].unit_price_adjust) * 100 - parseFloat(this.tableData.data.data[i].unit_price) * 100) / 100;
            // }
            // if (this.tableData.data.data[i].unload_nums_adjust) {
            //   this.tableData.data.data[i].unload_nums_dvalue = (parseFloat(this.tableData.data.data[i].unload_nums_adjust) * 1000 - parseFloat(this.tableData.data.data[i].unload_nums) * 1000) / 1000;
            // }
            // if (this.tableData.data.data[i].waiting_charges_adjust) {
            //   this.tableData.data.data[i].waiting_charges_dvalue = (parseFloat(this.tableData.data.data[i].waiting_charges_adjust) * 100 - parseFloat(this.tableData.data.data[i].waiting_charges) * 100) / 100;
            // }
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

    }
  },
  created() {
    let nowDate = new Date();
    let nowDateDetail = this.pbFunc.getDateDetail(nowDate);
    let nowDateStr = nowDateDetail.year + '-' + nowDateDetail.month + '-' +  nowDateDetail.day + ' ' + nowDateDetail.hour + ':' + nowDateDetail.minute + ':' +  nowDateDetail.second;
    this.leaveTime = this.$route.query.leaveTime ? (this.$route.query.leaveTime).split(','):['2018-09-30 16:00:00',nowDateStr];
    this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
    this.getList();
  }

}

</script>
