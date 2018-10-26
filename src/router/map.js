export default {
  path: 'mapManage',
  name: 'mapManage',
  meta: {
    isVerificationL: false,
    title: '地图',
    iconName: 'icon-road',
  },
  component: (resolve) => require(['../page/map/mapManage'], resolve),
  children: [{
      path: 'carMonitor',
      name: 'carMonitor',
      redirect: '/mapManage/carMonitor/realTimeMonitor',
      meta: {
        isVerificationL: false,
        title: '车辆监控',
      },
      component: (resolve) => require(['../page/map/carMonitor/carMonitor'], resolve),
      children: [{
        path: 'realTimeMonitor',
        name: 'realTimeMonitor',
        meta: {
          isVerificationL: false,
          title: '实时监控',
        },
        component: (resolve) => require(['../page/map/carMonitor/realTimeMonitor'], resolve),
      }, {
        path: 'routePlayback/:id',
        name: 'routePlayback',
        meta: {
          isVerificationL: false,
          title: '轨迹回放',
        },
        component: (resolve) => require(['../page/map/carMonitor/routePlayback'], resolve),
      }]
    },{
      path: 'landmark',
      name: 'landmark',
      redirect: '/mapManage/landmark/landmarkList',
      meta: {
        isVerificationL: false,
        title: '地标及路线',
      },
      component: (resolve) => require(['../page/map/landmark/landmark'], resolve),
      children: [{
        path: 'landmarkList',
        name: 'landmarkList',
        meta: {
          isVerificationL: false,
          title: '地标列表',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkList'], resolve),
      }, {
        path: 'landmarkDetail/:id',
        name: 'landmarkDetail',
        meta: {
          isVerificationL: false,
          title: '地标详情',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkDetail'], resolve),
      }, {
        path: 'landmarkMap',
        name: 'landmarkMap',
        meta: {
          isVerificationL: false,
          title: '地标地图',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkMap'], resolve),
      }, {
        path: 'editLandmark',
        name: 'editLandmark',
        meta: {
          isVerificationL: false,
          title: '新增、编辑地标',
        },
        component: (resolve) => require(['../page/map/landmark/landmarkMapAdd'], resolve),
      }]
    }
  ]
}
