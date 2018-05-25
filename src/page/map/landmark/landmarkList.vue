<style scoped lang="less">


</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="列表" name="first">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                    <el-select v-model="searchFilters.position_type" slot="prepend" placeholder="请选择">
                      <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                  </el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item label="审核状态:">
                    <el-select v-model="searchFilters.confirm_status" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in checkStatusSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="地标来源:">
                    <el-select v-model="searchFilters.landmarkFrom" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in landmarkFromSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="是否同步:">
                    <el-select v-model="searchFilters.async_status" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in isSynchronizeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="operation-btn text-right">
            <el-button type="primary" plain>导入</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="success">新增</el-button>
          </div>
          <div class="table-list">
            <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
              <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
              </el-table-column>
              <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleMenuClick({operator:'check',id:scope.row.id})">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-list text-center">
            <el-pagination background layout="prev, pager, next" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>1">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="地图" name="second">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'landMarkList',
  computed: {
    landmarkFromSelect: function() {
      console.log('this.$store.state.common.selectData', this.$store.state.common.selectData);
      return this.$store.getters.getIncludeAllSelect.landmark_source_type;
    },
    checkStatusSelect: function() {
      return this.$store.getters.getIncludeAllSelect.landmark_confirm_status;
    },
    fieldSelect: function() {
      return this.$store.state.common.selectData.landmark_position_type;
    },
    isSynchronizeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.landmark_async_status;
    }
  },
  data() {
    return {
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      pageLoading: false,
      activeName: 'first',
      tableData: [],
      thTableList: [{
        title: '编号',
        param: 'position_name',
        width: ''
      }, {
        title: '地标名称',
        param: 'position_name',
        width: '250'
      }, {
        title: '地标类型',
        param: 'position_type.verbose',
        width: ''
      }, {
        title: '联系人',
        param: 'contact',
        width: ''
      }, {
        title: '联系电话',
        param: 'tel',
        width: ''
      }, {
        title: '位置',
        param: 'address',
        width: '260'
      }, {
        title: '审核状态',
        param: 'confirm_status.verbose',
        width: ''
      }, {
        title: '上传人',
        param: 'upload_user.nick_name',
        width: ''
      }, {
        title: '上传时间',
        param: 'created_time',
        width: '200'
      }, {
        title: '上传来源',
        param: 'source_type.verbose',
        width: ''
      }, {
        title: '同步',
        param: 'async_status.verbose',
        width: ''
      }],
      searchFilters: {
        keyword: '',
        landmarkFrom: '',
        position_type: 'DELIVER_POSITION',
        confirm_status: '',
        async_status: '',
      }
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: '/mapManage/landMark/landmarkMap' });
      }
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    },
    getList: function() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        source_type: this.searchFilters.landmarkFrom,
        confirm_status: this.searchFilters.confirm_status,
        async_status: this.searchFilters.async_status
      };

      if (this.searchFilters.keyword.length) {
        postData.position_type = this.searchFilters.position_type;
        postData.position_name = this.searchFilters.keyword;
      }

      postData = this.pbFunc.fifterObjIsNull(postData);

      this.pageLoading = true;

      this.$$http('getLandMarkList', postData).then((results) => {
        console.log('results', results.data.data.results);
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.results;

          this.pageData.totalCount = results.data.data.count;

        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    },
    handleMenuClick: function(command) {
      if (command.operator === 'check') {
        this.$router.push({ path: `/mapManage/landMark/landmarkDetail/${command.id}` });
      }
    }
  },
  created: function() {
    this.getList();
  },
  activated: function() {
    this.activeName = 'first';
  },
}

</script>
