<style scoped lang="less">
.setting {
  .setting-content {
    .nav-tab-setting {
      .department-list {
        padding-bottom: 0;
        .el-menu {
          margin-bottom: 0;
        }
      }
    }
  }
}

</style>
<template>
  <div class="setting">
    <div class="nav-tab" v-if="false">
      <div class="tab-screen">
        <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
          <el-row>
            <el-col :span="12">
              <el-input placeholder="请输入" v-model="searchFilters.keyword" class="search-filters-screen">
                <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
                  <el-option v-for="(item,key) in selectData.fieldSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="setting-content">
      <el-row :gutter="22">
        <el-col :span="5">
          <div class="nav-tab-setting">
            <div class="add-user-btn">
              <el-button type="success" size="medium" @click="staffsDialog('add')">新增员工</el-button>
            </div>
            <el-tabs v-model="departmentActive">
              <el-tab-pane label="部门" name="department">
                <div class="department-list">
                  <el-menu :default-active="active" class="el-menu-vertical-demo" v-loading="departmentLoading">
                    <el-menu-item v-for="(item,key) in departmentTableData" v-on:click="getPositionList(item.id,key)" :index="key.toString()" :key="key">
                      <i class="tab-icon"></i>
                      <span slot="title">{{item.department_name}}</span>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="nav-tab-setting nav-tab-width">
            <el-tabs v-model="staffsActive" @tab-click="staffClick">
              <el-tab-pane v-for="(item,key) in positionTableData" :key="key" :label="item.position_name" :name="item.id">
                <div class="position-list">
                  <div class="staff-radio">
                    <el-radio v-model="isValid" label="1" @change="getStaffsList(currentDepartmentId,currentPositionId,'True',true)">有效</el-radio>
                    <el-radio v-model="isValid" label="2" @change="getStaffsList(currentDepartmentId,currentPositionId,'False',true)">已注销</el-radio>
                  </div>
                  <div class="table-list">

                    <el-table :data="staffsTableData" stripe style="width: 100%" size="mini" v-loading="staffLoading" :class="{'tabal-height-500':!staffsTableData.length}">
                      <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      </el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <div v-if="scope.row.is_active">
                            <el-button type="primary" size="mini" @click="staffsDialog('update',scope.row)">修改</el-button>
                            <el-button type="primary" size="mini" plain @click="isDeletdStaffOp(scope.row, 'False')">注销</el-button>
                          </div>
                          <div v-if="!scope.row.is_active">
                            <el-button type="primary" size="mini" plain @click="isDeletdStaffOp(scope.row, 'True')">启用</el-button>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    <no-data v-if="!staffLoading && !staffsTableData.length"></no-data>
                    <div class="page-list text-center">
                      <el-pagination background layout="prev, pager, next, jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
                      </el-pagination>
                    </div>
                  </div>
                </div>

              </el-tab-pane>
            </el-tabs>
            <div class="user-no-data" v-if="!positionTableData.length&&!staffLoading">
              <no-data v-if="!staffLoading && !positionTableData.length"></no-data>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <staff-dialog :staff-dialog="staffDialog" :department-list="departmentTableData" :staff-row="staffRow" v-on:closeDialogBtn="closeDialog"></staff-dialog>
  </div>
</template>
<script>
import staffDialog from '../../components/setting/staffDialog';
export default {
  name: 'personListManage',
  components: {
    staffDialog: staffDialog
  },
  data() {
    return {
      departmentLoading: true, //部门列表loading
      staffLoading: false, //员工列表loading
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10
      },
      staffDialog: {
        isShow: false,
        type: 'add'
      }, //员工弹窗bialog
      isValid: '1',
      departmentActive: 'department',
      staffsActive: '',
      searchFilters: {
        employmentType: '',
        isBind: '',
        keyword: '',
        field: 'name',
      },
      selectData: {
        fieldSelect: [
          { id: 'name', value: '职位' },
          { id: 'mobile_phone', value: '部门' },
        ]
      },
      thTableList: [{
        title: '手机号码',
        param: 'mobile_number',
        width: ''
      }, {
        title: '用户名',
        param: 'nick_name',
        width: ''
      }, {
        title: '部门',
        param: 'department',
        param_two: '',
        width: ''
      }, {
        title: '职位',
        param: 'position',
        param_two: '',
        width: ''
      }],
      departmentTableData: [], //部门列表
      positionTableData: [], //职位列表
      staffsTableData: [], //员工列表
      tableData: [],
      active: '0',
      currentDepartmentId: '',
      currentPositionId: '',
      staffRow: {} //编辑信息
    }
  },
  methods: {
    staffsDialog: function(operation, row) {
      this.staffDialog.isShow = true;
      this.staffDialog.type = operation;
      // this.departmentRow = this.departmentTableData[this.active];
      if (operation === 'update') {
        this.staffRow = row;
      }
    },
    closeDialog: function(isSave) {
      this.staffDialog.isShow = false;
      if (isSave) {
        this.getPositionList(this.currentDepartmentId, this.active); //职位列表
      }

    },
    pageChange() {
      setTimeout(() => {
        this.getStaffsList(this.currentDepartmentId, this.currentPositionId, this.isValid === '1' ? 'True' : 'False')
      })
    },
    // 获取部门列表
    getDepartmentList: function() {
      this.departmentLoading = true;
      this.$$http('getDepartmentList', { need_all: true }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.departmentTableData = results.data.data;
          this.active = '0';
          this.departmentLoading = false;
          if (this.departmentTableData.length) {
            this.currentDepartmentId = this.departmentTableData[0].id;
            this.getPositionList(this.departmentTableData[0].id, this.active)
          }

        }
      }).catch((err) => {
        this.departmentLoading = false;
        this.$message.error('获取部门列表失败');
      })
    },

    // 获取职位列表
    getPositionList: function(departmentId, index) {
      this.isValid = '1';
      let postData = {
        need_all: true,
        department: departmentId
      }
      this.currentDepartmentId = departmentId;
      this.active = index.toString();
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data;
          if (this.positionTableData.length) {
            this.staffsActive = this.positionTableData[0].id;
            this.currentPositionId = this.positionTableData[0].id;
            this.getStaffsList(departmentId, this.currentPositionId, 'True', true);
          }
        }
      }).catch((err) => {
        this.$message.error('获取职位列表失败');
      })
    },
    // 获取员工列表
    getStaffsList: function(departmentId, positionId, isDeletd, isReset) {
      if (isReset) {
        this.pageData.currentPage = 1;
      }
      let postData = {
        department: departmentId,
        is_active: isDeletd,
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        position: positionId
      };
      this.staffLoading = true;
      this.$$http('getStaffs', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.staffsTableData = results.data.data.data;
          this.staffLoading = false;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.staffLoading = false;
        this.$message.error('获取员工列表失败');
      })
    },
    // 注销 激活员工
    isDeletdStaff: function(row, isDeletd) {
      let postData = {
        position: row.position_id,
        is_active: isDeletd,
        id: row.id
      }
      this.isValid = isDeletd === 'True' ? '1' : '2';
      this.$$http('updateStaff', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.$message({
            message: isDeletd ? '员工注销成功' : '员工启用成功',
            type: 'success'
          });
          this.pageData.currentPage = 1;
          this.getStaffsList(this.currentDepartmentId, this.currentPositionId, isDeletd)
        }
      }).catch((err) => {
        this.$message.error(isDeletd ? '员工注销失败' : '员工启用失败');
      })
    },
    //
    isDeletdStaffOp: function(row, isDeleted) {
      if (isDeleted) {
        this.$confirm("确定注销该员工？注销后可在“已注销”中找回。", "注销员工", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.isDeletdStaff(row, isDeleted);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消注销员工'
            });
          });
      } else {
        this.$confirm("确定启用该员工？启用后该员工回到启用前的职位中，并可获得原有系统操作权限", "启用员工", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.isDeletdStaff(row, isDeleted);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消启用员工'
            });
          });
      }

    },
    staffClick: function(tab, event) {
      this.currentPositionId = tab.name;
      this.isValid = '1';
      this.getStaffsList(this.currentDepartmentId, tab.name, 'True', true)
    },


  },
  created: function() {
    this.getDepartmentList(); //部门列表
  }

}

</script>
