<style scoped lang="less">
.record-detail-title {
  font-size: 24px;
  font-weight: normal;
}

.detail-main {
  border-top: 0 none;
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
        <el-tab-pane label="订单详情" name="first">
        </el-tab-pane>
        <el-tab-pane label="车辆指派" name="second">
        </el-tab-pane>
        <el-tab-pane label="订单记录" name="third">
          <div class="detail-main" v-loading="pageLoading">
            <el-container>
              <el-main>
                <h3 class="text-center record-detail-title">订单记录</h3>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        生成提货订单
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list">
                    <el-table :data="tableData" stripe style="width: 100%">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-main>
            </el-container>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  </el-tab-pane>
  </el-tabs>
  </div>
  </div>
</template>
<script>
export default {
  name: 'orderRecordsTab',
  computed: {
    id: function() {
      return this.$route.params.id;
      console.log('params', this.$route.params)
    }
  },
  data() {
    return {
      activeName: 'third',
      pageLoading: false,
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
      }],
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/orderDetailTab/${this.id}` });
      }
      if (targetName.name == 'second') {
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${this.id}` });
      }
    },
  },
  activated: function() {
    this.activeName = 'third';
  },
  created: function() {

  }
}

</script>
