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
                  <el-option v-for="(item,key) in filterParam.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="实际到厂时间:" label-width="105px">
                <el-date-picker v-model="activeTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <!-- <el-date-picker v-model="leaveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际离站时间:" label-width="105px">
                <el-date-picker v-model="leaveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                <!-- <el-date-picker v-model="activeTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划装车时间:" label-width="105px">
                <el-date-picker v-model="planTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="是否对账:">
                <el-select v-model="searchFilters.is_reconciliation" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.isReconciliations.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否开票:">
                <el-select v-model="searchFilters.is_invoice" @change="startSearch" placeholder="请选择">
                  <el-option v-for="(item,key) in filterParam.isInvoice.data" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="15" class="total-data" v-if="multipleSelection.length==0">
            一共{{tableData.waybill?tableData.waybill:0}}单，运费总计{{tableData.waiting_charg?tableData.waiting_charg:0}}元
          </el-col>
          <el-col :span="15" class="total-data" v-else>
            当前选择{{chooseCount.num}}单，运费总计{{chooseCount.waiting_charges}}元
          </el-col>
          <el-col :span="9" class="text-right">
            <el-button type="success" plain @click="updatePostData">获取更新数据</el-button>
            <el-button type="primary" plain @click="batchReconciliation('reconciliation')">批量对账</el-button>
            <el-button type="success" @click="batchReconciliation('invoice')">批量开票</el-button>
            <!--<export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportLogisticData'"></export-button>-->
            <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportTableData('logistic')">{{exportBtn.text}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableDataObj.data?tableDataObj.data:[]" stripe style="width: 100%" max-height="600" size="mini" @selection-change="handleSelectionChange" v-loading="pageLoading" :class="{'tabal-height-500':!tableDataObj.len}">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'||item.param === 'business_order'">
                <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                <span class="text-blue cursor-pointer" v-on:click="handleMenuClick(item.param,scope.row)">{{scope.row[item.param]}}</span>
              </div>
              <div v-else>
                <div>
                  <div class="adjust" v-if="item.isAdjust&&scope.row[item.adjustParam]&&scope.row[item.adjustParam]!=scope.row[item.param]"><span>{{scope.row[item.adjustParam]}}</span></div>
                </div>
                <div v-if="item.param==='remark_adjust'||item.param==='remark'" class='td-hover' :title="scope.row[item.param]">{{scope.row[item.param]}}</div>
                <span v-else v-html="scope.row[item.param]"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="是否对账" align="center" width="100">
            <template slot-scope="scope">
              <div>{{scope.row.is_reconciliation.verbose}}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否开票" align="center" width="100">
            <template slot-scope="scope">
              <div>{{scope.row.is_invoice.verbose}}</div>
            </template>
          </el-table-column>
          <el-table-column label="运费合计" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <div>
                <div class="adjust" v-if="scope.row.waiting_charges_differ"><span>{{scope.row.waiting_charges_differ}}</span></div>
                {{scope.row.waiting_charges}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.is_reconciliation.key==='unfinished'">
                <el-button type="primary" plain size="mini" @click="reconciliations(false,scope.row.id,'','reconciliation')">对账</el-button>
                <el-button type="primary" size="mini" @click="handleMenuClick('edit',scope.row)">编辑</el-button>
              </div>
              <div v-if="scope.row.is_reconciliation.key==='finished'&&scope.row.is_invoice.key==='no'">
                <el-button type="success" size="mini" plain v-if="scope.row.is_adjust.key==='no'" @click="accountAdjust(scope.row)">调账</el-button>
                <el-button type="success" size="mini" v-if="scope.row.is_invoice.key==='no'" @click="reconciliations(false,scope.row.id,'','invoice')">开票</el-button>
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
    <consignment-adjustment-dialog :account-adjust-is-show="accountAdjustIsShow" v-on:closeDialogBtn="closeDialog" :adjust-row="adjustRow"></consignment-adjustment-dialog>
    <update-new-data-dialog :is-show="updateDataIsShow" v-on:closeDialogBtn="updateCloseDialog" :api-name="'updateLogisticStatisticsList'" :type-str="'托运数据'" :filter-param="filterParam" :update-data="updateData" :ids="getNewDataIds" :all-num="pageData.totalCount"></update-new-data-dialog>
  </div>
</template>
<script>
import consignmentAdjustmentDialog from '@/components/statistics/consignmentAdjustmentDialog';
import updateNewDataDialog from '@/components/statistics/updateNewDataDialog';
export default {
  name: 'consignmentList',
  components: {
    consignmentAdjustmentDialog: consignmentAdjustmentDialog,
    updateNewDataDialog: updateNewDataDialog
  },
  computed: {

  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10,
      },
      tableDataObj: {
        len: '', //长度
        data: [], //内容
      },
      leaveTime: [], //实际离站时间
      activeTime: [], //实际到厂时间
      planTime: [], //计划装车时间
      selectMenus: [], //批量勾选
      searchPostData: {}, //搜索参数
      searchFilters: {
        is_reconciliation: [],
        is_invoice: '',
        keyword: '',
        field: 'plate_number',
      },
      exportType: {
        filename: '托运数据',
        type: 'logistic'
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
          // { id: 'consumer_name', value: '客户名称' },
          { id: 'plate_number', value: '车号' },
        ]
      },
      filterParam: {
        isReconciliations: {
          id: 'is_reconciliation',
          value: '是否对账',
          data: [
            { id: '', value: '全部' },
            { id: 'unfinished', value: '未对账' },
            { id: 'finished', value: '已对账' }
          ]
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
        fieldSelect: [
          { id: 'waybill', value: '运单号' },
          { id: 'carrier', value: '承运商' },
          // { id: 'consumer_name', value: '客户名称' },
          { id: 'plate_number', value: '车号' },
          { id: 'station', value: '卸货站' },
          { id: 'fluid', value: '液厂' }

        ],
        times: [{
          id: 'leave_time_start',
          timeEnd: 'leave_time_end',
          value: '实际离站时间'
        }, {
          id: 'active_time_start',
          timeEnd: 'active_time_end',
          value: '实际到厂时间'
        }, {
          id: 'plan_loading_time_start',
          timeEnd: 'plan_loading_time_end',
          value: '计划装车时间'
        }],
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
        width: '200',
        isAdjust: true,
        adjustParam: 'carrier_adjust'
      }, {
        title: '车号',
        param: 'plate_number',
        width: ''
      }, {
        title: '液厂',
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
        title: '实际到厂时间',
        param: 'active_time',
        width: '180'
      }, {
        title: '装车完成时间',
        param: 'work_end_time',
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
        width: '',
        isAdjust: true,
        adjustParam: 'check_quantity_differ'
      }, {
        title: '标准里程',
        param: 'stand_mile',
        width: '',
        isAdjust: true,
        adjustParam: 'stand_mile_differ'
      }, {
        title: '实际里程',
        param: 'actual_mile',
        width: ''
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
      }, {
        title: '卸车待时金额',
        param: 'waiting_price',
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
        title: '开票时间',
        param: 'invoice_time',
        width: '180'
      }, {
        title: '调账备注',
        param: 'remark_adjust',
        width: '180'
      }, {
        title: '调账时间',
        param: 'adjust_time',
        width: '180'
      }],
      tableData: [],

      reconciliationsBtn: {
        text: '批量对账',
        isDisabled: false,
        isLoading: false
      },

      multipleSelection: [], //所选数据   
      reconciliationList: [], //
      exportPostData: {}, //导出筛选
      accountAdjustIsShow: false, //调账弹窗
      updateDataIsShow: false, //获取更新数据
      adjustRow: {}, //调账信息
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      chooseCount: {
        num: 0,
        waiting_charges: "0.00"
      },
      updateData: {},
      getNewDataIds: [] //获取最新数据的ID
    }
  },
  methods: {
    updateCloseDialog(isSave) {
      this.updateDataIsShow = false;
      if (isSave) {
        this.getList();
      }
    },
    // 更新数据
    updatePostData() {
      this.updateData = this.postDataFilter(this.updateData);
      this.getNewDataIds = [];
      for (let i in this.multipleSelection) {
        if (this.multipleSelection[i].is_reconciliation.key === 'unfinished') {
          this.getNewDataIds.push(this.multipleSelection[i].id);
        }
      }
      if (this.getNewDataIds.length || this.pbFunc.objSize(this.updateData)) {
        this.updateDataIsShow = true;
      } else {
        this.$message.warning('没有勾选未对账运单数据可获取或筛选条件');
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 0) {
        this.calculation();
      }
    },
    calculation: function() {
      var newfifterCount = { num: 0, waiting_charges: "0.00" };
      this.multipleSelection.forEach(item => {
        newfifterCount.num++;
        // newfifterCount.check_quantity_sum=(parseFloat(newfifterCount.check_quantity_sum)+parseFloat(item.check_quantity_sum)).toFixed(2);
        newfifterCount.waiting_charges = (parseFloat(newfifterCount.waiting_charges) + parseFloat(item.waiting_charges)).toFixed(2);
      });
      this.chooseCount = newfifterCount;
    },
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    handleMenuClick(tpye, row) {
      if (tpye === 'waybill') {
        if (row.waybill.indexOf("TE") != -1) {
          //this.$router.push({ path: `/statistics/consignment/consignmentOutsideBuyDetali/${row.waybill_id}` });
          window.open(`#/statistics/consignment/consignmentOutsideBuyDetali/${row.waybill_id}`, '_blank')
        } else if (row.waybill.indexOf("TSE") != -1 || row.waybill.indexOf("T+") != -1) {

        } else {
          //this.$router.push({ path: `/statistics/consignment/consignmentWaybillDetail/${row.waybill_id}/${row.business_order_id}` });
          window.open(`#/statistics/consignment/consignmentWaybillDetail/${row.waybill_id}/${row.business_order_id}`, '_blank')
        }
      } else if (tpye === 'business_order') {
        if (row.business_order.indexOf("SE") != -1) {
          //this.$router.push({ path: `/statistics/consignment/consignmentOutsidePickDetali/${row.business_order_id}` });
          window.open(`#/statistics/consignment/consignmentOutsidePickDetali/${row.business_order_id}`, '_blank')
        } else if (row.business_order.indexOf("S+") != -1) {

        } else {
          //this.$router.push({ path: `/statistics/consignment/consignmentBusinessDetail`, query: { id: row.business_order_id } });
          window.open(`#/statistics/consignment/consignmentBusinessDetail?id=${row.business_order_id}`, '_blank')
        }

      } else if (tpye === 'edit') {
        //this.$router.push({ path: `/statistics/consignment/editConsignment`, query: { id: row.id } });
        window.open(`#/statistics/consignment/editConsignment?id=${row.id}`, '_blank')
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

    },
    // 全部对账
    getUnReconciliations() {
      let postData = this.postDataFilter(this.exportPostData);
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
    // 批量对账弹窗
    // batchReconciliation() {
    //   let ids = [];
    //   let price = 0;
    //   for (let i in this.multipleSelection) {
    //     if (this.multipleSelection[i].is_reconciliation.key === 'unfinished') {
    //       ids.push(this.multipleSelection[i].id);
    //       price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
    //     }
    //   }
    //   this.reconciliations(true, ids, price / 100);
    // },
    batchReconciliation(type) {
      let ids = [];
      let price = 0;
      for (let i in this.multipleSelection) {
        if (this.multipleSelection[i].is_reconciliation.key === 'unfinished' && type === 'reconciliation') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
        }
        if (this.multipleSelection[i].is_invoice.key === 'no' && this.multipleSelection[i].is_reconciliation.key === 'finished' && type === 'invoice') {
          ids.push(this.multipleSelection[i].id);
          price += parseFloat(this.multipleSelection[i].waiting_charges) * 100;
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
          content = '未' + title + '共有' + ids.length + '单，运费合计' + price + '元，是否要对所选运单进行批量' + title + '？';
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
          this.$$http('reconciliations', postData).then((results) => {
            if (results.data && results.data.code == 0) {
              this.getList();
            }
          })
        }).catch(() => {});
      }
    },
    // reconciliations(isAll, ids, price) {
    //   let content = '';
    //   let postData = {
    //     is_reconciliation: 'finished'
    //   };
    //   if (isAll) {
    //     if (ids.length) {
    //       content = '未对账共有' + ids.length + '单，运费合计' + price + '元，是否要对所选运单进行批量对账？';
    //       postData.id = ids;
    //       // postData.batch = 'unfinished';
    //     } else {
    //       this.$message({
    //         message: '请勾选未对账数据',
    //         type: 'warning'
    //       });
    //     }
    //   } else {
    //     content = '是否确认对账？';
    //     postData.id = ids.split(',');
    //   }
    //   // if (this.leaveTime instanceof Array && this.leaveTime.length > 0) {
    //   //   postData.leave_time_start = this.leaveTime[0];
    //   //   postData.leave_time_end = this.leaveTime[1];
    //   // }
    //   // if (this.activeTime instanceof Array && this.activeTime.length > 0) {
    //   //   postData.active_time_start = this.activeTime[0];
    //   //   postData.active_time_end = this.activeTime[1];
    //   // }

    //   // postData[this.searchPostData.field] = this.searchPostData.keyword;
    //   // postData = this.pbFunc.fifterObjIsNull(postData);
    //   if (ids.length) {
    //     this.$confirm(content, "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(() => {
    //       this.$$http('reconciliations', postData).then((results) => {
    //         if (results.data && results.data.code == 0) {
    //           this.getList();
    //         }
    //       })
    //     }).catch(() => {});
    //   }
    // },
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
      if (this.activeTime instanceof Array && this.activeTime.length > 0) {
        postData.active_time_start = this.activeTime[0];
        postData.active_time_end = this.activeTime[1];
      }
      if (this.planTime instanceof Array && this.planTime.length > 0) {
        postData.plan_loading_time_start = this.planTime[0];
        postData.plan_loading_time_end = this.planTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.updateData = postData;
      this.$$http('getConsignmentStatisticsList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data;
          for (let i in this.tableData.data.data) {
            // this.tableData.data.data[i].check_quantity_dvalue = '';
            // this.tableData.data.data[i].stand_mile_dvalue = '';
            // this.tableData.data.data[i].waiting_charges_dvalue = '';
            // if (this.tableData.data.data[i].check_quantity_adjust) {
            //   this.tableData.data.data[i].check_quantity_dvalue = (parseFloat(this.tableData.data.data[i].check_quantity_adjust) * 1000 - parseFloat(this.tableData.data.data[i].check_quantity) * 1000) / 1000;
            // }
            // if (this.tableData.data.data[i].stand_mile_adjust) {
            //   this.tableData.data.data[i].stand_mile_dvalue = (parseFloat(this.tableData.data.data[i].stand_mile_adjust) * 10 - parseFloat(this.tableData.data.data[i].stand_mile) * 10) / 10;
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
        id: 40,
      }, {
        title: '业务单号',
        id: 41,
      }, {
        title: '承运商',
        id: 42,
      }, {
        title: '调账承运商',
        id: 184,
      }, {
        title: '车牌号',
        id: 43,
      }, {
        title: '液厂',
        id: 44,
      }, {
        title: '卸货站',
        id: 45,
      }, {
        title: '计划装车时间',
        id: 46,
      }, {
        title: '实际到厂时间',
        id: 47,
      }, {
        title: '装车完成时间',
        id: 126,
      }, {
        title: '实际离站时间',
        id: 48,
      }, {
        title: '装车吨位',
        id: 49,
      }, {
        title: '实收吨位',
        id: 50,
      }, {
        title: '亏吨',
        id: 51,
      }, {
        title: '核算吨位',
        id: 53,
      }, {
        title: '调账核算吨位差值',
        id: 185,
      }, {
        title: '标准里程',
        id: 54,
      }, {
        title: '标准里程差值',
        id: 186,
      }, {
        title: '实际里程',
        id: 112,
      }, {
        title: '起步价',
        id: 55,
      }, {
        title: '运输费率',
        id: 52,
      }, {
        title: '标准运价',
        id: 171,
      }, {
        title: '标准运费',
        id: 56,
      }, {
        title: '气差金额',
        id: 57,
      }, {
        title: '分卸费',
        id: 58,
      }, {
        title: '卸车待时金额',
        id: 59,
      }, {
        title: '备注',
        id: 172,
      }, {
        title: '对账时间',
        id: 170,
      }, {
        title: '开票时间',
        id: 169,
      }, {
        title: '调账备注',
        id: 118,
      }, {
        title: '调账时间',
        id: 119,
      }, {
        title: '是否对账',
        id: 61,
      }, {
        title: '是否开票',
        id: 226,
      }, {
        title: '运费合计',
        id: 60,
      }, {
        title: '调账运费合计差值',
        id: 187,
      }]

      const exportThTableListIds = exportThTableList.map(item => item.id);

      let postData = {
        filename: '托运数据',
        page_arg: 'logistic',
        ids: exportThTableListIds
      };
      this.exportPostData = this.postDataFilter(this.exportPostData);
      let newPostData = Object.assign(this.exportPostData, postData);
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }
      this.$$http('exportLogisticData', newPostData).then((results) => {
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
    this.getList();
  }

}

</script>
