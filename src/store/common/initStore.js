/**
 * Created by wansan on 2017/10/10.
 */
export default {
  inintString: "",
  inintObject: {},
  inintArrary: [],
  inint: false,
  inintNum: 5,
  show: false,
  showAmessage: "stor测试测试",
  initAddnum: 1,
  menuData: "",
  userData: "",
  isRoleManger: true,
  isRole: "",
  defaultShow: {
    addButton: true,
    removeButton: true,
    queryButton: false
  },
  selectData: {}, //全局数据
  users: {}, //用户个人信息
  menuList: [],
  unreadNewNum: 0, //未读消息
  wsMsg: null, //websocket
  regular:{
    price:{
      match:/^(\+)?\d+(\.\d{1,2})?$/,
      tips:'请输入数值正数且最多两位小数的数值'
    },
    accounts:{
      match:/^(\-|\+)?\d+(\.\d{1,2})?$/,
      tips:'请输入数值且最多两位小数的数值'
    },
    variableRate:{
      match:/^(\+)?\d+(\.\d{1,3})?$/,
      tips:'请输入数值正数且最多三位小数的数值'
    },
    variableValue:{
      match:/^(\+)?\d+(\.\d{1,5})?$/,
      tips:'请输入数值正数且最多五位小数的数值'
    },
    tonnage:{
      match:/^(\-|\+)?\d+(\.\d{1,3})?$/,
      tips:'请输入数值且最多三位小数的数值'
    },
    mile:{
      match:/^(\-|\+)?\d+(\.\d{1,1})?$/,
      tips:'请输入数值且最多一位小数的数值'
    },
    vehicle:{
      match:/^1(\.0{1,1})?$|^0(\.[0-9]{1,1})?$/,
      tips:'请输入不大于1且最多一位小数的数值'
    },
    plateNumber:{
      match:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
      tips:'车牌号格式为：一个汉字+6个字段，如：鲁GP8996'
    },
  }
}
