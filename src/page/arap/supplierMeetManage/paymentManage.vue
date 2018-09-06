
<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="供应商应付账款" name="meet"></el-tab-pane>
        <el-tab-pane label="付款管理" name="payment">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="30">
                <el-col :span="6">
                  <el-form-item label="承运商:">
                    <el-select v-model="searchFilters.agreements__carrier" @change="startSearch" clearable filterable placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.carrierSelect" :key="key" :label="item.carrier_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="液厂:">
                    <el-select v-model="searchFilters.agreements__fluid" clearable filterable @change="startSearch" placeholder="请输入选择">
                      <el-option v-for="(item,key) in selectData.liquidSelect" :key="key" :label="item.actual_fluid_name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <el-button type="primary" plain @click="">导入</el-button>
            <!-- <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" max-height="600" v-loading="pageLoading" border :class="{'tabal-height-500':!tableData.length}">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">

              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
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
  </div>
</template>
<script>
export default {
  name: 'paymentManage',
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
      activeName: 'payment',
      searchFilters: {
        agreements__carrier: '',
        agreements__fluid: '',
        // keyword: '',
        // field: 'name',
      },
      selectData: {
        carrierSelect: [{
          id: '',
          carrier_name: '全部'
        }], //承运商
        liquidSelect: [{
          id: '',
          actual_fluid_name: '全部'
        }] //液厂
      },
      thTableList: [{
        title: '供应商',
        param: 'start_mileage',
        width: '200'
      }, {
        title: '付款金额',
        param: 'fluid_name',
        width: ''
      }, {
        title: '付款日期',
        param: 'effective_time',
        width: ''
      }, {
        title: '备注',
        param: 'dead_time',
        width: ''
      }, {
        title: '添加时间',
        param: 'created_at',
        width: ''
      }],
      tableData: []
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
        agreements__carrier: this.searchFilters.agreements__carrier,
        agreements__fluid: this.searchFilters.agreements__fluid
      };
      postData = this.pbFunc.fifterObjIsNull(postData);

      // postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getFreightList', postData).then((results) => {
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
    getCarrierList: function() {
      let postData = {
        need_all: true
      };

      this.$$http('getCarrierList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.selectData.carrierSelect = this.selectData.carrierSelect.concat(results.data.data);
        }
      }).catch((err) => {})

    },
    getFluidList: function() {
      let postData = {
        need_all: true
      };

      this.$$http('getFluidList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.selectData.liquidSelect = this.selectData.liquidSelect.concat(results.data.data);
        }
      }).catch((err) => {})

    },
    handleClick: function(tab, event) {
      console.log('tab',tab);
      if (tab.name === 'meet') {
        this.$router.push({ path: "/arap/supplierMeetManage/supplierMeetList" });
      }
    },


    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },
  activated() {
    this.activeName = 'payment'
  },
  created: function() {
    this.getList();
    this.getCarrierList();
    this.getFluidList();
  }
}

</script>
