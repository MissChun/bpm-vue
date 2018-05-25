<style scoped lang="less">
.el-table {
  /deep/ .el-table__fixed-header-wrapper tr th .el-checkbox__inner {
    display: none;
  }
  /deep/ tr td .cell {
    text-align: center;
  }
}

</style>
<template>
  <div class="tab-screen">
    <div>
      <div class="nav-tab">
        <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
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
                  <el-col :span="4">
                    <el-form-item label="状态:">
                      <el-select v-model="searchFilters.orderStateList" @change="startSearch" placeholder="请选择">
                        <el-option v-for="(item,key) in selectData.orderStateListSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" :offset="16">
                    <el-button v-if="operationStatus=='add'" type="primary" plain @click="operation('addCar')">添加车辆</el-button>
                    <el-button v-if="operationStatus=='edit'" type="primary" @click="operation('changeCar')">提交修改</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="table-list">
              <el-table :data="renderPage_list" ref="multipleTable" stripe style="width: 100%" v-loading="pageLoading" @select="checkRows">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column label="勾选" type="selection" width="55" fixed="right">
                </el-table-column>
              </el-table>
            </div>
            <div class="page-list text-center ">
              <el-pagination background layout="prev, pager, next " :page-count="pageData.totalPage " :page-size="pageData.pageSize " :current-page.sync="pageData.currentPage " @current-change="pageChange " v-if="!pageLoading && pageData.totalPage>1">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="地图" name="second">
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
        totalPage: '',
        pageSize: 10,
      },
      searchFilters: {
        keyword: '',
        field: '1',
        orderStateList: '',
      },
      selectData: {
        fieldSelect: [{
          value: '车号',
          id: '1',
        }, {
          value: '姓名',
          id: '2',
        }, {
          value: '电话',
          id: '3',
        }],
        orderStateListSelect: [{
          value: '车号',
          id: '1',
        }]
      },
      thTableList: [{
        title: '变更',
        param: 'waybill.waybill_change_status',
        width: ''
      }, {
        title: '运单状态',
        param: 'waybill.status',
        width: ''
      }, {
        title: '运单号',
        param: 'waybill.waybill',
        width: ''
      }, {
        title: '车号',
        param: 'tractor.plate_number',
        width: ''
      }, {
        title: '挂车',
        param: 'semitrailer.plate_number',
        width: '250'
      }, {
        title: '司机',
        param: 'master_driver.name',
        width: ''
      }, {
        title: '司机电话',
        param: 'master_driver.mobile_phone',
        width: ''
      }, {
        title: '押运',
        param: 'escort_staff.name',
        width: ''
      }, {
        title: '押运电话',
        param: 'escort_staff.mobile_phone',
        width: ''
      }, {
        title: '副驾',
        param: 'vice_driver.name',
        width: ''
      }, {
        title: '副驾电话',
        param: 'vice_driver.mobile_phone',
        width: ''
      }],
      tableData: [],
      tractor_semitrailers_List: [], //运力列表
      renderAll_list: [], //筛选后的所有渲染列表
      upTo_list: [], //最近三天已经被使用的运力
      delivery_list: [], //提货单拥有的运单，审核后
      haveTranspower_list: [], //提货单所拥有的运力,未审核
      renderPage_list: [], //当前页渲染的数据


      add_capacities: [], //增加的运力表
      del_capacities: [], //取消的运力表
      start_capacities: [],
      now_capacities: [],
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
    operationStatus: function() {
      return this.$route.params.type;
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: `/orders/pickupOrders/orderDetail/arrangeCarTab/arrangeCarMap/${this.id}` });
      }
    },
    checkRows: function(selection, row) {
      var vm = this;
      console.log("selection", selection);
      console.log("row", row);
      this.now_capacities = selection;
      if (row.id) {
        var sendJudge = false;
        selection.forEach(item => {
          if (item.id == row.id) {
            sendJudge = true;
          }
        });
        if (sendJudge) {
          let postData3 = {
            transport_id: row.id
          };
          this.$$http('searchNoUse', postData3).then((results) => {
            if (results.data && results.data.code == 0) {
              console.log("绑定的订单", results.data.data);
              vm.pageLoading = false;
              if (results.data.data.length > 0) {
                var orderListText = "";
                results.data.data.forEach((item) => {
                  orderListText += item + ",";
                });
                const h = this.$createElement;
                vm.$msgbox({
                  title: '请注意',
                  message: h('p', null, [
                    h('span', null, '车号 ' + row.tractor.plate_number + " 已存在于订单"),
                    h('i', { style: 'color: teal' }, orderListText + "是否继续添加进入订单")
                  ]),
                  showCancelButton: true,
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回',
                  beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                      done();

                    } else {
                      vm.$refs.multipleTable.toggleRowSelection(row, false);
                      done();
                    }
                  }
                })
              }
            }
          }).catch((err) => {
            vm.pageLoading = false;
          });
        }
      }
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.getList();
    },
    operation: function(type) {
      var vm = this;
      if (type == 'addCar') {
        var sendData = {
          delivery_order_id: "",
          add_capacities: []
        };
        this.now_capacities.forEach(item => {
          sendData.add_capacities.push(item.id);
        });
        sendData.delivery_order_id = this.delivery_list.id;
        this.pageLoading = true;
        this.$$http("addCarPower", sendData).then((results) => {
          this.pageLoading = false;
          if (results.data.code == 0) {
            vm.$router.push({ path: "/orders/pickupOrders/ordersList" });
          }
        }).catch(() => {
          this.pageLoading = false;
        });

      } else if (type == 'changeCar') {
        var sendData = {
          delivery_order_id: "",
          add_capacities: [],
          del_capacities: [],
          id: this.delivery_list.id,
          yid: this.delivery_list.id
        };
        this.now_capacities.forEach(item => {
          var addFalg = true;
          vm.start_capacities.forEach(startItem => {
            if (item.id == startItem.id) {
              addFalg = false;
            }
          });
          if (addFalg) {
            sendData.add_capacities.push(item.id);
          }
        });

        this.start_capacities.forEach(item => {
          var cancleFalg = true;
          vm.now_capacities.forEach(nowItem => {
            if (item.id == nowItem.id) {
              cancleFalg = false;
            }
          });
          if (cancleFalg) {
            sendData.del_capacities.push(item.id);
          }
        });

        this.pageLoading = true;
        this.$$http("editCarPower", sendData).then((results) => {
          this.pageLoading = false;
          if (results.data.code == 0) {
            vm.$router.push({ path: "/orders/pickupOrders/ordersList" });
          }
        }).catch(() => {
          this.pageLoading = false;
        });
      }
    },
    getList: function() {
      var vm = this;
      let postData = {
        pagination: false,
        complete_status: true
      };
      vm.pageLoading = true;
      var getDataNum = 0;
      vm.$$http('searchCapacityList', postData).then((results) => {

        if (results.data && results.data.code == 0) {
          console.log("运力列表", results.data.data);
          vm.tractor_semitrailers_List = results.data.data;
        }
        getDataNum++;
        if (getDataNum == 3) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 3) {
          vm.pageLoading = false;
        }
      });
      let postData1 = {
        id: this.id
      };
      vm.$$http('getPickOrderDetail', postData1).then((results) => {
        getDataNum++;

        if (results.data && results.data.code == 0) {
          console.log("当前订单数据", results.data.data);
          vm.delivery_list = results.data.data;
        }
        if (getDataNum == 3) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 3) {
          vm.pageLoading = false;
        }
      });
      let postData2 = {

      };
      this.$$http('searchNoUse', postData2).then((results) => {
        if (results.data && results.data.code == 0) {
          console.log("最近未指派的车辆数据", results.data);
          vm.upTo_list = results.data.data;
        }
        getDataNum++;
        if (getDataNum == 3) {
          vm.pageLoading = false;
          vm.sortData(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.sortData(false);
        if (getDataNum == 3) {
          vm.pageLoading = false;
        }
      });

    },
    sortData: function(status) {
      if (status) {
        let operationArr = this.pbFunc.deepcopy(this.tractor_semitrailers_List);
        let newArr = [];
        for (let i = 0; i < operationArr.length; i++) {
          for (let j = 0; j < this.delivery_list.trips.length; j++) {
            //筛选
            if (operationArr[i].id == this.delivery_list.trips[j].capacity) {
              operationArr[i].waybill = this.delivery_list.trips[j];
              operationArr[i].bindCheckBox = true;
              newArr.push(operationArr[i]);
            }
          }
          for (let o = 0; o < this.upTo_list.length; o++) {
            if (operationArr[i].id == this.upTo_list[o]) {
              break;
            } else {
              operationArr[i].waybill = {};
              newArr.push(operationArr[i]);
            }
          }
        }
        var newArr1 = [];
        for (let m = 0; m < operationArr.length; m++) {
          var addflag = true;
          for (let n = 0; n < newArr.length; n++) {
            if (newArr[n].id == operationArr[m].id) {
              addflag = false;
            }
          }
          if (addflag) {
            operationArr[m].waybill = {};
            operationArr[m].ccccc = [];
            newArr1.push(operationArr[m]);
          }
        }
        newArr = newArr.concat(newArr1);
        this.renderAll_list = newArr;
        this.bindChekboxFunction(0, this.renderAll_list);
      } else {
        console.log("获取数据失败,请刷新页面重试或联系管理员");
      }
    },
    bindChekboxFunction: function(page, list) {
      var list = this.pbFunc.deepcopy(list).splice(page * 10, 10);
      this.renderPage_list = list;
      var rowsArr = [];
      list.forEach((item, index) => {
        if (item.bindCheckBox) {
          rowsArr.push(item);
        }
      });

      var vm = this;
      setTimeout(function() {
        rowsArr.forEach(row => {
          vm.$refs.multipleTable.toggleRowSelection(row, true);
          vm.start_capacities.push(row.waybill.capacity);
        });
      });

    },
    pageChange: function() {
      setTimeout(() => {
        this.getList();
      })
    }
  },
  activated: function() {
    this.activeName = 'first';
  },
  created: function() {
    this.getList();
  }
}

</script>
