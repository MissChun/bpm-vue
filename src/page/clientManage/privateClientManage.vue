<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="客户管理" name="userManage">
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
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <!-- <el-button type="primary">导出</el-button> -->
            <el-button type="success" @click="addPerson">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next, jumper" :page-count="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>10">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'privateClientManage',
  computed: {
    employmentTypeSelect: function() {

      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'userManage',
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'name',
      },
      selectData: {
        isBindSelect: [
          { id: '', value: '全部' },
          { id: false, value: '未绑定' },
          { id: true, value: '已绑定' }
        ],
        fieldSelect: [
          { id: 'name', value: '客户名称' },
          { id: 'contact_name', value: '联系人' },
          { id: 'contact_phone', value: '联系电话' },
        ]
      },
      thTableList: [{
        title: '客户名称',
        param: 'name',
        width: ''
      }, {
        title: '联系人',
        param: 'contact_name',
        width: ''
      }, {
        title: '联系电话',
        param: 'contact_phone',
        width: ''
      }, {
        title: '亏吨标准',
        param: 'detail_address',
        width: ''
      }, {
        title: '地址',
        param: 'deficiency_standard',
        width: '250'
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
        page: this.pageData.currentPage
      };

      postData[this.searchFilters.field] = this.searchFilters.keyword;

      this.pageLoading = true;

      this.$$http('getCustomerList', postData).then((results) => {

        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleClick: function(tab, event) {

    },
    handleMenuClick: function(command) {
      this.$router.push({ path: "/clientManage/clientDetail", query: { id: command.id } });
    },
    addPerson: function() {
      this.$router.push({ path: "/clientManage/addClient" });
    },
    importList: function() {
      this.$router.push({ path: "/orders/orderDetail/orderDetailTab/1" });
    },
    exportList: function() {

    },
    addList: function() {

    },
    pageChange: function() {
      setTimeout(() => {

        this.getList();
      })
    }
  },
  created: function() {
    this.getList();
  }
}

</script>
<style scoped lang="less">


</style>
