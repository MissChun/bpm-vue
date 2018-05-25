<style lang="less">


</style>
<template>
  <div class="capacity-list">
    <div class="capacity-list-header">
      <el-form class="search-filters-form" label-width="80px" :model="filterParam" status-icon label-position="left">
        <el-row :gutter="0">
          <el-col :span="12">
            <el-input placeholder="请输入内容" size="mini" v-model="filterParam.keyword" class="input-with-select" @keyup.native.13="filterSearch">
              <el-select v-model="filterParam.field" size="mini" slot="prepend" placeholder="请选择">
                <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="filterSearch"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="完善状态:" size="mini">
              <el-select v-model="filterParam.complete_status" placeholder="请选择" @change="filterSearch">
                <el-option v-for="item in selectData.completeStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="挂车绑定状态:" size="mini" label-width="100px">
              <el-select v-model="filterParam.truck_bind_status" placeholder="请选择" @change="filterSearch">
                <el-option v-for="item in selectData.truckBindStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="人员绑定状态:" size="mini" label-width="100px">
              <el-select v-model="filterParam.staff_bind_status" placeholder="请选择" @change="filterSearch">
                <el-option v-for="item in selectData.staffBindStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分组:" size="mini" label-width="50px">
              <el-select v-model="filterParam.group" placeholder="请选择" @change="filterSearch">
                <el-option v-for="item in selectData.groupOptions" :key="item.id" :label="item.group_name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operation-btn text-right">
      <el-button type="primary" plain @click="importList">导入</el-button>
      <el-button type="primary" @click="exportList">导出</el-button>
    </div>
    <div class="capacity-list-content">
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading">
          <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="scope.row.truck_bind_status === '未绑定'" size="mini" type="primary" @click="bindTruck({rowData:scope.row})">绑定挂车</el-button>
              <el-button v-if="scope.row.truck_bind_status === '已绑定' && scope.row.staff_bind_status === '未绑定'" size="mini" type="primary" @click="bindStaff({rowData:scope.row})">绑定人员</el-button>
              <el-button v-if="scope.row.truck_bind_status === '已绑定' && scope.row.staff_bind_status === '已绑定'" size="mini" type="primary" @click="jumpPage({operator:'show',rowData:scope.row})">查看</el-button>
              <el-dropdown trigger="click" @command="jumpPage">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="scope.row.truck_bind_status === '未绑定' || scope.row.staff_bind_status === '未绑定'" :command="{operator:'show',rowData:scope.row}">查看</el-dropdown-item>
                  <el-dropdown-item :command="{operator:'operation',rowData:scope.row}">操作日志</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-list text-center">
        <el-pagination background layout="prev, pager, next" :page-count="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
        </el-pagination>
      </div>
      <el-dialog custom-class="capacity-list-dialog" title="绑定挂车" :visible.sync="bindTruckFormVisible" append-to-body center @close="closeFormDialog('truckDialog')" @open="openFormDialog('truckDialog')">
        <div class="notice-msg" v-show="truckNotice">
          <i class="el-icon-warning"></i>
          <div class="notice-msg">{{truckDialog.noticeMsg}}</div>
        </div>
        <el-form v-show="!truckNotice" :model="truckDialog" ref="truckDialog" label-width="80px" :rules="truckRules">
          <h2>请为牵引车：<span>{{truckDialog.truckNum}}</span>绑定挂车</h2>
          <el-form-item label="挂车号" prop="semitrailer">
            <el-select v-model="truckDialog.semitrailer" filterable placeholder="请选择">
              <el-option
                v-for="item in semiList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="随车电话">
            <el-input v-model="truckDialog.car_belong_phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分组">
            <el-select v-model="truckDialog.group" placeholder="请选择">
              <el-option v-for="item in selectData.groupOptions" :key="item.id" :label="item.group_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div v-show="!truckNotice" slot="footer" class="dialog-footer">
          <el-button @click="bindTruckFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitTruckForm">绑 定</el-button>
        </div>
        <div v-show="truckNotice" slot="footer" class="dialog-footer">
          <el-button @click="backTruckForm">上一步</el-button>
          <el-button type="primary" @click="forceSubmitTruckForm">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog custom-class="capacity-list-dialog" title="绑定人员" :visible.sync="bindStaffFormVisible" append-to-body center @close="closeFormDialog('staffDialog')" @open="openFormDialog('staffDialog')">
        <div class="notice-msg" v-show="staffNotice">
          <i class="el-icon-warning"></i>
          <div class="notice-msg">{{staffDialog.noticeMsg}}</div>
        </div>
        <el-form v-show="!staffNotice" :model="staffDialog" ref="staffDialog" label-width="70px" :rules="staffRules">
          <h2>请为牵引车：<span>{{staffDialog.truckNum}}</span>绑定人员&nbsp;&nbsp;挂车：<span>{{staffDialog.semiNum}}</span></h2>
          <el-form-item label="主驾驶" prop="master_driver">
            <el-select v-model="staffDialog.master_driver" filterable placeholder="请选择">
              <el-option
                v-for="item in driverList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="副驾驶">
            <el-select v-model="staffDialog.vice_driver" filterable placeholder="请选择">
              <el-option
                v-for="item in driverList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="押运员">
            <el-select v-model="staffDialog.escort_staff" filterable placeholder="请选择">
              <el-option
                v-for="item in escortList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div v-show="!staffNotice" slot="footer" class="dialog-footer">
          <el-button @click="bindStaffFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitStaffForm">绑 定</el-button>
        </div>
        <div v-show="staffNotice" slot="footer" class="dialog-footer">
          <el-button @click="backStaffForm">上一步</el-button>
          <el-button type="primary" @click="forceSubmitStaffForm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "capacityList",
  data() {
    return {
      truckDialog: {},
      staffDialog: {},
      truckNotice: false,
      staffNotice: false,
      truckRules: {
        semitrailer: [
          { required: true, message: '请输入挂车号', trigger: 'change' }
        ]
      },
      staffRules: {
        master_driver: [
          { required: true, message: '请输入主驾驶名称', trigger: 'change' }
        ]
      },
      groupListVisible: false,
      bindTruckFormVisible: false,
      bindStaffFormVisible: false,
      filterParam: {
        page: 1,
        keyword: "",
        field: "",
        complete_status: '',
        truck_bind_status: '',
        staff_bind_status: '',
        group: ''
      },
      rules: {},
      activeName: "first",
      pageLoading: true,
      pageData: {
        currentPage: 1,
        totalPage: 1,
        pageSize: 10
      },
      thTableList: [{
          title: "牵引车车牌号",
          param: "tractor.plate_number",
          width: ""
        },
        {
          title: "当前绑定挂车",
          param: "semitrailer.plate_number",
          width: ""
        },
        {
          title: "随车电话",
          param: "car_belong_phone",
          width: ""
        },
        {
          title: "车辆所属",
          param: "tractor.attributes.verbose",
          width: ""
        },
        {
          title: "分组",
          param: "group.group_name"
        },
        {
          title: "主驾驶",
          param: "master_driver.name",
          width: ""
        },
        {
          title: "副驾驶",
          param: "vice_driver.name",
          width: ""
        },
        {
          title: "押运员",
          param: "escort_staff.name",
          width: ""
        },
        {
          title: "挂车绑定状态",
          param: "truck_bind_status",
          width: ""
        },
        {
          title: "人员绑定状态",
          param: "staff_bind_status",
          width: ""
        },
        {
          title: "完善状态",
          param: "complete_status",
          width: ""
        }
      ],
      selectData: {
        fieldSelect: [
          { id: "tractor_plate_number", value: "牵引车号" },
          { id: "semitrailer_plate_number", value: "挂车号" },
          { id: "driver_staff_name", value: "人员" },
          { id: "car_belong_phone", value: "号码" }
        ],
        completeStatusOptions: [{
            value: '',
            label: '全部'
          },
          {
            value: false,
            label: "未完善"
          },
          {
            value: true,
            label: "已完善"
          }
        ],
        truckBindStatusOptions: [{
            value: '',
            label: '全部'
          },
          {
            value: false,
            label: "未绑定"
          },
          {
            value: true,
            label: "已绑定"
          }
        ],
        staffBindStatusOptions: [{
            value: '',
            label: '全部'
          },
          {
            value: false,
            label: "未绑定"
          },
          {
            value: true,
            label: "已绑定"
          }
        ],
        groupOptions: []
      },
      semiList: [],
      driverList: [],
      escortList: [],
      tableData: []
    };
  },
  methods: {
    init: function () {
      this.searchList();
      this.getGroups();
      this.getSemiList();
      this.getDriverList();
      this.getEscortList();
    },
    importList: function() {},
    exportList: function() {},
    getGroups: function() {
      this.$$http('getGroups').then(results => {
        if (results.data.code === 0) {
          this.selectData.groupOptions = [{
            id: '',
            group_name: '全部'
          }];
          this.groupList = results.data.data.results;
          results.data.data.results.map((n, i) => {
            this.selectData.groupOptions.push(n);
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    getSemiList: function() {
      this.$$http('searchTailCarList', { pagination: false }).then((result) => {
        if (result.data.code == 0) {
          // this.semiList = result.data.data.results;
          result.data.data.map(((n, i) => {
            this.semiList.push({
              id: n.id,
              value: n.plate_number
            })
          }));
        }
      }).catch(function(error) {
        console.log(error);
      });
    },
    getDriverList: function() {
      let param1 = {
        work_type: 'DRIVER',
        pagination: false
      };
      let param2 = {
        work_type: 'DRIVER_ESCORT',
        pagination: false
      };
      let req1 = this.$$http('getDriversList', param1);
      let req2 = this.$$http('getDriversList', param2);
      Promise.all([req1, req2]).then(results => {
        if (results[0].data.code === 0 && results[1].data.code === 0) {
          results.map((res, i) => {
            res.data.data.map((n, i) => {
              this.driverList.push({
                id: n.id,
                value: n.name
              });
            });
          });
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getEscortList: function() {
      this.$$http('getDriversList', { work_type: 'ESCORT', pagination: false }).then(result => {
        if (result.data.code == 0) {
          result.data.data.map((n, i) => {
            this.escortList.push({
              id: n.id,
              value: n.name
            });
          });
        }
      }).catch(function(error) {
        console.log(error);
      });
    },
    searchList: function() {
      var vm = this;
      if (this.filterParam.field) {
        this.filterParam[this.filterParam.field] = this.filterParam.keyword;
      } else {
        this.filterParam.tractor_plate_number = '';
        this.filterParam.semitrailer_plate_number = '';
        this.filterParam.car_belong_phone = '';
        this.filterParam.driver_staff_name = '';
      }
      this.$$http("searchCapacityList", this.filterParam)
        .then(function(result) {
          var resultData;
          if (result.data.code == 0) {
            vm.tableData = result.data.data.results;
            vm.pageData.totalPage = Math.ceil(
              result.data.data.count / vm.pageData.pageSize
            );
            vm.tableData.map((n, i) => {
              for(let key in n) {
                if (key === 'truck_bind_status' || key === 'staff_bind_status') {
                  n[key] = n[key] ? '已绑定' : '未绑定';
                }
                if (key === 'complete_status') {
                  n[key] = n[key] ? '已完善' : '未完善';
                }
              }
            });
            vm.pageLoading = false;
          }
        })
        .catch(function(error) {
          vm.pageLoading = false;
        });
    },
    filterSearch: function() {
      this.filterParam.page = 1;
      this.searchList();
    },
    jumpPage: function(scope) {
      if (scope.operator == "edit") {} else if (scope.operator == "show") {
        this.$router.push({
          path: "/transportPowerManage/capacityManage/capacityDetail?capacityId=" +
            scope.rowData.id
        });
      } else if (scope.operator == "operation") {}
    },
    pageChange: function() {
      setTimeout(() => {
        this.filterParam.page = this.pageData.currentPage;
        this.searchList();
      });
    },
    bindTruck: function(row) {
      this.bindTruckFormVisible = true;
      this.truckDialog = {
        capacityId: row.rowData.id,
        truckNum: row.rowData.tractor.plate_number,
        semitrailer: '',
        car_belong_phone: '',
        group: ''
      }
    },
    bindStaff: function(row) {
      this.bindStaffFormVisible = true;
      this.staffDialog = {
        capacityId: row.rowData.id,
        truckNum: row.rowData.tractor.plate_number,
        semiNum: row.rowData.semitrailer.plate_number,
        master_driver: '',
        vice_driver: '',
        escort_staff: ''
      }
    },
    openFormDialog: function(dialog) {
      // setTimeout(() => {
      //   this.$refs[dialog].resetFields();
      // }, 500);
    },
    closeFormDialog: function(dialog) {
      this.truckNotice = false;
      this.staffNotice = false;
      this.$refs[dialog].resetFields();
    },
    submitTruckForm: function() {
      this.$refs.truckDialog.validate((isValid, unvailidField) => {
        if (isValid) {
          let send = {
            id: this.truckDialog.capacityId,
            semitrailer: this.truckDialog.semitrailer,
            car_belong_phone: this.truckDialog.car_belong_phone,
            group: this.truckDialog.group
          }
          this.$$http('bindTruck', send).then((results) => {
            if (results.data.code === 0) {
              this.$message({
                message: '绑定成功',
                type: 'success'
              });
              this.bindTruckFormVisible = false;
              this.searchList();
            } else if (results.data.code === 600) {
              this.truckNotice = true;
              this.truckDialog.noticeMsg = results.data.msg.split(',')[1];
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    },
    submitStaffForm: function() {
      this.$refs.staffDialog.validate((isValid, unvailidField) => {
        if (isValid) {
          let send = {
            id: this.staffDialog.capacityId,
            master_driver: this.staffDialog.master_driver,
            vice_driver: this.staffDialog.vice_driver,
            escort_staff: this.staffDialog.escort_staff
          }
          this.$$http('bindStaff', send).then((results) => {
            if (results.data.code === 0) {
              this.$message({
                message: '绑定成功',
                type: 'success'
              });
              this.bindStaffFormVisible = false;
              this.searchList();
            } else if (results.data.code === 600) {
              this.staffNotice = true;
              this.staffDialog.noticeMsg = results.data.msg;
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      });
    },
    forceSubmitTruckForm: function() {
      let send = {
        id: this.truckDialog.capacityId,
        semitrailer: this.truckDialog.semitrailer,
        car_belong_phone: this.truckDialog.car_belong_phone,
        group: this.truckDialog.group
      }
      this.$$http('forceBindTruck', send).then((results) => {
        if (results.data.code === 0) {
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
          this.bindTruckFormVisible = false;
          this.truckNotice = false;
          this.searchList();
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    forceSubmitStaffForm: function() {
      let send = {
        id: this.staffDialog.capacityId,
        master_driver: this.staffDialog.master_driver,
        vice_driver: this.staffDialog.vice_driver,
        escort_staff: this.staffDialog.escort_staff
      }
      this.$$http('forceBindStaff', send).then((results) => {
        if (results.data.code === 0) {
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
          this.bindStaffFormVisible = false;
          this.staffNotice = false;
          this.searchList();
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    backTruckForm: function() {
      this.truckNotice = false;
    },
    backStaffForm: function() {
      this.staffNotice = false;
    }
  },
  activated: function() {
    this.init();
  }
};

</script>
