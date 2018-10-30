 export default {
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
}
