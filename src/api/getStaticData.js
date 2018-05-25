import instance from './index';
const getPosition = function() {
  return {
    depgroup: {

    }
  };
}
const staticData = function() {
  return {
    data: [
      {
        menu_permission_name: 'dashborad',//缺失menu_key
        menu_key:'xxxx',
        name: '概览',
      },{
        menu_permission_name: 'orders',
        menu_key:'ORDER',
        name: '订单',
        sms: [{
          menu_permission_name: 'pickupOrders',
          menu_key:'DELIVERY_ORDER',
          name: '提货订单列表',
        },
        {
          menu_permission_name: 'consignmentOrders',//缺失menu_key
          menu_key:'xxxx',
          name: '托运订单',
        }]
      },{
        menu_permission_name: 'logisticsManage',
        menu_key:'LOGISTICS_MANAGEMENT',
        name: '物流管理',
        sms: [{
          menu_permission_name: 'dispatch',
          menu_key:'LOGISTICS_DISPATCH',
          name: '物流调度',
        }]
      },{
        menu_permission_name: 'mapManage',
        menu_key:'MAP',
        name: '地图',
        sms: [{
          menu_permission_name: 'carMonitor',
          name: '地图监控',
          menu_key:'MAP_MONITOR',
        },{
          menu_permission_name: 'standardMile',//缺失menu_key
          menu_key:'xxxx',
          name: '标准里程',
        },{
          menu_permission_name: 'landmark',
          menu_key:'MAP_TAGGING',
          name: '地标管理',
        },{
          menu_permission_name: 'routeManage',//缺失menu_key
          menu_key:'xxxx',
          name: '路线管理',
        }]
      }, {
        menu_permission_name: 'transportPowerManage',
        menu_key:'CAPACITY_MANAGEMENT',
        name: '运力',
        sms: [{
          menu_permission_name: 'capacityManage',
          menu_key:'CAPACITY_MANAGEMENT_SECOND',
          name: '运力管理',
        },
        {
          menu_permission_name: 'carManage',
          menu_key:'TRUCK_MANAGEMENT',
          name: '车辆管理',
        },
          {
            menu_permission_name: 'personManage',
            menu_key:'STAFF_MANAGEMENT',
            name: '人员管理',
          },
          {
            menu_permission_name: 'deviceManage',
            menu_key:'DEVICE_MANAGEMENT',
            name: '设备管理',
          }
        ]
      }, {
        menu_permission_name: 'clientManage',//缺失menu_key
        menu_key:'xxxx',
        name: '客户管理',
      }, {
        menu_permission_name: 'statistics',
        menu_key:'DATA_STATISTICS',
        name: '数据统计',
        sms: [{
          menu_permission_name: 'capacityManage',
          menu_key:'BUSINESS_STATISTICS',
          name: '业务统计',
        },
        {
          menu_permission_name: 'carManage',
          menu_key:'DATA_ANALYSIS',
          name: '数据分析',
        }]
      }, {
        menu_permission_name: 'setting',
        menu_key:'SETTINGS',
        name: '设置',
        sms: [{
          menu_permission_name: 'organizationalStructure',
          menu_key:'ORGANIZE_STRUCTURE_SETTINGS',
          name: '组织架构',
        },
        {
          menu_permission_name: 'staffsManage',
          menu_key:'ORGANIZE_STRUCTURE_SETTINGS',
          name: '员工管理',

        },
        {
          menu_permission_name: 'powerManage',
          menu_key:'PERMISSION_MANAGEMENT',
          name: '权限管理',
        }]
      }
    ]
  }
}
export default {
  getPosition,
  staticData
}
