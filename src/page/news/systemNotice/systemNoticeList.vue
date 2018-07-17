<style scoped lang="less">
.nav-tab {
  position: relative;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <div class="operation-tab-btn text-right">
        <el-button type="success" size="mini" @click="batchRead" v-if="newsList.length">全部已读</el-button>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统通知" name="system">
          <div class="news" v-loading="pageLoading" :class="{'tabal-height-500':!newsList.length}">
            <ul>
              <li class="cursor-pointer" v-for="(item,index) in newsList" :class="item.have_read?'':'is-unread'" :key="item.id">
                <el-row :gutter="10">
                  <el-col :span="18">
                    <span v-if="item.message_type.key">【{{item.message_type.verbose}}】</span>{{item.message_content}}。
                  </el-col>
                  <el-col :span="4" class="text-right text-time">
                    {{item.created_at}}
                  </el-col>
                  <el-col :span="2" class="text-right">
                    <el-button type="primary" size="mini">查看详情</el-button>
                  </el-col>
                </el-row>
              </li>
              <!-- <li class="is-unread cursor-pointer">
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
              </li> -->
            </ul>
            <no-data v-if="!pageLoading && !newsList.length"></no-data>
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
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: 'system',
      newsList: []
    };
  },
  computed: {

  },
  methods: {
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      }
      this.pageLoading = true;
      this.$$http('getMessagesList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.newsList = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    batchRead() {
      let postData = {
        ids: []
      }
      for (let i in this.newsList) {
        if (!this.newsList[i].read) {
          postData.ids.push(this.newsList[i].id);
        }

      }
      if (postData.ids.length) {
        this.$$http('batchReadMessages', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.getList();
            // this.noticeList = results.data.data.results;
          }
        }).catch((err) => {

        })
      }

    },
    handleClick() {}
  },
  created() {
    this.getList();
  }
};

</script>
