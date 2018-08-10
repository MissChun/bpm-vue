<style type="text/css" scoped lang="less">
.nav-tab-setting {
  position: relative;
  .business-btn {
    right: 0;
    position: absolute;
    top: -15px;
    z-index: 2;
  }
  .operation-btn-list {
    span+span {
      margin-left: 10px;
    }
  }
}

</style>
<template>
  <div>
    <div class="nav-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in tabList" :label="item.title+'('+item.num+')'" :name="item.key" :key="index">
          <div class="tab-screen">
            <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
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
                  <el-form-item label="计划到站日期:" label-width="105px">
                    <el-date-picker v-model="planArriveTime" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下计划日期:" label-width="105px">
                    <el-date-picker v-model="createdAt" type="datetimerange" @change="startSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务单分配:" label-width="105px">
                    <el-select v-model="searchFilters.order_assign" @change="startSearch" placeholder="请选择">
                      <el-option v-for="(item,key) in selectData.distributionSelect" :key="key" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <div class="nav-tab-setting mt-25">
        <div class="business-btn">
          <el-button type="primary" @click="batchDistributionBtn" v-if="activeName==='relation'&&isToExamine">批量分配</el-button>
          <el-button type="primary" plain :disabled="exportBtn.isDisabled" :loading="exportBtn.isLoading" @click="exportData">{{exportBtn.text}}</el-button>
        </div>
        <el-tabs v-model="statusActive" @tab-click="statusClick">
          <el-tab-pane v-for="(tab,key) in statusTabList" :key="key" :label="tab.title+'('+tab.num+')'" :name="tab.key">
            <div class="table-list">
              <el-table :data="tableData" stripe style="width: 100%" size="mini" v-loading="pageLoading" @selection-change="handleSelectionChange" :class="{'tabal-height-500':!tableData.length}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column v-for="(item,key) in thTableList" :key="key" :prop="item.param" align="center" :label="item.title" :width="item.width?item.width:140">
                  <template slot-scope="scope">
                    <div v-if="item.param === 'order_number'" class="order-color">
                      <router-link v-if="detailLink" :to="{path: detailLink, query: { id: scope.row.id }}">{{scope.row.order_number}}</router-link>
                      <span v-else>{{scope.row.order_number}}</span>
                    </div>
                    <div v-else>
                      <span v-if="item.param_two">{{scope.row[item.param][item.param_two]}}</span>
                      <span v-else>{{scope.row[item.param]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="190" fixed="right">
                  <template slot-scope="scope">
                    <div class="operation-btn-list">
                      <span v-if="isShowBtn(statusActive)||isShowBtn(scope.row.status)">
                        <el-button type="danger" plain size="mini" @click="refuse('create_department_check',scope.row.id)">拒绝</el-button>
                        <el-button type="primary" plain size="mini" @click="adopt('create_department_check',scope.row.id)">通过</el-button>
                      </span>
                      <span v-if="activeName==='relation'||scope.row.status==='waiting_related'||scope.row.status==='waiting_confirm'">
                        <el-button type="primary" plain size="mini" v-if="scope.row.order_assign.key==='own'" @click="singleBtn(false,'third',scope.row.id)">转为三方</el-button>
                        <el-button type="primary" size="mini" v-if="scope.row.order_assign.key==='third'" @click="singleBtn(false,'own',scope.row.id)">转为自有</el-button>
                      </span>
                      <span>
                        <el-button type="primary" size="mini" @click="checkLink(scope.row)">查看</el-button>
                      </span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <no-data v-if="!pageLoading && !tableData.length"></no-data>
            </div>
            <div class="page-list text-center">
              <el-pagination background layout="prev, pager, next,jumper" :total="pageData.totalCount" :page-size="pageData.pageSize" :current-page.sync="pageData.currentPage" @current-change="pageChange" v-if="!pageLoading && pageData.totalCount>pageData.pageSize">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="批量分配" :visible.sync="distributionDialog" width="30%" center>
      <div>
        <span>请确认将勾选的业务单分配为：</span>
        <div class="text-center mt-25">
          <el-radio v-model="distribution" label="own">自有</el-radio>
          <el-radio v-model="distribution" label="third">三方</el-radio>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributionDialog = false">取 消</el-button>
        <el-button type="primary" @click="batchDistribution(true,distribution)" :disabled="sureBtn.isDisabled" :loading="sureBtn.isLoading">确 定</el-button>
      </span>
    </el-dialog>
    <refuse-dialog :refuse-dialog="refuseDialog" v-on:closeDialogBtn="closeDialog" :title="refuseTitle"></refuse-dialog>
  </div>
</template>
<script>
import refuseDialog from '@/components/businessManage/refuseDialog';
export default {
  name: 'tradeBusinessList',
  props: ['detailLink', 'isToExamine'],
  computed: {
    // statusTabList(){
    //   return this.tabList[0].tabs;
    // }
  },
  components: {
    refuseDialog: refuseDialog
  },
  data() {
    return {
      refuseTitle: '',
      refuseDialog: {
        isShow: false,
        id: ''
      },
      exportBtn: {
        text: '导出',
        isLoading: false,
        isDisabled: false,
      },
      distribution: 'own',
      distributionDialog: false, //分配弹窗
      pageLoading: false,
      pageData: {
        currentPage: 1,
        totalCount: '',
        pageSize: 10,
      },
      activeName: this.$route.query.tabClassifyStatus ? this.$route.query.tabClassifyStatus : 'all_new',
      statusActive: this.$route.query.businessStatus ? this.$route.query.businessStatus : 'create_department_check',
      planArriveTime: this.$route.query.planArriveTime ? (this.$route.query.planArriveTime).split(',') : [], //计划到站时间
      createdAt: [], //下计划日期
      searchPostData: {}, //搜索参数
      searchFilters: {
        order_assign: '',
        created_at: '',
        keyword: '',
        field: 'consumer_name',
      },
      tabList: [{
        title: '新增',
        key: 'all_new',
        num: '',
        tabs: [{
          title: '部门审批中',
          key: 'create_department_check',
          num: '',
        }, {
          title: '经理审批中',
          key: 'create_manager_check',
          num: '',
        }]
      }, {
        title: '关联',
        key: 'all_match',
        num: '',
        tabs: [{
          title: '待关联',
          key: 'waiting_related',
          num: '',
        }, {
          title: '待确认',
          key: 'waiting_confirm',
          num: '',
        }]
      }, {
        title: '卸货',
        key: 'all_unload',
        num: '',
        tabs: [{
          title: '前往卸货地',
          key: 'to_site',
          num: '',
        }, {
          title: '已卸货',
          key: 'unloading',
          num: '',
        }]
      }, {
        title: '结算',
        key: 'all_settlement',
        num: '',
        tabs: [{
          title: '结算中',
          key: 'in_settlement',
          num: '',
        }, {
          title: '审批中',
          key: 'settlement_check',
          num: '',
        }]
      }, {
        title: '修改/取消',
        key: 'all_change',
        num: '',
        tabs: [{
          title: '修改经理审批',
          key: 'modify_manager_check',
          num: '',
        }, {
          title: '修改部门审批',
          key: 'modify_department_check',
          num: '',
        }, {
          title: '取消部门审批',
          key: 'cancel_check',
          num: '',
        }]
      }, {
        title: '历史',
        key: 'all_finish',
        num: '',
        tabs: [{
          title: '已取消',
          key: 'canceled',
          num: '',
        }, {
          title: '已完成',
          key: 'finished',
          num: '',
        }, {
          title: '新增经理拒绝',
          key: 'manager_check_refused',
          num: '',
        }, {
          title: '新增部门拒绝',
          key: 'department_check_refused',
          num: '',
        }]
      }, {
        title: '全部',
        key: 'all_count',
        num: '',
        tabs: [{
          title: '全部',
          key: 'all',
          num: '',
        }]
      }],
      // statusTabList: [{ // title: '部门审批中', // key: 'create_department_check', // }, { // title: '经理审批中', // key: 'create_manager_check', // }],

      statusTabList: [],
      selectData: {
        distributionSelect: [
          { id: '', value: '全部' },
          { id: 'third', value: '三方' },
          { id: 'own', value: '自有' }
        ],
        fieldSelect: [
          { id: 'consumer_name', value: '客户名称' },
          { id: 'short_name', value: '客户简称' },
          { id: 'order_number', value: '业务单号' },
          { id: 'supplier', value: '供应商' },
          { id: 'payer_name', value: '付款方' },
          { id: 'sale_man_name', value: '下单人' },
        ]
      },
      thTableList: [{
          title: '业务单号',
          param: 'order_number',
          width: ''
        }, {
          title: '业务单类',
          param: 'business_type_name',
          width: ''
        }, {
          title: '业务单分配',
          param: 'order_assign',
          param_two: 'verbose',
          width: ''
        },
        //  {
        //   title: '供应商',
        //   param: 'company',
        //   param_two: 'supplier',
        //   width: '300'
        // }, {
        //   title: '承运商',
        //   param: 'company',
        //   param_two: 'carrier',
        //   width: '200'
        // },
        {
          title: '客户名称',
          param: 'consumer_name',
          width: '200'
        }, {
          title: '客户简称',
          param: 'short_name',
          width: ''
        }, {
          title: '付款方',
          param: 'payer_name',
          width: '200'
        }, {
          title: '卸货站',
          param: 'station',
          width: ''
        }, {
          title: '站点类型',
          param: 'station_type',
          width: ''
        }, {
          title: '实际液厂',
          param: 'actual_fluid_name',
          width: ''
        }, {
          title: '计划吨位',
          param: 'plan_tonnage',
          width: ''
        }, {
          title: '单价',
          param: 'unit_price',
          width: ''
        }, {
          title: '计划到站时间',
          param: 'plan_arrive_time',
          width: '200'
        }, {
          title: '下计划时间',
          param: 'created_at',
          width: '200'
        }, {
          title: '状态',
          param: 'status_display',
          width: '200'
        }, {
          title: '下单人',
          param: 'sale_name',
          width: ''
        }
      ],
      tableData: [],
      multipleSelection: [], //全选
      sureBtn: {
        isDisabled: false,
        isLoading: false
      },
      exportPostData: {}, //导出参数
      tabs: [],
      tabNumPostData: {}
    }
  },
  methods: {
    checkLink(row) {
      this.$router.push({ path: this.detailLink, query: { id: row.id } });
    },
    getTabs(isSwitch) {
      return new Promise((resolve, reject) => {
        for (let i in this.tabNumPostData) {
          if (i === 'page' || i === 'page_size') {
            delete this.tabNumPostData[i];
          }
        }
        let postData = this.tabNumPostData
        if ((this.pbFunc.isEmptyObj(this.tabNumPostData) === 1 && this.tabNumPostData.status) || isSwitch) {
          postData = {};
        }
        console.log('是否', this.pbFunc.isEmptyObj(this.tabNumPostData), this.tabNumPostData)
        this.$$http('getBusinessTabsList', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            console.log('tabs', results.data)
            this.tabs = results.data.data;
            for (let i in this.tabs) {
              for (let j in this.tabList) {
                if (this.tabs[i].label_key === this.tabList[j].key) {
                  this.tabList[j].num = this.tabs[i].num;
                  for (let z in this.tabs[i].tabs) {
                    for (let y in this.tabList[j].tabs) {
                      if (this.tabs[i].tabs[z].tab_key === this.tabList[j].tabs[y].key) {
                        this.tabList[j].tabs[y].num = this.tabs[i].tabs[z].num;
                      }
                    }
                  }
                  // if (i == 0&&isOne) {
                  //   this.statusTabList = this.tabList[j].tabs;
                  // }
                }

              }
            }
            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })
      })
    },
    // 导出列表
    exportData() {

      this.exportPostData.export_excel = 'export';
      this.exportBtn = {
        text: '导出中',
        isLoading: true,
        isDisabled: true,
      }
      this.$$http('getBusinessList', this.exportPostData).then((results) => {
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
        if (results.data && results.data.code == 0) {
          window.open(results.data.data.down_url);
          this.$message({
            message: '导出成功',
            type: 'success'
          });
        } else {
          this.$message.error('导出失败');
        }
      }).catch((err) => {
        this.$message.error('导出失败');
        this.exportBtn = {
          text: '导出',
          isLoading: false,
          isDisabled: false,
        }
      })
    },
    isShowBtn(status) {
      console.log('status', status);
      switch (status) {
        case 'modify_department_check': //部门修改
          return true;
          break;
        case 'create_department_check': //部门审核
          return true;
          break;
        case 'cancel_check': //取消审核
          return true;
          break;
          // case 'plan_arrive_time':
          //   return '到站时间';
          //   break;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageChange() {
      setTimeout(() => {
        this.getList(this.statusActive);
      })
    },
    singleBtn(isBatch, type, id) {
      this.$msgbox({
        title: '确定分配',
        message: '确认该业务单转为' + (type === 'own' ? '自有' : '三方'),
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            this.batchDistribution(isBatch, type, id).then((results) => {
              if (results.data && results.data.code == 0) {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              } else {
                setTimeout(() => {
                  instance.confirmButtonText = '确定';
                  instance.confirmButtonLoading = false;
                }, 300);
              }
            })
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消分配'
        });
      });
    },
    batchDistribution(isBatch, type, id) {
      return new Promise((resolve, reject) => {
        let postData = {
          order_assign: type,
          order_ids: []
        }
        if (isBatch) {
          for (let i in this.multipleSelection) {
            postData.order_ids.push(this.multipleSelection[i].id);
          }
        } else {
          postData.order_ids.push(id);
        }
        this.sureBtn = {
          isDisabled: true,
          isLoading: true
        }
        this.$$http('businessDistribution', postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.sureBtn = {
              isDisabled: false,
              isLoading: false
            }
            this.$message({
              message: '分配成功',
              type: 'success'
            });
            this.distributionDialog = false;
            this.getList(this.statusActive);
            resolve(results)
          } else {
            if (results.data && results.data.msg) {
              this.$message.error(results.data.msg);
            } else {
              this.$message.error('分配失败');
            }
            reject(results);
          }
        }).catch((err) => {
          this.$message.error('分配失败');
          this.sureBtn = {
            isDisabled: false,
            isLoading: false
          }
          reject(err);
        })
      })
    },
    batchDistributionBtn() {
      if (this.multipleSelection.length) {
        this.distributionDialog = true;
        this.distribution = 'own';
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选业务单'
        });
      }
    },
    refuse(status, id) {
      this.refuseDialog.isShow = true;
      this.refuseDialog.id = id;
      if (status == 'create_department_check') {
        this.refuseTitle = '业务单审核拒绝'
      } else if (status == 'modify_department_check') {
        this.refuseTitle = '业务单修改审核拒绝'
      } else if (status == 'cancel_check') {
        this.refuseTitle = '业务单取消审核拒绝'
      }

    },
    adopt(status, id) {
      let title = '';
      let desc = '';
      if (status === 'create_department_check') {
        title = '业务单审核通过';
        desc = '请确认业务单信息无误，审核通过后将等待匹配车辆';
      } else if (status === 'modify_department_check') {
        title = '业务单修改审核通过';
        desc = '请确认，修改被拒绝后，业务单将回置为修改前状态';
      } else if (status === 'cancel_check') {
        title = '业务单取消审核通过';
        desc = '通过后，业务单将被取消，卸货计划将被自动取消';
      }
      this.$msgbox({
        title: title,
        message: desc,
        confirmButtonText: "确定通过",
        cancelButtonText: "取消",
        showCancelButton: true,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            this.$$http('toExamineBusiness', {
              order_id: id,
              action: 'pass'
            }).then((results) => {
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
              if (results.data && results.data.code == 0) {
                this.$message({
                  message: '通过审核成功',
                  type: 'success'
                });
                done();
                this.getTabs().then((results) => {
                  if (results.data && results.data.code == 0) {
                    this.pageData.currentPage = 1;
                    this.getList(this.statusActive);
                  }
                });
              }

            }).catch((err) => {
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
              this.$message.error('通过审核失败');
            })

          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消通过审核'
        });
      });
    },
    closeDialog: function(isSave) {
      this.refuseDialog.isShow = false;
      if (isSave) {
        this.getTabs().then((results) => {
          if (results.data && results.data.code == 0) {
            this.pageData.currentPage = 1;
            this.getList(this.statusActive);
          }
        });
        // this.getProcess();
      }

    },
    handleClick: function(tab, event) {
      this.pageData.currentPage = 1;
      this.searchPostData = {};
      this.searchFilters = {
        order_assign: '',
        created_at: '',
        keyword: '',
        field: 'consumer_name',
      };
      this.getTabs(true).then((results) => {
        if (results.data && results.data.code == 0) {
          for (let i in this.tabList) {
            if (this.tabList[i].key === tab.name) {
              this.statusTabList = this.tabList[i].tabs;
              this.statusActive = this.statusTabList[0].key;
            }
          }
          this.getList(this.statusActive);
        }
      })
    },
    statusClick(tab, event) {
      this.searchFilters = {
        order_assign: '',
        created_at: '',
        keyword: '',
        field: 'consumer_name',
      };
      this.searchPostData = {};
      this.getTabs(true).then((results) => {
        if (results.data && results.data.code == 0) {
          this.pageData.currentPage = 1;
          this.createdAt = []; //下计划日期
          this.planArriveTime = [];
          this.statusActive = tab.name;
          this.getList(this.statusActive);

        }
      })


    },
    startSearch() {
      this.pageData.currentPage = 1;
      this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
      this.getList(this.statusActive);
      if (this.pbFunc.objSize(this.$route.query)) {
        this.$router.push({ path: this.$route.path })
      }
      this.getTabs().then((results) => {
        if (results.data && results.data.code == 0) {
          for (let i in this.tabList) {
            if (this.tabList[i].key === this.activeName) {
              this.statusTabList = this.tabList[i].tabs;
              // this.statusActive = this.statusTabList[0].key;
            }
          }
          this.getList(this.statusActive);
        }
      })
    },
    getList(status) {
      let postData = {
        page: this.pageData.currentPage,
        page_size: this.pageData.pageSize,
        status: status === 'all' ? '' : status,
        order_assign: this.searchPostData.order_assign
      };
      if (this.planArriveTime instanceof Array && this.planArriveTime.length > 0) {
        postData.plan_arrive_time_start = this.planArriveTime[0];
        postData.plan_arrive_time_end = this.planArriveTime[1];
      }
      if (this.createdAt instanceof Array && this.createdAt.length > 0) {
        postData.created_at_start = this.createdAt[0];
        postData.created_at_end = this.createdAt[1];
      }
      postData[this.searchPostData.field] = this.searchPostData.keyword;
      postData = this.pbFunc.fifterObjIsNull(postData);
      this.tabNumPostData = postData;
      this.pageLoading = true;
      this.exportPostData = postData;
      this.$$http('getBusinessList', postData).then((results) => {
        this.pageLoading = false;
        if (results.data && results.data.code == 0) {
          this.tableData = results.data.data.data;
          this.pageData.totalCount = results.data.data.count;
        }
      }).catch((err) => {
        this.pageLoading = false;
      })

    }
  },
  created() {
    this.searchPostData = this.pbFunc.deepcopy(this.searchFilters);
    this.getList(this.statusActive);
    this.getTabs().then((results) => {
      if (results.data && results.data.code == 0) {
        if (this.activeName === 'all_new') {
          for (let i in this.tabList) {
            if (i == 0) {
              this.statusTabList = this.tabList[i].tabs;
            }
          }
        } else {
          for (let i in this.tabList) {
            if (this.tabList[i].key === this.activeName) {
              this.statusTabList = this.tabList[i].tabs;
            }
          }
        }

      }

    });
    // for (let i in this.tabList) {
    //   if (this.tabList[i].key === this.activeName) {
    //     this.statusTabList = this.tabList[i].tabs;
    //   }
    // }
  }

}

</script>
