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
  top: 10px;
  left: 0;
  box-sizing: border-box;
  height: 100%;
  border-right: 1px solid #dedede;
  padding-top: 50px;
  padding-bottom: 0px;
  overflow-y: auto;
  .children-menu {
    background-color: #fff;
  }
  >li{
    width: 63px;
    &:last-child{
      margin-bottom:60px;
    }
  }
  transition: width 0.1s;
    -moz-transition: width 0.1s; /* Firefox 4 */
  -webkit-transition: width 0.1s; /* Safari 和 Chrome */
  -o-transition: width 0.1s; /* Opera */
}
.max-side{
  //width: 230px;
  .children-menu {
    background-color: #f2f5fd;
  }
  li{
    width: 229px;
  }
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

.color-26c6da {
  color: #26c6da;
  &:before {
    color: #26c6da;
  }
}
.munu-logo {
  padding-left: 25px;
  color: rgb(222, 222, 222);
  padding-bottom: 5px;
}

.dashborad-menu {
  height: 42px;
  line-height: 42px;
}

.menu-title {
  padding: 0 !important;
  color: #90929a;
  /deep/ .el-submenu__title {
    padding: 0 !important;
    height: 42px;
    line-height: 42px;
    color: #90929a;
  }
  .menu-title-cloumn {
    padding-left: 25px;
    height: 42px;
    line-height: 42px;
    i {
      margin-right: 8px;
    }
  }
  .choosed-cloumn {
    border-left: 3px solid #26c6da;
    padding-left: 22px;
  }
  .children-menu {
    padding: 0px 20px !important;
    height: 42px;
    line-height: 42px;
    color: #90929a;
    .child-menu-title {
      position: relative;
      padding-left: 52px;
      border-top: 1px solid #e1e6ec;
    }
    &:first-child {
      .child-menu-title {
        border-top: 0 none;
      }
    }
  }
  .color-303133 {
    color: #303133;
  }
  .chooed-diamond {
    position: absolute;
    top: 19px;
    left: 41px;
    height: 5px;
    width: 5px;
    display: inline-block;
    background-color: #26c6da;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
}

/deep/ .el-breadcrumb__item {
  &:last-child {
    .el-breadcrumb__inner {
      color: #26c6da;
    }
  }
}

// 消息通知
.notice-temp {
  background-color: #fff;
  width: 386px;
  height: 422px;
  box-shadow: 0px 0px 7px 0px rgba(107, 107, 107, 0.5);
  position: absolute;
  font-size: 14px;
  top: 52px;
  right: -100px;
  .notice-temp-title {
    height: 50px;
    text-align: center;
    line-height: 54px;
    border-bottom: 1px solid #e4e7ed;
  }
  .notice-temp-content {
    margin: 10px 0;
    ul {
      list-style-type: none;
      li {
        position: relative;

        height: 40px;
        line-height: 20px;
        padding: 10px 20px;
        color: #606266;
        text-align: justify;
        span {
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
    border-top: 1px solid #e4e7ed;
    line-height: 50px;
    color: #9E9E9E;
    padding: 0 22px;
  }
}
.main-content{
  min-width:850px;
}
.el-main {
  overflow: hidden;
}
.max-side-width{
  width:229px!important;
  transition: width 0.1s;
  -moz-transition: width 0.1s; /* Firefox 4 */
  -webkit-transition: width 0.1s; /* Safari 和 Chrome */
  -o-transition: width 0.1s; /* Opera */

}
.min-side-width{
  width: 63px!important;
  transition: width 0.1s;
  -moz-transition: width 0.1s; /* Firefox 4 */
  -webkit-transition: width 0.1s; /* Safari 和 Chrome */
  -o-transition: width 0.1s; /* Opera */
}
.shrink-btn{
  //display: none;
  height: 48px;
  background: #fff;
  border-top: 1px solid #e4e7ed;
  border-right: 1px solid #e4e7ed;
  position: fixed;
  bottom: 0px;
  z-index: 90;
  line-height: 48px;
  text-align: center;
  color: #7C8F9F;
  font-size: 14px;
  img{
    margin-left:5px;
  }
  &.max-side-width{
    img{
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
    }
  }
  //left:50%;
  //margin-left: -30px;
}
</style>
<template>
  <div>

  <!-- <el-container> -->
    <common-header :type="'loginAfter'" :is-collapse="isCollapse"></common-header>
    <el-container>
      <el-aside :class="isCollapse?'min-side-width':'max-side-width'" style="position:relative;">
        <el-menu class="g-side el-menu-vertical-demo" :class="isCollapse?'':'max-side'" router :collapse="isCollapse">
          <el-row style="margin-top:30px;">
            <el-col v-if="!isCollapse">
              <div class="munu-logo">MENU</div>
            </el-col>
          </el-row>
          <template v-for="(route, index) in menus">
            <template v-if="route.children && dealChildren(route.children).length">
              <el-submenu :key="index" :index="route.name" class="menu-title">
                <template slot="title">
                  <div class="menu-title-cloumn" :class="[{ 'choosed-cloumn' : (breadcrumbs[1] && breadcrumbs[1].name === route.name) }]">
                    <i :class="[{ 'color-26c6da' : (breadcrumbs[1] && breadcrumbs[1].name === route.name) }, route.meta.iconName]"></i>
                    <span :class="{ 'color-26c6da' : (breadcrumbs[1] && breadcrumbs[1].name === route.name) }">{{route.meta.title||"无名字"}}</span>
                  </div>
                </template>
                <el-menu-item v-for="(cRoute, cIndex) in dealChildren(route.children)" :key="cIndex" :index="cRoute.path" :route="cRoute" class="children-menu">
                  <div class="child-menu-title"><i class="chooed-diamond" v-if="breadcrumbs[2] && breadcrumbs[2].name === cRoute.name"></i><span :class="{ 'color-303133' : (breadcrumbs[2] && breadcrumbs[2].name === cRoute.name)  }">{{cRoute.meta.title||"无名字"}}</span></div>
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :route="route" :index="route.name" class="menu-title dashborad-menu">
                <template slot="title">
                  <div class="menu-title-cloumn" :class="{ 'choosed-cloumn' : activeMenu.name === route.name }">
                    <i :class="[{ 'color-26c6da' : activeMenu.name === route.name }, route.meta.iconName]"></i>
                    <span :class="{ 'color-26c6da' : activeMenu.name === route.name }">{{route.meta.title||"无名字"}}</span>
                  </div>
                </template>
              </el-menu-item>
            </template>
          </template>

        </el-menu>
        <div class="shrink-btn cursor-pointer" @click="isShrink" :class="isCollapse?'min-side-width':'max-side-width'">
          <div v-if="isCollapse">
            展开<img src="../assets/img/open.svg">
          </div>
          <div v-else>
            收起<img src="../assets/img/open.svg">
          </div>
        </div>
      </el-aside>
      <el-main>
        <template>
          <div styles="margin-top: 61px;" class="main-content">
            <router-view></router-view>
          </div>
        </template>
      </el-main>
    </el-container>
  <!-- </el-container> -->

  </div>
</template>
<script>
import commonHeader from '@/components/common/commonHeader'
import Lodash from 'lodash'
export default {
  data() {
    return {
      user: {},
      menus: [],
      showNotice: false,
      isCollapse:false,
      pcW:document.body.offsetWidth,
      minPcW:1400
    };
  },
  components: {
    mainHeader: 'mainHeader',
    commonHeader: commonHeader,

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
    // 展示消息浮窗
    isShowNotice() {
      this.showNotice = true;
    },
    signRead(isShow) {
      if (isShow) {

      } else {
        this.showNotice = false;
        this.$router.push({ path: '/news/systemNotice/systemNoticeList' });
      }
    },
    dealChildren: function(children) {
      let childrenMenu = [];
      for (let i in children) {
        if (children[i].meta && !children[i].meta.notRenderMenu) {
          childrenMenu.push(children[i])
        }
      }
      return childrenMenu;
    },
    isShrink(){
      this.isCollapse = !this.isCollapse;
      this.pbFunc.setLocalData('isCollapse',this.isCollapse,true);
    }
  },
  mounted:function(){
    // const that = this
    // window.onresize = _.debounce(() => {
    //     // console.log("onresize:" + that.pcW)
    //     that.pcW = document.body.offsetWidth;
    //     this.isCollapse = this.pcW<this.minPcW?true:false;
    //   }, 400)
  },
  created: function() {
    let user = this.pbFunc.getLocalData('user', true);
    this.isCollapse = this.pbFunc.getLocalData('isCollapse', true);
    // this.isCollapse = this.pcW<this.minPcW?true:false;
    if (user) {
      this.user = user.profile;
    }
    let menus = this.$store.state.common.menuData;
    if (menus) {
      this.menus = menus;
      // console.log('this.menus', this.menus);
    }
  }
};

</script>
