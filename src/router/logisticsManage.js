// logisticsManage.js
 export default {
  path: 'logisticsManage',
  name: 'logisticsManage',
  meta: {
    isVerificationL: false,
    title: '物流管理',
    iconName: 'icon-plane',
  },
  component: (resolve) => require(['../page/logisticsManage/logisticsManage'], resolve),
  children: [{
    path: 'platformWaybill',
    name: 'platformWaybill',
    meta: {
      isVerificationL: false,
      title: '平台运单'
    },
    redirect: '/logisticsManage/platformWaybill/ordersList',
    component: (resolve) => require(['../page/logisticsManage/platformWaybill/platformWaybill'], resolve),
    children: [{
        path: 'ordersList',
        name: 'consignmentOrdersList',
        meta: {
          isVerificationL: false,
          title: '托运订单'
        },
        component: (resolve) => require(['../page/logisticsManage/platformWaybill/orderList'], resolve),
      },{
        path: 'orderDetail',
        name: 'consignmentOrderDetail',
        meta: {
          isVerificationL: false,
          title: '运单详情'
        },
        component: (resolve) => require(['../page/logisticsManage/platformWaybill/orderDetail'], resolve),
        children: [{
          path: 'orderDetailTab/:setpId/:willId',
          name: 'consignmentOrderDetailTab',
          meta: {
            isVerificationL: false,
            title: '运单详情'
          },
          component: (resolve) => require(['../page/logisticsManage/platformWaybill/orderDetail/orderDetailTab'], resolve),
        }, {
          path: 'orderProcess/:setpId/:willId',
          name: 'consignmentArrangeCarTab',
          meta: {
            isVerificationL: false,
            title: '运单进程',
          },
          component: (resolve) => require(['../page/logisticsManage/platformWaybill/orderDetail/orderProcess'], resolve),
        }, {
          path: 'consignmentRouteplay/:setpId/:willId',
          name: 'consignmentRouteplay',
          meta: {
            isVerificationL: false,
            title: '轨迹地图',
          },
          component: (resolve) => require(['../page/logisticsManage/platformWaybill/orderDetail/consignmentRouteplay'], resolve),
        }]
      },{
        //卸车计划
        path: "matchLoadPlan",
        name: 'matchLoadPlan',
        meta: {
          isVerificationL: false,
          title: '卸车计划'
        },
        //redirect: '/logisticsManage/consignmentOrders/matchLoadPlan/unloadPlanList/:id',
        component: (resolve) => require(['../page/logisticsManage/platformWaybill/unloadPlan/unloadPlanTabs'], resolve),
        children: [{
          path: "unloadPlanList/:id/:setpId",
          name: 'unloadPlanList',
          meta: {
            isVerificationL: false,
            title: '卸车计划列表',
          },
          component: (resolve) => require(['../page/logisticsManage/platformWaybill/unloadPlan/unloadPlanList'], resolve),
        }]
      }
    ]
  },
  // {
  //   path: 'carrierManage',
  //   name: 'carrierManage',
  //   meta: {
  //     isVerificationL: false,
  //     title: '承运商管理'
  //   },
  //   redirect: '/logisticsManage/carrierManage/carrierList',
  //   component: (resolve) => require(['../page/logisticsManage/carrierManage/carrierManage'], resolve),
  //   children: [{
  //     path: 'carrierList',
  //     name: 'carrierManageList',
  //     meta: {
  //       isVerificationL: false,
  //       title: '承运商列表'
  //     },
  //     component: (resolve) => require(['../page/logisticsManage/carrierManage/carrierList'], resolve),
  //   }, {
  //     path: 'carrierDetail',
  //     name: 'carrierDetail',
  //     meta: {
  //       isVerificationL: false,
  //       title: '承运商详情'
  //     },
  //     component: (resolve) => require(['../page/logisticsManage/carrierManage/carrierDetail'], resolve),
  //   }, {
  //     path: 'editCarrier',
  //     name: 'editCarrier',
  //     meta: {
  //       isVerificationL: false,
  //       title: '编辑承运商'
  //     },
  //     component: (resolve) => require(['../page/logisticsManage/carrierManage/editCarrier'], resolve),
  //   }]
  // }
  ]
}
