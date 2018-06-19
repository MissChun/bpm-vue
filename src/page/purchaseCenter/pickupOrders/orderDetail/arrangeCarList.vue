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
                  <!-- <el-col :span="4">
                    <el-form-item label="状态:">
                      <el-select v-model="searchFilters.orderStateList" @change="startSearch" placeholder="请选择">
                        <el-option v-for="(item,key) in selectData.orderStateListSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="3" :offset="19" style="line-height:40px;font-size:14px;">
                    需求车数:{{now_capacities.length+alerySureList.length}}/{{delivery_list.require_car_number}}
                  </el-col>
                  <el-col :span="2" v-if="delivery_list.status.key!='canceled'">
                    <el-button type="primary" plain @click="operation('sureCar')">确认车辆</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="table-list">
              <el-table :data="renderPage_list" ref="multipleTable" stripe style="width: 100%" v-loading="pageLoading" @select="checkRows">
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:150">
                </el-table-column>
                <el-table-column label="勾选" type="selection" width="55" fixed="right" :selectable="checkSelectable">
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
      selectData: {
        fieldSelect: [{
          value: '车号',
          id: 'tractor.plate_number',
        }, {
          value: '姓名',
          id: 'master_driver.name',
        }, {
          value: '电话',
          id: 'master_driver.mobile_phone',
        }],
        orderStateListSelect: [{
          value: '车号',
          id: '1',
        }]
      },
      thTableList: [{
        title: '变更',
        param: 'waybill.waybill_change_status_display',
        width: ''
      }, {
        title: '运单状态',
        param: 'waybill.status_display',
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
      renderPage_list: [],

      trueAll_list: [],
      delivery_list: {status:{}},
      tractor_semitrailers_List: [],
      now_capacities: [],
      alerySureList: [],
      allChangeList: [],
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
    checkSelectable: function(row) {
      return !row.disableChoose
    },
    clicktabs: function(targetName) {
      if (targetName.name == 'second') {
        this.$router.push({ path: `/purchaseCenter/pickupOrders/orderDetail/arrangeCarTab/arrangeCarMap/${this.id}` });
      }
    },
    checkRows: function(selection, row) {
      var vm = this;
      var sendJudge = false;
      selection.forEach(item => {
        if (item.id == row.id) {
          sendJudge = true;
        }
      });
      if (sendJudge) {
        this.now_capacities.push(row);
      } else {
        var arr1 = [];
        this.now_capacities.forEach((items, index) => {
          if (items.id != row.id) {
            arr1.push(items);
          }
        });
        this.now_capacities = arr1;
      }
      vm.trueAll_list.forEach((Titem) => {
        if (Titem.id == row.id) {
          Titem.bindCheckBox = !Titem.bindCheckBox;
        }
      });
    },
    startSearch: function() {
      this.pageData.currentPage = 1;
      this.searchThisByData();
    },
    operation: function(type) {
      var capacitiesList = [];
      var vm = this;
      this.now_capacities.forEach(item => {
        capacitiesList.push(item.id);
      });
      var sendData = {
        delivery_order_id: this.id,
        capacities: capacitiesList,
        id: this.id
      }
      this.pageLoading = true;
      this.$$http("surePickOrder", sendData).then(results => {
        this.pageLoading = false;
        if (results.data.code == 0) {
          vm.$router.push({ path: "/purchaseCenter/pickupOrders?goTo=confirmed" });
          this.$message({
            message: '确认计划成功',
            type: 'success'
          });
        }
      }).catch(() => {
        this.pageLoading = false;
      });
    },
    getList: function() {
      var vm = this;
      var getDataNum = 0;
      // let postData = {
      //   pagination: false,
      //   complete_status: true
      // };
      // this.pageLoading = true;
      //

      // vm.$$http('searchCapacityList', postData).then((results) => {

      //   if (results.data && results.data.code == 0) {
      //     console.log("运力列表", results.data.data);
      //     vm.tractor_semitrailers_List = results.data.data;
      //   }
      //   getDataNum++;
      //   if (getDataNum == 2) {
      //     vm.pageLoading = false;
      //     vm.sortData(true);
      //   }
      // }).catch((err) => {
      //   getDataNum++;
      //   vm.sortData(false);
      //   if (getDataNum == 2) {
      //     vm.pageLoading = false;
      //   }
      // });



      let postData4 = {
        id: vm.id
      };
      vm.$$http('searchOrderHasPower', postData4).then((results) => {
        if (results.data && results.data.code == 0&&results.data.data) {
          console.log("已经添加列表上面的数据", results.data);
          getDataNum++;
          vm.alreadyList = results.data.data;
          vm.allChangeList = results.data.data.add_capacities.concat(results.data.data.del_capacities);
          if (getDataNum == 2) {
            vm.pageLoading = false;
            vm.getTrueList(true);
          }
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
        if (getDataNum == 2) {
          vm.pageLoading = false;
          vm.getTrueList(true);
        }
      }).catch((err) => {
        getDataNum++;
        vm.getTrueList(false);
        if (getDataNum == 2) {
          vm.pageLoading = false;
        }
      });


    },
    getTrueList: function() {
      var vm = this;
      var newArrs = this.pbFunc.deepcopy(vm.allChangeList);
      vm.delivery_list.trips.forEach((Ditem) => {
        var addflag = true;
        vm.allChangeList.forEach((item) => {
          if (Ditem.capacity == item) {
            addflag = false;
          }
        });
        if (addflag) {
          newArrs.push(Ditem.capacity);
        }
      });
      var getlistParam = {
        tractor_list: newArrs
      }
      vm.$$http("getTransPowerInfo", getlistParam).then((transPower) => {
        if (transPower.data.code == 0) {
          vm.tractor_semitrailers_List = transPower.data.data.results;
          vm.sortData(true);
        }

      });
    },
    sortData: function(status) {
      if (status) {
        let operationArr = this.pbFunc.deepcopy(this.tractor_semitrailers_List);
        let newArr = [];
        let fifterArr = [];
        for (let i = 0; i < operationArr.length; i++) { //循环所有运力列表
          var addflag = true;

          for (let j = 0; j < this.delivery_list.trips.length; j++) { //筛选当前订单的列表
            //筛选
            if (operationArr[i].id == this.delivery_list.trips[j].capacity && this.allChangeList.indexOf(this.delivery_list.trips[j].capacity) < 0) {
              operationArr[i].disableChoose = true;
              addflag = false;
              operationArr[i].bindCheckBox = true;
              newArr.push(operationArr[i]);
            }
            if (operationArr[i].id == this.delivery_list.trips[j].capacity) {
              operationArr[i].waybill = this.delivery_list.trips[j];
            }
          }
          if (addflag) {
            operationArr[i].bindCheckBox = true;
            fifterArr.push(operationArr[i]);
            operationArr[i].disableChoose = false;
            this.now_capacities.push(operationArr[i]);
          }
        }
        this.alerySureList = newArr;
        
        this.trueAll_list = fifterArr.concat(newArr);
        this.renderAll_list = fifterArr.concat(newArr);
        if(this.delivery_list.status.key=="canceled"){
        this.trueAll_list.forEach(item=>{
            item.disableChoose=true;
          });
        this.renderAll_list.forEach(item=>{
            item.disableChoose=true;
          });
        }
        this.bindChekboxFunction(0, this.renderAll_list);
      }

    },
    searchThisByData: function(searchPage, type) {
      if(this.delivery_list.status.key!="confirmed"){

     
      var keyArr = this.searchFilters.field == '' ? [] : this.searchFilters.field.split(".");
      var value = this.searchFilters.keyword;
      var newArr = [];
      if (keyArr.length == 0) {
        newArr = this.trueAll_list;
      } else {
        for (let i = 0; i < this.trueAll_list.length; i++) {
          var searchParam = this.pbFunc.deepcopy(this.trueAll_list[i]);
          for (let j = 0; j < keyArr.length; j++) {
            searchParam = searchParam[keyArr[j]];
          }
          if (searchParam.indexOf(value) > -1) {
            newArr.push(this.trueAll_list[i]);
          }
        }
      }
      if (type == 'pageChange') {
        newArr = this.lastSearch_list;
      }
      
      this.renderAll_list = newArr;
      this.bindChekboxFunction(searchPage, newArr);
       }
    },
    bindChekboxFunction: function(page, list) {
      this.pageData.totalPage = Math.ceil(list.length / this.pageData.pageSize);
      this.lastSearch_list = list;
      var vm = this;
      var page_list = this.pbFunc.deepcopy(list).splice(page * this.pageData.pageSize, this.pageData.pageSize);

      this.renderPage_list = page_list;
      var rowsArr = [];
      page_list.forEach((item, index) => {
        if (item.bindCheckBox) {
          rowsArr.push(item);
        }
      });
      var vm = this;
      setTimeout(function() {
        rowsArr.forEach(row => {
          vm.$refs.multipleTable.toggleRowSelection(row, true);
        });
      });
    },
    pageChange: function() {
      setTimeout(() => {
        this.searchThisByData(this.pageData.currentPage - 1, 'pageChange');
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
