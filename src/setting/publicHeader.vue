<template>
  <el-header>
    <el-row>
      <el-col :span="12">
        <div href="" title="胜通tms" class="logo"><img class="log-img" src="../assets/img/91LNG.png"></div>
      </el-col>
      <el-col :span="12">
        <div class="usermenu text-right" v-if="users.nick_name">欢迎您：{{users.nick_name}}，<router-link :to="{path: '/'}" class="text-blue">进入91LNG</router-link><span class="division"></span>
          <router-link :to="{path: '/'}">退出</router-link>
        </div>
        <div class="usermenu text-right" v-else>
          <a href="#">注册</a><span class="division"></span><a href="#">登录</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <!--
  <div class="nav">
    <div class="usermenu" v-if="user.name">
      欢迎您：{{user.name}}
      <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
      <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
    </div>
  </div> -->
</template>
<script>
export default {
  name: 'publicHeader',
  props: {},

  data: function() {

    return {

    }
  },
  computed: {
    users: function() {
      console.log('users',this.$store.state.common.users);
      return this.$store.state.common.users;
    }

  },
  methods: {}
}

</script>
<style scoped>
.el-header {
  height: 65px!important;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  line-height: 65px;
  padding: 0 40px;
}

.division {
  display: inline-block;
  height: 24px;
  border-left: 1px solid #dcdfe6;
  margin: 0 20px;
  position: relative;
  top: 6px;
}

.el-header img {
  margin-top: 15px;
}

.text-right {
  text-align: right;
}

</style>
