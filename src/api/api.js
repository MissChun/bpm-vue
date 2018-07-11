/**
 * @description 接口文档API,用于后端接口查询
 * @param
 *   url:后端接口url（必需）
 *   method:后端接口方法（必需）
 *   desc:后端接口描述 （可选）
 *   param:接口参数 （可选）
 *     desc:参数描述（可选）
 */

const api = {
  batchSalesStatisticsStatus: {
    url: '/api/v1/batch-update-sale/',
    method: 'post',
    desc: '销售统计批量、单个对账开票',
    param: {
      is_reconciliation: {
        desc: '对账'
      },
      is_invoice: {
        desc: '开票'
      },
      id:{
        desc:'id'
      }
    }
  },
  batchPurchseStatisticsStatus: {
    url: '/api/v1/batch-update-procument/',
    method: 'post',
    desc: '采购统计批量、单个对账开票',
    param: {
      is_reconciliation: {
        desc: '对账'
      },
      is_invoice: {
        desc: '开票'
      },
      id:{
        desc:'id'
      }
    }
  },
  businessDistribution: {
    url: '/api/v1/business_order/assign/',
    method: 'put',
    desc: '业务单分配',
    param: {
      order_ids: {
        desc: '业务单id'
      },
      order_assign: {
        desc: '业务单分配'
      }
    }
  },
  exportIncomeData: {
    url: '/export/income/',
    method: 'post',
    desc: '收入统计数据',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 income'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  exportLogisticData: {
    url: '/export/logistic/',
    method: 'post',
    desc: '托运数据',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 logistic'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  exportSaleData: {
    url: '/export/sale/',
    method: 'post',
    desc: '导出销售数据',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 sale'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  exportPurchaseData: {
    url: '/export/procument/',
    method: 'post',
    desc: '导出采购数据',
    param: {
      filename: {
        desc: '文件名'
      },
      page_arg: {
        desc: '类型 例：procurement'
      },
      ids: {
        desc: 'id'
      }
    }
  },
  getStationList: {
    url: '/api/v1/delivery_point/',
    method: 'get',
    desc: '客户站点列表',
    param: {
      consumer_id: {
        desc: '客户id'
      },
      relations: {
        desc: '业务区域ID列表'
      }
    }
  },
  getFluidsList: {
    url: '/api/v1/supplier-fluids/',
    method: 'get',
    desc: '供应商液厂列表',
    param: {

    }
  },
  updateDestinationTime: {
    url: '/api/v1/fluid-business-areas/set-effect-time/',
    method: 'patch',
    desc: '设置生效时间',
    param: {
      effect_time: {
        desc: '生效时间 %H:%M'
      },
      relations: {
        desc: '业务区域ID列表'
      }
    }
  },
  updateDestinationAreas: {
    url: '/api/v1/fluid-business-areas/',
    method: 'post',
    desc: '目的地设置更新',
    param: {
      fluid_id: {
        desc: '液厂ID'
      },
      area_ids: {
        desc: '业务区域ID列表'
      }
    }
  },
  getDestinationDetail: {
    url: '/api/v1/fluid-areas/:id/',
    method: 'get',
    desc: '目的地设置详情',
    param: {
      id: {
        desc: '目的地ID'
      }
    }
  },
  getDestinationList: {
    url: '/api/v1/fluid-areas/',
    method: 'get',
    desc: '目的地设置列表',
    param: {

    }
  },
  getBusinessAreasList: {
    url: '/api/v1/business_areas/',
    method: 'get',
    desc: '业务区域列表',
    param: {

    }
  },
  updatePurchasePrice: {
    url: '/api/v1/supplier-quotes/:id/',
    method: 'patch',
    desc: '价格管理修改',
    param: {
      id: {
        desc: '价格ID'
      },
      today_unit_price: {
        desc: '价格'
      }
    }
  },
  getPurchasePriceList: {
    url: '/api/v1/supplier-quotes/',
    method: 'get',
    desc: '价格管理列表',
    param: {

    }
  },
  getPriceDateList: {
    url: '/api/v1/supplier-quotes/title/',
    method: 'get',
    desc: '价格管理日期title',
    param: {

    }
  },
  reconciliations: {
    url: '/api/v1/batch-update-logistic/',
    method: 'post',
    desc: '批量、单个对账',
    param: {
      id: {
        desc: '支持单个多个对账'
      },
      batch: {
        desc: '全部对账'
      }
    }
  },
  getIncomeStatisticsList: {
    url: '/api/v1/income-statistic/',
    method: 'get',
    desc: '收入统计列表',
    param: {
      page: {
        desc: '页码'
      },
      page_size: {
        desc: '页码'
      },
      need_all: {
        desc: '是否分页'
      }
    }
  },
  updateConsignmentStatistics: {
    url: '/api/v1/logistic-statistic/:id/',
    method: 'patch',
    desc: '修改托运统计',
    param: {
      id: {
        desc: '销售托运ID'
      },
      check_quantity: {
        desc: '核算吨位'
      },
      stand_mile: {
        desc: '标准里程'
      },
      initial_price: {
        desc: '起步价'
      },
      change_rate: {
        desc: '运输费率'
      },
      difference_value: {
        desc: '气差金额'
      },
      freight_value: {
        desc: '标准运费'
      },
      waiting_charges: {
        desc: '运费合计'
      },
      waiting_price: {
        desc: '卸车待时金额'
      },
      plan_loading_time: {
        desc: 'plan_loading_time'
      },
      remark: {
        desc: '备注'
      },
    }
  },
  getConsignmentStatisticsDetail: {
    url: '/api/v1/logistic-statistic/:id/',
    method: 'get',
    desc: '托运数据详情',
    param: {
      id: {
        desc: '销售统计ID'
      }
    }
  },
  getConsignmentStatisticsList: {
    url: '/api/v1/logistic-statistic/',
    method: 'get',
    desc: '托运数据列表',
    param: {
      page: {
        desc: '页码'
      },
      page_size: {
        desc: '页码'
      },
      need_all: {
        desc: '是否分页'
      }
    }
  },
  updateSalesStatistics: {
    url: '/api/v1/sale-statistic/:id/',
    method: 'patch',
    desc: '修改销售统计',
    param: {
      id: {
        desc: '销售统计ID'
      },
      leave_time: {
        desc: '离站时间'
      },
      unit_price: {
        desc: '销售单价'
      },
      actual_quantity: {
        desc: '实收吨位'
      },
      check_quantity: {
        desc: '核算吨位'
      },
      waiting_price: {
        desc: '卸车待时金额'
      },
      sell_rental: {
        desc: '销售总额'
      },
      waiting_charges: {
        desc: '待时总额'
      },
      remark: {
        desc: '备注'
      },
    }
  },
  getSalesStatisticsDetail: {
    url: '/api/v1/sale-statistic/:id/',
    method: 'get',
    desc: '销售统计详情',
    param: {
      id: {
        desc: '销售统计ID'
      }
    }
  },
  getSalesStatisticsList: {
    url: '/api/v1/sale-statistic/',
    method: 'get',
    desc: '销售统计列表',
    param: {
      page: {
        desc: '页码'
      },
      page_size: {
        desc: '页码'
      },
      need_all: {
        desc: '是否分页'
      }
    }
  },
  updatePurchaseStatistics: {
    url: '/api/v1/discounts-statistic/:id/',
    method: 'patch',
    desc: '修改采购统计',
    param: {
      id: {
        desc: '采购统计ID'
      },
      active_time: {
        desc: '实际装车时间'
      },
      unit_price: {
        desc: '采购单价'
      },
      discount_price: {
        desc: '优惠单价'
      },
      active_tonnage: {
        desc: '实际装车吨位'
      },
      unit_sum_price: {
        desc: '采购总额'
      },
      discounts_sum_price: {
        desc: '优惠后总额'
      },
    }
  },
  getPurchaseStatisticsDetail: {
    url: '/api/v1/discounts-statistic/:id/',
    method: 'get',
    desc: '采购统计详情',
    param: {
      id: {
        desc: '采购统计ID'
      }
    }
  },
  getPurchaseStatisticsList: {
    url: '/api/v1/discounts-statistic/',
    method: 'get',
    desc: '采购统计列表',
    param: {
      page: {
        desc: '页码'
      },
      page_size: {
        desc: '页码'
      },
      need_all: {
        desc: '是否分页'
      }
    }
  },
  getFreightDetail: {
    url: '/api/v1/freight-managements/:id/',
    method: 'get',
    desc: '运费详情',
    param: {
      id: {
        desc: '运费约定id'
      },
    }
  },
  getFreightList: {
    url: '/api/v1/freight-managements/',
    method: 'get',
    desc: '运费列表',
    param: {
      page: {
        desc: '页码'
      },
      page_size: {
        desc: '页码'
      },
      need_all: {
        desc: '是否分页'
      }
    }
  },
  getSiteList: {
    url: '/api/v1/delivery_point/',
    method: 'get',
    desc: '站点列表',
    param: {
      need_all: {
        desc: '是否分页'
      }
    }
  },
  getFluidList: {
    url: '/api/v1/actual-fluids/',
    method: 'get',
    desc: '实际液厂列表',
    param: {
      need_all: {
        desc: '是否分页'
      }
    }
  },
  getFulidDetalis: {
    url: '/api/v1/actual-fluids/:id/',
    method: 'get',
    desc: '实际液厂详情',
    param: {

    }
  },
  updateCarrier: {
    url: '/api/v1/trader-carriers/:id/',
    method: 'patch',
    desc: '承运商新增',
    param: {
      id: {
        desc: '承运商ID'
      },
      carrier_type: {
        desc: '承运商类型 (‘own’, ‘自有承运商(自有)’),(‘external’, ‘外部承运商(合作)’)'
      },
      carrier_name: {
        desc: '承运商名字'
      },
      contact: {
        desc: ' 联系人'
      },
      contact_phone: {
        desc: '联系人电话'
      },
      address: {
        desc: '地址'
      },
      is_valid: {
        desc: '是否启用 (‘valid’, ‘已启用’),(‘invalid’, ‘未启用’)'
      },
      credit_code: {
        desc: '统一社会信用代码'
      },
      organization_code: {
        desc: '组织机构代码'
      }
    }
  },
  addCarrier: {
    url: '/api/v1/trader-carriers/',
    method: 'post',
    desc: '承运商新增',
    param: {
      company: {
        desc: '公司ID'
      },
      carrier_type: {
        desc: '承运商类型 (‘own’, ‘自有承运商(自有)’),(‘external’, ‘外部承运商(合作)’)'
      },
      carrier_name: {
        desc: '承运商名字'
      },
      contact: {
        desc: ' 联系人'
      },
      contact_phone: {
        desc: '联系人电话'
      },
      address: {
        desc: '地址'
      },
      is_valid: {
        desc: '是否启用 (‘valid’, ‘已启用’),(‘invalid’, ‘未启用’)'
      },
      credit_code: {
        desc: '统一社会信用代码'
      },
      organization_code: {
        desc: '组织机构代码'
      }
    }
  },
  getCarrierDetail: {
    url: '/api/v1/trader-carriers/:id/',
    method: 'get',
    desc: '承运商列表',
    param: {
      company: {
        desc: '公司ID'
      },
      id: {
        desc: '承运商ID'
      },
      carrier_type: {
        desc: '承运商类型 (‘own’, ‘自有承运商(自有)’),(‘external’, ‘外部承运商(合作)’)'
      }
    }
  },
  getCarrierList: {
    url: '/api/v1/trader-carriers/',
    method: 'get',
    desc: '承运商列表',
    param: {
      need_all: {
        desc: '是否分页'
      },
      company: {
        desc: '公司ID'
      },
      carrier_type: {
        desc: '承运商类型 (‘own’, ‘自有承运商(自有)’),(‘external’, ‘外部承运商(合作)’)'
      },
      carrier_name: {
        desc: '公司名字'
      },
      contact: {
        desc: ' 联系人'
      },
      contact_phone: {
        desc: '联系人电话'
      },
      page: {
        desc: '页码'
      },
      page_size: {
        desc: '每页数量'
      }
    }
  },
  toExamineBusiness: {
    url: '/api/v1/check_order/',
    method: 'post',
    desc: '业务审批',
    param: {
      order_id: {
        desc: '业务ID'
      },
      action: {
        desc: '审批动作，可填pass或denied。pass：通过 denied: 拒绝'
      },
      approval_mark: {
        desc: '拒绝理由'
      }
    }
  },
  getProcessDetail: {
    url: '/api/v1/business_order/record/',
    method: 'get',
    desc: '客户管理',
    param: {
      id: {
        desc: '业务ID'
      }
    }
  },
  getBusinessDetail: {
    url: '/api/v1/business_order_detail/:business_order_id/',
    method: 'get',
    desc: '客户管理',
    param: {
      business_order_id: {
        desc: '业务ID'
      }
    }
  },
  getBusinessList: {
    url: '/api/v1/business_order/',
    method: 'get',
    desc: '业务单列表',
    param: {
      business_type: {
        desc: '业务单类型；0—批发,1—零售,2—点供，3—外提,4—外采,5—承运'
      },
      short_name: {
        desc: '客户简称'
      },
      customer_name: {
        desc: '客户名称'
      },
      order_number: {
        desc: '业务单号'
      },
      plan_arrive_time_start: {
        desc: '计划到站时间（开始）'
      },
      plan_arrive_time_end: {
        desc: '计划到站时间（结束）'
      },
      created_at_start: {
        desc: '下计划时间(开始)'
      },
      created_at_end: {
        desc: '下计划时间（结束）'
      },
      status: {
        desc: '业务单状态 '
      }
    }
  },
  addCustomer: {
    url: '/carrier/customer/',
    method: 'post',
    desc: '新增客户',
    param: {
      name: {
        desc: '客户名称'
      },
      contact_name: {
        desc: '联系人'
      },
      contact_phone: {
        desc: '联系电话'
      },
      detail_address: {
        desc: '详细地址'
      },
      deficiency_standard: {
        desc: '亏吨标准'
      },
      customer_type: {
        desc: '客户基础资料是否可修改，OWN为自己添加的客户，可以修改，PLAT为拉取的平台客户数据，不可修改'
      },
      free_hour: {
        desc: '免费等待时长(小时)'
      },
      overtime_price: {
        desc: '超时计算单价(元/小时)'
      },
      license3in1_code: {
        desc: '社会机构代码（三合一）'
      },
      license_code: {
        desc: '组织机构代码（非三合一）'
      },
      license_pic: {
        desc: '营业执照图片'
      }
    }
  },
  updateCustomer: {
    url: '/carrier/customer/:customer_id/',
    method: 'patch',
    desc: '更新客户',
    param: {
      name: {
        desc: '客户名称'
      },
      contact_name: {
        desc: '联系人'
      },
      contact_phone: {
        desc: '联系电话'
      },
      detail_address: {
        desc: '详细地址'
      },
      deficiency_standard: {
        desc: '亏吨标准'
      },
      customer_type: {
        desc: '客户基础资料是否可修改，OWN为自己添加的客户，可以修改，PLAT为拉取的平台客户数据，不可修改'
      },
      free_hour: {
        desc: '免费等待时长(小时)'
      },
      overtime_price: {
        desc: '超时计算单价(元/小时)'
      },
      license3in1_code: {
        desc: '社会机构代码（三合一）'
      },
      license_code: {
        desc: '组织机构代码（非三合一）'
      },
      license_pic: {
        desc: '营业执照图片'
      }
    }
  },
  getCustomerDetail: {
    url: '/carrier/customer/:customer_id/',
    method: 'get',
    desc: '客户管理',
    param: {
      customer_id: {
        desc: '客户ID'
      }
    }
  },
  getCustomerList: {
    url: '/carrier/customer/',
    method: 'get',
    desc: '客户管理',
    param: {
      name: {
        desc: '客户名称'
      },
      contact_name: {
        desc: '联系人'
      },
      contact_phone: {
        desc: '联系电话'
      }
    }
  },
  getPermissionsList: {
    url: '/api/v1/permissions/',
    method: 'get',
    desc: '系统可分配菜单 权限列表',
    param: {

    }
  },
  getPositionDetail: {
    url: '/api/v1/positions/:id/',
    method: 'get',
    desc: '获取职位详情',
    param: {
      id: {
        desc: '职位ID'
      }
    }
  },
  addStaff: {
    url: '/api/v1/users/register/',
    method: 'post',
    desc: '新增员工',
    param: {
      phone_number: {
        desc: '电话号码'
      },
      position: {
        desc: '职位资源id'
      }
    }
  },
  updateStaff: {
    url: '/api/v1/users/:id/',
    method: 'PATCH',
    desc: '修改员工',
    param: {
      position: {
        desc: '职位资源id'
      }
    }
  },
  getStaffs: {
    url: '/api/v1/users/',
    method: 'get',
    desc: '员工列表',
    param: {
      is_active: {
        desc: '是否删除该用户'
      },
      department: {
        desc: '部门资源id'
      },
      position: {
        desc: '职位资源id'
      }
    }
  },
  addPosition: {
    url: '/api/v1/positions/',
    method: 'post',
    desc: '新增职位',
    param: {
      department: {
        desc: '部门ID'
      },
      position_name: {
        desc: '职位名称'
      },
      position_description: {
        desc: '职位描述'
      },
      leader: {
        desc: '领导职位ID'
      },
      permissions: {
        desc: '权限集合列表'
      }
    }
  },
  updatePosition: {
    url: '/api/v1/positions/:id/',
    method: 'PATCH',
    desc: '修改职位',
    param: {
      id: {
        desc: '职位ID'
      },
      leader: {
        desc: '领导职位ID'
      },
      position_name: {
        desc: '职位名称'
      },
      permissions: {
        desc: '权限列表'
      }
    }
  },
  deletePosition: {
    url: '/api/v1/positions/:id/',
    method: 'DELETE',
    desc: '修改职位',
    param: {
      id: {
        desc: '职位ID'
      }
    }
  },
  addDepartment: {
    url: '/api/v1/departments/',
    method: 'post',
    desc: '新增部门',
    param: {
      group_name: {
        desc: '部门名称'
      },
      department_description: {
        desc: '部门描述'
      },
      department_type: {
        desc: '部门类型 1. backend-后台用户部门 2. app - 移动端用户部门'
      },
    }
  },
  updateDepartment: {
    url: '/api/v1/departments/:id/',
    method: 'PATCH',
    desc: '修改部门',
    param: {
      department_name: {
        desc: '部门名称'
      },
      department_description: {
        desc: '部门描述'
      },
      id: {
        desc: '部门id'
      }
    }
  },
  getDepartmentList: {
    url: '/api/v1/departments/',
    method: 'get',
    desc: '部门列表',
    param: {
      page: {
        desc: '分页'
      },
      need_all: {
        desc: '是否分页'
      }
    }
  },
  getPositionList: {
    url: '/api/v1/positions/',
    method: 'get',
    desc: '职位列表',
    param: {
      page: {
        desc: '分页'
      },
      need_all: {
        desc: '是否分页'
      },
      department: {
        desc: '部门ID'
      },
      position_name: {
        desc: '职位名称'
      },
    }
  },
  login: {
    url: '/api/v1/auth/login/',
    method: 'post',
    notNeedToken: true,
    desc: '登录',
    param: {
      username: {
        desc: '用户名',
      },
      password: {
        desc: '密码',
      }
    }
  },
  signOut: {
    url: '/api/v1/auth/login-out/',
    method: 'delete',
    desc: '退出登录',
    param: {

    }
  },
  register: {
    url: '/user/users/register/',
    method: 'post',
    notNeedToken: true,
    desc: '注册',
    param: {
      nick_name: {
        desc: '用户名',
      },
      password: {
        desc: '密码',
      },
      confirm_password: {
        desc: '确认密码',
      },
      phone: {
        desc: '手机号码',
      },
      verify_key: {
        desc: '图形验证码key值',
      },
      message_verify_code: {
        desc: '手机验证码'
      }
    }
  },
  forgetPassword: {
    url: '/auth/reset_password/',
    method: 'post',
    notNeedToken: true,
    desc: '找回密码',
    param: {
      phone: {
        desc: '手机号码',
      },
      message_verify_code: {
        desc: '手机号码',
      },
      password: {
        desc: '新密码',
      },
      confirm_password: {
        desc: '重复密码',
      }
    }
  },
  // addCarrier: {
  //   url: '/carrier/carriers/',
  //   method: 'post',
  //   desc: '创建承运商',
  //   param: {
  //     user_id: {
  //       desc: 'user_id',
  //     },
  //     name: {
  //       desc: '企业名称',
  //     },
  //     contact_name: {
  //       desc: '联系姓名',
  //     },
  //     contact_phone: {
  //       desc: '联系电话',
  //     },
  //     area: {
  //       desc: '所在区域',
  //     },
  //     detail_address: {
  //       desc: '详细地址'
  //     },
  //     carrier_type: {
  //       desc: '企业类型'
  //     }
  //   }
  // },
  imageVerifyCode: {
    url: '/common/image_verify_code/',
    method: 'get',
    notNeedToken: true,
    desc: '图形验证码',
    param: {

    }
  },
  messageVerifyCode: {
    url: '/common/message_verify_code/',
    method: 'post',
    notNeedToken: true,
    desc: '图形验证码',
    param: {
      phone: {
        desc: '手机号码',
      }
    }
  },
  globalData: {
    url: '/common/global_enums/',
    method: 'get',
    notNeedToken: true,
    desc: '全局数据',
    param: {

    }
  },
  getUser: {
    url: '/user/users/profile/',
    method: 'get',
    desc: '获取用户个人信息',
    param: {

    }
  },
  searchCapacityList: {
    url: '/truck/tractor_semitrailers/',
    method: 'get',
    desc: '查询运力列表',
    param: {}
  },
  getGroups: {
    url: '/carrier/carrier_groups/',
    method: 'get',
    desc: '获取运力管理分组数据',
    param: {}
  },
  getCapacityDetail: {
    url: '/truck/tractor_semitrailers/:id/',
    method: 'GET',
    desc: '获取运力详情',
    param: {}
  },
  bindTruck: {
    url: '/truck/tractor_semitrailers/:id/bind_semitrailer/',
    method: 'PATCH',
    desc: '绑定挂车',
    param: {}
  },
  bindStaff: {
    url: '/truck/tractor_semitrailers/:id/bind_driver_staff/',
    method: 'PATCH',
    desc: '绑定人员',
    param: {}
  },
  forceBindTruck: {
    url: '/truck/tractor_semitrailers/:id/force_bind_semitrailer/',
    method: 'PATCH',
    desc: '强制绑定挂车',
    param: {}
  },
  forceBindStaff: {
    url: '/truck/tractor_semitrailers/:id/force_bind_driver_staff/',
    method: 'PATCH',
    desc: '强制绑定人员',
    param: {}
  },
  searchHeadCarList: {
    url: '/truck/tractors/',
    method: 'get',
    desc: '查询牵引车列表',
    param: {

    }
  },
  getSelectData: {
    url: '/common/global_enums/',
    method: 'get',
    desc: '获取全部下拉数据',
    param: {

    }
  },
  creatHeadFrom: {
    url: '/truck/tractors/',
    method: 'post',
    desc: '创建牵引车',
    param: {

    }
  },
  upadteHeadFrom: {
    url: '/truck/tractors/:id/',
    method: 'PATCH',
    desc: '更新牵引车',
    param: {

    }
  },
  deleteInsuranceFrom: {
    url: '/truck/tractors/:id/tractor_insurances/',
    method: 'delete',
    desc: '删除保险',
    param: {

    }
  },
  getHeadDetalis: {
    url: '/truck/tractors/:id/',
    method: 'get',
    desc: '获取牵引车详细信息',
    param: {

    }
  },
  searchTailCarList: {
    url: '/truck/semitrailers/',
    method: 'get',
    desc: '获取挂车列表',
    param: {

    }
  },
  creatTailFrom: {
    url: '/truck/semitrailers/',
    method: 'post',
    desc: '创建挂车',
    param: {

    }
  },

  getTailDetalis: {
    url: '/truck/semitrailers/:id/',
    method: 'get',
    desc: '获取挂车详细信息',
    param: {

    }
  },

  upadteTailFrom: {
    url: '/truck/semitrailers/:id/',
    method: 'PATCH',
    desc: '更新挂车',
    param: {

    }
  },
  getDriversList: {
    url: '/carrier/carrier_drivers/',
    method: 'get',
    desc: '获取承运商司机列表',
    param: {
      id: {
        desc: '资源id',
      },
      name: {
        desc: '司机名称',
      },
      work_type: {
        desc: '从业类型',
      },
      mobile_phone: {
        desc: '手机号码',
      },
      on_job_status: {
        desc: '在离职状态',
      },
      bind_tractors: {
        desc: '绑定车辆',
      }
    }
  },
  getDriversDetail: {
    url: '/carrier/carrier_drivers/:id/',
    method: 'get',
    desc: '获取承运商司机详情',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },
  addDrivers: {
    url: '/carrier/carrier_drivers/',
    method: 'post',
    desc: '承运商司机创建',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },
  patchDrivers: {
    url: '/carrier/carrier_drivers/:id/',
    method: 'patch',
    desc: '承运商司机更新',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },
  getProvince: {
    url: '/api/v1/area/provinces/',
    method: 'get',
    notNeedToken: true,
    desc: '获取省列表',
    param: {

    }
  },
  getCity: {
    url: '/api/v1/area/:id/cities/',
    method: 'get',
    notNeedToken: true,
    desc: '获取市列表',
    param: {

    }
  },
  getArea: {
    url: '/api/v1/area/:id/county/',
    method: 'get',
    notNeedToken: true,
    desc: '获取区域列表',
    param: {

    }
  },
  deleteDriverTraining: {
    url: '/carrier/carrier_drivers/:id/carrier_driver_training/',
    method: 'delete',
    desc: '承运商司机培训记录删除',
    param: {

    }
  },
  getPickOrderDetail: {
    url: '/api/v1/delivery-orders/:id/',
    method: 'get',
    desc: '托运单详情',
    param: {

    }
  },

  getCarriers: {
    url: '/api/v1/trader-carriers/',
    method: 'get',
    desc: '获取承运商',
    param: {

    }
  },

  getUnload: {
    url: '/api/v1/trader-unload-areas/',
    method: 'get',
    desc: '获取卸货区域',
    param: {

    }
  },
  getSupplier: {
    url: '/api/v1/suppliers/',
    method: 'get',
    desc: '获取供应商',

    param: {

    }
  },

  getLandmarkDetail: {
    url: '/position/base_position/',
    method: 'get',
    desc: '坐标详情',
    param: {
      id: {
        desc: '资源id',
      },
    }
  },

  getFulid: {
    url: '/api/v1/fluids/',
    method: 'get',
    desc: '获取液厂',
    param: {

    }
  },

  cratePickUpOrder: {
    url: '/api/v1/delivery-orders/',
    method: 'POST',
    desc: '创建提货订单',
    param: {

    }
  },

  searchPickOrderList: {
    url: '/api/v1/delivery-orders/',
    method: 'get',
    desc: '获取提货单列表',
    param: {


    }
  },
  searchConOrderList: {
    url: '/api/v1/section-trips/',
    method: 'get',
    desc: '获取运单列表',
    param: {


    }
  },
  getTransPowerInfo: {
    url: '/api/v1/tractor_semitrailers/',
    method: 'get',
    desc: '获取运力详情',
    param: {


    }
  },
  searchNoUse: {
    url: '/order/delivery-order/check_capacity/',
    method: 'get',
    desc: '获取3天没用的运力id',
    param: {


    }
  },
  searchDeliveryOrder: {
    url: '/order/delivery-order/list_capacity/',
    method: 'get',
    desc: '获取托运单数据',
    param: {

    }
  },
  // getSiteList: {
  //   url: '/map/fluid_sites/',
  //   method: 'get',
  //   desc: '获取LNG站点列表',
  //   param: {
  //     position_name: {
  //       desc: '站点名称',
  //     },
  //     page: {
  //       desc: '当前页数',
  //     },
  //     page_size: {
  //       desc: '每页数量',
  //     },
  //   }
  // },
  getSiteDetail: {
    url: '/map/fuild_sites/:id/',
    method: 'get',
    desc: '获取LNG站点详情',
    param: {

    }
  },
  getStandardMileList: {
    url: '/api/v1/standard-miles/',
    method: 'get',
    desc: '获取标准里程列表',
    param: {

    }
  },
  addStandardMileList: {
    url: '/api/v1/standard-miles/',
    method: 'post',
    desc: '新增标准里程',
    param: {
      station: {
        desc: '站点资源id',
      },
      fluid: {
        desc: '液厂资源id',
      },
      mile: {
        desc: '标准里程',
      },
      is_active: {
        desc: '是否启用',
      },
      carriers: {
        desc: '承运商ID',
      }
    }
  },
  getStandardMileDetail: {
    url: '/api/v1/standard-miles/:id/',
    method: 'get',
    desc: '标准里程详情',
    param: {

    }
  },
  patchStandardMileDetail: {
    url: '/api/v1/standard-miles/:id/',
    method: 'PATCH',
    desc: '标准里程更新',
    param: {
      id: {
        desc: '标准里程ID',
      },
      station: {
        desc: '站点资源id',
      },
      fluid: {
        desc: '液厂资源id',
      },
      mile: {
        desc: '标准里程',
      },
      is_active: {
        desc: '是否启用',
      },
      carriers: {
        desc: '承运商ID',
      }
    }
  },
  delStandardMile: {
    url: '/map/standard_mileages/:id/',
    method: 'DELETE',
    desc: '删除标准里程',
    param: {


    }
  },
  getMenusList: {
    url: '/permissions/menus/user_menus/',
    method: 'get',
    desc: '获取当前登录用户可访问菜单',
    param: {

    }
  },
  getCompanyLandmark: {
    url: '/api/v1/fluid-sites/',
    method: 'get',
    desc: '地标列表',
    param: {
      need_all: {
        desc: '请求全部数据，不分页',
      },
    }
  },
  getLandMarkList: {
    url: '/api/v1/fluid-sites/position-site/',
    method: 'get',
    desc: '地标列表',
    param: {
      ids: {
        desc: '筛选id, str, 多个id组成的字符串，用“，”分隔',
      },
      position_name: {
        desc: '点位名称',
      },
      position_type: {
        desc: '点位类型, 默认为地标LAND_MARK',
      },
      pagination: {
        desc: 'bool，是否翻页',
      },
      simplify: {
        desc: 'bool，是否精简参数',
      },
      is_active: {
        desc: '是否启用',
      },
      province: {
        desc: '省',
      },
      city: {
        desc: '市',
      },
      county: {
        desc: '县',
      },
      page: {
        desc: '页码',
      },
      confirm_status: {
        desc: '审核状态',
      },
      async_status: {
        desc: '同步状态',
      },
      source_type: {
        desc: '数据来源',
      },
      page_size: {
        desc: '每页数量',
      },
    }
  },
  getLandMarkDetail: {
    url: '/api/v1/fluid-sites/:id/',
    method: 'get',
    desc: '地标详情',
    param: {

    }
  },
  editCarPower: {
    url: '/order/delivery-order/:yid/patch_capacity/',
    method: 'PATCH',
    desc: '修改运力',
    param: {

    }

  },
  addCarPower: {
    url: '/order/delivery-order/add_capacity/',
    method: 'POST',
    desc: '添加运力',
    param: {

    }
  },
  patchLandMarkDetail: {
    url: '/api/v1/fluid-sites/:id/position-site/',
    method: 'patch',
    desc: '审核地标',
    param: {
      position_name: {
        desc: '站点名称'
      },
      position_type: {
        desc: '站点类型'
      },
      longitude: {
        desc: '经度'
      },
      latitude: {
        desc: '纬度'
      },
      address: {
        desc: '详细地址'
      },
      contacts: {
        desc: '联系人'
      },
      tel: {
        desc: '联系人电话'
      },
      province: {
        desc: '省级—省的全程，如四川省'
      },
      city: {
        desc: '市级—市的全程，如成都市'
      },
      county: {
        desc: '县级—县级全程，如高新区'
      },
    }
  },
  surePickOrder: {
    url: '/api/v1/delivery-order/:id/confirm/',
    method: 'PUT',
    desc: '确认订单',
    param: {

    }
  },
  canclePickOrder: {
    url: '/api/v1/delivery-order/:id/cancel/',
    method: 'DELETE',
    desc: '取消订单',
    param: {

    }
  },
  getCompanies: {
    url: '/api/v1/companies/',
    method: 'get',
    desc: '获取贸易商',
    param: {

    }
  },
  searchOrderHasPower: {
    url: '/api/v1/appoint-capacities/',
    method: 'get',
    desc: '获取订单已有运力',
    param: {

    }
  },
  getTransPowerInfo: {
    url: '/api/v1/tractor_semitrailers/',
    method: 'get',
    desc: '获取运力的详细信息',
    param: {

    }
  },
  getConOrderDetalis: {
    url: '/api/v1/section-trips/:id/',
    method: 'get',
    desc: '获取运单分段详情',
    param: {

    }
  },
  getHasLoadOrder: {
    url: '/api/v1/match-helpers/check-order/',
    method: 'POST',
    desc: '获取当前运单已有的卸货单',
    param: {

    }
  },
  getBusinessList: {
    url: '/api/v1/business_order/',
    method: 'get',
    desc: '获取所有的业务单',
    param: {

    }
  },
  cancleMatchLoad: {
    url: '/api/v1/waybill-business/cancel-business-order/',
    method: 'post',
    desc: '取消关联卸货单',
    param: {

    }
  },
  upMatchList: {
    url: '/api/v1/waybill-business/match-business-order/',
    method: 'post',
    desc: '关联卸货单',
    param: {

    }
  },
  judgeIsCancle: {
    url: '/api/v1/whether-opts/can-cancel/',
    method: 'post',
    desc: '判断能否取消',
    param: {

    }
  },
  getConOrderDetail: {
    url: '/api/v1/waybills/:id/',
    method: 'get',
    desc: '获取运单详情',
    param: {


    }
  },
  realTimeMonitor: {
    url: '/api/v1/map/',
    method: 'get',
    desc: "实时监控",
    param: {
      plate_number: {
        desc: '车牌号',
      },
      status: {
        desc: '状态',
      },
    }
  },
  getDeviceDetail: {
    url: '/api/v1/map/wallbill_detail/',
    method: 'get',
    desc: "车辆详情",
    param: {
      plate_number: {
        desc: '车牌号',
      }
    }
  },
  getTripRecords: {
    url: '/api/v1/map/trip_record/',
    method: 'get',
    desc: "车辆轨迹查询",
    param: {
      start_time: {
        desc: '开始时间',
      },
      end_time: {
        desc: '结束时间，不填则默认当前时间',
      },
      page: {
        desc: '当前页数',
      },
      page_size: {
        desc: '当前每页条数，默认为1000条每页',
      },
      device_id: {
        desc: '设备号',
      }
    }
  },
  orderProcess: {
    url: '/api/v1/section-trips/record/',
    method: 'get',
    desc: "获取分段进程",
    param: {

    }
  },
  getSectionTrips: {
    url: '/api/v1/section-trips/:id/',
    method: 'GET',
    desc: "获取运单分段详情",
    param: {

    }
  },
  changeStatusSection: {
    url: '/api/v1/section-trip/:id/',
    method: 'put',
    desc: "获取运单分段详情",
    param: {

    }
  },
  getPundList: {
    url: '/api/v1/weight-note/',
    method: 'GET',
    desc: "获取磅单数据",
    param: {

    }
  },
  getSeal: {
    url: '/api/v1/car-seal/',
    method: 'GET',
    desc: "获取铅封数据",
    param: {

    }
  },
  getCount: {
    url: '/api/v1/delivery-orders/count/',
    method: 'GET',
    desc: "获取订单数目",
    param: {

    }
  },
  getConCount: {
    url: '/api/v1/section-trips/count/',
    method: 'GET',
    desc: "获取运单数目",
    param: {

    }
  },
  getRecordsData: {
    url: '/api/v1/delivery-orders/record/',
    method: 'get',
    desc: '获取订单记录列表',
    param: {

    }
  },
  cancleOrder: {
    url: '/api/v1/waybill/check/',
    method: 'POST',
    desc: '取消运单',
    param: {

    }
  },
  getOfflineAndStopRecords: {
    url: '/api/v1/map/stopping_offline_info/',
    method: 'get',
    desc: "轨迹停留点，离线点",
    param: {
      start_time: {
        desc: '开始时间',
      },
      end_time: {
        desc: '结束时间，不填则默认当前时间',
      },
      page: {
        desc: '当前页数',
      },
      page_size: {
        desc: '当前每页条数，默认为1000条每页',
      },
    }
  },
  searchCustomerList: {
    url: '/api/v1/consumer/',
    method: 'get',
    desc: '获取客户列表',
    param: {

    }
  },
  getCustomerDetlis: {
    url: '/api/v1/consumer/:id/',
    method: 'get',
    desc: '获取客户详情',
    param: {

    }
  },
  getSaleManList: {
    url: '/api/v1/users/',
    method: 'get',
    desc: '获取业务员列表',
    param: {

    }
  },
  upadtecustomerFrom: {
    url: '/api/v1/consumer/:id/',
    method: 'patch',
    desc: '更新客户',
    param: {

    }
  },
  creatCustomerFrom: {
    url: '/api/v1/consumer/',
    method: 'post',
    desc: '添加客户',
    param: {

    }
  },
  addLandmark: {
    url: '/api/v1/fluid-sites/',
    method: 'post',
    desc: "站点信息上传",
    param: {
      position_name: {
        desc: '站点名称'
      },
      position_type: {
        desc: '站点类型'
      },
      longitude: {
        desc: '经度'
      },
      latitude: {
        desc: '纬度'
      },
      address: {
        desc: '详细地址'
      },
      contacts: {
        desc: '联系人'
      },
      tel: {
        desc: '联系人电话'
      },
      source_type: {
        desc: '上传类型'
      },
      province: {
        desc: '省级—省的全程，如四川省'
      },
      city: {
        desc: '市级—市的全程，如成都市'
      },
      county: {
        desc: '县级—县级全程，如高新区'
      },
      upload_user: {
        desc: '上传用户，司机端上传时该参数必填'
      },
      position_pics: {
        desc: '站点图片'
      }
    }
  },
  searchSupplierList: {
    url: '/api/v1/suppliers/',
    method: 'get',
    desc: '查询供应商列表',
    param: {

    }
  },
  creatSupplierFrom: {
    url: '/api/v1/suppliers/',
    method: 'POST',
    desc: '新增供应商',
    param: {

    }
  },

  getSupplierDetlis: {
    url: '/api/v1/suppliers/:id/',
    method: 'get',
    desc: '获取供应商详情',
    param: {

    }
  },
  upadteSupplierFrom: {
    url: '/api/v1/suppliers/:id/',
    method: 'PATCH',
    desc: '修改供应商',
    param: {

    }
  },
  getSiteOfCustomerDetail: {
    url: '/api/v1/delivery_point/:id/',
    method: 'get',
    desc: '新增客户站点详情',
    param: {

    }
  },
  addStationOfCustomer: {
    url: '/api/v1/delivery_point/',
    method: 'post',
    desc: '新增客户站点接口',
    param: {
      address: {
        desc: '详细地址',
      },
      area: {
        desc: '区',
      },
      city: {
        desc: '市',
      },
      consignee: {
        desc: '联系人',
      },
      consignee_phone: {
        desc: '联系电话',
      },
      map_position: {
        desc: '基础地标id',
      },
      province: {
        desc: '省',
      },
      short_name_id: {
        desc: '客户简称id',
      },
      station_type: {
        desc: '站点类型',
      },
      station_name: {
        desc: '站点名称',
      },
      longitude: {
        desc: '经度',
      },
      latitude: {
        desc: '纬度',
      },
    }
  },

  fixStationOfCustomer: {
    url: '/api/v1/delivery_point/:id/',
    method: 'put',
    desc: '新增客户站点接口',
    param: {
      address: {
        desc: '详细地址',
      },
      area: {
        desc: '区',
      },
      city: {
        desc: '市',
      },
      consignee: {
        desc: '联系人',
      },
      consignee_phone: {
        desc: '联系电话',
      },
      map_position: {
        desc: '基础地标id',
      },
      province: {
        desc: '省',
      },
      short_name_id: {
        desc: '客户简称id',
      },
      station_type: {
        desc: '站点类型',
      },
      station_name: {
        desc: '站点名称',
      },
      longitude: {
        desc: '经度',
      },
      latitude: {
        desc: '纬度',
      },
    }
  },
  addFluids: {
    url: '/api/v1/supplier-fluids/',
    method: 'post',
    desc: '新增供应商液厂',
    param: {
      fluid_name: {
        desc: '液厂名称',
      },
      supplier: {
        desc: '供应商id',
      },
      actual_fluid: {
        desc: '实际液厂id',
      },
    }
  },
  fixFluids: {
    url: '/api/v1/supplier-fluids/:id/',
    method: 'PUT',
    desc: '修改供应商液厂',
    param: {
      fluid_name: {
        desc: '液厂名称',
      },
      supplier: {
        desc: '供应商id',
      },
      actual_fluid: {
        desc: '实际液厂id',
      },
    }
  },

  getFluidDetail: {
    url: '/api/v1/supplier-fluids/:id/',
    method: 'get',
    desc: '获取供应商液厂详情',
    param: {

    }
  },
  getShortName: {
    url: '/api/v1/short_name/',
    method: 'get',
    desc: '获取客户简称列表',
    param: {

    }
  },
  sureChangeCar: {
    url: '/api/v1/interrupt-record/:id/',
    method: 'PATCH',
    desc: '确认车辆更换变更',
    param: {

    }
  },
  searchCustomerPayList: {
    url: '/api/v1/payer/',
    method: 'GET',
    desc: '查询付款方列表',
    param: {

    }
  },
  getCustomerPayDetlis: {
    url: '/api/v1/payer/:id/',
    method: 'GET',
    desc: '查询付款方详情',
    param: {

    }
  },
  creatCustomerPayFrom: {
    url: '/api/v1/payer/',
    method: 'post',
    desc: '新增付款方',
    param: {

    }
  },
  upadtecustomerPayFrom: {
    url: '/api/v1/payer/:id/',
    method: 'patch',
    desc: '修改付款方',
    param: {

    }
  }
}


export default api;
