let pickupOrders = {
  path: 'pickupOrders',
  name: 'pickupOrders',
  redirect: '/orderManage/pickupOrders/ordersList',
  meta: {
    isVerificationL: false,
    title: '托运订单',
  },
  component: (resolve) => require(['../page/orderManage/pickupOrders/pickupOrders'], resolve),
  children: [{
      path: 'ordersList',
      name: 'pickupOrdersList',
      meta: {
        isVerificationL: false,
        title: '提货订单列表',
      },
      component: (resolve) => require(['../page/orderManage/pickupOrders/orderList'], resolve),
    },
    {
      path: 'addNewPickUpOrder',
      name: 'addOrder',
      meta: {
        isVerificationL: false,
        title: '新增提货订单',
      },
      component: (resolve) => require(['../page/orderManage/pickupOrders/addNewPickUpOrder'], resolve),
    },
    {
      path: 'orderDetail',
      name: 'pickupOrdersDetail',
      meta: {
        isVerificationL: false,
        title: '订单详情'
      },
      component: (resolve) => require(['../page/orderManage/pickupOrders/orderDetail'], resolve),
      children: [{
        path: 'orderDetailTab/:id/:type',
        name: 'pickupOrderDetailTab',
        meta: {
          isVerificationL: false,
          title: '订单详情',
        },
        component: (resolve) => require(['../page/orderManage/pickupOrders/orderDetail/orderDetailTab'], resolve),
      }, {
        path: 'arrangeCarTab',
        name: 'pickupArrangeCarTab',
        redirect: '/orderManage/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList',
        meta: {
          isVerificationL: false,
          title: '车辆指派'
        },
        component: (resolve) => require(['../page/orderManage/pickupOrders/orderDetail/arrangeCarTab'], resolve),
        children: [{
          path: 'arrangeCarList/:id/:type',
          name: 'pickArrangeCarList',
          meta: {
            isVerificationL: false,
            title: '车辆指派列表'
          },
          component: (resolve) => require(['../page/orderManage/pickupOrders/orderDetail/arrangeCarList'], resolve),
        }, {
          path: 'arrangeCarMap/:id/:type',
          name: 'pickupArrangeCarMap',
          meta: {
            isVerificationL: false,
            title: '地图'
          },
          component: (resolve) => require(['../page/orderManage/pickupOrders/orderDetail/arrangeCarMap'], resolve),
        }]
      }, {
        path: 'orderRecordsTab/:id/:type',
        name: 'pickupOrderRecordsTab',
        meta: {
          isVerificationL: false,
          title: '订单记录'
        },
        component: (resolve) => require(['../page/orderManage/pickupOrders/orderDetail/orderRecordsTab'], resolve),
      }]
    }
  ]
};
// let supplierManage = {
//   path: 'supplierManage',
//   name: 'supplierManage',
//   meta: {
//     isVerificationL: false,
//     title: '供应商管理',
//   },
//   component: (resolve) => require(['../page/purchaseCenter/supplierManage'], resolve),
//   redirect: '/purchaseCenter/supplierManage/supplierManageAll/supplierManageList',
//   children: [{
//     path: 'supplierManageAll',
//     name: 'supplierManageAll',
//     meta: {
//       isVerificationL: false,
//       title: '供应商管理',
//     },
//     redirect: '/purchaseCenter/supplierManage/supplierManageAll/supplierManageList',
//     component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageAll'], resolve),
//     children: [{
//       path: 'supplierManageDetalis',
//       name: 'supplierManageDetalis',
//       meta: {
//         isVerificationL: false,
//         title: '供应商管详情',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageDetalis'], resolve),
//     }, {
//       path: 'supplierManageList',
//       name: 'supplierManageList',
//       meta: {
//         isVerificationL: false,
//         title: '供应商管列表',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageList'], resolve),
//     }, {
//       path: 'supplierManageEditAdd',
//       name: 'supplierManageEditAdd',
//       meta: {
//         isVerificationL: false,
//         title: '供应商管新增编辑',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageEditAdd'], resolve),
//     }]
//   }, {
//     path: 'supplierFluidsAll',
//     name: 'supplierFluidsAll',
//     meta: {
//       isVerificationL: false,
//       title: '供应商液厂',
//     },
//     redirect: '/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsList',
//     component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsAll'], resolve),
//     children: [{
//       path: 'supplierFluidsList',
//       name: 'supplierFluidsList',
//       meta: {
//         isVerificationL: false,
//         title: '供应商液厂列表',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsList'], resolve),
//     }, {
//       path: 'supplierFluidsMap',
//       name: 'supplierFluidsMap',
//       meta: {
//         isVerificationL: false,
//         title: '地图页',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsMap'], resolve),
//     }, {
//       path: 'supplierFluidsEditAdd',
//       name: 'supplierFluidsEditAdd',
//       meta: {
//         isVerificationL: false,
//         title: '供应商液厂新增、编辑',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsEditAdd'], resolve),
//     }]
//   }]
// };

// let purchasePriceManage = {
//   path: 'purchasePriceManage',
//   name: 'purchasePriceManage',
//   meta: {
//     isVerificationL: false,
//     title: '采购价管理',
//   },
//   redirect: '/purchaseCenter/purchasePriceManage/purchasePrice/purchasePriceList',
//   component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePriceManage'], resolve),
//   children: [{
//     path: 'purchasePrice',
//     name: 'purchasePrice',
//     meta: {
//       isVerificationL: false,
//       title: '采购价管理',
//     },
//     component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePriceManage'], resolve),
//     children: [{
//       path: 'purchasePriceList',
//       name: 'purchasePriceList',
//       meta: {
//         isVerificationL: false,
//         title: '采购价管理列表',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePrice/purchasePriceList'], resolve),
//     }]
//   }, {
//     path: 'destinationSetting',
//     name: 'destinationSetting',
//     meta: {
//       isVerificationL: false,
//       title: '目的地设置',
//     },
//     component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePriceManage'], resolve),
//     children: [{
//       path: 'destinationSettingList',
//       name: 'destinationSettingList',
//       meta: {
//         isVerificationL: false,
//         title: '目的地设置列表',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/destinationSetting/destinationSettingList'], resolve),
//     }, {
//       path: 'editDestination',
//       name: 'editDestination',
//       meta: {
//         isVerificationL: false,
//         title: '目的地编辑',
//       },
//       component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/destinationSetting/editDestination'], resolve),
//     }]
//   }]
// };
//
//

let outsidePick = {
  path: 'outsidePick',
  name: 'outsidePick',
  meta: {
    isVerificationL: false,
    title: '外销订单',
  },
  component: (resolve) => require(['../page/orderManage/outsidePick/outsidePick'], resolve),
  redirect: "/orderManage/outsidePick/outsidePickList",
  children: [{
      path: 'outsidePickList',
      name: 'outsidePickList',
      meta: {
        isVerificationL: false,
        title: '外销单列表',
      },
      component: (resolve) => require(['../page/orderManage/outsidePick/outsidePickList'], resolve),
    },
    {
      path: 'outsidePickDetalisTab',
      name: 'outsidePickDetalisTab',
      meta: {
        isVerificationL: false,
        title: '外销单列表',
      },
      component: (resolve) => require(['../page/orderManage/outsidePick/outsidePickDetalisTab'], resolve),
      redirect: "/orderManage/outsidePick/outsidePickDetalis",
      children: [{
        path: 'outsidePickDetalis/:id/',
        name: 'outsidePickDetalis',
        meta: {
          isVerificationL: false,
          title: '外销单详情',
        },
        component: (resolve) => require(['../page/orderManage/outsidePick/outsidePickDetalis'], resolve),
      }, {
        path: 'outsidePickPoress/:id/',
        name: 'outsidePickPoress',
        meta: {
          isVerificationL: false,
          title: '外销单进程',
        },
        component: (resolve) => require(['../page/orderManage/outsidePick/outsidePickPoress'], resolve),
      }]
    },
  ]
};
let outsideBuy = {
  path: 'outsideBuy',
  name: 'outsideBuy',
  meta: {
    isVerificationL: false,
    title: '外采订单',
  },
  component: (resolve) => require(['../page/orderManage/outsideBuy/outsideBuy'], resolve),
  redirect: "/orderManage/outsideBuy/outsideBuyList",
  children: [{
      path: 'outsideBuyList',
      name: 'outsideBuyList',
      meta: {
        isVerificationL: false,
        title: '外提单列表',
      },
      component: (resolve) => require(['../page/orderManage/outsideBuy/outsideBuyList'], resolve),
    },
    {
      path: 'outsideBuyDetalisTab',
      name: 'outsideBuyDetalisTab',
      meta: {
        isVerificationL: false,
        title: '外提单详情',
      },
      component: (resolve) => require(['../page/orderManage/outsideBuy/outsideBuyDetalisTab'], resolve),
      redirect: "/orderManage/outsideBuy/outsideBuyDetalis",
      children: [{
        path: 'outsideBuyDetalis/:waybillId/:setpId',
        name: 'outsideBuyDetalis',
        meta: {
          isVerificationL: false,
          title: '外提单详情',
        },
        component: (resolve) => require(['../page/orderManage/outsideBuy/outsideBuyDetalis'], resolve),
      }, {
        path: 'outsideBuyPoress/:waybillId/:setpId',
        name: 'outsideBuyPoress',
        meta: {
          isVerificationL: false,
          title: '外提单进程',
        },
        component: (resolve) => require(['../page/orderManage/outsideBuy/outsideBuyPoress'], resolve),
      }]
    },
    {
      path: 'outsideUnloadMatchTabs',
      name: 'outsideUnloadMatchTabs',
      meta: {
        isVerificationL: false,
        title: '匹配',
      },
      component: (resolve) => require(['../page/orderManage/outsideBuy/outsideUnloadMatchTabs'], resolve),
      //redirect: "/orderManage/outsideBuy/outsideUnloadMatchTabs/outsideUnloadMatchList",
      children: [{
        path: 'outsideUnloadMatchList/:id/:setpId',
        name: 'outsideUnloadMatchList',
        meta: {
          isVerificationL: false,
          title: '匹配卸货单',
        },
        component: (resolve) => require(['../page/orderManage/outsideBuy/outsideUnloadMatchList'], resolve),
      }]
    }
  ]
}

let businessOrder = {
  path: 'businessOrder',
  name: 'businessOrder',
  redirect: '/orderManage/businessOrder/businessList',
  meta: {
    isVerificationL: false,
    title: '销售订单',
    iconName: 'icon-lng-dashboard',
  },
  component: (resolve) => require(['../page/orderManage/businessOrder/business'], resolve),
  children: [{
    path: 'businessList',
    name: 'businessList',
    meta: {
      isVerificationL: false,
      title: '业务单审批列表',
    },
    component: (resolve) => require(['../page/orderManage/businessOrder/businessList'], resolve),
  }, {
    path: 'businessDetail',
    name: 'businessDetail',
    meta: {
      isVerificationL: false,
      title: '业务单审批详情',
    },
    component: (resolve) => require(['../page/orderManage/businessOrder/businessDetail'], resolve),
  }]
}
let orderManage = {
  path: 'orderManage',
  name: 'orderManage',
  meta: {
    isVerificationL: false,
    title: '订单管理',
    iconName: 'icon-shopping',
  },
  component: (resolve) => require(['../page/orderManage/orderManage'], resolve),
  children: [pickupOrders,outsidePick,outsideBuy,businessOrder]
};
export default orderManage;
