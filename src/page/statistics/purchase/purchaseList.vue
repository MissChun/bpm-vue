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
          </el-row>
        </el-form>
      </div>
      <div class="operation-btn">
        <el-row>
          <el-col :span="20" class="total-data">
            一共{{tableData.waybill?tableData.waybill:0}}单，实际装车吨位{{tableData.active_tonna?tableData.active_tonna:0}}吨，采购总额{{tableData.unit_sum_pri?tableData.unit_sum_pri:0}}元，采购优惠后总额{{tableData.discounts_sum_pri?tableData.discounts_sum_pri:0}}元
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-list">
        <el-table :data="tableData.data?tableData.data.data:[]" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
            <template slot-scope="scope">
              <div v-if="item.param === 'waybill'">
                <!-- <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.waybill}}</router-link> -->
                <span class="text-blue" v-on:click="handleMenuClick({operator:'check',id:scope.row.waybill_id})">{{scope.row.waybill}}</span>
              </div>
              <div v-else>{{scope.row[item.param]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleMenuClick({operator:'edit',id:scope.row.id})">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  name: 'purchaseList',
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
        created_at: '',
        keyword: '',
        field: 'waybill',
      },
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      statusTabList: [{
        title: '经理审批中',
        key: 'create_manager_check',
      }, {
        title: '部门审批中',
        key: 'create_department_check',
      }],
      selectData: {
        isBindSelect: [
          { id: '', value: '全部' },
          { id: false, value: '未绑定' },
          { id: true, value: '已绑定' }
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
        width: '200'
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
        width: '150'
      }, {
        title: '采购单价（元）',
        param: 'unit_price',
        width: ''
      }, {
        title: '卸货站',
        param: 'station',
        width: ''
      }, {
        title: '业务优惠（元）',
        param: 'business_price',
        width: ''
      }, {
        title: '优惠单价（元）',
        param: 'discount_price',
        width: ''
      }, {
        title: '采购总额',
        param: 'unit_sum_price',
        width: ''
      }, {
        title: '优惠后总额',
        param: 'discounts_sum_price',
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
    },
    exportData() {
      let postData = {
        filename: '采购数据',
        page_arg: 'procurement',
        ids: []
      };
       for (let i = 1; i <= 12; i++) {
        postData.ids.push(i.toString());
      }
      if (this.planArriveTime instanceof Array && this.planArriveTime.length > 0) {
        postData.active_time_start = this.planArriveTime[0];
        postData.active_time_end = this.planArriveTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }

      this.$$http('exportPurchaseData', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.exportBtn = {
            text: '导出',
            isLoading: false,
            isDisabled: false,
          }
          if (results.data && results.data.code == 0) {
            window.open(results.data.data.filename);
          }
      }).catch((err) => {
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
      })
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      };
      if (this.planArriveTime instanceof Array && this.planArriveTime.length > 0) {
        postData.active_time_start = this.planArriveTime[0];
        postData.active_time_end = this.planArriveTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getPurchaseStatisticsList', postData).then((results) => {
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
