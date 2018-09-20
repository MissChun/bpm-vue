import order from './order'
import arap from './arap'
import statistics from './statistics'
export default [{
  path: '',
  name: 'index',
  redirect: '/dashborad',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [
    order,
    arap,
    statistics,
    {
      path: 'dashboard',
      name: 'dashboard',
      meta: {
        isVerificationL: false,
        title: '概览',
        iconName: 'icon-dashboard'
      },
      component: (resolve) => require(['../page/dashboard/dashboard'], resolve),
      children: [{
        path: 'purchaseDashboard',
        name: 'purchaseDashboard',
        meta: {
          isVerificationL: false,
          title: '采购概览',
        },
        component: (resolve) => require(['../page/dashboard/purchaseDashboard'], resolve),
      }, {
        path: 'serviceCentreDashboard',
        name: 'serviceCentreDashboard',
        meta: {
          isVerificationL: false,
          title: '服务中心概览',
        },
        component: (resolve) => require(['../page/dashboard/serviceCentreDashboard'], resolve),
      }, {
        path: 'puchaseStatisticsDashboard',
        name: 'puchaseStatisticsDashboard',
        meta: {
          isVerificationL: false,
          title: '采购统计概览',
        },
        component: (resolve) => require(['../page/dashboard/puchaseStatisticsDashboard'], resolve),
      }, {
        path: 'salesStatisticsDashboard',
        name: 'salesStatisticsDashboard',
        meta: {
          isVerificationL: false,
          title: '销售统计概览',
        },
        component: (resolve) => require(['../page/dashboard/salesStatisticsDashboard'], resolve),
      }]
    },
    //托运中心
    {
      path: 'consignmentCenter',
      name: 'consignmentCenter',
      meta: {
        isVerificationL: false,
        title: '托运中心',
        iconName: 'icon-plane',
      },

      component: (resolve) => require(['../page/consignmentCenter/orders'], resolve),
      children: [{
        path: 'consignmentOrders',
        name: 'consignmentOrders',
        meta: {
          isVerificationL: false,
          title: '托运订单'
        },
        redirect: '/consignmentCenter/consignmentOrders/ordersList',
        component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/consignmentOrders'], resolve),
        children: [{
            path: 'ordersList',
            name: 'consignmentOrdersList',
            meta: {
              isVerificationL: false,
              title: '托运订单'
            },
            component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderList'], resolve),
          },
          {
            path: 'orderDetail',
            name: 'consignmentOrderDetail',
            meta: {
              isVerificationL: false,
              title: '运单详情'
            },
            component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail'], resolve),
            children: [{
              path: 'orderDetailTab/:setpId/:willId',
              name: 'consignmentOrderDetailTab',
              meta: {
                isVerificationL: false,
                title: '运单详情'
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail/orderDetailTab'], resolve),
            }, {
              path: 'orderProcess/:setpId/:willId',
              name: 'consignmentArrangeCarTab',
              meta: {
                isVerificationL: false,
                title: '运单进程',
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail/orderProcess'], resolve),
            }, {
              path: 'consignmentRouteplay/:setpId/:willId',
              name: 'consignmentRouteplay',
              meta: {
                isVerificationL: false,
                title: '轨迹地图',
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail/consignmentRouteplay'], resolve),
            }]
          }, {
            //卸车计划
            path: "matchLoadPlan",
            name: 'matchLoadPlan',
            meta: {
              isVerificationL: false,
              title: '卸车计划'
            },
            //redirect: '/consignmentCenter/consignmentOrders/matchLoadPlan/unloadPlanList/:id',
            component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/unloadPlan/unloadPlanTabs'], resolve),
            children: [{
              path: "unloadPlanList/:id/:setpId",
              name: 'unloadPlanList',
              meta: {
                isVerificationL: false,
                title: '卸车计划列表',
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/unloadPlan/unloadPlanList'], resolve),
            }]
          }
        ]
      }, {
        path: 'carrierManage',
        name: 'carrierManage',
        meta: {
          isVerificationL: false,
          title: '承运商管理'
        },
        redirect: '/consignmentCenter/carrierManage/carrierList',
        component: (resolve) => require(['../page/consignmentCenter/carrierManage/carrierManage'], resolve),
        children: [{
          path: 'carrierList',
          name: 'carrierManageList',
          meta: {
            isVerificationL: false,
            title: '承运商列表'
          },
          component: (resolve) => require(['../page/consignmentCenter/carrierManage/carrierList'], resolve),
        }, {
          path: 'carrierDetail',
          name: 'carrierDetail',
          meta: {
            isVerificationL: false,
            title: '承运商详情'
          },
          component: (resolve) => require(['../page/consignmentCenter/carrierManage/carrierDetail'], resolve),
        }, {
          path: 'editCarrier',
          name: 'editCarrier',
          meta: {
            isVerificationL: false,
            title: '编辑承运商'
          },
          component: (resolve) => require(['../page/consignmentCenter/carrierManage/editCarrier'], resolve),
        }]
      }]
    },
    {
      path: 'businessManage',
      name: 'businessManage',
      meta: {
        isVerificationL: false,
        title: '业务中心',
        iconName: 'icon-coin',
      },
      component: (resolve) => require(['../page/businessManage/businessManage'], resolve),
      children: [{
        path: 'tradeBusiness',
        name: 'tradeBusiness',
        redirect: '/businessManage/tradeBusiness/businessList',
        meta: {
          isVerificationL: false,
          title: '贸易业务单',
          iconName: 'icon-lng-dashboard',
        },
        component: (resolve) => require(['../page/businessManage/tradeBusiness/tradeBusiness'], resolve),
        children: [{
          path: 'businessList',
          name: 'tradeBusinessList',
          meta: {
            isVerificationL: false,
            title: '贸易业务单列表',
          },
          component: (resolve) => require(['../page/businessManage/tradeBusiness/tradeBusinessList'], resolve),
        }, {
          path: 'businessDetail',
          name: 'tradeBusinessDetail',
          meta: {
            isVerificationL: false,
            title: '贸易业务单详情',
          },
          component: (resolve) => require(['../page/businessManage/tradeBusiness/tradeBusinessDetail'], resolve),
        }]
      }, {
        path: 'customerManage',
        name: 'customerManage',
        meta: {
          isVerificationL: false,
          title: '客户管理',
        },
        component: (resolve) => require(['../page/businessManage/customerManage'], resolve),
        redirect: '/businessManage/customerManage/customerManageAll/customerManageList',
        children: [{
            path: 'customerManageAll',
            name: 'customerManageAll',
            meta: {
              isVerificationL: false,
              title: '客户管理',
            },
            redirect: '/businessManage/customerManage/customerManageAll/customerManageList',
            component: (resolve) => require(['../page/businessManage/customerManage/customerManageAll'], resolve),
            children: [{
              path: 'customerManageList',
              name: 'customerManageList',
              meta: {
                isVerificationL: false,
                title: '客户管理列表',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/customerManageAll/customerManageList'], resolve),
            }, {
              path: 'customerManageDetalis',
              name: 'customerManageDetalis',
              meta: {
                isVerificationL: false,
                title: '客户管理详情',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/customerManageAll/customerManageDetalis'], resolve),
            }, {
              path: 'customerManageEditAdd',
              name: 'customerManageEditAdd',
              meta: {
                isVerificationL: false,
                title: '客户管理新增编辑',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/customerManageAll/customerManageEditAdd'], resolve),
            }]
          },
          {
            path: 'customerPayManageAll',
            name: 'customerPayManageAll',
            meta: {
              isVerificationL: false,
              title: '付款方管理',
            },
            redirect: '/businessManage/customerManage/customerPayManageAll/customerPayManageList',
            component: (resolve) => require(['../page/businessManage/customerManage/customerPayManageAll'], resolve),
            children: [{
              path: 'customerPayManageList',
              name: 'customerPayManageList',
              meta: {
                isVerificationL: false,
                title: '付款方列表',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/customerPayManageAll/customerPayManageList'], resolve),
            }, {
              path: 'customerPayManageDetalis',
              name: 'customerPayManageDetalis',
              meta: {
                isVerificationL: false,
                title: '付款方详情',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/customerPayManageAll/customerPayManageDetalis'], resolve),
            }, {
              path: 'customerPayManageEditAdd',
              name: 'customerPayManageEditAdd',
              meta: {
                isVerificationL: false,
                title: '付款方新增编辑',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/customerPayManageAll/customerPayManageEditAdd'], resolve),
            }]
          },
          {
            path: 'stationManageAll',
            name: 'stationManageAll',
            meta: {
              isVerificationL: false,
              title: '客户站点',
            },
            redirect: '/businessManage/customerManage/stationManageAll/stationManageList',
            component: (resolve) => require(['../page/businessManage/customerManage/stationManageAll'], resolve),
            children: [{
              path: 'stationManageList',
              name: 'stationManageList',
              meta: {
                isVerificationL: false,
                title: '站点列表',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/stationManageAll/stationManageList'], resolve),
            }, {
              path: 'stationManageEditAdd',
              name: 'stationManageEditAdd',
              meta: {
                isVerificationL: false,
                title: '编辑、新增站点',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/stationManageAll/stationManageEditAdd'], resolve),
            }, {
              path: 'stationManageMap',
              name: 'stationManageMap',
              meta: {
                isVerificationL: false,
                title: '站点地图',
              },
              component: (resolve) => require(['../page/businessManage/customerManage/stationManageAll/stationManageMap'], resolve),
            }]
          }
        ]
      }]
    },
    {
      path: 'serviceManage',
      name: 'serviceManage',
      meta: {
        isVerificationL: false,
        title: '服务中心',
        iconName: 'icon-service',
      },
      component: (resolve) => require(['../page/serviceManage/serviceManage'], resolve),
      children: [{
        path: 'businessToExamine',
        name: 'businessToExamine',
        redirect: '/serviceManage/businessToExamine/businessList',
        meta: {
          isVerificationL: false,
          title: '业务单审批',
          iconName: 'icon-lng-dashboard',
        },
        component: (resolve) => require(['../page/serviceManage/businessToExamine/business'], resolve),
        children: [{
          path: 'businessList',
          name: 'businessList',
          meta: {
            isVerificationL: false,
            title: '业务单审批列表',
          },
          component: (resolve) => require(['../page/serviceManage/businessToExamine/businessList'], resolve),
        }, {
          path: 'businessDetail',
          name: 'businessDetail',
          meta: {
            isVerificationL: false,
            title: '业务单审批详情',
          },
          component: (resolve) => require(['../page/serviceManage/businessToExamine/businessDetail'], resolve),
        }]
      }, {
        path: 'standardDataManage',
        name: 'standardDataManage',
        redirect: '/serviceManage/standardDataManage/freightDataList',
        meta: {
          isVerificationL: false,
          title: '标准数据管理',
          iconName: 'icon-lng-dashboard',
        },
        component: (resolve) => require(['../page/serviceManage/standardDataManage/standardDataManage'], resolve),
        children: [{
          path: 'freightDataList',
          name: 'freightDataList',
          meta: {
            isVerificationL: false,
            title: '运费约定',
          },
          component: (resolve) => require(['../page/serviceManage/standardDataManage/freightDataList'], resolve),
        }, {
          path: 'mileageDataList',
          name: 'mileageDataList',
          meta: {
            isVerificationL: false,
            title: '标准里程',
          },
          component: (resolve) => require(['../page/serviceManage/standardDataManage/mileageDataList'], resolve),
        }, {
          path: 'editMileage',
          name: 'editMileage',
          meta: {
            isVerificationL: false,
            title: '编辑、新增标准里程',
          },
          component: (resolve) => require(['../page/serviceManage/standardDataManage/editMileage'], resolve),
        }, {
          path: 'mileageDetail',
          name: 'mileageDetail',
          meta: {
            isVerificationL: false,
            title: '标准里程详情',
          },
          component: (resolve) => require(['../page/serviceManage/standardDataManage/mileageDetail'], resolve),
        }, {
          path: 'freightDetail',
          name: 'freightDetail',
          meta: {
            isVerificationL: false,
            title: '运费约定详情',
          },
          component: (resolve) => require(['../page/serviceManage/standardDataManage/freightDetail'], resolve),
        }]
      }]
    },
    {
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
            title: '地图监控',
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
        },
        // {
        //   path: 'standardMile',
        //   name: 'standardMile',
        //   redirect: '/mapManage/standardMile/standardMileList',
        //   meta: {
        //     isVerificationL: false,
        //     title: '标准里程管理',
        //   },
        //   component: (resolve) => require(['../page/map/standardMile/standardMile'], resolve),
        //   children: [{
        //     path: 'standardMileList',
        //     name: 'standardMileList',
        //     meta: {
        //       isVerificationL: false,
        //       title: '标准里程列表',
        //     },
        //     component: (resolve) => require(['../page/map/standardMile/standardMileList'], resolve),
        //   }, {
        //     path: 'standardMileDetail/:id',
        //     name: 'standardMileDetail',
        //     meta: {
        //       isVerificationL: false,
        //       title: '标准里程详情',
        //     },
        //     component: (resolve) => require(['../page/map/standardMile/standardMileDetail'], resolve),
        //   }, {
        //     path: 'editStandardMile',
        //     name: 'editStandardMile',
        //     meta: {
        //       isVerificationL: false,
        //       title: '新增、编辑标准里程',
        //     },
        //     component: (resolve) => require(['../page/map/standardMile/editStandardMile'], resolve),
        //   }]
        // },

        {
          path: 'landmark',
          name: 'landmark',
          redirect: '/mapManage/landmark/landmarkList',
          meta: {
            isVerificationL: false,
            title: '地标管理',
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
    },
    ,

    {
      path: 'setting',
      name: 'setting',
      meta: {
        isVerificationL: false,
        title: '设置',
        iconName: 'icon-setting',
      },
      component: (resolve) => require(['../page/setting/setting'], resolve),
      children: [{
          path: 'organizationalStructure',
          name: "organizationalStructure",
          meta: {
            title: '组织架构',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/organizationalStructure'], resolve)
        },
        {
          path: 'staffsManage',
          name: "staffsManage",
          meta: {
            title: '员工管理',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/staffsManage'], resolve)
        },
        {
          path: 'powerManage',
          name: "powerManage",
          meta: {
            title: '权限管理',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/powerManage'], resolve)
        }
      ]
    }, {
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
        // {
        //   path: 'staffsManage',
        //   name: "staffsManage",
        //   meta: {
        //     title: '员工管理',
        //     isVerificationL: true
        //   },
        //   component: (resolve) => require(['../page/setting/staffsManage'], resolve)
        // }
      ]
    }
  ]
}];
