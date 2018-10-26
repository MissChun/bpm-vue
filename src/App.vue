<style lang="less">
@import './assets/css/themeStyle.less';
@import './assets/css/common.less';
@import './assets/css/reset.less';
@import './assets/css/icon.less'; //icon
@import './assets/css/tabsStyle.less';
@import './assets/css/buttonStyle.less';
@import './assets/css/tableStyle.less';
@import './assets/css/style.css';
@import './assets/css/detailStyle.less';
@import './assets/css/settingStyle.less'; //个人设置
@import './assets/css/dialogStyle.less'; //弹窗样式
@import './assets/css/userStyle.less'; //登录 注册 找回密码
@import './assets/css/elementReset';
@import './assets/css/news.less'; //消息通知

</style>
<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>
<script>
import Vue from 'vue';
import staticData from './api/getStaticData.js';
import userPath from './router/fullRouter';
import noData from '@/components/common/noData';
import exportButton from '@/components/common/exportButton';
Vue.component("noData", noData);
Vue.component("exportButton", exportButton);
Vue.filter('dateFilter', function(value) {
  let dates = [];
  if (value) {
    dates = value.split(' ');
  }
  return dates.length ? dates[0] : value;
})
export default {
  name: 'App',
  components: {
    noData: noData,
  },
  data() {
    return {
      menuData: null,
      userData: null
    }
  },
  methods: {
    buildDictionary: function() {
      let dictionaryObject = {
        dashboard: 'dashborad',//概览
        purchaseDashboard: 'purchaseDashboard',
        serviceCentreDashboard: 'serviceCentreDashboard',
        energyDashboard: 'energyDashboard',
        salesStatisticsDashboard: 'salesStatisticsDashboard',
        puchaseStatisticsDashboard: 'puchaseStatisticsDashboard',

        orderManage: 'OrderCenter',//采购中心
        pickupOrders: 'pickupOrders',//托运订单
        outsidePick: 'outsidePick',//外销定单
        outsideBuy: 'outsideBuy',//外采订单
        businessOrder:'SalesOrder',//销售订单

        logisticsManage:'LogisticOrder',//物流管理
        platformWaybill:'platformOrder',//平台管理

        mapManage: 'mapManage',
        carMonitor: 'carMonitor',
        landmark: 'landmark',

        basicDataManage:'baseDataManagement',//基础数据管理
        customerManage:'customerManage',//贸易客户管理
        supplierManage: 'supplierManage',//供应商管理
        purchasePriceManage: 'purchasePriceManage',//采购价格管理
        carrierManage: 'carrierManage',//承运商管理
        standardDataSet:'standardDataManage',//标准数据设置
        // consignmentCenter: 'consignmentCenter',
        // consignmentOrders: 'consignmentOrders',


        // businessManage: 'businessManage',
        // tradeBusiness: 'tradeBusiness',
        // customerManage: 'customerManage',

        // serviceManage: 'serviceManage',
        // businessToExamine: 'businessToExamine',
        // standardDataManage: 'standardDataManage',


        statistics: 'statistics',
        purchase: 'purchase',
        sales: 'sales',
        consignment: 'consignment',
        income: 'income',

        arap: 'arap', //应收应付
        supplierMeetManage: 'supplierMeetManage', //供应商
        payerMeetManage: 'payerMeetManage', //付款方
        carrierMeetManage: 'carrierMeetManage', //承运商

        setting: 'setting',
        organizationalStructure: 'organizationalStructure',
        staffsManage: 'staffsManage',
        powerManage: 'powerManage',

      }
      return dictionaryObject;
    },
    findDictionary: function(menuList) {
      let findDictionaryObject = {};
      let dictionaryObject = this.buildDictionary();
      for (let i in dictionaryObject) {
        for (let j in menuList) {
          if (menuList[j].menu_key === dictionaryObject[i]) { //寻找一级菜单
            findDictionaryObject[i] = dictionaryObject[i];
          };
          if (menuList[j].second_menus && menuList[j].second_menus.length) { //寻找二级菜单
            for (let k in menuList[j].second_menus) {
              if (menuList[j].second_menus[k].menu_key === dictionaryObject[i]) {
                findDictionaryObject[i] = dictionaryObject[i];
              }
            }
          };
        }
      }
      return findDictionaryObject;
    },

    extendRoutes: function(allowedRouter) {
      let that = this;

      let originPath = that.pbFunc.deepcopy(userPath);
      /*
       ** 这里注入相应权限的路由，暂时不做。
       ** let actualRouter = that.pbFunc.deepcopy(allowedRouter);
       **  originPath[0].children = actualRouter;
       */
      //注入路由
      that.$router.addRoutes(originPath.concat([{
        path: '*',
        redirect: '/404'
      }]));

    },
    loginDirect: function(newPath) {
      this.pathIn(true);
    },


    isHasTokenAndMenu: function(menuList, token) {
      if (!menuList.length || !token) {
        this.$message.error('验证信息缺失，请重新登录');
        this.$router.replace({ path: '/login' });
      }
    },
    addRoutes: function(menuList) {
      let originPath = that.pbFunc.deepcopy(userPath);
      if (menuList && menuList.length) {
        for (let i in menuList) {
          if (menuList[i].menu_key === 'SETTINGS') {

          }
        }
      }
    },
    pathIn: function(isGoFirstPath) {

      let allowedRouter = [];
      let menuList = this.pbFunc.getLocalData('menuList', true);
      let menuDictionaryObject = this.findDictionary(menuList);
      let token = this.pbFunc.getLocalData('token', true);
      //this.isHasTokenAndMenu(menuList, token);
      allowedRouter = this.getRoutesList(menuDictionaryObject);
      this.extendRoutes(allowedRouter);
      this.$store.state.common.menuData = allowedRouter;
      this.$store.state.common.userData = { name: "测试名称" };
      if (isGoFirstPath) {
        if (allowedRouter[0] && allowedRouter[0].children && allowedRouter[0].children.length) {
          this.$router.replace({ name: allowedRouter[0].children[0].name });
        } else {
          this.$router.replace({ path: allowedRouter[0].path });
        }
      }
    },
    getRoutesList: function(menuDictionaryObject) {

      let newRoute = []
      let userPathChild = this.pbFunc.deepcopy(userPath[0].children);

      for (let i in menuDictionaryObject) {
        for (let j in userPathChild) {
          if (userPathChild[j].name === i) {

            if (userPathChild[j].children && userPathChild[j].children.length) {
              let pathCopy = this.pbFunc.deepcopy(userPathChild[j]);
              pathCopy.children = []; //保留一级菜单，去除二级菜单
              for (let m in menuDictionaryObject) {
                for (let k in userPathChild[j].children) {
                  if (userPathChild[j].children[k].name === m) {
                    pathCopy.children.push(userPathChild[j].children[k]);
                  }
                }
              }
              newRoute.push(pathCopy);
            } else {
              newRoute.push(userPathChild[j]);
            }

          }
        }
      }
      return newRoute;
    },
    logoutDirect: function() {
      //清除session
      this.pbFunc.setLocalData('token', '');
      //清除菜单权限
      this.pbFunc.setLocalData('menuList', '');
      //回到登录页
      this.$router.replace({ path: '/login' });
    }
  },
  created: function(newPath) {
    let vm = this;
    let token = vm.pbFunc.getLocalData('token', true);
    /*if (token) {
      this.$$http('getUser', {}).then((results) => {
        if (results.data && results.data.code === 0) {
          this.$store.state.common.users = results.data.data;
        }
      }).catch((err) => {
        this.$message.error('获取用户信息失败');
      })
    }*/
    // this.$$http("getSelectData", {}).then(function(reslut) {
    //   if (reslut.data.code == 0)
    //     vm.$store.state.common.selectData = reslut.data.data;
    // });
    vm.pathIn();
  }
};

</script>
