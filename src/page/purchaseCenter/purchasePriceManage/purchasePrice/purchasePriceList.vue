<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="采购价管理" name="purchasePrice">
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
              <el-row :gutter="0">
                <el-col :span="8">
                  <el-form-item label="日期筛选:" label-width="105px">
                    <el-date-picker v-model="dateTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                    <!-- <el-date-picker v-model="leaveTime" type="daterange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <el-button type="primary">导出</el-button>
            <!-- <el-button type="success" @click="addPerson">新增</el-button> -->
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <!-- <el-table-column  :prop="'list'" align="center" :label="'<span>55555</<span>'"></el-table-column> -->
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                <template slot-scope="scope">
                  <div v-if="item.param === 'fluid_name'">{{scope.row[item.param]}}</div>
                  <div v-if="item.param === 'area'">
                    <ul>
                      <li v-for="(area,index) in scope.row.business_areas">{{area.area}}</li>
                    </ul>
                  </div>
                  <div v-if="item.param === 'date'">
                    <div v-for="(area,index) in scope.row.business_areas">
                      <ul>
                        <li v-for="(quotes,index) in area.quotes" v-if="quotes.price_date===item.title">{{quotes.today_unit_price}}</li>
                      </ul>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="目的地设置" name="destination"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'purchasePriceList',
  data() {
    return {
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      dateTime: [], //日期
      thTableList: [{
        title: '液厂名称',
        param: 'fluid_name',
        width: ''
      }, {
        title: '目的地',
        param: 'area',
        width: ''
      }],
      tableData: [],
      activeName: 'purchasePrice',
      searchFilters: {
        keyword: '',
        field: 'fluid',
      },
      selectData: {
        fieldSelect: [
          { id: 'fluid', value: '液厂名称' },
          { id: 'suppliers', value: '供应商' },
        ]
      },
    };
  },
  computed: {

  },
  created() {
    this.getDateTitle();
    this.getList();
  },
  methods: {
    startSearch: function() {
      this.pageData.currentPage = 1;
      // this.getList();
    },
    pageChange() {
      this.getList();
    },
    getDateTitle() {
      this.$$http('getPriceDateList', {}).then((results) => {
        console.log('results', results.data.data.results);
        if (results.data && results.data.code == 0) {
          // this.tableData = results.data;
          for (let i in results.data.data) {
            this.thTableList.push({
              title: results.data.data[i],
              param: 'date',
              width: ''
            })
          }
        }
      }).catch((err) => {})
    },
    getList() {
      this.pageLoading = true;
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      }
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.$$http('getPurchasePriceList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;

          console.log('this.tableData', this.tableData, this.pageData.totalCount);
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    handleClick(tab, event) {
      console.log('tab', tab);
      if (tab.name === 'destination') {
        this.$router.push({ path: "/purchaseCenter/purchasePriceManage/destinationSetting/destinationSettingList" });
      }
    },
    activated() {
      this.activeName = 'purchasePrice'
    },
  },

};

</script>
