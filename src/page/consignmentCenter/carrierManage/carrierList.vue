<!-- carrierManageList.vue -->
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="承运商" name="carrier">
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
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="承运类型:">
                    <el-select v-model="searchFilters.carrier_type" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.carrierTypeSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain>导入</el-button> -->
            <!-- <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="goEditDetail">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                <template slot-scope="scope">
                  <div v-if="item.param === 'carrier_name'" class="order-color">
                    <router-link :to="{path: '/consignmentCenter/carrierManage/carrierDetail', query: { id: scope.row.id }}">{{scope.row.carrier_name}}</router-link>
                  </div>
                  <div v-else><span v-if="item.param_two">{{scope.row[item.param][item.param_two]}}</span><span v-else>{{scope.row[item.param]}}</span></div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'carrierList',
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
      activeName: 'carrier',
      searchFilters: {
        carrier_type: '',
        keyword: '',
        field: 'carrier_name',
      },
      selectData: {
        carrierTypeSelect: [
          { id: '', value: '全部' },
          { id: 'own', value: '自有承运' },
          { id: 'external', value: '外部承运' }
        ],
        fieldSelect: [
          { id: 'carrier_name', value: '公司名称' },
          { id: 'contact', value: '联系人' },
          { id: 'contact_phone', value: '联系电话' },
        ]
      },
      thTableList: [{
        title: '公司名称',
        param: 'carrier_name',
        width: ''
      }, {
        title: '联系人',
        param: 'contact',
        width: ''
      }, {
        title: '联系电话',
        param: 'contact_phone',
        width: ''
      }, {
        title: '公司地址',
        param: 'address',
        width: ''
      }, {
        title: '承运类型',
        param: 'carrier_type',
        param_two: 'verbose',
        width: ''
      }, {
        title: '启用',
        param: 'is_valid',
        param_two: 'verbose',
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
    goEditDetail() {
      this.$router.push({ path: '/consignmentCenter/carrierManage/editCarrier' });
    },
    handleClick: function(tab, event) {
      console.log('tabhandleClick', tab);
    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        carrier_type: this.searchFilters.carrier_type
      };
      postData[this.searchFilters.field] = this.searchFilters.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.pageLoading = true;

      this.$$http('getCarrierList', postData).then((results) => {
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
    handleMenuClick(row) {
      this.$router.push({ path: '/consignmentCenter/carrierManage/carrierDetail', query: { id: row.id } });

    }
  },
  created() {
    this.getList();
  }

}

</script>
<style>


</style>
