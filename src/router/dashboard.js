export default {
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
      title: '业务概览',
    },
    component: (resolve) => require(['../page/dashboard/purchaseDashboard'], resolve),
  }, {
    path: 'serviceCentreDashboard',
    name: 'serviceCentreDashboard',
    meta: {
      isVerificationL: false,
      title: '车辆调度概览',
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
}
