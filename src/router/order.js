let pickupOrders = {
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
};
let supplierManage = {
  path: 'supplierManage',
  name: 'supplierManage',
  meta: {
    isVerificationL: false,
    title: '供应商管理',
  },
  component: (resolve) => require(['../page/purchaseCenter/supplierManage'], resolve),
  redirect: '/purchaseCenter/supplierManage/supplierManageAll/supplierManageList',
  children: [{
    path: 'supplierManageAll',
    name: 'supplierManageAll',
    meta: {
      isVerificationL: false,
      title: '供应商管理',
    },
    redirect: '/purchaseCenter/supplierManage/supplierManageAll/supplierManageList',
    component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageAll'], resolve),
    children: [{
      path: 'supplierManageDetalis',
      name: 'supplierManageDetalis',
      meta: {
        isVerificationL: false,
        title: '供应商管详情',
      },
      component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageDetalis'], resolve),
    }, {
      path: 'supplierManageList',
      name: 'supplierManageList',
      meta: {
        isVerificationL: false,
        title: '供应商管列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageList'], resolve),
    }, {
      path: 'supplierManageEditAdd',
      name: 'supplierManageEditAdd',
      meta: {
        isVerificationL: false,
        title: '供应商管新增编辑',
      },
      component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierManageAll/supplierManageEditAdd'], resolve),
    }]
  }, {
    path: 'supplierFluidsAll',
    name: 'supplierFluidsAll',
    meta: {
      isVerificationL: false,
      title: '供应商液厂',
    },
    redirect: '/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsList',
    component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsAll'], resolve),
    children: [{
      path: 'supplierFluidsList',
      name: 'supplierFluidsList',
      meta: {
        isVerificationL: false,
        title: '供应商液厂列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsList'], resolve),
    }, {
      path: 'supplierFluidsMap',
      name: 'supplierFluidsMap',
      meta: {
        isVerificationL: false,
        title: '地图页',
      },
      component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsMap'], resolve),
    }, {
      path: 'supplierFluidsEditAdd',
      name: 'supplierFluidsEditAdd',
      meta: {
        isVerificationL: false,
        title: '供应商液厂新增、编辑',
      },
      component: (resolve) => require(['../page/purchaseCenter/supplierManage/supplierFluidsAll/supplierFluidsEditAdd'], resolve),
    }]
  }]
};

let purchasePriceManage = {
  path: 'purchasePriceManage',
  name: 'purchasePriceManage',
  meta: {
    isVerificationL: false,
    title: '采购价管理',
  },
  redirect: '/purchaseCenter/purchasePriceManage/purchasePrice/purchasePriceList',
  component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePriceManage'], resolve),
  children: [{
    path: 'purchasePrice',
    name: 'purchasePrice',
    meta: {
      isVerificationL: false,
      title: '采购价管理',
    },
    component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePriceManage'], resolve),
    children: [{
      path: 'purchasePriceList',
      name: 'purchasePriceList',
      meta: {
        isVerificationL: false,
        title: '采购价管理列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePrice/purchasePriceList'], resolve),
    }]
  }, {
    path: 'destinationSetting',
    name: 'destinationSetting',
    meta: {
      isVerificationL: false,
      title: '目的地设置',
    },
    component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/purchasePriceManage'], resolve),
    children: [{
      path: 'destinationSettingList',
      name: 'destinationSettingList',
      meta: {
        isVerificationL: false,
        title: '目的地设置列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/destinationSetting/destinationSettingList'], resolve),
    }, {
      path: 'editDestination',
      name: 'editDestination',
      meta: {
        isVerificationL: false,
        title: '目的地编辑',
      },
      component: (resolve) => require(['../page/purchaseCenter/purchasePriceManage/destinationSetting/editDestination'], resolve),
    }]
  }]
};
let outsidePick = {
  path: 'outsidePick',
  name: 'outsidePick',
  meta: {
    isVerificationL: false,
    title: '外销单',
  },
  component: (resolve) => require(['../page/purchaseCenter/outsidePick/outsidePick'], resolve),
  redirect: "/purchaseCenter/outsidePick/outsidePickList",
  children: [{
      path: 'outsidePickList',
      name: 'outsidePickList',
      meta: {
        isVerificationL: false,
        title: '外提单列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/outsidePick/outsidePickList'], resolve),
    },
    {
      path: 'outsidePickDetalisTab',
      name: 'outsidePickDetalisTab',
      meta: {
        isVerificationL: false,
        title: '外提单列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/outsidePick/outsidePickDetalisTab'], resolve),
      redirect: "/purchaseCenter/outsidePick/outsidePickDetalis",
      children: [{
        path: 'outsidePickDetalis/:id/',
        name: 'outsidePickDetalis',
        meta: {
          isVerificationL: false,
          title: '外提单详情',
        },
        component: (resolve) => require(['../page/purchaseCenter/outsidePick/outsidePickDetalis'], resolve),
      }, {
        path: 'outsidePickPoress/:id/',
        name: 'outsidePickPoress',
        meta: {
          isVerificationL: false,
          title: '外提单进程',
        },
        component: (resolve) => require(['../page/purchaseCenter/outsidePick/outsidePickPoress'], resolve),
      }]
    },
  ]
};
let outsideBuy = {
  path: 'outsideBuy',
  name: 'outsideBuy',
  meta: {
    isVerificationL: false,
    title: '外采单',
  },
  component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideBuy'], resolve),
  redirect: "/purchaseCenter/outsideBuy/outsideBuyList",
  children: [{
      path: 'outsideBuyList',
      name: 'outsideBuyList',
      meta: {
        isVerificationL: false,
        title: '外提单列表',
      },
      component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideBuyList'], resolve),
    },
    {
      path: 'outsideBuyDetalisTab',
      name: 'outsideBuyDetalisTab',
      meta: {
        isVerificationL: false,
        title: '外提单详情',
      },
      component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideBuyDetalisTab'], resolve),
      redirect: "/purchaseCenter/outsideBuy/outsideBuyDetalis",
      children: [{
        path: 'outsideBuyDetalis/:waybillId/:setpId',
        name: 'outsideBuyDetalis',
        meta: {
          isVerificationL: false,
          title: '外提单详情',
        },
        component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideBuyDetalis'], resolve),
      }, {
        path: 'outsideBuyPoress/:waybillId/:setpId',
        name: 'outsideBuyPoress',
        meta: {
          isVerificationL: false,
          title: '外提单进程',
        },
        component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideBuyPoress'], resolve),
      }]
    },
    {
      path: 'outsideUnloadMatchTabs',
      name: 'outsideUnloadMatchTabs',
      meta: {
        isVerificationL: false,
        title: '匹配',
      },
      component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideUnloadMatchTabs'], resolve),
      //redirect: "/purchaseCenter/outsideBuy/outsideUnloadMatchTabs/outsideUnloadMatchList",
      children: [{
        path: 'outsideUnloadMatchList/:id/:setpId',
        name: 'outsideUnloadMatchList',
        meta: {
          isVerificationL: false,
          title: '匹配卸货单',
        },
        component: (resolve) => require(['../page/purchaseCenter/outsideBuy/outsideUnloadMatchList'], resolve),
      }]
    }
  ]
}
let purchaseCenter = {
  path: 'purchaseCenter',
  name: 'purchaseCenter',
  meta: {
    isVerificationL: false,
    title: '采购中心',
    iconName: 'icon-shopping',
  },
  component: (resolve) => require(['../page/purchaseCenter/purchaseCenter'], resolve),
  children: [pickupOrders, supplierManage, purchasePriceManage, outsidePick, outsideBuy]
};
export default purchaseCenter;
