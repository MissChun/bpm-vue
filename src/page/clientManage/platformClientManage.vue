<template>
  <div>
    <div class="search-box">
    </div>
    <div>
      <el-button type="primary" @click="exportList">导出</el-button>
    </div>
    <el-table :data="tableData" v-loading="pageLoading" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
    </el-pagination>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'publicClientManage',
  computed: {

  },
  data() {
    return {
      activeName: 'first',
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 100,
        pageSize: 10,
      },
      tableData: [{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleClick: function() {

    },
    exportList: function() {

    },
    pageChange: function() {
      setTimeout(() => {
        console.log('currentPage', this.pageData.currentPage);
      })

    }
  },
  mounted: function() {
    setTimeout(() => {
      this.pageLoading = false;
    }, 2000)
  }

}

</script>
<style>


</style>
