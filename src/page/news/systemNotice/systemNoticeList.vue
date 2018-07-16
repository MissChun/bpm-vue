<style scoped lang="less">
.nav-tab{
  position: relative;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <div class="operation-tab-btn text-right">
        <el-button type="success" size="mini">全部已读</el-button>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统通知" name="system">
          <div class="news">
            <ul>
              <li class="is-unread cursor-pointer">
                <el-row :gutter="10">
                  <el-col :span="18">
                    【服务中心】您有业务单[S1806250011]燃投衡水故城正在 等待修改审批。
                  </el-col>
                  <el-col :span="4" class="text-right text-time">
                    2018-07-07 16:23
                  </el-col>
                  <el-col :span="2" class="text-right">
                    <el-button type="primary" size="mini">查看详情</el-button>
                  </el-col>
                </el-row>
              </li>
              <li class="is-unread cursor-pointer">
                <el-row :gutter="10">
                  <el-col :span="18">
                    【服务中心】您有业务单[S1806250011]燃投衡水故城正在 等待修改审批。
                  </el-col>
                  <el-col :span="4" class="text-right text-time">
                    2018-07-07 16:23
                  </el-col>
                  <el-col :span="2" class="text-right">
                    <el-button type="primary" size="mini">查看详情</el-button>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
          <div class="operation-btn text-right" v-if="false">
            <!-- <el-button type="primary" plain @click="importList">导入</el-button> -->
            <el-button type="primary">导出</el-button>
            <!-- <el-button type="success" @click="addPerson">新增</el-button> -->
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
  name: 'systemNoticeList',
  data() {
    return {
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName:'system',
      newsList:[]
    };
  },
  computed: {

  },
  methods: {
    handleClick(){}
  },
  created() {

  }
};

</script>
