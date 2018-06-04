export default [{
  path: '/',
  name: 'index',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [{
      path: 'dashborad',
      name: 'dashborad',
      meta: {
        isVerificationL: true,
        title: '概览',
        iconName: 'icon-lng-dashboard'
      },
      component: (resolve) => require(['../page/dashborad/dashborad'], resolve),
    }, {
      path: 'purchaseCenter',
      name: 'purchaseCenter',
      meta: {
        isVerificationL: false,
        title: '采购中心',
        iconName: 'icon-lng-dashboard',
      },
      component: (resolve) => require(['../page/purchaseCenter/orders'], resolve),
      children: [{
        path: 'pickupOrders',
        name: 'pickupOrders',
        redirect: '/purchaseCenter/pickupOrders/ordersList',
        meta: {
          isVerificationL: false,
          title: '提货订单',
        },
        component: (resolve) => require(['../page/purchaseCenter/pickupOrders/pickupOrders'], resolve),
        children: [{
            path: 'ordersList',
            name: 'pickupOrdersList',
            meta: {
              isVerificationL: false,
              title: '提货订单列表',
            },
            component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderList'], resolve),
          },
          {
            path: 'addNewPickUpOrder',
            name: 'addOrder',
            meta: {
              isVerificationL: false,
              title: '新增提货订单',
            },
            component: (resolve) => require(['../page/purchaseCenter/pickupOrders/addNewPickUpOrder'], resolve),
          },
          {
            path: 'orderDetail',
            name: 'pickupOrdersDetail',
            meta: {
              isVerificationL: false,
              title: '订单详情'
            },
            component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderDetail'], resolve),
            children: [{
              path: 'orderDetailTab/:id/:type',
              name: 'pickupOrderDetailTab',
              meta: {
                isVerificationL: false,
                title: '订单详情',
              },
              component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderDetail/orderDetailTab'], resolve),
            }, {
              path: 'arrangeCarTab',
              name: 'pickupArrangeCarTab',
              redirect: '/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList',
              meta: {
                isVerificationL: false,
                title: '车辆指派'
              },
              component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab'], resolve),
              children: [{
                path: 'arrangeCarList/:id/:type',
                name: 'pickArrangeCarList',
                meta: {
                  isVerificationL: false,
                  title: '车辆指派列表'
                },
                component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderDetail/arrangeCarList'], resolve),
              }, {
                path: 'arrangeCarMap/:id/:type',
                name: 'pickupArrangeCarMap',
                meta: {
                  isVerificationL: false,
                  title: '地图'
                },
                component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderDetail/arrangeCarMap'], resolve),
              }]
            }, {
              path: 'orderRecordsTab/:id/:type',
              name: 'pickupOrderRecordsTab',
              meta: {
                isVerificationL: false,
                title: '订单记录'
              },
              component: (resolve) => require(['../page/purchaseCenter/pickupOrders/orderDetail/orderRecordsTab'], resolve),
            }]
          }
        ]
      }]
    },
    //托运中心
    {
      path: 'consignmentCenter',
      name: 'consignmentCenter',
      meta: {
        isVerificationL: false,
        title: '托运中心',
        iconName: 'icon-lng-dashboard',
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
              path: 'orderDetailTab/:id',
              name: 'consignmentOrderDetailTab',
              meta: {
                isVerificationL: false,
                title: '运单详情'
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail/orderDetailTab'], resolve),
            }, {
              path: 'arrangeCarTab',
              name: 'consignmentArrangeCarTab',
              redirect: '/orders/consignmentOrder/orderDetail/arrangeCarTab/arrangeCarList',
              meta: {
                isVerificationL: false,
                title: '运单进程',
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail/arrangeCarTab'], resolve),
            }, {
              path: 'orderRecordsTab/:id',
              name: 'consignmentOrderRecordsTab',
              meta: {
                isVerificationL: false,
                title: '轨迹地图',
              },
              component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/orderDetail/orderRecordsTab'], resolve),
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
              path: "unloadPlanList/:id",
              name: 'unloadPlanList',
              meta: {
                isVerificationL: false,
                title: '卸车计划列表',
                component: (resolve) => require(['../page/consignmentCenter/consignmentOrder/unloadPlan/unloadPlanList'], resolve),
              },
            }]
          }
        ]
      }]
    }, {
      path: 'businessManage',
      name: 'businessManage',
      meta: {
        isVerificationL: false,
        title: '贸易业务',
        iconName: 'icon-lng-dashboard',
      },
      component: (resolve) => require(['../page/businessManage/businessManage'], resolve),
      children: [{
        path: 'tradeBusiness',
        name: 'tradeBusiness',
        redirect: '/businessManage/tradeBusiness/tradeBusinessList',
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
      }]

    }, {
      path: 'businessManage',
      name: 'businessManage',
      meta: {
        isVerificationL: false,
        title: '贸易业务',
        iconName: 'icon-lng-dashboard',
      },
      component: (resolve) => require(['../page/businessManage/businessManage'], resolve),
      children: [{
        path: 'tradeBusiness',
        name: 'tradeBusiness',
        redirect: '/businessManage/tradeBusiness/tradeBusinessList',
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
      }]
    }, {
      path: 'logisticsManage',
      name: 'logisticsManage',
      meta: {
        isVerificationL: true,
        title: '物流管理',
        iconName: 'icon-road',
      },
      component: (resolve) => require(['../page/logisticsManage/logisticsManage'], resolve),
    }, {
      path: 'mapManage',
      name: 'mapManage',
      meta: {
        isVerificationL: true,
        title: '地图',
        iconName: 'icon-road',
      },
      component: (resolve) => require(['../page/map/mapManage'], resolve),
      children: [{
        path: 'carMonitor',
        name: 'carMonitor',
        redirect: '/mapManage/carMonitor/realTimeMonitor',
        meta: {
          isVerificationL: true,
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
      }, {
        path: 'standardMile',
        name: 'standardMile',
        redirect: '/mapManage/standardMile/standardMileList',
        meta: {
          isVerificationL: true,
          title: '标准里程管理',
        },
        component: (resolve) => require(['../page/map/standardMile/standardMile'], resolve),
        children: [{
          path: 'standardMileList',
          name: 'standardMileList',
          meta: {
            isVerificationL: false,
            title: '标准里程列表',
          },
          component: (resolve) => require(['../page/map/standardMile/standardMileList'], resolve),
        }, {
          path: 'standardMileDetail/:id',
          name: 'standardMileDetail',
          meta: {
            isVerificationL: false,
            title: '标准里程详情',
          },
          component: (resolve) => require(['../page/map/standardMile/standardMileDetail'], resolve),
        }, {
          path: 'editStandardMile',
          name: 'editStandardMile',
          meta: {
            isVerificationL: false,
            title: '新增、编辑标准里程',
          },
          component: (resolve) => require(['../page/map/standardMile/editStandardMile'], resolve),
        }]
      }, {
        path: 'landmark',
        name: 'landmark',
        redirect: '/mapManage/landmark/landmarkList',
        meta: {
          isVerificationL: true,
          title: '地标管理',
        },
        component: (resolve) => require(['../page/map/landmark/landmark'], resolve),
        children: [{
          path: 'landmarkList',
          name: 'landmarkList',
          meta: {
            isVerificationL: false,
            title: '标准里程列表',
          },
          component: (resolve) => require(['../page/map/landmark/landmarkList'], resolve),
        }, {
          path: 'landmarkDetail/:id',
          name: 'landmarkDetail',
          meta: {
            isVerificationL: false,
            title: '标准里程详情',
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
        }]
      }]
    }, {
      path: 'transportPowerManage',
      name: 'transportPowerManage',
      meta: {
        isVerificationL: true,
        title: '运力',
        iconName: 'icon-map',
      },
      component: (resolve) => require(['../page/transportPowerManage/transportPowerManage'], resolve),
      children: [{
        path: 'capacityManage',
        name: 'capacityManage',
        redirect: '/transportPowerManage/capacityManage/capacityList',
        meta: {
          isVerificationL: true,
          title: '运力管理',
        },
        component: (resolve) => require(['../page/transportPowerManage/capacityManage/capacityManage'], resolve),
        children: [{
          path: 'capacityList',
          name: 'capacityList',
          meta: {
            isVerificationL: false,
            title: '运力列表',
          },
          component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityList'], resolve)
        }, {
          path: 'capacityDetail',
          name: 'capacityDetail',
          meta: {
            isVerificationL: false,
            title: '运力详情',
          },
          component: (resolve) => require(['../components/transportPowerManage/capacityManage/capacityDetail'], resolve)
        }, {
          path: 'edit',
          name: 'edit',
          meta: {
            isVerificationL: false,
            title: '编辑绑定信息',
          },
          component: (resolve) => require(['../components/transportPowerManage/capacityManage/editCapacity'], resolve)
        }]
      }, {
        path: 'carManage',
        name: 'carManage',
        meta: {
          isVerificationL: true,
          title: '车辆管理',
        },
        component: (resolve) => require(['../page/transportPowerManage/carManageFiled/carManage'], resolve),
        children: [{
            path: 'carHeadManage',
            name: 'carHeadManage',
            meta: {
              isVerificationL: false,
              title: '牵引车管理',
            },
            component: (resolve) => require(['../components/transportPowerManage/carManage/carHeadManage'], resolve)
          },
          {
            path: 'carTailManage',
            name: 'carTailManage',
            meta: {
              isVerificationL: false,
              title: '挂车管理',
            },
            component: (resolve) => require(['../components/transportPowerManage/carManage/carTailManage'], resolve)
          },
          {
            path: 'addEditCarHeadManage',
            name: 'addEditCarHeadManage',
            meta: {
              isVerificationL: false,
              title: '新增编辑牵引车管理',
            },
            component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarHeadManage'], resolve)
          },
          {
            path: 'addEditCarTailManage',
            name: 'addEditCarTailManage',
            meta: {
              isVerificationL: false,
              title: '新增编辑挂车管理',
            },
            component: (resolve) => require(['../components/transportPowerManage/carManage/addEditCarTailManage'], resolve)
          },
          {
            path: 'showCarHeadManage',
            name: 'showCarHeadManage',
            meta: {
              isVerificationL: false,
              title: '查看牵引车管理',
            },
            component: (resolve) => require(['../components/transportPowerManage/carManage/showCarHeadManage'], resolve)
          },
          {
            path: 'showCarTailManage',
            name: 'showCarTailManage',
            meta: {
              isVerificationL: false,
              title: '查看挂车管理'
            },
            component: (resolve) => require(['../components/transportPowerManage/carManage/showCarTailManage'], resolve)
          }
        ]

      }, {
        path: 'personManage',
        redirect: '/transportPowerManage/personManage/personListManage',
        name: 'personManage',
        meta: {
          isVerificationL: true,
          title: '人员管理',
        },
        component: (resolve) => require(['../page/transportPowerManage/personManage/personManager'], resolve),
        children: [{
            path: 'personListManage',
            name: 'personListManage',
            meta: {
              isVerificationL: false,
              title: '人员列表管理',
            },
            component: (resolve) => require(['../page/transportPowerManage/personManage/personListManager'], resolve)
          },
          {
            path: 'addPerson',
            name: 'addPerson',
            meta: {
              isVerificationL: false,
              title: '新增、编辑人员',
            },
            component: (resolve) => require(['../page/transportPowerManage/personManage/addPerson'], resolve)
          },
          {
            path: 'personDetail',
            name: 'personDetail',
            meta: {
              isVerificationL: false,
              title: '人员详情'
            },
            component: (resolve) => require(['../page/transportPowerManage/personManage/personDetail'], resolve)
          },
        ]
      }]
    }, {
      path: 'clientManage',
      name: 'clientManage',
      meta: {
        isVerificationL: true,
        title: '客户管理',
        iconName: 'icon-customer',
      },
      component: (resolve) => require(['../page/clientManage/clientManage'], resolve),
      children: [{
          path: 'privateClientManage',
          name: 'privateClientManage',
          meta: {
            isVerificationL: false,
            title: '客户管理',
          },
          component: (resolve) => require(['../page/clientManage/privateClientManage'], resolve)
        }, {
          path: 'addClient',
          name: 'addClient',
          meta: {
            isVerificationL: false,
            title: '新增、编辑客户',
            notRenderMenu: true,
          },
          component: (resolve) => require(['../page/clientManage/addClient'], resolve)
        },
        {
          path: 'clientDetail',
          name: 'clientDetail',
          meta: {
            isVerificationL: false,
            title: '客户详情',
            notRenderMenu: true,
          },
          component: (resolve) => require(['../page/clientManage/clientDetail'], resolve)
        },
        {
          path: 'platformClientManage',
          name: 'platformClientManage',
          meta: {
            isVerificationL: false,
            title: '平台客户管理',
            notRenderMenu: true,
          },
          component: (resolve) => require(['../page/clientManage/platformClientManage'], resolve)
        },
      ]
    }, {
      path: 'statistics',
      name: 'statistics',
      meta: {
        isVerificationL: true,
        title: '数据统计',
        iconName: 'icon-data',
      },
      component: (resolve) => require(['../page/statistics/statistics'], resolve),
    }, {
      path: 'setting',
      name: 'setting',
      meta: {
        isVerificationL: true,
        title: '设置',
        iconName: 'icon-setting',
      },
      component: (resolve) => require(['../page/setting/setting'], resolve),
      children: [{
          path: 'organizationalStructure',
          name: "组织架构",
          meta: {
            title: '组织架构',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/organizationalStructure'], resolve)
        },
        {
          path: 'staffsManage',
          name: "员工管理",
          meta: {
            title: '员工管理',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/staffsManage'], resolve)
        },
        {
          path: 'powerManage',
          name: "权限管理",
          meta: {
            title: '权限管理',
            isVerificationL: true
          },
          component: (resolve) => require(['../page/setting/powerManage'], resolve)
        }
      ]
    }
  ]
}];
