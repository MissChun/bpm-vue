 export default {
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
      path: 'purchaseWaybillDetail/:willId',
      name: "waybillDetail",
      meta: {
        title: '运单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/purchase/purchaseWaybillDetail'], resolve)
    }, {
      path: 'editPurchase',
      name: "editPurchase",
      meta: {
        title: '采购数据编辑',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/purchase/editPurchase'], resolve)
    }, {
      path: 'purchaseOutsideBuyDetali/:waybillId',
      name: "purchaseOutsideBuyDetali",
      meta: {
        title: '外采单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/purchase/purchaseOutsideBuyDetali'], resolve)
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
      path: 'salesWaybillDetail/:willId/:orderId/',
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
    },{
      path: 'salesOutsideBuyDetali/:waybillId',
      name: "salesOutsideBuyDetali",
      meta: {
        title: '外采单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/sales/salesOutsideBuyDetali'], resolve)
    },{
      path: 'salesOutsidePickDetali/:id',
      name: "salesOutsidePickDetali",
      meta: {
        title: '外销单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/sales/salesOutsidePickDetali'], resolve)
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
      path: 'consignmentWaybillDetail/:willId/:orderId/',
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
    },{
      path: 'consignmentOutsideBuyDetali/:waybillId',
      name: "consignmentOutsideBuyDetali",
      meta: {
        title: '外采单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/consignment/consignmentOutsideBuyDetali'], resolve)
    },{
      path: 'consignmentOutsidePickDetali/:id',
      name: "consignmentOutsidePickDetali",
      meta: {
        title: '外销单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/consignment/consignmentOutsidePickDetali'], resolve)
    }]
  }, {
    path: 'income',
    name: "income",
    redirect: '/statistics/income/incomeList',
    meta: {
      title: '业务台账',
      isVerificationL: false
    },
    component: (resolve) => require(['../page/statistics/income/income'], resolve),
    children: [{
      path: 'incomeList',
      name: "incomeList",
      meta: {
        title: '业务台账列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/income/incomeList'], resolve)
    }, {
      path: 'incomeWaybillDetail/:willId/:orderId/',
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
    },{
      path: 'incomeOutsideBuyDetali/:waybillId',
      name: "incomeOutsideBuyDetali",
      meta: {
        title: '外采单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/income/incomeOutsideBuyDetali'], resolve)
    },{
      path: 'incomeOutsidePickDetali/:id',
      name: "incomeOutsidePickDetali",
      meta: {
        title: '外销单详情',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/statistics/income/incomeOutsidePickDetali'], resolve)
    }]
  }]
}
