<style scoped lang="less">
.nav-tab-setting {
  position: relative;
  .business-btn {
    right: 0;
    position: absolute;
    top: -15px;
    z-index: 2;
  }
  .operation-btn-list {
    span+span {
      margin-left: 10px;
    }
  }
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="供应商应付账款" name="meet"></el-tab-pane>
        <el-tab-pane label="客户应收报表" name="customer"></el-tab-pane>
        <el-tab-pane label="回款管理" name="receivable">
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
                  <el-form-item label="付款日期:">
                    <el-date-picker v-model="payerTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="nav-tab-setting mt-25">
      <div class="business-btn">
        <!-- <el-button type="primary" plain @click="">导入</el-button> -->
        <el-button type="success" @click="arapDialogEdit('add')">新增</el-button>
      </div>
      <el-tabs v-model="receivableActive" @tab-click="receivableClick">
        <el-tab-pane label="付款方回款" name="paymentReceivable">
        </el-tab-pane>
        <el-tab-pane label="客户回款" name="customerReceivable">
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" max-height="600" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
                <template slot-scope="scope">
                  <div v-if="item.param==='payment_datetime'">{{scope.row[item.param]|dateFilter}}</div>
                  <div v-else>
                    <div v-if="item.param==='desc'" class='td-hover' :title="scope.row[item.param]">{{scope.row[item.param]}}</div>
                    <div v-else>
                      {{scope.row[item.param]}}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="arapDialogEdit('update',scope.row)">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <customer-receivable-dialog :arap-dialog="arapDialog" v-on:closeDialogBtn="closeDialog" :arap-row="arapRow"></customer-receivable-dialog>
  </div>
</template>
<script>
import customerReceivableDialog from '@/components/arap/customerReceivableDialog';
export default {
  name: 'customerReceivableList',
  components: {
    customerReceivableDialog: customerReceivableDialog
  },
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
      activeName: 'receivable',
      receivableActive: 'customerReceivable',
      searchPostData: {}, //搜索参数
      searchFilters: {
        field: 'shortname',
      },
      payerTime: [], //付款时间
      selectData: {
        fieldSelect: [
          { id: 'shortname', value: '客户简称' },
          { id: 'consumer', value: '客户名称' },
          { id: 'saleman', value: '业务员' },
        ]
      },
      thTableList: [{
        title: '客户简称',
        param: 'consumer_shortname',
        width: ''
      }, {
        title: '客户名称',
        param: 'consumer_name',
        width: '200'
      }, {
        title: '业务员',
        param: 'consumer_saleman',
        width: ''
      }, {
        title: '回款金额',
        param: 'amount',
        width: ''
      }, {
        title: '回款日期',
        param: 'payment_datetime',
        width: ''
      }, {
        title: '备注',
        param: 'desc',
        width: '170'
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }],
      tableData: [],
      arapDialog: {
        isShow: false,
        type: 'add'
      }, //弹窗
      arapRow: {} //内容
    }
  },
  methods: {
    closeDialog: function(isSave) {
      this.arapDialog.isShow = false;
      if (isSave) {
        this.getList();
      }
    },
    // 调账
    arapDialogEdit(type, row) {
      this.arapDialog = {
        isShow: true,
        type: type
      };
      if (row) {
        this.arapRow = row;
      }

    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
      };
      if (this.payerTime && this.payerTime.length) {
        postData.payment_datetime_start = this.payerTime[0];
        postData.payment_datetime_end = this.payerTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);

      this.pageLoading = true;

      this.$$http('getCustomerReceivableList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          for (let i in this.tableData) {
            this.tableData[i].carrierListStr = '';
            this.tableData[i].fluidListStr = '';
            for (let j in this.tableData[i].agreements) {
              // this.tableData[i].carrierListStr += this.tableData[i].agreements[j].carrier_name + (j < this.tableData[i].agreements[j].length - 1 ? ',' : '');
              this.tableData[i].fluidListStr += this.tableData[i].agreements[j].fluid_name + (j < this.tableData[i].agreements.length - 1 ? '，' : '');
            }
          }
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleClick: function(tab, event) {
      if (tab.name === 'meet') {
        this.$router.push({ path: "/arap/payerMeetManage/payerMeetList" });
      } else if (tab.name === 'customer') {
        this.$router.push({ path: "/arap/payerMeetManage/customerMeetList" });
      }
    },
    receivableClick(tab, event) {
      if (tab.name === 'paymentReceivable') {
        this.$router.push({ path: "/arap/payerMeetManage/payerReceivableList" });
      }
    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },
  activated() {
    this.activeName = 'receivable';
    this, receivableActive = 'customerReceivable';
  },
  created: function() {
    this.getList();
  }
}

</script>
