<style scoped lang="less">

/deep/ .total-data {
  line-height: 40px;
}
</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="付款方应收报表" name="meet">
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
                    <el-date-picker v-model="activeTime" type="datetimerange" @change="startSearch" :clearable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['16:00:00','16:00:00']"></el-date-picker>
                    <!--     <el-row :gutter="0">
                      <el-col :span="11">
                        <el-date-picker v-model="startTime" type="month" placeholder="选择开始月" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss" @change="dateSelect"></el-date-picker>
                      </el-col>
                      <el-col :span="2" class="text-center">-</el-col>
                      <el-col :span="11">
                        <el-date-picker v-model="endTime" type="month" placeholder="选择结束月" :clearable="false" value-format="yyyy-MM" @change="dateSelect('end')">
                        </el-date-picker>
                      </el-col>
                    </el-row> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
         <!--  <div class="operation-btn text-right">

            <el-button type="primary" plain @click="importList">导入</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="success" @click="addPerson">新增</el-button>
          </div> -->
          <div class="operation-btn">
            <el-row>
              <el-col :span="14" class="total-data">
                选中{{fifterCount.num}}单，回款金额{{fifterCount.total_amount}}元，期末余额{{fifterCount.last_amount}}元,卸车数{{fifterCount.car_no}}辆
              </el-col>
              <el-col :span="10" class="text-right">
                <export-button :export-type="exportType" :export-post-data="exportPostData" :export-api-name="'exportPayerMeetData'"></export-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe ref="multipleTable" style="width: 100%" size="mini" max-height="600" v-loading="pageLoading" :class="{'tabal-height-500':!tableData.length}" @select="checkRows" @select-all="checkAllRows">
              <el-table-column type="selection" width="55"></el-table-column>
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
        <el-tab-pane label="客户应收报表" name="customer"></el-tab-pane>
        <el-tab-pane label="回款管理" name="receivable"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'payerMeetList',

  computed: {

  },
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 20,
      },
      activeTime: [],
      activeName: 'meet',
      searchPostData: {}, //搜索参数
      searchFilters: {
        field: 'payer_name',
      },
      selectData: {
        fieldSelect: [
          { id: 'payer_name', value: '付款客户' },
        ],
        supplierSelect: [], //供应商
      },
      fifterCount:{
        num:0,
        // check_quantity_sum:"0.00",
        total_amount:"0.00",
        last_amount:"0.00",
        car_no:0,
      },
      chooseArr:[],
      startTime: '', //开始日期
      endTime: '', //结束日期
      thTableList: [{
        title: '付款方客户',
        param: 'payer',
        width: '200'
      }, {
        title: '期初余额',
        param: 'first_amount',
        width: ''
      }, {
        title: '待时后总额',
        param: 'waiting_charges_sum',
        width: ''
      }, {
        title: '调账金额',
        param: 'change_amount',
        width: ''
      }, {
        title: '回款金额',
        param: 'total_amount',
        width: ''
      }, {
        title: '期末余额',
        param: 'last_amount',
        width: ''
      }, {
        title: '能源利润',
        param: 'energy_profit',
        width: ''
      }, {
        title: '卸车数',
        param: 'car_no',
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
      exportPostData: {}, //导出筛选
      exportType: {
        type: 'payer-pay',
        filename: '付款方应收报表',
        isPage: true,
        pageSize: 20,
      },
    }
  },
  methods: {
    checkRows:function(selection, row){
      var sendJudge = false;
        selection.forEach(item => {
          if (item.id == row.id) {
            sendJudge = true;
          }
      });
      if(sendJudge){
        this.chooseArr=this.chooseArr.concat(row);
      }else{
        var newArr=[];
        this.chooseArr.forEach((Citem)=>{
          if(Citem.id!=row.id){
            newArr.push(Citem);
          }
        });
        this.chooseArr=newArr;
      }

      this.calculation();
    },
     checkAllRows:function(selection){
      if(selection.length==0){
        let middleArr=[];
        this.chooseArr.forEach(item=>{
          let add=true;
          this.tableData.forEach(Titem=>{
            if(item.id==Titem.id){
              add=false;
            }
          });
          if(add){
            middleArr.push(item);
          }
        });
        this.chooseArr=middleArr;
      }else{
        let middleArr=[];
        selection.forEach(Sitem=>{
          var isIn=false;
          this.chooseArr.forEach(item=>{
            if(Sitem.id==item.id){
              isIn=true;
            }
          });
          if(!isIn){
            this.chooseArr.push(Sitem);
          }
        });
      }
      this.calculation();
    },
    calculation:function(){
      var newfifterCount={num:0,total_amount:"0.00",last_amount:"0.00",car_no:0};
      this.chooseArr.forEach(item=>{
        newfifterCount.num++;
        // newfifterCount.check_quantity_sum=(parseFloat(newfifterCount.check_quantity_sum)+parseFloat(item.check_quantity_sum)).toFixed(2);
        newfifterCount.total_amount=(parseFloat(newfifterCount.total_amount)+parseFloat(item.total_amount)).toFixed(2);
        newfifterCount.last_amount=(parseFloat(newfifterCount.last_amount)+parseFloat(item.last_amount)).toFixed(2);
        newfifterCount.car_no+=parseInt(item.car_no);
      });
      this.fifterCount=newfifterCount;
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList();
    },
    dateSelect(type) {
      let dates = this.endTime.split('-');
      let days = (new Date(dates[0], dates[1], 0)).getDate();
      if (type === 'end') {
        this.endTime = this.endTime + '-' + days + ' 23:59:59';
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
        // active_time_start: this.startTime,
        // active_time_end: this.endTime,
      };
      if (this.activeTime&&this.activeTime.length) {
        postData.active_time_start = this.activeTime[0];
        postData.active_time_end = this.activeTime[1];
      }else{
        this.activeTime = [this.startTime, this.endTime];
        postData.active_time_start = this.activeTime[0];
        postData.active_time_end = this.activeTime[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;
      this.exportPostData = postData;
      this.$$http('getPayerMeetList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;
          setTimeout(() => {
            this.chooseArr.forEach(row => {
              this.tableData.forEach(thisRow=>{
                if(thisRow.id==row.id){
                  this.$refs.multipleTable.toggleRowSelection(thisRow, true);
                }
              });
            });

          })
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
      if (tab.name === 'customer') {
        this.$router.push({ path: "/arap/payerMeetManage/customerMeetList" });
      } else if (tab.name === 'receivable') {
        this.$router.push({ path: "/arap/payerMeetManage/payerReceivableList" });
      }
    },

    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    },
    payerDate() {
      let payDate = new Date();
      let days = (new Date(payDate.getFullYear(), payDate.getMonth(), 0)).getDate();
      this.startTime = (payDate.getMonth()?payDate.getFullYear():payDate.getFullYear()-1) + '-' + (payDate.getMonth()?payDate.getMonth():12) + '-' + days + ' 16:00:00';
      // this.endTime = payDate.getFullYear() + '-' + (payDate.getMonth() + 1) + '-' + days + ' 23:23:59';
      this.endTime = payDate.Format("yyyy-MM-dd hh:mm:ss");
      this.activeTime = [this.startTime, this.endTime];
    }
  },
  activated() {
    this.activeName = 'meet'
  },
  created: function() {
    this.pbFunc.format();
    this.payerDate();
    this.getList();
    this.getSupplier();
  }
}

</script>
