<style scoped lang="less">
  .el-table {
  /deep/ .el-table__fixed-header-wrapper tr th .el-checkbox__inner {
    display: none;
  }
  /deep/ tr td .cell {
    text-align: center;
  }
  /deep/ tr th .cell {
    text-align: center;
  }
}

.go-return {
  width: 32px;
  height: 32px;
  margin-top: 14px;
}

.el-header p {
  height: 60px;

  font-size: 26px;
  line-height: 60px;

  text-align: center;
}

</style>
<template>
  <div class="tab-screen">
    <div>
      <div class="nav-tab">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="列表" name="first">
            <div class="tab-screen">
              <el-header>
                <el-row>
                  <el-col :span="3">
                    <router-link :to="{path: '/logisticsManage/platformWaybill/ordersList'}">
                      <div class="go-return icon-back"></div>
                    </router-link>
                  </el-col>
                  <el-col :span="18">
                    <p>匹配卸车</p>
                  </el-col>
                </el-row>
              </el-header>
              <el-form class="search-filters-form" label-width="60px" :model="searchFilters" status-icon label-position="left">
                <el-row :gutter="0">
                  <el-col :span="12">
                    <el-input placeholder="请输入" v-model="fifterParam.keyword" @keyup.native.13="getSearchLIst" class="search-filters-screen" @change="getSearchLIst">
                      <el-select v-model="fifterParam.field" slot="prepend" placeholder="请选择">
                        <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                      <el-button slot="append" icon="el-icon-search" @click="getSearchLIst"></el-button>
                    </el-input>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="计划到站时间:" label-width="105px">
                      <el-date-picker v-model="searchTimeParam" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" @change="getSearchLIst">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <el-row :gutter="10" style="margin:10px 0;">
              <el-col :span="3" :offset="21">
                <el-button type="primary" class="float-right" :loading="operationBtn.isLoading" :disabled="operationBtn.isLoading" @click="operation('upMatchList')">提交卸货单</el-button>
              </el-col>
            </el-row>
            <div class="table-list">
              <el-table :data="renderList" ref="multipleTable" stripe style="width: 100%" v-loading="pageLoading" @select="checkRows">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <!-- <el-table-column label="操作" type="selection" width="55" fixed="right" ></el-table-column> -->
                <el-table-column label="操作" fixed="right" width="100">
                  <template slot-scope="props">
                    <el-button type="text" @click="operation('sureMatch',props.row)" v-if="props.row.orderMatch=='Match'">匹配</el-button>
                    <el-button type="text" @click="operation('cancleMatch',props.row)" v-if="props.row.orderMatch=='NoMatch'">取消匹配</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="page-list text-center ">
              <el-pagination background layout="prev, pager, next ,jumper" :page-count="pageData.totalPage " :page-size="pageData.pageSize " :current-page.sync="pageData.currentPage " @current-change="pageChange " v-if="!pageLoading && pageData.totalPage>1">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'orderDetailTab',
  data() {
    return {
      activeName: 'first',
      pageLoading: false,
      needNum: 0,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      fifterParam: {
        keyword: '',
        field: 'short_name',
        orderStateList: '',
      },
      searchFilters: {},
      searchStatus: false,
      searchTimeParam: [],
      selectData: {
        fieldSelect: [{
          value: '业务单号',
          id: 'order_number',
        }, {
          value: '客户简称',
          id: 'short_name',
        }, {
          value: '液厂',
          id: 'actual_fluid_name',
        }, {
          value: '收货人',
          id: 'consignee',
        }, {
          value: '业务员',
          id: 'sale_man_name',
        }, {
          value: '站点',
          id: 'station',
        }, {
          value: '站点地址',
          id: 'station_address',
        }],
      },
      renderList: [],
      trueAllList: [],
      upMatchList: [],
      hasList: [],
      cancel_order_list: [],
      match_order_list: [],
      thTableList: [{
        title: '业务单号',
        param: 'order_number',
        width: ''
      }, {
        title: '业务单状态',
        param: 'status_display',
        width: ''
      }, {
        title: '客户简称',
        param: 'short_name',
        width: ''
      }, {
        title: '业务员',
        param: 'sale_name',
        width: ''
      }, {
        title: '液厂',
        param: 'actual_fluid_name',
        width: '250'
      }, {
        title: '站点',
        param: 'station',
        width: ''
      }, {
        title: '站点地址',
        param: 'station_address',
        width: ''
      }, {
        title: '计划到站时间',
        param: 'plan_arrive_time',
        width: ''
      }, {
        title: '计划吨位',
        param: 'plan_tonnage',
        width: ''
      }, {
        title: '收货人',
        param: 'consignee',
        width: ''
      }, {
        title: '收货人电话',
        param: 'consignee_phone',
        width: ''
      }],
      operationBtn: {
        isLoading: false,
      }

    }
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    setpId: function() {
      return this.$route.params.setpId;
    }
  },
  methods: {
    pageChange: function() {
      setTimeout(() => {
        this.searchStatus = true;
        this.getSearchLIst();
      })
    },
    startSearch: function() {

    },
    checkRows: function(selection, row) {

    },
    addMatch: function(type, row) {
      var vm = this;
      vm.upMatchList.push(row.id);
      vm.renderList.forEach((item, index) => {
        if (item.id == row.id) {
          item.orderMatch = 'NoMatch';
        }
      });
      var match_order_list = [];
      var cancel_order_list = [];
      vm.upMatchList.forEach(Uitem => {
        var addFalg = true;
        vm.hasList.forEach(item => {
          if (Uitem == item) {
            addFalg = false;
          }
        });
        if (addFalg) {
          match_order_list.push(Uitem);
        }
      });
      vm.hasList.forEach(item => {
        var cancleFalg = true;
        vm.upMatchList.forEach(Uitem => {
          if (Uitem == item) {
            cancleFalg = false;
          }
        });
        if (cancleFalg) {
          cancel_order_list.push(item);
        }
      });
      this.cancel_order_list = cancel_order_list;
      this.match_order_list = match_order_list;
    },
    operation: function(type, row) {
      var sendData = {};
      var vm = this;

      if (type == 'sureMatch') {
        this.$$http("checkOrderCredit", { order_id: row.id }).then(results => {
          if (results.data && results.data.code == 0) {
            if (results.data.data.total < 0) {
              vm.$confirm('已超客户账户可用额度(余额+授信),请谨慎匹配', '匹配卸货单', {
                confirmButtonText: '继续匹配',
                cancelButtonText: '返回',
                type: 'warning',
                center: true,
                closeOnClickModal: false,
                showClose: false,
                closeOnPressEscape: false
              }).then(() => {
                this.addMatch(type, row);
              }).catch(() => {

              })
            } else {
              this.addMatch(type, row);
            }
          }
        });
      } else if (type == 'cancleMatch') {
        sendData.section_trip_id = vm.setpId;
        sendData.business_order_id = row.id;
        vm.$$http("judgeIsCancle", sendData).then(judgeResults => {
          if (judgeResults.data.code == 0 && judgeResults.data.data.whether_cancel || judgeResults.data.code == 1 || judgeResults.data.code == -1) {
            var newArr = [];
            vm.upMatchList.forEach((item, index) => {
              if (item != row.id) {
                newArr.push(item);
              }
            });
            vm.renderList.forEach((item, index) => {
              if (item.id == row.id) {
                item.orderMatch = 'Match';
              }
            });
            vm.upMatchList = newArr;
            var cancel_order_list = [];
            var match_order_list = [];
            vm.hasList.forEach(item => {
              var cancleFalg = true;
              vm.upMatchList.forEach(Uitem => {
                if (Uitem == item) {
                  cancleFalg = false;
                }
              });
              if (cancleFalg) {
                cancel_order_list.push(item);
              }
            });
            vm.upMatchList.forEach(Uitem => {
              var addFalg = true;
              vm.hasList.forEach(item => {
                if (Uitem == item) {
                  addFalg = false;
                }
              });
              if (addFalg) {
                match_order_list.push(Uitem);
              }
            });
            this.cancel_order_list = cancel_order_list;
            this.match_order_list = match_order_list;
          } else {
            // vm.$confirm('当前状态不能取消匹配,请核实', '请注意', {
            //   confirmButtonText: '确认',
            //   type: 'warning',
            //   showCancelButton: false,
            //   center: true,
            // }).then(() => {})
            this.$confirm('匹配的业务单状态已改变，请重新匹配', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: false,
              type: 'warning'
            }).then(() => {
              this.$router.go(0)
            }).catch(() => {
              this.$router.go(0)
            });
          }
        });
      } else if (type == 'upMatchList') {
        this.operationBtn.isLoading = true;
        sendData.waybill_id = vm.id;
        sendData.match_order_list = this.match_order_list;
        sendData.cancel_order_list = this.cancel_order_list;
        vm.$$http("upMatchList", sendData).then(results => {
          if (results.data.code == 0) {
            vm.$message({
              type: "success",
              message: "匹配卸货地成功"
            })
            vm.$router.push({ path: "/logisticsManage/platformWaybill/ordersList" });
          }
          this.operationBtn.isLoading = false;

        });
      }
    },
    getSearchLIst: function() {
      var vm = this;
      var sendData = {};
      if (this.fifterParam.field) {
        sendData[this.fifterParam.field] = this.fifterParam.keyword;
      }
      if (this.searchStatus) {
        sendData = this.saveSendData;
        sendData.page = this.pageData.currentPage;
      } else {
        this.pageData.currentPage = 1;
        sendData.page = this.pageData.currentPage;
      }
      if (this.searchTimeParam instanceof Array && this.searchTimeParam.length > 0) {
        sendData.plan_arrive_time_start = this.searchTimeParam[0];
        sendData.plan_arrive_time_end = this.searchTimeParam[1];
      }
      sendData.waybill_id = this.id;
      sendData.page_size = this.pageData.pageSize;
      this.$$http("getBusinessList", sendData).then((results) => {
        vm.saveSendData = sendData;
        vm.needNum++;
        vm.searchStatus = false;
        if (results.data.code == 0) {
          if (results.data.data) {
            vm.trueAllList = results.data.data.data
            vm.pageData.totalPage = Math.ceil(results.data.data.count / vm.pageData.pageSize);
          }
          if (vm.needNum >= 2) {
            vm.sortParam(true);
          }
        }
      }).catch(() => {
        vm.searchStatus = false;
        vm.needNum++;
        if (vm.needNum >= 2) {
          vm.sortParam(false);
        }
      });
    },
    getList: function() {
      var vm = this;
      this.getSearchLIst();
      var sendData1 = {};
      sendData1.waybill_order_id = this.id;
      this.$$http("getHasLoadOrder", sendData1).then((results) => {
        vm.needNum++;
        if (results.data.code == 0) {
          vm.hasList = this.pbFunc.deepcopy(results.data.data);
          vm.upMatchList = results.data.data;
          if (vm.needNum >= 2) {
            vm.sortParam(true);
          }
        }
      }).catch(() => {
        vm.needNum++;
        if (vm.needNum >= 2) {
          vm.sortParam(false);
        }
      });
    },
    sortParam: function(falag) {
      if (falag) {
        var vm = this;
        this.trueAllList.forEach((item) => {
          if (item.status == 'waiting_related') {
            item.orderMatch = 'Match';
          } else if (['waiting_confirm', 'to_site', 'modify_manager_check', 'modify_department_check'].indexOf(item.status) > -1) {
            this.hasList.forEach((Hitem) => {
              if (Hitem == item.id) {
                item.orderMatch = 'NoMatch';
                vm.$refs.multipleTable.toggleRowSelection(item, true);
              }
            });
          }

          this.match_order_list.forEach((Mitem) => {
            if (item.id == Mitem) {
              item.orderMatch = 'NoMatch';
            }
          });

          this.cancel_order_list.forEach((Citem) => {
            if (item.id == Citem) {
              item.orderMatch = 'Match';
            }
          });
        });
        this.renderList = this.pbFunc.deepcopy(this.trueAllList);
      } else {

      }
    },
  },

  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    this.getList();
  }
}

</script>
