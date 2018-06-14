export default [{
  path: '',
  name: 'index',
  redirect: '/dashborad',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [{
      path: 'dashborad',
      name: 'dashborad',
      meta: {
        isVerificationL: false,
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
    }, {
      path: 'businessManage',
      name: 'businessManage',
      meta: {
        isVerificationL: false,
        title: '业务中心',
        iconName: 'icon-lng-dashboard',
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
      }]

    }, {
      path: 'serviceManage',
      name: 'serviceManage',
      meta: {
        isVerificationL: false,
        title: '服务中心',
        iconName: 'icon-lng-dashboard',
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
        },
        // }, {
        //   path: 'standardDataManage',
        //   name: 'standardDataManage',
        //   redirect: '/serviceManage/standardDataManage/freightDataList',
        //   meta: {
        //     isVerificationL: false,
        //     title: '标准数据管理',
        //     iconName: 'icon-lng-dashboard',
        //   },
        //   component: (resolve) => require(['../page/serviceManage/standardDataManage/standardDataManage'], resolve),
        //   children: [{
        //     path: 'freightDataList',
        //     name: 'freightDataList',
        //     meta: {
        //       isVerificationL: false,
        //       title: '运费约定',
        //     },
        //     component: (resolve) => require(['../page/serviceManage/standardDataManage/freightDataList'], resolve),
        //   }, {
        //     path: 'mileageDataList',
        //     name: 'mileageDataList',
        //     meta: {
        //       isVerificationL: false,
        //       title: '标准里程',
        //     },
        //     component: (resolve) => require(['../page/serviceManage/standardDataManage/mileageDataList'], resolve),
        //   }, {
        //     path: 'editMileage',
        //     name: 'editMileage',
        //     meta: {
        //       isVerificationL: false,
        //       title: '编辑、新增标准里程',
        //     },
        //     component: (resolve) => require(['../page/serviceManage/standardDataManage/editMileage'], resolve),
        //   }, {
        //     path: 'mileageDetail',
        //     name: 'mileageDetail',
        //     meta: {
        //       isVerificationL: false,
        //       title: '标准里程详情',
        //     },
        //     component: (resolve) => require(['../page/serviceManage/standardDataManage/mileageDetail'], resolve),
        //   }, {
        //     path: 'freightDetail',
        //     name: 'freightDetail',
        //     meta: {
        //       isVerificationL: false,
        //       title: '运费约定详情',
        //     },
        //     component: (resolve) => require(['../page/serviceManage/standardDataManage/freightDetail'], resolve),
        //   }]
        // }]
      ]
    }, {
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
      }, {
        path: 'standardMile',
        name: 'standardMile',
        redirect: '/mapManage/standardMile/standardMileList',
        meta: {
          isVerificationL: false,
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
          isVerificationL: false,
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
    },
    {
      path: 'statistics',
      name: 'statistics',
      meta: {
        isVerificationL: false,
        title: '数据统计',
        iconName: 'icon-data',
      },
      component: (resolve) => require(['../page/statistics/statistics'], resolve),
      children: [{
        path: 'purchase',
        name: "purchase",
        redirect: '/statistics/purchase/purchaseList',
        meta: {
          title: '采购数据',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/purchase/purchase'], resolve),
        children: [{
          path: 'purchaseList',
          name: "purchaseList",
          meta: {
            title: '采购数据列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/purchase/purchaseList'], resolve)
        }, {
          path: 'waybillDetail/:willId/',
          name: "waybillDetail",
          meta: {
            title: '采购数据详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/purchase/waybillDetail'], resolve)
        }, {
          path: 'editPurchase',
          name: "editPurchase",
          meta: {
            title: '采购数据编辑',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/purchase/editPurchase'], resolve)
        }]
      }, {
        path: 'sales',
        name: "sales",
        redirect: '/statistics/sales/salesList',
        meta: {
          title: '销售数据',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/sales/sales'], resolve),
        children: [{
          path: 'salesList',
          name: "salesList",
          meta: {
            title: '销售数据列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/sales/salesList'], resolve)
        }, {
          path: 'salesWaybillDetail/:willId/',
          name: "salesWaybillDetail",
          meta: {
            title: '运力单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/sales/salesWaybillDetail'], resolve)
        }, {
          path: 'salesBusinessDetail',
          name: "salesBusinessDetail",
          meta: {
            title: '业务单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/sales/salesBusinessDetail'], resolve)
        }, {
          path: 'editSales',
          name: "editSales",
          meta: {
            title: '销售数据编辑',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/sales/editSales'], resolve)
        }]
      }, {
        path: 'consignment',
        name: "consignment",
        redirect: '/statistics/consignment/consignmentList',
        meta: {
          title: '托运数据',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/consignment/consignment'], resolve),
        children: [{
          path: 'consignmentList',
          name: "consignmentList",
          meta: {
            title: '托运数据列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/consignment/consignmentList'], resolve)
        }, {
          path: 'consignmentWaybillDetail/:willId/',
          name: "consignmentWaybillDetail",
          meta: {
            title: '运力单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/consignment/consignmentWaybillDetail'], resolve)
        }, {
          path: 'consignmentBusinessDetail',
          name: "consignmentBusinessDetail",
          meta: {
            title: '业务单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/consignment/consignmentBusinessDetail'], resolve)
        }, {
          path: 'editConsignment',
          name: "editConsignment",
          meta: {
            title: '托运数据编辑',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/consignment/editConsignment'], resolve)
        }]
      }, {
        path: 'income',
        name: "income",
        redirect: '/statistics/income/incomeList',
        meta: {
          title: '收入统计',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/statistics/income/income'], resolve),
        children: [{
          path: 'incomeList',
          name: "incomeList",
          meta: {
            title: '收入统计列表',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/income/incomeList'], resolve)
        }, {
          path: 'incomeWaybillDetail/:willId/',
          name: "incomeWaybillDetail",
          meta: {
            title: '运力单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/income/incomeWaybillDetail'], resolve)
        }, {
          path: 'incomeBusinessDetail',
          name: "incomeBusinessDetail",
          meta: {
            title: '业务单详情',
            isVerificationL: false
          },
          component: (resolve) => require(['../page/statistics/income/incomeBusinessDetail'], resolve)
        }]
      }]
    }, {
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
