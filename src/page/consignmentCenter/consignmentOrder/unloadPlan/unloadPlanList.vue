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

</style>
<template>
  <div class="tab-screen">
    <div>
      <div class="nav-tab">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="列表" name="first">
            <div class="tab-screen">
              <el-form class="search-filters-form" label-width="60px" :model="searchFilters" status-icon label-position="left">
                <el-row :gutter="0">
                  <el-col :span="12">
                    <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch" class="search-filters-screen">
                      <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                        <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                      <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="计划到站时间:" label-width="105px">
                      <el-date-picker v-model="searchTimeParam" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="2" :offset="22">
                    <el-button type="primary" @click="operation('upMatchList')">提交卸货单</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="table-list">
              <el-table :data="renderList" ref="multipleTable" stripe style="width: 100%" v-loading="pageLoading">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                  <template slot-scope="props">
                    <el-button type="text" @click="operation('sureMatch',props.row)" v-if="props.row.orderMatch=='Match'">匹配</el-button>
                    <el-button type="text" @click="operation('cancleMatch',props.row)" v-if="props.row.orderMatch=='NoMatch'">取消匹配</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="page-list text-center ">
              <el-pagination background layout="prev, pager, next " :page-count="pageData.totalPage " :page-size="pageData.pageSize " :current-page.sync="pageData.currentPage " @current-change="pageChange " v-if="!pageLoading && pageData.totalPage>1">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="轨迹地图" name="second">
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
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
      },
      searchFilters: {
        keyword: '',
        field: '',
        orderStateList: '',
      },
      searchTimeParam: [],
      selectData: {
        fieldSelect: [{
          value: '业务单号',
          id: 'order_number',
        }, {
          value: '客户名称',
          id: 'customer_name',
        }, {
          value: '液厂',
          id: 'actual_fluid',
        }, {
          value: '收货人',
          id: 'consignee',
        }, {
          value: '业务员',
          id: 'sale_man',
        }],
        orderStateListSelect: [{
          value: '收货人',
          id: '1',
        }]
      },
      renderList: [],
      trueAllList: [],
      upMatchList: [],
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

      })
    },
    startSearch: function() {

    },
    operation: function(type, row) {
      var sendData = {};
      var vm = this;
      if (type == 'sureMatch') {
        vm.upMatchList.push(row.id);
        vm.renderList.forEach((item, index) => {
          if (item.id == row.id) {
            item.orderMatch = 'NoMatch';
          }
        });
      } else if (type == 'cancleMatch') {
        sendData.section_trip_id = vm.setpId;
        sendData.business_order_id = row.id;
        vm.$$http("judgeIsCancle", sendData).then(judgeResults => {
          if (judgeResults.data.code == 0 && judgeResults.data.data.whether_cancel || judgeResults.data.code == -1) {
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
          } else {
            vm.$confirm('当前状态不能取消匹配,请核实', '请注意', {
              confirmButtonText: '确认',
              type: 'warning',
              showCancelButton: false,
              center: true,
            }).then(() => {})
          }
        });
      } else if (type == 'upMatchList') {
        var cancel_order_list = [],
          match_order_list = [];

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
        sendData.waybill_id = vm.id;
        sendData.match_order_list = match_order_list;
        sendData.cancel_order_list = cancel_order_list;
        vm.$$http("upMatchList", sendData).then(results => {
          if (results.data.code == 0) {
            console.log("成功");
            vm.$message({
              type: "success",
              message: "匹配卸货地成功"
            })
          }
          vm.$router.push({ path: "/consignmentCenter/consignmentOrders" });
        });
      }
    },
    getList: function() {
      var vm = this;
      var sendData = {};
      var needNum = 0;
      sendData.all_search = 'bpm_match';
      this.$$http("getBusinessList", sendData).then((results) => {
        needNum++;
        if (results.data.code == 0) {
          vm.trueAllList = results.data.data.data
          console.log(results.data.data);
          if (needNum == 2) {
            vm.sortParam(true);
          }
        }
      }).catch(() => {
        needNum++;
        if (needNum == 2) {
          vm.sortParam(false);
        }
      });

      var sendData1 = {};
      sendData1.waybill_order_id = this.id;
      this.$$http("getHasLoadOrder", sendData1).then((results) => {
        needNum++;
        if (results.data.code == 0) {
          vm.hasList = results.data.data;
          vm.upMatchList = vm.hasList;
          if (needNum == 2) {
            vm.sortParam(true);
          }
        }
      }).catch(() => {
        needNum++;
        if (needNum == 2) {
          vm.sortParam(false);
        }
      });
    },
    sortParam: function(falag) {
      if (falag) {
        this.trueAllList.forEach((item) => {
          if (item.status == 'waiting_related') {
            item.orderMatch = 'Match';
          } else if (['waiting_confirm', 'to_site', 'modify_manager_check', 'modify_department_check'].indexOf(item.status) > 0) {
            this.hasList.forEach((Hitem) => {
              if (Hitem == item.id) {
                item.orderMatch = 'NoMatch';
              }
            });
          }
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
