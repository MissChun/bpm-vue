// basicDataManage.js
 export default {
  path: 'basicDataManage',
  name: 'basicDataManage',
  meta: {
    isVerificationL: true,
    title: '基础信息管理',
    iconName: 'icon-coin',
  },
  component: (resolve) => require(['../page/basicDataManage/basicDataManage'], resolve),
  children: [{
    path: 'customerManage',
    name: 'customerManage',
    redirect: '/basicDataManage/customerManage/customerManageAll/customerManageList',
    meta: {
      isVerificationL: false,
      title: '贸易客户管理',
    },
    component: (resolve) => require(['../page/basicDataManage/customerManage/customerManageAll'], resolve),
    children: [{
      path: 'customerManageAll',
      name: 'customerManageAll',
      meta: {
        isVerificationL: false,
        title: '客户管理',
      },
      redirect: '/basicDataManage/customerManage/customerManageAll/customerManageList',
      component: (resolve) => require(['../page/basicDataManage/customerManage/customerManageAll'], resolve),
      children: [{
        path: 'customerManageList',
        name: 'customerManageList',
        meta: {
          isVerificationL: false,
          title: '客户管理列表',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/customerManageAll/customerManageList'], resolve),
      }, {
        path: 'customerManageDetalis/:id/',
        name: 'customerManageDetalis',
        meta: {
          isVerificationL: false,
          title: '客户管理详情',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/customerManageAll/customerManageDetalis'], resolve),
      }, {
        path: 'customerManageEditAdd',
        name: 'customerManageEditAdd',
        meta: {
          isVerificationL: false,
          title: '客户管理新增编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/customerManageAll/customerManageEditAdd'], resolve),
      }]
    },{
      path: 'stationManageAll',
      name: 'stationManageAll',
      meta: {
        isVerificationL: false,
        title: '客户站点',
      },
      redirect: '/basicDataManage/customerManage/stationManageAll/stationManageList',
      component: (resolve) => require(['../page/basicDataManage/customerManage/stationManageAll'], resolve),
      children: [{
        path: 'stationManageList',
        name: 'stationManageList',
        meta: {
          isVerificationL: false,
          title: '站点列表',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/stationManageAll/stationManageList'], resolve),
      }, {
        path: 'stationManageEditAdd',
        name: 'stationManageEditAdd',
        meta: {
          isVerificationL: false,
          title: '编辑、新增站点',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/stationManageAll/stationManageEditAdd'], resolve),
      }, {
        path: 'stationManageMap',
        name: 'stationManageMap',
        meta: {
          isVerificationL: false,
          title: '站点地图',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/stationManageAll/stationManageMap'], resolve),
      }]
    },{
      path: 'customerPayManageAll',
      name: 'customerPayManageAll',
      meta: {
        isVerificationL: false,
        title: '付款方管理',
      },
      redirect: '/basicDataManage/customerManage/customerPayManageAll/customerPayManageList',
      component: (resolve) => require(['../page/basicDataManage/customerManage/customerPayManageAll'], resolve),
      children: [{
        path: 'customerPayManageList',
        name: 'customerPayManageList',
        meta: {
          isVerificationL: false,
          title: '付款方列表',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/customerPayManageAll/customerPayManageList'], resolve),
      }, {
        path: 'customerPayManageDetalis/:id/',
        name: 'customerPayManageDetalis',
        meta: {
          isVerificationL: false,
          title: '付款方详情',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/customerPayManageAll/customerPayManageDetalis'], resolve),
      }, {
        path: 'customerPayManageEditAdd',
        name: 'customerPayManageEditAdd',
        meta: {
          isVerificationL: false,
          title: '付款方新增编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/customerManage/customerPayManageAll/customerPayManageEditAdd'], resolve),
      }]
    }]
  },{
    path: 'supplierManage',
    name: 'supplierManage',
    meta: {
      isVerificationL: false,
      title: '供应商管理',
    },
    component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierManage'], resolve),
    redirect: '/basicDataManage/supplierManage/supplierManageAll/supplierManageList',
    children: [{
      path: 'supplierManageAll',
      name: 'supplierManageAll',
      meta: {
        isVerificationL: false,
        title: '供应商管理',
      },
      redirect: '/basicDataManage/supplierManage/supplierManageAll/supplierManageList',
      component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierManageAll/supplierManageAll'], resolve),
      children: [{
        path: 'supplierManageDetalis/:id/',
        name: 'supplierManageDetalis',
        meta: {
          isVerificationL: false,
          title: '供应商管详情',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierManageAll/supplierManageDetalis'], resolve),
      }, {
        path: 'supplierManageList',
        name: 'supplierManageList',
        meta: {
          isVerificationL: false,
          title: '供应商管列表',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierManageAll/supplierManageList'], resolve),
      }, {
        path: 'supplierManageEditAdd',
        name: 'supplierManageEditAdd',
        meta: {
          isVerificationL: false,
          title: '供应商管新增编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierManageAll/supplierManageEditAdd'], resolve),
      }]
    },{
      path: 'supplierFluidsAll',
      name: 'supplierFluidsAll',
      meta: {
        isVerificationL: false,
        title: '供应商液厂',
      },
      redirect: '/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsList',
      component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsAll'], resolve),
      children: [{
        path: 'supplierFluidsList',
        name: 'supplierFluidsList',
        meta: {
          isVerificationL: false,
          title: '供应商液厂列表',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsList'], resolve),
      }, {
        path: 'supplierFluidsMap',
        name: 'supplierFluidsMap',
        meta: {
          isVerificationL: false,
          title: '地图页',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsMap'], resolve),
      }, {
        path: 'supplierFluidsEditAdd',
        name: 'supplierFluidsEditAdd',
        meta: {
          isVerificationL: false,
          title: '供应商液厂新增、编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsEditAdd'], resolve),
      }]
    }]
  },{
    path: 'purchasePriceManage',
    name: 'purchasePriceManage',
    meta: {
      isVerificationL: false,
      title: '采购价管理',
    },
    redirect: '/basicDataManage/purchasePriceManage/purchasePrice/purchasePriceList',
    component: (resolve) => require(['../page/basicDataManage/purchasePriceManage/purchasePriceManage'], resolve),
    children: [{
      path: 'purchasePrice',
      name: 'purchasePrice',
      meta: {
        isVerificationL: false,
        title: '采购价管理',
      },
      component: (resolve) => require(['../page/basicDataManage/purchasePriceManage/purchasePriceManage'], resolve),
      children: [{
        path: 'purchasePriceList',
        name: 'purchasePriceList',
        meta: {
          isVerificationL: false,
          title: '采购价管理列表',
        },
        component: (resolve) => require(['../page/basicDataManage/purchasePriceManage/purchasePrice/purchasePriceList'], resolve),
      }]
    }, {
      path: 'destinationSetting',
      name: 'destinationSetting',
      meta: {
        isVerificationL: false,
        title: '目的地设置',
      },
      component: (resolve) => require(['../page/basicDataManage/purchasePriceManage/purchasePriceManage'], resolve),
      children: [{
        path: 'destinationSettingList',
        name: 'destinationSettingList',
        meta: {
          isVerificationL: false,
          title: '目的地设置列表',
        },
        component: (resolve) => require(['../page/basicDataManage/purchasePriceManage/destinationSetting/destinationSettingList'], resolve),
      }, {
        path: 'editDestination',
        name: 'editDestination',
        meta: {
          isVerificationL: false,
          title: '目的地编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/purchasePriceManage/destinationSetting/editDestination'], resolve),
      }]
    }]
  },{
    path: 'carrierManage',
    name: 'carrierManage',
    meta: {
      isVerificationL: false,
      title: '承运商管理'
    },
    redirect: '/basicDataManage/carrierManage/carrierList',
    component: (resolve) => require(['../page/basicDataManage/carrierManage/carrierManage'], resolve),
    children: [{
      path: 'carrierList',
      name: 'carrierManageList',
      meta: {
        isVerificationL: false,
        title: '承运商列表'
      },
      component: (resolve) => require(['../page/basicDataManage/carrierManage/carrierList'], resolve),
    }, {
      path: 'carrierDetail/:id/',
      name: 'carrierDetail',
      meta: {
        isVerificationL: false,
        title: '承运商详情'
      },
      component: (resolve) => require(['../page/basicDataManage/carrierManage/carrierDetail'], resolve),
    }, {
      path: 'editCarrier',
      name: 'editCarrier',
      meta: {
        isVerificationL: false,
        title: '编辑承运商'
      },
      component: (resolve) => require(['../page/basicDataManage/carrierManage/editCarrier'], resolve),
    }]
  },{
    path: 'standardDataSet',
    name: 'standardDataSet',
    redirect: '/basicDataManage/standardDataSet/freight/freightList',
    meta: {
      isVerificationL: false,
      title: '标准数据设置',
      iconName: 'icon-lng-dashboard',
    },
    component: (resolve) => require(['../page/basicDataManage/standardDataSet/standardDataSet'], resolve),
    children: [{
      path: 'freight',
      name: 'freight',
      meta: {
        isVerificationL: false,
        title: '运费约定',
      },
      component: (resolve) => require(['../page/basicDataManage/standardDataSet/standardDataSet'], resolve),
      children: [{
        path: 'freightList',
        name: 'freightDataList',
        meta: {
          isVerificationL: false,
          title: '运费约定',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freightDataList'], resolve),
      },{
        path: 'freightDetail/:id/',
        name: 'freightDetail',
        meta: {
          isVerificationL: false,
          title: '运费约定详情',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/freightDetail'], resolve),
      },{
        path: 'editFreight',
        name: 'editFreight',
        meta: {
          isVerificationL: false,
          title: '运费约定编辑',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/freight/editFreight'], resolve),
      }]
    },{
      path: 'mileage',
      name: 'mileage',
      meta: {
        isVerificationL: false,
        title: '标准里程',
      },
      component: (resolve) => require(['../page/basicDataManage/standardDataSet/standardDataSet'], resolve),
      children: [{
        path: 'mileageList',
        name: 'mileageList',
        meta: {
          isVerificationL: false,
          title: '标准里程',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/mileageDataList'], resolve),
      },{
        path: 'editMileage',
        name: 'editMileage',
        meta: {
          isVerificationL: false,
          title: '编辑、新增标准里程',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/editMileage'], resolve),
      }, {
        path: 'mileageDetail/:id/',
        name: 'mileageDetail',
        meta: {
          isVerificationL: false,
          title: '标准里程详情',
        },
        component: (resolve) => require(['../page/basicDataManage/standardDataSet/mileage/mileageDetail'], resolve),
      }]
    }]
  }]
}
