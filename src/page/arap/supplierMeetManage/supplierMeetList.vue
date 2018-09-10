<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="供应商应付账款" name="meet">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="30">
                <el-col :span="6">
                  <el-form-item label="供应商:">
                    <el-select v-model="searchFilters.supplier_id" @change="startSearch" clearable filterable placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.supplierSelect" :key="key" :label="item.supplier_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="开始日期:" label-width="105px">
                    <el-date-picker v-model="startTime" type="month" placeholder="选择月">
                    </el-date-picker>
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
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :width="item.width?item.width:140" :label="item.title">
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
  name: 'supplierMeetList',

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
      searchFilters: {
        supplier_id: '',
      },
      selectData: {
        supplierSelect: [] //供应商
      },
      startTime: [], //开始日期
      thTableList: [{
        title: '供应商',
        param: 'supplier_name',
        width: '200'
      }, {
        title: '期初金额',
        param: 'first_amount',
        width: ''
      }, {
        title: '装车数',
        param: 'car_no',
        width: ''
      }, {
        title: '装车吨位',
        param: 'active_tonnage',
        width: ''
      }, {
        title: '采购优惠后总额',
        param: 'discounts_sum_price',
        width: ''
      }, {
        title: '调账金额',
        param: 'change_amount',
        width: ''
      }, {
        title: '付款金额',
        param: 'total_amount',
        width: ''
      }, {
        title: '期末金额',
        param: 'last_amount',
        width: ''
      }, {
        title: '期初欠票金额',
        param: 'first_debt_amount',
        width: ''
      }, {
        title: '收票金额',
        param: 'receive_amount',
        width: ''
      }, {
        title: '期末欠票金额',
        param: 'last_detb_amount',
        width: ''
      }],
      tableData: [],

    }
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },

    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        // agreements__carrier: this.searchFilters.agreements__carrier,
        // agreements__fluid: this.searchFilters.agreements__fluid
      };
      postData = this.pbFunc.fifterObjIsNull(postData);

      // postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getSupplierMeetList', postData).then((results) => {
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
        this.$router.push({ path: "/arap/supplierMeetManage/paymentManage" });
      }
    },

    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },
  activated() {
    this.activeName = 'meet'
  },
  created: function() {
    this.getList();
    this.getSupplier();
  }
}

</script>
