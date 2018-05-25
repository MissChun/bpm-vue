<!-- powerManage.vue -->
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
            <el-tabs v-model="departmentActive">
              <el-tab-pane label="部门" name="department">
                <div class="department-list">
                  <el-menu :default-active="active" class="el-menu-vertical-demo" v-loading="departmentLoading">
                    <el-menu-item v-for="(item,key) in departmentTableData" v-on:click="getPositionList(item.id,key)" :index="key.toString()" :key="key">
                      <i class="tab-icon"></i>
                      <span slot="title">{{item.group_name}}</span>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="nav-tab-setting nav-tab-power">
            <el-tabs v-model="powerActive" @tab-click="powerClick">
              <el-tab-pane v-for="(item,key) in positionTableData" :key="key" :label="item.role_name" :name="item.id">
                <div class="position-list table-list">
                  <div class="staff-radio text-right">
                    <el-button type="primary" size="medium" @click="setPower">保存</el-button>
                    <el-button size="medium" @click="cancel" v-if="selectMenusCopy.length||selectMenus.length">取消</el-button>
                  </div>
                  <el-table :data="permissionsTableData" border style="width: 100%" size="mini" v-loading="permissionsLoading">
                    <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title">
                      <template slot-scope="scope">
                        <div v-if="item.param ==='menu_name'">{{scope.row.menu_name}}</div>
                        <div v-if="item.param ==='menu'">
                          <dl>
                            <dt v-for="(item,key) in scope.row.second_menus">
                              {{item.menu_name}}
                            </dt>
                          </dl>
                        </div>
                        <div v-if="item.param==='desc'">{{}}</div>
                        <div v-if="item.param==='desc'">{{}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="450">
                      <template slot-scope="scope">
                        <dl class="power-op">
                          <dt v-for="(item,key) in scope.row.second_menus">
                            <el-checkbox-group v-model="selectMenus">
                              <el-checkbox v-for="(itemThird,index) in item.third_menus" :label="itemThird.id" :key="index">{{itemThird.menu_name}}</el-checkbox>
                            </el-checkbox-group>
                          </dt>
                        </dl>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page-list text-center">
                    <el-pagination background layout="prev, pager, next" :total="pageData.totalPage" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalPage>1">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="user-no-data text-center text-stance" v-if="!positionTableData.length&&!permissionsLoading">
              暂无数据
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'personListManage',
  computed: {
    employmentTypeSelect: function() {
      return this.$store.getters.getIncludeAllSelect.carrier_driver_work_type;
    }
  },
  data() {
    return {
      departmentLoading: true, //部门列表loading
      permissionsLoading: false, //权限列表loading
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalPage: '',
        pageSize: 10
      },
      staffDialog: {
        isShow: false,
        type: 'add'
      }, //员工弹窗bialog
      isValid: '1',
      departmentActive: 'department',
      powerActive: '',
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
        title: '功能模块',
        param: 'menu_name',
        width: ''
      }, {
        title: '子功能',
        param: 'menu',
        width: ''
      }, {
        title: '说明',
        param: 'department',
        width: ''
      }],
      departmentTableData: [], //部门列表
      positionTableData: [], //职位列表
      permissionsTableData: [], //员工列表
      active: '0',
      currentDepartmentId: '',
      currentPositionId: '',
      staffRow: {}, //编辑信息
      selectMenus: [],
      selectMenusCopy: [],
      currentPositionName: '',
      positionDetailMenus: {}
    }
  },
  methods: {
    // 获取部门列表
    getDepartmentList: function() {
      this.departmentLoading = true;
      this.$$http('getDepartmentList', { pagination: false }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.departmentTableData = results.data.data;
          this.active = '0';
          this.departmentLoading = false;
          if (this.departmentTableData.length) {
            if (this.$route.query.departmentId && this.$route.query.positionId) {
              for (let i in this.departmentTableData) {
                if (this.departmentTableData[i].id === this.$route.query.departmentId) {
                  this.active = (i++).toString();
                }
              }
              this.getPositionList(this.$route.query.departmentId, this.active)
            } else {
              this.getPositionList(this.departmentTableData[0].id, this.active)
            }

          }

        }
      }).catch((err) => {
        this.departmentLoading = false;
        this.$message.error('获取部门列表失败');
      })
    },
    // 获取职位列表
    getPositionList: function(departmentId, index) {
      let postData = {
        pagination: false,
        department: departmentId
      }
      this.currentDepartmentId = departmentId;
      this.positionLoading = true;
      this.isValid = '1';
      this.active = index.toString();
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.positionTableData = results.data.data;
          this.positionLoading = false;
          if (this.positionTableData.length) {
            if (this.$route.query.departmentId && this.$route.query.positionId) {
              this.powerActive = this.$route.query.positionId;
              this.currentPositionId = this.$route.query.positionId;
            } else {
              this.powerActive = this.positionTableData[0].id;
              this.currentPositionId = this.positionTableData[0].id;
            }
            this.getPositionDetail();
          }

        }
      }).catch((err) => {
        this.positionLoading = false;
        this.$message.error('获取职位列表失败');
      })
    },
    // 获取权限列表
    getPermissionsList: function() {
      this.permissionsLoading = true;
      this.$$http('getPermissionsList', {}).then((results) => {
        if (results.data && results.data.code == 0) {
          this.permissionsTableData = results.data.data;
          this.permissionsLoading = false;
        }
      }).catch((err) => {
        this.permissionsLoading = false;
        this.$message.error('获取权限列表失败');
      })
    },
    powerClick: function(tab, event) {
      console.log('职位', tab, event);
      this.currentPositionId = tab.name;
      this.currentPositionName = tab.label;
      this.getPositionDetail();
    },
    // 获取职位详情
    getPositionDetail: function() {
      this.$$http('getPositionDetail', { id: this.currentPositionId }).then((results) => {
        if (results.data && results.data.code == 0) {
          console.log('getPositionDetail', results.data);
          this.currentPositionName = results.data.data.role_name;
          this.selectMenus = [];
          this.positionDetailMenus = results.data.data.menus;
          for (let i in this.positionDetailMenus) {
            for (let j in this.positionDetailMenus[i].second_menus) {
              if (this.positionDetailMenus[i].second_menus[j].third_menus.length) {
                for (let z in this.positionDetailMenus[i].second_menus[j].third_menus) {
                  this.selectMenus.push(this.positionDetailMenus[i].second_menus[j].third_menus[z].id);
                }
              }

            }
          }
          this.selectMenusCopy = this.selectMenus;
          console.log('this.selectMenus', this.selectMenus);

        }
      }).catch((err) => {})
    },
    cancel: function() {
      let iSidentical = this.selectMenus.concat(this.selectMenusCopy).filter(v => !this.selectMenus.includes(v) || !this.selectMenusCopy.includes(v))
      if (iSidentical.length) {
        this.$confirm("确认后将取消本次针对“" + this.currentPositionName + "”的权限修改内容", "取消修改", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.selectMenus = this.selectMenusCopy;
            this.$message({
              message: '取消成功，本次修改内容没有保存',
              type: 'success'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消修改权限'
            });
          });
      } else {
        this.$message({
          message: '没有可以取消的修改内容',
          type: 'warning'
        });

      }
    },
    setPower: function() {
      let iSidentical = this.selectMenus.concat(this.selectMenusCopy).filter(v => !this.selectMenus.includes(v) || !this.selectMenusCopy.includes(v))
      if (iSidentical.length) {


        if (this.selectMenus.length) {
          this.$confirm("确定要保存针对“" + this.currentPositionName + "”的权限修改内容？通过后该职位下的员工将拥有所选权限", "保存权限设置", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              let postData = {
                carrier_role_id: this.currentPositionId,
                menus: this.selectMenus
              }
              this.$$http('updatePosition', postData).then((results) => {
                if (results.data && results.data.code == 0) {
                  this.selectMenusCopy = this.selectMenus;
                  this.$message({
                    message: '更改权限设置成功',
                    type: 'success'
                  });
                }
              }).catch((err) => {

                this.$message.error('修改权限失败');
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消修改权限'
              });
            });

        } else {
          this.$message({
            message: '请勾选权限',
            type: 'warning'
          });
        }
      } else {
        this.$message({
          message: '没有新增可以修改的权限',
          type: 'warning'
        });
      }
    },

  },
  created: function() {
    this.getDepartmentList(); //部门列表
    this.getPermissionsList();
  }

}

</script>
<style scoped lang="less">


</style>
