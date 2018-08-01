<style scoped lang="less">
.index-header-He {
  height: 60px;
}

</style>
<template>
  <div v-if="type==='loginAfter'">
    <login-after-header :users="users" :logout="logout"></login-after-header>
  </div>
  <div v-else-if="type==='index'" class="index-header-He">
    <index-header :users="users" :logout="logout" :login-link="loginLink" :app-url="appUrl"></index-header>
  </div>
  <div v-else-if="type==='error'">
    <public-header :users="users" :logout="logout"></public-header>
  </div>
</template>
<script>
import loginAfterHeader from '@/components/common/loginAfterHeader';
import indexHeader from '@/components/indexHeader'
import publicHeader from '@/components/publicHeader'
export default {
  name: 'commonHeader',
  props: {
    type: String,
    appUrl: Object,
    loginLink: Function
  },
  components: {
    loginAfterHeader: loginAfterHeader,
    indexHeader: indexHeader,
    publicHeader: publicHeader
  },
  computed: {
    users: function() {
      return this.pbFunc.getLocalData('user', true);
    }
  },
  created() {

  },
  data: function() {
    return {

    }
  },

  methods: {
    // isLogin() {
    //   if (this.users && this.users.nick_name) {
    //     //this.$router.push({ path: '/dashboard/dispatchDashboard' });
    //     this.loginLink();
    //   } else {
    //     this.$router.push({ path: '/login' });
    //   }

    // },
    logout: function() {
      this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
        .then(() => {
          this.$store.state.common.wsMsg.close();
          this.$$http('signOut', {}).then((results) => {
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '退出成功',
                type: 'success'
              });
            }
          }).catch((err) => {
            //this.$message.error('退出失败');
          })
          // this.$emit("logout");
          localStorage.clear();
          // this.users = [];
          this.$router.push({ path: '/login' });

        })
        .catch(() => {});
    },
  }
}

</script>
