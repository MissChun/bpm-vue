<style scoped lang="less">
.el-header {
  background: #232F36;
  height: 64px!important;
  .bpm-head {
    width: 1200px;
    margin: 0 auto;
    line-height: 60px;
    color: #fff;
    font-size: 16px;
    img {
      margin-top: 6px;
    }
    a {
      color: #fff;
      font-size: 16px;
    }

    .link {
      width: 90px;
      height: 36px;
      border: 1px solid #fff;
      display: inline-block;
      border-radius: 4px;
      text-align: center;
      line-height: 34px;
      margin-left: 40px;
      a {
        display: block;
      }
    }
    .user {
      display: inline-block;
      margin-left: 30px;
      .text-blue {
        color: #26c6da;
      }
      span {
        padding: 0 10px;
      }
    }
  }
}

</style>
<template>
  <el-header>
    <div class="bpm-head">
      <el-row>
        <el-col :span="6"><img src="@/assets/img/logo.svg" alt=""></el-col>
        <el-col :span="18" class="text-right">
          <a rel="nofollow" target="_blank" :href="appUrl.driverAppUrl">司机端App下载</a>
          <span>｜</span>
          <a rel="nofollow" target="_blank" :href="appUrl.businessAppUrl">业务端App下载</a>
          <span>｜</span>
          <a rel="nofollow" target="_blank" :href="appUrl.consumerAppUrl">客户端App下载</a>
          <div v-if="users&&users.profile" class="user">
            欢迎您：{{users.profile.nick_name}}，<a class="cursor-pointer text-blue" v-on:click="loginLink">进入91LNG</a>
            <span>|</span>
            <a v-on:click="logout" class="cursor-pointer">退出</a>
          </div>
          <div class="link" v-else>
            <!-- <router-link :to="{path: '/register'}" class="text-blue">注册</router-link> -->
            <router-link :to="{path: '/login'}">登录</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>
<script>
export default {
  name: 'indexHeader',
  props: {
    users: Object,
    logout: Function,
    appUrl: Object,
    loginLink: Function
  },

  data: function() {

    return {

    }
  },
  computed: {


  },
  methods: {

  }
}

</script>
