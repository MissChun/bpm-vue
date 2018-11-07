import order from './order'
import arap from './arap'
import statistics from './statistics'
import importData from './imports'
import dashboard from './dashboard'//概览
import logisticsManage from './logisticsManage'//物流管理
import map from './map'//地图
import basicDataManage from './basicDataManage'//基础数据管理
import setting from './setting'//设置

export default [{
  path: '',
  name: 'index',
  redirect: '/dashborad',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [
    dashboard,
    order,
    logisticsManage,
    map,
    basicDataManage,
    arap,
    statistics,
    setting,
    importData,
    {
      path: 'news',
      name: 'news',
      meta: {
        isVerificationL: false,
        title: '消息通知',
        iconName: 'icon-setting'
      },
      component: (resolve) => require(['../page/news/news'], resolve),
      children: [{
          path: 'systemNotice',
          name: "systemNotice",
          meta: {
            title: '系统通知',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/news/news'], resolve),
          children: [{
            path: 'systemNoticeList',
            name: "systemNoticeList",
            meta: {
              title: '系统通知列表',
              isVerificationL: false
            },
            component: (resolve) => require(['../page/news/systemNotice/systemNoticeList'], resolve)
          }]
        },
      ]
    }
  ]
}];
