
<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="承运商应付报表" name="meet">
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
              <el-row :gutter="30">
                <el-col :span="10">
                  <el-form-item label="开始日期:">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-date-picker v-model="startTime" type="month" placeholder="选择开始月" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss" @change="dateSelect"></el-date-picker>
                      </el-col>
                      <el-col :span="2" class="text-center">-</el-col>
                      <el-col :span="11">
                        <el-date-picker v-model="endTime" type="month" placeholder="选择结束月" :clearable="false" value-format="yyyy-MM" @change="dateSelect('end')">
                        </el-date-picker>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right" v-if="false">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="success" @click="addPerson">新增</el-button> -->
          </div>
          <div class="table-list mt-25">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" max-height="600" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :width="item.width" :label="item.title">
              </el-table-column>
            </el-table>
            <no-data v-if="!pageLoading && !tableData.length"></no-data>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="付款管理" name="payment"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'carrierMeetList',

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
      activeName: 'meet',
      searchPostData: {}, //搜索参数
      searchFilters: {
        supplier_id: '',
        field: 'carrier_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'carrier_name', value: '承运商' },
        ],
        supplierSelect: [], //供应商
      },
      startTime: '', //开始日期
      endTime: '', //结束日期
      thTableList: [{
        title: '承运商',
        param: 'carrier_name',
        width: '200'
      }, {
        title: '期初金额',
        param: 'first_amount',
        width: ''
      }, {
        title: '核算吨位',
        param: 'check_quantity_sum',
        width: ''
      }, {
        title: '亏吨',
        param: 'deficiency_sum',
        width: ''
      }, {
        title: '里程',
        param: 'stand_mile_sum',
        width: ''
      }, {
        title: '运费合计',
        param: 'waiting_charges_sum',
        width: ''
      }, {
        title: '付款金额',
        param: 'total_amount',
        width: ''
      }, {
        title: '调账金额',
        param: 'change_amount',
        width: ''
      }, {
        title: '期末金额',
        param: 'last_amount',
        width: ''
      }],
      tableData: [],

    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    dateSelect(type) {
      let dates = this.endTime.split('-');
      let days = (new Date(dates[0], dates[1], 0)).getDate();
      if (type === 'end') {
        this.endTime = this.endTime + '-' + days + ' 23:23:59';
      }
      let endDate = this.pbFunc.compareDate(this.startTime, this.endTime);
      if (endDate) {
        this.startSearch();
      } else {
        this.$message.warning('结束日期小于开始日期');
      }

    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        active_time_start: this.startTime,
        active_time_end: this.endTime,
      };
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.$$http('getCarrierMeetList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    getSupplier: function() {
      let postData = {
        need_all: true,
      }
      this.$$http('searchSupplierList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.selectData.supplierSelect = results.data.data;
        }
      }).catch((err) => {})
    },
    handleClick: function(tab, event) {
      console.log('tab222', tab);
      if (tab.name === 'payment') {
        this.$router.push({ path: "/arap/carrierMeetManage/paymentManage" });
      }
    },

    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    },
    payerDate() {
      let payDate = new Date();
      let days = (new Date(payDate.getFullYear(), payDate.getMonth() + 1, 0)).getDate();
      this.startTime = payDate.getFullYear() + '-' + (payDate.getMonth() + 1) + '-' + '01 00:00:00';
      this.endTime = payDate.getFullYear() + '-' + (payDate.getMonth() + 1) + '-' + days + ' 23:23:59';
    }
  },
  activated() {
    this.activeName = 'meet'
  },
  created: function() {
    this.payerDate();
    // this.pbFunc.format();
    this.getList();
    this.getSupplier();
  }
}

</script>
