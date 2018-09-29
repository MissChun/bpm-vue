 export default {
  path: 'imports',
  name: 'imports',
  meta: {
   isVerificationL: false,
   title: '导入',
   iconName: 'icon-setting'
  },
  component: (resolve) => require(['../page/imports/imports'], resolve),
  children: [{
     path: 'importData/:type',
     name: "importData",
     meta: {
       title: '数据导入',
       isVerificationL: false
     },
     component: (resolve) => require(['../page/imports/importData'], resolve),
   },
  ]
 }
