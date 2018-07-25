<style scoped lang="less">
.g-statues-bar {
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 60%;
  height: 59px;
  margin-left: 50px;
  background: #fff;
  line-height: 60px;
  float: left;
}

.g-statues-bar .bread {
  line-height: 60px;
  height: 59px;
  background: white;
}


.g-head {
  position: fixed;
  z-index: 91;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: white;
}

.logo {
  float: left;
  text-align: center;
  width: 228px;
  font-size: 1.4em;
  text-decoration: none;
  color: #fff;
  line-height: 59px;
  border: 1px solid rgb(222, 222, 222);
  border-top: none;
}

.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  float: left;
  border-bottom: 1px solid rgb(222, 222, 222);
}

.usermenu {
  float: right;
  padding: 0 2em;
  color: black;
  .notice {
    display: inline-block;
    position: relative;
  }
  /deep/ .el-badge__content {
    &.is-fixed {
      top: 18px;
      right: 16px;
    }
  }
  i {
    font-size: 24px;
    margin-right: 6px;
    position: relative;
    top: 4px;
  }
}

.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color: inherit;
  float: right;
}

.el-header {
  background: white;
}

.log-img {
  line-height: 55px;
  vertical-align: middle;
  margin-top: -2px;
}

.color-4a9bf8 {
  color: #4a9bf8;
}



/deep/ .el-breadcrumb__item {
  &:last-child {
    .el-breadcrumb__inner {
      color: #4a9bf8;
    }
  }
}

// 消息通知
.notice-temp {
  background-color: #fff;
  width: 100%;
  height: 422px;
  box-shadow: 0px 0px 7px 0px rgba(107, 107, 107, 0.5); //position: absolute;
  font-size: 14px;
  top: 52px;
  right: -100px;
  z-index: 600;
  .notice-temp-title {
    height: 50px;
    text-align: center;
    line-height: 54px;
    border-bottom: 1px solid #e4e7ed;
  }
  .notice-temp-content {
    margin: 10px 0;
    height: 300px;
    ul {
      list-style-type: none;
      li {
        position: relative;

        height: 40px;
        line-height: 20px;
        padding: 10px 20px;
        color: #606266;
        text-align: justify;
        .time {
          color: #B8B8B8;
        }
        &:hover {
          background: #F4F6F9;
        }
        &.is-unread {
          &:before {
            content: ' ';
            display: block;
            position: absolute;
            left: 7px;
            top: 28px;
            width: 5px;
            height: 5px;
            border-radius: 10px;
            background-color: #f56c6c;
          }
        }
      }
    }
  }
  .notice-temp-footer {
    height: 50px;
    width: 342px;
    border-top: 1px solid #e4e7ed;
    line-height: 50px;
    color: #9E9E9E;
    padding: 0 22px;
    position: absolute;
    bottom: 0;
  }
}

</style>
<template>
  <!-- <div style="height: 60px;width: 100;"> -->
  <el-header>
    <el-row type="flex" class="g-head">
      <router-link :to="{path: '/'}">
        <div href="" title="运输管理系统" class="logo"><img class="log-img" src="../../assets/img/91LNG.png"></div>
      </router-link>
      <div class="nav">
        <div class="g-statues-bar p-lr">
          <el-breadcrumb separator="/" class="bread" id="mybread" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">
              {{ item.meta.title || "" }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="usermenu" v-if="users.profile&&users.profile.nick_name">
          <el-popover placement="top" width="386" trigger="click" v-model="showNotice">
            <div class="notice" v-if="!false">
              <div class="notice-temp" v-if="showNotice">
                <div class="notice-temp-title">系统通知</div>
                <div class="notice-temp-content" v-loading="noticeLoading">
                  <ul>
                    <li class="cursor-pointer" v-for="(item,index) in noticeList" :class="item.read?'':'is-unread'" :key="item.id" v-on:click="signRead(true,item)"><span v-if="item.message_type.key">【{{item.message_type.verbose}}】</span>{{item.content}}。<span class="time">{{item.created_at}}</span></li>
                  </ul>
                </div>
                <div class="notice-temp-footer">
                  <el-row>
                    <el-col :span="12">
                      <span class="cursor-pointer" v-on:click="signRead(true)">一键已读</span>
                    </el-col>
                    <el-col :span="12" class="text-right">
                      <span class="cursor-pointer" v-on:click="signRead(false)">查看全部 ></span>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <span slot="reference" v-on:click="isShowNotice">
              <el-badge :value="$store.state.common.unreadNewNum?$store.state.common.unreadNewNum:''" :max="10" class="item">
                <i class="icon-notice cursor-pointer"></i>
              </el-badge>
            </span>
            <!-- <el-button>click 激活</el-button> -->
          </el-popover>
          <span class="ml-25 mr-25 text-stance fs-18">|</span>
          <i class="icon-user"></i>
          <el-dropdown trigger="click" @command="logout">
            <span class="el-dropdown-link">Hi，{{users.profile.nick_name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link> -->
        </div>
      </div>
    </el-row>
  </el-header>
  <!-- </div> -->
</template>
<script>
export default {
  name: 'loginAfterheader',
  props: {
    users: Object,
    logout: Function,


  },

  data: function() {
    return {
      showNotice: false,
      noticeLoading: false,
      noticeList: [],
      wsNum:10
    }
  },
  computed: {
    // users: function() {
    //   // console.log('users', this.pbFunc.getLocalData('user',true));
    //   return this.pbFunc.getLocalData('user', true);
    // },
    breadcrumbs: function() {
      return (this.$route && this.$route.matched) || []
    }

  },
  created() {
    this.wsLink();
    this.getUnreadNewNum();
  },
  methods: {
    wsLink() {
      let vm = this;
      let currentUrl = document.location.href.toString();
      let domainUrl = '';
      if (currentUrl.match('pbpm.91lng.cn')) {
        domainUrl = 'pbpm.91lng.cn';
      } else if (currentUrl.match('bpm.hhtdlng.com') && !currentUrl.match('devbpm.hhtdlng.com')) {
        domainUrl = 'bpm.hhtdlng.com';
      } else if (currentUrl.match('bpm.91lng.cn') && !currentUrl.match('pbpm.91lng.cn')) {
        domainUrl = 'bpm.91lng.cn';
      } else {
        domainUrl = 'devbpm.hhtdlng.com';
      }
      let ws = new WebSocket('ws://' + domainUrl + '/ws/web/notifications/' + this.users.id + '/');
      ws.onopen = function(event) {
        console.log('链接消息', event)
      }
      // $timeout(() => {
      //   ws.onopen = function(event) {
      //     console.log('重新链接消息', event)
      //   }
      // }, 10000)
      ws.onmessage = function(event) {

        console.log('接收的消息', event.data)
        let msg = JSON.parse(event.data);
        // vm.$store.state.common.unreadNewNum++;
        vm.$store.commit('ChangeMsgNum', {
          num: 1
        });
        vm.$notify({
          title: msg.message_type.verbose,
          message: msg.content,
          position: 'bottom-right',
          duration: 0
        });

      }
      ws.onerror = function(event) {
        // vm.wsLink();
      }
      ws.onclose = (event) => {
        this.wsNum--;
        if (this.wsNum > 0) {
          vm.wsLink();
        }

      }
    },
    // // 展示消息浮窗
    // isShowNotice() {
    //   this.showNotice = true;
    //   this.noticeLoading = true;
    //   let postData = {
    //     page: 1,
    //     page_size: 5,
    //   }
    //   if (this.unreadNewNum) {
    //     postData.unread_only = true;
    //   }
    //   this.getUnreadNewNum();
    //   this.$$http('getMessagesList', postData).then((results) => {
    //     this.noticeLoading = false;
    //     if (results.data && results.data.code == 0) {
    //     console.log('消息', results.data);
    //     this.noticeList = results.data.results;
    //     }
    //   }).catch((err) => {
    //     this.noticeLoading = false;
    //   })
    // },
    // 未读消息
    getUnreadNewNum() {
      this.$$http('getUnreadNewNum', {}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$store.state.common.unreadNewNum = results.data.data.count;
          // this.unreadNewNum = results.data.data.count;
        }
      }).catch((err) => {})
    },
    // 展示消息浮窗
    isShowNotice() {
      this.showNotice = true;
      this.noticeLoading = true;
      let postData = {
        page: 1,
        page_size: 5,
      }
      if (this.$store.state.common.unreadNewNum) {
        postData.unread_only = true;
      }
      this.getUnreadNewNum();
      this.$$http('getMessagesList', postData).then((results) => {
        this.noticeLoading = false;
        if (results.data && results.data.code == 0) {
          this.noticeList = results.data.data.results;
        }
      }).catch((err) => {
        this.noticeLoading = false;
      })
    },
    isShowLink(row) {
      if (row.order_id || row.delivery_id || row.waybill_id) {
        return true;
      } else {
        return false;
      }
    },
    // 详情跳转
    urlLink(row) {
      if (row.extra && row.extra.action === 'ADD_TRUCKS' && row.order_id) {
        this.$router.push({ path: '/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/' + row.order_id + '/add' });
      } else if (row.order_id || row.delivery_id) {
        this.$router.push({ path: '/purchaseCenter/pickupOrders/orderDetail/orderDetailTab/' + (row.order_id ? row.order_id : row.delivery_id) + '/add' });
      } else if (row.waybill_id) {
        this.$router.push({ path: '/consignmentCenter/consignmentOrders/orderDetail/orderDetailTab/' + row.waybill_id + '/' + row.section_trip_id });
      }
    },
    // 一键已读  查看全部
    signRead(isShow, row) {
      if (isShow) {
        let postData = {
          ids: []
        }
        if (row) {
          postData.ids.push(row.id);
        } else {
          for (let i in this.noticeList) {
            if (!this.noticeList[i].read) {
              postData.ids.push(this.noticeList[i].id);
            }

          }
        }
        console.log('postData', postData)
        if (postData.ids.length) {
          this.$$http('batchReadMessages', postData).then((results) => {
            if (results.data && results.data.code == 0) {
              if (row) {
                if (this.$store.state.common.unreadNewNum) {
                  this.$store.state.common.unreadNewNum--;
                }
                if (this.isShowLink(row)) {
                  this.urlLink(row);
                }
              } else {
                this.getUnreadNewNum();
              }
            }
          }).catch((err) => {})
        }
      } else {
        this.$router.push({ path: '/news/systemNotice/systemNoticeList' });
      }
      this.showNotice = false;
    },
    // signRead(isShow) {
    //   if (isShow) {
    //     let postData = {
    //       ids: []
    //     }
    //     for (let i in this.noticeList) {
    //       if (!this.noticeList[i].read) {
    //         postData.ids.push(this.noticeList[i].id);
    //       }

    //     }
    //     // console.log('ids',postData)
    //     this.$$http('batchReadMessages', postData).then((results) => {
    //       if (results.data && results.data.code == 0) {
    //         // this.isShowNotice();
    //         // this.noticeList = results.data.data.results;
    //       }
    //     }).catch((err) => {})
    //   } else {

    //     this.$router.push({ path: '/news/systemNotice/systemNoticeList' });
    //   }
    //   this.showNotice = false;
    // },
  }
}

</script>
