<template>
  <el-header>
    <el-row>
      <el-col :span="12">
        <div href="" title="胜通tms" class="logo"><img class="log-img" src="../assets/img/91LNG.jpg"></div>
      </el-col>
      <el-col :span="12">
        <div class="usermenu text-right" v-if="users.nick_name">欢迎您：{{users.nick_name}}，
          <router-link :to="{path: '/'}" class="text-blue">进入91LNG</router-link><span class="division"></span>
          <!-- <router-link :to="{path: '/'}">退出</router-link> -->
          <a v-on:click="logout" class="cursor-pointer">退出</a>
        </div>
        <div class="usermenu text-right" v-else>
          <router-link :to="{path: '/register'}">注册</router-link><span class="division"></span>
          <router-link :to="{path: '/login'}">登录</router-link>
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
      console.log('users', this.$store.state.common.users);
      return this.$store.state.common.users;
    }

  },
  methods: {
    logout: function() {
      this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.signOut();
          this.$emit("logout");
        })
        .catch(() => {});
    },
    signOut: function() {
      this.$$http('signOut', {}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          localStorage.clear();
          this.$store.state.common.users = {};
          this.$router.push({ path: '/login' });
        }

      }).catch((err) => {
        this.$message.error('退出失败');
      })
    }
  }
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
