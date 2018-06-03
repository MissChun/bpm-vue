<style scoped lang="less">
.g-body {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 110px 20px 0 270px;
}

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

.g-side {
  position: fixed;
  z-index: 90;
  top: 60px;
  left: 0;
  box-sizing: border-box;
  width: 230px;
  height: 100%;
  border-right: 1px solid #dedede;
  overflow-y: auto;
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
  line-height: 65px;
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
}

</style>
<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="g-head">
        <div href="" title="胜通tms" class="logo"><img class="log-img" src="../assets/img/91LNG.png"></div>
        <div class="nav">
          <div class="g-statues-bar p-lr">
            <el-breadcrumb separator="/" class="bread" id="mybread">
              <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
                {{ item.name || "" }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="usermenu" v-if="user.name">
            欢迎您：{{user.name}}
            <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
            <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
          </div>
        </div>
      </el-row>
    </el-header>
    <el-container>
      <el-aside style="width: 230px;">
        <el-menu :default-active="activeMenu" class="g-side" router>
          <el-row style="margin-top:30px;">
            <el-col style="padding-left:20px;color:rgb(222,222,222)">MENU
            </el-col>
          </el-row>
          <template v-for="(route, index) in menus">
            <template v-if="route.children && dealChildren(route.children).length">
              <el-submenu :key="index" :index="route.name">
                <template slot="title">
                  <i :class="[{ 'color-4a9bf8' : activeMenu.match(route.path) }, route.meta.iconName]"></i>
                  <span>{{route.meta.title||"无名字"}}</span>
                </template>
                <el-menu-item v-for="(cRoute, cIndex) in dealChildren(route.children)" :key="cIndex" :index="cRoute.path" :route="cRoute">
                  <span :class="{ 'color-4a9bf8' : activeMenu === cRoute.path }">{{cRoute.meta.title||"无名字"}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :route="route" :index="route.name">
                <template slot="title">
                  <i :class="[{ 'color-4a9bf8' : activeMenu === route.path }, route.meta.iconName]"></i>
                  <span :class="{ 'color-4a9bf8' : activeMenu === route.path }">{{route.meta.title||"无名字"}}</span>
                </template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <template>
          <div style="padding:30px 2% 0 3%;">
            <router-view></router-view>
          </div>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      user: { name: "aa" },
      menus: []
    };
  },
  computed: {
    activeMenu: function() {
      return this.$route.path;
    },
    breadcrumbs: function() {
      return (this.$route && this.$route.matched) || []
    }
  },
  methods: {
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
    },
    logout: function() {
      this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
        .then(() => {
          this.signOut();
          this.$emit("logout");
        })
        .catch(() => {});
    },
    dealChildren: function(children) {
      let childrenMenu = [];
      for (let i in children) {
        if (children[i].meta && !children[i].meta.notRenderMenu) {
          childrenMenu.push(children[i])
        }
      }
      return childrenMenu;
    }
  },
  created: function() {
    let user = this.$store.state.common.userData;
    if (user) {
      this.user = user;
    } else {
      console.log(user);
    }
    let menus = this.$store.state.common.menuData;
    if (menus) {
      this.menus = menus;
      // console.log('this.menus', this.menus);
    }
  }
};

</script>
