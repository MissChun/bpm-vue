<style scoped lang="less">
.detail-main {
  min-height: 500px;
}

</style>
<template>
  <div class="detail-main">
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
          <div class="detail-main" v-loading="pageLoading">
            <el-container v-show="!pageLoading">
              <el-main>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        提货订单信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>订单号:</label>
                        <div class="detail-form-item">{{detailData.waybill_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>订单生成时间:</label>
                        <div class="detail-form-item">{{detailData.created_at}}</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>托运方:</label>
                        <div class="detail-form-item">{{detailData.created_at}}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label><span class="text-red">* </span>需求车数:</label>
                        <div class="detail-form-item">11111</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        运输信息
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list">
                    <el-table :data="tableData" stripe style="width: 100%" size="mini">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        运单信息
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>运单号:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>运单生成时间:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>托运方:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>承运方:</label>
                        <div class="detail-form-item">11111</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        费用约定
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>计费方式:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>标准运价:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>标准里程:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="40">
                    <el-col :span="8">
                      <div class="label-list">
                        <label>气差允许范围:</label>
                        <div class="detail-form-item">11111111</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>待时计算标准:</label>
                        <div class="detail-form-item">2018-12-12</div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="label-list">
                        <label>待时计费标准:</label>
                        <div class="detail-form-item">xxxx</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆指派" name="second">
        </el-tab-pane>
        <el-tab-pane label="订单记录" name="third">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      detailData: {
        "id": "c2354b01-5779-4b8c-99f0-ff10af9cfaf8",
        "supplier": {
          "id": "b7bb9038-f983-44f4-94ea-523d2b77de22",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_name": "诸城新奥燃气有限公司",
          "supplier_abbreviation": "",
          "business_type": "其它",
          "city": "",
          "address": "",
          "contact_person": "",
          "contact_phone": "",
          "supplier_type": "0",
          "contract_url": null,
          "contract_date": null,
          "contract_limit_date": null,
          "operator_id": null
        },
        "fluid": {
          "id": "90c77f10-7305-4710-8baa-e4cbbc6ab7d0",
          "created_at": "2017-12-27 17:35:26",
          "is_deleted": 0,
          "supplier_id": "9db34e5a-ef65-45ca-9fb1-712422a0019c",
          "fluid_name": "文安驿",
          "employee_id": null,
          "gas_type": "",
          "province": "陕西省",
          "city": "延安市",
          "area": "延川县",
          "address": "文安驿镇",
          "actual_address": "文安驿",
          "linkman": "",
          "contact_phone": "",
          "map_position": "ee66314b-a315-46b7-aa88-9657d387575f"
        },
        "created_at": "2018-05-16 11:18:03",
        "updated_at": "2018-05-16 11:18:03",
        "created_timestamp": 1526440683,
        "is_deleted": 0,
        "order_number": "201805160003",
        "status": "determine",
        "plan_time": null,
        "require_car_number": 0,
        "plan_tonnage": "0.000",
        "discount_price": "0.000",
        "business_price": "0.000",
        "unit_price": "0.000",
        "desc": "",
        "unload_area": null,
        "carry_type": "c9c159a0-1722-4cff-b896-df31f20b32e3",
        "unload_area_info": {},
        "carry_type_info": {
          "id": "c9c159a0-1722-4cff-b896-df31f20b32e3",
          "created_at": "2018-05-16 11:13:37",
          "updated_at": "2018-05-16 11:13:39",
          "created_timestamp": 234343,
          "is_deleted": 0,
          "consignment_type": "own",
          "carrier": "['']"
        }
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        four: 'xxx',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        four: 'xxx',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        four: 'xxx',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        four: 'xxx',
      }],
      thTableList: [{
        title: '装卸地',
        param: 'name',
      }, {
        title: '标准里程',
        param: 'address',
      }, {
        title: '计划时间',
        param: 'date',
      }, {
        title: '计划吨位',
        param: 'four',
      }],
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: "/orders/orderDetail/arrangeCarTab" });
      }
      if (targetName.name == 'third') {
        this.$router.push({ path: "/orders/orderDetail/orderRecordsTab" });
      }
    },
    getOrderDetail: function() {
      this.pageLoading = true;
      this.$$http('getOrderDetail', ).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0 && results.data.data) {


        }
      }).catch((err) => {

      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    console.log('this.$route', this.$route.params.id, this.id);
    //this.getOrderDetail();
  }
}

</script>
