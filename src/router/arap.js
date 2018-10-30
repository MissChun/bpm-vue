 export default {
  path: 'arap',
  name: 'arap',
  meta: {
    isVerificationL: false,
    title: '应收应付',
    iconName: 'icon-wallet',
  },
  component: (resolve) => require(['../page/arap/arap'], resolve),
  children: [{
      path: 'supplierMeetManage',
      name: "supplierMeetManage",
      redirect: '/arap/supplierMeetManage/supplierMeetList',
      meta: {
        title: '供应商应付',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/arap/supplierMeetManage/supplierMeetManage'], resolve),
      children: [{
        path: 'supplierMeetList',
        name: "supplierMeetList",
        meta: {
          title: '供应商应付账款',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/supplierMeetManage/supplierMeetList'], resolve)
      },{
        path: 'paymentManage',
        name: "paymentManage",
        meta: {
          title: '付款管理',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/supplierMeetManage/paymentManage'], resolve)
      }]
    },
    {
      path: 'payerMeetManage',
      name: "payerMeetManage",
      redirect: '/arap/payerMeetManage/payerMeetList',
      meta: {
        title: '付款方应收',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/arap/payerMeetManage/payerMeetManage'], resolve),
      children: [{
        path: 'payerMeetList',
        name: "payerMeetList",
        meta: {
          title: '付款方应收报表',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/payerMeetManage/payerMeetList'], resolve)
      },{
        path: 'customerMeetList',
        name: "customerMeetList",
        meta: {
          title: '客户应收报表',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/payerMeetManage/customerMeetList'], resolve)
      },{
        path: 'payerReceivableList',
        name: "payerReceivableList",
        meta: {
          title: '付款方回款',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/payerMeetManage/payerReceivableList'], resolve)
      },{
        path: 'customerReceivableList',
        name: "customerReceivableList",
        meta: {
          title: '客户回款',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/payerMeetManage/customerReceivableList'], resolve)
      }]
    },
    {
      path: 'carrierMeetManage',
      name: "carrierMeetManage",
      redirect: '/arap/carrierMeetManage/carrierMeetList',
      meta: {
        title: '承运商应付',
        isVerificationL: true
      },
      component: (resolve) => require(['../page/arap/carrierMeetManage/carrierMeetManage'], resolve),
      children: [{
        path: 'carrierMeetList',
        name: "carrierMeetList",
        meta: {
          title: '承运商应付报表',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/carrierMeetManage/carrierMeetList'], resolve)
      },{
        path: 'paymentManage',
        name: "paymentManage",
        meta: {
          title: '付款管理',
          isVerificationL: false
        },
        component: (resolve) => require(['../page/arap/carrierMeetManage/paymentManage'], resolve)
      }
      ]
    },
  ]
}
