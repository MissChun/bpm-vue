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
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/orderManage/pickupOrders/ordersList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>订单记录</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        生成提货订单
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list" v-if="allTableList.create_list.length>0">
                    <el-table :data="renderList.r_create_list" max-height="500">
                      <el-table-column fixed prop="driver_no" label="生成提货单号">
                        <template slot-scope="rowsData">
                          {{rowsData.row.msg}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="operator" label="操作人">
                      </el-table-column>
                      <el-table-column prop="operator_time" label="操作时间">
                      </el-table-column>
                    </el-table>
                    <el-row style="margin-top:0px;" v-if="allTableList.create_list.length>5">
                      <el-col style="text-align:center">
                        <el-button type="text" v-if="extendArr['create_list']" @click="showOrExtend('extend','create_list')">查看更多({{allTableList.create_list.length}})</el-button>
                        <el-button type="text" v-if="!extendArr['create_list']" @click="showOrExtend('enExtend','create_list')">收起</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="allTableList.create_list.length==0" class="text-center">
                    无操作数据
                  </div>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        提交订单
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list" v-if="renderList.r_add_driver_list.length>0">
                    <el-table :data="renderList.r_add_driver_list" style="width: 100%" max-height="500">
                      <el-table-column fixed prop="driver_no" label="提交订单操作">
                        <template slot-scope="rowsData">
                          {{rowsData.row.msg}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="driver_no" label="车号">
                      </el-table-column>
                      <el-table-column prop="operator" label="操作人">
                      </el-table-column>
                      <el-table-column prop="operator_time" label="操作时间">
                      </el-table-column>
                    </el-table>
                    <el-row style="margin-top:0px;" v-if="allTableList.add_driver_list.length>5">
                      <el-col style="text-align:center">
                        <el-button type="text" v-if="extendArr['add_driver_list']" @click="showOrExtend('extend','add_driver_list')">查看更多({{allTableList.add_driver_list.length}})</el-button>
                        <el-button type="text" v-if="!extendArr['add_driver_list']" @click="showOrExtend('enExtend','add_driver_list')">收起</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="allTableList.add_driver_list.length==0" class="text-center">
                    无操作数据
                  </div>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        确定订单
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list" v-if="allTableList.confirm_list.length>0">
                    <el-table :data="renderList.r_confirm_list" style="width: 100%" max-height="500">
                      <el-table-column fixed prop="driver_no" label="确定订单操作">
                        <template slot-scope="rowsData">
                          {{rowsData.row.operation}}:{{rowsData.row.waybill}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="driver_no" label="车号">
                      </el-table-column>
                      <el-table-column prop="operator" label="操作人">
                      </el-table-column>
                      <el-table-column prop="operator_time" label="操作时间">
                      </el-table-column>
                    </el-table>
                    <el-row style="margin-top:0px;" v-if="allTableList.confirm_list.length>5">
                      <el-col style="text-align:center">
                        <el-button type="text" v-if="extendArr['confirm_list']" @click="showOrExtend('extend','confirm_list')">查看更多({{allTableList.confirm_list.length}})</el-button>
                        <el-button type="text" v-if="!extendArr['confirm_list']" @click="showOrExtend('enExtend','confirm_list')">收起</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="allTableList.confirm_list.length==0" class="text-center">
                    无操作数据
                  </div>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        修改订单
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list" v-if="allTableList.modify_list.length>0">
                    <el-table :data="renderList.r_modify_list" style="width: 100%" max-height="500">
                      <el-table-column fixed prop="driver_no" label="修改订单操作">
                        <template slot-scope="rowsData">
                          {{rowsData.row.msg}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="driver_no" label="车号">
                      </el-table-column>
                      <el-table-column prop="operator" label="操作人">
                      </el-table-column>
                      <el-table-column prop="operator_time" label="操作时间">
                      </el-table-column>
                    </el-table>
                    <el-row style="margin-top:0px;" v-if="allTableList.modify_list.length>5">
                      <el-col style="text-align:center">
                        <el-button type="text" v-if="extendArr['modify_list']" @click="showOrExtend('extend','modify_list')">查看更多({{allTableList.modify_list.length}})</el-button>
                        <el-button type="text" v-if="!extendArr['modify_list']" @click="showOrExtend('enExtend','modify_list')">收起</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="allTableList.modify_list.length==0" class="text-center">
                    无操作数据
                  </div>
                </div>
                <div class="detail-list detail-form">
                  <div class="detail-form-title">
                    <el-row>
                      <el-col :span="12" :offset="6" class="text-center">
                        取消订单
                      </el-col>
                    </el-row>
                  </div>
                  <div class="table-list" v-if="allTableList.canceled_list.length>0">
                    <el-table :data="renderList.r_canceled_list" style="width: 100%" max-height="500">
                      <el-table-column fixed prop="driver_no" label="取消订单信息">
                        <template slot-scope="rowsData">
                          {{rowsData.row.msg}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="operator" label="操作人">
                      </el-table-column>
                      <el-table-column prop="operator_time" label="操作时间">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div v-if="allTableList.canceled_list.length==0" class="text-center">
                    无操作数据
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
    },
    operationStatus: function() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      activeName: 'third',
      pageLoading: false,
      allTableList: {
        create_list: [],
        add_driver_list: [],
        confirm_list: [],
        canceled_list: [],
        modify_list: []
      },
      extendArr: {
        create_list: true,
        add_driver_list: true,
        confirm_list: true,
        modify_list: true
      },
      renderList: {
        r_create_list: [],
        r_add_driver_list: [],
        r_confirm_list: [],
        r_canceled_list: [],
        r_modify_list: []
      }
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/orderManage/pickupOrders/orderDetail/orderDetailTab/${this.id}/${this.operationStatus}` });
      }
      if (targetName.name == 'second') {
        this.$router.push({ path: `/orderManage/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${this.id}/${this.operationStatus}` });
      }
    },
    showOrExtend: function(type, value) {
      var allData = this.pbFunc.deepcopy(this.allTableList[value]);
      this.extendArr[value] = !this.extendArr[value];
      if (type == "extend") {
        this.renderList["r_" + value] = allData;
      } else if (type == "enExtend") {
        this.renderList["r_" + value] = allData.splice(0, 5);
      }
    },
    getRecordsData: function() {
      var vm = this;
      var sendData = {
        id: this.id
      };
      vm.pageLoading = true;
      this.$$http("getRecordsData", sendData).then((results) => {
        vm.pageLoading = false;
        if (results.data.code == 0) {
          results.data.data.forEach(item => {
            if (item.type !== 'add_driver' && item.type !== 'modify') {
              vm.allTableList[item.type + "_list"].push(item);
            }
            if (item.type == "add_driver") {
              item.add_driver_no.forEach(Aitem => {
                vm.allTableList.add_driver_list.push({
                  operator: item.operator,
                  operator_time: item.operator_time,
                  driver_no: Aitem,
                  msg: "新增车辆"
                });
              });
            }
            if (item.type == "modify") {
              item.add_driver_no.forEach(Aitem => {
                vm.allTableList.modify_list.push({
                  operator: item.operator,
                  operator_time: item.operator_time,
                  driver_no: Aitem,
                  msg: "新增车辆"
                });

              });
              item.del_driver_no.forEach(Aitem => {
                vm.allTableList.modify_list.push({
                  operator: item.operator,
                  operator_time: item.operator_time,
                  driver_no: Aitem,
                  msg: "删除车辆"
                });
              });
            }
          });

          var infoList = vm.pbFunc.deepcopy(vm.allTableList);
          vm.renderList.r_create_list = infoList.create_list.splice(0, 5);
          vm.renderList.r_add_driver_list = infoList.add_driver_list.splice(0, 5);
          vm.renderList.r_confirm_list = infoList.confirm_list.splice(0, 5);
          vm.renderList.r_canceled_list = infoList.canceled_list.splice(0, 5);
          vm.renderList.r_modify_list = infoList.modify_list.splice(0, 5);
        }
      }).catch(() => {
        vm.pageLoading = false;
      });
    },
    activated: function() {
      this.activeName = 'third';
    },

  },
  created() {
    this.getRecordsData();
  }

}

</script>
