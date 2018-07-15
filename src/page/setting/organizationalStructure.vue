<!-- organizationalStructureList.vue -->
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
            <el-tabs v-model="departmentActive" @tab-click="handleClick">
              <el-tab-pane label="部门" name="department">
                <div class="department-list">
                  <el-menu :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-loading="departmentLoading">
                    <el-menu-item v-for="(item,key) in departmentTableData" v-on:click="getPositionList(item,key)" :index="key.toString()" :key="key">
                      <i class="tab-icon"></i>
                      <span slot="title">{{item.department_name}}</span>
                    </el-menu-item>
                  </el-menu>
                  <div class="text-center department-btn">
                    <el-button type="primary" plain size="medium" @click="organizationDialog('department','update')">编辑部门</el-button>
                    <el-button type="primary" size="medium" @click="organizationDialog('department','add')">新增部门</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="add-user-btn">
            <el-button type="success" size="medium" @click="organizationDialog('position','add')">新增职位</el-button>
          </div>
          <div class="nav-tab-setting nav-tab-mt">
            <div class="position-list">
              <div class="table-list">
                <el-table :data="positionTableData" stripe style="width: 100%" size="mini" v-loading="positionLoading" :class="{'tabal-height-500':!positionTableData.length}">
                  <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                    <template slot-scope="scope">
                      <div v-if="item.param==='position_name'">{{scope.row.position_name}}</div>
                      <div v-if="item.param==='work_type'">
                        <router-link class="text-blur" :to="{path: '/setting/powerManage', query: { departmentId: scope.row.department.id, positionId:scope.row.id}}">权限设置</router-link>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" @click="organizationDialog('position','update',scope.row)">编辑</el-button>
                      <el-button type="primary" size="mini" plain @click="deletePosition(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <no-data v-if="!positionLoading && !positionTableData.length"></no-data>
                <div class="page-list text-center">
                  <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" @size-change="pageChange" v-if="!positionLoading && pageData.totalCount>pageData.pageSize">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <department-dialog :department-dialog="departmentDialog" :department-row="departmentRow" v-on:closeDialogBtn="closeDialog"></department-dialog>
    <position-dialog :position-dialog="positionDialog" :department-row="departmentRow" :position-row="positionRow" v-on:closeDialogBtn="closeDialog"></position-dialog>
  </div>
</template>
<script>
import departmentDialog from '../../components/setting/departmentDialog';
import positionDialog from '../../components/setting/positionDialog';
export default {
  name: 'personListManage',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  components: {
    departmentDialog: departmentDialog,
    positionDialog: positionDialog
  },
  data() {
    return {
      positionLoading: true, //职位列表loading
      departmentLoading: true, //部门列表loading
      positionDialog: {
        isShow: false,
        type: 'add'
      }, //职位弹窗bialog
      departmentDialog: {
        isShow: false,
        type: 'add'
      }, //部门弹窗bialog
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10
      },
      active: '0',
      departmentActive: 'department',
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
        title: '职位名称',
        param: 'position_name',
        width: ''
      }, {
        title: '职位权限',
        param: 'work_type',
        width: ''
      }],
      departmentTableData: [], //部门列表
      positionTableData: [], //职位列表
      departmentRow: {}, //当前所选部门
      positionRow: {}, //当前所选部门
    }

  },
  methods: {

    /**
     * organizationDialog  显示部门、职位弹窗
     * @param  {string} typeDialog  [必填][展示弹窗类型（department部门，position职位）]
     * @param  {string} operation   [必填][是否编辑或者新增（add新增，update编辑）]
     * @param  {string} row   [非必填][修改的职位信息]
     * @return {[type]}
     */
    organizationDialog: function(typeDialog, operation, row) {

      if (typeDialog === 'department') {
        this.departmentDialog.isShow = true;
        this.departmentDialog.type = operation;
        if (operation === 'update') {
          if (this.departmentTableData.length) {
            this.departmentRow = this.departmentTableData[this.active];
          }
        }
      } else if (typeDialog === 'position') {
        this.positionDialog.isShow = true;
        this.positionDialog.type = operation;
        this.departmentRow = this.departmentTableData[this.active];
        if (operation === 'update') {
          this.positionRow = row
          // if (this.positionTableData.length) {
          //   this.positionRow = this.positionTableData[this.active];
          // }
        }
      }
    },
    closeDialog: function(type, isSave) {
      if (type === 'department') {
        this.departmentDialog.isShow = false;
        if (isSave) {
          this.getDepartmentList(); //部门列表
        }
      } else if (type === 'position') {
        this.positionDialog.isShow = false;
        if (isSave) {
          this.getPositionList(this.departmentRow, this.active); //职位列表
        }
      }
    },
    // 获取部门列表
    getDepartmentList: function() {
      this.departmentLoading = true;
      this.$$http('getDepartmentList', {need_all:true}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.departmentTableData = results.data.data;
          this.active = '0';
          this.departmentLoading = false;
          if (this.departmentTableData.length) {
            this.departmentRow = this.departmentTableData[0];
            this.getPositionList(this.departmentTableData[0], this.active)
          }

        }
      }).catch((err) => {
        this.departmentLoading = false;
        this.$message.error('获取部门列表失败');
      })
    },
    // 获取职位列表
    getPositionList: function(departmentInfo, index) {
      this.departmentRow = departmentInfo;
      if (index != this.active) {
        this.pageData.currentPage = 1;
      }
      let postData = {
        page: this.pageData.currentPage,
        page_size:this.pageData.pageSize,
        department: departmentInfo.id
      }
      this.positionLoading = true;
      this.active = index.toString();
      this.$$http('getPositionList', postData).then((results) => {
        this.positionLoading = false;
        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.positionLoading = false;
        this.$message.error('获取职位列表失败');
      })
    },
    deletePosition: function(id) {
      this.$confirm("确定删除该职位?", "删除职位", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$$http('deletePosition', { id: id }).then((results) => {
            if (results.data && results.data.code == 0) {
              this.$message({
                message: '删除职位成功',
                type: 'success'
              });
              this.pageData.currentPage = 1;
              this.getPositionList(this.departmentRow, this.active); //职位列表
            }
          }).catch((err) => {
            this.$message.error('删除职位失败');
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    handleClick: function(tab, event) {

    },
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    },
    pageChange: function() {
      setTimeout(() => {
        this.getPositionList(this.departmentRow, this.active);
      })
    }

  },
  created: function() {
    this.getDepartmentList(); //部门列表
  }

}

</script>
<style scoped lang="less">


</style>
