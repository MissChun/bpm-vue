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
              <li class="cursor-pointer" v-for="(item,index) in newsList" :class="item.read?'':'is-unread'" :key="item.id" v-on:click="batchRead('',item,item.read)">
                <el-row :gutter="10">
                  <el-col :span="18">
                    <!-- <span v-if="item.message_type.key">【{{item.message_type.verbose}}】</span> -->
                    {{item.content}}
                  </el-col>
                  <el-col :span="4" class="text-right text-time">
                    {{item.created_at}}
                  </el-col>
                  <el-col :span="2" class="text-right" v-if="isShowLink(item)">
                    <el-button type="primary" size="mini">查看详情</el-button>
                  </el-col>
                </el-row>
              </li>
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
    pageChange() {
      setTimeout(() => {
        this.getList();
      })
    },
    getList() {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize
      }
      this.pageLoading = true;
      this.$$http('getMessagesList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.newsList = results.data.data.results;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })
    },
    // 未读消息
    getUnreadNewNum() {
      this.$$http('getUnreadNewNum', {}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$store.state.common.unreadNewNum = results.data.data.count;
          // this.unreadNewNum = results.data.data.count;
        }
      }).catch((err) => {})
    },
    isShowLink(row) {
      if (row.delivery_id || row.waybill_id) {
        return true;
      } else {
        return false;
      }
    },
    // 详情跳转
    urlLink(row) {
      if (row.extra && row.extra.action === 'ADD_TRUCKS' && row.delivery_id) {
        this.$router.push({ path: '/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/' + row.delivery_id + '/add' });
      } else if (row.delivery_id) {
        this.$router.push({ path: '/purchaseCenter/pickupOrders/orderDetail/orderDetailTab/' + row.delivery_id + '/add' });
      } else if (row.waybill_id) {
        this.$router.push({ path: '/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/' + row.waybill_id + '/' + row.section_trip_id });
      }
    },
    // 标记全部已读  单个已读
    batchRead(even, row, isRead) {
      let postData = {
        ids: []
      }
      if (row) {
        postData.ids.push(row.id);
      } else {
        for (let i in this.newsList) {
          if (!this.newsList[i].read) {
            postData.ids.push(this.newsList[i].id);
          }
        }
      }
      if (postData.ids.length && !isRead) {
        this.$$http('batchReadMessages', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            if (row) {
              if (this.$store.state.common.unreadNewNum) {
                this.$store.commit('ChangeMsgNum', {
                  num: -1
                });
              }
              if (this.isShowLink(row)) {
                this.urlLink(row);
              }
            } else {
              this.getUnreadNewNum();
            }
            this.getList();
          }
        }).catch((err) => {

        })
      } else if (postData.ids.length && isRead) {
        if (this.isShowLink(row)) {
          this.urlLink(row);
        }
      }

    },
    handleClick() {}
  },
  created() {
    this.getList();
  }
};

</script>
